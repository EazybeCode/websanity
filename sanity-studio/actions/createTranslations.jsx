import { useState } from 'react'
import { useClient } from 'sanity'
import { translatePostFields } from '../utils/translate.js'

const TARGET_LANGUAGES = [
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'pt-BR', label: 'Portuguese', flag: '🇧🇷' },
]

export function CreateTranslationsAction(props) {
  const { draft, published, type } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [creating, setCreating] = useState(false)

  if (type !== 'post') return null

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
          `*[_type == "post" && translationGroupId == $groupId]{language}`,
          { groupId: doc.translationGroupId }
        )
        const existingLangs = new Set(existing.map(e => e.language))
        const missing = TARGET_LANGUAGES.filter(l => !existingLangs.has(l.code))

        if (missing.length === 0) {
          alert('All translations already exist!')
          setCreating(false)
          return
        }

        const slugBase = doc.slug?.current || 'untitled'
        const created = []

        for (const lang of missing) {
          const langSlug = `${slugBase}-${lang.code}`
          const newId = `drafts.post-${langSlug}-${lang.code}`

          try {
            const translated = await translatePostFields({
              title: doc.title || 'Untitled',
              excerpt: doc.excerpt || '',
              body: doc.body || [],
              faq: doc.faq || [],
            }, lang.code)

            await client.createIfNotExists({
              _id: newId,
              _type: 'post',
              language: lang.code,
              translationGroupId: doc.translationGroupId,
              title: translated.title,
              slug: { current: langSlug, _type: 'slug' },
              excerpt: translated.excerpt,
              body: translated.body,
              featuredImage: doc.featuredImage || undefined,
              category: doc.category || undefined,
              publishedAt: new Date().toISOString(),
              readTime: doc.readTime || 5,
              author: doc.author || undefined,
              faq: translated.faq,
              breadcrumbs: doc.breadcrumbs || [],
            })
            created.push(`${lang.flag} ${lang.label} — translated`)
          } catch (err) {
            created.push(`${lang.flag} ${lang.label} (FAILED: ${err.message})`)
          }
        }

        alert(`Created ${created.length} draft(s):\n\n${created.join('\n')}\n\nContent auto-translated. Review before publishing.`)
      } catch (err) {
        alert('Error: ' + err.message)
      }

      setCreating(false)
    },
  }
}
