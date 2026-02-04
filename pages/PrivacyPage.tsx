import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { Shield } from 'lucide-react'

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation()

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
                {t('privacy.title')}
              </h1>
            </div>
          </div>
          <p className="text-xl text-emerald-400 font-medium mb-4">
            {t('privacy.tagline')}
          </p>
          <p className="text-slate-400">
            {t('privacy.intro')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Privacy Policy Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">1</span>
              {t('privacy.policyTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.policyIntro')}</p>
              <p>{t('privacy.aboutUs')}</p>
            </div>
          </div>

          {/* Google Sign-in Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">2</span>
              {t('privacy.googleSigninTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.googleSignin')}</p>
              <p>{t('privacy.serviceEmails')}</p>
            </div>
          </div>

          {/* OAuth Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">3</span>
              {t('privacy.oauthTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.oauth')}</p>
              <p>{t('privacy.cookies')}</p>
            </div>
          </div>

          {/* Data Changes Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">4</span>
              {t('privacy.dataChangesTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.dataChanges')}</p>
              <p>{t('privacy.disclosure')}</p>
              <p>{t('privacy.thirdPartyPayment')}</p>
            </div>
          </div>

          {/* Third Party Privacy */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">5</span>
              {t('privacy.thirdPartyTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.thirdParty')}</p>
            </div>
          </div>

          {/* Children's Information */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">6</span>
              {t('privacy.childrenTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.children')}</p>
            </div>
          </div>

          {/* Online Privacy Policy Only */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">7</span>
              {t('privacy.onlineOnlyTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.onlineOnly')}</p>
            </div>
          </div>

          {/* Google Drive Access */}
          <div className="mb-12 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">{t('privacy.googleDriveTitle')}</h2>
            <div className="space-y-4 text-slate-300">
              <p>{t('privacy.googleDriveIntro')}</p>
              <p><strong className="text-white">{t('privacy.fileId')}</strong> {t('privacy.fileIdDesc')}</p>
              <div>
                <p className="font-semibold text-white mb-2">{t('privacy.purposeTitle')}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>{t('privacy.purpose1')}</li>
                  <li>{t('privacy.purpose2')}</li>
                </ul>
                <p className="mt-2">{t('privacy.noContentAccess')}</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">{t('privacy.dataSharingTitle')}</p>
                <p>{t('privacy.dataSharing')}</p>
              </div>
            </div>
          </div>

          {/* Data Protection Measures */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">8</span>
              {t('privacy.dataProtectionTitle')}
            </h2>
            <div className="pl-10 space-y-6 text-slate-300">
              <div>
                <p className="font-semibold text-white mb-2">{t('privacy.encryptionTitle')}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>{t('privacy.encryption1')}</li>
                  <li>{t('privacy.encryption2')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">{t('privacy.accessControlTitle')}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>{t('privacy.accessControl1')}</li>
                  <li>{t('privacy.accessControl2')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">{t('privacy.securityAuditsTitle')}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>{t('privacy.securityAudits1')}</li>
                  <li>{t('privacy.securityAudits2')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">{t('privacy.dataMinimizationTitle')}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>{t('privacy.dataMinimization1')}</li>
                  <li>{t('privacy.dataMinimization2')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* California Privacy Rights */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">9</span>
              {t('privacy.californiaTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.california')}</p>
              <p className="text-slate-400 italic">{t('privacy.californiaNote')}</p>
            </div>
          </div>

          {/* Notice to European Users */}
          <div className="mb-12 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">{t('privacy.europeanTitle')}</h2>
            <div className="space-y-4 text-slate-300">
              <p>{t('privacy.europeanIntro')}</p>
              <p><strong className="text-white">{t('privacy.personalInfoTitle')}</strong> {t('privacy.personalInfo')}</p>
              <p><strong className="text-white">{t('privacy.dataControllerTitle')}</strong> {t('privacy.dataController')}</p>
              <p><strong className="text-white">{t('privacy.legalBasesTitle')}</strong> {t('privacy.legalBases')}</p>
            </div>
          </div>

          {/* Use for New Purposes */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">10</span>
              {t('privacy.newPurposesTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.newPurposes')}</p>
            </div>
          </div>

          {/* Retention */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">11</span>
              {t('privacy.retentionTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.retention')}</p>
              <p>{t('privacy.retentionFactors')}</p>
              <p>{t('privacy.retentionDeletion')}</p>
            </div>
          </div>

          {/* Sensitive Information */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">12</span>
              {t('privacy.sensitiveTitle')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('privacy.sensitive')}</p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12 p-6 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 rounded-xl border border-emerald-500/20">
            <h2 className="text-xl font-bold text-white mb-4">{t('privacy.rightsTitle')}</h2>
            <div className="space-y-3 text-slate-300">
              <p>{t('privacy.rightsIntro')}</p>
              <ul className="space-y-2">
                <li><strong className="text-emerald-400">{t('privacy.accessRight')}</strong> {t('privacy.accessRightDesc')}</li>
                <li><strong className="text-emerald-400">{t('privacy.correctRight')}</strong> {t('privacy.correctRightDesc')}</li>
                <li><strong className="text-emerald-400">{t('privacy.deleteRight')}</strong> {t('privacy.deleteRightDesc')}</li>
                <li><strong className="text-emerald-400">{t('privacy.transferRight')}</strong> {t('privacy.transferRightDesc')}</li>
                <li><strong className="text-emerald-400">{t('privacy.restrictRight')}</strong> {t('privacy.restrictRightDesc')}</li>
                <li><strong className="text-emerald-400">{t('privacy.objectRight')}</strong> {t('privacy.objectRightDesc')}</li>
              </ul>
              <p className="mt-4">{t('privacy.rightsContact')}</p>
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
