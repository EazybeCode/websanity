import { NextRequest, NextResponse } from 'next/server'
import { oauthClient } from '@/lib/gcal'

export const dynamic = 'force-dynamic'

/**
 * GET /api/gcal/oauth/callback?code=...
 *
 * Google's redirect target after consent. Exchanges the code for
 * { access_token, refresh_token } and renders a plain HTML page showing
 * the refresh token so the operator can paste it into .env.local (and
 * later Coolify env vars). We render, not JSON, so nothing gets logged
 * to console/network tabs unless the operator copies it themselves.
 *
 * After this succeeds ONCE, this route becomes dead code — the refresh
 * token lives in the env and every booking uses it silently.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const err = url.searchParams.get('error')
  if (err) return htmlPage(`OAuth error: <code>${escapeHtml(err)}</code>`)
  if (!code) return htmlPage('Missing <code>code</code> query param.')

  const client = oauthClient()
  try {
    const { tokens } = await client.getToken(code)
    const refresh = tokens.refresh_token
    if (!refresh) {
      return htmlPage(
        'Google did not return a refresh token. Revoke access at ' +
          '<a href="https://myaccount.google.com/permissions" target="_blank">myaccount.google.com/permissions</a> ' +
          'then hit <code>/api/gcal/oauth/start</code> again.',
      )
    }
    return htmlPage(
      `<p>Copy this into <code>.env.local</code> and Coolify env:</p>` +
        `<pre style="user-select:all">GCAL_REFRESH_TOKEN=${escapeHtml(refresh)}</pre>` +
        `<p>Also set <code>GCAL_CALENDAR_ID</code> to your host email (usually <code>hey@eazybe.com</code>) ` +
        `or leave it blank to default to <code>primary</code>.</p>` +
        `<p>Restart <code>npm run dev</code> after pasting.</p>`,
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return htmlPage(`Token exchange failed: <code>${escapeHtml(msg)}</code>`)
  }
}

function htmlPage(bodyHtml: string) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><title>GCal OAuth</title>` +
      `<style>body{font-family:system-ui,sans-serif;padding:32px;max-width:640px;margin:0 auto;color:#0F1115}` +
      `pre{background:#F3F4F6;padding:14px;border-radius:8px;word-break:break-all;white-space:pre-wrap;font-size:12px}` +
      `code{background:#F3F4F6;padding:1px 6px;border-radius:4px;font-size:12px}` +
      `a{color:#5B4BAE}</style></head><body>${bodyHtml}</body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c,
  )
}
