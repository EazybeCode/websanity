import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getBmcContent, bmcHeadline } from '@/data/case-study-bmc-hyundai'
import { pageDates, withPageDates } from '@/lib/page-dates'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const SLUG = '/case-studies/bmc-hyundai'
const SITE_URL = 'https://eazybe.com'

async function baseMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getBmcContent(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale, SLUG),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      title: t.meta.title.replace(' | Eazybe', ''),
      description: t.meta.ogDescription,
      siteName: 'Eazybe',
    },
  }
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return withPageDates(await baseMetadata(props), pageDates({ page: SLUG }))
}

const CSS = `
.bmc { --bmc-blue: #2B59FF; --bmc-blue-soft: #EAF0FF; --bmc-red: #F0533F; --bmc-red-soft: #FFE3DF;
  --bmc-yellow: #F6C52B; --bmc-yellow-soft: #FFF4D1; --bmc-green: #1E9E62; --bmc-green-soft: #E6F5EC;
  --bmc-dark: #111216; --bmc-dark-2: #17181D; --bmc-dark-line: #26272E; }
.bmc-sec { padding: clamp(64px, 8vw, 104px) 0; background: #fff; }
.bmc-sec.alt { background: #F6F8FC; }
.landing .v16-brand .bmc-sec.dark ::selection { background: #2b59ff; color: #ffffff; }
.bmc-sec.dark { background: radial-gradient(ellipse 70% 45% at 50% 0%, #1B2A78 0%, rgba(27,42,120,0) 70%), #0B0C0F; color: #F2F4FA; }
.bmc-tag { font-family: var(--f-mono); font-size: 12.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--bmc-blue); }
.bmc-sec.dark .bmc-tag { color: #8EA4FF; }
.bmc-tag.red { color: var(--bmc-red); }
.landing .bmc h2.bmc-h2 { font-family: var(--f-display); font-weight: 400; font-size: clamp(30px, 4vw, 50px); line-height: 1.1;
  letter-spacing: -0.025em; margin: 14px 0 0; color: var(--ink); max-width: none; }
.landing .bmc-sec.dark h2.bmc-h2 { color: #fff; }
.bmc .bmc-hl { color: var(--bmc-blue); }
.bmc-sec.dark .bmc-hl { color: #8EA4FF; }
.bmc-hl.red { color: var(--bmc-red); }
.bmc-center { text-align: center; }
.bmc-sub { margin: 14px auto 0; max-width: 760px; font-size: 17px; line-height: 1.6; color: var(--ink-3); }
.bmc-src { margin-top: 26px; font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-4, #9AA0AE); }
.bmc-sec.dark .bmc-src { color: #6E7384; }

/* Cards */
.bmc-card { border-radius: 18px; padding: clamp(20px, 2.4vw, 28px); background: #fff; border: 1px solid var(--line); }
.bmc-card.blue { background: var(--bmc-blue-soft); border-color: transparent; }
.bmc-card.yellow { background: var(--bmc-yellow-soft); border-color: transparent; }
.bmc-card.green { background: var(--bmc-green-soft); border-color: transparent; }
.bmc-card.red { background: var(--bmc-red-soft); border-color: transparent; }
.bmc-card.dark { background: var(--bmc-dark); border-color: var(--bmc-dark-line); color: #F2F4FA; }
.bmc-card.glow { border-color: #3B5BFF; box-shadow: 0 0 34px -8px rgba(59,91,255,.55); }
.bmc-card.glow-y { border-color: #E9B92A; box-shadow: 0 0 30px -10px rgba(246,197,43,.6); }
.bmc-sec.dark .bmc-card { background: var(--bmc-dark-2); border-color: var(--bmc-dark-line); color: #F2F4FA; }
.bmc-k { font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }
.bmc-card.dark .bmc-k, .bmc-sec.dark .bmc-k { color: #9097A8; }
.bmc-v { margin-top: 10px; font-family: var(--f-display); font-weight: 700; font-size: clamp(34px, 4vw, 52px); line-height: 1; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.bmc-v.blue { color: var(--bmc-blue); } .bmc-v.yellow { color: var(--bmc-yellow); } .bmc-v.green { color: var(--bmc-green); } .bmc-v.red { color: #C0362A; }
.bmc-sec.dark .bmc-v.blue { color: #8EA4FF; } .bmc-sec.dark .bmc-v.green { color: #3DD68C; }
.bmc-n { margin-top: 10px; font-size: 14.5px; line-height: 1.5; color: var(--ink-3); }
.bmc-card.dark .bmc-n, .bmc-sec.dark .bmc-n { color: #A9AFBF; }

/* Hero — matches the deck cover: white page with a faint dot grid and a soft
   blue light at the top, Geist type, mono labels and numbers. */
.landing .v16-brand .bmc-hero {
  padding: clamp(140px, 14vw, 180px) 0 clamp(64px, 8vw, 96px); text-align: center;
  /* Brand dark hero: ink page, faint dot grid, one soft blue light above the headline. */
  background:
    radial-gradient(ellipse 60% 50% at 50% -8%, rgba(43, 89, 255, 0.38), rgba(43, 89, 255, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 22px 22px,
    #0b0b0c;
}
.landing .v16-brand .bmc .bmc-goal { color: #A97F00; font-weight: 600; }
/* Selected text on the dark hero: Eazybe Blue highlight with white text (the site
   default is light blue with black ink, which reads as black blocks here). */
.landing .v16-brand .bmc-hero ::selection { background: #2b59ff; color: #ffffff; }
.landing .v16-brand .bmc-hero .bmc-lockup { display: inline-flex; align-items: center; gap: 18px; font-family: 'Geist', sans-serif; }
.landing .v16-brand .bmc-hero .bmc-lockup-logo { display: block; height: 42px; width: auto; }
@media (max-width: 640px) { .landing .v16-brand .bmc-hero .bmc-lockup-logo { height: 30px; } }
.landing .v16-brand .bmc-hero .bmc-lockup-e { display: inline-flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 700; letter-spacing: -0.03em; color: #ffffff; }
.landing .v16-brand .bmc-hero .bmc-lockup-e i { width: 44px; height: 44px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center;
  background: linear-gradient(145deg, #4d72ff, #2b59ff); box-shadow: 0 6px 18px -6px rgba(43, 89, 255, 0.8); }
.landing .v16-brand .bmc-hero .bmc-lockup .x { color: #8a8c93; font-size: 16px; }
.landing .v16-brand .bmc-hero .bmc-lockup .bmc-brand { font-size: 26px; font-weight: 800; letter-spacing: 0; color: #ffffff; }
.landing .v16-brand .bmc-hero .bmc-lockup .bmc-brand i { font-style: normal; font-weight: 300; color: #8a8c93; margin: 0 8px; }
.landing .v16-brand .bmc-hero .bmc-hero-eyebrow { margin-top: clamp(44px, 6vw, 80px); font-family: 'Geist Mono', ui-monospace, monospace; font-size: clamp(13px, 1.2vw, 16px);
  font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: #7c98ff; }
.landing .v16-brand .bmc-hero h1 { margin: 22px auto 0; color: #ffffff; line-height: 1; letter-spacing: -0.035em !important; }
.landing .v16-brand .bmc-hero h1 > span { display: block; }
.landing .v16-brand .bmc-hero .lt { font-weight: 300; }
.landing .v16-brand .bmc-hero .it { font-weight: 300; font-style: italic; }
.landing .v16-brand .bmc-hero .bmc-h1-a { font-size: clamp(32px, 4.2vw, 56px); font-weight: 700; }
.landing .v16-brand .bmc-hero .bmc-h1-b { margin: 8px 0 6px; font-size: clamp(38px, 5.6vw, 80px); font-weight: 700; line-height: 1; letter-spacing: -0.045em;
  color: #5b7cff; text-shadow: 0 0 40px rgba(43, 89, 255, 0.45); }
.landing .v16-brand .bmc-hero .bmc-h1-c { font-size: clamp(26px, 3.6vw, 48px); font-weight: 700; letter-spacing: -0.03em; }
.landing .v16-brand .bmc-hero .bmc-lede { margin: 28px auto 0; max-width: 820px; font-size: clamp(17px, 1.7vw, 21px); line-height: 1.5; color: #b4b4bc; }
.landing .v16-brand .bmc-hero .bmc-hero-stats { margin: 48px auto 0; display: flex; justify-content: center; flex-wrap: wrap; gap: 14px; }
.landing .v16-brand .bmc-hero .bmc-hero-stat { min-width: 220px; padding: 22px 28px; border-radius: 16px; text-align: center; background: #111114; border: 1px solid rgba(255, 255, 255, 0.08); }
.landing .v16-brand .bmc-hero .bmc-hero-stat:first-child { border-color: rgba(43, 89, 255, 0.55); box-shadow: 0 0 30px -12px rgba(43, 89, 255, 0.6); }
.landing .v16-brand .bmc-hero .bmc-hero-stat .v { font-family: 'Geist Mono', ui-monospace, monospace; font-size: clamp(30px, 3vw, 40px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.1; color: #ffffff; }
.landing .v16-brand .bmc-hero .bmc-hero-stat:first-child .v { color: #7c98ff; }
.landing .v16-brand .bmc-hero .bmc-hero-stat:last-child .v { color: #2ec27e; }
.landing .v16-brand .bmc-hero .bmc-hero-stat .l { margin-top: 10px; font-size: 16px; line-height: 1.45; color: #b4b4bc; }
.landing .v16-brand .bmc-hero .bmc-goal { color: #ffd43b; font-weight: 500; }
@media (max-width: 640px) {
  .bmc-lockup { gap: 10px; }
  .bmc-lockup-e, .bmc-lockup .bmc-brand { font-size: 19px; }
  .bmc-lockup-e i { width: 34px; height: 34px; }
  .bmc-hero-stat { min-width: 0; width: 100%; }
}

/* About */
.bmc-about { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(28px, 4vw, 56px); align-items: start; }
.bmc-about p { margin: 20px 0 0; font-size: 17px; line-height: 1.7; color: var(--ink-3); }
.bmc-about p b { color: var(--ink); }
.bmc-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.bmc-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.bmc-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

/* Timeline */
.bmc-timeline { margin-top: 16px; padding: 28px; }
.bmc-tl { position: relative; display: grid; grid-template-columns: repeat(6, 1fr); margin-top: 26px; }
.bmc-tl::before { content: ''; position: absolute; left: 8%; right: 8%; top: 31px; height: 2px; background: linear-gradient(90deg, var(--bmc-blue) 82%, #2C2E36 82%); }
.bmc-tl-i { position: relative; text-align: center; }
.bmc-tl-y { font-family: var(--f-mono); font-size: 13px; font-weight: 600; color: #fff; }
.bmc-tl-dot { width: 14px; height: 14px; margin: 10px auto 12px; border-radius: 50%; background: var(--bmc-blue); position: relative; z-index: 1; }
.bmc-tl-i.now .bmc-tl-y { color: var(--bmc-yellow); }
.bmc-tl-i.now .bmc-tl-dot { background: var(--bmc-yellow); width: 18px; height: 18px; margin-top: 8px; box-shadow: 0 0 16px rgba(246,197,43,.7); }
.bmc-tl-l { font-family: var(--f-mono); font-size: 12px; line-height: 1.4; color: #9097A8; padding: 0 4px; }
.bmc-tl-i.now .bmc-tl-l { color: #fff; font-weight: 600; }
.bmc-history { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 2fr); gap: 18px; margin-top: 40px; }
.bmc-hist-visual { border-radius: 18px; border: 1px solid #E9B92A; box-shadow: 0 0 34px -10px rgba(246,197,43,.55);
  background: radial-gradient(circle at 30% 20%, #2A2D38 0%, #111216 70%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; min-height: 260px; }
.bmc-hist-visual .big { font-family: var(--f-display); font-weight: 800; font-size: clamp(54px, 6vw, 84px); line-height: .95; color: #fff; letter-spacing: -0.04em; }
.bmc-hist-visual .big span { color: var(--bmc-yellow); }
.bmc .bmc-chip { display: inline-flex; align-items: center; gap: 8px; margin-top: 18px; align-self: flex-start; padding: 6px 12px; border-radius: 8px; background: #000;
  font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: #fff; }
.bmc-chip::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--bmc-yellow); }

/* Challenge */
.bmc-challenge { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 16px; margin-top: 44px; }
.bmc-ring-card { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
  border-color: color-mix(in oklab, var(--bmc-red) 60%, transparent) !important; box-shadow: 0 0 44px -14px rgba(240,83,63,.65); }
.bmc-ring { position: relative; width: 220px; height: 220px; margin: 20px 0; }
.bmc-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.bmc-ring-c { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.bmc-ring-c b { font-family: var(--f-display); font-size: 62px; font-weight: 700; color: #fff; line-height: 1; }
.bmc-ring-c span { margin-top: 6px; font-family: var(--f-mono); font-size: 13px; letter-spacing: .1em; color: #A9AFBF; }
.bmc-load { margin-top: 18px; display: grid; gap: 12px; }
.bmc-load-row { display: grid; grid-template-columns: 110px 1fr 52px; align-items: center; gap: 14px; font-size: 15px; color: var(--ink); }
.bmc-bar { height: 12px; border-radius: 99px; background: #EEF0F5; overflow: hidden; }
.bmc-bar i { display: block; height: 100%; border-radius: 99px; background: var(--ink); }
.bmc-load-row:first-child .bmc-bar i { background: var(--bmc-blue); }
.bmc-load-row b { font-family: var(--f-mono); font-weight: 600; }
.bmc-right-stack { display: grid; gap: 16px; grid-template-rows: auto 1fr; }

/* Rule */
.bmc-rule { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 60px); align-items: center; }
.bmc-quote { margin: 26px 0 8px; font-size: clamp(20px, 2.2vw, 25px); line-height: 1.45; color: var(--ink); }
.bmc-quote-by { font-family: var(--f-mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
.bmc-mini { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bmc-mini .bmc-card { padding: 16px 18px; font-size: 15.5px; line-height: 1.45; color: var(--ink); }
.bmc-mini .bmc-k { margin-bottom: 6px; }
.bmc-mini .red .bmc-k { color: #C0362A; } .bmc-mini .blue .bmc-k { color: var(--bmc-blue); }
.bmc-privacy { margin-top: 16px; font-size: 14.5px; line-height: 1.6; color: var(--ink-3); }
.bmc-phone { justify-self: center; width: min(100%, 360px); border-radius: 36px; padding: 14px; background: #111216; box-shadow: 0 30px 60px -30px rgba(20,30,80,.55); }
.bmc-phone-in { border-radius: 26px; background: #EFE9E1; overflow: hidden; }
.bmc-phone-top { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: #075E54; color: #fff; }
.bmc-phone-top .av { width: 34px; height: 34px; border-radius: 50%; background: #25D366; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; }
.bmc-phone-top .nm { font-size: 14.5px; font-weight: 600; }
.bmc-phone-top .st { font-size: 11.5px; opacity: .8; }
.bmc .bmc-toggle { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; }
.bmc-toggle i { width: 30px; height: 17px; border-radius: 99px; background: #25D366; position: relative; border: 1px solid rgba(255,255,255,.5); }
.bmc-toggle i::after { content: ''; position: absolute; right: 2px; top: 2px; width: 11px; height: 11px; border-radius: 50%; background: #fff; }
.bmc-msgs { padding: 16px 14px 20px; display: grid; gap: 10px; }
.bmc-msg { max-width: 82%; padding: 9px 12px; border-radius: 12px; font-size: 13.5px; line-height: 1.45; color: #111; box-shadow: 0 1px 1px rgba(0,0,0,.08); }
.bmc-msg.in { background: #fff; border-top-left-radius: 4px; }
.bmc-msg.out { justify-self: end; background: #D9FDD3; border-top-right-radius: 4px; }
.bmc-msg small { display: block; margin-top: 4px; font-size: 10.5px; color: #667; text-align: right; }
.bmc-msg .ai { display: inline-block; margin-bottom: 4px; font-size: 10px; font-weight: 700; letter-spacing: .06em; color: #075E54; text-transform: uppercase; }

/* Parts */
.bmc-parts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 44px; }
.bmc-part { display: flex; flex-direction: column; min-height: 380px; }
.bmc-part-top { display: flex; justify-content: space-between; align-items: center; }
.bmc .bmc-part-num { font-family: var(--f-mono); font-size: 15px; font-weight: 600; color: var(--ink-3); }
.bmc .bmc-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 7px; font-family: var(--f-mono); font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #fff; }
.bmc-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.bmc-badge.live { background: var(--bmc-green); } .bmc-badge.offered { background: #5A5E6B; } .bmc-badge.pilot { background: #B08A00; }
.bmc-part.dark .bmc-badge.pilot { background: var(--bmc-blue); }
.bmc-part h3 { margin: 22px 0 12px; font-size: 21px; font-weight: 700; line-height: 1.25; color: var(--ink); }
.bmc-part.dark h3 { color: #fff; }
.bmc-part p { margin: 0; font-size: 15px; line-height: 1.65; color: var(--ink-3); }
.bmc-part.dark p { color: #A9AFBF; }
.bmc-part-foot { margin-top: auto; padding-top: 22px; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
.bmc-part.green .bmc-part-foot, .bmc-part.green .bmc-part-num { color: var(--bmc-green); }
.bmc-part.yellow .bmc-part-foot, .bmc-part.yellow .bmc-part-num { color: #A97F00; }
.bmc-part.dark .bmc-part-foot, .bmc-part.dark .bmc-part-num { color: #8EA4FF; }

/* Agent */
.bmc-agent { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 18px; margin-top: 44px; }
.bmc-flow { display: flex; align-items: center; gap: 10px; margin-top: 14px; }
.bmc-flow span { padding: 8px 12px; border-radius: 8px; background: #22232A; font-family: var(--f-mono); font-size: 13px; color: #fff; white-space: nowrap; }
.bmc-flow span.on { background: var(--bmc-blue); }
.bmc-flow i { flex: 1; height: 2px; background: linear-gradient(90deg, transparent, #4E6BFF, transparent); position: relative; }
.bmc-flow i::after { content: ''; position: absolute; left: 30%; top: -3px; width: 40%; height: 8px; border-radius: 99px; background: #5A78FF; box-shadow: 0 0 14px #5A78FF; }
.bmc-agent-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }
.bmc-agent-stats .bmc-card:nth-child(1) { border-color: #3B5BFF; }
.bmc-agent-stats .bmc-card:nth-child(2) { border-color: #2FBF77; }
.bmc-agent-chat { border-radius: 18px; border: 1px solid #3B5BFF; box-shadow: 0 0 40px -12px rgba(59,91,255,.6); background: #0F1015; padding: 26px; display: flex; flex-direction: column; justify-content: center; }
.bmc-agent-chat .bmc-msgs { padding: 0; }
.bmc-agent-chat .bmc-msg.in { background: #1E2029; color: #E8EAF2; }
.bmc-agent-chat .bmc-msg.out { background: #1B5E3B; color: #EFFFF4; }
.bmc-agent-chat .bmc-msg small { color: #9FB3A8; }
.bmc-agent-chat .bmc-msg .ai { color: #7FE3AC; }
.bmc .bmc-replied { justify-self: end; display: inline-flex; gap: 6px; align-items: center; padding: 4px 10px; border-radius: 99px; background: rgba(61,214,140,.14); color: #3DD68C; font-family: var(--f-mono); font-size: 11.5px; }

/* CRM */
.bmc-crm { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 44px; }
.bmc-crm-vis { border-radius: 14px; min-height: 230px; padding: 22px; background: linear-gradient(135deg, #F3F5FA, #E8ECF6); display: flex; align-items: center; justify-content: center; gap: 16px; }
.bmc-check { width: 210px; padding: 18px; border-radius: 14px; background: rgba(255,255,255,.85); border: 1px solid #fff; box-shadow: 0 14px 30px -18px rgba(20,30,80,.35); }
.bmc-check b { display: block; margin-bottom: 12px; font-size: 16px; color: var(--ink); }
.bmc-check div { display: flex; align-items: center; gap: 10px; margin-top: 9px; font-size: 14.5px; color: var(--ink-2); }
.bmc-check div::before { content: '✓'; width: 20px; height: 20px; border-radius: 50%; background: #22B45A; color: #fff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
.bmc-crm-rec { width: 250px; padding: 16px; border-radius: 14px; background: #fff; border: 1px solid var(--line); box-shadow: 0 14px 30px -18px rgba(20,30,80,.35); font-size: 13px; color: var(--ink-2); }
.bmc-crm-rec .hd { display: flex; align-items: center; gap: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
.bmc-crm-rec .hd i { width: 30px; height: 30px; border-radius: 50%; background: #FF7A59; display: inline-block; }
.bmc-crm-rec .hd b { font-size: 14px; color: var(--ink); }
.bmc-crm-rec .row { display: flex; gap: 8px; align-items: flex-start; margin-top: 10px; }
.bmc-crm-rec .row::before { content: ''; flex-shrink: 0; margin-top: 4px; width: 9px; height: 9px; border-radius: 50%; background: #25D366; }
.bmc .bmc-crm-sync { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; padding: 4px 10px; border-radius: 99px; background: #E6F5EC; color: #1E9E62; font-size: 12px; font-weight: 600; }
.bmc-crm-foot { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; margin-top: 18px; }
.bmc-crm-foot h3 { margin: 0; font-size: 18px; font-weight: 700; color: var(--ink); }
.bmc-crm-foot p { margin: 4px 0 0; font-size: 14.5px; color: var(--ink-3); }
.bmc-crm-foot .m { font-family: var(--f-mono); font-size: 26px; font-weight: 600; color: var(--bmc-blue); white-space: nowrap; }
.bmc-crm .bmc-card:nth-child(2) .m { color: var(--bmc-green); }

/* SLA */
.bmc-sla { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, .75fr); gap: 16px; margin-top: 44px; }
.bmc-sla-vis { border-radius: 16px; min-height: 250px; padding: 24px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #F3F5FA, #E6EAF4); }
.bmc-alert { padding: 16px 18px; border-radius: 14px; background: rgba(255,255,255,.9); border: 1px solid #fff; box-shadow: 0 14px 30px -18px rgba(20,30,80,.35); }
.bmc-alert .t { display: flex; align-items: center; gap: 8px; font-size: 14.5px; color: var(--ink); }
.bmc-alert .b { display: inline-block; margin-top: 10px; padding: 6px 14px; border-radius: 8px; background: #22B45A; color: #fff; font-size: 13px; font-weight: 600; }
.bmc-replybars { width: 100%; max-width: 280px; padding: 18px; border-radius: 14px; background: rgba(255,255,255,.9); box-shadow: 0 14px 30px -18px rgba(20,30,80,.35); }
.bmc-replybars b { display: block; margin-bottom: 10px; font-size: 15px; color: var(--ink); }
.bmc-replybars i { display: block; height: 12px; border-radius: 4px; margin-top: 8px; }
.bmc-sla-cap { margin-top: 14px; font-size: 15px; line-height: 1.55; color: var(--ink-3); }
.bmc-sla-cap b { color: var(--ink); }
.bmc-sla-stats { display: grid; gap: 16px; }

/* Handover */
.bmc-hand { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 60px); align-items: center; }
.bmc-hand-vis { border-radius: 18px; min-height: 300px; background: linear-gradient(135deg, #EEF2FB, #E1E7F5); display: flex; align-items: center; justify-content: center; box-shadow: 0 30px 60px -36px rgba(20,30,80,.5); }
.bmc-hand-card { width: 240px; padding: 22px; border-radius: 18px; text-align: center; background: rgba(255,255,255,.88); border: 1px solid #fff; box-shadow: 0 16px 34px -18px rgba(20,30,80,.4); }
.bmc-hand-icons { display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 22px; }
.bmc-hand-icons span { width: 46px; height: 46px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: #EEF0F6; }
.bmc-hand-icons span.p { background: #DDF1E4; }
.bmc-hand-card p { margin: 12px 0; font-size: 15px; color: var(--ink); }
.bmc-hand-card b { display: block; padding: 9px; border-radius: 10px; background: #22B45A; color: #fff; font-size: 14px; }
.bmc-steps { list-style: none; padding: 0; margin: 28px 0 0; display: grid; gap: 12px; }
.bmc-steps li { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-radius: 14px; background: #fff; border: 1px solid var(--line); font-size: 16.5px; color: var(--ink); }
.bmc-steps li span { font-family: var(--f-mono); font-weight: 600; color: var(--bmc-blue); }

/* Before / after */
.bmc-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 44px; }
.bmc-ba .bmc-card { padding: clamp(24px, 3vw, 36px); }
.bmc-ttfr { display: grid; gap: 22px; margin-top: 24px; }
.bmc-ttfr-row { display: grid; grid-template-columns: 120px 1fr 80px; gap: 14px; align-items: center; font-size: 16px; color: #D6D9E3; }
.bmc-ttfr-row .bmc-bar { background: #24262E; }
.bmc-ttfr-row .v { font-family: var(--f-mono); font-size: 15px; font-weight: 600; }
.bmc-ttfr-row.bad i { background: var(--bmc-red); } .bmc-ttfr-row.bad .v { color: #FF7563; }
.bmc-ttfr-row.goal i { background: var(--bmc-blue); } .bmc-ttfr-row.goal .v { color: #8EA4FF; }
.bmc-ttfr-row.good i { background: #3DD68C; min-width: 8px; } .bmc-ttfr-row.good .v { color: #3DD68C; }
.bmc-ba-note { margin-top: 22px; font-size: 14px; line-height: 1.55; color: #A9AFBF; }
.bmc-ba-table { width: 100%; border-collapse: collapse; }
.bmc-ba-table th { padding: 0 0 12px; text-align: left; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #9097A8; }
.bmc-ba-table td { padding: 15px 0; border-top: 1px solid #2A2C34; font-size: 15.5px; color: #F2F4FA; }
.bmc-ba-table td.b { color: #FF7563; } .bmc-ba-table td.a { color: #3DD68C; }
.bmc-ba-table tr:last-child td.b { color: #F2F4FA; }

/* Results */
.bmc-results-hero { position: relative; border-radius: 24px; overflow: hidden; padding: clamp(40px, 6vw, 70px) 24px clamp(90px, 10vw, 120px); text-align: center;
  background: radial-gradient(ellipse 60% 70% at 50% 30%, #DFF7E6 0%, rgba(223,247,230,0) 70%), linear-gradient(180deg, #F1F6FF, #EAF0FA); }
.bmc-results-big { display: inline-flex; align-items: center; gap: 18px; padding: 18px 34px; border-radius: 22px; background: rgba(255,255,255,.7); border: 1px solid #fff; box-shadow: 0 20px 40px -24px rgba(20,30,80,.35); }
.bmc-results-big b { font-family: var(--f-display); font-size: clamp(64px, 9vw, 110px); font-weight: 800; line-height: 1; color: #16A34A; letter-spacing: -0.04em; }
.bmc-results-big span { font-size: clamp(20px, 2.4vw, 28px); font-weight: 700; color: #102030; text-align: left; }
.bmc-results-h { margin: 22px auto 0; max-width: 720px; font-family: var(--f-display); font-size: clamp(22px, 2.6vw, 30px); line-height: 1.3; color: var(--ink); }
.bmc-results-stats { position: relative; margin: -64px 18px 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.bmc-results-stats .bmc-card { box-shadow: 0 18px 40px -26px rgba(20,30,80,.4); }
.bmc-results-note { margin-top: 18px; font-family: var(--f-mono); font-size: 12px; color: var(--ink-3); }

/* Why + CTA */
.bmc-why { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 48px); align-items: center; }
.bmc-why-p { margin: 6px 0 22px; font-size: 14.5px; color: #A9AFBF; }
.bmc-why .bmc-grid-2 .bmc-card:nth-child(1) { border-color: #3B5BFF; box-shadow: 0 0 26px -10px rgba(59,91,255,.6); }
.bmc-why .bmc-grid-2 .bmc-card:nth-child(3) { border-color: #E9B92A; box-shadow: 0 0 26px -10px rgba(246,197,43,.6); }
.bmc-why .bmc-grid-2 .bmc-card:nth-child(4) { border-color: #2FBF77; box-shadow: 0 0 26px -10px rgba(47,191,119,.6); }
.bmc-why .bmc-grid-2 .bmc-card:nth-child(3) .bmc-v { color: var(--bmc-yellow); }
.bmc-why .bmc-grid-2 .bmc-card:nth-child(4) .bmc-v { color: #3DD68C; font-size: clamp(26px, 3vw, 36px); }
.bmc-why .bmc-v { color: #fff; }
.bmc-next { margin-top: 22px; }
.bmc-next p { margin: 8px 0 0; font-size: 16px; color: #D6D9E3; }
.bmc-cta-card { padding: clamp(26px, 3.4vw, 40px); border-radius: 22px; background: #fff; color: var(--ink); }
.bmc-cta-logo { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 700; color: var(--ink); }
.bmc-cta-logo i { width: 34px; height: 34px; border-radius: 9px; background: var(--bmc-blue); display: inline-block; }
.landing .bmc-cta-card h2 { margin: 20px 0 12px; font-family: var(--f-display); font-weight: 700; font-size: clamp(24px, 2.6vw, 32px); line-height: 1.2; letter-spacing: -0.02em; color: var(--ink); max-width: none; }
.bmc-cta-card p { margin: 0; font-size: 15.5px; line-height: 1.6; color: var(--ink-3); }
.bmc-cta-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.bmc-cta-foot { margin-top: 16px; font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-3); }
.landing .bmc-back { display: inline-block; margin-top: 18px; font-size: 14px; font-weight: 600; color: var(--bmc-blue); }

@media (max-width: 1024px) {
  .bmc-parts, .bmc-results-stats, .bmc-grid-4 { grid-template-columns: 1fr 1fr; }
  .bmc-sla { grid-template-columns: 1fr 1fr; }
  .bmc-sla-stats { grid-column: 1 / -1; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .bmc-about, .bmc-history, .bmc-challenge, .bmc-rule, .bmc-agent, .bmc-crm, .bmc-hand, .bmc-ba, .bmc-why { grid-template-columns: 1fr; }
  .bmc-grid-3 { grid-template-columns: 1fr; }
  .bmc-tl { grid-template-columns: repeat(3, 1fr); row-gap: 22px; }
  .bmc-tl::before { display: none; }
  .bmc-results-stats { margin: 20px 0 0; }
  .bmc-results-hero { padding-bottom: 40px; }
}
@media (max-width: 560px) {
  .bmc-parts, .bmc-results-stats, .bmc-grid-2, .bmc-grid-4, .bmc-sla, .bmc-sla-stats, .bmc-mini, .bmc-agent-stats { grid-template-columns: 1fr; }
  .bmc-hero-stat { min-width: 0; width: 100%; }
  .bmc-ttfr-row { grid-template-columns: 90px 1fr 64px; font-size: 14px; }
  .bmc-crm-vis { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
}
`

export default async function BmcHyundaiCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getBmcContent(locale)

  const prefix = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const hubUrl = `${SITE_URL}${prefix}/case-studies`
  const pageUrl = `${SITE_URL}${prefix}${SLUG}`
  const headline = bmcHeadline(t)
  const pricingHref = `${prefix}/pricing`
  const demoHref = 'https://eazybe.info/demono'

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
    headline,
    description: t.meta.description,
    url: pageUrl,
    publisher: { '@type': 'Organization', name: 'Eazybe', url: SITE_URL },
    about: { '@type': 'Organization', name: 'BMC Hyundai', url: 'https://bmchyundai.com.br' },
  }


  const aboutTones = ['blue', 'dark glow', 'dark', 'yellow', 'green', '']
  const aboutValueTones = ['blue', '', 'yellow', '', 'green', '']
  const partTones = ['green', '', 'yellow', 'dark glow']

  // Ring: ~20 min shown as ~85% of the circle, matching the deck.
  const R = 92
  const C = 2 * Math.PI * R

  return (
    <div className="bmc">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* 1. Hero — matches the deck cover (slide 01). */}
      <section className="bmc-hero">
        <div className="container">
          <div className="bmc-lockup" aria-label="Eazybe and BMC Hyundai">
            {/* Official Eazybe logo (white, for dark backgrounds) — same file as the nav. */}
            <img className="bmc-lockup-logo" src="/logo-small.png" alt="Eazybe" width={274} height={64} fetchPriority="high" />
            <span className="x" aria-hidden="true">×</span>
            <span className="bmc-brand">BMC<i aria-hidden="true">|</i>HYUNDAI</span>
          </div>
          <div className="bmc-hero-eyebrow">{t.hero.eyebrow}</div>
          <h1>
            <span className="bmc-h1-a">{t.hero.h1Pre && <><span className="lt">{t.hero.h1Pre}</span>{' '}</>}{t.hero.h1Company}</span>
            <span className="bmc-h1-b">{t.hero.h1Highlight}</span>
            <span className="bmc-h1-c"><span className="it">{t.hero.h1Italic}</span>{' '}{t.hero.h1With && <><span className="lt">{t.hero.h1With}</span>{' '}</>}{t.hero.h1Bold}</span>
          </h1>
          <p className="bmc-lede">{t.hero.subtitle}</p>
          <div className="bmc-hero-stats">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="bmc-hero-stat">
                <div className="v">{s.value}</div>
                <div className="l">
                  {s.label}
                  {s.goal && <> · <span className="bmc-goal">{s.goal}</span></>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. About the customer */}
      <section className="bmc-sec alt">
        <div className="container">
          <div className="bmc-about">
            <div>
              <div className="bmc-tag">{t.about.tag}</div>
              <h2 className="bmc-h2">
                {t.about.h2Lead} <span className="bmc-hl">{t.about.h2Highlight}</span>
              </h2>
              <p>{t.about.bodyPre} <b>{t.about.bodyBold}</b> {t.about.bodyPost}</p>
              <div className="bmc-src">{t.about.source}</div>
            </div>
            <div className="bmc-grid-2">
              {t.about.facts.map((f, i) => (
                <div key={f.label} className={`bmc-card ${aboutTones[i]}`}>
                  <div className="bmc-k">{f.label}</div>
                  <div className={`bmc-v ${aboutValueTones[i]}`}>{f.value}</div>
                  <div className="bmc-n">{f.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. History */}
      <section className="bmc-sec dark">
        <div className="container">
          <div className="bmc-center">
            <div className="bmc-tag">{t.history.tag}</div>
            <h2 className="bmc-h2">{t.history.h2Lead} <span className="bmc-hl">{t.history.h2Highlight}</span></h2>
          </div>
          <div className="bmc-history">
            <div className="bmc-hist-visual">
              <div className="big">2003<br /><span>→</span> 2026</div>
              <span className="bmc-chip">{t.history.chip}</span>
            </div>
            <div>
              <div className="bmc-grid-3">
                {t.history.stats.map((s, i) => (
                  <div key={s.label} className={`bmc-card${i === 2 ? ' glow-y' : ''}`}>
                    <div className="bmc-k">{s.label}</div>
                    <div className={`bmc-v${i === 2 ? ' yellow' : ''}`} style={{ fontSize: 'clamp(30px, 3.4vw, 44px)' }}>{s.value}</div>
                    <div className="bmc-n">{s.note}</div>
                  </div>
                ))}
              </div>
              <div className="bmc-card bmc-timeline">
                <div className="bmc-k">{t.history.milestonesLabel}</div>
                <div className="bmc-tl">
                  {t.history.milestones.map((m, i) => (
                    <div key={m.year} className={`bmc-tl-i${i === t.history.milestones.length - 1 ? ' now' : ''}`}>
                      <div className="bmc-tl-y">{m.year}</div>
                      <div className="bmc-tl-dot" />
                      <div className="bmc-tl-l">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bmc-src">{t.history.source}</div>
        </div>
      </section>

      {/* 4. Challenge */}
      <section className="bmc-sec">
        <div className="container">
          <div className="bmc-center">
            <div className="bmc-tag red">{t.challenge.tag}</div>
            <h2 className="bmc-h2">{t.challenge.h2Lead} <span className="bmc-hl red">{t.challenge.h2Highlight}</span></h2>
          </div>
          <div className="bmc-challenge">
            <div className="bmc-card dark bmc-ring-card">
              <div className="bmc-k">{t.challenge.replyTime.label}</div>
              <div className="bmc-ring">
                <svg viewBox="0 0 220 220" aria-hidden="true">
                  <circle cx="110" cy="110" r={R} fill="none" stroke="#26272E" strokeWidth="18" />
                  <circle cx="110" cy="110" r={R} fill="none" stroke="#F0533F" strokeWidth="18" strokeLinecap="round"
                    strokeDasharray={`${C * 0.86} ${C}`} />
                </svg>
                <div className="bmc-ring-c"><b>{t.challenge.replyTime.value}</b><span>{t.challenge.minutes.toUpperCase()}</span></div>
              </div>
              <div className="bmc-n">{t.challenge.replyTime.note}</div>
            </div>
            <div className="bmc-right-stack">
              <div className="bmc-grid-2">
                <div className="bmc-card red">
                  <div className="bmc-k">{t.challenge.questions.label}</div>
                  <div className="bmc-v red">{t.challenge.questions.value}</div>
                  <div className="bmc-n">{t.challenge.questions.note}</div>
                </div>
                <div className="bmc-card yellow">
                  <div className="bmc-k">{t.challenge.industry.label}</div>
                  <div className="bmc-v">{t.challenge.industry.value}</div>
                  <div className="bmc-n">{t.challenge.industry.note}</div>
                </div>
              </div>
              <div className="bmc-card">
                <div className="bmc-k">{t.challenge.loadTitle}</div>
                <div className="bmc-load">
                  {t.challenge.load.map((l) => (
                    <div key={l.label} className="bmc-load-row">
                      <span>{l.label}</span>
                      <span className="bmc-bar"><i style={{ width: `${l.pct}%` }} /></span>
                      <b>{l.value}</b>
                    </div>
                  ))}
                </div>
                <div className="bmc-n">{t.challenge.loadNote}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The one rule */}
      <section className="bmc-sec alt">
        <div className="container">
          <div className="bmc-rule">
            <div>
              <div className="bmc-tag">{t.rule.tag}</div>
              <h2 className="bmc-h2">{t.rule.h2Lead} <span className="bmc-hl">{t.rule.h2Highlight}</span></h2>
              <blockquote className="bmc-quote">“{t.rule.quote}”</blockquote>
              <div className="bmc-quote-by">{t.rule.quoteBy}</div>
              <div className="bmc-mini">
                <div className="bmc-card red">
                  <div className="bmc-k">{t.rule.notOption.label}</div>
                  {t.rule.notOption.body}
                </div>
                <div className="bmc-card blue">
                  <div className="bmc-k">{t.rule.built.label}</div>
                  {t.rule.built.body}
                </div>
              </div>
              <p className="bmc-privacy">{t.rule.privacy}</p>
            </div>
            <div className="bmc-phone" aria-hidden="true">
              <div className="bmc-phone-in">
                <div className="bmc-phone-top">
                  <span className="av">BH</span>
                  <span>
                    <div className="nm">{t.rule.phone.seller}</div>
                    <div className="st">{t.rule.phone.sameNumber}</div>
                  </span>
                  <span className="bmc-toggle">{t.rule.phone.aiOn} <i /></span>
                </div>
                <div className="bmc-msgs">
                  <div className="bmc-msg in">Olá! Preciso de um filtro para minha escavadeira HX220.<small>09:41</small></div>
                  <div className="bmc-msg out"><span className="ai">{t.rule.phone.aiAgent}</span><br />Claro! Pode me passar o CNPJ e o número de série da máquina?<small>09:41 ✓✓</small></div>
                  <div className="bmc-msg in">CNPJ 12.345.678/0001-90, série HX220-0458.<small>09:42</small></div>
                  <div className="bmc-msg out"><span className="ai">{t.rule.phone.aiAgent}</span><br />Perfeito. Já passei para o seu vendedor com todos os detalhes.<small>09:42 ✓✓</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Four parts */}
      <section className="bmc-sec">
        <div className="container">
          <div className="bmc-center">
            <div className="bmc-tag">{t.parts.tag}</div>
            <h2 className="bmc-h2">{t.parts.h2Lead} <span className="bmc-hl">{t.parts.h2Highlight}</span></h2>
            <p className="bmc-sub">{t.parts.subtitle}</p>
          </div>
          <div className="bmc-parts">
            {t.parts.items.map((p, i) => (
              <div key={p.num} className={`bmc-card bmc-part ${partTones[i]}`}>
                <div className="bmc-part-top">
                  <span className="bmc-part-num">{p.num}</span>
                  <span className={`bmc-badge ${p.status}`}>{p.statusLabel}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="bmc-part-foot">{p.foot}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI agent */}
      <section className="bmc-sec dark">
        <div className="container">
          <div className="bmc-center">
            <div className="bmc-tag">{t.agent.tag}</div>
            <h2 className="bmc-h2">{t.agent.h2Lead} <span className="bmc-hl">{t.agent.h2Highlight}</span></h2>
          </div>
          <div className="bmc-agent">
            <div className="bmc-agent-chat" aria-hidden="true">
              <div className="bmc-msgs">
                <div className="bmc-msg in">Bom dia, vocês têm a carregadeira HL960 para pronta entrega?<small>12:03</small></div>
                <div className="bmc-msg out"><span className="ai">{t.rule.phone.aiAgent}</span><br />Bom dia! Sim, temos. Para qual cidade seria a entrega, e qual o CNPJ da empresa?<small>12:03 ✓✓</small></div>
                <span className="bmc-replied">⚡ {t.agent.replied}</span>
              </div>
            </div>
            <div>
              <div className="bmc-card">
                <div className="bmc-k">{t.agent.flowLabel}</div>
                <div className="bmc-flow">
                  {t.agent.flow.map((f, i) => (
                    <span key={f} style={{ display: 'contents' }}>
                      {i > 0 && <i />}
                      <span className={i === 1 ? 'on' : ''}>{f}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="bmc-agent-stats">
                {t.agent.stats.map((s, i) => (
                  <div key={s.label} className="bmc-card">
                    <div className="bmc-k">{s.label}</div>
                    <div className={`bmc-v${i === 0 ? ' blue' : i === 1 ? ' green' : ''}`} style={{ fontSize: 'clamp(30px, 3.4vw, 44px)' }}>{s.value}</div>
                    <div className="bmc-n">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Chat to CRM */}
      <section className="bmc-sec">
        <div className="container">
          <div className="bmc-center">
            <div className="bmc-tag">{t.crm.tag}</div>
            <h2 className="bmc-h2">{t.crm.h2Lead} <span className="bmc-hl">{t.crm.h2Highlight}</span></h2>
          </div>
          <div className="bmc-crm">
            {t.crm.cards.map((c, i) => (
              <div key={c.title} className="bmc-card">
                <div className="bmc-crm-vis" aria-hidden="true">
                  {i === 0 ? (
                    <div className="bmc-check">
                      <b>{t.crm.leadDetails}</b>
                      {c.checklist?.map((x) => <div key={x}>{x}</div>)}
                    </div>
                  ) : (
                    <div className="bmc-crm-rec">
                      <div className="hd"><i /><b>{t.crm.contact}</b></div>
                      {t.crm.rows.map((r) => <div key={r} className="row">{r}</div>)}
                      <span className="bmc-crm-sync">⟳ {t.crm.saved}</span>
                    </div>
                  )}
                </div>
                <div className="bmc-crm-foot">
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                  <span className="m">{c.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SLA */}
      <section className="bmc-sec alt">
        <div className="container">
          <div className="bmc-center">
            <div className="bmc-tag">{t.sla.tag}</div>
            <h2 className="bmc-h2">{t.sla.h2Lead} <span className="bmc-hl">{t.sla.h2Highlight}</span></h2>
          </div>
          <div className="bmc-sla">
            <div>
              <div className="bmc-sla-vis" aria-hidden="true">
                <div className="bmc-alert">
                  <div className="t">🔔 {t.sla.alertText}</div>
                  <span className="b">{t.sla.alertAction}</span>
                </div>
              </div>
              <p className="bmc-sla-cap"><b>{t.sla.cards[0].title}</b> {t.sla.cards[0].body}</p>
            </div>
            <div>
              <div className="bmc-sla-vis" aria-hidden="true">
                <div className="bmc-replybars">
                  <b>{t.sla.replyTime}</b>
                  <i style={{ width: '38%', background: '#22B45A' }} />
                  <i style={{ width: '46%', background: '#22B45A' }} />
                  <i style={{ width: '70%', background: '#F6C52B' }} />
                  <i style={{ width: '100%', background: '#EF4444' }} />
                </div>
              </div>
              <p className="bmc-sla-cap"><b>{t.sla.cards[1].title}</b> {t.sla.cards[1].body}</p>
            </div>
            <div className="bmc-sla-stats">
              {t.sla.stats.map((s, i) => (
                <div key={s.label} className={`bmc-card ${i === 0 ? 'yellow' : 'green'}`}>
                  <div className="bmc-k">{s.label}</div>
                  <div className={`bmc-v${i === 1 ? ' green' : ''}`}>{s.value}</div>
                  <div className="bmc-n">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Handover */}
      <section className="bmc-sec">
        <div className="container">
          <div className="bmc-hand">
            <div className="bmc-hand-vis" aria-hidden="true">
              <div className="bmc-hand-card">
                <div className="bmc-hand-icons"><span>🤖</span>→<span className="p">👤</span></div>
                <p>{t.handover.handed}</p>
                <b>{t.handover.join}</b>
              </div>
            </div>
            <div>
              <div className="bmc-tag">{t.handover.tag}</div>
              <h2 className="bmc-h2">{t.handover.h2Lead} <span className="bmc-hl">{t.handover.h2Highlight}</span></h2>
              <ol className="bmc-steps">
                {t.handover.steps.map((s, i) => (
                  <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Before vs after */}
      <section className="bmc-sec dark">
        <div className="container">
          <div className="bmc-center">
            <div className="bmc-tag">{t.beforeAfter.tag}</div>
            <h2 className="bmc-h2">{t.beforeAfter.h2Lead} <span className="bmc-hl">{t.beforeAfter.h2Highlight}</span></h2>
          </div>
          <div className="bmc-ba">
            <div className="bmc-card">
              <div className="bmc-k">{t.beforeAfter.barsTitle}</div>
              <div className="bmc-ttfr">
                {t.beforeAfter.bars.map((b) => (
                  <div key={b.label} className={`bmc-ttfr-row ${b.tone}`}>
                    <span>{b.label}</span>
                    <span className="bmc-bar"><i style={{ width: `${b.pct}%` }} /></span>
                    <span className="v">{b.value}</span>
                  </div>
                ))}
              </div>
              <p className="bmc-ba-note">{t.beforeAfter.barsNote}</p>
            </div>
            <div className="bmc-card">
              <table className="bmc-ba-table">
                <thead>
                  <tr>
                    <th scope="col"><span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{t.beforeAfter.aspectLabel}</span></th>
                    <th scope="col">{t.beforeAfter.beforeLabel}</th>
                    <th scope="col">{t.beforeAfter.afterLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.beforeAfter.rows.map((r) => (
                    <tr key={r.aspect}>
                      <td>{r.aspect}</td>
                      <td className="b">{r.before}</td>
                      <td className="a">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Results */}
      <section className="bmc-sec">
        <div className="container">
          <div className="bmc-results-hero">
            <div className="bmc-tag">{t.results.tag}</div>
            <div style={{ marginTop: 20 }}>
              <div className="bmc-results-big"><b>4x</b><span>{t.results.bigLine1}<br />{t.results.bigLine2}</span></div>
            </div>
            <p className="bmc-results-h">{t.results.h2}</p>
          </div>
          <div className="bmc-results-stats">
            {t.results.stats.map((s, i) => (
              <div key={s.label} className="bmc-card">
                <div className="bmc-k">{s.label}</div>
                <div className={`bmc-v${i === 0 ? ' blue' : i === 1 ? ' green' : ''}`}>{s.value}</div>
                <div className="bmc-n">
                  {s.note}{s.goal && <> · <span className="bmc-goal">{s.goal}</span></>}
                </div>
              </div>
            ))}
          </div>
          <div className="bmc-results-note bmc-center">{t.results.note}</div>
        </div>
      </section>

      {/* 13. Why Eazybe + CTA */}
      <section className="bmc-sec dark">
        <div className="container">
          <div className="bmc-why">
            <div>
              <div className="bmc-tag">{t.why.tag}</div>
              <p className="bmc-why-p">{t.why.partners}</p>
              <div className="bmc-grid-2">
                {t.why.stats.map((s) => (
                  <div key={s.label} className="bmc-card">
                    <div className="bmc-v" style={{ marginTop: 0 }}>{s.value}</div>
                    <div className="bmc-n">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bmc-next">
                <div className="bmc-k">{t.why.nextLabel}</div>
                <p>{t.why.next}</p>
              </div>
            </div>
            <div className="bmc-cta-card">
              <div className="bmc-cta-logo"><i aria-hidden="true" />Eazybe</div>
              <h2>{t.finalCta.h2}</h2>
              <p>{t.finalCta.body}</p>
              <div className="bmc-cta-btns">
                <a href={pricingHref} className="btn btn-primary btn-lg">{t.finalCta.primary}</a>
                <a href={demoHref} className="btn btn-lg">{t.finalCta.secondary}</a>
              </div>
              <div className="bmc-cta-foot">{t.finalCta.footnote}</div>
              <a className="bmc-back" href={`${prefix}/case-studies`}>← {t.finalCta.backToHub}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
