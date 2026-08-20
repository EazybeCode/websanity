'use client'

import React, { useState, useEffect } from 'react'
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { CRMType, TrialFormData } from '@/types'
import { type ModalMode } from '@/providers/TrialModalProvider'
import {
  CHROME_STORE_WEBSITE_URL,
  getHubSpotAttributionFields,
  withIncomingTrackingParams,
} from '@/utils/openChromeExtensionStore'

// Where the "Let's Get You Started" (trial) form sends people after submit.
// Dedicated Rebrandly shortlink per marketing — separate from the Chrome
// install redirect and the demo shortlink so post-form clicks are counted
// on their own.
const TRIAL_SUBMIT_REDIRECT_URL = 'https://eazybe.info/6c2a82'

interface TrialModalProps {
  isOpen: boolean
  mode: ModalMode
  onClose: () => void
}

const HUBSPOT_PORTAL_ID = '40009480'
// Per-locale form GUIDs — see DemoModal.tsx for the same pattern.
const HUBSPOT_TRIAL_FORM_GUID_BY_LOCALE: Record<string, string> = {
  en: '470166e7-1418-4bd9-9e1e-7252ad54070b',
  es: 'e6630d0e-f941-42e0-abd5-c3686e4ce16c',
  br: '922fbde6-ba79-4c8e-b784-a7bf67ef3708',
  tr: '470166e7-1418-4bd9-9e1e-7252ad54070b', // TODO: swap in the Turkish form ID
}
const DEFAULT_HUBSPOT_TRIAL_FORM_GUID = HUBSPOT_TRIAL_FORM_GUID_BY_LOCALE.en

// Map ISO country codes to phone codes
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
  { code: '+1', label: 'US/CA', icon: '\u{1F1FA}\u{1F1F8}' },
  { code: '+52', label: 'MX', icon: '\u{1F1F2}\u{1F1FD}' },
  { code: '+44', label: 'UK', icon: '\u{1F1EC}\u{1F1E7}' },
  { code: '+49', label: 'DE', icon: '\u{1F1E9}\u{1F1EA}' },
  { code: '+33', label: 'FR', icon: '\u{1F1EB}\u{1F1F7}' },
  { code: '+34', label: 'ES', icon: '\u{1F1EA}\u{1F1F8}' },
  { code: '+39', label: 'IT', icon: '\u{1F1EE}\u{1F1F9}' },
  { code: '+31', label: 'NL', icon: '\u{1F1F3}\u{1F1F1}' },
  { code: '+32', label: 'BE', icon: '\u{1F1E7}\u{1F1EA}' },
  { code: '+41', label: 'CH', icon: '\u{1F1E8}\u{1F1ED}' },
  { code: '+43', label: 'AT', icon: '\u{1F1E6}\u{1F1F9}' },
  { code: '+55', label: 'BR', icon: '\u{1F1E7}\u{1F1F7}' },
  { code: '+54', label: 'AR', icon: '\u{1F1E6}\u{1F1F7}' },
  { code: '+91', label: 'IN', icon: '\u{1F1EE}\u{1F1F3}' },
  { code: '+86', label: 'CN', icon: '\u{1F1E8}\u{1F1F3}' },
  { code: '+81', label: 'JP', icon: '\u{1F1EF}\u{1F1F5}' },
  { code: '+82', label: 'KR', icon: '\u{1F1F0}\u{1F1F7}' },
  { code: '+65', label: 'SG', icon: '\u{1F1F8}\u{1F1EC}' },
  { code: '+60', label: 'MY', icon: '\u{1F1F2}\u{1F1FE}' },
  { code: '+62', label: 'ID', icon: '\u{1F1EE}\u{1F1E9}' },
  { code: '+63', label: 'PH', icon: '\u{1F1F5}\u{1F1ED}' },
  { code: '+66', label: 'TH', icon: '\u{1F1F9}\u{1F1ED}' },
  { code: '+84', label: 'VN', icon: '\u{1F1FB}\u{1F1F3}' },
  { code: '+971', label: 'UAE', icon: '\u{1F1E6}\u{1F1EA}' },
  { code: '+966', label: 'SA', icon: '\u{1F1F8}\u{1F1E6}' },
  { code: '+90', label: 'TR', icon: '\u{1F1F9}\u{1F1F7}' },
  { code: '+61', label: 'AU', icon: '\u{1F1E6}\u{1F1FA}' },
  { code: '+64', label: 'NZ', icon: '\u{1F1F3}\u{1F1FF}' },
  { code: '+27', label: 'ZA', icon: '\u{1F1FF}\u{1F1E6}' },
  { code: '+234', label: 'NG', icon: '\u{1F1F3}\u{1F1EC}' },
  { code: '+254', label: 'KE', icon: '\u{1F1F0}\u{1F1EA}' },
  { code: '+20', label: 'EG', icon: '\u{1F1EA}\u{1F1EC}' },
]

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  'icloud.com', 'aol.com', 'mail.com', 'protonmail.com', 'zoho.com',
  'yandex.com', 'gmx.com',
]

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, mode, onClose }) => {
  const t = useTranslations()
  const locale = useLocale()
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0].code)
  const [phoneValue, setPhoneValue] = useState('')
  const [formData, setFormData] = useState<TrialFormData>({
    workEmail: '',
    phoneNumber: '',
    crmProvider: '' as CRMType,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [emailError, setEmailError] = useState('')

  // Auto-detect user's country on mount
  useEffect(() => {
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
        } catch {
          // Keep default country code
        }
      }
    }
    detectCountry()
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false)
      setEmailError('')
      if (hasSubmitted) {
        setIsSuccess(true)
        if (mode === 'trial') {
          window.location.href = withIncomingTrackingParams(TRIAL_SUBMIT_REDIRECT_URL)
        }
      } else {
        setIsSuccess(false)
      }
    }
  }, [isOpen, mode, hasSubmitted])

  useEffect(() => {
    if (isSuccess && mode === 'demo') {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (!existingScript) {
        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        document.body.appendChild(script)
      }
    }
  }, [isSuccess, mode])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    if (isSuccess && mode === 'trial') {
      timeoutId = setTimeout(() => {
        window.location.href = withIncomingTrackingParams(TRIAL_SUBMIT_REDIRECT_URL)
      }, 2000)
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isSuccess, mode])

  if (!isOpen) return null

  const isPersonalEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase()
    return PERSONAL_EMAIL_DOMAINS.includes(domain)
  }

  const handleEmailChange = (email: string) => {
    setFormData({ ...formData, workEmail: email })
    if (email && email.includes('@')) {
      if (isPersonalEmail(email)) {
        setEmailError(t('trialModal.workEmailError'))
      } else {
        setEmailError('')
      }
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isPersonalEmail(formData.workEmail)) {
      setEmailError('Please use your work email, not a personal email address')
      return
    }
    setIsSubmitting(true)
    const finalPhone = `${selectedCountry}${phoneValue.replace(/\s+/g, '')}`
    const formGuid = HUBSPOT_TRIAL_FORM_GUID_BY_LOCALE[locale] || DEFAULT_HUBSPOT_TRIAL_FORM_GUID

    try {
      const hutk = document.cookie.split(';').find(c => c.trim().startsWith('hubspotutk='))?.split('=')[1]
      const fields: { name: string; value: string }[] = [
        { name: 'email', value: formData.workEmail },
        { name: 'phone', value: finalPhone },
        { name: 'crm_used', value: formData.crmProvider },
        { name: 'source_name', value: mode === 'trial' ? 'website' : 'website-demo' },
      ]

      fields.push(...getHubSpotAttributionFields(CHROME_STORE_WEBSITE_URL))

      const hubspotPayload: Record<string, unknown> = {
        portalId: HUBSPOT_PORTAL_ID,
        formGuid,
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title || 'EazyBe Website',
          ...(hutk ? { hutk } : {}),
        },
      }

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formGuid}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hubspotPayload),
        }
      )

      if (!response.ok) throw new Error('Form submission failed')

      ;(window as any).gtag?.('event', mode === 'demo' ? `book_demo_submit_${locale}` : `install_free_submit_${locale}`)

      setIsSubmitting(false)
      setIsSuccess(true)
      setHasSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      alert('There was an error submitting the form. Please try again.')
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const showCalendly = isSuccess && mode === 'demo'

  // Landing tokens inlined as hex so this modal renders correctly even on
  // pages that don't load landing-v3.css (pricing, etc.).
  const C = {
    paper: '#FBFCFE',
    bg2: '#ECEFF7',
    ink: '#0F1115',
    ink2: '#2A2E38',
    ink3: '#5A6070',
    ink4: '#8A90A0',
    line: '#E4E8F1',
    line2: '#D4D9E5',
    accentInk: '#5B4BAE',       // iris
    accentMint: '#7FD6B0',
    err: '#C26A5A',
    ok: '#5B8F6F',
  }
  const serif = "'Instrument Serif', Georgia, serif"
  const sans = "'Geist', 'Inter', system-ui, sans-serif"

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
          maxWidth: showCalendly ? 720 : 480,
          background: C.paper,
          border: `1px solid ${C.line}`,
          borderRadius: 24,
          boxShadow: '0 24px 60px -20px rgba(15,17,21,0.32), 0 4px 12px -6px rgba(15,17,21,0.08)',
          padding: showCalendly ? '32px 28px 24px' : '40px 36px 32px',
          transition: 'max-width .28s ease',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
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

        {!isSuccess ? (
          <>
            <header style={{ marginBottom: 24, paddingRight: 40 }}>
              <h2 style={{
                fontFamily: serif, fontWeight: 400,
                fontSize: 30, lineHeight: 1.12, letterSpacing: '-0.015em',
                color: C.ink, margin: 0,
              }}>
                {t('trialModal.heading')}{' '}
                <em style={{ fontStyle: 'italic', color: C.accentInk }}>
                  {t('trialModal.headingHighlight')}
                </em>
              </h2>
              <p style={{
                marginTop: 10, marginBottom: 0,
                fontSize: 15, lineHeight: 1.5, color: C.ink3,
              }}>
                {t('trialModal.subheadline') || 'See how many leads you’re losing on WhatsApp — in 60 seconds, free.'}
              </p>
            </header>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
                  color: C.ink2, textTransform: 'none',
                }}>
                  {t('trialModal.workEmailLabel')}
                </label>
                <input
                  required
                  type="email"
                  placeholder={t('trialModal.workEmailPlaceholder')}
                  value={formData.workEmail}
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
                }}>
                  {t('trialModal.phoneLabel')}
                </label>
                <div style={{
                  display: 'flex', alignItems: 'stretch',
                  background: '#fff',
                  border: `1px solid ${C.line2}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'border-color .15s, box-shadow .15s',
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
                        {c.icon} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    type="tel"
                    placeholder={t('trialModal.phonePlaceholder')}
                    value={phoneValue}
                    onChange={(e) => setPhoneValue(e.target.value)}
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

              {/* CRM */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: C.ink2,
                }}>
                  {t('trialModal.crmLabel')}
                </label>
                <select
                  value={formData.crmProvider}
                  onChange={(e) => setFormData({ ...formData, crmProvider: e.target.value as CRMType })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: 14,
                    fontFamily: sans,
                    color: formData.crmProvider ? C.ink : C.ink4,
                    background: '#fff',
                    border: `1px solid ${C.line2}`,
                    borderRadius: 12,
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A6070' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: 36,
                  }}
                >
                  <option value="" disabled>{t('trialModal.crmPlaceholder')}</option>
                  {Object.values(CRMType).map((crm) => (
                    <option key={crm} value={crm}>{crm}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
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
                {isSubmitting
                  ? t('trialModal.submitting')
                  : mode === 'demo'
                    ? t('trialModal.bookDemoButton')
                    : t('trialModal.submitButton')}
              </button>

              <p style={{
                marginTop: 4, marginBottom: 0,
                fontSize: 12, color: C.ink4, textAlign: 'center',
              }}>
                {t('trialModal.disclaimer')}
              </p>
            </form>
          </>
        ) : mode === 'trial' ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', padding: '32px 8px 24px', gap: 20,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `color-mix(in oklab, ${C.accentMint} 22%, transparent)`,
              border: `2px solid color-mix(in oklab, ${C.accentMint} 55%, transparent)`,
              color: C.ok,
            }}>
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h3 style={{
                fontFamily: serif, fontWeight: 400,
                fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.01em',
                color: C.ink, margin: '0 0 6px',
              }}>
                {t('trialModal.successTitle')}
              </h3>
              <p style={{ fontSize: 14, color: C.ink3, margin: 0 }}>
                {t('trialModal.successMessage')}{' '}
                <span style={{ color: C.accentInk, fontWeight: 600 }}>{formData.workEmail}</span>.
              </p>
            </div>
            <div style={{
              fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em',
              color: C.ink4, fontFamily: sans,
            }}>
              {t('trialModal.redirecting')}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `color-mix(in oklab, ${C.accentMint} 22%, transparent)`,
                border: `2px solid color-mix(in oklab, ${C.accentMint} 55%, transparent)`,
                color: C.ok,
              }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: serif, fontWeight: 400, fontSize: 20, lineHeight: 1.15,
                  letterSpacing: '-0.01em', color: C.ink, margin: 0,
                }}>
                  {t('trialModal.successTitle')}
                </h3>
                <p style={{ fontSize: 13, color: C.ink3, margin: 0 }}>Pick a time that works</p>
              </div>
            </div>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/d/cw67-pt3-y2m"
              style={{
                minWidth: 320,
                height: 650,
                width: '100%',
                borderRadius: 14,
                overflow: 'hidden',
                border: `1px solid ${C.line}`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
