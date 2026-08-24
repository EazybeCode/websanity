'use client'

/**
 * DemoModal — fully custom two-column Book-a-Demo flow.
 *
 *   left  = lead form (Name + Work Email + Phone)  → HubSpot lead capture
 *   right = custom date picker + time-slot picker  → Calendly booking via
 *           our /api/calendly/* server-side proxy (Calendly PAT stays
 *           on the server; the browser never sees it)
 *
 * On "Book my demo" both writes fire in parallel:
 *   - HubSpot Forms API POST (fire-and-forget, keepalive)
 *   - POST /api/calendly/book -> Calendly POST /invitees
 * When the Calendly write returns 2xx the modal flips to a success screen.
 * Calendly's normal notifications, calendar invites, and workflows all fire
 * because we go through their real invitee-create endpoint — no iframe,
 * no external redirect, no Calendly-hosted confirmation page.
 */

import React, { useCallback, useEffect, useState } from 'react'
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import {
  CHROME_STORE_WEBSITE_URL,
  getHubSpotAttributionFields,
} from '@/utils/openChromeExtensionStore'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const HUBSPOT_PORTAL_ID = '40009480'
const HUBSPOT_DEMO_FORM_GUID_BY_LOCALE: Record<string, string> = {
  en: '470166e7-1418-4bd9-9e1e-7252ad54070b',
  es: 'e6630d0e-f941-42e0-abd5-c3686e4ce16c',
  br: '922fbde6-ba79-4c8e-b784-a7bf67ef3708',
  tr: '470166e7-1418-4bd9-9e1e-7252ad54070b',
}
const DEFAULT_HUBSPOT_DEMO_FORM_GUID = HUBSPOT_DEMO_FORM_GUID_BY_LOCALE.en

const COUNTRY_TO_PHONE: Record<string, string> = {
  US: '+1', CA: '+1', MX: '+52',
  GB: '+44', DE: '+49', FR: '+33', ES: '+34', IT: '+39', NL: '+31', BE: '+32', CH: '+41', AT: '+43',
  DK: '+45', SE: '+46', NO: '+47', PL: '+48', PT: '+351', IE: '+353', IS: '+354', FI: '+358',
  GR: '+30', CZ: '+420', HU: '+36', RO: '+40', UA: '+380', RU: '+7', TR: '+90',
  BR: '+55', AR: '+54', CL: '+56', CO: '+57', PE: '+51', VE: '+58', EC: '+593',
  IN: '+91', CN: '+86', JP: '+81', KR: '+82', HK: '+852', TW: '+886', SG: '+65', MY: '+60',
  ID: '+62', PH: '+63', TH: '+66', VN: '+84', BD: '+880', PK: '+92', LK: '+94', NP: '+977',
  AE: '+971', SA: '+966', QA: '+974', BH: '+973', OM: '+968', KW: '+965', IL: '+972', JO: '+962', LB: '+961', IR: '+98', IQ: '+964',
  AU: '+61', NZ: '+64',
  ZA: '+27', NG: '+234', KE: '+254', EG: '+20', MA: '+212', DZ: '+213', TN: '+216', GH: '+233', UG: '+256', TZ: '+255', ET: '+251',
}

const COUNTRY_CODES = [
  { code: '+1', label: 'US/CA' }, { code: '+52', label: 'MX' },
  { code: '+44', label: 'UK' }, { code: '+49', label: 'DE' }, { code: '+33', label: 'FR' },
  { code: '+34', label: 'ES' }, { code: '+39', label: 'IT' }, { code: '+31', label: 'NL' },
  { code: '+55', label: 'BR' }, { code: '+54', label: 'AR' },
  { code: '+91', label: 'IN' }, { code: '+86', label: 'CN' }, { code: '+81', label: 'JP' },
  { code: '+82', label: 'KR' }, { code: '+65', label: 'SG' }, { code: '+60', label: 'MY' },
  { code: '+62', label: 'ID' }, { code: '+63', label: 'PH' }, { code: '+66', label: 'TH' },
  { code: '+84', label: 'VN' }, { code: '+971', label: 'UAE' }, { code: '+966', label: 'SA' },
  { code: '+90', label: 'TR' }, { code: '+61', label: 'AU' }, { code: '+64', label: 'NZ' },
  { code: '+27', label: 'ZA' }, { code: '+234', label: 'NG' }, { code: '+254', label: 'KE' },
  { code: '+20', label: 'EG' },
]

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  'icloud.com', 'aol.com', 'mail.com', 'protonmail.com', 'zoho.com',
  'yandex.com', 'gmx.com',
]

// Landing tokens inlined so the modal renders correctly even on pages
// that don't load landing-v3.css.
const C = {
  paper: '#FBFCFE', bg2: '#ECEFF7',
  ink: '#0F1115', ink2: '#2A2E38', ink3: '#5A6070', ink4: '#8A90A0',
  line: '#E4E8F1', line2: '#D4D9E5',
  accentInk: '#5B4BAE', accentMint: '#7FD6B0',
  err: '#C26A5A', ok: '#5B8F6F',
}
const serif = "'Instrument Serif', Georgia, serif"
const sans = "'Geist', 'Inter', system-ui, sans-serif"

// ── date helpers ────────────────────────────────────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000
const iso = (d: Date) => d.toISOString()
const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY_MS)
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

interface CalendlyTimeSlot {
  status: string
  invitees_remaining: number
  start_time: string // ISO
  scheduling_url: string
}

export const DemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const t = useTranslations('demoModal')
  const tTrial = useTranslations('trialModal')
  const locale = useLocale()

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('+1')
  const [phone, setPhone] = useState('')
  const [emailError, setEmailError] = useState('')

  // Calendar / booking state
  const [slotsByDate, setSlotsByDate] = useState<Record<string, CalendlyTimeSlot[]>>({})
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<CalendlyTimeSlot | null>(null)
  const [timezone, setTimezone] = useState<string>('UTC')

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Auto-detect country + timezone on open.
  useEffect(() => {
    if (!isOpen) return
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC')
    } catch {
      /* keep default */
    }
    const detect = async () => {
      try {
        const res = await fetch('https://api.country.is/')
        const data = await res.json()
        if (data.country && COUNTRY_TO_PHONE[data.country]) {
          setSelectedCountry(COUNTRY_TO_PHONE[data.country])
        }
      } catch {
        try {
          const browserLocale = navigator.language || (navigator as any).userLanguage
          const countryCode = browserLocale?.split('-')[1]?.toUpperCase()
          if (countryCode && COUNTRY_TO_PHONE[countryCode]) setSelectedCountry(COUNTRY_TO_PHONE[countryCode])
        } catch { /* ignore */ }
      }
    }
    detect()
  }, [isOpen])

  // Reset on close so the next visitor gets a clean form.
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitting(false)
      setEmailError('')
      setBookingError('')
      setIsSuccess(false)
      setSelectedDate(null)
      setSelectedSlot(null)
    }
  }, [isOpen])

  // Fetch the next 7 days of available slots (one API call — Calendly's
  // per-request cap is 7 days, which matches the visible date strip).
  const fetchNext7Days = useCallback(async () => {
    setLoadingSlots(true)
    setSlotsError('')
    const now = new Date()
    const start = new Date(now.getTime() + 60_000)
    // End of the 7th day from today (inclusive), so a 7-slot strip has
    // every day fully covered.
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const end = new Date(startOfToday.getTime() + 7 * DAY_MS - 1)

    try {
      const url = new URL('/api/calendly/available-times', window.location.origin)
      url.searchParams.set('locale', locale)
      url.searchParams.set('start', iso(start))
      url.searchParams.set('end', iso(end))
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error(`Failed to load slots (${res.status})`)
      const data = (await res.json()) as { collection?: CalendlyTimeSlot[] }
      const grouped: Record<string, CalendlyTimeSlot[]> = {}
      ;(data.collection || []).forEach((slot) => {
        if (slot.status !== 'available' || slot.invitees_remaining <= 0) return
        const d = new Date(slot.start_time)
        const k = dateKey(d)
        if (!grouped[k]) grouped[k] = []
        grouped[k].push(slot)
      })
      setSlotsByDate(grouped)
      // Auto-select the earliest date that has any open slots so the user
      // lands on a state where time slots are already visible below.
      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfToday.getTime() + i * DAY_MS)
        if ((grouped[dateKey(d)] || []).length > 0) {
          setSelectedDate(d)
          break
        }
      }
    } catch (err) {
      console.error('Calendly available-times fetch failed:', err)
      setSlotsError('Could not load available times. Please try again.')
    } finally {
      setLoadingSlots(false)
    }
  }, [locale])

  useEffect(() => {
    if (!isOpen) return
    setSelectedDate(null)
    setSelectedSlot(null)
    fetchNext7Days()
  }, [isOpen, fetchNext7Days])

  const today = startOfDay(new Date())

  const isPersonalEmail = (e: string) => {
    const domain = e.split('@')[1]?.toLowerCase()
    return PERSONAL_EMAIL_DOMAINS.includes(domain || '')
  }

  const handleEmailChange = (v: string) => {
    setEmail(v)
    if (v && v.includes('@') && isPersonalEmail(v)) setEmailError(tTrial('workEmailError'))
    else setEmailError('')
  }

  const formValid =
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    !isPersonalEmail(email) &&
    phone.replace(/\D/g, '').length >= 6

  const canBook = formValid && !!selectedSlot && !isSubmitting

  const handleBook = async () => {
    if (!canBook || !selectedSlot) return
    setIsSubmitting(true)
    setBookingError('')

    const finalPhone = `${selectedCountry}${phone.replace(/\s+/g, '')}`
    const formGuid = HUBSPOT_DEMO_FORM_GUID_BY_LOCALE[locale] || DEFAULT_HUBSPOT_DEMO_FORM_GUID

    // 1) HubSpot lead capture — fire-and-forget with keepalive so the write
    //    survives the state change to the success screen. Errors are logged,
    //    not blocking — the booking still lands.
    try {
      const hutk = document.cookie.split(';').find(c => c.trim().startsWith('hubspotutk='))?.split('=')[1]
      const [firstname, ...rest] = name.trim().split(/\s+/)
      const lastname = rest.join(' ')
      const fields: { name: string; value: string }[] = [
        { name: 'firstname', value: firstname || name.trim() },
        { name: 'lastname', value: lastname },
        { name: 'email', value: email.trim() },
        { name: 'phone', value: finalPhone },
        { name: 'crm_used', value: 'Other' },
        { name: 'source_name', value: 'website-demo' },
      ]
      fields.push(...getHubSpotAttributionFields(CHROME_STORE_WEBSITE_URL))
      const hsPayload = {
        portalId: HUBSPOT_PORTAL_ID,
        formGuid,
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title || 'EazyBe Website',
          ...(hutk ? { hutk } : {}),
        },
      }
      fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formGuid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hsPayload),
        keepalive: true,
      }).catch((err) => console.error('Demo HubSpot submit failed:', err))
      ;(window as any).gtag?.('event', `book_demo_submit_${locale}`)
    } catch (err) {
      console.error('Demo HubSpot prep failed:', err)
    }

    // 2) Actual Calendly booking via server proxy.
    try {
      const res = await fetch('/api/calendly/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          startTime: selectedSlot.start_time,
          name: name.trim(),
          email: email.trim(),
          timezone,
          phone: finalPhone,
        }),
      })
      if (!res.ok) {
        const errText = await res.text().catch(() => '')
        console.error('Calendly booking failed:', res.status, errText)
        setBookingError('We couldn\'t book that time. Please pick another slot or try again.')
        setIsSubmitting(false)
        // Refresh slots — the one they picked may have been taken.
        fetchNext7Days()
        return
      }
      setIsSuccess(true)
      setIsSubmitting(false)
    } catch (err) {
      console.error('Calendly booking network error:', err)
      setBookingError('Network error while booking. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        background: 'rgba(15,17,21,0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflowY: 'auto',
        fontFamily: sans,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: isSuccess ? 520 : 1080,
          background: C.paper,
          border: `1px solid ${C.line}`,
          borderRadius: 24,
          boxShadow: '0 32px 80px -24px rgba(15,17,21,0.35), 0 4px 16px -6px rgba(15,17,21,0.06)',
          padding: isSuccess ? '44px 40px 36px' : '32px 36px 30px',
          transition: 'max-width .28s ease',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('closeAria')}
          style={{
            position: 'absolute', top: 14, right: 14,
            width: 32, height: 32, borderRadius: 999,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: C.ink3, background: 'transparent',
            border: `1px solid ${C.line}`,
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 4px 4px' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(127,214,176,0.18)', color: C.ok,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 18,
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 400,
              fontSize: 30, lineHeight: 1.12, letterSpacing: '-0.015em',
              color: C.ink, margin: 0,
            }}>
              You&apos;re booked
            </h2>
            <p style={{ marginTop: 10, marginBottom: 0, fontSize: 15, color: C.ink3 }}>
              Confirmation sent to <strong style={{ color: C.ink2 }}>{email}</strong>. A calendar invite for{' '}
              <strong style={{ color: C.ink2 }}>
                {selectedSlot ? new Date(selectedSlot.start_time).toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
                  weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: timezone,
                }) : ''}
              </strong>{' '}
              is on its way.
            </p>
          </div>
        ) : (
          <>
            <header style={{ marginBottom: 20, paddingRight: 40 }}>
              <h2 style={{
                fontFamily: serif, fontWeight: 400,
                fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.015em',
                color: C.ink, margin: 0,
              }}>
                {t.rich('heading', {
                  em: (chunks) => <em style={{ fontStyle: 'italic', color: C.accentInk }}>{chunks}</em>,
                })}
              </h2>
              <p style={{ marginTop: 6, marginBottom: 0, fontSize: 14, color: C.ink3 }}>
                Pick a time and tell us who you are — we&apos;ll take it from there.
              </p>
            </header>

            <div
              style={{
                display: 'grid',
                // Right column collapses once a time is picked so the user
                // sees only their form + a clean selected-slot summary.
                gridTemplateColumns: selectedSlot ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1.3fr)',
                gap: 28,
                alignItems: 'start',
                maxWidth: selectedSlot ? 520 : '100%',
                margin: selectedSlot ? '0 auto' : undefined,
                transition: 'max-width .3s ease',
              }}
              className="demo-modal-grid"
            >
              {/* ── LEFT: form ─────────────────────────────────────────── */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleBook() }}
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: C.ink2 }}>
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle(false)}
                  />
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: C.ink2 }}>
                    {t('emailLabel')}
                  </label>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    style={inputStyle(!!emailError)}
                  />
                  {emailError && (
                    <p style={{ fontSize: 12, color: C.err, marginTop: 2, marginBottom: 0 }}>{emailError}</p>
                  )}
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: C.ink2 }}>
                    {t('phoneLabel')}
                  </label>
                  <div style={{
                    display: 'flex', alignItems: 'stretch',
                    background: '#fff',
                    border: `1px solid ${C.line2}`,
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      style={{
                        minWidth: 96, padding: '12px 10px', fontSize: 13, fontFamily: sans,
                        color: C.ink2, background: 'transparent', border: 'none',
                        borderRight: `1px solid ${C.line}`, outline: 'none', cursor: 'pointer',
                      }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.code}-${c.label}`} value={c.code}>{c.label} {c.code}</option>
                      ))}
                    </select>
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder={t('phonePlaceholder')}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        flex: 1, padding: '12px 14px', fontSize: 14, fontFamily: sans,
                        color: C.ink, background: 'transparent', border: 'none', outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Selection summary — becomes a proper appointment card
                    the moment a time is picked. Includes a "change" link
                    so the visitor can go back to the picker even though
                    the calendar is now hidden. */}
                {selectedSlot ? (
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: 14,
                      background:
                        'linear-gradient(160deg, color-mix(in oklab, #6E5CE0 10%, #FBFCFE) 0%, color-mix(in oklab, #7FD6B0 6%, #FBFCFE) 100%)',
                      border: '1px solid color-mix(in oklab, #5B4BAE 30%, #E4E8F1)',
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.accentInk, marginBottom: 6 }}>
                      Your demo
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>
                      {new Date(selectedSlot.start_time).toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
                        weekday: 'long', month: 'short', day: 'numeric',
                      })}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: C.ink, marginTop: 2, letterSpacing: '-0.01em' }}>
                      {new Date(selectedSlot.start_time).toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
                        hour: 'numeric', minute: '2-digit', timeZone: timezone,
                      })}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.ink4, marginTop: 4 }}>
                      30 min · Google Meet · {timezone}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot(null)}
                      style={{
                        marginTop: 10,
                        padding: '0',
                        background: 'transparent',
                        border: 'none',
                        color: C.accentInk,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textDecorationColor: 'color-mix(in oklab, #5B4BAE 40%, transparent)',
                        textUnderlineOffset: 3,
                      }}
                    >
                      Change time
                    </button>
                  </div>
                ) : null}

                {bookingError && (
                  <p style={{ fontSize: 12.5, color: C.err, marginTop: 0, marginBottom: 0 }}>{bookingError}</p>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  {selectedSlot && (
                    <button
                      type="button"
                      onClick={() => setSelectedSlot(null)}
                      disabled={isSubmitting}
                      aria-label="Go back to time picker"
                      style={{
                        padding: '15px 18px',
                        fontSize: 14, fontWeight: 700, fontFamily: sans,
                        color: C.ink2,
                        background: '#fff',
                        border: `1px solid ${C.line2}`,
                        borderRadius: 999,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        transition: 'background .12s ease, border-color .12s ease',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        if (isSubmitting) return
                        e.currentTarget.style.background = C.bg2
                        e.currentTarget.style.borderColor = C.line
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff'
                        e.currentTarget.style.borderColor = C.line2
                      }}
                    >
                      ← Back
                    </button>
                  )}
                <button
                  type="submit"
                  disabled={!canBook}
                  style={{
                    flex: 1,
                    padding: '15px 22px',
                    fontSize: 15, fontWeight: 700, fontFamily: sans, letterSpacing: '-0.005em',
                    color: '#fff',
                    background: canBook
                      ? 'linear-gradient(135deg, #7B65F0 0%, #5B4BAE 50%, #7FD6B0 130%)'
                      : C.bg2,
                    border: 'none',
                    borderRadius: 999,
                    cursor: canBook ? 'pointer' : 'not-allowed',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: canBook
                      ? '0 14px 32px -12px rgba(91,75,174,0.6), inset 0 -1px 0 rgba(255,255,255,0.14)'
                      : 'none',
                    transition: 'transform .12s ease, box-shadow .2s ease',
                    outline: canBook ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    outlineOffset: canBook ? -1 : 0,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    if (!canBook) return
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 18px 36px -12px rgba(91,75,174,0.7), inset 0 -1px 0 rgba(255,255,255,0.18)'
                  }}
                  onMouseLeave={(e) => {
                    if (!canBook) return
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 14px 32px -12px rgba(91,75,174,0.6), inset 0 -1px 0 rgba(255,255,255,0.14)'
                  }}
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                  {isSubmitting
                    ? t('submitting')
                    : selectedSlot
                    ? 'Confirm demo booking'
                    : 'Pick a time above'}
                </button>
                </div>
                <p style={{ marginTop: 0, marginBottom: 0, fontSize: 11.5, color: C.ink4, textAlign: 'center' }}>
                  {t('disclaimer')}
                </p>
              </form>

              {/* ── RIGHT: next-7-days strip + time slots
                       Hidden entirely once a time is picked so the user sees
                       only their form + selected-slot summary. Everything
                       past the 7-day window is rendered as a dimmed "booked"
                       pill so the visitor understands scarcity. */}
              {!selectedSlot && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.ink3, marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Pick a day
                  </div>
                  {/* 7-day horizontal strip */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 18 }}>
                    {Array.from({ length: 7 }, (_, i) => addDays(today, i)).map((d) => {
                      const key = dateKey(d)
                      const daySlots = slotsByDate[key] || []
                      const available = daySlots.length > 0
                      const isSelected = selectedDate && sameDay(d, selectedDate)
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={!available}
                          onClick={() => { setSelectedDate(d); setSelectedSlot(null) }}
                          style={{
                            padding: '10px 4px',
                            borderRadius: 12,
                            border: '1px solid',
                            borderColor: isSelected
                              ? C.accentInk
                              : available
                              ? 'color-mix(in oklab, #5B4BAE 20%, #E4E8F1)'
                              : C.line,
                            background: isSelected
                              ? 'linear-gradient(160deg, #6E5CE0 0%, #5B4BAE 100%)'
                              : available
                              ? '#fff'
                              : C.bg2,
                            color: isSelected ? '#fff' : available ? C.ink : C.ink4,
                            cursor: available ? 'pointer' : 'not-allowed',
                            transition: 'background .12s ease, border-color .12s ease, transform .12s ease',
                            fontFamily: sans,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                            boxShadow: isSelected ? '0 8px 20px -10px rgba(91,75,174,0.6)' : 'none',
                          }}
                        >
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.85 }}>
                            {d.toLocaleString(locale === 'br' ? 'pt-BR' : locale, { weekday: 'short' })}
                          </span>
                          <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
                            {d.getDate()}
                          </span>
                          <span style={{ fontSize: 9.5, fontWeight: 600, opacity: 0.75 }}>
                            {available ? `${daySlots.length} open` : 'Booked'}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Time slots */}
                  <div>
                    {slotsError ? (
                      <p style={{ fontSize: 13, color: C.err }}>{slotsError}</p>
                    ) : loadingSlots ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.ink3, fontSize: 13 }}>
                        <Loader2 size={14} className="animate-spin" /> Loading available times…
                      </div>
                    ) : !selectedDate ? (
                      <div
                        style={{
                          padding: '18px 16px',
                          borderRadius: 14,
                          background: C.bg2,
                          border: `1px dashed ${C.line2}`,
                          color: C.ink3,
                          fontSize: 13,
                          textAlign: 'center',
                        }}
                      >
                        Tap a day above to see available times ↑
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.ink3, marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          {selectedDate.toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
                            weekday: 'long', month: 'short', day: 'numeric',
                          })}
                          <span style={{ fontWeight: 500, color: C.ink4, marginLeft: 8, textTransform: 'none', letterSpacing: 0 }}>
                            · {timezone}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                            gap: 8,
                            maxHeight: 200,
                            overflowY: 'auto',
                            paddingRight: 4,
                          }}
                        >
                          {((slotsByDate[dateKey(selectedDate)] ?? []) as CalendlyTimeSlot[]).map((slot) => {
                            // selectedSlot is guaranteed null in this branch (see the enclosing
                            // `{!selectedSlot && ...}`); the calendar hides the moment a slot is picked.
                            const isSelected = false
                            return (
                              <button
                                key={slot.start_time}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                style={{
                                  padding: '11px 8px',
                                  borderRadius: 10,
                                  fontSize: 13.5, fontWeight: 700, fontFamily: sans,
                                  border: `1px solid ${isSelected ? C.accentInk : 'color-mix(in oklab, #5B4BAE 15%, #E4E8F1)'}`,
                                  background: isSelected
                                    ? 'linear-gradient(160deg, #6E5CE0 0%, #5B4BAE 100%)'
                                    : '#fff',
                                  color: isSelected ? '#fff' : C.ink,
                                  cursor: 'pointer',
                                  boxShadow: isSelected ? '0 8px 20px -10px rgba(91,75,174,0.55)' : 'none',
                                  transition: 'background .12s ease, border-color .12s ease',
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
                    )}
                  </div>
                </div>
              )}
            </div>

            <style>{`
              @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              .animate-spin { animation: spin 1s linear infinite; }
              @media (max-width: 760px) {
                .demo-modal-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </>
        )}
      </div>
    </div>
  )
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '12px 14px',
    fontSize: 14,
    fontFamily: sans,
    color: C.ink,
    background: '#fff',
    border: `1px solid ${hasError ? C.err : C.line2}`,
    borderRadius: 12,
    outline: 'none',
    transition: 'border-color .15s, box-shadow .15s',
  }
}

function arrowButtonStyle(disabled: boolean): React.CSSProperties {
  return {
    width: 30, height: 30, borderRadius: 8,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: '#fff',
    border: `1px solid ${C.line2}`,
    color: disabled ? C.line2 : C.ink2,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }
}
