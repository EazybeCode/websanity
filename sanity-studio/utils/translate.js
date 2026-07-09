/**
 * Google Translate integration for Sanity Studio
 * Uses the free Google Translate endpoint (no API key required)
 *
 * Handles the full body block palette so translated documents preserve every
 * element (tables, quotes, callouts, accordions, images with alt/caption,
 * video captions, button labels, comparison tables, etc.).
 */

const LANG_MAP = {
  es: 'es',
  tr: 'tr',
  'pt-BR': 'pt',
}

/**
 * Translate a single string. Returns the original on empty / error.
 */
export async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string' || !text.trim()) return text

  const googleLang = LANG_MAP[targetLang] || targetLang

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(text)}`
    const res = await fetch(url)
    const data = await res.json()

    if (data && data[0]) {
      return data[0].map((segment) => segment[0]).join('')
    }
    return text
  } catch (err) {
    console.warn(`Translation failed for "${text.substring(0, 30)}...":`, err)
    return text
  }
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
 * Translate every translatable field of a post / comparisonPost document.
 * Structural fields (refs, dates, flags, schemas) are left for the caller to
 * copy verbatim. Top-level image alts/captions are translated here too.
 */
export async function translatePostFields(fields, targetLang) {
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
