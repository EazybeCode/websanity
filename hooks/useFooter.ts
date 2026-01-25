import { useState, useEffect } from 'react'
import { getFooter } from '../lib/sanity'
import type { FooterData } from '../components/dynamic/FooterDynamic'

interface UseFooterReturn {
  data: FooterData | null
  loading: boolean
  error: Error | null
}

export function useFooter(): UseFooterReturn {
  const [data, setData] = useState<FooterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchFooter() {
      try {
        const footerData = await getFooter()
        setData(footerData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch footer'))
      } finally {
        setLoading(false)
      }
    }

    fetchFooter()
  }, [])

  return { data, loading, error }
}
