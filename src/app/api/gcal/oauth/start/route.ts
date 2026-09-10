import { NextResponse } from 'next/server'
import { oauthClient, GCAL_SCOPES } from '@/lib/gcal'

export const dynamic = 'force-dynamic'

/**
 * GET /api/gcal/oauth/start
 *
 * Kick off the one-time OAuth consent flow. Visit this URL as the host
 * account (hey@eazybe.com) in a browser; it redirects to Google, you
 * approve, and Google redirects back to /api/gcal/oauth/callback with a
 * code that we exchange for the long-lived refresh token.
 *
 * `access_type=offline` + `prompt=consent` are both required — without
 * them Google may return only an access token (no refresh token) on the
 * second consent, leaving us stuck.
 */
export async function GET() {
  const client = oauthClient()
  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GCAL_SCOPES,
    include_granted_scopes: true,
  })
  return NextResponse.redirect(url)
}
