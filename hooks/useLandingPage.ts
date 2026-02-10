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
  headlineHighlight?: string
  subheadline?: string
  primaryCta?: Button
  secondaryCta?: Button
  backgroundColor?: 'white' | 'blue' | 'dark' | 'gray'
  footnote?: string
}

interface Button {
  label?: string
  url?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

const CACHE_KEY = 'landingPage_cache'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

interface CachedData {
  data: LandingPageData
  timestamp: number
}

export function useLandingPage() {
  const [data, setData] = useState<LandingPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Try to load from localStorage cache immediately
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data: cachedData, timestamp }: CachedData = JSON.parse(cached)
        const age = Date.now() - timestamp

        // Show cached data immediately (stale-while-revalidate pattern)
        setData(cachedData)
        setLoading(false)

        // Skip network request if cache is fresh (less than 1 hour old)
        if (age < CACHE_DURATION) {
          return
        }
      }
    } catch (err) {
      console.warn('Failed to load from cache:', err)
    }

    // Fetch fresh data from Sanity with timeout
    const fetchWithTimeout = async (timeoutMs: number = 8000) => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

      try {
        const result = await getLandingPage()
        clearTimeout(timeoutId)

        // Update state
        setData(result)
        setLoading(false)

        // Cache the result
        try {
          const cacheData: CachedData = {
            data: result,
            timestamp: Date.now()
          }
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
        } catch (err) {
          console.warn('Failed to cache data:', err)
        }
      } catch (err) {
        clearTimeout(timeoutId)
        throw err
      }
    }

    fetchWithTimeout()
      .catch((err) => {
        // Only set error if we don't have cached data
        if (!data) {
          setError(err)
          setLoading(false)
        }
        console.warn('Failed to fetch fresh data:', err)
      })
  }, [])

  return { data, loading, error }
}
