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
            <h3>eazy<em>be</em></h3>
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
