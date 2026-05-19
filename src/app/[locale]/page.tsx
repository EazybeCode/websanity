import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getHomepageMetadata, getHomepageJsonLd } from '@/data/homepage-seo'
import { LandingPage } from '@/components/landing/LandingPage'
import { routing } from '@/i18n/routing'

// Pure SSG: the page is fully prerendered for every locale at build time
// and served from CDN cache thereafter. There's no runtime data on this
// page (translations + SEO helpers are static), so ISR was unnecessary —
// copy edits ship via a rebuild instead of a 30s background regeneration.
export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

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

      <LandingPage />
    </>
  )
}
