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
  const data = await getCategoryIndex('features', language)

  const title =
    locale === 'en'
      ? 'Features'
      : locale === 'br'
        ? 'Características'
        : locale === 'es'
          ? 'Características'
          : locale === 'tr'
            ? 'Özellikler'
            : (data?.metaTitle || 'WhatsApp Features | Eazybe')

  return {
    title,
    description: data?.metaDescription || 'Explore all WhatsApp productivity features by Eazybe including cloud backup, team inbox, CRM integration, quick replies, and more.',
    openGraph: {
      title,
      description: data?.metaDescription || 'Explore all WhatsApp productivity features by Eazybe.',
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: getAlternates(locale, '/features'),
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

  // JSON-LD schemas for features page - only BreadcrumbList
  const getSchemas = (locale: string) => {
    if (locale === 'en') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'eazybe', 'item': 'https://eazybe.com/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'features', 'item': 'https://eazybe.com/features' }
          ]
        }
      ]
    }

    if (locale === 'br') {
      return [
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'eazybe', 'item': 'https://eazybe.com/br' },
            { '@type': 'ListItem', 'position': 2, 'name': 'características', 'item': 'https://eazybe.com/br/features' }
          ]
        }
      ]
    }

    if (locale === 'es') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'eazybe', 'item': 'https://eazybe.com/es' },
            { '@type': 'ListItem', 'position': 2, 'name': 'características', 'item': 'https://eazybe.com/es/features' }
          ]
        }
      ]
    }

    if (locale === 'tr') {
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'eazybe', 'item': 'https://eazybe.com/tr' },
            { '@type': 'ListItem', 'position': 2, 'name': 'özellikler', 'item': 'https://eazybe.com/tr/features' }
          ]
        }
      ]
    }

    return null
  }

  const featureSchemas = getSchemas(locale)
  // Auto-generate FAQPage JSON-LD from the rendered FAQ items.
  const faqSchema = buildFaqPageSchema(data?.faq?.items)

  return (
    <>
      {featureSchemas &&
        featureSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <CategoryIndexClient data={data} category="feature" />
    </>
  )
}
