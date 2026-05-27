'use client'

import React, { useState } from 'react'
import {
  BarChart3,
  Settings,
  ShieldCheck,
  MessageCircle,
  RefreshCcw,
  Key,
} from 'lucide-react'
import { useTrialModal } from '@/providers/TrialModalProvider'
import LabelAnimation from '@/components/animations/LabelAnimation'
import UnifiedDashboardAnimation from '@/components/animations/UnifiedDashboardAnimation'
import RoutingAnimation from '@/components/animations/RoutingAnimation'

const Check = (
  <svg fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

const FEATURES = [
  {
    title: 'Unified Dashboard',
    desc: "See all team conversations in one place. No more checking individual phones or asking for updates.",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: 'Lead Routing',
    desc: "Automatically route new conversations to the right rep based on territory, availability, or round-robin.",
    icon: <RefreshCcw className="w-5 h-5" />,
  },
  {
    title: 'Coverage Assurance',
    desc: "Spot unreplied messages before they become lost deals. Know who's responding and who's not.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    title: 'Performance Tracking',
    desc: 'Compare response times and conversation volume across reps. Identify coaching opportunities.',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: 'No API Migration',
    desc: 'Works with WhatsApp Business App. Each rep uses their existing number — no disruption.',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    title: 'Role-Based Access',
    desc: 'Managers see everything. Reps see their own. Customizable permissions for your org.',
    icon: <Key className="w-5 h-5" />,
  },
]

const FAQ_ITEMS = [
  { q: 'Do I need WhatsApp Business API?', a: 'No. Team Inbox works with regular WhatsApp Business App. Each rep uses their existing WhatsApp — no migration needed.' },
  { q: 'How many numbers can I manage?', a: 'Unlimited. Whether you have 2 reps or 200, Team Inbox scales to accommodate your entire organization.' },
  { q: 'Can I respond from the dashboard?', a: 'Yes. Managers with appropriate permissions can view and respond to messages directly from the central dashboard.' },
  { q: 'What about rep privacy?', a: 'Team Inbox only syncs professional conversations. You can define specific rules and permissions for what data is visible to managers.' },
]

export function TeamInboxPageClient() {
  const { openModal } = useTrialModal()
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set())
  const [showMoreFaqMobile, setShowMoreFaqMobile] = useState(false)
  const toggleFaq = (i: number) => {
    setOpenFaq((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="hero-tag reveal"><span className="pulse" /> TEAM INBOX · UNIFIED · NO API</span>
          <h1 className="reveal">All your team&apos;s WhatsApp, <em>one dashboard.</em></h1>
          <p className="lede reveal">
            Managing 10+ reps with individual WhatsApp numbers? Team Inbox brings every conversation
            into one view. Route leads, track responses, ensure coverage. Works with WhatsApp
            Business App — no API required.
          </p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
            <button onClick={() => openModal('trial')} className="btn btn-primary btn-lg">Install for Free →</button>
            <a href="#features" className="btn btn-outline btn-lg">See Team Inbox</a>
          </div>
          <div
            className="reveal"
            style={{
              marginTop: 60,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
              maxWidth: 720,
              margin: '60px auto 0',
              borderTop: '1px solid var(--line)',
              paddingTop: 28,
            }}
          >
            {[
              ['Unlimited', 'Numbers'],
              ['Real-time', 'Updates'],
              ['No API', 'Required'],
            ].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 24, fontWeight: 400, color: 'var(--ink)' }}>{v}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">Why Team Inbox?</span>
            <h2>Finally see <em>what your team is doing</em> on WhatsApp.</h2>
          </div>
          <div className="card-grid cols-3">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="card reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animation 1: Visibility */}
      <section className="agent">
        <div className="container">
          <div className="agent-inner">
            <div className="agent-copy reveal">
              <span className="sec-tag">The Visibility Problem</span>
              <h3>Managers are <em>flying blind</em> on WhatsApp.</h3>
              <p className="lede">
                Your reps talk to customers all day on WhatsApp, but you have no idea what&apos;s
                being said. Are leads being followed up? Are customers getting responses? Without
                Team Inbox, you&apos;re managing a black box.
              </p>
              <ul className="feat-list">
                {[
                  'No visibility into rep conversations',
                  "Can't verify follow-up claims",
                  'Unreplied leads slip away quietly',
                  'No way to spot coaching needs',
                ].map((t) => (
                  <li key={t}><span className="tick">{Check}</span>{t}</li>
                ))}
              </ul>
              <button onClick={() => openModal('trial')} className="feat-link" style={{ background: 'transparent', padding: 0 }}>
                Get visibility →
              </button>
            </div>
            <div className="visual reveal" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <LabelAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Animation 2: Unified View */}
      <section className="agent reverse" data-tone="dark">
        <div className="container">
          <div className="agent-inner">
            <div className="agent-copy reveal">
              <span className="sec-tag">Unified View</span>
              <h3>Every conversation, <em>one dashboard.</em></h3>
              <p className="lede">
                Team Inbox aggregates WhatsApp conversations from all team members into a single
                view. Filter by rep, status, or priority. Search across all conversations.
              </p>
              <ul className="feat-list">
                {[
                  'All numbers in one dashboard',
                  'Filter by rep, status, priority',
                  'Search across all conversations',
                  'Real-time conversation updates',
                ].map((t) => (
                  <li key={t}><span className="tick">{Check}</span>{t}</li>
                ))}
              </ul>
              <button onClick={() => openModal('trial')} className="feat-link" style={{ background: 'transparent', padding: 0 }}>
                See unified view →
              </button>
            </div>
            <div className="visual reveal" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <UnifiedDashboardAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Animation 3: Routing */}
      <section className="agent">
        <div className="container">
          <div className="agent-inner">
            <div className="agent-copy reveal">
              <span className="sec-tag">Lead Routing</span>
              <h3>Right rep, <em>automatically.</em></h3>
              <p className="lede">
                New conversations routed based on territory, availability, or round-robin. No leads
                sitting unassigned. Every opportunity gets immediate attention.
              </p>
              <ul className="feat-list">
                {[
                  'Territory-based routing',
                  'Round-robin distribution',
                  'Availability-aware assignment',
                  'Manual override when needed',
                ].map((t) => (
                  <li key={t}><span className="tick">{Check}</span>{t}</li>
                ))}
              </ul>
              <button onClick={() => openModal('trial')} className="feat-link" style={{ background: 'transparent', padding: 0 }}>
                Configure routing →
              </button>
            </div>
            <div className="visual reveal" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <RoutingAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">How it works</span>
            <h2>Team onboarding <em>in a day.</em></h2>
            <p>Each rep installs the extension. Dashboard populates automatically.</p>
          </div>
          <div className="card-grid cols-3">
            {[
              { step: '01', title: 'Reps Install Extension', desc: 'Each team member adds Eazybe to Chrome.' },
              { step: '02', title: 'Conversations Sync', desc: 'All chats flow to the Team Inbox dashboard.' },
              { step: '03', title: 'Manage & Monitor', desc: 'Route leads, track responses, ensure coverage.' },
            ].map((s) => (
              <div key={s.step} className="card reveal">
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--accent-ink)', letterSpacing: '0.1em', marginBottom: 16 }}>{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section" data-tone="dark">
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }} className="reveal">
            <MessageCircle className="w-10 h-10" style={{ color: 'var(--accent-a)', opacity: 0.7, margin: '0 auto 24px' }} />
            <blockquote
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(22px, 2.6vw, 32px)',
                fontStyle: 'italic',
                color: 'var(--ink)',
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
              }}
            >
              &ldquo;We have 40 sales reps across 3 countries. Before Team Inbox, I had no idea what
              was happening. Now I see every conversation and can ensure leads get handled.&rdquo;
            </blockquote>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-2)' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--ink)' }}>Diego Fernandez</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Regional Sales Director, LatAm Logistics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">FAQ</span>
            <h2>Team Inbox questions.</h2>
          </div>
          {(() => {
            const half = Math.ceil(FAQ_ITEMS.length / 2)
            const columns = [FAQ_ITEMS.slice(0, half), FAQ_ITEMS.slice(half)]
            return (
              <div className={`faq-grid${showMoreFaqMobile ? ' faq-show-more' : ''}`}>
                {columns.map((column, colIdx) => (
                  <div key={colIdx} className={`faq-col${colIdx === 1 ? ' faq-col-rest' : ''}`}>
                    {column.map((item, i) => {
                      const idx = colIdx === 0 ? i : i + half
                      const isOpen = openFaq.has(idx)
                      return (
                        <div key={item.q} className={`faq-pill${isOpen ? ' open' : ''}`}>
                          <button
                            className="faq-pill-q"
                            onClick={() => toggleFaq(idx)}
                            aria-expanded={isOpen}
                          >
                            <span>{item.q}</span>
                            <span className="faq-pill-chev" aria-hidden="true">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </button>
                          <div className="faq-pill-a">
                            <div>{item.a}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )
          })()}
          {!showMoreFaqMobile && (
            <button
              type="button"
              className="faq-mobile-more"
              onClick={() => setShowMoreFaqMobile(true)}
            >
              Read more
            </button>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2 className="reveal">Turn WhatsApp into your<br /><em>Revenue Engine.</em></h2>
          <p className="sub reveal">
            Join 2,000+ teams who finally see what is happening in chat. Sync conversations,
            automate workflows, and close deals faster.
          </p>
          <div className="ctas reveal">
            <button onClick={() => openModal('trial')} className="btn btn-primary btn-lg">Install for Free →</button>
            <button onClick={() => openModal('demo')} className="btn btn-outline btn-lg">Book a Demo</button>
          </div>
          <p
            className="reveal"
            style={{ marginTop: 24, color: 'var(--ink-4)', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Free 4-day trial — No credit card required
          </p>
        </div>
      </section>

      {/* Security */}
      <section className="section" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="card-grid cols-3">
            {[
              { title: 'Meta Business Partner', desc: 'Verified Integration', icon: <MessageCircle className="w-5 h-5" /> },
              { title: 'GDPR Ready', desc: 'Fully Compliant Data Processing', icon: <ShieldCheck className="w-5 h-5" /> },
              { title: 'Bank-Grade Security', desc: 'SSL & 256-bit Encryption', icon: <Key className="w-5 h-5" /> },
            ].map((s) => (
              <div key={s.title} className="card reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="card-icon">{s.icon}</div>
                <h3 style={{ fontSize: 18 }}>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Trusted by regulated industries: financial services, healthcare, insurance
          </div>
        </div>
      </section>
    </>
  )
}
