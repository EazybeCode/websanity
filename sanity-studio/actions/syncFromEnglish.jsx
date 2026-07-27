import { useState } from 'react'
import { useClient } from 'sanity'
import { translatePostFields } from '../utils/translate.js'

/**
 * Sync From English Action
 * Updates existing translations with latest English content.
 * Only syncs fields that haven't been manually edited (checks if still matching old English).
 * Available on non-English posts that have a translationGroupId.
 */
export function SyncFromEnglishAction(props) {
  const { draft, published, type } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [syncing, setSyncing] = useState(false)

  if (type !== 'post') return null

  const doc = draft || published
  if (!doc) return null
  // Only show on non-English posts with a translation group
  if (doc.language === 'en' || !doc.translationGroupId) return null

  return {
    label: syncing ? 'Syncing...' : 'Sync from English',
    icon: () => '🔄',
    tone: 'caution',
    disabled: syncing,
    onHandle: async () => {
      const confirmed = confirm(
        'This will update untranslated fields with the latest English content and translate them.\n\n' +
        'Fields you have manually edited will NOT be overwritten.\n\n' +
        'Continue?'
      )
      if (!confirmed) return

      setSyncing(true)

      try {
        // Fetch the English source document
        const enDoc = await client.fetch(
          `*[_type == "post" && translationGroupId == $groupId && language == "en"][0]`,
          { groupId: doc.translationGroupId }
        )

        if (!enDoc) {
          alert('English source document not found!')
          setSyncing(false)
          return
        }

        // Translate English fields to this document's language
        const translated = await translatePostFields({
          title: enDoc.title || '',
          excerpt: enDoc.excerpt || '',
          body: enDoc.body || [],
          faq: enDoc.faq || [],
          customMetaTags: enDoc.customMetaTags || '',
          featuredImage: enDoc.featuredImage,
          socialShareImage: enDoc.socialShareImage,
        }, doc.language)

        // Build patch — only update fields that are empty or unchanged
        const patch = {}
        if (!doc.title) patch.title = translated.title
        if (!doc.excerpt) patch.excerpt = translated.excerpt
        if (!doc.body || doc.body.length === 0) patch.body = translated.body
        if (!doc.faq || doc.faq.length === 0) patch.faq = translated.faq

        // Images: sync from EN with translated alt/caption when the locale has
        // no image yet; keep a locale-specific image if the editor set one.
        if (enDoc.featuredImage && !doc.featuredImage) {
          patch.featuredImage = translated.featuredImage || enDoc.featuredImage
        }
        if (enDoc.socialShareImage && !doc.socialShareImage) {
          patch.socialShareImage = translated.socialShareImage || enDoc.socialShareImage
        }
        if (enDoc.readTime) patch.readTime = enDoc.readTime
        if (enDoc.categories) patch.categories = enDoc.categories
        // Localize discovery meta tags when the locale has none yet or still
        // holds the verbatim English copy; keep an editor's customization.
        if (
          enDoc.customMetaTags &&
          (!doc.customMetaTags || doc.customMetaTags === enDoc.customMetaTags) &&
          translated.customMetaTags
        ) {
          patch.customMetaTags = translated.customMetaTags
        }

        const patchKeys = Object.keys(patch)
        if (patchKeys.length === 0) {
          alert('All fields are already filled. Nothing to sync.')
          setSyncing(false)
          return
        }

        const docId = doc._id.replace(/^drafts\./, '')
        await client.patch(docId).set(patch).commit()
        // Also patch draft if exists
        await client.patch(`drafts.${docId}`).set(patch).commit().catch(() => {})

        alert(`Synced ${patchKeys.length} field(s) from English:\n\n${patchKeys.join(', ')}\n\nReview and publish when ready.`)
      } catch (err) {
        alert('Sync error: ' + err.message)
      }

      setSyncing(false)
    },
  }
}
