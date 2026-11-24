import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import {
  getItecsurContent,
  itecsurHeadline,
  ITECSUR_CORE_CHAT,
  ITECSUR_INBOX,
  ITECSUR_AGENT_CHAT,
} from '@/data/case-study-itecsur'
import { pageDates, withPageDates, getSanityDocDates } from '@/lib/page-dates'
import { getCaseStudy } from '@/lib/sanity-queries'

// The page design and copy live in code (src/data/case-study-itecsur.ts).
// A PUBLISHED caseStudy doc with this slug (Sanity "Case Studies") supplies the
// SEO fields and the /case-studies hub card; re-render at most once a minute
// so Studio publishes go live on their own. Same setup as BMC Hyundai.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const SLUG = '/case-studies/itecsur'
const SANITY_SLUG = 'itecsur'
const SITE_URL = 'https://eazybe.com'
const IMG = '/case-studies/itecsur'
// Share image + Article image: the win-back graphic from the deck (1280x720).
const SHARE_IMG = `${SITE_URL}${IMG}/winback-hola-to-matriculado.webp`
const HTML_LANG: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

async function baseMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getItecsurContent(locale)
  const doc = await getCaseStudy(SANITY_SLUG, locale).catch(() => null)
  const title: string = doc?.metaTitle || t.meta.title
  const ogTitle = doc?.ogTitle || title.replace(' | Eazybe', '')
  const ogDescription = doc?.ogDescription || t.meta.ogDescription
  return {
    title,
    description: doc?.metaDescription || t.meta.description,
    alternates: getAlternates(locale, SLUG),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      title: ogTitle,
      description: ogDescription,
      siteName: 'Eazybe',
      images: [{ url: SHARE_IMG, width: 1280, height: 720, alt: 'From Hola to Matriculado: ITECSUR × Eazybe' }],
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description: ogDescription, images: [SHARE_IMG] },
  }
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  return withPageDates(
    await baseMetadata(props),
    pageDates({ page: SLUG, doc: await getSanityDocDates('caseStudy', locale, SANITY_SLUG) })
  )
}

const CSS = `
.its { --its-blue: #2B59FF; --its-blue-soft: #EAF0FF; --its-red: #F0533F; --its-red-soft: #FFE3DF;
  --its-yellow: #F6C52B; --its-yellow-soft: #FFF4D1; --its-green: #1E9E62; --its-green-soft: #E6F5EC;
  --its-dark: #111216; --its-dark-2: #17181D; --its-dark-line: #26272E; }
.its-sec { padding: clamp(64px, 8vw, 104px) 0; background: #fff; }
.its-sec.alt { background: #F6F8FC; }
.landing .v16-brand .its-sec.dark ::selection { background: #2b59ff; color: #ffffff; }
.its-sec.dark { background: radial-gradient(ellipse 70% 45% at 50% 0%, #1B2A78 0%, rgba(27,42,120,0) 70%), #0B0C0F; color: #F2F4FA; }
.its-tag { font-family: var(--f-mono); font-size: 12.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--its-blue); }
.its-sec.dark .its-tag { color: #8EA4FF; }
.its-tag.red { color: var(--its-red); }
.landing .its h2.its-h2 { font-family: var(--f-display); font-weight: 400; font-size: clamp(30px, 4vw, 50px); line-height: 1.1;
  letter-spacing: -0.025em; margin: 14px 0 0; color: var(--ink); max-width: none; }
.landing .its-sec.dark h2.its-h2 { color: #fff; }
.its .its-hl { color: var(--its-blue); }
.its-sec.dark .its-hl { color: #8EA4FF; }
.its .its-hl.red { color: var(--its-red); }
.its-center { text-align: center; }
.its-sub { margin: 14px auto 0; max-width: 820px; font-size: 17px; line-height: 1.6; color: var(--ink-3); }
.its-sec.dark .its-sub { color: #A9AFBF; }
.its-src { margin-top: 22px; font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-4, #9AA0AE); }
.its-sec.dark .its-src { color: #6E7384; }

/* Cards */
.its-card { border-radius: 18px; padding: clamp(20px, 2.4vw, 28px); background: #fff; border: 1px solid var(--line); }
.its-card.blue { background: var(--its-blue-soft); border-color: transparent; }
.its-card.yellow { background: var(--its-yellow-soft); border-color: transparent; }
.its-card.green { background: var(--its-green-soft); border-color: transparent; }
.its-card.red { background: var(--its-red-soft); border-color: transparent; }
.its-card.dark { background: var(--its-dark); border-color: var(--its-dark-line); color: #F2F4FA; }
.its-card.glow { border-color: #3B5BFF; box-shadow: 0 0 34px -8px rgba(59,91,255,.55); }
.its-sec.dark .its-card { background: var(--its-dark-2); border-color: var(--its-dark-line); color: #F2F4FA; }
.its-k { font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }
.its-card.dark .its-k, .its-sec.dark .its-k { color: #9097A8; }
.its-v { margin-top: 10px; font-family: var(--f-display); font-weight: 700; font-size: clamp(34px, 4vw, 52px); line-height: 1; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.its-v.blue { color: var(--its-blue); } .its-v.green { color: var(--its-green); } .its-v.yellow { color: var(--its-yellow); }
.its-sec.dark .its-v { color: #fff; }
.its-sec.dark .its-v.blue { color: #8EA4FF; } .its-sec.dark .its-v.green { color: #3DD68C; } .its-sec.dark .its-v.yellow { color: var(--its-yellow); }
.its-n { margin-top: 10px; font-size: 14.5px; line-height: 1.5; color: var(--ink-3); }
.its-card.dark .its-n, .its-sec.dark .its-n { color: #A9AFBF; }
.its-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.its-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.its-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

/* Photos */
.its-photo { position: relative; border-radius: 20px; overflow: hidden; background: #E9EDF5; box-shadow: 0 30px 60px -36px rgba(20,30,80,.55); }
.its-photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
.its .its-photo-chip { position: absolute; left: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 8px;
  background: rgba(0,0,0,.82); font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: #fff; }
.its-photo-chip::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #2FBF77; }

/* Hero — brand dark hero, same as BMC Hyundai. */
.landing .v16-brand .its-hero {
  padding: clamp(140px, 14vw, 180px) 0 clamp(64px, 8vw, 96px); text-align: center;
  background:
    radial-gradient(ellipse 60% 50% at 50% -8%, rgba(43, 89, 255, 0.38), rgba(43, 89, 255, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 22px 22px,
    #0b0b0c;
}
.landing .v16-brand .its .its-goal { color: #A97F00; font-weight: 600; }
.landing .v16-brand .its-hero ::selection { background: #2b59ff; color: #ffffff; }
.landing .v16-brand .its-hero .its-lockup { display: inline-flex; align-items: center; gap: 18px; }
.landing .v16-brand .its-hero .its-lockup-logo { display: block; height: 42px; width: auto; }
/* ITECSUR's logo has a white background, so it sits on a white tile. */
.landing .v16-brand .its-hero .its-lockup-partner { display: block; height: 64px; width: auto; padding: 6px 10px; border-radius: 10px; background: #fff; }
.landing .v16-brand .its .its-x { color: #8a8c93; font-size: 16px; }
.landing .v16-brand .its-hero .its-hero-eyebrow { margin-top: clamp(44px, 6vw, 72px); font-family: 'Geist Mono', ui-monospace, monospace; font-size: clamp(13px, 1.2vw, 16px);
  font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: #7c98ff; }
.landing .v16-brand .its-hero h1 { margin: 22px auto 0; color: #ffffff; line-height: 1; letter-spacing: -0.035em !important; }
.landing .v16-brand .its-hero h1 > span { display: block; }
.landing .v16-brand .its-hero .lt { font-weight: 300; }
.landing .v16-brand .its-hero .it { font-weight: 300; font-style: italic; }
.landing .v16-brand .its-hero .its-h1-a { font-size: clamp(32px, 4.2vw, 56px); font-weight: 700; }
.landing .v16-brand .its-hero .its-h1-b { margin: 8px 0 6px; font-size: clamp(38px, 5.6vw, 80px); font-weight: 700; line-height: 1; letter-spacing: -0.045em;
  color: #5b7cff; text-shadow: 0 0 40px rgba(43, 89, 255, 0.45); }
.landing .v16-brand .its-hero .its-h1-c { font-size: clamp(26px, 3.6vw, 48px); font-weight: 700; letter-spacing: -0.03em; }
.landing .v16-brand .its-hero .its-lede { margin: 28px auto 0; max-width: 820px; font-size: clamp(17px, 1.7vw, 21px); line-height: 1.5; color: #b4b4bc; }
.landing .v16-brand .its-hero .its-hero-stats { margin: 48px auto 0; display: flex; justify-content: center; flex-wrap: wrap; gap: 14px; }
.landing .v16-brand .its-hero .its-hero-stat { min-width: 220px; padding: 22px 28px; border-radius: 16px; text-align: center; background: #111114; border: 1px solid rgba(255, 255, 255, 0.08); }
.landing .v16-brand .its-hero .its-hero-stat:first-child { border-color: rgba(43, 89, 255, 0.55); box-shadow: 0 0 30px -12px rgba(43, 89, 255, 0.6); }
.landing .v16-brand .its-hero .its-hero-stat .v { font-family: 'Geist Mono', ui-monospace, monospace; font-size: clamp(30px, 3vw, 40px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.1; color: #ffffff; }
.landing .v16-brand .its-hero .its-hero-stat:first-child .v { color: #7c98ff; }
.landing .v16-brand .its-hero .its-hero-stat:last-child .v { color: #2ec27e; }
.landing .v16-brand .its-hero .its-hero-stat .l { margin-top: 10px; font-size: 16px; line-height: 1.45; color: #b4b4bc; }
.landing .v16-brand .its-hero .its-goal { color: #ffd43b; font-weight: 500; }

/* About */
.its-about { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 56px); align-items: stretch; }
.its-about p.its-body { margin: 20px 0 0; font-size: 17px; line-height: 1.7; color: var(--ink-3); }
.its-about p.its-body b { color: var(--ink); }
.its-about .its-grid-4 { margin-top: 26px; }
.its-about .its-grid-4 .its-card.dark { border-color: #3B5BFF; box-shadow: 0 0 30px -10px rgba(59,91,255,.6); }
.its-about .its-grid-4 .its-v { font-size: clamp(32px, 3.4vw, 44px); }
.its-campuses { margin-top: 16px; }
.its-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.its .its-pill { padding: 5px 10px; border-radius: 6px; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; background: var(--its-blue-soft); color: var(--its-blue); }
.its .its-pill.green { background: var(--its-green-soft); color: var(--its-green); }
.its .its-pill.yellow { background: var(--its-yellow-soft); color: #A97F00; }
.its-campuses p { margin: 14px 0 0; font-size: 15px; line-height: 1.6; color: var(--ink-3); }
.its-about .its-photo { min-height: 420px; }

/* Applicants */
.its-apply { display: grid; grid-template-columns: minmax(0, .75fr) minmax(0, 1.6fr); gap: clamp(28px, 4vw, 56px); align-items: stretch; }
.its-apply .its-photo { min-height: 480px; }
.its-apply .its-photo img { object-position: center top; }
.its-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 26px; }
.its-group { padding: 18px 20px; border-radius: 16px; }
.its-group .its-k { color: inherit; }
.its-group p { margin: 8px 0 0; font-size: 15px; line-height: 1.5; color: var(--ink); }
.its-group.g0 { background: var(--its-red-soft); color: #C0362A; }
.its-group.g1 { background: var(--its-blue-soft); color: var(--its-blue); }
.its-group.g2 { background: var(--its-yellow-soft); color: #A97F00; }
.its-group.g3 { background: var(--its-green-soft); color: var(--its-green); }
.its-group.g4 { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: var(--its-dark); color: #9097A8; }
.its-group.g4 p { color: #F2F4FA; }
.its .its-modes { display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 8px; background: var(--its-blue); font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #fff; white-space: nowrap; }
.its-modes::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #fff; }

/* Challenge */
.its-challenge { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr); gap: 16px; margin-top: 44px; }
.its-wa { border-radius: 18px; border: 1px solid var(--line); background: #fff; overflow: hidden; }
.its-wa-top { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid var(--line); font-size: 15.5px; font-weight: 600; color: var(--ink); }
.its .its-wa-badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 6px; background: var(--its-red-soft); color: #C0362A; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; }
.its-wa-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.its-wa-row { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid #F0F1F4; }
.its .its-av { flex-shrink: 0; width: 34px; height: 34px; border-radius: 50%; background: #8A97AD; color: #fff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
.its-wa-row b { display: block; font-size: 15px; color: var(--ink); }
.its-wa-row small { display: block; margin-top: 2px; font-size: 13.5px; color: var(--ink-3); }
.its-wa-row .ago { margin-left: auto; font-family: var(--f-mono); font-size: 12px; color: var(--ink-4, #9AA0AE); white-space: nowrap; }
.its-wa-note { padding: 12px 18px; font-family: var(--f-mono); font-size: 11px; color: var(--ink-4, #9AA0AE); }
.its-challenge .its-grid-2 .its-card h3 { margin: 12px 0 8px; font-size: 20px; font-weight: 700; line-height: 1.3; color: var(--ink); }
.its-challenge .its-grid-2 .its-card p { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ink-3); }
.its-challenge .its-card.red .its-k { color: #C0362A; }
.its-challenge .its-card.yellow .its-k { color: #A97F00; }
.its-challenge .its-card.dark h3 { color: #fff; }
.its-challenge .its-card.dark p { color: #A9AFBF; }

/* Rollout */
.its-roll { margin-top: 44px; padding: clamp(24px, 3vw, 40px); }
.its-tl { position: relative; display: grid; grid-template-columns: repeat(6, 1fr); }
.its-tl::before { content: ''; position: absolute; left: 8%; right: 8%; top: 31px; height: 2px; background: linear-gradient(90deg, var(--its-blue) 60%, #2C2E36 60%); }
.its-tl-i { position: relative; text-align: center; }
.its-tl-y { font-family: var(--f-mono); font-size: 13px; font-weight: 600; color: #fff; text-transform: uppercase; }
.its-tl-dot { width: 14px; height: 14px; margin: 10px auto 12px; border-radius: 50%; background: var(--its-blue); position: relative; z-index: 1; }
.its-tl-i.next .its-tl-y { color: var(--its-yellow); } .its-tl-i.next .its-tl-dot { background: var(--its-yellow); }
.its-tl-i.goal .its-tl-y { color: #3DD68C; } .its-tl-i.goal .its-tl-dot { background: #3DD68C; }
.its-tl-l { font-family: var(--f-mono); font-size: 12px; line-height: 1.4; color: #9097A8; padding: 0 4px; }
.its-tl-i.next .its-tl-l, .its-tl-i.goal .its-tl-l { color: #fff; }
.its-roll .its-grid-3 { margin-top: 40px; }
.its-roll .its-grid-3 .its-card:last-child { border-color: #3B5BFF; box-shadow: 0 0 30px -10px rgba(59,91,255,.6); }
.its-roll .its-grid-3 .its-card:last-child .its-v { color: #8EA4FF; }
.its-roll .its-v { font-size: clamp(30px, 3.2vw, 42px); }

/* Parts */
.its-parts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 44px; }
.its-part { display: flex; flex-direction: column; min-height: 360px; }
.its-part-top { display: flex; justify-content: space-between; align-items: center; }
.its .its-part-num { font-family: var(--f-mono); font-size: 15px; font-weight: 600; color: var(--ink-3); }
.its .its-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 7px; font-family: var(--f-mono); font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #fff; }
.its-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.its-badge.live { background: var(--its-green); } .its-badge.next { background: #9A7600; } .its-badge.phase { background: #5A5E6B; }
.its-part.dark .its-badge.live { background: var(--its-blue); }
.its-part h3 { margin: 22px 0 12px; font-size: 21px; font-weight: 700; line-height: 1.25; color: var(--ink); }
.its-part.dark h3 { color: #fff; }
.its-part p { margin: 0; font-size: 15px; line-height: 1.65; color: var(--ink-3); }
.its-part.dark p { color: #A9AFBF; }
.its-part-foot { margin-top: auto; padding-top: 22px; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
.its-part.green .its-part-foot, .its-part.green .its-part-num { color: var(--its-green); }
.its-part.yellow .its-part-foot, .its-part.yellow .its-part-num { color: #A97F00; }
.its-part.dark .its-part-foot, .its-part.dark .its-part-num { color: #8EA4FF; }

/* Core idea: funnel + applicant card */
.its-core { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 18px; margin-top: 44px; align-items: stretch; }
.its-funnel { display: grid; gap: 14px; margin-top: 22px; }
.its-fn { display: grid; grid-template-columns: minmax(0, 1fr) 120px; align-items: center; gap: 16px; }
.its-fn:nth-child(2) .its-fn-box { margin-left: 6%; } .its-fn:nth-child(3) .its-fn-box { margin-left: 12%; margin-right: 6%; }
.its-fn-box { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px 18px; border-radius: 12px; border: 1px solid; }
.its-fn-box b { font-size: 17px; color: #fff; }
.its-fn-box small { font-size: 14px; color: #C9CEDB; }
.its .its-fn-badge { padding: 3px 8px; border-radius: 5px; font-family: var(--f-mono); font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.its-fn.green .its-fn-box { background: #123E2A; border-color: #2FBF77; } .its-fn.green .its-fn-badge { background: #DFF7E9; color: #12693F; } .its-fn.green .its-fn-act { color: #3DD68C; }
.its-fn.yellow .its-fn-box { background: #3A3214; border-color: #E9B92A; } .its-fn.yellow .its-fn-badge { background: #FFF1C2; color: #8A6A00; } .its-fn.yellow .its-fn-act { color: var(--its-yellow); }
.its-fn.red .its-fn-box { background: #3E1A17; border-color: #F0533F; } .its-fn.red .its-fn-badge { background: #FFE0DB; color: #B0302A; } .its-fn.red .its-fn-act { color: #FF7563; }
.its-fn-act { font-family: var(--f-mono); font-size: 13.5px; }
.its-core-note { margin-top: 22px; font-size: 15px; color: #A9AFBF; }
.its-applicant { border-radius: 18px; background: #fff; color: var(--ink); overflow: hidden; display: flex; flex-direction: column; }
.its-applicant-top { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; font-size: 15.5px; font-weight: 700; color: #0B0B0C; }
.its .its-ai-chip { padding: 3px 9px; border-radius: 6px; background: var(--its-blue-soft); color: var(--its-blue); font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; }
.its-msgs { padding: 14px; display: grid; gap: 10px; background: #EFE9E1; }
.its-msg { max-width: 86%; padding: 9px 12px; border-radius: 12px; font-size: 14px; line-height: 1.45; color: #111; box-shadow: 0 1px 1px rgba(0,0,0,.08); }
.its-msg.in { background: #fff; border-top-left-radius: 4px; }
.its-msg.out { justify-self: end; background: #D9FDD3; border-top-right-radius: 4px; }
.its-msg small { display: block; margin-top: 4px; font-size: 10.5px; color: #667; text-align: right; }
.its-props { padding: 4px 18px 8px; }
.its-prop { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid #EEF0F4; font-size: 14.5px; color: #3A3C44; }
.its .its-prop-v { padding: 3px 8px; border-radius: 5px; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .04em; }
.its .its-prop-v.green { background: var(--its-green-soft); color: var(--its-green); }
.its .its-prop-v.yellow { background: var(--its-yellow-soft); color: #A97F00; }
.its .its-prop-v.blue { background: var(--its-blue-soft); color: var(--its-blue); }
.its-sample { padding: 10px 18px 14px; font-family: var(--f-mono); font-size: 11px; color: #9AA0AE; }

/* Core idea animation. The block carries .reveal, so the site's RevealOnScroll
   adds .show when it scrolls into view; the sequence runs once from there.
   Before .show the whole block is hidden by .reveal, so nothing flashes. */
.its .its-live { display: inline-block; width: 6px; height: 6px; margin-right: 6px; border-radius: 50%; background: var(--its-blue); vertical-align: 1px; }
@keyframes its-slide-in { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: none; } }
@keyframes its-fade-in { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
@keyframes its-pop-in { 0% { opacity: 0; transform: translateY(10px) scale(.96); } 100% { opacity: 1; transform: none; } }
@keyframes its-row-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes its-badge-in { 0% { opacity: 0; transform: scale(.6); } 70% { opacity: 1; transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
@keyframes its-chip-flash { 0%, 100% { box-shadow: 0 0 0 0 rgba(43,89,255,0); } 30% { box-shadow: 0 0 0 6px rgba(43,89,255,.25); } }
@keyframes its-live { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .35; transform: scale(.7); } }
@keyframes its-ready-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(47,191,119,0); } 50% { box-shadow: 0 0 28px -4px rgba(47,191,119,.55); } }
@keyframes its-sweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
.its-core.show .its-fn-box { animation: its-slide-in .6s cubic-bezier(.2,.8,.2,1) both; }
.its-core.show .its-fn:nth-child(1) .its-fn-box { animation-delay: .15s; }
.its-core.show .its-fn:nth-child(2) .its-fn-box { animation-delay: .35s; }
.its-core.show .its-fn:nth-child(3) .its-fn-box { animation-delay: .55s; }
.its-core.show .its-fn-act { animation: its-fade-in .5s ease-out both; }
.its-core.show .its-fn:nth-child(1) .its-fn-act { animation-delay: .9s; }
.its-core.show .its-fn:nth-child(2) .its-fn-act { animation-delay: 1.05s; }
.its-core.show .its-fn:nth-child(3) .its-fn-act { animation-delay: 1.2s; }
.its-core.show .its-core-note { animation: its-row-in .5s ease-out 1.4s both; }
.its-core.show .its-msg.in { animation: its-pop-in .45s cubic-bezier(.2,.8,.2,1) .4s both; }
.its-core.show .its-msg.out { animation: its-pop-in .45s cubic-bezier(.2,.8,.2,1) 1.1s both; }
.its-core.show .its-ai-chip { animation: its-chip-flash 1s ease-out 1.6s both; }
.its-core.show .its-live { animation: its-live 1.6s ease-in-out 1.6s infinite; }
.its-core.show .its-prop { animation: its-row-in .4s ease-out both; }
.its-core.show .its-prop-v { animation: its-badge-in .45s cubic-bezier(.2,.8,.2,1) both; }
.its-core.show .its-prop:nth-child(1), .its-core.show .its-prop:nth-child(1) .its-prop-v { animation-delay: 1.8s; }
.its-core.show .its-prop:nth-child(2), .its-core.show .its-prop:nth-child(2) .its-prop-v { animation-delay: 2.0s; }
.its-core.show .its-prop:nth-child(3), .its-core.show .its-prop:nth-child(3) .its-prop-v { animation-delay: 2.2s; }
.its-core.show .its-prop:nth-child(4), .its-core.show .its-prop:nth-child(4) .its-prop-v { animation-delay: 2.4s; }
.its-core.show .its-prop:nth-child(5), .its-core.show .its-prop:nth-child(5) .its-prop-v { animation-delay: 2.6s; }
/* Once the stage tag lands on "Listo", the matching funnel row lights up and keeps a soft glow. */
.its-core.show .its-funnel .its-fn.green .its-fn-box { animation: its-slide-in .6s cubic-bezier(.2,.8,.2,1) .15s both, its-ready-glow 2.4s ease-in-out 2.1s infinite; }
/* A light sweep across the funnel card while the AI "reads" the chat. */
.its-core .its-funnel { position: relative; }
.its-core .its-fn-box { position: relative; overflow: hidden; }
.its-core.show .its-fn-box::after { content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent); transform: translateX(-100%);
  animation: its-sweep 1.1s ease-in-out 1.7s 1 both; }
@media (prefers-reduced-motion: reduce) {
  .its-core.show *, .its-core.show *::after { animation: none !important; }
}

/* A day in admissions */
.its-day { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); grid-template-rows: 1fr 1fr; gap: 16px; margin-top: 44px; }
.its-day .its-photo:first-child { grid-row: 1 / span 2; }
.its-day .its-photo { min-height: 220px; }
.its-day-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 18px 20px; background: linear-gradient(0deg, rgba(10,10,12,.92), rgba(10,10,12,.75)); }
.its-day-cap .its-k { color: #8EA4FF; }
.its-day-cap p { margin: 6px 0 0; font-size: 16px; font-weight: 600; color: #fff; }
.its .its-photo-chip.red::before { background: #FF7563; }
.its-day-note { margin-top: 14px; font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-4, #9AA0AE); }

/* Win-back */
.its-win { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: clamp(28px, 4vw, 56px); align-items: center; }
.its-win p.its-body { margin: 20px 0 0; font-size: 17px; line-height: 1.7; color: var(--ink-3); }
.its-win p.its-body b { color: var(--ink); }
.its-flow { display: flex; align-items: center; gap: 10px; margin-top: 28px; flex-wrap: wrap; }
.its .its-flow-s { padding: 8px 12px; border-radius: 8px; font-family: var(--f-mono); font-size: 12.5px; font-weight: 600; text-transform: uppercase; color: #fff; white-space: nowrap; }
.its-flow-s.s0 { background: #C0362A; } .its-flow-s.s1 { background: var(--its-blue); } .its-flow-s.s2 { background: var(--its-green); }
.its-flow i { flex: 0 1 60px; height: 2px; background: linear-gradient(90deg, transparent, #4E6BFF, transparent); }
.its-win-img { border-radius: 20px; overflow: hidden; border: 1px solid var(--line); box-shadow: 0 30px 60px -36px rgba(20,30,80,.5); }
.its-win-img img { display: block; width: 100%; height: auto; }
.its-win-cap { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 12px; font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-4, #9AA0AE); }
.its-win-cap span:last-child { color: var(--ink-3); }

/* Team inbox */
.its-inbox { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 18px; margin-top: 44px; align-items: stretch; }
.its-inbox .its-photo { min-height: 420px; }
.its-panel { border-radius: 18px; border: 1px solid var(--line); background: #fff; display: flex; flex-direction: column; }
.its-panel-top { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--line); font-size: 15.5px; font-weight: 600; color: var(--ink); }
.its .its-panel-top span { font-family: var(--f-mono); font-size: 12px; font-weight: 500; color: var(--ink-3); }
.its-filters { display: flex; flex-wrap: wrap; gap: 8px; padding: 14px 20px; border-bottom: 1px solid var(--line); }
.its .its-filter { padding: 4px 9px; border-radius: 6px; font-family: var(--f-mono); font-size: 12px; font-weight: 600; }
.its-filter.f0 { background: var(--its-green-soft); color: var(--its-green); } .its-filter.f1 { background: var(--its-yellow-soft); color: #A97F00; }
.its-filter.f2 { background: var(--its-red-soft); color: #C0362A; } .its-filter.f3 { background: var(--its-blue-soft); color: var(--its-blue); }
.its-replies { padding: 18px 20px 8px; }
.its-reply { display: grid; grid-template-columns: 84px 1fr 44px; gap: 14px; align-items: center; margin-top: 12px; font-size: 14.5px; color: var(--ink); }
.its-reply .its-bar { height: 12px; border-radius: 99px; background: #EEF0F5; overflow: hidden; }
.its-reply .its-bar i { display: block; height: 100%; border-radius: 99px; }
.its-reply.fast i { background: #2FBF77; } .its-reply.mid i { background: var(--its-yellow); } .its-reply.slow i { background: var(--its-red); }
.its-reply b { font-family: var(--f-mono); font-size: 13px; font-weight: 500; }
.its-summary { margin: 16px 20px 0; padding: 16px 18px; border-radius: 14px; background: var(--its-blue-soft); }
.its-summary b { display: block; font-size: 15.5px; color: var(--ink); }
.its-summary p { margin: 6px 0 0; font-size: 14.5px; line-height: 1.55; color: var(--ink-3); }
.its-panel .its-sample { margin-top: auto; }

/* Results */
.its-results .its-grid-4 { margin-top: 44px; }
.its-results .its-grid-4 .its-card:nth-child(1) { border-color: #2FBF77; box-shadow: 0 0 30px -10px rgba(47,191,119,.55); }
.its-results .its-grid-4 .its-card:nth-child(2) { border-color: #3B5BFF; box-shadow: 0 0 30px -10px rgba(59,91,255,.55); }
.its-results .its-grid-4 .its-card:nth-child(3) { border-color: #E9B92A; box-shadow: 0 0 30px -10px rgba(246,197,43,.55); }
.its-ba { margin-top: 16px; padding: clamp(20px, 3vw, 32px); }
.its-ba-table { width: 100%; border-collapse: collapse; }
.its-ba-table th { padding: 0 12px 12px 0; text-align: left; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #9097A8; }
.its-ba-table td { padding: 15px 12px 15px 0; border-top: 1px solid #2A2C34; font-size: 15.5px; color: #F2F4FA; }
.its-ba-table td.b { color: #FF7563; } .its-ba-table td.a { color: #3DD68C; }
.its-results-note { margin-top: 20px; font-size: 14px; color: #A9AFBF; }

/* Benefits */
.its-ben { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 44px; }
.its-ben .its-card h3 { margin: 12px 0 18px; font-size: 21px; font-weight: 700; line-height: 1.25; color: var(--ink); }
.its-ben ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
.its-ben li { position: relative; padding-left: 24px; }
.its-ben li::before { content: '✓'; position: absolute; left: 0; top: 0; font-weight: 700; color: var(--its-blue); }
.its-ben .green li::before { color: var(--its-green); } .its-ben .yellow li::before { color: #A97F00; } .its-ben .plain li::before { color: var(--ink); }
.its-ben li b { display: block; font-size: 15.5px; color: var(--ink); }
.its-ben li span { display: block; margin-top: 3px; font-size: 14.5px; line-height: 1.5; color: var(--ink-3); }
.its-ben .blue .its-k { color: var(--its-blue); } .its-ben .green .its-k { color: var(--its-green); } .its-ben .yellow .its-k { color: #A97F00; }
.its-powered { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px; margin-top: 28px; }
.its-powered .its-k { margin-right: 6px; }

/* AI agent */
.its-agent { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.3fr); gap: 18px; margin-top: 44px; align-items: stretch; }
.its-agent .its-applicant .its-msg.out small { color: #4F7A56; }
.its-chips { display: flex; flex-wrap: wrap; gap: 8px; padding: 14px 18px 4px; }
.its .its-chip { padding: 4px 9px; border-radius: 6px; font-family: var(--f-mono); font-size: 12px; font-weight: 600; }
.its-chip.c0 { background: var(--its-green-soft); color: var(--its-green); } .its-chip.c1 { background: var(--its-blue-soft); color: var(--its-blue); } .its-chip.c2 { background: var(--its-yellow-soft); color: #A97F00; }
.its-agent .its-grid-2 .its-card h3 { margin: 12px 0 8px; font-size: 20px; font-weight: 700; color: #fff; }
.its-agent .its-grid-2 .its-card p { margin: 0; font-size: 15px; line-height: 1.55; color: #A9AFBF; }
.its-agent .its-grid-2 .its-card:nth-child(1) { border-color: #3B5BFF; box-shadow: 0 0 30px -10px rgba(59,91,255,.55); }
.its-agent .its-grid-2 .its-card:nth-child(3) { border-color: #2FBF77; box-shadow: 0 0 30px -10px rgba(47,191,119,.55); }
.its-agent-foot { margin-top: 18px; font-family: var(--f-mono); font-size: 11.5px; color: #6E7384; }

/* In their words */
.its-words { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 60px); align-items: center; }
.its-words .its-photo { min-height: 360px; }
.its-quote { margin: 18px 0 10px; font-size: clamp(21px, 2.3vw, 28px); line-height: 1.4; color: var(--ink); }
.its-quote-by { font-family: var(--f-mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
.its-next { margin-top: 30px; display: grid; gap: 10px; }
.its-next-i { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 14px; border: 1px solid var(--line); background: #fff; font-size: 15.5px; color: var(--ink); }
.its .its-next-b { flex-shrink: 0; padding: 3px 8px; border-radius: 5px; font-family: var(--f-mono); font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.its-next-i:nth-child(1) .its-next-b { background: var(--its-yellow-soft); color: #A97F00; }
.its-next-i:nth-child(2) .its-next-b { background: var(--its-blue-soft); color: var(--its-blue); }
.its-next-i:nth-child(3) .its-next-b { background: var(--its-green-soft); color: var(--its-green); }

/* Why + CTA */
.its-why { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 48px); align-items: center; }
.its-why-p { margin: 18px 0 0; font-size: 14.5px; color: #A9AFBF; }
.its-why .its-grid-2 { margin-top: 18px; }
.its-why .its-grid-2 .its-card:nth-child(1) { border-color: #3B5BFF; box-shadow: 0 0 26px -10px rgba(59,91,255,.6); }
.its-why .its-grid-2 .its-card:nth-child(3) { border-color: #E9B92A; box-shadow: 0 0 26px -10px rgba(246,197,43,.6); }
.its-why .its-grid-2 .its-card:nth-child(4) { border-color: #2FBF77; box-shadow: 0 0 26px -10px rgba(47,191,119,.6); }
.its-why .its-grid-2 .its-card:nth-child(3) .its-v { color: var(--its-yellow); }
.its-why .its-grid-2 .its-card:nth-child(4) .its-v { color: #3DD68C; font-size: clamp(26px, 3vw, 36px); }
.its-cta-card { --ink: #0B0B0C; --ink-2: #2A2C33; --ink-3: #5A5C64; --ink-4: #8A8C93; padding: clamp(26px, 3.4vw, 40px); border-radius: 22px; background: #fff; color: var(--ink); }
.landing .its-cta-card .its-cta-logo { display: block; height: 30px; width: auto; filter: brightness(0); }
.landing .its-cta-card .its-cta-btns .btn:not(.btn-primary) { color: #0B0B0C; background: #fff; border: 1px solid #D9DAD6; }
.landing .its-cta-card .its-cta-btns .btn:not(.btn-primary):hover { border-color: #0B0B0C; }
.landing .its-cta-card h2 { margin: 20px 0 12px; font-family: var(--f-display); font-weight: 700; font-size: clamp(24px, 2.6vw, 32px); line-height: 1.2; letter-spacing: -0.02em; color: var(--ink); max-width: none; }
.its-cta-card p { margin: 0; font-size: 15.5px; line-height: 1.6; color: var(--ink-3); }
.its-cta-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.landing .its-cta-card .its-cta-foot { margin-top: 16px; font-family: var(--f-mono); font-size: 11.5px; color: #5A5C64; }
.landing .its-back { display: inline-block; margin-top: 18px; font-size: 14px; font-weight: 600; color: var(--its-blue); }

@media (max-width: 1024px) {
  .its-parts, .its-ben, .its-grid-4 { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .its-about, .its-apply, .its-challenge, .its-core, .its-day, .its-win, .its-inbox, .its-agent, .its-words, .its-why { grid-template-columns: 1fr; }
  .its-day { grid-template-rows: auto; }
  .its-day .its-photo:first-child { grid-row: auto; min-height: 320px; }
  .its-apply .its-photo { min-height: 360px; }
  .its-about .its-photo { min-height: 320px; }
  .its-grid-3 { grid-template-columns: 1fr; }
  .its-tl { grid-template-columns: repeat(3, 1fr); row-gap: 22px; }
  .its-tl::before { display: none; }
  .its-fn { grid-template-columns: 1fr; gap: 6px; }
  .its-fn:nth-child(n) .its-fn-box { margin: 0; }
}
@media (max-width: 560px) {
  .landing .v16-brand .its-hero .its-lockup { gap: 10px; }
  .landing .v16-brand .its-hero .its-lockup-logo { height: 30px; }
  .landing .v16-brand .its-hero .its-lockup-partner { height: 48px; }
  .landing .v16-brand .its-hero .its-hero-stat { min-width: 0; width: 100%; }
  .its-parts, .its-ben, .its-grid-2, .its-grid-4, .its-groups { grid-template-columns: 1fr; }
  .its-group.g4 { flex-direction: column; align-items: flex-start; }
  .its-ba-table td, .its-ba-table th { font-size: 13.5px; }
}
`

export default async function ItecsurCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getItecsurContent(locale)

  const prefix = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const hubUrl = `${SITE_URL}${prefix}/case-studies`
  const pageUrl = `${SITE_URL}${prefix}${SLUG}`
  const headline = itecsurHeadline(t)
  const pricingHref = `${prefix}/pricing`
  const demoHref = 'https://eazybe.info/demono'

  const dates = pageDates({ page: SLUG, doc: await getSanityDocDates('caseStudy', locale, SANITY_SLUG) })
  const eazybeOrg = { '@id': `${SITE_URL}/#organization` }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.breadcrumb.hub, item: hubUrl },
      { '@type': 'ListItem', position: 3, name: t.breadcrumb.current, item: pageUrl },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline,
    description: t.meta.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    inLanguage: HTML_LANG[locale] ?? locale,
    image: [SHARE_IMG],
    ...(dates && { datePublished: dates.published, dateModified: dates.modified }),
    author: eazybeOrg,
    publisher: eazybeOrg,
    about: {
      '@type': 'CollegeOrUniversity',
      name: 'Instituto Superior Universitario Compu Sur (ITECSUR)',
      alternateName: 'ITECSUR',
      url: 'https://itecsur.edu.ec',
      foundingDate: '1994',
      address: { '@type': 'PostalAddress', addressLocality: 'Quito', addressCountry: 'EC' },
    },
  }

  const partTones = ['green', 'yellow', 'dark glow', '']
  const aboutTones = ['blue', 'dark', 'green', 'yellow']
  const aboutValueTones = ['blue', '', 'green', '']
  const campusTones = ['', '', '', 'green', 'yellow']
  const challengeTones = ['red', 'yellow', '', 'dark']
  const benefitTones = ['blue', 'green', 'yellow', 'plain']
  const [scene1, scene2, scene3] = t.day.scenes

  return (
    <div className="its">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* 1. Hero — deck cover (slide 01) on the brand dark hero. */}
      <section className="its-hero">
        <div className="container">
          <div className="its-lockup" aria-label="Eazybe and ITECSUR">
            <img className="its-lockup-logo" src="/logo-small.png" alt="Eazybe" width={274} height={64} fetchPriority="high" />
            <span className="its-x" aria-hidden="true">×</span>
            <img className="its-lockup-partner" src={`${IMG}/itecsur-logo.webp`} alt="Instituto Superior Universitario ITECSUR" width={336} height={208} />
          </div>
          <div className="its-hero-eyebrow">{t.hero.eyebrow}</div>
          <h1>
            <span className="its-h1-a">{t.hero.h1Pre && <><span className="lt">{t.hero.h1Pre}</span>{' '}</>}{t.hero.h1Company}</span>
            <span className="its-h1-b">{t.hero.h1Highlight}</span>
            <span className="its-h1-c"><span className="it">{t.hero.h1Italic}</span>{' '}{t.hero.h1With && <><span className="lt">{t.hero.h1With}</span>{' '}</>}{t.hero.h1Bold}</span>
          </h1>
          <p className="its-lede">{t.hero.subtitle}</p>
          <div className="its-hero-stats">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="its-hero-stat">
                <div className="v">{s.value}</div>
                <div className="l">
                  {s.label}
                  {s.goal && <> · <span className="its-goal">{s.goal}</span></>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. About the customer */}
      <section className="its-sec">
        <div className="container">
          <div className="its-about">
            <div>
              <div className="its-tag">{t.about.tag}</div>
              <h2 className="its-h2">{t.about.h2Lead} <span className="its-hl">{t.about.h2Highlight}</span></h2>
              <p className="its-body"><b>{t.about.bodyBold1}</b>{t.about.bodyMid} <b>{t.about.bodyBold2}</b>{t.about.bodyEnd}</p>
              <div className="its-grid-4">
                {t.about.facts.map((f, i) => (
                  <div key={f.label} className={`its-card ${aboutTones[i]}`}>
                    <div className="its-k">{f.label}</div>
                    <div className={`its-v ${aboutValueTones[i]}`}>{f.value}</div>
                    <div className="its-n">{f.note}</div>
                  </div>
                ))}
              </div>
              <div className="its-card its-campuses">
                <div className="its-k">{t.about.campusesLabel}</div>
                <div className="its-pills">
                  {t.about.campuses.map((c, i) => <span key={c} className={`its-pill ${campusTones[i]}`}>{c}</span>)}
                </div>
                <p>{t.about.campusesNote}</p>
              </div>
              <div className="its-src">{t.about.source}</div>
            </div>
            <div className="its-photo">
              <img src={`${IMG}/campus-quito-sur.webp`} alt={t.about.photoAlt} width={287} height={309} loading="lazy" />
              <span className="its-photo-chip">{t.about.photoChip}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Who applies */}
      <section className="its-sec alt">
        <div className="container">
          <div className="its-apply">
            <div className="its-photo">
              <img src={`${IMG}/itecsur-graduates.webp`} alt={t.applicants.photoAlt} width={318} height={520} loading="lazy" />
              <span className="its-photo-chip">{t.applicants.photoChip}</span>
            </div>
            <div>
              <div className="its-tag">{t.applicants.tag}</div>
              <h2 className="its-h2">{t.applicants.h2Lead}<br /><span className="its-hl">{t.applicants.h2Highlight}</span></h2>
              <p className="its-sub" style={{ margin: '16px 0 0' }}>{t.applicants.body}</p>
              <div className="its-groups">
                {t.applicants.groups.map((g, i) => (
                  <div key={g.name} className={`its-group g${i}`}>
                    <div>
                      <div className="its-k">{g.name} · {g.count}</div>
                      <p>{g.programs}</p>
                    </div>
                    {i === 4 && <span className="its-modes">{t.applicants.modes}</span>}
                  </div>
                ))}
              </div>
              <div className="its-src">{t.applicants.source}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The challenge */}
      <section className="its-sec">
        <div className="container">
          <div className="its-center">
            <div className="its-tag red">{t.challenge.tag}</div>
            <h2 className="its-h2">{t.challenge.h2Lead} <span className="its-hl red">{t.challenge.h2Highlight}</span></h2>
          </div>
          <div className="its-challenge">
            <div className="its-wa" aria-label={t.challenge.inboxNote}>
              <div className="its-wa-top">{t.challenge.inboxTitle}<span className="its-wa-badge">{t.challenge.inboxBadge}</span></div>
              {ITECSUR_INBOX.map((c) => (
                <div key={c.initials} className="its-wa-row">
                  <span className="its-av" aria-hidden="true">{c.initials}</span>
                  <div><b>{c.name}</b><small>{c.msg}</small></div>
                  <span className="ago">{c.ago}</span>
                </div>
              ))}
              <div className="its-wa-note">{t.challenge.inboxNote}</div>
            </div>
            <div className="its-grid-2">
              {t.challenge.cards.map((c, i) => (
                <div key={c.label} className={`its-card ${challengeTones[i]}`}>
                  <div className="its-k">{c.label}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. The rollout */}
      <section className="its-sec dark">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.rollout.tag}</div>
            <h2 className="its-h2">{t.rollout.h2Lead} <span className="its-hl">{t.rollout.h2Highlight}</span></h2>
          </div>
          <div className="its-card its-roll">
            <ol className="its-tl" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {t.rollout.steps.map((s) => (
                <li key={s.date} className={`its-tl-i ${s.state}`}>
                  <div className="its-tl-y">{s.date}</div>
                  <div className="its-tl-dot" aria-hidden="true" />
                  <div className="its-tl-l">{s.label}</div>
                </li>
              ))}
            </ol>
            <div className="its-grid-3">
              {t.rollout.stats.map((s) => (
                <div key={s.label} className="its-card">
                  <div className="its-k">{s.label}</div>
                  <div className="its-v">{s.value}</div>
                  <div className="its-n">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Four parts */}
      <section className="its-sec">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.parts.tag}</div>
            <h2 className="its-h2">{t.parts.h2Lead} <span className="its-hl">{t.parts.h2Highlight}</span></h2>
          </div>
          <div className="its-parts">
            {t.parts.items.map((p, i) => (
              <div key={p.num} className={`its-card its-part ${partTones[i]}`}>
                <div className="its-part-top">
                  <span className="its-part-num">{p.num}</span>
                  <span className={`its-badge ${p.status}`}>{p.statusLabel}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="its-part-foot">{p.foot}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The core idea: AI enrolment stage */}
      <section className="its-sec dark">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.core.tag}</div>
            <h2 className="its-h2">{t.core.h2Lead} <span className="its-hl">{t.core.h2Highlight}</span></h2>
          </div>
          <div className="its-core reveal">
            <div className="its-card">
              <div className="its-k">{t.core.funnelLabel}</div>
              <div className="its-funnel">
                {t.core.funnel.map((f) => (
                  <div key={f.badge} className={`its-fn ${f.tone}`}>
                    <div className="its-fn-box">
                      <span className="its-fn-badge">{f.badge}</span>
                      <b>{f.title}</b>
                      {f.note && <small>{f.note}</small>}
                    </div>
                    <span className="its-fn-act">→ {f.action}</span>
                  </div>
                ))}
              </div>
              <p className="its-core-note">{t.core.funnelNote}</p>
            </div>
            <div className="its-applicant">
              <div className="its-applicant-top">{t.core.chatName}<span className="its-ai-chip"><span className="its-live" aria-hidden="true" />{t.core.chatBadge}</span></div>
              <div className="its-msgs">
                <div className="its-msg in">{ITECSUR_CORE_CHAT.inText}<small>{ITECSUR_CORE_CHAT.inTime}</small></div>
                <div className="its-msg out">{ITECSUR_CORE_CHAT.outText}<small>{ITECSUR_CORE_CHAT.outTime} ✓✓</small></div>
              </div>
              <div className="its-props">
                {ITECSUR_CORE_CHAT.props.map((p) => (
                  <div key={p.k} className="its-prop"><span>{p.k}</span><span className={`its-prop-v ${p.tone}`}>{p.v}</span></div>
                ))}
              </div>
              <div className="its-sample">{t.core.propsNote}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. A day in admissions */}
      <section className="its-sec">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.day.tag}</div>
            <h2 className="its-h2">{t.day.h2Lead} <span className="its-hl">{t.day.h2Highlight}</span></h2>
          </div>
          <div className="its-day">
            <div className="its-photo">
              <img src={`${IMG}/scene-capture.webp`} alt={scene1.alt} width={1200} height={800} loading="lazy" />
              <div className="its-day-cap"><div className="its-k">{scene1.label}</div><p>{scene1.caption}</p></div>
            </div>
            <div className="its-photo">
              <img src={`${IMG}/scene-stage-live.webp`} alt={scene2.alt} width={576} height={324} loading="lazy" />
              <span className="its-photo-chip">{scene2.label}</span>
            </div>
            <div className="its-photo">
              <img src={`${IMG}/scene-advisor-assigned.webp`} alt={scene3.alt} width={800} height={450} loading="lazy" />
              <span className="its-photo-chip red">{scene3.label}</span>
            </div>
          </div>
          <div className="its-day-note">ITECSUR × Eazybe · {t.day.note}</div>
        </div>
      </section>

      {/* 9. Win-back broadcast */}
      <section className="its-sec alt">
        <div className="container">
          <div className="its-win">
            <div>
              <div className="its-tag">{t.winback.tag}</div>
              <h2 className="its-h2">{t.winback.h2Lead}<br /><span className="its-hl">{t.winback.h2Highlight}</span></h2>
              <p className="its-body">{t.winback.bodyPre && <>{t.winback.bodyPre} </>}<b>{t.winback.bodyBold}</b> {t.winback.bodyPost}</p>
              <div className="its-flow" aria-label={t.winback.flow.join(' → ')}>
                {t.winback.flow.map((f, i) => (
                  <span key={f} style={{ display: 'contents' }}>
                    {i > 0 && <i aria-hidden="true" />}
                    <span className={`its-flow-s s${i}`}>{f}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="its-win-img">
                <img src={`${IMG}/winback-hola-to-matriculado.webp`} alt={t.winback.imageAlt} width={1280} height={720} loading="lazy" />
              </div>
              <div className="its-win-cap"><span>{t.winback.imageNote}</span><span>{t.winback.templateNote}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Team inbox + analytics */}
      <section className="its-sec">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.inbox.tag}</div>
            <h2 className="its-h2">{t.inbox.h2Lead} <span className="its-hl">{t.inbox.h2Highlight}</span></h2>
          </div>
          <div className="its-inbox">
            <div className="its-photo">
              <img src={`${IMG}/scene-admissions-lead.webp`} alt={t.inbox.photoAlt} width={1200} height={800} loading="lazy" />
              <span className="its-photo-chip">{t.inbox.photoChip}</span>
            </div>
            <div className="its-panel">
              <div className="its-panel-top">{t.inbox.panelTitle}<span>{t.inbox.panelCount}</span></div>
              <div className="its-filters">
                {t.inbox.filters.map((f, i) => <span key={f} className={`its-filter f${i}`}>{f}</span>)}
              </div>
              <div className="its-replies">
                <div className="its-k">{t.inbox.replyLabel}</div>
                {t.inbox.advisors.map((a) => (
                  <div key={a.name} className={`its-reply ${a.tone}`}>
                    <span>{a.name}</span>
                    <span className="its-bar"><i style={{ width: `${a.pct}%` }} /></span>
                    <b>{a.speed}</b>
                  </div>
                ))}
              </div>
              <div className="its-summary"><b>{t.inbox.summaryTitle}</b><p>{t.inbox.summaryBody}</p></div>
              <div className="its-sample">{t.inbox.sample}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Results so far */}
      <section className="its-sec dark its-results">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.results.tag}</div>
            <h2 className="its-h2">{t.results.h2Lead} <span className="its-hl">{t.results.h2Highlight}</span></h2>
          </div>
          <div className="its-grid-4">
            {t.results.stats.map((s, i) => (
              <div key={s.label} className="its-card">
                <div className="its-k">{s.label}</div>
                <div className={`its-v ${['green', 'blue', 'yellow', ''][i]}`}>{s.value}</div>
                <div className="its-n">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="its-card its-ba">
            <table className="its-ba-table">
              <thead>
                <tr>
                  <th scope="col"><span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{t.results.aspectLabel}</span></th>
                  <th scope="col">{t.results.beforeLabel}</th>
                  <th scope="col">{t.results.afterLabel}</th>
                </tr>
              </thead>
              <tbody>
                {t.results.rows.map((r) => (
                  <tr key={r.aspect}>
                    <td>{r.aspect}</td>
                    <td className="b">{r.before}</td>
                    <td className="a">{r.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="its-results-note its-center">{t.results.note}</p>
        </div>
      </section>

      {/* 12. Benefits */}
      <section className="its-sec">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.benefits.tag}</div>
            <h2 className="its-h2">{t.benefits.h2Lead} <span className="its-hl">{t.benefits.h2Highlight}</span></h2>
            <p className="its-sub">{t.benefits.subtitle}</p>
          </div>
          <div className="its-ben">
            {t.benefits.columns.map((c, i) => (
              <div key={c.label} className={`its-card ${benefitTones[i]}`}>
                <div className="its-k">{c.label}</div>
                <h3>{c.title}</h3>
                <ul>
                  {c.items.map((it) => <li key={it.title}><b>{it.title}</b><span>{it.body}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="its-powered">
            <span className="its-k">{t.benefits.poweredLabel}</span>
            {t.benefits.powered.map((p) => <span key={p} className="its-pill">{p}</span>)}
          </div>
        </div>
      </section>

      {/* 13. Next phase: AI agent */}
      <section className="its-sec dark">
        <div className="container">
          <div className="its-center">
            <div className="its-tag">{t.agent.tag}</div>
            <h2 className="its-h2">{t.agent.h2Lead} <span className="its-hl">{t.agent.h2Highlight}</span></h2>
            <p className="its-sub">{t.agent.subtitle}</p>
          </div>
          <div className="its-agent">
            <div className="its-applicant">
              <div className="its-applicant-top">{t.agent.chatTitle}<span className="its-ai-chip">{t.agent.chatBadge}</span></div>
              <div className="its-msgs">
                {ITECSUR_AGENT_CHAT.map((m, i) => (
                  <div key={i} className={`its-msg ${m.dir}`}>
                    {m.text}
                    <small>{m.time}{m.dir === 'out' ? ` ✓✓ · ${t.agent.aiLabel}` : ''}</small>
                  </div>
                ))}
              </div>
              <div className="its-chips">
                {t.agent.chips.map((c, i) => <span key={c} className={`its-chip c${i}`}>{c}</span>)}
              </div>
              <div className="its-sample">{t.core.propsNote}</div>
            </div>
            <div className="its-grid-2">
              {t.agent.cards.map((c) => (
                <div key={c.label} className="its-card">
                  <div className="its-k">{c.label}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="its-agent-foot">{t.agent.foot}</div>
        </div>
      </section>

      {/* 14. In their words + what's next */}
      <section className="its-sec">
        <div className="container">
          <div className="its-words">
            <div className="its-photo">
              <img src={`${IMG}/scene-hubspot-sync.webp`} alt={t.words.photoAlt} width={1200} height={800} loading="lazy" />
            </div>
            <div>
              {/* The customer quote waits for ITECSUR's approval (see quoteApproved). */}
              {t.words.quoteApproved && (
                <>
                  <div className="its-tag">{t.words.tag}</div>
                  <blockquote className="its-quote">“{t.words.quote}”</blockquote>
                  <div className="its-quote-by">{t.words.quoteBy}</div>
                </>
              )}
              <div className="its-k" style={{ marginTop: t.words.quoteApproved ? 30 : 0 }}>{t.words.nextLabel}</div>
              <div className="its-next">
                {t.words.next.map((n) => (
                  <div key={n.badge} className="its-next-i"><span className="its-next-b">{n.badge}</span>{n.text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Why Eazybe + CTA */}
      <section className="its-sec dark">
        <div className="container">
          <div className="its-why">
            <div>
              <div className="its-tag">{t.why.tag}</div>
              <div className="its-grid-2">
                {t.why.stats.map((s) => (
                  <div key={s.label} className="its-card">
                    <div className="its-v" style={{ marginTop: 0 }}>{s.value}</div>
                    <div className="its-n">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="its-why-p">{t.why.partners}</p>
            </div>
            <div className="its-cta-card">
              <img className="its-cta-logo" src="/logo-small.png" alt="Eazybe" width={274} height={64} loading="lazy" />
              <h2>{t.finalCta.h2}</h2>
              <p>{t.finalCta.body}</p>
              <div className="its-cta-btns">
                <a href={pricingHref} className="btn btn-primary btn-lg">{t.finalCta.primary}</a>
                <a href={demoHref} className="btn btn-lg">{t.finalCta.secondary}</a>
              </div>
              <div className="its-cta-foot">{t.finalCta.footnote}</div>
              <a className="its-back" href={`${prefix}/case-studies`}>← {t.finalCta.backToHub}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
