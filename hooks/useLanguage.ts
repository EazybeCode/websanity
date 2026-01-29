import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supportedLanguages, languageNames, languageFlags, type SupportedLanguage } from '../i18n'
import { getLanguageFromPath, removeLanguagePrefix, addLanguagePrefix } from '../components/LanguageProvider'

export function useLanguage() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  // Get current language from URL (more reliable than i18n.language during transitions)
  const currentLanguage = getLanguageFromPath(location.pathname)

  // Change language by navigating to the localized URL
  const changeLanguage = useCallback(
    (lang: SupportedLanguage) => {
      const currentPath = removeLanguagePrefix(location.pathname)
      const newPath = addLanguagePrefix(currentPath, lang)

      // Also update i18n directly for immediate UI update
      i18n.changeLanguage(lang)

      // Navigate to the new localized path
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
