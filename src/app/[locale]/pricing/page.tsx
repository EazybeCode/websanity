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

  return {
    title: seo?.metaTitle || 'Pricing - Eazybe',
    description:
      seo?.metaDescription ||
      'Simple, transparent pricing for WhatsApp CRM integration. Start free, scale as you grow.',
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || 'Pricing - Eazybe',
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

  return <PricingPageClient pricingData={pricingData} />
}
