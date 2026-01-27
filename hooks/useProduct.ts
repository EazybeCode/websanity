import { useState, useEffect } from 'react'
import { getProductPage } from '../lib/sanity'

export interface ProductPageData {
  slug: string
  crmName: string
  crmSlug: string
  crmColor: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  hero: {
    badge: string
    headline: string
    headlineHighlight: string
    description: string
    primaryCta: { label: string; url: string }
    secondaryCta: { label: string; url: string }
    stats: Array<{ value: string; label: string }>
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
    cta: { label: string; url: string }
    image: string
    alignRight: boolean
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
  testimonial: {
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

export function useProduct(slug: string, language: string = 'en') {
  const [data, setData] = useState<ProductPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    setLoading(true)
    getProductPage(slug, language)
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
