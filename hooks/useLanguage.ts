import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supportedLanguages, languageNames, languageFlags, type SupportedLanguage } from '../i18n'
import { getLanguageFromPath, removeLanguagePrefix, addLanguagePrefix } from '../components/LanguageProvider'
import { getBlogPostTranslations } from '../lib/sanity'

// Map route language codes to Sanity language codes
const routeToSanity: Record<string, string> = {
  'en': 'en',
  'es': 'es',
  'tr': 'tr',
  'br': 'pt-BR',
}

// Map Sanity language codes to route prefixes
const sanityToRoute: Record<string, string> = {
  'en': 'en',
  'es': 'es',
  'tr': 'tr',
  'pt-BR': 'br',
  'pt': 'br',
}

export function useLanguage() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  // Get current language from URL (more reliable than i18n.language during transitions)
  const currentLanguage = getLanguageFromPath(location.pathname)

  // Change language by navigating to the localized URL
  const changeLanguage = useCallback(
    async (lang: SupportedLanguage) => {
      const currentPath = removeLanguagePrefix(location.pathname)

      // Check if we're on a blog post page
      const blogMatch = currentPath.match(/^\/blog\/([^/]+)/)
      if (blogMatch) {
        const currentSlug = blogMatch[1]
        try {
          const translations = await getBlogPostTranslations(currentSlug)
          const targetSanityLang = routeToSanity[lang] || lang
          // Find translation for target language
          const target = translations.find(t => t.language === targetSanityLang)
            || translations.find(t => sanityToRoute[t.language] === lang)
          if (target) {
            const prefix = lang === 'en' ? '' : `/${lang}`
            i18n.changeLanguage(lang)
            navigate(`${prefix}/blog/${target.slug}${location.search}${location.hash}`)
            return
          }
        } catch (err) {
          // Fall through to default behavior
        }
      }

      // Default: swap language prefix, keep same path
      const newPath = addLanguagePrefix(currentPath, lang)
      i18n.changeLanguage(lang)
      navigate(newPath + location.search + location.hash)
    },
    [i18n, location, navigate]
  )

  // Get localized version of a path
  const getLocalizedPath = useCallback(
    (path: string) => {
      return addLanguagePrefix(path, currentLanguage)
    },
    [currentLanguage]
  )

  return {
    currentLanguage,
    changeLanguage,
    getLocalizedPath,
    supportedLanguages,
    languageNames,
    languageFlags,
  }
}

export default useLanguage
