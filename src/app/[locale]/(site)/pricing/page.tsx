import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPricing } from '@/lib/sanity-queries'
import { PricingPageClient } from '@/components/pages/PricingPageClient'
import { getAlternates } from '@/lib/seo-helpers'

// ISR: refresh Sanity pricing content every 30 seconds.
export const revalidate = 30

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const pricingData = await getPricing(locale)

  const seo = pricingData?.seo

  // SERP-friendly titles per locale. Authoritative in code across all
  // locales so the SEO titles can't drift from editor-made changes in
  // Sanity. ~54-57 characters each, within SERP truncation limits.
  // Plan names match each locale's pricing cards (the Omnis plan was retired).
  const titlesByLocale: Record<string, string> = {
    en: 'WhatsApp CRM Pricing: Starter, Scaler & AI Plans | Eazybe',
    es: 'Precios de WhatsApp CRM: Inicial, Escala y planes IA | Eazybe',
    br: 'Preços do WhatsApp CRM: Inicial, Escala e planos IA | Eazybe',
    tr: 'WhatsApp CRM Fiyatları: Başlangıç, Büyüme, Yapay Zeka | Eazybe',
  }
  const title = titlesByLocale[locale] || titlesByLocale.en
  // Also authoritative in code: the Sanity pricing seo text still described Omnis
  // and was served in English on every locale.
  const descriptionsByLocale: Record<string, string> = {
    en: 'Eazybe pricing: Starter and Scaler plans for WhatsApp CRM sync, plus Basic AI and Custom AI agent plans. 4-day free trial, no credit card required.',
    es: 'Precios de Eazybe: planes Inicial y Escala para sincronizar WhatsApp con tu CRM, más los planes IA Básica e IA Personalizada. Prueba gratis de 4 días.',
    br: 'Preços da Eazybe: planos Inicial e Escala para sincronizar o WhatsApp com seu CRM, além dos planos IA Básica e IA Personalizada. Teste grátis de 4 dias.',
    tr: 'Eazybe fiyatları: WhatsApp-CRM senkronizasyonu için Başlangıç ve Büyüme planları, ayrıca Temel ve Özel Yapay Zeka planları. 4 günlük ücretsiz deneme.',
  }
  const description = descriptionsByLocale[locale] || descriptionsByLocale.en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
    alternates: getAlternates(locale, '/pricing'),
  }
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const pricingData = await getPricing(locale)

  // JSON-LD schemas for pricing page - only BreadcrumbList
  const getSchemas = (locale: string) => {
    if (locale === 'en') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/' },
            { '@type': 'ListItem', position: 2, name: 'pricing', item: 'https://eazybe.com/pricing' },
          ],
        },
      ]
    }

    if (locale === 'br') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/br' },
            { '@type': 'ListItem', position: 2, name: 'Preços', item: 'https://eazybe.com/br/pricing' },
          ],
        },
      ]
    }

    if (locale === 'es') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/es' },
            { '@type': 'ListItem', position: 2, name: 'Precios', item: 'https://eazybe.com/es/pricing' },
          ],
        },
      ]
    }

    if (locale === 'tr') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'eazybe', item: 'https://eazybe.com/tr' },
            { '@type': 'ListItem', position: 2, name: 'fiyatlandırma', item: 'https://eazybe.com/tr/pricing' },
          ],
        },
      ]
    }

    return null
  }

  const pricingSchemas = getSchemas(locale)

  return (
    <>
      {/* Preconnect the pricing APIs the client-side useDynamicPricing hook
          calls, so DNS + TLS complete while the HTML is still streaming.
          Saves ~200-300 ms on the visible price rendering. */}
      <link rel="preconnect" href="https://cerberus.eazybe.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cerberus.eazybe.com" />
      {/* Render JSON-LD schemas for English locale */}
      {pricingSchemas &&
        pricingSchemas.map((schema, index) => (
          <script
            key={`pricing-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <PricingPageClient pricingData={pricingData} />
    </>
  )
}
