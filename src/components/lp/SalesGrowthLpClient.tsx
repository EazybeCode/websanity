'use client'

import React, { useState } from 'react'
import {
  CHROME_STORE_WEBSITE_FORM_URL,
  getHubSpotAttributionFields,
} from '@/utils/openChromeExtensionStore'

// Paid landing page: the HubSpot WhatsApp integration page sits blurred
// behind a single lead form. English-only, noindex — never linked from nav.

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'yahoo.co.in', 'hotmail.com', 'outlook.com',
  'live.com', 'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'mail.com', 'zoho.com', 'yandex.com',
  'gmx.com', 'rediffmail.com',
]

const COUNTRY_CODES = [
  { code: '+91', country: 'IN' },
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+55', country: 'BR' },
  { code: '+52', country: 'MX' },
  { code: '+34', country: 'ES' },
  { code: '+90', country: 'TR' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'SA' },
  { code: '+49', country: 'DE' },
  { code: '+33', country: 'FR' },
  { code: '+39', country: 'IT' },
  { code: '+31', country: 'NL' },
  { code: '+65', country: 'SG' },
  { code: '+62', country: 'ID' },
  { code: '+63', country: 'PH' },
  { code: '+61', country: 'AU' },
  { code: '+27', country: 'ZA' },
  { code: '+234', country: 'NG' },
]

// Submitted CRM values stay canonical English so HubSpot reporting is
// consistent across locales; only the visible labels localize.
const CRM_VALUES = ['HubSpot', 'Salesforce', 'Zoho', 'Other', 'None'] as const

export type LpLocale = 'en' | 'es' | 'br'

// Full copy per locale (exact translations of the EN card).
const LP_TX: Record<LpLocale, any> = {
  en: {
    htmlLang: 'en', language: 'English', defaultCode: '+91', prefix: '',
    h1: 'Grow your WhatsApp sales',
    sub: 'Tell us where to reach you and our team will show you how Eazybe fits your CRM.',
    emailLabel: 'Work Email', emailPlaceholder: 'you@company.com',
    phoneLabel: 'Phone Number', phonePlaceholder: '98765 43210', countryAria: 'Country code',
    crmLabel: 'Which CRM You Used', crmPlaceholder: 'Select your CRM',
    crmLabels: { HubSpot: 'HubSpot', Salesforce: 'Salesforce', Zoho: 'Zoho', Other: 'Other', None: 'None' },
    errEmailReq: 'Work email is required', errEmailInvalid: 'Enter a valid email address', errEmailPersonal: 'Please use your work email',
    errPhoneReq: 'Phone number is required', errPhoneInvalid: 'Enter a valid phone number', errCrm: 'Please pick an option',
    submit: 'Get started free →', submitting: 'Submitting…',
    doneTitle: "Thanks — you're in", doneBody: 'Taking you to the right place…',
  },
  es: {
    htmlLang: 'es', language: 'Spanish', defaultCode: '+34', prefix: '/es',
    h1: 'Haz crecer tus ventas por WhatsApp',
    sub: 'Dinos dónde contactarte y nuestro equipo te mostrará cómo Eazybe encaja con tu CRM.',
    emailLabel: 'Correo de trabajo', emailPlaceholder: 'tu@empresa.com',
    phoneLabel: 'Número de teléfono', phonePlaceholder: '612 345 678', countryAria: 'Código de país',
    crmLabel: 'Qué CRM usas', crmPlaceholder: 'Selecciona tu CRM',
    crmLabels: { HubSpot: 'HubSpot', Salesforce: 'Salesforce', Zoho: 'Zoho', Other: 'Otro', None: 'Ninguno' },
    errEmailReq: 'El correo de trabajo es obligatorio', errEmailInvalid: 'Introduce un correo válido', errEmailPersonal: 'Usa tu correo de trabajo',
    errPhoneReq: 'El número de teléfono es obligatorio', errPhoneInvalid: 'Introduce un número válido', errCrm: 'Selecciona una opción',
    submit: 'Comienza gratis →', submitting: 'Enviando…',
    doneTitle: '¡Listo! Ya estás dentro', doneBody: 'Te llevamos al lugar indicado…',
  },
  br: {
    htmlLang: 'pt-BR', language: 'Portuguese', defaultCode: '+55', prefix: '/br',
    h1: 'Faça suas vendas no WhatsApp crescerem',
    sub: 'Diga onde falar com você e nosso time mostra como a Eazybe se encaixa no seu CRM.',
    emailLabel: 'E-mail de trabalho', emailPlaceholder: 'voce@empresa.com',
    phoneLabel: 'Número de telefone', phonePlaceholder: '11 91234 5678', countryAria: 'Código do país',
    crmLabel: 'Qual CRM você usa', crmPlaceholder: 'Selecione seu CRM',
    crmLabels: { HubSpot: 'HubSpot', Salesforce: 'Salesforce', Zoho: 'Zoho', Other: 'Outro', None: 'Nenhum' },
    errEmailReq: 'O e-mail de trabalho é obrigatório', errEmailInvalid: 'Digite um e-mail válido', errEmailPersonal: 'Use seu e-mail de trabalho',
    errPhoneReq: 'O número de telefone é obrigatório', errPhoneInvalid: 'Digite um número válido', errCrm: 'Selecione uma opção',
    submit: 'Comece grátis →', submitting: 'Enviando…',
    doneTitle: 'Pronto! Você está dentro', doneBody: 'Levando você para o lugar certo…',
  },
}

// After a successful submit, the visitor lands on the page for their CRM in
// their own locale (1s delay so the success state registers first).
const crmRedirect = (crm: string, prefix: string): string => {
  const map: Record<string, string> = {
    HubSpot: '/hubspot-whatsapp-integration',
    Salesforce: '/salesforce-whatsapp-integration',
    Zoho: '/zoho-whatsapp-integration',
  }
  if (map[crm]) return `${prefix}${map[crm]}`
  return prefix || '/'
}

export function SalesGrowthLpClient({ locale = 'en' }: { locale?: LpLocale }) {
  const tx = LP_TX[locale] || LP_TX.en
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState(tx.defaultCode)
  const [phone, setPhone] = useState('')
  const [crm, setCrm] = useState('')
  const [errors, setErrors] = useState<{ email?: string; phone?: string; crm?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const validate = () => {
    const next: typeof errors = {}
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const domain = email.split('@')[1]?.toLowerCase()
    if (!email.trim()) next.email = tx.errEmailReq
    else if (!emailOk) next.email = tx.errEmailInvalid
    else if (PERSONAL_EMAIL_DOMAINS.includes(domain)) next.email = tx.errEmailPersonal
    if (!phone.trim()) next.phone = tx.errPhoneReq
    else if (phone.trim().length < 7) next.phone = tx.errPhoneInvalid
    if (!crm) next.crm = tx.errCrm
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      // Dedicated HubSpot form for this LP (portal 40009480, region na1) —
      // the custom frontend posts straight to its Forms API endpoint, no
      // embed script needed.
      const portalId = '40009480'
      const formId = '33a52d62-3ee7-4b06-8976-ec0c1fde9658'
      const fields = [
        { name: 'email', value: email },
        { name: 'language', value: tx.language },
        // Contact property the site's other lead form also sets — the CRM
        // choice lands on the contact record under "CRM used".
        { name: 'crm_used', value: crm },
        { name: 'source_name', value: 'lp-whatsapp-sales-growth' },
        { name: 'phone', value: countryCode + phone.replace(/\D/g, '') },
        ...getHubSpotAttributionFields(CHROME_STORE_WEBSITE_FORM_URL),
      ]
      const hutk = document.cookie.split(';').find((c) => c.trim().startsWith('hubspotutk='))?.split('=')[1]
      await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: window.location.href,
            pageName: document.title || 'WhatsApp Sales Growth LP',
            ...(hutk ? { hutk } : {}),
          },
        }),
      })
      ;(window as any).gtag?.('event', `lp_sales_growth_submit_${locale}`)
      setDone(true)
      setTimeout(() => { window.location.href = crmRedirect(crm, tx.prefix) }, 1000)
    } catch {
      setDone(true)
      setTimeout(() => { window.location.href = crmRedirect(crm, tx.prefix) }, 1000)
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%', height: 44, borderRadius: 10, border: '1px solid #D9DDE7',
    background: '#fff', color: '#0F1115', fontSize: 14, padding: '0 14px',
    outline: 'none', fontFamily: 'inherit',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 13, fontWeight: 600, color: '#3A3F4C', marginBottom: 6,
  }
  const errStyle: React.CSSProperties = { marginTop: 5, fontSize: 12.5, color: '#C0362C' }

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Blurred page backdrop (static capture of /hubspot-whatsapp-integration) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lp/sales-growth-bg.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top center',
          filter: 'blur(10px) brightness(0.92)', transform: 'scale(1.06)',
        }}
      />
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,21,0.35)' }}
      />

      {/* Form card */}
      <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div
          style={{
            width: '100%', maxWidth: 420, background: '#ffffff', borderRadius: 18,
            padding: '30px 28px', boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)',
          }}
        >
          {done ? (
            <div style={{ textAlign: 'center', padding: '14px 0' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#DDF0E7', color: '#1F6B4A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <h1 style={{ fontSize: 21, fontWeight: 700, color: '#0F1115', margin: '0 0 8px' }}>{tx.doneTitle}</h1>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#5A6072', margin: 0 }}>
                {tx.doneBody}
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Eazybe" style={{ height: 26, width: 'auto' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              {/* globals.css force-capitalises h1s site-wide; keep ad message match. */}
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0F1115', margin: '0 0 6px', lineHeight: 1.25, textTransform: 'none' }}>
                {tx.h1}
              </h1>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#5A6072', margin: '0 0 20px' }}>
                {tx.sub}
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="lp-email" style={labelStyle}>{tx.emailLabel} <span style={{ color: '#C0362C' }}>*</span></label>
                  <input
                    id="lp-email"
                    type="email"
                    autoComplete="email"
                    placeholder={tx.emailPlaceholder}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                    disabled={submitting}
                    style={{ ...inputBase, borderColor: errors.email ? '#C0362C' : '#D9DDE7' }}
                  />
                  {errors.email && <p style={errStyle} role="alert">{errors.email}</p>}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="lp-phone" style={labelStyle}>{tx.phoneLabel} <span style={{ color: '#C0362C' }}>*</span></label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <select
                      aria-label={tx.countryAria}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={submitting}
                      style={{ ...inputBase, width: 108, flexShrink: 0, padding: '0 8px', cursor: 'pointer' }}
                    >
                      {COUNTRY_CODES.map((cc) => (
                        <option key={`${cc.code}-${cc.country}`} value={cc.code}>{cc.country} {cc.code}</option>
                      ))}
                    </select>
                    <input
                      id="lp-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={tx.phonePlaceholder}
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })) }}
                      disabled={submitting}
                      style={{ ...inputBase, borderColor: errors.phone ? '#C0362C' : '#D9DDE7' }}
                    />
                  </div>
                  {errors.phone && <p style={errStyle} role="alert">{errors.phone}</p>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="lp-crm" style={labelStyle}>{tx.crmLabel} <span style={{ color: '#C0362C' }}>*</span></label>
                  <select
                    id="lp-crm"
                    value={crm}
                    onChange={(e) => { setCrm(e.target.value); setErrors((p) => ({ ...p, crm: undefined })) }}
                    disabled={submitting}
                    style={{ ...inputBase, cursor: 'pointer', color: crm ? '#0F1115' : '#8A8F9E', borderColor: errors.crm ? '#C0362C' : '#D9DDE7' }}
                  >
                    <option value="" disabled>{tx.crmPlaceholder}</option>
                    {CRM_VALUES.map((o) => (
                      <option key={o} value={o} style={{ color: '#0F1115' }}>{tx.crmLabels[o]}</option>
                    ))}
                  </select>
                  {errors.crm && <p style={errStyle} role="alert">{errors.crm}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%', height: 46, borderRadius: 100, border: 'none', cursor: submitting ? 'default' : 'pointer',
                    background: '#6c5cc1', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? tx.submitting : tx.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
