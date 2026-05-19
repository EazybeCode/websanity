'use client'

import { useEffect, useRef, useState } from 'react'
import NavV2 from '@/components/v2/NavV2'
import FooterV2 from '@/components/v2/FooterV2'
import BeaBot from '@/components/v2/BeaBot'
import '@/components/v2/v2.css'

const WA_LINK = 'https://wa.me/13024129610?text=Hi%20-%20I%27d%20like%20to%20see%20how%20Eazybe%20works.'

const PROBLEMS = [
  { idx: '01 · CRM Sync Agent', title: '200 chats today.', em: 'Zero in the CRM.', desc: "Reps sell all day. Nothing's logged. No handoff. No trail." },
  { idx: '02 · Lead Qualification Agent', title: '11 PM lead.', em: 'By morning, gone.', desc: 'Nobody answers after hours. You lose them every night.' },
  { idx: '03 · Revenue Agent', title: 'Deals ghosted.', em: 'Nobody noticed.', desc: 'Warm deals stall for weeks in silent threads. Revenue dies quiet.' },
  { idx: '04 · Customer Success Agent', title: 'Customers ping.', em: 'Support sleeps.', desc: 'Same questions, every day. No one picks up until Monday.' },
]

const CLIENT_LOGOS_1 = [
  { name: 'University Living', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/676859615a3ec360e3bc5d4c_university%20living.svg' },
  { name: 'Satrack', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/67685bae06432a9005e774af_satrack.svg' },
  { name: 'Orbidi', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a15f02d0e1fc5306a4d_orbidi.svg' },
  { name: 'Physics Wallah', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/67685961ca70cc2713405aac_pw.svg' },
  { name: 'WanderOn', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/6768596177cb968e98f60728_wanderon.svg' },
  { name: 'Studyin', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/67685ab1ca70cc27134152fa_studyin.svg' },
  { name: 'Kreedo', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/686e2d4a3d0a9398961d72d1_kreedo%20logo.svg' },
  { name: 'TravClan', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/686e2d4a1f16e978af267356_travclan%20logo.svg' },
  { name: 'Uniacco', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a141898ff58b264ab16_uniacco.svg' },
  { name: 'Unicreds', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a158e7a74d2a6ce2193_unicreds.svg' },
]
const CLIENT_LOGOS_2 = [
  { name: 'Buyco', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d259050172254d374cf358_buyco.svg' },
  { name: 'Wanderson', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a14a54fe3f4af5ae758_wanderson.svg' },
  { name: 'BR Marketing', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a143e538dd32cc89691_br%20marketing.svg' },
  { name: 'PickYourTrail', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a157766b001fd9135d1_pickyour%20trail.svg' },
  { name: 'Motochile', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a16d52764746d130664_motochile.svg' },
  { name: 'Alto QI', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a15fca5f9ee4d1ca693_alto%20qi.svg' },
  { name: 'Habi', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d2538dfc57d68938d78ed8_habi.webp' },
  { name: 'Toku', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25392e01ab88e0c9940a3_toku.webp' },
  { name: 'Nuvemshop', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25390bf14e7cc65047a8e_nuvemshop.webp' },
  { name: 'Belvo', src: 'https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d2538dcc1a11c6624bb394_belvo.webp' },
]

const AGENTS = [
  {
    num: '01',
    tag: 'Agent 01 · CRM Sync · FREE',
    name: 'CRM Sync Agent',
    headline: 'Every WhatsApp conversation.',
    em: 'In your CRM.',
    after: ' Automatically.',
    lede: '"Your rep had 200 conversations today. This agent logged every one."',
    bullets: [
      'Syncs to HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, Sheets, custom API',
      'Smart field mapping — right contact, right deal, right company',
      'Bi-directional — CRM updates flow back into WhatsApp',
      'Attachments, voice notes, media — all preserved',
    ],
    cta: 'Deploy Free →',
    reverse: false,
    dark: false,
  },
  {
    num: '02',
    tag: 'Agent 02 · Lead Qualification · TRY IT LIVE',
    name: 'Lead Qualification Agent',
    headline: "Your best rep's instincts.",
    em: 'Running 24/7.',
    after: '',
    lede: 'A lead messages at 11 PM. This agent responds instantly — using qualification patterns learned from your top closers. Asks the right questions. Scores intent. Routes hot prospects to the right rep.',
    bullets: [
      'Qualifies using your criteria (BANT, MEDDIC, or custom)',
      'Multilingual — English, Portuguese, Spanish, and more',
      'Reads CRM before every conversation',
      'WhatsApp-native button flows',
    ],
    cta: 'Chat with the Agent on WhatsApp →',
    reverse: true,
    dark: true,
  },
  {
    num: '03',
    tag: 'Agent 03 · Revenue Agent',
    name: 'Revenue Agent',
    headline: 'See which deals are',
    em: 'really alive.',
    after: '',
    lede: 'Reads WhatsApp + CRM every night. Flags ghosted deals. Scores deal health. Delivers a Weekly Executive Brief.',
    bullets: [
      'Ghosted deal detection',
      'Deal health scoring from conversation signals',
      'Nightly CRM updates',
      'At-risk pipeline alerts',
    ],
    cta: 'Deploy This Agent →',
    reverse: false,
    dark: false,
  },
  {
    num: '04',
    tag: 'Agent 04 · Customer Success',
    name: 'Customer Success Agent',
    headline: 'Your best support rep.',
    em: 'Available 24/7.',
    after: '',
    lede: 'Answers support on WhatsApp instantly. Knowledge-base-powered. Hands off to a human with full context when it matters.',
    bullets: [
      'Knowledge base-powered responses',
      'Trained on your actual support conversations',
      'Seamless human handoff',
      'Reduces support workload by up to 40%',
    ],
    cta: 'Deploy This Agent →',
    reverse: true,
    dark: true,
  },
  {
    num: '05',
    tag: 'Agent 05 · Agent Builder · BUILD YOUR OWN',
    name: 'Agent Builder',
    headline: 'Your use case.',
    em: 'Your data. Your agent.',
    after: '',
    lede: 'Not every team fits the lineup. Build the agent your team needs in a day.',
    bullets: [
      'DEFINE — Triggers, CRM fields',
      'TRAIN — On specific chats',
      'DEPLOY — On WhatsApp + CRM sync',
    ],
    cta: 'See How to Build →',
    reverse: false,
    dark: false,
  },
]

const INTEGRATIONS = [
  { name: 'HubSpot', href: 'https://eazybe.com/hubspot-whatsapp-integration', logo: <svg width="34" height="34" viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.164 7.93V5.084a2.2 2.2 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.626 1.263 1.976v2.868a5.1 5.1 0 00-2.348 1.028l-6.293-4.9a2.1 2.1 0 00.054-.453 2.1 2.1 0 10-.86 1.7l6.073 4.73a6.4 6.4 0 106.264-1.07z"/></svg> },
  { name: 'Salesforce', href: 'https://eazybe.com/salesforce-whatsapp-integration', logo: <svg width="34" height="22" viewBox="0 0 48 34" fill="#00A1E0"><path d="M19.5 6.8c1.5-1.6 3.7-2.6 6-2.6 3.1 0 5.9 1.8 7.3 4.5 1.2-.5 2.4-.8 3.8-.8 5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6c-.6 0-1.3-.1-1.9-.2-1.2 2.1-3.5 3.6-6.1 3.6-1.1 0-2.1-.3-3-.7-1.2 2.8-4 4.7-7.2 4.7-3.4 0-6.3-2-7.6-4.9-.7.1-1.3.2-2 .2C4 30 .3 26.3.3 21.7c0-3.1 1.7-5.8 4.2-7.2-.5-1.2-.8-2.5-.8-3.8C3.7 5.2 8 1 13.2 1c3 0 5.6 1.4 7.3 3.6z"/></svg> },
  { name: 'Zoho', href: 'https://eazybe.com/zoho-whatsapp-integration', logo: <svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#E42527"/><text x="12" y="17" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#fff" textAnchor="middle">Z</text></svg> },
  { name: 'Pipedrive', href: 'https://eazybe.com/pipedrive-whatsapp-integration', logo: <svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1A6B3A"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg> },
  { name: 'Bitrix24', href: 'https://eazybe.com/bitrix24-whatsapp-integration', logo: <svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1F8AC0"/><text x="12" y="16" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">B24</text></svg> },
  { name: 'LeadSquared', href: 'https://eazybe.com/leadsquared-whatsapp-integration', logo: <svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#7C3AED"/><text x="12" y="16" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">LSQ</text></svg> },
  { name: 'Freshworks', href: 'https://eazybe.com/freshworks-whatsapp-integration', logo: <svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#fff"/><path d="M5 13.5L8 10l2 2 4-5 5 6.5" stroke="#3FBA50" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'Google Sheets', href: 'https://eazybe.com/google-sheets-whatsapp-integration', logo: <svg width="34" height="34" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1.5" fill="#0F9D58"/><rect x="6" y="7" width="12" height="12" fill="#fff"/></svg> },
  { name: 'Custom API', href: '#', logo: <svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0F1115"/><path d="M9 9l-3 3 3 3M15 9l3 3-3 3" stroke="#A78BFA" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
]

const FAQS = [
  { q: 'How is this different from a WhatsApp chatbot (WATI, Gallabox)?', a: 'Chatbots follow scripts and break on anything unexpected. Eazybe agents read your CRM and WhatsApp history, learn from your top reps, and coordinate through a shared context engine.' },
  { q: 'Do I need WhatsApp Business API?', a: 'No. Eazybe works with Personal WhatsApp, Business App, and Business API — simultaneously. No migration.' },
  { q: 'Can I try an agent before committing?', a: 'Yes. Click "Talk to our Agent on WhatsApp". Our live Lead Qualification Agent will qualify you in 60 seconds.' },
  { q: 'What CRMs do you support?', a: 'HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, Google Sheets, and custom webhooks.' },
  { q: 'How long does setup take?', a: '10 minutes for CRM Sync. AI Agents take 2-3 days to train on your data.' },
  { q: 'Is my data secure?', a: 'Yes. Encrypted in transit and at rest. Meta Business Partner. GDPR compliant.' },
]

export default function HomePageV2() {
  useEffect(() => {
    document.documentElement.classList.add('eb-v2')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('show'), observer.unobserve(e.target))),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.eb-v2-root .reveal').forEach((el) => observer.observe(el))
    return () => document.documentElement.classList.remove('eb-v2')
  }, [])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html.eb-v2 body { background:#F5F7FC !important; }
            html.eb-v2 body > div.min-h-screen { background:transparent !important; }
            html.eb-v2 body > div.min-h-screen > header,
            html.eb-v2 body > div.min-h-screen > footer { display:none !important; }
            /* Hide LeadSidebar (fixed left), LeadMobileButton, TrialModalWrapper, MegaMenuHeader */
            html.eb-v2 body > div.min-h-screen > div.fixed,
            html.eb-v2 body > div.min-h-screen > nav,
            html.eb-v2 nav.fixed,
            html.eb-v2 .fixed.left-8,
            html.eb-v2 .fixed.left-0 { display:none !important; }
            html.eb-v2 main { padding:0 !important; margin:0 !important; max-width:none !important; }
          `,
        }}
      />

      <div className="eb-v2-root">
        <NavV2 />

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <span className="hero-tag">
              <span className="pulse"></span>WHATSAPP AI · CRM-NATIVE · 24/7
            </span>
            <h1>Sell on WhatsApp. <em>See it all in your CRM.</em></h1>
            <p className="hero-sub">AI agents trained on your best chats. Sync every conversation to your CRM. Qualify leads while you sleep.</p>
            <PromptBox />
            <div className="trust" style={{ marginTop: 30 }}>
              <span>2,000+ teams</span><span className="sep"></span>
              <span>40+ countries</span><span className="sep"></span>
              <span>Meta Partner</span>
            </div>
          </div>
        </section>

        {/* Logo bar */}
        <section className="logo-bar">
          <div className="container">
            <p className="logo-bar-label">— Trusted by 2,000+ revenue teams worldwide —</p>
            <div className="logo-marquee">
              <div className="logo-track left">
                {[...CLIENT_LOGOS_1, ...CLIENT_LOGOS_1].map((c, i) => (
                  <img key={i} src={c.src} alt={c.name} referrerPolicy="no-referrer"  loading="lazy"/>
                ))}
              </div>
            </div>
            <div className="logo-marquee">
              <div className="logo-track right">
                {[...CLIENT_LOGOS_2, ...CLIENT_LOGOS_2].map((c, i) => (
                  <img key={i} src={c.src} alt={c.name} referrerPolicy="no-referrer"  loading="lazy"/>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="problem">
          <div className="container">
            <div className="sec-head reveal">
              <span className="sec-tag" style={{ justifyContent: 'center' }}>The Problem</span>
              <h2>Selling on WhatsApp is easy. <em>Everything around it is broken.</em></h2>
            </div>
            <div className="problem-grid">
              {PROBLEMS.map((p, i) => (
                <div key={i} className="p-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="idx">{p.idx}</div>
                  <h3>{p.title} <em>{p.em}</em></h3>
                  <p>{p.desc}</p>
                  <div className="p-visual">
                    <ProblemScene idx={i} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Context Engine */}
        <section className="ce-section">
          <div className="container">
            <div className="ce-pill reveal">
              <div className="ce-tag">
                <span className="ce-tag-dot"></span>THE EAZYBE CONTEXT ENGINE
              </div>
              <div className="ce-flow">
                <span>WhatsApp Conversations</span>
                <span className="ce-arrow">←</span>
                <span className="ce-brain">Shared Brain</span>
                <span className="ce-arrow">→</span>
                <span>Your CRM</span>
              </div>
              <p className="ce-note">
                Every agent reads both. <em>Add a new agent — it already knows your business.</em>
              </p>
            </div>
          </div>
        </section>

        {/* Agents */}
        {AGENTS.map((a, i) => (
          <section
            key={i}
            className={`agent ${a.reverse ? 'reverse' : ''}`}
            data-tone={a.dark ? 'dark' : undefined}
          >
            <div className="container">
              <div className="agent-inner">
                <div className="agent-copy reveal">
                  <span className="sec-tag">{a.tag}</span>
                  <h3>{a.headline} <em>{a.em}</em>{a.after}</h3>
                  <p className="lede">{a.lede}</p>
                  <ul className="feat-list">
                    {a.bullets.map((b, j) => (
                      <li key={j}>
                        <span className="tick">
                          <svg fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24" width="10" height="10">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="feat-link">{a.cta}</a>
                </div>
                <div className="agent-visual">
                  <div className="visual">
                    <AgentVisual idx={i} dark={a.dark} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Integrations */}
        <section className="integrations">
          <div className="container">
            <div className="sec-head reveal">
              <span className="sec-tag" style={{ justifyContent: 'center' }}>Integrations</span>
              <h2>Works with the CRM <em>you already use.</em></h2>
              <p>Native integrations. Bi-directional sync. Workflow triggers.</p>
            </div>
            <div className="int-grid">
              {INTEGRATIONS.map((i, idx) => (
                <a key={idx} href={i.href} target="_blank" rel="noopener" className="int-tile reveal" style={{ transitionDelay: `${idx * 0.04}s` }}>
                  {i.logo}
                  <div className="name">{i.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <div className="sec-head reveal">
              <span className="sec-tag" style={{ justifyContent: 'center' }}>FAQ</span>
              <h2>Questions?</h2>
            </div>
            <div className="faq">
              {FAQS.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        <FooterV2 />
      </div>

      <BeaBot />
    </>
  )
}

function ProblemScene({ idx }: { idx: number }) {
  if (idx === 0) {
    // Scene 1: Empty CRM
    return (
      <div className="scene-crm">
        <div className="crm-head">
          <span><span className="dot"></span>crm / deals / acme-co</span>
          <span>Q4</span>
        </div>
        <div className="crm-rows">
          <div className="crm-row" style={{ width: '100%' }}></div>
          <div className="crm-row" style={{ width: '82%' }}></div>
          <div className="crm-row" style={{ width: '68%' }}></div>
          <div className="crm-row" style={{ width: '90%' }}></div>
          <div className="crm-empty">No activity logged</div>
        </div>
      </div>
    )
  }
  if (idx === 1) {
    // Scene 2: Chat with typing dots + cold
    return (
      <div className="scene-chat">
        <div className="pa-bubble-them">Hey! Still taking new clients?</div>
        <div className="pa-bubble-typing">
          <span className="pa-dot"></span>
          <span className="pa-dot"></span>
          <span className="pa-dot"></span>
        </div>
        <div className="pa-cold">⌛ competitor replied 6:12 AM</div>
      </div>
    )
  }
  if (idx === 2) {
    // Scene 3: Declining chart
    return (
      <div className="scene-buried">
        <div className="buried-chart">
          <svg viewBox="0 0 100 60" preserveAspectRatio="none">
            <path className="line" d="M0,15 L15,18 L30,28 L45,32 L60,42 L75,48 L100,55" />
          </svg>
        </div>
        <div className="buried-label">15 threads · 0 synced</div>
        <div className="buried-row"></div>
        <div className="buried-row"></div>
        <div className="buried-row"></div>
        <div className="buried-row"></div>
      </div>
    )
  }
  // Scene 4: Pings stacking
  return (
    <div className="scene-pings">
      <div className="pa-pings-row">
        <span className="pa-ping" style={{ ['--d' as string]: '0s' }}>🚩</span>
        <span className="pa-ping" style={{ ['--d' as string]: '0.6s' }}>🚩</span>
        <span className="pa-ping" style={{ ['--d' as string]: '1.2s' }}>🚩</span>
        <span className="pa-ping" style={{ ['--d' as string]: '1.8s' }}>🚩</span>
        <span className="pa-ping" style={{ ['--d' as string]: '2.4s' }}>🚩</span>
      </div>
      <div className="pa-badge">
        <span className="pa-badge-num">12</span> unread · <em style={{ color: '#C26A5A' }}>since Friday</em>
      </div>
    </div>
  )
}

function AgentVisual({ idx, dark }: { idx: number; dark: boolean }) {
  // 01 CRM Sync — chat + CRM sync mockup
  if (idx === 0) {
    return (
      <div className="viz-chat">
        <div className="viz-msg them">Hey, do you ship to São Paulo? 200 units by Friday.</div>
        <div className="viz-msg us">Yes — checking stock now.</div>
        <div className="viz-msg them">Send to my purchasing manager too.</div>
        <div style={{ marginTop: 16, padding: '14px 16px', background: 'var(--bg-2)', borderRadius: 12, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
          ✓ Synced to HubSpot · Maria Costa · $8.4K · qualified
        </div>
      </div>
    )
  }
  // 02 Lead Qual — live qualifying chat
  if (idx === 1) {
    return (
      <div className="viz-chat">
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', marginBottom: 8 }}>● LIVE · 11:42 PM</div>
        <div className="viz-msg them">Hi, saw your ad. Looking for a CRM that works on WhatsApp.</div>
        <div className="viz-msg us">Hey 👋 happy to help. Quick question — how big is your sales team?</div>
        <div className="viz-msg them">About 30 reps</div>
        <div className="viz-msg us">Got it. What CRM are you on today?</div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: 'color-mix(in oklab, var(--accent-a) 18%, transparent)', borderRadius: 12, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--accent-a)' }}>
          INTENT: High · 86 · Routed to Diego
        </div>
      </div>
    )
  }
  // 03 Revenue — dashboard
  if (idx === 2) {
    return (
      <div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
          EXECUTIVE BRIEF · MON
        </div>
        <div className="viz-dash">
          <div className="viz-stat"><div className="v">$340K</div><div className="l">Active</div></div>
          <div className="viz-stat warn"><div className="v">$85K</div><div className="l">At Risk</div></div>
          <div className="viz-stat"><div className="v">$120K</div><div className="l">Stale</div></div>
          <div className="viz-stat good"><div className="v">4</div><div className="l">Ready to Close</div></div>
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-3)', borderTop: '1px dashed var(--line)', paddingTop: 12 }}>
          ⚠ BigCo — no reply 12 days · Acme — stalled 8 days
        </div>
      </div>
    )
  }
  // 04 Customer Success
  if (idx === 3) {
    return (
      <div className="viz-chat">
        <div className="viz-msg them">My subscription renewed monthly — but I was supposed to be annual?</div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', padding: '6px 10px', background: 'rgba(127,214,176,0.1)', borderRadius: 6, alignSelf: 'flex-start' }}>
          📚 KB · billing/plan-changes.md
        </div>
        <div className="viz-msg us">I see your account renewed monthly on May 3. I can switch you to annual and credit the difference — want me to do that now?</div>
        <div className="viz-msg them">Yes please</div>
        <div className="viz-msg us">Done — Annual plan active. $42 credited.</div>
        <div style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(91,143,111,0.15)', borderRadius: 8, fontFamily: 'var(--f-mono)', fontSize: 10, color: '#7FD6B0', letterSpacing: '0.1em', alignSelf: 'flex-start' }}>
          ✓ RESOLVED · 0 human time
        </div>
      </div>
    )
  }
  // 05 Agent Builder
  return (
    <div>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
        NEW AGENT · RENEWAL · DRAFT
      </div>
      {[
        { num: '01', name: 'DEFINE TRIGGER', detail: 'WHEN deal.close_date IS 60 days away' },
        { num: '02', name: 'TRAIN ON CHATS', detail: '142 renewal conversations · indexed' },
        { num: '03', name: 'DEPLOY TO', detail: 'WhatsApp · HubSpot · Slack' },
      ].map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 10, marginBottom: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-a)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>{s.num}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.08em' }}>{s.name}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>{s.detail}</div>
          </div>
        </div>
      ))}
      <button style={{ width: '100%', padding: 12, background: 'var(--ink)', color: '#fff', borderRadius: 12, fontWeight: 600, marginTop: 8 }}>Deploy Agent →</button>
    </div>
  )
}

const PROMPT_EXAMPLES = [
  'Qualify inbound leads with BANT and route hot ones to my top rep…',
  'Sync every WhatsApp conversation to HubSpot automatically…',
  'Flag stalled deals and ping the owner when a customer goes quiet 48h…',
  "Reply in Portuguese to after-hours leads and book them into my calendar…",
  "Draft a follow-up in my voice when a prospect hasn't replied in 3 days…",
  'Alert my manager when any deal over $50k goes silent…',
]

function PromptBox() {
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState(PROMPT_EXAMPLES[0] + '▎')

  useEffect(() => {
    let ex = 0
    let charIdx = 0
    let typing = true
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (document.activeElement === inputRef.current || inputRef.current?.value) {
        timer = setTimeout(tick, 200)
        return
      }
      const target = PROMPT_EXAMPLES[ex]
      if (typing) {
        if (charIdx < target.length) {
          charIdx++
          setPlaceholder(target.slice(0, charIdx) + '▎')
          timer = setTimeout(tick, 35 + Math.random() * 40)
          return
        }
        typing = false
        timer = setTimeout(tick, 2200)
        return
      } else {
        if (charIdx > 0) {
          charIdx--
          setPlaceholder(target.slice(0, charIdx) + '▎')
          timer = setTimeout(tick, 15)
          return
        }
        typing = true
        ex = (ex + 1) % PROMPT_EXAMPLES.length
      }
      timer = setTimeout(tick, 100)
    }
    timer = setTimeout(tick, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="prompt-wrap">
      <div className="prompt-orb"></div>
      <form
        className="prompt-box"
        onSubmit={(e) => {
          e.preventDefault()
          alert("Bea will get back to you with your agent — sign in to continue.")
        }}
      >
        <div className="prompt-inner">
          <div className="prompt-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4m0 12v4m-9-9h4m12 0h4M5.636 5.636l2.828 2.828m7.072 7.072l2.828 2.828M5.636 18.364l2.828-2.828m7.072-7.072l2.828-2.828" />
            </svg>
          </div>
          <textarea
            ref={inputRef}
            className="prompt-input"
            rows={1}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
            }}
            spellCheck={false}
          />
          <button className="prompt-send" type="submit" aria-label="Build agent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      <div className="prompt-hint">
        <span>Press <kbd>Enter</kbd> to build · Free forever plan</span>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item">
      <summary
        className="faq-q"
        style={{ cursor: 'pointer', listStyle: 'none' }}
        onClick={(e) => {
          // toggle .open on parent for the animation
          e.preventDefault()
          const parent = (e.target as HTMLElement).closest('details')
          if (parent) parent.classList.toggle('open')
        }}
      >
        {q}
        <span className="plus">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>
      <div className="faq-a">{a}</div>
    </details>
  )
}
