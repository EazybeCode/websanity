import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getAlternates } from '@/lib/seo-helpers'
import { getBlendusContent, blendusHeadline, BLENDUS_DAY_CHAT, BLENDUS_DAY_BLOCK } from '@/data/case-study-blendus'
import { pageDates, withPageDates, getSanityDocDates } from '@/lib/page-dates'
import { getCaseStudy } from '@/lib/sanity-queries'
import { VideoEmbedBlock } from '@/components/blog/VideoEmbedBlock'

// The page design and copy live in code (src/data/case-study-blendus.ts).
// A PUBLISHED caseStudy doc with this slug (Sanity "Case Studies") supplies the
// SEO fields and the /case-studies hub card; re-render at most once a minute
// so Studio publishes go live on their own. Same setup as ITECSUR / BMC Hyundai.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const SLUG = '/case-studies/blendus'
const SANITY_SLUG = 'blendus'
const SITE_URL = 'https://eazybe.com'
const IMG = '/case-studies/blendus'
const SHARE_IMG = `${SITE_URL}${IMG}/scene-manager.webp`
const HTML_LANG: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }
// Customer story video on the Eazybe YouTube channel (same video on all locales).
const VIDEO_ID = 'cvVuYxm74r8'
const VIDEO_TITLE = 'How a Brazilian Company Keeps Every WhatsApp Deal in HubSpot | BlendUs x Eazybe'
const VIDEO_THUMB = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`

async function baseMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getBlendusContent(locale)
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
      images: [{ url: SHARE_IMG, width: 1200, height: 675, alt: 'BlendUs × Eazybe: every WhatsApp deal saved in HubSpot' }],
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
.blu { --blu-blue: #2B59FF; --blu-blue-soft: #EAF0FF; --blu-red: #F0533F; --blu-red-soft: #FFE3DF;
  --blu-yellow: #F6C52B; --blu-yellow-soft: #FFF4D1; --blu-green: #1E9E62; --blu-green-soft: #E6F5EC;
  --blu-dark: #111216; --blu-dark-2: #17181D; --blu-dark-line: #26272E; }
.blu .blu-sec { padding: clamp(64px, 8vw, 104px) 0; background: #fff; }
.blu .blu-sec.alt { background: #F6F8FC; }
.blu .blu-sec.dark { background: radial-gradient(ellipse 70% 45% at 50% 0%, #1B2A78 0%, rgba(27,42,120,0) 70%), radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px) 0 0 / 22px 22px, #0B0C0F; color: #F2F4FA; }
.landing .v16-brand .blu-sec.dark ::selection { background: #2b59ff; color: #ffffff; }
.blu .blu-tag { font-family: var(--f-mono); font-size: 12.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--blu-blue); }
.blu .blu-sec.dark .blu-tag { color: #8EA4FF; }
.blu .blu-tag.red { color: var(--blu-red); }
.landing .blu h2.blu-h2 { font-family: var(--f-display); font-weight: 400; font-size: clamp(30px, 4vw, 50px); line-height: 1.1;
  letter-spacing: -0.025em; margin: 14px 0 0; color: var(--ink); max-width: none; }
.landing .blu-sec.dark h2.blu-h2 { color: #fff; }
.blu .blu-hl { color: var(--blu-blue); }
.blu .blu-sec.dark .blu-hl { color: #8EA4FF; }
.blu .blu-hl.red { color: var(--blu-red); text-shadow: 0 0 30px rgba(240,83,63,.35); }
.blu .blu-center { text-align: center; }
.blu .blu-sub { margin: 14px auto 0; max-width: 820px; font-size: 17px; line-height: 1.6; color: var(--ink-3); }
.blu .blu-sub b { color: var(--ink); }
.blu .blu-sec.dark .blu-sub { color: #A9AFBF; } .blu .blu-sec.dark .blu-sub b { color: #fff; }
.blu .blu-src { margin-top: 22px; font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-4, #9AA0AE); }
.blu .blu-sec.dark .blu-src { color: #6E7384; }
.blu .blu-body { margin: 18px 0 0; font-size: 17px; line-height: 1.7; color: var(--ink-3); }
.blu .blu-body b { color: var(--ink); }

/* Cards */
.blu .blu-card { border-radius: 18px; padding: clamp(20px, 2.4vw, 28px); background: #fff; border: 1px solid var(--line); }
.blu .blu-card.blue { background: var(--blu-blue-soft); border-color: transparent; }
.blu .blu-card.yellow { background: var(--blu-yellow-soft); border-color: transparent; }
.blu .blu-card.green { background: var(--blu-green-soft); border-color: transparent; }
.blu .blu-card.red { background: var(--blu-red-soft); border-color: transparent; }
.blu .blu-card.dark { background: var(--blu-dark); border-color: var(--blu-dark-line); color: #F2F4FA; }
.blu .blu-card.glow { border-color: #3B5BFF; box-shadow: 0 0 34px -8px rgba(59,91,255,.55); }
.blu .blu-sec.dark .blu-card { background: var(--blu-dark-2); border-color: var(--blu-dark-line); color: #F2F4FA; }
.blu .blu-sec.dark .blu-card.g-blue { border-color: #3B5BFF; box-shadow: 0 0 30px -10px rgba(59,91,255,.6); }
.blu .blu-sec.dark .blu-card.g-yellow { border-color: #E9B92A; box-shadow: 0 0 30px -10px rgba(246,197,43,.55); }
.blu .blu-sec.dark .blu-card.g-green { border-color: #2FBF77; box-shadow: 0 0 30px -10px rgba(47,191,119,.55); }
.blu .blu-k { font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }
.blu .blu-card.dark .blu-k, .blu .blu-sec.dark .blu-k { color: #9097A8; }
.blu .blu-v { margin-top: 10px; font-family: var(--f-display); font-weight: 700; font-size: clamp(34px, 4vw, 52px); line-height: 1; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.blu .blu-v.blue { color: var(--blu-blue); } .blu .blu-v.green { color: var(--blu-green); } .blu .blu-v.yellow { color: #C99A00; }
.blu .blu-card.dark .blu-v, .blu .blu-sec.dark .blu-v { color: #fff; }
.blu .blu-sec.dark .blu-v.blue { color: #8EA4FF; } .blu .blu-sec.dark .blu-v.green { color: #3DD68C; } .blu .blu-sec.dark .blu-v.yellow { color: var(--blu-yellow); }
.blu .blu-n { margin-top: 10px; font-size: 14.5px; line-height: 1.5; color: var(--ink-3); }
.blu .blu-card.dark .blu-n, .blu .blu-sec.dark .blu-n { color: #A9AFBF; }
.blu .blu-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.blu .blu-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.blu .blu-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.blu .blu-pill { display: inline-block; padding: 5px 10px; border-radius: 6px; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .04em; background: var(--blu-blue-soft); color: var(--blu-blue); }
.blu .blu-pill.green { background: var(--blu-green-soft); color: var(--blu-green); }
.blu .blu-pill.yellow { background: var(--blu-yellow-soft); color: #A97F00; }

/* Photos */
.blu .blu-photo { position: relative; border-radius: 20px; overflow: hidden; background: #E9EDF5; box-shadow: 0 30px 60px -36px rgba(20,30,80,.55); }
.blu .blu-photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
.blu .blu-photo-chip { position: absolute; left: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 8px;
  background: rgba(0,0,0,.82); font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: #fff; }
.blu .blu-photo-chip::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #2FBF77; }

/* Hero — brand dark hero, same as the other case studies. */
.landing .v16-brand .blu-hero {
  padding: clamp(140px, 14vw, 180px) 0 clamp(64px, 8vw, 96px); text-align: center;
  background:
    radial-gradient(ellipse 60% 50% at 50% -8%, rgba(43, 89, 255, 0.38), rgba(43, 89, 255, 0) 70%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 22px 22px,
    #0b0b0c;
}
.landing .v16-brand .blu-hero ::selection { background: #2b59ff; color: #ffffff; }
.landing .v16-brand .blu-hero .blu-lockup { display: inline-flex; align-items: center; gap: 18px; }
.landing .v16-brand .blu-hero .blu-lockup-logo { display: block; height: 42px; width: auto; }
/* BlendUs' logo is dark teal on transparent, so it sits on a white tile. */
.landing .v16-brand .blu-hero .blu-lockup-partner { display: block; height: 58px; width: auto; padding: 10px 14px; border-radius: 10px; background: #fff; }
.landing .v16-brand .blu .blu-x { color: #8a8c93; font-size: 16px; }
.landing .v16-brand .blu-hero .blu-hero-eyebrow { margin-top: clamp(44px, 6vw, 72px); font-family: 'Geist Mono', ui-monospace, monospace; font-size: clamp(13px, 1.2vw, 16px);
  font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: #7c98ff; }
.landing .v16-brand .blu-hero h1 { margin: 22px auto 0; color: #ffffff; line-height: 1; letter-spacing: -0.035em !important; }
.landing .v16-brand .blu-hero h1 > span { display: block; }
.landing .v16-brand .blu-hero .lt { font-weight: 300; }
.landing .v16-brand .blu-hero .it { font-weight: 300; font-style: italic; }
.landing .v16-brand .blu-hero .blu-h1-a { font-size: clamp(32px, 4.2vw, 56px); font-weight: 700; }
.landing .v16-brand .blu-hero .blu-h1-b { margin: 8px 0 6px; font-size: clamp(36px, 5.4vw, 78px); font-weight: 700; line-height: 1.02; letter-spacing: -0.045em;
  color: #5b7cff; text-shadow: 0 0 40px rgba(43, 89, 255, 0.45); }
.landing .v16-brand .blu-hero .blu-h1-c { font-size: clamp(26px, 3.6vw, 48px); font-weight: 700; letter-spacing: -0.03em; }
.landing .v16-brand .blu-hero .blu-lede { margin: 28px auto 0; max-width: 820px; font-size: clamp(17px, 1.7vw, 21px); line-height: 1.5; color: #b4b4bc; }
.landing .v16-brand .blu-hero .blu-hero-stats { margin: 48px auto 0; display: flex; justify-content: center; flex-wrap: wrap; gap: 14px; }
.landing .v16-brand .blu-hero .blu-hero-stat { min-width: 220px; padding: 22px 28px; border-radius: 16px; text-align: center; background: #111114; border: 1px solid rgba(255, 255, 255, 0.08); }
.landing .v16-brand .blu-hero .blu-hero-stat:first-child { border-color: rgba(43, 89, 255, 0.55); box-shadow: 0 0 30px -12px rgba(43, 89, 255, 0.6); }
.landing .v16-brand .blu-hero .blu-hero-stat .v { font-family: 'Geist Mono', ui-monospace, monospace; font-size: clamp(30px, 3vw, 40px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.1; color: #ffffff; }
.landing .v16-brand .blu-hero .blu-hero-stat:first-child .v { color: #7c98ff; }
.landing .v16-brand .blu-hero .blu-hero-stat:last-child .v { color: #2ec27e; }
.landing .v16-brand .blu-hero .blu-hero-stat .l { margin-top: 10px; font-size: 16px; line-height: 1.45; color: #b4b4bc; }
.landing .v16-brand .blu-hero .blu-video { max-width: 880px; margin: clamp(36px, 5vw, 56px) auto 0; }
.landing .v16-brand .blu-hero .blu-video figcaption { color: rgba(255,255,255,.6); }

/* About */
.blu .blu-about { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 56px); align-items: center; }
.blu .blu-about-logo { display: block; height: 52px; width: auto; margin-bottom: 18px; }
.blu .blu-mission { margin-top: 24px; padding: 18px 22px; border-radius: 16px; background: var(--blu-blue-soft); }
.blu .blu-mission .blu-k { color: var(--blu-blue); }
.blu .blu-mission q { display: block; margin-top: 8px; font-size: 17px; font-style: italic; line-height: 1.5; color: var(--ink); quotes: none; }
.blu .blu-mission p { margin: 6px 0 0; font-size: 14.5px; color: var(--ink-3); }
.blu .blu-about .blu-grid-2 .blu-v { font-size: clamp(34px, 3.6vw, 48px); }
.blu .blu-about .blu-card.dark { border-color: #3B5BFF; box-shadow: 0 0 34px -8px rgba(59,91,255,.6); }
.blu .blu-recog { margin-top: 16px; }
.blu .blu-recog .blu-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

/* Numbers */
.blu .blu-nums .blu-grid-3 { margin-top: 44px; }
.blu .blu-nums .blu-tiers { margin-top: 16px; }
.blu .blu-nums .blu-tiers .blu-card { padding: 18px 22px; }
.blu .blu-nums .blu-tiers p { margin: 10px 0 0; font-size: 15px; color: #D6D9E3; }
.blu .blu-tier { display: inline-block; padding: 3px 8px; border-radius: 5px; font-family: var(--f-mono); font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.blu .blu-tier.t0 { background: #E6ECFF; color: var(--blu-blue); } .blu .blu-tier.t1 { background: #FFF1C2; color: #8A6A00; } .blu .blu-tier.t2 { background: #DFF7E9; color: #12693F; }
.blu .blu-fit { display: flex; align-items: center; gap: 16px; margin-top: 16px; padding: 18px 22px; border-radius: 16px; border: 1px solid #3B5BFF; background: #111114; box-shadow: 0 0 34px -10px rgba(59,91,255,.6); font-size: 16px; line-height: 1.5; color: #E6E6E8; }
.blu .blu-fit img { flex-shrink: 0; width: 36px; height: 36px; border-radius: 9px; }
.blu .blu-fit b { color: #fff; }
.blu .blu-fit-hl { color: #8EA4FF; }
.blu .blu-nums-note { margin-top: 14px; text-align: center; font-size: 13.5px; color: #8A8C93; }

/* History */
.blu .blu-hist { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 56px); align-items: center; }
.blu .blu-hist-eaz { display: flex; align-items: center; gap: 14px; margin-top: 22px; padding: 14px 18px; border-radius: 14px; background: var(--blu-blue-soft); font-size: 16px; line-height: 1.5; color: var(--ink); }
.blu .blu-hist-eaz img { flex-shrink: 0; width: 34px; height: 34px; border-radius: 9px; }
.blu .blu-hist .blu-photo { margin-top: 22px; aspect-ratio: 16 / 7; }
.blu .blu-quotes { display: grid; gap: 16px; }
.blu .blu-quote { padding: 24px 26px; border-radius: 16px; background: #fff; border: 1px solid var(--line); box-shadow: 0 20px 40px -30px rgba(20,30,80,.35); }
.blu .blu-quote::before { content: '“'; display: block; height: 34px; font-family: var(--f-display); font-size: 56px; font-weight: 800; line-height: 1; color: var(--blu-blue); }
.blu .blu-quote blockquote { margin: 0; font-size: 18px; line-height: 1.5; color: var(--ink); }
.blu .blu-quote .en { margin: 8px 0 0; font-size: 15px; font-style: italic; color: var(--ink-3); }
.blu .blu-quote .by { margin-top: 14px; font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }

/* Challenge */
.blu .blu-chal { margin-top: 44px; }
.blu .blu-chal .blu-card { min-height: 240px; }
.blu .blu-chal .blu-card h3 { margin: 14px 0 10px; font-size: 21px; font-weight: 700; line-height: 1.3; color: var(--ink); }
.blu .blu-chal .blu-card p { margin: 0; font-size: 15.5px; line-height: 1.6; color: var(--ink-3); }
.blu .blu-chal .red .blu-k { color: #C0362A; } .blu .blu-chal .yellow .blu-k { color: #A97F00; }
.blu .blu-chal .dark h3 { color: #fff; } .blu .blu-chal .dark p { color: #A9AFBF; }

/* Rollout */
.blu .blu-roll { margin-top: 44px; padding: clamp(24px, 3vw, 40px); }
.blu .blu-tl { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); list-style: none; padding: 0; margin: 0; }
.blu .blu-tl::before { content: ''; position: absolute; left: 10%; right: 10%; top: 31px; height: 2px; background: linear-gradient(90deg, var(--blu-blue) 75%, #2C2E36 75%); }
.blu .blu-tl-i { position: relative; text-align: center; }
.blu .blu-tl-y { font-family: var(--f-mono); font-size: 13px; font-weight: 600; color: #fff; text-transform: uppercase; }
.blu .blu-tl-dot { width: 14px; height: 14px; margin: 10px auto 12px; border-radius: 50%; background: var(--blu-blue); position: relative; z-index: 1; }
.blu .blu-tl-i.next .blu-tl-y { color: var(--blu-yellow); } .blu .blu-tl-i.next .blu-tl-dot { background: var(--blu-yellow); box-shadow: 0 0 14px rgba(246,197,43,.7); }
.blu .blu-tl-l { font-family: var(--f-mono); font-size: 12px; line-height: 1.4; color: #9097A8; padding: 0 4px; }
.blu .blu-tl-i.next .blu-tl-l { color: #fff; }
.blu .blu-roll .blu-grid-3 { margin-top: 40px; }
.blu .blu-roll .blu-v { font-size: clamp(28px, 3vw, 40px); }
.blu .blu-roll .met { border-color: #2FBF77 !important; box-shadow: 0 0 30px -10px rgba(47,191,119,.6); }
.blu .blu-roll .met .blu-v { color: #3DD68C; }

/* Flow: WhatsApp -> Eazybe -> HubSpot -> AI summary -> ClickUp (animated on view) */
.blu .blu-flow-box { position: relative; margin-top: 44px; padding: clamp(28px, 4vw, 48px) clamp(16px, 3vw, 36px) 28px; border-radius: 18px; border: 1px solid #DDE3F2;
  background: linear-gradient(#F7F9FD, #F7F9FD) padding-box; background-image: linear-gradient(rgba(43,89,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,89,255,.05) 1px, transparent 1px); background-size: 28px 28px; background-color: #F7F9FD; }
.blu .blu-flow { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
.blu .blu-flow::before { content: ''; position: absolute; left: 10%; right: 10%; top: 44px; height: 3px; border-radius: 3px; background: #C9D5FF; }
.blu .blu-flow::after { content: ''; position: absolute; left: 10%; top: 44px; height: 3px; width: 80%; border-radius: 3px; background: var(--blu-blue); box-shadow: 0 0 12px rgba(43,89,255,.6); transform-origin: left; }
.blu .blu-node { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; }
.blu .blu-node-ic { width: 90px; height: 90px; border-radius: 22px; display: flex; align-items: center; justify-content: center; background: #fff; border: 2px solid var(--blu-blue); box-shadow: 0 12px 26px -14px rgba(43,89,255,.6); }
.blu .blu-node-ic svg { width: 34px; height: 34px; }
.blu .blu-node.eaz .blu-node-ic { background: var(--blu-blue); }
.blu .blu-node-ic img { width: 46px; height: 46px; border-radius: 10px; }
.blu .blu-node b { margin-top: 14px; font-size: 17px; font-weight: 700; color: var(--ink); }
.blu .blu-node-card { margin-top: 14px; width: 100%; padding: 12px 14px; border-radius: 12px; background: #fff; border: 1px solid var(--line); box-shadow: 0 10px 24px -18px rgba(20,30,80,.4); text-align: left; }
.blu .blu-node-card .blu-k { font-size: 10.5px; }
.blu .blu-node-card p { margin: 6px 0 0; font-size: 13.5px; line-height: 1.45; color: var(--ink-2); }
.blu .blu-node:nth-child(1) .blu-k { color: #1E9E62; } .blu .blu-node:nth-child(2) .blu-k { color: var(--blu-blue); } .blu .blu-node:nth-child(3) .blu-k { color: #E0592A; }
.blu .blu-node:nth-child(4) .blu-k { color: #A97F00; } .blu .blu-node:nth-child(5) .blu-k { color: #7B4FD6; }
.blu .blu-flow-note { margin-top: 18px; text-align: right; font-family: var(--f-mono); font-size: 11px; color: #9AA0AE; }
.blu .blu-wl { margin-top: 16px; }
.blu .blu-wl .blu-card { padding: 20px 24px; }
.blu .blu-wl h3 { margin: 0; font-size: 17px; font-weight: 700; color: var(--ink); }
.blu .blu-wl p { margin: 6px 0 0; font-size: 15px; color: var(--ink-3); }

/* One clean block (animated on view) */
.blu .blu-block-box { max-width: 980px; margin: 44px auto 0; padding: clamp(20px, 3vw, 36px); border-radius: 20px; border: 1px solid #3B5BFF; box-shadow: 0 0 60px -14px rgba(59,91,255,.6);
  background-color: #F3F5FA; background-image: linear-gradient(rgba(43,89,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,89,255,.05) 1px, transparent 1px); background-size: 28px 28px; }
.blu .blu-block-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.1fr); gap: 22px; }
.blu .blu-pane { border-radius: 16px; background: #fff; overflow: hidden; box-shadow: 0 20px 40px -30px rgba(20,30,80,.45); color: #0B0B0C; }
.blu .blu-pane-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #EEF0F4; font-size: 14.5px; font-weight: 700; }
.blu .blu-mini { padding: 3px 8px; border-radius: 5px; background: var(--blu-green-soft); color: var(--blu-green); font-family: var(--f-mono); font-size: 10.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; }
.blu .blu-wa { padding: 14px; display: grid; gap: 9px; background: #EFE9E1; min-height: 300px; align-content: start; }
.blu .blu-msg { max-width: 86%; padding: 8px 12px; border-radius: 10px; font-size: 13.5px; line-height: 1.4; color: #111; background: #fff; box-shadow: 0 1px 1px rgba(0,0,0,.06); }
.blu .blu-msg.out { justify-self: end; background: #D9FDD3; }
.blu .blu-hs { padding: 16px; }
.blu .blu-hs-block { padding: 14px 16px; border-radius: 12px; border: 1px solid #2FBF77; background: #ECF8F1; }
.blu .blu-hs-block-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 14.5px; font-weight: 700; }
.blu .blu-hs-badge { padding: 3px 8px; border-radius: 5px; background: #fff; color: var(--blu-green); font-family: var(--f-mono); font-size: 10.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.blu .blu-hs-block p { margin: 8px 0 0; font-size: 13.5px; line-height: 1.5; color: #3A3C44; }
.blu .blu-block-foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 18px; font-size: 14px; color: #5A5C64; }
.blu .blu-block-foot img { height: 24px; width: auto; filter: brightness(0); }
.blu .blu-block-now { font-family: var(--f-mono); font-size: 12.5px; color: var(--blu-green); }
.blu .blu-block-note { margin-top: 12px; text-align: center; font-family: var(--f-mono); font-size: 11px; color: #6E7384; }

/* Privacy */
.blu .blu-priv { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 56px); align-items: center; }
.blu .blu-rows { display: grid; gap: 12px; margin-top: 26px; }
.blu .blu-row { display: grid; grid-template-columns: 150px 1fr; align-items: center; gap: 12px; padding: 16px 20px; border-radius: 14px; font-size: 16px; color: var(--ink); }
.blu .blu-row .blu-k { font-size: 11px; }
.blu .blu-row.green { background: var(--blu-green-soft); } .blu .blu-row.green .blu-k { color: var(--blu-green); }
.blu .blu-row.red { background: var(--blu-red-soft); } .blu .blu-row.red .blu-k { color: #C0362A; }
.blu .blu-row.blue { background: var(--blu-blue-soft); } .blu .blu-row.blue .blu-k { color: var(--blu-blue); }
.blu .blu-priv .blu-photo { aspect-ratio: 4 / 3; }

/* Benefits */
.blu .blu-ben { margin-top: 44px; }
.blu .blu-ben .blu-card { display: flex; flex-direction: column; }
.blu .blu-ben .lab { font-family: var(--f-mono); font-size: 11.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--blu-blue); }
.blu .blu-ben .lab.b { margin-top: 16px; color: var(--blu-green); }
.blu .blu-ben .fact { margin: 6px 0 0; font-size: 15.5px; line-height: 1.45; color: var(--ink); }
.blu .blu-ben .fact b { font-weight: 700; }
.blu .blu-ben h3 { margin: 6px 0 0; font-size: 18px; font-weight: 700; line-height: 1.3; color: var(--ink); }
.blu .blu-ben .body { margin: 8px 0 0; font-size: 14.5px; line-height: 1.55; color: var(--ink-3); }
.blu .blu-ben .dark .lab { color: #8EA4FF; } .blu .blu-ben .dark .lab.b { color: #3DD68C; }
.blu .blu-ben .dark .fact, .blu .blu-ben .dark h3 { color: #fff; } .blu .blu-ben .dark .body { color: #A9AFBF; }

/* Results */
.blu .blu-res .blu-grid-4 { margin-top: 44px; }
.blu .blu-ba { margin-top: 16px; padding: clamp(20px, 3vw, 32px); }
.blu .blu-ba-table { width: 100%; border-collapse: collapse; }
.blu .blu-ba-table th { padding: 0 12px 12px 0; text-align: left; font-family: var(--f-mono); font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #9097A8; }
.blu .blu-ba-table td { padding: 15px 12px 15px 0; border-top: 1px solid #2A2C34; font-size: 15.5px; color: #F2F4FA; }
.blu .blu-ba-table td.b { color: #FF7563; } .blu .blu-ba-table td.a { color: #3DD68C; }
.blu .blu-res-note { margin-top: 20px; font-size: 14px; color: #A9AFBF; }

/* Two views */
.blu .blu-views { margin-top: 44px; }
.blu .blu-views .blu-photo { aspect-ratio: 16 / 9; }
.blu .blu-views h3 { margin: 18px 0 6px; font-size: 20px; font-weight: 700; color: var(--ink); }
.blu .blu-views p { margin: 0; font-size: 15.5px; line-height: 1.55; color: var(--ink-3); }
.blu .blu-views-note { margin-top: 18px; font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-4, #9AA0AE); }

/* Words + next */
.blu .blu-words { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 60px); align-items: center; }
.blu .blu-words .blu-photo { aspect-ratio: 16 / 9; }
.blu .blu-wq { margin: 0 0 24px; }
.blu .blu-wq blockquote { margin: 14px 0 12px; font-size: clamp(21px, 2.3vw, 27px); line-height: 1.4; color: var(--ink); }
.blu .blu-wq .by { font-family: var(--f-mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
.blu .blu-next { display: grid; gap: 12px; margin-top: 14px; }
.blu .blu-next .blu-card { padding: 18px 22px; }
.blu .blu-next h3 { margin: 8px 0 4px; font-size: 18px; font-weight: 700; color: var(--ink); }
.blu .blu-next p { margin: 0; font-size: 15px; color: var(--ink-3); }
.blu .blu-next .blue .blu-k { color: var(--blu-blue); } .blu .blu-next .yellow .blu-k { color: #A97F00; } .blu .blu-next .green .blu-k { color: var(--blu-green); }

/* Why + CTA */
.blu .blu-why { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 48px); align-items: center; }
.blu .blu-why .blu-grid-2 { margin-top: 18px; }
.blu .blu-why .blu-grid-2 .blu-card:nth-child(3) .blu-v { color: var(--blu-yellow); }
.blu .blu-why .blu-grid-2 .blu-card:nth-child(4) .blu-v { color: #3DD68C; font-size: clamp(26px, 3vw, 36px); }
.blu .blu-why-p { margin: 18px 0 0; font-size: 14.5px; color: #A9AFBF; }
.blu .blu-cta-card { --ink: #0B0B0C; --ink-2: #2A2C33; --ink-3: #5A5C64; --ink-4: #8A8C93; padding: clamp(26px, 3.4vw, 40px); border-radius: 22px; background: #fff; color: var(--ink); }
.landing .blu-cta-card .blu-cta-logo { display: block; height: 30px; width: auto; filter: brightness(0); }
.landing .blu-cta-card .blu-cta-btns .btn:not(.btn-primary) { color: #0B0B0C; background: #fff; border: 1px solid #D9DAD6; }
.landing .blu-cta-card .blu-cta-btns .btn:not(.btn-primary):hover { border-color: #0B0B0C; }
.landing .blu-cta-card h2 { margin: 20px 0 12px; font-family: var(--f-display); font-weight: 700; font-size: clamp(24px, 2.6vw, 32px); line-height: 1.2; letter-spacing: -0.02em; color: var(--ink); max-width: none; }
.blu .blu-cta-card p { margin: 0; font-size: 15.5px; line-height: 1.6; color: var(--ink-3); }
.blu .blu-cta-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.landing .blu-cta-card .blu-cta-foot { margin-top: 16px; font-family: var(--f-mono); font-size: 11.5px; color: #5A5C64; }
.landing .blu-back { display: inline-block; margin-top: 18px; font-size: 14px; font-weight: 600; color: var(--blu-blue); }

/* Animations: the two "illustrative animation" slides run once when they scroll
   into view (site RevealOnScroll adds .show to .reveal blocks). */
@keyframes blu-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes blu-pop { from { opacity: 0; transform: translateY(12px) scale(.94); } to { opacity: 1; transform: none; } }
@keyframes blu-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes blu-lit { 0% { box-shadow: 0 12px 26px -14px rgba(43,89,255,.6); } 50% { box-shadow: 0 0 0 8px rgba(43,89,255,.18), 0 12px 26px -14px rgba(43,89,255,.6); } 100% { box-shadow: 0 12px 26px -14px rgba(43,89,255,.6); } }
@keyframes blu-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(47,191,119,0); } 50% { box-shadow: 0 0 26px -4px rgba(47,191,119,.6); } }
.blu .blu-flow-box.show .blu-flow::after { animation: blu-grow 2.6s cubic-bezier(.45,.05,.3,1) .3s both; }
.blu .blu-flow-box.show .blu-node-ic { animation: blu-pop .5s cubic-bezier(.2,.8,.2,1) both, blu-lit .9s ease-out both; }
.blu .blu-flow-box.show .blu-node-card { animation: blu-in .45s ease-out both; }
.blu .blu-flow-box.show .blu-node:nth-child(1) .blu-node-ic { animation-delay: .2s, .3s; } .blu .blu-flow-box.show .blu-node:nth-child(1) .blu-node-card { animation-delay: .45s; }
.blu .blu-flow-box.show .blu-node:nth-child(2) .blu-node-ic { animation-delay: .8s, .9s; } .blu .blu-flow-box.show .blu-node:nth-child(2) .blu-node-card { animation-delay: 1.05s; }
.blu .blu-flow-box.show .blu-node:nth-child(3) .blu-node-ic { animation-delay: 1.4s, 1.5s; } .blu .blu-flow-box.show .blu-node:nth-child(3) .blu-node-card { animation-delay: 1.65s; }
.blu .blu-flow-box.show .blu-node:nth-child(4) .blu-node-ic { animation-delay: 2.0s, 2.1s; } .blu .blu-flow-box.show .blu-node:nth-child(4) .blu-node-card { animation-delay: 2.25s; }
.blu .blu-flow-box.show .blu-node:nth-child(5) .blu-node-ic { animation-delay: 2.6s, 2.7s; } .blu .blu-flow-box.show .blu-node:nth-child(5) .blu-node-card { animation-delay: 2.85s; }
.blu .blu-block-box.show .blu-msg { animation: blu-pop .4s cubic-bezier(.2,.8,.2,1) both; }
.blu .blu-block-box.show .blu-msg:nth-child(1) { animation-delay: .3s; } .blu .blu-block-box.show .blu-msg:nth-child(2) { animation-delay: .65s; }
.blu .blu-block-box.show .blu-msg:nth-child(3) { animation-delay: 1s; } .blu .blu-block-box.show .blu-msg:nth-child(4) { animation-delay: 1.3s; }
.blu .blu-block-box.show .blu-msg:nth-child(5) { animation-delay: 1.65s; } .blu .blu-block-box.show .blu-msg:nth-child(6) { animation-delay: 2s; }
.blu .blu-block-box.show .blu-hs-block { animation: blu-pop .5s cubic-bezier(.2,.8,.2,1) 2.4s both, blu-glow 2.6s ease-in-out 3.2s infinite; }
.blu .blu-block-box.show .blu-hs-block p { animation: blu-in .4s ease-out both; }
.blu .blu-block-box.show .blu-hs-block p:nth-of-type(1) { animation-delay: 2.7s; } .blu .blu-block-box.show .blu-hs-block p:nth-of-type(2) { animation-delay: 2.9s; }
.blu .blu-block-box.show .blu-hs-block p:nth-of-type(3) { animation-delay: 3.1s; }
.blu .blu-block-box.show .blu-block-now { animation: blu-in .5s ease-out 3.3s both; }
@media (prefers-reduced-motion: reduce) {
  .blu .blu-flow-box.show *, .blu .blu-flow-box.show .blu-flow::after, .blu .blu-block-box.show * { animation: none !important; }
}

@media (max-width: 1024px) {
  .blu .blu-grid-4 { grid-template-columns: 1fr 1fr; }
  .blu .blu-ben.blu-grid-3 { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .blu .blu-about, .blu .blu-hist, .blu .blu-priv, .blu .blu-words, .blu .blu-why, .blu .blu-block-grid { grid-template-columns: 1fr; }
  .blu .blu-grid-3, .blu .blu-ben.blu-grid-3 { grid-template-columns: 1fr; }
  .blu .blu-tl { grid-template-columns: repeat(3, 1fr); row-gap: 22px; }
  .blu .blu-tl::before { display: none; }
  .blu .blu-flow { grid-template-columns: 1fr; gap: 22px; }
  .blu .blu-flow::before, .blu .blu-flow::after { display: none; }
  .blu .blu-node { flex-direction: row; align-items: center; gap: 14px; text-align: left; }
  .blu .blu-node-ic { width: 64px; height: 64px; flex-shrink: 0; border-radius: 16px; }
  .blu .blu-node b { margin-top: 0; min-width: 96px; }
  .blu .blu-node-card { margin-top: 0; }
}
@media (max-width: 560px) {
  .landing .v16-brand .blu-hero .blu-lockup { gap: 10px; }
  .landing .v16-brand .blu-hero .blu-lockup-logo { height: 30px; }
  .landing .v16-brand .blu-hero .blu-lockup-partner { height: 46px; padding: 8px 10px; }
  .landing .v16-brand .blu-hero .blu-hero-stat { min-width: 0; width: 100%; }
  .blu .blu-grid-2, .blu .blu-grid-4 { grid-template-columns: 1fr; }
  .blu .blu-row { grid-template-columns: 1fr; gap: 4px; }
  .blu .blu-node { flex-wrap: wrap; }
  .blu .blu-ba-table td, .blu .blu-ba-table th { font-size: 13.5px; }
}
`

/* Small line icons for the flow (brand: simple strokes, no emoji). */
const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1E9E62" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z" /></svg>
)
const IconHub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#E0592A" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v6M12 16v6M2 12h6M16 12h6" /></svg>
)
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="#F6C52B" aria-hidden="true"><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" /></svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#7B4FD6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)

export default async function BlendusCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getBlendusContent(locale)

  const prefix = locale === 'en' ? '' : `/${locale}`
  const homeUrl = `${SITE_URL}${locale === 'en' ? '/' : `/${locale}`}`
  const hubUrl = `${SITE_URL}${prefix}/case-studies`
  const pageUrl = `${SITE_URL}${prefix}${SLUG}`
  const headline = blendusHeadline(t)
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
      '@type': 'Organization',
      name: 'Blendus Tecnologia em Saúde',
      alternateName: 'BlendUs',
      url: 'https://blendus.com.br',
      address: { '@type': 'PostalAddress', addressLocality: 'Florianópolis', addressCountry: 'BR' },
    },
    video: { '@id': `${pageUrl}#video` },
  }
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${pageUrl}#video`,
    name: VIDEO_TITLE,
    description: t.meta.description,
    thumbnailUrl: [VIDEO_THUMB, `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`],
    uploadDate: '2026-11-26T00:32:23-08:00',
    duration: 'PT1M27S',
    // A YouTube watch page is not a media file, so no contentUrl; embedUrl is the player.
    embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
    publisher: eazybeOrg,
  }

  const aboutTones = ['dark', 'yellow', 'green', '']
  const aboutValueTones = ['', '', 'green', '']
  const recogTones = ['yellow', '', '', 'green', 'green']
  const numTones = ['g-blue', 'g-yellow', 'g-green']
  const numValTones = ['blue', 'yellow', 'green']
  const chalTones = ['red', 'yellow', 'dark']
  const benTones = ['blue', 'green', 'yellow', 'red', 'dark', '']
  const resTones = ['g-green', 'g-blue', 'g-yellow', '']
  const resValTones = ['green', 'blue', 'yellow', '']
  const nextTones = ['blue', 'yellow', 'green']
  const flowIcons = [<IconChat key="c" />, null, <IconHub key="h" />, <IconSpark key="s" />, <IconCheck key="k" />]

  return (
    <div className="blu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* 1. Hero — deck cover (slide 01) on the brand dark hero. */}
      <section className="blu-hero">
        <div className="container">
          <div className="blu-lockup" aria-label="Eazybe and BlendUs">
            <img className="blu-lockup-logo" src="/logo-small.png" alt="Eazybe" width={274} height={64} fetchPriority="high" />
            <span className="blu-x" aria-hidden="true">×</span>
            <img className="blu-lockup-partner" src={`${IMG}/blendus-logo.webp`} alt="Blendus Tecnologia em Saúde" width={226} height={62} />
          </div>
          <div className="blu-hero-eyebrow">{t.hero.eyebrow}</div>
          <h1>
            <span className="blu-h1-a">{t.hero.h1Pre && <><span className="lt">{t.hero.h1Pre}</span>{' '}</>}{t.hero.h1Company}</span>
            <span className="blu-h1-b">{t.hero.h1Highlight}</span>
            <span className="blu-h1-c"><span className="it">{t.hero.h1Italic}</span>{' '}{t.hero.h1With && <><span className="lt">{t.hero.h1With}</span>{' '}</>}{t.hero.h1Bold}</span>
          </h1>
          <p className="blu-lede">{t.hero.subtitle}</p>
          <div className="blu-hero-stats">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="blu-hero-stat">
                <div className="v">{s.value}</div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="blu-video">
            <VideoEmbedBlock data={{ platform: 'youtube', videoId: VIDEO_ID, title: VIDEO_TITLE }} />
          </div>
        </div>
      </section>

      {/* 2. About the customer */}
      <section className="blu-sec">
        <div className="container">
          <div className="blu-about">
            <div>
              <img className="blu-about-logo" src={`${IMG}/blendus-logo.webp`} alt="" width={226} height={62} loading="lazy" />
              <div className="blu-tag">{t.about.tag}</div>
              <h2 className="blu-h2">{t.about.h2Lead} <span className="blu-hl">{t.about.h2Highlight}</span></h2>
              <p className="blu-body"><b>{t.about.body1Bold}</b>{t.about.body1}<b>{t.about.body1Bold2}</b>{t.about.body1End}</p>
              <p className="blu-body">{t.about.body2Pre}<b>{t.about.body2Bold}</b>{t.about.body2Mid}<b>{t.about.body2Bold2}</b>{t.about.body2End}</p>
              <div className="blu-mission">
                <div className="blu-k">{t.about.missionLabel}</div>
                <q lang="pt-BR">{t.about.missionQuote}</q>
                {t.about.missionEn && <p>{t.about.missionEn}</p>}
              </div>
            </div>
            <div>
              <div className="blu-grid-2">
                {t.about.facts.map((f, i) => (
                  <div key={f.label} className={`blu-card ${aboutTones[i]}`}>
                    <div className="blu-k">{f.label}</div>
                    <div className={`blu-v ${aboutValueTones[i]}`}>{f.value}</div>
                    <div className="blu-n">{f.note}</div>
                  </div>
                ))}
              </div>
              <div className="blu-card blu-recog">
                <div className="blu-k">{t.about.recognitionLabel}</div>
                <div className="blu-pills">
                  {t.about.recognition.map((r, i) => <span key={r} className={`blu-pill ${recogTones[i]}`}>{r}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="blu-src">{t.about.source}</div>
        </div>
      </section>

      {/* 3. BlendUs in numbers */}
      <section className="blu-sec dark blu-nums">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag">{t.numbers.tag}</div>
            <h2 className="blu-h2">{t.numbers.h2Lead} <span className="blu-hl">{t.numbers.h2Highlight}</span></h2>
            <p className="blu-sub">{t.numbers.subPre}<b>{t.numbers.subBold}</b>{t.numbers.subPost}</p>
          </div>
          <div className="blu-grid-3">
            {t.numbers.stats.map((s, i) => (
              <div key={s.label} className={`blu-card ${numTones[i]}`}>
                <div className="blu-k">{s.label}</div>
                <div className={`blu-v ${numValTones[i]}`}>{s.value}</div>
                <div className="blu-n">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="blu-grid-3 blu-tiers">
            {t.numbers.tiers.map((tier, i) => (
              <div key={tier.name} className="blu-card">
                <span className={`blu-tier t${i}`}>{tier.name}</span>
                <p>{tier.body}</p>
              </div>
            ))}
          </div>
          <div className="blu-fit">
            <img src={`${IMG}/eazybe-icon.webp`} alt="" width={36} height={36} loading="lazy" />
            <div><b>{t.numbers.fitBold}</b> {t.numbers.fitBody} <span className="blu-fit-hl">{t.numbers.fitHighlight}</span></div>
          </div>
          <p className="blu-nums-note">{t.numbers.note}</p>
          <div className="blu-src">{t.numbers.source}</div>
        </div>
      </section>

      {/* 4. Why history matters */}
      <section className="blu-sec">
        <div className="container">
          <div className="blu-hist">
            <div>
              <div className="blu-tag">{t.history.tag}</div>
              <h2 className="blu-h2">{t.history.h2Lead}<br /><span className="blu-hl">{t.history.h2Highlight}</span></h2>
              <p className="blu-body">
                {t.history.clientsPre}
                {t.history.clients.map((c, i) => (
                  <span key={c}>{i > 0 && (i === t.history.clients.length - 1 ? ` ${t.history.clientsAnd} ` : ', ')}<b>{c}</b></span>
                ))}
                {t.history.clientsPost}
              </p>
              <p className="blu-body">{t.history.question}</p>
              <div className="blu-hist-eaz">
                <img src={`${IMG}/eazybe-icon.webp`} alt="" width={34} height={34} loading="lazy" />
                <span>{t.history.eazybePre}<b>{t.history.eazybeBold}</b>{t.history.eazybePost}</span>
              </div>
              <div className="blu-photo">
                <img src={`${IMG}/scene-client-meeting.webp`} alt={t.history.photoAlt} width={1200} height={900} loading="lazy" />
              </div>
            </div>
            <div className="blu-quotes">
              {t.history.quotes.map((q) => (
                <figure key={q.by} className="blu-quote" style={{ margin: 0 }}>
                  <blockquote lang="pt-BR">{q.quote}</blockquote>
                  {q.en && <p className="en">{q.en}</p>}
                  <figcaption className="by">{q.by}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="blu-src">{t.history.source}</div>
        </div>
      </section>

      {/* 5. The challenge */}
      <section className="blu-sec alt">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag red">{t.challenge.tag}</div>
            <h2 className="blu-h2">{t.challenge.h2Lead} <span className="blu-hl red">{t.challenge.h2Highlight}</span></h2>
            <p className="blu-sub">{t.challenge.subtitle}</p>
          </div>
          <div className="blu-grid-3 blu-chal">
            {t.challenge.cards.map((c, i) => (
              <div key={c.label} className={`blu-card ${chalTones[i]}`}>
                <div className="blu-k">{c.label}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The rollout */}
      <section className="blu-sec dark">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag">{t.rollout.tag}</div>
            <h2 className="blu-h2">{t.rollout.h2Lead} <span className="blu-hl">{t.rollout.h2Highlight}</span></h2>
          </div>
          <div className="blu-card blu-roll">
            <ol className="blu-tl">
              {t.rollout.steps.map((s) => (
                <li key={s.date} className={`blu-tl-i ${s.state}`}>
                  <div className="blu-tl-y">{s.date}</div>
                  <div className="blu-tl-dot" aria-hidden="true" />
                  <div className="blu-tl-l">{s.label}</div>
                </li>
              ))}
            </ol>
            <div className="blu-grid-3">
              {t.rollout.stats.map((s) => (
                <div key={s.label} className={`blu-card${s.met ? ' met' : ''}`}>
                  <div className="blu-k">{s.label}</div>
                  <div className="blu-v">{s.value}</div>
                  <div className="blu-n">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. How it works: first chat to onboarding (animated) */}
      <section className="blu-sec">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag">{t.flow.tag}</div>
            <h2 className="blu-h2">{t.flow.h2Lead} <span className="blu-hl">{t.flow.h2Highlight}</span></h2>
            <p className="blu-sub">{t.flow.subtitle}</p>
          </div>
          <div className="blu-flow-box reveal">
            <div className="blu-flow">
              {t.flow.nodes.map((n, i) => (
                <div key={n.name} className={`blu-node${i === 1 ? ' eaz' : ''}`}>
                  <div className="blu-node-ic">
                    {i === 1 ? <img src={`${IMG}/eazybe-icon.webp`} alt="" width={46} height={46} /> : flowIcons[i]}
                  </div>
                  <b>{n.name}</b>
                  <div className="blu-node-card">
                    <div className="blu-k">{n.label}</div>
                    <p lang={i === 0 ? 'pt-BR' : undefined}>{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="blu-flow-note">{t.flow.note}</div>
          </div>
          <div className="blu-grid-2 blu-wl">
            <div className="blu-card green"><h3>{t.flow.won.title}</h3><p>{t.flow.won.body}</p></div>
            <div className="blu-card red"><h3>{t.flow.lost.title}</h3><p>{t.flow.lost.body}</p></div>
          </div>
        </div>
      </section>

      {/* 8. One day of talks, one clean block (animated) */}
      <section className="blu-sec dark">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag">{t.block.tag}</div>
            <h2 className="blu-h2">{t.block.h2Lead} <span className="blu-hl">{t.block.h2Highlight}</span></h2>
            <p className="blu-sub">{t.block.subtitle}</p>
          </div>
          <div className="blu-block-box reveal">
            <div className="blu-block-grid">
              <div className="blu-pane">
                <div className="blu-pane-top">{t.block.waTitle}<span className="blu-mini">{t.block.waBadge}</span></div>
                <div className="blu-wa" lang="pt-BR">
                  {BLENDUS_DAY_CHAT.map((m, i) => <div key={i} className={`blu-msg ${m.dir}`}>{m.text}</div>)}
                </div>
              </div>
              <div className="blu-pane">
                <div className="blu-pane-top">{t.block.hsTitle}<span className="blu-mini">{t.block.hsBadge}</span></div>
                <div className="blu-hs">
                  <div className="blu-hs-block">
                    <div className="blu-hs-block-top">{t.block.blockTitle}<span className="blu-hs-badge">{t.block.blockBadge}</span></div>
                    {BLENDUS_DAY_BLOCK.map((line) => <p key={line} lang="pt-BR">{line}</p>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="blu-block-foot">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <img src="/logo-small.png" alt="Eazybe" width={274} height={64} loading="lazy" /> × BlendUs
              </span>
              <span className="blu-block-now">{t.block.footNote}</span>
            </div>
          </div>
          <div className="blu-block-note">{t.block.note}</div>
        </div>
      </section>

      {/* 9. Built for sensitive data */}
      <section className="blu-sec">
        <div className="container">
          <div className="blu-priv">
            <div>
              <div className="blu-tag">{t.privacy.tag}</div>
              <h2 className="blu-h2">{t.privacy.h2Lead}<br /><span className="blu-hl">{t.privacy.h2Highlight}</span></h2>
              <p className="blu-body">{t.privacy.body}</p>
              <div className="blu-rows">
                {t.privacy.rows.map((r) => (
                  <div key={r.label} className={`blu-row ${r.tone}`}><span className="blu-k">{r.label}</span><span>{r.text}</span></div>
                ))}
              </div>
            </div>
            <div>
              <div className="blu-photo">
                <img src={`${IMG}/scene-chat-sync.webp`} alt={t.privacy.photoAlt} width={1200} height={900} loading="lazy" />
                <span className="blu-photo-chip">{t.privacy.photoChip}</span>
              </div>
              <div className="blu-src">{t.privacy.source}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Benefits */}
      <section className="blu-sec alt">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag">{t.benefits.tag}</div>
            <h2 className="blu-h2">{t.benefits.h2Lead} <span className="blu-hl">{t.benefits.h2Highlight}</span></h2>
            <p className="blu-sub">{t.benefits.subtitle}</p>
          </div>
          <div className="blu-grid-3 blu-ben">
            {t.benefits.items.map((b, i) => (
              <div key={b.title} className={`blu-card ${benTones[i]}`}>
                <div className="lab">{t.benefits.factLabel}</div>
                <p className="fact">{b.factPre}<b>{b.factBold}</b>{b.factPost}</p>
                <div className="lab b">{t.benefits.benefitLabel}</div>
                <h3>{b.title}</h3>
                <p className="body">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="blu-src">{t.benefits.source}</div>
        </div>
      </section>

      {/* 11. Results so far */}
      <section className="blu-sec dark blu-res">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag">{t.results.tag}</div>
            <h2 className="blu-h2">{t.results.h2Lead} <span className="blu-hl">{t.results.h2Highlight}</span></h2>
          </div>
          <div className="blu-grid-4">
            {t.results.stats.map((s, i) => (
              <div key={s.label} className={`blu-card ${resTones[i]}`}>
                <div className="blu-k">{s.label}</div>
                <div className={`blu-v ${resValTones[i]}`}>{s.value}</div>
                <div className="blu-n">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="blu-card blu-ba">
            <table className="blu-ba-table">
              <thead>
                <tr>
                  <th scope="col"><span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{t.results.aspectLabel}</span></th>
                  <th scope="col">{t.results.beforeLabel}</th>
                  <th scope="col">{t.results.afterLabel}</th>
                </tr>
              </thead>
              <tbody>
                {t.results.rows.map((r) => (
                  <tr key={r.aspect}><td>{r.aspect}</td><td className="b">{r.before}</td><td className="a">{r.after}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="blu-res-note blu-center">{t.results.note}</p>
        </div>
      </section>

      {/* 12. Two views, one story */}
      <section className="blu-sec">
        <div className="container">
          <div className="blu-center">
            <div className="blu-tag">{t.views.tag}</div>
            <h2 className="blu-h2">{t.views.h2Lead} <span className="blu-hl">{t.views.h2Highlight}</span></h2>
            <p className="blu-sub">{t.views.subtitle}</p>
          </div>
          <div className="blu-grid-2 blu-views">
            {t.views.cards.map((c, i) => (
              <div key={c.chip}>
                <div className="blu-photo">
                  <img src={`${IMG}/${i === 0 ? 'scene-seller' : 'scene-manager'}.webp`} alt={c.alt} width={1200} height={675} loading="lazy" />
                  <span className="blu-photo-chip">{c.chip}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <div className="blu-views-note">BlendUs × Eazybe · {t.views.note}</div>
        </div>
      </section>

      {/* 13. In their words + what's next */}
      <section className="blu-sec alt">
        <div className="container">
          <div className="blu-words">
            <div>
              {/* The customer quote waits for BlendUs' approval (see quoteApproved). */}
              {t.words.quoteApproved && (
                <figure className="blu-wq">
                  <div className="blu-tag">{t.words.tag}</div>
                  <blockquote>“{t.words.quote}”</blockquote>
                  <figcaption className="by">{t.words.quoteBy}</figcaption>
                </figure>
              )}
              <div className="blu-photo">
                <img src={`${IMG}/scene-handshake.webp`} alt={t.words.photoAlt} width={1200} height={675} loading="lazy" />
              </div>
            </div>
            <div>
              <div className="blu-k">{t.words.nextLabel}</div>
              <div className="blu-next">
                {t.words.next.map((n, i) => (
                  <div key={n.badge} className={`blu-card ${nextTones[i]}`}>
                    <div className="blu-k">{n.badge}</div>
                    <h3>{n.title}</h3>
                    <p>{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Why Eazybe + CTA */}
      <section className="blu-sec dark">
        <div className="container">
          <div className="blu-why">
            <div>
              <div className="blu-tag">{t.why.tag}</div>
              <div className="blu-grid-2">
                {t.why.stats.map((s, i) => (
                  <div key={s.label} className={`blu-card ${['g-blue', '', 'g-yellow', 'g-green'][i]}`}>
                    <div className="blu-v" style={{ marginTop: 0 }}>{s.value}</div>
                    <div className="blu-n">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="blu-why-p">{t.why.partners}</p>
            </div>
            <div className="blu-cta-card">
              <img className="blu-cta-logo" src="/logo-small.png" alt="Eazybe" width={274} height={64} loading="lazy" />
              <h2>{t.finalCta.h2}</h2>
              <p>{t.finalCta.body}</p>
              <div className="blu-cta-btns">
                <a href={pricingHref} className="btn btn-primary btn-lg">{t.finalCta.primary}</a>
                <a href={demoHref} className="btn btn-lg">{t.finalCta.secondary}</a>
              </div>
              <div className="blu-cta-foot">{t.finalCta.footnote}</div>
              <a className="blu-back" href={`${prefix}/case-studies`}>← {t.finalCta.backToHub}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
