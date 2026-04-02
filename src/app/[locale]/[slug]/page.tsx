import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getProduct } from '@/lib/sanity-queries'
import { routing } from '@/i18n/routing'
import ProductPageClient from '@/components/pages/ProductPageClient'
import { getAlternates } from '@/lib/seo-helpers'
import { HubSpotStructuredData } from '@/components/seo/HubSpotStructuredData'
import { HubSpotStructuredDataBr } from '@/components/seo/HubSpotStructuredDataBr'
import { ZohoStructuredData } from '@/components/seo/ZohoStructuredData'
import { Bitrix24StructuredData } from '@/components/seo/Bitrix24StructuredData'
import { GoogleSheetsStructuredData } from '@/components/seo/GoogleSheetsStructuredData'
import { GoogleCalendarStructuredData } from '@/components/seo/GoogleCalendarStructuredData'
import { MondayStructuredData } from '@/components/seo/MondayStructuredData'
import { PipedriveStructuredData } from '@/components/seo/PipedriveStructuredData'
import { SalesforceStructuredData } from '@/components/seo/SalesforceStructuredData'
import { LeadSquaredStructuredData } from '@/components/seo/LeadSquaredStructuredData'
import { FreshdeskStructuredData } from '@/components/seo/FreshdeskStructuredData'
import { WebhooksStructuredData } from '@/components/seo/WebhooksStructuredData'
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

  // Additional meta tags for HubSpot integration page (English only)
  if (crmSlug === 'hubspot' && locale === 'en') {
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

  // Additional meta tags for HubSpot integration page (Portuguese/Brazil only)
  if (crmSlug === 'hubspot' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração HubSpot WhatsApp: HubSpot integrado ao WhatsApp',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração WhatsApp HubSpot, HubSpot WhatsApp integração, WhatsApp HubSpot CRM, sincronizar WhatsApp com HubSpot, automação WhatsApp HubSpot, CRM WhatsApp HubSpot, agentes de IA WhatsApp HubSpot',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/hubspot-whatsapp-integration',
        title: 'HubSpot WhatsApp Integration | Sincronize CRM do WhatsApp',
        description: 'Conecte WhatsApp ao HubSpot CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do HubSpot.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração WhatsApp com HubSpot CRM - Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'HubSpot WhatsApp Integration | Sincronize CRM do WhatsApp',
        description: 'Conecte WhatsApp ao HubSpot CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do HubSpot.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-02-03T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Integração WhatsApp HubSpot',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração WhatsApp HubSpot CRM da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'como-fazer, informações-do-produto, comparação-de-recursos',
        'target-audience': 'usuários do HubSpot, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B',
        'content-intent': 'investigação-comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao HubSpot, melhor integração WhatsApp HubSpot, sincronizar WhatsApp com HubSpot CRM',
        'ai-readability': 'conversacional, profissional, orientado-a-soluções',
        'context-window': 'automação HubSpot, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do HubSpot',
        'user-problem': 'HubSpot sem WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o HubSpot com automação por IA',
        'primary-benefit': 'gerencie conversas do WhatsApp diretamente dentro do HubSpot',
        'use-case': 'equipes de vendas sincronizando conversas do WhatsApp com o HubSpot CRM automaticamente',
        'implementation-difficulty': 'fácil, integração com HubSpot em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Additional meta tags for Bitrix24 integration page (English only)
  if (crmSlug === 'bitrix24' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Bitrix24 WhatsApp Integration | Connect WhatsApp To Bitrix24',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Bitrix24 WhatsApp integration, WhatsApp Bitrix24 CRM, sync WhatsApp with Bitrix24, Bitrix24 WhatsApp automation, WhatsApp CRM Bitrix24, AI agents Bitrix24 WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/bitrix24-whatsapp-integration',
        title: 'Bitrix24 WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with Bitrix24 CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Bitrix24.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Bitrix24 WhatsApp Integration Platform',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Bitrix24 WhatsApp Integration | Sync CRM With WhatsApp',
        description: 'Automatically sync WhatsApp chats with Bitrix24 CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-01T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Bitrix24 WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Bitrix24 WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Bitrix24 users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Bitrix24, best Bitrix24 WhatsApp integration, sync WhatsApp with Bitrix24 CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Bitrix24 automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside Bitrix24',
        'user-problem': 'Bitrix24 not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to Bitrix24 synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Bitrix24',
        'use-case': 'sales teams syncing WhatsApp conversations with Bitrix24 CRM automatically',
        'implementation-difficulty': 'easy, one-click Bitrix24 integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Google Sheets integration page (English only)
  if (crmSlug === 'google-sheets' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Google Sheets WhatsApp Integration With AI Agents | Eazybe',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Google Sheets WhatsApp integration, WhatsApp Google Sheets, sync WhatsApp with Google Sheets, Google Sheets WhatsApp automation, WhatsApp Google Sheets sync, AI agents Google Sheets WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/google-sheets-whatsapp-integration',
        title: 'Google Sheets WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with Google Sheets automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Google Sheets.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Google Sheets WhatsApp Integration Platform - Eazybe',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Google Sheets WhatsApp Integration | Sync Google Sheets With WhatsApp',
        description: 'Automatically sync WhatsApp chats with Google Sheets. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-01T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Google Sheets WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Google Sheets WhatsApp Integration',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Google Sheets users, sales teams, Google Sheets managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Google Sheets, best Google Sheets WhatsApp integration, sync WhatsApp with Google Sheets',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Google Sheets automation, WhatsApp sync, deal tracking, sales pipeline management, WhatsApp inside Google Sheets',
        'user-problem': 'Google Sheets not connected to WhatsApp, missing WhatsApp leads, manual Google Sheets updates',
        'solution-summary': 'automatic WhatsApp to Google Sheets synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Google Sheets',
        'use-case': 'sales teams syncing WhatsApp conversations with Google Sheets automatically',
        'implementation-difficulty': 'easy, one-click Google Sheets integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Google Calendar integration page (English only)
  if (crmSlug === 'google-calendar' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Google Calendar WhatsApp Integration With AI Agents - Eazybe',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Google Calendar WhatsApp integration, WhatsApp Google Calendar, sync WhatsApp with Google Calendar, Google Calendar WhatsApp automation, WhatsApp Google Calendar, AI agents Google Calendar WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/google-calendar-whatsapp-integration',
        title: 'Google Calendar WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with Google Calendar automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Google Calendar.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Google Calendar WhatsApp Integration Platform - Eazybe',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Google Calendar WhatsApp Integration | Sync Google Calendar With WhatsApp',
        description: 'Automatically sync WhatsApp chats with Google Calendar. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-01T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Google Calendar WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Google Calendar WhatsApp Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Google Calendar users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Google Calendar, best Google Calendar WhatsApp integration, sync WhatsApp with Google Calendar',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Google Calendar automation, WhatsApp Google Calendar sync, deal tracking, sales pipeline management, WhatsApp inside Google Calendar',
        'user-problem': 'Google Calendar not connected to WhatsApp, missing WhatsApp leads, manual Google Calendar updates',
        'solution-summary': 'automatic WhatsApp to Google Calendar synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Google Calendar',
        'use-case': 'sales teams syncing WhatsApp conversations with Google Calendar automatically',
        'implementation-difficulty': 'easy, one-click Google Calendar integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for LeadSquared integration page (English only)
  if (crmSlug === 'leadsquared' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'LeadSquared WhatsApp Integration | WhatsApp + LeadSquared',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'LeadSquared WhatsApp integration, WhatsApp LeadSquared CRM, sync WhatsApp with LeadSquared, LeadSquared WhatsApp automation, WhatsApp CRM LeadSquared, AI agents LeadSquared WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/leadsquared-whatsapp-integration',
        title: 'LeadSquared WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with LeadSquared CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside LeadSquared.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'LeadSquared WhatsApp Integration Platform - Eazybe',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'LeadSquared WhatsApp Integration | Sync CRM With WhatsApp',
        description: 'Automatically sync WhatsApp chats with LeadSquared CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-01T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'LeadSquared WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'LeadSquared WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'LeadSquared users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to LeadSquared, best LeadSquared WhatsApp integration, sync WhatsApp with LeadSquared CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'LeadSquared automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside LeadSquared',
        'user-problem': 'LeadSquared not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to LeadSquared synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside LeadSquared',
        'use-case': 'sales teams syncing WhatsApp conversations with LeadSquared CRM automatically',
        'implementation-difficulty': 'easy, one-click LeadSquared integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Freshdesk integration page (English only)
  if (crmSlug === 'freshdesk' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Freshdesk WhatsApp Integration | Sync WhatsApp + Freshdesk',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Freshdesk WhatsApp integration, WhatsApp Freshdesk CRM, sync WhatsApp with Freshdesk, Freshdesk WhatsApp automation, WhatsApp CRM Freshdesk, AI agents Freshdesk WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/freshdesk-whatsapp-integration',
        title: 'Freshdesk WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with Freshdesk CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Freshdesk.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Freshdesk WhatsApp Integration Platform - Eazybe',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Freshdesk WhatsApp Integration | Sync CRM With WhatsApp',
        description: 'Automatically sync WhatsApp chats with Freshdesk CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-01T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Freshdesk WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Freshdesk WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Freshdesk users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Freshdesk, best Freshdesk WhatsApp integration, sync WhatsApp with Freshdesk CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Freshdesk automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside Freshdesk',
        'user-problem': 'Freshdesk not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to Freshdesk synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Freshdesk',
        'use-case': 'sales teams syncing WhatsApp conversations with Freshdesk CRM automatically',
        'implementation-difficulty': 'easy, one-click Freshdesk integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Webhooks integration page (English only)
  if (crmSlug === 'webhooks' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Webhooks WhatsApp Integration: Connect WhatsApp Webhooks',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Webhooks WhatsApp integration, WhatsApp Webhooks CRM, sync WhatsApp with Webhooks, Webhooks WhatsApp automation, WhatsApp CRM Webhooks, AI agents Webhooks WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/webhooks-whatsapp-integration',
        title: 'Webhooks WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with Webhooks CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Webhooks.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Webhooks WhatsApp Integration Platform - Eazybe',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Webhooks WhatsApp Integration | Sync CRM With WhatsApp',
        description: 'Automatically sync WhatsApp chats with Webhooks CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Webhooks WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Webhooks WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Webhooks users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Webhooks, best Webhooks WhatsApp integration, sync WhatsApp with Webhooks CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Webhooks automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside Webhooks',
        'user-problem': 'Webhooks not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to Webhooks synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Webhooks',
        'use-case': 'sales teams syncing WhatsApp conversations with Webhooks CRM automatically',
        'implementation-difficulty': 'easy, one-click Webhooks integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Monday integration page (English only)
  if (crmSlug === 'monday' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Monday WhatsApp Integration: Connect WhatsApp To Monday',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Monday WhatsApp integration, WhatsApp Monday CRM, sync WhatsApp with Monday, Monday WhatsApp automation, WhatsApp CRM Monday, AI agents Monday WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/monday-whatsapp-integration',
        title: 'Monday WhatsApp Integration With AI Agents - Eazybe',
        description: 'Sync WhatsApp with Monday CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Monday.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Monday WhatsApp Integration Platform - Eazybe',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Monday WhatsApp Integration | Sync CRM With WhatsApp',
        description: 'Automatically sync WhatsApp chats with Monday CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Monday WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Monday WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Monday users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Monday, best Monday WhatsApp integration, sync WhatsApp with Monday CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Monday automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside Monday',
        'user-problem': 'Monday not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to Monday synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Monday',
        'use-case': 'sales teams syncing WhatsApp conversations with Monday CRM automatically',
        'implementation-difficulty': 'easy, one-click Monday integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Pipedrive integration page (English only)
  if (crmSlug === 'pipedrive' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Pipedrive WhatsApp Integration: Connect WhatsApp To Pipedrive',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Pipedrive WhatsApp integration, WhatsApp Pipedrive CRM, sync WhatsApp with Pipedrive, Pipedrive WhatsApp automation, WhatsApp CRM Pipedrive, AI agents Pipedrive WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/pipedrive-whatsapp-integration',
        title: 'Pipedrive WhatsApp Integration With AI Agents | Eazybe',
        description: 'Sync WhatsApp with Pipedrive CRM automatically. Track deals, use AI replies, manage chats, and boost sales productivity directly inside Pipedrive.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Pipedrive WhatsApp Integration Platform - Eazybe',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Pipedrive WhatsApp Integration | Sync CRM With WhatsApp',
        description: 'Automatically sync WhatsApp chats with Pipedrive CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Pipedrive WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Pipedrive WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Pipedrive users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Pipedrive, best Pipedrive WhatsApp integration, sync WhatsApp with Pipedrive CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Pipedrive automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside Pipedrive',
        'user-problem': 'Pipedrive not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to Pipedrive synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Pipedrive',
        'use-case': 'sales teams syncing WhatsApp conversations with Pipedrive CRM automatically',
        'implementation-difficulty': 'easy, one-click Pipedrive integration',
        'time-to-value': 'instant, real-time WhatsApp sync',
      },
    }
  }

  // Additional meta tags for Salesforce integration page (English only)
  if (crmSlug === 'salesforce' && locale === 'en') {
    return {
      ...baseMetadata,
      title: 'Salesforce WhatsApp Integration | WhatsApp + Salesforce',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'Salesforce WhatsApp integration, WhatsApp Salesforce CRM, sync WhatsApp with Salesforce, Salesforce WhatsApp automation, WhatsApp CRM Salesforce, AI agents Salesforce WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/salesforce-whatsapp-integration',
        title: 'Salesforce WhatsApp Integration | WhatsApp + Salesforce',
        description: 'Sync WhatsApp with Salesforce CRM automatically. Use AI agents, track deals, manage chats, and improve sales productivity directly inside Salesforce.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Eazybe Salesforce WhatsApp Integration Platform',
          },
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Salesforce WhatsApp Integration | WhatsApp + Salesforce',
        description: 'Automatically sync WhatsApp chats with Salesforce CRM. Use AI agents, track pipeline activity, and manage customer conversations in one place.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Salesforce WhatsApp Integration',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Salesforce WhatsApp CRM Integration by Eazybe',
        'twitter:label1': 'Rating',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Price',
        'twitter:data2': 'Free',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Eazybe',
        'answer-type': 'how-to, product-information, feature-comparison',
        'target-audience': 'Salesforce users, sales teams, CRM managers, marketing automation teams, B2B businesses',
        'content-intent': 'commercial-investigation, transactional',
        'conversational-query': 'how to connect WhatsApp to Salesforce, best Salesforce WhatsApp integration, sync WhatsApp with Salesforce CRM',
        'ai-readability': 'conversational, professional, solution-oriented',
        'context-window': 'Salesforce automation, WhatsApp CRM sync, deal tracking, sales pipeline management, WhatsApp inside Salesforce',
        'user-problem': 'Salesforce not connected to WhatsApp, missing WhatsApp leads, manual CRM updates',
        'solution-summary': 'automatic WhatsApp to Salesforce synchronization with AI automation',
        'primary-benefit': 'manage WhatsApp conversations directly inside Salesforce',
        'use-case': 'sales teams syncing WhatsApp conversations with Salesforce CRM automatically',
        'implementation-difficulty': 'easy, one-click Salesforce integration',
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
      {crmSlug === 'hubspot' && locale === 'en' && <HubSpotStructuredData />}
      {crmSlug === 'hubspot' && locale === 'br' && <HubSpotStructuredDataBr />}
      {crmSlug === 'zoho' && locale === 'en' && <ZohoStructuredData />}
      {crmSlug === 'bitrix24' && locale === 'en' && <Bitrix24StructuredData />}
      {crmSlug === 'google-sheets' && locale === 'en' && <GoogleSheetsStructuredData />}
      {crmSlug === 'google-calendar' && locale === 'en' && <GoogleCalendarStructuredData />}
      {crmSlug === 'monday' && locale === 'en' && <MondayStructuredData />}
      {crmSlug === 'pipedrive' && locale === 'en' && <PipedriveStructuredData />}
      {crmSlug === 'salesforce' && locale === 'en' && <SalesforceStructuredData />}
      {crmSlug === 'leadsquared' && locale === 'en' && <LeadSquaredStructuredData />}
      {crmSlug === 'freshdesk' && locale === 'en' && <FreshdeskStructuredData />}
      {crmSlug === 'webhooks' && locale === 'en' && <WebhooksStructuredData />}
      <ProductPageClient product={product} crmSlug={crmSlug} />
    </>
  )
}
