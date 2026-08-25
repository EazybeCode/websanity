import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { WA_PRICING_PATH_BY_LOCALE } from '@/data/whatsapp-pricing-content'
import { WhatsappPricingPage, buildWaPricingMetadata } from '@/components/pages/WhatsappPricingPage'

// Turkish slug of the WhatsApp pricing calculator. Each locale has its own
// translated slug (WA_PRICING_PATH_BY_LOCALE); requesting this slug under any
// other locale redirects to that locale's URL.
const PAGE_LOCALE = 'tr'

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
  if (locale !== PAGE_LOCALE) return {}
  return buildWaPricingMetadata(PAGE_LOCALE)
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== PAGE_LOCALE) {
    permanentRedirect(WA_PRICING_PATH_BY_LOCALE[locale] ?? WA_PRICING_PATH_BY_LOCALE.en)
  }
  setRequestLocale(locale)
  return <WhatsappPricingPage locale={PAGE_LOCALE} />
}
