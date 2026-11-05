import type { ReactNode } from 'react'
import { MobileMore } from '@/components/pages/WhatsappAiAgentInteractive'
import type { CallingUi } from '@/data/calling-ui'

// Pieces shared by the /calling hub and its product pages.

export const LOGOS = [
  { name: 'Physics Wallah', src: '/homepage-v16/img/12652a629a3e.webp', w: 46, h: 48, showName: true },
  { name: 'University Living', src: '/homepage-v16/img/3b98e2d678b3.webp', w: 137, h: 38 },
  { name: 'WanderOn', src: '/homepage-v16/img/6eab0ad57af6.webp', w: 50, h: 50, showName: true },
  { name: 'Studyin', src: '/homepage-v16/img/1be35e7b23d7.webp', w: 139, h: 32 },
  { name: 'Kreedo', src: '/homepage-v16/img/13d10fb34398.webp', w: 128, h: 34 },
  { name: 'TravClan', src: '/homepage-v16/img/2a887853a6c7.webp', w: 132, h: 34 },
  { name: 'Uniacco', src: '/homepage-v16/img/d82705f3f33a.webp', w: 33, h: 36, showName: true },
  { name: 'Unicreds', src: '/homepage-v16/img/2b4fbff43c65.webp', w: 192, h: 31 },
]

export const TAB_IDS = [
  { id: 'sim-calling', n: '01' },
  { id: 'virtual-calling', n: '02' },
  { id: 'auto-dialer', n: '03' },
  { id: 'tracking-recording', n: '04' },
]

export const svg = (children: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)
export const PHONE = <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />

export const PRODUCTS = [
  { slug: 'sim-based-calling', icon: svg(<><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" /><rect x="8" y="11" width="8" height="7" rx="1" /><path d="M12 11v7M8 14.5h8" /></>) },
  { slug: 'virtual-phone-number', icon: svg(<>{PHONE}<path d="M15 2a7 7 0 0 1 7 7" /><path d="M15 6a3 3 0 0 1 3 3" /></>) },
  { slug: 'auto-dialer', icon: svg(<path d="M5 4h.01M12 4h.01M19 4h.01M5 11h.01M12 11h.01M19 11h.01M5 18h.01M12 18h.01M19 18h.01" strokeWidth="3.4" />) },
  { slug: 'call-tracking', icon: svg(<><path d="M3 3v18h18" /><path d="M8 17v-4M13 17V8M18 17v-7" /></>) },
  { slug: 'call-recording', icon: svg(<><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v4M8 22h8" /></>) },
  { slug: 'sim-vs-cloud-calling', icon: svg(<><path d="M12 3v18M7 21h10M5 7h14" /><path d="M5 7l-3 7a3 3 0 0 0 6 0L5 7zM19 7l-3 7a3 3 0 0 0 6 0l-3-7z" /></>) },
]

// Same order as the hub's table rows: what it uses, caller sees, if a rep leaves, best for.
export const COMPARE_ICONS = [
  svg(<><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></>),
  svg(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>),
  svg(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>),
  svg(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>),
]

export const DIAL_ROWS = [
  { name: 'Ahmed Khan', phone: '+1 202 555 0141' },
  { name: 'Carolina Mendes', phone: '+1 202 555 0176' },
  { name: 'Priya Nair', phone: '+1 202 555 0123' },
  { name: 'Lucas Martin', phone: '+1 202 555 0198' },
]

const HUB_CSS = `
  .landing .v16-brand .ch-hero { padding: 170px 0 96px; text-align: center; }
  .landing .v16-brand .ch-hero h1 { margin: 0 auto; max-width: 20ch; }
  .landing .v16-brand .ch-hero .lede { margin: 24px auto 0; max-width: 640px; }
  .landing .v16-brand .ch-hero .cal-crumbs { justify-content: center; }
  .landing .v16-brand .ch-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 32px auto 0; padding: 0; list-style: none; }
  .landing .v16-brand .ch-pills li { display: flex; align-items: center; gap: 8px; padding: 8px 15px 8px 9px; border-radius: 999px; background: rgba(255, 255, 255, .07); font-size: 14px; font-weight: 500; color: #e6e6e8; }
  .landing .v16-brand .ch-pills i { display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: rgba(43, 89, 255, .28); color: #a9bcff; font-style: normal; }
  .landing .v16-brand .ch-pills svg { width: 13px; height: 13px; }
  .landing .v16-brand .ch-ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 34px; }

  .landing .v16-brand .ch-stats { margin: 0; padding: 56px 0 40px; list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .landing .v16-brand .ch-stats li { padding: 0 28px; border-left: 1px solid var(--line); }
  .landing .v16-brand .ch-stats li:first-child { border-left: 0; }
  .landing .v16-brand .ch-stats strong { display: flex; align-items: center; gap: 8px; font-size: clamp(30px, 3.2vw, 42px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; color: var(--ink); }
  .landing .v16-brand .ch-stars { font-size: 16px; letter-spacing: 1px; color: #f5b301; }
  .landing .v16-brand .ch-stats span.ch-stat-label { display: block; margin-top: 8px; font-size: 14px; line-height: 1.45; color: var(--ink-3); }
  @media (max-width: 760px) { .landing .v16-brand .ch-stats { grid-template-columns: 1fr 1fr; gap: 28px 0; } .landing .v16-brand .ch-stats li { padding: 0 16px; } .landing .v16-brand .ch-stats li:nth-child(odd) { border-left: 0; } }

  .landing .v16-brand .ch-logos { overflow: hidden; padding: 12px 0 44px; border-bottom: 1px solid var(--line); -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
  .landing .v16-brand .ch-logos-track { display: flex; width: max-content; animation: ch-marquee 42s linear infinite; }
  .landing .v16-brand .ch-logos ul { display: flex; align-items: center; gap: 64px; margin: 0; padding: 0 64px 0 0; list-style: none; }
  .landing .v16-brand .ch-logos li { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .landing .v16-brand .ch-logos img { display: block; height: 34px; width: auto; }
  .landing .v16-brand .ch-logos span { font-size: 18px; font-weight: 700; letter-spacing: -.02em; color: var(--ink); white-space: nowrap; }
  @keyframes ch-marquee { to { transform: translateX(-50%); } }

  .landing .v16-brand .ch-intro { padding: 84px 0 36px; text-align: center; }
  .landing .v16-brand .ch-eyebrow { display: block; margin-bottom: 14px; font-size: 14px; font-weight: 600; color: #2b59ff; }
  .landing .v16-brand .ch-intro h2 { margin: 0 auto; max-width: 22ch; font-size: clamp(32px, 4vw, 52px); line-height: 1.08; letter-spacing: -.03em; color: var(--ink); }
  .landing .v16-brand .ch-intro h2 em { font-style: normal; color: #2b59ff; }
  .landing .v16-brand .ch-intro p { margin: 20px auto 0; max-width: 860px; font-size: 18px; line-height: 1.65; color: var(--ink-2); }
  .landing .v16-brand .ch-tabs { position: sticky; top: 121px; z-index: 20; display: flex; justify-content: center; gap: clamp(14px, 3.4vw, 52px); padding: 18px 16px; overflow-x: auto; scrollbar-width: none; background: #fff; box-shadow: 0 10px 28px -22px rgba(11, 11, 12, .35); }
  .landing .v16-brand .ch-tabs::-webkit-scrollbar { display: none; }
  .landing .v16-brand .ch-tabs a { flex-shrink: 0; padding: 4px 2px 10px; border-bottom: 2px solid transparent; font-size: 16px; font-weight: 600; color: var(--ink-2); white-space: nowrap; }
  .landing .v16-brand .ch-tabs a span { margin-right: 5px; font-family: var(--f-mono); font-size: 12px; font-weight: 500; color: var(--ink-3); }
  .landing .v16-brand .ch-tabs a.is-active, .landing .v16-brand .ch-tabs a:hover { color: #2b59ff; }
  .landing .v16-brand .ch-tabs a.is-active { border-bottom-color: #2b59ff; }
  .landing .v16-brand .ch-tabs a.is-active span { color: #2b59ff; }
  .landing .v16-brand .ch-tabs a:focus-visible { outline: 2px solid #2b59ff; outline-offset: 2px; }
  @media (max-width: 860px) { .landing .v16-brand .ch-tabs { position: static; justify-content: flex-start; box-shadow: none; } .landing .v16-brand .ch-tabs a { font-size: 14.5px; } }

  .landing .v16-brand .ch-feature { padding: clamp(72px, 9vw, 120px) 0; scroll-margin-top: 190px; overflow: hidden; }
  .landing .v16-brand .ch-split { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(36px, 5vw, 72px); align-items: center; }
  .landing .v16-brand .ch-split-flip { grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); }
  .landing .v16-brand .ch-split-flip .ch-copy { order: -1; }
  @media (max-width: 960px) { .landing .v16-brand .ch-split, .landing .v16-brand .ch-split-flip { grid-template-columns: minmax(0, 1fr); } .landing .v16-brand .ch-split-flip .ch-copy, .landing .v16-brand .ch-split .ch-copy { order: -1; } }
  .landing .v16-brand .ch-copy h2 { margin: 0; font-size: clamp(30px, 3.4vw, 44px); line-height: 1.1; letter-spacing: -.03em; color: var(--ink); }
  .landing .v16-brand .ch-copy h2 em { display: block; font-style: normal; color: #2b59ff; }
  .landing .v16-brand .ch-copy > p { margin: 18px 0 0; font-size: 17px; line-height: 1.65; color: var(--ink-2); }
  .landing .v16-brand .ch-ticks { margin: 22px 0 0; padding: 0; list-style: none; display: grid; gap: 11px; }
  .landing .v16-brand .ch-ticks li { position: relative; padding-left: 30px; font-size: 15.5px; line-height: 1.5; color: var(--ink-2); }
  .landing .v16-brand .ch-ticks li::before { content: '✓'; position: absolute; left: 0; top: 1px; width: 20px; height: 20px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; background: #2b59ff; }
  .landing .v16-brand .ch-more { display: inline-block; margin-top: 24px; font-size: 15.5px; font-weight: 600; color: #2b59ff; }
  .landing .v16-brand .ch-more:hover { text-decoration: underline; text-underline-offset: 3px; }
  .landing .v16-brand [data-tone='dark'] .ch-copy h2 { color: #fff; }
  .landing .v16-brand [data-tone='dark'] .ch-copy h2 em, .landing .v16-brand [data-tone='dark'] .ch-more { color: #9db2ff; }
  .landing .v16-brand [data-tone='dark'] .ch-copy > p, .landing .v16-brand [data-tone='dark'] .ch-ticks li { color: #d6d6da; }

  /* SIM demo: phone, moving signal, CRM card */
  .landing .v16-brand .ch-sim { display: grid; grid-template-columns: minmax(0, 248px) minmax(40px, 90px) minmax(0, 290px); align-items: center; justify-content: center; }
  .landing .v16-brand .ch-phone { padding: 26px 18px 22px; border-radius: 32px; background: #fff; border: 6px solid #26262c; text-align: center; color: #0b0b0c; }
  .landing .v16-brand .ch-avatar { position: relative; width: 74px; height: 74px; margin: 6px auto 12px; }
  .landing .v16-brand .ch-avatar img { position: relative; display: block; width: 74px; height: 74px; border-radius: 50%; object-fit: cover; }
  .landing .v16-brand .ch-avatar::before, .landing .v16-brand .ch-avatar::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: rgba(43, 89, 255, .3); animation: ch-pulse 2.4s ease-out infinite; }
  .landing .v16-brand .ch-avatar::after { animation-delay: 1.2s; }
  @keyframes ch-pulse { from { transform: scale(1); opacity: .9; } to { transform: scale(1.65); opacity: 0; } }
  .landing .v16-brand .ch-phone strong { display: block; font-size: 17px; }
  .landing .v16-brand .ch-phone small { display: block; margin-top: 3px; font-size: 13px; color: #55555c; }
  .landing .v16-brand .ch-wave { display: flex; align-items: center; justify-content: center; gap: 3px; height: 34px; margin: 16px 0; }
  .landing .v16-brand .ch-wave i { width: 3px; height: 100%; border-radius: 2px; background: #2b59ff; transform: scaleY(.3); animation: ch-wave 1.1s ease-in-out infinite alternate; }
  @keyframes ch-wave { to { transform: scaleY(1); } }
  .landing .v16-brand .ch-end { display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; margin: 0 auto; border-radius: 50%; color: #fff; background: #d92d20; }
  .landing .v16-brand .ch-end svg { transform: rotate(135deg); }
  .landing .v16-brand .ch-link { position: relative; height: 2px; background: rgba(157, 178, 255, .4); }
  .landing .v16-brand .ch-link::after { content: ''; position: absolute; top: -5px; left: 0; width: 12px; height: 12px; border-radius: 50%; background: #9db2ff; box-shadow: 0 0 14px #7c98ff; animation: ch-travel 2.2s ease-in-out infinite; }
  @keyframes ch-travel { 0% { left: 0; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: calc(100% - 12px); opacity: 0; } }
  .landing .v16-brand .ch-crm { padding: 20px; border-radius: 16px; background: #131318; border: 1px solid rgba(124, 152, 255, .45); box-shadow: 0 24px 60px -30px rgba(43, 89, 255, .9); color: #fff; }
  .landing .v16-brand .ch-crm-head { display: flex; justify-content: space-between; align-items: center; font-family: var(--f-mono); font-size: 12px; letter-spacing: .08em; color: #9db2ff; }
  .landing .v16-brand .ch-crm-logos { display: flex; gap: 6px; }
  .landing .v16-brand .ch-crm-logos img { display: block; width: 18px; height: 18px; object-fit: contain; }
  .landing .v16-brand .ch-crm > strong { display: block; margin: 12px 0 2px; font-size: 18px; }
  .landing .v16-brand .ch-crm > small { display: block; font-size: 13.5px; color: #b9b9c0; }
  .landing .v16-brand .ch-crm dl { margin: 12px 0 0; }
  .landing .v16-brand .ch-crm dl div { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-top: 1px solid rgba(255, 255, 255, .1); font-size: 13.5px; }
  .landing .v16-brand .ch-crm dt { color: #b9b9c0; }
  .landing .v16-brand .ch-crm dd { margin: 0; font-weight: 600; text-align: right; }
  @media (max-width: 620px) { .landing .v16-brand .ch-sim { grid-template-columns: minmax(0, 280px); gap: 0; } .landing .v16-brand .ch-link { width: 2px; height: 34px; margin: 0 auto; } .landing .v16-brand .ch-link::after { display: none; } }

  /* Real app screenshot with a floating animated card */
  .landing .v16-brand .ch-stage { position: relative; padding-bottom: 44px; }
  .landing .v16-brand .ch-shot { display: block; width: 100%; height: auto; border-radius: 14px; border: 1px solid var(--line); box-shadow: 0 30px 70px -36px rgba(43, 89, 255, .5); }
  .landing .v16-brand [data-tone='dark'] .ch-shot { border-color: rgba(255, 255, 255, .16); }
  .landing .v16-brand .ch-float { position: absolute; bottom: 0; width: min(340px, 70%); padding: 18px; border-radius: 14px; background: #fff; border: 1px solid rgba(43, 89, 255, .3); box-shadow: 0 24px 56px -22px rgba(11, 11, 12, .5); color: #0b0b0c; animation: ch-bob 5s ease-in-out infinite; }
  .landing .v16-brand .ch-float-right { right: -10px; }
  .landing .v16-brand .ch-float-left { left: -10px; }
  @keyframes ch-bob { 50% { transform: translateY(-8px); } }
  .landing .v16-brand .ch-float-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 14px; font-weight: 700; }
  .landing .v16-brand .ch-float-head small { font-family: var(--f-mono); font-size: 11.5px; font-weight: 500; color: #55555c; }
  .landing .v16-brand .ch-note { margin: 12px 0 0; font-size: 12.5px; color: var(--ink-3); }
  .landing .v16-brand [data-tone='dark'] .ch-note { color: #b9b9c0; }
  @media (max-width: 620px) { .landing .v16-brand .ch-stage { padding-bottom: 0; } .landing .v16-brand .ch-float { position: relative; left: 0; right: 0; bottom: 0; width: 100%; margin-top: 14px; animation: none; } }

  .landing .v16-brand .ch-channel { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid #e7e7ea; font-size: 14px; font-weight: 500; }
  .landing .v16-brand .ch-channel svg { width: 17px; height: 17px; color: #2b59ff; }
  .landing .v16-brand .ch-channel b { margin-left: auto; width: 9px; height: 9px; border-radius: 50%; background: #17a55c; animation: ch-blink 2.4s ease-in-out infinite; }
  .landing .v16-brand .ch-channel:nth-child(3) b { animation-delay: .5s; }
  .landing .v16-brand .ch-channel:nth-child(4) b { animation-delay: 1s; }
  @keyframes ch-blink { 50% { opacity: .25; } }

  /* Dialer queue: each row moves through queued, calling, saved */
  .landing .v16-brand .ch-dial-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 8px; border-radius: 8px; animation: ch-row 12s linear infinite; animation-delay: var(--d); }
  .landing .v16-brand .ch-dial-row strong { display: block; font-size: 13.5px; font-weight: 600; }
  .landing .v16-brand .ch-dial-row small { display: block; font-size: 12px; color: #55555c; }
  @keyframes ch-row { 0%, 24% { background: #eef2ff; } 25%, 100% { background: transparent; } }
  .landing .v16-brand .ch-status { position: relative; flex-shrink: 0; width: 66px; height: 22px; font-size: 11.5px; font-weight: 600; text-align: center; }
  .landing .v16-brand .ch-status span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; border-radius: 6px; opacity: 0; animation: 12s linear infinite; animation-delay: var(--d); }
  .landing .v16-brand .ch-st-q { color: #55555c; background: #f1f1f3; opacity: 1 !important; }
  .landing .v16-brand .ch-st-c { color: #fff; background: #2b59ff; animation-name: ch-st-c !important; }
  .landing .v16-brand .ch-st-s { color: #0b6b3a; background: #dcf5e6; animation-name: ch-st-s !important; }
  @keyframes ch-st-c { 0%, 24% { opacity: 1; } 25%, 100% { opacity: 0; } }
  @keyframes ch-st-s { 0%, 24% { opacity: 0; } 25%, 74% { opacity: 1; } 75%, 100% { opacity: 0; } }
  .landing .v16-brand .ch-progress { height: 4px; margin-top: 12px; border-radius: 2px; overflow: hidden; background: #e7e7ea; }
  .landing .v16-brand .ch-progress i { display: block; height: 100%; background: #2b59ff; transform-origin: left; animation: ch-progress 12s linear infinite; }
  @keyframes ch-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

  .landing .v16-brand .ch-player { display: flex; align-items: center; gap: 12px; }
  .landing .v16-brand .ch-play { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; color: #fff; background: #2b59ff; }
  .landing .v16-brand .ch-player .ch-wave { flex: 1; margin: 0; justify-content: space-between; }

  /* SIM vs virtual comparison: ink card, hairlines, mono labels, one blue accent */
  .landing .v16-brand .ch-compare-sec .sec-head h2 em { font-style: normal; color: #9db2ff; }
  .landing .v16-brand .ch-compare { max-width: 1040px; margin: 0 auto; border-radius: 16px; overflow: hidden; background: #111114; border: 1px solid rgba(255, 255, 255, .12); box-shadow: 0 30px 80px -40px rgba(43, 89, 255, .75); }
  .landing .v16-brand .ch-compare table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .landing .v16-brand .ch-compare thead th { padding: 26px 28px; text-align: left; vertical-align: middle; background: rgba(255, 255, 255, .03); border-bottom: 1px solid rgba(255, 255, 255, .12); }
  .landing .v16-brand .ch-compare thead th:first-child { width: 26%; }
  .landing .v16-brand .ch-compare-head { display: flex; align-items: center; gap: 14px; }
  .landing .v16-brand .ch-compare-icon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 10px; color: #fff; background: #2b59ff; }
  .landing .v16-brand .ch-compare-head strong { display: block; font-size: 18px; font-weight: 700; letter-spacing: -.02em; color: #fff; }
  .landing .v16-brand .ch-compare-head small { display: block; margin-top: 3px; font-family: var(--f-mono); font-size: 11.5px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: #b9b9c0; }
  .landing .v16-brand .ch-compare tbody th, .landing .v16-brand .ch-compare tbody td { padding: 22px 28px; text-align: left; vertical-align: middle; border-bottom: 1px solid rgba(255, 255, 255, .08); transition: background .2s; }
  .landing .v16-brand .ch-compare tbody tr:last-child > * { border-bottom: 0; }
  .landing .v16-brand .ch-compare tbody tr:hover > * { background: rgba(43, 89, 255, .1); }
  .landing .v16-brand .ch-compare tbody th { font-size: 14.5px; font-weight: 600; color: #fff; }
  .landing .v16-brand .ch-compare-row-icon { display: inline-flex; vertical-align: middle; margin-right: 10px; color: #9db2ff; }
  .landing .v16-brand .ch-compare-row-icon svg { width: 17px; height: 17px; }
  .landing .v16-brand .ch-compare tbody td { font-size: 15.5px; line-height: 1.5; color: #d6d6da; }
  .landing .v16-brand .ch-compare td + td, .landing .v16-brand .ch-compare thead th + th + th { border-left: 1px solid rgba(255, 255, 255, .08); }
  /* Phones: each row becomes its own block with the column name above each value. */
  @media (max-width: 720px) {
    .landing .v16-brand .ch-compare thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
    .landing .v16-brand .ch-compare table, .landing .v16-brand .ch-compare tbody, .landing .v16-brand .ch-compare tbody tr { display: block; }
    .landing .v16-brand .ch-compare tbody tr { padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, .1); }
    .landing .v16-brand .ch-compare tbody tr:last-child { border-bottom: 0; }
    .landing .v16-brand .ch-compare tbody th, .landing .v16-brand .ch-compare tbody td { display: block; padding: 0; border: 0; background: none !important; }
    .landing .v16-brand .ch-compare tbody th { margin-bottom: 14px; font-size: 16px; }
    .landing .v16-brand .ch-compare tbody td + td { margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, .08); border-left: 0; }
    .landing .v16-brand .ch-compare tbody td::before { content: attr(data-label); display: block; margin-bottom: 4px; font-family: var(--f-mono); font-size: 11px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: #9db2ff; }
  }

  /* Product cards */
  .landing .v16-brand .ch-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  @media (max-width: 960px) { .landing .v16-brand .ch-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 620px) { .landing .v16-brand .ch-cards { grid-template-columns: minmax(0, 1fr); } }
  .landing .v16-brand .ch-card { display: flex; flex-direction: column; padding: 26px; border-radius: 16px; background: var(--paper); border: 1px solid var(--line); color: var(--ink); transition: border-color .2s, transform .2s, box-shadow .2s; }
  .landing .v16-brand .ch-card:hover { border-color: #2b59ff; transform: translateY(-3px); box-shadow: 0 18px 40px -26px rgba(43, 89, 255, .55); }
  .landing .v16-brand .ch-card:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .ch-card-icon { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; margin-bottom: 20px; border-radius: 10px; color: #2b59ff; background: #eef2ff; border: 1px solid #d5ddff; transition: background .2s, color .2s, border-color .2s; }
  .landing .v16-brand .ch-card:hover .ch-card-icon { color: #fff; background: #2b59ff; border-color: #2b59ff; }
  .landing .v16-brand .aia-sec .sec-head .ch-eyebrow { margin-bottom: 12px; }

  /* FAQ on white. 10 questions split 5 + 5, so phones show the first column before Read more. */
  .landing .v16-brand .ch-faq-sec .aia-faq details { background: var(--paper); }
  .landing .v16-brand .ch-faq-sec .aia-faq summary:hover { color: #2b59ff; }

  .landing .v16-brand .final-cta .sub { text-align: center; text-align-last: center; word-spacing: normal; }
  .landing .v16-brand .ch-cta-facts { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 28px; margin: 28px 0 0; padding: 0; list-style: none; font-family: var(--f-mono); font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: #d6d6da; }
  .landing .v16-brand .ch-cta-facts li { display: flex; align-items: center; gap: 8px; }
  .landing .v16-brand .ch-cta-facts li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #7c98ff; }
  .landing .v16-brand .ch-card h3 { margin: 0 0 8px; font-size: 18px; color: var(--ink); }
  .landing .v16-brand .ch-card p { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ink-3); }
  .landing .v16-brand .ch-card span.ch-card-more { margin-top: auto; padding-top: 16px; font-size: 14.5px; font-weight: 600; color: #2b59ff; }

  /* Scroll entrance in supporting browsers only; content is never hidden without it. */
  @supports (animation-timeline: view()) {
    .landing .v16-brand .ch-rise { animation: ch-rise linear both; animation-timeline: view(); animation-range: entry 0% entry 35%; }
    @keyframes ch-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
  }
  @media (prefers-reduced-motion: reduce) {
    .landing .v16-brand .ch-logos-track, .landing .v16-brand .ch-avatar::before, .landing .v16-brand .ch-avatar::after, .landing .v16-brand .ch-wave i, .landing .v16-brand .ch-link::after, .landing .v16-brand .ch-float, .landing .v16-brand .ch-channel b, .landing .v16-brand .ch-dial-row, .landing .v16-brand .ch-status span, .landing .v16-brand .ch-progress i, .landing .v16-brand .ch-rise { animation: none !important; }
    .landing .v16-brand .ch-wave i { transform: scaleY(.6); }
    .landing .v16-brand .ch-progress i { transform: scaleX(.4); }
    .landing .v16-brand .ch-rise { opacity: 1; transform: none; }
  }
`

export const WAVE = [40, 75, 55, 100, 65, 85, 45, 90, 60, 100, 50, 80, 40, 70, 55, 90]

export function Wave() {
  return (
    <div className="ch-wave" aria-hidden="true">
      {WAVE.map((h, i) => (
        <i key={i} style={{ height: `${h}%`, animationDelay: `${(i % 7) * 0.12}s` }} />
      ))}
    </div>
  )
}

const CALLING_EXTRA_CSS = `
  /* Inner-page hero pills: homepage pill style, left-aligned */
  .landing .v16-brand .ch-pills.ch-pills-left { justify-content: flex-start; gap: 8px; margin: 26px 0 0; }
  .landing .v16-brand .ch-pills-left li { gap: 7px; padding: 6px 13px 6px 7px; font-size: 13.5px; }
  .landing .v16-brand .ch-pills-left i { width: 20px; height: 20px; }
  .landing .v16-brand .ch-pills-left svg { width: 11px; height: 11px; }
  .landing .v16-brand .ch-pills-left .ch-flag { display: block; flex-shrink: 0; width: 20px; height: 15px; margin-left: 3px; border-radius: 3px; object-fit: cover; }

  /* Static version of the floating demo cards, for inner-page heroes */
  .landing .v16-brand .ch-float.ch-static { position: relative; left: auto; right: auto; bottom: auto; width: 100%; max-width: 440px; margin: 0 auto; padding: 22px; }
  .landing .v16-brand .ch-hero-demo { display: grid; gap: 14px; text-align: left; }
  @media (min-width: 621px) { .landing .v16-brand .ch-hero-demo .ch-sim { grid-template-columns: minmax(0, 230px) minmax(24px, 48px) minmax(0, 270px); } }
  .landing .v16-brand .cal-row.ch-row-live { animation: ch-row 12s linear infinite; animation-delay: var(--d); }

  /* Inner-page screenshot band */
  .landing .v16-brand .ch-shot-sec { padding: clamp(72px, 9vw, 112px) 0; }
  .landing .v16-brand .ch-shot-sec .sec-head h2 { color: #fff; }
  .landing .v16-brand .ch-shot-wide { max-width: 1100px; margin: 0 auto; }
  .landing .v16-brand .ch-shot-wide figcaption { margin-top: 14px; text-align: center; font-size: 13px; color: #b9b9c0; }

  /* Feature number tile */
  .landing .v16-brand .ch-card-num { font-family: var(--f-mono); font-size: 14px; font-weight: 600; }
  .landing .v16-brand article.ch-card:hover { transform: translateY(-3px); }

  /* Dark verdict cards under the comparison table */
  .landing .v16-brand .ch-verdicts { max-width: 1040px; margin: 16px auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
  .landing .v16-brand .ch-verdict { padding: 24px; border-radius: 16px; background: #111114; border: 1px solid rgba(255, 255, 255, .12); }
  .landing .v16-brand .ch-verdict h3 { margin: 0 0 8px; font-size: 17px; color: #fff; }
  .landing .v16-brand .ch-verdict p { margin: 0; font-size: 15px; line-height: 1.6; color: #d6d6da; }
  .landing .v16-brand .ch-compare thead th strong.ch-compare-plain { font-size: 17px; font-weight: 700; color: #fff; }

  /* FAQ: phones always show the first 5 questions, whichever column they sit in */
  @media (max-width: 860px) {
    .landing .v16-brand .ch-faq-wrap .aia-mmore:not(.is-open) .aia-faq-col + .aia-faq-col { display: grid; }
    .landing .v16-brand .ch-faq-wrap .aia-mmore:not(.is-open) details[data-more] { display: none; }
  }
  @media (prefers-reduced-motion: reduce) { .landing .v16-brand .cal-row.ch-row-live { animation: none; } }
`

export const CALLING_DESIGN_CSS = HUB_CSS + CALLING_EXTRA_CSS

export function CallingProof({ ui }: { ui: CallingUi }) {
  return (
    <section aria-label={ui.common.proofAria}>
      <div className="container">
        <ul className="ch-stats">
          {ui.stats.map((s, i) => (
            <li key={s.label}>
              <strong>{s.value}{i === 0 && <span className="ch-stars" aria-hidden="true">★★★★★</span>}</strong>
              <span className="ch-stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="ch-logos">
        <div className="ch-logos-track">
          {[false, true].map((copy) => (
            <ul key={String(copy)} aria-hidden={copy || undefined}>
              {LOGOS.map((l) => (
                <li key={l.name}>
                  <img src={l.src} alt={l.name} width={l.w} height={l.h} loading="lazy" decoding="async" />
                  {l.showName && <span>{l.name}</span>}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SimDemo({ ui }: { ui: CallingUi }) {
  return (
    <div className="ch-sim" aria-hidden="true">
      <div className="ch-phone">
        <div className="ch-avatar"><img src="/homepage-v16/avatars/carolina-mendes.webp" alt="Carolina Mendes" width={74} height={74} loading="lazy" decoding="async" /></div>
        <strong>Carolina Mendes</strong>
        <small>{ui.demo.simCall}</small>
        <Wave />
        <span className="ch-end">{svg(PHONE)}</span>
      </div>
      <div className="ch-link" />
      <div className="ch-crm">
        <div className="ch-crm-head">
          <span>{ui.demo.crmRecord}</span>
          <span className="ch-crm-logos">
            <img src="/homepage/crm-logos/hubspot.webp" alt="HubSpot" width={18} height={18} loading="lazy" />
            <img src="/homepage/crm-logos/salesforce.webp" alt="Salesforce" width={18} height={18} loading="lazy" />
            <img src="/homepage/crm-logos/zoho.webp" alt="Zoho" width={18} height={18} loading="lazy" />
          </span>
        </div>
        <strong>Carolina Mendes</strong>
        <small>{ui.demo.logged}</small>
        <dl>
          <div><dt>{ui.demo.rowCallType}</dt><dd>{ui.demo.rowCallTypeValue}</dd></div>
          <div><dt>{ui.demo.rowTime}</dt><dd>{ui.demo.rowTimeValue}</dd></div>
          <div><dt>{ui.demo.rowLength}</dt><dd>{ui.demo.rowLengthValue}</dd></div>
          <div><dt>{ui.demo.rowWhatsapp}</dt><dd>{ui.demo.rowWhatsappValue}</dd></div>
        </dl>
      </div>
    </div>
  )
}

export function ChannelCard({ className, ui }: { className: string; ui: CallingUi }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="ch-float-head">{ui.demo.lineHead} <small>+1 202 555 0110</small></div>
      <div className="ch-channel">{svg(PHONE)} {ui.demo.lineVoice} <b /></div>
      <div className="ch-channel">{svg(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />)} {ui.demo.lineSms} <b /></div>
      <div className="ch-channel">{svg(<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />)} {ui.demo.lineWhatsapp} <b /></div>
    </div>
  )
}

export function DialCard({ className, ui }: { className: string; ui: CallingUi }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="ch-float-head">{ui.demo.dialHead} <small>{ui.demo.dialSub}</small></div>
      {DIAL_ROWS.map((r, i) => {
        const d = { ['--d' as string]: `${i * 3}s` }
        return (
          <div key={r.name} className="ch-dial-row" style={d}>
            <div><strong>{r.name}</strong><small>{r.phone}</small></div>
            <div className="ch-status" style={d}>
              <span className="ch-st-q">{ui.demo.dialQueued}</span>
              <span className="ch-st-c">{ui.demo.dialCalling}</span>
              <span className="ch-st-s">{ui.demo.dialSaved}</span>
            </div>
          </div>
        )
      })}
      <div className="ch-progress"><i /></div>
    </div>
  )
}

export function PlayerCard({ className, ui, time = '01:48' }: { className: string; ui: CallingUi; time?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="ch-float-head">{ui.demo.playerHead} <small>{time}</small></div>
      <div className="ch-player">
        <span className="ch-play">{svg(<path d="M6 4l14 8-14 8V4z" fill="currentColor" />)}</span>
        <Wave />
      </div>
    </div>
  )
}

type CompareHead = { label: string; sub?: string; icon?: ReactNode }

/** Brand comparison table. Stays a real table; phones get one block per row. */
export function CompareTable({ heads, rows, rowIcons, factorHeader }: { heads: [CompareHead, CompareHead]; rows: [string, string, string][]; rowIcons?: ReactNode[]; factorHeader: string }) {
  return (
    <div className="ch-compare ch-rise">
      <table>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">{factorHeader}</span></th>
            {heads.map((h) => (
              <th key={h.label} scope="col">
                {h.icon ? (
                  <span className="ch-compare-head">
                    <span className="ch-compare-icon">{h.icon}</span>
                    <span>
                      <strong>{h.label}</strong>
                      {h.sub && <small>{h.sub}</small>}
                    </span>
                  </span>
                ) : (
                  <strong className="ch-compare-plain">{h.label}</strong>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c], i) => (
            <tr key={a}>
              <th scope="row">{rowIcons?.[i] && <span className="ch-compare-row-icon">{rowIcons[i]}</span>}{a}</th>
              <td data-label={heads[0].label}>{b}</td>
              <td data-label={heads[1].label}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Two columns on desktop, closed by default; phones show the first 5 before Read more. */
export function CallingFaq({ faq, ui }: { faq: { q: string; a: string }[]; ui: CallingUi }) {
  const half = Math.ceil(faq.length / 2)
  return (
    <div className="ch-faq-wrap">
      <MobileMore more={ui.common.readMore} less={ui.common.showLess}>
        <div className="aia-faq">
          {[faq.slice(0, half), faq.slice(half)].map((col, c) => (
            <div key={c} className="aia-faq-col">
              {col.map((f, i) => (
                <details key={f.q} data-more={(c === 0 ? i : half + i) >= 5 ? '' : undefined}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </MobileMore>
    </div>
  )
}
