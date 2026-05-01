'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import {
  getGlobalBlogTranslations,
  subscribeGlobalBlogTranslations,
} from '@/contexts/BlogTranslationsContext'

export type SupportedLanguage = 'en' | 'br' | 'es' | 'tr'

export const supportedLanguages: SupportedLanguage[] = ['en', 'br', 'es', 'tr']

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  br: 'Portugues',
  es: 'Espanol',
  tr: 'Turkce',
}

export const languageFlags: Record<SupportedLanguage, string> = {
  en: '\u{1F1FA}\u{1F1F8}',
  br: '\u{1F1E7}\u{1F1F7}',
  es: '\u{1F1EA}\u{1F1F8}',
  tr: '\u{1F1F9}\u{1F1F7}',
}

function removeLanguagePrefix(path: string): string {
  const prefixes = ['/br', '/es', '/tr']
  for (const prefix of prefixes) {
    if (path === prefix || path.startsWith(prefix + '/')) {
      return path.slice(prefix.length) || '/'
    }
  }
  return path
}

function addLanguagePrefix(path: string, lang: SupportedLanguage): string {
  const cleanPath = removeLanguagePrefix(path)
  if (lang === 'en') return cleanPath
  return `/${lang}${cleanPath}`
}

// Snapshot function for useSyncExternalStore
function getSnapshot() {
  return getGlobalBlogTranslations()
}

// Server snapshot must be cached to avoid infinite loop
const SERVER_SNAPSHOT = { translations: [] as any[], currentSlug: '' }
function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useLanguage() {
  const locale = useLocale() as SupportedLanguage
  const pathname = usePathname()
  const router = useRouter()

  // Subscribe to global blog translations store (reactive)
  const { translations } = useSyncExternalStore(
    subscribeGlobalBlogTranslations,
    getSnapshot,
    getServerSnapshot
  )

  const currentLanguage = locale

  const changeLanguage = useCallback(
    (lang: SupportedLanguage) => {
      // Per-slug routes (blog / comparison posts) have language-specific
      // slugs. Switching locale by just swapping the prefix produces
      // `/es/<en-slug>` style 404 URLs — that's exactly the pattern that
      // polluted GSC historically. Use the BlogTranslations context if
      // available; otherwise route the user to the locale's index page
      // instead of synthesizing a wrong URL.
      const isPerSlugRoute = /^\/(?:(?:en|br|es|tr)\/)?(?:blog|comparison)\/[^/]+\/?$/.test(pathname)

      if (translations.length > 0) {
        const translation = translations.find((t) => t.locale === lang)
        if (translation) {
          try {
            const url = new URL(translation.url)
            window.location.href = url.pathname
          } catch {
            window.location.href = translation.url
          }
          return
        }
        if (isPerSlugRoute) {
          const indexPath = /\/blog\//.test(pathname) ? '/blog' : '/comparison'
          router.replace(indexPath, { locale: lang })
          return
        }
      } else if (isPerSlugRoute) {
        const indexPath = /\/blog\//.test(pathname) ? '/blog' : '/comparison'
        router.replace(indexPath, { locale: lang })
        return
      }

      // Static routes (homepage, /pricing, /features, etc.) exist in
      // every locale, so swapping the prefix is safe.
      router.replace(pathname, { locale: lang })
    },
    [pathname, router, translations]
  )

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
