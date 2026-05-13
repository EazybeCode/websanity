'use client'

import { useState } from 'react'

const ITEMS: { q: string; a: string }[] = [
  { q: 'How is this different from a WhatsApp chatbot (WATI, Gallabox)?', a: 'Chatbots follow scripts and break on anything unexpected. Eazybe agents read your CRM and WhatsApp history, learn from your top reps, and coordinate through a shared context engine.' },
  { q: 'Do I need WhatsApp Business API?', a: 'No. Eazybe works with Personal WhatsApp, Business App, and Business API — simultaneously. No migration.' },
  { q: 'Can I try an agent before committing?', a: 'Yes. Click "Talk to our Agent on WhatsApp" above. Our live Lead Qualification Agent will qualify you in 60 seconds — same flow your leads would see.' },
  { q: 'What CRMs do you support?', a: 'HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, Google Sheets, and any custom API via webhooks.' },
  { q: 'How long does setup take?', a: '10 minutes for CRM Sync. AI Agents take 2-3 days to train on your data and reach production quality.' },
  { q: 'Is my data secure?', a: 'Yes. Encrypted in transit and at rest. Meta Business Partner. GDPR compliant.' },
  { q: 'Can I build my own agent?', a: 'Yes — with Agent Builder.' },
  { q: 'How is this different from Gong or Chorus?', a: 'Gong records scheduled calls. Eazybe works on the WhatsApp conversations where deals actually happen — 24/7, not just meetings.' },
]

export function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set())
  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const half = Math.ceil(ITEMS.length / 2)
  const columns = [ITEMS.slice(0, half), ITEMS.slice(half)]

  return (
    <section className="section" id="faq" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">FAQ</span>
          <h2><em>Eazybe Answers</em> Most Asked Queries!</h2>
          <p style={{ maxWidth: 720, width: '100%', textAlign: 'center', hyphens: 'auto' }}>
            Get answers to common questions about setup, supported CRMs, security, and how Eazybe agents work day-to-day. Still stuck? Talk to our live agent on WhatsApp.
          </p>
        </div>

        <div className="faq-grid">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="faq-col">
              {column.map((it, i) => {
                const idx = colIdx === 0 ? i : i + half
                const isOpen = open.has(idx)
                return (
                  <div key={it.q} className={`faq-pill${isOpen ? ' open' : ''}`}>
                    <button
                      className="faq-pill-q"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{it.q}</span>
                      <span className="faq-pill-chev" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <div className="faq-pill-a">
                      <div>{it.a}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <p className="faq-footnote">
          Didn&apos;t find your answer? <a href="https://wa.me/13023356201?text=Hi%20-%20I%20have%20a%20question%20about%20Eazybe." target="_blank" rel="noopener noreferrer">Let&apos;s connect with us!</a>
        </p>
      </div>
    </section>
  )
}
