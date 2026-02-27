import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getBlogPostHreflangData } from '../lib/sanity'

const BASE_URL = 'https://eazybe.com'

// Supported languages with their locale codes
const SUPPORTED_LANGUAGES = {
  en: 'en',
  br: 'pt-BR',
  es: 'es',
  tr: 'tr'
} as const

type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

interface AlternateUrl {
  lang: string
  url: string
}

/**
 * SEOHead Component
 * Dynamically manages canonical tags and hreflang tags for multi-language SEO
 * For blog posts, fetches actual translations from Sanity
 */
export const SEOHead: React.FC = () => {
  const location = useLocation()
  const { i18n } = useTranslation()
  const [alternates, setAlternates] = useState<AlternateUrl[]>([])

  useEffect(() => {
    const pathname = location.pathname

    // Determine current language from path
    const getCurrentLanguage = (): LanguageCode => {
      if (pathname.startsWith('/br')) return 'br'
      if (pathname.startsWith('/es')) return 'es'
      if (pathname.startsWith('/tr')) return 'tr'
      return 'en'
    }

    // Check if this is a blog post page
    const isBlogPostPage = /^\/(?:br|es|tr)?\/blog\/[^/]+/.test(pathname) ||
                          pathname === '/blog' ||
                          /^\/blog\/[^/]+/.test(pathname)

    // Extract slug from blog post URL
    const getBlogSlug = (): string | null => {
      const match = pathname.match(/\/blog\/([^/]+)/)
      return match ? match[1] : null
    }

    // Map language codes between route and Sanity
    const getSanityLanguageCode = (lang: LanguageCode): string => {
      if (lang === 'br') return 'pt-BR'
      return lang
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

    // Build alternate URL for a specific language (non-blog pages)
    const buildAlternateUrl = (lang: LanguageCode): AlternateUrl => {
      const basePath = getBasePath()
      const localeCode = SUPPORTED_LANGUAGES[lang]

      if (lang === 'en') {
        return { lang: localeCode, url: `${BASE_URL}${basePath}` }
      }
      const path = basePath === '/' ? '' : basePath
      return { lang: localeCode, url: `${BASE_URL}/${lang}${path}` }
    }

    const currentLang = getCurrentLanguage()
    const canonicalUrl = buildCanonicalUrl()

    // For blog posts, fetch actual translations from Sanity
    if (isBlogPostPage) {
      const blogSlug = getBlogSlug()
      if (blogSlug) {
        const sanityLang = getSanityLanguageCode(currentLang)

        console.log('🔍 Fetching translations for blog slug:', blogSlug, 'Language:', sanityLang)
        getBlogPostHreflangData(blogSlug, sanityLang)
          .then(translations => {
            console.log('✅ Blog translations fetched:', translations)
            setAlternates(translations)
          })
          .catch(err => {
            console.error('❌ Failed to fetch blog translations, falling back to default:', err)
            // Fallback to default language-based alternates
            const defaultAlternates = Object.entries(SUPPORTED_LANGUAGES).map(([langCode, localeCode]) =>
              buildAlternateUrl(langCode as LanguageCode)
            )
            setAlternates(defaultAlternates)
          })
        return
      }
    }

    // For non-blog pages, use default language-based alternates
    const defaultAlternates = Object.entries(SUPPORTED_LANGUAGES).map(([langCode, localeCode]) =>
      buildAlternateUrl(langCode as LanguageCode)
    )
    setAlternates(defaultAlternates)
  }, [location.pathname])

  // Update head tags when alternates change
  useEffect(() => {
    if (alternates.length === 0) return

    const pathname = location.pathname
    const cleanPath = pathname.replace(/\/$/, '')
    const canonicalUrl = `${BASE_URL}${cleanPath || '/'}`

    // Determine current language from path
    const getCurrentLanguage = (): LanguageCode => {
      if (pathname.startsWith('/br')) return 'br'
      if (pathname.startsWith('/es')) return 'es'
      if (pathname.startsWith('/tr')) return 'tr'
      return 'en'
    }

    const currentLang = getCurrentLanguage()
    const currentLocale = SUPPORTED_LANGUAGES[currentLang]

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
    alternates.forEach(({ lang, url }) => {
      const hreflangLink = document.createElement('link')
      hreflangLink.rel = 'alternate'
      hreflangLink.hreflang = lang
      hreflangLink.href = url
      document.head.appendChild(hreflangLink)
    })

    // Add x-default hreflang (points to English version or first available)
    const xDefaultLink = document.createElement('link')
    xDefaultLink.rel = 'alternate'
    xDefaultLink.hreflang = 'x-default'
    const englishAlternate = alternates.find(a => a.lang === 'en') || alternates[0]
    xDefaultLink.href = englishAlternate?.url || canonicalUrl
    document.head.appendChild(xDefaultLink)

    // Update html lang attribute
    document.documentElement.lang = currentLocale

    // Cleanup function
    return () => {
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) canonical.remove()
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove())
    }
  }, [alternates, location.pathname])

  return null // This component doesn't render anything
}

export default SEOHead
