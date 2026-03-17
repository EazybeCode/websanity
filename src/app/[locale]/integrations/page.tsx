import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryIndex } from '@/lib/sanity-queries'
import CategoryIndexClient from '@/components/pages/CategoryIndexClient'

export const revalidate = 3600

// ─── Metadata ────────────────────────────────────────────────────────────────

const sanityLangMap: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const language = sanityLangMap[locale] || 'en'
  const data = await getCategoryIndex('integrations', language)

  return {
    title: data?.metaTitle || 'WhatsApp CRM Integrations | Connect CRM With Business Tools',
    description: data?.metaDescription || 'Connect WhatsApp with HubSpot, Zoho, Salesforce, Google Sheets and more using Eazybe. Sync chats, automate workflows, and manage customer conversations.',
    openGraph: {
      title: data?.metaTitle || 'WhatsApp CRM Integrations | Eazybe',
      description: data?.metaDescription || 'Connect WhatsApp with your CRM using Eazybe.',
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: {
      canonical: `https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/integrations`,
    },
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function IntegrationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const language = sanityLangMap[locale] || 'en'
  const data = await getCategoryIndex('integrations', language)

  return <CategoryIndexClient data={data} category="integration" />
}
