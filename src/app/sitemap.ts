import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'

const SITE_URL = 'https://eazybe.com'
const LOCALES = ['en', 'br', 'es', 'tr']

const INTEGRATION_SLUGS = [
  'hubspot', 'salesforce', 'zoho', 'bitrix24', 'leadsquared',
  'freshdesk', 'pipedrive', 'monday', 'google-sheets', 'google-calendar', 'webhooks',
]

// Map Sanity language codes to our locale codes
function toLocale(sanityLang: string): string {
  if (sanityLang === 'pt-BR' || sanityLang === 'pt') return 'br'
  return sanityLang
}

function localeUrl(locale: string, path: string): string {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return `${SITE_URL}${prefix}${path}`
}

function alternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const locale of LOCALES) {
    langs[locale] = localeUrl(locale, path)
  }
  return langs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = []

  // ─── Static pages per locale ──────────────────────────────────────────────
  const staticPages = [
    { path: '/', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/pricing', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/features', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/whatsapp-api', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/whatsapp-api/coexistence', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/integrations', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/team-inbox', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/comparison', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/become-our-partner', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/msa', changeFrequency: 'monthly' as const, priority: 0.3 },
    { path: '/privacy', changeFrequency: 'monthly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  for (const locale of LOCALES) {
    for (const page of staticPages) {
      const pagePath = page.path === '/' ? '' : page.path
      urls.push({
        url: localeUrl(locale, pagePath || '/'),
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: locale === 'en' ? page.priority : Math.max(page.priority - 0.1, 0.1),
        alternates: { languages: alternates(pagePath || '/') },
      })
    }
  }

  // ─── Integration pages per locale ─────────────────────────────────────────
  for (const locale of LOCALES) {
    for (const slug of INTEGRATION_SLUGS) {
      const path = `/${slug}-whatsapp-integration`
      urls.push({
        url: localeUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: locale === 'en' ? 0.8 : 0.7,
        alternates: { languages: alternates(path) },
      })
    }
  }

  // ─── Blog posts from Sanity ───────────────────────────────────────────────
  try {
    const posts: Array<{
      slug: string
      language: string
      translationGroupId?: string
      _updatedAt: string
    }> = await sanityClient.fetch(
      `*[_type == "post"]{
        "slug": slug.current,
        language,
        translationGroupId,
        _updatedAt
      }`
    )

    // Group by translationGroupId for hreflang alternates
    const groups = new Map<string, typeof posts>()
    for (const post of posts) {
      const key = post.translationGroupId || post.slug
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(post)
    }

    groups.forEach((groupPosts) => {
      for (const post of groupPosts) {
        const locale = toLocale(post.language)
        const path = `/blog/${post.slug}`

        // Build alternates from sibling translations
        const langs: Record<string, string> = {}
        for (const sibling of groupPosts) {
          const sibLocale = toLocale(sibling.language)
          langs[sibLocale] = localeUrl(sibLocale, `/blog/${sibling.slug}`)
        }

        urls.push({
          url: localeUrl(locale, path),
          lastModified: new Date(post._updatedAt),
          changeFrequency: 'monthly',
          priority: 0.9,
          alternates: { languages: langs },
        })
      }
    })
  } catch (error) {
    console.warn('Sitemap: Could not fetch blog posts:', error)
  }

  // ─── Feature/product pages from Sanity ────────────────────────────────────
  try {
    const pages: Array<{
      slug: string
      language: string
      category: string
      _updatedAt: string
    }> = await sanityClient.fetch(
      `*[_type == "productPage" && slug.current != "coexistence"]{
        "slug": slug.current,
        language,
        category,
        _updatedAt
      }`
    )

    for (const page of pages) {
      const locale = toLocale(page.language)
      let path = ''
      if (page.category === 'feature') {
        path = `/features/${page.slug}`
      } else if (page.category === 'whatsapp-api') {
        path = `/whatsapp-api/${page.slug}`
      } else {
        continue // integration pages handled above via INTEGRATION_SLUGS
      }

      urls.push({
        url: localeUrl(locale, path),
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'weekly',
        priority: locale === 'en' ? 0.7 : 0.6,
      })
    }
  } catch (error) {
    console.warn('Sitemap: Could not fetch product pages:', error)
  }

  return urls
}
