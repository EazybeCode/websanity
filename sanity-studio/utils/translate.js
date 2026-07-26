/**
 * Claude-powered translation for Sanity Studio.
 *
 * Replaces the old free Google Translate endpoint with Claude for accurate,
 * natural es / pt-BR / tr translations. Every translatable field of a post /
 * comparisonPost still funnels through `translatePostFields`, so the two Studio
 * actions (createTranslations, syncFromEnglish) and TranslationLinks are
 * unchanged.
 *
 * How it works (two-pass batching):
 *   1. COLLECT pass — walk the document and gather every unique string
 *      (no network calls; strings pass through unchanged).
 *   2. One chunked Claude call translates the whole set together, so shared
 *      terminology (CTAs, headings, product terms) stays consistent.
 *   3. APPLY pass — walk the document again, substituting the translations.
 *
 * The full body-block palette is preserved (tables, quotes, callouts,
 * accordions, images with alt/caption, video captions, button labels,
 * comparison tables, etc.).
 *
 * Key handling: reads `SANITY_STUDIO_ANTHROPIC_API_KEY` (the Sanity-standard
 * env prefix). Set it in `sanity-studio/.env` for LOCAL use only — do not bake
 * it into a `sanity deploy` build, or it would ship in the public studio bundle.
 */

import Anthropic from '@anthropic-ai/sdk'

// Default model. Swap to 'claude-haiku-4-5' or 'claude-sonnet-5' here if you
// want cheaper/faster translation at some quality cost.
const MODEL = 'claude-opus-4-8'

const LANG_NAMES = {
  es: 'Spanish (Spain)',
  tr: 'Turkish',
  'pt-BR': 'Brazilian Portuguese',
}

// ── Two-pass state ──────────────────────────────────────────────────────────
// `translateText` consults these so the same walker code both collects strings
// (pass 1) and applies cached translations (pass 2).
let COLLECT = false
let COLLECTED = null // Set<string> during the collect pass
let CACHE = null // Map<string, string> during the apply pass

// ── Claude batch translator ─────────────────────────────────────────────────

function getClient() {
  const apiKey =
    typeof process !== 'undefined' && process.env
      ? process.env.SANITY_STUDIO_ANTHROPIC_API_KEY
      : undefined
  if (!apiKey) {
    throw new Error(
      'Missing SANITY_STUDIO_ANTHROPIC_API_KEY. Add it to sanity-studio/.env and restart the Studio ' +
        '(local only — do not include this key in a deployed build).'
    )
  }
  // dangerouslyAllowBrowser: the Studio runs client-side. Safe only because the
  // key is provided locally and never shipped in a deployed bundle.
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
}

// Group strings into batches bounded by both item count and total characters,
// so each Claude call stays well within a comfortable output size.
function chunkStrings(arr, maxItems, maxChars) {
  const out = []
  let cur = []
  let curChars = 0
  for (const s of arr) {
    const len = s.length
    if (cur.length && (cur.length >= maxItems || curChars + len > maxChars)) {
      out.push(cur)
      cur = []
      curChars = 0
    }
    cur.push(s)
    curChars += len
  }
  if (cur.length) out.push(cur)
  return out
}

/**
 * Translate an array of unique strings via Claude. Returns a Map(original →
 * translated). On any error (missing key surfaces to the caller; a bad batch is
 * left untranslated) the affected strings simply keep their English text.
 */
async function claudeTranslateBatch(strings, targetLang) {
  const cache = new Map()
  const unique = strings.filter((s) => s && typeof s === 'string' && s.trim())
  if (unique.length === 0) return cache

  const languageName = LANG_NAMES[targetLang] || targetLang
  const client = getClient() // throws early if the key is missing
  const batches = chunkStrings(unique, 40, 4000)

  const system =
    `You are a professional translator localizing a B2B SaaS marketing site (Eazybe — a WhatsApp CRM) ` +
    `from English into ${languageName}.\n` +
    `Translate each string in the JSON array into natural, fluent, idiomatic ${languageName} as a native ` +
    `marketer would write it — not a literal word-for-word rendering. Keep the tone clear, confident, and concise.\n` +
    `Do NOT translate: brand and product names (Eazybe, WhatsApp, HubSpot, Salesforce, Zoho, Bitrix24, ` +
    `LeadSquared, Freshworks, Freshdesk), the acronyms CRM/API/SaaS/URL, URLs, email addresses, code, or ` +
    `{{placeholder}} tokens.\n` +
    `Preserve exactly: HTML tags, markdown, emojis, numbers, punctuation, and any leading/trailing whitespace.\n` +
    `Return ONLY a JSON array of the translated strings, in the same order and with the same length as the ` +
    `input array. No commentary, no code fences.`

  for (const batch of batches) {
    try {
      const res = await client.messages.create({
        model: MODEL,
        max_tokens: 8192,
        system,
        messages: [{ role: 'user', content: JSON.stringify(batch) }],
      })
      const raw = (res.content || [])
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim()
      // Tolerate an accidental ```json fence.
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
      const arr = JSON.parse(cleaned)
      if (Array.isArray(arr) && arr.length === batch.length) {
        batch.forEach((src, i) => {
          if (typeof arr[i] === 'string') cache.set(src, arr[i])
        })
      } else {
        console.warn('Claude translation: batch length mismatch — leaving these strings in English.')
      }
    } catch (err) {
      // Re-throw a missing-key error so the editor sees a clear message; for a
      // per-batch failure, leave those strings untranslated and continue.
      if (err instanceof Error && err.message.includes('SANITY_STUDIO_ANTHROPIC_API_KEY')) throw err
      console.warn('Claude translation batch failed — leaving these strings in English:', err?.message || err)
    }
  }
  return cache
}

// ── String translation (state-aware) ────────────────────────────────────────

/**
 * Translate a single string. During the collect pass it records the string and
 * returns it unchanged; during the apply pass it returns the cached translation
 * (or the original if none). Returns the original for empty input.
 */
export async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string' || !text.trim()) return text
  if (COLLECT) {
    COLLECTED.add(text)
    return text
  }
  if (CACHE && CACHE.has(text)) return CACHE.get(text)
  return text
}

/**
 * Convenience: translate a value that may be string or portable-text array.
 */
export async function translateAny(value, targetLang) {
  if (!value) return value
  if (Array.isArray(value)) return translatePortableText(value, targetLang)
  if (typeof value === 'string') return translateText(value, targetLang)
  return value
}

/**
 * Translate portable-text blocks. Preserves block structure, markDefs,
 * list levels, and non-text blocks; recurses into custom block types.
 */
export async function translatePortableText(blocks, targetLang) {
  if (!Array.isArray(blocks) || blocks.length === 0) return blocks

  const out = []
  for (const block of blocks) {
    if (!block || !block._type) {
      out.push(block)
      continue
    }

    switch (block._type) {
      case 'block': {
        // Translate text spans, keep non-span children + markDefs intact
        const children = []
        for (const child of block.children || []) {
          if (child?._type === 'span' && child.text) {
            const translated = await translateText(child.text, targetLang)
            children.push({ ...child, text: translated })
          } else {
            children.push(child)
          }
        }
        out.push({ ...block, children })
        break
      }

      case 'image': {
        // Alt is a plain string. Caption is now Portable Text (array) but may
        // be a legacy string on older docs — translateAny handles both.
        // Honor the per-image translation mode: 'custom' means the editor will
        // localize the caption by hand, so we inherit English verbatim here.
        const alt = await translateText(block.alt, targetLang)
        const caption =
          block.translationMode === 'custom'
            ? block.caption
            : await translateAny(block.caption, targetLang)
        out.push({ ...block, alt, caption })
        break
      }

      case 'imageGallery': {
        const images = await Promise.all(
          (block.images || []).map(async (img) => ({
            ...img,
            alt: await translateText(img.alt, targetLang),
            caption:
              img.translationMode === 'custom'
                ? img.caption
                : await translateAny(img.caption, targetLang),
          }))
        )
        const title = await translateText(block.title, targetLang)
        const caption = await translateAny(block.caption, targetLang)
        out.push({ ...block, images, title, caption })
        break
      }

      case 'table': {
        const headers = await Promise.all(
          (block.headers || []).map((h) => translateText(h, targetLang))
        )
        const rows = await Promise.all(
          (block.rows || []).map(async (row) => ({
            ...row,
            cells: await Promise.all(
              (row.cells || []).map((cell) => translateText(cell, targetLang))
            ),
          }))
        )
        const caption = await translateText(block.caption, targetLang)
        out.push({ ...block, headers, rows, caption })
        break
      }

      case 'accordion': {
        const items = await Promise.all(
          (block.items || []).map(async (item) => ({
            ...item,
            title: await translateText(item.title, targetLang),
            content: await translateAny(item.content, targetLang),
          }))
        )
        const title = await translateText(block.title, targetLang)
        out.push({ ...block, title, items })
        break
      }

      case 'callout': {
        // Schema fields: `content` (Portable Text) and `title` (string).
        // Older docs may also have a legacy `text` field — translate both
        // when present so we don't drop content on either shape.
        const title = await translateText(block.title, targetLang)
        const content = await translateAny(block.content, targetLang)
        const next = { ...block, title, content }
        if (block.text !== undefined) {
          next.text = await translateAny(block.text, targetLang)
        }
        out.push(next)
        break
      }

      case 'quote': {
        // Schema fields: content (quote text), author, role, company.
        const [content, author, role, company] = await Promise.all([
          translateText(block.content, targetLang),
          translateText(block.author, targetLang),
          translateText(block.role, targetLang),
          translateText(block.company, targetLang),
        ])
        const next = { ...block, content, author, role, company }
        // Legacy fields on older docs — translate if present so nothing is lost.
        if (block.text !== undefined) next.text = await translateText(block.text, targetLang)
        if (block.attribution !== undefined) next.attribution = await translateText(block.attribution, targetLang)
        out.push(next)
        break
      }

      case 'videoEmbed': {
        const title = await translateText(block.title, targetLang)
        const caption = await translateText(block.caption, targetLang)
        out.push({ ...block, title, caption })
        break
      }

      case 'buttonCTA': {
        // Schema field: text (button label). Keep legacy label/description too.
        const text = await translateText(block.text, targetLang)
        const next = { ...block, text }
        if (block.label !== undefined) next.label = await translateText(block.label, targetLang)
        if (block.description !== undefined) next.description = await translateText(block.description, targetLang)
        out.push(next)
        break
      }

      case 'fileDownload': {
        // Schema fields: title (download title) + description. fileSize is a
        // display-only value ("2.5 MB") and is intentionally not translated.
        const [title, description] = await Promise.all([
          translateText(block.title, targetLang),
          translateText(block.description, targetLang),
        ])
        const next = { ...block, title, description }
        if (block.label !== undefined) next.label = await translateText(block.label, targetLang)
        out.push(next)
        break
      }

      case 'codeBlock': {
        // Don't translate code — only filename / caption if present
        const filename = await translateText(block.filename, targetLang)
        const caption = await translateText(block.caption, targetLang)
        out.push({ ...block, filename, caption })
        break
      }

      case 'comparisonTable': {
        // Schema fields: title, columns[].name (objects), rows[].feature,
        // rows[].values[] (strings), cta.text. Columns/values tolerate the
        // legacy plain-string shape too.
        const title = await translateText(block.title, targetLang)
        const columns = await Promise.all(
          (block.columns || []).map(async (col) =>
            typeof col === 'string'
              ? await translateText(col, targetLang)
              : { ...col, name: await translateText(col.name, targetLang) }
          )
        )
        const rows = await Promise.all(
          (block.rows || []).map(async (row) => ({
            ...row,
            feature: await translateText(row.feature, targetLang),
            values: await Promise.all(
              (row.values || []).map(async (v) =>
                typeof v === 'string'
                  ? await translateText(v, targetLang)
                  : { ...v, text: v?.text ? await translateText(v.text, targetLang) : v?.text }
              )
            ),
          }))
        )
        const next = { ...block, title, columns, rows }
        if (block.cta?.text) {
          next.cta = { ...block.cta, text: await translateText(block.cta.text, targetLang) }
        }
        // Legacy top-level fields on older docs.
        if (block.headline !== undefined) next.headline = await translateText(block.headline, targetLang)
        if (block.description !== undefined) next.description = await translateText(block.description, targetLang)
        out.push(next)
        break
      }

      default:
        // Unknown / structural block — keep as-is
        out.push(block)
        break
    }
  }

  return out
}

/**
 * Translate FAQ array. Handles rich-text (portable) answers and plain-text
 * fallbacks, plus the optional acceptedAnswer field.
 */
async function translateFaqs(faqs, targetLang) {
  if (!Array.isArray(faqs) || faqs.length === 0) return faqs

  const out = []
  for (const faq of faqs) {
    const [question, answer, plainAnswer, acceptedAnswer] = await Promise.all([
      translateText(faq?.question, targetLang),
      translateAny(faq?.answer, targetLang),
      translateText(faq?.plainAnswer, targetLang),
      translateText(faq?.acceptedAnswer, targetLang),
    ])
    out.push({
      ...faq,
      question,
      answer,
      ...(faq?.plainAnswer !== undefined ? { plainAnswer } : {}),
      ...(faq?.acceptedAnswer !== undefined ? { acceptedAnswer } : {}),
    })
  }
  return out
}

/**
 * Translate the alt / caption on a top-level image field (e.g. featuredImage,
 * socialShareImage). Returns a shallow-cloned image object with translated
 * alt and caption; preserves the asset reference and all other properties.
 * Returns the input unchanged if it's falsy or has no translatable text.
 */
export async function translateImage(image, targetLang) {
  if (!image || typeof image !== 'object') return image
  // Alt is a plain string; caption is Portable Text (array) with a legacy
  // string fallback. 'custom' translation mode inherits the English caption
  // verbatim so a hand-authored localized caption is never overwritten.
  const [alt, caption] = await Promise.all([
    translateText(image.alt, targetLang),
    image.translationMode === 'custom'
      ? image.caption
      : translateAny(image.caption, targetLang),
  ])
  const next = { ...image }
  if (image.alt !== undefined) next.alt = alt
  if (image.caption !== undefined) next.caption = caption
  return next
}

/**
 * Walk every translatable field of a post / comparisonPost document. Runs once
 * per pass (collect, then apply) — see `translatePostFields`. Structural fields
 * (refs, dates, flags, schemas) are left for the caller to copy verbatim.
 */
async function walkPostFields(fields, targetLang) {
  const [
    title,
    excerpt,
    body,
    faq,
    quickAnswer,
    tldr,
    tldrHeading,
    faqTitle,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    featuredImage,
    socialShareImage,
  ] = await Promise.all([
    translateText(fields.title, targetLang),
    translateText(fields.excerpt, targetLang),
    translatePortableText(fields.body || [], targetLang),
    translateFaqs(fields.faq || [], targetLang),
    translateText(fields.quickAnswer, targetLang),
    translatePortableText(fields.tldr || [], targetLang),
    translateText(fields.tldrHeading, targetLang),
    translateText(fields.faqTitle, targetLang),
    translateText(fields.metaTitle, targetLang),
    translateText(fields.metaDescription, targetLang),
    translateText(fields.metaKeywords, targetLang),
    translateText(fields.ogTitle, targetLang),
    translateText(fields.ogDescription, targetLang),
    translateText(fields.twitterTitle, targetLang),
    translateText(fields.twitterDescription, targetLang),
    translateImage(fields.featuredImage, targetLang),
    translateImage(fields.socialShareImage, targetLang),
  ])

  return {
    title,
    excerpt,
    body,
    faq,
    quickAnswer,
    tldr,
    tldrHeading,
    faqTitle,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    featuredImage,
    socialShareImage,
  }
}

/**
 * Translate every translatable field of a post / comparisonPost document with
 * Claude, using the two-pass batch strategy described at the top of the file.
 */
export async function translatePostFields(fields, targetLang) {
  // Pass 1 — collect every unique translatable string (no network calls).
  COLLECT = true
  COLLECTED = new Set()
  try {
    await walkPostFields(fields, targetLang)
  } finally {
    COLLECT = false
  }

  // One chunked Claude call for the whole document → translation cache.
  const strings = [...COLLECTED]
  COLLECTED = null
  CACHE = await claudeTranslateBatch(strings, targetLang)

  // Pass 2 — rebuild the document from the cache.
  try {
    return await walkPostFields(fields, targetLang)
  } finally {
    CACHE = null
  }
}
