import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { authedClient, calendarId, firefliesEmail } from '@/lib/gcal'

export const dynamic = 'force-dynamic'

/**
 * POST /api/gcal/book
 * body: { startTime (ISO), name, email, timezone, phone?, crm?, locale? }
 *
 * Creates a 30-min event on the host calendar with:
 *   - Google Meet link (auto-generated via conferenceData.createRequest)
 *   - Visitor as attendee (invite email sent by Google)
 *   - Fireflies notetaker email as attendee (auto-joins the Meet, records)
 *   - Description carrying phone + CRM so the host sees context on the event
 *
 * sendUpdates: 'all' makes Google email the invite to every attendee.
 */

const SLOT_MINUTES = 30

interface Payload {
  startTime?: string
  name?: string
  email?: string
  timezone?: string
  phone?: string
  crm?: string
  locale?: string
}

export async function POST(req: NextRequest) {
  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const { startTime, name, email, timezone, phone, crm, locale } = body
  if (!startTime || !email || !timezone) {
    return NextResponse.json(
      { error: 'startTime, email, timezone are required' },
      { status: 400 },
    )
  }

  const start = new Date(startTime)
  const end = new Date(start.getTime() + SLOT_MINUTES * 60_000)

  const attendees = [{ email: email.trim() }] as Array<{ email: string }>
  const ff = firefliesEmail()
  if (ff) attendees.push({ email: ff })

  const summary = `Eazybe Demo — ${name?.trim() || email.split('@')[0]}`
  const descriptionLines = [
    `Booked via eazybe.com${locale && locale !== 'en' ? ` (${locale})` : ''}`,
    email ? `Email: ${email}` : null,
    phone ? `WhatsApp: ${phone}` : null,
    crm ? `CRM: ${crm}` : null,
  ].filter(Boolean) as string[]

  try {
    const auth = authedClient()
    const cal = google.calendar({ version: 'v3', auth })
    const res = await cal.events.insert({
      calendarId: calendarId(),
      sendUpdates: 'all',
      conferenceDataVersion: 1,
      requestBody: {
        summary,
        description: descriptionLines.join('\n'),
        start: { dateTime: start.toISOString(), timeZone: timezone },
        end: { dateTime: end.toISOString(), timeZone: timezone },
        attendees,
        conferenceData: {
          createRequest: {
            requestId: `eazybe-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      },
    })
    const ev = res.data
    return NextResponse.json({
      ok: true,
      eventId: ev.id,
      hangoutLink: ev.hangoutLink,
      htmlLink: ev.htmlLink,
      start: ev.start?.dateTime,
      end: ev.end?.dateTime,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[gcal/book]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
