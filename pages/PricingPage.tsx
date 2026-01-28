import React, { useState } from 'react'
import { ArrowRight, Shield, Zap, Clock, MessageSquare, HelpCircle } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { SectionBadge } from '../components/ui/SectionBadge'
import { Button } from '../components/ui/Button'
import { PricingToggle, PricingCard, FeatureComparisonTable, PricingFAQ } from '../components/pricing'
import type { PricingPlan, FAQItem } from '../components/pricing'
import { usePricing } from '../hooks/usePricing'

// Default/Fallback Data
const defaultPricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small teams getting started with WhatsApp CRM integration.',
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
    cta: { label: 'Start Free Trial', url: '/signup?plan=starter' },
  },
  {
    name: 'Scaler',
    description: 'For growing teams that need advanced integrations and AI-powered automation.',
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
    cta: { label: 'Start Free Trial', url: '/signup?plan=scaler' },
  },
  {
    name: 'Omnis',
    description: 'Full-stack revenue operations with AI agents and complete WhatsApp intelligence.',
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

const defaultComparisonFeatures = [
  { feature: 'Team Inbox', starter: 'true', scaler: 'true', omnis: 'true', category: 'Core Features' },
  { feature: 'Unlimited labels & funnels', starter: 'true', scaler: 'true', omnis: 'true', category: 'Core Features' },
  { feature: 'Unlimited quick replies', starter: 'true', scaler: 'true', omnis: 'true', category: 'Core Features' },
  { feature: 'Unlimited scheduled messages', starter: 'true', scaler: 'true', omnis: 'true', category: 'Core Features' },
  { feature: 'WhatsApp chat backup', starter: 'true', scaler: 'true', omnis: 'true', category: 'Core Features' },
  { feature: 'WhatsApp group chat backup', starter: 'false', scaler: 'false', omnis: 'true', category: 'Core Features' },
  { feature: 'Unlimited message sync', starter: 'Limited', scaler: 'Limited', omnis: 'true', category: 'Core Features' },
  { feature: 'HubSpot', starter: 'true', scaler: 'true', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Zoho CRM', starter: 'true', scaler: 'true', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Bitrix24', starter: 'true', scaler: 'true', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Google Sheets', starter: 'true', scaler: 'true', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Salesforce', starter: 'false', scaler: 'true', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Webhook integrations', starter: 'false', scaler: 'true', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Dedicated APIs', starter: 'false', scaler: 'true', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Sync to deals/tickets', starter: 'false', scaler: 'false', omnis: 'true', category: 'CRM Integrations' },
  { feature: 'Send messages from CRM', starter: 'true', scaler: 'true', omnis: 'true', category: 'Intelligence & AI' },
  { feature: 'CRM property-to-WhatsApp labeling', starter: 'false', scaler: 'true', omnis: 'true', category: 'Intelligence & AI' },
  { feature: 'Custom objects in mini CRM view', starter: 'false', scaler: 'true', omnis: 'true', category: 'Intelligence & AI' },
  { feature: 'AI unreplied chats agent', starter: 'false', scaler: 'true', omnis: 'true', category: 'Intelligence & AI' },
  { feature: 'Revenue Inbox', starter: 'false', scaler: 'false', omnis: 'true', category: 'Intelligence & AI' },
  { feature: 'RevOps Agent (AI)', starter: 'false', scaler: 'false', omnis: 'true', category: 'Intelligence & AI' },
  { feature: 'WhatsApp Web Copilot', starter: 'false', scaler: 'false', omnis: 'true', category: 'Intelligence & AI' },
  { feature: 'CRM workflow integration', starter: 'false', scaler: 'true', omnis: 'true', category: 'Automation' },
  { feature: 'Bulk messaging', starter: 'true', scaler: 'true', omnis: 'true', category: 'Automation' },
  { feature: 'Auto-create contacts', starter: 'true', scaler: 'true', omnis: 'true', category: 'Automation' },
  { feature: 'Email support', starter: 'true', scaler: 'true', omnis: 'true', category: 'Support' },
  { feature: 'Priority support', starter: 'false', scaler: 'true', omnis: 'true', category: 'Support' },
  { feature: 'Dedicated account manager', starter: 'false', scaler: 'false', omnis: 'true', category: 'Support' },
  { feature: 'WhatsApp group assistance', starter: 'false', scaler: 'false', omnis: 'true', category: 'Support' },
]

const defaultFaqItems: FAQItem[] = [
  {
    question: 'Can I try Eazybe for free?',
    answer: 'Yes! We offer a 14-day free trial on Starter and Scaler plans. No credit card required. You can explore all features and see how Eazybe integrates with your existing workflow before committing.',
  },
  {
    question: 'What is Revenue Inbox?',
    answer: 'Revenue Inbox is our intelligent dashboard that surfaces the most important WhatsApp conversations that need attention. It uses AI to identify hot deals, escalations, and opportunities you might miss in a busy inbox.',
  },
  {
    question: 'What is RevOps Agent?',
    answer: 'RevOps Agent is our AI-powered assistant that automates revenue operations tasks. It can analyze conversations, update CRM records, identify deal risks, and provide actionable insights to help you close more deals.',
  },
  {
    question: 'What is WhatsApp Web Copilot?',
    answer: 'WhatsApp Web Copilot is our AI assistant that works directly in your WhatsApp Web interface. It helps you draft responses, summarize conversations, and provides real-time suggestions to improve your customer communication.',
  },
  {
    question: 'How does per-user pricing work?',
    answer: 'You pay for each team member who actively uses Eazybe. A user is anyone who syncs their WhatsApp conversations to your CRM. Admins who only view data don\'t count as users.',
  },
  {
    question: 'Which CRMs do you integrate with?',
    answer: 'Starter integrates with HubSpot, Zoho CRM, Bitrix24, and Google Sheets. Scaler adds Salesforce and webhook integrations for custom CRMs. Omnis includes dedicated APIs and sync to deals/tickets.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, the change takes effect at your next billing cycle.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use bank-grade 256-bit encryption for all data in transit and at rest. We are GDPR compliant, Meta Business Partner verified, and undergo regular security audits.',
  },
]

// Helper to convert string values to proper types for comparison table
const parseComparisonValue = (value: string): boolean | string => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}

// Icon map for trust signals
const trustIconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={18} className="text-brand-green" />,
  zap: <Zap size={18} className="text-brand-cyan" />,
  clock: <Clock size={18} className="text-brand-orange" />,
  message: <MessageSquare size={18} className="text-brand-blue" />,
}

export const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true)
  const { data: pricingData, loading } = usePricing('en')

  // Use Sanity data if available, otherwise use defaults
  const hero = pricingData?.hero || {
    badge: 'Simple, Transparent Pricing',
    headline: 'Start free. Scale as',
    headlineHighlight: 'you grow.',
    subheadline: 'No hidden fees. No per-message charges. Just simple per-user pricing that scales with your team.',
    billingToggleMonthly: 'Monthly',
    billingToggleAnnual: 'Annual',
    saveBadgeText: 'Save 20%',
  }

  const pricingPlans: PricingPlan[] = pricingData?.plans?.map((plan) => ({
    name: plan.name,
    description: plan.description,
    monthlyPrice: plan.monthlyPrice,
    annualPrice: plan.annualPrice,
    currency: plan.currency,
    icon: plan.icon,
    popular: plan.isPopular,
    enterprise: plan.isEnterprise,
    features: plan.features.map((f) => ({
      text: f.text,
      included: f.included,
      highlight: f.highlight,
    })),
    cta: plan.cta,
  })) || defaultPricingPlans

  const trustSignals = pricingData?.trustSignals || [
    { icon: 'shield', text: 'GDPR Compliant' },
    { icon: 'zap', text: 'Setup in 5 minutes' },
    { icon: 'clock', text: '14-day free trial' },
    { icon: 'message', text: 'No credit card required' },
  ]

  const comparisonSection = pricingData?.comparisonSection || {
    badge: 'Full Comparison',
    title: 'Compare all features',
    subtitle: "Everything you need to know about what's included in each plan.",
  }

  const comparisonFeatures = pricingData?.comparisonSection?.features?.map((f) => ({
    feature: f.feature,
    category: f.category,
    starter: parseComparisonValue(f.starter),
    scaler: parseComparisonValue(f.scaler),
    omnis: parseComparisonValue(f.omnis),
  })) || defaultComparisonFeatures.map((f) => ({
    ...f,
    starter: parseComparisonValue(f.starter),
    scaler: parseComparisonValue(f.scaler),
    omnis: parseComparisonValue(f.omnis),
  }))

  const faqSection = pricingData?.faqSection || {
    badge: 'Questions & Answers',
    title: 'Frequently asked questions',
    subtitle: "Can't find what you're looking for?",
    contactLinkText: 'Contact our team',
  }

  const faqItems: FAQItem[] = pricingData?.faqSection?.faqs?.map((f) => ({
    question: f.question,
    answer: f.answer,
  })) || defaultFaqItems

  const ctaSection = pricingData?.ctaSection || {
    headline: 'Ready to turn WhatsApp into your',
    headlineHighlight: 'revenue engine?',
    subheadline: 'Join 2,000+ teams who sync every conversation, automate follow-ups, and close deals faster.',
    primaryCta: { label: 'Start Free Trial', url: '/signup' },
    secondaryCta: { label: 'Book a Demo', url: '/demo' },
    footnote: 'Free 14-day trial • No credit card required • Cancel anytime',
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

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
            <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-12 lg:py-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
            ))}
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

      {/* Bottom CTA Section */}
      <section className="py-24 bg-brand-surface border-t border-slate-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-brand-blue/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-brand-cyan/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-sans font-extrabold text-white mb-6 leading-tight">
            {ctaSection.headline}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">
              {ctaSection.headlineHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            {ctaSection.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />} className="shadow-glow-blue">
              {ctaSection.primaryCta.label}
            </Button>
            <Button variant="outline" size="lg">
              {ctaSection.secondaryCta.label}
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {ctaSection.footnote}
          </p>
        </div>
      </section>

      {/* Footer with CTA and Security sections */}
      <ChunkyFooter />
    </div>
  )
}

export default PricingPage
