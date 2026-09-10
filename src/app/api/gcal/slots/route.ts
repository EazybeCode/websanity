import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { authedClient, calendarId } from '@/lib/gcal'

export const dynamic = 'force-dynamic'

/**
 * GET /api/gcal/slots?start=ISO&end=ISO&tz=Asia/Kolkata
 *
 * Returns available 30-min slots for demos, in the response shape the
 * existing SlotPicker consumes:
 *   { collection: [{ start_time, status, invitees_remaining, scheduling_url }] }
 *
 * Availability rule:
 *   - Mon–Sat 10:00–22:00 in the VISITOR's timezone (Sunday excluded).
 *   - Slot must not overlap any busy block on the host's calendar
 *     (via Calendar API `freebusy.query`).
 *   - Slot must start at least 60 minutes from now.
 *
 * Slot length is 30 min; buffer between meetings is 10 min (enforced by
 * treating each booking as busy for its 30-min duration — a naturally
 * created event with a 30-min duration blocks anything overlapping it).
 */

const SLOT_MINUTES = 30
const MIN_LEAD_MINUTES = 60
// The shift is defined in the VISITOR'S timezone. A Monday shift starts
// 11:00 AM VISITOR-tz Mon and runs to 02:30 AM VISITOR-tz Tue — 15h30.
// The host accepts whatever hour lands on their calendar. Slots carry
// `shift_day` (visitor-tz date of the shift start) so all slots of one
// shift stay under a single day tab, including the 11 PM → 2 AM tail.
const SHIFT_START_MINUTES_FROM_MIDNIGHT = 11 * 60 // 11:00 AM visitor tz
const SHIFT_LENGTH_MINUTES = 15 * 60 + 30         // 15h30 → ends 02:30 next day
const SHIFT_LAST_SLOT_OFFSET = SHIFT_LENGTH_MINUTES - SLOT_MINUTES // last slot start

/**
 * Format `d` as "YYYY-MM-DDTHH:mm:ss" in the given IANA timezone.
 * Uses Intl to project into the target zone; safer than manual offset math.
 */
function partsInTz(d: Date, tz: string) {
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, weekday: 'short',
  })
  const parts = dtf.formatToParts(d)
  const map: Record<string, string> = {}
  for (const p of parts) map[p.type] = p.value
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour === '24' ? '0' : map.hour),
    minute: Number(map.minute),
    weekday: map.weekday, // "Mon", "Sun", etc. (en-CA locale)
  }
}

/**
 * Given (year, month, day, hour, minute) in `tz`, return the corresponding
 * absolute Date. Handles the fact that new Date(y,m,d,h,mi) uses SYSTEM
 * local time; we adjust by the UTC offset for `tz` at that moment.
 */
function tzDateToUtc(y: number, m: number, d: number, h: number, mi: number, tz: string): Date {
  // Seed with UTC guess, then correct by measuring the offset the target
  // zone applies at that instant.
  const asUtc = Date.UTC(y, m - 1, d, h, mi, 0)
  const guess = new Date(asUtc)
  const guessParts = partsInTz(guess, tz)
  const asIfTz = Date.UTC(
    guessParts.year, guessParts.month - 1, guessParts.day,
    guessParts.hour, guessParts.minute, 0,
  )
  const offsetMs = asIfTz - asUtc
  return new Date(asUtc - offsetMs)
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const startParam = url.searchParams.get('start')
    const endParam = url.searchParams.get('end')
    // `tz` is the visitor's timezone (from IP or browser). The shift is
    // generated in this zone so the visitor always sees 11:00 AM – 02:30 AM
    // in their own clock. Defaults to Asia/Kolkata if omitted.
    const tz = url.searchParams.get('tz') || 'Asia/Kolkata'
    if (!startParam || !endParam) {
      return NextResponse.json({ error: 'start and end (ISO) required' }, { status: 400 })
    }
    const rangeStart = new Date(startParam)
    const rangeEnd = new Date(endParam)
    const now = new Date()
    const earliest = new Date(now.getTime() + MIN_LEAD_MINUTES * 60_000)

    // 1. Ask Google for busy blocks over the full range on the host calendar.
    const auth = authedClient()
    const cal = google.calendar({ version: 'v3', auth })
    const fb = await cal.freebusy.query({
      requestBody: {
        timeMin: rangeStart.toISOString(),
        timeMax: rangeEnd.toISOString(),
        items: [{ id: calendarId() }],
      },
    })
    const busy = (fb.data.calendars?.[calendarId()]?.busy || []).map((b) => ({
      start: new Date(b.start!),
      end: new Date(b.end!),
    }))
    const overlapsBusy = (s: Date, e: Date) =>
      busy.some((b) => s < b.end && e > b.start)

    // 2. Walk each calendar day in tz; for each Mon–Sat day, emit every
    //    30-min slot from 11:00 AM host-tz to 02:00 AM next day host-tz.
    //    Each slot carries `shift_day` (host-tz YYYY-MM-DD) so the client
    //    can group all slots of one shift under one day tab, regardless of
    //    how the shift maps into the visitor's calendar dates.
    const collection: Array<{
      start_time: string
      status: 'available'
      invitees_remaining: 1
      scheduling_url: string
      shift_day: string
      shift_weekday: string
    }> = []

    // Iterate day-by-day in tz.
    const startParts = partsInTz(rangeStart, tz)
    let cursorY = startParts.year
    let cursorM = startParts.month
    let cursorD = startParts.day

    for (let dayIdx = 0; dayIdx < 14; dayIdx++) {
      const dayMidnight = tzDateToUtc(cursorY, cursorM, cursorD, 0, 0, tz)
      if (dayMidnight.getTime() >= rangeEnd.getTime()) break

      const dp = partsInTz(dayMidnight, tz)
      const isSunday = dp.weekday === 'Sun'
      if (!isSunday) {
        const shiftDay = `${cursorY}-${String(cursorM).padStart(2, '0')}-${String(cursorD).padStart(2, '0')}`
        for (let off = 0; off <= SHIFT_LAST_SLOT_OFFSET; off += SLOT_MINUTES) {
          const totalMin = SHIFT_START_MINUTES_FROM_MIDNIGHT + off
          const dayShift = Math.floor(totalMin / (24 * 60)) // 0 or 1 (past midnight)
          const h = Math.floor(totalMin / 60) % 24
          const mi = totalMin % 60
          const slotStart = tzDateToUtc(cursorY, cursorM, cursorD + dayShift, h, mi, tz)
          const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60_000)
          if (slotStart < earliest) continue
          if (slotStart < rangeStart) continue
          if (slotEnd > rangeEnd) continue
          if (overlapsBusy(slotStart, slotEnd)) continue
          collection.push({
            start_time: slotStart.toISOString(),
            status: 'available',
            invitees_remaining: 1,
            scheduling_url: '',
            shift_day: shiftDay,
            shift_weekday: dp.weekday,
          })
        }
      }

      const nextMidnight = new Date(dayMidnight.getTime() + 26 * 3600_000)
      const np = partsInTz(nextMidnight, tz)
      cursorY = np.year
      cursorM = np.month
      cursorD = np.day
    }

    return NextResponse.json(
      { collection },
      { headers: { 'Cache-Control': 'private, max-age=60' } },
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[gcal/slots]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
