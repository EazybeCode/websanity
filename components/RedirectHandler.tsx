import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllRedirects } from '../lib/sanity'
import { redirectMappings as hardcodedRedirects } from '../src/routes/redirectRoutes'

/**
 * Handles dynamic redirects from Sanity CMS
 * Checks the current path and redirects if a match is found
 */
export const RedirectHandler: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [redirectsLoaded, setRedirectsLoaded] = useState(false)
  const [redirects, setRedirects] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    async function loadRedirects() {
      try {
        // Fetch redirects from Sanity
        const sanityRedirects = await getAllRedirects()

        // Create a map of source -> destination
        const redirectMap = new Map<string, string>()

        // Add hardcoded redirects first (lower priority)
        hardcodedRedirects.forEach(r => {
          redirectMap.set(r.from, r.to)
        })

        // Override/add Sanity redirects (higher priority)
        sanityRedirects.forEach(r => {
          redirectMap.set(r.source, r.destination)
        })

        setRedirects(redirectMap)
        setRedirectsLoaded(true)

        console.log(`🔀 Loaded ${sanityRedirects.length} Sanity redirects + ${hardcodedRedirects.length} hardcoded redirects`)
      } catch (error) {
        console.error('Error loading redirects:', error)
        // Use hardcoded redirects as fallback
        const fallbackMap = new Map<string, string>()
        hardcodedRedirects.forEach(r => {
          fallbackMap.set(r.from, r.to)
        })
        setRedirects(fallbackMap)
        setRedirectsLoaded(true)
      }
    }

    loadRedirects()
  }, [])

  useEffect(() => {
    if (!redirectsLoaded) return

    const currentPath = location.pathname
    const destination = redirects.get(currentPath)

    if (destination && destination !== currentPath) {
      console.log(`🔀 Redirecting: ${currentPath} → ${destination}`)
      navigate(destination, { replace: true })
    }
  }, [location.pathname, redirectsLoaded, redirects, navigate])

  return null // This component doesn't render anything
}

export default RedirectHandler
