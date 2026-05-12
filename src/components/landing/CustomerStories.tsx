const STORIES = [
  { tag: '— Sales Ops Lead · SaaS · India', quote: <>&quot;Our HubSpot was a graveyard. <em>Eazybe brought it back to life</em> — every WhatsApp deal now flows in automatically.&quot;</> },
  { tag: '— Founder · D2C · Brazil', quote: <>&quot;We tried WATI. <em>It broke the moment a lead said anything off-script.</em> Eazybe just... gets it.&quot;</> },
  { tag: '— VP Sales · FinTech · UAE', quote: <>&quot;We were losing 30% of after-hours leads. <em>Now the agent qualifies them while we sleep.</em>&quot;</> },
]

export function CustomerStories() {
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">Customer Stories</span>
          <h2>What teams tell us <em>in demos.</em></h2>
        </div>
        <div className="problem-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {STORIES.map((s, i) => (
            <div key={i} className="p-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="idx">{s.tag}</div>
              <h3 style={{ fontSize: 20 }}>{s.quote}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
