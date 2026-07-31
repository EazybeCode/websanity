'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useLocale } from 'next-intl'

// Both brand color codes drive the page's dual accent system.
const HUBSPOT = '#FF7A59' // HubSpot orange
const WHATSAPP = '#25D366' // WhatsApp green

// Explicit hex colors are used throughout instead of Tailwind's text-white /
// text-slate-* tokens: this page lives inside the `.landing` CSS scope, which
// force-overrides those tokens to its own ink color. Arbitrary values below are
// immune to that, so the light theme renders exactly as intended.

// Full country dialing-code list. United States is first so the default '+1'
// shows as US; the rest are alphabetical. Several countries share a code
// (e.g. +1, +7) — that's fine, the value stored is the dialing code.
const COUNTRY_CODES = [
  { code: '+1', label: 'United States' },
  { code: '+93', label: 'Afghanistan' }, { code: '+355', label: 'Albania' }, { code: '+213', label: 'Algeria' },
  { code: '+376', label: 'Andorra' }, { code: '+244', label: 'Angola' }, { code: '+1', label: 'Antigua & Barbuda' },
  { code: '+54', label: 'Argentina' }, { code: '+374', label: 'Armenia' }, { code: '+297', label: 'Aruba' },
  { code: '+61', label: 'Australia' }, { code: '+43', label: 'Austria' }, { code: '+994', label: 'Azerbaijan' },
  { code: '+1', label: 'Bahamas' }, { code: '+973', label: 'Bahrain' }, { code: '+880', label: 'Bangladesh' },
  { code: '+1', label: 'Barbados' }, { code: '+375', label: 'Belarus' }, { code: '+32', label: 'Belgium' },
  { code: '+501', label: 'Belize' }, { code: '+229', label: 'Benin' }, { code: '+975', label: 'Bhutan' },
  { code: '+591', label: 'Bolivia' }, { code: '+387', label: 'Bosnia & Herzegovina' }, { code: '+267', label: 'Botswana' },
  { code: '+55', label: 'Brazil' }, { code: '+673', label: 'Brunei' }, { code: '+359', label: 'Bulgaria' },
  { code: '+226', label: 'Burkina Faso' }, { code: '+257', label: 'Burundi' }, { code: '+855', label: 'Cambodia' },
  { code: '+237', label: 'Cameroon' }, { code: '+1', label: 'Canada' }, { code: '+238', label: 'Cape Verde' },
  { code: '+236', label: 'Central African Republic' }, { code: '+235', label: 'Chad' }, { code: '+56', label: 'Chile' },
  { code: '+86', label: 'China' }, { code: '+57', label: 'Colombia' }, { code: '+269', label: 'Comoros' },
  { code: '+243', label: 'Congo (DRC)' }, { code: '+242', label: 'Congo (Republic)' }, { code: '+506', label: 'Costa Rica' },
  { code: '+225', label: "Côte d'Ivoire" }, { code: '+385', label: 'Croatia' }, { code: '+53', label: 'Cuba' },
  { code: '+357', label: 'Cyprus' }, { code: '+420', label: 'Czechia' }, { code: '+45', label: 'Denmark' },
  { code: '+253', label: 'Djibouti' }, { code: '+1', label: 'Dominica' }, { code: '+1', label: 'Dominican Republic' },
  { code: '+593', label: 'Ecuador' }, { code: '+20', label: 'Egypt' }, { code: '+503', label: 'El Salvador' },
  { code: '+240', label: 'Equatorial Guinea' }, { code: '+291', label: 'Eritrea' }, { code: '+372', label: 'Estonia' },
  { code: '+268', label: 'Eswatini' }, { code: '+251', label: 'Ethiopia' }, { code: '+679', label: 'Fiji' },
  { code: '+358', label: 'Finland' }, { code: '+33', label: 'France' }, { code: '+241', label: 'Gabon' },
  { code: '+220', label: 'Gambia' }, { code: '+995', label: 'Georgia' }, { code: '+49', label: 'Germany' },
  { code: '+233', label: 'Ghana' }, { code: '+30', label: 'Greece' }, { code: '+1', label: 'Grenada' },
  { code: '+502', label: 'Guatemala' }, { code: '+224', label: 'Guinea' }, { code: '+245', label: 'Guinea-Bissau' },
  { code: '+592', label: 'Guyana' }, { code: '+509', label: 'Haiti' }, { code: '+504', label: 'Honduras' },
  { code: '+852', label: 'Hong Kong' }, { code: '+36', label: 'Hungary' }, { code: '+354', label: 'Iceland' },
  { code: '+91', label: 'India' }, { code: '+62', label: 'Indonesia' }, { code: '+98', label: 'Iran' },
  { code: '+964', label: 'Iraq' }, { code: '+353', label: 'Ireland' }, { code: '+972', label: 'Israel' },
  { code: '+39', label: 'Italy' }, { code: '+1', label: 'Jamaica' }, { code: '+81', label: 'Japan' },
  { code: '+962', label: 'Jordan' }, { code: '+7', label: 'Kazakhstan' }, { code: '+254', label: 'Kenya' },
  { code: '+686', label: 'Kiribati' }, { code: '+383', label: 'Kosovo' }, { code: '+965', label: 'Kuwait' },
  { code: '+996', label: 'Kyrgyzstan' }, { code: '+856', label: 'Laos' }, { code: '+371', label: 'Latvia' },
  { code: '+961', label: 'Lebanon' }, { code: '+266', label: 'Lesotho' }, { code: '+231', label: 'Liberia' },
  { code: '+218', label: 'Libya' }, { code: '+423', label: 'Liechtenstein' }, { code: '+370', label: 'Lithuania' },
  { code: '+352', label: 'Luxembourg' }, { code: '+853', label: 'Macau' }, { code: '+261', label: 'Madagascar' },
  { code: '+265', label: 'Malawi' }, { code: '+60', label: 'Malaysia' }, { code: '+960', label: 'Maldives' },
  { code: '+223', label: 'Mali' }, { code: '+356', label: 'Malta' }, { code: '+692', label: 'Marshall Islands' },
  { code: '+222', label: 'Mauritania' }, { code: '+230', label: 'Mauritius' }, { code: '+52', label: 'Mexico' },
  { code: '+691', label: 'Micronesia' }, { code: '+373', label: 'Moldova' }, { code: '+377', label: 'Monaco' },
  { code: '+976', label: 'Mongolia' }, { code: '+382', label: 'Montenegro' }, { code: '+212', label: 'Morocco' },
  { code: '+258', label: 'Mozambique' }, { code: '+95', label: 'Myanmar' }, { code: '+264', label: 'Namibia' },
  { code: '+674', label: 'Nauru' }, { code: '+977', label: 'Nepal' }, { code: '+31', label: 'Netherlands' },
  { code: '+64', label: 'New Zealand' }, { code: '+505', label: 'Nicaragua' }, { code: '+227', label: 'Niger' },
  { code: '+234', label: 'Nigeria' }, { code: '+850', label: 'North Korea' }, { code: '+389', label: 'North Macedonia' },
  { code: '+47', label: 'Norway' }, { code: '+968', label: 'Oman' }, { code: '+92', label: 'Pakistan' },
  { code: '+680', label: 'Palau' }, { code: '+970', label: 'Palestine' }, { code: '+507', label: 'Panama' },
  { code: '+675', label: 'Papua New Guinea' }, { code: '+595', label: 'Paraguay' }, { code: '+51', label: 'Peru' },
  { code: '+63', label: 'Philippines' }, { code: '+48', label: 'Poland' }, { code: '+351', label: 'Portugal' },
  { code: '+974', label: 'Qatar' }, { code: '+40', label: 'Romania' }, { code: '+7', label: 'Russia' },
  { code: '+250', label: 'Rwanda' }, { code: '+1', label: 'Saint Kitts & Nevis' }, { code: '+1', label: 'Saint Lucia' },
  { code: '+1', label: 'Saint Vincent & Grenadines' }, { code: '+685', label: 'Samoa' }, { code: '+378', label: 'San Marino' },
  { code: '+239', label: 'Sao Tome & Principe' }, { code: '+966', label: 'Saudi Arabia' }, { code: '+221', label: 'Senegal' },
  { code: '+381', label: 'Serbia' }, { code: '+248', label: 'Seychelles' }, { code: '+232', label: 'Sierra Leone' },
  { code: '+65', label: 'Singapore' }, { code: '+421', label: 'Slovakia' }, { code: '+386', label: 'Slovenia' },
  { code: '+677', label: 'Solomon Islands' }, { code: '+252', label: 'Somalia' }, { code: '+27', label: 'South Africa' },
  { code: '+82', label: 'South Korea' }, { code: '+211', label: 'South Sudan' }, { code: '+34', label: 'Spain' },
  { code: '+94', label: 'Sri Lanka' }, { code: '+249', label: 'Sudan' }, { code: '+597', label: 'Suriname' },
  { code: '+46', label: 'Sweden' }, { code: '+41', label: 'Switzerland' }, { code: '+963', label: 'Syria' },
  { code: '+886', label: 'Taiwan' }, { code: '+992', label: 'Tajikistan' }, { code: '+255', label: 'Tanzania' },
  { code: '+66', label: 'Thailand' }, { code: '+670', label: 'Timor-Leste' }, { code: '+228', label: 'Togo' },
  { code: '+676', label: 'Tonga' }, { code: '+1', label: 'Trinidad & Tobago' }, { code: '+216', label: 'Tunisia' },
  { code: '+90', label: 'Turkey' }, { code: '+993', label: 'Turkmenistan' }, { code: '+688', label: 'Tuvalu' },
  { code: '+256', label: 'Uganda' }, { code: '+380', label: 'Ukraine' }, { code: '+971', label: 'United Arab Emirates' },
  { code: '+44', label: 'United Kingdom' }, { code: '+598', label: 'Uruguay' }, { code: '+998', label: 'Uzbekistan' },
  { code: '+678', label: 'Vanuatu' }, { code: '+39', label: 'Vatican City' }, { code: '+58', label: 'Venezuela' },
  { code: '+84', label: 'Vietnam' }, { code: '+967', label: 'Yemen' }, { code: '+260', label: 'Zambia' },
  { code: '+263', label: 'Zimbabwe' },
]

// Default country shown first in the phone selector, per site locale.
const LOCALE_DIAL: Record<string, { code: string; label: string }> = {
  en: { code: '+1', label: 'United States' },
  es: { code: '+34', label: 'Spain' },
  br: { code: '+55', label: 'Brazil' },
  tr: { code: '+90', label: 'Turkey' },
}

// Personal / free / regional / ISP / disposable / noise email domains — not
// valid as a "Work Email" on this form. Set for O(1) lookup.
const BLOCKED_EMAIL_DOMAINS = new Set([
  // Free providers
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'yahoo.ca', 'yahoo.fr',
  'yahoo.de', 'yahoo.com.br', 'ymail.com', 'rocketmail.com', 'outlook.com', 'outlook.in', 'outlook.co.uk',
  'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.es', 'live.com', 'live.co.uk', 'msn.com',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'aim.com', 'protonmail.com', 'proton.me', 'pm.me',
  'tutanota.com', 'tuta.io', 'hushmail.com', 'gmx.com', 'gmx.net', 'gmx.de', 'mail.com', 'email.com', 'zohomail.com',
  // Regional free providers
  'yandex.com', 'yandex.ru', 'mail.ru', 'inbox.ru', 'list.ru', 'bk.ru', 'rediffmail.com', 'rediff.com',
  'qq.com', 'foxmail.com', '163.com', '126.com', 'yeah.net', 'sina.com', 'sohu.com', 'aliyun.com',
  'naver.com', 'daum.net', 'hanmail.net', 'nate.com', 'nifty.com', 'biglobe.ne.jp', 'docomo.ne.jp',
  'softbank.ne.jp', 'web.de', 't-online.de', 'freenet.de', 'orange.fr', 'wanadoo.fr', 'laposte.net',
  'free.fr', 'sfr.fr', 'libero.it', 'virgilio.it', 'alice.it', 'tiscali.it', 'seznam.cz', 'centrum.cz',
  'wp.pl', 'onet.pl', 'interia.pl', 'o2.pl', 'sapo.pt', 'terra.com.br', 'uol.com.br', 'bol.com.br',
  'ig.com.br', 'abv.bg', 'mynet.com', 'xtra.co.nz',
  // ISP / telco mailboxes
  'comcast.net', 'verizon.net', 'att.net', 'sbcglobal.net', 'bellsouth.net', 'pacbell.net', 'ameritech.net',
  'cox.net', 'charter.net', 'roadrunner.com', 'rr.com', 'optonline.net', 'windstream.net', 'centurylink.net',
  'frontier.com', 'earthlink.net', 'juno.com', 'netzero.net', 'btinternet.com', 'sky.com', 'virginmedia.com',
  'talktalk.net', 'ntlworld.com', 'blueyonder.co.uk', 'sympatico.ca', 'shaw.ca', 'rogers.com', 'bell.net',
  'telus.net', 'videotron.ca', 'bigpond.com', 'optusnet.com.au', 'iinet.net.au', 'tpg.com.au', 'internode.on.net',
  // Disposable / throwaway
  'mailinator.com', 'guerrillamail.com', 'sharklasers.com', '10minutemail.com', 'temp-mail.org', 'tempmail.com',
  'yopmail.com', 'trashmail.com', 'throwawaymail.com', 'getnada.com', 'dispostable.com', 'maildrop.cc',
  'fakeinbox.com', 'mailnesia.com', 'moakt.com', 'emailondeck.com', 'spamgourmet.com',
  // High-volume noise senders
  'facebookmail.com', 'instagram.com', 'twitter.com', 'x.com', 'pinterest.com', 'reddit.com', 'quora.com',
  'tiktok.com', 'youtube.com', 'medium.com', 'substack.com', 'meetup.com', 'mcsv.net', 'mailchimp.com',
  'sendgrid.net', 'klaviyomail.com', 'constantcontact.com', 'mailerlite.com', 'amazon.com', 'ebay.com',
  'netflix.com', 'spotify.com', 'uber.com', 'doordash.com',
])

const BENEFITS = [
  'Two-way sync so HubSpot contacts and WhatsApp chats stay matched',
  'Every WhatsApp message logged to the right HubSpot timeline',
  'Send templates and reply without leaving HubSpot',
  'Works with the workflows and pipelines you already run',
]

// Official HubSpot sprocket mark.
const HubSpotMark = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill={HUBSPOT} aria-hidden>
    <path d="M18.164 7.931V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.845h-.067a2.2 2.2 0 0 0-2.193 2.194v.067a2.196 2.196 0 0 0 1.252 1.973l.013.006v2.852a6.22 6.22 0 0 0-2.969 1.31l.012-.01-7.86-6.12A2.5 2.5 0 1 0 3.9 5.797l.014.014 7.717 6.005a6.185 6.185 0 0 0-1.041 3.446 6.157 6.157 0 0 0 1.194 3.648l-.013-.019-2.348 2.348a1.978 1.978 0 0 0-.572-.09h-.002a2.006 2.006 0 1 0 2.007 2.006 1.98 1.98 0 0 0-.09-.573l.004.017 2.322-2.322a6.22 6.22 0 1 0 4.899-11.076l-.036-.011zm-1.166 9.302a3.194 3.194 0 1 1 .001-6.389 3.194 3.194 0 0 1 0 6.39z" />
  </svg>
)
const WhatsAppMark = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill={WHATSAPP} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface Errors { name?: string; email?: string; phone?: string }

const LABEL = 'mb-2 block text-sm font-semibold text-[#334155]'
const FIELD_BASE =
  'h-12 w-full rounded-xl bg-[#F8FAFC] px-4 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-colors'
const fieldRing = (hasError?: string) =>
  hasError
    ? 'border border-[#EF4444] focus:ring-2 focus:ring-[#EF444433]'
    : 'border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#25D366] focus:bg-white focus:ring-2 focus:ring-[#25D36633]'

const FieldError = ({ msg }: { msg: string }) => (
  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#DC2626]" role="alert">
    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
    {msg}
  </p>
)

export function GetStartedFormClient() {
  const locale = useLocale()
  const localeDial = LOCALE_DIAL[locale] || LOCALE_DIAL.en
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState(localeDial.code)
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  // Show the locale's country first in the dropdown, then the rest.
  const orderedCountries = useMemo(() => {
    const first = COUNTRY_CODES.find((c) => c.label === localeDial.label) || COUNTRY_CODES[0]
    return [first, ...COUNTRY_CODES.filter((c) => c !== first)]
  }, [localeDial.label])

  // Auto-open the locale variant that matches the visitor's browser language.
  // Only from the default (unprefixed English) page, and only once per session
  // (session flag) so a deliberate manual choice isn't overridden. The page is
  // noindex, so this client redirect has no SEO impact. Crawlers/bots skip it.
  useEffect(() => {
    if (typeof window === 'undefined' || locale !== 'en') return
    try {
      if (sessionStorage.getItem('hmf-locale-routed')) return
      if (/bot|crawler|spider|googlebot|bingbot|slurp/i.test(navigator.userAgent || '')) return
      const primary = ((navigator.languages && navigator.languages[0]) || navigator.language || 'en').toLowerCase()
      const target = primary.startsWith('es') ? 'es' : primary.startsWith('pt') ? 'br' : primary.startsWith('tr') ? 'tr' : null
      sessionStorage.setItem('hmf-locale-routed', '1')
      if (target) window.location.replace(`/${target}/hubspot-marketplace-form${window.location.search}`)
    } catch {
      /* ignore */
    }
  }, [locale])

  const isPersonalEmail = (v: string) => {
    const d = v.split('@')[1]?.toLowerCase().trim()
    return !!d && BLOCKED_EMAIL_DOMAINS.has(d)
  }
  const fieldError = (f: keyof Errors): string | undefined => {
    if (f === 'name') return name.trim().length < 2 ? 'Please enter your name.' : undefined
    if (f === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
      if (isPersonalEmail(email)) return 'Please use your work email.'
      return undefined
    }
    if (f === 'phone') return phone.replace(/\D/g, '').length < 6 ? 'Enter a valid phone number.' : undefined
    return undefined
  }
  const validateOnBlur = (f: keyof Errors) => setErrors((p) => ({ ...p, [f]: fieldError(f) }))
  const validateAll = () => {
    const next: Errors = { name: fieldError('name'), email: fieldError('email'), phone: fieldError('phone') }
    setErrors(next)
    return !next.name && !next.email && !next.phone
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return
    setIsSubmitting(true)
    try {
      // HubSpot form for the /get-started page (portal 40009480, region na1).
      // Fields map to the page's three inputs: Name -> firstname/lastname,
      // Work Email -> email, Work Phone Number -> phone.
      const portalId = '40009480'
      const formId = 'db0e26e2-b980-4881-956e-4cdcb452df65'

      const [firstname, ...rest] = name.trim().split(/\s+/)
      const fields = [
        { name: 'firstname', value: firstname || name.trim() },
        { name: 'lastname', value: rest.join(' ') },
        { name: 'email', value: email.trim() },
        { name: 'phone', value: countryCode + phone.replace(/\D/g, '') },
      ]
      const hutk = document.cookie.split(';').find((c) => c.trim().startsWith('hubspotutk='))?.split('=')[1]
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: typeof window !== 'undefined' ? window.location.href : '',
            pageName: (typeof document !== 'undefined' && document.title) || 'EazyBe Website',
            ...(hutk ? { hutk } : {}),
          },
        }),
      }).catch(() => null)
      // This HubSpot form redirects to the Chrome Web Store install page — honor
      // its redirectUri so "Install Free" actually takes the user to install.
      let redirectUri: string | undefined
      try {
        redirectUri = res ? (await res.json())?.redirectUri : undefined
      } catch {
        /* no JSON body — ignore */
      }
      ;(window as any).gtag?.('event', `hubspot_whatsapp_submit_${locale}`)
      setIsSuccess(true)
      if (redirectUri) window.open(redirectUri, '_blank', 'noopener,noreferrer')
    } catch {
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-8 h-96 w-96 rounded-full blur-3xl" style={{ background: 'rgba(255,122,89,0.10)' }} />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-3xl" style={{ background: 'rgba(37,211,102,0.10)' }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* ── LEFT: integration pitch ── */}
        <div>
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_10px_30px_-14px_rgba(255,122,89,0.6)]">
              <HubSpotMark />
            </span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-px w-4" style={{ background: HUBSPOT }} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#hw)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <defs><linearGradient id="hw" x1="0" y1="0" x2="24" y2="0"><stop offset="0" stopColor={HUBSPOT} /><stop offset="1" stopColor={WHATSAPP} /></linearGradient></defs>
                <path d="M4 8h13m0 0-4-4m4 4-4 4M20 16H7m0 0 4-4m-4 4 4 4" />
              </svg>
              <span className="h-px w-4" style={{ background: WHATSAPP }} />
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_10px_30px_-14px_rgba(37,211,102,0.6)]">
              <WhatsAppMark />
            </span>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide" style={{ borderColor: 'rgba(255,122,89,0.35)', color: '#D9603F', background: 'rgba(255,122,89,0.08)' }}>
            HubSpot <span style={{ color: '#94A3B8' }}>×</span> WhatsApp
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#0F172A] md:text-[42px]">
            Run WhatsApp{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(100deg, ${HUBSPOT}, ${WHATSAPP})` }}>
              inside HubSpot
            </span>
          </h1>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#475569]">
            Connect the two in minutes. Message customers on WhatsApp, log every conversation to the right
            HubSpot contact, and keep your pipeline current without the copy-paste.
          </p>

          <ul className="mt-7 space-y-3.5">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-[#1E293B]">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(37,211,102,0.16)', color: '#0E9F55' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-[#94A3B8]">
            Trusted by sales teams syncing WhatsApp with HubSpot, Salesforce and Zoho.
          </p>
        </div>

        {/* ── RIGHT: premium form card (light, dual-gradient border) ── */}
        <div className="relative rounded-[20px] p-[1.5px] shadow-[0_30px_80px_-30px_rgba(255,122,89,0.35)]" style={{ backgroundImage: `linear-gradient(150deg, #FF8A63, ${HUBSPOT} 55%, #F5673F)` }}>
          <div className="rounded-[18px] bg-white p-6 md:p-8">
            {isSuccess ? (
              <div className="py-6 text-center motion-safe:animate-[fadeIn_.3s_ease-out]">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(37,211,102,0.14)', color: '#0E9F55' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A]">You&apos;re all set</h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#475569]">
                  Thanks, {name.trim().split(/\s+/)[0] || 'there'}. We&apos;ll reach out to connect your HubSpot to
                  WhatsApp and get you going. Check your inbox shortly.
                </p>
                <a href={locale === 'en' ? '/' : `/${locale}`} className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] px-5 text-sm font-medium text-[#334155] transition-colors hover:border-[#CBD5E1] hover:bg-[#F8FAFC]">
                  Back to home
                </a>
              </div>
            ) : (
              <>
                <header className="mb-6">
                  <h2 className="text-xl font-bold text-[#0F172A] md:text-2xl">Start your HubSpot + WhatsApp setup</h2>
                  <p className="mt-1.5 text-sm text-[#64748B]">Tell us where to reach you. It takes under a minute.</p>
                </header>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="f-name" className={LABEL}>Name<span className="ml-1 text-[#DC2626]">*</span></label>
                    <input id="f-name" type="text" required autoComplete="name" placeholder="Jane Cooper"
                      value={name} onChange={(e) => setName(e.target.value)} onBlur={() => validateOnBlur('name')}
                      className={`${FIELD_BASE} ${fieldRing(errors.name)}`} />
                    {errors.name && <FieldError msg={errors.name} />}
                  </div>

                  <div>
                    <label htmlFor="f-email" className={LABEL}>Work Email<span className="ml-1 text-[#DC2626]">*</span></label>
                    <input id="f-email" type="email" inputMode="email" required autoComplete="email" placeholder="jane@company.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => validateOnBlur('email')}
                      className={`${FIELD_BASE} ${fieldRing(errors.email)}`} />
                    {errors.email && <FieldError msg={errors.email} />}
                  </div>

                  <div>
                    <label htmlFor="f-phone" className={LABEL}>Phone Number<span className="ml-1 text-[#DC2626]">*</span></label>
                    <div className={`flex items-stretch overflow-hidden rounded-xl bg-[#F8FAFC] transition-colors ${errors.phone ? 'border border-[#EF4444] focus-within:ring-2 focus-within:ring-[#EF444433]' : 'border border-[#E2E8F0] hover:border-[#CBD5E1] focus-within:border-[#25D366] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#25D36633]'}`}>
                      <select aria-label="Country code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
                        className="h-12 shrink-0 cursor-pointer border-r border-[#E2E8F0] bg-transparent pl-4 pr-2 text-sm text-[#334155] outline-none">
                        {orderedCountries.map((c) => (
                          <option key={`${c.code}-${c.label}`} value={c.code} className="text-[#0F172A]">{c.label} {c.code}</option>
                        ))}
                      </select>
                      <input id="f-phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="234 567 8900"
                        value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={() => validateOnBlur('phone')}
                        className="h-12 w-full bg-transparent px-4 text-[15px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]" />
                    </div>
                    {errors.phone && <FieldError msg={errors.phone} />}
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="group relative mt-1 flex h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-[15px] font-semibold text-[#FFFFFF] shadow-[0_14px_32px_-12px_rgba(255,122,89,0.65)] ring-1 ring-inset ring-white/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_-12px_rgba(255,122,89,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      backgroundImage: `linear-gradient(180deg, #FF8A63 0%, ${HUBSPOT} 55%, #F5673F 100%)`,
                      textShadow: '0 1px 1px rgba(2,6,23,0.22)',
                    }}>
                    {/* persistent top glass sheen for depth */}
                    <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.30), rgba(255,255,255,0))' }} />
                    {/* brighten on hover */}
                    <span aria-hidden className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-200 group-hover:bg-white/[0.10]" />
                    {isSubmitting ? (
                      <span className="relative inline-flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden><circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                        Installing…
                      </span>
                    ) : (
                      <span className="relative inline-flex items-center gap-2">
                        Install Free
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs leading-relaxed text-[#94A3B8]">Free to start, no credit card.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
