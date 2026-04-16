import { useState } from 'react'
import { useClient } from 'sanity'
import { translatePostFields } from '../utils/translate.js'

const TARGET_LANGUAGES = [
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'pt-BR', label: 'Portuguese', flag: '🇧🇷' },
]

const SUPPORTED_TYPES = new Set(['post', 'comparisonPost'])

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
          const langSlug = `${slugBase}-${lang.code}`
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
                faqTitle: doc.faqTitle || '',
                metaTitle: doc.metaTitle || '',
                metaDescription: doc.metaDescription || '',
                metaKeywords: doc.metaKeywords || '',
                ogTitle: doc.ogTitle || '',
                ogDescription: doc.ogDescription || '',
                twitterTitle: doc.twitterTitle || '',
                twitterDescription: doc.twitterDescription || '',
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
              faqTitle: translated.faqTitle,
              metaTitle: translated.metaTitle,
              metaDescription: translated.metaDescription,
              metaKeywords: translated.metaKeywords,
              ogTitle: translated.ogTitle,
              ogDescription: translated.ogDescription,
              twitterTitle: translated.twitterTitle,
              twitterDescription: translated.twitterDescription,

              // Structure / assets — copied verbatim
              featuredImage: doc.featuredImage,
              socialShareImage: doc.socialShareImage,
              ogImage: doc.ogImage,
              category: doc.category,
              categories: doc.categories,
              author: doc.author,
              authorRef: doc.authorRef,
              readTime: doc.readTime,
              tableOfContents: doc.tableOfContents,
              breadcrumbs: doc.breadcrumbs || [],
              jsonLdSchemas: doc.jsonLdSchemas,
              customMetaTags: doc.customMetaTags,
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
