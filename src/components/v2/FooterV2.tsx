'use client'

export default function FooterV2() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>eazy<em>be</em></h3>
            <p>WhatsApp AI agents for CRM teams. Built for the way sales actually happens.</p>
          </div>
          <div className="footer-col">
            <h4>Agents</h4>
            <ul>
              <li><a href="#">CRM Sync</a></li>
              <li><a href="#">Lead Qualification</a></li>
              <li><a href="#">Revenue Agent</a></li>
              <li><a href="#">Customer Success</a></li>
              <li><a href="#">Agent Builder</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Integrations</h4>
            <ul>
              <li><a href="https://eazybe.com/hubspot-whatsapp-integration">HubSpot</a></li>
              <li><a href="https://eazybe.com/salesforce-whatsapp-integration">Salesforce</a></li>
              <li><a href="https://eazybe.com/zoho-whatsapp-integration">Zoho CRM</a></li>
              <li><a href="https://eazybe.com/pipedrive-whatsapp-integration">Pipedrive</a></li>
              <li><a href="https://eazybe.com/integrations">See all →</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/comparison">Comparisons</a></li>
              <li><a href="/features">Features</a></li>
              <li><a href="/whatsapp-api">WhatsApp API</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/about-us">About</a></li>
              <li><a href="/become-our-partner">Partners</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <div className="footer-badges">
            <span className="fb">GDPR Ready</span>
            <span className="fb">Meta Business Partner</span>
            <span className="fb">Encrypted</span>
          </div>
          <div className="footer-legal">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/msa">MSA</a>
            <span>© 2026 Eazybe</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
