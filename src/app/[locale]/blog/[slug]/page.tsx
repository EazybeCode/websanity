import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPost, getBlogPosts, getBlogIndex, getBlogPostTranslations } from '@/lib/sanity-queries'
import { BlogPostClient } from '@/components/pages/BlogPostClient'
import { routing } from '@/i18n/routing'

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

    translations.forEach((translation: any) => {
      const langCode = translation.language === 'pt-BR' ? 'pt-BR' : translation.language
      const urlPrefix = translation.language === 'en' ? '' : `/${translation.language === 'pt-BR' ? 'br' : translation.language}`
      languages[langCode] = `https://eazybe.com${urlPrefix}/blog/${translation.slug}`
    })
  } else {
    // Fallback if no translation group
    languages[locale === 'br' ? 'pt-BR' : locale] = postUrl
  }

  // Set x-default to English version if available
  if (languages['en']) {
    languages['x-default'] = languages['en']
  }

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

  // Build JSON-LD schemas server-side
  const postUrl = `https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/blog/${slug}`
  const featuredImage = post.ogImage || post.featuredImage || 'https://eazybe.com/logo.png'

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    headline: post.title,
    description: post.metaDescription || post.excerpt || '',
    image: featuredImage,
    author: post.author?.url
      ? { '@type': 'Person', name: post.author.name, url: post.author.url }
      : { '@type': 'Organization', name: post.author?.name || 'Eazybe', url: 'https://eazybe.com/' },
    publisher: {
      '@type': 'Organization',
      name: 'Eazybe',
      logo: { '@type': 'ImageObject', url: 'https://eazybe.com/logo.png' },
    },
    ...(post.publishedAt ? { datePublished: post.publishedAt.split('T')[0] } : {}),
    ...(post.publishedAt ? { dateModified: post.publishedAt.split('T')[0] } : {}),
  }

  // Breadcrumb schema
  const blogPath = locale === 'en' ? '/blog' : `/${locale}/blog`
  const breadcrumbItems =
    post.breadcrumbs && post.breadcrumbs.length > 0
      ? post.breadcrumbs.map((b: any, i: number) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url,
        }))
      : [
          { '@type': 'ListItem', position: 1, name: 'Eazybe', item: 'https://eazybe.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://eazybe.com${blogPath}` },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  }

  // FAQ schema
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.acceptedAnswer || faq.answer,
            },
          })),
        }
      : null

  // Custom Sanity JSON-LD schemas
  const customSchemas: object[] = []
  if (post.jsonLdSchemas && post.jsonLdSchemas.length > 0) {
    const sorted = [...post.jsonLdSchemas].sort(
      (a: any, b: any) => (a.priority || 99) - (b.priority || 99)
    )
    for (const schema of sorted) {
      try {
        customSchemas.push(JSON.parse(schema.schemaJson))
      } catch {
        // Skip invalid JSON
      }
    }
  }

  const allSchemas = [articleSchema, breadcrumbSchema, ...customSchemas]
  if (faqSchema) allSchemas.push(faqSchema)

  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
