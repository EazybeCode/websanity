'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'

const clientSideClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

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

const navigationQuery = `*[_type == "navigation" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  items[]{
    _key,
    label,
    href,
    isMegaMenu,
    isExternal,
    columns[]{
      _key,
      title,
      links[]{
        _key,
        label,
        href,
        description,
        icon,
        isExternal
      }
    }
  },
  ctaButton{
    label,
    href,
    variant
  },
  signInButton{
    label,
    href
  }
}`

export function useNavigation(slug: string = 'main-nav'): UseNavigationReturn {
  const [data, setData] = useState<NavigationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const navData = await clientSideClient.fetch(navigationQuery, { slug })
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
