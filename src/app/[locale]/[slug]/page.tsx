import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getProduct } from '@/lib/sanity-queries'
import { routing } from '@/i18n/routing'
import ProductPageClient from '@/components/pages/ProductPageClient'
import { getAlternates, buildFaqPageSchema } from '@/lib/seo-helpers'
import { HubSpotStructuredData } from '@/components/seo/HubSpotStructuredData'
import { HubSpotStructuredDataBr } from '@/components/seo/HubSpotStructuredDataBr'
import { ZohoStructuredData } from '@/components/seo/ZohoStructuredData'
import { ZohoStructuredDataBr } from '@/components/seo/ZohoStructuredDataBr'
import { Bitrix24StructuredData } from '@/components/seo/Bitrix24StructuredData'
import { Bitrix24StructuredDataBr } from '@/components/seo/Bitrix24StructuredDataBr'
import { GoogleSheetsStructuredData } from '@/components/seo/GoogleSheetsStructuredData'
import { GoogleSheetsStructuredDataBr } from '@/components/seo/GoogleSheetsStructuredDataBr'
import { GoogleCalendarStructuredData } from '@/components/seo/GoogleCalendarStructuredData'
import { GoogleCalendarStructuredDataBr } from '@/components/seo/GoogleCalendarStructuredDataBr'
import { MondayStructuredData } from '@/components/seo/MondayStructuredData'
import { MondayStructuredDataBr } from '@/components/seo/MondayStructuredDataBr'
import { PipedriveStructuredData } from '@/components/seo/PipedriveStructuredData'
import { PipedriveStructuredDataBr } from '@/components/seo/PipedriveStructuredDataBr'
import { SalesforceStructuredData } from '@/components/seo/SalesforceStructuredData'
import { SalesforceStructuredDataBr } from '@/components/seo/SalesforceStructuredDataBr'
import { LeadSquaredStructuredData } from '@/components/seo/LeadSquaredStructuredData'
import { LeadSquaredStructuredDataBr } from '@/components/seo/LeadSquaredStructuredDataBr'
import { FreshdeskStructuredData } from '@/components/seo/FreshdeskStructuredData'
import { FreshdeskStructuredDataBr } from '@/components/seo/FreshdeskStructuredDataBr'
import { WebhooksStructuredData } from '@/components/seo/WebhooksStructuredData'
import { WebhooksStructuredDataBr } from '@/components/seo/WebhooksStructuredDataBr'
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

  // Spanish title-only override for HubSpot integration page.
  if (crmSlug === 'hubspot' && locale === 'es') {
    return {
      ...baseMetadata,
      title: 'Integración HubSpot WhatsApp: HubSpot integrado WhatsApp',
    }
  }

  // Turkish title-only override for HubSpot integration page.
  if (crmSlug === 'hubspot' && locale === 'tr') {
    return {
      ...baseMetadata,
      title: 'HubSpot WhatsApp Entegrasyonu: HubSpot WhatsAppa entegre',
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

  // Additional meta tags for Zoho integration page (Portuguese/Brazil only)
  if (crmSlug === 'zoho' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Zoho CRM com WhatsApp | Zoho CRM + WhatsApp',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração WhatsApp Zoho, Zoho WhatsApp integração, WhatsApp Zoho CRM, sincronizar WhatsApp com Zoho, automação WhatsApp Zoho, CRM WhatsApp Zoho, agentes de IA WhatsApp Zoho',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/zoho-whatsapp-integration',
        title: 'Zoho WhatsApp Integration e agentes de IA - Eazybe',
        description: 'Conecte WhatsApp ao Zoho CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Zoho.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração WhatsApp com Zoho CRM - Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Zoho WhatsApp Integration e agentes de IA - Eazybe',
        description: 'Conecte WhatsApp ao Zoho CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Zoho.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Technology',
        'article:tag': 'Integração WhatsApp Zoho',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração WhatsApp Zoho CRM da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como-fazer, informações-do-produto, comparação-de-recursos',
        'target-audience': 'usuários do Zoho, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B',
        'content-intent': 'investigação-comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Zoho, melhor integração WhatsApp Zoho, sincronizar WhatsApp com Zoho CRM',
        'ai-readability': 'conversacional, profissional, orientado-a-soluções',
        'context-window': 'automação Zoho, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do Zoho',
        'user-problem': 'Zoho sem WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o Zoho com automação por IA',
        'primary-benefit': 'gerencie conversas do WhatsApp diretamente dentro do Zoho',
        'use-case': 'equipes de vendas sincronizando conversas do WhatsApp com o Zoho CRM automaticamente',
        'implementation-difficulty': 'fácil, integração com Zoho em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Additional meta tags for Bitrix24 integration page (Portuguese/Brazil only)
  if (crmSlug === 'bitrix24' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Bitrix24 WhatsApp | Conecte o WhatsApp ao Bitrix24',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração Bitrix24 WhatsApp, WhatsApp Bitrix24 CRM, sincronizar WhatsApp com Bitrix24, automação WhatsApp Bitrix24, CRM WhatsApp Bitrix24, agentes de IA WhatsApp Bitrix24',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/bitrix24-whatsapp-integration',
        title: 'Integração Bitrix24 WhatsApp | Conecte o WhatsApp ao Bitrix24',
        description: 'Sincronize o WhatsApp com o Bitrix24 CRM automaticamente. Use agentes de IA, acompanhe negócios e gerencie conversas diretamente dentro do Bitrix24.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Plataforma de integração Bitrix24 WhatsApp da Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Bitrix24 WhatsApp | Conecte o WhatsApp ao Bitrix24',
        description: 'Sincronize automaticamente as conversas do WhatsApp com o Bitrix24 CRM. Use agentes de IA, acompanhe o pipeline e gerencie conversas em um só lugar.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração Bitrix24 WhatsApp',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração CRM Bitrix24 WhatsApp da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como fazer, informações do produto, comparação de recursos',
        'target-audience': 'usuários do Bitrix24, equipes de vendas, gestores de CRM, equipes de automação de marketing, empresas B2B',
        'content-intent': 'investigação comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Bitrix24, melhor integração WhatsApp Bitrix24, sincronizar WhatsApp com Bitrix24 CRM',
        'ai-readability': 'conversacional, profissional, orientado para solução',
        'context-window': 'automação no Bitrix24, sincronização de CRM com WhatsApp, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do Bitrix24',
        'user-problem': 'Bitrix24 não conectado ao WhatsApp, leads do WhatsApp perdidos, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o Bitrix24 usando automação com IA',
        'primary-benefit': 'gerenciar conversas do WhatsApp diretamente dentro do Bitrix24',
        'use-case': 'equipes de vendas sincronizando automaticamente conversas do WhatsApp com o Bitrix24 CRM',
        'implementation-difficulty': 'fácil, integração com Bitrix24 em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Additional meta tags for Google Sheets integration page (Portuguese/Brazil only)
  if (crmSlug === 'google-sheets' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Google Sheets com WhatsApp | Conecte o WhatsApp',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração Google Sheets WhatsApp, WhatsApp Google Sheets, sincronizar WhatsApp com Google Sheets, automação WhatsApp Google Sheets, CRM Google Sheets WhatsApp, agentes de IA WhatsApp Google Sheets',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/google-sheets-whatsapp-integration',
        title: 'Integração Google Sheets com WhatsApp | Conecte o WhatsApp',
        description: 'Conecte o Google Sheets ao WhatsApp automaticamente. Sincronize conversas, organize dados, atualize negócios e gerencie clientes com mais eficiência.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração Google Sheets com WhatsApp da Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Google Sheets com WhatsApp | Conecte o WhatsApp',
        description: 'Sincronize automaticamente conversas do WhatsApp com o Google Sheets. Organize dados, acompanhe negócios e gerencie clientes em um só lugar.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração Google Sheets WhatsApp',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração WhatsApp Google Sheets da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como fazer, informações do produto, comparação de recursos',
        'target-audience': 'usuários do Google Sheets, equipes de vendas, gestores de dados, equipes de marketing, empresas B2B',
        'content-intent': 'investigação comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Google Sheets, integrar WhatsApp com planilhas, sincronizar WhatsApp com Google Sheets automaticamente',
        'ai-readability': 'conversacional, profissional, orientado para solução',
        'context-window': 'automação Google Sheets, sincronização WhatsApp com planilhas, gestão de dados de clientes, acompanhamento de negócios, WhatsApp integrado com planilhas',
        'user-problem': 'dados do WhatsApp não organizados, atualização manual de planilhas, perda de informações de clientes',
        'solution-summary': 'sincronização automática do WhatsApp com Google Sheets usando automação com IA',
        'primary-benefit': 'organizar e gerenciar conversas do WhatsApp diretamente no Google Sheets',
        'use-case': 'equipes que sincronizam automaticamente conversas do WhatsApp com planilhas do Google Sheets',
        'implementation-difficulty': 'fácil, integração em poucos passos',
        'time-to-value': 'instantâneo, sincronização em tempo real',
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

  // Additional meta tags for Google Calendar integration page (Portuguese/Brazil only)
  if (crmSlug === 'google-calendar' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Google Calendar com WhatsApp: Conecte WhatsApp',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração Google Calendar WhatsApp, WhatsApp Google Calendar, sincronizar WhatsApp com Google Calendar, automação WhatsApp calendário, integração agenda WhatsApp, lembretes WhatsApp Google Calendar',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/google-calendar-whatsapp-integration',
        title: 'Integração Google Calendar com WhatsApp: Conecte WhatsApp',
        description: 'Conecte o WhatsApp ao Google Calendar. Sincronize compromissos automaticamente, envie lembretes e gerencie conversas com clientes de forma eficiente.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração Google Calendar com WhatsApp - Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Google Calendar com WhatsApp: Conecte WhatsApp',
        description: 'Sincronize WhatsApp com Google Calendar automaticamente. Envie lembretes, gerencie compromissos e melhore a comunicação com clientes.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração Google Calendar WhatsApp',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração Google Calendar WhatsApp da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como fazer, informações do produto, automação',
        'target-audience': 'usuários do Google Calendar, equipes de vendas, equipes de suporte, gestores de CRM, empresas B2B',
        'content-intent': 'investigação comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Google Calendar, integração WhatsApp calendário, enviar lembretes WhatsApp automaticamente, sincronizar agenda com WhatsApp',
        'ai-readability': 'conversacional, profissional, orientado para solução',
        'context-window': 'automação de calendário, lembretes via WhatsApp, sincronização de agenda, comunicação com clientes, automação de compromissos',
        'user-problem': 'falta de lembretes automáticos, compromissos perdidos, comunicação manual com clientes',
        'solution-summary': 'integração do WhatsApp com Google Calendar para automatizar lembretes e gerenciar compromissos com eficiência',
        'primary-benefit': 'automatizar lembretes e melhorar a gestão de compromissos via WhatsApp',
        'use-case': 'equipes que desejam enviar lembretes de reuniões e gerenciar compromissos automaticamente pelo WhatsApp',
        'implementation-difficulty': 'fácil, integração rápida com Google Calendar',
        'time-to-value': 'instantâneo, sincronização e automação imediata',
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

  // Additional meta tags for LeadSquared integration page (Portuguese/Brazil only)
  if (crmSlug === 'leadsquared' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração LeadSquared WhatsApp | LeadSquared + WhatsApp',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração LeadSquared WhatsApp, WhatsApp LeadSquared CRM, sincronizar WhatsApp com LeadSquared, automação WhatsApp LeadSquared, CRM WhatsApp LeadSquared, agentes de IA WhatsApp LeadSquared',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/leadsquared-whatsapp-integration',
        title: 'Integração LeadSquared WhatsApp | LeadSquared + WhatsApp',
        description: 'Sincronize o WhatsApp com o LeadSquared CRM automaticamente. Use agentes de IA, acompanhe negócios e gerencie conversas diretamente dentro do LeadSquared.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração WhatsApp LeadSquared CRM da Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração LeadSquared WhatsApp | LeadSquared + WhatsApp',
        description: 'Sincronize automaticamente as conversas do WhatsApp com o LeadSquared CRM. Use IA, acompanhe o pipeline e gerencie clientes em um só lugar.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração LeadSquared WhatsApp',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração CRM WhatsApp LeadSquared da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como fazer, informações do produto, comparação de recursos',
        'target-audience': 'usuários do LeadSquared, equipes de vendas, gestores de CRM, equipes de marketing, empresas B2B',
        'content-intent': 'investigação comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao LeadSquared, melhor integração WhatsApp LeadSquared, sincronizar WhatsApp com LeadSquared CRM',
        'ai-readability': 'conversacional, profissional, orientado para solução',
        'context-window': 'automação LeadSquared, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do LeadSquared',
        'user-problem': 'LeadSquared não conectado ao WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o LeadSquared usando automação com IA',
        'primary-benefit': 'gerenciar conversas do WhatsApp diretamente dentro do LeadSquared',
        'use-case': 'equipes de vendas sincronizando automaticamente conversas do WhatsApp com o LeadSquared CRM',
        'implementation-difficulty': 'fácil, integração com LeadSquared em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Additional meta tags for Freshdesk integration page (Portuguese/Brazil only)
  if (crmSlug === 'freshdesk' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Freshdesk WhatsApp: Conecte WhatsApp Freshdesk',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração Freshdesk WhatsApp, Freshdesk WhatsApp integração, WhatsApp Freshdesk CRM, sincronizar WhatsApp com Freshdesk, automação WhatsApp Freshdesk, CRM WhatsApp Freshdesk, agentes de IA WhatsApp Freshdesk',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/freshdesk-whatsapp-integration',
        title: 'Integração Freshdesk WhatsApp: Conecte WhatsApp Freshdesk',
        description: 'Conecte WhatsApp ao Freshdesk CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Freshdesk.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração WhatsApp com Freshdesk CRM - Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Freshdesk WhatsApp: Conecte WhatsApp Freshdesk',
        description: 'Conecte WhatsApp ao Freshdesk CRM. Sincronize conversas, use agentes de IA, acompanhe negócios e gerencie vendas sem sair do Freshdesk.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração Freshdesk WhatsApp',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração WhatsApp Freshdesk CRM da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como-fazer, informações-do-produto, comparação-de-recursos',
        'target-audience': 'usuários do Freshdesk, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B',
        'content-intent': 'investigação-comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Freshdesk, melhor integração WhatsApp Freshdesk, sincronizar WhatsApp com Freshdesk CRM',
        'ai-readability': 'conversacional, profissional, orientado-a-soluções',
        'context-window': 'automação Freshdesk, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do Freshdesk',
        'user-problem': 'Freshdesk sem WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o Freshdesk com automação por IA',
        'primary-benefit': 'gerencie conversas do WhatsApp diretamente dentro do Freshdesk',
        'use-case': 'equipes de vendas sincronizando conversas do WhatsApp com o Freshdesk CRM automaticamente',
        'implementation-difficulty': 'fácil, integração com Freshdesk em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Additional meta tags for Webhooks integration page (Portuguese/Brazil only)
  if (crmSlug === 'webhooks' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Webhooks WhatsApp: Conecte WhatsApp com Webhooks',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração WhatsApp Webhooks, Webhooks WhatsApp, sincronizar WhatsApp com Webhooks, automação WhatsApp Webhooks, API WhatsApp Webhooks, agentes de IA WhatsApp Webhooks',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/webhooks-whatsapp-integration',
        title: 'Integração Webhooks WhatsApp: Conecte WhatsApp com Webhooks',
        description: 'Integre o WhatsApp com Webhooks automaticamente. Use agentes de IA, automatize eventos e gerencie conversas com mais eficiência.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração WhatsApp com Webhooks - Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Webhooks WhatsApp: Conecte WhatsApp com Webhooks',
        description: 'Conecte o WhatsApp com Webhooks e automatize eventos, conversas e fluxos com agentes de IA.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração WhatsApp Webhooks',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração WhatsApp Webhooks da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como fazer, integração, automação',
        'target-audience': 'desenvolvedores, equipes técnicas, equipes de automação, empresas SaaS, equipes de produto',
        'content-intent': 'investigação comercial, técnico',
        'conversational-query': 'como conectar WhatsApp com webhooks, integração WhatsApp API webhooks, automatizar WhatsApp com webhooks',
        'ai-readability': 'técnico, prático, orientado a soluções',
        'context-window': 'webhooks, API WhatsApp, automação de eventos, integração de sistemas, mensagens automatizadas',
        'user-problem': 'dificuldade em integrar WhatsApp com sistemas personalizados, automação limitada, necessidade de sincronização em tempo real',
        'solution-summary': 'integração do WhatsApp com webhooks para automatizar eventos, sincronizar dados e escalar processos com IA',
        'primary-benefit': 'automatizar fluxos e integrar WhatsApp com qualquer sistema via webhooks',
        'use-case': 'empresas e desenvolvedores que desejam conectar WhatsApp com sistemas internos usando webhooks',
        'implementation-difficulty': 'médio, requer configuração técnica de webhooks',
        'time-to-value': 'rápido após configuração inicial',
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

  // Additional meta tags for Monday integration page (Portuguese/Brazil only)
  if (crmSlug === 'monday' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Monday WhatsApp | Conecte o WhatsApp ao Monday',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração WhatsApp Monday, Monday WhatsApp integração, WhatsApp Monday CRM, sincronizar WhatsApp com Monday, automação WhatsApp Monday, CRM WhatsApp Monday, agentes de IA WhatsApp Monday',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/monday-whatsapp-integration',
        title: 'Integração Monday WhatsApp | Conecte o WhatsApp ao Monday',
        description: 'Sincronize o WhatsApp com o Monday.com automaticamente. Atualize negócios, gerencie conversas e melhore a produtividade da equipe com automação e IA.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração WhatsApp com Monday.com - Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Monday WhatsApp | Conecte o WhatsApp ao Monday',
        description: 'Conecte WhatsApp ao Monday.com. Sincronize conversas automaticamente, acompanhe negócios e gerencie interações com clientes em um só lugar.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração WhatsApp Monday',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração WhatsApp Monday.com pela Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como-fazer, informações-do-produto, comparação-de-recursos',
        'target-audience': 'usuários do Monday.com, equipes de vendas, gestores de CRM, equipes de marketing, empresas B2B',
        'content-intent': 'investigação-comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Monday, melhor integração WhatsApp Monday, sincronizar WhatsApp com Monday CRM',
        'ai-readability': 'conversacional, profissional, orientado a soluções',
        'context-window': 'automação no Monday.com, sincronização WhatsApp CRM, gestão de negócios, pipeline de vendas, WhatsApp integrado ao Monday',
        'user-problem': 'Monday.com não conectado ao WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o Monday.com usando automação com IA',
        'primary-benefit': 'gerenciar conversas do WhatsApp diretamente dentro do Monday.com',
        'use-case': 'equipes de vendas sincronizando conversas do WhatsApp com o Monday.com automaticamente',
        'implementation-difficulty': 'fácil, integração com Monday em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Additional meta tags for Pipedrive integration page (Portuguese/Brazil only)
  if (crmSlug === 'pipedrive' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Pipedrive WhatsApp: Conecte o WhatsApp Pipedrive',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração Pipedrive WhatsApp, WhatsApp Pipedrive CRM, sincronizar WhatsApp com Pipedrive, automação WhatsApp Pipedrive, CRM WhatsApp Pipedrive, agentes de IA WhatsApp Pipedrive',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/pipedrive-whatsapp-integration',
        title: 'Integração Pipedrive WhatsApp | Conecte o WhatsApp ao Pipedrive',
        description: 'Sincronize o WhatsApp com o Pipedrive automaticamente. Atualize negócios, gerencie conversas e acompanhe vendas diretamente no CRM.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Integração WhatsApp com Pipedrive CRM - Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Pipedrive WhatsApp | Conecte o WhatsApp ao Pipedrive',
        description: 'Sincronize automaticamente chats do WhatsApp com o Pipedrive. Atualize negócios, acompanhe vendas e gerencie conversas em um só lugar.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração Pipedrive WhatsApp',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração WhatsApp Pipedrive CRM da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como-fazer, informações-do-produto, comparação-de-recursos',
        'target-audience': 'usuários do Pipedrive, equipes de vendas, gestores de CRM, automação de marketing, empresas B2B',
        'content-intent': 'investigação-comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Pipedrive, melhor integração WhatsApp Pipedrive, sincronizar WhatsApp com Pipedrive CRM',
        'ai-readability': 'conversacional, profissional, orientado a soluções',
        'context-window': 'automação Pipedrive, sincronização WhatsApp CRM, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do Pipedrive',
        'user-problem': 'Pipedrive não conectado ao WhatsApp, leads perdidos no WhatsApp, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o Pipedrive usando automação com IA',
        'primary-benefit': 'gerenciar conversas do WhatsApp diretamente dentro do Pipedrive',
        'use-case': 'equipes de vendas sincronizando conversas do WhatsApp com o Pipedrive CRM automaticamente',
        'implementation-difficulty': 'fácil, integração com Pipedrive em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Additional meta tags for Salesforce integration page (Portuguese/Brazil only)
  if (crmSlug === 'salesforce' && locale === 'br') {
    return {
      ...baseMetadata,
      title: 'Integração Salesforce WhatsApp: Conecte WhatsApp Salesforce',
      metadataBase: new URL('https://eazybe.com'),
      keywords: 'integração Salesforce WhatsApp, WhatsApp Salesforce CRM, sincronizar WhatsApp com Salesforce, automação WhatsApp Salesforce, CRM WhatsApp Salesforce, agentes de IA Salesforce WhatsApp',
      authors: [{ name: 'Eazybe' }],
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      verification: {
        google: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: 'https://eazybe.com/br/salesforce-whatsapp-integration',
        title: 'Integração Salesforce WhatsApp: Conecte WhatsApp Salesforce',
        description: 'Sincronize o WhatsApp com o Salesforce CRM automaticamente. Use agentes de IA, acompanhe negócios, gerencie conversas e aumente a produtividade de vendas dentro do Salesforce.',
        images: [
          {
            url: 'https://eazybe.com/logo.png',
            width: 1200,
            height: 630,
            alt: 'Plataforma de integração Salesforce WhatsApp da Eazybe',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@eazybe',
        creator: '@eazybe',
        title: 'Integração Salesforce WhatsApp: Conecte WhatsApp Salesforce',
        description: 'Sincronize automaticamente as conversas do WhatsApp com o Salesforce CRM. Use agentes de IA, acompanhe o pipeline e gerencie conversas em um só lugar.',
        images: ['https://eazybe.com/logo.png'],
      },
      other: {
        'article:published_time': '2026-02-03T08:00:00+00:00',
        'article:modified_time': '2026-04-02T10:30:00+00:00',
        'article:section': 'Tecnologia',
        'article:tag': 'Integração Salesforce WhatsApp',
        'thumbnail': 'https://eazybe.com/logo.png',
        'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        'bingbot': 'index, follow',
        'twitter:image:alt': 'Integração CRM Salesforce WhatsApp da Eazybe',
        'twitter:label1': 'Avaliação',
        'twitter:data1': '4.7/5',
        'twitter:label2': 'Preço',
        'twitter:data2': 'Grátis',
        'answer-type': 'como fazer, informações do produto, comparação de recursos',
        'target-audience': 'usuários do Salesforce, equipes de vendas, gestores de CRM, equipes de automação de marketing, empresas B2B',
        'content-intent': 'investigação comercial, transacional',
        'conversational-query': 'como conectar WhatsApp ao Salesforce, melhor integração WhatsApp Salesforce, sincronizar WhatsApp com Salesforce CRM',
        'ai-readability': 'conversacional, profissional, orientado para solução',
        'context-window': 'automação no Salesforce, sincronização de CRM com WhatsApp, acompanhamento de negócios, gestão de pipeline de vendas, WhatsApp dentro do Salesforce',
        'user-problem': 'Salesforce não conectado ao WhatsApp, leads do WhatsApp perdidos, atualizações manuais no CRM',
        'solution-summary': 'sincronização automática do WhatsApp com o Salesforce usando automação com IA',
        'primary-benefit': 'gerenciar conversas do WhatsApp diretamente dentro do Salesforce',
        'use-case': 'equipes de vendas sincronizando automaticamente conversas do WhatsApp com o Salesforce CRM',
        'implementation-difficulty': 'fácil, integração com Salesforce em um clique',
        'time-to-value': 'instantâneo, sincronização do WhatsApp em tempo real',
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

  // Spanish HubSpot integration page: en/br have hand-tuned structured data
  // components; this Spanish equivalent is generated dynamically from the
  // product's own faqSection (so editors who add/edit FAQs in Sanity see
  // their changes flow into search results) — with a Spanish-translated
  // fallback for when Sanity has no FAQs yet, mirroring the English
  // HubSpotStructuredData component's question set.
  const ES_HUBSPOT_FAQ_FALLBACK = [
    {
      question: '¿Cómo conecto WhatsApp con HubSpot CRM?',
      answer:
        'Instala Eazybe y conecta tu cuenta de HubSpot. Eazybe sincroniza los chats de WhatsApp con HubSpot para que las conversaciones y el contexto del cliente queden vinculados a los registros correctos del CRM.',
    },
    {
      question: '¿Eazybe sincroniza los mensajes de WhatsApp en HubSpot automáticamente?',
      answer:
        'Sí. Eazybe puede sincronizar las conversaciones de WhatsApp con HubSpot de forma automática, reduciendo el copiar y pegar manual y manteniendo la actividad de ventas siempre actualizada.',
    },
    {
      question: '¿Pueden varios miembros del equipo usar una bandeja compartida con HubSpot + WhatsApp?',
      answer:
        'Sí. Eazybe admite flujos de bandeja compartida para que los equipos colaboren en leads de WhatsApp manteniendo los registros de HubSpot alineados.',
    },
    {
      question: '¿Qué pueden hacer los agentes de IA en conversaciones de HubSpot + WhatsApp?',
      answer:
        'La IA ayuda a redactar respuestas, resumir conversaciones y agilizar los seguimientos, para que los representantes respondan más rápido manteniendo un mensaje consistente.',
    },
    {
      question: '¿Es segura esta integración con WhatsApp y HubSpot?',
      answer:
        'Eazybe está pensado para casos de uso empresariales y se centra en flujos seguros para sincronizar conversaciones de WhatsApp con registros del CRM. Revisa siempre tus requisitos de seguridad y cumplimiento antes de implementarlo.',
    },
    {
      question: '¿Con qué objetos de HubSpot puedo asociar las conversaciones de WhatsApp?',
      answer:
        'La mayoría de los equipos asocian las conversaciones de WhatsApp con contactos y deals para seguir el contexto a lo largo del pipeline de ventas. La asociación ideal depende del flujo de trabajo concreto de tu HubSpot.',
    },
  ]
  const esHubSpotFaqSchema =
    crmSlug === 'hubspot' && locale === 'es'
      ? buildFaqPageSchema(product?.faq?.items?.length ? product.faq.items : ES_HUBSPOT_FAQ_FALLBACK)
      : null
  const esHubSpotBreadcrumbSchema =
    crmSlug === 'hubspot' && locale === 'es'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Eazybe', item: 'https://eazybe.com/es' },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Integraciones',
              item: 'https://eazybe.com/es/integrations',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Integración HubSpot WhatsApp',
              item: 'https://eazybe.com/es/hubspot-whatsapp-integration',
            },
          ],
        }
      : null

  // Turkish equivalent of the Spanish HubSpot schemas above.
  const TR_HUBSPOT_FAQ_FALLBACK = [
    {
      question: "WhatsApp'ı HubSpot CRM'ye nasıl bağlarım?",
      answer:
        "Eazybe'yi yükleyin ve HubSpot hesabınızı bağlayın. Eazybe, WhatsApp sohbetlerini HubSpot'a senkronize eder, böylece konuşmalar ve müşteri bağlamı doğru CRM kayıtlarına bağlı kalır.",
    },
    {
      question: 'Eazybe, WhatsApp mesajlarını HubSpot içine otomatik olarak senkronize eder mi?',
      answer:
        "Evet. Eazybe, WhatsApp konuşmalarını HubSpot'a otomatik olarak senkronize edebilir; manuel kopyala-yapıştır işlemlerini azaltır ve satış aktivitenizi güncel tutar.",
    },
    {
      question: 'Birden fazla ekip üyesi HubSpot + WhatsApp ile paylaşılan bir gelen kutusu kullanabilir mi?',
      answer:
        "Evet. Eazybe paylaşılan gelen kutusu iş akışlarını destekler; ekipler WhatsApp lead'leri üzerinde işbirliği yaparken HubSpot kayıtlarını hizalı tutar.",
    },
    {
      question: 'AI ajanları HubSpot + WhatsApp konuşmaları için ne yapabilir?',
      answer:
        'AI; yanıtların taslağını çıkarmaya, konuşmaları özetlemeye ve takipleri hızlandırmaya yardımcı olabilir, böylece temsilciler tutarlı bir mesajla daha hızlı yanıt verir.',
    },
    {
      question: 'Bu entegrasyonu WhatsApp ve HubSpot ile kullanmak güvenli mi?',
      answer:
        'Eazybe, kurumsal kullanım senaryoları için tasarlanmıştır ve WhatsApp konuşmalarını CRM kayıtlarıyla senkronize etmek için güvenli iş akışlarına odaklanır. Devreye almadan önce güvenlik ve uyumluluk gereksinimlerinizi her zaman gözden geçirin.',
    },
    {
      question: 'WhatsApp konuşmalarını hangi HubSpot nesneleriyle ilişkilendirebilirim?',
      answer:
        "Çoğu ekip, WhatsApp konuşmalarını satış pipeline'ı boyunca bağlamı izlemek için kişiler ve deals ile ilişkilendirir. İdeal eşleme, HubSpot iş akışınıza bağlıdır.",
    },
  ]
  const trHubSpotFaqSchema =
    crmSlug === 'hubspot' && locale === 'tr'
      ? buildFaqPageSchema(product?.faq?.items?.length ? product.faq.items : TR_HUBSPOT_FAQ_FALLBACK)
      : null
  const trHubSpotBreadcrumbSchema =
    crmSlug === 'hubspot' && locale === 'tr'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Eazybe', item: 'https://eazybe.com/tr' },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Entegrasyonlar',
              item: 'https://eazybe.com/tr/integrations',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'HubSpot WhatsApp Entegrasyonu',
              item: 'https://eazybe.com/tr/hubspot-whatsapp-integration',
            },
          ],
        }
      : null

  return (
    <>
      {crmSlug === 'hubspot' && locale === 'en' && <HubSpotStructuredData />}
      {crmSlug === 'hubspot' && locale === 'br' && <HubSpotStructuredDataBr />}
      {esHubSpotFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(esHubSpotFaqSchema) }}
        />
      )}
      {esHubSpotBreadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(esHubSpotBreadcrumbSchema) }}
        />
      )}
      {trHubSpotFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(trHubSpotFaqSchema) }}
        />
      )}
      {trHubSpotBreadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(trHubSpotBreadcrumbSchema) }}
        />
      )}
      {crmSlug === 'zoho' && locale === 'en' && <ZohoStructuredData />}
      {crmSlug === 'zoho' && locale === 'br' && <ZohoStructuredDataBr />}
      {crmSlug === 'bitrix24' && locale === 'en' && <Bitrix24StructuredData />}
      {crmSlug === 'bitrix24' && locale === 'br' && <Bitrix24StructuredDataBr />}
      {crmSlug === 'google-sheets' && locale === 'en' && <GoogleSheetsStructuredData />}
      {crmSlug === 'google-sheets' && locale === 'br' && <GoogleSheetsStructuredDataBr />}
      {crmSlug === 'google-calendar' && locale === 'en' && <GoogleCalendarStructuredData />}
      {crmSlug === 'google-calendar' && locale === 'br' && <GoogleCalendarStructuredDataBr />}
      {crmSlug === 'monday' && locale === 'en' && <MondayStructuredData />}
      {crmSlug === 'monday' && locale === 'br' && <MondayStructuredDataBr />}
      {crmSlug === 'pipedrive' && locale === 'en' && <PipedriveStructuredData />}
      {crmSlug === 'pipedrive' && locale === 'br' && <PipedriveStructuredDataBr />}
      {crmSlug === 'salesforce' && locale === 'en' && <SalesforceStructuredData />}
      {crmSlug === 'salesforce' && locale === 'br' && <SalesforceStructuredDataBr />}
      {crmSlug === 'leadsquared' && locale === 'en' && <LeadSquaredStructuredData />}
      {crmSlug === 'leadsquared' && locale === 'br' && <LeadSquaredStructuredDataBr />}
      {crmSlug === 'freshdesk' && locale === 'en' && <FreshdeskStructuredData />}
      {crmSlug === 'freshdesk' && locale === 'br' && <FreshdeskStructuredDataBr />}
      {crmSlug === 'webhooks' && locale === 'en' && <WebhooksStructuredData />}
      {crmSlug === 'webhooks' && locale === 'br' && <WebhooksStructuredDataBr />}
      <ProductPageClient product={product} crmSlug={crmSlug} />
    </>
  )
}
