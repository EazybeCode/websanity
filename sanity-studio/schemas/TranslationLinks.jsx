import { useEffect, useState, useCallback } from 'react'
import { useClient, useFormValue } from 'sanity'
import { Card, Stack, Text, Button, Flex, Badge, Spinner, Box } from '@sanity/ui'
import { translatePostFields } from '../utils/translate.js'

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'pt-BR', label: 'Portuguese', flag: '🇧🇷' },
]

const TRANSLATABLE_FIELDS = [
  { key: 'title', label: 'Title' },
  { key: 'excerpt', label: 'Excerpt' },
  { key: 'body', label: 'Body' },
  { key: 'metaTitle', label: 'Meta Title' },
  { key: 'metaDescription', label: 'Meta Desc' },
]

export function TranslationLinks(props) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const documentId = useFormValue(['_id'])
  const docType = useFormValue(['_type']) || 'post'
  const translationGroupId = useFormValue(['translationGroupId'])
  const currentLanguage = useFormValue(['language'])
  const title = useFormValue(['title'])
  const slug = useFormValue(['slug'])
  const excerpt = useFormValue(['excerpt'])
  const body = useFormValue(['body'])
  const featuredImage = useFormValue(['featuredImage'])
  const socialShareImage = useFormValue(['socialShareImage'])
  const category = useFormValue(['category'])
  const readTime = useFormValue(['readTime'])
  const author = useFormValue(['author'])
  const authorRef = useFormValue(['authorRef'])
  const faq = useFormValue(['faq'])
  const faqTitle = useFormValue(['faqTitle'])
  const tldr = useFormValue(['tldr'])
  const quickAnswer = useFormValue(['quickAnswer'])
  const breadcrumbs = useFormValue(['breadcrumbs'])
  const metaTitle = useFormValue(['metaTitle'])
  const metaDescription = useFormValue(['metaDescription'])
  const metaKeywords = useFormValue(['metaKeywords'])
  const ogTitle = useFormValue(['ogTitle'])
  const ogDescription = useFormValue(['ogDescription'])
  const twitterTitle = useFormValue(['twitterTitle'])
  const twitterDescription = useFormValue(['twitterDescription'])

  const [translations, setTranslations] = useState([])
  const [translationDetails, setTranslationDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)

  // The effective group ID: use existing or derive from slug
  const slugValue = slug?.current || ''
  const effectiveGroupId = translationGroupId || slugValue

  const fetchTranslations = useCallback(async () => {
    if (!effectiveGroupId) return
    setLoading(true)
    try {
      const results = await client.fetch(
        `*[_type == $docType && translationGroupId == $groupId]{
          _id, title, language, "slug": slug.current,
          excerpt, metaTitle, metaDescription,
          "hasBody": count(body) > 0
        }`,
        { docType, groupId: effectiveGroupId }
      )
      setTranslations(results || [])

      const details = {}
      for (const t of (results || [])) {
        details[t.language] = {
          title: !!t.title,
          excerpt: !!t.excerpt,
          body: t.hasBody,
          metaTitle: !!t.metaTitle,
          metaDescription: !!t.metaDescription,
        }
      }
      setTranslationDetails(details)
    } catch (err) {
      console.error('Failed to fetch translations:', err)
    }
    setLoading(false)
  }, [client, docType, effectiveGroupId])

  useEffect(() => {
    fetchTranslations()
  }, [fetchTranslations])

  const cleanId = (id) => (id || '').replace(/^drafts\./, '')

  const openDocument = (id) => {
    window.location.href = `/intent/edit/id=${cleanId(id)};type=${docType}`
  }

  // Auto-set translationGroupId on the current doc if it's missing, then create translations
  const ensureGroupIdAndCreate = async () => {
    if (!slugValue) {
      alert('Set a URL Slug first before creating translations.')
      return
    }

    const groupId = effectiveGroupId

    // If the field is empty, patch it on the current document
    if (!translationGroupId) {
      const docId = (documentId || '').replace(/^drafts\./, '')
      try {
        // Patch both draft and published
        await client.patch(`drafts.${docId}`).set({ translationGroupId: groupId }).commit()
        await client.patch(docId).set({ translationGroupId: groupId }).commit().catch(() => {})
      } catch (err) {
        console.error('Failed to set translationGroupId:', err)
      }
    }

    await createAllTranslations(groupId)
  }

  const createAllTranslations = async (groupId) => {
    setCreating(true)

    try {
      // Check existing
      const existing = await client.fetch(
        `*[_type == $docType && translationGroupId == $groupId]{language}`,
        { docType, groupId }
      )
      const existingLangs = new Set(existing.map(e => e.language))
      const missing = LANGUAGES.filter(l => !existingLangs.has(l.code) && l.code !== currentLanguage)

      if (missing.length === 0) {
        alert('All translations already exist!')
        setCreating(false)
        fetchTranslations()
        return
      }

      const created = []
      for (const lang of missing) {
        const langSlug = `${slugValue}-${lang.code}`
        const newId = `drafts.${docType}-${langSlug}-${lang.code}`

        try {
          // Translate content to target language
          const translated = await translatePostFields({
            title: title || 'Untitled',
            excerpt: excerpt || '',
            body: body || [],
            faq: faq || [],
            quickAnswer: quickAnswer || '',
            tldr: tldr || [],
            faqTitle: faqTitle || '',
            metaTitle: metaTitle || '',
            metaDescription: metaDescription || '',
            metaKeywords: metaKeywords || '',
            ogTitle: ogTitle || '',
            ogDescription: ogDescription || '',
            twitterTitle: twitterTitle || '',
            twitterDescription: twitterDescription || '',
            featuredImage: featuredImage || undefined,
            socialShareImage: socialShareImage || undefined,
          }, lang.code)

          const newDoc = {
            _id: newId,
            _type: docType,
            language: lang.code,
            translationGroupId: groupId,
            title: translated.title,
            slug: { current: langSlug, _type: 'slug' },
            excerpt: translated.excerpt,
            body: translated.body,
            quickAnswer: translated.quickAnswer,
            tldr: translated.tldr,
            faqTitle: translated.faqTitle,
            faq: translated.faq,
            metaTitle: translated.metaTitle,
            metaDescription: translated.metaDescription,
            metaKeywords: translated.metaKeywords,
            ogTitle: translated.ogTitle,
            ogDescription: translated.ogDescription,
            twitterTitle: translated.twitterTitle,
            twitterDescription: translated.twitterDescription,
            featuredImage: translated.featuredImage || featuredImage || undefined,
            socialShareImage: translated.socialShareImage || socialShareImage || undefined,
            category: category || undefined,
            publishedAt: new Date().toISOString(),
            readTime: readTime || 5,
            author: author || undefined,
            authorRef: authorRef || undefined,
            breadcrumbs: breadcrumbs || [],
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

      alert(`Created ${created.length} draft(s):\n\n${created.join('\n')}\n\nAll saved as DRAFTS (not published). Content auto-translated — review and edit before publishing.`)
    } catch (err) {
      alert('Error: ' + err.message)
    }

    setCreating(false)
    fetchTranslations()
  }

  // No slug yet
  if (!slugValue) {
    return (
      <Card padding={3} radius={2} shadow={1} tone="caution">
        <Text size={1}>Set a Title and URL Slug first, then translations can be created here.</Text>
      </Card>
    )
  }

  const currentCleanId = cleanId(documentId)
  const existingLangs = new Set(translations.map(t => t.language))
  const missingLangs = LANGUAGES.filter(l => !existingLangs.has(l.code) && l.code !== currentLanguage)

  return (
    <Card padding={3} radius={2} shadow={1} tone="primary">
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <Text size={1} weight="bold">Translations</Text>
          <Badge tone={missingLangs.length === 0 ? 'positive' : 'caution'} fontSize={0}>
            {translations.length}/{LANGUAGES.length}
          </Badge>
        </Flex>

        {/* BIG CREATE ALL BUTTON */}
        {missingLangs.length > 0 && (
          <Button
            text={creating
              ? 'Creating...'
              : `Create ${missingLangs.map(l => l.flag).join(' ')} Translations (${missingLangs.length})`
            }
            tone="positive"
            padding={3}
            fontSize={1}
            disabled={creating}
            onClick={ensureGroupIdAndCreate}
            style={{ width: '100%' }}
          />
        )}

        {loading ? (
          <Flex align="center" gap={2}><Spinner size={1} /><Text size={1}>Loading...</Text></Flex>
        ) : (
          <Stack space={2}>
            {LANGUAGES.map(lang => {
              const existing = translations.find(t => t.language === lang.code)
              const isCurrent = existing && cleanId(existing._id) === currentCleanId
              const details = translationDetails[lang.code]

              if (isCurrent) {
                return (
                  <Flex key={lang.code} align="center" gap={2} padding={2} style={{ background: 'var(--card-badge-positive-bg-color)', borderRadius: 4 }}>
                    <Text size={1}>{lang.flag}</Text>
                    <Text size={1} weight="bold">{lang.label}</Text>
                    <Badge tone="positive" fontSize={0}>Current</Badge>
                  </Flex>
                )
              }

              if (existing) {
                const filledFields = details ? TRANSLATABLE_FIELDS.filter(f => details[f.key]).length : 0
                const fieldPct = Math.round((filledFields / TRANSLATABLE_FIELDS.length) * 100)
                return (
                  <Flex key={lang.code} align="center" gap={2}>
                    <Button
                      text={`${lang.flag} ${lang.label}: ${existing.title}`}
                      mode="ghost"
                      fontSize={1}
                      padding={2}
                      style={{ width: '100%', textAlign: 'left' }}
                      onClick={() => openDocument(existing._id)}
                    />
                    <Badge tone={fieldPct === 100 ? 'positive' : fieldPct > 50 ? 'caution' : 'critical'} fontSize={0}>
                      {fieldPct}%
                    </Badge>
                  </Flex>
                )
              }

              return (
                <Flex key={lang.code} align="center" gap={2} padding={2} style={{ opacity: 0.5 }}>
                  <Text size={1}>{lang.flag}</Text>
                  <Text size={1}>{lang.label}</Text>
                  <Badge tone="critical" fontSize={0}>Missing</Badge>
                </Flex>
              )
            })}
          </Stack>
        )}

        <Text size={0} muted>
          Group: <strong>{effectiveGroupId}</strong>
        </Text>
      </Stack>
    </Card>
  )
}
