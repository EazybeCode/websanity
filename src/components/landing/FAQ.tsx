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
  return (
    <section className="section" id="faq" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">FAQ</span>
          <h2>Questions?</h2>
        </div>
        <div className="faq">
          {ITEMS.map((it, i) => (
            <div key={it.q} className={`faq-item${open.has(i) ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => toggle(i)}>
                {it.q}
                <span className="plus">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                </span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
