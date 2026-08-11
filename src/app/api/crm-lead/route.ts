import { NextRequest, NextResponse } from 'next/server'

/**
 * Lead endpoint for /whatsapp-crm.
 *
 * Reached by the browser as `/track/crm-lead` (rewritten in next.config.ts) —
 * production nginx routes `/api/*` to a dead upstream, so a browser-facing
 * `/api/crm-lead` would 502 and every conversion would vanish silently.
 *
 * Returns 200 only once the lead is handed off; the client fires the Google Ads
 * `generate_lead` conversion on that 200 and nothing else.
 */
export const runtime = 'nodejs'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Mirrors the client list in LeadForm.tsx and the rest of the site's lead
 * forms. Client-side checks are UX — anyone can POST here directly, so the
 * rule that actually decides what reaches HubSpot has to live on the server.
 */
const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'yahoo.com.br',
  'hotmail.com', 'hotmail.com.br', 'outlook.com', 'outlook.com.br', 'live.com',
  'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com', 'protonmail.com',
  'proton.me', 'mail.com', 'zoho.com', 'yandex.com', 'gmx.com',
  'rediffmail.com', 'bol.com.br', 'uol.com.br', 'terra.com.br', 'ig.com.br',
])

export async function POST(request: NextRequest) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email || '').trim().toLowerCase()
  const digits = (body.phone || '').replace(/\D/g, '')
  const crm = (body.crm || '').trim()

  const bad: string[] = []
  if (!EMAIL.test(email)) bad.push('email')
  else if (PERSONAL_EMAIL_DOMAINS.has(email.split('@')[1] ?? '')) bad.push('emailPersonal')
  /**
   * The client now sends a full international number (dialling code + national
   * number), so this validates E.164 bounds rather than assuming Brazil.
   * Brazilian numbers still get the tighter check they had, since that is the
   * market this page buys traffic in and the shape is known.
   */
  if (digits.startsWith('55')) {
    const local = digits.slice(2)
    if (local.length < 10 || local.length > 11) bad.push('phone')
  } else if (digits.length < 7 || digits.length > 15) {
    bad.push('phone')
  }
  // The client disables submit for this, but the client is not the rule —
  // Eazybe connects to a CRM the team already runs, so this is not a lead
  // this endpoint can serve.
  if (!crm || crm === 'Other / none yet') bad.push('crm')
  if (bad.length) return NextResponse.json({ error: 'Validation failed', fields: bad }, { status: 400 })

  const lead = {
    email,
    phone: `+${digits}`,
    crm,
    form_location: body.form_location || '',
    source: 'whatsapp-crm',
    received_at: new Date().toISOString(),
  }

  /**
   * HubSpot is the destination. Submitted server-side rather than with the
   * `js.hsforms.net` embed for three reasons:
   *
   *  - the embed is blocked by this site's CSP (`js.hsforms.net` is not in
   *    the script-src allowlist), so it renders an empty card;
   *  - the embed owns its own submit, which would silently kill the
   *    `generate_lead` conversion the client fires on this route's 200;
   *  - going through here keeps the hero form's markup, validation and
   *    three-field friction level exactly as designed.
   *
   * The Forms submission endpoint is public — no token — and `api.hsforms.com`
   * is already in the CSP connect-src, though this call never leaves the
   * server anyway.
   */
  const portal = process.env.HUBSPOT_PORTAL_ID || '40009480'
  const formId = process.env.HUBSPOT_FORM_ID || 'db0e26e2-b980-4881-956e-4cdcb452df65'

  // Internal property names as HubSpot knows them. `email` and `phone` are
  // standard; CRM_FIELD must match the internal name of the dropdown on that
  // form — HubSpot rejects the whole submission with a 400 naming any field
  // it does not recognise, and the error body says which.
  const CRM_FIELD = process.env.HUBSPOT_CRM_FIELD || 'crm'

  const payload = {
    fields: [
      { objectTypeId: '0-1', name: 'email', value: lead.email },
      { objectTypeId: '0-1', name: 'phone', value: lead.phone },
      { objectTypeId: '0-1', name: CRM_FIELD, value: lead.crm },
    ],
    context: {
      pageUri: body.page_uri || 'https://eazybe.com/lp/en/whatsapp-crm',
      pageName: 'WhatsApp CRM — paid landing',
      ...(body.hutk ? { hutk: body.hutk } : {}),
    },
  }

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${formId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      },
    )

    if (!res.ok) {
      // Log the body: HubSpot names the offending field, which is the whole
      // diagnosis when a property name is wrong.
      const detail = await res.text().catch(() => '')
      console.error('[crm-lead] HubSpot rejected', res.status, detail)
      return NextResponse.json({ error: 'Upstream rejected' }, { status: 502 })
    }

    // Optional secondary destination, unchanged. A failure here must not
    // fail the request — the lead is already safely in HubSpot.
    const webhook = process.env.WC_LEAD_WEBHOOK_URL
    if (webhook) {
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5_000),
      }).catch((err) => console.error('[crm-lead] mirror webhook failed', err))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[crm-lead] delivery failed', err)
    return NextResponse.json({ error: 'Could not deliver the lead' }, { status: 502 })
  }
}
