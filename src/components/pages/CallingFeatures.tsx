import type { ReactNode } from 'react'
import { PHONE, Wave, svg } from '@/components/pages/CallingShared'
import { callingPath, type CallingCard } from '@/data/calling-content'
import { localePrefix } from '@/data/calling-i18n'
import type { CallingUi } from '@/data/calling-ui'

// Illustrative mini-scene inside each feature card, in the same order as that page's cards.
type Kind = 'ring' | 'bubbles' | 'whatsapp' | 'api' | 'shield' | 'owner' | 'upload' | 'crm' | 'queue' | 'globe' | 'wave' | 'outcome' | 'clock' | 'bars' | 'signal' | 'number' | 'compare'

const VISUALS: Record<string, Kind[]> = {
  'auto-dialer': ['upload', 'crm', 'queue', 'number', 'wave', 'outcome'],
  'virtual-phone-number': ['ring', 'bubbles', 'whatsapp', 'api', 'shield', 'owner'],
  'call-tracking': ['clock', 'bars', 'outcome', 'ring', 'crm', 'whatsapp'],
  'sim-based-calling': ['signal', 'number', 'crm', 'whatsapp', 'bars', 'ring'],
  'call-recording': ['crm', 'outcome', 'queue', 'whatsapp', 'wave', 'owner'],
  'sim-vs-cloud-calling': ['signal', 'bars', 'number', 'owner', 'ring', 'globe'],
}

export const CALLING_FEATURES_CSS = `
  .landing .v16-brand .cv-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px; }
  .landing .v16-brand .cv-card { grid-column: span 4; display: flex; flex-direction: column; overflow: hidden; border-radius: 16px; background: var(--paper); border: 1px solid var(--line); transition: border-color .2s, transform .2s, box-shadow .2s; }
  .landing .v16-brand .cv-card:nth-child(1) { grid-column: span 7; }
  .landing .v16-brand .cv-card:nth-child(2) { grid-column: span 5; }
  .landing .v16-brand .cv-card:hover { border-color: #2b59ff; transform: translateY(-3px); box-shadow: 0 18px 40px -26px rgba(43, 89, 255, .55); }
  .landing .v16-brand .cv-stage { position: relative; display: flex; align-items: center; justify-content: center; height: 176px; padding: 18px; overflow: hidden; color: #0b0b0c; background-color: var(--bg-2); background-image: radial-gradient(rgba(11, 11, 12, .1) 1px, transparent 1px); background-size: 18px 18px; border-bottom: 1px solid var(--line); }
  .landing .v16-brand .cv-body { padding: 22px 24px 26px; }
  .landing .v16-brand .cv-body h3 { margin: 0 0 8px; font-size: 18px; letter-spacing: -.02em; color: var(--ink); }
  .landing .v16-brand .cv-body p { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ink-3); }
  /* Lead card: ink with the dot grid */
  .landing .v16-brand .cv-card:nth-child(1) { background: #0b0b0c; border-color: #0b0b0c; }
  .landing .v16-brand .cv-card:nth-child(1) .cv-stage { height: 208px; background-color: #111114; background-image: radial-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px); border-bottom-color: rgba(255, 255, 255, .1); }
  .landing .v16-brand .cv-card:nth-child(1) .cv-body h3 { font-size: 22px; color: #fff; }
  .landing .v16-brand .cv-card:nth-child(1) .cv-body p { font-size: 16px; color: #d6d6da; }
  .landing .v16-brand .cv-card:nth-child(2) .cv-stage { height: 208px; }
  /* Closing card: full width, ink, scene beside the text */
  @media (min-width: 961px) {
    .landing .v16-brand .cv-card:nth-child(6) { grid-column: span 12; flex-direction: row; align-items: stretch; background: #0b0b0c; border-color: #0b0b0c; }
    .landing .v16-brand .cv-card:nth-child(6) .cv-stage { flex: 0 0 50%; height: auto; min-height: 176px; background-color: #111114; background-image: radial-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px); border-bottom: 0; border-right: 1px solid rgba(255, 255, 255, .1); }
    .landing .v16-brand .cv-card:nth-child(6) .cv-body { align-self: center; padding: 28px 36px; }
    .landing .v16-brand .cv-card:nth-child(6) .cv-body h3 { font-size: 22px; color: #fff; }
    .landing .v16-brand .cv-card:nth-child(6) .cv-body p { font-size: 16px; color: #d6d6da; }
  }
  @media (max-width: 960px) { .landing .v16-brand .cv-card, .landing .v16-brand .cv-card:nth-child(1), .landing .v16-brand .cv-card:nth-child(2) { grid-column: span 6; } }
  @media (max-width: 620px) { .landing .v16-brand .cv-card, .landing .v16-brand .cv-card:nth-child(1), .landing .v16-brand .cv-card:nth-child(2) { grid-column: span 12; } }

  /* Hub product grid: whole card is the link */
  .landing .v16-brand a.cv-card-link { color: inherit; }
  .landing .v16-brand a.cv-card-link:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .cv-card-link .rv-more { display: inline-block; margin-top: 12px; font-size: 14.5px; font-weight: 600; color: #2b59ff; }
  .landing .v16-brand .cv-card-link:hover .rv-more { text-decoration: underline; text-underline-offset: 3px; }
  .landing .v16-brand .cv-card-link:nth-child(1) .rv-more { color: #9db2ff; }
  @media (min-width: 961px) { .landing .v16-brand .cv-card-link:nth-child(6) .rv-more { color: #9db2ff; } }
  /* Two options taking turns in the spotlight */
  .landing .v16-brand .cv-alt { animation: cv-alt 6s ease-in-out infinite; animation-delay: var(--d, 0s); }
  @keyframes cv-alt { 0%, 40% { border-color: #2b59ff; box-shadow: 0 0 0 3px rgba(43, 89, 255, .22); } 50%, 100% { border-color: #e7e7ea; box-shadow: none; } }

  /* Related pages */
  .landing .v16-brand .ch-related-link { color: #2b59ff; text-decoration: underline; text-underline-offset: 3px; }
  .landing .v16-brand .rv-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 16px; }
  .landing .v16-brand .rv-card { display: flex; overflow: hidden; border-radius: 16px; color: inherit; background: var(--paper); border: 1px solid var(--line); transition: border-color .2s, transform .2s, box-shadow .2s; }
  .landing .v16-brand .rv-card:hover { border-color: #2b59ff; transform: translateY(-3px); box-shadow: 0 18px 40px -26px rgba(43, 89, 255, .55); }
  .landing .v16-brand .rv-card:focus-visible { outline: 2px solid #2b59ff; outline-offset: 3px; }
  .landing .v16-brand .rv-card .cv-stage { flex: 0 0 46%; height: auto; min-height: 176px; border-bottom: 0; border-right: 1px solid var(--line); }
  .landing .v16-brand .rv-card .cv-body { align-self: center; }
  .landing .v16-brand .rv-more { display: inline-block; margin-top: 12px; font-size: 14.5px; font-weight: 600; color: #2b59ff; }
  .landing .v16-brand .rv-card:hover .rv-more { text-decoration: underline; text-underline-offset: 3px; }
  /* First card: tall, ink, scene above the text */
  .landing .v16-brand .rv-card:first-child { grid-row: span 2; flex-direction: column; background: #0b0b0c; border-color: #0b0b0c; }
  .landing .v16-brand .rv-card:first-child .cv-stage { flex: 1 1 auto; min-height: 240px; background-color: #111114; background-image: radial-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px); border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, .1); }
  .landing .v16-brand .rv-card:first-child .cv-body { align-self: stretch; }
  .landing .v16-brand .rv-card:first-child .cv-body h3 { font-size: 22px; color: #fff; }
  .landing .v16-brand .rv-card:first-child .cv-body p { font-size: 16px; color: #d6d6da; }
  .landing .v16-brand .rv-card:first-child .rv-more { color: #9db2ff; }
  @media (max-width: 860px) { .landing .v16-brand .rv-grid { grid-template-columns: minmax(0, 1fr); } .landing .v16-brand .rv-card, .landing .v16-brand .rv-card:first-child { flex-direction: column; grid-row: auto; } .landing .v16-brand .rv-card .cv-stage { flex: none; height: 176px; min-height: 0; border-right: 0; border-bottom: 1px solid var(--line); } .landing .v16-brand .rv-card .cv-body { align-self: stretch; } }

  .landing .v16-brand .cv-pill { position: relative; display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; background: #fff; border: 1px solid #e7e7ea; box-shadow: 0 14px 34px -22px rgba(11, 11, 12, .6); color: #0b0b0c; }
  .landing .v16-brand .cv-pill strong { display: block; font-size: 14px; font-weight: 600; white-space: nowrap; }
  .landing .v16-brand .cv-pill small { display: block; margin-top: 1px; font-size: 12px; color: #55555c; white-space: nowrap; }
  .landing .v16-brand .cv-pill .ch-wave { width: 84px; height: 26px; margin: 0; }
  .landing .v16-brand .cv-tile { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; color: #fff; background: #2b59ff; }
  .landing .v16-brand .cv-avatar { flex-shrink: 0; display: block; width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
  .landing .v16-brand .cv-dot { flex-shrink: 0; width: 9px; height: 9px; border-radius: 50%; background: #17a55c; animation: ch-blink 2.2s ease-in-out infinite; }
  .landing .v16-brand .cv-stack { display: grid; gap: 8px; width: min(300px, 100%); }

  /* Pulse behind an avatar or tile */
  .landing .v16-brand .cv-pulse { position: relative; flex-shrink: 0; display: block; }
  .landing .v16-brand .cv-pulse::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: rgba(43, 89, 255, .35); animation: ch-pulse 2.2s ease-out infinite; }
  .landing .v16-brand .cv-pulse > * { position: relative; }

  /* Message bubbles appear in turn */
  .landing .v16-brand .cv-bubble { max-width: 82%; padding: 9px 12px; border-radius: 10px; font-size: 13px; line-height: 1.35; color: #0b0b0c; background: #fff; border: 1px solid #e7e7ea; animation: cv-pop 6s ease-out infinite both; animation-delay: var(--d, 0s); }
  .landing .v16-brand .cv-bubble-out { justify-self: end; color: #fff; background: #2b59ff; border-color: #2b59ff; }
  .landing .v16-brand .cv-bubble-wa { justify-self: end; background: #d9fdd3; border-color: #c4efbd; }
  .landing .v16-brand .cv-ticks { margin-left: 6px; color: #2b59ff; font-size: 11px; }
  @keyframes cv-pop { 0% { opacity: 0; transform: translateY(8px); } 8%, 86% { opacity: 1; transform: none; } 100% { opacity: 0; } }

  /* Connection bars shimmer */
  .landing .v16-brand .cv-code { display: grid; gap: 7px; width: min(280px, 100%); padding: 16px; border-radius: 12px; background: #0b0b0c; border: 1px solid rgba(255, 255, 255, .12); }
  .landing .v16-brand .cv-code-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-family: var(--f-mono); font-size: 11.5px; color: #d6d6da; }
  .landing .v16-brand .cv-code i { display: block; height: 7px; border-radius: 4px; background: #7c98ff; transform-origin: left; animation: cv-grow 3s ease-in-out infinite alternate; animation-delay: var(--d, 0s); }
  @keyframes cv-grow { from { transform: scaleX(.35); opacity: .45; } to { transform: scaleX(1); opacity: 1; } }

  /* Shield check draws itself */
  .landing .v16-brand .cv-shield { width: 58px; height: 58px; color: #2b59ff; }
  .landing .v16-brand .cv-shield path + path { stroke-dasharray: 30; animation: cv-draw 3.2s ease-in-out infinite; }
  @keyframes cv-draw { 0% { stroke-dashoffset: 30; } 45%, 100% { stroke-dashoffset: 0; } }

  /* Two people, one number */
  .landing .v16-brand .cv-swap { position: relative; flex-shrink: 0; width: 40px; height: 40px; }
  .landing .v16-brand .cv-swap img { position: absolute; inset: 0; animation: cv-fade-a 7s ease-in-out infinite; }
  .landing .v16-brand .cv-swap img + img { animation-name: cv-fade-b; }
  @keyframes cv-fade-a { 0%, 42% { opacity: 1; } 50%, 92% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes cv-fade-b { 0%, 42% { opacity: 0; } 50%, 92% { opacity: 1; } 100% { opacity: 0; } }

  /* Logos and sync link */
  .landing .v16-brand .cv-logos { display: flex; align-items: center; gap: 12px; }
  .landing .v16-brand .cv-logo { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 12px; background: #fff; border: 1px solid #e7e7ea; box-shadow: 0 12px 26px -20px rgba(11, 11, 12, .7); animation: ch-bob 4s ease-in-out infinite; animation-delay: var(--d, 0s); }
  .landing .v16-brand .cv-logo img { display: block; width: 28px; height: 28px; object-fit: contain; }
  .landing .v16-brand .cv-link { position: relative; width: 70px; height: 2px; background: rgba(43, 89, 255, .3); }
  .landing .v16-brand .cv-link::after { content: ''; position: absolute; top: -4px; left: 0; width: 10px; height: 10px; border-radius: 50%; background: #2b59ff; animation: ch-travel 2.2s ease-in-out infinite; }

  /* List rolling up */
  .landing .v16-brand .cv-roll { width: min(290px, 100%); height: 140px; overflow: hidden; -webkit-mask-image: linear-gradient(transparent, #000 18%, #000 82%, transparent); mask-image: linear-gradient(transparent, #000 18%, #000 82%, transparent); }
  .landing .v16-brand .cv-roll-track { display: grid; gap: 8px; animation: cv-roll 9s linear infinite; }
  @keyframes cv-roll { to { transform: translateY(-50%); } }

  /* Globe with pins */
  .landing .v16-brand .cv-globe { position: relative; width: 112px; height: 112px; color: #2b59ff; }
  .landing .v16-brand .cv-globe > svg { width: 100%; height: 100%; }
  .landing .v16-brand .cv-pin { position: absolute; width: 11px; height: 11px; border-radius: 50%; background: #2b59ff; box-shadow: 0 0 0 4px rgba(43, 89, 255, .2); animation: ch-blink 2.4s ease-in-out infinite; animation-delay: var(--d, 0s); }

  /* Outcomes cycle */
  .landing .v16-brand .cv-chips { position: relative; width: 150px; height: 32px; }
  .landing .v16-brand .cv-chips span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 13px; font-weight: 600; color: #fff; background: #2b59ff; opacity: 0; animation: cv-chip 9s linear infinite; animation-delay: var(--d, 0s); }
  @keyframes cv-chip { 0%, 30% { opacity: 1; } 33%, 100% { opacity: 0; } }

  /* Clock hand */
  .landing .v16-brand .cv-clock { position: relative; width: 104px; height: 104px; border-radius: 50%; background: #fff; border: 2px solid #2b59ff; box-shadow: 0 14px 34px -20px rgba(43, 89, 255, .9); }
  .landing .v16-brand .cv-clock i { position: absolute; left: calc(50% - 1.5px); bottom: 50%; width: 3px; height: 38px; border-radius: 2px; background: #2b59ff; transform-origin: bottom; animation: cv-spin 8s linear infinite; }
  .landing .v16-brand .cv-clock i + i { height: 24px; background: #0b0b0c; animation-duration: 48s; }
  @keyframes cv-spin { to { transform: rotate(360deg); } }

  /* Bars and signal */
  .landing .v16-brand .cv-bars { display: flex; align-items: flex-end; gap: 10px; height: 112px; }
  .landing .v16-brand .cv-bars i { display: block; width: 24px; border-radius: 5px 5px 0 0; background: #2b59ff; transform-origin: bottom; animation: ch-wave 1.8s ease-in-out infinite alternate; animation-delay: var(--d, 0s); }
  .landing .v16-brand .cv-signal { display: flex; align-items: flex-end; gap: 6px; height: 48px; }
  .landing .v16-brand .cv-signal i { display: block; width: 9px; border-radius: 3px; background: #2b59ff; animation: ch-blink 2.2s ease-in-out infinite; animation-delay: var(--d, 0s); }

  @media (prefers-reduced-motion: reduce) { .landing .v16-brand .cv-stage * { animation: none !important; } .landing .v16-brand .cv-stage *::before, .landing .v16-brand .cv-stage *::after { animation: none !important; } .landing .v16-brand .cv-bubble, .landing .v16-brand .cv-chips span:first-child { opacity: 1; } }
`

const SAMPLE_ROWS = [
  { name: 'Ahmed Khan', img: 'ahmed-khan', note: 'rowCallBack' },
  { name: 'Carolina Mendes', img: 'carolina-mendes', note: 'rowQuoteSent' },
  { name: 'Priya Rao', img: 'priya-rao', note: 'rowNextUp' },
]

// The file name is the sample person's name: 'ahmed-khan' becomes 'Ahmed Khan'.
const personName = (file: string) => file.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ')
const avatar = (name: string) => <img className="cv-avatar" src={`/homepage-v16/avatars/${name}.webp`} alt={personName(name)} width={40} height={40} loading="lazy" decoding="async" />
const logo = (src: string, alt: string, d = '0s') => (
  <span className="cv-logo" style={{ ['--d' as string]: d }}><img src={src} alt={alt} width={28} height={28} loading="lazy" decoding="async" /></span>
)
const WHATSAPP_LOGO = '/homepage-v16/img/6a67410485ac.webp'
const SHEETS_LOGO = '/homepage-v16/img/c617aff437b0.webp'

function Visual({ kind, ui }: { kind: Kind; ui: CallingUi }): ReactNode {
  const v = ui.visual
  switch (kind) {
    case 'ring':
      return (
        <div className="cv-pill">
          <span className="cv-pulse" style={{ borderRadius: '50%' }}>{avatar('carolina-mendes')}</span>
          <div><strong>Carolina Mendes</strong><small>{v.businessCall}</small></div>
          <Wave />
        </div>
      )
    case 'bubbles':
      return (
        <div className="cv-stack">
          <div className="cv-bubble" style={{ ['--d' as string]: '0s' }}>{v.smsAsk}</div>
          <div className="cv-bubble cv-bubble-out" style={{ ['--d' as string]: '.7s' }}>{v.smsReply}</div>
          <div className="cv-bubble" style={{ ['--d' as string]: '1.4s' }}>{v.smsThanks}</div>
        </div>
      )
    case 'whatsapp':
      return (
        <div className="cv-stack">
          <div className="cv-logos">{logo(WHATSAPP_LOGO, 'WhatsApp')}<div className="cv-bubble" style={{ ['--d' as string]: '0s' }}>{v.waAsk}</div></div>
          <div className="cv-bubble cv-bubble-wa" style={{ ['--d' as string]: '.8s' }}>{v.waReply}<span className="cv-ticks">✓✓</span></div>
        </div>
      )
    case 'api':
      return (
        <div className="cv-code">
          <div className="cv-code-head"><span>{v.apiHead}</span><span className="cv-dot" /></div>
          <i style={{ width: '92%', ['--d' as string]: '0s' }} />
          <i style={{ width: '68%', ['--d' as string]: '.5s' }} />
          <i style={{ width: '82%', ['--d' as string]: '1s' }} />
          <i style={{ width: '50%', ['--d' as string]: '1.5s' }} />
        </div>
      )
    case 'shield':
      return (
        <div className="cv-pill">
          <svg className="cv-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" strokeWidth="2" /></svg>
          <div><strong>{v.verified}</strong><small>+1 202 555 0110</small></div>
        </div>
      )
    case 'owner':
      return (
        <div className="cv-pill">
          <span className="cv-swap">{avatar('arjun')}{avatar('meera')}</span>
          <div><strong>+1 202 555 0110</strong><small>{v.ownerSub}</small></div>
          <span className="cv-dot" />
        </div>
      )
    case 'upload':
      return (
        <div className="cv-pill">
          {logo(SHEETS_LOGO, 'Google Sheets')}
          <div><strong>contacts.csv</strong><small>{v.uploadSub}</small></div>
          <span className="cv-dot" />
        </div>
      )
    case 'crm':
      return (
        <div className="cv-logos">
          <span className="cv-tile">{svg(PHONE)}</span>
          <span className="cv-link" />
          {logo('/homepage/crm-logos/hubspot.webp', 'HubSpot')}
          {logo('/homepage/crm-logos/zoho.webp', 'Zoho', '.6s')}
        </div>
      )
    case 'queue':
      return (
        <div className="cv-roll">
          <div className="cv-roll-track">
            {[...SAMPLE_ROWS, ...SAMPLE_ROWS].map((r, i) => (
              <div key={i} className="cv-pill" style={{ padding: '8px 12px' }}>
                {avatar(r.img)}
                <div><strong>{r.name}</strong><small>{v[r.note as 'rowCallBack' | 'rowQuoteSent' | 'rowNextUp']}</small></div>
              </div>
            ))}
          </div>
        </div>
      )
    case 'globe':
      return (
        <div className="cv-globe">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
          <span className="cv-pin" style={{ top: '26%', left: '24%' }} />
          <span className="cv-pin" style={{ top: '54%', left: '62%', ['--d' as string]: '.8s' }} />
          <span className="cv-pin" style={{ top: '30%', left: '70%', ['--d' as string]: '1.6s' }} />
        </div>
      )
    case 'wave':
      return (
        <div className="cv-pill">
          <span className="cv-tile" style={{ borderRadius: '50%' }}>{svg(<path d="M6 4l14 8-14 8V4z" fill="currentColor" />)}</span>
          <Wave />
          <small>03:27</small>
        </div>
      )
    case 'outcome':
      return (
        <div className="cv-pill">
          {avatar('ahmed-khan')}
          <div className="cv-chips">
            <span style={{ ['--d' as string]: '0s' }}>{v.outcomeMeeting}</span>
            <span style={{ ['--d' as string]: '3s' }}>{v.outcomeCallBack}</span>
            <span style={{ ['--d' as string]: '6s' }}>{v.outcomeQuote}</span>
          </div>
        </div>
      )
    case 'clock':
      return <div className="cv-clock"><i /><i /></div>
    case 'bars':
      return (
        <div className="cv-bars">
          {[45, 80, 60, 100, 70].map((h, i) => <i key={i} style={{ height: `${h}%`, ['--d' as string]: `${i * 0.2}s` }} />)}
        </div>
      )
    case 'signal':
      return (
        <div className="cv-pill">
          <span className="cv-tile">{svg(<><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" /><rect x="8" y="11" width="8" height="7" rx="1" /></>)}</span>
          <div className="cv-signal">
            {[30, 50, 75, 100].map((h, i) => <i key={i} style={{ height: `${h}%`, ['--d' as string]: `${i * 0.25}s` }} />)}
          </div>
        </div>
      )
    case 'compare':
      return (
        <div className="cv-stack">
          <div className="cv-pill cv-alt" style={{ ['--d' as string]: '0s' }}>
            <span className="cv-tile">{svg(<><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" /><rect x="8" y="11" width="8" height="7" rx="1" /></>)}</span>
            <div><strong>{v.compareSim}</strong><small>{v.compareSimSub}</small></div>
          </div>
          <div className="cv-pill cv-alt" style={{ ['--d' as string]: '3s' }}>
            <span className="cv-tile">{svg(<>{PHONE}<path d="M15 2a7 7 0 0 1 7 7" /><path d="M15 6a3 3 0 0 1 3 3" /></>)}</span>
            <div><strong>{v.compareCloud}</strong><small>{v.compareCloudSub}</small></div>
          </div>
        </div>
      )
    case 'number':
      return (
        <div className="cv-pill">
          <span className="cv-pulse" style={{ borderRadius: '50%' }}>{avatar('priya-rao')}</span>
          <div><strong>+1 202 555 0123</strong><small>{v.numberSub}</small></div>
        </div>
      )
  }
}

const RELATED_VISUALS: Record<string, Kind> = {
  'auto-dialer': 'queue',
  'virtual-phone-number': 'ring',
  'call-tracking': 'bars',
  'sim-based-calling': 'signal',
  'call-recording': 'wave',
  'sim-vs-cloud-calling': 'compare',
}

/** The hub's product grid: same bento as the feature grid, with each card a single link to its page. */
export function ProductBento({ slugs, ui, locale }: { slugs: string[]; ui: CallingUi; locale: string }) {
  return (
    <div className="cv-grid">
      {slugs.map((slug) => {
        const p = ui.products[slug]
        if (!p) return null
        return (
          <a key={slug} href={`${localePrefix(locale)}${callingPath(slug)}`} className="cv-card cv-card-link ch-rise">
            <div className="cv-stage" aria-hidden="true"><Visual kind={RELATED_VISUALS[slug] ?? 'ring'} ui={ui} /></div>
            <div className="cv-body">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <span className="rv-more">{ui.common.readMore}</span>
            </div>
          </a>
        )
      })}
    </div>
  )
}

/** Related pages: one tall ink card beside two wide cards, each a single link with a scene matching its topic. */
export function RelatedGrid({ slugs, ui, locale }: { slugs: string[]; ui: CallingUi; locale: string }) {
  return (
    <div className="rv-grid">
      {slugs.map((slug) => {
        const p = ui.products[slug]
        if (!p) return null
        return (
          <a key={slug} href={`${localePrefix(locale)}${callingPath(slug)}`} className="rv-card ch-rise">
            <div className="cv-stage" aria-hidden="true"><Visual kind={RELATED_VISUALS[slug] ?? 'ring'} ui={ui} /></div>
            <div className="cv-body">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <span className="rv-more">{ui.common.readMore}</span>
            </div>
          </a>
        )
      })}
    </div>
  )
}

/** Bento grid of a page's features, each with an animated scene. Decorative only: the text carries the content. */
export function FeatureGrid({ slug, cards, ui }: { slug: string; cards: CallingCard[]; ui: CallingUi }) {
  const kinds = VISUALS[slug] ?? []
  return (
    <div className="cv-grid">
      {cards.map((c, i) => (
        <article key={c.title} className="cv-card ch-rise">
          <div className="cv-stage" aria-hidden="true"><Visual kind={kinds[i] ?? 'ring'} ui={ui} /></div>
          <div className="cv-body">
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
