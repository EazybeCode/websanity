import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryIndex } from '@/lib/sanity-queries'
import CategoryIndexClient from '@/components/pages/CategoryIndexClient'
import { getAlternates, buildFaqPageSchema } from '@/lib/seo-helpers'

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
    alternates: getAlternates(locale, '/whatsapp-api'),
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    themeColor: '#020617',
    other: {
      'X-UA-Compatible': 'IE=edge',
      bingbot: 'index, follow',
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
  const rawData = await getCategoryIndex('whatsapp-api', language)

  // Mirrors /features and /integrations: hero CTAs are authoritative in
  // code so they always trigger the global trial / demo modals (via the
  // `#trial` / `#demo` URL convention CategoryIndexClient understands),
  // with localized labels matching the rest of the site.
  const heroCtaLabels: Record<string, { install: string; demo: string }> = {
    en: { install: 'Install for Free', demo: 'Book a Demo' },
    es: { install: 'Instalar Gratis', demo: 'Reservar Demo' },
    br: { install: 'Instalar Grátis', demo: 'Agendar Demo' },
    tr: { install: 'Ücretsiz Yükle', demo: 'Demo Rezervasyonu Yap' },
  }
  const ctaLabels = heroCtaLabels[locale] || heroCtaLabels.en

  const data = rawData
    ? {
        ...rawData,
        hero: {
          ...(rawData.hero || {}),
          primaryCta: { label: ctaLabels.install, url: '#trial' },
          secondaryCta: { label: ctaLabels.demo, url: '#demo' },
        },
        // Hide the post-FAQ "Ready to Scale Your WhatsApp Business?" CTA
        // section on /whatsapp-api — the hero CTAs already cover trial /
        // demo conversion; the second block was duplicating intent.
        cta: undefined,
      }
    : rawData

  // Auto-generate FAQPage JSON-LD from the rendered FAQ items.
  const faqSchema = buildFaqPageSchema(data?.faq?.items)

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <CategoryIndexClient data={data} category="whatsapp-api" />
    </>
  )
}
