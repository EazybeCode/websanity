'use client'

import { useMemo, useState } from 'react'
import type { WaPricingPageContent } from '@/data/whatsapp-pricing-content'

type Labels = WaPricingPageContent['calculator']

/**
 * Default per-message rates in USD, prefilled per market and fully editable in
 * the UI. They are estimates from Meta's published rate card, which Meta
 * revises — the page copy says so and links to the source. Kept as strings
 * because they seed input fields.
 */
const MARKET_RATES: Record<string, { marketing: string; utility: string; auth: string }> = {
  in: { marketing: '0.0107', utility: '0.0014', auth: '0.0014' },
  br: { marketing: '0.0625', utility: '0.008', auth: '0.0315' },
  mx: { marketing: '0.0436', utility: '0.0085', auth: '0.0239' },
  id: { marketing: '0.0411', utility: '0.02', auth: '0.03' },
  us: { marketing: '0.025', utility: '0.004', auth: '0.0135' },
  gb: { marketing: '0.0529', utility: '0.022', auth: '0.0358' },
  other: { marketing: '', utility: '', auth: '' },
}

const MARKET_ORDER = ['in', 'br', 'mx', 'id', 'us', 'gb', 'other'] as const
type MarketKey = (typeof MARKET_ORDER)[number]

const DEFAULT_MARKET_BY_LOCALE: Record<string, MarketKey> = {
  en: 'in',
  br: 'br',
  es: 'mx',
  tr: 'other',
}

const LOCALE_TAG: Record<string, string> = {
  en: 'en-US',
  br: 'pt-BR',
  es: 'es-ES',
  tr: 'tr-TR',
}

/** Same parser as MarketingRoiCalculatorClient: reads "10,000.50", "10.000,50"
 *  and "$10,000" as the numbers a human means. See that file for the rules. */
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
  if (n === null || n < 0) return null
  return Math.floor(n)
}

function parseRate(raw: string): number | null {
  const n = parseAmount(raw)
  return n === null || n < 0 ? null : n
}

/* Interactive states, responsive rules and reduced-motion can't be expressed as
   inline styles, so the component ships its own scoped stylesheet. Class names
   are prefixed `wap-` to stay clear of the shared landing styles. */
const STYLES = `
.wap-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 24px; align-items: start; }
.wap-panel { border: 1px solid var(--line-2); border-radius: 16px; padding: 24px; }
.wap-panel-form { background: #fff; }
.wap-panel-out { background: var(--bg-2); position: sticky; top: 88px; }

.wap-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.wap-panel-title { margin: 0; font-size: 17px; font-weight: 700; color: var(--ink); }

.wap-reset {
  min-height: 44px; padding: 0 12px; margin-right: -12px;
  display: inline-flex; align-items: center;
  font-family: var(--f-sans); font-size: 13px; font-weight: 600;
  color: var(--accent-ink); background: none; border: none; border-radius: 8px;
  cursor: pointer; transition: background-color .16s ease, color .16s ease;
}
.wap-reset:hover { background: color-mix(in oklab, var(--accent-a) 14%, transparent); }
.wap-reset:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }

.wap-field { margin-bottom: 18px; }
.wap-field:last-child { margin-bottom: 0; }
.wap-label { display: block; font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
.wap-optional { font-weight: 400; color: var(--ink-3); font-size: 12px; margin-left: 6px; }

.wap-input-wrap { position: relative; display: flex; align-items: center; }
.wap-prefix {
  position: absolute; left: 14px; font-size: 14px; font-weight: 600;
  color: var(--ink-3); pointer-events: none; font-variant-numeric: tabular-nums;
}
.wap-input {
  width: 100%; min-height: 48px; padding: 12px 14px;
  font-family: var(--f-sans); font-size: 16px; color: var(--ink);
  background: #fff; border: 1px solid var(--line-2); border-radius: 10px;
  transition: border-color .16s ease, box-shadow .16s ease;
  font-variant-numeric: tabular-nums;
}
.wap-input.has-prefix { padding-left: 34px; }
.wap-input::placeholder { color: var(--ink-4); }
.wap-input:hover { border-color: color-mix(in oklab, var(--ink) 26%, var(--line-2)); }
.wap-input:focus-visible,
.wap-input:focus {
  outline: none;
  border-color: var(--accent-ink);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent-a) 34%, transparent);
}
.wap-input[aria-invalid="true"] { border-color: #B4232A; }
.wap-input[aria-invalid="true"]:focus { box-shadow: 0 0 0 3px rgba(180, 35, 42, 0.22); }

select.wap-input { cursor: pointer; appearance: none; padding-right: 38px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center; }

.wap-hint { margin-top: 6px; font-size: 12px; line-height: 1.45; color: var(--ink-3); }
.wap-error { margin-top: 6px; font-size: 12px; line-height: 1.45; font-weight: 600; color: #B4232A;
  display: flex; gap: 6px; align-items: flex-start; }

.wap-rates { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); }
.wap-rates-title { margin: 0 0 4px; font-size: 13px; font-weight: 700; color: var(--ink); }
.wap-rates-hint { margin: 0 0 14px; font-size: 12px; line-height: 1.5; color: var(--ink-3); }
.wap-rates-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.landing .wap-rates-link {
  color: var(--accent-ink); font-weight: 600;
  border-bottom: 1px solid color-mix(in oklab, var(--accent-ink) 35%, transparent);
  transition: color .16s ease, border-color .16s ease;
}
.landing .wap-rates-link:hover { color: var(--ink); border-color: var(--ink); }
.landing .wap-rates-link:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }

.wap-empty { margin: 0; font-size: 14px; line-height: 1.6; color: var(--ink-3); }

.wap-headline { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.wap-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }

.wap-metric { padding: 14px 16px; background: #fff; border: 1px solid var(--line); border-radius: 12px; }
.wap-metric.is-lead { padding: 18px; background: color-mix(in oklab, var(--accent-a) 12%, #fff);
  border-color: color-mix(in oklab, var(--accent-a) 32%, var(--line)); }
.wap-metric-k { font-family: var(--f-mono); font-size: 10px; letter-spacing: .09em;
  text-transform: uppercase; color: var(--ink-4); }
.wap-metric-v { margin-top: 6px; font-size: 22px; font-weight: 700; letter-spacing: -.02em;
  color: var(--ink); font-variant-numeric: tabular-nums; }
.wap-metric.is-lead .wap-metric-v { font-size: clamp(26px, 4vw, 32px); }
.wap-metric-h { margin-top: 4px; font-size: 12px; line-height: 1.45; color: var(--ink-3); }

.wap-note { margin-top: 14px; padding: 12px 14px; border-radius: 10px; background: #fff;
  border: 1px solid var(--line); font-size: 13px; line-height: 1.55; color: var(--ink-2);
  display: flex; gap: 8px; align-items: flex-start; }
.wap-note svg { flex-shrink: 0; margin-top: 2px; color: var(--accent-ink); }

@media (max-width: 900px) {
  .wap-grid { grid-template-columns: 1fr; }
  .wap-panel-out { position: static; }
}
@media (max-width: 560px) {
  .wap-rates-grid { grid-template-columns: 1fr; }
}
@media (max-width: 420px) {
  .wap-headline, .wap-metrics { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .wap-input, .wap-reset { transition: none; }
}
`

const AlertIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="13" />
    <line x1="12" y1="16.5" x2="12.01" y2="16.5" />
  </svg>
)

const InfoIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="11" x2="12" y2="16.5" />
    <line x1="12" y1="7.5" x2="12.01" y2="7.5" />
  </svg>
)

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
    <div className={`wap-metric${lead ? ' is-lead' : ''}`}>
      <div className="wap-metric-k">{label}</div>
      <div className="wap-metric-v">{value}</div>
      <div className="wap-metric-h">{help}</div>
    </div>
  )
}

export interface WhatsappPricingCalculatorClientProps {
  labels: Labels
  locale: string
}

export function WhatsappPricingCalculatorClient({ labels, locale }: WhatsappPricingCalculatorClientProps) {
  const defaultMarket = DEFAULT_MARKET_BY_LOCALE[locale] ?? 'in'
  const [market, setMarket] = useState<MarketKey>(defaultMarket)
  const [marketing, setMarketing] = useState('')
  const [utility, setUtility] = useState('')
  const [auth, setAuth] = useState('')
  const [windowShare, setWindowShare] = useState('')
  const [marketingRate, setMarketingRate] = useState(MARKET_RATES[defaultMarket].marketing)
  const [utilityRate, setUtilityRate] = useState(MARKET_RATES[defaultMarket].utility)
  const [authRate, setAuthRate] = useState(MARKET_RATES[defaultMarket].auth)

  const localeTag = LOCALE_TAG[locale] ?? 'en-US'

  const money = useMemo(
    () =>
      new Intl.NumberFormat(localeTag, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }),
    [localeTag],
  )
  // Per-message figures live in tenths of a cent, so they get more precision.
  const moneyFine = useMemo(
    () =>
      new Intl.NumberFormat(localeTag, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 4,
        minimumFractionDigits: 0,
      }),
    [localeTag],
  )
  const num = useMemo(() => new Intl.NumberFormat(localeTag, { maximumFractionDigits: 0 }), [localeTag])

  const applyMarket = (key: MarketKey) => {
    setMarket(key)
    setMarketingRate(MARKET_RATES[key].marketing)
    setUtilityRate(MARKET_RATES[key].utility)
    setAuthRate(MARKET_RATES[key].auth)
  }

  const reset = () => {
    setMarketing('')
    setUtility('')
    setAuth('')
    setWindowShare('')
    applyMarket(defaultMarket)
  }

  const result = useMemo(() => {
    const mVol = parseCount(marketing) ?? 0
    const uVol = parseCount(utility) ?? 0
    const aVol = parseCount(auth) ?? 0

    const w = parseAmount(windowShare)
    const windowInvalid = w !== null && (w < 0 || w > 100)
    const share = w !== null && !windowInvalid ? w / 100 : 0

    const rM = parseRate(marketingRate)
    const rU = parseRate(utilityRate)
    const rA = parseRate(authRate)

    const missingMarketingRate = mVol > 0 && rM === null
    const missingUtilityRate = uVol > 0 && rU === null
    const missingAuthRate = aVol > 0 && rA === null
    const missingAnyRate = missingMarketingRate || missingUtilityRate || missingAuthRate

    const totalVolume = mVol + uVol + aVol
    const ready = totalVolume > 0 && !windowInvalid && !missingAnyRate

    if (!ready) {
      return {
        ready: false as const,
        windowInvalid,
        missingMarketingRate,
        missingUtilityRate,
        missingAuthRate,
      }
    }

    const freeUtility = uVol * share
    const paidUtility = uVol - freeUtility
    const marketingCost = mVol * (rM ?? 0)
    const utilityCost = paidUtility * (rU ?? 0)
    const authCost = aVol * (rA ?? 0)
    const monthly = marketingCost + utilityCost + authCost
    const paidMessages = mVol + paidUtility + aVol

    return {
      ready: true as const,
      windowInvalid,
      missingMarketingRate,
      missingUtilityRate,
      missingAuthRate,
      marketingCost,
      utilityCost,
      authCost,
      freeUtility,
      monthly,
      annual: monthly * 12,
      perMsg: paidMessages > 0 ? monthly / paidMessages : null,
    }
  }, [marketing, utility, auth, windowShare, marketingRate, utilityRate, authRate])

  const volumeFields = [
    {
      id: 'wap-marketing',
      label: labels.marketingLabel,
      hint: labels.marketingHint,
      value: marketing,
      set: setMarketing,
      placeholder: '20000',
    },
    {
      id: 'wap-utility',
      label: labels.utilityLabel,
      hint: labels.utilityHint,
      value: utility,
      set: setUtility,
      placeholder: '8000',
    },
    {
      id: 'wap-auth',
      label: labels.authLabel,
      hint: labels.authHint,
      value: auth,
      set: setAuth,
      placeholder: '3000',
    },
  ]

  const rateFields = [
    {
      id: 'wap-rate-marketing',
      label: labels.marketingRateLabel,
      value: marketingRate,
      set: setMarketingRate,
      missing: result.missingMarketingRate,
    },
    {
      id: 'wap-rate-utility',
      label: labels.utilityRateLabel,
      value: utilityRate,
      set: setUtilityRate,
      missing: result.missingUtilityRate,
    },
    {
      id: 'wap-rate-auth',
      label: labels.authRateLabel,
      value: authRate,
      set: setAuthRate,
      missing: result.missingAuthRate,
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="wap-grid">
        {/* ── Inputs ───────────────────────────────────────────────────────── */}
        <div className="wap-panel wap-panel-form">
          <div className="wap-panel-head">
            <h3 className="wap-panel-title">{labels.inputsTitle}</h3>
            <button type="button" className="wap-reset" onClick={reset}>
              {labels.btnReset}
            </button>
          </div>

          <div className="wap-field">
            <label className="wap-label" htmlFor="wap-market">{labels.marketLabel}</label>
            <select
              id="wap-market"
              className="wap-input"
              value={market}
              onChange={(e) => applyMarket(e.target.value as MarketKey)}
              aria-describedby="wap-market-hint"
            >
              {MARKET_ORDER.map((key) => (
                <option key={key} value={key}>{labels.markets[key]}</option>
              ))}
            </select>
            <div className="wap-hint" id="wap-market-hint">{labels.marketHint}</div>
          </div>

          {volumeFields.map((f) => (
            <div className="wap-field" key={f.id}>
              <label className="wap-label" htmlFor={f.id}>{f.label}</label>
              <input
                id={f.id}
                className="wap-input"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.placeholder}
                aria-describedby={`${f.id}-hint`}
              />
              <div className="wap-hint" id={`${f.id}-hint`}>{f.hint}</div>
            </div>
          ))}

          <div className="wap-field">
            <label className="wap-label" htmlFor="wap-window">
              {labels.windowLabel}<span className="wap-optional">({labels.optional})</span>
            </label>
            <input
              id="wap-window"
              className="wap-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={windowShare}
              onChange={(e) => setWindowShare(e.target.value)}
              placeholder="30"
              aria-describedby={`wap-window-hint${result.windowInvalid ? ' wap-window-err' : ''}`}
              aria-invalid={result.windowInvalid || undefined}
            />
            <div className="wap-hint" id="wap-window-hint">{labels.windowHint}</div>
            {result.windowInvalid && (
              <div className="wap-error" id="wap-window-err" role="alert">
                {AlertIcon}{labels.errorWindowRange}
              </div>
            )}
          </div>

          <div className="wap-rates">
            <h4 className="wap-rates-title">{labels.ratesTitle}</h4>
            <p className="wap-rates-hint">
              {labels.ratesHint}{' '}
              <a
                className="wap-rates-link"
                href="https://developers.facebook.com/docs/whatsapp/pricing"
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.ratesLinkText}
              </a>
            </p>
            <div className="wap-rates-grid">
              {rateFields.map((f) => (
                <div key={f.id}>
                  <label className="wap-label" htmlFor={f.id}>{f.label}</label>
                  <div className="wap-input-wrap">
                    <span className="wap-prefix" aria-hidden="true">$</span>
                    <input
                      id={f.id}
                      className="wap-input has-prefix"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder="0.01"
                      aria-describedby={f.missing ? `${f.id}-err` : undefined}
                      aria-invalid={f.missing || undefined}
                    />
                  </div>
                  {f.missing && (
                    <div className="wap-error" id={`${f.id}-err`} role="alert">
                      {AlertIcon}{labels.errorMissingRate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        <div className="wap-panel wap-panel-out">
          <div className="wap-panel-head">
            <h3 className="wap-panel-title">{labels.resultsTitle}</h3>
          </div>

          {!result.ready ? (
            <p className="wap-empty">{labels.emptyState}</p>
          ) : (
            <div aria-live="polite">
              <div className="wap-headline">
                <Metric label={labels.monthlyLabel} help={labels.monthlyHelp} value={money.format(result.monthly)} lead />
                <Metric label={labels.annualLabel} help={labels.annualHelp} value={money.format(result.annual)} lead />
              </div>

              <div className="wap-metrics">
                <Metric label={labels.marketingCostLabel} help={labels.marketingCostHelp} value={money.format(result.marketingCost)} />
                <Metric label={labels.utilityCostLabel} help={labels.utilityCostHelp} value={money.format(result.utilityCost)} />
                <Metric label={labels.authCostLabel} help={labels.authCostHelp} value={money.format(result.authCost)} />
                <Metric label={labels.freeUtilLabel} help={labels.freeUtilHelp} value={num.format(Math.round(result.freeUtility))} />
                <Metric
                  label={labels.perMsgLabel}
                  help={labels.perMsgHelp}
                  value={result.perMsg === null ? '—' : moneyFine.format(result.perMsg)}
                />
              </div>

              <div className="wap-note">
                {InfoIcon}
                <span>{labels.serviceNote}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
