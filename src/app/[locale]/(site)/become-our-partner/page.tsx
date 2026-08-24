import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PartnerPageClient } from '@/components/pages/PartnerPageClient'
import { getAlternates } from '@/lib/seo-helpers'
import { getPartners } from '@/lib/sanity-queries'
import { PARTNERS, type PartnerRecord } from '@/data/partner-directory'

// Partner directory content is managed in Sanity ("Current Partners at
// Eazybe") — re-render at most once a minute so CMS edits go live on
// their own without a redeploy.
export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // Keys must match the routing locales in src/i18n/routing.ts (en | br | es | tr).
  // This map previously used `pt`, which never matched, so /br silently fell back
  // to the English title and description.
  const titles: Record<string, string> = {
    en: 'Become Our Partner - Earn Up to 30% Revenue Share | Eazybe',
    br: 'Torne-se Nosso Parceiro - Ganhe Até 30% de Receita | Eazybe',
    es: 'Sea Nuestro Socio - Gane Hasta 30% de Ingresos | Eazybe',
    tr: 'Ortağımız Olun - %30\'a Kadar Gelir Payı Kazanın | Eazybe',
  }

  const descriptions: Record<string, string> = {
    en: 'Partner with #1 Sales Intelligence Platform. Earn up to 30% revenue share as an affiliate, growth or premier champion partner. Free to join, 24-hour approval.',
    br: 'Seja parceiro da Plataforma de Sales Intelligence #1. Ganhe até 30% de receita como parceiro Affiliate, Growth ou Premier Champion. Grátis, aprovação em 24h.',
    es: 'Asóciese con la Plataforma de Sales Intelligence #1. Gane hasta un 30% de ingresos como socio Affiliate, Growth o Premier Champion. Gratis, aprobación en 24h.',
    tr: '#1 Sales Intelligence Platformu ile ortak olun. Affiliate, Growth veya Premier Champion ortağı olarak %30\'a kadar gelir payı kazanın. Ücretsiz, 24 saatte onay.',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    alternates: getAlternates(locale, '/become-our-partner'),
  }
}

const SITE_URL = 'https://eazybe.com'

const breadcrumbLabels: Record<string, string> = {
  en: 'Become Our Partner',
  br: 'Torne-se Nosso Parceiro',
  es: 'Sea Nuestro Socio',
  tr: 'Ortağımız Olun',
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const pageUrl = `${SITE_URL}${localePrefix}/become-our-partner`

  // FAQPage schema — pulled per-locale from the messages file so the schema
  // stays in sync with the FAQ content rendered by PartnerPageClient.
  const t = await getTranslations({ locale, namespace: 'partner' })
  const partnerFaqs = t.raw('faqs') as Array<{ question: string; answer: string }>
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: partnerFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Eazybe', item: `${SITE_URL}${localePrefix}/` },
      { '@type': 'ListItem', position: 2, name: breadcrumbLabels[locale] || breadcrumbLabels.en, item: pageUrl },
    ],
  }

  const schemas = [breadcrumbSchema, faqSchema]

  // Directory cards come from Sanity; an empty list simply hides the section
  // (that's the editors' off switch). getPartners returns null only when the
  // CMS is unreachable — fall back to the static list so the page still builds.
  const partners: PartnerRecord[] = (await getPartners(locale)) ?? PARTNERS

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PartnerPageClient partners={partners} />
    </>
  )
}
