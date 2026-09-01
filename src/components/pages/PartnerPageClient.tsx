'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { PartnerDirectory } from '@/components/pages/PartnerDirectory'
import { PARTNERS, type PartnerRecord } from '@/data/partner-directory'
import {
  Users,
  DollarSign,
  Award,
  Rocket,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  Mail,
  Trophy,
} from 'lucide-react'
import { LocalizedLink } from '@/components/LocalizedLink'

/**
 * `logo` points at a real brand mark under /public/integrations/. It is
 * optional: an entry without one falls back to its name, which is better
 * than an approximated logo sitting next to genuine ones. Every entry has
 * a real mark today.
 */
const integrations = [
  { name: 'Zoho CRM', url: '/zoho-whatsapp-integration', logo: '/integrations/zoho.svg' },
  { name: 'HubSpot', url: '/hubspot-whatsapp-integration', logo: '/integrations/hubspot.svg' },
  { name: 'Salesforce', url: '/salesforce-whatsapp-integration', logo: '/integrations/salesforce.svg' },
  { name: 'Pipedrive', url: '/pipedrive-whatsapp-integration', logo: '/integrations/pipedrive.svg' },
  // Freshdesk is a Freshworks product and shares its mark.
  { name: 'Freshdesk', url: '/freshdesk-whatsapp-integration', logo: '/integrations/freshworks.svg' },
  { name: 'LeadSquared', url: '/leadsquared-whatsapp-integration', logo: '/integrations/leadsquared.svg' },
]

/**
 * Interactive "How to apply" stepper: steps auto-advance every few seconds
 * (paused on hover/focus, disabled for reduced-motion users), and any step
 * can be opened directly. Completed steps show a check; the active card
 * carries a progress bar for the auto-advance.
 */
function ApplyStepper({ steps }: { steps: Array<{ step: string; title: string; desc: string }> }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reduced.current) return
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 4000)
    return () => clearInterval(id)
  }, [paused, steps.length, active])

  return (
    <div
      className="pp-stepper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pp-stepper { max-width: 720px; margin: 0 auto; }
            .pp-step { position: relative; padding-left: 62px; }
            .pp-step:not(:last-child)::before {
              content: ''; position: absolute; left: 21px; top: 48px; bottom: -4px; width: 2px;
              background: var(--line); border-radius: 2px;
            }
            .pp-step.is-done:not(:last-child)::before { background: color-mix(in oklab, var(--accent-a) 55%, var(--line)); }
            .pp-step-chip {
              position: absolute; left: 0; top: 4px; width: 44px; height: 44px; border-radius: 12px;
              display: flex; align-items: center; justify-content: center;
              background: color-mix(in oklab, var(--accent-a) 10%, var(--paper));
              border: 1px solid color-mix(in oklab, var(--accent-a) 26%, var(--line));
              color: var(--accent-ink); font-family: var(--f-display); font-size: 19px;
              transition: background .2s ease, border-color .2s ease, transform .2s ease;
            }
            .pp-step.is-active .pp-step-chip {
              background: var(--accent-ink); border-color: var(--accent-ink); color: #fff; transform: scale(1.06);
            }
            .pp-step.is-done .pp-step-chip {
              background: color-mix(in oklab, var(--accent-a) 26%, var(--paper));
              border-color: color-mix(in oklab, var(--accent-a) 55%, var(--line));
            }
            .pp-step-btn {
              display: block; width: 100%; text-align: left; cursor: pointer;
              background: var(--paper); border: 1px solid var(--line); border-radius: 16px;
              padding: 16px 20px; margin-bottom: 14px;
              transition: border-color .2s ease, box-shadow .2s ease;
            }
            .pp-step-btn:hover { border-color: color-mix(in oklab, var(--accent-a) 45%, var(--line)); }
            .pp-step.is-active .pp-step-btn {
              border-color: color-mix(in oklab, var(--accent-a) 55%, var(--line));
              box-shadow: 0 14px 30px -22px rgba(15, 17, 21, 0.4);
            }
            .pp-step-btn:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
            .pp-step-title { font-size: 16.5px; font-weight: 700; color: var(--ink); }
            .pp-step-body {
              display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease;
            }
            .pp-step.is-active .pp-step-body { grid-template-rows: 1fr; }
            .pp-step-body > div { overflow: hidden; }
            .pp-step-desc { margin: 8px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }
            .pp-step-bar {
              margin-top: 14px; height: 3px; border-radius: 3px; overflow: hidden;
              background: color-mix(in oklab, var(--accent-a) 18%, var(--line));
            }
            .pp-step-bar > span {
              display: block; height: 100%; width: 0; background: var(--accent-ink); border-radius: inherit;
              animation: pp-step-fill 4s linear forwards;
            }
            .pp-stepper.is-paused .pp-step-bar > span { animation-play-state: paused; }
            @keyframes pp-step-fill { to { width: 100%; } }
            @media (prefers-reduced-motion: reduce) {
              .pp-step-chip, .pp-step-btn, .pp-step-body { transition: none; }
              .pp-step-bar { display: none; }
            }
          `,
        }}
      />
      <div className={paused ? 'is-paused' : undefined}>
        {steps.map((item, index) => {
          const state = index === active ? 'is-active' : index < active ? 'is-done' : ''
          return (
            <div key={index} className={`pp-step ${state}`}>
              <span className="pp-step-chip" aria-hidden="true">
                {index < active ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  item.step
                )}
              </span>
              <button
                type="button"
                className="pp-step-btn"
                aria-expanded={index === active}
                onClick={() => setActive(index)}
              >
                <div className="pp-step-title">{item.title}</div>
                <div className="pp-step-body">
                  <div>
                    <p className="pp-step-desc">{item.desc}</p>
                    {index === active && !reduced.current && (
                      <div className="pp-step-bar" aria-hidden="true">
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
    </div>
  )
}

const testimonialAvatars = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=3',
]

const benefitIcons = [DollarSign, Users, Rocket, Shield, Award, Zap]
const benefitKeys = ['revenueShare', 'expandedPortfolio', 'mutualGrowth', 'prioritySupport', 'certifiedBadge', 'earlyAccess'] as const

const Check = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)
const Star = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
)

export function PartnerPageClient({
  partners = PARTNERS,
}: {
  /** Sanity-managed partner list; defaults to the static sample data. */
  partners?: PartnerRecord[]
} = {}) {
  const t = useTranslations('partner')
  const locale = useLocale()
  const homeHref = locale === 'en' ? 'https://eazybe.com/' : `https://eazybe.com/${locale}`
  const steps = t.raw('steps') as Array<{ step: string; title: string; desc: string }>
  const testimonials = t.raw('testimonials') as Array<{ quote: string; author: string; role: string; earnings: string }>
  const faqs = t.raw('faqs') as Array<{ question: string; answer: string }>

  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set())
  const [showMoreFaqMobile, setShowMoreFaqMobile] = useState(false)
  const toggleFaq = (i: number) => setOpenFaq((p) => {
    const n = new Set(p)
    if (n.has(i)) n.delete(i)
    else n.add(i)
    return n
  })

  return (
    <>
      {/* Hero */}
      <section className="page-hero" data-tone="dark">
        <div className="container">
          <span className="hero-tag reveal"><span className="pulse" /> {String(t('heroBadge')).toUpperCase()}</span>
          <h1 className="reveal">
            {t('heroHeadline')} <em>{t('heroHighlight')}</em>
          </h1>
          <p className="lede reveal">{t('heroSubheadline')}</p>

          <div
            className="reveal"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              marginTop: 28,
            }}
          >
            {[t('freeToJoin'), t('hourApproval'), t('dedicatedSupport'), t('unlimitedEarnings')].map((text) => (
              <span
                key={text}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: 100,
                  fontSize: 13,
                  color: 'var(--ink-2)',
                }}
              >
                <span style={{ color: 'var(--ok)' }}>{Check}</span> {text}
              </span>
            ))}
          </div>

          <div
            className="reveal"
            style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap' }}
          >
            <a href="#apply" className="btn btn-primary btn-lg">{t('applyNow')} →</a>
            <a href="https://eazybe.info/demono" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
              {t('scheduleCall')}
            </a>
          </div>

          <div
            className="reveal"
            style={{
              margin: '56px auto 0',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 14,
            }}
          >
            {[
              { Icon: Shield, text: t('badgeBsp'), tint: '#7FD6B0' },
              { Icon: CheckCircle2, text: t('badgeGdpr'), tint: '#8FB7F5' },
              { Icon: Globe, text: t('badgeCountries'), tint: '#E8C77E' },
            ].map(({ Icon, text, tint }) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px 6px 7px',
                  borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.13)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    borderRadius: 999,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `color-mix(in oklab, ${tint} 16%, transparent)`,
                    border: `1px solid color-mix(in oklab, ${tint} 40%, transparent)`,
                  }}
                >
                  <Icon size={12} style={{ color: tint }} />
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#E8EAF0', lineHeight: 1.3, textAlign: 'left' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission tiers — sits before Benefits because the money answers
          the first question a prospective partner has; the reasons to
          partner land better once the rate is known. */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              background: 'var(--surface-2, #F7F8F9)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              padding: '40px 32px',
            }}
          >
            <div className="sec-head centered" style={{ marginBottom: 28 }}>
              <h2>{t('tiersTitle')}</h2>
              <p>{t('tiersSubtitle')}</p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 24,
                maxWidth: 820,
                margin: '0 auto',
              }}
            >
              {[
                { Icon: Award, name: t('growthName'), share: t('growthShare'), desc: t('growthDesc') },
                { Icon: Trophy, name: t('premierName'), share: t('premierShare'), desc: t('premierDesc') },
              ].map(({ Icon, name, share, desc }, i) => (
                <div key={name} className="reveal" style={{ textAlign: 'center', transitionDelay: `${i * 0.06}s` }}>
                  {/* margin auto, not text-align: a global rule makes these
                      SVGs display:block, so centring has to be on the box. */}
                  <Icon size={34} strokeWidth={1.5} style={{ color: 'var(--accent-ink)', display: 'block', margin: '0 auto' }} />
                  <h3 style={{ marginTop: 12, marginBottom: 4 }}>{name}</h3>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{share}</div>
                  <p style={{ color: 'var(--ink-3)', maxWidth: 380, margin: '0 auto' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current partners directory — renders nothing when the list is empty,
          so deactivating every partner in Sanity hides the whole section. */}
      {partners.length > 0 && (
        <section className="section" style={{ paddingTop: 20, paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 1240 }}>
            <div className="sec-head centered" style={{ marginBottom: 30 }}>
              <h2>{t('dirHeading')} <em>{t('dirHeadingHighlight')}</em></h2>
            </div>
            <PartnerDirectory
              labels={{
                heading: t('dirHeading'),
                headingHighlight: t('dirHeadingHighlight'),
                searchPlaceholder: t('dirSearchPlaceholder'),
                filters: t('dirFilters'),
                resetAll: t('dirResetAll'),
                activeFilters: t('dirActiveFilters'),
                clearAll: t('dirClearAll'),
                // t.raw: these carry a literal "{count}" that the directory
                // splits on itself. t() would read it as an ICU placeholder
                // and fail without a `count` argument.
                showing: t.raw('dirShowing') as string,
                showingOne: t.raw('dirShowingOne') as string,
                empty: t('dirEmpty'),
                readMore: t('dirReadMore'),
                readLess: t('dirReadLess'),
                regionLabel: t('dirRegionLabel'),
                crmLabel: t('dirCrmLabel'),
                specialtyLabel: t('dirSpecialtyLabel'),
                regions: { brasil: t('dirRegionBrasil'), latam: t('dirRegionLatam'), row: t('dirRegionRow') },
                crms: {
                  hubspot: t('dirCrmHubspot'), pipedrive: t('dirCrmPipedrive'),
                  salesforce: t('dirCrmSalesforce'), zoho: t('dirCrmZoho'), other: t('dirCrmOther'),
                },
                verified: t('dirVerified'),
                viewPost: t('dirViewPost'),
              }}
              partners={partners}
            />
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="section" data-tone="dark" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t('benefitsSubtitle')}</span>
            <h2>{t('whyPartnerTitle')}</h2>
            <p>
              {(() => {
                const desc = t('whyPartnerDesc')
                const term = 'WhatsApp CRM'
                const i = desc.indexOf(term)
                if (i === -1) return desc
                return (
                  <>
                    {desc.slice(0, i)}
                    <a
                      href={`https://eazybe.com${locale === 'en' ? '' : `/${locale}`}/features/whatsapp-crm`}
                      style={{ color: '#7FD6B0', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      {term}
                    </a>
                    {desc.slice(i + term.length)}
                  </>
                )
              })()}
            </p>
          </div>
          <div className="card-grid cols-3">
            {benefitKeys.map((key, index) => {
              const Icon = benefitIcons[index]
              return (
                <div key={key} className="card reveal" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <div className="card-icon"><Icon size={20} /></div>
                  <div
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-ink)',
                      marginBottom: 6,
                    }}
                  >
                    {t(`benefits.${key}.subtitle`)}
                  </div>
                  <h3>{t(`benefits.${key}.title`)}</h3>
                  <p>
                    {(() => {
                      const desc = t(`benefits.${key}.description`)
                      if (key !== 'certifiedBadge') return desc
                      const i = desc.indexOf('Eazybe')
                      if (i === -1) return desc
                      return (
                        <>
                          {desc.slice(0, i)}
                          <a href={homeHref} style={{ color: '#7FD6B0', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                            Eazybe
                          </a>
                          {desc.slice(i + 'Eazybe'.length)}
                        </>
                      )
                    })()}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="section" style={{ paddingBottom: 80 }}>
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t('simpleProcess')}</span>
            <h2>{t('howToApplyTitle')}</h2>
            <p>{t('howToApplyDesc')}</p>
          </div>
          <ApplyStepper steps={steps} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t('testimonialsSubtitle')}</span>
            <h2>{t('testimonialsTitle')}</h2>
            <p>{t('testimonialsDesc')}</p>
          </div>
          <div className="card-grid cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card reveal" style={{ transitionDelay: `${index * 0.05}s` }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14, color: 'var(--warn)' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{Star}</span>
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', fontSize: 15, marginBottom: 18 }}>&ldquo;{testimonial.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonialAvatars[index]}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%', border: '2px solid var(--line)' }}
                   loading="lazy"/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{testimonial.author}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-4)' }}>{testimonial.role}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Earned
                    </div>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, color: 'var(--ok)' }}>{testimonial.earnings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section" data-tone="dark" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <p
            className="reveal"
            style={{
              textAlign: 'center',
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              color: 'var(--ink-4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            {t('integrationsTitle')}
          </p>
          <div
            className="reveal"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
            }}
          >
            {integrations.map((integration) => (
              <LocalizedLink
                key={integration.name}
                href={integration.url}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'var(--f-display)',
                  fontSize: 17,
                  fontWeight: 400,
                  color: 'var(--ink-2)',
                  transition: 'color .2s',
                }}
              >
                {integration.logo && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={integration.logo}
                    alt=""
                    width={26}
                    height={26}
                    loading="lazy"
                    style={{ width: 26, height: 26, objectFit: 'contain', flexShrink: 0 }}
                  />
                )}
                {integration.name}
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      {/* Apply section */}
      <section id="apply" className="section" style={{ paddingBottom: 80 }}>
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t('applyTag')}</span>
            <h2>{t('applyTitle')}</h2>
            <p>{t('applyDesc')}</p>
          </div>

          <div className="card-grid cols-3" style={{ marginBottom: 32 }}>
            {[
              { Icon: Zap, title: t('fastApproval'), desc: t('fastApprovalDesc') },
              { Icon: Users, title: t('dedicatedSupportTitle'), desc: t('dedicatedSupportDesc') },
              { Icon: DollarSign, title: t('noUpfrontCosts'), desc: t('noUpfrontCostsDesc') },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="card reveal" style={{ textAlign: 'center', transitionDelay: `${i * 0.05}s` }}>
                <div className="card-icon" style={{ margin: '0 auto 14px' }}><Icon size={20} /></div>
                <h3 style={{ fontSize: 16 }}>{title}</h3>
                <p style={{ fontSize: 13, marginBottom: 0 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div
            className="reveal"
            style={{
              maxWidth: 640,
              margin: '0 auto',
              padding: 28,
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 18,
              textAlign: 'center',
            }}
          >
            <p style={{ marginBottom: 16 }}>{t('haveQuestions')}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              <a
                href="mailto:hey@eazybe.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--accent-ink)',
                  fontWeight: 500,
                }}
              >
                <Mail size={16} /> hey@eazybe.com
              </a>
              <a
                href="https://eazybe.info/demono"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--accent-ink)',
                  fontWeight: 500,
                }}
              >
                <Mail size={16} /> {t('scheduleCall')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-ink" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t('faqTag')}</span>
            <h2>{t('faqTitle')}</h2>
            <p>{t('faqDesc')}</p>
          </div>
          {(() => {
            const half = Math.ceil(faqs.length / 2)
            const columns = [faqs.slice(0, half), faqs.slice(half)]
            return (
              <div className={`faq-grid${showMoreFaqMobile ? ' faq-show-more' : ''}`}>
                {columns.map((column, colIdx) => (
                  <div key={colIdx} className={`faq-col${colIdx === 1 ? ' faq-col-rest' : ''}`}>
                    {column.map((faq, i) => {
                      const idx = colIdx === 0 ? i : i + half
                      const isOpen = openFaq.has(idx)
                      return (
                        <div key={idx} className={`faq-pill${isOpen ? ' open' : ''}`}>
                          <button
                            className="faq-pill-q"
                            onClick={() => toggleFaq(idx)}
                            aria-expanded={isOpen}
                            aria-controls={`faq-panel-${idx}`}
                            id={`faq-q-${idx}`}
                          >
                            <span>{faq.question}</span>
                            <span className="faq-pill-chev" aria-hidden="true">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </button>
                          <div
                            className="faq-pill-a"
                            id={`faq-panel-${idx}`}
                            role="region"
                            aria-labelledby={`faq-q-${idx}`}
                          >
                            <div>{faq.answer}</div>
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
              {t('readMore')}
            </button>
          )}
          <div
            className="reveal"
            style={{
              maxWidth: 640,
              margin: '32px auto 0',
              padding: 24,
              background: 'var(--bg-2)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              textAlign: 'center',
            }}
          >
            <p style={{ marginBottom: 10 }}>{t('faqStillHave')}</p>
            <a
              href="mailto:hey@eazybe.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--accent-ink)',
                fontWeight: 500,
              }}
            >
              <Mail size={16} /> {t('emailUs')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
