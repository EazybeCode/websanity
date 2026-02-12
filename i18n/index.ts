import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import all translations upfront
import enTranslations from '../locales/en/common.json'
import ptTranslations from '../locales/pt/common.json'
import esTranslations from '../locales/es/common.json'
import trTranslations from '../locales/tr/common.json'

export const supportedLanguages = ['en', 'br', 'es', 'tr'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  br: 'Português',
  es: 'Español',
  tr: 'Türkçe',
}

export const languageFlags: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  br: '🇧🇷',
  es: '🇪🇸',
  tr: '🇹🇷',
}

// Custom path detector for language from URL
const pathLanguageDetector = {
  name: 'path',
  lookup() {
    const path = window.location.pathname
    const match = path.match(/^\/(br|es|tr)(\/|$)/)
    return match ? match[1] : 'en'
  },
}

// Initialize with all translations preloaded
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enTranslations },
      br: { common: ptTranslations },
      es: { common: esTranslations },
      tr: { common: trTranslations },
    },
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    ns: ['common'],
    defaultNS: 'common',
  })

// Add custom detector
const languageDetector = i18n.services.languageDetector as any
if (languageDetector?.addDetector) {
  languageDetector.addDetector(pathLanguageDetector)
}

// Set the initial language based on URL path
const detectedLang = pathLanguageDetector.lookup() || 'en'
if (i18n.language !== detectedLang) {
  i18n.changeLanguage(detectedLang)
}

export default i18n
