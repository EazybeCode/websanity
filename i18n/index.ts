import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Lazy load translations on demand
const loadLanguage = async (lang: string) => {
  switch (lang) {
    case 'en':
      return (await import('../locales/en/common.json')).default
    case 'br':
      return (await import('../locales/pt/common.json')).default
    case 'es':
      return (await import('../locales/es/common.json')).default
    case 'tr':
      return (await import('../locales/tr/common.json')).default
    default:
      return (await import('../locales/en/common.json')).default
  }
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

// Initialize with empty resources, load on demand
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {}, // Start empty, load lazily
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

// Load the detected language asynchronously
const detectedLang = pathLanguageDetector.lookup() || 'en'
loadLanguage(detectedLang).then((translations) => {
  i18n.addResourceBundle(detectedLang, 'common', translations, true, true)
  if (i18n.language !== detectedLang) {
    i18n.changeLanguage(detectedLang)
  }
})

export default i18n
