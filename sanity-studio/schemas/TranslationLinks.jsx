import { useEffect, useState, useCallback } from 'react'
import { useClient, useFormValue } from 'sanity'
import { Card, Stack, Text, Button, Flex, Badge, Spinner, Box } from '@sanity/ui'

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'pt-BR', label: 'Portuguese', flag: '🇧🇷' },
]

// Key translatable fields to track
const TRANSLATABLE_FIELDS = [
  { key: 'title', label: 'Title' },
  { key: 'excerpt', label: 'Excerpt' },
  { key: 'body', label: 'Body Content', isArray: true },
  { key: 'metaTitle', label: 'Meta Title' },
  { key: 'metaDescription', label: 'Meta Description' },
]

export function TranslationLinks(props) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const documentId = useFormValue(['_id'])
  const translationGroupId = useFormValue(['translationGroupId'])
  const currentLanguage = useFormValue(['language'])
  const title = useFormValue(['title'])
  const [translations, setTranslations] = useState([])
  const [translationDetails, setTranslationDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const fetchTranslations = useCallback(async () => {
    if (!translationGroupId) return
    setLoading(true)
    try {
      const results = await client.fetch(
        `*[_type == "post" && translationGroupId == $groupId]{
          _id, title, language, "slug": slug.current,
          excerpt, metaTitle, metaDescription,
          "hasBody": count(body) > 0,
          "hasFeaturedImage": defined(featuredImage),
          "hasFaq": count(faq) > 0,
          "bodyLength": count(body)
        }`,
        { groupId: translationGroupId }
      )
      setTranslations(results || [])

      // Build details map
      const details = {}
      for (const t of (results || [])) {
        details[t.language] = {
          title: !!t.title,
          excerpt: !!t.excerpt,
          body: t.hasBody,
          metaTitle: !!t.metaTitle,
          metaDescription: !!t.metaDescription,
          bodyLength: t.bodyLength || 0,
        }
      }
      setTranslationDetails(details)
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
      window.location.href = `/intent/edit/id=${newId};type=post`
    } catch (err) {
      alert('Failed to create translation: ' + err.message)
    }
  }

  if (!translationGroupId) {
    return (
      <Card padding={3} radius={2} shadow={1} tone="caution">
        <Stack space={2}>
          <Text size={1} weight="bold">No Translation Group ID</Text>
          <Text size={1}>Set a Translation Group ID above to link translations together. Use the same ID across all language versions (e.g., "post-whatsapp-crm-2024").</Text>
        </Stack>
      </Card>
    )
  }

  const currentCleanId = cleanId(documentId)
  const translatedCount = translations.length
  const totalLangs = LANGUAGES.length
  const completionPct = Math.round((translatedCount / totalLangs) * 100)

  return (
    <Card padding={3} radius={2} shadow={1} tone="primary">
      <Stack space={3}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <Text size={1} weight="bold">Translations</Text>
            <Badge tone={completionPct === 100 ? 'positive' : 'caution'} fontSize={0}>
              {translatedCount}/{totalLangs} languages
            </Badge>
          </Flex>
          {translatedCount > 1 && (
            <Button
              text={showDetails ? 'Hide details' : 'Field status'}
              mode="ghost"
              fontSize={0}
              padding={1}
              onClick={() => setShowDetails(!showDetails)}
            />
          )}
        </Flex>

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
                  <Stack key={lang.code} space={1}>
                    <Flex align="center" gap={2}>
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
                    {showDetails && details && (
                      <Box paddingLeft={4} paddingBottom={1}>
                        <Flex gap={1} wrap="wrap">
                          {TRANSLATABLE_FIELDS.map(f => (
                            <Badge key={f.key} tone={details[f.key] ? 'positive' : 'critical'} fontSize={0} mode="outline">
                              {details[f.key] ? '✓' : '✗'} {f.label}
                            </Badge>
                          ))}
                        </Flex>
                      </Box>
                    )}
                  </Stack>
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

        {showDetails && translatedCount > 1 && (
          <Card padding={2} radius={2} tone="transparent" style={{ background: 'var(--card-bg2-color)' }}>
            <Text size={0} muted>
              Group ID: <strong>{translationGroupId}</strong> — Click a language to edit. Badges show field completion per translation.
            </Text>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
