import { NextRequest } from 'next/server'
import { sanityClient } from '@/lib/sanity'
// Git date each code-built page last changed (regenerate: node scripts/sitemap-lastmod.mjs)
import CODE_LASTMOD from '@/data/sitemap-lastmod.json'

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
 * Real last-modified date for a page: the newer of the git date of its code
 * (sitemap-lastmod.json) and the Sanity _updatedAt of its content, if any.
 * Never the build date: a lastmod that changes on every build teaches Google
 * to ignore it.
 */
function newest(...dates: Array<string | undefined>): string | undefined {
  const valid = dates.filter(Boolean).map((d) => formatDate(d!))
  return valid.length ? valid.sort().at(-1) : undefined
}

function codeDate(key: string): string | undefined {
  return (CODE_LASTMOD as Record<string, string>)[key]
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

  // _updatedAt of the Sanity documents behind the static pages, for this locale
  // (falling back to the English document when a locale has none).
  let pageDocs: Array<{ _type: string; language?: string; slug?: string; _updatedAt: string }> = []
  try {
    pageDocs = await sanityClient.fetch(
      `*[_type in ["pricingPage","comparisonPage","blogIndex","categoryIndexPage","productPage"] && !(_id in path("drafts.**"))]{
        _type, language, "slug": slug.current, _updatedAt
      }`
    ) ?? []
  } catch (error) {
    console.warn('Sitemap: Could not fetch page dates:', error)
  }
  const sanityDate = (type: string, slug?: string): string | undefined => {
    const docs = pageDocs.filter((d) => d._type === type && (slug === undefined || d.slug === slug))
    const doc = docs.find((d) => d.language && toLocale(d.language) === lang) ?? docs.find((d) => d.language === 'en') ?? docs[0]
    return doc?._updatedAt
  }
  const STATIC_SANITY: Record<string, () => string | undefined> = {
    '/pricing': () => sanityDate('pricingPage'),
    '/comparison': () => sanityDate('comparisonPage'),
    '/blog': () => sanityDate('blogIndex'),
    '/features': () => sanityDate('categoryIndexPage', 'features'),
    '/integrations': () => sanityDate('categoryIndexPage', 'integrations'),
    '/whatsapp-api': () => sanityDate('categoryIndexPage', 'whatsapp-api'),
    '/whatsapp-api/coexistence': () => sanityDate('productPage', 'coexistence'),
    '/features/team-inbox': () => sanityDate('productPage', 'team-inbox'),
  }

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
    lastmod: codeDate('/'),
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
    { path: '/features/team-inbox', changefreq: 'monthly', priority: 0.8 },
    { path: '/comparison', changefreq: 'weekly', priority: 0.8 },
    { path: '/about-us', changefreq: 'monthly', priority: 0.7 },
    { path: '/whatsapp-qr-code-generator', changefreq: 'monthly', priority: 0.7 },
    { path: '/whatsapp-chat-link-generator', changefreq: 'monthly', priority: 0.7 },
    { path: '/whatsapp-chat-widget', changefreq: 'monthly', priority: 0.7 },
    { path: '/marketing-roi-calculator', changefreq: 'monthly', priority: 0.7 },
    { path: '/tools', changefreq: 'monthly', priority: 0.7 },
    { path: '/case-studies', changefreq: 'weekly', priority: 0.7 },
    { path: '/case-studies/lokmaxltda', changefreq: 'monthly', priority: 0.7 },
    { path: '/become-our-partner', changefreq: 'monthly', priority: 0.7 },
    // /msa, /privacy and /terms are noindex, so they stay out of the sitemap
    // (listing them gives "Submitted URL marked noindex" in Search Console).
  ]

  for (const page of staticPages) {
    // Blog keeps same priority across all languages (0.9), others reduced for non-English
    const priority = page.path === '/blog' ? page.priority : (isDefault ? page.priority : Math.round(Math.max(page.priority - 0.1, 0.1) * 10) / 10)
    entries.push({
      loc: localeUrl(lang, page.path),
      changefreq: page.changefreq,
      priority,
      lastmod: newest(codeDate(page.path), STATIC_SANITY[page.path]?.()),
      alternates: allLocaleAlternates(page.path),
    })
  }

  // ── WhatsApp pricing calculator (localized slugs per locale) ────────────
  // Paths already carry their locale prefix, so no localeUrl() here.
  const WA_PRICING_PATHS: Record<string, string> = {
    en: '/whatsapp-pricing-calculator',
    br: '/br/calculadora-de-precos-do-whatsapp',
    es: '/es/calculadora-de-precios-de-whatsapp',
    tr: '/tr/whatsapp-fiyat-hesaplayici',
  }
  entries.push({
    loc: `${SITE_URL}${WA_PRICING_PATHS[lang] ?? WA_PRICING_PATHS.en}`,
    changefreq: 'monthly',
    priority: isDefault ? 0.7 : 0.6,
    lastmod: codeDate('/whatsapp-pricing-calculator'),
    alternates: [
      { lang: 'x-default', url: `${SITE_URL}${WA_PRICING_PATHS.en}` },
      ...LOCALES.map((l) => ({ lang: toHreflang(l), url: `${SITE_URL}${WA_PRICING_PATHS[l]}` })),
    ],
  })

  // ── Integration pages ───────────────────────────────────────────────────
  for (const slug of INTEGRATION_SLUGS) {
    const path = `/${slug}-whatsapp-integration`
    entries.push({
      loc: localeUrl(lang, path),
      changefreq: 'daily',
      priority: 0.9,
      lastmod: newest(codeDate('/integration-page'), sanityDate('productPage', `${slug}-whatsapp-integration`)),
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

  // ── Comparison posts from Sanity ────────────────────────────────────────
  try {
    const comparisonPosts: Array<{
      slug: string
      language: string
      translationGroupId?: string
      _updatedAt: string
    }> = await sanityClient.fetch(
      `*[_type == "comparisonPost"]{
        "slug": slug.current,
        language,
        translationGroupId,
        _updatedAt
      }`
    ) ?? []

    // Group by translationGroupId for hreflang
    const groups = new Map<string, typeof comparisonPosts>()
    for (const post of comparisonPosts) {
      const key = post.translationGroupId || post.slug
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(post)
    }

    groups.forEach((groupPosts) => {
      const thisPost = groupPosts.find((p) => toLocale(p.language) === lang)
      if (!thisPost) return

      const englishPost = groupPosts.find((p) => p.language === 'en')
      const alternates: Array<{ lang: string; url: string }> = [
        {
          lang: 'x-default',
          url: englishPost
            ? localeUrl(toLocale(englishPost.language), `/comparison/${englishPost.slug}`)
            : localeUrl('en', `/comparison/${thisPost.slug}`)
        },
        ...groupPosts.map((p) => {
          const pLocale = toLocale(p.language)
          return {
            lang: toHreflang(p.language),
            url: localeUrl(pLocale, `/comparison/${p.slug}`)
          }
        }),
      ]

      entries.push({
        loc: localeUrl(lang, `/comparison/${thisPost.slug}`),
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: formatDate(thisPost._updatedAt),
        alternates,
      })
    })
  } catch (error) {
    console.warn('Sitemap: Could not fetch comparison posts:', error)
  }

  // ── Feature / WhatsApp API pages from Sanity ────────────────────────────
  try {
    // All locales at once: the slug is shared across languages, so the locales
    // that have the page become its hreflang alternates.
    const pages: Array<{
      slug: string
      category: string
      language: string
      _updatedAt: string
    }> = await sanityClient.fetch(
      `*[_type == "productPage" && category in ["feature", "whatsapp-api"] && slug.current != "coexistence" && slug.current != "team-inbox" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        category,
        language,
        _updatedAt
      }`
    ) ?? []

    for (const page of pages.filter((p) => p.language && toLocale(p.language) === lang)) {
      const path = page.category === 'feature' ? `/features/${page.slug}` : `/whatsapp-api/${page.slug}`
      const locales = [...new Set(
        pages.filter((p) => p.slug === page.slug && p.category === page.category && p.language).map((p) => toLocale(p.language))
      )].filter((l) => LOCALES.includes(l))

      entries.push({
        loc: localeUrl(lang, path),
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: newest(codeDate('/product-page'), page._updatedAt),
        alternates: locales.length > 1
          ? [
              { lang: 'x-default', url: localeUrl(locales.includes('en') ? 'en' : lang, path) },
              ...locales.map((l) => ({ lang: toHreflang(l), url: localeUrl(l, path) })),
            ]
          : undefined,
      })
    }
  } catch (error) {
    console.warn('Sitemap: Could not fetch product pages:', error)
  }

  // One entry per URL (a document duplicated in Sanity would otherwise be listed twice).
  const seen = new Set<string>()
  return buildSitemapXml(entries.filter((e) => !seen.has(e.loc) && seen.add(e.loc)))
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
