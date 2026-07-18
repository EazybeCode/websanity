'use client'

/**
 * DemoModal — collects Name, Work Email, Phone then opens an embedded
 * Calendly widget PRE-FILLED with those values so the user only has to
 * pick a time.
 *
 * Kept intentionally separate from TrialModal (which routes to the
 * Chrome Web Store post-submit and has a CRM-picker in its form). This
 * one is single-purpose: "book a demo → land on Calendly with a
 * pre-filled name/email so the calendar view is one click away."
 *
 * Calendly prefill: passes { name, email, customAnswers: { a1: phone } }
 * to Calendly.initInlineWidget. `a1` maps to the first custom question
 * on the Calendly event type — make sure the first custom question in
 * the Calendly dashboard is "Phone number" (or hide/remove any other
 * questions above it) so the phone lands in the right field.
 */

import React, { useEffect, useRef, useState } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import {
  CHROME_STORE_WEBSITE_URL,
  getHubSpotAttributionFields,
} from '@/utils/openChromeExtensionStore'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CALENDLY_URL =
  'https://calendly.com/eazybe/eazybe-demo-clone?hide_event_type_details=1&hide_gdpr_banner=1'
const HUBSPOT_PORTAL_ID = '40009480'
const HUBSPOT_DEMO_FORM_GUID = '9aedb83c-2475-483a-87cc-30712345cc77'

// Same country→phone map + phone code list the TrialModal uses. Kept
// inline so this modal has zero shared state with TrialModal.
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
  { code: '+32', label: 'BE' }, { code: '+41', label: 'CH' }, { code: '+43', label: 'AT' },
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

export const DemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const t = useTranslations('demoModal')
  const tTrial = useTranslations('trialModal')
  const locale = useLocale()

  const [email, setEmail] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('+1')
  const [phone, setPhone] = useState('')

  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'form' | 'calendar'>('form')
  const [isCalendlyReady, setIsCalendlyReady] = useState(false)

  const calendlyContainerRef = useRef<HTMLDivElement>(null)

  // Derive a friendly name from the email prefix (everything before @).
  // "john.doe@acme.com" -> "John Doe" for Calendly + HubSpot prefill.
  const derivedName = (() => {
    const prefix = email.split('@')[0] || ''
    return prefix
      .replace(/[._-]+/g, ' ')
      .replace(/\d+/g, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ')
  })()

  // Country detection — same lightweight approach as TrialModal
  useEffect(() => {
    if (!isOpen) return
    const detectCountry = async () => {
      try {
        const response = await fetch('https://api.country.is/')
        const data = await response.json()
        if (data.country && COUNTRY_TO_PHONE[data.country]) {
          setSelectedCountry(COUNTRY_TO_PHONE[data.country])
        }
      } catch {
        try {
          const browserLocale = navigator.language || (navigator as any).userLanguage
          if (browserLocale && browserLocale.includes('-')) {
            const countryCode = browserLocale.split('-')[1]?.toUpperCase()
            if (countryCode && COUNTRY_TO_PHONE[countryCode]) {
              setSelectedCountry(COUNTRY_TO_PHONE[countryCode])
            }
          }
        } catch { /* keep default */ }
      }
    }
    detectCountry()
  }, [isOpen])

  // Reset every time modal closes so the next visitor gets a fresh form
  useEffect(() => {
    if (!isOpen) {
      setStep('form')
      setIsSubmitting(false)
      setEmailError('')
      setIsCalendlyReady(false)
    }
  }, [isOpen])

  // Warm Calendly the moment the modal opens (not after form submit).
  // - preconnect hints so DNS + TLS to calendly.com are done during
  //   form-fill time (saves ~150-400ms on the eventual iframe request)
  // - eagerly load widget.js so when the user hits Continue the script
  //   is already parsed and initInlineWidget can fire instantly
  useEffect(() => {
    if (!isOpen) return
    if (typeof document === 'undefined') return

    const hints: HTMLLinkElement[] = []
    const addHint = (rel: string, href: string, crossOrigin?: string) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (crossOrigin) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
      hints.push(link)
    }
    addHint('preconnect', 'https://calendly.com', 'anonymous')
    addHint('preconnect', 'https://assets.calendly.com', 'anonymous')
    addHint('dns-prefetch', 'https://calendly.com')
    addHint('dns-prefetch', 'https://assets.calendly.com')

    // Kick off widget.js download in parallel with form fill
    if (!(window as any).Calendly && !document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    )) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      // Leave the script; it caches for the tab lifetime. Only strip the
      // preconnect hints — the browser has already used them by now.
      hints.forEach((l) => l.parentNode?.removeChild(l))
    }
  }, [isOpen])

  // When we hit the calendar step, load Calendly's script (once) then
  // init the inline widget. Prefill is passed via URL query params —
  // more reliable than the JS `prefill` option when the base URL already
  // has query params (like our hide_event_type_details flags), and it
  // populates the built-in name/email fields AND custom answers (a1..an)
  // in one go. `a1` maps to the first custom question on the event; make
  // sure that slot is "Whatsapp Number?" in the Calendly dashboard.
  useEffect(() => {
    if (!isOpen || step !== 'calendar') return
    const container = calendlyContainerRef.current
    if (!container) return

    const finalPhone = `${selectedCountry}${phone.replace(/\s+/g, '')}`
    const url = new URL(CALENDLY_URL)
    // Native prefill fields
    if (derivedName) url.searchParams.set('name', derivedName)
    if (email.trim()) url.searchParams.set('email', email.trim())
    // Custom-question prefill (a1 = 1st custom question = Whatsapp Number)
    if (finalPhone) url.searchParams.set('a1', finalPhone)
    // Match Calendly's own inline-widget contract so postMessage events
    // fire back to us (used to hide the skeleton loader).
    url.searchParams.set('embed_domain', window.location.hostname)
    url.searchParams.set('embed_type', 'Inline')
    const urlWithPrefill = url.toString()

    // Hide the loading spinner as soon as Calendly emits its first
    // postMessage event — that fires after the widget's own iframe has
    // painted the calendar, so the transition feels seamless.
    const onCalendlyMessage = (e: MessageEvent) => {
      const data = e.data
      if (data && typeof data === 'object' && typeof data.event === 'string' && data.event.startsWith('calendly.')) {
        setIsCalendlyReady(true)
      }
    }
    window.addEventListener('message', onCalendlyMessage)

    // Mount the iframe directly instead of going through Calendly's
    // widget.js -> initInlineWidget() wrapper. That wrapper ultimately
    // just injects <iframe src=...> into the container, so skipping it
    // avoids one script parse + init round trip and lets the iframe
    // start fetching the calendar HTML the instant the user submits.
    container.innerHTML = ''
    const iframe = document.createElement('iframe')
    iframe.src = urlWithPrefill
    iframe.title = 'Select a time — Calendly'
    iframe.setAttribute('frameborder', '0')
    // Native browser hints so the iframe is treated as high-priority
    // and doesn't wait behind lazier resources on the page.
    iframe.loading = 'eager'
    iframe.setAttribute('fetchpriority', 'high')
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.border = '0'
    // Belt-and-braces: hide the skeleton when the iframe itself paints,
    // in case Calendly's own postMessage is delayed / blocked.
    iframe.addEventListener('load', () => setIsCalendlyReady(true), { once: true })
    container.appendChild(iframe)

    // Safety net — if the iframe load event and postMessage both never
    // land, hide the skeleton after 5s so users aren't stuck.
    const fallback = window.setTimeout(() => setIsCalendlyReady(true), 5000)

    return () => {
      window.removeEventListener('message', onCalendlyMessage)
      window.clearTimeout(fallback)
    }
  }, [isOpen, step, derivedName, email, phone, selectedCountry])

  if (!isOpen) return null

  const isPersonalEmail = (e: string) => {
    const domain = e.split('@')[1]?.toLowerCase()
    return PERSONAL_EMAIL_DOMAINS.includes(domain || '')
  }

  const handleEmailChange = (v: string) => {
    setEmail(v)
    if (v && v.includes('@') && isPersonalEmail(v)) {
      setEmailError(tTrial('workEmailError'))
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isPersonalEmail(email)) {
      setEmailError(tTrial('workEmailError'))
      return
    }
    setIsSubmitting(true)

    const finalPhone = `${selectedCountry}${phone.replace(/\s+/g, '')}`

    try {
      const hutk = document.cookie.split(';').find(c => c.trim().startsWith('hubspotutk='))?.split('=')[1]
      const [firstname, ...rest] = derivedName.split(/\s+/)
      const lastname = rest.join(' ')
      const fields: { name: string; value: string }[] = [
        { name: 'firstname', value: firstname || derivedName || email.split('@')[0] },
        { name: 'lastname', value: lastname },
        { name: 'email', value: email },
        { name: 'phone', value: finalPhone },
        { name: 'crm_used', value: 'Other' },
        { name: 'source_name', value: 'website-demo' },
      ]

      fields.push(...getHubSpotAttributionFields(CHROME_STORE_WEBSITE_URL))

      const payload = {
        portalId: HUBSPOT_PORTAL_ID,
        formGuid: HUBSPOT_DEMO_FORM_GUID,
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title || 'EazyBe Website',
          ...(hutk ? { hutk } : {}),
        },
      }

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_DEMO_FORM_GUID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )

      if (!response.ok) throw new Error('Form submission failed')

      ;(window as any).gtag?.('event', `book_demo_submit_${locale}`)

      setIsSubmitting(false)
      setStep('calendar')
    } catch (error) {
      console.error('Demo form submission error:', error)
      setIsSubmitting(false)
      alert('There was an error submitting the form. Please try again.')
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const inCalendar = step === 'calendar'

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
          maxWidth: inCalendar ? 900 : 480,
          background: C.paper,
          border: `1px solid ${C.line}`,
          borderRadius: 24,
          boxShadow: '0 24px 60px -20px rgba(15,17,21,0.32), 0 4px 12px -6px rgba(15,17,21,0.08)',
          padding: inCalendar ? '28px 24px 20px' : '40px 36px 32px',
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
            cursor: 'pointer', transition: 'background .15s, color .15s, border-color .15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.bg2
            e.currentTarget.style.color = C.ink
            e.currentTarget.style.borderColor = C.line2
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = C.ink3
            e.currentTarget.style.borderColor = C.line
          }}
        >
          <X size={16} />
        </button>

        {!inCalendar ? (
          <>
            <header style={{ marginBottom: 22, paddingRight: 40 }}>
              <h2 style={{
                fontFamily: serif, fontWeight: 400,
                fontSize: 30, lineHeight: 1.12, letterSpacing: '-0.015em',
                color: C.ink, margin: 0,
              }}>
                {t.rich('heading', {
                  em: (chunks) => (
                    <em style={{ fontStyle: 'italic', color: C.accentInk }}>{chunks}</em>
                  ),
                })}
              </h2>
              <p style={{
                marginTop: 8, marginBottom: 0,
                fontSize: 15, lineHeight: 1.5, color: C.ink3,
              }}>
                {t('subheadline')}
              </p>
            </header>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Work Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: C.ink2,
                }}>{t('emailLabel')}</label>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: 14,
                    fontFamily: sans,
                    color: C.ink,
                    background: '#fff',
                    border: `1px solid ${emailError ? C.err : C.line2}`,
                    borderRadius: 12,
                    outline: 'none',
                    transition: 'border-color .15s, box-shadow .15s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = emailError ? C.err : C.accentInk
                    e.currentTarget.style.boxShadow = emailError
                      ? '0 0 0 3px rgba(194,106,90,0.14)'
                      : '0 0 0 3px rgba(91,75,174,0.14)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = emailError ? C.err : C.line2
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                {emailError && (
                  <p style={{ fontSize: 12, color: C.err, marginTop: 2, marginBottom: 0 }}>
                    {emailError}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: C.ink2,
                }}>{t('phoneLabel')}</label>
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
                      minWidth: 96,
                      padding: '12px 10px',
                      fontSize: 13,
                      fontFamily: sans,
                      color: C.ink2,
                      background: 'transparent',
                      border: 'none',
                      borderRight: `1px solid ${C.line}`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={`${c.code}-${c.label}`} value={c.code}>
                        {c.label} {c.code}
                      </option>
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
                      flex: 1,
                      padding: '12px 14px',
                      fontSize: 14,
                      fontFamily: sans,
                      color: C.ink,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '14px 22px',
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: sans,
                  letterSpacing: '-0.005em',
                  color: '#fff',
                  background: C.ink,
                  border: `1px solid ${C.ink}`,
                  borderRadius: 999,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  opacity: isSubmitting ? 0.65 : 1,
                  display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 8px 22px -10px rgba(15,17,21,0.45)',
                  transition: 'transform .12s ease, box-shadow .2s ease, background .15s ease',
                }}
                onMouseEnter={(e) => {
                  if (isSubmitting) return
                  e.currentTarget.style.background = C.ink2
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 12px 26px -12px rgba(15,17,21,0.55)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.ink
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 22px -10px rgba(15,17,21,0.45)'
                }}
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                {isSubmitting ? t('submitting') : t('submitButton')}
              </button>

              <p style={{
                marginTop: 4, marginBottom: 0,
                fontSize: 12, color: C.ink4, textAlign: 'center',
              }}>
                {t('disclaimer')}
              </p>
            </form>
          </>
        ) : (
          <>
            <header style={{ marginBottom: 14, paddingRight: 40 }}>
              <h2 style={{
                fontFamily: serif, fontWeight: 400,
                fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.01em',
                color: C.ink, margin: 0,
              }}>
                {t.rich('calendarHeading', {
                  em: (chunks) => (
                    <em style={{ fontStyle: 'italic', color: C.accentInk }}>{chunks}</em>
                  ),
                })}
              </h2>
              <p style={{ marginTop: 4, marginBottom: 0, fontSize: 13, color: C.ink3 }}>
                {t.rich('calendarSubtitle', {
                  b: (chunks) => <strong style={{ color: C.ink2 }}>{chunks}</strong>,
                  email,
                })}
              </p>
            </header>
            <div style={{ position: 'relative', width: '100%' }}>
              <div
                ref={calendlyContainerRef}
                style={{
                  width: '100%',
                  minWidth: 320,
                  height: 640,
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: `1px solid ${C.line}`,
                  opacity: isCalendlyReady ? 1 : 0,
                  transition: 'opacity .35s ease',
                }}
              />
              {!isCalendlyReady && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: 14,
                    border: `1px solid ${C.line}`,
                    background: '#fff',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(220px, 32%) 1fr',
                  }}
                >
                  {/* Left column — event details */}
                  <div style={{
                    padding: '28px 24px',
                    borderRight: `1px solid ${C.line}`,
                    background: C.paper,
                    display: 'flex', flexDirection: 'column', gap: 14,
                  }}>
                    <div className="dm-skel" style={{ width: 90, height: 12, borderRadius: 6 }} />
                    <div className="dm-skel" style={{ width: '80%', height: 22, borderRadius: 8 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div className="dm-skel" style={{ width: 14, height: 14, borderRadius: 4 }} />
                        <div className="dm-skel" style={{ flex: 1, height: 10, borderRadius: 5 }} />
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div className="dm-skel" style={{ width: 14, height: 14, borderRadius: 4 }} />
                        <div className="dm-skel" style={{ flex: 1, height: 10, borderRadius: 5 }} />
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div className="dm-skel" style={{ width: 14, height: 14, borderRadius: 4 }} />
                        <div className="dm-skel" style={{ width: '65%', height: 10, borderRadius: 5 }} />
                      </div>
                    </div>
                  </div>

                  {/* Right column — month grid */}
                  <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {/* Month header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="dm-skel" style={{ width: 130, height: 16, borderRadius: 6 }} />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <div className="dm-skel" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                        <div className="dm-skel" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                      </div>
                    </div>
                    {/* Weekday row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={`w-${i}`} style={{ display: 'flex', justifyContent: 'center' }}>
                          <div className="dm-skel" style={{ width: 18, height: 10, borderRadius: 4 }} />
                        </div>
                      ))}
                    </div>
                    {/* Day grid — 5 rows */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div
                          key={`d-${i}`}
                          style={{
                            aspectRatio: '1 / 1',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <div
                            className="dm-skel"
                            style={{
                              width: '78%', height: '78%', borderRadius: '50%',
                              animationDelay: `${(i % 7) * 60}ms`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Timezone footer */}
                    <div style={{ marginTop: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div className="dm-skel" style={{ width: 12, height: 12, borderRadius: '50%' }} />
                      <div className="dm-skel" style={{ width: 160, height: 10, borderRadius: 5 }} />
                    </div>
                  </div>
                </div>
              )}
              <style>{`
                .dm-skel {
                  background: linear-gradient(90deg, ${C.bg2} 0%, ${C.line} 40%, ${C.bg2} 80%);
                  background-size: 200% 100%;
                  animation: dmShimmer 1.4s ease-in-out infinite;
                }
                @keyframes dmShimmer {
                  0%   { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `}</style>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
