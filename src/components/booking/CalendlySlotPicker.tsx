'use client'

/**
 * CalendlySlotPicker — 7-day date strip + time slots + book button.
 * Reused inside DemoModal and BeaBot's LeadGenerationForm so both flows
 * can convert a captured lead into a real Calendly booking in-place,
 * without navigating away.
 *
 * All Calendly calls go through /api/calendly/{available-times,book},
 * which use the CALENDLY_PAT env var server-side.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Loader2, Send, CheckCircle2 } from 'lucide-react'

const DAY_MS = 24 * 60 * 60 * 1000
const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
// Same as dateKey but the day is computed IN THE TARGET TIMEZONE, not the
// browser's local zone. Needed so a Brazilian slot at 20:00 UTC on Aug 28
// (5:00 PM São Paulo) doesn't get bucketed as Aug 29 when the browser is
// in India. `en-CA` gives us a stable "YYYY-MM-DD" shape from formatToParts.
const dateKeyInTz = (d: Date, tz: string) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(d)
  const y = parts.find((p) => p.type === 'year')?.value
  const m = parts.find((p) => p.type === 'month')?.value
  const day = parts.find((p) => p.type === 'day')?.value
  return `${y}-${m}-${day}`
}
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY_MS)
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

// Friendly timezone label — "GMT−3" instead of the raw "America/Sao_Paulo".
// Falls back to the IANA id if the browser can't compute an offset.
function friendlyTz(tz: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
      hour: 'numeric',
    }).formatToParts(new Date())
    const name = parts.find((p) => p.type === 'timeZoneName')?.value
    if (name) return name.replace('GMT', 'GMT').replace('-', '−')
  } catch { /* ignore */ }
  return tz
}

interface CalendlyTimeSlot {
  status: string
  invitees_remaining: number
  start_time: string
  scheduling_url: string
  // Host-tz shift day this slot belongs to (YYYY-MM-DD). Groups all slots
  // of the same shift under one day tab regardless of how they map into
  // the visitor's calendar dates.
  shift_day?: string
  shift_weekday?: string
}

// Bridge: the picker used to fetch from /api/calendly/*. It now hits
// /api/gcal/* backed by Google Calendar directly (Fireflies gets auto-added
// as an attendee on every booking). The response shape from /api/gcal/slots
// intentionally mirrors Calendly's — no changes needed downstream.


interface Props {
  locale: string
  name: string
  email: string
  phone: string
  /**
   * Design system tone. 'light' matches DemoModal / marketing landing;
   * 'dark' matches BeaBot's dark corner form.
   */
  variant?: 'light' | 'dark'
  onSuccess?: (info: { startTime: string; timezone: string }) => void
}

interface PickerCopy {
  pickDay: string
  open: (n: number) => string
  full: string
  loading: string
  loadError: string
  slotTakenError: string
  networkError: string
  booking: string
  confirm: string
  pickTimeAbove: string
  bookedTitle: string
  bookedBody: (opts: { when: string; email: string }) => React.ReactNode
}

const PICKER_COPY: Record<string, PickerCopy> = {
  en: {
    pickDay: 'Pick a day',
    open: (n) => `${n} open`,
    full: 'Full',
    loading: 'Loading times…',
    loadError: 'Could not load available times. Please try again.',
    slotTakenError: "We couldn't book that time. Please pick another slot.",
    networkError: 'Network error. Please try again.',
    booking: 'Booking…',
    confirm: 'Confirm demo booking',
    pickTimeAbove: 'Pick a time above',
    bookedTitle: "You're booked",
    bookedBody: ({ when, email }) => (
      <>Calendar invite for <strong>{when}</strong> sent to {email}.</>
    ),
  },
  es: {
    pickDay: 'Elige un día',
    open: (n) => `${n} libres`,
    full: 'Lleno',
    loading: 'Cargando horarios…',
    loadError: 'No pudimos cargar los horarios disponibles. Vuelve a intentarlo.',
    slotTakenError: 'No pudimos reservar ese horario. Elige otro.',
    networkError: 'Error de red. Vuelve a intentarlo.',
    booking: 'Reservando…',
    confirm: 'Confirmar reserva de la demo',
    pickTimeAbove: 'Elige un horario arriba',
    bookedTitle: '¡Reservado!',
    bookedBody: ({ when, email }) => (
      <>Invitación de calendario para <strong>{when}</strong> enviada a {email}.</>
    ),
  },
  br: {
    pickDay: 'Escolha um dia',
    open: (n) => `${n} livres`,
    full: 'Lotado',
    loading: 'Carregando horários…',
    loadError: 'Não foi possível carregar os horários. Tente novamente.',
    slotTakenError: 'Não conseguimos reservar esse horário. Escolha outro.',
    networkError: 'Erro de rede. Tente novamente.',
    booking: 'Reservando…',
    confirm: 'Confirmar reserva da demo',
    pickTimeAbove: 'Escolha um horário acima',
    bookedTitle: 'Tudo certo!',
    bookedBody: ({ when, email }) => (
      <>Convite do calendário para <strong>{when}</strong> enviado para {email}.</>
    ),
  },
  tr: {
    pickDay: 'Bir gün seçin',
    open: (n) => `${n} müsait`,
    full: 'Dolu',
    loading: 'Saatler yükleniyor…',
    loadError: 'Uygun saatler yüklenemedi. Lütfen tekrar deneyin.',
    slotTakenError: 'O saat rezerve edilemedi. Lütfen başka bir saat seçin.',
    networkError: 'Ağ hatası. Lütfen tekrar deneyin.',
    booking: 'Rezerve ediliyor…',
    confirm: 'Demo rezervasyonunu onayla',
    pickTimeAbove: 'Yukarıdan bir saat seçin',
    bookedTitle: 'Rezerve edildi',
    bookedBody: ({ when, email }) => (
      <><strong>{when}</strong> için takvim daveti {email} adresine gönderildi.</>
    ),
  },
}

export const CalendlySlotPicker: React.FC<Props> = ({ locale, name, email, phone, variant = 'light', onSuccess }) => {
  const dark = variant === 'dark'
  const c = PICKER_COPY[locale] || PICKER_COPY.en

  // Raw slots keyed by their UTC ISO start_time. Grouping into per-day
  // buckets happens at render via useMemo so it respects the currently
  // resolved timezone (which arrives async from /api/geo).
  const [rawSlots, setRawSlots] = useState<CalendlyTimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  // Selected day is now a host-tz shift_day (YYYY-MM-DD) — slots are
  // grouped by shift rather than by the visitor's local calendar date.
  const [selectedShiftDay, setSelectedShiftDay] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<CalendlyTimeSlot | null>(null)
  // Starts as 'UTC' (a sentinel) during SSR / first hydration render, then
  // gets replaced with the browser's IANA zone in a mount effect below,
  // and again with the IP-based zone when /api/geo resolves. The slot
  // fetch is gated on `timezone !== 'UTC'` so we never actually fire a
  // request with the sentinel.
  const [timezone, setTimezone] = useState<string>('UTC')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const today = startOfDay(new Date())

  // Timezone priority:
  //   1) IP-based via /api/geo (VPN-aware — visitor sees times in the
  //      country their IP resolves to, not the OS clock).
  //   2) Browser Intl (OS timezone) as fallback.
  //   3) 'UTC' sentinel — the picker won't fetch while this is the state.
  useEffect(() => {
    let cancelled = false
    // Set browser tz synchronously on mount so we're never stuck on the
    // UTC sentinel — the fetch effect gates on tz !== 'UTC'.
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (!cancelled && tz) setTimezone(tz)
    } catch { /* ignore */ }
    fetch('/api/geo')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { timezone?: string | null } | null) => {
        if (!cancelled && data?.timezone) setTimezone(data.timezone)
      })
      .catch(() => { /* keep browser fallback */ })
    return () => { cancelled = true }
  }, [])

  // A monotonic token to invalidate in-flight fetches. If timezone
  // changes (VPN case), the previous fetch's response is thrown away.
  const fetchTokenRef = React.useRef(0)

  const fetchSlots = useCallback(async () => {
    // 'UTC' is our sentinel for "haven't detected a real tz yet" (SSR /
    // pre-hydration). Never send that to the server — the visitor's 10-10
    // window would come back in the wrong timezone and get bucketed at
    // absurd hours in the browser.
    if (timezone === 'UTC') return
    const token = ++fetchTokenRef.current
    setLoadingSlots(true)
    setSlotsError('')
    const now = new Date()
    const start = new Date(now.getTime() + 60_000)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const end = new Date(startOfToday.getTime() + 14 * DAY_MS - 1)
    try {
      const url = new URL('/api/gcal/slots', window.location.origin)
      url.searchParams.set('start', start.toISOString())
      url.searchParams.set('end', end.toISOString())
      url.searchParams.set('tz', timezone)
      const res = await fetch(url.toString())
      if (token !== fetchTokenRef.current) return // stale
      if (!res.ok) throw new Error(`slots ${res.status}`)
      const data = (await res.json()) as { collection?: CalendlyTimeSlot[] }
      if (token !== fetchTokenRef.current) return
      const available = (data.collection || []).filter(
        (s) => s.status === 'available' && s.invitees_remaining > 0,
      )
      available.sort((a, b) => a.start_time.localeCompare(b.start_time))
      setRawSlots(available)
    } catch (err) {
      if (token !== fetchTokenRef.current) return
      console.error('GCal slots fetch failed:', err)
      setSlotsError(c.loadError)
    } finally {
      if (token === fetchTokenRef.current) setLoadingSlots(false)
    }
  }, [timezone])

  useEffect(() => { fetchSlots() }, [fetchSlots])

  // Group by the server-emitted host-tz shift_day.
  const slotsByShift = useMemo(() => {
    const grouped: Record<string, CalendlyTimeSlot[]> = {}
    rawSlots.forEach((s) => {
      const k = s.shift_day || dateKeyInTz(new Date(s.start_time), timezone)
      if (!grouped[k]) grouped[k] = []
      grouped[k].push(s)
    })
    return grouped
  }, [rawSlots, timezone])

  // Ordered list of shift days present in the response — this drives the
  // day strip. Each entry carries the weekday from the host-tz calendar.
  const shiftDays = useMemo(() => {
    const seen: Record<string, string> = {}
    rawSlots.forEach((s) => {
      if (s.shift_day && !seen[s.shift_day]) seen[s.shift_day] = s.shift_weekday || ''
    })
    return Object.keys(seen).sort().map((sd) => {
      const [y, m, d] = sd.split('-').map(Number)
      return { shift_day: sd, weekday: seen[sd], y, m, d }
    })
  }, [rawSlots])

  // Auto-select the first shift day with slots.
  useEffect(() => {
    if (selectedShiftDay) return
    const first = shiftDays.find((sd) => (slotsByShift[sd.shift_day] || []).length > 0)
    if (first) setSelectedShiftDay(first.shift_day)
  }, [shiftDays, slotsByShift, selectedShiftDay])

  const handleBook = async () => {
    if (!selectedSlot || isSubmitting) return
    setIsSubmitting(true)
    setBookingError('')
    try {
      const res = await fetch('/api/gcal/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale, startTime: selectedSlot.start_time,
          name: name.trim() || email.split('@')[0], email: email.trim(), timezone, phone,
        }),
      })
      if (!res.ok) {
        console.error('GCal booking failed:', res.status, await res.text().catch(() => ''))
        setBookingError(c.slotTakenError)
        setIsSubmitting(false)
        fetchSlots()
        return
      }
      setIsSuccess(true)
      setIsSubmitting(false)
      onSuccess?.({ startTime: selectedSlot.start_time, timezone })
    } catch (err) {
      console.error('Calendly booking network error:', err)
      setBookingError(c.networkError)
      setIsSubmitting(false)
    }
  }

  // ── palette ──
  const p = dark
    ? {
        // Bea corner form has a very dark background; use fully opaque
        // near-white tiles so the day numbers actually read at glance.
        text: '#0F172A', textMuted: '#CBD5E1', textDim: '#94A3B8',
        bg: 'transparent', bgMuted: 'rgba(255,255,255,0.06)',
        border: 'rgba(255,255,255,0.18)', borderStrong: 'rgba(255,255,255,0.55)',
        cellBg: 'rgba(255,255,255,0.92)', cellBgActive: '#5B4BAE',
        pillBg: 'rgba(255,255,255,0.92)',
        err: '#F87171',
        gradient: 'linear-gradient(135deg, #7B65F0 0%, #5B4BAE 55%, #7FD6B0 130%)',
      }
    : {
        text: '#0F1115', textMuted: '#5A6070', textDim: '#8A90A0',
        bg: 'transparent', bgMuted: '#ECEFF7',
        border: '#E4E8F1', borderStrong: '#D4D9E5',
        cellBg: '#fff', cellBgActive: '#5B4BAE',
        pillBg: '#fff',
        err: '#C26A5A',
        gradient: 'linear-gradient(135deg, #7B65F0 0%, #5B4BAE 50%, #7FD6B0 130%)',
      }

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '8px 4px' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: dark ? 'rgba(127,214,176,0.18)' : 'rgba(127,214,176,0.22)',
          color: '#7FD6B0',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12,
        }}>
          <CheckCircle2 size={28} />
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: p.text, marginBottom: 6 }}>{c.bookedTitle}</div>
        <div style={{ fontSize: 13, color: p.textMuted, lineHeight: 1.5 }}>
          Calendar invite for{' '}
          <strong style={{ color: p.text }}>
            {selectedSlot ? new Date(selectedSlot.start_time).toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
              weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: timezone,
            }) : ''}
          </strong>{' '}
          sent to {email}.
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.textMuted, marginBottom: 8 }}>
        Pick a day
      </div>
      {(() => {
        // Day strip is now driven by the server's shift_days (host tz).
        // We show up to 7 upcoming shift days.
        const days = shiftDays.slice(0, 7)
        if (days.length === 0) return null
        return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${days.length}, 1fr)`, gap: 4, marginBottom: 12 }}>
        {days.map(({ shift_day, weekday, y, m, d }) => {
          const daySlots = slotsByShift[shift_day] || []
          const available = daySlots.length > 0
          const isSelected = selectedShiftDay === shift_day
          // Weekday label localized via the locale param, computed from
          // the host-tz calendar date (parsed as UTC to match the emitter).
          const localized = new Date(Date.UTC(y, m - 1, d)).toLocaleString(
            locale === 'br' ? 'pt-BR' : locale,
            { weekday: 'short', timeZone: 'UTC' },
          ).slice(0, 3)
          return (
            <button
              key={shift_day}
              type="button"
              disabled={!available}
              onClick={() => { setSelectedShiftDay(shift_day); setSelectedSlot(null) }}
              style={{
                padding: '8px 2px',
                borderRadius: 10,
                border: '1px solid',
                borderColor: isSelected ? '#5B4BAE' : available ? p.borderStrong : p.border,
                background: isSelected ? p.gradient : available ? p.cellBg : p.bgMuted,
                color: isSelected ? '#fff' : available ? p.text : p.textDim,
                cursor: available ? 'pointer' : 'not-allowed',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                fontFamily: 'inherit',
                boxShadow: isSelected ? '0 6px 16px -6px rgba(91,75,174,0.55)' : 'none',
                transition: 'background .12s, border-color .12s',
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.85 }}>
                {localized || weekday}
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{d}</span>
              <span style={{ fontSize: 8.5, fontWeight: 600, opacity: 0.75 }}>
                {available ? c.open(daySlots.length) : c.full}
              </span>
            </button>
          )
        })}
      </div>
        )
      })()}

      {slotsError ? (
        <div style={{ fontSize: 12, color: p.err, marginBottom: 10 }}>{slotsError}</div>
      ) : loadingSlots ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: p.textMuted, fontSize: 12, marginBottom: 10 }}>
          <Loader2 size={12} className="animate-spin" /> {c.loading}
        </div>
      ) : selectedShiftDay ? (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: p.textMuted, marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {(() => {
              const [y, m, d] = selectedShiftDay.split('-').map(Number)
              return new Date(Date.UTC(y, m - 1, d)).toLocaleString(
                locale === 'br' ? 'pt-BR' : locale,
                { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' },
              )
            })()}
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(76px, 1fr))', gap: 4,
            maxHeight: 148, overflowY: 'auto', paddingRight: 2,
          }}>
            {(slotsByShift[selectedShiftDay] || []).map((slot) => {
              const isSelected = selectedSlot?.start_time === slot.start_time
              return (
                <button
                  key={slot.start_time}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 8,
                    fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
                    border: `1px solid ${isSelected ? '#5B4BAE' : p.borderStrong}`,
                    background: isSelected ? p.gradient : p.pillBg,
                    color: isSelected ? '#fff' : p.text,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 6px 16px -6px rgba(91,75,174,0.55)' : 'none',
                    transition: 'background .12s, border-color .12s',
                  }}
                >
                  {new Date(slot.start_time).toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
                    hour: 'numeric', minute: '2-digit', timeZone: timezone,
                  })}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {bookingError && (
        <div style={{ fontSize: 12, color: p.err, marginBottom: 8 }}>{bookingError}</div>
      )}

      <button
        type="button"
        onClick={handleBook}
        disabled={!selectedSlot || isSubmitting}
        style={{
          width: '100%',
          padding: '13px 18px',
          fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
          color: '#fff',
          background: selectedSlot && !isSubmitting ? p.gradient : p.bgMuted,
          border: 'none',
          borderRadius: 999,
          cursor: selectedSlot && !isSubmitting ? 'pointer' : 'not-allowed',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: selectedSlot && !isSubmitting ? '0 12px 26px -12px rgba(91,75,174,0.6), inset 0 -1px 0 rgba(255,255,255,0.14)' : 'none',
          transition: 'transform .12s, box-shadow .2s',
        }}
      >
        {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={13} />}
        {isSubmitting ? c.booking : selectedSlot ? c.confirm : c.pickTimeAbove}
      </button>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}
