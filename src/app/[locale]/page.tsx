import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getLandingPage } from '@/lib/sanity-queries'
import { getHomepageMetadata, getHomepageJsonLd } from '@/data/homepage-seo'
import { fallbackSections } from '@/data/homepage-fallback'
import { SectionRenderer } from '@/components/SectionRenderer'
import { routing } from '@/i18n/routing'

// ISR: prerender one page per locale at build time and refresh from Sanity
// every 30 seconds. Without `generateStaticParams` the route stays dynamic,
// which forces Next.js to emit `Cache-Control: no-store` and prevents any
// CDN caching.
export const revalidate = 30

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

  const landingPage = await getLandingPage()

  // Use Sanity data if available, otherwise use static fallback
  const sections =
    landingPage?.sections?.length
      ? landingPage.sections.filter(
          (section: any) =>
            section._type !== 'securitySection' &&
            section._type !== 'ctaSection',
        )
      : fallbackSections

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

      <main>
        {sections.map((section: any) => (
          <SectionRenderer key={section._key} section={section} />
        ))}
      </main>
    </>
  )
}
