'use client'

import React, { useState } from 'react'
import {
  Check,
  X,
  Zap,
  Rocket,
  Building2,
  Shield,
  Clock,
  MessageSquare,
  HelpCircle,
  Plus,
  Minus as MinusIcon,
} from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { Button } from '@/components/ui/Button'
import { useDynamicPricing } from '@/hooks/useDynamicPricing'

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

interface FAQItem {
  question: string
  answer: string
}

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
    _key?: string
    name: string
    description: string
    icon: string
    monthlyPrice: number
    annualPrice: number
    currency: string
    isPopular?: boolean
    isEnterprise?: boolean
    features: Array<{
      _key?: string
      text: string
      included: boolean
      highlight?: boolean
    }>
    cta: { label: string; url: string }
  }>
  trustSignals?: Array<{ icon: string; text: string }>
  comparisonSection?: {
    badge?: string
    title?: string
    subtitle?: string
    features?: Array<{
      _key?: string
      feature: string
      category: string
      starter: string
      scaler: string
      omnis: string
    }>
  }
  faqSection?: {
    badge?: string
    title?: string
    subtitle?: string
    contactLinkText?: string
    faqs?: Array<{ _key?: string; question: string; answer: string }>
  }
  ctaSection?: {
    headline?: string
    headlineHighlight?: string
    subheadline?: string
    primaryCta?: { label: string; url: string }
    secondaryCta?: { label: string; url: string }
    footnote?: string
  }
}

// ─── Default / Fallback Data ────────────────────────────────────────────────

const defaultPricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    planKey: 'starter',
    description:
      'Perfect for individuals and small teams getting started with WhatsApp CRM integration.',
    monthlyPrice: 13,
    annualPrice: 10,
    currency: '$',
    icon: 'starter',
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
    cta: {
      label: 'Install for Free',
      url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd',
    },
  },
  {
    name: 'Scaler',
    planKey: 'scaler',
    description:
      'For growing teams that need advanced integrations and AI-powered automation.',
    monthlyPrice: 19,
    annualPrice: 15,
    currency: '$',
    icon: 'growth',
    popular: true,
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
    cta: {
      label: 'Install for Free',
      url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd',
    },
  },
  {
    name: 'Omnis',
    planKey: 'omnis',
    description:
      'Full-stack revenue operations with AI agents and complete WhatsApp intelligence.',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: '$',
    icon: 'enterprise',
    enterprise: true,
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
  {
    question: 'Can I try Eazybe for free?',
    answer:
      'Yes! We offer a 4-day free trial on Starter and Scaler plans. No credit card required. You can explore all features and see how Eazybe integrates with your existing workflow before committing.',
  },
  {
    question: 'What is Revenue Inbox?',
    answer:
      'Revenue Inbox is our intelligent dashboard that surfaces the most important WhatsApp conversations that need attention. It uses AI to identify hot deals, escalations, and opportunities you might miss in a busy inbox.',
  },
  {
    question: 'What is RevOps Agent?',
    answer:
      'RevOps Agent is our AI-powered assistant that automates revenue operations tasks. It can analyze conversations, update CRM records, identify deal risks, and provide actionable insights to help you close more deals.',
  },
  {
    question: 'What is WhatsApp Web Copilot?',
    answer:
      'WhatsApp Web Copilot is our AI assistant that works directly in your WhatsApp Web interface. It helps you draft responses, summarize conversations, and provides real-time suggestions to improve your customer communication.',
  },
  {
    question: 'How does per-user pricing work?',
    answer:
      "You pay for each team member who actively uses Eazybe. A user is anyone who syncs their WhatsApp conversations to your CRM. Admins who only view data don't count as users.",
  },
  {
    question: 'Which CRMs do you integrate with?',
    answer:
      'Starter integrates with HubSpot, Zoho CRM, Bitrix24, and Google Sheets. Scaler adds Salesforce and webhook integrations for custom CRMs. Omnis includes dedicated APIs and sync to deals/tickets.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, the change takes effect at your next billing cycle.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. We use bank-grade 256-bit encryption for all data in transit and at rest. We are GDPR compliant, Meta Business Partner verified, and undergo regular security audits.',
  },
]

// ─── Helper ─────────────────────────────────────────────────────────────────

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

// ─── Sub-components ─────────────────────────────────────────────────────────

const planIconMap = {
  starter: Zap,
  growth: Rocket,
  enterprise: Building2,
}

const trustIconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={18} className="text-brand-green" />,
  zap: <Zap size={18} className="text-brand-cyan" />,
  clock: <Clock size={18} className="text-brand-orange" />,
  message: <MessageSquare size={18} className="text-brand-blue" />,
}

// ── Pricing Toggle ──────────────────────────────────────────────────────────

function PricingToggle({
  isAnnual,
  onToggle,
  labels,
}: {
  isAnnual: boolean
  onToggle: (v: boolean) => void
  labels?: { monthly?: string; annual?: string; saveBadge?: string }
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className={`text-sm font-semibold transition-colors cursor-pointer ${
          !isAnnual ? 'text-white' : 'text-slate-500 hover:text-slate-400'
        }`}
        onClick={() => onToggle(false)}
      >
        {labels?.monthly || 'Monthly'}
      </span>

      <button
        onClick={() => onToggle(!isAnnual)}
        className="relative w-16 h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 bg-brand-surface border border-slate-700 hover:border-slate-600 focus:ring-offset-brand-black"
        aria-label="Toggle billing period"
      >
        <span
          className={`absolute top-1 w-6 h-6 rounded-full bg-brand-blue shadow-glow-blue transition-all duration-300 ${
            isAnnual ? 'left-9' : 'left-1'
          }`}
        />
      </button>

      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-semibold transition-colors cursor-pointer ${
            isAnnual ? 'text-white' : 'text-slate-500 hover:text-slate-400'
          }`}
          onClick={() => onToggle(true)}
        >
          {labels?.annual || 'Annual'}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-green/10 text-brand-green border border-green-500/20">
          {labels?.saveBadge || 'Save 20%'}
        </span>
      </div>
    </div>
  )
}

// ── Pricing Card ────────────────────────────────────────────────────────────

function PricingCard({ plan, isAnnual, dynamicCurrency, dynamicMonthlyPrice, dynamicAnnualPrice }: { plan: PricingPlan; isAnnual: boolean; dynamicCurrency?: string; dynamicMonthlyPrice?: number; dynamicAnnualPrice?: number }) {
  const Icon = planIconMap[plan.icon]
  const currency = dynamicCurrency || plan.currency
  const monthlyPrice = dynamicMonthlyPrice ?? plan.monthlyPrice
  const annualPrice = dynamicAnnualPrice ?? plan.annualPrice
  const price = isAnnual ? annualPrice : monthlyPrice
  const isPopular = plan.popular
  const isEnterprise = plan.enterprise

  const cardStyles = isPopular
    ? 'bg-gradient-to-b from-brand-blue/10 to-brand-card border-brand-blue/50 shadow-[0_0_40px_rgba(37,99,235,0.15)]'
    : 'bg-brand-card border-slate-700 hover:border-slate-600'

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300 ${cardStyles}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-blue text-white shadow-glow-blue">
            <Zap size={12} fill="currentColor" />
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isPopular
                ? 'bg-brand-blue/20 text-brand-blue'
                : isEnterprise
                  ? 'bg-brand-purple/20 text-brand-purple'
                  : 'bg-brand-cyan/20 text-brand-cyan'
            }`}
          >
            <Icon size={24} />
          </div>

          <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
          <p className="text-sm leading-relaxed text-slate-400">{plan.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-8">
          {isEnterprise ? (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">Custom</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-lg text-slate-500">{currency}</span>
              <span className="text-5xl font-extrabold tracking-tight text-white">{price}</span>
              <span className="text-sm text-slate-500">/user/mo</span>
            </div>
          )}
          {isAnnual && !isEnterprise && (
            <p className="text-xs text-brand-green mt-2 font-medium">
              Billed annually ({currency} {annualPrice * 12}/user/year)
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? (
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    feature.highlight
                      ? 'bg-brand-green/20 text-brand-green'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-800 text-slate-600">
                  <X size={12} strokeWidth={3} />
                </div>
              )}
              <span
                className={`text-sm ${
                  feature.included
                    ? feature.highlight
                      ? 'text-white font-medium'
                      : 'text-slate-300'
                    : 'text-slate-600 line-through'
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href={plan.cta.url}>
          <Button
            variant={isPopular ? 'primary' : 'outline'}
            size="lg"
            className={`w-full justify-center font-bold ${isPopular ? 'shadow-glow-blue' : ''}`}
          >
            {plan.cta.label}
          </Button>
        </a>
      </div>
    </div>
  )
}

// ── Comparison Table Value Renderer ─────────────────────────────────────────

function RenderValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto">
        <Check size={14} className="text-brand-green" strokeWidth={3} />
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
        <X size={14} className="text-slate-600" strokeWidth={3} />
      </div>
    )
  }

  if (value === '-') {
    return (
      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
        <MinusIcon size={14} className="text-slate-600" strokeWidth={3} />
      </div>
    )
  }

  return <span className="text-sm text-slate-300 font-medium">{value}</span>
}

// ── Feature Comparison Table ────────────────────────────────────────────────

function FeatureComparisonTable({ features }: { features: ComparisonFeatureRow[] }) {
  const groupedFeatures = features.reduce(
    (acc, feature) => {
      const category = feature.category || 'General'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(feature)
      return acc
    },
    {} as Record<string, ComparisonFeatureRow[]>
  )

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-brand-card">
      {/* Table Header */}
      <div className="grid grid-cols-4 border-b border-slate-700 bg-brand-surface">
        <div className="p-6">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
            Features
          </span>
        </div>
        <div className="p-6 text-center border-l border-slate-700">
          <span className="text-lg font-bold text-white">Starter</span>
          <p className="text-xs text-slate-500 mt-1">For individuals</p>
        </div>
        <div className="p-6 text-center border-l border-slate-700 bg-brand-blue/5">
          <span className="text-lg font-bold text-brand-blue">Scaler</span>
          <p className="text-xs text-slate-500 mt-1">Most popular</p>
        </div>
        <div className="p-6 text-center border-l border-slate-700">
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">
            Omnis
          </span>
          <p className="text-xs text-slate-500 mt-1">Full-stack RevOps</p>
        </div>
      </div>

      {/* Table Body */}
      {(Object.entries(groupedFeatures) as [string, ComparisonFeatureRow[]][]).map(
        ([category, categoryFeatures]) => (
          <div key={category}>
            {/* Category Header */}
            <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-900/50">
              <div className="p-4 col-span-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-cyan">
                  {category}
                </span>
              </div>
            </div>

            {/* Category Features */}
            {categoryFeatures.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-4 border-b border-slate-800 last:border-b-0 hover:bg-slate-800/30 transition-colors"
              >
                <div className="p-4 flex items-center">
                  <span className="text-sm text-slate-300">{row.feature}</span>
                </div>
                <div className="p-4 flex items-center justify-center border-l border-slate-800">
                  <RenderValue value={row.starter} />
                </div>
                <div className="p-4 flex items-center justify-center border-l border-slate-800 bg-brand-blue/5">
                  <RenderValue value={row.scaler} />
                </div>
                <div className="p-4 flex items-center justify-center border-l border-slate-800">
                  <RenderValue value={row.omnis} />
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

// ── FAQ Accordion ───────────────────────────────────────────────────────────

function FAQAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`border rounded-xl transition-all duration-300 ${
        isOpen
          ? 'border-slate-600 bg-brand-surface'
          : 'border-slate-700 bg-brand-card hover:border-slate-600'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-semibold pr-4 ${isOpen ? 'text-white' : 'text-slate-200'}`}>
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen ? 'bg-brand-blue text-white' : 'bg-slate-700 text-slate-400'
          }`}
        >
          {isOpen ? <MinusIcon size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-slate-400 leading-relaxed">{item.answer}</div>
      </div>
    </div>
  )
}

function PricingFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const midpoint = Math.ceil(faqs.length / 2)
  const leftColumn = faqs.slice(0, midpoint)
  const rightColumn = faqs.slice(midpoint)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-4">
        {leftColumn.map((faq, index) => (
          <FAQAccordion
            key={index}
            item={faq}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
      <div className="space-y-4">
        {rightColumn.map((faq, index) => (
          <FAQAccordion
            key={index + midpoint}
            item={faq}
            isOpen={openIndex === index + midpoint}
            onToggle={() => handleToggle(index + midpoint)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Client Component ──────────────────────────────────────────────────

interface PricingPageClientProps {
  pricingData: PricingData | null
}

export function PricingPageClient({ pricingData }: PricingPageClientProps) {
  const [isAnnual, setIsAnnual] = useState(true)
  const { getDynamicPrice, loading: dynamicPricingLoading } = useDynamicPricing()

  // ── Hero ────────────────────────────────────────────────────────────────
  const hero = pricingData?.hero || {
    badge: 'Pricing',
    headline: 'Simple, Transparent',
    headlineHighlight: 'Pricing',
    subheadline:
      'Start free. Scale as you grow. No hidden fees, no surprises.',
    billingToggleMonthly: 'Monthly',
    billingToggleAnnual: 'Annual',
    saveBadgeText: 'Save 20%',
  }

  // ── Plans ───────────────────────────────────────────────────────────────
  const pricingPlans: PricingPlan[] =
    pricingData?.plans?.map((plan) => ({
      name: plan.name,
      planKey: iconToPlanKey(plan.icon),
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      annualPrice: plan.annualPrice,
      currency: plan.currency,
      icon: plan.icon as PricingPlan['icon'],
      popular: plan.isPopular,
      enterprise: plan.isEnterprise,
      features: plan.features.map((f) => ({
        text: f.text,
        included: f.included,
        highlight: f.highlight,
      })),
      cta: plan.cta,
    })) || defaultPricingPlans

  // ── Trust Signals ───────────────────────────────────────────────────────
  const trustSignals = [
    { icon: 'shield', text: 'GDPR Compliant & Encrypted' },
    { icon: 'zap', text: '2-Minute Setup' },
    { icon: 'clock', text: '4-Day Free Trial' },
    { icon: 'message', text: 'No Credit Card Required' },
  ]

  // ── Comparison Section ──────────────────────────────────────────────────
  const comparisonSection = pricingData?.comparisonSection || {
    badge: 'Compare Plans',
    title: 'Feature-by-Feature Comparison',
    subtitle: 'See exactly what you get with each plan.',
  }

  const comparisonFeatures: ComparisonFeatureRow[] =
    pricingData?.comparisonSection?.features?.map((f) => ({
      feature: f.feature,
      category: f.category,
      starter: parseComparisonValue(f.starter),
      scaler: parseComparisonValue(f.scaler),
      omnis: parseComparisonValue(f.omnis),
    })) || defaultComparisonFeatures

  // ── FAQ Section ─────────────────────────────────────────────────────────
  const faqSection = pricingData?.faqSection || {
    badge: 'FAQ',
    title: 'Frequently Asked Questions',
    subtitle: "Can't find what you're looking for?",
    contactLinkText: 'Contact our team',
  }

  const faqItems: FAQItem[] =
    pricingData?.faqSection?.faqs?.map((f) => ({
      question: f.question,
      answer: f.answer,
    })) || defaultFaqItems

  // ── CTA Section ─────────────────────────────────────────────────────────
  const ctaSection = {
    headline: 'Ready to supercharge your',
    headlineHighlight: 'WhatsApp sales?',
    subheadline:
      'Join thousands of teams using Eazybe to close more deals through WhatsApp.',
    primaryCta: {
      label: 'Start Free Trial',
      url: 'https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd',
    },
    secondaryCta: {
      label: 'Book a Demo',
      url: 'https://calendly.com/d/cw67-pt3-y2m',
    },
    footnote: 'No credit card required',
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-brand-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <SectionBadge variant="cyan" className="mb-6">
              {hero.badge}
            </SectionBadge>

            <h1 className="text-4xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              {hero.headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
                {hero.headlineHighlight}
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {hero.subheadline}
            </p>

            {/* Billing Toggle */}
            <PricingToggle
              isAnnual={isAnnual}
              onToggle={setIsAnnual}
              labels={{
                monthly: hero.billingToggleMonthly,
                annual: hero.billingToggleAnnual,
                saveBadge: hero.saveBadgeText,
              }}
            />
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-12 lg:py-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {pricingPlans.map((plan) => {
              const dynamicPrice = getDynamicPrice(plan.planKey, plan.monthlyPrice, plan.annualPrice)
              return (
                <PricingCard
                  key={plan.name}
                  plan={plan}
                  isAnnual={isAnnual}
                  dynamicCurrency={dynamicPrice.currency}
                  dynamicMonthlyPrice={dynamicPrice.monthlyPrice}
                  dynamicAnnualPrice={dynamicPrice.annualPrice}
                />
              )
            })}
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
            {trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center gap-2">
                {trustIconMap[signal.icon]}
                <span>{signal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-24 bg-brand-surface border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="orange" className="mb-6">
              {comparisonSection.badge}
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              {comparisonSection.title}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {comparisonSection.subtitle}
            </p>
          </div>

          <FeatureComparisonTable features={comparisonFeatures} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge variant="cyan" className="mb-6">
              <HelpCircle size={14} />
              {faqSection.badge}
            </SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">
              {faqSection.title}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {faqSection.subtitle}{' '}
              <a href="/contact" className="text-brand-blue hover:underline">
                {faqSection.contactLinkText}
              </a>
            </p>
          </div>

          <PricingFAQ faqs={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-surface border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            {ctaSection.headline}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
              {ctaSection.headlineHighlight}
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {ctaSection.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={ctaSection.primaryCta?.url}>
              <Button variant="primary" size="lg" className="shadow-glow-blue font-bold">
                {ctaSection.primaryCta?.label}
              </Button>
            </a>
            <a href={ctaSection.secondaryCta?.url}>
              <Button variant="outline" size="lg" className="font-bold">
                {ctaSection.secondaryCta?.label}
              </Button>
            </a>
          </div>
          {ctaSection.footnote && (
            <p className="text-sm text-slate-500 mt-6">{ctaSection.footnote?.replace(/14-day/gi, '4-day')}</p>
          )}
        </div>
      </section>
    </div>
  )
}
