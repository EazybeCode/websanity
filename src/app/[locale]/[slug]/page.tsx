import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getProduct } from '@/lib/sanity-queries'
import { routing } from '@/i18n/routing'
import ProductPageClient from '@/components/pages/ProductPageClient'
import { getAlternates } from '@/lib/seo-helpers'

// ─── Integration slug mapping ────────────────────────────────────────────────

const INTEGRATION_SLUGS = [
  'hubspot',
  'salesforce',
  'zoho',
  'bitrix24',
  'leadsquared',
  'freshdesk',
  'pipedrive',
  'monday',
  'google-sheets',
  'google-calendar',
  'webhooks',
] as const

/**
 * Extract the CRM slug from a URL slug like "hubspot-whatsapp-integration".
 * Returns null if the slug doesn't match the integration pattern.
 */
function extractCrmSlug(slug: string): string | null {
  if (!slug.endsWith('-whatsapp-integration')) return null
  const crmPart = slug.replace('-whatsapp-integration', '')
  if ((INTEGRATION_SLUGS as readonly string[]).includes(crmPart)) {
    return crmPart
  }
  return null
}

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = []
  for (const locale of routing.locales) {
    for (const crm of INTEGRATION_SLUGS) {
      params.push({ locale, slug: `${crm}-whatsapp-integration` })
    }
  }
  return params
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const crmSlug = extractCrmSlug(slug)
  if (!crmSlug) return {}

  const product = await getProduct(slug, locale)

  const crmNameMap: Record<string, string> = {
    hubspot: 'HubSpot', salesforce: 'Salesforce', zoho: 'Zoho', bitrix24: 'Bitrix24',
    leadsquared: 'LeadSquared', freshdesk: 'Freshdesk', pipedrive: 'Pipedrive',
    monday: 'Monday.com', 'google-sheets': 'Google Sheets', 'google-calendar': 'Google Calendar',
    webhooks: 'Webhooks'
  }
  const crmName = crmNameMap[crmSlug] || crmSlug

  return {
    title: product?.metaTitle || `${crmName} WhatsApp Integration | Eazybe`,
    description: product?.metaDescription || `Connect ${crmName} with WhatsApp using Eazybe. Auto-sync chats, update deals, and manage customer conversations.`,
    openGraph: {
      title: product?.metaTitle || `${crmName} WhatsApp Integration | Eazybe`,
      description: product?.metaDescription || `Connect ${crmName} with WhatsApp using Eazybe.`,
      type: 'website',
      siteName: 'Eazybe',
    },
    alternates: getAlternates(locale, `/${slug}`),
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const crmSlug = extractCrmSlug(slug)
  if (!crmSlug) {
    notFound()
  }

  const product = await getProduct(slug, locale)

  return <ProductPageClient product={product} crmSlug={crmSlug} />
}
