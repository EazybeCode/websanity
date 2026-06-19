// Three "get pinged when X" callouts that sit immediately after
// AgentRevenue. Borrowed from Doubletick's governance / SLA-breach idea
// but stripped of enterprise vocabulary — language is what a sales
// manager would actually say to their team, not what a compliance
// officer would say to their CISO.

const ALERTS = [
  {
    icon: '📣',
    title: 'Get pinged when a lead waits 15+ min for a reply.',
    body: "Your phone buzzes. The rep's phone buzzes. The lead never wonders if you forgot them.",
  },
  {
    icon: '📩',
    title: 'Daily brief in your inbox: which deals went silent today.',
    body: '7am. One email. The 6 customers who stopped replying yesterday, sorted by deal size.',
  },
  {
    icon: '😬',
    title: 'Sentiment alert when a customer says "too expensive."',
    body: 'Or "let me think about it," or "maybe next quarter." Manager loops in before the deal dies.',
  },
]

export function AlertCallouts() {
  return (
    <section className="section alert-callouts" id="alerts" style={{ paddingTop: 30, paddingBottom: 60 }}>
      <div className="container">
        <div className="alert-callouts-head reveal">
          <span className="sec-tag">REAL-TIME WATCH</span>
          <h2 style={{ marginTop: 8 }}>
            You don&apos;t lose deals because reps slack off. <em>You lose them because no one notices.</em>
          </h2>
          <p style={{ maxWidth: 640, width: '100%', textAlign: 'center', marginTop: 8 }}>
            Eazybe watches every WhatsApp conversation and pings you the second something needs attention.
          </p>
        </div>

        <div className="alert-callouts-grid">
          {ALERTS.map((a, i) => (
            <div key={i} className="alert-callout-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className="alert-callout-icon" aria-hidden>{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
