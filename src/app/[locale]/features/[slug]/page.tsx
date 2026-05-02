import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getFeature } from '@/lib/sanity-queries'
import FeaturePageClient from '@/components/pages/FeaturePageClient'
import { getAlternates } from '@/lib/seo-helpers'

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

  // The page renders even when the Sanity doc is missing for this locale
  // (FeaturePageClient falls back to translation JSON), so we still need
  // to emit canonical + hreflang for every locale variant — otherwise
  // /es/, /br/, /tr/ feature pages ship with zero SEO tags.
  const fallbackTitle = `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} | Eazybe`
  const fallbackDescription = `Learn about ${slug.replace(/-/g, ' ')} - a powerful WhatsApp productivity feature by Eazybe.`

  return {
    title: feature?.metaTitle || (feature?.title ? `${feature.title} | Eazybe` : fallbackTitle),
    description: feature?.metaDescription || (feature?.title ? `Learn about ${feature.title} - a powerful WhatsApp productivity feature by Eazybe.` : fallbackDescription),
    openGraph: {
      title: feature?.metaTitle || (feature?.title ? `${feature.title} | Eazybe` : fallbackTitle),
      description: feature?.metaDescription || (feature?.title ? `Learn about ${feature.title} by Eazybe.` : fallbackDescription),
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: getAlternates(locale, `/features/${slug}`),
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const language = sanityLangMap[locale] || 'en'
  const feature = await getFeature(slug, language)

  // Hide the post-FAQ CTA block on /features/cloud-backup — the hero CTA
  // already covers trial / demo conversion; the secondary block was
  // duplicating intent. Other feature pages keep their CTA section.
  const featureData =
    feature && slug === 'cloud-backup' ? { ...feature, cta: undefined } : feature

  // feature can be null — FeaturePageClient will use translation JSON fallback
  return <FeaturePageClient feature={featureData} slug={slug} />
}
