import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Lazy load translations to reduce initial bundle size
// Only load English by default, others loaded on-demand
const enTranslations = () => import('../locales/en/common.json').then(m => m.default)
const ptTranslations = () => import('../locales/pt/common.json').then(m => m.default)
const esTranslations = () => import('../locales/es/common.json').then(m => m.default)
const trTranslations = () => import('../locales/tr/common.json').then(m => m.default)

// Translation loader function
const translationLoader = {
  en: enTranslations,
  br: ptTranslations,
  es: esTranslations,
  tr: trTranslations,
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

// Custom path detector for language from URL
const pathLanguageDetector = {
  name: 'path',
  lookup() {
    const path = window.location.pathname
    const match = path.match(/^\/(br|es|tr)(\/|$)/)
    return match ? match[1] : 'en'
  },
}

// Initialize with lazy loaded translations
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

    // Lazy load translations to reduce initial bundle size
    react: {
      useSuspense: true, // Enable suspense for lazy loading
    },

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
