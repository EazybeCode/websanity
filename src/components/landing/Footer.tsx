'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

// Prefix internal href paths with the active locale.
// Special case: root path "/" becomes "/<locale>" (no trailing slash).
function withLocale(href: string, locale: string): string {
  if (locale === 'en') return href
  if (!href || !href.startsWith('/')) return href
  if (href === '/#' || href === '#') return href
  if (href === '/') return `/${locale}`
  return `/${locale}${href}`
}

// Column structure with translation keys. Each item references a key in
// landingV3.footer so its display label tracks the active locale. The `href`
// stays static. `literalName` shortcircuits the translation (used for brand
// names that don't change across locales).
const COLS: { titleKey: string; items: { nameKey?: string; literalName?: string; href: string; badgeKey?: string }[] }[] = [
  {
    titleKey: 'colAgents',
    items: [
      { nameKey: 'itemCrmSync', href: '/#' },
      { nameKey: 'itemLeadQual', href: '/#' },
      { nameKey: 'itemRevenueOps', href: '/#' },
      { nameKey: 'itemCustomerSuccess', href: '/#' },
      { nameKey: 'itemAllAgents', href: '/#' },
    ],
  },
  {
    titleKey: 'colIntegrations',
    items: [
      { literalName: 'HubSpot', href: '/hubspot-whatsapp-integration' },
      { literalName: 'Salesforce', href: '/salesforce-whatsapp-integration' },
      { literalName: 'Zoho CRM', href: '/zoho-whatsapp-integration' },
      { literalName: 'Pipedrive', href: '/pipedrive-whatsapp-integration' },
      { literalName: 'Google Sheets', href: '/google-sheets-whatsapp-integration' },
      { literalName: 'Bitrix24', href: '/bitrix24-whatsapp-integration' },
      { literalName: 'Freshdesk', href: '/freshdesk-whatsapp-integration' },
      { literalName: 'LeadSquared', href: '/leadsquared-whatsapp-integration' },
      { nameKey: 'itemAllIntegrations', href: '/integrations' },
    ],
  },
  {
    titleKey: 'colFeatures',
    items: [
      { nameKey: 'itemTeamInbox', href: '/features/team-inbox' },
      { nameKey: 'itemCloudBackup', href: '/features/cloud-backup' },
      { nameKey: 'itemQuickReply', href: '/features/quick-reply' },
      { nameKey: 'itemScheduler', href: '/features/scheduler' },
      { nameKey: 'itemRevenueInbox', href: '/features/revenue-inbox' },
      { nameKey: 'itemRepRadar', href: '/features/rep-radar' },
      { nameKey: 'itemWhatsappCopilot', href: '/features/whatsapp-copilot' },
      { nameKey: 'itemWhatsappCrm', href: '/features/whatsapp-crm' },
      { nameKey: 'itemAllFeatures', href: '/features' },
    ],
  },
  {
    titleKey: 'colResources',
    items: [
      { nameKey: 'itemBlog', href: '/blog' },
      { nameKey: 'itemHelpCenter', href: 'https://help.eazybe.com/introduction' },
      { nameKey: 'itemComparison', href: '/comparison' },
      { nameKey: 'itemWhatsappApi', href: '/whatsapp-api' },
      { nameKey: 'itemPricing', href: '/pricing' },
      { nameKey: 'itemAbout', href: '/about-us' },
    ],
  },
  {
    titleKey: 'colTools',
    items: [
      { nameKey: 'itemLiveChatWidget', href: '#', badgeKey: 'badgeNew' },
      { nameKey: 'itemChatLink', href: '#', badgeKey: 'badgeNew' },
      { nameKey: 'itemWhatsappTemplate', href: '#', badgeKey: 'badgeNew' },
      { nameKey: 'itemQrGenerator', href: '#', badgeKey: 'badgeNew' },
    ],
  },
  {
    titleKey: 'colCompany',
    items: [
      { nameKey: 'itemAbout', href: '/about-us' },
      { nameKey: 'itemCareers', href: '#', badgeKey: 'itemHiring' },
      { nameKey: 'itemPartner', href: '/become-our-partner' },
      { nameKey: 'itemContact', href: 'https://wa.me/+13322418095' },
    ],
  },
]

export function Footer() {
  const t = useTranslations('landingV3.footer')
  const locale = useLocale()
  const lh = (href: string) => withLocale(href, locale)
  const [openCols, setOpenCols] = useState<Set<number>>(new Set())
  const toggleCol = (i: number) => {
    setOpenCols((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href={lh('/')} aria-label={t('logoAria')} style={{ display: 'inline-block', marginBottom: 14 }}>
              <img
                src="/logo.png"
                alt="Eazybe Logo"
                width={137}
                height={32}
                style={{ height: 32, width: 'auto', objectFit: 'contain' }}
              />
            </a>
            <p>{t('tagline')}</p>
            <div className="footer-socials">
              <span className="footer-socials-label">{t('connectLabel')}</span>
              <div className="footer-socials-icons">
                <a href="#" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/eazybe" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
                </a>
                <a href="https://www.facebook.com/EazyBe.WhatsApp.Marketing/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.youtube.com/@eazybe" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.instagram.com/eazybe.supercharge/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
          {COLS.map((c, idx) => {
            const isOpen = openCols.has(idx)
            return (
              <div key={c.titleKey} className={`footer-col${isOpen ? ' open' : ''}`}>
                <button
                  type="button"
                  className="footer-col-toggle"
                  onClick={() => toggleCol(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`footer-col-${idx}`}
                >
                  <h3>{t(c.titleKey)}</h3>
                  <span className="footer-col-chev" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <ul id={`footer-col-${idx}`}>
                  {c.items.map((i, j) => {
                    const label = i.literalName ?? (i.nameKey ? t(i.nameKey) : '')
                    return (
                      <li key={`${idx}-${j}-${label}`}>
                        <a
                          href={lh(i.href)}
                          {...(i.href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {label}
                          {i.badgeKey && <span className="footer-col-badge">{t(i.badgeKey)}</span>}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="footer-watermark" aria-hidden="true" />{/* "EAZYBE" rendered via CSS ::before to keep it out of the a11y tree and contrast audits */}

        <div className="footer-baseline">
          <p className="footer-baseline-line">
            {t('copyright')} <span className="footer-baseline-sep">|</span> {t('copyrightSuffix')}
          </p>
          <nav className="footer-baseline-links" aria-label={t('policyAria')}>
            <a href={lh('/terms')}>{t('terms')}</a>
            <span className="footer-baseline-sep">|</span>
            <a href={lh('/privacy')}>{t('privacy')}</a>
            <span className="footer-baseline-sep">|</span>
            <a href={lh('/msa')}>{t('msa')}</a>
          </nav>

          <div className="footer-payments" role="group" aria-label="Accepted payment methods">
            <span className="footer-payments-label">{t('weAccept')}</span>
            <span className="footer-payment apple-pay" role="img" aria-label="Apple Pay">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.04c-.03-3.16 2.58-4.68 2.69-4.76-1.47-2.14-3.75-2.44-4.55-2.47-1.94-.2-3.79 1.14-4.77 1.14-.99 0-2.51-1.11-4.13-1.08-2.12.03-4.08 1.23-5.17 3.13-2.21 3.83-.56 9.49 1.59 12.6 1.05 1.52 2.3 3.23 3.93 3.17 1.58-.06 2.18-1.02 4.09-1.02s2.45 1.02 4.12.99c1.7-.03 2.78-1.55 3.82-3.08 1.2-1.77 1.69-3.49 1.71-3.58-.04-.02-3.28-1.26-3.32-4.99zM14.06 3.66c.87-1.06 1.46-2.52 1.3-3.99-1.25.05-2.78.83-3.68 1.88-.8.93-1.51 2.43-1.32 3.87 1.4.1 2.82-.71 3.7-1.76z"/></svg>
              <span>Pay</span>
            </span>
            <span className="footer-payment amex">AMEX</span>
            <span className="footer-payment gpay" role="img" aria-label="Google Pay">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Pay</span>
            </span>
            <span className="footer-payment mc" role="img" aria-label="Mastercard">
              <svg width="22" height="14" viewBox="0 0 36 22" aria-hidden="true">
                <circle cx="13" cy="11" r="10" fill="#EB001B"/>
                <circle cx="23" cy="11" r="10" fill="#F79E1B" opacity="0.92"/>
                <path d="M18 4a10 10 0 010 14 10 10 0 010-14z" fill="#FF5F00"/>
              </svg>
            </span>
            <span className="footer-payment visa">VISA</span>
            <span className="footer-payment paypal" role="img" aria-label="PayPal">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#003087" d="M8.3 3h6.4c2.4 0 4.1 1 4.7 2.7.5 1.6.1 3.3-1 4.6-1.2 1.4-3 2.1-5.3 2.1h-2c-.4 0-.7.3-.8.7l-.6 3.7c0 .2-.2.4-.4.4H7.4c-.4 0-.7-.4-.6-.8l1-7c.1-.5.6-.9 1.1-.9h2.3c1.4 0 2.5-.4 3-1.3.3-.6.3-1.1.1-1.5-.3-.5-1-.7-2-.7H8.7c-.5 0-.9.4-1 .9L7 11c0 .2-.2.4-.4.4H4.7c-.4 0-.7-.4-.6-.8L5.9 1.8c.1-.5.5-.8 1-.8h1.4z"/>
                <path fill="#0070BA" d="M19.7 6.5c-.3 2-1.7 3.4-3.9 3.4h-1.6c-.5 0-.9.4-1 .9l-.8 5.1c0 .3-.3.5-.6.5h-1.9c-.3 0-.5-.3-.5-.6l.2-1.2c0-.3.3-.5.6-.5h1c2.6 0 4.7-1 5.6-3.6.4-1.1.4-2 .1-2.8.3.2.5.5.6.8z"/>
              </svg>
              <span>PayPal</span>
            </span>
            <span className="footer-payments-more">{t('moreCount')}</span>
          </div>
          <p className="footer-disclaimer">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  )
}
