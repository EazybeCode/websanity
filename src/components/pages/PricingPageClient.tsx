'use client'

import React, { useState } from 'react'
import { Zap, Rocket, Building2, Shield, Clock, MessageSquare, X } from 'lucide-react'
import { useDynamicPricing } from '@/hooks/useDynamicPricing'
import { LeadGenerationForm } from '@/components/lead/LeadGenerationForm'

const WhatsAppGlyph = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
  </svg>
)

// ─── Types ──────────────────────────────────────────────────────────────────

interface PricingFeature {
  text: string
  included: boolean
  highlight?: boolean
}

interface PricingPlan {
  name: string
  planKey: 'starter' | 'scaler' | 'omnis'
  description: string
  monthlyPrice: number
  annualPrice: number
  currency: string
  icon: 'starter' | 'growth' | 'enterprise'
  popular?: boolean
  enterprise?: boolean
  features: PricingFeature[]
  cta: { label: string; url: string }
}

interface FAQItem { question: string; answer: string }

interface ComparisonFeatureRow {
  feature: string
  starter: boolean | string
  scaler: boolean | string
  omnis: boolean | string
  category?: string
}

interface PricingData {
  hero?: {
    badge?: string
    headline?: string
    headlineHighlight?: string
    subheadline?: string
    billingToggleMonthly?: string
    billingToggleAnnual?: string
    saveBadgeText?: string
  }
  plans?: Array<{
    name: string; description: string; icon: string
    monthlyPrice: number; annualPrice: number; currency: string
    isPopular?: boolean; isEnterprise?: boolean
    features: Array<{ text: string; included: boolean; highlight?: boolean }>
    cta: { label: string; url: string }
  }>
  comparisonSection?: {
    badge?: string; title?: string; subtitle?: string
    features?: Array<{ feature: string; category: string; starter: string; scaler: string; omnis: string }>
  }
  faqSection?: {
    badge?: string; title?: string; subtitle?: string; contactLinkText?: string
    faqs?: Array<{ question: string; answer: string }>
  }
}

// ─── Default fallback data ──────────────────────────────────────────────────

const defaultPricingPlans: PricingPlan[] = [
  {
    name: 'Starter', planKey: 'starter',
    description: 'Perfect for individuals and small teams getting started with WhatsApp CRM integration.',
    monthlyPrice: 13, annualPrice: 10, currency: '$', icon: 'starter',
    features: [
      { text: 'Team Inbox', included: true, highlight: true },
      { text: 'Unlimited labels & funnels', included: true },
      { text: 'Unlimited quick replies', included: true },
      { text: 'Unlimited scheduled messages', included: true },
      { text: 'WhatsApp chat backup', included: true },
      { text: 'HubSpot, Zoho, Bitrix, Google Sheets', included: true, highlight: true },
      { text: 'Send messages from CRM', included: true },
      { text: 'Salesforce integration', included: false },
      { text: 'Revenue Inbox', included: false },
    ],
    cta: { label: 'Install for Free', url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd' },
  },
  {
    name: 'Scaler', planKey: 'scaler',
    description: 'For growing teams that need advanced integrations and AI-powered automation.',
    monthlyPrice: 19, annualPrice: 15, currency: '$', icon: 'growth', popular: true,
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Salesforce integration', included: true, highlight: true },
      { text: 'Webhook integrations', included: true, highlight: true },
      { text: 'Custom objects in mini CRM view', included: true },
      { text: 'CRM property-to-WhatsApp labeling', included: true },
      { text: 'AI unreplied chats agent', included: true, highlight: true },
      { text: 'Dedicated APIs', included: true },
      { text: 'CRM workflow integration', included: true },
      { text: 'RevOps Agent', included: false },
    ],
    cta: { label: 'Install for Free', url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd' },
  },
  {
    name: 'Omnis', planKey: 'omnis',
    description: 'Full-stack revenue operations with AI agents and complete WhatsApp intelligence.',
    monthlyPrice: 0, annualPrice: 0, currency: '$', icon: 'enterprise', enterprise: true,
    features: [
      { text: 'Everything in Scaler', included: true },
      { text: 'Revenue Inbox', included: true, highlight: true },
      { text: 'RevOps Agent (AI)', included: true, highlight: true },
      { text: 'WhatsApp Web Copilot', included: true, highlight: true },
      { text: 'WhatsApp group chat backup', included: true },
      { text: 'Unlimited message sync', included: true },
      { text: 'Sync messages to deals/tickets', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    cta: { label: 'Contact Sales', url: '/contact?plan=omnis' },
  },
]

const defaultComparisonFeatures: ComparisonFeatureRow[] = [
  { feature: 'Team Inbox', starter: true, scaler: true, omnis: true, category: 'Core Features' },
  { feature: 'Unlimited labels & funnels', starter: true, scaler: true, omnis: true, category: 'Core Features' },
  { feature: 'Unlimited quick replies', starter: true, scaler: true, omnis: true, category: 'Core Features' },
  { feature: 'Unlimited scheduled messages', starter: true, scaler: true, omnis: true, category: 'Core Features' },
  { feature: 'WhatsApp chat backup', starter: true, scaler: true, omnis: true, category: 'Core Features' },
  { feature: 'WhatsApp group chat backup', starter: false, scaler: false, omnis: true, category: 'Core Features' },
  { feature: 'Unlimited message sync', starter: 'Limited', scaler: 'Limited', omnis: true, category: 'Core Features' },
  { feature: 'HubSpot', starter: true, scaler: true, omnis: true, category: 'CRM Integrations' },
  { feature: 'Zoho CRM', starter: true, scaler: true, omnis: true, category: 'CRM Integrations' },
  { feature: 'Bitrix24', starter: true, scaler: true, omnis: true, category: 'CRM Integrations' },
  { feature: 'Google Sheets', starter: true, scaler: true, omnis: true, category: 'CRM Integrations' },
  { feature: 'Salesforce', starter: false, scaler: true, omnis: true, category: 'CRM Integrations' },
  { feature: 'Webhook integrations', starter: false, scaler: true, omnis: true, category: 'CRM Integrations' },
  { feature: 'Dedicated APIs', starter: false, scaler: true, omnis: true, category: 'CRM Integrations' },
  { feature: 'Sync to deals/tickets', starter: false, scaler: false, omnis: true, category: 'CRM Integrations' },
  { feature: 'Send messages from CRM', starter: true, scaler: true, omnis: true, category: 'Intelligence & AI' },
  { feature: 'CRM property-to-WhatsApp labeling', starter: false, scaler: true, omnis: true, category: 'Intelligence & AI' },
  { feature: 'Custom objects in mini CRM view', starter: false, scaler: true, omnis: true, category: 'Intelligence & AI' },
  { feature: 'AI unreplied chats agent', starter: false, scaler: true, omnis: true, category: 'Intelligence & AI' },
  { feature: 'Revenue Inbox', starter: false, scaler: false, omnis: true, category: 'Intelligence & AI' },
  { feature: 'RevOps Agent (AI)', starter: false, scaler: false, omnis: true, category: 'Intelligence & AI' },
  { feature: 'WhatsApp Web Copilot', starter: false, scaler: false, omnis: true, category: 'Intelligence & AI' },
  { feature: 'CRM workflow integration', starter: false, scaler: true, omnis: true, category: 'Automation' },
  { feature: 'Bulk messaging', starter: true, scaler: true, omnis: true, category: 'Automation' },
  { feature: 'Auto-create contacts', starter: true, scaler: true, omnis: true, category: 'Automation' },
  { feature: 'Email support', starter: true, scaler: true, omnis: true, category: 'Support' },
  { feature: 'Priority support', starter: false, scaler: true, omnis: true, category: 'Support' },
  { feature: 'Dedicated account manager', starter: false, scaler: false, omnis: true, category: 'Support' },
  { feature: 'WhatsApp group assistance', starter: false, scaler: false, omnis: true, category: 'Support' },
]

const defaultFaqItems: FAQItem[] = [
  { question: 'Can I try Eazybe for free?', answer: 'Yes! We offer a 4-day free trial on Starter and Scaler plans. No credit card required.' },
  { question: 'How does per-user pricing work?', answer: 'You pay for each team member who actively uses Eazybe. A user is anyone who syncs their WhatsApp conversations to your CRM.' },
  { question: 'Which CRMs do you integrate with?', answer: 'Starter integrates with HubSpot, Zoho CRM, Bitrix24, and Google Sheets. Scaler adds Salesforce and webhook integrations. Omnis includes dedicated APIs.' },
  { question: 'Can I switch plans later?', answer: 'Absolutely! You can upgrade or downgrade at any time. Upgrades give immediate access; downgrades take effect at the next billing cycle.' },
  { question: 'Is my data secure?', answer: 'Yes. Bank-grade 256-bit encryption, GDPR compliant, Meta Business Partner verified, with regular security audits.' },
  { question: 'What is your refund policy?', answer: 'No refunds — once payment is made it is non-refundable. We encourage using the free trial to evaluate first.' },
]

const planIconMap = { starter: Zap, growth: Rocket, enterprise: Building2 }

const parseComparisonValue = (value: string): boolean | string => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}
const iconToPlanKey = (icon: string): 'starter' | 'scaler' | 'omnis' => {
  if (icon === 'starter') return 'starter'
  if (icon === 'growth') return 'scaler'
  return 'omnis'
}

// ─── UI helpers ─────────────────────────────────────────────────────────────

const Check = (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)
const XSym = (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
)

// ─── Toggle ─────────────────────────────────────────────────────────────────

function PricingToggle({
  isAnnual, onToggle, labels,
}: {
  isAnnual: boolean
  onToggle: (v: boolean) => void
  labels?: { monthly?: string; annual?: string; saveBadge?: string }
}) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: 6, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 100, marginTop: 20 }}>
      <button
        onClick={() => onToggle(false)}
        className="btn"
        style={{
          padding: '8px 18px',
          background: !isAnnual ? 'var(--ink)' : 'transparent',
          color: !isAnnual ? 'var(--paper)' : 'var(--ink-3)',
          borderRadius: 100,
        }}
      >
        {labels?.monthly || 'Monthly'}
      </button>
      <button
        onClick={() => onToggle(true)}
        className="btn"
        style={{
          padding: '8px 18px',
          background: isAnnual ? 'var(--ink)' : 'transparent',
          color: isAnnual ? 'var(--paper)' : 'var(--ink-3)',
          borderRadius: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {labels?.annual || 'Annual'}
        <span
          style={{
            background: 'color-mix(in oklab, var(--ok) 28%, var(--paper))',
            color: 'var(--ok)',
            fontFamily: 'var(--f-mono)',
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 100,
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {labels?.saveBadge || 'SAVE 20%'}
        </span>
      </button>
    </div>
  )
}

// ─── Pricing card ───────────────────────────────────────────────────────────

function PricingCard({
  plan, isAnnual, dynamicCurrency, dynamicMonthlyPrice, dynamicAnnualPrice, transitionDelay, onTalkToAgent,
}: {
  plan: PricingPlan
  isAnnual: boolean
  dynamicCurrency?: string
  dynamicMonthlyPrice?: number
  dynamicAnnualPrice?: number
  transitionDelay?: string
  onTalkToAgent: () => void
}) {
  const Icon = planIconMap[plan.icon]
  const currency = dynamicCurrency || plan.currency
  const monthlyPrice = dynamicMonthlyPrice ?? plan.monthlyPrice
  const annualPrice = dynamicAnnualPrice ?? plan.annualPrice
  const price = isAnnual ? annualPrice : monthlyPrice
  const isPopular = plan.popular
  const isEnterprise = plan.enterprise

  return (
    <div
      className="card reveal"
      style={{
        transitionDelay,
        position: 'relative',
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        ...(isPopular
          ? {
              borderColor: 'color-mix(in oklab, var(--accent-a) 50%, var(--line))',
              boxShadow: '0 0 0 4px color-mix(in oklab, var(--accent-a) 12%, transparent), 0 12px 30px -18px rgba(15,17,21,0.15)',
              background: 'linear-gradient(180deg, color-mix(in oklab, var(--accent-a) 6%, var(--paper)), var(--paper) 60%)',
            }
          : {}),
      }}
    >
      {isPopular && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '5px 14px 5px 10px',
            background: 'var(--ink)',
            color: 'var(--paper)',
            borderRadius: 100,
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            whiteSpace: 'nowrap',
          }}
        >
          <Zap size={11} fill="currentColor" /> Most Popular
        </div>
      )}

      <div className="card-icon" style={{ marginBottom: 18 }}>
        <Icon size={20} />
      </div>
      <h3 style={{ marginBottom: 4 }}>{plan.name}</h3>
      <p style={{ marginBottom: 22, fontSize: 13 }}>{plan.description}</p>

      <div style={{ marginBottom: 22 }}>
        {isEnterprise ? (
          <div
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 44,
              fontWeight: 400,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Custom
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 16, color: 'var(--ink-4)' }}>{currency}</span>
            <span
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: 56,
                fontWeight: 400,
                color: 'var(--ink)',
                letterSpacing: '-0.025em',
                lineHeight: 1,
              }}
            >
              {price}
            </span>
            <span style={{ fontSize: 14, color: 'var(--ink-4)' }}>/user/mo</span>
          </div>
        )}
        {isAnnual && !isEnterprise && (
          <p style={{ marginTop: 6, fontSize: 12, color: 'var(--ok)', fontWeight: 500, marginBottom: 0 }}>
            Billed annually ({currency}{annualPrice * 12}/user/year)
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onTalkToAgent}
        className={`btn ${isPopular ? 'btn-primary' : 'btn-outline'}`}
        style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}
      >
        <WhatsAppGlyph size={16} />
        Talk to our AI Agent
      </button>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        {plan.features.map((feature, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13 }}>
            <span
              style={{
                flexShrink: 0,
                marginTop: 2,
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: !feature.included
                  ? 'var(--bg-2)'
                  : feature.highlight
                  ? 'color-mix(in oklab, var(--accent-a) 22%, var(--paper))'
                  : 'color-mix(in oklab, var(--ok) 18%, var(--paper))',
                color: !feature.included
                  ? 'var(--ink-4)'
                  : feature.highlight
                  ? 'var(--accent-ink)'
                  : 'var(--ok)',
                border: '1px solid ' + (!feature.included
                  ? 'var(--line)'
                  : feature.highlight
                  ? 'color-mix(in oklab, var(--accent-a) 30%, var(--line))'
                  : 'color-mix(in oklab, var(--ok) 25%, var(--line))'),
              }}
            >
              {feature.included ? Check : XSym}
            </span>
            <span
              style={{
                color: !feature.included ? 'var(--ink-4)' : feature.highlight ? 'var(--ink)' : 'var(--ink-2)',
                textDecoration: !feature.included ? 'line-through' : 'none',
                fontWeight: feature.highlight ? 500 : 400,
              }}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Comparison table (grouped by category) ─────────────────────────────────

function FeatureComparisonTable({ features, onTalkToAgent }: { features: ComparisonFeatureRow[]; onTalkToAgent: () => void }) {
  const headerAgentBtn = (popular?: boolean) => (
    <button
      type="button"
      onClick={onTalkToAgent}
      className={`btn ${popular ? 'btn-primary' : 'btn-outline'}`}
      style={{
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 10px',
        fontSize: 11.5,
        letterSpacing: 0,
        textTransform: 'none',
      }}
    >
      <WhatsAppGlyph size={13} />
      Talk to our AI Agent
    </button>
  )
  const grouped = features.reduce((acc, row) => {
    const key = row.category || 'Features'
    if (!acc[key]) acc[key] = []
    acc[key].push(row)
    return acc
  }, {} as Record<string, ComparisonFeatureRow[]>)

  const renderVal = (v: boolean | string) => {
    if (v === true) return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: 'color-mix(in oklab, var(--ok) 18%, var(--paper))', color: 'var(--ok)', alignItems: 'center', justifyContent: 'center' }}>{Check}</span>
    if (v === false) return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-2)', color: 'var(--ink-4)', alignItems: 'center', justifyContent: 'center' }}>{XSym}</span>
    return <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{v}</span>
  }

  return (
    <div
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        borderRadius: 18,
        overflow: 'hidden',
        maxWidth: 1000,
        margin: '0 auto',
        boxShadow: '0 1px 0 rgba(15,17,21,0.02), 0 8px 24px -16px rgba(15,17,21,0.08)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          padding: 18,
          background: 'var(--bg-2)',
          borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--f-mono)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ink-4)',
        }}
      >
        <div style={{ alignSelf: 'center' }}>Feature</div>
        <div style={{ textAlign: 'center' }}>Starter{headerAgentBtn(false)}</div>
        <div style={{ textAlign: 'center' }}>Scaler{headerAgentBtn(true)}</div>
        <div style={{ textAlign: 'center', color: 'var(--accent-ink)' }}>Omnis{headerAgentBtn(false)}</div>
      </div>
      {Object.entries(grouped).map(([category, rows]) => (
        <React.Fragment key={category}>
          <div
            style={{
              padding: '14px 18px',
              background: 'color-mix(in oklab, var(--accent-a) 6%, var(--paper))',
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent-ink)',
            }}
          >
            {category}
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '14px 18px',
                borderBottom: '1px solid var(--line)',
                alignItems: 'center',
                fontSize: 14,
              }}
            >
              <div style={{ color: 'var(--ink-2)' }}>{row.feature}</div>
              <div style={{ textAlign: 'center' }}>{renderVal(row.starter)}</div>
              <div style={{ textAlign: 'center' }}>{renderVal(row.scaler)}</div>
              <div style={{ textAlign: 'center' }}>{renderVal(row.omnis)}</div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface PricingPageClientProps { pricingData: PricingData | null }

export function PricingPageClient({ pricingData }: PricingPageClientProps) {
  const [isAnnual, setIsAnnual] = useState(true)
  const { getDynamicPrice, loading: pricingLoading } = useDynamicPricing()

  const hero = pricingData?.hero || {
    badge: 'Pricing',
    headline: 'Simple, transparent',
    headlineHighlight: 'pricing.',
    subheadline: 'Start free. Scale as you grow. No hidden fees, no surprises.',
    billingToggleMonthly: 'Monthly',
    billingToggleAnnual: 'Annual',
    saveBadgeText: 'SAVE 20%',
  }

  const pricingPlans: PricingPlan[] = pricingData?.plans?.map((plan) => ({
    name: plan.name,
    planKey: iconToPlanKey(plan.icon),
    description: plan.description,
    monthlyPrice: plan.monthlyPrice,
    annualPrice: plan.annualPrice,
    currency: plan.currency,
    icon: plan.icon as PricingPlan['icon'],
    popular: plan.isPopular,
    enterprise: plan.isEnterprise,
    features: plan.features.map((f) => ({ text: f.text, included: f.included, highlight: f.highlight })),
    cta: plan.cta,
  })) || defaultPricingPlans

  const trustSignals = [
    { Icon: Shield, text: 'GDPR Compliant & Encrypted' },
    { Icon: Zap, text: '2-Minute Setup' },
    { Icon: Clock, text: '4-Day Free Trial' },
    { Icon: MessageSquare, text: 'No Credit Card Required' },
  ]

  const comparisonSection = pricingData?.comparisonSection || {
    badge: 'Compare Plans',
    title: 'Feature-by-feature comparison',
    subtitle: 'See exactly what you get with each plan.',
  }

  const comparisonFeatures: ComparisonFeatureRow[] = pricingData?.comparisonSection?.features?.map((f) => ({
    feature: f.feature,
    category: f.category,
    starter: parseComparisonValue(f.starter),
    scaler: parseComparisonValue(f.scaler),
    omnis: parseComparisonValue(f.omnis),
  })) || defaultComparisonFeatures

  const faqSection = pricingData?.faqSection || {
    badge: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: "Can't find what you're looking for?",
    contactLinkText: 'Contact our team',
  }
  const faqItems: FAQItem[] = pricingData?.faqSection?.faqs?.map((f) => ({ question: f.question, answer: f.answer })) || defaultFaqItems

  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set([0]))
  const toggleFaq = (i: number) => setOpenFaq((p) => {
    const n = new Set(p)
    if (n.has(i)) n.delete(i)
    else n.add(i)
    return n
  })

  const [showAgentForm, setShowAgentForm] = useState(false)
  const openAgentForm = () => setShowAgentForm(true)

  return (
    <>
      {showAgentForm && (
        <div className="bea-modal-overlay" onClick={() => setShowAgentForm(false)}>
          <div
            className="bea-corner-form bea-modal-form"
            role="dialog"
            aria-modal="true"
            aria-label="Talk to our AI Agent"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="bea-corner-close"
              onClick={() => setShowAgentForm(false)}
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="bea-form-head">
              <h3>Talk to our <em>AI Agent</em></h3>
              <p>Drop your details — we&apos;ll build your WhatsApp agent in minutes.</p>
            </div>
            <LeadGenerationForm />
          </div>
        </div>
      )}
      {pricingLoading && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading pricing"
          style={{
            position: 'fixed',
            top: 80,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg, #ffffff)',
            zIndex: 90,
          }}
        >
          <span
            style={{
              width: 48,
              height: 48,
              border: '3px solid rgba(91, 75, 174, 0.18)',
              borderTopColor: '#5b4bae',
              borderRadius: '50%',
              animation: 'pricing-loading-spin 0.9s linear infinite',
            }}
          />
          <style>{`@keyframes pricing-loading-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      {/* Hero */}
      <section className="page-hero" data-tone="dark">
        <div className="container">
          <span className="hero-tag reveal"><span className="pulse" /> {String(hero.badge).toUpperCase()}</span>
          <h1 className="reveal">
            {hero.headline} <em>{hero.headlineHighlight}</em>
          </h1>
          <p className="lede reveal">{hero.subheadline}</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
            <PricingToggle
              isAnnual={isAnnual}
              onToggle={setIsAnnual}
              labels={{ monthly: hero.billingToggleMonthly, annual: hero.billingToggleAnnual, saveBadge: hero.saveBadgeText }}
            />
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section" style={{ paddingTop: 30 }} id="pricing-plans">
        <div className="container">
          <div className="card-grid cols-3">
            {pricingPlans.map((plan, idx) => {
              const dp = getDynamicPrice(plan.planKey, plan.monthlyPrice, plan.annualPrice)
              return (
                <PricingCard
                  key={plan.name}
                  plan={plan}
                  isAnnual={isAnnual}
                  dynamicCurrency={dp.currency}
                  dynamicMonthlyPrice={dp.monthlyPrice}
                  dynamicAnnualPrice={dp.annualPrice}
                  transitionDelay={`${idx * 0.06}s`}
                  onTalkToAgent={openAgentForm}
                />
              )
            })}
          </div>

          <div
            className="reveal"
            style={{
              marginTop: 56,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 28,
              color: 'var(--ink-3)',
              fontSize: 13,
            }}
          >
            {trustSignals.map(({ Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={16} style={{ color: 'var(--accent-ink)' }} /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section" data-tone="dark">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{comparisonSection.badge}</span>
            <h2>{comparisonSection.title}</h2>
            <p>{comparisonSection.subtitle}</p>
          </div>
          <div className="reveal">
            <FeatureComparisonTable features={comparisonFeatures} onTalkToAgent={openAgentForm} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{faqSection.badge}</span>
            <h2>{faqSection.title}</h2>
            <p>
              {faqSection.subtitle}{' '}
              <a href="/contact" style={{ color: 'var(--accent-ink)', borderBottom: '1px solid color-mix(in oklab, var(--accent-ink) 40%, transparent)' }}>
                {faqSection.contactLinkText}
              </a>
            </p>
          </div>
          <div className="faq">
            {faqItems.map((faq, idx) => (
              <div key={idx} className={`faq-item reveal${openFaq.has(idx) ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => toggleFaq(idx)}>
                  {faq.question}
                  <span className="plus">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </button>
                <div className="faq-a">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2 className="reveal">
            Ready to supercharge your<br />
            <em>WhatsApp sales?</em>
          </h2>
          <p className="sub reveal">Join thousands of teams using Eazybe to close more deals through WhatsApp.</p>
          <div className="ctas reveal">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={openAgentForm}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
              </svg>
              Talk to our AI Agent
            </button>
            <a href="https://calendly.com/d/cw67-pt3-y2m" className="btn btn-outline btn-lg">
              Book a Demo
            </a>
          </div>
          <p
            className="reveal"
            style={{
              marginTop: 22,
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-4)',
            }}
          >
            No credit card required
          </p>
        </div>
      </section>
    </>
  )
}
