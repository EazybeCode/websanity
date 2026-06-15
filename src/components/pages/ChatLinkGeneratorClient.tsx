'use client'

import { useMemo, useRef, useState } from 'react'

const COUNTRY_CODES = [
  { code: '+1', label: 'US/CA', flag: '🇺🇸' },
  { code: '+52', label: 'MX', flag: '🇲🇽' },
  { code: '+44', label: 'UK', flag: '🇬🇧' },
  { code: '+49', label: 'DE', flag: '🇩🇪' },
  { code: '+33', label: 'FR', flag: '🇫🇷' },
  { code: '+34', label: 'ES', flag: '🇪🇸' },
  { code: '+39', label: 'IT', flag: '🇮🇹' },
  { code: '+31', label: 'NL', flag: '🇳🇱' },
  { code: '+55', label: 'BR', flag: '🇧🇷' },
  { code: '+54', label: 'AR', flag: '🇦🇷' },
  { code: '+91', label: 'IN', flag: '🇮🇳' },
  { code: '+86', label: 'CN', flag: '🇨🇳' },
  { code: '+81', label: 'JP', flag: '🇯🇵' },
  { code: '+82', label: 'KR', flag: '🇰🇷' },
  { code: '+65', label: 'SG', flag: '🇸🇬' },
  { code: '+62', label: 'ID', flag: '🇮🇩' },
  { code: '+63', label: 'PH', flag: '🇵🇭' },
  { code: '+66', label: 'TH', flag: '🇹🇭' },
  { code: '+84', label: 'VN', flag: '🇻🇳' },
  { code: '+971', label: 'UAE', flag: '🇦🇪' },
  { code: '+966', label: 'SA', flag: '🇸🇦' },
  { code: '+90', label: 'TR', flag: '🇹🇷' },
  { code: '+61', label: 'AU', flag: '🇦🇺' },
  { code: '+27', label: 'ZA', flag: '🇿🇦' },
  { code: '+20', label: 'EG', flag: '🇪🇬' },
]

function digitsOnly(s: string): string {
  return s.replace(/\D/g, '')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export interface ChatLinkGeneratorLabels {
  formTitle: string
  numberLabel: string
  countryAria: string
  phonePlaceholder: string
  phoneAria: string
  messageLabel: string
  messageOptional: string
  messagePlaceholder: string
  messageCounter: string
  errorEmpty: string
  errorShort: string
  btnGenerate: string
  outputTitle: string
  emptyState: string
  linkLabel: string
  htmlLabel: string
  btnCopyLink: string
  btnCopyHtml: string
  btnOpen: string
  copied: string
}

const DEFAULT_LABELS: ChatLinkGeneratorLabels = {
  formTitle: 'Generate your chat link',
  numberLabel: 'WhatsApp number',
  countryAria: 'Country code',
  phonePlaceholder: 'Phone number',
  phoneAria: 'Phone number',
  messageLabel: 'Pre-filled message',
  messageOptional: '(optional)',
  messagePlaceholder: "Hi — I'd like to know more about your product.",
  messageCounter: '{count}/400 — shown to the customer when they tap the link.',
  errorEmpty: 'Enter a WhatsApp phone number first.',
  errorShort: 'That phone number looks too short.',
  btnGenerate: 'Generate Chat Link',
  outputTitle: 'Your WhatsApp Chat Link',
  emptyState: 'Enter a WhatsApp number on the left to generate a shareable chat link.',
  linkLabel: 'Shareable link',
  htmlLabel: 'HTML snippet',
  btnCopyLink: 'Copy Link',
  btnCopyHtml: 'Copy HTML',
  btnOpen: 'Open In WhatsApp',
  copied: '✓ Copied',
}

export function ChatLinkGeneratorClient({ labels }: { labels?: ChatLinkGeneratorLabels } = {}) {
  const L = labels || DEFAULT_LABELS
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string>('')
  const [copiedKey, setCopiedKey] = useState<string>('')
  const liveRef = useRef<HTMLDivElement>(null)

  const formattedPhone = digitsOnly(phone)
  const waNumber = countryCode.replace('+', '') + formattedPhone
  const waUrl = useMemo(() => {
    if (!formattedPhone) return ''
    const base = `https://wa.me/${waNumber}`
    if (message.trim()) return `${base}?text=${encodeURIComponent(message.trim())}`
    return base
  }, [waNumber, formattedPhone, message])

  const htmlSnippet = useMemo(() => {
    if (!waUrl) return ''
    return `<a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>`
  }, [waUrl])

  const onGenerate = () => {
    setError('')
    if (!formattedPhone) {
      setError(L.errorEmpty)
      return
    }
    if (formattedPhone.length < 7) {
      setError(L.errorShort)
      return
    }
    liveRef.current?.focus()
  }

  const onCopy = async (key: string, value: string) => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(''), 1800)
    } catch {
      // ignore
    }
  }

  const onOpen = () => {
    if (!waUrl) return
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 32,
        alignItems: 'start',
      }}
    >
      {/* Form */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #E4E8F1',
          borderRadius: 18,
          padding: 'clamp(20px, 3vw, 32px)',
          boxShadow: '0 1px 0 rgba(15,17,21,0.04), 0 14px 32px -16px rgba(15,17,21,0.12)',
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 18px', color: '#0F1115' }}>
          {L.formTitle}
        </h2>

        <label
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: '#2A2E38',
            marginBottom: 6,
          }}
        >
          {L.numberLabel}
        </label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            aria-label={L.countryAria}
            style={{
              padding: '12px 10px',
              border: '1px solid #E4E8F1',
              borderRadius: 10,
              background: '#F8FAFC',
              color: '#0F1115',
              fontSize: 14,
              minWidth: 112,
            }}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} {c.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={L.phonePlaceholder}
            aria-label={L.phoneAria}
            style={{
              flex: 1,
              padding: '12px 14px',
              border: '1px solid #E4E8F1',
              borderRadius: 10,
              background: '#F8FAFC',
              color: '#0F1115',
              fontSize: 14,
            }}
          />
        </div>

        <label
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: '#2A2E38',
            marginBottom: 6,
          }}
        >
          {L.messageLabel} <span style={{ color: '#5A6070', fontWeight: 400 }}>{L.messageOptional}</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={L.messagePlaceholder}
          rows={3}
          maxLength={400}
          style={{
            width: '100%',
            padding: '12px 14px',
            border: '1px solid #E4E8F1',
            borderRadius: 10,
            background: '#F8FAFC',
            color: '#0F1115',
            fontSize: 14,
            resize: 'vertical',
            fontFamily: 'inherit',
            marginBottom: 8,
          }}
        />
        <div style={{ fontSize: 12, color: '#5A6070', marginBottom: 16 }}>
          {L.messageCounter.replace('{count}', String(message.length))}
        </div>

        {error && (
          <div
            role="alert"
            style={{
              background: '#FFF1F0',
              border: '1px solid #FFC9C4',
              color: '#9B2C2C',
              padding: '10px 12px',
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button type="button" onClick={onGenerate} className="btn btn-primary">
            {L.btnGenerate}
          </button>
        </div>
      </div>

      {/* Output */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #E4E8F1',
          borderRadius: 18,
          padding: 'clamp(20px, 3vw, 32px)',
          boxShadow: '0 1px 0 rgba(15,17,21,0.04), 0 14px 32px -16px rgba(15,17,21,0.12)',
        }}
        ref={liveRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 18px', color: '#0F1115' }}>
          {L.outputTitle}
        </h2>

        {!waUrl ? (
          <div
            style={{
              background: '#ECEFF7',
              border: '1px solid #E4E8F1',
              borderRadius: 14,
              padding: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
              color: '#5A6070',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            <span style={{ maxWidth: 240 }}>{L.emptyState}</span>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5A6070', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {L.linkLabel}
            </div>
            <div
              style={{
                fontFamily: 'var(--f-mono, ui-monospace, monospace)',
                fontSize: 13,
                color: '#0F1115',
                background: '#ECEFF7',
                border: '1px solid #E4E8F1',
                borderRadius: 10,
                padding: '12px 14px',
                wordBreak: 'break-all',
                marginBottom: 14,
              }}
            >
              {waUrl}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
              <button type="button" onClick={() => onCopy('link', waUrl)} className="btn btn-primary">
                {copiedKey === 'link' ? L.copied : L.btnCopyLink}
              </button>
              <button type="button" onClick={onOpen} className="btn btn-outline">
                {L.btnOpen}
              </button>
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, color: '#5A6070', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {L.htmlLabel}
            </div>
            <div
              style={{
                fontFamily: 'var(--f-mono, ui-monospace, monospace)',
                fontSize: 12,
                color: '#2A2E38',
                background: '#ECEFF7',
                border: '1px solid #E4E8F1',
                borderRadius: 10,
                padding: '12px 14px',
                wordBreak: 'break-all',
                marginBottom: 10,
              }}
            >
              {htmlSnippet}
            </div>
            <button type="button" onClick={() => onCopy('html', htmlSnippet)} className="btn btn-outline">
              {copiedKey === 'html' ? L.copied : L.btnCopyHtml}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
