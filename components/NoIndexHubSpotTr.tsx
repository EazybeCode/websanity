import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * NoIndex Wrapper for Turkish HubSpot redirect page
 * Adds noindex, nofollow meta tags to prevent SEO indexing
 * Used specifically for /tr/hubspot route (which redirects to /tr/hubspot-whatsapp-integration)
 *
 * NOTE: Only the redirect URL /tr/hubspot is noindexed
 * The destination /tr/hubspot-whatsapp-integration remains indexable
 */
export const NoIndexHubSpotTr = () => {
  useEffect(() => {
    // Set noindex, nofollow meta tags
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Set robots meta tag to noindex, nofollow
    setMetaTag('robots', 'noindex, nofollow')

    // Also set X-Robots-Tag for additional protection
    let xRobots = document.querySelector('meta[http-equiv="X-Robots-Tag"]')
    if (!xRobots) {
      xRobots = document.createElement('meta')
      xRobots.setAttribute('http-equiv', 'X-Robots-Tag')
      document.head.appendChild(xRobots)
    }
    xRobots.setAttribute('content', 'noindex, nofollow')

    // Cleanup function to reset meta tags when leaving the page
    return () => {
      const robots = document.querySelector('meta[name="robots"]')
      if (robots) {
        robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      }

      const xrobots = document.querySelector('meta[http-equiv="X-Robots-Tag"]')
      if (xrobots) {
        xrobots.remove()
      }
    }
  }, [])

  return <Outlet />
}
