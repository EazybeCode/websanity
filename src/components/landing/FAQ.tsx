'use client'

import { useState } from 'react'

const ITEMS: { q: string; a: string }[] = [
  { q: 'What is a WhatsApp AI Agent and how does it work?', a: 'A WhatsApp AI Agent is an autonomous AI program that reads, understands, and replies to WhatsApp messages on behalf of a business. It uses large language models to qualify leads, answer support tickets, sync chats to your CRM, and trigger workflows in real time. Eazybe installs as a Chrome extension on WhatsApp Web and works in 10 minutes — no code required.' },
  { q: 'How is a WhatsApp AI Agent different from a chatbot like WATI or Gallabox?', a: 'Chatbots follow scripts and break the moment a customer says something off-script. A WhatsApp AI Agent uses generative AI to read full conversation context, your CRM history, and your top reps’ style — then writes a reply that sounds human and updates your pipeline at the same time.' },
  { q: 'Do I need the WhatsApp Business API to use an AI agent?', a: 'No. Eazybe works with Personal WhatsApp, the WhatsApp Business App, and the WhatsApp Cloud API simultaneously. No number switching, no migration, no IT project.' },
  { q: 'Can I try the WhatsApp AI Agent before committing?', a: 'Yes. Click "Talk to our Agent on WhatsApp" anywhere on this page. Our live Lead Qualification Agent will qualify you in under 60 seconds — exactly the experience your own leads would have.' },
  { q: 'Which CRMs does the Eazybe WhatsApp AI Agent integrate with?', a: 'HubSpot, Salesforce, Zoho CRM, Pipedrive, Bitrix24, LeadSquared, Freshworks, Google Sheets, and any other system via webhooks or REST API. One-click OAuth, bi-directional sync, no manual data entry.' },
  { q: 'How long does it take to deploy a WhatsApp AI Agent?', a: 'CRM Sync goes live in 10 minutes. AI agents take 2 to 3 days to train on your conversation history and reach production quality. After that, the agent runs 24/7 without supervision.' },
  { q: 'Is Eazybe a no-code WhatsApp AI Agent platform?', a: 'Yes. Non-technical ops leads can design and deploy custom agents with drag-and-drop Agent Builder — no scripts, no code, no engineering tickets.' },
  { q: 'Is my WhatsApp and CRM data secure with Eazybe?', a: 'Yes. End-to-end encryption in transit and at rest. Meta Business Partner. GDPR compliant. SOC 2 Type II certified. We never store WhatsApp credentials on our servers.' },
  { q: 'How is a WhatsApp AI Agent different from Gong or Chorus?', a: 'Gong and Chorus record scheduled calls. A WhatsApp AI Agent works on the ongoing chat conversations where most deals in WhatsApp-first regions actually move — 24/7, not just during meetings.' },
  { q: 'What is the best WhatsApp AI Agent for sales teams?', a: 'Eazybe is one of the top WhatsApp AI Agent platforms for sales teams. It scores 4.6 on HubSpot, serves 2,000+ revenue teams across 40+ countries, and runs as a Chrome extension over the WhatsApp Web reps already use. Free forever tier available.' },
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
          Didn&apos;t find your answer? <a href="https://wa.me/13024129610?text=Hi%20-%20I%20have%20a%20question%20about%20Eazybe." target="_blank" rel="noopener noreferrer">Let&apos;s connect with us!</a>
        </p>
      </div>
    </section>
  )
}
