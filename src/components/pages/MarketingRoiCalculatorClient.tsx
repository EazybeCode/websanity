'use client'

import { useMemo, useState } from 'react'
import type { RoiPageContent } from '@/data/marketing-roi-content'

type Labels = RoiPageContent['calculator']

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'BRL', symbol: 'R$' },
  { code: 'TRY', symbol: '₺' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'AED', symbol: 'AED' },
] as const

const DEFAULT_CURRENCY_BY_LOCALE: Record<string, string> = {
  en: 'USD',
  br: 'BRL',
  es: 'EUR',
  tr: 'TRY',
}

const LOCALE_TAG: Record<string, string> = {
  en: 'en-US',
  br: 'pt-BR',
  es: 'es-ES',
  tr: 'tr-TR',
}

/** Parses a user-typed amount across both separator conventions, so "10,000.50"
 *  and "10.000,50" both give 10000.5, and "$10,000" gives 10000.
 *
 *  When both separators appear, whichever comes last is the decimal point. When
 *  only one appears it is ambiguous, so: repeated occurrences mean thousands
 *  ("1,234,567"), and a single occurrence followed by exactly three digits is
 *  also read as thousands ("10,000" is ten thousand, not ten). Anything else is
 *  a decimal point ("10,5"). Returns null for input that isn't a usable number. */
function parseAmount(raw: string): number | null {
  const s = raw.trim()
  if (!s) return null
  const cleaned = s.replace(/[^0-9.,-]/g, '')
  if (!cleaned) return null

  const commas = (cleaned.match(/,/g) || []).length
  const dots = (cleaned.match(/\./g) || []).length

  let normalized: string
  if (commas && dots) {
    const decimal = cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.') ? ',' : '.'
    const thousands = decimal === ',' ? '.' : ','
    normalized = cleaned.split(thousands).join('').replace(decimal, '.')
  } else if (commas || dots) {
    const sep = commas ? ',' : '.'
    const count = commas || dots
    const tail = cleaned.slice(cleaned.lastIndexOf(sep) + 1)
    const isThousands = count > 1 || /^\d{3}$/.test(tail)
    normalized = isThousands ? cleaned.split(sep).join('') : cleaned.replace(sep, '.')
  } else {
    normalized = cleaned
  }

  const n = Number(normalized)
  return Number.isFinite(n) ? n : null
}

function parseCount(raw: string): number | null {
  const n = parseAmount(raw)
  return n === null ? null : Math.floor(n)
}

/* Interactive states, responsive rules and reduced-motion can't be expressed as
   inline styles, so the component ships its own scoped stylesheet. Class names
   are prefixed `roi-` to stay clear of the shared landing styles. */
const STYLES = `
.roi-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 24px; align-items: start; }
.roi-panel { border: 1px solid var(--line-2); border-radius: 16px; padding: 24px; }
.roi-panel-form { background: #fff; }
.roi-panel-out { background: var(--bg-2); position: sticky; top: 88px; }

.roi-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.roi-panel-title { margin: 0; font-size: 17px; font-weight: 700; color: var(--ink); }

.roi-reset {
  min-height: 44px; padding: 0 12px; margin-right: -12px;
  display: inline-flex; align-items: center;
  font-family: var(--f-sans); font-size: 13px; font-weight: 600;
  color: var(--accent-ink); background: none; border: none; border-radius: 8px;
  cursor: pointer; transition: background-color .16s ease, color .16s ease;
}
.roi-reset:hover { background: color-mix(in oklab, var(--accent-a) 14%, transparent); }
.roi-reset:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }

.roi-field { margin-bottom: 18px; }
.roi-field:last-child { margin-bottom: 0; }
.roi-label { display: block; font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
.roi-optional { font-weight: 400; color: var(--ink-3); font-size: 12px; margin-left: 6px; }

.roi-input-wrap { position: relative; display: flex; align-items: center; }
.roi-prefix {
  position: absolute; left: 14px; font-size: 14px; font-weight: 600;
  color: var(--ink-3); pointer-events: none; font-variant-numeric: tabular-nums;
}
.roi-input {
  width: 100%; min-height: 48px; padding: 12px 14px;
  font-family: var(--f-sans); font-size: 16px; color: var(--ink);
  background: #fff; border: 1px solid var(--line-2); border-radius: 10px;
  transition: border-color .16s ease, box-shadow .16s ease;
  font-variant-numeric: tabular-nums;
}
.roi-input.has-prefix { padding-left: 40px; }
.roi-input::placeholder { color: var(--ink-4); }
.roi-input:hover { border-color: color-mix(in oklab, var(--ink) 26%, var(--line-2)); }
.roi-input:focus-visible,
.roi-input:focus {
  outline: none;
  border-color: var(--accent-ink);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent-a) 34%, transparent);
}
.roi-input[aria-invalid="true"] { border-color: #B4232A; }
.roi-input[aria-invalid="true"]:focus { box-shadow: 0 0 0 3px rgba(180, 35, 42, 0.22); }

select.roi-input { cursor: pointer; appearance: none; padding-right: 38px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center; }

.roi-hint { margin-top: 6px; font-size: 12px; line-height: 1.45; color: var(--ink-3); }
.roi-error { margin-top: 6px; font-size: 12px; line-height: 1.45; font-weight: 600; color: #B4232A;
  display: flex; gap: 6px; align-items: flex-start; }

.roi-empty { margin: 0; font-size: 14px; line-height: 1.6; color: var(--ink-3); }

.roi-headline { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.roi-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.roi-metric { padding: 14px 16px; background: #fff; border: 1px solid var(--line); border-radius: 12px; }
.roi-metric.is-lead { padding: 18px; background: color-mix(in oklab, var(--accent-a) 12%, #fff);
  border-color: color-mix(in oklab, var(--accent-a) 32%, var(--line)); }
.roi-metric-k { font-family: var(--f-mono); font-size: 10px; letter-spacing: .09em;
  text-transform: uppercase; color: var(--ink-4); }
.roi-metric-v { margin-top: 6px; font-size: 22px; font-weight: 700; letter-spacing: -.02em;
  color: var(--ink); font-variant-numeric: tabular-nums; }
.roi-metric.is-lead .roi-metric-v { font-size: clamp(26px, 4vw, 32px); }
.roi-metric-h { margin-top: 4px; font-size: 12px; line-height: 1.45; color: var(--ink-3); }

.roi-verdict { margin: 14px 0; padding: 12px 14px; border-radius: 10px; background: #fff;
  border: 1px solid var(--line); font-size: 13px; font-weight: 600;
  display: flex; gap: 8px; align-items: center; }
.roi-verdict[data-tone="good"] { color: #0E7A46; border-color: color-mix(in oklab, #0E7A46 30%, var(--line)); }
.roi-verdict[data-tone="bad"]  { color: #B4232A; border-color: color-mix(in oklab, #B4232A 30%, var(--line)); }
.roi-verdict[data-tone="flat"] { color: var(--ink-2); }

@media (max-width: 900px) {
  .roi-grid { grid-template-columns: 1fr; }
  .roi-panel-out { position: static; }
}
@media (max-width: 420px) {
  .roi-headline, .roi-metrics { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .roi-input, .roi-reset { transition: none; }
}
`

const AlertIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="13" />
    <line x1="12" y1="16.5" x2="12.01" y2="16.5" />
  </svg>
)

function VerdictIcon({ tone }: { tone: 'good' | 'bad' | 'flat' }) {
  if (tone === 'good') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  }
  if (tone === 'bad') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    )
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  )
}

function Metric({
  label,
  help,
  value,
  lead = false,
}: {
  label: string
  help: string
  value: string
  lead?: boolean
}) {
  return (
    <div className={`roi-metric${lead ? ' is-lead' : ''}`}>
      <div className="roi-metric-k">{label}</div>
      <div className="roi-metric-v">{value}</div>
      <div className="roi-metric-h">{help}</div>
    </div>
  )
}

export interface MarketingRoiCalculatorClientProps {
  labels: Labels
  locale: string
}

export function MarketingRoiCalculatorClient({ labels, locale }: MarketingRoiCalculatorClientProps) {
  const [currency, setCurrency] = useState<string>(DEFAULT_CURRENCY_BY_LOCALE[locale] ?? 'USD')
  const [spend, setSpend] = useState('')
  const [revenue, setRevenue] = useState('')
  const [leads, setLeads] = useState('')
  const [conversions, setConversions] = useState('')

  const localeTag = LOCALE_TAG[locale] ?? 'en-US'
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? '$'

  const money = useMemo(() => {
    try {
      return new Intl.NumberFormat(localeTag, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      })
    } catch {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    }
  }, [localeTag, currency])

  const num = useMemo(() => new Intl.NumberFormat(localeTag, { maximumFractionDigits: 1 }), [localeTag])

  const result = useMemo(() => {
    const s = parseAmount(spend)
    const r = parseAmount(revenue)
    const l = parseCount(leads)
    const c = parseCount(conversions)

    const spendIsZero = s !== null && s <= 0
    const conversionsExceedLeads = l !== null && c !== null && l > 0 && c > l
    const ready = s !== null && r !== null && s > 0

    if (!ready) return { ready: false as const, spendIsZero, conversionsExceedLeads }

    return {
      ready: true as const,
      spendIsZero,
      conversionsExceedLeads,
      roi: ((r - s) / s) * 100,
      roas: r / s,
      profit: r - s,
      breakeven: s,
      cpl: l !== null && l > 0 ? s / l : null,
      cac: c !== null && c > 0 ? s / c : null,
      convRate: l !== null && c !== null && l > 0 ? (c / l) * 100 : null,
    }
  }, [spend, revenue, leads, conversions])

  const reset = () => {
    setSpend('')
    setRevenue('')
    setLeads('')
    setConversions('')
  }

  const tone: 'good' | 'bad' | 'flat' = !result.ready
    ? 'flat'
    : result.roi > 1
      ? 'good'
      : result.roi < -1
        ? 'bad'
        : 'flat'

  const verdictText = !result.ready
    ? ''
    : tone === 'good'
      ? labels.verdictProfit
      : tone === 'bad'
        ? labels.verdictLoss
        : labels.verdictBreakeven

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="roi-grid">
        {/* ── Inputs ───────────────────────────────────────────────────────── */}
        <div className="roi-panel roi-panel-form">
          <div className="roi-panel-head">
            <h3 className="roi-panel-title">{labels.inputsTitle}</h3>
            <button type="button" className="roi-reset" onClick={reset}>
              {labels.btnReset}
            </button>
          </div>

          <div className="roi-field">
            <label className="roi-label" htmlFor="roi-currency">{labels.currencyLabel}</label>
            <select
              id="roi-currency"
              className="roi-input"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
              ))}
            </select>
          </div>

          <div className="roi-field">
            <label className="roi-label" htmlFor="roi-spend">{labels.spendLabel}</label>
            <div className="roi-input-wrap">
              <span className="roi-prefix" aria-hidden="true">{symbol}</span>
              <input
                id="roi-spend"
                className="roi-input has-prefix"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={spend}
                onChange={(e) => setSpend(e.target.value)}
                placeholder="10000"
                aria-describedby={`roi-spend-hint${result.spendIsZero ? ' roi-spend-err' : ''}`}
                aria-invalid={result.spendIsZero || undefined}
              />
            </div>
            <div className="roi-hint" id="roi-spend-hint">{labels.spendHint}</div>
            {result.spendIsZero && (
              <div className="roi-error" id="roi-spend-err" role="alert">
                {AlertIcon}{labels.errorSpendZero}
              </div>
            )}
          </div>

          <div className="roi-field">
            <label className="roi-label" htmlFor="roi-revenue">{labels.revenueLabel}</label>
            <div className="roi-input-wrap">
              <span className="roi-prefix" aria-hidden="true">{symbol}</span>
              <input
                id="roi-revenue"
                className="roi-input has-prefix"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="40000"
                aria-describedby="roi-revenue-hint"
              />
            </div>
            <div className="roi-hint" id="roi-revenue-hint">{labels.revenueHint}</div>
          </div>

          <div className="roi-field">
            <label className="roi-label" htmlFor="roi-leads">
              {labels.leadsLabel}<span className="roi-optional">({labels.optional})</span>
            </label>
            <input
              id="roi-leads"
              className="roi-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={leads}
              onChange={(e) => setLeads(e.target.value)}
              placeholder="250"
              aria-describedby="roi-leads-hint"
            />
            <div className="roi-hint" id="roi-leads-hint">{labels.leadsHint}</div>
          </div>

          <div className="roi-field">
            <label className="roi-label" htmlFor="roi-conversions">
              {labels.conversionsLabel}<span className="roi-optional">({labels.optional})</span>
            </label>
            <input
              id="roi-conversions"
              className="roi-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={conversions}
              onChange={(e) => setConversions(e.target.value)}
              placeholder="25"
              aria-describedby={`roi-conv-hint${result.conversionsExceedLeads ? ' roi-conv-err' : ''}`}
              aria-invalid={result.conversionsExceedLeads || undefined}
            />
            <div className="roi-hint" id="roi-conv-hint">{labels.conversionsHint}</div>
            {result.conversionsExceedLeads && (
              <div className="roi-error" id="roi-conv-err" role="alert">
                {AlertIcon}{labels.errorConversionsExceedLeads}
              </div>
            )}
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        <div className="roi-panel roi-panel-out">
          <div className="roi-panel-head">
            <h3 className="roi-panel-title">{labels.resultsTitle}</h3>
          </div>

          {!result.ready ? (
            <p className="roi-empty">{labels.emptyState}</p>
          ) : (
            <div aria-live="polite">
              <div className="roi-headline">
                <Metric label={labels.roiLabel} help={labels.roiHelp} value={`${num.format(result.roi)}%`} lead />
                <Metric label={labels.roasLabel} help={labels.roasHelp} value={`${num.format(result.roas)}x`} lead />
              </div>

              <div className="roi-verdict" data-tone={tone}>
                <VerdictIcon tone={tone} />
                {verdictText}
              </div>

              <div className="roi-metrics">
                <Metric label={labels.revenuePerLabel} help={labels.revenuePerHelp} value={money.format(result.roas)} />
                <Metric label={labels.profitLabel} help={labels.profitHelp} value={money.format(result.profit)} />
                <Metric label={labels.breakevenLabel} help={labels.breakevenHelp} value={money.format(result.breakeven)} />
                <Metric
                  label={labels.cplLabel}
                  help={result.cpl === null ? labels.notEnoughData : labels.cplHelp}
                  value={result.cpl === null ? '—' : money.format(result.cpl)}
                />
                <Metric
                  label={labels.cacLabel}
                  help={result.cac === null ? labels.notEnoughData : labels.cacHelp}
                  value={result.cac === null ? '—' : money.format(result.cac)}
                />
                <Metric
                  label={labels.convRateLabel}
                  help={result.convRate === null ? labels.notEnoughData : labels.convRateHelp}
                  value={result.convRate === null ? '—' : `${num.format(result.convRate)}%`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
