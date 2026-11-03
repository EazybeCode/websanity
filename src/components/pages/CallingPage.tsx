import type { Metadata } from 'next'
import { ORG_ID, SOFTWARE_ID } from '@/data/global-schemas'
import { CALLING_UPDATED, callingPath, type CallingPageContent } from '@/data/calling-content'
import { getCallingUi, localePrefix } from '@/data/calling-i18n'
import type { CallingUi } from '@/data/calling-ui'
import { getAlternates } from '@/lib/seo-helpers'
import { SetupSteps, FitsTabs } from '@/components/pages/WhatsappAiAgentInteractive'
import {
  CALLING_DESIGN_CSS,
  CallingFaq,
  CallingProof,
  ChannelCard,
  CompareTable,
  DialCard,
  PlayerCard,
  SimDemo,
} from '@/components/pages/CallingShared'
import { CallingPricePanel } from '@/components/pages/CallingPricePanel'
import { CALLING_FEATURES_CSS, FeatureGrid, RelatedGrid } from '@/components/pages/CallingFeatures'

const SITE_URL = 'https://eazybe.com'
const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/whatsapp-ai-agents-with-c/aihpfgoknheimieofcfjiobnmddldjeb?utm_medium=Organic&utm_source=website&utm_campaign=eazybe%20workspace'
const DEMO_URL = 'https://eazybe.info/demono'

const LANG: Record<string, string> = { en: 'en-US', es: 'es', br: 'pt-BR', tr: 'tr' }
const OG_LOCALE: Record<string, string> = { en: 'en_US', es: 'es_ES', br: 'pt_BR', tr: 'tr_TR' }

export function callingMetadata(page: CallingPageContent, locale: string): Metadata {
  const url = `${SITE_URL}${localePrefix(locale)}${callingPath(page.slug)}`
  const image = { url: `${SITE_URL}/og/calling.jpg`, width: 1200, height: 630, alt: page.meta.og.title }
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: getAlternates(locale, callingPath(page.slug)),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title: page.meta.og.title,
      description: page.meta.og.description,
      siteName: 'Eazybe',
      locale: OG_LOCALE[locale] ?? 'en_US',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: page.meta.twitter.title, description: page.meta.twitter.description, images: [image.url] },
  }
}

// Brand v1.2 styles, same class names as /whatsapp-ai-agent because the shared
// client components (steps, tabs, FAQ toggle) rely on them.
export const CALLING_CSS = `
  .landing .v16-brand .aia-hero { padding: 170px 0 90px; }
  .landing .v16-brand .aia-hero .hero-split-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; }
  .landing .v16-brand .aia-hero h1 { margin-left: 0; max-width: 18ch; }
  .landing .v16-brand .aia-hero .lede { margin: 0; text-align: left; max-width: 560px; }
  .landing .v16-brand .aia-hero .aia-chips, .landing .v16-brand .aia-hero .aia-ctas { justify-content: flex-start; }
  .landing .v16-brand .cal-crumbs { margin: 0 0 22px; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.72); }
  .landing .v16-brand .cal-crumbs li + li::before { content: '/'; margin-right: 8px; color: rgba(255, 255, 255, 0.45); }
  .landing .v16-brand .cal-crumbs a { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
  @media (max-width: 980px) {
    /* The hero stays left-aligned on every screen size. */
    .landing .v16-brand .aia-hero { padding: 130px 0 64px; text-align: left; }
    .landing .v16-brand .aia-hero .hero-split-grid { grid-template-columns: minmax(0, 1fr); gap: 36px; }
    .landing .v16-brand .aia-hero h1, .landing .v16-brand .aia-hero .lede { margin-left: 0; margin-right: 0; text-align: left; }
    .landing .v16-brand .aia-hero .aia-chips, .landing .v16-brand .aia-hero .aia-ctas, .landing .v16-brand .aia-hero .cal-crumbs { justify-content: flex-start; }
  }
  .landing .v16-brand .aia-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
  .landing .v16-brand .aia-chip { padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.18); background: rgba(255, 255, 255, 0.06); font-family: var(--f-mono); font-size: 12px; font-weight: 500; color: #e6e6e8; }
  .landing .v16-brand .aia-ctas { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 32px; }

  .landing .v16-brand .cal-window { border-radius: 16px; overflow: hidden; background: #fff; border: 1px solid rgba(255, 255, 255, 0.14); box-shadow: 0 30px 80px -30px rgba(43, 89, 255, 0.55), 0 0 0 6px rgba(255, 255, 255, 0.04); text-align: left; }
  .landing .v16-brand .cal-window-bar { display: flex; align-items: center; gap: 6px; padding: 12px 16px; background: #17171b; }
  .landing .v16-brand .cal-window-bar i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); }
  .landing .v16-brand .cal-window-bar span { margin-left: 8px; font-family: var(--f-mono); font-size: 12px; color: #e6e6e8; }
  .landing .v16-brand .cal-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 18px 20px; border-top: 1px solid #e7e7ea; }
  .landing .v16-brand .cal-row:first-of-type { border-top: 0; }
  .landing .v16-brand .cal-row-main { min-width: 0; }
  .landing .v16-brand .cal-row-main strong { display: block; font-size: 15px; font-weight: 600; color: #0b0b0c; }
  .landing .v16-brand .cal-row-main span { display: block; margin-top: 2px; font-size: 13px; color: #55555c; }
  .landing .v16-brand .cal-row-status { flex-shrink: 0; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #2b59ff; background: #eef2ff; }
  .landing .v16-brand .cal-note { margin: 10px 0 0; font-size: 12px; text-align: center; color: rgba(255, 255, 255, 0.72); }

  /* Pricing: copy beside a dark panel of local prices */
  .landing .v16-brand .ch-price { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); border-radius: 16px; background: var(--paper); border: 1px solid var(--line); }
  .landing .v16-brand .ch-price-copy { padding: clamp(28px, 4vw, 52px); }
  .landing .v16-brand .ch-price-label { display: block; margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #2b59ff; }
  .landing .v16-brand .ch-price-copy h2 { margin: 0; font-size: clamp(28px, 3vw, 38px); line-height: 1.12; letter-spacing: -.03em; color: var(--ink); }
  .landing .v16-brand .ch-price-copy p { margin: 16px 0 26px; font-size: 16.5px; line-height: 1.65; color: var(--ink-2); }
  .landing .v16-brand .ch-price-panel { display: flex; flex-direction: column; justify-content: center; border-radius: 0 15px 15px 0; background: #111114; }
  .landing .v16-brand .ch-price-country { padding: 22px clamp(24px, 3vw, 40px) 18px; border-bottom: 1px solid rgba(255, 255, 255, .1); }
  .landing .v16-brand .ch-price-list { margin: 0; transition: opacity .2s; }
  .landing .v16-brand .ch-price-list div { padding: 20px clamp(24px, 3vw, 40px); border-top: 1px solid rgba(255, 255, 255, .1); }
  .landing .v16-brand .ch-price-list div:first-child { border-top: 0; }
  .landing .v16-brand .ch-price-list dt { font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: #b9b9c0; }
  .landing .v16-brand .ch-price-list dd { margin: 8px 0 0; font-size: 30px; font-weight: 700; letter-spacing: -.03em; line-height: 1.1; color: #fff; font-variant-numeric: tabular-nums; }
  .landing .v16-brand .ch-price-list dd small { margin-left: 4px; font-size: 14px; font-weight: 500; letter-spacing: 0; color: #d6d6da; }
  @media (max-width: 820px) { .landing .v16-brand .ch-price { grid-template-columns: minmax(0, 1fr); } .landing .v16-brand .ch-price-panel { border-radius: 0 0 15px 15px; } }

  .landing .v16-brand .cal-shot { max-width: 1100px; margin: 0 auto; }
  .landing .v16-brand .cal-shot img { display: block; width: 100%; height: auto; border: 1px solid var(--line); border-radius: 16px; box-shadow: 0 24px 60px -30px rgba(43, 89, 255, 0.35); }
  .landing .v16-brand .cal-shot figcaption { margin-top: 12px; text-align: center; font-size: 13px; color: var(--ink-3); }
  .landing .v16-brand .aia-sec { padding: 88px 0; }
  @media (max-width: 768px) { .landing .v16-brand .aia-sec { padding: 64px 0; } }
  .landing .v16-brand .aia-sec-alt { background: var(--bg-2); }
  .landing .v16-brand .aia-sec .sec-head.centered p { max-width: 720px; }

  .landing .v16-brand .aia-answer { max-width: 1100px; margin: 0 auto; padding: clamp(26px, 4vw, 44px) clamp(22px, 4vw, 56px); }
  .landing .v16-brand .aia-answer:hover { transform: none; }
  .landing .v16-brand .aia-answer h2 { text-align: center; font-size: clamp(24px, 2.8vw, 32px); line-height: 1.15; color: var(--ink); margin: 0 0 14px; }
  .landing .v16-brand .aia-answer p { margin: 0; font-size: 17px; line-height: 1.7; color: var(--ink-2); }
  .landing .v16-brand .aia-answer p + p { margin-top: 12px; }
  .landing .v16-brand .aia-facts { max-width: 1100px; margin: 20px auto 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
  .landing .v16-brand .aia-fact { padding: 18px 14px; text-align: center; border: 1px solid var(--line); border-radius: 10px; background: var(--paper); }
  .landing .v16-brand .aia-fact strong { display: block; font-size: 28px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; color: var(--ink); }
  .landing .v16-brand .aia-fact span { display: block; margin-top: 6px; font-size: 12.5px; line-height: 1.4; color: var(--ink-3); }

  .landing .v16-brand .aia-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 16px; }
  .landing .v16-brand .aia-card h3 { font-size: 17px; margin: 0 0 8px; color: var(--ink); }
  .landing .v16-brand .aia-card p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-3); }
  .landing .v16-brand a.cal-link-card { display: flex; flex-direction: column; color: inherit; }
  .landing .v16-brand a.cal-link-card:hover { border-color: #2b59ff; }
  .landing .v16-brand a.cal-link-card:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .cal-link-more { margin-top: auto; padding-top: 14px; font-size: 14px; font-weight: 600; color: #2b59ff; }

  .landing .v16-brand .aia-mem { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
  @media (max-width: 900px) { .landing .v16-brand .aia-mem { grid-template-columns: 1fr; } }
  .landing .v16-brand .aia-mem .sec-head { margin-bottom: 0; }
  .landing .v16-brand .aia-mem-point { display: flex; gap: 12px; align-items: flex-start; padding: 16px 18px; background: #111114; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; color: #e6e6e8; font-size: 15px; line-height: 1.55; }
  .landing .v16-brand .aia-mem-point + .aia-mem-point { margin-top: 10px; }
  .landing .v16-brand .aia-mem-check { flex-shrink: 0; width: 20px; height: 20px; border-radius: 6px; margin-top: 2px; display: flex; align-items: center; justify-content: center; background: #2ec27e; color: #0b0b0c; }

  .landing .v16-brand .aia-table-wrap { max-width: 1000px; margin: 0 auto; padding: 0; overflow-x: auto; scrollbar-width: thin; }
  .landing .v16-brand .aia-table-wrap:hover { transform: none; }
  .landing .v16-brand .aia-table { width: 100%; min-width: 640px; border-collapse: collapse; font-size: 14.5px; line-height: 1.55; }
  .landing .v16-brand .aia-table th, .landing .v16-brand .aia-table td { padding: 16px 20px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--line); }
  .landing .v16-brand .aia-table thead th { font-family: var(--f-mono); font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
  .landing .v16-brand .aia-table tbody th { font-weight: 600; color: var(--ink); width: 26%; }
  .landing .v16-brand .aia-table td { color: var(--ink-2); }
  .landing .v16-brand .aia-table tbody tr:last-child > * { border-bottom: 0; }
  .landing .v16-brand .cal-verdict { max-width: 1000px; margin: 16px auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }

  .landing .v16-brand .aia-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .landing .v16-brand .aia-step-btn { display: block; width: 100%; text-align: left; cursor: pointer; font: inherit; }
  .landing .v16-brand .aia-steps .aia-step-btn.is-active { box-shadow: 0 0 0 1px #2b59ff, 0 14px 34px rgba(43, 89, 255, 0.14) !important; }
  .landing .v16-brand .aia-step-btn:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .aia-step-n { width: 34px; height: 34px; border-radius: 8px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; font-family: var(--f-mono); font-size: 14px; font-weight: 600; color: #2b59ff; background: #eef2ff; border: 1px solid #d5ddff; transition: background .2s, color .2s; }
  .landing .v16-brand .is-active .aia-step-n { background: #2b59ff; border-color: #2b59ff; color: #fff; }
  .landing .v16-brand .aia-step-n.is-done { background: #2ec27e; border-color: #2ec27e; color: #fff; }
  .landing .v16-brand .aia-step-btn h3 { font-size: 16.5px; margin: 0 0 6px; color: var(--ink); }
  .landing .v16-brand .aia-step-btn p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-3); }
  .landing .v16-brand .aia-step-bar { margin-top: 18px; height: 2px; border-radius: 2px; overflow: hidden; background: var(--line); }
  .landing .v16-brand .aia-step-bar > span { display: block; height: 100%; width: 0; background: #2b59ff; animation: aia-bar-fill 3.5s linear forwards; }
  @keyframes aia-bar-fill { to { width: 100%; } }
  @media (prefers-reduced-motion: reduce) { .landing .v16-brand .aia-step-bar { display: none; } }

  .landing .v16-brand .aia-fits { max-width: 820px; margin: 0 auto; }
  .landing .v16-brand .aia-fits-tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 20px; }
  .landing .v16-brand .aia-fits-tab { cursor: pointer; padding: 10px 16px; border-radius: 8px; font: inherit; font-size: 14px; font-weight: 600; color: var(--ink-2); background: var(--paper); border: 1px solid var(--line-2); transition: background .18s, color .18s, border-color .18s; }
  .landing .v16-brand .aia-fits-tab:hover { border-color: var(--ink-3); }
  .landing .v16-brand .aia-fits-tab.is-active { background: #2b59ff; border-color: #2b59ff; color: #fff; }
  .landing .v16-brand .aia-fits-tab:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .aia-fits-pane { padding: clamp(26px, 4vw, 40px); text-align: center; }
  .landing .v16-brand .aia-fits-pane:hover { transform: none; }
  .landing .v16-brand .aia-fits-body[hidden] { display: none; }
  .landing .v16-brand .aia-fits-pane h3 { font-size: 20px; margin: 0 0 10px; color: var(--ink); }
  .landing .v16-brand .aia-fits-pane p { margin: 0 auto; max-width: 580px; font-size: 15.5px; line-height: 1.7; color: var(--ink-3); }
  .landing .v16-brand .aia-fits-dots { display: flex; gap: 6px; justify-content: center; margin-top: 22px; }
  .landing .v16-brand .aia-fits-dots span { width: 16px; height: 3px; border-radius: 2px; background: var(--line-2); transition: background .18s; }
  .landing .v16-brand .aia-fits-dots span.is-active { background: #2b59ff; }

  .landing .v16-brand .aia-price { max-width: 780px; margin: 0 auto; padding: clamp(26px, 4vw, 40px); }
  .landing .v16-brand .aia-price:hover { transform: none; }
  .landing .v16-brand .aia-price h2 { font-size: clamp(24px, 2.8vw, 32px); line-height: 1.15; color: var(--ink); margin: 0; }
  .landing .v16-brand .aia-price-lede { margin: 12px 0 22px; font-size: 16px; line-height: 1.65; color: var(--ink-3); }

  .landing .v16-brand .aia-faq { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 16px; align-items: start; }
  .landing .v16-brand .aia-faq-col { display: grid; gap: 10px; }
  .landing .v16-brand .aia-more-btn { display: flex; align-items: center; gap: 8px; margin: 14px auto 0; cursor: pointer; padding: 10px 18px; border-radius: 8px; border: 1px solid var(--line-2); background: var(--paper); font: inherit; font-size: 14px; font-weight: 600; color: #2b59ff; transition: border-color .2s; }
  .landing .v16-brand .aia-more-btn:hover { border-color: #2b59ff; }
  .landing .v16-brand .aia-more-btn:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .aia-more-arrow { transition: transform .2s; }
  .landing .v16-brand .aia-more-btn[aria-expanded='true'] .aia-more-arrow { transform: rotate(180deg); }
  .landing .v16-brand .aia-mmore-btn { display: none; }
  @media (max-width: 860px) {
    .landing .v16-brand .aia-mmore-btn { display: flex; }
    .landing .v16-brand .aia-mmore:not(.is-open) .aia-faq-col + .aia-faq-col { display: none; }
    .landing .v16-brand .aia-mmore:not(.is-open) .aia-faq-col:first-child > details:nth-child(n+6) { display: none; }
    .landing .v16-brand .aia-faq { grid-template-columns: 1fr; }
  }
  .landing .v16-brand .aia-faq details { background: var(--paper); border: 1px solid var(--line); border-radius: 10px; transition: border-color .2s; }
  .landing .v16-brand .aia-faq details[open] { border-color: rgba(43, 89, 255, 0.45); }
  .landing .v16-brand .aia-faq summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 18px 20px; font-size: 15.5px; font-weight: 600; color: var(--ink); }
  .landing .v16-brand .aia-faq summary::-webkit-details-marker { display: none; }
  .landing .v16-brand .aia-faq summary::after { content: '+'; flex-shrink: 0; width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 17px; color: var(--ink-3); background: var(--bg-2); transition: background .2s, color .2s; }
  .landing .v16-brand .aia-faq details[open] summary::after { content: '−'; background: #2b59ff; color: #fff; }
  .landing .v16-brand .aia-faq summary:focus-visible { outline: 2px solid #2b59ff; outline-offset: 2px; border-radius: 10px; }
  .landing .v16-brand .aia-faq details p { margin: 0; padding: 0 20px 20px; font-size: 15px; line-height: 1.7; color: var(--ink-3); }
`

const CHECK = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
)

/** Shared pricing card for every /calling page. Prices are local, from the same hook as /pricing. */
export function CallingPricingCard({ page, locale }: { page: CallingPageContent; locale: string }) {
  const ui = getCallingUi(locale)
  return (
    <div className="ch-price">
      <div className="ch-price-copy">
        <span className="ch-price-label">{ui.common.pricingLabel}</span>
        <h2>{page.pricing.h2}</h2>
        <p>{page.pricing.body}</p>
        <a href={`${localePrefix(locale)}/pricing`} className="btn btn-primary btn-lg">{ui.common.seePricing}</a>
      </div>
      <CallingPricePanel labels={ui.price} />
    </div>
  )
}

export function callingCrumbs(page: CallingPageContent, locale: string) {
  const ui = getCallingUi(locale)
  const prefix = localePrefix(locale)
  const pageUrl = `${SITE_URL}${prefix}${callingPath(page.slug)}`
  return [
    { name: ui.common.crumbHome, url: locale === 'en' ? `${SITE_URL}/` : `${SITE_URL}${prefix}` },
    { name: ui.common.crumbCalling, url: `${SITE_URL}${prefix}/calling` },
    ...(page.slug ? [{ name: page.navLabel, url: pageUrl }] : []),
  ]
}

export function callingSchema(page: CallingPageContent, locale: string) {
  const pageUrl = `${SITE_URL}${localePrefix(locale)}${callingPath(page.slug)}`
  const crumbs = callingCrumbs(page, locale)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.meta.title,
        description: page.meta.description,
        inLanguage: LANG[locale] ?? 'en-US',
        dateModified: CALLING_UPDATED,
        about: { '@id': SOFTWARE_ID },
        publisher: { '@id': ORG_ID },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: page.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      // Same @id and wording as the homepage node, so WebPage.about resolves here.
      // No AggregateRating or offers: calling plan pricing is not confirmed yet.
      {
        '@type': 'SoftwareApplication',
        '@id': SOFTWARE_ID,
        name: 'Eazybe',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Chrome Extension, Android',
        url: SITE_URL,
        publisher: { '@id': ORG_ID },
      },
    ],
  }
}

// The virtual number page's first three hero chips name countries, so they show flags.
const COUNTRY_FLAGS = ['/flags/us.svg', '/flags/ca.svg', '/flags/pr.svg']

function HeroDemo({ page, ui }: { page: CallingPageContent; ui: CallingUi }) {
  const rows = (
    <div className="cal-window" aria-hidden="true">
      <div className="cal-window-bar"><i /><i /><i /><span>{page.mock.title}</span></div>
      {page.mock.rows.map((r, i) => (
        <div key={r.name + r.detail} className="cal-row ch-row-live" style={{ ['--d' as string]: `${i * 4}s` }}>
          <div className="cal-row-main"><strong>{r.name}</strong><span>{r.detail}</span></div>
          <span className="cal-row-status">{r.status}</span>
        </div>
      ))}
    </div>
  )
  let demo = rows
  if (page.slug === 'auto-dialer') demo = <DialCard className="ch-float ch-static" ui={ui} />
  if (page.slug === 'virtual-phone-number') demo = <ChannelCard className="ch-float ch-static" ui={ui} />
  if (page.slug === 'sim-based-calling') demo = <SimDemo ui={ui} />
  if (page.slug === 'call-recording') demo = <><PlayerCard className="ch-float ch-static" time="07:02" ui={ui} />{rows}</>
  return (
    <div className="ch-hero-demo">
      {demo}
      <p className="cal-note">{ui.common.illustrative}</p>
    </div>
  )
}

export function CallingPage({ page, locale }: { page: CallingPageContent; locale: string }) {
  const ui = getCallingUi(locale)
  const prefix = localePrefix(locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(callingSchema(page, locale)) }} />
      <style dangerouslySetInnerHTML={{ __html: CALLING_CSS + CALLING_DESIGN_CSS + CALLING_FEATURES_CSS }} />

      {/* Left-aligned split hero. No entrance animation on the copy: h1 and lede are the LCP. */}
      <section className="page-hero hero-split aia-hero" data-tone="dark">
        <div className="container hero-split-grid">
          <div>
            <span className="hero-tag"><span className="pulse" /> {page.hero.tag}</span>
            <h1>{page.hero.h1Lead} <em>{page.hero.h1Em}</em></h1>
            <p className="lede">{page.hero.subtitle}</p>
            <ul className="ch-pills ch-pills-left">
              {page.hero.chips.map((c, i) => (
                <li key={c}>
                  {page.slug === 'virtual-phone-number' && COUNTRY_FLAGS[i] ? (
                    <img className="ch-flag" src={COUNTRY_FLAGS[i]} alt="" width={20} height={15} />
                  ) : (
                    <i aria-hidden="true">{CHECK}</i>
                  )}
                  {c}
                </li>
              ))}
            </ul>
            <div className="aia-ctas">
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{ui.common.startTrial}</a>
              <a href={DEMO_URL} className="btn btn-outline btn-lg">{ui.common.bookDemo}</a>
            </div>
          </div>
          <HeroDemo page={page} ui={ui} />
        </div>
      </section>

      <CallingProof ui={ui} />

      <section className="ch-intro">
        <div className="container">
          <span className="ch-eyebrow">{page.hero.tag}</span>
          <h2>{page.answer.h2}</h2>
          {page.answer.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      {page.screenshot && (
        <section className="ch-shot-sec" data-tone="dark">
          <div className="container">
            <div className="sec-head centered" style={{ marginBottom: 32 }}>
              <h2>{page.screenshot.h2}</h2>
            </div>
            <figure className="ch-shot-wide ch-rise" style={{ margin: '0 auto' }}>
              <img className="ch-shot" src={page.screenshot.src} alt={page.screenshot.alt} width={page.screenshot.width} height={page.screenshot.height} loading="lazy" decoding="async" />
              <figcaption>{page.screenshot.caption}</figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className="aia-sec">
        <div className="container">
          <div className="sec-head centered">
            <h2>{page.features.h2} <em>{page.features.h2Em}</em></h2>
            <p>{page.features.subtitle}</p>
          </div>
          <FeatureGrid slug={page.slug} cards={page.features.cards} ui={ui} />
        </div>
      </section>

      <section className="aia-sec aia-sec-alt">
        <div className="container">
          <div className="sec-head centered">
            <h2>{page.how.h2}</h2>
            <p>{page.how.subtitle}</p>
          </div>
          <SetupSteps steps={page.how.steps} />
        </div>
      </section>

      {page.table && (
        <section className="aia-sec ch-compare-sec" data-tone="dark">
          <div className="container">
            <div className="sec-head centered">
              <h2>{page.table.h2}</h2>
              <p>{page.table.subtitle}</p>
            </div>
            <CompareTable heads={[{ label: page.table.head[1] }, { label: page.table.head[2] }]} rows={page.table.rows} factorHeader={ui.common.factorHeader} />
            {page.table.verdict && (
              <div className="ch-verdicts">
                {page.table.verdict.map((v) => (
                  <article key={v.title} className="ch-verdict ch-rise"><h3>{v.title}</h3><p>{v.desc}</p></article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="aia-sec">
        <div className="container">
          <div className="sec-head centered">
            <h2>{page.useCases.h2}</h2>
            <p>{page.useCases.subtitle}</p>
          </div>
          <FitsTabs cards={page.useCases.cards} />
        </div>
      </section>

      <section className="aia-sec" data-tone="dark">
        <div className="container">
          <div className="aia-mem">
            <div className="sec-head">
              <h2>{page.record.h2}</h2>
              <p>{page.record.body}</p>
            </div>
            <div className="ch-rise">
              {page.record.points.map((p) => (
                <div key={p} className="aia-mem-point">
                  <span className="aia-mem-check" aria-hidden="true">{CHECK}</span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="aia-sec aia-sec-alt">
        <div className="container">
          <CallingPricingCard page={page} locale={locale} />
        </div>
      </section>

      <section className="aia-sec ch-faq-sec">
        <div className="container">
          <div className="sec-head centered">
            <span className="ch-eyebrow">{ui.common.faqEyebrow}</span>
            <h2>{ui.common.faqH2}</h2>
            <p>{page.faqIntro}</p>
          </div>
          <CallingFaq faq={page.faq} ui={ui} />
        </div>
      </section>

      <section className="aia-sec aia-sec-alt">
        <div className="container">
          <div className="sec-head centered">
            <span className="ch-eyebrow">{ui.common.productsEyebrow}</span>
            <h2>{ui.common.relatedH2}</h2>
            <p>{ui.common.relatedBefore}<a href={`${prefix}/calling`} className="ch-related-link">{ui.common.relatedLink}</a>{ui.common.relatedAfter}</p>
          </div>
          <RelatedGrid slugs={page.related} ui={ui} locale={locale} />
        </div>
      </section>

      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2>{ui.common.ctaH2}<br /><em>{ui.common.ctaH2Em}</em></h2>
          <p className="sub">{ui.common.ctaSub}</p>
          <div className="ctas">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{ui.common.startTrial}</a>
            <a href={DEMO_URL} className="btn btn-outline btn-lg">{ui.common.bookDemo}</a>
          </div>
          <ul className="ch-cta-facts">
            {ui.common.ctaFacts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
