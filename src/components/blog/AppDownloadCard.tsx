'use client'

import { useTranslations } from 'next-intl'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.eazybe.workspace'

/** Sidebar card: QR to the Eazybe Android app (desktop sidebar only, so it's scanned with a phone) + Play badge. */
export function AppDownloadCard() {
  const t = useTranslations()
  return (
    <div className="bg-brand-card border border-slate-700/50 rounded-2xl px-5 py-5 shadow-xl text-center">
      <p className="text-white font-semibold text-sm mb-3">{t('blog.sidebar.appTitle')}</p>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="block w-fit mx-auto mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/eazybe-app-qr.svg"
          width={144}
          height={144}
          alt={t('blog.sidebar.appQrAlt')}
          loading="lazy"
          className="block w-36 h-36 rounded-lg"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('blog.sidebar.appBadgeAria')}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 transition-opacity hover:opacity-85"
        style={{ background: '#000', color: '#fff', border: '1px solid #A6A6A6' }}
      >
        <svg width="20" height="22" viewBox="0 0 24 26" aria-hidden="true">
          <path fill="#00D7FE" d="M1.1.6C.8.9.6 1.4.6 2v22c0 .6.2 1.1.5 1.4l.1.1L13.5 13.1v-.3L1.2.5z" />
          <path fill="#FFCE00" d="M17.6 17.3l-4.1-4.2v-.3l4.1-4.1.1.1 4.9 2.8c1.4.8 1.4 2.1 0 2.9l-4.9 2.8z" />
          <path fill="#FF3A44" d="M17.7 17.2L13.5 13 1.1 25.4c.5.5 1.2.5 2.1.1l14.5-8.3" />
          <path fill="#00F076" d="M17.7 8.8L3.2.5C2.3 0 1.6.1 1.1.6L13.5 13z" />
        </svg>
        <span className="flex flex-col items-start leading-none text-left">
          <span style={{ fontSize: 9, letterSpacing: '0.04em' }}>{t('blog.sidebar.appGetItOn')}</span>
          <span style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>Google Play</span>
        </span>
      </a>
    </div>
  )
}
