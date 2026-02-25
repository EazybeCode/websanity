import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Load only the translations we need based on URL
const getLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const path = window.location.pathname
  const match = path.match(/^\/(br|es|tr)(\/|$)/)
  return match ? match[1] : 'en'
}

const currentLang = getLanguage()

// Dynamic import for translations - only loads needed language
let translations: any
try {
  switch (currentLang) {
    case 'br':
      translations = require('../locales/pt/common.json')
      break
    case 'es':
      translations = require('../locales/es/common.json')
      break
    case 'tr':
      translations = require('../locales/tr/common.json')
      break
    default:
      translations = require('../locales/en/common.json')
  }
} catch {
  translations = require('../locales/en/common.json')
}

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

// Custom path detector
const pathLanguageDetector = {
  name: 'path',
  lookup() {
    return currentLang
  },
}

// Initialize with only the current language translations
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [currentLang]: { common: translations }
    },
    lng: currentLang,
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path'],
      caches: [],
    },
    ns: ['common'],
    defaultNS: 'common',
  })

// Add custom detector
const languageDetector = i18n.services.languageDetector as any
if (languageDetector?.addDetector) {
  languageDetector.addDetector(pathLanguageDetector)
}

export default i18n
