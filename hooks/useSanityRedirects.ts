import { useEffect, useState } from 'react'
import { getAllRedirects } from '../lib/sanity'
import { redirectMappings as hardcodedRedirects } from '../src/routes/redirectRoutes'

export interface RedirectMapping {
  from: string
  to: string
}

/**
 * Fetches redirects from Sanity CMS and merges them with hardcoded redirects
 * Sanity redirects take precedence over hardcoded ones
 */
export function useSanityRedirects(): RedirectMapping[] {
  const [redirects, setRedirects] = useState<RedirectMapping[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRedirects() {
      try {
        // Fetch redirects from Sanity
        const sanityRedirects = await getAllRedirects()

        // Transform Sanity redirects to match our format
        const formattedSanityRedirects: RedirectMapping[] = sanityRedirects.map(r => ({
          from: r.source,
          to: r.destination
        }))

        // Create a Map to track unique "from" URLs
        const redirectMap = new Map<string, string>()

        // Add hardcoded redirects first (lower priority)
        hardcodedRedirects.forEach(r => {
          redirectMap.set(r.from, r.to)
        })

        // Override with Sanity redirects (higher priority)
        formattedSanityRedirects.forEach(r => {
          redirectMap.set(r.from, r.to)
        })

        // Convert back to array
        const mergedRedirects = Array.from(redirectMap.entries()).map(([from, to]) => ({ from, to }))

        console.log(`🔀 Total redirects: ${mergedRedirects.length} (${formattedSanityRedirects.length} from Sanity, ${hardcodedRedirects.length} hardcoded)`)

        setRedirects(mergedRedirects)
      } catch (error) {
        console.error('Error loading redirects:', error)
        // Fallback to hardcoded redirects only
        setRedirects(hardcodedRedirects)
      } finally {
        setLoading(false)
      }
    }

    loadRedirects()
  }, [])

  return redirects
}

export default useSanityRedirects
