import { NextRequest, NextResponse } from 'next/server'
import { eventTypeUriFor } from '@/lib/calendly'

/**
 * POST /api/calendly/book
 * body: { locale, startTime (ISO), name, email, timezone, phone? }
 *
 * Server-side proxy for Calendly's Scheduling API:
 *   POST /invitees
 *
 * Creates a real booking on the host's calendar — fires the same host
 * notifications, calendar invites, and workflows as a booking made
 * through Calendly's own scheduling page. PAT stays server-side.
 */
export async function POST(req: NextRequest) {
  const pat = process.env.CALENDLY_PAT
  if (!pat) {
    return NextResponse.json(
      { error: 'CALENDLY_PAT is not configured on the server' },
      { status: 500 },
    )
  }

  let payload: {
    locale?: string
    startTime?: string
    name?: string
    email?: string
    timezone?: string
    phone?: string
  }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const locale = payload.locale || 'en'
  const { startTime, name, email, timezone } = payload

  if (!startTime || !name || !email || !timezone) {
    return NextResponse.json(
      { error: 'startTime, name, email, and timezone are required' },
      { status: 400 },
    )
  }

  const eventUri = eventTypeUriFor(locale)

  // The Demo With Eazybe event type is configured for Google Meet and
  // requires a "Whatsapp Number?" custom answer. Note: Calendly's public
  // Scheduling API uses a TOP-LEVEL `location` field — NOT the
  // `event.location_configuration.kind` shape the error message points at.
  // See https://community.calendly.com/api-webhook-help-61/post-invitees-returning-invalid-location-choice-even-when-event-type-locations-matches-location-configuration-kind-5384
  const calendlyPayload: Record<string, unknown> = {
    event_type: eventUri,
    start_time: startTime,
    invitee: { name, email, timezone },
    location: { kind: 'google_conference' },
    booking_source: 'eazybe_website',
    ...(payload.phone
      ? {
          questions_and_answers: [
            { question: 'Whatsapp Number?', answer: payload.phone, position: 0 },
          ],
        }
      : {}),
  }

  const res = await fetch('https://api.calendly.com/invitees', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(calendlyPayload),
    cache: 'no-store',
  })

  const body = await res.text()
  return new NextResponse(body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/json',
    },
  })
}
