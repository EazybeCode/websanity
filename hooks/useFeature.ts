import { useState, useEffect } from 'react'
import { getFeaturePage } from '../lib/sanity'

// Section types for modular page builder
export interface ProductSection {
  _type: string
  _key?: string
  // Common fields
  badge?: string
  headline?: string
  headlineHighlight?: string
  description?: string
  primaryCta?: { label: string; url: string }
  secondaryCta?: { label: string; url: string }
  stats?: Array<{ value: string; label: string }>
  // Benefits/UseCases items
  items?: Array<{
    icon?: string
    title: string
    description: string
    benefits?: string[]
  }>
  // Features array
  features?: Array<{
    badge?: string
    headline?: string
    description?: string
    points?: string[]
    visualType?: string
    alignRight?: boolean
    cta?: { label: string; url: string }
  }>
  // HowItWorks steps
  steps?: Array<{
    number?: string
    title?: string
    description?: string
  }>
  // Testimonial fields
  quote?: string
  author?: string
  title?: string
  company?: string
  avatar?: string
  // Security fields
  badges?: Array<{
    icon?: string
    title?: string
    subtitle?: string
    badge?: string
    featured?: boolean
  }>
  footnote?: string
}

export interface FeaturePageData {
  slug: string
  title: string
  category: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  // New modular sections array
  sections?: ProductSection[]
  // Legacy fields (for backward compatibility)
  hero: {
    badge: string
    headline: string
    headlineHighlight: string
    description: string
    primaryCta: { label: string; url: string }
    secondaryCta: { label: string; url: string }
    stats?: Array<{ value: string; label: string }>
  }
  benefits: {
    badge: string
    headline: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  features: Array<{
    badge: string
    headline: string
    description: string
    points: string[]
    visualType?: string
    cta: { label: string; url: string }
  }>
  howItWorks: {
    badge: string
    headline: string
    description: string
    steps: Array<{
      number: string
      title: string
      description: string
    }>
  }
  useCases: {
    badge: string
    headline: string
    items: Array<{
      icon: string
      title: string
      description: string
      benefits: string[]
    }>
  }
  testimonial?: {
    quote: string
    author: string
    title: string
    company: string
    avatar?: string
  }
  faq: {
    badge: string
    headline: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  cta: {
    headline: string
    headlineHighlight: string
    description: string
    primaryCta: { label: string; url: string }
    secondaryCta: { label: string; url: string }
    footnote: string
  }
}

export function useFeature(slug: string, language: string = 'en') {
  const [data, setData] = useState<FeaturePageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    setLoading(true)
    getFeaturePage(slug, language)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [slug, language])

  return { data, loading, error }
}
