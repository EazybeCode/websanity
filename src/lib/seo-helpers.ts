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

/**
 * Build a Schema.org FAQPage JSON-LD blob from a list of FAQ items. Use this
 * to attach structured data to any page that renders an FAQ section so Google
 * can surface the questions as rich results in SERPs and AI Overviews.
 *
 * Returns `null` when the items array is missing/empty, which is the
 * convention the rendering code checks before emitting a `<script>` tag.
 *
 * Each item should have `question` + `answer`. Items missing either are
 * silently skipped so a half-populated locale doc doesn't break the schema.
 */
export function buildFaqPageSchema(
  items: Array<{ question?: string; answer?: string }> | null | undefined,
): object | null {
  if (!items || items.length === 0) return null

  const mainEntity = items
    .filter((item) => item?.question && item?.answer)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))

  if (mainEntity.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}
