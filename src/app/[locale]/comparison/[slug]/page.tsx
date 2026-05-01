import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { setRequestLocale } from 'next-intl/server'
import {
  getComparisonPost,
  getComparisonPosts,
  getAllComparisonSlugs,
  getComparisonPostTranslations,
  getBlogIndex,
} from '@/lib/sanity-queries'
import { ComparisonPostClient } from '@/components/pages/ComparisonPostClient'
import { routing } from '@/i18n/routing'
import { parseMetadataFromHtml, parseJsonLdSchemas } from '@/lib/parseMetadata'

// ISR: revalidate every 10s to pick up Sanity changes
export const revalidate = 10
// Allow new slugs to render on-demand without rebuild
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllComparisonSlugs()
  if (!slugs) return []

  const sanityToAppLocale: Record<string, string> = {
    en: 'en', es: 'es', 'pt-BR': 'br', pt: 'br', tr: 'tr',
  }
  const params: { locale: string; slug: string }[] = []
  for (const row of slugs) {
    if (typeof row.slug !== 'string' || !row.slug) continue
    const locale = sanityToAppLocale[row.language] || row.language || 'en'
    if (routing.locales.includes(locale as any)) {
      params.push({ locale, slug: row.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getComparisonPost(slug, locale)

  if (!post) {
    return { title: 'Comparison - Eazybe' }
  }

  // Parse metadata from customMetaTags HTML field
  const metadata = parseMetadataFromHtml(post.customMetaTags)

  // Always allow indexing unless explicitly disabled. Force the same
  // robots / googlebot / bingbot tags on every comparison post regardless
  // of whether customMetaTags is filled — match the blog post page.
  const wantIndex = !post.noindex
  const wantFollow = !post.nofollow
  metadata.robots = {
    index: wantIndex,
    follow: wantFollow,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
    googleBot: {
      index: wantIndex,
      follow: wantFollow,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
  metadata.other = {
    ...(metadata.other || {}),
    bingbot: wantIndex && wantFollow ? 'index, follow' : `${wantIndex ? 'index' : 'noindex'}, ${wantFollow ? 'follow' : 'nofollow'}`,
  }

  if (post.author?.name) {
    metadata.authors = [{ name: post.author.name }]
  }

  if (post.metaKeywords) {
    metadata.keywords = post.metaKeywords
  }

  // Priority: customMetaTags > metaTitle > post title
  if (!metadata.title && post.metaTitle) metadata.title = post.metaTitle
  if (!metadata.title) metadata.title = `${post.title || 'Comparison'} | Eazybe`

  if (!metadata.description && post.metaDescription) metadata.description = post.metaDescription
  if (!metadata.description) metadata.description = post.excerpt || ''

  // Canonical + hreflang
  const SITE_URL = 'https://eazybe.com'
  const localePath = locale === 'en' ? '' : `/${locale}`
  const canonicalUrl = `${SITE_URL}${localePath}/comparison/${slug}`

  if (!metadata.alternates) metadata.alternates = {}
  if (!(metadata.alternates as any).canonical) {
    ;(metadata.alternates as any).canonical = canonicalUrl
  }

  if (post.translationGroupId) {
    const translations = await getComparisonPostTranslations(post.translationGroupId)
    if (translations && translations.length > 0) {
      const translationMap: Record<string, { hreflang: string; prefix: string }> = {
        en: { hreflang: 'en', prefix: '' },
        es: { hreflang: 'es', prefix: '/es' },
        'pt-BR': { hreflang: 'pt-BR', prefix: '/br' },
        pt: { hreflang: 'pt-BR', prefix: '/br' },
        tr: { hreflang: 'tr', prefix: '/tr' },
        br: { hreflang: 'pt-BR', prefix: '/br' },
      }
      const languages: Record<string, string> = {}
      for (const t of translations) {
        const mapping = translationMap[t.language] || { hreflang: t.language, prefix: `/${t.language}` }
        languages[mapping.hreflang] = `${SITE_URL}${mapping.prefix}/comparison/${t.slug}`
      }
      languages['x-default'] = languages['en'] || canonicalUrl

      if (!(metadata.alternates as any).languages) {
        ;(metadata.alternates as any).languages = languages
      }
    }
  }

  // Article times
  if (post.publishedAt || post.updatedAt) {
    if (!metadata.other) metadata.other = {}
    if (post.publishedAt) {
      ;(metadata.other as Record<string, string>)['article:published_time'] = new Date(post.publishedAt).toISOString()
    }
    if (post.updatedAt) {
      ;(metadata.other as Record<string, string>)['article:modified_time'] = new Date(post.updatedAt).toISOString()
    }
  }

  // OG / Twitter
  const ogImage = post.ogImage || post.featuredImage
  const ogLocaleMap: Record<string, string> = { en: 'en_US', br: 'pt_BR', es: 'es_ES', tr: 'tr_TR' }
  const ogTitle = metadata.title?.toString() || post.title
  const ogDescription = (metadata.description as string) || post.excerpt || ''

  metadata.openGraph = {
    type: 'article',
    url: canonicalUrl,
    title: ogTitle,
    description: ogDescription,
    siteName: 'Eazybe',
    locale: ogLocaleMap[locale] || 'en_US',
    ...(ogImage && {
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.featuredImageAlt || post.title }],
    }),
  }

  metadata.twitter = {
    card: 'summary_large_image',
    site: '@eazybe',
    creator: '@eazybe',
    title: ogTitle,
    description: ogDescription,
    ...(ogImage && { images: [{ url: ogImage, alt: post.featuredImageAlt || post.title }] }),
  }

  return metadata
}

export default async function ComparisonPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const { isEnabled: isPreview } = await draftMode()

  const [post, relatedPosts, blogIndex] = await Promise.all([
    getComparisonPost(slug, locale, isPreview),
    getComparisonPosts(locale, 4),
    getBlogIndex(locale),
  ])

  if (!post) {
    notFound()
  }

  // Translations for language switcher
  const translations = post.translationGroupId
    ? await getComparisonPostTranslations(post.translationGroupId)
    : []

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://eazybe.com'
  const localePrefixes: Record<string, string> = {
    en: '', es: '/es', br: '/br', tr: '/tr', 'pt-BR': '/br', pt: '/br',
  }
  const sanityToAppLocale: Record<string, string> = {
    en: 'en', es: 'es', 'pt-BR': 'br', pt: 'br', br: 'br', tr: 'tr',
  }

  const formattedTranslations = translations.map((t: { language: string; slug: string }) => {
    const appLocale = sanityToAppLocale[t.language] || t.language
    const prefix = localePrefixes[t.language] || `/${t.language}`
    return {
      locale: appLocale,
      slug: t.slug,
      url: `${SITE_URL}${prefix}/comparison/${t.slug}`,
    }
  })

  // Parse any custom JSON-LD from jsonLdSchemas field
  const customSchemas = parseJsonLdSchemas(post.jsonLdSchemas)

  // Auto-generate BreadcrumbList JSON-LD (always)
  const SITE_BASE = 'https://eazybe.com'
  const localePathPrefix = locale === 'en' ? '' : `/${locale}`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Eazybe',
        item: locale === 'en' ? `${SITE_BASE}/` : `${SITE_BASE}${localePathPrefix}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Comparison',
        item: `${SITE_BASE}${localePathPrefix}/comparison`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.featuredImageAlt || post.title,
        item: `${SITE_BASE}${localePathPrefix}/comparison/${slug}`,
      },
    ],
  }

  // Auto-generate FAQPage JSON-LD (only if FAQs exist)
  // Uses plainAnswer > answerText (extracted plain text) > stringified answer as fallback
  const faqSchema = post.faqs && post.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.plainAnswer || faq.answerText || (typeof faq.answer === 'string' ? faq.answer : ''),
          },
        })),
      }
    : null

  return (
    <>
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-yellow-500 text-black text-center py-2 text-sm font-bold">
          Preview Mode —{' '}
          <a href={`/api/preview/disable?redirect=${localePathPrefix}/comparison/${slug}`} className="underline">
            Exit Preview
          </a>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {customSchemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ComparisonPostClient
        post={post}
        relatedPosts={relatedPosts || []}
        blogIndex={blogIndex}
        slug={slug}
        locale={locale}
        translations={formattedTranslations}
        initialViewCount={(post.viewCount || 0) * 7}
      />
    </>
  )
}
