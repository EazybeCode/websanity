import { useState, useEffect } from 'react'
import { getSharedSections } from '../lib/sanity'
import type { SecuritySectionData, CTASectionData } from '../components/shared'

export interface SharedSectionsData {
  security?: SecuritySectionData
  cta?: CTASectionData
}

interface UseSharedSectionsReturn {
  data: SharedSectionsData | null
  loading: boolean
  error: Error | null
}

export function useSharedSections(): UseSharedSectionsReturn {
  const [data, setData] = useState<SharedSectionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSharedSections() {
      try {
        const sectionsData = await getSharedSections()
        setData(sectionsData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch shared sections'))
      } finally {
        setLoading(false)
      }
    }

    fetchSharedSections()
  }, [])

  return { data, loading, error }
}
