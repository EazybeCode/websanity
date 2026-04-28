import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryIndex, translatePageOverrides } from '@/lib/sanity-queries'
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
  const rawData = await getCategoryIndex('features', language)

  // The /features categoryIndexPage doc in Sanity is thin (intro + 3
  // + 3 featuredItems). To mirror /integrations' richer layout AND surface
  // every feature listed in the platform dropdown of the header, we:
  //   1. Merge the dropdown features into `featuredItems` (deduped on slug,
  //      so any of these the editor adds in Sanity later wins automatically).
  //   2. Mark the four primary features as `isFeatured: true`, the rest as
  //      `isFeatured: false`, producing Featured + More Options sections.
  //   3. Backfill missing hero / benefits / howItWorks / faq sections with
  //      hardcoded English content.
  //
  // Sanity content always wins per section — these defaults only fill gaps.
  // The auto-translation pipeline in getCategoryIndex runs BEFORE this
  // backfill, so non-English locales still see English copy in these
  // sections until editors add localized content in Sanity Studio.
  const FEATURED_FEATURE_SLUGS = new Set([
    'revenue-inbox',
    'whatsapp-copilot',
    'team-inbox',
    'whatsapp-crm',
  ])

  // Mirrors /integrations: hero CTAs are authoritative in code so they
  // always trigger the global trial / demo modals (via the `#trial` /
  // `#demo` URL convention CategoryIndexClient understands), with localized
  // labels matching the rest of the site.
  const heroCtaLabels: Record<string, { install: string; demo: string }> = {
    en: { install: 'Install for Free', demo: 'Book a Demo' },
    es: { install: 'Instalar Gratis', demo: 'Reservar Demo' },
    br: { install: 'Instalar Grátis', demo: 'Agendar Demo' },
    tr: { install: 'Ücretsiz Yükle', demo: 'Demo Rezervasyonu Yap' },
  }
  const ctaLabels = heroCtaLabels[locale] || heroCtaLabels.en

  // Mirrors the header MegaMenuHeader's Platform dropdown — keep these in
  // sync if the dropdown changes.
  const DROPDOWN_FEATURES: Array<{
    name: string
    slug: string
    description: string
    icon: string
    color: string
    tags?: string[]
  }> = [
    {
      name: 'Cloud Backup',
      slug: 'cloud-backup',
      description: 'Automatic, encrypted WhatsApp conversation backup so you never lose customer history.',
      icon: 'CloudUpload',
      color: '#3B82F6',
      tags: ['Productivity'],
    },
    {
      name: 'Team Inbox',
      slug: 'team-inbox',
      description: 'A shared WhatsApp inbox for sales and support teams with assignment and SLA tracking.',
      icon: 'Inbox',
      color: '#8B5CF6',
      tags: ['Productivity'],
    },
    {
      name: 'Quick Reply',
      slug: 'quick-reply',
      description: 'Reusable message templates that turn 5-minute replies into one keystroke.',
      icon: 'Zap',
      color: '#F59E0B',
      tags: ['Productivity'],
    },
    {
      name: 'Message Scheduler',
      slug: 'scheduler',
      description: 'Schedule WhatsApp messages to land at the right moment in any timezone.',
      icon: 'Clock',
      color: '#06B6D4',
      tags: ['Productivity'],
    },
    {
      name: 'Revenue Inbox',
      slug: 'revenue-inbox',
      description: 'AI-powered deal insights that surface revenue opportunities hidden in your WhatsApp conversations.',
      icon: 'TrendingUp',
      color: '#10B981',
      tags: ['Sales Intelligence', 'New'],
    },
    {
      name: 'Rep Radar',
      slug: 'rep-radar',
      description: 'Live visibility into every rep’s WhatsApp activity, response time, and pipeline impact.',
      icon: 'Activity',
      color: '#EF4444',
      tags: ['Sales Intelligence'],
    },
    {
      name: 'WhatsApp Copilot',
      slug: 'whatsapp-copilot',
      description: 'AI replies, summaries, and lead qualification — drafted in your voice, ready to send.',
      icon: 'Sparkles',
      color: '#EC4899',
      tags: ['Sales Intelligence', 'AI'],
    },
    {
      name: 'WhatsApp CRM',
      slug: 'whatsapp-crm',
      description: 'A full CRM sidebar inside WhatsApp Web — contacts, deals, tasks, and notes without context switching.',
      icon: 'LayoutGrid',
      color: '#2563EB',
      tags: ['Sales Intelligence'],
    },
  ]

  // English-only authored content for the page-level overrides. Routed
  // through `translatePageOverrides` below so es/br/tr render in the
  // visitor's language without manual Sanity edits.
  const englishOverrides = {
    hero: {
      badge: 'Eazybe Platform',
      description:
        'A complete sales platform built on top of WhatsApp Web. Sync conversations to your CRM, automate follow-ups, qualify leads with AI, and never lose context again.',
      headline: 'Every Eazybe feature,',
      headlineHighlight: 'inside WhatsApp Web',
    },
    intro: {
      headline: 'Your sales workflow, inside WhatsApp Web',
      description:
        'One Chrome extension that adds CRM sync, a shared inbox, scheduled messages, AI-drafted replies, and a handful of other sales tools. All running in the same WhatsApp tab your team already has open.',
    },
    benefits: {
      badge: 'Why Eazybe',
      headline: 'Built for sales teams that live on WhatsApp',
      items: [
        {
          title: 'No-code setup',
          description:
            'Install the Chrome extension in 60 seconds. No developers, no IT tickets, no waiting.',
        },
        {
          title: 'Works with your WhatsApp',
          description:
            'Compatible with personal WhatsApp, WhatsApp Business App, and the WhatsApp Business API. Keep what you have.',
        },
        {
          title: 'Native CRM sync',
          description:
            'Two-way sync with HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, Freshdesk, and more, out of the box.',
        },
        {
          title: 'AI that closes deals',
          description:
            'AI-drafted replies, lead qualification, deal-coldness detection, and automated follow-ups, all inside WhatsApp Web.',
        },
        {
          title: 'Team visibility',
          description:
            'Shared inboxes, rep activity tracking, and conversation handoffs so nothing falls through the cracks.',
        },
        {
          title: 'Enterprise-grade security',
          description:
            'SOC 2 Type II, GDPR-compliant, Meta Business Partner. Your customer data stays yours.',
        },
      ],
    },
    howItWorks: {
      badge: 'How It Works',
      headline: 'Get started in 3 steps',
      description: 'No developers. No IT tickets. No waiting.',
      steps: [
        {
          number: '01',
          title: 'Install the Chrome Extension',
          description: 'One click from the Chrome Web Store. Takes 60 seconds.',
        },
        {
          number: '02',
          title: 'Connect Your CRM',
          description:
            'OAuth login to HubSpot, Salesforce, Zoho, or any CRM you already use. No API keys to manage.',
        },
        {
          number: '03',
          title: 'Open WhatsApp Web',
          description:
            'The Eazybe sidebar appears next to every conversation. Conversations start syncing instantly.',
        },
      ],
    },
    faq: {
      badge: 'FAQ',
      headline: 'Common questions about Eazybe features',
      items: [
        {
          question: 'Do I need WhatsApp Business API to use Eazybe?',
          answer:
            'No. Eazybe works with personal WhatsApp, the WhatsApp Business App, and the WhatsApp Business API. Unlike competitors that force expensive API migrations, we work with whatever you already use.',
        },
        {
          question: 'Which CRMs does Eazybe sync with?',
          answer:
            'Native integrations for HubSpot, Salesforce, Zoho CRM, Pipedrive, Bitrix24, LeadSquared, Freshdesk, Monday.com, Google Sheets, and Google Calendar, plus custom webhooks for any other system.',
        },
        {
          question: 'How quickly can my team be live?',
          answer:
            'Most teams are syncing within 30 minutes. Install the Chrome extension, connect your CRM with OAuth, open WhatsApp Web. No developer resources needed.',
        },
        {
          question: 'What happens to conversations when reps leave the company?',
          answer:
            'All conversations stay in your CRM forever. Customer history belongs to your company, not personal phones. The next rep picks up with full context.',
        },
        {
          question: 'Is Eazybe secure for handling customer data?',
          answer:
            'Yes. SOC 2 Type II certified, GDPR-compliant, official Meta Business Partner. Messages are encrypted in transit and at rest. Trusted by healthcare, finance, and government customers.',
        },
        {
          question: 'Can the AI Copilot draft replies in my voice?',
          answer:
            'Yes. WhatsApp Copilot learns from your historical conversations to draft replies that match your tone and team style. You always review before sending.',
        },
      ],
    },
  }

  // Translate the overrides for the current locale (cached per process so
  // the cost is paid once per cold start). For en, returns the input as-is.
  const overrides = await translatePageOverrides(
    englishOverrides,
    locale,
    `features-overrides-${locale}`,
  )

  // Same trick for the dropdown features so each card's name/description/tags
  // render in the visitor's language. Slugs/icons/colors are preserved by
  // the translator's NON_TRANSLATABLE_KEYS skip-list.
  const translatedDropdownFeatures = await translatePageOverrides(
    DROPDOWN_FEATURES,
    locale,
    `features-dropdown-${locale}`,
  )

  // Build the merged featuredItems list: Sanity items first (so editor edits
  // win), then dropdown items that aren't already there.
  const sanityFeaturedItems: Array<any> = Array.isArray(rawData?.featuredItems)
    ? rawData!.featuredItems
    : []
  const sanitySlugs = new Set(sanityFeaturedItems.map((i: any) => i?.slug))
  const dropdownToMerge = translatedDropdownFeatures
    .filter((f: any) => !sanitySlugs.has(f.slug))
    .map((f: any) => ({
      ...f,
      isFeatured: false, // overwritten below
    }))
  const mergedFeaturedItems = [...sanityFeaturedItems, ...dropdownToMerge].map((item: any) => ({
    ...item,
    isFeatured: item?.slug ? FEATURED_FEATURE_SLUGS.has(item.slug) : false,
  }))

  const data = rawData
    ? {
        ...rawData,
        ...overrides,
        hero: {
          ...(rawData.hero || {}),
          ...overrides.hero,
          // CTAs stay code-authoritative with locale-aware labels and the
          // `#trial` / `#demo` URL convention CategoryIndexClient routes
          // to the global modal — exactly mirroring /integrations.
          primaryCta: { label: ctaLabels.install, url: '#trial' },
          secondaryCta: { label: ctaLabels.demo, url: '#demo' },
        },
        featuredItems: mergedFeaturedItems,
      }
    : rawData

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
