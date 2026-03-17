import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getFeature } from '@/lib/sanity-queries'
import FeaturePageClient from '@/components/pages/FeaturePageClient'

export const dynamic = 'force-dynamic'

// ─── Metadata ────────────────────────────────────────────────────────────────

const sanityLangMap: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const language = sanityLangMap[locale] || 'en'
  const feature = await getFeature(slug, language)

  if (!feature) return {}

  return {
    title: feature.metaTitle || `${feature.title || slug} | WhatsApp API | Eazybe`,
    description: feature.metaDescription || `Learn about ${feature.title || slug} - a WhatsApp API feature by Eazybe.`,
    openGraph: {
      title: feature.metaTitle || `${feature.title || slug} | WhatsApp API | Eazybe`,
      description: feature.metaDescription || `Learn about ${feature.title || slug} by Eazybe.`,
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: {
      canonical: `https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/whatsapp-api/${slug}`,
    },
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function WhatsAppApiFeaturePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const language = sanityLangMap[locale] || 'en'
  const feature = await getFeature(slug, language)

  // feature can be null — FeaturePageClient will use translation JSON fallback
  return <FeaturePageClient feature={feature} slug={slug} />
}
