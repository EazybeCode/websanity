const Check = (
  <svg fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

export function AgentCustomerSuccess() {
  return (
    <section className="agent reverse" data-tone="dark">
      <div className="container">
        <div className="agent-inner">
          <div className="agent-copy reveal">
            <span className="sec-tag">Agent 04 · Customer Success</span>
            <h3>Your Best Support Rep, <em>Available 24/7</em></h3>
            <p className="lede">Answers support on WhatsApp instantly. Knowledge-base-powered. Hands off to a human with full context when it matters.</p>
            <ul className="feat-list">
              {[
                'Knowledge base-powered responses',
                'Trained on your actual support conversations',
                'Seamless human handoff',
                'Handles voice notes and media',
                'Reduces support workload by up to 40%',
              ].map((t) => (
                <li key={t}><span className="tick">{Check}</span>{t}</li>
              ))}
            </ul>
            <a href="#" className="feat-link">Deploy This Agent →</a>
          </div>
          <div className="visual reveal">
            <div className="chat">
              <div className="chat-head">
                <div className="av">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="info"><h5>Customer Success Agent</h5><p>● Resolving · KB-powered</p></div>
              </div>
              <div className="chat-body">
                <div className="msg"><span className="sm-av sm-av-user"><img src="https://i.pravatar.cc/96?img=33" alt="" /></span><div className="bub">How do I export my contacts to CSV?</div></div>
                <div className="msg ai"><span className="sm-av">CS</span><div className="bub">Hi! Go to Settings → Data → Export. Choose contacts, format CSV, click Export. Want me to send you a screenshot guide?</div></div>
                <div className="msg"><span className="sm-av sm-av-user"><img src="https://i.pravatar.cc/96?img=33" alt="" /></span><div className="bub">Yes please</div></div>
                <div className="msg ai"><span className="sm-av">CS</span><div className="bub">Sent! Anything else I can help with?</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
