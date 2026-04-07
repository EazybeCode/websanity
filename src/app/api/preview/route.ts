import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const locale = searchParams.get('locale') || 'en'
  const type = searchParams.get('type') || 'post'

  // Validate secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Build the redirect URL based on locale and type
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  let redirectUrl = '/'
  if (type === 'post') {
    redirectUrl = `${localePrefix}/blog/${slug}`
  }

  redirect(redirectUrl)
}
