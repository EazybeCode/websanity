import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCoexistence } from '@/lib/sanity-queries'
import { CoexistencePageClient } from '@/components/pages/CoexistencePageClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const data = await getCoexistence(locale)

  const seo = data?.seo

  return {
    title: seo?.metaTitle || 'WhatsApp API Coexistence - Use WhatsApp App + API Together | Eazybe',
    description:
      seo?.metaDescription ||
      'Use WhatsApp Business App and WhatsApp API together with Eazybe Coexistence. Get bulk broadcasting, CRM integration, and app access - all without number bans.',
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || 'WhatsApp API Coexistence | Eazybe',
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        'Use WhatsApp Business App and WhatsApp API together with Eazybe Coexistence.',
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
  }
}

export default async function CoexistencePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const data = await getCoexistence(locale)

  return <CoexistencePageClient data={data} />
}
