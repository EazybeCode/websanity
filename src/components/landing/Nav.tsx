export function Nav() {
  return (
    <nav className="nav">
      <a href="#" className="nav-logo">
        <span className="dot" />
        eazy<em>be</em>
      </a>
      <div className="nav-links">
        <div className="nav-item">
          <a><span>Agents</span> <span className="nav-caret">▾</span></a>
          <div className="nav-dropdown">
            <div className="nav-dd-section">AI Agents</div>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M17 3l4 4-4 4"/><path d="M21 7H9a5 5 0 00-5 5"/><path d="M7 21l-4-4 4-4"/><path d="M3 17h12a5 5 0 005-5"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">CRM Sync Agent</div>
                <div className="nav-dd-desc">Auto-log every WhatsApp chat to your CRM</div>
              </span>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Lead Qualification Agent</div>
                <div className="nav-dd-desc">Qualify leads 24/7 like your best rep</div>
              </span>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Revenue Agent</div>
                <div className="nav-dd-desc">Spot ghosted deals before they die</div>
              </span>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Customer Success Agent</div>
                <div className="nav-dd-desc">Answer support 24/7 with your KB</div>
              </span>
            </a>
            <div className="nav-dd-divider" />
            <div className="nav-dd-section">Build Your Own</div>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#F0EBF8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4BAE" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Agent Builder</div>
                <div className="nav-dd-desc">Custom agents for your use case</div>
              </span>
            </a>
          </div>
        </div>

        <div className="nav-item">
          <a><span>Integrations</span> <span className="nav-caret">▾</span></a>
          <div
            className="nav-dropdown"
            style={{ minWidth: 560, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, padding: 14 }}
          >
            <div style={{ gridColumn: '1 / -1' }} className="nav-dd-section">CRMs</div>
            {INTEGRATIONS.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="nav-dd-item">
                <span className="nav-dd-icon" style={{ background: item.bg }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span className="nav-dd-content">
                  <div className="nav-dd-name">{item.name}</div>
                  <div className="nav-dd-desc">{item.desc}</div>
                </span>
              </a>
            ))}
            <div style={{ gridColumn: '1 / -1' }} className="nav-dd-divider" />
            <a href="https://eazybe.com/integrations" target="_blank" rel="noopener noreferrer" style={{ gridColumn: '1 / -1' }} className="nav-dd-item">
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--accent-ink)', letterSpacing: '0.04em', textAlign: 'center', width: '100%' }}>
                See all integrations →
              </span>
            </a>
          </div>
        </div>

        <div className="nav-item"><a><span>Agent Builder</span></a></div>
        <div className="nav-item"><a><span>Pricing</span></a></div>

        <div className="nav-item">
          <a><span>Resources</span> <span className="nav-caret">▾</span></a>
          <div className="nav-dropdown">
            <div className="nav-dd-section">Learn</div>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Blog</div>
                <div className="nav-dd-desc">WhatsApp sales playbooks &amp; guides</div>
              </span>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#F0EBF8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4BAE" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Help Center</div>
                <div className="nav-dd-desc">Docs, tutorials, API reference</div>
              </span>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#FBEBDA' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E3F26" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Customer Stories</div>
                <div className="nav-dd-desc">See how teams 10× their WhatsApp ROI</div>
              </span>
            </a>
            <div className="nav-dd-divider" />
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#FCE7E8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E42527" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">Contact Sales</div>
                <div className="nav-dd-desc">Book a personalized demo</div>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="nav-ctas">
        <a href="#" className="btn btn-ghost">Book a Demo</a>
        <a
          href="https://wa.me/1234567890?text=Hi%20-%20I%27d%20like%20to%20see%20how%20Eazybe%20works."
          className="btn btn-primary"
        >
          Talk to our Agent →
        </a>
      </div>
    </nav>
  )
}

const INTEGRATIONS = [
  { name: 'HubSpot', desc: 'Bi-directional sync', href: 'https://eazybe.com/hubspot-whatsapp-integration', bg: '#FFEBE3', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.626 1.263 1.976v2.868a5.1 5.1 0 00-2.348 1.028l-6.293-4.9a2.06 2.06 0 00.054-.453 2.1 2.1 0 10-.86 1.7l6.073 4.73a6.4 6.4 0 1 0 7.6-3z"/></svg>' },
  { name: 'Salesforce', desc: 'Deals, contacts, activities', href: 'https://eazybe.com/salesforce-whatsapp-integration', bg: '#E0F4FB', icon: '<svg width="20" height="14" viewBox="0 0 48 34" fill="#00A1E0"><path d="M19.5 6.8c1.5-1.6 3.7-2.6 6-2.6 3.1 0 5.9 1.8 7.3 4.5 1.2-.5 2.4-.8 3.8-.8 5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6c-.6 0-1.3-.1-1.9-.2-1.2 2.1-3.5 3.6-6.1 3.6-1.1 0-2.1-.3-3-.7-1.2 2.8-4 4.7-7.2 4.7-3.4 0-6.3-2-7.6-4.9-.7.1-1.3.2-2 .2C4 30 .3 26.3.3 21.7c0-3.1 1.7-5.8 4.2-7.2-.5-1.2-.8-2.5-.8-3.8C3.7 5.2 8 1 13.2 1c3 0 5.6 1.4 7.3 3.6z"/></svg>' },
  { name: 'Zoho CRM', desc: 'Native Zoho sync', href: 'https://eazybe.com/zoho-whatsapp-integration', bg: '#FCE7E8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#E42527"/><text x="12" y="17" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">Z</text></svg>' },
  { name: 'Pipedrive', desc: 'Pipeline auto-sync', href: 'https://eazybe.com/pipedrive-whatsapp-integration', bg: '#E4F0E8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1A6B3A"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>' },
  { name: 'Bitrix24', desc: 'CRM + tasks + chat', href: 'https://eazybe.com/bitrix24-whatsapp-integration', bg: '#E1F0F8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1F8AC0"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">B24</text></svg>' },
  { name: 'LeadSquared', desc: 'Lead capture + nurture', href: 'https://eazybe.com/leadsquared-whatsapp-integration', bg: '#EFE6FA', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#7C3AED"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">LSQ</text></svg>' },
  { name: 'Freshworks', desc: 'Freshsales + Freshdesk', href: 'https://eazybe.com/freshworks-whatsapp-integration', bg: '#E4F7E8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#fff" stroke="#E4E8F1" stroke-width="0.5"/><path d="M5 13.5L8 10l2 2 4-5 5 6.5" stroke="#3FBA50" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { name: 'Google Sheets', desc: 'Spreadsheet-as-CRM', href: 'https://eazybe.com/google-sheets-whatsapp-integration', bg: '#E4F4EA', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1.5" fill="#0F9D58"/><rect x="6" y="7" width="12" height="12" fill="#fff"/><path d="M6 11h12M6 15h12M10 7v12M14 7v12" stroke="#0F9D58" stroke-width="0.8"/></svg>' },
  { name: 'Custom API', desc: 'Webhooks + REST API', href: 'https://eazybe.com/webhooks-whatsapp-integration', bg: '#F0EBF8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0F1115"/><path d="M9 9l-3 3 3 3M15 9l3 3-3 3" stroke="#A78BFA" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
]
