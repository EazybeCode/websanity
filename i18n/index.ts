import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files directly for bundling
import enCommon from '../locales/en/common.json'
import ptCommon from '../locales/pt/common.json'
import esCommon from '../locales/es/common.json'
import trCommon from '../locales/tr/common.json'

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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      br: { common: ptCommon },
      es: { common: esCommon },
      tr: { common: trCommon },
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

export default i18n
