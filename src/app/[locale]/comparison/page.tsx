import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ComparisonPageClient } from '@/components/pages/ComparisonPageClient'
import { getAlternates } from '@/lib/seo-helpers'
import { getComparisonPosts } from '@/lib/sanity-queries'

// ISR: revalidate every 10s to pick up Sanity changes
export const revalidate = 10

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Comparison',
    pt: 'Comparação',
    es: 'Comparación',
    tr: 'Karşılaştırmak',
    br: 'Comparação',
  }

  const descriptions: Record<string, string> = {
    en: 'Compare Eazybe with 20+ WhatsApp CRM platforms including Wati, Interakt, QuickReply, Cooby, Timelines, and Rasayel. See features, pricing, and why 30,000+ businesses choose Eazybe.',
    pt: 'Compare o Eazybe com mais de 20 plataformas de WhatsApp CRM incluindo Wati, Interakt, QuickReply, Cooby, Timelines e Rasayel.',
    es: 'Compare Eazybe con mas de 20 plataformas de WhatsApp CRM incluyendo Wati, Interakt, QuickReply, Cooby, Timelines y Rasayel.',
    tr: 'Eazybe\'yi Wati, Interakt, QuickReply, Cooby, Timelines ve Rasayel dahil 20+ WhatsApp CRM platformuyla karsilastirin.',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    alternates: getAlternates(locale, '/comparison'),
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

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  // JSON-LD schemas for comparison page - only BreadcrumbList
  const getSchemas = (locale: string) => {
    if (locale === 'en') {
      return [
        {
          "@context": "https://schema.org/",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "eazybe", "item": "https://eazybe.com/" },
            { "@type": "ListItem", "position": 2, "name": "comparison", "item": "https://eazybe.com/comparison" }
          ]
        }
      ]
    }

    if (locale === 'br') {
      return [
        {
          "@context": "https://schema.org/",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "eazybe", "item": "https://eazybe.com/br" },
            { "@type": "ListItem", "position": 2, "name": "comparação", "item": "https://eazybe.com/br/comparison" }
          ]
        }
      ]
    }

    if (locale === 'es') {
      return [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "eazybe", "item": "https://eazybe.com/es" },
            { "@type": "ListItem", "position": 2, "name": "comparación", "item": "https://eazybe.com/es/comparison" }
          ]
        }
      ]
    }

    if (locale === 'tr') {
      return [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "eazybe", "item": "https://eazybe.com/tr" },
            { "@type": "ListItem", "position": 2, "name": "karşılaştırma", "item": "https://eazybe.com/tr/comparison" }
          ]
        }
      ]
    }

    return null
  }

  const baseSchemas = getSchemas(locale) || []

  // Build FAQPage schema from translated FAQ entries (q1/a1 .. q7/a7)
  const t = await getTranslations({ locale, namespace: 'comparisonHub.faq' })
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [1, 2, 3, 4, 5, 6, 7].map((i) => ({
      "@type": "Question",
      "name": t(`q${i}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`a${i}`),
      },
    })),
  }

  const comparisonSchemas = [...baseSchemas, faqSchema]
  const comparisonPosts = (await getComparisonPosts(locale)) || []

  return (
    <>
      {comparisonSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ComparisonPageClient comparisonPosts={comparisonPosts} locale={locale} />
    </>
  )
}
