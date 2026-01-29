import React from 'react'
import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Youtube, Shield, Lock, Rocket, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FooterColumn, type FooterLink } from './FooterColumn'

// Meta infinity logo component for consistent branding
const MetaLogo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <img
    src={`https://cdn.simpleicons.org/meta/0866FF`}
    alt="Meta"
    width={size}
    height={size * 0.6}
    style={{ objectFit: 'contain' }}
  />
)

const getPlatformLinks = (t: (key: string) => string): FooterLink[] => [
  { label: 'Cloud Backup', href: '/features/cloud-backup' },
  { label: 'Team Inbox', href: '/features/team-inbox' },
  { label: 'Revenue Inbox', href: '/features/revenue-inbox' },
  { label: 'Rep Radar', href: '/features/rep-radar' },
  { label: 'Quick Reply', href: '/features/quick-reply' },
  { label: 'Message Scheduler', href: '/features/scheduler' },
  { label: 'WhatsApp CRM', href: '/features/whatsapp-crm' },
  { label: 'WhatsApp Copilot', href: '/features/whatsapp-copilot' },
  { label: t('footer.viewAllFeatures'), href: '/features' },
]

const getIntegrationLinks = (t: (key: string) => string): FooterLink[] => [
  { label: 'HubSpot', href: '/integrations/hubspot' },
  { label: 'Salesforce', href: '/integrations/salesforce' },
  { label: 'Zoho CRM', href: '/integrations/zoho' },
  { label: 'Bitrix24', href: '/integrations/bitrix24' },
  { label: 'LeadSquared', href: '/integrations/leadsquared' },
  { label: 'Freshdesk', href: '/integrations/freshdesk' },
  { label: 'Pipedrive', href: '/integrations/pipedrive' },
  { label: 'Google Sheets', href: '/integrations/google-sheets' },
  { label: 'Webhooks', href: '/integrations/webhooks' },
  { label: t('footer.viewAllIntegrations'), href: '/integrations' },
]

const whatsappApiLinks: FooterLink[] = [
  { label: 'Coexistence', href: '/whatsapp-api/coexistence' },
  { label: 'Message Templates', href: '/whatsapp-api/templates' },
  { label: 'Broadcast Messages', href: '/whatsapp-api/broadcast' },
  { label: 'API Documentation', href: 'https://docs.eazybe.com/api', isExternal: true },
]

const resourceLinks: FooterLink[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Help Center', href: 'https://help.eazybe.com', isExternal: true },
  { label: 'Documentation', href: 'https://docs.eazybe.com', isExternal: true },
  { label: 'API Reference', href: 'https://api.eazybe.com', isExternal: true },
  { label: 'Case Studies', href: '/blog?category=case-studies' },
  { label: 'Webinars', href: 'https://eazybe.com/webinars', isExternal: true },
]

const companyLinks: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: 'https://eazybe.com/careers', isExternal: true },
  { label: 'Contact', href: '/contact' },
  { label: 'Partners', href: 'https://eazybe.com/partners', isExternal: true },
  { label: 'Security', href: 'https://eazybe.com/security', isExternal: true },
  { label: 'Status', href: 'https://status.eazybe.com', isExternal: true },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'DPA', href: '/dpa' },
  { label: 'MSA', href: '/msa' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/eazybe', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/eazybe', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@eazybe', label: 'YouTube' },
]

export const ChunkyFooter: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      {/* CTA Section - Ready for Lift Off */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-700">
        {/* Background gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-mono text-sm font-bold mb-8">
            <Rocket size={16} />
            {t('hero.badge')}
          </div>

          <h2 className="text-5xl md:text-6xl font-sans font-extrabold text-white tracking-tight leading-tight mb-6">
            {t('hero.headline')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t('hero.headlineHighlight')}</span>
          </h2>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {t('hero.subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700 hover:scale-105 transform transition-all"
            >
              {t('cta.startFreeTrial')}
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
            >
              {t('cta.bookDemo')}
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            {t('hero.noCreditCard')}
          </p>
        </div>
      </section>

      {/* Security Section - Enterprise-Ready Security */}
      <section className="py-24 bg-slate-950 relative border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-slate-900/50 text-cyan-500 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              {t('security.title')}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Meta Business Partner Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-blue-600/50 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MetaLogo size={44} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{t('footer.metaBusinessPartner')}</h3>
              <p className="text-slate-400 text-sm">{t('footer.verifiedIntegration')}</p>
            </div>

            {/* GDPR Ready Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden hover:border-emerald-500/50 transition-colors group">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 text-emerald-500 relative group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck size={32} />
                <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{t('security.gdpr')}</h3>
              <p className="text-slate-400 text-sm mb-6">{t('security.gdprDesc')}</p>
              <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-current flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                </div>
                {t('footer.compliant')}
              </div>
            </div>

            {/* Bank-Grade Security Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-cyan-500/50 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform duration-300">
                <Lock size={32} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{t('security.encryption')}</h3>
              <p className="text-slate-400 text-sm">{t('security.encryptionDesc')}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">{t('footer.trustedBy')}</p>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-brand-surface pt-16 pb-8 text-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-8 h-8 bg-brand-black rounded-lg flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-300 p-1">
                <img
                  src="/logo.png"
                  alt="Eazybe Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl text-white group-hover:text-brand-blue transition-colors">
                Eazybe
              </span>
            </Link>
            <p className="text-slate-400 mb-5 leading-relaxed text-xs">
              {t('footer.tagline')}
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 mb-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-brand-blue/20 hover:text-brand-blue transition-all duration-150"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {/* GDPR Badge */}
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <Shield size={20} className="text-brand-cyan mb-1.5" />
                <span className="text-[10px] font-semibold text-slate-400 text-center leading-tight">
                  {t('footer.gdprReady')}
                </span>
              </div>

              {/* Meta Business Partner Badge */}
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <div className="mb-1.5">
                  <MetaLogo size={22} />
                </div>
                <span className="text-[10px] font-semibold text-slate-400 text-center leading-tight">
                  {t('footer.metaPartner')}
                </span>
              </div>

              {/* Encrypted Badge */}
              <div className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <Lock size={20} className="text-brand-green mb-1.5" />
                <span className="text-[10px] font-semibold text-slate-400 text-center leading-tight">
                  {t('footer.encrypted')}
                </span>
              </div>
            </div>
          </div>

          {/* Platform Column */}
          <FooterColumn title={t('footer.platform')} links={getPlatformLinks(t)} />

          {/* Integrations Column */}
          <FooterColumn title={t('footer.integrations')} links={getIntegrationLinks(t)} />

          {/* WhatsApp API Column */}
          <FooterColumn title={t('footer.whatsappApi')} links={whatsappApiLinks} />

          {/* Resources Column */}
          <FooterColumn title={t('footer.resources')} links={resourceLinks} />

          {/* Company Column */}
          <FooterColumn title={t('footer.company')} links={companyLinks} />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} {t('footer.copyright')}
            <span className="hidden md:inline"> · </span>
            <span className="block md:inline mt-1 md:mt-0">
              8, The Green STE B, Dover Delaware - 19901
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default ChunkyFooter
