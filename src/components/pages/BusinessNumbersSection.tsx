'use client'

import { useLocale } from 'next-intl'

/**
 * Pricing page add-on: Eazybe voice numbers (voice number launch). Copy comes from
 * the launch pop-up and launch email; no prices on purpose (not published yet).
 * Styled by .v16-numbers rules in brand-pages.css.
 */

const GET_NUMBER_URL = 'https://eazybe.info/2d9546'
const HOW_IT_WORKS_URL = 'https://help.eazybe.com/en/voice-number/overview'

type Copy = {
  tag: string
  title: string
  titleEm: string
  sub: string
  channels: [string, string, string, string]
  channelsLabel: string
  points: { title: string; text: string }[]
  facts: [string, string]
  cta: string
  ctaSecondary: string
  card: { label: string; location: string; usedFor: string; verified: string }
}

const COPY: Record<string, Copy> = {
  en: {
    tag: 'Voice numbers',
    title: 'One voice number.',
    titleEm: 'Every conversation.',
    sub: 'Buy a voice number from Eazybe and use it for calls, SMS, WhatsApp Business and the WhatsApp API.',
    channels: ['Voice calls', 'SMS', 'WhatsApp Business app', 'WhatsApp API'],
    channelsLabel: 'Works on',
    points: [
      { title: 'One number', text: 'Calls, texts and WhatsApp on the same business line.' },
      { title: 'Keep ownership', text: 'Customer history stays with your company when a rep leaves.' },
      { title: 'Move faster', text: 'Every call is saved beside the customer’s WhatsApp chats.' },
    ],
    facts: ['US, Canada & Puerto Rico', 'We handle number verification'],
    cta: 'Get your voice number',
    ctaSecondary: 'See how it works',
    card: { label: 'Voice number', location: 'San Francisco, CA', usedFor: 'Used for', verified: 'Verified' },
  },
  br: {
    tag: 'Números de voz',
    title: 'Um número de voz.',
    titleEm: 'Todas as conversas.',
    sub: 'Compre um número de voz da Eazybe e use-o para ligações, SMS, WhatsApp Business e a API do WhatsApp.',
    channels: ['Ligações', 'SMS', 'App WhatsApp Business', 'API do WhatsApp'],
    channelsLabel: 'Funciona em',
    points: [
      { title: 'Um só número', text: 'Ligações, mensagens e WhatsApp na mesma linha comercial.' },
      { title: 'O histórico é seu', text: 'O histórico do cliente fica com a sua empresa quando um vendedor sai.' },
      { title: 'Mais agilidade', text: 'Cada ligação fica salva ao lado das conversas de WhatsApp do cliente.' },
    ],
    facts: ['EUA, Canadá e Porto Rico', 'Nós cuidamos da verificação do número'],
    cta: 'Obter seu número de voz',
    ctaSecondary: 'Veja como funciona',
    card: { label: 'Número de voz', location: 'San Francisco, CA', usedFor: 'Usado para', verified: 'Verificado' },
  },
  es: {
    tag: 'Números de voz',
    title: 'Un número de voz.',
    titleEm: 'Todas las conversaciones.',
    sub: 'Compra un número de voz de Eazybe y úsalo para llamadas, SMS, WhatsApp Business y la API de WhatsApp.',
    channels: ['Llamadas', 'SMS', 'App WhatsApp Business', 'API de WhatsApp'],
    channelsLabel: 'Funciona en',
    points: [
      { title: 'Un solo número', text: 'Llamadas, mensajes y WhatsApp en la misma línea comercial.' },
      { title: 'El historial es tuyo', text: 'El historial del cliente se queda en tu empresa cuando un vendedor se va.' },
      { title: 'Más rapidez', text: 'Cada llamada se guarda junto a los chats de WhatsApp del cliente.' },
    ],
    facts: ['EE. UU., Canadá y Puerto Rico', 'Nos encargamos de verificar el número'],
    cta: 'Obtén tu número de voz',
    ctaSecondary: 'Mira cómo funciona',
    card: { label: 'Número de voz', location: 'San Francisco, CA', usedFor: 'Se usa para', verified: 'Verificado' },
  },
  tr: {
    tag: 'Sesli numaralar',
    title: 'Tek sesli numara.',
    titleEm: 'Tüm görüşmeler.',
    sub: 'Eazybe’den bir sesli numara alın; aramalar, SMS, WhatsApp Business ve WhatsApp API için kullanın.',
    channels: ['Sesli aramalar', 'SMS', 'WhatsApp Business uygulaması', 'WhatsApp API'],
    channelsLabel: 'Kullanım alanı',
    points: [
      { title: 'Tek numara', text: 'Aramalar, mesajlar ve WhatsApp aynı iş hattında.' },
      { title: 'Sahiplik sizde', text: 'Bir temsilci ayrıldığında müşteri geçmişi şirketinizde kalır.' },
      { title: 'Daha hızlı', text: 'Her arama, müşterinin WhatsApp sohbetlerinin yanında kaydedilir.' },
    ],
    facts: ['ABD, Kanada ve Porto Riko', 'Numara doğrulamasını biz yapıyoruz'],
    cta: 'Sesli numaranızı alın',
    ctaSecondary: 'Nasıl çalışır',
    card: { label: 'Sesli numara', location: 'San Francisco, CA', usedFor: 'Kullanım', verified: 'Doğrulandı' },
  },
}

const ICONS = [
  // phone
  <path key="call" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  // sms
  <path key="sms" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  // whatsapp app (chat bubble)
  <path key="wa" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  // api
  <path key="api" d="M8 9l-3 3 3 3M16 9l3 3-3 3M13.5 6l-3 12" />,
]

const Icon = ({ i }: { i: number }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[i]}
  </svg>
)

const Tick = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export function BusinessNumbersSection() {
  const locale = useLocale()
  const c = COPY[locale] ?? COPY.en

  return (
    <section className="section v16-numbers" id="business-numbers" aria-labelledby="business-numbers-title">
      <div className="container">
        <div className="v16-numbers-grid">
          <div className="v16-numbers-copy reveal">
            <span className="sec-tag">{c.tag}</span>
            <h2 id="business-numbers-title">
              {c.title} <em>{c.titleEm}</em>
            </h2>
            <p className="v16-numbers-sub">{c.sub}</p>

            <ul className="v16-numbers-points">
              {c.points.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>

            <ul className="v16-numbers-facts" aria-label={c.tag}>
              {c.facts.map((f) => (
                <li key={f}>
                  <span className="v16-numbers-tick"><Tick /></span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="v16-numbers-ctas">
              <a className="btn btn-primary btn-lg" href={GET_NUMBER_URL} target="_blank" rel="noopener noreferrer">
                {c.cta} →
              </a>
              <a className="btn btn-outline btn-lg" href={HOW_IT_WORKS_URL} target="_blank" rel="noopener noreferrer">
                {c.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Product moment: one number card, lit on every channel it serves. */}
          <div className="v16-numbers-visual reveal" aria-hidden="true">
            <div className="v16-numbers-card">
              <div className="v16-numbers-card-head">
                <span className="v16-numbers-flag">US</span>
                <div>
                  <div className="v16-numbers-card-label">{c.card.label}</div>
                  <div className="v16-numbers-num">+1 (415) 555-0142</div>
                  <div className="v16-numbers-loc">{c.card.location}</div>
                </div>
                <span className="v16-numbers-verified"><Tick /> {c.card.verified}</span>
              </div>
              <div className="v16-numbers-used">{c.card.usedFor}</div>
              <ul className="v16-numbers-channels">
                {c.channels.map((ch, i) => (
                  <li key={ch} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                    <span className="v16-numbers-ch-icon"><Icon i={i} /></span>
                    <span>{ch}</span>
                    <span className="v16-numbers-on" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
