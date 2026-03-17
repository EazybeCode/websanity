import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getBlogPosts, getBlogIndex } from '@/lib/sanity-queries'
import { BlogListingClient } from '@/components/pages/BlogListingClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const blogIndex = await getBlogIndex(locale).catch(() => null)

  const seo = blogIndex?.seo

  return {
    title: seo?.metaTitle || 'Blog - Eazybe',
    description:
      seo?.metaDescription ||
      'Tips, guides, and insights on WhatsApp CRM integration, sales automation, and customer engagement.',
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || 'Blog - Eazybe',
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        'Tips, guides, and insights on WhatsApp CRM integration, sales automation, and customer engagement.',
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
  }
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [allPosts, blogIndex] = await Promise.all([
    getBlogPosts(locale).catch(() => null),
    getBlogIndex(locale).catch(() => null),
  ])

  return (
    <BlogListingClient
      allPosts={allPosts || []}
      blogIndex={blogIndex}
      locale={locale}
    />
  )
}
