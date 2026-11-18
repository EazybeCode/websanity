import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { ORG_ID, SOFTWARE_ID, SOFTWARE_RATING, getBasicAiOffers } from '@/data/global-schemas'
import { getAiAgentPageContent } from '@/data/whatsapp-ai-agent-content'
import { AI_AGENT_EN_SLUGS } from '@/data/ai-agent-posts'
import { getPostsByEnSlugs } from '@/lib/sanity-queries'
import { SetupSteps, FitsTabs, ReadMoreFade, LazyVideo, MobileMore } from '@/components/pages/WhatsappAiAgentInteractive'
import { pageDates, withPageDates } from '@/lib/page-dates'

export const dynamic = 'force-static'
// Re-render hourly so newly published AI-agent posts show up in the related list.
export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const SITE_URL = 'https://eazybe.com'
// Same listing + UTM as CHROME_STORE_WEBSITE_URL (that module is client-only,
// so the string is repeated here for this server component).
const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/whatsapp-ai-agents-with-c/aihpfgoknheimieofcfjiobnmddldjeb?utm_medium=Organic&utm_source=website&utm_campaign=eazybe%20workspace'
const DEMO_URL = 'https://eazybe.info/demono'
// Same dates as the article:published_time / article:modified_time meta tags.
const PAGE_DATES = pageDates({ page: '/whatsapp-ai-agent' })
const LANG: Record<string, string> = { en: 'en-US', es: 'es', br: 'pt-BR', tr: 'tr' }
const OG_LOCALE: Record<string, string> = { en: 'en_US', es: 'es_ES', br: 'pt_BR', tr: 'tr_TR' }

const prefixFor = (locale: string) => (locale === 'en' ? '' : `/${locale}`)
const HERO_VIDEO_LABEL: Record<string, string> = {
  en: 'Eazybe AI analysis open next to a WhatsApp chat and synced to HubSpot',
  es: 'Análisis de IA de Eazybe junto a un chat de WhatsApp, sincronizado con HubSpot',
  br: 'Análise de IA da Eazybe ao lado de uma conversa do WhatsApp, sincronizada com o HubSpot',
  tr: "Bir WhatsApp sohbetinin yanında açık ve HubSpot'a senkronize Eazybe Yapay Zeka analizi",
}
// Customer logos, same assets and names as the homepage strip. Square marks get
// their name printed beside them.
const CUSTOMER_LOGOS = [
  { name: 'Physics Wallah', src: '/homepage-v16/img/12652a629a3e.webp', w: 46, h: 48, showName: true },
  { name: 'University Living', src: '/homepage-v16/img/3b98e2d678b3.webp', w: 137, h: 38 },
  { name: 'WanderOn', src: '/homepage-v16/img/6eab0ad57af6.webp', w: 50, h: 50, showName: true },
  { name: 'Studyin', src: '/homepage-v16/img/1be35e7b23d7.webp', w: 139, h: 32 },
  { name: 'Kreedo', src: '/homepage-v16/img/13d10fb34398.webp', w: 128, h: 34 },
  { name: 'TravClan', src: '/homepage-v16/img/2a887853a6c7.webp', w: 132, h: 34 },
  { name: 'Uniacco', src: '/homepage-v16/img/d82705f3f33a.webp', w: 33, h: 36, showName: true },
  { name: 'Unicreds', src: '/homepage-v16/img/2b4fbff43c65.webp', w: 192, h: 31 },
]
const MORE_LABELS: Record<string, [string, string]> = {
  en: ['Read more', 'Show less'],
  es: ['Leer más', 'Mostrar menos'],
  br: ['Ler mais', 'Mostrar menos'],
  tr: ['Devamını oku', 'Daha az göster'],
}

async function baseMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getAiAgentPageContent(locale)
  const url = `${SITE_URL}${prefixFor(locale)}/whatsapp-ai-agent`
  const image = { url: `${SITE_URL}/og/whatsapp-ai-agent-${locale}.jpg`, width: 1200, height: 630, alt: t.meta.ogTitle }
  return {
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: 'Eazybe', url: `https://eazybe.com${prefixFor(locale)}/about-us` }],
    alternates: getAlternates(locale, '/whatsapp-ai-agent'),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      siteName: 'Eazybe',
      locale: OG_LOCALE[locale] ?? 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      images: [image.url],
    },
  }
}

// Icons stay here so the content file is pure strings. Order matches agents.cards.
const AGENT_ICONS = [
  // CRM Sync — refresh arrows
  <svg key="sync" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" /><path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" /><path d="M3 21v-5h5" /><path d="M21 3v5h-5" /></svg>,
  // Lead Qualification — target
  <svg key="lead" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>,
  // Revenue — trend
  <svg key="rev" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></svg>,
  // Customer Success — chat
  <svg key="cs" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9 10h.01M13 10h.01" /></svg>,
  // CTWA — megaphone
  <svg key="ctwa" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5L3 11z" /></svg>,
  // Agent Builder — blocks
  <svg key="builder" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><path d="M17 14v6M14 17h6" /></svg>,
]

// Page styles follow the brand guidelines (v1.2 · Brand v3, see
// components/pages/brand-pages.css): flat white light sections, ink + dot-grid
// dark sections, Geist Bold headings with one blue phrase, 6/8/10/16px corners,
// 1px hairlines, Eazybe Blue #2B59FF as the only accent. Shared pieces
// (page-hero, sec-head, card, btn, final-cta) come from the site CSS; this
// block only covers what is unique to this page.
const PAGE_CSS = `
  /* Hero: split layout (copy left, product clip right) */
  .landing .v16-brand .aia-hero { padding: 190px 0 90px; }
  .landing .v16-brand .aia-hero .hero-split-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 56px; }
  .landing .v16-brand .aia-hero h1 { margin-left: 0; max-width: 18ch; }
  .landing .v16-brand .aia-hero .lede { margin: 0; text-align: left; max-width: 560px; }
  .landing .v16-brand .aia-hero .aia-chips, .landing .v16-brand .aia-hero .aia-ctas { justify-content: flex-start; }
  @media (max-width: 980px) {
    .landing .v16-brand .aia-hero { padding: 150px 0 64px; text-align: center; }
    .landing .v16-brand .aia-hero .hero-split-grid { grid-template-columns: 1fr; gap: 36px; }
    .landing .v16-brand .aia-hero h1, .landing .v16-brand .aia-hero .lede { margin-left: auto; margin-right: auto; text-align: center; }
    .landing .v16-brand .aia-hero .aia-chips, .landing .v16-brand .aia-hero .aia-ctas { justify-content: center; }
  }
  .landing .v16-brand .aia-window {
    border-radius: 16px; overflow: hidden; background: #fff;
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 30px 80px -30px rgba(43, 89, 255, 0.55), 0 0 0 6px rgba(255, 255, 255, 0.04);
  }
  .landing .v16-brand .aia-window-bar { display: flex; gap: 6px; padding: 10px 14px; background: #17171b; }
  .landing .v16-brand .aia-window-bar span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); }
  .landing .v16-brand .aia-window-media { display: block; width: 100%; height: auto; aspect-ratio: 1112 / 492; background: #f4f4f5; }

  /* Customer logos */
  .landing .v16-brand .aia-logos-sec { padding: 40px 0 8px; }
  .landing .v16-brand .aia-logos-label { margin: 0 0 18px; text-align: center; font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
  .landing .v16-brand .aia-logos { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
  .landing .v16-brand .aia-logos-track { display: flex; width: max-content; animation: aia-marquee 40s linear infinite; }
  .landing .v16-brand .aia-logos:hover .aia-logos-track { animation-play-state: paused; }
  .landing .v16-brand .aia-logos-list { display: flex; align-items: center; gap: 56px; margin: 0; padding: 0 56px 0 0; list-style: none; }
  .landing .v16-brand .aia-logos-list li { display: flex; align-items: center; gap: 10px; flex-shrink: 0; filter: grayscale(1); opacity: .65; transition: filter .2s, opacity .2s; }
  .landing .v16-brand .aia-logos-list li:hover { filter: none; opacity: 1; }
  .landing .v16-brand .aia-logos-list img { display: block; height: 32px; width: auto; }
  .landing .v16-brand .aia-logos-list span { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; color: var(--ink); white-space: nowrap; }
  @media (prefers-reduced-motion: reduce) { .landing .v16-brand .aia-logos-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; } .landing .v16-brand .aia-logos-list[aria-hidden='true'] { display: none; } }

  /* See it working: alternating copy / media rows */
  .landing .v16-brand .aia-demo-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
  .landing .v16-brand .aia-demo-row + .aia-demo-row { margin-top: 72px; }
  .landing .v16-brand .aia-demo-row-flip .aia-demo-copy { order: 2; }
  @media (max-width: 900px) {
    .landing .v16-brand .aia-demo-row { grid-template-columns: 1fr; }
    .landing .v16-brand .aia-demo-row-flip .aia-demo-copy { order: 0; }
  }
  .landing .v16-brand .aia-demo-copy h3 { margin: 0 0 12px; font-size: clamp(22px, 2.4vw, 28px); line-height: 1.2; color: var(--ink); }
  .landing .v16-brand .aia-demo-copy > p { margin: 0 0 18px; font-size: 16px; line-height: 1.7; color: var(--ink-2); }
  .landing .v16-brand .aia-ticks { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
  .landing .v16-brand .aia-ticks li { position: relative; padding-left: 30px; font-size: 15px; line-height: 1.55; color: var(--ink-2); }
  .landing .v16-brand .aia-ticks li::before {
    content: '✓'; position: absolute; left: 0; top: 1px; width: 20px; height: 20px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; background: #2ec27e;
  }
  .landing .v16-brand .aia-demo-media { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); box-shadow: 0 24px 60px -30px rgba(43, 89, 255, 0.35); }
  .landing .v16-brand .aia-demo-radar { max-width: 480px; justify-self: center; width: 100%; background: #1a1430; }
  .landing .v16-brand .aia-demo-video { display: block; width: 100%; height: auto; aspect-ratio: 1 / 1; }

  /* Lead-scoring mockup (HTML) */
  .landing .v16-brand .aia-mock { max-width: 480px; justify-self: center; width: 100%; padding: 22px; background: #efeae2; display: grid; gap: 14px; }
  .landing .v16-brand .aia-mock-chat { display: grid; gap: 8px; }
  .landing .v16-brand .aia-bubble { max-width: 82%; padding: 9px 12px; border-radius: 10px; font-size: 14px; line-height: 1.45; color: #111b21; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08); }
  .landing .v16-brand .aia-bubble-lead { background: #fff; justify-self: start; border-top-left-radius: 2px; }
  .landing .v16-brand .aia-bubble-agent { background: #d9fdd3; justify-self: end; border-top-right-radius: 2px; }
  .landing .v16-brand .aia-mock-score { padding: 16px; border-radius: 10px; background: #fff; border: 1px solid rgba(43, 89, 255, 0.35); }
  .landing .v16-brand .aia-mock-score-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .landing .v16-brand .aia-mock-score-head span { font-family: var(--f-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
  .landing .v16-brand .aia-mock-score-head strong { padding: 4px 10px; border-radius: 6px; font-size: 13px; color: #fff; background: #c4281c; }
  .landing .v16-brand .aia-mock-score ul { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .landing .v16-brand .aia-mock-score li { padding: 6px 8px; border-radius: 6px; font-size: 12.5px; color: var(--ink-2); background: var(--bg-2); }
  .landing .v16-brand .aia-mock-score li.is-ok::before { content: '✓ '; color: #2ec27e; font-weight: 700; }
  .landing .v16-brand .aia-mock-routed { margin: 12px 0 0; font-size: 13px; font-weight: 600; color: #2b59ff; }

  /* Real results */
  .landing .v16-brand .aia-proof { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 16px; }
  @media (max-width: 900px) { .landing .v16-brand .aia-proof { grid-template-columns: 1fr; } }
  .landing .v16-brand .aia-case { padding: clamp(24px, 3.5vw, 36px); display: flex; flex-direction: column; gap: 22px; }
  .landing .v16-brand .aia-case:hover { transform: none; }
  .landing .v16-brand .aia-case-head strong { display: block; font-size: 26px; font-weight: 700; letter-spacing: -0.03em; color: var(--ink); }
  .landing .v16-brand .aia-case-head span { font-family: var(--f-mono); font-size: 12px; color: var(--ink-3); }
  .landing .v16-brand .aia-case-metrics { margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  @media (max-width: 640px) { .landing .v16-brand .aia-case-metrics { grid-template-columns: 1fr; } }
  .landing .v16-brand .aia-case-metrics div { padding: 16px; border-radius: 10px; background: var(--bg-2); display: flex; flex-direction: column-reverse; justify-content: flex-end; gap: 6px; }
  .landing .v16-brand .aia-case-metrics dd { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.15; color: #2b59ff; }
  .landing .v16-brand .aia-case-metrics dt { font-size: 13px; line-height: 1.45; color: var(--ink-3); }
  .landing .v16-brand .aia-case .btn { align-self: flex-start; }
  .landing .v16-brand .aia-ratings { display: grid; gap: 12px; }
  .landing .v16-brand .aia-rating {
    display: grid; gap: 2px; padding: 18px 20px; border-radius: 10px; border: 1px solid var(--line); background: var(--paper); color: var(--ink);
    transition: border-color .2s;
  }
  .landing .v16-brand .aia-rating:hover { border-color: #2b59ff; }
  .landing .v16-brand .aia-rating strong { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; }
  .landing .v16-brand .aia-rating-label { font-size: 14px; color: var(--ink-3); }
  .landing .v16-brand .aia-rating-source { margin-top: 4px; font-family: var(--f-mono); font-size: 11.5px; color: #2b59ff; }

  /* Highlight strip */
  .landing .v16-brand .aia-strip { overflow: hidden; padding: 16px 0; background: #0b0b0c; border-block: 1px solid rgba(255, 255, 255, 0.08); }
  .landing .v16-brand .aia-strip-track { display: flex; width: max-content; animation: aia-marquee 45s linear infinite; }
  .landing .v16-brand .aia-strip ul { display: flex; margin: 0; padding: 0; list-style: none; }
  .landing .v16-brand .aia-strip li { display: flex; align-items: center; gap: 24px; padding-right: 24px; white-space: nowrap; font-size: 15px; font-weight: 600; color: #e6e6e8; }
  .landing .v16-brand .aia-strip li::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #7c98ff; }
  @media (prefers-reduced-motion: reduce) { .landing .v16-brand .aia-strip-track { animation: none; } }

  .landing .v16-brand .aia-sec { padding: 88px 0; }
  @media (max-width: 768px) { .landing .v16-brand .aia-sec { padding: 64px 0; } }
  .landing .v16-brand .aia-sec-alt { background: var(--bg-2); }

  /* Hero chips + footnote */
  .landing .v16-brand .aia-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 28px; }
  .landing .v16-brand .aia-chip {
    padding: 6px 12px; border-radius: 6px; border: 1px solid var(--line-2); background: var(--bg-2);
    font-family: var(--f-mono); font-size: 12px; font-weight: 500; color: var(--ink-3);
  }
  .landing .v16-brand .aia-ctas { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 32px; }
  .landing .v16-brand .aia-footnote {
    margin-top: 20px; font-family: var(--f-mono); font-size: 11px; letter-spacing: .12em;
    text-transform: uppercase; color: var(--ink-4);
  }

  /* Direct answer + key facts (AEO / GEO) */
  /* Only the h2 is centred; body copy stays left-aligned for reading. */
  .landing .v16-brand .aia-answer { max-width: 1100px; margin: 0 auto; padding: clamp(26px, 4vw, 44px) clamp(22px, 4vw, 56px); }
  .landing .v16-brand .aia-answer > h2 { text-align: center; }
  .landing .v16-brand .aia-answer h2 { font-size: clamp(24px, 2.8vw, 32px); line-height: 1.15; color: var(--ink); margin: 0 0 14px; }
  .landing .v16-brand .aia-answer p { margin: 0; font-size: 17px; line-height: 1.7; color: var(--ink-2); }
  /* Read more: a faded preview of the long copy, then a centred toggle button. */
  .landing .v16-brand .aia-more { margin-top: 8px; }
  .landing .v16-brand .aia-more-body {
    position: relative; max-height: 150px; overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%);
    transition: max-height .45s ease;
  }
  .landing .v16-brand .aia-more-body.is-open { max-height: 6000px; -webkit-mask-image: none; mask-image: none; }
  @media (prefers-reduced-motion: reduce) { .landing .v16-brand .aia-more-body { transition: none; } }
  .landing .v16-brand .aia-more-btn {
    display: flex; align-items: center; gap: 8px; margin: 14px auto 0; cursor: pointer;
    padding: 10px 18px; border-radius: 8px; border: 1px solid var(--line-2); background: var(--paper);
    font: inherit; font-size: 14px; font-weight: 600; color: #2b59ff; transition: border-color .2s;
  }
  .landing .v16-brand .aia-more-btn:hover { border-color: #2b59ff; }
  .landing .v16-brand .aia-more-btn:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .aia-more-arrow { transition: transform .2s; }
  .landing .v16-brand .aia-more-btn[aria-expanded='true'] .aia-more-arrow { transform: rotate(180deg); }
  /* Same size as the box heading (.aia-answer h2). */
  .landing .v16-brand .aia-more-body h2 { margin: 34px 0 12px; font-size: clamp(24px, 2.8vw, 32px); line-height: 1.15; color: var(--ink); }
  .landing .v16-brand .aia-more-body p { margin: 0 0 12px; font-size: 16px; line-height: 1.7; color: var(--ink-2); }
  .landing .v16-brand .aia-more-body p:first-child { margin-top: 12px; }
  .landing .v16-brand .aia-more-body .aia-more-lead { font-weight: 600; color: var(--ink); }
  .landing .v16-brand .aia-more-body ul { margin: 4px 0 14px; padding-left: 20px; list-style: disc; }
  .landing .v16-brand .aia-more-body li { margin: 0 0 8px; font-size: 15.5px; line-height: 1.65; color: var(--ink-2); }
  .landing .v16-brand .aia-more-body li::marker { color: #2b59ff; }
  .landing .v16-brand .aia-facts {
    max-width: 1100px; margin: 20px auto 0; padding: 0; list-style: none;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;
  }
  .landing .v16-brand .aia-fact { padding: 18px 14px; text-align: center; border: 1px solid var(--line); border-radius: 10px; background: var(--paper); }
  .landing .v16-brand .aia-fact strong { display: block; font-size: 28px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; color: var(--ink); }
  .landing .v16-brand .aia-fact span { display: block; margin-top: 6px; font-size: 12.5px; line-height: 1.4; color: var(--ink-3); }

  /* Agent cards */
  .landing .v16-brand .aia-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 16px; }
  .landing .v16-brand .aia-card { scroll-margin-top: 110px; }
  .landing .v16-brand .aia-card h3 { font-size: 17px; margin: 0 0 8px; color: var(--ink); }
  .landing .v16-brand .aia-card p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-3); }
  .landing .v16-brand .aia-card .card-icon { border-radius: 8px; background: #eef2ff; border: 1px solid #d5ddff; color: #2b59ff; }

  /* Dark "one memory" section */
  .landing .v16-brand .aia-mem { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
  @media (max-width: 900px) { .landing .v16-brand .aia-mem { grid-template-columns: 1fr; } }
  .landing .v16-brand .aia-mem .sec-head { margin-bottom: 0; }
  .landing .v16-brand .aia-mem-point {
    display: flex; gap: 12px; align-items: flex-start; padding: 16px 18px;
    background: #111114; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px;
    color: #e6e6e8; font-size: 15px; line-height: 1.55;
  }
  .landing .v16-brand .aia-mem-point + .aia-mem-point { margin-top: 10px; }
  .landing .v16-brand .aia-mem-check {
    flex-shrink: 0; width: 20px; height: 20px; border-radius: 6px; margin-top: 2px;
    display: flex; align-items: center; justify-content: center; background: #2ec27e; color: #0b0b0c;
  }

  /* Comparison table — scrolls inside its own box on phones */
  .landing .v16-brand .aia-table-wrap { max-width: 1000px; margin: 0 auto; padding: 0; overflow-x: auto; scrollbar-width: thin; }
  .landing .v16-brand .aia-table-wrap:hover { transform: none; }
  .landing .v16-brand .aia-table { width: 100%; min-width: 640px; border-collapse: collapse; font-size: 14.5px; line-height: 1.55; }
  .landing .v16-brand .aia-table th, .landing .v16-brand .aia-table td { padding: 16px 20px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--line); }
  .landing .v16-brand .aia-table thead th { font-family: var(--f-mono); font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
  .landing .v16-brand .aia-table thead th:nth-child(2) { color: #2b59ff; }
  .landing .v16-brand .aia-table tbody th { font-weight: 600; color: var(--ink); width: 24%; }
  .landing .v16-brand .aia-table td { color: var(--ink-3); }
  .landing .v16-brand .aia-table td:nth-child(2) { color: var(--ink); font-weight: 500; background: rgba(43, 89, 255, 0.04); }
  .landing .v16-brand .aia-table tbody tr:last-child > * { border-bottom: 0; }

  /* Setup steps (client component) */
  .landing .v16-brand .aia-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .landing .v16-brand .aia-step-btn { display: block; width: 100%; text-align: left; cursor: pointer; font: inherit; }
  .landing .v16-brand .aia-steps .aia-step-btn.is-active { box-shadow: 0 0 0 1px #2b59ff, 0 14px 34px rgba(43, 89, 255, 0.14) !important; }
  .landing .v16-brand .aia-step-btn:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .aia-step-n {
    width: 34px; height: 34px; border-radius: 8px; margin-bottom: 16px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--f-mono); font-size: 14px; font-weight: 600; color: #2b59ff;
    background: #eef2ff; border: 1px solid #d5ddff; transition: background .2s, color .2s;
  }
  .landing .v16-brand .is-active .aia-step-n { background: #2b59ff; border-color: #2b59ff; color: #fff; }
  .landing .v16-brand .aia-step-n.is-done { background: #2ec27e; border-color: #2ec27e; color: #fff; }
  .landing .v16-brand .aia-step-btn h3 { font-size: 16.5px; margin: 0 0 6px; color: var(--ink); }
  .landing .v16-brand .aia-step-btn p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-3); }
  .landing .v16-brand .aia-step-bar { margin-top: 18px; height: 2px; border-radius: 2px; overflow: hidden; background: var(--line); }
  .landing .v16-brand .aia-step-bar > span { display: block; height: 100%; width: 0; background: #2b59ff; animation: aia-bar-fill 3.5s linear forwards; }
  @keyframes aia-bar-fill { to { width: 100%; } }
  @media (prefers-reduced-motion: reduce) { .landing .v16-brand .aia-step-bar { display: none; } }

  /* Use-case tabs (client component) */
  .landing .v16-brand .aia-fits { max-width: 820px; margin: 0 auto; }
  .landing .v16-brand .aia-fits-tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 20px; }
  .landing .v16-brand .aia-fits-tab {
    cursor: pointer; padding: 10px 16px; border-radius: 8px; font: inherit; font-size: 14px; font-weight: 600;
    color: var(--ink-2); background: var(--paper); border: 1px solid var(--line-2); transition: background .18s, color .18s, border-color .18s;
  }
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

  /* Pricing answer */
  .landing .v16-brand .aia-price { max-width: 780px; margin: 0 auto; padding: clamp(26px, 4vw, 40px); }
  .landing .v16-brand .aia-price:hover { transform: none; }
  .landing .v16-brand .aia-price h2 { font-size: clamp(24px, 2.8vw, 32px); line-height: 1.15; color: var(--ink); margin: 0; }
  .landing .v16-brand .aia-price-lede { margin: 12px 0 0; font-size: 16px; line-height: 1.65; color: var(--ink-3); }
  .landing .v16-brand .aia-price-plan { margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--line); }
  .landing .v16-brand .aia-price-plan .aia-plan-name { font-family: var(--f-mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #2b59ff; }
  .landing .v16-brand .aia-price-plan .aia-price-num { display: block; margin-top: 6px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.3; color: var(--ink); }
  .landing .v16-brand .aia-price ul { margin: 14px 0 0; padding-left: 18px; list-style: disc; font-size: 15px; line-height: 1.8; color: var(--ink-2); }
  .landing .v16-brand .aia-price-note { margin: 14px 0 0; font-size: 13px; color: var(--ink-3); }

  /* FAQ — hairline rows, 10px corners */
  /* Section intros are 40-60 words: a wider measure keeps them to 3-4 lines. */
  .landing .v16-brand .aia-sec .sec-head.centered p { max-width: 720px; }
  .landing .v16-brand .sec-head p.aia-faq-intro { max-width: 760px; }
  .landing .v16-brand .aia-faq { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 16px; align-items: start; }
  .landing .v16-brand .aia-faq-col { display: grid; gap: 10px; }
  /* Mobile: first 5 FAQs, the rest behind Read more (desktop: no button) */
  .landing .v16-brand .aia-mmore-btn { display: none; }
  @media (max-width: 860px) {
    .landing .v16-brand .aia-mmore-btn { display: flex; }
    .landing .v16-brand .aia-mmore:not(.is-open) .aia-faq-col + .aia-faq-col { display: none; }
    /* Always 5 before Read more, even when the first column holds 6 */
    .landing .v16-brand .aia-mmore:not(.is-open) .aia-faq-col:first-child > details:nth-child(n+6) { display: none; }
  }
  @media (max-width: 860px) { .landing .v16-brand .aia-faq { grid-template-columns: 1fr; } }
  .landing .v16-brand .aia-faq details { background: var(--paper); border: 1px solid var(--line); border-radius: 10px; transition: border-color .2s; }
  .landing .v16-brand .aia-faq details[open] { border-color: rgba(43, 89, 255, 0.45); }
  .landing .v16-brand .aia-faq summary {
    cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 14px;
    padding: 18px 20px; font-size: 15.5px; font-weight: 600; color: var(--ink);
  }
  .landing .v16-brand .aia-faq summary::-webkit-details-marker { display: none; }
  .landing .v16-brand .aia-faq summary::after {
    content: '+'; flex-shrink: 0; width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
    font-size: 17px; color: var(--ink-3); background: var(--bg-2); transition: background .2s, color .2s;
  }
  .landing .v16-brand .aia-faq details[open] summary::after { content: '−'; background: #2b59ff; color: #fff; }
  .landing .v16-brand .aia-faq summary:focus-visible { outline: 2px solid #2b59ff; outline-offset: 2px; border-radius: 10px; }
  .landing .v16-brand .aia-faq details p { margin: 0; padding: 0 20px 20px; font-size: 15px; line-height: 1.7; color: var(--ink-3); }

  /* Related reading — every AI-agent blog post in this locale, as a strip that
     drifts right to left and pauses under the cursor. The list is rendered
     twice (second copy aria-hidden) so the loop is seamless at -50%. */
  /* Sits inside .container; --aia-per-view cards fill its width exactly
     (4 on desktop, 3 on small laptops/tablets, 2 below that). */
  .landing .v16-brand .aia-marquee {
    --aia-gap: 12px; --aia-per-view: 4;
    overflow: hidden; padding: 6px 0;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent);
  }
  @media (max-width: 1100px) { .landing .v16-brand .aia-marquee { --aia-per-view: 3; } }
  @media (max-width: 760px) { .landing .v16-brand .aia-marquee { --aia-per-view: 2; } }
  .landing .v16-brand .aia-marquee-track { display: flex; width: max-content; animation: aia-marquee var(--aia-marquee-dur, 90s) linear infinite; }
  .landing .v16-brand .aia-marquee:hover .aia-marquee-track,
  .landing .v16-brand .aia-marquee:focus-within .aia-marquee-track { animation-play-state: paused; }
  @keyframes aia-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .landing .v16-brand .aia-related { margin: 0; padding: 0 var(--aia-gap) 0 0; list-style: none; display: flex; gap: var(--aia-gap); }
  /* 100cqw = the marquee's own width (container query unit), so N cards + gaps = exactly one view. */
  .landing .v16-brand .aia-marquee { container-type: inline-size; }
  .landing .v16-brand .aia-related li { flex: 0 0 calc((100cqw - (var(--aia-per-view) - 1) * var(--aia-gap)) / var(--aia-per-view)); }
  /* Touch screens (no cursor to pause it) and reduced motion: a still row you swipe. */
  @media (hover: none), (prefers-reduced-motion: reduce) {
    .landing .v16-brand .aia-marquee { overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-mask-image: none; mask-image: none; padding: 6px 20px; }
    .landing .v16-brand .aia-marquee::-webkit-scrollbar { display: none; }
    .landing .v16-brand .aia-marquee-track { animation: none; }
    .landing .v16-brand .aia-related[aria-hidden='true'] { display: none; }
    .landing .v16-brand .aia-related li { flex-basis: min(300px, 80vw); scroll-snap-align: start; }
  }
  .landing .v16-brand .aia-related-img {
    display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover;
    margin: 0 0 8px; border-radius: 8px; border: 1px solid var(--line); background: var(--bg-2);
  }
  .landing .v16-brand .aia-related a {
    height: 100%; display: flex; flex-direction: column; gap: 8px; padding: 20px 22px;
    background: var(--paper); border: 1px solid var(--line); border-radius: 10px; color: var(--ink); transition: border-color .2s;
  }
  .landing .v16-brand .aia-related-date { display: block; font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .04em; color: var(--ink-3); }
  /* Post titles are spans, not headings, so 15 cards don't crowd the page's heading outline. */
  .landing .v16-brand .aia-related-title { display: block; margin: 0; font-size: 15.5px; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; color: var(--ink); }
  .landing .v16-brand .aia-related p {
    margin: 0; font-size: 14px; line-height: 1.55; color: var(--ink-3);
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  /* Text cue instead of an arrow; the whole card is the one link. */
  .landing .v16-brand .aia-related-more { margin-top: auto; padding-top: 6px; font-size: 14px; font-weight: 600; color: #2b59ff; }
  .landing .v16-brand .aia-related a:hover .aia-related-more { text-decoration: underline; text-underline-offset: 3px; }
  .landing .v16-brand .aia-related a:hover { border-color: #2b59ff; }
  .landing .v16-brand .aia-related a:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
`

export default async function WhatsappAiAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getAiAgentPageContent(locale)

  const prefix = prefixFor(locale)
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : prefix}`
  const pageUrl = `${SITE_URL}${prefix}/whatsapp-ai-agent`
  const lang = LANG[locale] ?? 'en-US'
  // A Sanity hiccup must not break the page: the section just hides.
  const relatedPosts = await getPostsByEnSlugs(AI_AGENT_EN_SLUGS, locale).catch(() => [])
  const postDate = new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeZone: 'UTC' })
  // Long-form "read more" copy, shared with the homepage (landingV3.readMore in messages/*.json).
  const rm = await getTranslations({ locale, namespace: 'landingV3.readMore' })
  const [moreLabel, lessLabel] = MORE_LABELS[locale] ?? MORE_LABELS.en

  // One connected graph: WebPage → about the Eazybe SoftwareApplication (defined
  // site-wide by @id), plus breadcrumb, the agent list and the FAQ.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        ...(PAGE_DATES ? { datePublished: PAGE_DATES.published, dateModified: PAGE_DATES.modified } : {}),
        about: { '@id': SOFTWARE_ID },
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#agents` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: t.breadcrumb.current, item: pageUrl },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#agents`,
        name: `${t.agents.h2} ${t.agents.h2Em}`,
        numberOfItems: t.agents.cards.length,
        itemListElement: t.agents.cards.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          description: c.desc,
          url: `${pageUrl}#${c.id}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: t.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      // The product this page is about. Defined here too (same @id as the homepage) so
      // WebPage.about resolves on this page. This is the page's only rating: a second
      // one would raise the GSC "multiple aggregate ratings" error.
      {
        '@type': 'SoftwareApplication',
        '@id': SOFTWARE_ID,
        name: 'Eazybe',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Chrome Extension, Android', // same wording as the homepage #software node
        url: SITE_URL,
        publisher: { '@id': ORG_ID },
        offers: getBasicAiOffers(locale),
        aggregateRating: SOFTWARE_RATING,
      },
    ],
  }

  return (
    <>
      {/* WebPage in its own block, so tools that skip @graph still read its dates and author. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': schema['@context'], ...schema['@graph'][0] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': schema['@context'], '@graph': schema['@graph'].slice(1) }) }} />
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* Hero — brand dark hero (ink, dot grid, one blue light). No reveal: h1/p are the LCP. */}
      <section className="page-hero hero-split aia-hero" data-tone="dark">
        <div className="container hero-split-grid">
          <div>
            <span className="hero-tag"><span className="pulse" /> {t.hero.tag}</span>
            <h1>
              {t.hero.h1Lead} <em>{t.hero.h1Highlight}</em>
            </h1>
            <p className="lede">{t.hero.subtitle}</p>
            <div className="aia-chips">
              {t.hero.chips.map((c) => (
                <span key={c} className="aia-chip">{c}</span>
              ))}
            </div>
            <div className="aia-ctas">
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{t.hero.ctaPrimary}</a>
              <a href={DEMO_URL} className="btn btn-outline btn-lg">{t.hero.ctaSecondary}</a>
            </div>
            <p className="aia-footnote">{t.hero.footnote}</p>
          </div>
          {/* Product clip: WhatsApp Web with the Eazybe AI panel syncing a chat to HubSpot. */}
          <div className="aia-window">
            <div className="aia-window-bar" aria-hidden="true"><span /><span /><span /></div>
            <LazyVideo
              className="aia-window-media"
              webm="/whatsapp-crm/product.webm"
              mp4="/whatsapp-crm/product.mp4"
              poster="/whatsapp-crm/product-poster.webp"
              width={1112}
              height={492}
              label={HERO_VIDEO_LABEL[locale] ?? HERO_VIDEO_LABEL.en}
            />
          </div>
        </div>
      </section>

      {/* Customer logos (same set as the homepage strip) */}
      <section className="aia-logos-sec" aria-label={t.logos.label}>
        <div className="container">
          <p className="aia-logos-label">{t.logos.label}</p>
          <div className="aia-logos">
            <div className="aia-logos-track">
              {[false, true].map((copy) => (
                <ul key={String(copy)} className="aia-logos-list" aria-hidden={copy || undefined}>
                  {CUSTOMER_LOGOS.map((l) => (
                    <li key={l.name}>
                      <img src={l.src} alt={l.name} width={l.w} height={l.h} loading="lazy" decoding="async" />
                      {l.showName && <span>{l.name}</span>}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Direct answer + key facts — the passage AI answers and snippets quote */}
      <section className="aia-sec" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="card aia-answer">
            <h2>{t.answer.h2}</h2>
            <p>{t.answer.p}</p>
            {/* Faded preview + toggle; the full text is server-rendered for crawlers. */}
            <ReadMoreFade more={moreLabel} less={lessLabel}>
                <p>{rm('p0b')}</p>
                <h2>{rm('h1')}</h2>
                <p>{rm('p1a')}</p>
                <p>{rm('p1b')}</p>
                <p>{rm('p1c')}</p>
                <p>{rm('p1d')}</p>
                <h2>{rm('h2')}</h2>
                <p>{rm('p2a')}</p>
                <p className="aia-more-lead">{rm('p2b')}</p>
                <ul>
                  {(rm.raw('list2') as string[]).map((li) => <li key={li}>{li}</li>)}
                </ul>
                <h2>{rm('h4')}</h2>
                <p>{rm('p4a')}</p>
                <ul>
                  {(rm.raw('list4') as string[]).map((li) => <li key={li}>{li}</li>)}
                </ul>
                <h2>{rm('h5')}</h2>
                <p>{rm('p5a')}</p>
                <p>{rm('p5b')}</p>
            </ReadMoreFade>
          </div>
          <ul className="aia-facts">
            {t.facts.map((f) => (
              <li key={f.label} className="aia-fact">
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agents */}
      <section className="aia-sec" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="sec-head centered">
            <h2>{t.agents.h2} <em>{t.agents.h2Em}</em></h2>
            <p>{t.agents.subtitle}</p>
          </div>
          <div className="aia-grid">
            {t.agents.cards.map((card, i) => (
              <div key={card.id} id={card.id} className="card aia-card">
                <div className="card-icon" aria-hidden="true">{AGENT_ICONS[i]}</div>
                <h3>{card.name}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See it working: a real product clip + a lead-scoring card, alternating rows */}
      <section className="aia-sec aia-sec-alt">
        <div className="container">
          <div className="sec-head centered">
            <span className="sec-tag">{t.demo.tag}</span>
            <h2>{t.demo.h2} <em>{t.demo.h2Em}</em></h2>
            <p>{t.demo.subtitle}</p>
          </div>

          <div className="aia-demo-row">
            <div className="aia-demo-copy">
              <h3>{t.demo.radar.title}</h3>
              <p>{t.demo.radar.desc}</p>
              <ul className="aia-ticks">
                {t.demo.radar.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div className="aia-demo-media aia-demo-radar">
              <LazyVideo
                className="aia-demo-video"
                webm={locale === 'br' ? '/whatsapp-crm/bea-radar-pt.webm' : '/whatsapp-crm/bea-radar.webm'}
                mp4={locale === 'br' ? '/whatsapp-crm/bea-radar-pt.mp4' : '/whatsapp-crm/bea-radar.mp4'}
                poster={locale === 'br' ? '/whatsapp-crm/bea-radar-pt-poster.webp' : '/whatsapp-crm/bea-radar-poster.webp'}
                width={760}
                height={760}
                label={t.demo.radar.videoLabel}
              />
            </div>
          </div>

          <div className="aia-demo-row aia-demo-row-flip">
            <div className="aia-demo-copy">
              <h3>{t.demo.lead.title}</h3>
              <p>{t.demo.lead.desc}</p>
              <ul className="aia-ticks">
                {t.demo.lead.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            {/* Illustrative UI built in HTML (like the homepage mockups), not a screenshot. */}
            <div className="aia-demo-media aia-mock" aria-hidden="true">
              <div className="aia-mock-chat">
                {t.demo.lead.chat.map((m, i) => (
                  <div key={i} className={`aia-bubble aia-bubble-${m.from}`}>{m.text}</div>
                ))}
              </div>
              <div className="aia-mock-score">
                <div className="aia-mock-score-head">
                  <span>{t.demo.lead.scoreLabel}</span>
                  <strong>{t.demo.lead.scoreValue}</strong>
                </div>
                <ul>
                  {t.demo.lead.signals.map((sg) => (
                    <li key={sg.label} className={sg.ok ? 'is-ok' : undefined}>{sg.label}</li>
                  ))}
                </ul>
                <p className="aia-mock-routed">{t.demo.lead.routed}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One memory — brand dark section */}
      <section className="aia-sec" data-tone="dark">
        <div className="container">
          <div className="aia-mem">
            <div className="sec-head">
              <h2>{t.memory.h2}</h2>
              <p>{t.memory.body}</p>
              <div style={{ marginTop: 28 }}>
                <a href={DEMO_URL} className="btn btn-outline btn-lg">{t.hero.ctaSecondary}</a>
              </div>
            </div>
            <div>
              {t.memory.points.map((p) => (
                <div key={p} className="aia-mem-point">
                  <span className="aia-mem-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI agent vs chatbot */}
      <section className="aia-sec">
        <div className="container">
          <div className="sec-head centered">
            <h2>{t.compare.h2}</h2>
            <p>{t.compare.subtitle}</p>
          </div>
          <div className="card aia-table-wrap">
            <table className="aia-table">
              <thead>
                <tr>
                  {t.compare.head.map((h, i) => (
                    <th key={i} scope="col">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.compare.rows.map(([feature, agent, bot]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    <td>{agent}</td>
                    <td>{bot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="aia-sec aia-sec-alt">
        <div className="container">
          <div className="sec-head centered">
            <span className="sec-tag">{t.how.tag}</span>
            <h2>{t.how.h2}</h2>
            <p>{t.how.subtitle}</p>
          </div>
          <SetupSteps steps={t.how.steps} />
        </div>
      </section>

      {/* Use cases (every pane is in the HTML) */}
      <section className="aia-sec">
        <div className="container">
          <div className="sec-head centered">
            <h2>{t.fits.h2}</h2>
            <p>{t.fits.subtitle}</p>
          </div>
          <FitsTabs cards={t.fits.cards} />
        </div>
      </section>

      {/* Real results: the published Lokmax case study + sourced ratings (no invented stats) */}
      <section className="aia-sec">
        <div className="container">
          <div className="sec-head centered">
            <h2>{t.proof.h2} <em>{t.proof.h2Em}</em></h2>
            <p>{t.proof.subtitle}</p>
          </div>
          <div className="aia-proof">
            <div className="card aia-case">
              <div className="aia-case-head">
                <strong>Lokmax</strong>
                <span>{t.proof.caseMeta}</span>
              </div>
              <dl className="aia-case-metrics">
                {t.proof.metrics.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
              <a href={`${prefix}/case-studies/lokmaxltda`} className="btn btn-primary btn-lg">{t.proof.caseCta}</a>
            </div>
            <div className="aia-ratings">
              {t.proof.ratings.map((r) => (
                <a key={r.value + r.source} href={r.href} target="_blank" rel="noopener noreferrer" className="aia-rating">
                  <strong>{r.value}</strong>
                  <span className="aia-rating-label">{r.label}</span>
                  <span className="aia-rating-source">{r.source} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing answer */}
      <section className="aia-sec aia-sec-alt" style={{ paddingBottom: 48 }}>
        <div className="container">
          <div className="card aia-price">
            <h2>{t.pricing.h2}</h2>
            <p className="aia-price-lede">{t.pricing.body}</p>
            <div className="aia-price-plan">
              <span className="aia-plan-name">{t.pricing.plan}</span>
              <span className="aia-price-num">{t.pricing.yearly}</span>
              <ul>
                <li>{t.pricing.monthly}</li>
                <li>{t.pricing.included}</li>
                <li>{t.pricing.custom}</li>
              </ul>
            </div>
            <p className="aia-price-note">{t.pricing.note}</p>
            <div style={{ marginTop: 22 }}>
              <a href={`${prefix}/pricing`} className="btn btn-primary btn-lg">{t.pricing.cta}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight strip — quick facts drifting right to left */}
      <div className="aia-strip">
        <div className="aia-strip-track">
          {/* The second copy only makes the loop seamless, so it is hidden from assistive tech. */}
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined}>
              {t.strip.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <section className="aia-sec aia-sec-alt" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="sec-head centered">
            <h2>{t.faqTitle}</h2>
            <p className="aia-faq-intro">{t.faqIntro}</p>
          </div>
          {/* Two independent columns (first half left, second half right) so opening
              one answer never stretches the item beside it. Source order = schema order. */}
          <MobileMore more={moreLabel} less={lessLabel}>
          <div className="aia-faq">
            {[t.faq.slice(0, Math.ceil(t.faq.length / 2)), t.faq.slice(Math.ceil(t.faq.length / 2))].map((col, c) => (
              <div key={c} className="aia-faq-col">
                {col.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
          </MobileMore>
        </div>
      </section>

      {/* Related reading — every AI-agent blog post in this locale (shared list with /blog) */}
      {relatedPosts.length > 0 && (
        <section className="aia-sec" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div className="container">
            <div className="sec-head centered" style={{ marginBottom: 36 }}>
              <h2>{t.related.h2}</h2>
              <p>{t.related.subtitle}</p>
            </div>
          {/* ~6s per card keeps the drift slow enough to read */}
          <div className="aia-marquee" style={{ ['--aia-marquee-dur' as string]: `${relatedPosts.length * 6}s` }}>
            <div className="aia-marquee-track">
              {[false, true].map((copy) => (
                <ul key={String(copy)} className="aia-related" aria-hidden={copy || undefined}>
                  {relatedPosts.map((p) => (
                    <li key={p.slug}>
                      <a href={`${prefix}/blog/${p.slug}`} tabIndex={copy ? -1 : undefined}>
                        {p.image && (
                          // Sanity CDN resize: 640×360 crop, WebP/AVIF where supported. Below the fold, so lazy.
                          <img
                            className="aia-related-img"
                            src={`${p.image}?w=640&h=360&fit=crop&auto=format&q=70`}
                            alt={p.imageAlt || p.title.trim()}
                            width={640}
                            height={360}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        {p.date && (
                          <time className="aia-related-date" dateTime={p.date.slice(0, 10)}>
                            {postDate.format(new Date(p.date))}
                          </time>
                        )}
                        <span className="aia-related-title">{p.title.trim()}</span>
                        {p.excerpt && <p>{p.excerpt}</p>}
                        <span className="aia-related-more">{moreLabel}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          </div>
        </section>
      )}

      {/* Final CTA — the site's brand final-cta block */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2>
            {t.finalCta.h2}<br />
            <em>{t.finalCta.h2Em}</em>
          </h2>
          <p className="sub">{t.finalCta.body}</p>
          <div className="ctas">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{t.finalCta.primary}</a>
            <a href={DEMO_URL} className="btn btn-outline btn-lg">{t.finalCta.secondary}</a>
          </div>
        </div>
      </section>
    </>
  )
}

// Published / last-modified dates as meta tags (article:published_time / article:modified_time).
export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: '/whatsapp-ai-agent' }))
}
