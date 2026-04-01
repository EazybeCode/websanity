import { NextRequest } from 'next/server'
import { sanityClient } from '@/lib/sanity'

const SITE_URL = 'https://eazybe.com'
const LOCALES = ['en', 'br', 'es', 'tr']

const INTEGRATION_SLUGS = [
  'hubspot', 'salesforce', 'zoho', 'bitrix24', 'leadsquared',
  'freshdesk', 'pipedrive', 'monday', 'google-sheets', 'google-calendar', 'webhooks',
]

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Maps Sanity language codes to our URL locale format.
 * Used for building URLs: /blog/slug vs /br/blog/slug
 */
function toLocale(sanityLang: string): string {
  if (sanityLang === 'pt-BR' || sanityLang === 'pt') return 'br'
  return sanityLang
}

/**
 * Maps Sanity language codes to proper hreflang codes for SEO.
 * Uses ISO 639-1 format with region where applicable.
 * Important: pt-BR (not 'br') is the correct hreflang for Brazilian Portuguese.
 */
function toHreflang(sanityLang: string): string {
  if (sanityLang === 'pt' || sanityLang === 'pt-BR') return 'pt-BR'
  if (sanityLang === 'br') return 'pt-BR'
  return sanityLang
}

function localeUrl(locale: string, path: string): string {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return `${SITE_URL}${prefix}${path}`
}

function formatDate(date: string | Date): string {
  return new Date(date).toISOString().split('T')[0]
}

/**
 * Gets the build date for static pages that don't have their own lastmod
 */
function getBuildDate(): string {
  return new Date().toISOString().split('T')[0]
}

// ─── XML builders ───────────────────────────────────────────────────────────

interface SitemapEntry {
  loc: string
  changefreq: string
  priority: number
  lastmod?: string
  alternates?: Array<{ lang: string; url: string }>
}

function buildUrlEntry(entry: SitemapEntry): string {
  let xml = `
  <url>
    <loc>${entry.loc}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`

  if (entry.lastmod) {
    xml += `\n    <lastmod>${entry.lastmod}</lastmod>`
  }

  if (entry.alternates) {
    for (const alt of entry.alternates) {
      xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`
    }
  }

  xml += `
  </url>`
  return xml
}

function buildSitemapXml(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.map(buildUrlEntry).join('')}
</urlset>`
}

// ─── Alternates helper ──────────────────────────────────────────────────────

/**
 * Generates hreflang alternates for static pages (same slug across all locales).
 * Includes x-default pointing to English version.
 */
function allLocaleAlternates(path: string): Array<{ lang: string; url: string }> {
  return [
    { lang: 'x-default', url: localeUrl('en', path) },
    ...LOCALES.map((l) => ({ lang: toHreflang(l), url: localeUrl(l, path) })),
  ]
}

// ─── Generate per-language sitemap ──────────────────────────────────────────

async function generateSitemapForLocale(lang: string): Promise<string> {
  const entries: SitemapEntry[] = []
  const isDefault = lang === 'en'

  // ── Homepage ────────────────────────────────────────────────────────────
  const homeAlternates: Array<{ lang: string; url: string }> = [
    { lang: 'x-default', url: `${SITE_URL}/` },
    ...LOCALES.map((l) => ({
      lang: toHreflang(l),
      url: l === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${l}`,
    })),
  ]
  entries.push({
    loc: isDefault ? `${SITE_URL}/` : `${SITE_URL}/${lang}`,
    changefreq: 'daily',
    priority: 1.0, // All homepages get priority 1.0
    alternates: homeAlternates,
  })

  // ── Static pages ────────────────────────────────────────────────────────
  const staticPages = [
    { path: '/pricing', changefreq: 'monthly', priority: 0.8 },
    { path: '/features', changefreq: 'monthly', priority: 0.8 },
    { path: '/whatsapp-api', changefreq: 'monthly', priority: 0.8 },
    { path: '/whatsapp-api/coexistence', changefreq: 'monthly', priority: 0.8 },
    { path: '/integrations', changefreq: 'monthly', priority: 0.8 },
    { path: '/blog', changefreq: 'daily', priority: 0.9 },
    // { path: '/team-inbox', changefreq: 'weekly', priority: 0.8 }, // REMOVED
    { path: '/comparison', changefreq: 'weekly', priority: 0.8 },
    { path: '/become-our-partner', changefreq: 'monthly', priority: 0.7 },
    { path: '/msa', changefreq: 'monthly', priority: 0.3 },
    { path: '/privacy', changefreq: 'monthly', priority: 0.3 },
    { path: '/terms', changefreq: 'monthly', priority: 0.3 },
  ]

  for (const page of staticPages) {
    entries.push({
      loc: localeUrl(lang, page.path),
      changefreq: page.changefreq,
      priority: isDefault ? page.priority : Math.round(Math.max(page.priority - 0.1, 0.1) * 10) / 10,
      lastmod: getBuildDate(), // Add lastmod for static pages
      alternates: allLocaleAlternates(page.path),
    })
  }

  // ── Integration pages ───────────────────────────────────────────────────
  for (const slug of INTEGRATION_SLUGS) {
    const path = `/${slug}-whatsapp-integration`
    entries.push({
      loc: localeUrl(lang, path),
      changefreq: 'daily',
      priority: 0.9,
      lastmod: getBuildDate(),
      alternates: allLocaleAlternates(path),
    })
  }

  // ── Blog posts from Sanity ──────────────────────────────────────────────
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
    ) ?? []

    // Group by translationGroupId for hreflang
    const groups = new Map<string, typeof posts>()
    for (const post of posts) {
      const key = post.translationGroupId || post.slug
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(post)
    }

    groups.forEach((groupPosts) => {
      const thisPost = groupPosts.find((p) => toLocale(p.language) === lang)
      if (!thisPost) return

      // Build hreflang alternates with x-default pointing to English version
      const englishPost = groupPosts.find((p) => p.language === 'en')
      const alternates: Array<{ lang: string; url: string }> = [
        {
          lang: 'x-default',
          url: englishPost ? localeUrl(toLocale(englishPost.language), `/blog/${englishPost.slug}`) : localeUrl('en', `/blog/${thisPost.slug}`)
        },
        ...groupPosts.map((p) => {
          const pLocale = toLocale(p.language)
          return {
            lang: toHreflang(p.language),
            url: localeUrl(pLocale, `/blog/${p.slug}`)
          }
        }),
      ]

      entries.push({
        loc: localeUrl(lang, `/blog/${thisPost.slug}`),
        changefreq: 'daily',
        priority: 0.9,
        lastmod: formatDate(thisPost._updatedAt),
        alternates,
      })
    })
  } catch (error) {
    console.warn('Sitemap: Could not fetch blog posts:', error)
  }

  // ── Feature / WhatsApp API pages from Sanity ────────────────────────────
  try {
    const sanityLangMap: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }
    const sanityLang = sanityLangMap[lang] || lang

    const pages: Array<{
      slug: string
      category: string
      _updatedAt: string
    }> = await sanityClient.fetch(
      `*[_type == "productPage" && slug.current != "coexistence" && slug.current != "team-inbox" && language == $language]{
        "slug": slug.current,
        category,
        _updatedAt
      }`,
      { language: sanityLang }
    ) ?? []

    for (const page of pages) {
      let path = ''
      if (page.category === 'feature') {
        path = `/features/${page.slug}`
      } else if (page.category === 'whatsapp-api') {
        path = `/whatsapp-api/${page.slug}`
      } else {
        continue
      }

      entries.push({
        loc: localeUrl(lang, path),
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: formatDate(page._updatedAt),
      })
    }
  } catch (error) {
    console.warn('Sitemap: Could not fetch product pages:', error)
  }

  return buildSitemapXml(entries)
}

// ─── Route handler ──────────────────────────────────────────────────────────

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params

  if (!LOCALES.includes(lang)) {
    return new Response('Not Found', { status: 404 })
  }

  const xml = await generateSitemapForLocale(lang)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
