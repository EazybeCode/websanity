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
    let hasFetchedData = false

    // 1. Try to load from prebuilt static JSON first (fastest - instant on mobile)
    fetch('/landing-data.json')
      .then(res => res.json())
      .then(prebuiltData => {
        if (!hasFetchedData) {
          setData(prebuiltData)
          setLoading(false)
          hasFetchedData = true
        }
      })
      .catch(() => {
        console.warn('Prebuilt data not available, falling back to cache/API')
      })

    // 2. Try to load from localStorage cache
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data: cachedData, timestamp }: CachedData = JSON.parse(cached)
        const age = Date.now() - timestamp

        // Show cached data if we don't have prebuilt data yet
        if (!hasFetchedData) {
          setData(cachedData)
          setLoading(false)
          hasFetchedData = true
        }

        // Skip API request if cache is fresh (less than 1 hour old)
        if (age < CACHE_DURATION) {
          return
        }
      }
    } catch (err) {
      console.warn('Failed to load from cache:', err)
    }

    // 3. Fetch fresh data from Sanity API in background
    getLandingPage()
      .then((result) => {
        // Update with fresh data
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
      })
      .catch((err) => {
        // Only set error if we don't have any data (prebuilt or cached)
        if (!hasFetchedData) {
          setError(err)
          setLoading(false)
        }
        console.warn('Failed to fetch fresh data:', err)
      })
  }, [])

  return { data, loading, error }
}
