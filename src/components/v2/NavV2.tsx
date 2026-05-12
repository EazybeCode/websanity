'use client'

import Link from 'next/link'

const WA_LINK = 'https://wa.me/13023356201?text=Hi%20-%20I%27d%20like%20to%20see%20how%20Eazybe%20works.'

export default function NavV2() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        <span className="dot"></span>eazy<em>be</em>
      </Link>

      <div className="nav-links">
        <div className="nav-item">
          <a>
            <span>Agents</span> <span className="nav-caret">▾</span>
          </a>
          <div className="nav-dropdown">
            <div className="nav-dd-section">AI Agents</div>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 3l4 4-4 4" />
                  <path d="M21 7H9a5 5 0 00-5 5" />
                  <path d="M7 21l-4-4 4-4" />
                  <path d="M3 17h12a5 5 0 005-5" />
                </svg>
              </span>
              <div>
                <div className="nav-dd-name">CRM Sync Agent</div>
                <div className="nav-dd-desc">Auto-log every WhatsApp chat</div>
              </div>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </span>
              <div>
                <div className="nav-dd-name">Lead Qualification</div>
                <div className="nav-dd-desc">Qualify 24/7 like your best rep</div>
              </div>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </span>
              <div>
                <div className="nav-dd-name">Revenue Agent</div>
                <div className="nav-dd-desc">Spot ghosted deals</div>
              </div>
            </a>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </span>
              <div>
                <div className="nav-dd-name">Customer Success</div>
                <div className="nav-dd-desc">Answer support 24/7</div>
              </div>
            </a>
            <div className="nav-dd-divider"></div>
            <div className="nav-dd-section">Build Your Own</div>
            <a href="#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#F0EBF8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4BAE" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </span>
              <div>
                <div className="nav-dd-name">Agent Builder</div>
                <div className="nav-dd-desc">Custom agents</div>
              </div>
            </a>
          </div>
        </div>

        <div className="nav-item">
          <a>
            <span>Integrations</span> <span className="nav-caret">▾</span>
          </a>
          <div className="nav-dropdown" style={{ minWidth: 540, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, padding: 14 }}>
            <div style={{ gridColumn: '1 / -1' }} className="nav-dd-section">CRMs</div>
            {[
              { name: 'HubSpot', desc: 'Bi-directional sync', href: 'https://eazybe.com/hubspot-whatsapp-integration', bg: '#FFEBE3' },
              { name: 'Salesforce', desc: 'Deals, contacts', href: 'https://eazybe.com/salesforce-whatsapp-integration', bg: '#E0F4FB' },
              { name: 'Zoho CRM', desc: 'Native Zoho sync', href: 'https://eazybe.com/zoho-whatsapp-integration', bg: '#FCE7E8' },
              { name: 'Pipedrive', desc: 'Pipeline auto-sync', href: 'https://eazybe.com/pipedrive-whatsapp-integration', bg: '#E4F0E8' },
              { name: 'Bitrix24', desc: 'CRM + tasks', href: 'https://eazybe.com/bitrix24-whatsapp-integration', bg: '#E1F0F8' },
              { name: 'LeadSquared', desc: 'Lead capture', href: 'https://eazybe.com/leadsquared-whatsapp-integration', bg: '#EFE6FA' },
              { name: 'Freshworks', desc: 'Freshsales', href: 'https://eazybe.com/freshworks-whatsapp-integration', bg: '#E4F7E8' },
              { name: 'Google Sheets', desc: 'Spreadsheet-as-CRM', href: 'https://eazybe.com/google-sheets-whatsapp-integration', bg: '#E4F4EA' },
            ].map((i) => (
              <a key={i.name} href={i.href} target="_blank" rel="noopener" className="nav-dd-item">
                <span className="nav-dd-icon" style={{ background: i.bg, fontSize: 12, fontWeight: 600 }}>
                  {i.name[0]}
                </span>
                <div>
                  <div className="nav-dd-name">{i.name}</div>
                  <div className="nav-dd-desc">{i.desc}</div>
                </div>
              </a>
            ))}
            <div style={{ gridColumn: '1 / -1' }} className="nav-dd-divider"></div>
            <a href="https://eazybe.com/integrations" target="_blank" rel="noopener" style={{ gridColumn: '1 / -1', textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--accent-ink)', letterSpacing: '0.04em', padding: '8px 14px' }}>
              See all integrations →
            </a>
          </div>
        </div>

        <div className="nav-item">
          <Link href="/features"><span>Features</span></Link>
        </div>
        <div className="nav-item">
          <Link href="/pricing"><span>Pricing</span></Link>
        </div>
        <div className="nav-item">
          <Link href="/blog"><span>Resources</span></Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <a href="#" className="btn btn-ghost">Book a Demo</a>
        <a href={WA_LINK} className="btn btn-primary">Talk to our Agent →</a>
      </div>
    </nav>
  )
}
