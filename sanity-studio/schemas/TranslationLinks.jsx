import { useEffect, useState, useCallback } from 'react'
import { useClient, useFormValue } from 'sanity'
import { Card, Stack, Text, Button, Flex, Badge, Spinner } from '@sanity/ui'

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'pt-BR', label: 'Portuguese', flag: '🇧🇷' },
]

export function TranslationLinks(props) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const documentId = useFormValue(['_id'])
  const translationGroupId = useFormValue(['translationGroupId'])
  const currentLanguage = useFormValue(['language'])
  const title = useFormValue(['title'])
  const [translations, setTranslations] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTranslations = useCallback(async () => {
    if (!translationGroupId) return
    setLoading(true)
    try {
      const results = await client.fetch(
        `*[_type == "post" && translationGroupId == $groupId]{
          _id, title, language, "slug": slug.current
        }`,
        { groupId: translationGroupId }
      )
      setTranslations(results || [])
    } catch (err) {
      console.error('Failed to fetch translations:', err)
    }
    setLoading(false)
  }, [client, translationGroupId])

  useEffect(() => {
    fetchTranslations()
  }, [fetchTranslations])

  const cleanId = (id) => (id || '').replace(/^drafts\./, '')

  const openDocument = (id) => {
    const cleanedId = cleanId(id)
    // Navigate within Sanity Studio
    window.location.href = `/intent/edit/id=${cleanedId};type=post`
  }

  const createTranslation = async (langCode) => {
    const slug = prompt(`Enter URL slug for the ${langCode} translation:`)
    if (!slug) return

    const newId = `post-${slug}-${langCode}`
    try {
      await client.create({
        _id: newId,
        _type: 'post',
        title: `[${langCode.toUpperCase()}] ${title || 'Untitled'}`,
        slug: { current: slug },
        language: langCode,
        translationGroupId: translationGroupId,
        publishedAt: new Date().toISOString(),
        readTime: 5,
      })
      // Open the new document
      window.location.href = `/intent/edit/id=${newId};type=post`
    } catch (err) {
      alert('Failed to create translation: ' + err.message)
    }
  }

  if (!translationGroupId) {
    return (
      <Card padding={3} radius={2} shadow={1} tone="caution">
        <Text size={1}>Set a Translation Group ID to link translations together.</Text>
      </Card>
    )
  }

  const currentCleanId = cleanId(documentId)

  return (
    <Card padding={3} radius={2} shadow={1} tone="primary">
      <Stack space={3}>
        <Text size={1} weight="bold">🌐 Translations ({translations.length})</Text>

        {loading ? (
          <Flex align="center" gap={2}><Spinner size={1} /><Text size={1}>Loading...</Text></Flex>
        ) : (
          <Stack space={2}>
            {LANGUAGES.map(lang => {
              const existing = translations.find(t => t.language === lang.code && cleanId(t._id) !== currentCleanId)
              const isCurrent = lang.code === currentLanguage

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
                  </Flex>
                )
              }

              return (
                <Flex key={lang.code} align="center" gap={2}>
                  <Button
                    text={`${lang.flag} Create ${lang.label} translation`}
                    tone="primary"
                    mode="ghost"
                    fontSize={1}
                    padding={2}
                    onClick={() => createTranslation(lang.code)}
                  />
                </Flex>
              )
            })}
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
