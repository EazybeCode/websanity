const Check = (
  <svg fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

export function AgentBuilder() {
  return (
    <section className="agent">
      <div className="container">
        <div className="agent-inner">
          <div className="agent-copy reveal">
            <span className="sec-tag">Agent 05 · Agent Builder · BUILD YOUR OWN</span>
            <h3>Your use case. <em>Your data. Your agent.</em></h3>
            <p className="lede">Not every team fits the lineup. Build the agent your team needs in a day.</p>
            <ul className="feat-list">
              <li><span className="tick">{Check}</span><strong style={{ marginRight: 6 }}>DEFINE</strong> — Triggers, CRM fields</li>
              <li><span className="tick">{Check}</span><strong style={{ marginRight: 6 }}>TRAIN</strong> — On specific chats</li>
              <li><span className="tick">{Check}</span><strong style={{ marginRight: 6 }}>DEPLOY</strong> — On WhatsApp + CRM sync</li>
            </ul>
            <p className="lede" style={{ fontSize: 14, marginTop: 18 }}>
              <strong>Use case examples:</strong><br />
              Renewal Agent · Partner Onboarding · Pricing Objection
            </p>
            <a href="#" className="feat-link">See How to Build →</a>
          </div>
          <div className="visual reveal">
            <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 24, boxShadow: '0 8px 24px -12px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 18, borderBottom: '1px solid var(--line)', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent-a), var(--accent-b))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 500 }}>New Agent</div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.06em' }}>RENEWAL AGENT · DRAFT</div>
                  </div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 100, background: 'color-mix(in oklab, var(--accent-a) 15%, transparent)', border: '1px solid color-mix(in oklab, var(--accent-a) 35%, transparent)', fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--accent-ink)', fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-a)' }} />
                  READY TO DEPLOY
                </span>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 8 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--accent-a)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>1</span>
                  DEFINE TRIGGER
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ padding: '6px 12px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-2)' }}>WHEN <strong style={{ color: 'var(--ink)' }}>deal.close_date</strong></span>
                  <span style={{ padding: '6px 12px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-2)' }}>IS <strong style={{ color: 'var(--accent-ink)' }}>60 days away</strong></span>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 8 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--accent-a)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>2</span>
                  TRAIN ON CHATS
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 12px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--ink-3)' }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>142 renewal conversations</div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)' }}>last 12 months · indexed</div>
                  </div>
                  <span style={{ padding: '3px 8px', background: 'color-mix(in oklab, var(--accent-a) 20%, transparent)', borderRadius: 100, fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--accent-ink)', fontWeight: 600 }}>✓ TRAINED</span>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 8 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--accent-a)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>3</span>
                  DEPLOY TO
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 100, fontSize: 11 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.49 2 2 6.49 2 12c0 1.89.53 3.7 1.54 5.28L2 22l4.84-1.5c1.52.83 3.24 1.27 4.99 1.27h.01c5.51 0 10-4.49 10.01-10 0-2.67-1.04-5.18-2.93-7.07z"/></svg>
                    WhatsApp
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 100, fontSize: 11 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: '#FF7A59' }} />
                    HubSpot
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 100, fontSize: 11 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent-ink)' }} />
                    Slack alerts
                  </span>
                </div>
              </div>

              <button style={{ width: '100%', padding: 12, background: 'var(--ink)', color: 'var(--paper)', borderRadius: 12, fontFamily: 'var(--f-sans)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Deploy Agent
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
