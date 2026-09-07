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

const CRM_OPTIONS = ['HubSpot', 'Salesforce', 'Zoho', 'Other', 'None']

// After a successful submit, the visitor lands on the page for their CRM
// (1s delay so the success state registers before navigation).
const CRM_REDIRECTS: Record<string, string> = {
  HubSpot: '/hubspot-whatsapp-integration',
  Salesforce: '/salesforce-whatsapp-integration',
  Zoho: '/zoho-whatsapp-integration',
  Other: '/',
  None: '/',
}

export function SalesGrowthLpClient() {
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [crm, setCrm] = useState('')
  const [errors, setErrors] = useState<{ email?: string; phone?: string; crm?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const validate = () => {
    const next: typeof errors = {}
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const domain = email.split('@')[1]?.toLowerCase()
    if (!email.trim()) next.email = 'Work email is required'
    else if (!emailOk) next.email = 'Enter a valid email address'
    else if (PERSONAL_EMAIL_DOMAINS.includes(domain)) next.email = 'Please use your work email'
    if (!phone.trim()) next.phone = 'Phone number is required'
    else if (phone.trim().length < 7) next.phone = 'Enter a valid phone number'
    if (!crm) next.crm = 'Please pick an option'
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
        { name: 'language', value: 'English' },
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
      ;(window as any).gtag?.('event', 'lp_sales_growth_submit')
      setDone(true)
      setTimeout(() => { window.location.href = CRM_REDIRECTS[crm] || '/' }, 1000)
    } catch {
      setDone(true)
      setTimeout(() => { window.location.href = CRM_REDIRECTS[crm] || '/' }, 1000)
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
              <h1 style={{ fontSize: 21, fontWeight: 700, color: '#0F1115', margin: '0 0 8px' }}>Thanks — you&apos;re in</h1>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#5A6072', margin: 0 }}>
                Taking you to the right place…
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
                Grow your WhatsApp sales
              </h1>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#5A6072', margin: '0 0 20px' }}>
                Tell us where to reach you and our team will show you how Eazybe fits your CRM.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="lp-email" style={labelStyle}>Work Email <span style={{ color: '#C0362C' }}>*</span></label>
                  <input
                    id="lp-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                    disabled={submitting}
                    style={{ ...inputBase, borderColor: errors.email ? '#C0362C' : '#D9DDE7' }}
                  />
                  {errors.email && <p style={errStyle} role="alert">{errors.email}</p>}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="lp-phone" style={labelStyle}>Phone Number <span style={{ color: '#C0362C' }}>*</span></label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <select
                      aria-label="Country code"
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
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })) }}
                      disabled={submitting}
                      style={{ ...inputBase, borderColor: errors.phone ? '#C0362C' : '#D9DDE7' }}
                    />
                  </div>
                  {errors.phone && <p style={errStyle} role="alert">{errors.phone}</p>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="lp-crm" style={labelStyle}>Which CRM You Used <span style={{ color: '#C0362C' }}>*</span></label>
                  <select
                    id="lp-crm"
                    value={crm}
                    onChange={(e) => { setCrm(e.target.value); setErrors((p) => ({ ...p, crm: undefined })) }}
                    disabled={submitting}
                    style={{ ...inputBase, cursor: 'pointer', color: crm ? '#0F1115' : '#8A8F9E', borderColor: errors.crm ? '#C0362C' : '#D9DDE7' }}
                  >
                    <option value="" disabled>Select your CRM</option>
                    {CRM_OPTIONS.map((o) => (
                      <option key={o} value={o} style={{ color: '#0F1115' }}>{o}</option>
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
                  {submitting ? 'Submitting…' : 'Get started free →'}
                </button>
                <p style={{ marginTop: 12, fontSize: 11.5, lineHeight: 1.5, color: '#8A8F9E', textAlign: 'center', margin: '12px 0 0' }}>
                  Free 14-day trial • No credit card required
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
