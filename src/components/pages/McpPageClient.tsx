'use client'

import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useTrialModal } from '@/providers/TrialModalProvider'
import './mcp-page.css'

const MCP_URL = 'https://app.eazybe.com/api/wa-agent/business-mcp'

// TODO: point these at the real guide / reference posts once they are published.
const GUIDE_URL = '/blog'
const TOOLS_URL = '/blog'
const ACADEMY_URL = '/blog'

// Same rule as Nav/Footer: prefix internal paths with the active locale.
function withLocale(href: string, locale: string): string {
  if (locale === 'en' || !href.startsWith('/')) return href
  return `/${locale}${href}`
}

type StepCopy = { title: string; desc: string }
type PromptCard = { title: string; prompt: string; results: string[] }
type PromptGroup = { name: string; cards: PromptCard[] }
type Lesson = { title: string; meta: string }
type Faq = { q: string; a: string }
type Guide = { tag: string; title: string; desc: string }

function copyText(value: string) {
  try {
    navigator.clipboard?.writeText(value).catch(() => {})
  } catch {}
}

function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="mcp-btn mcp-btn-blue mcp-btn-sm"
      onClick={() => {
        copyText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1400)
      }}
    >
      {copied ? copiedLabel : label}
    </button>
  )
}

function TapMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 15V9.5a2 2 0 0 1 4 0V16l4.2.9a2.5 2.5 0 0 1 1.9 2.9l-.9 4.7a3 3 0 0 1-3 2.5h-4.6a3 3 0 0 1-2.3-1.1L9.5 21.5a1.9 1.9 0 0 1 2.8-2.5L14 20.5" />
      <path d="M16 2.5v2.5M8.5 5.5l1.7 1.7M23.5 5.5l-1.7 1.7M5.5 12h2.5M24 12h2.5" />
    </svg>
  )
}

/* ---------- Setup tabs ---------- */

type TabKey = 'claude' | 'code' | 'codex'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'claude', label: 'Claude' },
  { key: 'code', label: 'Claude Code' },
  { key: 'codex', label: 'Codex' },
]

// Commands are not translated; only the step copy around them is.
const STEP_CODE: Record<TabKey, (string | null)[]> = {
  claude: [MCP_URL, null, null],
  code: [`claude mcp add --transport http eazybe ${MCP_URL}`, '/mcp', null],
  codex: [`codex mcp add eazybe --url ${MCP_URL}`, 'codex mcp login eazybe', null],
}

function SetupCard({ onStart }: { onStart: () => void }) {
  const t = useTranslations('mcpPage')
  const [tab, setTab] = useState<TabKey>('claude')
  const steps = t.raw(`setup.${tab}`) as StepCopy[]
  const samplePrompt = t('samplePrompt')
  return (
    <div className="mcp-setup">
      <div className="mcp-tabs" role="tablist">
        {TABS.map((tb) => (
          <button
            key={tb.key}
            type="button"
            role="tab"
            aria-selected={tab === tb.key}
            className={tab === tb.key ? 'on' : ''}
            onClick={() => setTab(tb.key)}
          >
            {tb.label}
          </button>
        ))}
      </div>
      <div className="mcp-steps" key={tab}>
        {steps.map((s, i) => {
          const code = i === 2 ? samplePrompt : STEP_CODE[tab][i]
          return (
            <div key={s.title} className="mcp-step">
              <h4><span className="mcp-num">{i + 1}</span>{s.title}</h4>
              <p>{s.desc}</p>
              {code && <pre className={`mcp-code${i === 2 ? ' push' : ''}`}>{code}</pre>}
              {i === 0 && code && (
                <CopyButton
                  value={code}
                  label={code === MCP_URL ? t('copyLink') : t('copyCommand')}
                  copiedLabel={t('copied')}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="mcp-setup-foot">
        <span>{t('setupFoot')}</span>
        <button type="button" className="mcp-link" onClick={onStart}>{t('startFree')}</button>
      </div>
    </div>
  )
}

/* ---------- Prompt library ---------- */

function PromptLibrary() {
  const t = useTranslations('mcpPage')
  const groups = t.raw('promptGroups') as PromptGroup[]
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const group = groups[active]
  return (
    <div className="mcp-lib">
      <div className="mcp-lib-nav" role="tablist">
        {groups.map((g, i) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? 'on' : ''}
            onClick={() => setActive(i)}
          >
            <span>{g.name}</span>
            <em>{g.cards.length}</em>
          </button>
        ))}
      </div>
      <div className="mcp-lib-grid" key={group.name}>
        {group.cards.map((c) => (
          <div key={c.title} className="mcp-pcard">
            <div className="mcp-pcard-top">
              <h4>{c.title}</h4>
              <button
                type="button"
                onClick={() => {
                  copyText(c.prompt)
                  setCopied(c.title)
                  setTimeout(() => setCopied(null), 1400)
                }}
              >
                {copied === c.title ? t('copied') : t('copyPrompt')}
              </button>
            </div>
            <p>“{c.prompt}”</p>
            <ul>
              {c.results.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Page ---------- */

export function McpPageClient() {
  const t = useTranslations('mcpPage')
  const locale = useLocale()
  const lh = (href: string) => withLocale(href, locale)
  const { openModal } = useTrialModal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [pillCopied, setPillCopied] = useState(false)
  const start = () => openModal('trial')
  const demo = () => openModal('demo')

  const stats = t.raw('stats') as [string, string][]
  const lessons = t.raw('lessons') as Lesson[]
  const faqs = t.raw('faqs') as Faq[]
  const guides = t.raw('guides') as Guide[]
  const guideHrefs = [GUIDE_URL, TOOLS_URL, GUIDE_URL]

  return (
    <div className="mcp-lp">
      {/* Hero */}
      <section className="mcp-dark mcp-hero">
        <div className="mcp-wrap mcp-center">
          <div className="mcp-trio" aria-hidden>
            <span className="mcp-chip tilt-l">Claude</span>
            <span className="mcp-wire" />
            <span className="mcp-mark"><TapMark /></span>
            <span className="mcp-wire" />
            <span className="mcp-chip tilt-r">Codex</span>
          </div>
          <h1>{t('heroTitle')} <em>{t('heroTitleEm')}</em></h1>
          <p className="mcp-lede">{t('heroLede')}</p>

          <div className="mcp-urlbar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.2" aria-hidden>
              <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <code>{MCP_URL}</code>
            <CopyButton value={MCP_URL} label={t('copyLink')} copiedLabel={t('copied')} />
          </div>
          <p className="mcp-hint">{t('urlHint')}</p>

          <button
            type="button"
            className="mcp-pill"
            onClick={() => {
              copyText(MCP_URL)
              setPillCopied(true)
              setTimeout(() => setPillCopied(false), 1400)
            }}
          >
            <span className="dot" /> {pillCopied ? t('linkCopied') : t('pill')}
            <span className="ico" aria-hidden>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
            </span>
          </button>

          <div className="mcp-ctas">
            <button type="button" className="mcp-btn mcp-btn-blue" onClick={start}>{t('startFree')}</button>
            <button type="button" className="mcp-btn mcp-btn-ghost" onClick={demo}>{t('bookDemo')}</button>
          </div>
          <p className="mcp-fine">{t('fine')}</p>

          <SetupCard onStart={start} />

          <div className="mcp-sublinks">
            <a href={lh(GUIDE_URL)}>{t('linkGuide')}</a>
            <a href={lh(TOOLS_URL)}>{t('linkTools')}</a>
            <a href={lh('/privacy')}>{t('linkPrivacy')}</a>
          </div>
        </div>
      </section>

      {/* Customer stories */}
      <section className="mcp-light">
        <div className="mcp-wrap mcp-center">
          <span className="mcp-eyebrow">{t('storiesEyebrow')}</span>
          <h2>{t('storiesTitle')}</h2>
          <p className="mcp-sub">{t('storiesSub')}</p>
          <div className="mcp-stats">
            {stats.map(([v, l]) => (
              <div key={l}><strong>{v}</strong><span>{l}</span></div>
            ))}
          </div>
          <div className="mcp-ctas">
            <button type="button" className="mcp-btn mcp-btn-ink" onClick={start}>{t('startFree')}</button>
            <button type="button" className="mcp-btn mcp-btn-white" onClick={demo}>{t('bookDemo')}</button>
          </div>
        </div>
      </section>

      {/* Academy */}
      <section className="mcp-dark mcp-academy">
        <div className="mcp-wrap mcp-split">
          <div>
            <span className="mcp-eyebrow">{t('academyEyebrow')}</span>
            <h2>{t('academyTitle')}</h2>
            <p className="mcp-sub">{t('academySub')}</p>
            <a className="mcp-under" href={lh(ACADEMY_URL)}>{t('academyCta')}</a>
          </div>
          <div className="mcp-lessons">
            {lessons.map((l, i) => {
              const n = String(i + 1).padStart(2, '0')
              // The last lesson is a "coming soon" placeholder, not a link.
              const live = i < lessons.length - 1
              const body = (
                <>
                  <span className="n">{n}</span>
                  <span className="t"><b>{l.title}</b><small>{l.meta}</small></span>
                  {live && <span className="chev" aria-hidden>›</span>}
                </>
              )
              return live ? (
                <a key={n} href={lh(ACADEMY_URL)} className="mcp-lesson">{body}</a>
              ) : (
                <div key={n} className="mcp-lesson muted">{body}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What you can ask */}
      <section className="mcp-light">
        <div className="mcp-wrap mcp-center">
          <span className="mcp-eyebrow">{t('askEyebrow')}</span>
          <h2 className="mcp-h-wide">{t('askTitle')}</h2>
        </div>
        <div className="mcp-wrap">
          <PromptLibrary />
        </div>
      </section>

      {/* Connect strip */}
      <section className="mcp-dark mcp-strip">
        <div className="mcp-wrap mcp-strip-in">
          <div>
            <h3>{t('stripTitle')}</h3>
            <p>{t('stripSub')}</p>
            <code>{MCP_URL}</code>
          </div>
          <div className="mcp-ctas">
            <button type="button" className="mcp-btn mcp-btn-blue" onClick={start}>{t('startFree')}</button>
            <button type="button" className="mcp-btn mcp-btn-ghost" onClick={demo}>{t('bookDemo')}</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mcp-white">
        <div className="mcp-wrap mcp-center">
          <span className="mcp-eyebrow">{t('faqEyebrow')}</span>
          <h2>{t('faqTitle')}</h2>
          <div className="mcp-faq">
            {faqs.map((f, i) => (
              <div key={f.q} className={`mcp-faq-item${openFaq === i ? ' open' : ''}`}>
                <button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span aria-hidden>+</span>
                </button>
                {openFaq === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mcp-cta">
        <div className="mcp-wrap mcp-center">
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaSub')}</p>
          <div className="mcp-ctas">
            <button type="button" className="mcp-btn mcp-btn-white" onClick={start}>{t('startFree')}</button>
            <button type="button" className="mcp-btn mcp-btn-outline" onClick={demo}>{t('bookDemo')}</button>
          </div>
          <small>{t('ctaSmall')}</small>
        </div>
      </section>

      {/* Guides */}
      <section className="mcp-dark mcp-guides">
        <div className="mcp-wrap mcp-center">
          <span className="mcp-eyebrow">{t('guidesEyebrow')}</span>
          <h2>{t('guidesTitle')}</h2>
          <p className="mcp-sub">{t('guidesSub')}</p>
          <div className="mcp-guide-grid">
            {guides.map((g, i) => (
              <a key={g.title} href={lh(guideHrefs[i] ?? GUIDE_URL)} className="mcp-guide">
                <small>{g.tag}</small>
                <h4>{g.title}</h4>
                <p>{g.desc}</p>
                <span>{t('readGuide')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
