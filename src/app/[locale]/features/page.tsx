import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryIndex } from '@/lib/sanity-queries'
import CategoryIndexClient from '@/components/pages/CategoryIndexClient'

export const dynamic = 'force-dynamic'

// ─── Metadata ────────────────────────────────────────────────────────────────

const sanityLangMap: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const language = sanityLangMap[locale] || 'en'
  const data = await getCategoryIndex('features', language)

  return {
    title: data?.metaTitle || 'WhatsApp Features | Eazybe',
    description: data?.metaDescription || 'Explore all WhatsApp productivity features by Eazybe including cloud backup, team inbox, CRM integration, quick replies, and more.',
    openGraph: {
      title: data?.metaTitle || 'WhatsApp Features | Eazybe',
      description: data?.metaDescription || 'Explore all WhatsApp productivity features by Eazybe.',
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: {
      canonical: `https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/features`,
    },
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function FeaturesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const language = sanityLangMap[locale] || 'en'
  const data = await getCategoryIndex('features', language)

  return <CategoryIndexClient data={data} category="feature" />
}
