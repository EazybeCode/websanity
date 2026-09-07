'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useTrialModal } from '@/providers/TrialModalProvider'
import { urlFor } from '@/lib/sanity'

// ─── Animation Imports ──────────────────────────────────────────────────────
import LabelAnimation from '@/components/animations/LabelAnimation'
import UnifiedDashboardAnimation from '@/components/animations/UnifiedDashboardAnimation'
import RoutingAnimation from '@/components/animations/RoutingAnimation'
import RepetitiveAnimation from '@/components/animations/RepetitiveAnimation'
import PersonalizationAnimation from '@/components/animations/PersonalizationAnimation'
import TeamAnimation from '@/components/animations/TeamAnimation'
import FollowUpAnimation from '@/components/animations/FollowUpAnimation'
import ScheduleAnimation from '@/components/animations/ScheduleAnimation'
import PersistenceAnimation from '@/components/animations/PersistenceAnimation'
import ActivityGrid from '@/components/animations/ActivityGrid'
import DashboardConsole from '@/components/animations/DashboardConsole'
import SkillGapAnalysis from '@/components/animations/SkillGapAnalysis'
import { CopilotProblemAnimation, CopilotSolutionAnimation, CopilotSummaryAnimation } from '@/components/animations/WhatsAppCopilotMockup'
import CloudBackupProblemAnimation from '@/components/animations/CloudBackupProblemAnimation'
import CloudBackupSyncAnimation from '@/components/animations/CloudBackupSyncAnimation'
import CloudBackupSearchAnimation from '@/components/animations/CloudBackupSearchAnimation'
import WhatsAppCRMChaosAnimation from '@/components/animations/WhatsAppCRMChaosAnimation'
import WhatsAppCRMLabelAnimation from '@/components/animations/WhatsAppCRMLabelAnimation'
import WhatsAppCRMSyncAnimation from '@/components/animations/WhatsAppCRMSyncAnimation'
import RevenueInboxComparisonAnimation from '@/components/animations/RevenueInboxComparisonAnimation'
import RevenueInboxScoringAnimation from '@/components/animations/RevenueInboxScoringAnimation'
import RevenueInboxAlertsAnimation from '@/components/animations/RevenueInboxAlertsAnimation'
import TemplatesProblemAnimation from '@/components/animations/TemplatesProblemAnimation'
import TemplatesSolutionAnimation from '@/components/animations/TemplatesSolutionAnimation'
import TemplatesAutomationAnimation from '@/components/animations/TemplatesAutomationAnimation'
import BroadcastProblemAnimation from '@/components/animations/BroadcastProblemAnimation'
import BroadcastSolutionAnimation from '@/components/animations/BroadcastSolutionAnimation'
import BroadcastAutomationAnimation from '@/components/animations/BroadcastAutomationAnimation'

const animationMap: Record<string, Record<number, React.FC<{ locale?: string }>>> = {
  'team-inbox': { 0: LabelAnimation, 1: UnifiedDashboardAnimation, 2: RoutingAnimation },
  'quick-reply': { 0: RepetitiveAnimation, 1: PersonalizationAnimation, 2: TeamAnimation },
  'scheduler': { 0: FollowUpAnimation, 1: ScheduleAnimation, 2: PersistenceAnimation },
  'rep-radar': { 0: ActivityGrid, 1: DashboardConsole, 2: SkillGapAnalysis },
  'whatsapp-copilot': { 0: CopilotProblemAnimation, 1: CopilotSolutionAnimation, 2: CopilotSummaryAnimation },
  'cloud-backup': { 0: CloudBackupProblemAnimation, 1: CloudBackupSyncAnimation, 2: CloudBackupSearchAnimation },
  'whatsapp-crm': { 0: WhatsAppCRMChaosAnimation, 1: WhatsAppCRMLabelAnimation, 2: WhatsAppCRMSyncAnimation },
  'revenue-inbox': { 0: RevenueInboxComparisonAnimation, 1: RevenueInboxScoringAnimation, 2: RevenueInboxAlertsAnimation },
  'templates': { 0: TemplatesProblemAnimation, 1: TemplatesSolutionAnimation, 2: TemplatesAutomationAnimation },
  'broadcast': { 0: BroadcastProblemAnimation, 1: BroadcastSolutionAnimation, 2: BroadcastAutomationAnimation },
}

const Check = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)
const TickIcon = (
  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

// ─── Hero ────────────────────────────────────────────────────────────────────

const HeroSection: React.FC<{ data: any }> = ({ data }) => {
  const { openModal } = useTrialModal()
  if (!data) return null
  return (
    <section className="page-hero" data-tone="dark">
      <div className="container">
        {data.badge && (
          <span className="hero-tag reveal"><span className="pulse" /> {String(data.badge).toUpperCase()}</span>
        )}
        <h1 className="reveal">
          {data.headline}
          {data.headlineHighlight ? <> <em>{data.headlineHighlight}</em></> : null}
        </h1>
        {data.description && <p className="lede reveal">{data.description}</p>}

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
          {data.primaryCta && (
            <button onClick={() => openModal('trial')} className="btn btn-primary btn-lg">
              {data.primaryCta.label} →
            </button>
          )}
          {data.secondaryCta && (
            <button onClick={() => openModal('demo')} className="btn btn-outline btn-lg">
              {data.secondaryCta.label}
            </button>
          )}
        </div>

        {data.stats && data.stats.length > 0 && (
          <div className="reveal fh-chips-wrap">
            {/* Trust-chip style stats: pill badges with tinted icon medallions
                (green / blue / gold), matching the partner-page dark chips. */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .fh-chips-wrap { margin: 40px auto 0; display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
                  .fh-chip {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 6px 14px 6px 7px; border-radius: 999px;
                    background: rgba(255,255,255,0.055);
                    border: 1px solid rgba(255,255,255,0.14);
                    -webkit-backdrop-filter: blur(10px);
                    backdrop-filter: blur(10px);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
                    transition: border-color .2s ease, background .2s ease;
                  }
                  .fh-chip:hover { border-color: rgba(255,255,255,0.26); background: rgba(255,255,255,0.08); }
                  .fh-chip-icon {
                    width: 24px; height: 24px; flex-shrink: 0; border-radius: 50%;
                    display: inline-flex; align-items: center; justify-content: center;
                  }
                  .fh-chip-icon svg { width: 12px; height: 12px; }
                  .fh-chip-0 .fh-chip-icon { background: rgba(37,211,102,0.14); border: 1px solid rgba(37,211,102,0.45); color: #7FD6B0; }
                  .fh-chip-1 .fh-chip-icon { background: rgba(96,140,235,0.16); border: 1px solid rgba(143,183,245,0.45); color: #8FB7F5; }
                  .fh-chip-2 .fh-chip-icon { background: rgba(214,178,90,0.14); border: 1px solid rgba(232,199,126,0.45); color: #E8C77E; }
                  .fh-chip-text { font-size: 12.5px; font-weight: 600; color: #F4F6FA; white-space: nowrap; }
                  @media (max-width: 560px) {
                    .fh-chips-wrap { gap: 8px; margin-top: 32px; }
                    .fh-chip { padding: 5px 12px 5px 6px; gap: 7px; }
                    .fh-chip-icon { width: 22px; height: 22px; }
                    .fh-chip-text { font-size: 11.5px; white-space: normal; text-align: left; }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .fh-chip { transition: none; }
                  }
                `,
              }}
            />
            {data.stats.map((stat: any, idx: number) => {
              const icons = [
                // shield
                <svg key="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                // circled check
                <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.2l2.3 2.3 4.7-4.8" /></svg>,
                // globe
                <svg key="g" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>,
              ]
              return (
                <div key={idx} className={`fh-chip fh-chip-${idx % 3}`}>
                  <span className="fh-chip-icon" aria-hidden="true">{icons[idx % 3]}</span>
                  <span className="fh-chip-text">{stat.value} {stat.label}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Benefits ───────────────────────────────────────────────────────────────

/**
 * Interactive benefits grid: a spotlight cycles across the cards every 4s
 * (progress bar on the active card shows the countdown), hover/focus pauses
 * the cycle, and clicking a card moves the spotlight there. Content stays
 * fully visible on every card — only emphasis moves — so nothing is hidden
 * from readers or crawlers. Auto-cycling is disabled for reduced motion.
 */
const BenefitsSection: React.FC<{ data: any }> = ({ data }) => {
  const [active, setActive] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const reduced = React.useRef(false)
  const count = data?.items?.length ?? 0

  React.useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  React.useEffect(() => {
    if (paused || reduced.current || count < 2) return
    const id = setInterval(() => setActive((a) => (a + 1) % count), 4000)
    return () => clearInterval(id)
  }, [paused, count, active])

  if (!data || !data.items) return null
  return (
    <section className="section" style={{ paddingTop: 80 }}>
      <div className="container">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .bnf-card {
                position: relative; display: block; width: 100%; text-align: left; cursor: pointer;
                font: inherit; color: inherit;
                transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease, opacity .5s ease;
              }
              .bnf-card:hover { border-color: color-mix(in oklab, var(--accent-a) 45%, var(--line)); }
              .bnf-card.is-active {
                border-color: color-mix(in oklab, var(--accent-a) 55%, var(--line));
                box-shadow: 0 16px 34px -24px rgba(15, 17, 21, 0.45);
                transform: translateY(-4px);
              }
              .bnf-card:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
              .bnf-card.is-active .card-icon { background: #4C3F95; border-color: #4C3F95; color: #fff; }
              .bnf-bar {
                position: absolute; left: 20px; right: 20px; bottom: 14px; height: 3px;
                border-radius: 3px; overflow: hidden;
                background: color-mix(in oklab, var(--accent-a) 18%, var(--line));
              }
              .bnf-bar > span {
                display: block; height: 100%; width: 0; background: var(--accent-ink); border-radius: inherit;
                animation: bnf-fill 4s linear forwards;
              }
              @keyframes bnf-fill { to { width: 100%; } }
              .bnf-card { padding-bottom: 34px; }
              @media (prefers-reduced-motion: reduce) {
                .bnf-card { transition: none; }
                .bnf-card.is-active { transform: none; }
                .bnf-bar { display: none; }
              }
            `,
          }}
        />
        <div className="sec-head centered reveal">
          {data.badge && <span className="sec-tag">{data.badge}</span>}
          {data.headline && <h2>{data.headline}</h2>}
        </div>
        {/* `reveal` lives on the static wrapper, not the buttons: RevealOnScroll
            adds `show` to the DOM node, and a re-rendered dynamic className
            would wipe it, leaving the cards stuck at opacity 0. */}
        <div
          className={`card-grid reveal ${data.items.length === 2 ? 'cols-2' : 'cols-3'}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {data.items.map((item: any, idx: number) => (
            <button
              key={idx}
              type="button"
              className={`card bnf-card${idx === active ? ' is-active' : ''}`}
              aria-pressed={idx === active}
              onClick={() => setActive(idx)}
            >
              <div className="card-icon">{Check}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {idx === active && !reduced.current && count > 1 && (
                <div className="bnf-bar" aria-hidden="true">
                  <span key={active} style={paused ? { animationPlayState: 'paused' } : undefined} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features (alternating with animations) ─────────────────────────────────

const FeaturesSection: React.FC<{ features: any[]; slug: string; locale?: string }> = ({ features, slug, locale }) => {
  if (!features || features.length === 0) return null
  const slugAnimations = animationMap[slug]
  return (
    <div id="features">
      {/* .visual has a global min-height: 460px; on mobile the animation cards
          are only ~300px tall, which left a big dead band after each one. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 1024px) {
              .landing .fp-visual { min-height: 0 !important; }
            }
          `,
        }}
      />
      {features.map((feature, idx) => {
        const AnimationComponent = slugAnimations?.[idx] || null
        const reverse = idx % 2 === 1
        const isDark = idx === 1
        return (
          <section key={feature._key || idx} className={`agent${reverse ? ' reverse' : ''}`} {...(isDark ? { 'data-tone': 'dark' as const } : {})}>
            <div className="container">
              <div className="agent-inner">
                <div className="agent-copy reveal">
                  {feature.badge && <span className="sec-tag">{feature.badge}</span>}
                  {feature.headline && (
                    <h3>{feature.headline}</h3>
                  )}
                  {feature.description && <p className="lede">{feature.description}</p>}

                  {feature.points && feature.points.length > 0 && (
                    <ul className="feat-list">
                      {feature.points.map((point: string, pIdx: number) => (
                        <li key={pIdx}><span className="tick">{Check}</span>{point}</li>
                      ))}
                    </ul>
                  )}

                  {feature.cta && (
                    <Link href={feature.cta.url} className="feat-link">
                      {feature.cta.label} →
                    </Link>
                  )}
                </div>

                <div className="visual reveal fp-visual" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  {AnimationComponent ? (
                    <AnimationComponent locale={locale} />
                  ) : feature.image && typeof feature.image === 'object' && feature.image.asset ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(feature.image).width(800).height(600).url()}
                      alt={feature.headline || feature.badge || 'Feature illustration'}
                      style={{ width: '100%', borderRadius: 18, border: '1px solid var(--line)' }}
                     loading="lazy"/>
                  ) : (
                    <div
                      style={{
                        aspectRatio: '4/3',
                        background: 'var(--bg-2)',
                        border: '1px solid var(--line)',
                        borderRadius: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--ink-4)',
                        fontFamily: 'var(--f-mono)',
                        fontSize: 12,
                      }}
                    >
                      {feature.badge || 'Feature visualization'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

// ─── How it works ───────────────────────────────────────────────────────────

/**
 * Interactive stepper (same interaction model as the partner page's
 * ApplyStepper): auto-advances every 4s, any step can be opened directly,
 * hover/focus pauses the cycle, completed steps show a check, the active
 * card carries a progress bar for the auto-advance.
 */
const HowItWorksStepper: React.FC<{ steps: any[] }> = ({ steps }) => {
  const [active, setActive] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const reduced = React.useRef(false)

  React.useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  React.useEffect(() => {
    if (paused || reduced.current) return
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 4000)
    return () => clearInterval(id)
  }, [paused, steps.length, active])

  return (
    <div
      className="hiw-stepper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hiw-stepper { max-width: 720px; margin: 0 auto; }
            .hiw-step { position: relative; padding-left: 62px; }
            .hiw-step:not(:last-child)::before {
              content: ''; position: absolute; left: 21px; top: 48px; bottom: -4px; width: 2px;
              background: var(--line); border-radius: 2px;
            }
            .hiw-step.is-done:not(:last-child)::before { background: color-mix(in oklab, var(--accent-a) 55%, var(--line)); }
            /* Solid backgrounds + dark ink: ≥8:1 contrast so audits never
               flag the number chips (color-mix tints sat too close to 4.5). */
            .hiw-step-chip {
              position: absolute; left: 0; top: 4px; width: 44px; height: 44px; border-radius: 12px;
              display: flex; align-items: center; justify-content: center;
              background: #EFF6F2;
              border: 1px solid color-mix(in oklab, var(--accent-a) 26%, var(--line));
              color: #3E3378; font-family: var(--f-mono); font-size: 15px; letter-spacing: 0.04em;
              transition: background .2s ease, border-color .2s ease, transform .2s ease;
            }
            .hiw-step.is-active .hiw-step-chip {
              background: #4C3F95; border-color: #4C3F95; color: #fff; transform: scale(1.06);
            }
            .hiw-step.is-done .hiw-step-chip {
              background: #DDF0E7;
              border-color: color-mix(in oklab, var(--accent-a) 55%, var(--line));
              color: #1F6B4A;
            }
            .hiw-step-btn {
              display: block; width: 100%; text-align: left; cursor: pointer;
              background: var(--paper); border: 1px solid var(--line); border-radius: 16px;
              padding: 16px 20px; margin-bottom: 14px;
              transition: border-color .2s ease, box-shadow .2s ease;
            }
            .hiw-step-btn:hover { border-color: color-mix(in oklab, var(--accent-a) 45%, var(--line)); }
            .hiw-step.is-active .hiw-step-btn {
              border-color: color-mix(in oklab, var(--accent-a) 55%, var(--line));
              box-shadow: 0 14px 30px -22px rgba(15, 17, 21, 0.4);
            }
            .hiw-step-btn:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
            .hiw-step-title { font-size: 16.5px; font-weight: 700; color: var(--ink); }
            .hiw-step-body {
              display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease;
            }
            .hiw-step.is-active .hiw-step-body { grid-template-rows: 1fr; }
            .hiw-step-body > div { overflow: hidden; }
            .hiw-step-desc { margin: 8px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }
            .hiw-step-bar {
              margin-top: 14px; height: 3px; border-radius: 3px; overflow: hidden;
              background: color-mix(in oklab, var(--accent-a) 18%, var(--line));
            }
            .hiw-step-bar > span {
              display: block; height: 100%; width: 0; background: var(--accent-ink); border-radius: inherit;
              animation: hiw-step-fill 4s linear forwards;
            }
            @keyframes hiw-step-fill { to { width: 100%; } }
            @media (prefers-reduced-motion: reduce) {
              .hiw-step-chip, .hiw-step-btn, .hiw-step-body { transition: none; }
              .hiw-step-bar { display: none; }
            }
          `,
        }}
      />
      {steps.map((step: any, index: number) => {
        const state = index === active ? 'is-active' : index < active ? 'is-done' : ''
        return (
          <div key={index} className={`hiw-step ${state}`}>
            <span className="hiw-step-chip" aria-hidden="true">
              {index < active ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                step.number
              )}
            </span>
            <button
              type="button"
              className="hiw-step-btn"
              aria-expanded={index === active}
              onClick={() => setActive(index)}
            >
              <div className="hiw-step-title">{step.title}</div>
              <div className="hiw-step-body">
                <div>
                  <p className="hiw-step-desc">{step.description}</p>
                  {index === active && !reduced.current && (
                    <div className="hiw-step-bar" aria-hidden="true">
                      <span key={active} style={paused ? { animationPlayState: 'paused' } : undefined} />
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        )
      })}
    </div>
  )
}

const HowItWorksSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.steps) return null
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head centered reveal">
          {data.badge && <span className="sec-tag">{data.badge}</span>}
          {data.headline && <h2>{data.headline}</h2>}
          {data.description && <p>{data.description}</p>}
        </div>
        <div className="reveal">
          <HowItWorksStepper steps={data.steps} />
        </div>
      </div>
    </section>
  )
}

// ─── Use cases ──────────────────────────────────────────────────────────────

const UseCasesSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null
  return (
    <section className="section" data-tone="dark">
      <div className="container">
        <div className="sec-head centered reveal">
          {data.badge && <span className="sec-tag">{data.badge}</span>}
          {data.headline && <h2>{data.headline}</h2>}
        </div>
        <div className="card-grid cols-3">
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
              <div className="card-icon">{Check}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.benefits && item.benefits.length > 0 && (
                <ul className="feat-list" style={{ marginTop: 14, marginBottom: 0 }}>
                  {item.benefits.map((benefit: string, bIdx: number) => (
                    <li key={bIdx} style={{ fontSize: 13 }}>
                      <span className="tick" style={{ width: 14, height: 14 }}>{TickIcon}</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonial ────────────────────────────────────────────────────────────

const TestimonialSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null
  return (
    <section className="section">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 64, color: 'var(--accent-ink)', lineHeight: 1, marginBottom: 12 }}>“</div>
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
            {data.quote}
          </blockquote>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 28 }}>
            {data.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.avatar} alt={data.author} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)' }}  loading="lazy"/>
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-2)' }} />
            )}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{data.author}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {data.title}{data.company ? `, ${data.company}` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

const FAQSection: React.FC<{ data: any }> = ({ data }) => {
  // All items start collapsed — open only on click.
  const [openIndices, setOpenIndices] = React.useState<Set<number>>(new Set())
  const [showMoreMobile, setShowMoreMobile] = React.useState(false)
  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }
  if (!data || !data.items) return null
  const items = data.items as Array<{ question: string; answer: string }>
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="sec-head centered reveal">
          {data.badge && <span className="sec-tag">{data.badge}</span>}
          {data.headline && <h2>{data.headline}</h2>}
        </div>
        <div className={`faq-grid${showMoreMobile ? ' faq-show-more' : ''}`}>
          {columns.map((column, colIdx) => (
            <div key={colIdx} className={`faq-col${colIdx === 1 ? ' faq-col-rest' : ''}`}>
              {column.map((item, i) => {
                const idx = colIdx === 0 ? i : i + half
                const isOpen = openIndices.has(idx)
                return (
                  <div key={idx} className={`faq-pill${isOpen ? ' open' : ''}`}>
                    <button
                      className="faq-pill-q"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="faq-pill-chev" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <div className="faq-pill-a">
                      <div>{item.answer}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        {!showMoreMobile && (
          <button
            type="button"
            className="faq-mobile-more"
            onClick={() => setShowMoreMobile(true)}
          >
            Read more
          </button>
        )}
      </div>
    </section>
  )
}

// ─── Translation fallback ───────────────────────────────────────────────────

const featureKeyMap: Record<string, string> = {
  'cloud-backup': 'cloudBackup',
  'team-inbox': 'teamInbox',
  'whatsapp-crm': 'whatsappCrm',
  'quick-reply': 'quickReply',
  'scheduler': 'scheduler',
  'revenue-inbox': 'revenueInbox',
  'rep-radar': 'repRadar',
  'whatsapp-copilot': 'whatsappCopilot',
  'whatsapp-api': 'whatsappApi',
  'coexistence': 'coexistence',
  'templates': 'templates',
  'broadcast': 'broadcast',
}

function getTranslatedFallbackData(slug: string, t: ReturnType<typeof useTranslations>) {
  const featureKey = featureKeyMap[slug]
  if (!featureKey) return null

  try {
    const heroData = t.raw(`features.${featureKey}.hero`)
    if (typeof heroData === 'string' || !heroData) return null

    return {
      hero: {
        badge: t(`features.${featureKey}.hero.badge`),
        headline: t(`features.${featureKey}.hero.headline`),
        headlineHighlight: t(`features.${featureKey}.hero.headlineHighlight`),
        description: t(`features.${featureKey}.hero.description`),
        primaryCta: { label: t(`features.${featureKey}.hero.primaryCta`), url: '#' },
        secondaryCta: { label: t(`features.${featureKey}.hero.secondaryCta`), url: '#' },
      },
      benefits: {
        badge: t(`features.${featureKey}.benefits.badge`),
        headline: t(`features.${featureKey}.benefits.headline`),
        items: t.raw(`features.${featureKey}.benefits.items`) || [],
      },
      features: (t.raw(`features.${featureKey}.sections`) || []).map((section: any, idx: number) => ({
        badge: section.badge,
        headline: section.headline,
        description: section.description,
        points: section.points || [],
        _key: `section-${idx}`,
      })),
      faq: {
        badge: t(`features.${featureKey}.faq.badge`),
        headline: t(`features.${featureKey}.faq.headline`),
        items: t.raw(`features.${featureKey}.faq.items`) || [],
      },
    }
  } catch {
    return null
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface FeaturePageClientProps {
  feature: any
  slug: string
}

export default function FeaturePageClient({ feature, slug }: FeaturePageClientProps) {
  const t = useTranslations()
  const locale = useLocale()
  const translatedData = getTranslatedFallbackData(slug, t)
  const data = feature || translatedData

  if (!data) return null

  return (
    <>
      <HeroSection data={data?.hero} />
      <BenefitsSection data={data?.benefits} />
      <FeaturesSection features={data?.features} slug={slug} locale={locale} />
      <HowItWorksSection data={data?.howItWorks} />
      <UseCasesSection data={data?.useCases} />
      {data?.testimonial && <TestimonialSection data={data.testimonial} />}
      <FAQSection data={data?.faq} />
    </>
  )
}
