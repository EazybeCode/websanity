import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getAuthorBySlug, getAllAuthorSlugs } from '@/lib/sanity-queries'
import { getAlternates } from '@/lib/seo-helpers'
import { AuthorProfileClient } from '@/components/pages/AuthorProfileClient'

// ISR: revalidate so author edits in Sanity (bio, social links, etc.) appear
// on live without a full redeploy — matching the blog pages' behaviour.
export const revalidate = 10

export async function generateStaticParams() {
  const authors = await getAllAuthorSlugs()
  if (!authors) return []
  return authors
    .filter((a: { slug: string }) => typeof a.slug === 'string' && a.slug)
    .map((a: { slug: string }) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const author = await getAuthorBySlug(slug, locale)

  if (!author) {
    return { title: 'Author Not Found | Eazybe' }
  }

  return {
    title: `${author.name} - Author | Eazybe Blog`,
    description: author.bio || `Read articles by ${author.name} on the Eazybe blog.`,
    openGraph: {
      title: `${author.name} - Author | Eazybe Blog`,
      description: author.bio || `Read articles by ${author.name} on the Eazybe blog.`,
      images: author.image ? [{ url: author.image }] : undefined,
    },
    alternates: getAlternates(locale, `/blog/authors/${slug}`),
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const author = await getAuthorBySlug(slug, locale)

  if (!author) {
    notFound()
  }

  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const authorsLabel: Record<string, string> = {
    en: 'authors',
    br: 'autores',
    es: 'autores',
    tr: 'yazarlar',
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "blog",
        "item": `https://eazybe.com${localePrefix}/blog`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": authorsLabel[locale] || 'authors',
        "item": `https://eazybe.com${localePrefix}/blog/authors`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": slug,
        "item": `https://eazybe.com${localePrefix}/blog/authors/${slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AuthorProfileClient author={author} locale={locale} />
    </>
  )
}
