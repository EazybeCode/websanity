import { useState, useEffect } from 'react'
import { getPricingPage } from '../lib/sanity'

export interface PricingPlanData {
  _key: string
  name: string
  description: string
  icon: 'starter' | 'growth' | 'enterprise'
  monthlyPrice: number
  annualPrice: number
  currency: string
  isPopular?: boolean
  isEnterprise?: boolean
  features: Array<{
    _key: string
    text: string
    included: boolean
    highlight?: boolean
  }>
  cta: {
    label: string
    url: string
  }
}

export interface ComparisonFeature {
  _key: string
  feature: string
  category: string
  starter: string
  scaler: string
  omnis: string
}

export interface FAQItem {
  _key: string
  question: string
  answer: string
}

export interface PricingPageData {
  language: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  hero: {
    badge: string
    headline: string
    headlineHighlight: string
    subheadline: string
    billingToggleMonthly: string
    billingToggleAnnual: string
    saveBadgeText: string
  }
  plans: PricingPlanData[]
  trustSignals: Array<{
    _key: string
    icon: 'shield' | 'zap' | 'clock' | 'message'
    text: string
  }>
  comparisonSection: {
    badge: string
    title: string
    subtitle: string
    features: ComparisonFeature[]
  }
  faqSection: {
    badge: string
    title: string
    subtitle: string
    contactLinkText: string
    faqs: FAQItem[]
  }
  ctaSection: {
    headline: string
    headlineHighlight: string
    subheadline: string
    primaryCta: {
      label: string
      url: string
    }
    secondaryCta: {
      label: string
      url: string
    }
    footnote: string
  }
}

export function usePricing(language: string = 'en') {
  const [data, setData] = useState<PricingPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getPricingPage(language)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [language])

  return { data, loading, error }
}
