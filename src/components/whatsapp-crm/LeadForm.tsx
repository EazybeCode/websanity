'use client'

import { useEffect, useRef, useState } from 'react'
import type { PageContent } from '@/data/whatsapp-crm-content'
import { COUNTRIES, flagOf } from '@/data/country-codes'

/**
 * Three fields. Locked by the brief — no company size, no name, no message.
 * The whole page is built around this friction level.
 *
 * Appears twice (hero + final CTA). The mobile sticky bar scrolls to the hero
 * instance rather than opening a third.
 */

type Field = 'email' | 'phone' | 'crm'


const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Same list the site's other lead forms use (LeadGenerationForm, TrialModal,
 * DemoModal). The field is labelled "Work email", so a personal address is a
 * failed condition rather than a valid answer.
 */
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'yahoo.com.br',
  'hotmail.com', 'hotmail.com.br', 'outlook.com', 'outlook.com.br', 'live.com',
  'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com', 'protonmail.com',
  'proton.me', 'mail.com', 'zoho.com', 'yandex.com', 'gmx.com',
  'rediffmail.com', 'bol.com.br', 'uol.com.br', 'terra.com.br', 'ig.com.br',
]

const isPersonal = (email: string) =>
  PERSONAL_EMAIL_DOMAINS.includes(email.trim().toLowerCase().split('@')[1] ?? '')

/**
 * The national number only — the dialling code lives in its own select, so
 * the input never contains a prefix the user has to work around. Brazilian
 * numbers get their familiar (DD) NNNNN-NNNN shape; everywhere else stays
 * unformatted, because guessing another country's grouping is worse than
 * leaving it alone.
 */
function maskPhone(raw: string, dial: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 15)
  if (dial !== '+55') return d
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Returns the specific reason a field fails, or null when it passes. */
type Reason = 'email' | 'emailPersonal' | 'phone' | 'phoneShort' | 'crm'

const reasonFor = (f: Field, v: string, dial = '+55'): Reason | null => {
  if (f === 'email') {
    const email = v.trim()
    if (!EMAIL.test(email)) return 'email'
    if (isPersonal(email)) return 'emailPersonal'
    return null
  }
  if (f === 'phone') {
    const d = v.replace(/\D/g, '')
    if (!d) return 'phone'
    // Brazil is the campaign's home market and has a known shape: 10 digits
    // (landline) or 11 (mobile), area code included. Everywhere else only
    // gets the ITU E.164 bounds — a stricter per-country rule would reject
    // valid numbers far more often than it would catch typos.
    if (dial === '+55') {
      if (d.length < 10) return 'phoneShort'
      if (d.length > 11) return 'phone'
      return null
    }
    if (d.length < 6) return 'phoneShort'
    if (d.length > 15) return 'phone'
    return null
  }
  return v ? null : 'crm'
}

const invalid = (f: Field, v: string, dial = '+55') => reasonFor(f, v, dial) !== null

const input =
  'h-[52px] w-full rounded-xl border border-wc-rule bg-white px-4 text-base text-wc-ink ' +
  'outline-none transition-colors placeholder:text-wc-ink-3 ' +
  'focus:border-wc-accent focus:ring-4 focus:ring-wc-accent/10 ' +
  'aria-[invalid=true]:border-wc-danger'

export default function LeadForm({
  location,
  cta,
  presetCrm,
  content,
}: {
  location: 'hero' | 'final'
  cta: string
  presetCrm?: string
  content: PageContent
}) {
  const f = content.form
  const [values, setValues] = useState({ email: '', phone: '', crm: presetCrm ?? '' })
  const [dial, setDial] = useState('+55')
  const [errors, setErrors] = useState<Partial<Record<Field, Reason>>>({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (presetCrm) setValues((v) => ({ ...v, crm: presetCrm }))
  }, [presetCrm])

  const push = (event: string, payload: Record<string, unknown> = {}) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, form_location: location, ...payload })
  }

  const onFirstFocus = () => {
    if (started.current) return
    started.current = true
    push('form_start')
  }

  const set = (field: Field, raw: string) => {
    const value = field === 'phone' ? maskPhone(raw, dial) : raw
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field] && !invalid(field, value, dial)) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  // Eazybe connects to a CRM the team already runs, so "Other / none yet" is
  // not a lead this form can serve. Blocked at submit, with the reason shown.
  const noCrm = values.crm === f.noCrmValue

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending || done || noCrm) return // double-submit + unsupported-CRM guard

    const found: Partial<Record<Field, Reason>> = {}
    ;(['email', 'phone', 'crm'] as Field[]).forEach((k) => {
      const reason = reasonFor(k, values[k], dial)
      if (reason) found[k] = reason
    })
    setErrors(found)
    const first = (Object.keys(found) as Field[])[0]
    if (first) {
      document.getElementById(`${location}-${first}`)?.focus()
      return
    }

    setSending(true)
    try {
      // /track/crm-lead, never /api/* — prod nginx 502s that prefix.
      const res = await fetch('/track/crm-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: `${dial}${values.phone.replace(/\D/g, '')}`,
          form_location: location,
          // HubSpot's own visitor cookie — without it the submission lands
          // with no session attached and attribution is lost.
          hutk: document.cookie.match(/hubspotutk=([^;]+)/)?.[1] ?? '',
          page_uri: window.location.href,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))

      /**
       * PRIMARY Google Ads conversion — only after the server confirms 200,
       * and it must be allowed to fire BEFORE we navigate away. A bare
       * `location.href = …` right after the push routinely cancels the
       * in-flight tag request and the conversion is simply lost.
       *
       * `eventCallback` is GTM's "all tags for this event have run" hook.
       * The timer is the safety net for when GTM is absent or slow —
       * whichever comes first wins, and `go()` only ever runs once, so a
       * late callback cannot double-navigate.
       */
      push('generate_lead', { crm: values.crm })
      // Google Ads — Event 1: Form Fill (direct gtag; tag loaded in layout).
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-11159326120/w1YnCPum8t8cEKibl8kp',
      })

      // Confirmation first, then the hand-off. The pause doubles as the
      // window the Google Ads tag needs: navigating in the same tick as the
      // dataLayer push routinely cancels the in-flight request and the
      // conversion is lost. 2.6s is long enough to read two lines and far
      // more than the tag needs.
      setDone(true)
      window.setTimeout(() => {
        // Distinct WhatsApp-redirect event, fired at the actual hand-off so
        // it can map to its own Google Ads conversion separate from the lead.
        push('redirect_whatsapp', { crm: values.crm, destination: f.thankYouUrl })
        // Google Ads — Event 2: WhatsApp redirect. gtag uses sendBeacon, so
        // the hit survives the navigation on the next line.
        window.gtag?.('event', 'conversion', {
          send_to: 'AW-11159326120/n2TiCNf49N8cEKibl8kp',
          value: 1.0,
          currency: 'INR',
        })
        window.location.href = f.thankYouUrl
      }, 2600)
    } catch {
      // The backend is real now. A failure means the lead was NOT captured,
      // so say so instead of showing a success state and losing the buyer.
      setFailed(true)
      setSending(false)
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-wc-rule bg-white p-7 text-center shadow-[0_18px_44px_-20px_rgba(12,21,16,0.3)]"
      >
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-wc-tint text-wc-accent" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="text-[18px] font-semibold tracking-tight text-wc-ink">{f.success.title}</h3>
        <p className="mx-auto mt-2 max-w-[34ch] text-[14px] leading-relaxed text-wc-ink-2">{f.success.body}</p>
        <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-wc-ink-3">
          <span className="wc-live size-1.5 rounded-full bg-wc-accent-mid" />
          {f.success.redirecting}
        </p>
      </div>
    )
  }

  const err = (k: Field) =>
    errors[k] ? <p role="alert" className="mt-1.5 text-[14px] text-wc-danger">{f.errors[k]}</p> : null

  return (
    <form
      noValidate
      onSubmit={submit}
      onFocus={onFirstFocus}
      className="rounded-2xl border border-wc-rule bg-white p-5 shadow-[0_18px_44px_-20px_rgba(12,21,16,0.3)] sm:p-6"
    >
      {/* Says what happens next, rather than repeating the button label
          directly above the button. */}
      <div className="mb-5">
        <h2 className="wc-sans text-[20px] font-semibold leading-snug text-wc-ink">{f.title}</h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-wc-ink-2">{f.subtitle}</p>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor={`${location}-email`} className="mb-1.5 block text-[14px] font-semibold text-wc-ink">{f.email}</label>
          <input
            id={`${location}-email`} type="email" inputMode="email" autoComplete="email"
            value={values.email} onChange={(e) => set('email', e.target.value)}
            onBlur={() => setErrors((s) => ({ ...s, email: reasonFor('email', values.email, dial) ?? undefined }))}
            aria-invalid={!!errors.email} className={input}
          />
          {err('email')}
        </div>

        <div>
          <label htmlFor={`${location}-phone`} className="mb-1.5 block text-[14px] font-semibold text-wc-ink">{f.phone}</label>
          <div className="flex gap-2">
            <select
              aria-label={f.country}
              value={dial}
              onChange={(e) => {
                setDial(e.target.value)
                // Grouping is country-specific, so digits already typed have
                // to be re-formatted for the new code.
                setValues((v) => ({ ...v, phone: maskPhone(v.phone, e.target.value) }))
                setErrors((er) => ({ ...er, phone: undefined }))
              }}
              className={`${input.replace('w-full ', '')} w-[118px] shrink-0 cursor-pointer px-2.5 text-[15px]`}
            >
              {COUNTRIES.map((cc) => (
                <option key={cc.iso} value={cc.dial}>
                  {flagOf(cc.iso)} {cc.dial}
                </option>
              ))}
            </select>
            <input
              id={`${location}-phone`} type="tel" inputMode="tel" autoComplete="tel"
              value={values.phone} onChange={(e) => set('phone', e.target.value)}
              onBlur={() => setErrors((s) => ({ ...s, phone: reasonFor('phone', values.phone, dial) ?? undefined }))}
              aria-invalid={!!errors.phone} className={`${input} min-w-0 flex-1`}
            />
          </div>
          {err('phone')}
        </div>

        <div>
          <label htmlFor={`${location}-crm`} className="mb-1.5 block text-[14px] font-semibold text-wc-ink">{f.crm}</label>
          <select
            id={`${location}-crm`} value={values.crm}
            onChange={(e) => set('crm', e.target.value)}
            onBlur={() => setErrors((s) => ({ ...s, crm: reasonFor('crm', values.crm, dial) ?? undefined }))}
            aria-invalid={!!errors.crm} className={`${input} cursor-pointer`}
          >
            <option value="">{f.crmPlaceholder}</option>
            {f.crmOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {err('crm')}
        </div>
      </div>

      <button
        type="submit"
        disabled={sending || noCrm}
        className="wc-btn mt-4 flex h-[54px] w-full cursor-pointer items-center justify-center rounded-xl bg-wc-accent px-6 text-[16px] font-semibold text-white shadow-[0_14px_34px_-16px_rgba(14,122,70,0.7)] transition-all hover:-translate-y-px hover:bg-wc-accent-deep disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? f.sending : cta}
      </button>

      {noCrm && (
        <p className="mt-3 rounded-xl border border-wc-rule bg-wc-soft px-4 py-3 text-[13px] leading-relaxed text-wc-ink-2">
          {f.noCrmNote}
        </p>
      )}
      {failed && (
        <p role="alert" className="mt-3 text-center text-[13px] font-semibold text-wc-danger">
          {f.error}
        </p>
      )}
    </form>
  )
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    // `gtag` is declared globally (as `any`) in FbPageClient.tsx — do not
    // redeclare it here; a differing optional modifier breaks the build.
  }
}
