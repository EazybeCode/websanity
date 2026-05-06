import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getFeature } from '@/lib/sanity-queries'
import FeaturePageClient from '@/components/pages/FeaturePageClient'
import { getAlternates, buildFaqPageSchema } from '@/lib/seo-helpers'

// ─── Metadata ────────────────────────────────────────────────────────────────

const sanityLangMap: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

const featureKeyMap: Record<string, string> = {
  'whatsapp-api': 'whatsappApi',
  'coexistence': 'coexistence',
  'templates': 'templates',
  'broadcast': 'broadcast',
}

const breadcrumbLabels: Record<string, { home: string; whatsappApi: string }> = {
  en: { home: 'Home', whatsappApi: 'WhatsApp API' },
  br: { home: 'Início', whatsappApi: 'WhatsApp API' },
  es: { home: 'Inicio', whatsappApi: 'WhatsApp API' },
  tr: { home: 'Ana Sayfa', whatsappApi: 'WhatsApp API' },
}

const SITE_URL = 'https://eazybe.com'

const titleCase = (s: string) =>
  s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

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
  // /es/, /br/, /tr/ whatsapp-api pages ship with zero SEO tags.
  const fallbackTitle = `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} | WhatsApp API | Eazybe`
  const fallbackDescription = `Learn about ${slug.replace(/-/g, ' ')} - a WhatsApp API feature by Eazybe.`

  return {
    title: feature?.metaTitle || (feature?.title ? `${feature.title} | WhatsApp API | Eazybe` : fallbackTitle),
    description: feature?.metaDescription || (feature?.title ? `Learn about ${feature.title} - a WhatsApp API feature by Eazybe.` : fallbackDescription),
    openGraph: {
      title: feature?.metaTitle || (feature?.title ? `${feature.title} | WhatsApp API | Eazybe` : fallbackTitle),
      description: feature?.metaDescription || (feature?.title ? `Learn about ${feature.title} by Eazybe.` : fallbackDescription),
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: getAlternates(locale, `/whatsapp-api/${slug}`),
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

  // FAQPage + BreadcrumbList JSON-LD, server-rendered. Prefer Sanity FAQ
  // items, fall back to translation JSON used by FeaturePageClient.
  let faqItems: Array<{ question: string; answer: string }> | null =
    feature?.faq?.items?.length ? feature.faq.items : null
  if (!faqItems) {
    const featureKey = featureKeyMap[slug]
    if (featureKey) {
      try {
        const t = await getTranslations({ locale, namespace: `features.${featureKey}.faq` })
        const items = t.raw('items') as Array<{ question: string; answer: string }>
        if (Array.isArray(items) && items.length > 0) faqItems = items
      } catch {
        /* skip FAQ schema if no items */
      }
    }
  }
  const faqSchema = buildFaqPageSchema(faqItems)

  const labels = breadcrumbLabels[locale] || breadcrumbLabels.en
  const localePath = locale === 'en' ? '' : `/${locale}`
  const featureName = feature?.title || titleCase(slug)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.home, item: `${SITE_URL}${localePath}/` },
      { '@type': 'ListItem', position: 2, name: labels.whatsappApi, item: `${SITE_URL}${localePath}/whatsapp-api` },
      { '@type': 'ListItem', position: 3, name: featureName, item: `${SITE_URL}${localePath}/whatsapp-api/${slug}` },
    ],
  }

  // feature can be null — FeaturePageClient will use translation JSON fallback
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
      <FeaturePageClient feature={feature} slug={slug} />
    </>
  )
}
