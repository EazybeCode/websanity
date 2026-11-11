import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { QrGeneratorClient } from '@/components/pages/QrGeneratorClient'
import { getQrPageContent } from '@/data/whatsapp-qr-content'
import { pageDates, withPageDates } from '@/lib/page-dates'
import { WaToolLanding } from '@/components/pages/WaToolLanding'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function baseMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getQrPageContent(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, '/whatsapp-qr-code-generator'),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      title: t.meta.title.replace(' | Eazybe', ''),
      description: t.meta.ogDescription,
      siteName: 'Eazybe',
    },
  }
}

// SVG icons — kept in JSX so the translation file stays pure strings
const ICON_WEBSITE = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="2" y1="7" x2="22" y2="7" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)
const ICON_PRINT = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" rx="1" />
  </svg>
)
const ICON_SOCIAL = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22 6 12 13 2 6" />
  </svg>
)
const ICON_CHECK = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5L20 7" />
  </svg>
)
const ICON_CHAT = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)
const ICON_TREND = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)
const ICON_CLOCK = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
const ICON_SHIELD = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
const ICON_BUBBLE = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)
const ICON_CIRCLE_CHECK = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const SITE_URL = 'https://eazybe.com'

export default async function WhatsAppQrGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getQrPageContent(locale)


  // ─── JSON-LD: BreadcrumbList ──────────────────────────────────────────────
  const localePath = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const pageUrl = `${SITE_URL}${localePath}/whatsapp-qr-code-generator`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.current, item: pageUrl },
    ],
  }

  // ─── JSON-LD: FAQPage (built dynamically from the localized FAQ items) ────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  const useCases = [
    { title: t.useCases.websiteTitle, body: t.useCases.websiteBody, icon: ICON_WEBSITE },
    { title: t.useCases.printTitle, body: t.useCases.printBody, icon: ICON_PRINT },
    { title: t.useCases.socialTitle, body: t.useCases.socialBody, icon: ICON_SOCIAL },
  ]
  const benefits = [
    { title: t.benefits.noInstallTitle, body: t.benefits.noInstallBody, icon: ICON_CHECK },
    { title: t.benefits.prefilledTitle, body: t.benefits.prefilledBody, icon: ICON_CHAT },
    { title: t.benefits.conversionTitle, body: t.benefits.conversionBody, icon: ICON_TREND },
    { title: t.benefits.freeTitle, body: t.benefits.freeBody, icon: ICON_CLOCK },
  ]
  const benefitCards = [
    { title: t.benefitCards.scanTitle, body: t.benefitCards.scanBody, icon: ICON_SHIELD },
    { title: t.benefitCards.clickTitle, body: t.benefitCards.clickBody, icon: ICON_BUBBLE },
    { title: t.benefitCards.leadsTitle, body: t.benefitCards.leadsBody, icon: ICON_CIRCLE_CHECK },
  ]

  return (
    <>
      {/* JSON-LD structured data: BreadcrumbList + FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WaToolLanding
        locale={locale}
        anchorId="qr-generator"
        hero={t.hero}
        tryItNow={t.tryItNow}
        generator={<QrGeneratorClient labels={t.generator} />}
        useCases={{ ...t.useCases, items: useCases }}
        seo={t.seo}
        snippet="https://wa.me/[country code + phone number]?text=[message]"
        benefits={{ ...t.benefits, items: benefits }}
        benefitCards={{ ...t.benefitCards, items: benefitCards }}
        faq={t.faq}
        cta={t.cta}
      />
    </>
  )
}

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: '/whatsapp-qr-code-generator' }))
}
