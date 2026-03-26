import type { Metadata } from 'next'

const BASE_URL = 'https://eazybe.com'

interface SEOConfig {
  locale: string
  path: string
}

/**
 * Generate canonical URL for a page
 * @param locale - Current locale (en, br, es, tr)
 * @param path - Page path (e.g., '/features', '/pricing')
 * @returns Canonical URL
 */
export function getCanonicalUrl(locale: string, path: string): string {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return `${BASE_URL}${prefix}${path}`
}

/**
 * Generate hreflang object for Metadata alternates
 * @param locale - Current locale (en, br, es, tr)
 * @param path - Page path (e.g., '/features', '/pricing')
 * @returns Object with all language variants
 */
export function getHrefLangs(locale: string, path: string): Record<string, string> {
  const locales = [
    { code: 'en', prefix: '' },
    { code: 'pt-BR', prefix: '/br' },
    { code: 'es', prefix: '/es' },
    { code: 'tr', prefix: '/tr' },
  ]

  const hreflangs: Record<string, string> = {}

  locales.forEach((loc) => {
    hreflangs[loc.code] = `${BASE_URL}${loc.prefix}${path}`
  })

  hreflangs['x-default'] = `${BASE_URL}${path}`

  return hreflangs
}

/**
 * Generate complete alternates object with canonical and hreflangs
 * @param locale - Current locale (en, br, es, tr)
 * @param path - Page path (e.g., '/features', '/pricing')
 * @returns Alternates object for Metadata
 */
export function getAlternates(locale: string, path: string): Metadata['alternates'] {
  return {
    canonical: getCanonicalUrl(locale, path),
    languages: getHrefLangs(locale, path),
  }
}
