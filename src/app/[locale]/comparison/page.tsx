import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ComparisonPageClient } from '@/components/pages/ComparisonPageClient'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Comparison',
    pt: 'Eazybe vs Wati vs Interakt vs QuickReply - Comparacao WhatsApp CRM',
    es: 'Eazybe vs Wati vs Interakt vs QuickReply - Comparacion WhatsApp CRM',
    tr: 'Eazybe vs Wati vs Interakt vs QuickReply - WhatsApp CRM Karsilastirma',
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
  }
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ComparisonPageClient />
}
