'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  X,
  Minus,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTrialModal } from '@/providers/TrialModalProvider'

const MODAL_TRIGGERS: Record<string, 'trial' | 'demo'> = {
  '#trial': 'trial',
  '#demo': 'demo',
}

const TickIcon = (
  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

const CardCheck = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

// ─── Hero ───────────────────────────────────────────────────────────────────

const HeroCta: React.FC<{
  cta: { label?: string; url?: string }
  variant: 'primary' | 'outline'
  showArrow?: boolean
}> = ({ cta, variant, showArrow }) => {
  const { openModal } = useTrialModal()
  const url = cta.url || ''
  const modalKind = MODAL_TRIGGERS[url]
  const className = `btn btn-lg ${variant === 'primary' ? 'btn-primary' : 'btn-outline'}`
  const content = (
    <>
      {cta.label}
      {showArrow && ' →'}
    </>
  )
  if (modalKind) {
    return <button className={className} onClick={() => openModal(modalKind)}>{content}</button>
  }
  if (url.startsWith('http')) {
    return <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
  }
  return <Link href={url || '#'} className={className}>{content}</Link>
}

const HeroSection: React.FC<{ data: any }> = ({ data }) => {
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
          {data.primaryCta && <HeroCta cta={data.primaryCta} variant="primary" showArrow />}
          {data.secondaryCta && <HeroCta cta={data.secondaryCta} variant="outline" />}
        </div>
      </div>
    </section>
  )
}

// ─── Intro ──────────────────────────────────────────────────────────────────

const IntroSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null
  return (
    <section className="section" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="container">
        <div className="sec-head centered reveal">
          {data.headline && <h2>{data.headline}</h2>}
          {data.description && <p style={{ whiteSpace: 'pre-line' }}>{data.description}</p>}
        </div>
      </div>
    </section>
  )
}

// ─── Featured items grid ────────────────────────────────────────────────────

const FeaturedItemsSection: React.FC<{ items: any[]; category: string }> = ({ items, category }) => {
  const locale = useLocale()
  if (!items || items.length === 0) return null
  const langPrefix = locale === 'en' ? '' : `/${locale}`

  const labels: Record<string, { featured: string; more: string; learnMore: string }> = {
    en: { featured: 'Featured', more: 'More Options', learnMore: 'Learn more' },
    es: { featured: 'Destacados', more: 'Más Opciones', learnMore: 'Más información' },
    br: { featured: 'Destaques', more: 'Mais Opções', learnMore: 'Saiba mais' },
    tr: { featured: 'Öne Çıkanlar', more: 'Daha Fazla Seçenek', learnMore: 'Daha fazla bilgi' },
  }
  const L = labels[locale] || labels.en

  const getItemUrl = (item: any) => {
    if (category === 'feature') return `${langPrefix}/features/${item.slug}`
    if (category === 'whatsapp-api') return `${langPrefix}/whatsapp-api/${item.slug}`
    if (category === 'integration') {
      if (item.slug.endsWith('-whatsapp-integration')) return `${langPrefix}/${item.slug}`
      return `${langPrefix}/${item.slug}-whatsapp-integration`
    }
    return `${langPrefix}/${item.slug}`
  }

  const featuredItems = items.filter((item) => item.isFeatured)
  const otherItems = items.filter((item) => !item.isFeatured)

  return (
    <section className="section" style={{ paddingTop: 30 }}>
      <div className="container">
        {featuredItems.length > 0 && (
          <>
            <div className="sec-head centered reveal" style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)' }}>{L.featured}</h2>
            </div>
            <div className="card-grid cols-3" style={{ marginBottom: 56 }}>
              {featuredItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={getItemUrl(item)}
                  className="card reveal"
                  style={{ transitionDelay: `${idx * 0.05}s`, display: 'block' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: 3,
                      borderTopLeftRadius: 'var(--r-lg)',
                      borderTopRightRadius: 'var(--r-lg)',
                      background: item.color || 'var(--accent-a)',
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div
                      className="card-icon"
                      style={{
                        background: item.color ? `color-mix(in oklab, ${item.color} 20%, var(--paper))` : undefined,
                        borderColor: item.color ? `color-mix(in oklab, ${item.color} 40%, var(--line))` : undefined,
                        color: item.color || 'var(--accent-ink)',
                      }}
                    >
                      {CardCheck}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        {item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            style={{
                              fontFamily: 'var(--f-mono)',
                              fontSize: 10,
                              padding: '3px 8px',
                              borderRadius: 6,
                              background: 'var(--bg-2)',
                              color: 'var(--ink-3)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div
                    style={{
                      marginTop: 16,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: 'var(--accent-ink)',
                      fontFamily: 'var(--f-sans)',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {L.learnMore} <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {otherItems.length > 0 && (
          <>
            <div className="sec-head centered reveal" style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 28px)' }}>{L.more}</h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 14,
                maxWidth: 1100,
                margin: '0 auto',
              }}
            >
              {otherItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={getItemUrl(item)}
                  className="card reveal"
                  style={{ transitionDelay: `${idx * 0.03}s`, display: 'block', padding: 18 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: item.color ? `color-mix(in oklab, ${item.color} 20%, var(--paper))` : 'color-mix(in oklab, var(--accent-a) 18%, var(--paper))',
                        border: '1px solid color-mix(in oklab, ' + (item.color || 'var(--accent-a)') + ' 35%, var(--line))',
                        color: item.color || 'var(--accent-ink)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {TickIcon}
                    </div>
                    <h3 style={{ fontSize: 16, marginBottom: 0 }}>{item.name}</h3>
                  </div>
                  <p style={{ fontSize: 13, marginBottom: 0 }}>{item.description}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ─── Comparison table ───────────────────────────────────────────────────────

const ComparisonSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.rows) return null

  const renderValue = (value: { type: string; text?: string }) => {
    switch (value.type) {
      case 'check': return <Check className="w-5 h-5" style={{ color: 'var(--ok)', margin: '0 auto', display: 'block' }} />
      case 'cross': return <X className="w-5 h-5" style={{ color: 'var(--ink-4)', margin: '0 auto', display: 'block' }} />
      case 'partial': return <Minus className="w-5 h-5" style={{ color: 'var(--warn)', margin: '0 auto', display: 'block' }} />
      case 'text': return <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{value.text}</span>
      default: return null
    }
  }

  return (
    <section id="comparison" className="section" data-tone="dark">
      <div className="container">
        <div className="sec-head centered reveal">
          <h2>{data.headline}</h2>
          {data.description && <p>{data.description}</p>}
        </div>
        <div
          className="reveal"
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: 18,
            overflow: 'hidden',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: 14,
              padding: 20,
              background: 'var(--bg-2)',
              borderBottom: '1px solid var(--line)',
              gridTemplateColumns: `2fr repeat(${(data.columns?.length || 2) - 1}, 1fr)`,
            }}
          >
            {data.columns?.map((col: string, idx: number) => (
              <div
                key={idx}
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: idx === 0 ? 'var(--ink-4)' : 'var(--accent-ink)',
                  textAlign: idx === 0 ? 'left' : 'center',
                }}
              >
                {col}
              </div>
            ))}
          </div>
          {data.rows.map((row: any, idx: number) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gap: 14,
                padding: 18,
                borderBottom: idx < data.rows.length - 1 ? '1px solid var(--line)' : 'none',
                gridTemplateColumns: `2fr repeat(${(data.columns?.length || 2) - 1}, 1fr)`,
                alignItems: 'center',
              }}
            >
              <div style={{ fontWeight: 500, color: 'var(--ink-2)', fontSize: 14 }}>{row.feature}</div>
              {row.values?.map((value: any, vIdx: number) => (
                <div key={vIdx} style={{ textAlign: 'center' }}>{renderValue(value)}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Benefits ───────────────────────────────────────────────────────────────

const BenefitsSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head centered reveal">
          {data.badge && <span className="sec-tag">{data.badge}</span>}
          {data.headline && <h2>{data.headline}</h2>}
        </div>
        <div className="card-grid cols-3">
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
              <div className="card-icon">{CardCheck}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works ───────────────────────────────────────────────────────────

const HowItWorksSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.steps) return null
  return (
    <section className="section" data-tone="dark">
      <div className="container">
        <div className="sec-head centered reveal">
          {data.badge && <span className="sec-tag">{data.badge}</span>}
          {data.headline && <h2>{data.headline}</h2>}
          {data.description && <p>{data.description}</p>}
        </div>
        <div className="card-grid cols-3">
          {data.steps.map((step: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ transitionDelay: `${idx * 0.05}s`, textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--f-display)',
                  fontSize: 56,
                  fontWeight: 400,
                  color: 'color-mix(in oklab, var(--accent-a) 60%, var(--paper))',
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
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

// ─── Final CTA ──────────────────────────────────────────────────────────────

const CTASection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null
  return (
    <section className="final-cta" data-tone="dark">
      <div className="container">
        <h2 className="reveal">
          {data.headline}
          {data.headlineHighlight ? <> <em>{data.headlineHighlight}</em></> : null}
        </h2>
        {data.description && <p className="sub reveal">{data.description}</p>}
        <div className="ctas reveal">
          {data.primaryCta && (
            <a href={data.primaryCta.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              {data.primaryCta.label} →
            </a>
          )}
          {data.secondaryCta && (
            <a href={data.secondaryCta.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
              {data.secondaryCta.label}
            </a>
          )}
        </div>
        {data.footnote && (
          <p
            className="reveal"
            style={{
              marginTop: 24,
              color: 'var(--ink-4)',
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {data.footnote}
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface CategoryIndexClientProps {
  data: any
  category: string
}

export default function CategoryIndexClient({ data, category }: CategoryIndexClientProps) {
  if (!data) return null
  return (
    <>
      <HeroSection data={data.hero} />
      {data.intro && <IntroSection data={data.intro} />}
      <FeaturedItemsSection items={data.featuredItems} category={category} />
      {data.comparisonTable && <ComparisonSection data={data.comparisonTable} />}
      <BenefitsSection data={data.benefits} />
      <HowItWorksSection data={data.howItWorks} />
      <FAQSection data={data.faq} />
      {data.cta && <CTASection data={data.cta} />}
    </>
  )
}
