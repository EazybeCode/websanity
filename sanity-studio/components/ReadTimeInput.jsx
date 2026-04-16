import { useEffect, useMemo } from 'react'
import { useFormValue, set, unset } from 'sanity'
import { Stack, TextInput, Text } from '@sanity/ui'

const WORDS_PER_MINUTE = 220

function wordsIn(str) {
  if (typeof str !== 'string' || !str.trim()) return 0
  return str.trim().split(/\s+/).filter(Boolean).length
}

function countWords(body) {
  if (!Array.isArray(body)) return 0
  let total = 0
  for (const block of body) {
    if (!block) continue
    switch (block._type) {
      case 'block':
        if (Array.isArray(block.children)) {
          for (const child of block.children) total += wordsIn(child?.text)
        }
        break
      case 'table':
        if (Array.isArray(block.rows)) {
          for (const row of block.rows) {
            if (Array.isArray(row?.cells)) {
              for (const cell of row.cells) total += wordsIn(cell)
            }
          }
        }
        break
      case 'accordion':
        if (Array.isArray(block.items)) {
          for (const item of block.items) {
            total += wordsIn(item?.title)
            total += wordsIn(item?.content)
          }
        }
        break
      case 'callout':
        total += wordsIn(block.title)
        total += wordsIn(block.text)
        break
      case 'quote':
        total += wordsIn(block.text)
        total += wordsIn(block.author)
        break
      case 'codeBlock':
        total += wordsIn(block.code)
        break
      case 'comparisonTable':
        if (Array.isArray(block.rows)) {
          for (const row of block.rows) {
            total += wordsIn(row?.feature)
            if (Array.isArray(row?.values)) {
              for (const v of row.values) total += wordsIn(v?.text)
            }
          }
        }
        break
      default:
        // image / videoEmbed / buttonCTA / fileDownload / imageGallery → skip
        break
    }
  }
  return total
}

function computeReadTime(words) {
  if (!words) return 1
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function ReadTimeInput(props) {
  const { onChange, value, elementProps } = props
  const body = useFormValue(['body'])

  const { words, computed } = useMemo(() => {
    const w = countWords(body)
    return { words: w, computed: computeReadTime(w) }
  }, [body])

  useEffect(() => {
    if (computed !== value) {
      onChange(computed ? set(computed) : unset())
    }
  }, [computed, value, onChange])

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        type="number"
        min={1}
        value={value ?? ''}
        onChange={(event) => {
          const raw = event.currentTarget.value
          const n = Number(raw)
          onChange(raw && !Number.isNaN(n) ? set(n) : unset())
        }}
      />
      <Text size={1} muted>
        Auto-calculated from body content: {words.toLocaleString()} words ≈ {computed} min ({WORDS_PER_MINUTE} wpm). You can override manually.
      </Text>
    </Stack>
  )
}
