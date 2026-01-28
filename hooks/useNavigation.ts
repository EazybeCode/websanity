import { useState, useEffect } from 'react'
import { getNavigation } from '../lib/sanity'

export interface NavLink {
  _key: string
  label: string
  href: string
  description?: string
  icon?: string
  isExternal?: boolean
}

export interface NavColumn {
  _key: string
  title?: string
  links: NavLink[]
}

export interface NavItem {
  _key: string
  label: string
  href?: string
  isMegaMenu?: boolean
  isExternal?: boolean
  columns?: NavColumn[]
}

export interface NavigationData {
  title: string
  slug: string
  items: NavItem[]
  ctaButton?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  signInButton?: {
    label: string
    href: string
  }
}

interface UseNavigationReturn {
  data: NavigationData | null
  loading: boolean
  error: Error | null
}

export function useNavigation(slug: string = 'main-nav'): UseNavigationReturn {
  const [data, setData] = useState<NavigationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const navData = await getNavigation(slug)
        setData(navData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch navigation'))
      } finally {
        setLoading(false)
      }
    }

    fetchNavigation()
  }, [slug])

  return { data, loading, error }
}
