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

const WHATSAPP_ICON_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488'

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

export interface ChatWidgetGeneratorLabels {
  formTitle: string
  numberLabel: string
  countryAria: string
  phonePlaceholder: string
  phoneAria: string
  messageLabel: string
  messageOptional: string
  messagePlaceholder: string
  messageCounter: string
  buttonLabelLabel: string
  buttonLabelPlaceholder: string
  positionLabel: string
  positionBottomRight: string
  positionBottomLeft: string
  colorLabel: string
  errorEmpty: string
  errorShort: string
  btnGenerate: string
  outputTitle: string
  emptyState: string
  previewTitle: string
  snippetLabel: string
  btnCopySnippet: string
  btnOpen: string
  copied: string
}

const DEFAULT_LABELS: ChatWidgetGeneratorLabels = {
  formTitle: 'Configure your widget',
  numberLabel: 'WhatsApp number',
  countryAria: 'Country code',
  phonePlaceholder: 'Phone number',
  phoneAria: 'Phone number',
  messageLabel: 'Welcome message',
  messageOptional: '(optional)',
  messagePlaceholder: "Hi — I'd like to know more about your product.",
  messageCounter: '{count}/400 — shown when the customer taps the button.',
  buttonLabelLabel: 'Button label',
  buttonLabelPlaceholder: 'Chat with us',
  positionLabel: 'Button position',
  positionBottomRight: 'Bottom right',
  positionBottomLeft: 'Bottom left',
  colorLabel: 'Brand color',
  errorEmpty: 'Enter a WhatsApp phone number first.',
  errorShort: 'That phone number looks too short.',
  btnGenerate: 'Generate Snippet',
  outputTitle: 'Your WhatsApp Chat Widget',
  emptyState: 'Enter a WhatsApp number on the left to generate a snippet you can paste into your site.',
  previewTitle: 'Preview',
  snippetLabel: 'HTML snippet',
  btnCopySnippet: 'Copy HTML',
  btnOpen: 'Open Live Preview',
  copied: '✓ Copied',
}

type Position = 'bottom-right' | 'bottom-left'

export function ChatWidgetGeneratorClient({ labels }: { labels?: ChatWidgetGeneratorLabels } = {}) {
  const L = labels || DEFAULT_LABELS
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [buttonLabel, setButtonLabel] = useState(L.buttonLabelPlaceholder)
  const [position, setPosition] = useState<Position>('bottom-right')
  const [color, setColor] = useState('#25D366')
  const [error, setError] = useState('')
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

  const snippet = useMemo(() => {
    if (!waUrl) return ''
    const posCss = position === 'bottom-right' ? 'right:24px' : 'left:24px'
    const safeLabel = escapeHtml(buttonLabel || 'Chat with us')
    return `<!-- WhatsApp Chat Widget by Eazybe -->
<a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer"
   style="position:fixed;bottom:24px;${posCss};background:${color};color:#ffffff;border-radius:999px;padding:14px 22px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-weight:600;font-size:15px;box-shadow:0 10px 28px -8px rgba(0,0,0,0.28);z-index:9999;display:inline-flex;align-items:center;gap:10px;line-height:1;">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${WHATSAPP_ICON_PATH}"/></svg>
  ${safeLabel}
</a>`
  }, [waUrl, position, color, buttonLabel])

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

  const onCopy = async () => {
    if (!snippet) return
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
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

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2A2E38', marginBottom: 6 }}>
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

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2A2E38', marginBottom: 6 }}>
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

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2A2E38', marginBottom: 6 }}>
          {L.buttonLabelLabel}
        </label>
        <input
          type="text"
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
          placeholder={L.buttonLabelPlaceholder}
          maxLength={40}
          style={{
            width: '100%',
            padding: '12px 14px',
            border: '1px solid #E4E8F1',
            borderRadius: 10,
            background: '#F8FAFC',
            color: '#0F1115',
            fontSize: 14,
            marginBottom: 16,
          }}
        />

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2A2E38', marginBottom: 6 }}>
          {L.positionLabel}
        </label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => setPosition('bottom-right')}
            aria-pressed={position === 'bottom-right'}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: position === 'bottom-right' ? '2px solid #5B4BAE' : '1px solid #E4E8F1',
              borderRadius: 10,
              background: position === 'bottom-right' ? 'rgba(91,75,174,0.08)' : '#F8FAFC',
              color: '#0F1115',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {L.positionBottomRight}
          </button>
          <button
            type="button"
            onClick={() => setPosition('bottom-left')}
            aria-pressed={position === 'bottom-left'}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: position === 'bottom-left' ? '2px solid #5B4BAE' : '1px solid #E4E8F1',
              borderRadius: 10,
              background: position === 'bottom-left' ? 'rgba(91,75,174,0.08)' : '#F8FAFC',
              color: '#0F1115',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {L.positionBottomLeft}
          </button>
        </div>

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2A2E38', marginBottom: 6 }}>
          {L.colorLabel}
        </label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label={L.colorLabel}
            style={{
              width: 56,
              height: 44,
              padding: 4,
              border: '1px solid #E4E8F1',
              borderRadius: 10,
              background: '#F8FAFC',
              cursor: 'pointer',
            }}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 14px',
              border: '1px solid #E4E8F1',
              borderRadius: 10,
              background: '#F8FAFC',
              color: '#0F1115',
              fontSize: 14,
              fontFamily: 'var(--f-mono, ui-monospace, monospace)',
            }}
          />
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

        {/* Preview */}
        <div style={{ fontSize: 12, fontWeight: 600, color: '#5A6070', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {L.previewTitle}
        </div>
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #F1F4F9 0%, #ECEFF7 100%)',
            border: '1px solid #E4E8F1',
            borderRadius: 12,
            height: 220,
            overflow: 'hidden',
            marginBottom: 18,
          }}
        >
          {/* Fake site chrome */}
          <div style={{ height: 24, background: '#ffffff', borderBottom: '1px solid #E4E8F1', display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
          </div>
          {/* Fake content lines */}
          <div style={{ padding: 18 }}>
            <div style={{ height: 8, background: '#D6DCE6', borderRadius: 4, width: '40%', marginBottom: 10 }} />
            <div style={{ height: 6, background: '#E4E8F1', borderRadius: 4, width: '85%', marginBottom: 6 }} />
            <div style={{ height: 6, background: '#E4E8F1', borderRadius: 4, width: '70%', marginBottom: 6 }} />
            <div style={{ height: 6, background: '#E4E8F1', borderRadius: 4, width: '78%' }} />
          </div>
          {/* Floating widget preview */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              [position === 'bottom-right' ? 'right' : 'left']: 16,
              background: color,
              color: '#ffffff',
              borderRadius: 999,
              padding: '10px 16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 600,
              fontSize: 13,
              boxShadow: '0 10px 24px -8px rgba(0,0,0,0.28)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              lineHeight: 1,
              maxWidth: '70%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={WHATSAPP_ICON_PATH} />
            </svg>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{buttonLabel || 'Chat with us'}</span>
          </div>
        </div>

        {!waUrl ? (
          <div
            style={{
              background: '#ECEFF7',
              border: '1px solid #E4E8F1',
              borderRadius: 10,
              padding: 18,
              color: '#5A6070',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {L.emptyState}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5A6070', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {L.snippetLabel}
            </div>
            <pre
              style={{
                fontFamily: 'var(--f-mono, ui-monospace, monospace)',
                fontSize: 12,
                color: '#0F1115',
                background: '#0F1115',
                border: '1px solid #E4E8F1',
                borderRadius: 10,
                padding: '14px 16px',
                marginBottom: 14,
                overflowX: 'auto',
                maxHeight: 240,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              <code style={{ color: '#E4E8F1', fontSize: 12 }}>{snippet}</code>
            </pre>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button type="button" onClick={onCopy} className="btn btn-primary">
                {copied ? L.copied : L.btnCopySnippet}
              </button>
              <button type="button" onClick={onOpen} className="btn btn-outline">
                {L.btnOpen}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
