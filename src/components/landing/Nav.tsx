'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
  CHROME_STORE_WEBSITE_URL,
  openChromeExtensionStorePopup,
} from '@/utils/openChromeExtensionStore'

// Prefix internal href paths with the active locale (e.g. "/hubspot-..." → "/br/hubspot-...").
// External URLs, hash links, and the root "/#" stay untouched.
// Special case: root path "/" becomes "/<locale>" (no trailing slash) so the
// logo link reads clean — `/br`, not `/br/`.
function withLocale(href: string, locale: string): string {
  if (locale === 'en') return href
  if (!href || !href.startsWith('/')) return href
  // Skip purely-hash placeholders like "/#" and absolute URLs
  if (href === '/#' || href === '#') return href
  if (href === '/') return `/${locale}`
  return `/${locale}${href}`
}

const LOCALES = [
  { code: 'en', label: 'EN', country: 'gb', prefix: '', hreflang: 'en', name: 'English' },
  { code: 'br', label: 'BR', country: 'br', prefix: '/br', hreflang: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'es', label: 'ES', country: 'es', prefix: '/es', hreflang: 'es', name: 'Español' },
  { code: 'tr', label: 'TR', country: 'tr', prefix: '/tr', hreflang: 'tr', name: 'Türkçe' },
]

function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [currentCode, setCurrentCode] = useState('en')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const path = window.location.pathname
    const match = LOCALES.find((l) => l.prefix && (path === l.prefix || path.startsWith(l.prefix + '/')))
    setCurrentCode(match ? match.code : 'en')
  }, [])

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const switchTo = (target: typeof LOCALES[number]) => {
    // 1. Canonical: read the page's own <link rel="alternate" hrefLang="...">.
    //    Sanity-driven posts (blog/comparison/features) have localized slugs;
    //    only the page itself knows the right target URL.
    //    React serializes JSX `hrefLang` to literal `hrefLang` in HTML (with
    //    a capital L), which CSS attribute selectors don't always match. We
    //    iterate and check the IDL `hreflang` property (and both attribute
    //    casings) so we match regardless of source case.
    const alts = document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"]')
    const alt = Array.from(alts).find(
      (el) =>
        (el.hreflang || el.getAttribute('hreflang') || el.getAttribute('hrefLang')) === target.hreflang
    )
    if (alt?.href) {
      // The href in hreflang alternates is an absolute production URL
      // (https://eazybe.com/...). Strip it to a path so we stay on the
      // current origin — important for local dev (localhost:3001), preview
      // deploys, and any future staging environment.
      try {
        const url = new URL(alt.href)
        window.location.href = url.pathname + url.search + url.hash
      } catch {
        window.location.href = alt.href
      }
      return
    }

    // 2. Per-slug Sanity routes with NO hreflang map: don't synthesize
    //    `/es/<english-slug>` (would 404 or render fallback English). Route
    //    to the locale's section index instead. Mirrors useLanguage hook.
    const path = window.location.pathname
    const perSlug = /^\/(?:(?:en|br|es|tr)\/)?(blog|comparison|features)\/[^/]+\/?$/.exec(path)
    if (perSlug) {
      window.location.href = (target.prefix || '') + `/${perSlug[1]}`
      return
    }

    // 3. Static pages (home, /pricing, etc.) — naive prefix swap is safe.
    let rest = path
    for (const l of LOCALES) {
      if (l.prefix && (path === l.prefix || path.startsWith(l.prefix + '/'))) {
        rest = path.slice(l.prefix.length) || '/'
        break
      }
    }
    window.location.href = (target.prefix || '') + rest + window.location.search
  }

  const current = LOCALES.find((l) => l.code === currentCode) || LOCALES[0]
  return (
    <div className="nav-lang" ref={ref}>
      <button
        type="button"
        className="nav-lang-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img className="nav-lang-flag" src={`/flags/${current.code}.png`} alt={`${current.name} flag`} width={20} height={15}  loading="lazy"/>
        <span className="nav-lang-label">{current.label}</span>
        <svg className="nav-lang-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="nav-lang-menu" role="listbox">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === currentCode}
              className={`nav-lang-item${l.code === currentCode ? ' active' : ''}`}
              onClick={() => switchTo(l)}
            >
              <img className="nav-lang-flag" src={`/flags/${l.code}.png`} alt={`${l.name} flag`} width={20} height={15}  loading="lazy"/>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const AGENTS = [
  {
    name: 'CRM Sync Agent',
    desc: 'Auto-log every WhatsApp chat to your CRM',
    href: '/#',
    bg: '#E4F5EC',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" stroke-width="2" stroke-linecap="round"><path d="M17 3l4 4-4 4"/><path d="M21 7H9a5 5 0 00-5 5"/><path d="M7 21l-4-4 4-4"/><path d="M3 17h12a5 5 0 005-5"/></svg>',
  },
  {
    name: 'Lead Qualification Agent',
    desc: 'Qualify leads 24/7 like your best rep',
    href: '/#',
    bg: '#E4F5EC',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" stroke-width="2" stroke-linecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
  },
  {
    name: 'Revenue Agent',
    desc: 'Spot ghosted deals before they die',
    href: '/#',
    bg: '#E4F5EC',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" stroke-width="2" stroke-linecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  },
  {
    name: 'Customer Success Agent',
    desc: 'Answer support 24/7 with your KB',
    href: '/#',
    bg: '#E4F5EC',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" stroke-width="2" stroke-linecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
  },
  {
    name: 'Agent Builder',
    desc: 'Custom agents for your use case',
    href: '/#',
    bg: '#F0EBF8',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4BAE" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>',
  },
]

const INTEGRATIONS = [
  { name: 'HubSpot', desc: 'Bi-directional sync', href: "/hubspot-whatsapp-integration", bg: '#FFEBE3', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.626 1.263 1.976v2.868a5.1 5.1 0 00-2.348 1.028l-6.293-4.9a2.06 2.06 0 00.054-.453 2.1 2.1 0 10-.86 1.7l6.073 4.73a6.4 6.4 0 1 0 7.6-3z"/></svg>' },
  { name: 'Salesforce', desc: 'Deals, contacts, activities', href: "/salesforce-whatsapp-integration", bg: '#E0F4FB', icon: '<svg width="20" height="14" viewBox="0 0 48 34" fill="#00A1E0"><path d="M19.5 6.8c1.5-1.6 3.7-2.6 6-2.6 3.1 0 5.9 1.8 7.3 4.5 1.2-.5 2.4-.8 3.8-.8 5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6c-.6 0-1.3-.1-1.9-.2-1.2 2.1-3.5 3.6-6.1 3.6-1.1 0-2.1-.3-3-.7-1.2 2.8-4 4.7-7.2 4.7-3.4 0-6.3-2-7.6-4.9-.7.1-1.3.2-2 .2C4 30 .3 26.3.3 21.7c0-3.1 1.7-5.8 4.2-7.2-.5-1.2-.8-2.5-.8-3.8C3.7 5.2 8 1 13.2 1c3 0 5.6 1.4 7.3 3.6z"/></svg>' },
  { name: 'Zoho CRM', desc: 'Native Zoho sync', href: "/zoho-whatsapp-integration", bg: '#FCE7E8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#E42527"/><text x="12" y="17" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">Z</text></svg>' },
  { name: 'Pipedrive', desc: 'Pipeline auto-sync', href: "/pipedrive-whatsapp-integration", bg: '#E4F0E8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1A6B3A"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>' },
  { name: 'Bitrix24', desc: 'CRM + tasks + chat', href: "/bitrix24-whatsapp-integration", bg: '#E1F0F8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1F8AC0"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">B24</text></svg>' },
  { name: 'LeadSquared', desc: 'Lead capture + nurture', href: "/leadsquared-whatsapp-integration", bg: '#EFE6FA', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#7C3AED"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">LSQ</text></svg>' },
  { name: 'Freshworks', desc: 'Freshsales + Freshdesk', href: "/freshdesk-whatsapp-integration", bg: '#E4F7E8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#fff" stroke="#E4E8F1" stroke-width="0.5"/><path d="M5 13.5L8 10l2 2 4-5 5 6.5" stroke="#3FBA50" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { name: 'Google Sheets', desc: 'Spreadsheet-as-CRM', href: "/google-sheets-whatsapp-integration", bg: '#E4F4EA', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1.5" fill="#0F9D58"/><rect x="6" y="7" width="12" height="12" fill="#fff"/><path d="M6 11h12M6 15h12M10 7v12M14 7v12" stroke="#0F9D58" stroke-width="0.8"/></svg>' },
  { name: 'Custom API', desc: 'Webhooks + REST API', href: "/webhooks-whatsapp-integration", bg: '#F0EBF8', icon: '<svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0F1115"/><path d="M9 9l-3 3 3 3M15 9l3 3-3 3" stroke="#A78BFA" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
]

const RESOURCES = [
  {
    name: 'Blog',
    desc: 'WhatsApp sales playbooks & guides',
    href: "/blog",
    bg: '#E4F5EC',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  },
  {
    name: 'Help Center',
    desc: 'Docs, tutorials, API reference',
    href: 'https://help.eazybe.com/introduction',
    bg: '#F0EBF8',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4BAE" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  },
  {
    name: 'Customer Stories',
    desc: 'See how teams 10× their WhatsApp ROI',
    href: '/#',
    bg: '#FBEBDA',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E3F26" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  },
  {
    name: 'Contact Sales',
    desc: 'Book a personalized demo',
    href: 'https://wa.me/+13322418095',
    bg: '#FCE7E8',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E42527" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  },
]

export function Nav() {
  const t = useTranslations('landingV3.nav')
  const locale = useLocale()
  const lh = (href: string) => withLocale(href, locale)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())

  // Translation key map for the AGENTS / INTEGRATIONS / RESOURCES data arrays,
  // matched by original English name. Keeps the icon/bg/href data intact while
  // letting each item show in the active locale.
  const itemLabel = (name: string): { name: string; desc?: string } => {
    const map: Record<string, { nameKey: string; descKey?: string }> = {
      'CRM Sync Agent':           { nameKey: 'agentCrmName', descKey: 'agentCrmDesc' },
      'Lead Qualification Agent': { nameKey: 'agentLeadName', descKey: 'agentLeadDesc' },
      'Revenue Agent':            { nameKey: 'agentRevenueName', descKey: 'agentRevenueDesc' },
      'Customer Success Agent':   { nameKey: 'agentCsName', descKey: 'agentCsDesc' },
      'Agent Builder':            { nameKey: 'agentBuilderName', descKey: 'agentBuilderDesc' },
      'HubSpot':                  { nameKey: 'intHubspot', descKey: 'intHubspotDesc' },
      'Salesforce':               { nameKey: 'intSalesforce', descKey: 'intSalesforceDesc' },
      'Zoho CRM':                 { nameKey: 'intZoho', descKey: 'intZohoDesc' },
      'Pipedrive':                { nameKey: 'intPipedrive', descKey: 'intPipedriveDesc' },
      'Bitrix24':                 { nameKey: 'intBitrix', descKey: 'intBitrixDesc' },
      'LeadSquared':              { nameKey: 'intLeadSquared', descKey: 'intLeadSquaredDesc' },
      'Freshworks':               { nameKey: 'intFreshworks', descKey: 'intFreshworksDesc' },
      'Google Sheets':            { nameKey: 'intGoogleSheets', descKey: 'intGoogleSheetsDesc' },
      'Custom API':               { nameKey: 'intCustom', descKey: 'intCustomDesc' },
      'Blog':                     { nameKey: 'resBlog', descKey: 'resBlogDesc' },
      'Help Center':              { nameKey: 'resHelpCenter', descKey: 'resHelpCenterDesc' },
      'Customer Stories':         { nameKey: 'resCustomerStories', descKey: 'resCustomerStoriesDesc' },
      'Contact Sales':            { nameKey: 'resContactSales', descKey: 'resContactSalesDesc' },
    }
    const entry = map[name]
    if (!entry) return { name }
    return { name: t(entry.nameKey), desc: entry.descKey ? t(entry.descKey) : undefined }
  }

  const toggleSection = (key: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setOpenSections(new Set())
  }

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [menuOpen])

  return (
    <>
    <nav className="nav">
      <a href={lh('/')} className="nav-logo" aria-label={t('logoAria')} onClick={closeMenu}>
        <img
          src="/logo-small.png"
          alt="Eazybe Logo"
          width={137}
          height={32}
          style={{ height: 32, width: 'auto', objectFit: 'contain' }}
        />
      </a>

      <div className="nav-lang-mobile">
        <LanguageSwitcher />
      </div>

      <button
        type="button"
        className={`nav-burger${menuOpen ? ' open' : ''}`}
        aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="nav-links">
        <div className="nav-item">
          <button type="button" className="nav-trigger" aria-haspopup="menu"><span>{t('agents')}</span> <span className="nav-caret">▾</span></button>
          <div className="nav-dropdown">
            <div className="nav-dd-section">{t('sectionAiAgents')}</div>
            <a href="/#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M17 3l4 4-4 4"/><path d="M21 7H9a5 5 0 00-5 5"/><path d="M7 21l-4-4 4-4"/><path d="M3 17h12a5 5 0 005-5"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('agentCrmName')}</div>
                <div className="nav-dd-desc">{t('agentCrmDesc')}</div>
              </span>
            </a>
            <a href="/#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('agentLeadName')}</div>
                <div className="nav-dd-desc">{t('agentLeadDesc')}</div>
              </span>
            </a>
            <a href="/#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('agentRevenueName')}</div>
                <div className="nav-dd-desc">{t('agentRevenueDesc')}</div>
              </span>
            </a>
            <a href="/#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('agentCsName')}</div>
                <div className="nav-dd-desc">{t('agentCsDesc')}</div>
              </span>
            </a>
            <div className="nav-dd-divider" />
            <div className="nav-dd-section">{t('sectionBuildYourOwn')}</div>
            <a href="/#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#F0EBF8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4BAE" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('agentBuilderName')}</div>
                <div className="nav-dd-desc">{t('agentBuilderDesc')}</div>
              </span>
            </a>
          </div>
        </div>

        <div className="nav-item">
          <a href={lh('/integrations')} className="nav-trigger" aria-haspopup="menu"><span>{t('integrations')}</span> <span className="nav-caret">▾</span></a>
          <div
            className="nav-dropdown"
            style={{ minWidth: 560, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, padding: 14 }}
          >
            <div style={{ gridColumn: '1 / -1' }} className="nav-dd-section">{t('sectionCrms')}</div>
            {INTEGRATIONS.map((item) => {
              const tr = itemLabel(item.name)
              return (
                <a key={item.name} href={lh(item.href)} className="nav-dd-item">
                  <span className="nav-dd-icon" style={{ background: item.bg }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <span className="nav-dd-content">
                    <div className="nav-dd-name">{tr.name}</div>
                    <div className="nav-dd-desc">{tr.desc ?? item.desc}</div>
                  </span>
                </a>
              )
            })}
            <div style={{ gridColumn: '1 / -1' }} className="nav-dd-divider" />
            <a href={lh('/integrations')} style={{ gridColumn: '1 / -1' }} className="nav-dd-item">
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--accent-ink)', letterSpacing: '0.04em', textAlign: 'center', width: '100%' }}>
                {t('allIntegrations')}
              </span>
            </a>
          </div>
        </div>

        <div className="nav-item"><a href={lh('/pricing')}><span>{t('pricing')}</span></a></div>

        <div className="nav-item">
          <button type="button" className="nav-trigger" aria-haspopup="menu"><span>{t('resources')}</span> <span className="nav-caret">▾</span></button>
          <div className="nav-dropdown">
            <div className="nav-dd-section">{t('sectionLearn')}</div>
            <a href={lh('/blog')} className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#E4F5EC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E73" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('resBlog')}</div>
                <div className="nav-dd-desc">{t('resBlogDesc')}</div>
              </span>
            </a>
            <a href="https://help.eazybe.com/introduction" target="_blank" rel="noopener noreferrer" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#F0EBF8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4BAE" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('resHelpCenter')}</div>
                <div className="nav-dd-desc">{t('resHelpCenterDesc')}</div>
              </span>
            </a>
            <a href="/#" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#FBEBDA' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E3F26" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('resCustomerStories')}</div>
                <div className="nav-dd-desc">{t('resCustomerStoriesDesc')}</div>
              </span>
            </a>
            <div className="nav-dd-divider" />
            <a href="https://wa.me/+13322418095" target="_blank" rel="noopener noreferrer" className="nav-dd-item">
              <span className="nav-dd-icon" style={{ background: '#FCE7E8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E42527" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <span className="nav-dd-content">
                <div className="nav-dd-name">{t('resContactSales')}</div>
                <div className="nav-dd-desc">{t('resContactSalesDesc')}</div>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="nav-ctas">
        <LanguageSwitcher />
        <a href="https://eazybe.info/demono" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t('bookDemo')}</a>
        <a
          href={CHROME_STORE_WEBSITE_URL}
          onClick={(e) => {
            e.preventDefault()
            openChromeExtensionStorePopup(CHROME_STORE_WEBSITE_URL)
          }}
          className="btn btn-primary"
        >
          {t('talkToAgent')}
        </a>
      </div>
    </nav>

      {/* Mobile drawer — rendered OUTSIDE <nav> so its position: fixed
          escapes the nav's transform-induced containing block */}
      <div className={`nav-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nav-drawer-backdrop" onClick={closeMenu} />
        <div className="nav-drawer-panel" role="dialog" aria-label="Main menu">
          <div className="nav-drawer-header">
            <a href={lh('/')} className="nav-drawer-logo" onClick={closeMenu} aria-label={t('logoAria')}>
              <img
                src="/logo-small.png"
                alt="Eazybe Logo"
                width={120}
                height={28}
                style={{ height: 28, width: 'auto', objectFit: 'contain' }}
              />
            </a>
            <button
              type="button"
              className="nav-drawer-close"
              onClick={closeMenu}
              aria-label={t('closeMenu')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="nav-drawer-sections">
            <div className={`nav-drawer-section${openSections.has('agents') ? ' open' : ''}`}>
              <button type="button" onClick={() => toggleSection('agents')} aria-expanded={openSections.has('agents')}>
                <span>{t('agents')}</span>
                <span className="nav-drawer-chev">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <ul>
                {AGENTS.map((a) => {
                  const tr = itemLabel(a.name)
                  return (
                    <li key={a.name}>
                      <a href={lh(a.href)} onClick={closeMenu}>
                        <span className="nav-drawer-item-icon" style={{ background: a.bg }} dangerouslySetInnerHTML={{ __html: a.icon }} />
                        <span className="nav-drawer-item-body">
                          <span className="nav-drawer-item-name">{tr.name}</span>
                          <span className="nav-drawer-item-desc">{tr.desc ?? a.desc}</span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className={`nav-drawer-section${openSections.has('integrations') ? ' open' : ''}`}>
              <button type="button" onClick={() => toggleSection('integrations')} aria-expanded={openSections.has('integrations')}>
                <span>{t('integrations')}</span>
                <span className="nav-drawer-chev">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <ul>
                {INTEGRATIONS.map((i) => {
                  const tr = itemLabel(i.name)
                  return (
                    <li key={i.name}>
                      <a href={lh(i.href)} onClick={closeMenu}>
                        <span className="nav-drawer-item-icon" style={{ background: i.bg }} dangerouslySetInnerHTML={{ __html: i.icon }} />
                        <span className="nav-drawer-item-body">
                          <span className="nav-drawer-item-name">{tr.name}</span>
                          <span className="nav-drawer-item-desc">{tr.desc ?? i.desc}</span>
                        </span>
                      </a>
                    </li>
                  )
                })}
                <li>
                  <a href={lh('/integrations')} onClick={closeMenu} className="nav-drawer-see-all">
                    {t('allIntegrations')}
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-drawer-link">
              <a href={lh('/pricing')} onClick={closeMenu}>{t('pricing')}</a>
            </div>

            <div className={`nav-drawer-section${openSections.has('resources') ? ' open' : ''}`}>
              <button type="button" onClick={() => toggleSection('resources')} aria-expanded={openSections.has('resources')}>
                <span>{t('resources')}</span>
                <span className="nav-drawer-chev">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <ul>
                {RESOURCES.map((r) => {
                  const tr = itemLabel(r.name)
                  return (
                    <li key={r.name}>
                      <a
                        href={r.href === '#bea-form' ? '#bea-form' : lh(r.href)}
                        target={r.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (r.href === '#bea-form') {
                            e.preventDefault()
                            window.dispatchEvent(new Event('eazybe:open-bea-form'))
                          }
                          closeMenu()
                        }}
                      >
                        <span className="nav-drawer-item-icon" style={{ background: r.bg }} dangerouslySetInnerHTML={{ __html: r.icon }} />
                        <span className="nav-drawer-item-body">
                          <span className="nav-drawer-item-name">{tr.name}</span>
                          <span className="nav-drawer-item-desc">{tr.desc ?? r.desc}</span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="nav-drawer-ctas">
            <a href="https://eazybe.info/demono" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" onClick={closeMenu}>{t('bookDemo')}</a>
            <a
              href={CHROME_STORE_WEBSITE_URL}
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                openChromeExtensionStorePopup(CHROME_STORE_WEBSITE_URL)
                closeMenu()
              }}
            >
              {t('talkToAgent')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
