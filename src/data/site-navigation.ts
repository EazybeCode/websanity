/**
 * The site's page tree, per locale. One source for two outputs:
 * - the visible /sitemap page
 * - the homepage SiteNavigationElement schema
 * A page added here shows up in both, in every language.
 */

import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { WA_PRICING_PATH_BY_LOCALE } from '@/data/whatsapp-pricing-content'

const SITE_URL = 'https://eazybe.com'

export type SitemapLeaf = { label: string; href: string }
export type SitemapBranch = {
  label: string
  href?: string
  children: SitemapNode[]
  // How the navigation schema treats this branch:
  // 'group' lists only its children (its own link repeats a child's page);
  // 'exclude' leaves the whole branch out.
  navSchema?: 'group' | 'exclude'
}
export type SitemapNode = SitemapLeaf | SitemapBranch

export const isBranch = (n: SitemapNode): n is SitemapBranch =>
  Array.isArray((n as SitemapBranch).children)

const FEATURES: Array<{ key: string; slug: string }> = [
  { key: 'featureTeamInbox', slug: 'team-inbox' },
  { key: 'featureWhatsappCrm', slug: 'whatsapp-crm' },
  { key: 'featureCloudBackup', slug: 'cloud-backup' },
  { key: 'featureQuickReply', slug: 'quick-reply' },
  { key: 'featureScheduler', slug: 'scheduler' },
  { key: 'featureRevenueInbox', slug: 'revenue-inbox' },
  { key: 'featureRepRadar', slug: 'rep-radar' },
  { key: 'featureWhatsappCopilot', slug: 'whatsapp-copilot' },
]

// Labels come from the nav, so they stay the same as the menu in every language.
const AGENTS: Array<{ key: string; anchor: string }> = [
  { key: 'agentCrmName', anchor: 'crm-sync' },
  { key: 'agentLeadName', anchor: 'lead-qualification' },
  { key: 'agentRevenueName', anchor: 'revenue' },
  { key: 'agentCsName', anchor: 'customer-success' },
  { key: 'agentBuilderName', anchor: 'agent-builder' },
]

const CALLING: Array<{ key: string; slug: string }> = [
  { key: 'callingAutoName', slug: 'auto-dialer' },
  { key: 'callingVirtualName', slug: 'virtual-phone-number' },
  { key: 'callingTrackName', slug: 'call-tracking' },
  { key: 'callingSimName', slug: 'sim-based-calling' },
  { key: 'callingRecName', slug: 'call-recording' },
  { key: 'callingVsName', slug: 'sim-vs-cloud-calling' },
]

const INTEGRATIONS: Array<{ name: string; slug: string }> = [
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'Zoho', slug: 'zoho' },
  { name: 'Bitrix24', slug: 'bitrix24' },
  { name: 'LeadSquared', slug: 'leadsquared' },
  { name: 'Freshdesk', slug: 'freshdesk' },
  { name: 'Pipedrive', slug: 'pipedrive' },
  { name: 'Monday', slug: 'monday' },
  { name: 'Google Sheets', slug: 'google-sheets' },
  { name: 'Google Calendar', slug: 'google-calendar' },
  { name: 'Webhooks', slug: 'webhooks' },
]

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  br: 'Português (Brasil)',
  es: 'Español',
  tr: 'Türkçe',
}

export async function getSitemapTree(locale: string): Promise<SitemapNode[]> {
  const t = await getTranslations({ locale, namespace: 'landingV3.sitemap' })
  const tNav = await getTranslations({ locale, namespace: 'landingV3.nav' })
  const tFooter = await getTranslations({ locale, namespace: 'landingV3.footer' })

  const prefix = locale === 'en' ? '' : `/${locale}`
  const url = (path: string) => `${prefix}${path}`

  return [
    { label: t('home'), href: prefix || '/' },
    {
      label: tNav('sectionAiAgents'),
      href: url('/whatsapp-ai-agent'),
      children: AGENTS.map((a) => ({
        label: tNav(a.key as any),
        href: url(`/whatsapp-ai-agent#${a.anchor}`),
      })),
    },
    {
      label: tNav('calling'),
      href: url('/calling'),
      children: CALLING.map((c) => ({
        label: tNav(c.key as any),
        href: url(`/calling/${c.slug}`),
      })),
    },
    {
      label: t('product'),
      href: url('/features'),
      navSchema: 'group',
      children: [
        {
          label: t('features'),
          href: url('/features'),
          children: [
            { label: t('allFeatures'), href: url('/features') },
            ...FEATURES.map((f) => ({
              label: t(f.key as any),
              href: url(`/features/${f.slug}`),
            })),
          ],
        },
        { label: t('pricing'), href: url('/pricing') },
        { label: t('comparison'), href: url('/comparison') },
        { label: t('aboutUs'), href: url('/about-us') },
      ],
    },
    {
      label: t('integrations'),
      href: url('/integrations'),
      children: INTEGRATIONS.map((i) => ({
        label: t('integrationName', { name: i.name }),
        href: url(`/${i.slug}-whatsapp-integration`),
      })),
    },
    { label: tNav('mcpFeaturedLead'), href: url('/mcp') },
    {
      label: t('whatsappApi'),
      href: url('/whatsapp-api'),
      children: [
        { label: t('coexistence'), href: url('/whatsapp-api/coexistence') },
        { label: t('templates'), href: url('/whatsapp-api/templates') },
        { label: t('broadcast'), href: url('/whatsapp-api/broadcast') },
      ],
    },
    {
      label: t('resources'),
      href: url('/blog'),
      navSchema: 'group',
      children: [
        { label: t('blog'), href: url('/blog') },
        { label: t('authors'), href: url('/blog/authors') },
        {
          label: t('caseStudies'),
          href: url('/case-studies'),
          children: [{ label: 'Lokmax', href: url('/case-studies/lokmaxltda') }],
        },
        { label: t('helpCenter'), href: 'https://help.eazybe.com/introduction' },
        { label: t('becomePartner'), href: url('/become-our-partner') },
      ],
    },
    {
      label: t('freeTools'),
      href: url('/tools'),
      children: [
        { label: t('allTools'), href: url('/tools') },
        { label: t('toolPricingCalc'), href: WA_PRICING_PATH_BY_LOCALE[locale] ?? WA_PRICING_PATH_BY_LOCALE.en },
        { label: t('toolRoiCalc'), href: url('/marketing-roi-calculator') },
        { label: t('toolCallCenterRoi'), href: url('/call-center-roi-calculator') },
        { label: t('toolQr'), href: url('/whatsapp-qr-code-generator') },
        { label: t('toolChatLink'), href: url('/whatsapp-chat-link-generator') },
        { label: t('toolChatWidget'), href: url('/whatsapp-chat-widget') },
      ],
    },
    {
      // These pages are noindex.
      label: t('legal'),
      navSchema: 'exclude',
      children: [
        { label: t('terms'), href: url('/terms') },
        { label: t('privacy'), href: url('/privacy') },
        { label: t('msa'), href: url('/msa') },
        { label: tFooter('security'), href: url('/security') },
      ],
    },
    {
      // Sitemaps in other languages, not navigation for this one.
      label: t('languages'),
      navSchema: 'exclude',
      children: routing.locales.map((l) => ({
        label: LOCALE_NAMES[l] || l,
        href: l === 'en' ? '/sitemap' : `/${l}/sitemap`,
      })),
    },
  ]
}

// The main sections listed in the navigation schema, in order.
const MAIN_NAV_PATHS = [
  '',
  '/whatsapp-ai-agent',
  '/calling',
  '/features',
  '/integrations',
  '/mcp',
  '/whatsapp-api',
  '/pricing',
  '/comparison',
  '/blog',
  '/case-studies',
  '/tools',
]

/**
 * SiteNavigationElement list for the homepage: the main sections only, with names
 * and URLs taken from the sitemap tree for this locale. Carries no @id on purpose.
 */
export async function getSiteNavigationJsonLd(locale: string): Promise<object> {
  const tree = await getSitemapTree(locale)
  const elements = new Map<string, string>()
  const prefix = locale === 'en' ? '' : `/${locale}`

  const add =(label: string, href?: string) => {
    if (!href || !href.startsWith('/') || href.includes('#')) return
    const pageUrl = `${SITE_URL}${href}`
    if (!elements.has(pageUrl)) elements.set(pageUrl, label)
  }
  const walk = (nodes: SitemapNode[]) => {
    for (const node of nodes) {
      if (!isBranch(node)) {
        add(node.label, node.href)
      } else if (node.navSchema !== 'exclude') {
        if (node.navSchema !== 'group') add(node.label, node.href)
        walk(node.children)
      }
    }
  }
  walk(tree)

  return {
    '@context': 'https://schema.org',
    '@graph': MAIN_NAV_PATHS.map((path) => {
      const url = `${SITE_URL}${prefix}${path || (prefix ? '' : '/')}`
      return { '@type': 'SiteNavigationElement', name: elements.get(url), url }
    }),
  }
}
