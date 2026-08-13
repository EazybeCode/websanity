import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { GetStartedFormClient } from '@/components/pages/GetStartedFormClient'
import { getCanonicalOnly } from '@/lib/seo-helpers'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Install Eazybe from the HubSpot App Marketplace | Eazybe',
    description:
      'You found Eazybe on the HubSpot App Marketplace. Enter your details and we\'ll take you straight to the Chrome extension so you can start sending WhatsApp messages from inside HubSpot.',
    // Lead/signup landing page — keep it out of the index so it doesn't
    // compete with the main /hubspot-whatsapp-integration content page;
    // still let links pass.
    robots: { index: false, follow: true },
    alternates: getCanonicalOnly(locale, '/hubspot-marketplace'),
  }
}

export default async function HubspotMarketplacePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <GetStartedFormClient variant="marketplace" pageSlug="hubspot-marketplace" />
}
