const COLS = [
  { title: 'Agents', items: ['CRM Sync', 'Lead Qualification', 'Revenue Ops', 'Team Visibility', 'All agents →'] },
  { title: 'Integrations', items: ['HubSpot', 'Salesforce', 'Zoho CRM', 'Pipedrive', 'Google Sheets'] },
  { title: 'Resources', items: ['Blog', 'Help Center', 'Case Studies', 'API Docs'] },
  { title: 'Company', items: ['About', 'Contact', 'Partners', 'Careers'] },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" aria-label="Eazybe — Home" style={{ display: 'inline-block', marginBottom: 14 }}>
              <img
                src="/logo.png"
                alt="Eazybe Logo"
                width={137}
                height={32}
                style={{ height: 32, width: 'auto', objectFit: 'contain' }}
              />
            </a>
            <p>WhatsApp AI agents for CRM teams. Built for the way sales actually happens.</p>
          </div>
          {COLS.map((c) => (
            <div key={c.title} className="footer-col">
              <h4>{c.title}</h4>
              <ul>
                {c.items.map((i) => (
                  <li key={i}><a href="#">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bot">
          <div className="footer-badges">
            <span className="fb">GDPR Ready</span>
            <span className="fb">Meta Business Partner</span>
            <span className="fb">Encrypted</span>
            <span className="fb">HubSpot ★ 4.6</span>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">© 2026 Eazybe</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
