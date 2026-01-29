import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { supportedLanguages, languageNames, languageFlags, type SupportedLanguage } from '../i18n'

export function useLanguage() {
  const { i18n } = useTranslation()

  const currentLanguage = (i18n.language?.substring(0, 2) || 'en') as SupportedLanguage

  const changeLanguage = useCallback(
    (lang: SupportedLanguage) => {
      i18n.changeLanguage(lang)
    },
    [i18n]
  )

  return {
    currentLanguage,
    changeLanguage,
    supportedLanguages,
    languageNames,
    languageFlags,
  }
}

export default useLanguage
