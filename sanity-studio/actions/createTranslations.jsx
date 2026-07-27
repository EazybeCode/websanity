import { useState } from 'react'
import { useClient } from 'sanity'
import { translatePostFields, translateSlug } from '../utils/translate.js'

const TARGET_LANGUAGES = [
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'pt-BR', label: 'Portuguese', flag: '🇧🇷' },
]

const SUPPORTED_TYPES = new Set(['post', 'comparisonPost'])

// Translation expands text and overshoots SEO limits (titles 60, descriptions
// 160). Trim at a word boundary so the meta stays a complete phrase.
function capAtWord(str, max) {
  if (!str) return str
  const s = String(str).trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const sp = cut.lastIndexOf(' ')
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).trim()
}

export function CreateTranslationsAction(props) {
  const { draft, published, type } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [creating, setCreating] = useState(false)

  if (!SUPPORTED_TYPES.has(type)) return null

  const doc = draft || published
  if (!doc) return null
  if (doc.language !== 'en' || !doc.translationGroupId) return null

  return {
    label: creating ? 'Translating...' : 'Create All Translations',
    icon: () => '🌐',
    tone: 'primary',
    disabled: creating,
    onHandle: async () => {
      setCreating(true)

      try {
        const existing = await client.fetch(
          `*[_type == $type && translationGroupId == $groupId]{language}`,
          { type, groupId: doc.translationGroupId }
        )
        const existingLangs = new Set(existing.map((e) => e.language))
        const missing = TARGET_LANGUAGES.filter((l) => !existingLangs.has(l.code))

        if (missing.length === 0) {
          alert('All translations already exist!')
          setCreating(false)
          return
        }

        const slugBase = doc.slug?.current || 'untitled'
        const created = []

        for (const lang of missing) {
          // Localized, ASCII slug from the English SLUG (the keyword phrase —
          // tighter than the title); fall back to the English slug + locale
          // suffix if the model call fails.
          let langSlug = ''
          try {
            langSlug = await translateSlug(slugBase || doc.title, lang.code)
          } catch (e) {
            langSlug = ''
          }
          if (!langSlug) langSlug = `${slugBase}-${lang.code}`
          const newId = `drafts.${type}-${langSlug}-${lang.code}`

          try {
            const translated = await translatePostFields(
              {
                title: doc.title || 'Untitled',
                excerpt: doc.excerpt || '',
                body: doc.body || [],
                faq: doc.faq || [],
                quickAnswer: doc.quickAnswer || '',
                tldr: doc.tldr || [],
                tldrHeading: doc.tldrHeading || '',
                faqTitle: doc.faqTitle || '',
                metaTitle: doc.metaTitle || '',
                metaDescription: doc.metaDescription || '',
                metaKeywords: doc.metaKeywords || '',
                ogTitle: doc.ogTitle || '',
                ogDescription: doc.ogDescription || '',
                twitterTitle: doc.twitterTitle || '',
                twitterDescription: doc.twitterDescription || '',
                customMetaTags: doc.customMetaTags || '',
                featuredImage: doc.featuredImage,
                socialShareImage: doc.socialShareImage,
              },
              lang.code
            )

            // Build the translated document — every schema field that
            // exists on the source is forwarded so locales reach parity.
            const newDoc = {
              _id: newId,
              _type: type,
              language: lang.code,
              translationGroupId: doc.translationGroupId,

              // Translated
              title: translated.title,
              slug: { current: langSlug, _type: 'slug' },
              excerpt: translated.excerpt,
              body: translated.body,
              faq: translated.faq,
              quickAnswer: translated.quickAnswer,
              tldr: translated.tldr,
              tldrHeading: translated.tldrHeading,
              faqTitle: translated.faqTitle,
              // SEO limits enforced at a word boundary (titles 60, desc 160).
              metaTitle: capAtWord(translated.metaTitle, 60),
              metaDescription: capAtWord(translated.metaDescription, 160),
              metaKeywords: translated.metaKeywords,
              ogTitle: capAtWord(translated.ogTitle, 60),
              ogDescription: capAtWord(translated.ogDescription, 160),
              twitterTitle: capAtWord(translated.twitterTitle, 60),
              twitterDescription: capAtWord(translated.twitterDescription, 160),

              // Images — alt/caption translated, asset/hotspot preserved
              featuredImage: translated.featuredImage || doc.featuredImage,
              socialShareImage: translated.socialShareImage || doc.socialShareImage,
              ogImage: doc.ogImage,
              category: doc.category,
              categories: doc.categories,
              author: doc.author,
              authorRef: doc.authorRef,
              readTime: doc.readTime,
              tableOfContents: doc.tableOfContents,
              breadcrumbs: doc.breadcrumbs || [],
              jsonLdSchemas: doc.jsonLdSchemas,
              // Discovery meta tags localized per locale (languageCode set,
              // primaryTaxonomyEn/robots kept fixed); falls back to English.
              customMetaTags: translated.customMetaTags || doc.customMetaTags,
              noindex: doc.noindex,
              nofollow: doc.nofollow,

              // Per-translation metadata
              publishedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              viewCount: 0,
            }

            // Strip undefined so Sanity doesn't store empty keys
            Object.keys(newDoc).forEach((k) => {
              if (newDoc[k] === undefined) delete newDoc[k]
            })

            await client.createIfNotExists(newDoc)
            created.push(`${lang.flag} ${lang.label} — translated`)
          } catch (err) {
            created.push(`${lang.flag} ${lang.label} (FAILED: ${err.message})`)
          }
        }

        alert(
          `Created ${created.length} draft(s):\n\n${created.join('\n')}\n\nContent auto-translated. Review before publishing.`
        )
      } catch (err) {
        alert('Error: ' + err.message)
      }

      setCreating(false)
    },
  }
}
