import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'

// Reads use a tokenless client: the dataset is public, and an invalid
// SANITY_API_TOKEN would otherwise 401 even plain reads (which is exactly how
// the view counter silently died in production once the token was rotated).
// Only the increment needs write auth.
const readClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const writeClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const sanityLangMap: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', pt: 'pt', tr: 'tr' }

export async function POST(request: NextRequest) {
  try {
    const { slug, locale, type } = await request.json()
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const language = sanityLangMap[locale || 'en'] || locale || 'en'
    const docType = type === 'comparison' ? 'comparisonPost' : 'post'

    const doc = await readClient.fetch(
      `*[_type == $docType && slug.current == $slug && language == $language][0]{ _id, viewCount }`,
      { docType, slug, language }
    )

    if (!doc) {
      return NextResponse.json({ error: 'Doc not found' }, { status: 404 })
    }

    // Increment. If the write token is missing/expired the patch fails — still
    // return the current count so the badge shows a live number instead of
    // freezing on the build-time value; `recorded` says whether the view stuck.
    const currentCount = (doc.viewCount || 0) + 1
    try {
      await writeClient.patch(doc._id).set({ viewCount: currentCount }).commit()
      return NextResponse.json({ views: currentCount * 7, recorded: true })
    } catch (writeError) {
      console.error('View count write failed (check SANITY_API_TOKEN):', writeError)
      return NextResponse.json({ views: (doc.viewCount || 0) * 7, recorded: false })
    }
  } catch (error) {
    console.error('View count error:', error)
    return NextResponse.json({ error: 'Failed to update views' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug')
    const locale = request.nextUrl.searchParams.get('locale') || 'en'
    const type = request.nextUrl.searchParams.get('type')

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const language = sanityLangMap[locale] || locale
    const docType = type === 'comparison' ? 'comparisonPost' : 'post'

    const doc = await readClient.fetch(
      `*[_type == $docType && slug.current == $slug && language == $language][0]{ viewCount }`,
      { docType, slug, language }
    )

    const count = doc?.viewCount || 0
    return NextResponse.json({ views: count * 7 })
  } catch {
    return NextResponse.json({ views: 0 })
  }
}
