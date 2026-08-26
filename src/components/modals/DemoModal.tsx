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

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import {
  CHROME_STORE_WEBSITE_URL,
  getHubSpotAttributionFields,
} from '@/utils/openChromeExtensionStore'
import { CRMType } from '@/types'

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
// Same as dateKey but computed in a specific timezone. Prevents Brazilian
// slots from being bucketed under the wrong day when the browser clock is
// in a different zone (see CalendlySlotPicker for the same fix).
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

// Friendly timezone label — "GMT−3" instead of the raw "America/Sao_Paulo".
function friendlyTz(tz: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
      hour: 'numeric',
    }).formatToParts(new Date())
    const name = parts.find((p) => p.type === 'timeZoneName')?.value
    if (name) return name.replace('-', '−')
  } catch { /* ignore */ }
  return tz
}

interface CalendlyTimeSlot {
  status: string
  invitees_remaining: number
  start_time: string // ISO
  scheduling_url: string
}

// Per-locale copy for the DemoModal-specific strings the picker copy
// dictionary doesn't cover (picker labels live in CalendlySlotPicker).
interface ModalCopy {
  subtitle: string
  step1Label: string
  step2Label: string
  crmLabel: string
  crmPlaceholder: string
  yourDemoEyebrow: string
  meetingMeta: () => string
  changeTime: string
  back: string
  continueLabel: string
  cta: string
  ctaChooseTime: string
  ctaConfirm: string
  bookingErrorSlot: string
  successTitle: string
  successBody: (email: string, when: string) => React.ReactNode
}

const MODAL_COPY: Record<string, ModalCopy> = {
  en: {
    subtitle: "Pick a time and tell us who you are — we'll take it from there.",
    step1Label: 'Your details',
    step2Label: 'Pick a time',
    crmLabel: 'Which CRM do you use?',
    crmPlaceholder: 'Select your CRM',
        yourDemoEyebrow: 'Your demo',
    meetingMeta: () => `30 min · Google Meet`,
    changeTime: 'Change time',
    back: '← Back',
    continueLabel: 'Pick a time slot →',
    cta: 'Book my demo',
    ctaChooseTime: 'Pick a time above',
    ctaConfirm: 'Confirm demo booking',
    bookingErrorSlot: "We couldn't book that time. Please pick another slot or try again.",
    successTitle: "You're booked",
    successBody: (email, when) => (
      <>Confirmation sent to <strong style={{ color: C.ink2 }}>{email}</strong>. A calendar invite for{' '}
      <strong style={{ color: C.ink2 }}>{when}</strong> is on its way.</>
    ),
  },
  es: {
    subtitle: 'Elige un horario y cuéntanos quién eres — nosotros nos encargamos del resto.',
    step1Label: 'Tus datos',
    step2Label: 'Elige un horario',
    crmLabel: '¿Qué CRM usas?',
    crmPlaceholder: 'Selecciona tu CRM',
        yourDemoEyebrow: 'Tu demo',
    meetingMeta: () => `30 min · Google Meet`,
    changeTime: 'Cambiar horario',
    back: '← Volver',
    continueLabel: 'Elegir un horario →',
    cta: 'Reservar mi demo',
    ctaChooseTime: 'Elige un horario arriba',
    ctaConfirm: 'Confirmar reserva de la demo',
    bookingErrorSlot: 'No pudimos reservar ese horario. Elige otro o inténtalo de nuevo.',
    successTitle: '¡Reservado!',
    successBody: (email, when) => (
      <>Confirmación enviada a <strong style={{ color: C.ink2 }}>{email}</strong>. La invitación al calendario para{' '}
      <strong style={{ color: C.ink2 }}>{when}</strong> ya está en camino.</>
    ),
  },
  br: {
    subtitle: 'Escolha um horário e conte quem você é — o resto é com a gente.',
    step1Label: 'Seus dados',
    step2Label: 'Escolha um horário',
    crmLabel: 'Qual CRM você usa?',
    crmPlaceholder: 'Selecione seu CRM',
        yourDemoEyebrow: 'Sua demo',
    meetingMeta: () => `30 min · Google Meet`,
    changeTime: 'Trocar horário',
    back: '← Voltar',
    continueLabel: 'Escolher um horário →',
    cta: 'Reservar minha demo',
    ctaChooseTime: 'Escolha um horário acima',
    ctaConfirm: 'Confirmar reserva da demo',
    bookingErrorSlot: 'Não conseguimos reservar esse horário. Escolha outro ou tente novamente.',
    successTitle: 'Tudo certo!',
    successBody: (email, when) => (
      <>Confirmação enviada para <strong style={{ color: C.ink2 }}>{email}</strong>. O convite do calendário para{' '}
      <strong style={{ color: C.ink2 }}>{when}</strong> está a caminho.</>
    ),
  },
  tr: {
    subtitle: 'Bir zaman seçin ve kim olduğunuzu söyleyin — gerisini biz hallederiz.',
    step1Label: 'Bilgileriniz',
    step2Label: 'Bir saat seçin',
    crmLabel: "Hangi CRM'i kullanıyorsunuz?",
    crmPlaceholder: 'CRM seçin',
        yourDemoEyebrow: 'Demonuz',
    meetingMeta: () => `30 dk · Google Meet`,
    changeTime: 'Saati değiştir',
    back: '← Geri',
    continueLabel: 'Bir saat seçin →',
    cta: 'Demoyu rezerve et',
    ctaChooseTime: 'Yukarıdan bir saat seçin',
    ctaConfirm: 'Demo rezervasyonunu onayla',
    bookingErrorSlot: 'O saat rezerve edilemedi. Başka bir saat seçin veya tekrar deneyin.',
    successTitle: 'Rezerve edildi',
    successBody: (email, when) => (
      <>Onay <strong style={{ color: C.ink2 }}>{email}</strong> adresine gönderildi.{' '}
      <strong style={{ color: C.ink2 }}>{when}</strong> için takvim daveti yolda.</>
    ),
  },
}

const LOCALE_DEFAULT_TIMEZONE: Record<string, string> = {
  br: 'America/Sao_Paulo',
  es: 'Europe/Madrid',
  tr: 'Europe/Istanbul',
  // en intentionally omitted — English visitors are global, browser detection wins.
}

export const DemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const t = useTranslations('demoModal')
  const tTrial = useTranslations('trialModal')
  const locale = useLocale()
  const mc = MODAL_COPY[locale] || MODAL_COPY.en

  // Form state
  const [crm, setCrm] = useState<CRMType | ''>('')
  // Wizard step. Start on 'details' — user fills form first, then advances
  // to 'time' to pick a slot. Keeps each screen focused.
  const [step, setStep] = useState<'details' | 'time'>('details')
  const [email, setEmail] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('+1')
  const [phone, setPhone] = useState('')
  const [emailError, setEmailError] = useState('')

  // Calendar / booking state
  // Raw slots — grouping happens via useMemo in the visitor's timezone
  // so the buckets stay correct when timezone arrives async from /api/geo.
  const [rawSlots, setRawSlots] = useState<CalendlyTimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<CalendlyTimeSlot | null>(null)
  const [timezone, setTimezone] = useState<string>('UTC')

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Timezone priority: IP-based via /api/geo (follows VPN) → browser Intl
  // (OS clock) → UTC. Locale-forced defaults are no longer needed — the
  // IP lookup gets it right for both /br/ and English-language visitors.
  useEffect(() => {
    if (!isOpen) return
    // Kick off with browser detection so the field is populated immediately.
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC')
    } catch { /* keep default */ }
    // Then upgrade to the IP-based timezone (correctly follows VPNs).
    let cancelled = false
    fetch('/api/geo')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { timezone?: string | null } | null) => {
        if (!cancelled && data?.timezone) setTimezone(data.timezone)
      })
      .catch(() => { /* keep browser fallback */ })
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
      setStep('details')
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
      const available = (data.collection || []).filter(
        (s) => s.status === 'available' && s.invitees_remaining > 0,
      )
      available.sort((a, b) => a.start_time.localeCompare(b.start_time))
      setRawSlots(available)
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

  // Group in the visitor's real timezone; recomputes if timezone changes.
  const slotsByDate = useMemo(() => {
    const grouped: Record<string, CalendlyTimeSlot[]> = {}
    rawSlots.forEach((s) => {
      const k = dateKeyInTz(new Date(s.start_time), timezone)
      if (!grouped[k]) grouped[k] = []
      grouped[k].push(s)
    })
    return grouped
  }, [rawSlots, timezone])

  // Auto-select the earliest date that has slots (re-runs when grouping
  // shifts because the IP-based timezone arrives).
  useEffect(() => {
    if (!isOpen || selectedDate) return
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfToday.getTime() + i * DAY_MS)
      if ((slotsByDate[dateKeyInTz(d, timezone)] || []).length > 0) {
        setSelectedDate(d)
        break
      }
    }
  }, [isOpen, slotsByDate, timezone, selectedDate])

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
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    !isPersonalEmail(email) &&
    phone.replace(/\D/g, '').length >= 6 &&
    !!crm

  const canBook = formValid && !!selectedSlot && !isSubmitting

  const handleBook = async () => {
    if (!canBook || !selectedSlot) return
    setIsSubmitting(true)
    setBookingError('')

    const finalPhone = `${selectedCountry}${phone.replace(/\s+/g, '')}`
    const formGuid = HUBSPOT_DEMO_FORM_GUID_BY_LOCALE[locale] || DEFAULT_HUBSPOT_DEMO_FORM_GUID

    // Name isn't collected in the form anymore (kept it lean per user
    // request). Derive a passable first/last from the email prefix so both
    // HubSpot and Calendly still get structured name data.
    const derived = (email.split('@')[0] || '')
      .replace(/[._-]+/g, ' ')
      .replace(/\d+/g, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    const firstname = derived[0] || 'Friend'
    const lastname = derived.slice(1).join(' ')

    // 1) HubSpot lead capture — fire-and-forget with keepalive so the write
    //    survives the state change to the success screen. Errors are logged,
    //    not blocking — the booking still lands.
    try {
      const hutk = document.cookie.split(';').find(c => c.trim().startsWith('hubspotutk='))?.split('=')[1]
      const fields: { name: string; value: string }[] = [
        { name: 'firstname', value: firstname },
        { name: 'lastname', value: lastname },
        { name: 'email', value: email.trim() },
        { name: 'phone', value: finalPhone },
        { name: 'crm_used', value: crm || 'Other' },
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
          name: `${firstname}${lastname ? ' ' + lastname : ''}`,
          email: email.trim(),
          timezone,
          phone: finalPhone,
        }),
      })
      if (!res.ok) {
        const errText = await res.text().catch(() => '')
        console.error('Calendly booking failed:', res.status, errText)
        setBookingError(mc.bookingErrorSlot)
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
          maxWidth: isSuccess ? 520 : step === 'details' ? 480 : 640,
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
            <header style={{ marginBottom: 22, paddingRight: 40 }}>
              <h2 style={{
                fontFamily: serif, fontWeight: 400,
                fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.015em',
                color: C.ink, margin: 0,
              }}>
                {t.rich('heading', {
                  em: (chunks) => <em style={{ fontStyle: 'italic', color: C.accentInk }}>{chunks}</em>,
                })}
              </h2>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                // Wizard: submit on step 1 advances to step 2 (if the form
                // is valid); submit on step 2 fires the actual booking.
                if (step === 'details') {
                  if (formValid) setStep('time')
                } else if (canBook) {
                  handleBook()
                }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: 20,
                alignItems: 'start',
                maxWidth: step === 'details' ? 460 : 620,
                margin: '0 auto',
                transition: 'max-width .3s ease',
                width: '100%',
              }}
              className="demo-modal-grid"
            >
              {step === 'details' && (
              /* ── STEP 1: form fields ────────────────────────────────── */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.accentInk, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 18, height: 18, borderRadius: 999,
                    background: C.accentInk, color: '#fff',
                    fontSize: 10, fontWeight: 800, marginRight: 8,
                  }}>1</span>
                  {mc.step1Label}
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

                {/* CRM dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: C.ink2 }}>
                    {mc.crmLabel}
                  </label>
                  <select
                    required
                    value={crm}
                    onChange={(e) => setCrm(e.target.value as CRMType | '')}
                    style={{
                      ...inputStyle(false),
                      cursor: 'pointer',
                      appearance: 'none',
                      color: crm ? C.ink : C.ink4,
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A6070' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '12px 12px',
                      paddingRight: 36,
                    }}
                  >
                    <option value="" disabled>{mc.crmPlaceholder}</option>
                    {Object.values(CRMType).map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

              </div>
              )}

              {step === 'time' && (
              /* ── STEP 2: date + time picker ────────────────────────── */
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.accentInk, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 18, height: 18, borderRadius: 999,
                      background: C.accentInk, color: '#fff',
                      fontSize: 10, fontWeight: 800, marginRight: 8,
                    }}>2</span>
                    {mc.step2Label}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setStep('details'); setSelectedSlot(null) }}
                    style={{
                      padding: '6px 12px',
                      fontSize: 12, fontWeight: 700, fontFamily: sans,
                      color: C.ink3,
                      background: 'transparent',
                      border: `1px solid ${C.line2}`,
                      borderRadius: 999,
                      cursor: 'pointer',
                    }}
                  >
                    {mc.back}
                  </button>
                </div>
                <div>
                  {/* 7-day horizontal strip */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 18 }}>
                    {Array.from({ length: 7 }, (_, i) => addDays(today, i)).map((d) => {
                      const key = dateKeyInTz(d, timezone)
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
                          {((slotsByDate[dateKeyInTz(selectedDate, timezone)] ?? []) as CalendlyTimeSlot[]).map((slot) => {
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
              </div>
              )}
            </div>

            {/* ── FOOTER: centered CTA + selected-slot summary ─────────── */}
            <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
              {selectedSlot && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: 14,
                    background:
                      'linear-gradient(160deg, color-mix(in oklab, #6E5CE0 10%, #FBFCFE) 0%, color-mix(in oklab, #7FD6B0 6%, #FBFCFE) 100%)',
                    border: '1px solid color-mix(in oklab, #5B4BAE 30%, #E4E8F1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.accentInk, marginBottom: 4 }}>
                      {mc.yourDemoEyebrow}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>
                      {new Date(selectedSlot.start_time).toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
                        weekday: 'long', month: 'short', day: 'numeric',
                      })}
                      <span style={{ marginLeft: 6, color: C.accentInk }}>
                        · {new Date(selectedSlot.start_time).toLocaleString(locale === 'br' ? 'pt-BR' : locale, {
                          hour: 'numeric', minute: '2-digit', timeZone: timezone,
                        })}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: C.ink4, marginTop: 2 }}>{mc.meetingMeta()}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSlot(null)}
                    style={{
                      padding: '8px 14px', fontSize: 12, fontWeight: 700,
                      color: C.accentInk, background: '#fff',
                      border: `1px solid color-mix(in oklab, #5B4BAE 30%, ${C.line2})`,
                      borderRadius: 999, cursor: 'pointer', flexShrink: 0,
                    }}
                  >
                    {mc.changeTime}
                  </button>
                </div>
              )}

              {bookingError && (
                <p style={{ fontSize: 12.5, color: C.err, margin: 0, textAlign: 'center' }}>{bookingError}</p>
              )}

              {(() => {
                const ctaEnabled = step === 'details' ? formValid : canBook
                const ctaLabel = isSubmitting
                  ? t('submitting')
                  : step === 'details'
                  ? mc.continueLabel
                  : selectedSlot
                  ? mc.ctaConfirm
                  : mc.ctaChooseTime
                return (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="submit"
                      disabled={!ctaEnabled}
                      style={{
                        minWidth: 280,
                        padding: '15px 34px',
                        fontSize: 15, fontWeight: 700, fontFamily: sans, letterSpacing: '-0.005em',
                        color: '#fff',
                        background: ctaEnabled
                          ? 'linear-gradient(135deg, #7B65F0 0%, #5B4BAE 50%, #7FD6B0 130%)'
                          : C.bg2,
                        border: 'none',
                        borderRadius: 999,
                        cursor: ctaEnabled ? 'pointer' : 'not-allowed',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        boxShadow: ctaEnabled
                          ? '0 14px 32px -12px rgba(91,75,174,0.6), inset 0 -1px 0 rgba(255,255,255,0.14)'
                          : 'none',
                        transition: 'transform .12s ease, box-shadow .2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!ctaEnabled) return
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 18px 36px -12px rgba(91,75,174,0.7), inset 0 -1px 0 rgba(255,255,255,0.18)'
                      }}
                      onMouseLeave={(e) => {
                        if (!ctaEnabled) return
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 14px 32px -12px rgba(91,75,174,0.6), inset 0 -1px 0 rgba(255,255,255,0.14)'
                      }}
                    >
                      {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                      {ctaLabel}
                    </button>
                  </div>
                )
              })()}

              <p style={{ margin: 0, fontSize: 11.5, color: C.ink4, textAlign: 'center' }}>
                {t('disclaimer')}
              </p>
            </div>
            </form>

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
