import { NextRequest, NextResponse } from 'next/server'
import { eventTypeUriFor } from '@/lib/calendly'

/**
 * GET /api/calendly/available-times?locale=en&start=ISO&end=ISO
 *
 * Server-side proxy for Calendly's
 *   GET /event_types/{uuid}/available_times?start_time&end_time
 *
 * Keeps CALENDLY_PAT out of the browser bundle. Calendly caps a single
 * request to a 7-day range, so callers should paginate week-by-week for
 * a month-view calendar.
 */
export async function GET(req: NextRequest) {
  const pat = process.env.CALENDLY_PAT
  if (!pat) {
    return NextResponse.json(
      { error: 'CALENDLY_PAT is not configured on the server' },
      { status: 500 },
    )
  }

  const url = new URL(req.url)
  const locale = url.searchParams.get('locale') || 'en'
  const start = url.searchParams.get('start')
  const end = url.searchParams.get('end')

  if (!start || !end) {
    return NextResponse.json(
      { error: 'start and end (ISO 8601) query params are required' },
      { status: 400 },
    )
  }

  const eventUri = eventTypeUriFor(locale)
  const calendlyUrl = new URL('https://api.calendly.com/event_type_available_times')
  calendlyUrl.searchParams.set('event_type', eventUri)
  calendlyUrl.searchParams.set('start_time', start)
  calendlyUrl.searchParams.set('end_time', end)

  const res = await fetch(calendlyUrl.toString(), {
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/json',
    },
    // Available-time snapshots move — don't let the CDN cache them.
    cache: 'no-store',
  })

  const body = await res.text()
  return new NextResponse(body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/json',
      // Client-side cache: 60s. Slots don't change second-to-second and this
      // keeps the modal snappy if the visitor bounces around the calendar.
      'Cache-Control': 'private, max-age=60',
    },
  })
}
