import { useState, useEffect } from 'react'
import { getBlogPost, getBlogPosts, getBlogIndexPage } from '../lib/sanity'

export interface BlogAuthor {
  name: string
  bio?: string
  image?: string
}

export interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  listItem?: string
  level?: number
  markDefs?: any[]
  children?: any[]
  url?: string // For image blocks
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: PortableTextBlock[]
  category: string
  language?: string
  featuredImage?: string
  publishedAt: string
  readTime: number
  author?: BlogAuthor
  quickAnswer?: string
  tableOfContents?: Array<{
    label: string
    id: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export function useBlogPost(slug: string, language: string = 'en') {
  const [data, setData] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    getBlogPost(slug, language)
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

export function useBlogPosts(limit?: number, language: string = 'en') {
  const [data, setData] = useState<BlogPost[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getBlogPosts(limit, language)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [limit, language])

  return { data, loading, error }
}

// Blog Index Page Types
export interface BlogCategory {
  name: string
  value: string
}

export interface BlogIndexHero {
  badge?: string
  headline?: string
  headlineHighlight?: string
  description?: string
  searchPlaceholder?: string
}

export interface BlogIndexFeaturedSection {
  title?: string
  badgeText?: string
  featuredPosts?: BlogPost[]
}

export interface BlogIndexAllArticlesSection {
  badge?: string
  title?: string
  emptyStateTitle?: string
  emptyStateButton?: string
}

export interface BlogIndexSidebarCta {
  badge?: string
  headline?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  footnote?: string
}

export interface BlogIndexNewsletterCta {
  headline?: string
  description?: string
  placeholder?: string
  buttonText?: string
}

export interface BlogIndexRelatedPostsSection {
  badge?: string
  title?: string
  viewAllText?: string
}

export interface BlogIndexDetailLabels {
  backToBlog?: string
  tocTitle?: string
  summaryTitle?: string
  summarySubtitle?: string
  faqTitle?: string
  authorLabel?: string
  minReadSuffix?: string
}

export interface BlogIndexCtaSection {
  headline?: string
  headlineHighlight?: string
  description?: string
  primaryCta?: {
    label?: string
    url?: string
  }
  secondaryCta?: {
    label?: string
    url?: string
  }
  footnote?: string
}

export interface BlogIndexPage {
  language: string
  title?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  hero?: BlogIndexHero
  categories?: BlogCategory[]
  featuredSection?: BlogIndexFeaturedSection
  allArticlesSection?: BlogIndexAllArticlesSection
  sidebarCta?: BlogIndexSidebarCta
  newsletterCta?: BlogIndexNewsletterCta
  relatedPostsSection?: BlogIndexRelatedPostsSection
  detailLabels?: BlogIndexDetailLabels
  ctaSection?: BlogIndexCtaSection
}

export function useBlogIndex(language: string = 'en') {
  const [data, setData] = useState<BlogIndexPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getBlogIndexPage(language)
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
