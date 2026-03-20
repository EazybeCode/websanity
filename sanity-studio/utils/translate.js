/**
 * Google Translate integration for Sanity Studio
 * Uses the free Google Translate API endpoint
 */

const LANG_MAP = {
  'es': 'es',
  'tr': 'tr',
  'pt-BR': 'pt',
}

/**
 * Translate a single string
 */
export async function translateText(text, targetLang) {
  if (!text || !text.trim()) return text

  const googleLang = LANG_MAP[targetLang] || targetLang

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(text)}`
    const res = await fetch(url)
    const data = await res.json()

    // Response format: [[["translated text","original text",null,null,x],...],...]
    if (data && data[0]) {
      return data[0].map(segment => segment[0]).join('')
    }
    return text
  } catch (err) {
    console.warn(`Translation failed for "${text.substring(0, 30)}...":`, err)
    return text
  }
}

/**
 * Translate Portable Text body content
 * Preserves block structure, only translates text spans
 */
export async function translatePortableText(blocks, targetLang) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return blocks

  const translated = []

  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      // Text block — translate each text span
      const translatedChildren = []
      for (const child of block.children) {
        if (child._type === 'span' && child.text) {
          const translatedText = await translateText(child.text, targetLang)
          translatedChildren.push({ ...child, text: translatedText })
        } else {
          translatedChildren.push(child)
        }
      }
      translated.push({ ...block, children: translatedChildren })
    } else {
      // Image, table, embed etc — keep as-is
      translated.push(block)
    }
  }

  return translated
}

/**
 * Translate all translatable fields of a blog post
 */
export async function translatePostFields(fields, targetLang) {
  const [
    translatedTitle,
    translatedExcerpt,
    translatedBody,
    translatedFaqs,
  ] = await Promise.all([
    translateText(fields.title, targetLang),
    translateText(fields.excerpt, targetLang),
    translatePortableText(fields.body, targetLang),
    translateFaqs(fields.faq, targetLang),
  ])

  return {
    title: translatedTitle,
    excerpt: translatedExcerpt,
    body: translatedBody,
    faq: translatedFaqs,
  }
}

/**
 * Translate FAQ array
 */
async function translateFaqs(faqs, targetLang) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return faqs

  const translated = []
  for (const faq of faqs) {
    const [question, answer, acceptedAnswer] = await Promise.all([
      translateText(faq.question, targetLang),
      translateText(faq.answer, targetLang),
      faq.acceptedAnswer ? translateText(faq.acceptedAnswer, targetLang) : Promise.resolve(''),
    ])
    translated.push({
      ...faq,
      question,
      answer,
      ...(acceptedAnswer ? { acceptedAnswer } : {}),
    })
  }
  return translated
}
