interface Integration {
  name: string
  icon: string
}

const ITEMS: Integration[] = [
  { name: 'HubSpot', icon: '<svg width="34" height="34" viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.626 1.263 1.976v2.868a5.1 5.1 0 00-2.348 1.028l-6.293-4.9a2.06 2.06 0 00.054-.453 2.1 2.1 0 10-.86 1.7l6.073 4.73a5.114 5.114 0 00-1 3.4 6.4 6.4 0 1 0 12.7 0 6.4 6.4 0 0 0-6.1-6zm-.8 9.8a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8z"/></svg>' },
  { name: 'Salesforce', icon: '<svg width="34" height="34" viewBox="0 0 48 34" fill="#00A1E0"><path d="M19.5 6.8c1.5-1.6 3.7-2.6 6-2.6 3.1 0 5.9 1.8 7.3 4.5 1.2-.5 2.4-.8 3.8-.8 5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6c-.6 0-1.3-.1-1.9-.2-1.2 2.1-3.5 3.6-6.1 3.6-1.1 0-2.1-.3-3-.7-1.2 2.8-4 4.7-7.2 4.7-3.4 0-6.3-2-7.6-4.9-.7.1-1.3.2-2 .2C4 30 .3 26.3.3 21.7c0-3.1 1.7-5.8 4.2-7.2-.5-1.2-.8-2.5-.8-3.8C3.7 5.2 8 1 13.2 1c3 0 5.6 1.4 7.3 3.6z"/></svg>' },
  { name: 'Zoho', icon: '<svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#E42527"/><text x="12" y="17" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">Z</text></svg>' },
  { name: 'Pipedrive', icon: '<svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#fff"/><circle cx="12" cy="12" r="5" fill="#1A6B3A"/><path d="M12 12v-3" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>' },
  { name: 'Bitrix24', icon: '<svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1F8AC0"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">B24</text></svg>' },
  { name: 'LeadSquared', icon: '<svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#7C3AED"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">LSQ</text></svg>' },
  { name: 'Freshworks', icon: '<svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#fff"/><path d="M5 13.5L8 10l2 2 4-5 5 6.5" stroke="#3FBA50" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { name: 'Google Sheets', icon: '<svg width="34" height="34" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1.5" fill="#0F9D58"/><rect x="6" y="7" width="12" height="12" fill="#fff"/><path d="M6 11h12M6 15h12M10 7v12M14 7v12" stroke="#0F9D58" stroke-width="0.8"/></svg>' },
  { name: 'Custom API', icon: '<svg width="34" height="34" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><path d="M9 9l-3 3 3 3M15 9l3 3-3 3" stroke="#A78BFA" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
]

export function Integrations() {
  return (
    <section className="section" data-tone="dark" id="integrations">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">Integrations</span>
          <h2>Connect Your <em>WhatsApp AI Agent</em> To The CRM You Already Use</h2>
          <p style={{ maxWidth: 760, width: '100%', textAlign: 'justify', textAlignLast: 'center', hyphens: 'auto' }}>
            Eazybe plugs into the CRMs your team already lives in HubSpot, Salesforce, Zoho, Pipedrive and more. Bi-directional sync, workflow triggers and custom properties out of the box, no rip-and-replace, no IT project.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, maxWidth: 1000, margin: '0 auto' }}>
          {ITEMS.map((i, idx) => (
            <div
              key={i.name}
              className="reveal"
              style={{
                padding: '20px 12px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 14,
                backdropFilter: 'blur(8px)',
                transitionDelay: `${idx * 0.05}s`,
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: i.icon }} />
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 500, color: '#fff' }}>{i.name}</div>
            </div>
          ))}
        </div>
        <p className="reveal integrations-foot" style={{ textAlign: 'center', fontFamily: 'var(--f-display)', fontSize: 20, color: 'rgba(255,255,255,0.7)', marginTop: 50 }}>
          Every integration - contact sync, deal sync, activity logs, custom properties, workflow triggers.
        </p>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="https://eazybe.com/integrations" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg reveal" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            See full integration depth →
          </a>
        </div>
      </div>
    </section>
  )
}
