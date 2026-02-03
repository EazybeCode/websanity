import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BASE_URL = 'https://eazybe.com'

// Supported languages with their locale codes
const SUPPORTED_LANGUAGES = {
  en: 'en',
  br: 'pt-BR',
  es: 'es',
  tr: 'tr'
} as const

type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

/**
 * SEOHead Component
 * Dynamically manages canonical tags and hreflang tags for multi-language SEO
 */
export const SEOHead: React.FC = () => {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const pathname = location.pathname

    // Determine current language from path
    const getCurrentLanguage = (): LanguageCode => {
      if (pathname.startsWith('/br')) return 'br'
      if (pathname.startsWith('/es')) return 'es'
      if (pathname.startsWith('/tr')) return 'tr'
      return 'en'
    }

    // Get the path without the language prefix
    const getBasePath = (): string => {
      const lang = getCurrentLanguage()
      if (lang === 'en') return pathname
      return pathname.replace(new RegExp(`^/${lang}`), '') || '/'
    }

    // Build canonical URL for current page
    const buildCanonicalUrl = (): string => {
      const cleanPath = pathname.replace(/\/$/, '') // Remove trailing slash
      return `${BASE_URL}${cleanPath || '/'}`
    }

    // Build alternate URL for a specific language
    const buildAlternateUrl = (lang: LanguageCode): string => {
      const basePath = getBasePath()
      if (lang === 'en') {
        return `${BASE_URL}${basePath}`
      }
      const path = basePath === '/' ? '' : basePath
      return `${BASE_URL}/${lang}${path}`
    }

    const currentLang = getCurrentLanguage()
    const canonicalUrl = buildCanonicalUrl()

    // Remove existing canonical and hreflang tags
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) existingCanonical.remove()

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove())

    // Add canonical tag
    const canonicalLink = document.createElement('link')
    canonicalLink.rel = 'canonical'
    canonicalLink.href = canonicalUrl
    document.head.appendChild(canonicalLink)

    // Add hreflang tags for all supported languages
    Object.entries(SUPPORTED_LANGUAGES).forEach(([langCode, localeCode]) => {
      const hreflangLink = document.createElement('link')
      hreflangLink.rel = 'alternate'
      hreflangLink.hreflang = localeCode
      hreflangLink.href = buildAlternateUrl(langCode as LanguageCode)
      document.head.appendChild(hreflangLink)
    })

    // Add x-default hreflang (points to English version)
    const xDefaultLink = document.createElement('link')
    xDefaultLink.rel = 'alternate'
    xDefaultLink.hreflang = 'x-default'
    xDefaultLink.href = buildAlternateUrl('en')
    document.head.appendChild(xDefaultLink)

    // Update html lang attribute
    document.documentElement.lang = SUPPORTED_LANGUAGES[currentLang]

    // Cleanup function
    return () => {
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) canonical.remove()
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove())
    }
  }, [location.pathname])

  return null // This component doesn't render anything
}

export default SEOHead
