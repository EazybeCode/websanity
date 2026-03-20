import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPost, getBlogPosts, getBlogIndex, getBlogPostTranslations } from '@/lib/sanity-queries'
import { BlogPostClient } from '@/components/pages/BlogPostClient'
import { routing } from '@/i18n/routing'

// ISR: Revalidate pages every 60 seconds to pick up Sanity CMS changes
export const revalidate = 60

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
    return { title: 'Post Not Found - Eazybe' }
  }

  const pageTitle = post.metaTitle || post.title || 'Blog Post'
  const description = post.metaDescription || post.excerpt || ''
  const featuredImage = post.ogImage || post.featuredImage || 'https://eazybe.com/logo.png'
  const postUrl = `https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/blog/${slug}`

  // Build hreflang links
  const languages: Record<string, string> = {}
  if (post.translationGroupId) {
    const translations = await getBlogPostTranslations(post.translationGroupId)

    if (translations && Array.isArray(translations)) {
      translations.forEach((translation: any) => {
        // hreflang attribute: pt-BR for Portuguese, others as-is
        const langCode = translation.language === 'pt-BR' ? 'pt-BR' : translation.language
        // URL prefix: en = no prefix, pt-BR = /br, others = /lang
        const urlPrefix = translation.language === 'en' ? '' : `/${translation.language === 'pt-BR' ? 'br' : translation.language}`
        languages[langCode] = `https://eazybe.com${urlPrefix}/blog/${translation.slug}`
      })
    }
  }

  // If no translations found, at least include current page
  if (Object.keys(languages).length === 0) {
    const currentLangCode = locale === 'br' ? 'pt-BR' : locale
    languages[currentLangCode] = postUrl
  }

  // Set x-default to English version if available, otherwise current page
  languages['x-default'] = languages['en'] || postUrl

  return {
    title: `${pageTitle} | Eazybe`,
    description,
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      type: 'article',
      title: pageTitle,
      description,
      url: postUrl,
      siteName: 'Eazybe',
      images: [
        {
          url: featuredImage,
          alt: post.featuredImageAlt || pageTitle,
        },
      ],
      ...(post.publishedAt && {
        publishedTime: post.publishedAt,
        modifiedTime: post.publishedAt,
      }),
      ...(post.category && { section: post.category }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@eazybe',
      title: pageTitle,
      description,
      images: [featuredImage],
    },
    alternates: {
      canonical: postUrl,
      languages: Object.keys(languages).length > 0 ? languages : undefined,
    },
    robots: post.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
        },
    // Custom meta tags from Sanity (parsed from HTML text field)
    ...(post.customMetaTags ? {
      other: Object.fromEntries(
        (post.customMetaTags as string)
          .split('\n')
          .map((line: string) => line.trim())
          .filter((line: string) => line.startsWith('<meta'))
          .map((line: string) => {
            const nameMatch = line.match(/(?:name|property)=["']([^"']+)["']/)
            const contentMatch = line.match(/content=["']([^"']+)["']/)
            return nameMatch && contentMatch ? [nameMatch[1], contentMatch[1]] : null
          })
          .filter(Boolean) as [string, string][]
      ),
    } : {}),
  }
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

  // NOTE: JSON-LD schemas removed - no longer generating Article, Breadcrumb, or FAQ schemas

  return (
    <>

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
