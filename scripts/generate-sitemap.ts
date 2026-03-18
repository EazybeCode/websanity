import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env file
config()

// Sanity client configuration
const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_API_TOKEN,
})

// Configuration
const SITE_URL = process.env.VITE_SITE_URL || 'https://eazybe.com'
const LANGUAGES = ['en', 'br', 'es', 'tr']

// Proper hreflang language codes (ISO 639-1 format)
const HREFLANG_CODES: Record<string, string> = {
  en: 'en',
  br: 'pt-BR',  // Brazilian Portuguese uses pt-BR, not 'br'
  es: 'es',
  tr: 'tr'
}

// Language names for better logging
const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  br: 'Brazilian Portuguese',
  es: 'Spanish',
  tr: 'Turkish',
}

// Integration slugs from App.tsx
const INTEGRATION_SLUGS = [
  'hubspot',
  'salesforce',
  'zoho',
  'bitrix24',
  'leadsquared',
  'freshdesk',
  'pipedrive',
  'google-sheets',
  'webhooks',
]

interface SitemapURL {
  loc: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  lastmod?: string
  alternates?: Array<{ lang: string; url: string }>
}

// Fetch all blog posts from Sanity with translation info
async function getAllBlogPostsWithTranslations() {
  const query = `*[_type == "post"]{
    "slug": slug.current,
    language,
    translationGroupId,
    _updatedAt
  } | order(language asc)`
  return sanityClient.fetch(query)
}

// Group blog posts by translationGroupId for hreflang generation
function groupBlogPostsByTranslation(posts: any[]): Map<string, any[]> {
  const grouped = new Map<string, any[]>()

  posts.forEach(post => {
    // Posts without a translationGroupId are treated as their own group
    const groupId = post.translationGroupId || post.slug
    if (!grouped.has(groupId)) {
      grouped.set(groupId, [])
    }
    grouped.get(groupId)!.push(post)
  })

  return grouped
}

// Legacy function for backward compatibility
async function getAllBlogPosts() {
  return getAllBlogPostsWithTranslations()
}

// Fetch all product pages (features and integrations)
async function getAllProductPages() {
  const query = `*[_type == "productPage"]{
    "slug": slug.current,
    language,
    category,
    _updatedAt
  }`
  return sanityClient.fetch(query)
}

// Generate sitemap XML with hreflang support
function generateSitemapXML(urls: SitemapURL[], includeHreflang = true): string {
  const urlEntries = urls
    .map((url) => {
      let entry = `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}`

      // Add hreflang tags for alternate language versions
      if (includeHreflang && url.alternates && url.alternates.length > 0) {
        url.alternates.forEach((alt) => {
          entry += `\n    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`
        })
        // Add x-default pointing to English version
        const englishUrl = url.alternates.find(a => a.lang === 'en') || url.alternates[0]
        if (englishUrl) {
          entry += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl.url}" />`
        }
      }

      entry += `
  </url>`
      return entry
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlEntries}

</urlset>`
}

// Generate sitemap index XML
function generateSitemapIndexXML(sitemaps: Array<{ loc: string; lastmod: string }>): string {
  const sitemapEntries = sitemaps
    .map(
      (sitemap) => `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}

</sitemapindex>`
}

// Format date for sitemap lastmod
function formatDate(date: string | Date): string {
  return new Date(date).toISOString().split('T')[0]
}

// Group URLs by language
interface URLsByLanguage {
  [lang: string]: SitemapURL[]
}

async function generateSitemap() {
  console.log('🚀 Starting advanced multi-language sitemap generation...')
  console.log(`🌍 Languages: ${LANGUAGES.map((l) => LANGUAGE_NAMES[l]).join(', ')}\n`)

  const urlsByLanguage: URLsByLanguage = {}
  LANGUAGES.forEach((lang) => {
    urlsByLanguage[lang] = []
  })

  // Add static pages for each language
  console.log('📄 Adding static pages...')

  LANGUAGES.forEach((lang) => {
    const prefix = lang === 'en' ? '' : `/${lang}`

    // Home page with hreflang alternates
    const homepageAlternates = LANGUAGES.map((altLang) => ({
      lang: HREFLANG_CODES[altLang],  // Use proper ISO code
      url: `${SITE_URL}${altLang === 'en' ? '/' : `/${altLang}`}`,
    }))

    if (lang === 'en') {
      urlsByLanguage[lang].push({
        loc: `${SITE_URL}/`,
        changefreq: 'daily',
        priority: 1.0,
        alternates: homepageAlternates,
      })
    } else {
      urlsByLanguage[lang].push({
        loc: `${SITE_URL}/${lang}`,
        changefreq: 'daily',
        priority: 1.0,
        alternates: homepageAlternates,
      })
    }

    // Main pages
    const mainPages = [
      { path: '/pricing', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/features', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/whatsapp-api', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/whatsapp-api/coexistence', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/integrations', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/blog', priority: 0.9, changefreq: 'daily' as const },
      { path: '/team-inbox', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/msa', priority: 0.7, changefreq: 'monthly' as const },
    ]

    mainPages.forEach(({ path, priority, changefreq }) => {
      // Generate alternates for hreflang
      const alternates = LANGUAGES.map((altLang) => ({
        lang: HREFLANG_CODES[altLang],  // Use proper ISO code
        url: `${SITE_URL}${altLang === 'en' ? '' : `/${altLang}`}${path}`,
      }))

      // Special case: BR blog page gets priority 0.9
      let finalPriority = lang === 'en' ? priority : priority - 0.1
      if (path === '/blog' && lang === 'br') {
        finalPriority = 0.9
      }

      urlsByLanguage[lang].push({
        loc: `${SITE_URL}${prefix}${path}`,
        changefreq,
        priority: finalPriority,
        alternates,
      })
    })

    // Legal pages
    const legalPages = [
      { path: '/privacy', priority: 0.3, changefreq: 'monthly' as const },
      { path: '/terms', priority: 0.3, changefreq: 'monthly' as const },
    ]

    legalPages.forEach(({ path, priority, changefreq }) => {
      const alternates = LANGUAGES.map((altLang) => ({
        lang: HREFLANG_CODES[altLang],  // Use proper ISO code
        url: `${SITE_URL}${altLang === 'en' ? '' : `/${altLang}`}${path}`,
      }))

      urlsByLanguage[lang].push({
        loc: `${SITE_URL}${prefix}${path}`,
        changefreq,
        priority,
        alternates,
      })
    })

    // Additional static pages
    const additionalPages = [
      { path: '/fb', priority: 0.5, changefreq: 'monthly' as const },
      { path: '/become-our-partner', priority: 0.7, changefreq: 'weekly' as const },
      { path: '/comparison', priority: 0.9, changefreq: 'weekly' as const },
    ]

    additionalPages.forEach(({ path, priority, changefreq }) => {
      const alternates = LANGUAGES.map((altLang) => ({
        lang: HREFLANG_CODES[altLang],
        url: `${SITE_URL}${altLang === 'en' ? '' : `/${altLang}`}${path}`,
      }))

      // Special case: BR comparison page gets priority 0.9
      let finalPriority = lang === 'en' ? priority : priority - 0.1
      if (path === '/comparison' && lang === 'br') {
        finalPriority = 0.9
      }

      urlsByLanguage[lang].push({
        loc: `${SITE_URL}${prefix}${path}`,
        changefreq,
        priority: finalPriority,
        alternates,
      })
    })

    // Integration pages
    INTEGRATION_SLUGS.forEach((slug) => {
      const alternates = LANGUAGES.map((altLang) => ({
        lang: HREFLANG_CODES[altLang],  // Use proper ISO code
        url: `${SITE_URL}${altLang === 'en' ? '' : `/${altLang}`}/${slug}-whatsapp-integration`,
      }))

      urlsByLanguage[lang].push({
        loc: `${SITE_URL}${prefix}/${slug}-whatsapp-integration`,
        changefreq: 'daily',
        priority: 0.9,
        alternates,
      })
    })
  })

  // Fetch and add dynamic blog posts with hreflang support
  console.log('📝 Fetching blog posts from Sanity...')
  try {
    const blogPosts = await getAllBlogPostsWithTranslations()
    console.log(`   Found ${blogPosts.length} blog posts`)

    // Group posts by translationGroupId
    const groupedPosts = groupBlogPostsByTranslation(blogPosts)
    console.log(`   Organized into ${groupedPosts.size} translation groups`)

    // Add each blog post to its language sitemap with hreflang alternates
    groupedPosts.forEach((posts, groupId) => {
      posts.forEach((post: any) => {
        // Transform 'pt' or 'pt-BR' to 'br' for Brazilian Portuguese URL paths
        const language = post.language === 'pt' || post.language === 'pt-BR' ? 'br' : post.language

        // Skip if language is not supported
        if (!urlsByLanguage[language]) {
          console.warn(`   ⚠️  Skipping post with unsupported language: ${post.language} (${post.slug})`)
          return
        }

        const prefix = language === 'en' ? '' : `/${language}`

        // Generate alternates for all posts in this translation group
        const alternates = posts.map((p: any) => {
          // Normalize language code for URL path (br, en, es, tr)
          const normalizedLang = p.language === 'pt' || p.language === 'pt-BR' ? 'br' : p.language
          const pPrefix = normalizedLang === 'en' ? '' : `/${normalizedLang}`
          return {
            lang: HREFLANG_CODES[normalizedLang],  // Maps br → pt-BR for hreflang
            url: `${SITE_URL}${pPrefix}/blog/${p.slug}`
          }
        })

        urlsByLanguage[language].push({
          loc: `${SITE_URL}${prefix}/blog/${post.slug}`,
          changefreq: 'daily',
          priority: 0.9,
          lastmod: formatDate(post._updatedAt),
          alternates,
        })
      })
    })
  } catch (error) {
    console.warn('⚠️  Could not fetch blog posts:', error)
  }

  // Fetch and add dynamic product pages (features/integrations)
  console.log('🔧 Fetching product/feature pages from Sanity...')
  try {
    const productPages = await getAllProductPages()
    console.log(`   Found ${productPages.length} product/feature pages`)

    productPages.forEach((page: any) => {
      // Transform 'pt' or 'pt-BR' to 'br' for Brazilian Portuguese URL paths
      const language = page.language === 'pt' || page.language === 'pt-BR' ? 'br' : page.language

      // Skip if language is not supported
      if (!urlsByLanguage[language]) {
        console.warn(`   ⚠️  Skipping product page with unsupported language: ${page.language} (${page.slug})`)
        return
      }

      const prefix = language === 'en' ? '' : `/${language}`

      // Skip coexistence page as it has a special route
      if (page.slug === 'coexistence') return

      // Skip integration pages that are already added from INTEGRATION_SLUGS array
      // Sanity slugs are like "hubspot-whatsapp-integration", while INTEGRATION_SLUGS has "hubspot"
      if (INTEGRATION_SLUGS.some(slug => page.slug === `${slug}-whatsapp-integration`)) return

      // Determine the URL based on category
      let url = ''
      if (page.category === 'feature') {
        url = `${SITE_URL}${prefix}/features/${page.slug}`
      } else if (page.category === 'whatsapp-api') {
        url = `${SITE_URL}${prefix}/whatsapp-api/${page.slug}`
      } else {
        // Clean URLs without /product/ prefix for integrations and other pages
        url = `${SITE_URL}${prefix}/${page.slug}`
      }

      // Generate hreflang alternates for product pages
      const productAlternates = LANGUAGES.map((altLang) => {
        const normalizedAltLang = altLang  // Keep as br, en, es, tr
        const altPrefix = normalizedAltLang === 'en' ? '' : `/${normalizedAltLang}`
        let altUrl = ''
        if (page.category === 'feature') {
          altUrl = `${SITE_URL}${altPrefix}/features/${page.slug}`
        } else if (page.category === 'whatsapp-api') {
          altUrl = `${SITE_URL}${altPrefix}/whatsapp-api/${page.slug}`
        } else {
          // Clean URLs without /product/ prefix
          altUrl = `${SITE_URL}${altPrefix}/${page.slug}`
        }
        return {
          lang: HREFLANG_CODES[normalizedAltLang],  // Maps br → pt-BR for hreflang
          url: altUrl
        }
      })

      urlsByLanguage[language].push({
        loc: url,
        changefreq: 'weekly',
        priority: language === 'en' ? 0.7 : 0.6,
        lastmod: formatDate(page._updatedAt),
        alternates: productAlternates,  // Add hreflang alternates
      })
    })
  } catch (error) {
    console.warn('⚠️  Could not fetch product pages:', error)
  }

  // Generate language-specific sitemaps
  console.log('\n📦 Generating language-specific sitemaps...')
  const publicDir = path.join(process.cwd(), 'public')
  const currentDate = formatDate(new Date())
  const sitemapIndex: Array<{ loc: string; lastmod: string }> = []

  let totalUrls = 0

  LANGUAGES.forEach((lang) => {
    const urls = urlsByLanguage[lang]
    const sitemapXML = generateSitemapXML(urls, true)
    const sitemapFilename = `sitemap-${lang}.xml`
    const sitemapPath = path.join(publicDir, sitemapFilename)

    fs.writeFileSync(sitemapPath, sitemapXML, 'utf-8')

    sitemapIndex.push({
      loc: `${SITE_URL}/${sitemapFilename}`,
      lastmod: currentDate,
    })

    totalUrls += urls.length
    console.log(`   ✅ ${LANGUAGE_NAMES[lang]}: ${urls.length} URLs → ${sitemapFilename}`)
  })

  // Generate sitemap index
  console.log('\n📑 Generating sitemap index...')
  const sitemapIndexXML = generateSitemapIndexXML(sitemapIndex)
  const sitemapIndexPath = path.join(publicDir, 'sitemap.xml')
  fs.writeFileSync(sitemapIndexPath, sitemapIndexXML, 'utf-8')

  console.log('\n✅ Advanced multi-language sitemap generation complete!')
  console.log(`📊 Summary:`)
  console.log(`   • Total URLs: ${totalUrls}`)
  console.log(`   • Languages: ${LANGUAGES.length}`)
  console.log(`   • Sitemap files: ${LANGUAGES.length + 1} (${LANGUAGES.length} language-specific + 1 index)`)
  console.log(`\n📍 Files generated:`)
  console.log(`   • ${sitemapIndexPath} (index)`)
  LANGUAGES.forEach((lang) => {
    console.log(`   • ${path.join(publicDir, `sitemap-${lang}.xml`)} (${LANGUAGE_NAMES[lang]})`)
  })
  console.log(`\n🔗 Main sitemap URL: ${SITE_URL}/sitemap.xml`)
}

// Run the generator
generateSitemap().catch((error) => {
  console.error('❌ Error generating sitemap:', error)
  process.exit(1)
})
