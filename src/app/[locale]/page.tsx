import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getHomepageMetadata, getHomepageJsonLd } from '@/data/homepage-seo'
import { HomePageClient } from '@/components/pages/HomePageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return getHomepageMetadata(locale)
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const jsonLdSchemas = getHomepageJsonLd(locale)

  return (
    <>
      {jsonLdSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomePageClient />
    </>
  )
}
