'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
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

const animationMap: Record<string, Record<number, React.FC>> = {
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
          <div
            className="reveal"
            style={{
              marginTop: 60,
              display: 'grid',
              gridTemplateColumns: `repeat(${data.stats.length}, 1fr)`,
              gap: 32,
              maxWidth: 720,
              margin: '60px auto 0',
              borderTop: '1px solid var(--line)',
              paddingTop: 28,
            }}
          >
            {data.stats.map((stat: any, idx: number) => (
              <div key={idx}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 24, fontWeight: 400, color: 'var(--ink)' }}>{stat.value}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Benefits ───────────────────────────────────────────────────────────────

const BenefitsSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null
  return (
    <section className="section" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="sec-head centered reveal">
          {data.badge && <span className="sec-tag">{data.badge}</span>}
          {data.headline && <h2>{data.headline}</h2>}
        </div>
        <div className={`card-grid ${data.items.length === 2 ? 'cols-2' : 'cols-3'}`}>
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
              <div className="card-icon">{Check}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features (alternating with animations) ─────────────────────────────────

const FeaturesSection: React.FC<{ features: any[]; slug: string }> = ({ features, slug }) => {
  if (!features || features.length === 0) return null
  const slugAnimations = animationMap[slug]
  return (
    <div id="features">
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

                <div className="visual reveal" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  {AnimationComponent ? (
                    <AnimationComponent />
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
        <div className="card-grid cols-3">
          {data.steps.map((step: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--accent-ink)', letterSpacing: '0.1em', marginBottom: 14 }}>
                {step.number}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
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
  const [openIndices, setOpenIndices] = React.useState<Set<number>>(new Set([0]))
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
  const translatedData = getTranslatedFallbackData(slug, t)
  const data = feature || translatedData

  if (!data) return null

  return (
    <>
      <HeroSection data={data?.hero} />
      <BenefitsSection data={data?.benefits} />
      <FeaturesSection features={data?.features} slug={slug} />
      <HowItWorksSection data={data?.howItWorks} />
      <UseCasesSection data={data?.useCases} />
      {data?.testimonial && <TestimonialSection data={data.testimonial} />}
      <FAQSection data={data?.faq} />
    </>
  )
}
