import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getAuthors } from '@/lib/sanity-queries'
import { getAlternates } from '@/lib/seo-helpers'
import { AuthorsListClient } from '@/components/pages/AuthorsListClient'

// Revalidate every 10 seconds to pick up Sanity CMS changes
export const revalidate = 10

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Our Authors | Eazybe Blog',
    description: 'Meet the experts behind Eazybe blog. Our authors share insights on WhatsApp CRM, sales automation, AI agents, and productivity tips.',
    alternates: getAlternates(locale, '/blog/authors'),
  }
}

export default async function AuthorsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const authors = await getAuthors(locale)

  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const authorsLabel: Record<string, string> = { en: 'authors', br: 'autores', es: 'autores', tr: 'yazarlar' }
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
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AuthorsListClient authors={authors || []} locale={locale} />
    </>
  )
}
