import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getAuthorBySlug, getAllAuthorSlugs, getAuthorLanguages } from '@/lib/sanity-queries'
import { getCanonicalUrl, getCanonicalOnly, getHrefLangs } from '@/lib/seo-helpers'
import { AuthorProfileClient } from '@/components/pages/AuthorProfileClient'
import { pageDates, getSanityDocDates, withPageDates } from '@/lib/page-dates'

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

async function baseMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const [author, languages] = await Promise.all([getAuthorBySlug(slug, locale), getAuthorLanguages(slug)])

  if (!author) {
    return { title: 'Author Not Found | Eazybe' }
  }

  // hreflang only for the languages this author page exists in (others 404).
  const path = `/blog/authors/${slug}`
  const urlLocales = [...new Set(languages.map((l) => (l === 'pt-BR' || l === 'pt' ? 'br' : l)))]
  const hrefLangs = getHrefLangs(locale, path)
  const languageLinks = Object.fromEntries(
    Object.entries(hrefLangs).filter(([code]) =>
      code === 'x-default' ? urlLocales.includes('en') : urlLocales.includes(code === 'pt-BR' ? 'br' : code)
    )
  )

  return {
    title: `${author.name} - Author | Eazybe Blog`,
    description: author.bio || `Read articles by ${author.name} on the Eazybe blog.`,
    openGraph: {
      title: `${author.name} - Author | Eazybe Blog`,
      description: author.bio || `Read articles by ${author.name} on the Eazybe blog.`,
      images: author.image ? [{ url: author.image }] : undefined,
    },
    alternates: urlLocales.length > 1
      ? { canonical: getCanonicalUrl(locale, path), languages: languageLinks }
      : getCanonicalOnly(locale, path),
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

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params
  return withPageDates(await baseMetadata(props), pageDates({ template: '/blog/authors/[slug]', doc: await getSanityDocDates('author', locale, slug) }))
}
