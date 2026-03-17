import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getLandingPage } from '@/lib/sanity-queries'
import { getHomepageMetadata, getHomepageJsonLd } from '@/data/homepage-seo'
import { SectionRenderer } from '@/components/SectionRenderer'

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

  // Server-side data fetching — no useEffect, no loading spinner
  const landingPage = await getLandingPage().catch(() => null)

  // Get JSON-LD schemas for this locale
  const jsonLdSchemas = getHomepageJsonLd(locale)

  return (
    <>
      {/* JSON-LD schemas rendered server-side in HTML */}
      {jsonLdSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Render sections from Sanity CMS data */}
      <main>
        {landingPage?.sections
          ?.filter((section: any) => section._type !== 'securitySection' && section._type !== 'ctaSection')
          .map((section: any) => (
            <SectionRenderer key={section._key} section={section} />
          ))}
      </main>
    </>
  )
}
