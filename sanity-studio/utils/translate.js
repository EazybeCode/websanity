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

  // Preserve spacing deterministically. Portable Text splits a paragraph into
  // several spans around bold/link marks, and the space between words often
  // lives at a span's leading/trailing edge. We translate only the trimmed
  // CORE of each string and re-attach the exact original edge whitespace, so
  // the model can never drop or add a space and collapse adjacent spans
  // ("from October" → "fromOctober").
  const parts = new Map() // original string -> { leading, core, trailing }
  const coreSet = new Set()
  for (const s of unique) {
    const leading = (s.match(/^\s+/) || [''])[0]
    const trailing = (s.match(/\s+$/) || [''])[0]
    const core = s.slice(leading.length, s.length - trailing.length)
    parts.set(s, { leading, core, trailing })
    if (core) coreSet.add(core)
  }

  const system =
    `You are a professional translator localizing a B2B SaaS marketing site (Eazybe — a WhatsApp CRM) ` +
    `from English into ${languageName}.\n` +
    `Translate each string in the JSON array into natural, fluent, idiomatic ${languageName} as a native ` +
    `marketer would write it — not a literal word-for-word rendering. Keep the tone clear, confident, and concise.\n` +
    `Each string may be a fragment of a larger sentence and can start or end mid-sentence; translate it as the ` +
    `fragment it is. Do not add or remove words, punctuation, or surrounding spaces that were not there.\n` +
    `Do NOT translate: brand and product names (Eazybe, WhatsApp, HubSpot, Salesforce, Zoho, Bitrix24, ` +
    `LeadSquared, Freshworks, Freshdesk), the acronyms CRM/API/SaaS/URL, URLs, email addresses, code, or ` +
    `{{placeholder}} tokens.\n` +
    `Preserve exactly: HTML tags, markdown, emojis, numbers, and punctuation.\n` +
    `Return ONLY a JSON array of the translated strings, in the same order and with the same length as the ` +
    `input array. Use standard JSON: delimit every string with double quotes ("), never single quotes, and ` +
    `escape any double quote inside a string as \\". No commentary, no code fences.`

  // Parse the model's reply into an array of exactly `expected` strings, or null
  // if it isn't valid. Tolerates a ```json fence and a stray trailing comma; a
  // single mis-delimited element (the Turkish-apostrophe glitch) simply fails
  // here and triggers a retry of the whole batch.
  const parseArray = (raw, expected) => {
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()
    try {
      const arr = JSON.parse(cleaned)
      return Array.isArray(arr) && arr.length === expected ? arr : null
    } catch {
      return null
    }
  }

  const coreMap = new Map() // core -> translated core (edge-trimmed)
  const batches = chunkStrings([...coreSet], 40, 4000)
  for (const batch of batches) {
    let arr = null
    // Retry the batch a few times: a malformed-JSON reply is almost always a
    // one-off formatting glitch that a fresh generation fixes.
    for (let attempt = 0; attempt < 3 && !arr; attempt++) {
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
        arr = parseArray(raw, batch.length)
        if (!arr && attempt < 2) {
          console.warn(`Claude translation: unparseable/mismatched batch — retry ${attempt + 1}/2.`)
        }
      } catch (err) {
        // Re-throw a missing-key error so the editor sees a clear message; for a
        // transient per-batch failure, retry, then leave untranslated.
        if (err instanceof Error && err.message.includes('SANITY_STUDIO_ANTHROPIC_API_KEY')) throw err
        console.warn('Claude translation batch error — retrying:', err?.message || err)
      }
    }
    if (arr) {
      batch.forEach((src, i) => {
        // Trim the model's output too, so the re-attached edges are exact.
        if (typeof arr[i] === 'string') coreMap.set(src, arr[i].trim())
      })
    } else {
      console.warn('Claude translation: batch failed after retries — leaving these strings in English.')
    }
  }

  // Re-attach the exact original leading/trailing whitespace to each core.
  for (const [orig, { leading, core, trailing }] of parts) {
    const translatedCore = coreMap.has(core) ? coreMap.get(core) : core
    cache.set(orig, leading + translatedCore + trailing)
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

// ── Custom Meta Tags (HTML) ──────────────────────────────────────────────────
// The "🏷️ Custom Meta Tags (HTML)" field is a raw block of <meta> tags holding
// the AI-discovery values (searchTitle, user-problem, conversational-query, …).
// We localize the human-readable CONTENT of the discovery tags, set languageCode
// per locale, and keep the technical/brand tags fixed. State-aware: goes through
// the same collect/apply passes as every other string (so terminology matches).

// Discovery tags whose `content` gets translated. Everything not listed is kept
// verbatim — primaryTaxonomyEn (always English), siteSection, productName, and
// the robots/googlebot/bingbot directives.
const CUSTOM_META_TRANSLATE = new Set([
  'searchTitle', 'focusArea', 'primaryTopic', 'pageType',
  'answer-type', 'target-audience', 'content-intent', 'conversational-query',
  'ai-readability', 'context-window', 'user-problem', 'solution-summary',
  'primary-benefit', 'use-case', 'implementation-difficulty', 'time-to-value',
])
// Studio language code → the `languageCode` meta value.
const META_LANG_CODE = { es: 'es', tr: 'tr', 'pt-BR': 'pt', en: 'en' }

function escMetaAttr(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Localize a Custom Meta Tags (HTML) blob. Parses each `<meta name content>`,
 * translates the discovery values, sets languageCode for the locale, and keeps
 * the technical/brand tags untouched. Returns the original string if it has no
 * parseable meta tags.
 */
export async function translateCustomMetaTags(html, targetLang) {
  if (!html || typeof html !== 'string' || !html.trim()) return html
  const re = /<meta\s+name="([^"]+)"\s+content="([^"]*)"\s*\/?>/g
  const tags = []
  let m
  while ((m = re.exec(html))) tags.push({ name: m[1], content: m[2] })
  if (tags.length === 0) return html

  const out = []
  for (const t of tags) {
    let content = t.content
    if (t.name === 'languageCode') {
      content = META_LANG_CODE[targetLang] || targetLang
    } else if (CUSTOM_META_TRANSLATE.has(t.name)) {
      content = await translateText(t.content, targetLang)
    }
    out.push(`<meta name="${escMetaAttr(t.name)}" content="${escMetaAttr(content)}"/>`)
  }
  return out.join('\n')
}

// ── URL slug ─────────────────────────────────────────────────────────────────
// Slugs must be ASCII, lowercase, hyphenated. Fold accents (á→a, ç→c) and the
// base letters NFD doesn't decompose (Turkish ı/İ, ş, ğ, etc.), then strip
// anything that isn't a-z0-9 to hyphens.
const SLUG_ASCII = {
  ı: 'i', İ: 'i', ş: 's', Ş: 's', ğ: 'g', Ğ: 'g', ç: 'c', Ç: 'c',
  ö: 'o', Ö: 'o', ü: 'u', Ü: 'u', ł: 'l', Ł: 'l', ø: 'o', Ø: 'o',
  đ: 'd', Đ: 'd', æ: 'ae', Æ: 'ae', œ: 'oe', Œ: 'oe', ß: 'ss',
}
export function slugifyAscii(s) {
  return String(s || '')
    .replace(/[ıİşŞğĞçÇöÖüÜłŁøØđĐæÆœŒß]/g, (ch) => SLUG_ASCII[ch] || ch)
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
    .replace(/-+$/g, '')
}

/**
 * Produce a localized, SEO-friendly URL slug. Give it the English keyword
 * phrase (ideally the English slug, de-hyphenated). Makes a small dedicated
 * Claude call for a tight native equivalent, then folds it to a clean ASCII
 * slug. Returns '' on failure so the caller can fall back to the English slug.
 */
export async function translateSlug(sourceText, targetLang) {
  const text = (sourceText || '').replace(/-/g, ' ').trim()
  if (!text) return ''
  const languageName = LANG_NAMES[targetLang] || targetLang
  let phrase = ''
  try {
    const client = getClient()
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 60,
      system:
        `You generate a SHORT, SEO-friendly URL slug in ${languageName} from the given English keyword phrase.\n` +
        `Produce the natural ${languageName} equivalent, optimized as a slug:\n` +
        `- 3 to 5 words MAX — fewer is better; mirror the brevity of the English phrase, do not expand it.\n` +
        `- Keyword-first. Drop articles, prepositions and filler (e.g. de, para, para que, için, ile, e, the, to, for, and).\n` +
        `- Translate for meaning in natural ${languageName} word order, never word-for-word.\n` +
        `- Keep brand/product names verbatim (WhatsApp, CRM, HubSpot, Salesforce, Zoho, Eazybe). No years or numbers.\n` +
        `Return ONLY the phrase as plain lowercase words separated by single spaces — no punctuation, quotes, or commentary.`,
      messages: [{ role: 'user', content: text }],
    })
    phrase = (res.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()
  } catch (err) {
    if (err instanceof Error && err.message.includes('SANITY_STUDIO_ANTHROPIC_API_KEY')) throw err
    return ''
  }
  return slugifyAscii(phrase)
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
    customMetaTags,
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
    translateCustomMetaTags(fields.customMetaTags, targetLang),
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
    customMetaTags,
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

// ─── Case studies ────────────────────────────────────────────────────────────
// Separate walker on purpose: case studies carry company facts / card copy
// instead of FAQ / TL;DR, and must never share code paths with the blog and
// comparison translation flow above.

async function walkCaseStudyFields(fields, targetLang) {
  const [
    title,
    excerpt,
    cardHeadline,
    industry,
    body,
    keyTakeaways,
    facts,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    featuredImage,
    customMetaTags,
  ] = await Promise.all([
    translateText(fields.title, targetLang),
    translateText(fields.excerpt, targetLang),
    translateText(fields.cardHeadline, targetLang),
    translateText(fields.industry, targetLang),
    translatePortableText(fields.body || [], targetLang),
    translatePortableText(fields.keyTakeaways || [], targetLang),
    Promise.all((fields.facts || []).map(async (f) => ({
      ...f,
      value: await translateText(f?.value, targetLang),
      label: await translateText(f?.label, targetLang),
    }))),
    translateText(fields.metaTitle, targetLang),
    translateText(fields.metaDescription, targetLang),
    translateText(fields.metaKeywords, targetLang),
    translateText(fields.ogTitle, targetLang),
    translateText(fields.ogDescription, targetLang),
    translateText(fields.twitterTitle, targetLang),
    translateText(fields.twitterDescription, targetLang),
    translateImage(fields.featuredImage, targetLang),
    translateCustomMetaTags(fields.customMetaTags, targetLang),
  ])

  return {
    title,
    excerpt,
    cardHeadline,
    industry,
    body,
    keyTakeaways,
    facts,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    featuredImage,
    customMetaTags,
  }
}

/**
 * Translate every translatable field of a caseStudy document with Claude,
 * using the same two-pass batch strategy as translatePostFields.
 */
export async function translateCaseStudyFields(fields, targetLang) {
  COLLECT = true
  COLLECTED = new Set()
  try {
    await walkCaseStudyFields(fields, targetLang)
  } finally {
    COLLECT = false
  }

  const strings = [...COLLECTED]
  COLLECTED = null
  CACHE = await claudeTranslateBatch(strings, targetLang)

  try {
    return await walkCaseStudyFields(fields, targetLang)
  } finally {
    CACHE = null
  }
}
