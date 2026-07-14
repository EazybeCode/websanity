'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useTrialModal } from '@/providers/TrialModalProvider'

// Keep the FAQ JSON-LD in English for now: search engines crawl this once per
// page; translating into 4 locales would require generating per-locale schema
// blocks and may dilute the primary EN keyword targeting.
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a WhatsApp AI Agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "A WhatsApp AI Agent is an autonomous AI program that reads, understands, and responds to WhatsApp messages on behalf of a business. Unlike a rule-based chatbot that follows fixed scripts, a WhatsApp AI Agent uses large language models to qualify leads, answer support questions, sync conversations to your CRM, and trigger sales workflows in real time. Eazybe builds no-code WhatsApp AI agents that install in 10 minutes and work alongside the WhatsApp Web your team already uses.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do WhatsApp AI Agents work for sales and support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "A WhatsApp AI Agent installs as a Chrome extension on WhatsApp Web or connects through the WhatsApp Business API. It reads every inbound conversation, classifies intent (lead, support, complaint, renewal), qualifies leads with frameworks like BANT or MEDDIC, drafts a reply in your top rep's voice, and writes the structured data back into HubSpot, Salesforce, Zoho, or any other CRM. Sales teams get hot leads delivered ready to close; support teams get a 24/7 first-responder that escalates only what matters.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why do WhatsApp AI Agents outperform traditional chatbots and CRMs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "Traditional WhatsApp chatbots follow rigid scripts and break the moment a customer goes off-script. Standalone CRMs don't see the conversation at all. A WhatsApp AI Agent sits between the two: it reads chat context in real time, writes back to the CRM, and answers leads at 3am the same way it does at 3pm. The result is faster reply times, accurate pipelines without manual data entry, and conversations that don't leak out of WhatsApp threads.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Eazybe a no-code WhatsApp AI Agent platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "Yes. Eazybe is a fully no-code WhatsApp AI Agent platform. Non-technical ops leads can build and deploy custom AI agents (renewal nudges, NPS follow-ups, post-demo recaps, qualification flows) using a drag-and-drop Agent Builder. No engineering tickets, no migrations, no scripts. Setup takes under 10 minutes via a Chrome extension that runs alongside the WhatsApp Web your reps already use.",
      },
    },
    {
      '@type': 'Question',
      name: 'What features set the best WhatsApp AI Agent apart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "The best WhatsApp AI Agent platforms include two-way CRM sync (HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, Google Sheets, webhooks), 24/7 inbound qualification using BANT or MEDDIC, ghosted-deal alerts with auto-drafted follow-ups, reply training from your top reps' real conversations, anti-ban broadcast tooling with rate limiting, no-code custom agent builders, coexistence with Personal WhatsApp + Business App + Cloud API simultaneously, and end-to-end encryption with Meta Business Partner, GDPR, and SOC 2 Type II compliance.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does a WhatsApp AI Agent compare to a traditional sales stack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "A traditional sales stack uses WhatsApp Business App + CRM + chatbot + meeting-notes tool, each owning a slice of the relationship and none talking to each other. A WhatsApp AI Agent like Eazybe handles the live conversation and writes back to your existing CRM. CRM sync moves from manual end-of-day copy-paste to real-time bi-directional updates. After-hours leads get qualified in 60 seconds instead of going cold. Setup drops from a 4-8 week IT project to a 10-minute Chrome extension install.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who benefits most from a WhatsApp AI Agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "WhatsApp AI Agents are built for teams whose WhatsApp activity outpaces their CRM. High-volume inbound sales teams in D2C, real estate, education, and travel handling hundreds of messages a day. Outbound SDRs running WhatsApp cadences who still need everything logged to HubSpot or Salesforce. Founder-led startups cloning the founder's selling style. Customer success teams handling support and renewals over WhatsApp. Sales orgs across India, Brazil, MENA, LATAM, and Southeast Asia where WhatsApp is the primary sales channel.",
      },
    },
    {
      '@type': 'Question',
      name: 'How to build an AI agent for WhatsApp automation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          "To build an AI agent for WhatsApp automation, install the Eazybe Chrome extension, connect your CRM with one-click OAuth (HubSpot, Salesforce, Zoho, or others), choose a pre-trained agent template (Lead Qualification, Revenue Ops, Customer Success), or open Agent Builder to design a custom flow with drag-and-drop logic. Train the agent on sample conversations from your top reps, then flip the activation toggle. The agent starts handling WhatsApp messages within 24 hours.",
      },
    },
  ],
}

export function ReadMore() {
  const t = useTranslations('landingV3.readMore')
  const { openModal } = useTrialModal()
  const locale = useLocale()
  const list2 = t.raw('list2') as string[]
  const list4 = t.raw('list4') as string[]
  const tableHead = t.raw('tableHead') as string[]
  const tableRows = t.raw('tableRows') as string[][]
  return (
    <section
      className="readmore-wrap"
      aria-labelledby="readmore-title"
      lang={locale}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('tag')}</span>
          <h2 id="readmore-title">
            {t('headline')} <em>{t('headlineEm')}</em>
          </h2>
          <p style={{ maxWidth: 760, width: '100%', textAlign: 'justify', textAlignLast: 'center', hyphens: 'auto' }}>
            {t('subtitle')}
          </p>
        </div>
        <div className="readmore-card">
          <div className="readmore-scroll-mask">
            <article className="readmore-scroll" itemScope itemType="https://schema.org/Article">
              <meta itemProp="headline" content={t('itemHeadline')} />
              <meta itemProp="about" content={t('itemAbout')} />

              <section aria-labelledby="rm-h0">
                <h2 id="rm-h0" className="readmore-h2">{t('h0')}</h2>
                <p>{t('p0a')}</p>
                <p>{t('p0b')}</p>
              </section>

              <section aria-labelledby="rm-h1">
                <h2 id="rm-h1" className="readmore-h2">{t('h1')}</h2>
                <p>{t('p1a')}</p>
                <p>{t('p1b')}</p>
                <p>{t('p1c')}</p>
                <p>{t('p1d')}</p>
              </section>

              <section aria-labelledby="rm-h2">
                <h2 id="rm-h2" className="readmore-h2">{t('h2')}</h2>
                <p>{t('p2a')}</p>
                <p>{t('p2b')}</p>
                <ul className="readmore-list">
                  {list2.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="rm-h3">
                <h2 id="rm-h3" className="readmore-h2">{t('h3')}</h2>
                <p>{t('p3a')}</p>
                <div className="readmore-table-wrap">
                  <table className="readmore-table" aria-label={t('tableLabel')}>
                    <thead>
                      <tr>
                        {tableHead.map((h, i) => (
                          <th key={i} scope="col">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, i) => (
                        <tr key={i}>
                          <th scope="row">{row[0]}</th>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section aria-labelledby="rm-h4">
                <h2 id="rm-h4" className="readmore-h2">{t('h4')}</h2>
                <p>{t('p4a')}</p>
                <ul className="readmore-list">
                  {list4.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="rm-h5">
                <h2 id="rm-h5" className="readmore-h2">{t('h5')}</h2>
                <p>{t('p5a')}</p>
                <p>{t('p5b')}</p>
              </section>
            </article>
          </div>
        </div>

        <div className="readmore-cta-wrap">
          <a href="https://eazybe.info/demono" onClick={(e) => { e.preventDefault(); openModal("demo") }} className="readmore-cta">
            {t('ctaText')}
            <span className="readmore-cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
