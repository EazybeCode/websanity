import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCoexistence } from '@/lib/sanity-queries'
import { CoexistencePageClient } from '@/components/pages/CoexistencePageClient'
import { getAlternates, buildFaqPageSchema } from '@/lib/seo-helpers'

const breadcrumbLabels: Record<string, { home: string; whatsappApi: string; coexistence: string }> = {
  en: { home: 'Home', whatsappApi: 'WhatsApp API', coexistence: 'Coexistence' },
  br: { home: 'Início', whatsappApi: 'WhatsApp API', coexistence: 'Coexistência' },
  es: { home: 'Inicio', whatsappApi: 'WhatsApp API', coexistence: 'Coexistencia' },
  tr: { home: 'Ana Sayfa', whatsappApi: 'WhatsApp API', coexistence: 'Bir Arada Yaşam' },
}

const SITE_URL = 'https://eazybe.com'

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
    alternates: getAlternates(locale, '/whatsapp-api/coexistence'),
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

  // FAQPage + BreadcrumbList JSON-LD, server-rendered. FAQ items come
  // from Sanity (auto-translated by getCoexistence's pipeline for non-EN
  // locales, so the schema text matches what's on the page).
  const faqSchema = buildFaqPageSchema(data?.faq?.items)

  const labels = breadcrumbLabels[locale] || breadcrumbLabels.en
  const localePath = locale === 'en' ? '' : `/${locale}`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.home, item: `${SITE_URL}${localePath}/` },
      { '@type': 'ListItem', position: 2, name: labels.whatsappApi, item: `${SITE_URL}${localePath}/whatsapp-api` },
      { '@type': 'ListItem', position: 3, name: labels.coexistence, item: `${SITE_URL}${localePath}/whatsapp-api/coexistence` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <CoexistencePageClient data={data} />
    </>
  )
}
