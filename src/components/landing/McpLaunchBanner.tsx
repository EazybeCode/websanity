'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import './mcp-launch-banner.css'

// Once dismissed, stay hidden on this browser.
const STORAGE_KEY = 'eazybe:mcp-launch-banner'

export function McpLaunchBanner() {
  const t = useTranslations('mcpBanner')
  const locale = useLocale()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) setOpen(false)
    } catch {
      /* localStorage blocked — keep showing the banner */
    }
  }, [])

  if (!open) return null

  const dismiss = () => {
    setOpen(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {}
  }

  const href = locale === 'en' ? '/mcp' : `/${locale}/mcp`

  return (
    <div className="mcp-launch-bar" role="region" aria-label="MCP">
      <a href={href} className="mcp-launch-link">
        <span className="mcp-launch-tag">MCP</span>
        <span className="mcp-launch-text">{t('text')}</span>
        <span className="mcp-launch-cta">{t('cta')} →</span>
      </a>
      <button type="button" className="mcp-launch-close" aria-label={t('close')} onClick={dismiss}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
