/**
 * Debug utility to validate blog post translations and hreflang setup
 * Run this server-side to check if translationGroupId is correctly configured
 */

import { getBlogPost, getBlogPostTranslations } from './sanity-queries'

export interface TranslationDebugInfo {
  currentPost: {
    slug: string
    locale: string
    translationGroupId: string | null
    hasTranslations: boolean
  }
  translations: Array<{
    slug: string
    language: string
    url: string
  }>
  issues: string[]
  recommendations: string[]
}

/**
 * Debug blog post translation setup
 * Call this from generateMetadata or page component to verify configuration
 */
export async function debugBlogTranslations(
  slug: string,
  locale: string
): Promise<TranslationDebugInfo> {
  const SITE_URL = 'https://eazybe.com'
  const issues: string[] = []
  const recommendations: string[] = []

  const post = await getBlogPost(slug, locale)

  if (!post) {
    return {
      currentPost: {
        slug,
        locale,
        translationGroupId: null,
        hasTranslations: false,
      },
      translations: [],
      issues: ['Post not found'],
      recommendations: ['Check if the post exists in Sanity CMS'],
    }
  }

  // Check if translationGroupId exists
  if (!post.translationGroupId) {
    issues.push('No translationGroupId set on this post')
    recommendations.push('Set translationGroupId in Sanity CMS for this post and all its translations')
  }

  // Get translations
  const translations = post.translationGroupId
    ? await getBlogPostTranslations(post.translationGroupId)
    : []

  // Check if we have translations
  if (!translations || translations.length === 0) {
    issues.push('No translations found (even with translationGroupId)')
    recommendations.push(
      'Ensure all translated posts have the same translationGroupId value in Sanity CMS'
    )
  }

  // Check for expected languages
  const expectedLanguages = ['en', 'es', 'pt-BR', 'tr']
  const foundLanguages = translations.map((t: { language: string }) => t.language)
  const missingLanguages = expectedLanguages.filter((lang) => !foundLanguages.includes(lang))

  if (missingLanguages.length > 0) {
    recommendations.push(
      `Missing translations for languages: ${missingLanguages.join(', ')} (if applicable)`
    )
  }

  // Build URLs for verification
  const localePrefixes: Record<string, string> = {
    en: '',
    es: '/es',
    br: '/br',
    tr: '/tr',
  }

  const translationUrls = translations.map((t: { language: string; slug: string }) => {
    const prefix = localePrefixes[t.language] || `/${t.language}`
    return {
      slug: t.slug,
      language: t.language,
      url: `${SITE_URL}${prefix}/blog/${t.slug}`,
    }
  })

  return {
    currentPost: {
      slug: post.slug,
      locale,
      translationGroupId: post.translationGroupId || null,
      hasTranslations: translations.length > 0,
    },
    translations: translationUrls,
    issues,
    recommendations,
  }
}

/**
 * Print debug info to console (for development)
 */
export async function logTranslationDebug(slug: string, locale: string) {
  const debug = await debugBlogTranslations(slug, locale)

  console.log('=== Blog Translation Debug Info ===')
  console.log('Current Post:', debug.currentPost)

  if (debug.translations.length > 0) {
    console.log('\nTranslations:')
    debug.translations.forEach((t) => {
      console.log(`  [${t.language}] ${t.url}`)
    })
  }

  if (debug.issues.length > 0) {
    console.log('\n⚠️ Issues:')
    debug.issues.forEach((issue) => console.log(`  - ${issue}`))
  }

  if (debug.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    debug.recommendations.forEach((rec) => console.log(`  - ${rec}`))
  }

  console.log('================================\n')

  return debug
}
