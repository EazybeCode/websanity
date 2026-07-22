'use client'

import React, { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  AlertTriangle,
  Cloud,
  X,
  Smartphone,
  Zap,
  Users,
  RefreshCw
} from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { LocalizedLink } from '@/components/LocalizedLink'

const BADGE_VARIANT: 'cyan' | 'orange' | 'green' | 'default' = 'cyan'

// Heading typography lifted from the home page (landing-v3.css: `.hero h1` and
// `.sec-head h2`) so this page's headings match the rest of the site — the
// light Geist display font at weight 400 with a responsive clamp() size, instead
// of the heavy bold Inter used before. Inline so they beat the Tailwind weight/
// size utilities; color is left untouched.
const HERO_H1_STYLE: React.CSSProperties = {
  fontFamily: 'var(--f-display)',
  fontWeight: 400,
  fontSize: 'clamp(30px, 4.2vw, 60px)',
  lineHeight: 1.08,
  letterSpacing: '-0.025em',
}
const SECTION_H2_STYLE: React.CSSProperties = {
  fontFamily: 'var(--f-display)',
  fontWeight: 400,
  fontSize: 'clamp(26px, 3.6vw, 48px)',
  lineHeight: 1.12,
  letterSpacing: '-0.018em',
}
// Card title size from the home page's `.p-card h3` (landing-v3.css) — 24px
// display font at weight 400, not the heavy 20px bold Inter used before.
const CARD_H3_STYLE: React.CSSProperties = {
  fontFamily: 'var(--f-display)',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
}

// ================== Button ==================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200"
  const variants = {
    primary: "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700",
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white"
  }
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ================== Hero Section ==================
const HeroSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-brand-black border-b border-slate-800" data-tone="dark">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]"></div>
      {/* Soft green/teal glow matching the /whatsapp-api/templates hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 100%, rgba(16,185,129,0.16), transparent 70%), radial-gradient(45% 40% at 85% 8%, rgba(6,182,212,0.12), transparent 70%)',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && (
            <div className="mb-8 animate-fade-in-up">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}

          <h1 className="text-white mb-6" style={HERO_H1_STYLE}>
            {data.headline}{' '}
            <span className="text-brand-cyan">{data.headlineHighlight}</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            {data.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {data.primaryCta && (
              <LocalizedLink href={data.primaryCta.url}>
                <Button variant="primary" className="h-14 px-8 text-base bg-brand-blue border-brand-blue hover:bg-brand-blue/90">
                  {data.primaryCta.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </LocalizedLink>
            )}
            {data.secondaryCta && (
              <LocalizedLink href={data.secondaryCta.url}>
                <Button variant="outline" className="h-14 px-8 text-base">
                  {data.secondaryCta.label}
                </Button>
              </LocalizedLink>
            )}
          </div>

          {data.stats && data.stats.length > 0 && (
            <div className="flex justify-center gap-12 pt-8 border-t border-slate-800/50">
              {data.stats.map((stat: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ================== Benefits Section ==================
const BenefitsSection: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.badge && (
            <div className="mb-6">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}
          <h2 className="text-white mb-4" style={SECTION_H2_STYLE}>
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-[#0B0D12] border border-slate-800 hover:border-slate-700 hover:shadow-card-hover transition-all duration-300 rounded-2xl p-6 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-brand-cyan/10 text-brand-cyan shadow-glow-cyan">
                <Cloud size={24} />
              </div>
              <h3 className="text-[#F1F5F9] mb-2" style={CARD_H3_STYLE}>{item.title}</h3>
              <p className="text-[#9AA0B0] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== Feature Visuals ==================
// Hand-coded mockups (no images) matching the home page's approach. They use the
// landing CSS variables (--paper/--ink/--line/--bg-2/--ok), so they invert
// automatically on the dark feature sections. `kind` maps to the Sanity `image`
// string (sync-visual / workflow-visual / mini-crm-visual); anything else falls
// back to a simple placeholder.
const V_ACCENT = '#0EA5C4'
const V_ACCENT_SOFT = 'rgba(14,165,196,0.12)'
const V_GREEN = '#22c55e'
const V_GREEN_SOFT = 'rgba(34,197,94,0.14)'

const vCard: React.CSSProperties = {
  width: '100%',
  background: 'var(--paper)',
  border: '1px solid var(--line)',
  borderRadius: 18,
  padding: 18,
  boxShadow: '0 20px 60px -30px rgba(15,17,21,0.22)',
  fontFamily: 'var(--f-sans)',
}
const vPill = (color: string, bg: string): React.CSSProperties => ({
  fontSize: 11,
  fontWeight: 600,
  color,
  background: bg,
  padding: '4px 10px',
  borderRadius: 100,
  whiteSpace: 'nowrap',
})

const SyncVisual = () => (
  <div style={vCard}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--line)', marginBottom: 14 }}>
      <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>+1 302 412 9610</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-3)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: V_GREEN }} /> Connected
      </span>
    </div>
    {[
      { icon: <Smartphone size={18} />, title: 'WhatsApp App', sub: 'Chats, calls, media' },
      { icon: <Zap size={18} />, title: 'WhatsApp API', sub: 'Bulk broadcasts at scale' },
    ].map((r, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: V_ACCENT_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', color: V_ACCENT, flexShrink: 0 }}>{r.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r.sub}</div>
        </div>
        <span style={vPill('#16a34a', V_GREEN_SOFT)}>Active</span>
      </div>
    ))}
    <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>One number, both channels live</div>
  </div>
)

const WorkflowVisual = () => (
  <div style={vCard}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Broadcast campaign</span>
      <span style={vPill(V_ACCENT, V_ACCENT_SOFT)}>Official API</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: 'var(--ink-3)', fontSize: 13 }}>
      <Users size={16} style={{ color: V_ACCENT }} />
      <span><strong style={{ color: 'var(--ink)' }}>10,000</strong> contacts selected</span>
    </div>
    <div style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: '12px 12px 12px 4px', padding: '10px 12px', fontSize: 13, color: 'var(--ink)', marginBottom: 16, maxWidth: '88%' }}>
      Hi {'{name}'} 👋 Your exclusive 20% offer is live today only.
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', marginBottom: 6 }}>
      <span>Delivered</span>
      <span><strong style={{ color: 'var(--ink)' }}>8,432</strong> / 10,000</span>
    </div>
    <div style={{ height: 8, borderRadius: 100, background: 'var(--bg-2)', overflow: 'hidden' }}>
      <div style={{ width: '84%', height: '100%', background: V_GREEN, borderRadius: 100 }} />
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
      <span style={vPill('#16a34a', V_GREEN_SOFT)}>0 numbers blocked</span>
      <span style={vPill('var(--ink-3)', 'var(--bg-2)')}>99.2% delivery</span>
    </div>
  </div>
)

const MiniCrmVisual = () => (
  <div style={vCard}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12, borderBottom: '1px solid var(--line)', marginBottom: 12 }}>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: V_ACCENT_SOFT, color: V_ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>SL</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Sarah Lin</div>
        <div style={{ fontSize: 11, color: V_GREEN }}>online</div>
      </div>
      <RefreshCw size={15} style={{ color: V_ACCENT }} />
    </div>
    <div style={{ background: 'var(--bg-2)', borderRadius: '4px 12px 12px 12px', padding: '9px 12px', fontSize: 13, color: 'var(--ink)', marginBottom: 14, maxWidth: '85%' }}>
      Hi! Following up on the enterprise quote.
    </div>
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>CRM record</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, ...vPill('#16a34a', V_GREEN_SOFT) }}>
          <Check size={11} strokeWidth={3} /> Synced · HubSpot
        </span>
      </div>
      {[
        { k: 'Deal stage', v: 'Negotiation' },
        { k: 'Value', v: '$12,000' },
        { k: 'Owner', v: 'You' },
      ].map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
          <span style={{ color: 'var(--ink-3)' }}>{row.k}</span>
          <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{row.v}</span>
        </div>
      ))}
    </div>
  </div>
)

const FeatureVisual: React.FC<{ kind?: string; label?: string }> = ({ kind, label }) => {
  if (kind === 'sync-visual') return <SyncVisual />
  if (kind === 'workflow-visual') return <WorkflowVisual />
  if (kind === 'mini-crm-visual') return <MiniCrmVisual />
  // Fallback placeholder for unknown / missing visual keys.
  return (
    <div className="aspect-[4/3] bg-brand-card rounded-2xl border border-slate-700 shadow-card flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="text-center text-slate-500 z-10">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-brand-cyan/15 shadow-glow-cyan">
          <Cloud size={48} className="text-brand-cyan" />
        </div>
        <p className="text-sm font-mono">{label || 'Feature visualization'}</p>
      </div>
    </div>
  )
}

// ================== Features Section ==================
const FeaturesSection: React.FC<{ features: any[] }> = ({ features }) => {
  if (!features || features.length === 0) return null

  return (
    <div id="features">
      {features.map((feature: any, idx: number) => {
        const alignRight = feature.alignRight || idx % 2 === 1

        return (
          <section
            key={idx}
            className={`py-24 border-b border-slate-800 ${idx % 2 === 0 ? 'bg-brand-black' : 'bg-brand-surface'}`}
            data-tone={idx % 2 === 0 ? 'dark' : undefined}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col lg:flex-row gap-20 items-center ${alignRight ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-8">
                  <div>
                    {feature.badge && (
                      <SectionBadge variant={BADGE_VARIANT}>{feature.badge}</SectionBadge>
                    )}
                    {feature.headline && (
                      <h2 className="mt-6 text-white" style={SECTION_H2_STYLE}>
                        {feature.headline}{' '}
                        {feature.headlineHighlight && (
                          <span className="text-brand-cyan">{feature.headlineHighlight}</span>
                        )}
                      </h2>
                    )}
                    <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {feature.points && feature.points.length > 0 && (
                    <ul className="space-y-4">
                      {feature.points.map((point: string, pIdx: number) => (
                        <li key={pIdx} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/30 flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-brand-cyan" strokeWidth={3} />
                          </div>
                          <span className="text-slate-200 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {feature.cta && (
                    <div className="pt-4">
                      <LocalizedLink href={feature.cta.url}>
                        <Button variant="outline" className="text-slate-300 border-slate-700 hover:border-brand-cyan hover:text-brand-cyan">
                          {feature.cta.label}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </LocalizedLink>
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full relative">
                  <FeatureVisual kind={feature.image} label={feature.badge} />
                  <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-3xl -z-10 bg-brand-blue/15"></div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

// ================== Comparison Table ==================
const defaultComparisonData = [
  { feature: 'Bulk Broadcasting', regular: 'risk', api: 'yes', coexistence: 'Yes' },
  { feature: 'App Access', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'CRM Integration', regular: 'no', api: 'yes', coexistence: 'Yes' },
  { feature: 'See Messages on Phone', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'Number Ban Protection', regular: 'no', api: 'yes', coexistence: 'Protected' },
  { feature: 'WhatsApp Web Access', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'Setup Time', regular: 'instant', api: 'weeks', coexistence: 'Minutes' },
]

const defaultColumnHeaders = {
  feature: 'Feature',
  regular: 'Regular WhatsApp',
  api: 'Standard API',
  coexistence: 'Coexistence'
}

const renderStatus = (status: string) => {
  if (status === 'yes') return <Check className="mx-auto text-emerald-400" size={18} />
  if (status === 'no') return <X className="mx-auto text-slate-600" size={18} />
  if (status === 'risk') return (
    <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold uppercase">
      <AlertTriangle size={14} /> Risky
    </span>
  )
  return <span className="text-sm text-slate-400">{status === 'instant' ? 'Instant' : status === 'weeks' ? 'Days/Weeks' : status}</span>
}

const ComparisonSection: React.FC<{ data?: any }> = ({ data }) => {
  const comparisonData = data?.rows || defaultComparisonData
  const columnHeaders = data?.columnHeaders || defaultColumnHeaders
  const badge = data?.badge || 'Comparison'
  const headline = data?.headline || 'See the Difference'
  const description = data?.description || 'How Coexistence stacks up against traditional WhatsApp models.'

  return (
    <section className="py-24 bg-brand-surface border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6">
            <SectionBadge variant="orange">{badge}</SectionBadge>
          </div>
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
            {headline}
          </h2>
          <p className="text-lg text-slate-400">
            {description}
          </p>
        </div>

        <div className="bg-brand-card rounded-2xl border border-slate-700 overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">{columnHeaders.feature}</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-x border-slate-700/50">{columnHeaders.regular}</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-r border-slate-700/50">{columnHeaders.api}</th>
                  <th className="px-6 py-5 text-xs font-bold text-brand-cyan uppercase tracking-wider text-center bg-brand-cyan/5">{columnHeaders.coexistence}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row: any, idx: number) => (
                  <tr key={idx} className="border-b border-slate-700/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-sm text-white font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center border-x border-slate-700/50">{renderStatus(row.regular)}</td>
                    <td className="px-6 py-4 text-center border-r border-slate-700/50">{renderStatus(row.api)}</td>
                    <td className="px-6 py-4 text-center bg-brand-cyan/5">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                          <Check size={12} className="text-brand-cyan" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-semibold text-white">{row.coexistence}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// ================== FAQ Section ==================
// Two-column pill layout mirroring the /hubspot-whatsapp-integration FAQ,
// but dark-styled to blend with this page. Multiple items can be open at once;
// the split matches hubspot's Math.ceil(items.length / 2) column balance.
const FAQSection: React.FC<{ data: any }> = ({ data }) => {
  const [open, setOpen] = useState<Set<number>>(new Set())

  if (!data || !data.items) return null

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const items = data.items
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]

  return (
    <section className="py-24 bg-brand-black border-b border-slate-800" data-tone="dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {data.badge && (
            <div className="mb-6">
              <SectionBadge variant={BADGE_VARIANT}>{data.badge}</SectionBadge>
            </div>
          )}
          <h2 className="text-white" style={SECTION_H2_STYLE}>
            {data.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 max-w-5xl mx-auto">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {column.map((item: any, i: number) => {
                const idx = colIdx === 0 ? i : i + half
                const isOpen = open.has(idx)
                return (
                  <div
                    key={idx}
                    className={`bg-brand-card border overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? 'border-slate-600 rounded-2xl shadow-lg shadow-black/20'
                        : 'border-slate-700 rounded-full hover:border-slate-600'
                    }`}
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-white text-[15px] leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full inline-flex items-center justify-center transition-all duration-300 ${
                          isOpen ? 'bg-white text-brand-black rotate-180' : 'text-slate-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================== Main Client Component ==================
interface CoexistencePageClientProps {
  data: any
}

export function CoexistencePageClient({ data }: CoexistencePageClientProps) {
  if (!data) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Page not found</h1>
          <LocalizedLink href="/" className="text-brand-blue hover:underline">
            Go home
          </LocalizedLink>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <HeroSection data={data.hero} />
      <BenefitsSection data={data.benefits} />
      <FeaturesSection features={data.features} />
      <ComparisonSection data={data.comparison} />
      <FAQSection data={data.faq} />
    </div>
  )
}
