import { useState, useEffect } from 'react'
import { getLandingPage } from '../lib/sanity'

export interface LandingPageData {
  title: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  sections: Section[]
}

export type Section =
  | HeroSection
  | ClientLogosSection
  | ComparisonSection
  | ProblemSection
  | IntegrationsSection
  | FeatureSection
  | TestimonialSection
  | StatsSection
  | SecuritySection
  | CTASection

interface BaseSection {
  _type: string
  _key: string
}

export interface HeroSection extends BaseSection {
  _type: 'heroSection'
  badge?: string
  headline?: string
  headlineHighlight?: string
  subheadline?: string
  primaryCta?: Button
  secondaryCta?: Button
  socialProof?: string
  trustedLogos?: string[]
}

export interface ClientLogosSection extends BaseSection {
  _type: 'clientLogosSection'
  title?: string
  logos?: Array<{ name: string; logo?: any }>
}

export interface ComparisonSection extends BaseSection {
  _type: 'comparisonSection'
  badge?: string
  headline?: string
  description?: string
  comparisonRows?: Array<{
    capability: string
    otherTools: boolean
    eazybe: boolean
  }>
}

export interface ProblemSection extends BaseSection {
  _type: 'problemSection'
  badge?: string
  headline?: string
  subheadline?: string
  problems?: Array<{
    icon: string
    title: string
    description: string
  }>
}

export interface IntegrationsSection extends BaseSection {
  _type: 'integrationsSection'
  title?: string
  integrations?: Array<{
    name: string
    logoUrl?: string
  }>
  showWebhooks?: boolean
  footnote?: string
}

export interface FeatureSection extends BaseSection {
  _type: 'featureSection'
  features?: Array<{
    id: string
    badge: string
    headline: string
    description: string
    points?: Array<{ text: string }>
    ctaLabel?: string
    ctaUrl?: string
    alignRight?: boolean
  }>
}

export interface TestimonialSection extends BaseSection {
  _type: 'testimonialSection'
  title?: string
  testimonials?: Array<{
    quote: string
    author: string
    role?: string
    company?: string
  }>
}

export interface StatsSection extends BaseSection {
  _type: 'statsSection'
  title?: string
  stats?: Array<{
    value: string
    label: string
    description?: string
  }>
}

export interface SecuritySection extends BaseSection {
  _type: 'securitySection'
  badge?: string
  badges?: Array<{
    icon: string
    title: string
    subtitle?: string
    badge?: string
    featured?: boolean
  }>
  footnote?: string
}

export interface CTASection extends BaseSection {
  _type: 'ctaSection'
  headline?: string
  subheadline?: string
  primaryCta?: Button
  secondaryCta?: Button
  backgroundColor?: string
}

interface Button {
  label?: string
  url?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export function useLandingPage() {
  const [data, setData] = useState<LandingPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getLandingPage()
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
