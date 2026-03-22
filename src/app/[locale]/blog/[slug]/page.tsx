import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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

  // Always allow indexing
  metadata.robots = {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
  }

  // Fallback: auto-generate from post fields if customMetaTags didn't provide them
  if (!metadata.title) {
    metadata.title = `${post.title || 'Blog Post'} | Eazybe`
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

  return metadata
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [post, relatedPosts, blogIndex] = await Promise.all([
    getBlogPost(slug, locale),
    getBlogPosts(locale, 4),
    getBlogIndex(locale),
  ])

  if (!post) {
    notFound()
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

  const formattedTranslations = translations.map((t) => {
    const prefix = localePrefixes[t.language] || `/${t.language}`
    return {
      locale: t.language,
      slug: t.slug,
      url: `${SITE_URL}${prefix}/blog/${t.slug}`,
    }
  })

  // Parse JSON-LD schemas from jsonLdSchemas HTML field using Cheerio
  const schemas = parseJsonLdSchemas(post.jsonLdSchemas)

  return (
    <>
      {/* Render JSON-LD schemas at the top of the page */}
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
      />
    </>
  )
}
