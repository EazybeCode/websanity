// Three concrete outcome stats from real customers. Placed right after
// LogoBar so the page goes: hero claim → logos → proof those logos got
// results → "here's the pain → here's the fix" → agent demos.
//
// IMPORTANT — these are PLACEHOLDER NUMBERS. Replace `number`, `unit`,
// and `customer` with confirmed values from sales/CS before this section
// goes live. Anything left as a placeholder is marked with TBD.

interface Stat {
  number: string         // big headline number
  unit: string           // short label that follows the number ("faster", "more leads", "less data entry")
  outcome: string        // one-sentence description
  customer: string       // company that saw this result
  placeholder?: boolean  // true while we don't have a confirmed source for the number
}

const STATS: Stat[] = [
  {
    number: '2×',
    unit: 'faster replies',
    outcome: 'Average WhatsApp reply time cut in half after rolling out CRM Sync + LeadQual agents.',
    customer: 'University Living',
    placeholder: true,
  },
  {
    number: '3×',
    unit: 'more qualified leads',
    outcome: 'Lead Qualification Agent caught after-hours inbound that previously went cold.',
    customer: 'TravClan',
    placeholder: true,
  },
  {
    number: '60%',
    unit: 'less CRM data entry',
    outcome: 'Reps stopped manually logging chats — the CRM Sync Agent does it.',
    customer: 'Wanderon',
    placeholder: true,
  },
]

export function OutcomeStats() {
  return (
    <section className="section outcome-stats" id="outcomes" style={{ paddingTop: 50, paddingBottom: 50 }}>
      <div className="container">
        <div className="outcome-stats-head reveal">
          <span className="sec-tag">REAL RESULTS</span>
          <h2 style={{ marginTop: 8, marginBottom: 12 }}>
            Numbers our customers <em>actually share</em>.
          </h2>
        </div>

        <div className="outcome-stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="outcome-stat-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="outcome-stat-number">
                {s.number}
                <span className="outcome-stat-unit"> {s.unit}</span>
              </div>
              <p className="outcome-stat-outcome">{s.outcome}</p>
              <div className="outcome-stat-customer">
                {s.customer}
                {s.placeholder && <span className="outcome-stat-tbd"> · TBD verify</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
