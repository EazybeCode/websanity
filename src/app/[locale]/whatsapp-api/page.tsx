import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryIndex } from '@/lib/sanity-queries'
import CategoryIndexClient from '@/components/pages/CategoryIndexClient'

// ─── Metadata ────────────────────────────────────────────────────────────────

const sanityLangMap: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const language = sanityLangMap[locale] || 'en'
  const data = await getCategoryIndex('whatsapp-api', language)

  return {
    title: data?.metaTitle || 'WhatsApp API Features | Eazybe',
    description: data?.metaDescription || 'Explore WhatsApp API features by Eazybe including templates, broadcasts, and automation tools.',
    openGraph: {
      title: data?.metaTitle || 'WhatsApp API Features | Eazybe',
      description: data?.metaDescription || 'Explore WhatsApp API features by Eazybe.',
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: {
      canonical: `https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/whatsapp-api`,
    },
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function WhatsAppApiIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const language = sanityLangMap[locale] || 'en'
  const data = await getCategoryIndex('whatsapp-api', language)

  return <CategoryIndexClient data={data} category="whatsapp-api" />
}
