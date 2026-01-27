import { useState, useEffect } from 'react'
import { getCoexistencePage } from '../lib/sanity'

export interface CoexistencePageData {
  _id: string
  title: string
  language: string
  category: string
  slug: {
    current: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
  }
  hero: {
    badge: string
    headline: string
    headlineHighlight: string
    description: string
    primaryCta: {
      label: string
      url: string
    }
    secondaryCta: {
      label: string
      url: string
    }
    stats: Array<{
      label: string
      value: string
    }>
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
    alignRight: boolean
    badge: string
    headline: string
    headlineHighlight: string
    description: string
    image: string
    points: string[]
    cta: {
      label: string
      url: string
    }
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

export function useCoexistence(language: string = 'en') {
  const [data, setData] = useState<CoexistencePageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getCoexistencePage(language)
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
