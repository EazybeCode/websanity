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
    <priority>${url.priority}</priority>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}`

      // Add hreflang tags for alternate language versions
      if (includeHreflang && url.alternates && url.alternates.length > 0) {
        url.alternates.forEach((alt) => {
          entry += `\n    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`
        })
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

    // Home page
    if (lang === 'en') {
      urlsByLanguage[lang].push({
        loc: `${SITE_URL}/`,
        changefreq: 'daily',
        priority: 1.0,
      })
    } else {
      urlsByLanguage[lang].push({
        loc: `${SITE_URL}/${lang}`,
        changefreq: 'daily',
        priority: 0.9,
      })
    }

    // Main pages
    const mainPages = [
      { path: '/pricing', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/features', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/whatsapp-api', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/whatsapp-api/coexistence', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/integrations', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/blog', priority: 0.8, changefreq: 'daily' as const },
      { path: '/team-inbox', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/msa', priority: 0.7, changefreq: 'monthly' as const },
    ]

    mainPages.forEach(({ path, priority, changefreq }) => {
      // Generate alternates for hreflang
      const alternates = LANGUAGES.map((altLang) => ({
        lang: altLang === 'en' ? 'en' : altLang,
        url: `${SITE_URL}${altLang === 'en' ? '' : `/${altLang}`}${path}`,
      }))

      urlsByLanguage[lang].push({
        loc: `${SITE_URL}${prefix}${path}`,
        changefreq,
        priority: lang === 'en' ? priority : priority - 0.1,
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
        lang: altLang === 'en' ? 'en' : altLang,
        url: `${SITE_URL}${altLang === 'en' ? '' : `/${altLang}`}${path}`,
      }))

      urlsByLanguage[lang].push({
        loc: `${SITE_URL}${prefix}${path}`,
        changefreq,
        priority,
        alternates,
      })
    })

    // Integration pages
    INTEGRATION_SLUGS.forEach((slug) => {
      const alternates = LANGUAGES.map((altLang) => ({
        lang: altLang === 'en' ? 'en' : altLang,
        url: `${SITE_URL}${altLang === 'en' ? '' : `/${altLang}`}/${slug}-whatsapp-integration`,
      }))

      urlsByLanguage[lang].push({
        loc: `${SITE_URL}${prefix}/${slug}-whatsapp-integration`,
        changefreq: 'weekly',
        priority: lang === 'en' ? 0.8 : 0.7,
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
        // Transform 'pt' to 'br' for Brazilian Portuguese
        const language = post.language === 'pt' ? 'br' : post.language
        const prefix = language === 'en' ? '' : `/${language}`

        // Generate alternates for all posts in this translation group
        const alternates = posts.map((p: any) => {
          const pLang = p.language === 'pt' ? 'br' : p.language
          const pPrefix = pLang === 'en' ? '' : `/${pLang}`
          const hreflang = pLang === 'pt' ? 'pt-BR' : pLang
          return {
            lang: hreflang,
            url: `${SITE_URL}${pPrefix}/blog/${p.slug}`
          }
        })

        urlsByLanguage[language].push({
          loc: `${SITE_URL}${prefix}/blog/${post.slug}`,
          changefreq: 'monthly',
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
      // Transform 'pt' to 'br' for Brazilian Portuguese
      const language = page.language === 'pt' ? 'br' : page.language
      const prefix = language === 'en' ? '' : `/${language}`

      // Skip coexistence page as it has a special route
      if (page.slug === 'coexistence') return

      // Determine the URL based on category
      let url = ''
      if (page.category === 'feature') {
        url = `${SITE_URL}${prefix}/features/${page.slug}`
      } else if (page.category === 'whatsapp-api') {
        url = `${SITE_URL}${prefix}/whatsapp-api/${page.slug}`
      } else if (page.category === 'integration') {
        url = `${SITE_URL}${prefix}/product/${page.slug}`
      } else {
        url = `${SITE_URL}${prefix}/product/${page.slug}`
      }

      urlsByLanguage[language].push({
        loc: url,
        changefreq: 'weekly',
        priority: language === 'en' ? 0.7 : 0.6,
        lastmod: formatDate(page._updatedAt),
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
