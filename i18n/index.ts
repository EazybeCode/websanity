import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files directly for bundling
import enCommon from '../locales/en/common.json'
import ptCommon from '../locales/pt/common.json'
import esCommon from '../locales/es/common.json'
import trCommon from '../locales/tr/common.json'

export const supportedLanguages = ['en', 'pt', 'es', 'tr'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  tr: 'Türkçe',
}

export const languageFlags: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
  es: '🇪🇸',
  tr: '🇹🇷',
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      pt: { common: ptCommon },
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
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    ns: ['common'],
    defaultNS: 'common',
  })

export default i18n
