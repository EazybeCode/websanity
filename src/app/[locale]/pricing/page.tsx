import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPricing } from '@/lib/sanity-queries'
import { PricingPageClient } from '@/components/pages/PricingPageClient'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const pricingData = await getPricing(locale)

  const seo = pricingData?.seo

  // Set title for locales
  const title =
    locale === 'en'
      ? 'Pricing'
      : locale === 'br'
        ? 'Preços'
        : locale === 'es'
          ? 'Precios'
          : locale === 'tr'
            ? 'fiyatlandırma'
            : (seo?.metaTitle || 'Pricing - Eazybe')

  return {
    title,
    description:
      seo?.metaDescription ||
      'Simple, transparent pricing for WhatsApp CRM integration. Start free, scale as you grow.',
    openGraph: {
      title,
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        'Simple, transparent pricing for WhatsApp CRM integration.',
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
    alternates: getAlternates(locale, '/pricing'),
  }
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const pricingData = await getPricing(locale)

  // JSON-LD schemas for pricing page - only BreadcrumbList
  const getSchemas = (locale: string) => {
    if (locale === 'en') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/' },
            { '@type': 'ListItem', position: 2, name: 'pricing', item: 'https://eazybe.com/pricing' },
          ],
        },
      ]
    }

    if (locale === 'br') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/br' },
            { '@type': 'ListItem', position: 2, name: 'Preços', item: 'https://eazybe.com/br/pricing' },
          ],
        },
      ]
    }

    if (locale === 'es') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/es' },
            { '@type': 'ListItem', position: 2, name: 'Precios', item: 'https://eazybe.com/es/pricing' },
          ],
        },
      ]
    }

    if (locale === 'tr') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/tr' },
            { '@type': 'ListItem', position: 2, name: 'fiyatlandırma', item: 'https://eazybe.com/tr/pricing' },
          ],
        },
      ]
    }

    return null
  }

  const pricingSchemas = getSchemas(locale)

  return (
    <>
      {/* Render JSON-LD schemas for English locale */}
      {pricingSchemas &&
        pricingSchemas.map((schema, index) => (
          <script
            key={`pricing-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <PricingPageClient pricingData={pricingData} />
    </>
  )
}
