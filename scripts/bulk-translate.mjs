/**
 * Bulk translate all blog posts missing translations
 * Uses Google Translate API for auto-translation
 * Creates drafts in Sanity (not published)
 *
 * Usage: node scripts/bulk-translate.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
})

const ALL_LANGS = ['en', 'es', 'tr', 'pt-BR']

const GOOGLE_LANG_MAP = { 'es': 'es', 'tr': 'tr', 'pt-BR': 'pt', 'en': 'en' }

// ── Google Translate ────────────────────────────────────────────────

async function translateText(text, targetLang) {
  if (!text || !text.trim()) return text
  const gl = GOOGLE_LANG_MAP[targetLang] || targetLang
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${gl}&dt=t&q=${encodeURIComponent(text)}`
    const res = await fetch(url)
    const data = await res.json()
    if (data && data[0]) return data[0].map(s => s[0]).join('')
    return text
  } catch {
    return text
  }
}

async function translatePortableText(blocks, targetLang) {
  if (!blocks || !Array.isArray(blocks)) return blocks
  const result = []
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      const children = []
      for (const child of block.children) {
        if (child._type === 'span' && child.text) {
          children.push({ ...child, text: await translateText(child.text, targetLang) })
        } else {
          children.push(child)
        }
      }
      result.push({ ...block, children })
    } else {
      result.push(block)
    }
  }
  return result
}

async function translateFaqs(faqs, targetLang) {
  if (!faqs || !Array.isArray(faqs)) return faqs
  const result = []
  for (const faq of faqs) {
    result.push({
      ...faq,
      question: await translateText(faq.question, targetLang),
      answer: await translateText(faq.answer, targetLang),
      ...(faq.acceptedAnswer ? { acceptedAnswer: await translateText(faq.acceptedAnswer, targetLang) } : {}),
    })
  }
  return result
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('Set SANITY_WRITE_TOKEN environment variable first.')
    console.error('Get a token from: https://www.sanity.io/manage/project/5awzi0t4/api#tokens')
    process.exit(1)
  }

  // Fetch all posts
  const posts = await client.fetch(`*[_type == "post"]{
    _id, title, language, translationGroupId,
    "slug": slug.current, excerpt, body, category,
    readTime, author, faq, breadcrumbs, featuredImage,
    metaTitle, metaDescription
  }`)

  // Group by translationGroupId
  const groups = {}
  for (const p of posts) {
    const gid = p.translationGroupId
    if (!gid) continue
    if (!groups[gid]) groups[gid] = {}
    groups[gid][p.language] = p
  }

  let totalCreated = 0
  let totalSkipped = 0

  for (const [gid, langs] of Object.entries(groups)) {
    const missing = ALL_LANGS.filter(l => !langs[l])
    if (missing.length === 0) {
      console.log(`✓ ${gid} — complete`)
      continue
    }

    // Pick source: prefer English, then any available
    const source = langs['en'] || langs['es'] || langs['tr'] || langs['pt-BR']
    if (!source) continue

    console.log(`\n─── ${gid} (source: ${source.language}) ───`)
    console.log(`  Missing: ${missing.join(', ')}`)

    for (const targetLang of missing) {
      const slugBase = source.slug
      const langSlug = `${slugBase}-${targetLang}`
      const docId = `post-${langSlug}-${targetLang}`

      // Check if draft already exists
      const existing = await client.fetch(
        `*[_id in [$published, $draft]][0]{_id}`,
        { published: docId, draft: `drafts.${docId}` }
      )
      if (existing) {
        console.log(`  ⏭ ${targetLang} — already exists (${existing._id})`)
        totalSkipped++
        continue
      }

      console.log(`  ⏳ ${targetLang} — translating...`)

      const [translatedTitle, translatedExcerpt, translatedBody, translatedFaqs] = await Promise.all([
        translateText(source.title, targetLang),
        translateText(source.excerpt || '', targetLang),
        translatePortableText(source.body || [], targetLang),
        translateFaqs(source.faq || [], targetLang),
      ])

      try {
        await client.createIfNotExists({
          _id: `drafts.${docId}`,
          _type: 'post',
          language: targetLang,
          translationGroupId: gid,
          title: translatedTitle,
          slug: { current: langSlug, _type: 'slug' },
          excerpt: translatedExcerpt,
          body: translatedBody,
          featuredImage: source.featuredImage || undefined,
          category: source.category || undefined,
          publishedAt: new Date().toISOString(),
          readTime: source.readTime || 5,
          author: source.author || undefined,
          faq: translatedFaqs,
          breadcrumbs: source.breadcrumbs || [],
          metaTitle: '',
          metaDescription: '',
        })
        console.log(`  ✓ ${targetLang} — created draft: ${docId}`)
        totalCreated++
      } catch (err) {
        console.error(`  ✗ ${targetLang} — FAILED: ${err.message}`)
      }

      // Small delay to avoid rate limiting Google Translate
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  console.log(`\n══════════════════════════════════`)
  console.log(`Created: ${totalCreated} drafts`)
  console.log(`Skipped: ${totalSkipped} (already existed)`)
  console.log(`All created as DRAFTS — review and publish in Sanity Studio.`)
}

main().catch(console.error)
