import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPost, getBlogPosts, getBlogIndex, getBlogPostTranslations } from '@/lib/sanity-queries'
import { BlogPostClient } from '@/components/pages/BlogPostClient'
import { routing } from '@/i18n/routing'

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

  // Only use metadata from customMetaTags HTML field in Sanity CMS
  const metadata: Metadata = {}

  if (post.customMetaTags && typeof post.customMetaTags === 'string') {
    // Parse HTML meta tags from customMetaTags field
    const lines = post.customMetaTags.split('\n')

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Parse <title> tag
      const titleMatch = trimmedLine.match(/<title>([^<]+)<\/title>/i)
      if (titleMatch) {
        metadata.title = titleMatch[1]
        continue
      }

      // Parse <meta name="..." content="...">
      const metaMatch = trimmedLine.match(/<meta\s+name=["']([^"']+)["']\s+content=["']([^"']+)["']\s*\/?>/i)
      if (metaMatch) {
        const [, name, content] = metaMatch

        // Handle special meta tags that map to Metadata properties
        if (name === 'description') {
          metadata.description = content
        } else if (name === 'keywords') {
          metadata.keywords = content
        } else if (name === 'author') {
          metadata.authors = [{ name: content }]
        } else if (name === 'robots') {
          // Skip robots from Sanity — always use index, follow (set below)
          void 0
        } else {
          // All other meta tags go to 'other'
          if (!metadata.other) metadata.other = {}
          ;(metadata.other as Record<string, string>)[name] = content
        }
        continue
      }

      // Parse <meta property="og:..." content="...">
      const ogMatch = trimmedLine.match(/<meta\s+property=["']([^"']+)["']\s+content=["']([^"']+)["']\s*\/?>/i)
      if (ogMatch) {
        const [, property, content] = ogMatch

        if (!metadata.openGraph) {
          metadata.openGraph = {} as any
        }

        // Map OG properties
        if (property === 'og:title') {
          ;(metadata.openGraph as any).title = content
        } else if (property === 'og:description') {
          ;(metadata.openGraph as any).description = content
        } else if (property === 'og:image') {
          ;(metadata.openGraph as any).images = [{ url: content }]
        } else if (property === 'og:url') {
          ;(metadata.openGraph as any).url = content
        } else if (property === 'og:site_name') {
          ;(metadata.openGraph as any).siteName = content
        } else if (property === 'og:image:alt') {
          const images = (metadata.openGraph as any).images
          if (images && images[0]) {
            images[0].alt = content
          }
        } else if (property === 'og:locale') {
          ;(metadata.openGraph as any).locale = content
        } else if (property.startsWith('article:')) {
          // Handle article-specific OG tags
          if (property === 'article:published_time') {
            ;(metadata.openGraph as any).publishedTime = content
          } else if (property === 'article:modified_time') {
            ;(metadata.openGraph as any).modifiedTime = content
          } else if (property === 'article:section') {
            ;(metadata.openGraph as any).section = content
          }
        }
        continue
      }

      // Parse <meta name="twitter:..." content="...">
      const twitterMatch = trimmedLine.match(/<meta\s+name=["']twitter:([^"']+)["']\s+content=["']([^"']+)["']\s*\/?>/i)
      if (twitterMatch) {
        const [, twitterKey, content] = twitterMatch

        if (!metadata.twitter) {
          metadata.twitter = {} as any
        }

        // Map twitter meta tags
        if (twitterKey === 'twitter:card') {
          ;(metadata.twitter as any).card = content
        } else if (twitterKey === 'twitter:site') {
          ;(metadata.twitter as any).site = content
        } else if (twitterKey === 'twitter:creator') {
          ;(metadata.twitter as any).creator = content
        } else if (twitterKey === 'twitter:title') {
          ;(metadata.twitter as any).title = content
        } else if (twitterKey === 'twitter:description') {
          ;(metadata.twitter as any).description = content
        } else if (twitterKey === 'twitter:image') {
          ;(metadata.twitter as any).images = [content]
        } else if (twitterKey === 'twitter:image:alt') {
          const images = (metadata.twitter as any).images
          if (images && images[0]) {
            images[0].alt = content
          }
        } else {
          ;(metadata.twitter as any)[twitterKey.replace('twitter:', '')] = content
        }
        continue
      }

      // Parse <link rel="canonical" href="...">
      const canonicalMatch = trimmedLine.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']\s*\/?>/i)
      if (canonicalMatch) {
        if (!metadata.alternates) metadata.alternates = {}
        ;(metadata.alternates as any).canonical = canonicalMatch[1]
        continue
      }

      // Parse <link rel="alternate" hreflang="..." href="...">
      const hreflangMatch = trimmedLine.match(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']\s*\/?>/i)
      if (hreflangMatch) {
        if (!metadata.alternates) metadata.alternates = {}
        if (!metadata.alternates.languages) {
          ;(metadata.alternates as any).languages = {}
        }
        ;(metadata.alternates as any).languages[hreflangMatch[1]] = hreflangMatch[2]
        continue
      }
    }
  }

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
      const sanityToLocale: Record<string, string> = {
        en: 'en',
        es: 'es',
        'pt-BR': 'pt-BR',
        pt: 'pt-BR',
        tr: 'tr',
      }
      const localeToPrefix: Record<string, string> = {
        en: '',
        es: '/es',
        'pt-BR': '/br',
        tr: '/tr',
      }

      const languages: Record<string, string> = {}
      for (const t of translations) {
        const hreflang = sanityToLocale[t.language] || t.language
        const prefix = localeToPrefix[hreflang] ?? `/${hreflang}`
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

  // Parse JSON-LD schemas from jsonLdSchemas HTML field in Sanity CMS
  const jsonLdScripts: React.ReactNode[] = []

  if (post.jsonLdSchemas && typeof post.jsonLdSchemas === 'string') {
    // Extract all <script type="application/ld+json"> tags and their content
    const scriptRegex = /<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/gi
    let match

    while ((match = scriptRegex.exec(post.jsonLdSchemas)) !== null) {
      const jsonContent = match[1].trim()

      try {
        // Validate that the content is valid JSON
        const parsedJson = JSON.parse(jsonContent)

        // Create a script tag for each valid schema
        jsonLdScripts.push(
          <script
            key={`json-ld-${jsonLdScripts.length}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(parsedJson) }}
          />
        )
      } catch (error) {
        // Skip invalid JSON schemas
        console.warn('Invalid JSON-LD schema in jsonLdSchemas field:', error)
      }
    }
  }

  return (
    <>
      {jsonLdScripts}

      <BlogPostClient
        post={post}
        relatedPosts={relatedPosts || []}
        blogIndex={blogIndex}
        slug={slug}
        locale={locale}
      />
    </>
  )
}
