import * as https from 'https'
import * as http from 'http'

// Language configuration - must match generate-sitemap.ts
const HREFLANG_CODES: Record<string, string> = {
  en: 'en',
  br: 'pt-BR',
  es: 'es',
  tr: 'tr'
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  br: 'Brazilian Portuguese',
  es: 'Spanish',
  tr: 'Turkish'
}

const SITE_URL = 'https://eazybe.com'

// Test pages - representative sample of different page types
const TEST_PAGES = [
  // Homepages
  { path: '/', name: 'Homepage (en)', lang: 'en' },
  { path: '/br', name: 'Homepage (br)', lang: 'br' },
  { path: '/es', name: 'Homepage (es)', lang: 'es' },
  { path: '/tr', name: 'Homepage (tr)', lang: 'tr' },

  // Integration pages
  { path: '/hubspot-whatsapp-integration', name: 'HubSpot Integration (en)', lang: 'en' },
  { path: '/br/hubspot-whatsapp-integration', name: 'HubSpot Integration (br)', lang: 'br' },

  // Blog pages
  { path: '/blog', name: 'Blog Listing (en)', lang: 'en' },
  { path: '/br/blog', name: 'Blog Listing (br)', lang: 'br' },

  // Feature pages
  { path: '/features', name: 'Features (en)', lang: 'en' },
  { path: '/br/features', name: 'Features (br)', lang: 'br' },
]

interface HreflangTag {
  hreflang: string
  href: string
}

interface PageTestResult {
  page: string
  success: boolean
  hreflangTags: HreflangTag[]
  issues: string[]
}

/**
 * Fetch HTML from a URL
 */
function fetchHTML(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http

    client.get(url, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data.toString())
        } else {
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      })
    }).on('error', reject)
  })
}

/**
 * Extract hreflang tags from HTML
 */
function extractHreflangTags(html: string): HreflangTag[] {
  const tags: HreflangTag[] = []

  // Match hreflang link tags: <link rel="alternate" hreflang="..." href="...">
  const regex = /<link[^>]+rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi

  let match
  while ((match = regex.exec(html)) !== null) {
    tags.push({
      hreflang: match[1],
      href: match[2]
    })
  }

  return tags
}

/**
 * Build expected URL for a language variant
 */
function buildExpectedUrl(currentPath: string, targetLang: string): string {
  // Remove current language prefix if present
  let basePath = currentPath
  for (const lang of ['br', 'es', 'tr']) {
    if (basePath.startsWith(`/${lang}`)) {
      basePath = basePath.substring(`/${lang}`.length)
      break
    }
  }
  if (basePath === '') basePath = '/'

  // Add target language prefix
  if (targetLang === 'en') {
    return `${SITE_URL}${basePath}`
  }
  return `${SITE_URL}/${targetLang}${basePath}`
}

/**
 * Verify hreflang tags for a page
 */
function verifyHreflangTags(pagePath: string, tags: HreflangTag[]): { issues: string[], expectedTags: string[] } {
  const issues: string[] = []
  const expectedTags: string[] = []

  // Expected languages
  const expectedLangs = ['en', 'pt-BR', 'es', 'tr', 'x-default']

  // Check if all expected tags are present
  for (const lang of expectedLangs) {
    const tag = tags.find(t => t.hreflang === lang)

    if (!tag) {
      issues.push(`Missing hreflang tag for "${lang}"`)
      expectedTags.push(`❌ ${lang}: MISSING`)
    } else {
      const expectedUrl = buildExpectedUrl(pagePath, lang === 'x-default' ? 'en' : lang === 'pt-BR' ? 'br' : lang === 'es' ? 'es' : lang === 'tr' ? 'tr' : 'en')

      // Clean up URL comparison (remove trailing slashes for comparison)
      const cleanHref = tag.href.replace(/\/$/, '')
      const cleanExpected = expectedUrl.replace(/\/$/, '')

      if (cleanHref !== cleanExpected) {
        issues.push(`Incorrect URL for "${lang}": expected "${expectedUrl}", got "${tag.href}"`)
        expectedTags.push(`⚠️  ${lang}: ${tag.href} (should be: ${expectedUrl})`)
      } else {
        expectedTags.push(`✅ ${lang}: ${tag.href}`)
      }
    }
  }

  // Check for unexpected tags
  for (const tag of tags) {
    if (!expectedLangs.includes(tag.hreflang)) {
      issues.push(`Unexpected hreflang value: "${tag.hreflang}"`)
    }
  }

  return { issues, expectedTags }
}

/**
 * Main verification function
 */
async function verifyHreflang() {
  console.log('🔍 Verifying hreflang implementation...\n')

  const results: PageTestResult[] = []
  let totalIssues = 0

  for (const testPage of TEST_PAGES) {
    const url = `${SITE_URL}${testPage.path}`

    try {
      console.log(`📄 Testing: ${testPage.name}`)
      console.log(`   URL: ${url}`)

      const html = await fetchHTML(url)
      const tags = extractHreflangTags(html)

      console.log(`   Found ${tags.length} hreflang tag(s)`)

      if (tags.length === 0) {
        console.log(`   ❌ NO hreflang tags found!`)
        results.push({
          page: testPage.name,
          success: false,
          hreflangTags: [],
          issues: ['No hreflang tags found']
        })
        totalIssues++
        console.log('')
        continue
      }

      const { issues, expectedTags } = verifyHreflangTags(testPage.path, tags)

      // Display each hreflang tag
      console.log(`   Hreflang tags:`)
      expectedTags.forEach(tag => {
        console.log(`      ${tag}`)
      })

      if (issues.length > 0) {
        console.log(`   ⚠️  Issues found: ${issues.length}`)
        issues.forEach(issue => {
          console.log(`      ❌ ${issue}`)
        })
        totalIssues++
        results.push({
          page: testPage.name,
          success: false,
          hreflangTags: tags,
          issues
        })
      } else {
        console.log(`   ✅ All hreflang tags correct!`)
        results.push({
          page: testPage.name,
          success: true,
          hreflangTags: tags,
          issues: []
        })
      }

      console.log('')
    } catch (error) {
      console.log(`   ❌ Error fetching page: ${error}`)
      results.push({
        page: testPage.name,
        success: false,
        hreflangTags: [],
        issues: [`Failed to fetch: ${error}`]
      })
      totalIssues++
      console.log('')
    }
  }

  // Summary
  console.log('📊 Summary:')
  console.log(`   Total pages tested: ${TEST_PAGES.length}`)
  console.log(`   Successful: ${results.filter(r => r.success).length}`)
  console.log(`   Failed: ${results.filter(r => !r.success).length}`)
  console.log(`   Total issues: ${totalIssues}`)

  if (totalIssues === 0) {
    console.log('\n✅ All hreflang implementations are correct!')
  } else {
    console.log('\n⚠️  Some issues were found. Please review the output above.')
  }

  // Recommendations
  console.log('\n💡 Recommendations:')
  console.log('   1. Check Google Search Console → International Targeting for hreflang errors')
  console.log('   2. Use a tool like https://www.google.com/search_console/visualize-hreflang')
  console.log('   3. Ensure all language variants have reciprocal hreflang links')
  console.log('   4. Verify that canonical URLs are correct for each language variant')
}

// Run the verification
verifyHreflang().catch(error => {
  console.error('❌ Error running hreflang verification:', error)
  process.exit(1)
})
