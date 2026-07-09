import type { Metadata } from 'next'
import { preload } from 'react-dom'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPost, getBlogPosts, getBlogIndex, getBlogPostTranslations } from '@/lib/sanity-queries'
import { BlogPostClient } from '@/components/pages/BlogPostClient'
import { routing } from '@/i18n/routing'
import { parseMetadataFromHtml, parseJsonLdSchemas } from '@/lib/parseMetadata'

// ISR: Revalidate pages every 10 seconds to pick up Sanity CMS changes immediately
export const revalidate = 10

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []

  for (const locale of routing.locales) {
    const posts = await getBlogPosts(locale)
    if (posts) {
      for (const post of posts) {
        params.push({ locale, slug: post.slug })
      }
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
  const post = await getBlogPost(slug, locale)

  if (!post) {
    return { title: 'Blog Post - Eazybe' }
  }

  // Parse metadata from customMetaTags HTML field using Cheerio
  const metadata = parseMetadataFromHtml(post.customMetaTags)

  // Always allow indexing — force the same robots / googlebot / bingbot
  // tags on every post regardless of whether customMetaTags is filled.
  metadata.robots = {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
  const existingOther = metadata.other || {}
  const cleanOther: Record<string, string | number | (string | number)[]> = {}
  for (const [k, v] of Object.entries(existingOther)) {
    if (v !== undefined && v !== null) cleanOther[k] = v
  }
  cleanOther.bingbot = 'index, follow'
  metadata.other = cleanOther

  // Add author meta tag dynamically from Sanity author field
  if (post.author?.name) {
    metadata.authors = [{ name: post.author.name }]
  }

  // Add keywords meta tag from Sanity metaKeywords field
  if (post.metaKeywords) {
    metadata.keywords = post.metaKeywords
  }

  // Priority order for title: customMetaTags > metaTitle > post.title > fallback
  if (!metadata.title && post.metaTitle) {
    metadata.title = post.metaTitle
  }
  if (!metadata.title) {
    metadata.title = `${post.title || 'Blog Post'} | Eazybe`
  }

  // Priority order for description: customMetaTags > metaDescription > excerpt
  if (!metadata.description && post.metaDescription) {
    metadata.description = post.metaDescription
  }
  if (!metadata.description) {
    metadata.description = post.excerpt || ''
  }

  // Canonical URL for this page
  const SITE_URL = 'https://eazybe.com'
  const localePath = locale === 'en' ? '' : `/${locale}`
  const canonicalUrl = `${SITE_URL}${localePath}/blog/${slug}`

  if (!metadata.alternates) metadata.alternates = {}
  if (!(metadata.alternates as any).canonical) {
    ;(metadata.alternates as any).canonical = canonicalUrl
  }

  // Hreflang alternates from translation group
  if (post.translationGroupId) {
    const translations = await getBlogPostTranslations(post.translationGroupId)
    if (translations && translations.length > 0) {
      // Map Sanity language codes to ISO hreflang codes and Next.js locale prefixes
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
        const { hreflang, prefix } = mapping
        languages[hreflang] = `${SITE_URL}${prefix}/blog/${t.slug}`
      }
      // x-default points to English version if available, otherwise current page
      languages['x-default'] = languages['en'] || canonicalUrl

      if (!metadata.alternates.languages) {
        ;(metadata.alternates as any).languages = languages
      }
    }
  }

  // Add article:published_time and article:modified_time meta tags (ISO 8601)
  if (post.publishedAt || post.updatedAt) {
    if (!metadata.other) metadata.other = {}
    if (post.publishedAt) {
      ;(metadata.other as Record<string, string>)['article:published_time'] = new Date(post.publishedAt).toISOString()
    }
    // Only render modified_time if updatedAt exists
    if (post.updatedAt) {
      ;(metadata.other as Record<string, string>)['article:modified_time'] = new Date(post.updatedAt).toISOString()
    }
  }

  // Generate Open Graph and Twitter meta tags
  const ogImage = post.socialShareImage || post.featuredImage
  const ogImageMeta = post.socialShareImage ? post.socialShareImageMeta : post.featuredImageMeta
  const ogImageAlt = post.socialShareImage
    ? (post.socialShareImageAlt || post.title)
    : (post.featuredImageAlt || post.title)

  const ogLocaleMap: Record<string, string> = {
    en: 'en_US',
    br: 'pt_BR',
    es: 'es_ES',
    tr: 'tr_TR',
  }
  const ogLocale = ogLocaleMap[locale] || 'en_US'

  // OG and Twitter title/description (no fallback to excerpt for descriptions)
  const fallbackTitle = metadata.title?.toString() || post.title
  const ogTitle = post.ogTitle || fallbackTitle
  const ogDescription = post.ogDescription || ''
  const twitterTitle = post.twitterTitle || post.ogTitle || fallbackTitle
  const twitterDescription = post.twitterDescription || ''

  metadata.openGraph = {
    type: 'article',
    url: canonicalUrl,
    title: ogTitle,
    description: ogDescription,
    siteName: 'Eazybe',
    locale: ogLocale,
    ...(ogImage && {
      images: [
        {
          url: ogImage,
          width: ogImageMeta?.width || 1200,
          height: ogImageMeta?.height || 630,
          alt: ogImageAlt,
        },
      ],
    }),
  }

  metadata.twitter = {
    card: 'summary_large_image',
    site: '@eazybe',
    creator: '@eazybe',
    title: twitterTitle,
    description: twitterDescription,
    ...(ogImage && {
      images: [
        {
          url: ogImage,
          alt: ogImageAlt,
        },
      ],
    }),
  }

  return metadata
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const { isEnabled: isPreview } = await draftMode()

  const [post, relatedPosts, blogIndex] = await Promise.all([
    getBlogPost(slug, locale, isPreview),
    getBlogPosts(locale, 4),
    getBlogIndex(locale),
  ])

  if (!post) {
    notFound()
  }

  // Preload the featured image (the LCP element) so the browser requests it
  // from the head instead of waiting to discover the <img> deep in the body.
  if (post.featuredImage) {
    preload(post.featuredImage, { as: 'image', fetchPriority: 'high' })
  }

  // Fetch translations for language switcher
  const translations = post.translationGroupId
    ? await getBlogPostTranslations(post.translationGroupId)
    : []

  // Format translations for the context provider
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://eazybe.com'
  const localePrefixes: Record<string, string> = {
    en: '',
    es: '/es',
    br: '/br',
    tr: '/tr',
    'pt-BR': '/br',
    pt: '/br',
  }

  // Map Sanity language codes to app locale codes for the language switcher
  const sanityToAppLocale: Record<string, string> = {
    en: 'en',
    es: 'es',
    'pt-BR': 'br',
    pt: 'br',
    br: 'br',
    tr: 'tr',
  }

  const formattedTranslations = translations.map((t: { language: string; slug: string }) => {
    const appLocale = sanityToAppLocale[t.language] || t.language
    const prefix = localePrefixes[t.language] || `/${t.language}`
    return {
      locale: appLocale,
      slug: t.slug,
      url: `${SITE_URL}${prefix}/blog/${t.slug}`,
    }
  })

  // Parse JSON-LD schemas from jsonLdSchemas HTML field using Cheerio
  const schemas = parseJsonLdSchemas(post.jsonLdSchemas)

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
        name: 'Blog',
        item: `${SITE_BASE}${localePathPrefix}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.featuredImageAlt || post.title,
        item: `${SITE_BASE}${localePathPrefix}/blog/${slug}`,
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

  // Auto-generate VideoObject JSON-LD for every videoEmbed in the body.
  // Without this, GSC reports "No video indexed" even though the iframe
  // is visible — Google needs structured data to recognise the video.
  const videoSchemas = (Array.isArray(post.content) ? post.content : [])
    .filter((b: any) => b?._type === 'videoEmbed')
    .map((v: any) => {
      const platform = v.platform || 'youtube'
      // Strip anything after ? or & or / in the videoId field — editors
      // sometimes paste the full URL or a "?si=..." share suffix.
      const id = (v.videoId || '').split(/[?&/#]/)[0]
      const customUrl = v.url
      let embedUrl: string | undefined
      let contentUrl: string | undefined
      let thumbnailUrl: string | undefined
      if (platform === 'youtube' && id) {
        embedUrl = `https://www.youtube.com/embed/${id}`
        contentUrl = `https://www.youtube.com/watch?v=${id}`
        thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      } else if (platform === 'vimeo' && id) {
        embedUrl = `https://player.vimeo.com/video/${id}`
        contentUrl = `https://vimeo.com/${id}`
      } else if (platform === 'loom' && id) {
        embedUrl = `https://www.loom.com/embed/${id}`
        contentUrl = `https://www.loom.com/share/${id}`
      } else if (platform === 'wistia' && id) {
        embedUrl = `https://fast.wistia.net/embed/iframe/${id}`
      } else if (platform === 'custom' && customUrl) {
        embedUrl = customUrl
        contentUrl = customUrl
      }
      if (!embedUrl) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: v.title || post.title || 'Video',
        description: v.title ? (post.excerpt || `${v.title} — ${post.title}`) : (post.excerpt || post.title),
        thumbnailUrl: v.coverImage?.asset?.url || thumbnailUrl || post.featuredImage,
        uploadDate: post.publishedAt || post.updatedAt || new Date().toISOString(),
        embedUrl,
        ...(contentUrl ? { contentUrl } : {}),
      }
    })
    .filter(Boolean) as object[]

  return (
    <>
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-yellow-500 text-black text-center py-2 text-sm font-bold">
          Preview Mode —{' '}
          <a href={`/api/preview/disable?redirect=${locale === 'en' ? '' : `/${locale}`}/blog/${slug}`} className="underline">
            Exit Preview
          </a>
        </div>
      )}
      {/* Auto-generated BreadcrumbList JSON-LD (always) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Auto-generated FAQPage JSON-LD (only if FAQs exist) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Auto-generated VideoObject JSON-LD per videoEmbed in the body */}
      {videoSchemas.map((vs, i) => (
        <script
          key={`video-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vs) }}
        />
      ))}
      {/* Render JSON-LD schemas from Sanity jsonLdSchemas field */}
      {/* Note: While typically in <head>, JSON-LD in body is valid for SEO */}
      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <BlogPostClient
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
