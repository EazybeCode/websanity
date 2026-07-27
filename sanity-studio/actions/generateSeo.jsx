import { useState } from 'react'
import { useClient } from 'sanity'

/**
 * 🔍 Generate SEO & Discovery
 * Calls the Next.js API route (server-side Claude + web search — the key never
 * touches the browser) and fills the SEO & Discovery fields IN THE DOCUMENT'S
 * OWN LANGUAGE.
 *
 * - Standard fields (metaTitle/metaDescription/metaKeywords/ogTitle/ogDescription/
 *   twitterTitle/twitterDescription) → the existing flat fields.
 * - The AI-discovery extras (searchTitle, answerType, conversationalQuery, …) →
 *   the existing "🏷️ Custom Meta Tags (HTML)" field as <meta> lines, which the
 *   frontend already renders. No schema/frontend changes needed.
 * - Manual wins: only EMPTY fields are filled; anything you typed is kept.
 */
const SUPPORTED = new Set(['post', 'comparisonPost'])

// Studio language code → prompt locale ('en' | 'es' | 'br' | 'tr').
const LOCALE_MAP = { en: 'en', es: 'es', tr: 'tr', 'pt-BR': 'br' }

// Where the server-side route lives. Prod goes through the /track rewrite (the
// nginx /api/* upstream 502s). Override locally via SANITY_STUDIO_SEO_API_URL.
const SEO_API_URL =
  (typeof process !== 'undefined' && process.env && process.env.SANITY_STUDIO_SEO_API_URL) ||
  'https://eazybe.com/track/generate-seo'

// Extra fields → <meta> tag name/property (rendered via customMetaTags).
const META_MAP = [
  ['searchTitle', 'search-title'],
  ['focusArea', 'focus-area'],
  ['primaryTaxonomyEn', 'primary-taxonomy'],
  ['siteSection', 'site-section'],
  ['primaryTopic', 'primary-topic'],
  ['pageType', 'page-type'],
  ['languageCode', 'content-language'],
  ['countryCode', 'country'],
  ['answerType', 'answer-type'],
  ['targetAudience', 'target-audience'],
  ['contentIntent', 'content-intent'],
  ['conversationalQuery', 'conversational-query'],
  ['aiReadability', 'ai-readability'],
  ['contextWindow', 'context-window'],
  ['userProblem', 'user-problem'],
  ['solutionSummary', 'solution-summary'],
  ['primaryBenefit', 'primary-benefit'],
  ['useCase', 'use-case'],
  ['implementationDifficulty', 'implementation-difficulty'],
  ['timeToValue', 'time-to-value'],
  ['ogImageAlt', 'og:image:alt'],
  ['ogLocale', 'og:locale'],
  ['twitterImageAlt', 'twitter:image:alt'],
  ['twitterData1', 'twitter:data1'],
  ['twitterData2', 'twitter:data2'],
]

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function bodyExcerpt(body) {
  if (!Array.isArray(body)) return ''
  const lines = []
  for (const b of body) {
    if (b?._type === 'block' && Array.isArray(b.children)) {
      const t = b.children
        .filter((c) => c?._type === 'span' && c.text)
        .map((c) => c.text)
        .join('')
      if (t.trim()) lines.push(t)
    }
    if (lines.join(' ').length > 2200) break
  }
  return lines.join('\n').slice(0, 2000)
}

export function GenerateSeoAction(props) {
  const { draft, published, type } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [running, setRunning] = useState(false)

  if (!SUPPORTED.has(type)) return null
  const doc = draft || published
  if (!doc) return null

  return {
    label: running ? 'Generating SEO…' : '🔍 Generate SEO & Discovery',
    icon: () => '🔍',
    tone: 'primary',
    disabled: running || !doc.title,
    onHandle: async () => {
      if (!doc.title) {
        alert('Add a title first — SEO is generated from the title + content.')
        return
      }
      setRunning(true)
      try {
        const locale = LOCALE_MAP[doc.language] || 'en'
        const section = type === 'comparisonPost' ? 'comparison' : 'blog'

        const res = await fetch(SEO_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: doc.title,
            slug: doc.slug?.current || '',
            locale,
            altText: doc.featuredImage?.alt || '',
            bodyExcerpt: bodyExcerpt(doc.body),
            section,
          }),
        })
        const seo = await res.json()
        if (!res.ok || seo.error) {
          alert('SEO generation failed: ' + (seo.error || res.status))
          setRunning(false)
          return
        }

        // Manual wins — only fill empty fields.
        const STD = {
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          ogTitle: seo.ogTitle,
          ogDescription: seo.ogDescription,
          twitterTitle: seo.twitterTitle,
          twitterDescription: seo.twitterDescription,
        }
        const patch = {}
        const kept = []
        for (const [k, v] of Object.entries(STD)) {
          if (doc[k] && String(doc[k]).trim()) kept.push(k)
          else if (v) patch[k] = v
        }
        if (!doc.metaKeywords || !String(doc.metaKeywords).trim()) {
          if (Array.isArray(seo.keywords) && seo.keywords.length) patch.metaKeywords = seo.keywords.join(', ')
        } else {
          kept.push('metaKeywords')
        }
        if (!doc.customMetaTags || !String(doc.customMetaTags).trim()) {
          const lines = META_MAP.filter(([k]) => seo[k]).map(([k, name]) => {
            const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name'
            return `<meta ${attr}="${name}" content="${esc(seo[k])}">`
          })
          if (lines.length) patch.customMetaTags = lines.join('\n')
        } else {
          kept.push('customMetaTags')
        }

        if (Object.keys(patch).length === 0) {
          alert(
            'All SEO & Discovery fields are already filled — your manual values were kept. ' +
              'Clear a field to auto-generate just that one.'
          )
          setRunning(false)
          return
        }

        await client.patch(doc._id).set(patch).commit()
        alert(
          `Auto-filled empty SEO fields (${locale}): ${Object.keys(patch).join(', ')}\n` +
            (kept.length ? `Kept your manual values: ${kept.join(', ')}\n` : '') +
            (patch.metaTitle ? `\nMeta Title (${patch.metaTitle.length}/60): ${patch.metaTitle}` : '') +
            (patch.metaDescription
              ? `\nMeta Description (${patch.metaDescription.length}/160): ${patch.metaDescription}`
              : '') +
            '\n\nReview and publish.'
        )
      } catch (err) {
        alert('SEO generation failed: ' + err.message)
      }
      setRunning(false)
    },
  }
}
