// "Pain → Fix" section. Placed before AgentsHeader so visitors recognize
// their problem before they meet the solutions. Each card anchors to the
// matching agent block further down the page.
//
// Copy is SMB-friendly on purpose ("you can't see what reps say to leads",
// not "real-time conversation governance"). Numbers/stats live elsewhere
// (OutcomeStats) so this section stays focused on emotional recognition.

const PAINS = [
  {
    pain: "You can't see what reps actually say to leads on WhatsApp.",
    fix: 'Every chat auto-logs to your CRM the moment it happens.',
    fixAgent: 'CRM Sync Agent',
    href: '#agent-sync',
  },
  {
    pain: "Hot leads ghost you after 10pm — and come back to a cold reply tomorrow.",
    fix: 'A no-code AI agent qualifies and books them in 60 seconds, 24/7.',
    fixAgent: 'Lead Qualification Agent',
    href: '#agent-leadqual',
  },
  {
    pain: 'WhatsApp keeps banning your numbers without warning.',
    fix: 'Personal + Business + Cloud API all run side-by-side — no ban risk.',
    fixAgent: 'Coexistence Mode',
    href: '/whatsapp-api/coexistence',
  },
  {
    pain: "Your reps won't fill the CRM after a chat. They never do.",
    fix: 'CRM Sync Agent fills it for them — names, stages, next steps, all of it.',
    fixAgent: 'CRM Sync Agent',
    href: '#agent-sync',
  },
] as const

export function Problems() {
  return (
    <section className="section problems" id="problems" style={{ paddingTop: 60, paddingBottom: 30 }}>
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">THE WHATSAPP TAX</span>
          <h2>Four pains every sales team has. <em>One platform that fixes all four.</em></h2>
          <p style={{ maxWidth: 680, width: '100%', textAlign: 'center' }}>
            If you sell on WhatsApp, you&apos;ve hit at least three of these. Here&apos;s how Eazybe solves them.
          </p>
        </div>

        <div className="problems-grid">
          {PAINS.map((p, i) => (
            <a key={i} href={p.href} className="problem-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className="problem-card-pain-label">The pain</span>
              <p className="problem-card-pain">{p.pain}</p>
              <span className="problem-card-fix-label">The fix</span>
              <p className="problem-card-fix">{p.fix}</p>
              <span className="problem-card-cta">
                {p.fixAgent} <span aria-hidden>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
