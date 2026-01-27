import { useState, useEffect } from 'react'
import { getCategoryIndexPage } from '../lib/sanity'

export interface CategoryIndexPageData {
  slug: string
  title: string
  category: string
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
  }
  intro: {
    headline: string
    description: string
  }
  featuredItems: Array<{
    name: string
    slug: string
    description: string
    icon: string
    color: string
    isFeatured: boolean
    tags: string[]
  }>
  comparisonTable?: {
    headline: string
    description: string
    columns: string[]
    rows: Array<{
      feature: string
      values: Array<{
        type: 'check' | 'cross' | 'partial' | 'text'
        text?: string
      }>
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

export function useCategoryIndex(slug: string, language: string = 'en') {
  const [data, setData] = useState<CategoryIndexPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    setLoading(true)
    console.log('useCategoryIndex fetching:', slug, language)
    getCategoryIndexPage(slug, language)
      .then((result) => {
        console.log('useCategoryIndex result:', result)
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        console.error('useCategoryIndex error:', err)
        setError(err)
        setLoading(false)
      })
  }, [slug, language])

  return { data, loading, error }
}
