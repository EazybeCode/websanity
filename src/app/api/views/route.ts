import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'

const client = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  try {
    const { slug, locale, type } = await request.json()
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const sanityLangMap: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', pt: 'pt', tr: 'tr' }
    const language = sanityLangMap[locale || 'en'] || locale || 'en'
    const docType = type === 'comparison' ? 'comparisonPost' : 'post'

    // Find the doc by slug and language
    const doc = await client.fetch(
      `*[_type == $docType && slug.current == $slug && language == $language][0]{ _id, viewCount }`,
      { docType, slug, language }
    )

    if (!doc) {
      return NextResponse.json({ error: 'Doc not found' }, { status: 404 })
    }

    // Increment view count
    const currentCount = (doc.viewCount || 0) + 1
    await client.patch(doc._id).set({ viewCount: currentCount }).commit()

    return NextResponse.json({ views: currentCount * 7 })
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

    const sanityLangMap: Record<string, string> = { en: 'en', es: 'es', br: 'pt-BR', pt: 'pt', tr: 'tr' }
    const language = sanityLangMap[locale] || locale
    const docType = type === 'comparison' ? 'comparisonPost' : 'post'

    const doc = await client.fetch(
      `*[_type == $docType && slug.current == $slug && language == $language][0]{ viewCount }`,
      { docType, slug, language }
    )

    const count = doc?.viewCount || 0
    return NextResponse.json({ views: count * 7 })
  } catch {
    return NextResponse.json({ views: 0 })
  }
}
