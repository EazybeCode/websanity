import { draftMode } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/'
  return Response.redirect(new URL(redirectUrl, request.nextUrl.origin))
}
