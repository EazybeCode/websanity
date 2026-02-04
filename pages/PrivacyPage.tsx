import React from 'react'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { Shield } from 'lucide-react'

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Eazybe Privacy Policy
              </h1>
            </div>
          </div>
          <p className="text-xl text-emerald-400 font-medium mb-4">
            Revised 2026
          </p>
          <p className="text-slate-400">
            Your privacy and data security are our top priorities. This policy explains how we handle your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">1</span>
              Introduction
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>
                At Eazybe, Inc., we provide a RevOps and CRM integration layer for WhatsApp Web. This Privacy Policy explains how we collect, handle, and protect your data when you use the Eazybe Chrome Extension and our associated services.
              </p>
            </div>
          </div>

          {/* Google API Disclosure */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">2</span>
              Google API Disclosure (Mandatory for Chrome Web Store)
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>
                Eazybe's use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
            </div>
          </div>

          {/* Data Collection and Handling */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">3</span>
              Data Collection and Handling
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>To provide our CRM sync and AI classification features, Eazybe processes the following data:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">Identity Data:</strong> We use Google OAuth to authenticate your identity and collect your email address for licensing and communication.</li>
                <li><strong className="text-white">WhatsApp Data:</strong> To enable CRM integration, we access contact names, phone numbers, and message timestamps from your WhatsApp Web interface.</li>
                <li><strong className="text-white">CRM Data:</strong> If you connect a CRM (HubSpot, Zoho, Salesforce, etc.), we process data required to sync contacts, tasks, and notes between WhatsApp and your CRM.</li>
                <li><strong className="text-white">AI & Classification Data:</strong> We process message metadata (and message content if AI features are enabled) to provide conversation summaries, sentiment analysis, and intent scoring.</li>
              </ul>
            </div>
          </div>

          {/* Data Storage and Security */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">4</span>
              Data Storage and Security
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>We follow a strict "Privacy by Design" architecture:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">Browser-Level:</strong> Most WhatsApp interactions are processed locally in your browser.</li>
                <li><strong className="text-white">Server-Level:</strong> Metadata required for team collaboration (tags, CRM deal values, sentiment scores) is stored securely on our servers (AWS/Hetzner) and databases (MongoDB/BigQuery).</li>
                <li><strong className="text-white">Encryption:</strong> All data in transit is encrypted via HTTPS/TLS. Data at rest is encrypted using industry-standard AES-256 protocols.</li>
              </ul>
            </div>
          </div>

          {/* Data Sharing and Disclosure */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">5</span>
              Data Sharing and Disclosure
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">No Sale of Data:</strong> We do not sell, rent, or trade your personal data to third parties.</li>
                <li><strong className="text-white">Third-Party Integrations:</strong> Data is only shared with third-party services (like your CRM provider or payment processor like Stripe) that you explicitly authorize.</li>
                <li><strong className="text-white">Limited Use:</strong> We do not use your data for advertising, creditworthiness, or any purpose outside of providing the Eazybe service.</li>
              </ul>
            </div>
          </div>

          {/* User Rights and Data Deletion */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">6</span>
              User Rights and Data Deletion
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>You have the right to access, correct, or delete your data at any time.</p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">Uninstalling:</strong> You can stop data collection by uninstalling the Chrome Extension.</li>
                <li><strong className="text-white">Deletion Request:</strong> To permanently delete your account and all associated data from our databases, please contact us at <a href="mailto:hey@eazybe.com" className="text-emerald-400 hover:text-emerald-300 underline">hey@eazybe.com</a>. Requests are processed within 5 business days.</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">7</span>
              Contact Information
            </h2>
            <div className="space-y-2 text-slate-300">
              <p><strong className="text-white">Eazybe, Inc.</strong></p>
              <p>8, The Green STE B, Dover, Delaware - 19901</p>
              <p>Email: <a href="mailto:hey@eazybe.com" className="text-emerald-400 hover:text-emerald-300 underline">hey@eazybe.com</a></p>
            </div>
          </div>

          {/* Chrome Web Store Data Disclosure */}
          <div className="mb-12 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">Chrome Web Store Data Disclosure & Limited Use Policy</h2>
            <div className="space-y-6 text-slate-300">
              <p>
                To maintain transparency with our users and comply with the Google Chrome Web Store User Data Policy, Eazybe provides the following disclosures regarding the collection and use of your data.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">1. Data Collection & Usage Disclosure</h3>
                <p className="mb-3">
                  Eazybe collects and processes specific user data to provide our CRM integration and productivity services. This includes:
                </p>
                <p className="mb-2">
                  <strong className="text-white">Web Browsing Activity:</strong> Our extension accesses specific website content (primarily web.whatsapp.com and your connected CRM domains) to synchronize messages, contacts, and tasks.
                </p>
                <p className="mb-2">
                  <strong className="text-white">Purpose:</strong> This data is used solely to facilitate the core functionality of Eazybe, such as organizing chats, scheduling follow-ups, and integrating your browser-based workflows with your CRM.
                </p>
                <p>
                  <strong className="text-white">Minimal Permissions:</strong> We only request the minimum permissions necessary. We do not track your general browsing history across unrelated websites.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">2. Google API "Limited Use" Compliance</h3>
                <p className="mb-3">
                  Eazybe's use and transfer of information received from Google APIs to any other app will adhere to Google API Services User Data Policy, including the Limited Use requirements:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                  <li><strong className="text-slate-300">No Advertising:</strong> We do not use your data to serve, personalize, or even target advertisements.</li>
                  <li><strong className="text-slate-300">No Data Selling:</strong> We do not sell your personal data or browsing activity to any third parties, data brokers, or ad networks.</li>
                  <li><strong className="text-slate-300">Restricted Transfers:</strong> We do not transfer your data to third parties unless it is necessary to provide or improve our core features, to comply with applicable laws, or as part of a merger/acquisition.</li>
                  <li><strong className="text-slate-300">Human Review Limits:</strong> Our team will not view your private user data unless you provide explicit consent for troubleshooting, it is necessary for security purposes, or it is required to comply with legal obligations.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3. Privacy & Security Measures</h3>
                <p>
                  All data transmitted between the Eazybe extension and our servers is protected using industry-standard encryption (e.g., HTTPS). We implement strict access controls to ensure your data remains confidential and secure.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <ChunkyFooter />
    </div>
  )
}

export default PrivacyPage
