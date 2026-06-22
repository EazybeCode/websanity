'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import QRCode from 'qrcode'

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

export interface QrGeneratorLabels {
  formTitle: string
  numberLabel: string
  countryAria: string
  phonePlaceholder: string
  phoneAria: string
  messageLabel: string
  messageOptional: string
  messagePlaceholder: string
  messageCounter: string // contains {count}
  errorEmpty: string
  errorShort: string
  btnGenerate: string
  outputTitle: string
  emptyState: string
  qrAlt: string
  btnDownload: string
  btnCopy: string
  copied: string
}

const DEFAULT_LABELS: QrGeneratorLabels = {
  formTitle: 'Generate your QR code',
  numberLabel: 'WhatsApp number',
  countryAria: 'Country code',
  phonePlaceholder: 'Phone number',
  phoneAria: 'Phone number',
  messageLabel: 'Pre-filled message',
  messageOptional: '(optional)',
  messagePlaceholder: "Hi — I'd like to know more about your product.",
  messageCounter: '{count}/400 — shown to the customer when they scan the QR.',
  errorEmpty: 'Enter a WhatsApp phone number first.',
  errorShort: 'That phone number looks too short.',
  btnGenerate: 'Generate QR Code',
  outputTitle: 'Your WhatsApp QR',
  emptyState: 'Enter a WhatsApp number on the left to generate a scannable QR.',
  qrAlt: 'WhatsApp QR code',
  btnDownload: 'Download PNG',
  btnCopy: 'Copy link',
  copied: '✓ Link copied',
}

export function QrGeneratorClient({ labels }: { labels?: QrGeneratorLabels } = {}) {
  const L = labels || DEFAULT_LABELS
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const liveRef = useRef<HTMLDivElement>(null)

  const formattedPhone = digitsOnly(phone)
  const waNumber = countryCode.replace('+', '') + formattedPhone
  const waUrl = useMemo(() => {
    if (!formattedPhone) return ''
    const base = `https://wa.me/${waNumber}`
    if (message.trim()) return `${base}?text=${encodeURIComponent(message.trim())}`
    return base
  }, [waNumber, formattedPhone, message])

  // Re-render QR whenever the resulting wa.me URL changes.
  useEffect(() => {
    if (!waUrl) {
      setQrDataUrl('')
      return
    }
    let cancelled = false
    QRCode.toDataURL(waUrl, {
      width: 480,
      margin: 2,
      color: { dark: '#0F1115', light: '#FFFFFF' },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url)
      })
      .catch((e) => {
        if (!cancelled) setError(String(e?.message || e))
      })
    return () => {
      cancelled = true
    }
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
    // The QR re-renders via useEffect; this button is mostly UX feedback.
    liveRef.current?.focus()
  }

  const onDownload = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `whatsapp-qr-${waNumber || 'eazybe'}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const onCopyLink = async () => {
    if (!waUrl) return
    try {
      await navigator.clipboard.writeText(waUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
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
          <button
            type="button"
            onClick={onGenerate}
            className="btn btn-primary"
          >
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
          textAlign: 'center',
        }}
        ref={liveRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 18px', color: '#0F1115' }}>
          {L.outputTitle}
        </h2>
        <div
          style={{
            background: '#ECEFF7',
            border: '1px solid #E4E8F1',
            borderRadius: 14,
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 320,
            marginBottom: 18,
          }}
        >
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={L.qrAlt}
              width={280}
              height={280}
              style={{ width: 280, height: 280, display: 'block' }}
            />
          ) : (
            <div style={{ color: '#5A6070', fontSize: 14, maxWidth: 220 }}>
              {L.emptyState}
            </div>
          )}
        </div>

        {waUrl && (
          <>
            <div
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 12,
                color: '#2A2E38',
                background: '#ECEFF7',
                border: '1px solid #E4E8F1',
                borderRadius: 8,
                padding: '8px 10px',
                wordBreak: 'break-all',
                marginBottom: 14,
                textAlign: 'left',
              }}
            >
              {waUrl}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={onDownload} className="btn btn-primary">
                {L.btnDownload}
              </button>
              <button type="button" onClick={onCopyLink} className="btn btn-outline">
                {copied ? L.copied : L.btnCopy}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
