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
    title: 'Connect HubSpot to WhatsApp | Eazybe',
    description:
      'Two-way sync between HubSpot and WhatsApp. Message customers, auto-log every chat to the right contact, and keep your pipeline current. Get set up in minutes.',
    // Lead/signup page — keep it out of the index so it doesn't compete with the
    // main /hubspot-whatsapp-integration content page; still let links pass.
    robots: { index: false, follow: true },
    alternates: getCanonicalOnly(locale, '/hubspot-marketplace-form'),
  }
}

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <GetStartedFormClient />
}
