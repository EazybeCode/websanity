import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getProduct } from '@/lib/sanity-queries'
import { routing } from '@/i18n/routing'
import ProductPageClient from '@/components/pages/ProductPageClient'
import { getAlternates } from '@/lib/seo-helpers'
import { HubSpotStructuredData } from '@/components/seo/HubSpotStructuredData'
import { Fragment } from 'react'

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

  const baseMetadata = {
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

  // Additional meta tags for HubSpot integration page
  if (crmSlug === 'hubspot') {
    return {
      ...baseMetadata,
      title: 'HubSpot WhatsApp Integration: Sync WhatsApp With AI Agents',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'HubSpot WhatsApp integration, WhatsApp HubSpot CRM, sync WhatsApp with HubSpot, HubSpot WhatsApp automation, WhatsApp CRM HubSpot, AI agents HubSpot WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/hubspot-whatsapp-integration',
        title: 'HubSpot WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with HubSpot CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside HubSpot.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Eazybe HubSpot WhatsApp Integration Platform',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'HubSpot WhatsApp Integration | Sync CRM With WhatsApp',
        description: 'Automatically sync WhatsApp chats with HubSpot CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-02-03T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'HubSpot WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'HubSpot WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'HubSpot users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to HubSpot, best HubSpot WhatsApp integration, sync WhatsApp with HubSpot CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'HubSpot automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside HubSpot',
        'user-problem': 'HubSpot not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to HubSpot synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside HubSpot',
        'use-case': 'sales teams syncing WhatsApp conversations with HubSpot CRM automatically',
        'implementation-difficulty': 'easy, one-click HubSpot integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Zoho integration page (English only)
  if (crmSlug === 'zoho' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Zoho WhatsApp Integration: Sync WhatsApp With AI Agents',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Zoho WhatsApp integration, WhatsApp Zoho CRM, sync WhatsApp with Zoho, Zoho WhatsApp automation, WhatsApp CRM Zoho, AI agents Zoho WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/zoho-whatsapp-integration',
        title: 'Zoho WhatsApp Integration: Sync WhatsApp With AI Agents',
        description: 'Sync WhatsApp with Zoho CRM automatically. Track deals, use AI agents, manage chats, and improve sales productivity directly inside Zoho.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Eazybe Zoho WhatsApp Integration Platform',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Zoho WhatsApp Integration: Sync WhatsApp With AI Agents',
        description: 'Automatically sync WhatsApp chats with Zoho CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Zoho WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Zoho WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Zoho users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Zoho, best Zoho WhatsApp integration, sync WhatsApp with Zoho CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Zoho automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside Zoho',
        'user-problem': 'Zoho not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to Zoho synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Zoho',
        'use-case': 'sales teams syncing WhatsApp conversations with Zoho CRM automatically',
        'implementation-difficulty': 'easy, one-click Zoho integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  return baseMetadata
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

  return (
    <>
      {crmSlug === 'hubspot' && <HubSpotStructuredData />}
      <ProductPageClient product={product} crmSlug={crmSlug} />
    </>
  )
}
