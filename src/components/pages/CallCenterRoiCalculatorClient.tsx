'use client'

import { useMemo, useState } from 'react'
import type { CallCenterRoiContent } from '@/data/call-center-roi-content'
import { parseAmount } from '@/components/pages/MarketingRoiCalculatorClient'
import {
  BASE_DEFAULTS,
  MONEY_DEFAULTS,
  PRESETS,
  computeCallCenterRoi,
  type CallCenterInputs,
  type PresetKey,
  type TimeUse,
} from '@/lib/call-center-roi'

type Labels = CallCenterRoiContent['calculator']
type NumericKey = Exclude<keyof CallCenterInputs, 'useTimeFor'>
type Values = Record<NumericKey, string>

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'BRL', symbol: 'R$' },
  { code: 'TRY', symbol: '₺' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'AED', symbol: 'AED' },
] as const

const LOCALE_TAG: Record<string, string> = { en: 'en-US', br: 'pt-BR', es: 'es-ES', tr: 'tr-TR' }
const PRESET_KEYS: PresetKey[] = ['cautious', 'expected', 'strong']

function initialValues(locale: string): Values {
  const money = MONEY_DEFAULTS[locale] ?? MONEY_DEFAULTS.en
  const v = { ...BASE_DEFAULTS, ...money, ...PRESETS.cautious }
  return Object.fromEntries(
    (Object.keys(v) as (keyof typeof v)[]).filter((k) => k !== 'currency').map((k) => [k, String(v[k])]),
  ) as Values
}

const STYLES = `
.ccr-grid { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr); gap: 24px; align-items: start; }
.ccr-panel { border-radius: 16px; padding: 28px; }
.ccr-form { background: #fff; border: 1px solid var(--line-2); }
.landing .v16-brand .ccr-out { position: sticky; top: 136px; border: 1px solid var(--line-2); }
.ccr-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.landing .v16-brand .ccr-title { margin: 0; font-size: 18px; letter-spacing: -.02em; color: var(--ink); }
.ccr-reset { min-height: 44px; padding: 0 12px; margin-right: -12px; font: 600 13px var(--f-sans); color: var(--accent-ink); background: none; border: 0; border-radius: 8px; cursor: pointer; }
.ccr-reset:hover { background: var(--accent-c); }
.ccr-group { margin: 26px 0 14px; padding-top: 22px; border-top: 1px solid var(--line); font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
.ccr-group:first-of-type { margin-top: 0; padding-top: 0; border-top: 0; }
.ccr-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.ccr-field label, .ccr-label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--ink); }
.ccr-wrap { position: relative; }
.ccr-affix { position: absolute; top: 50%; transform: translateY(-50%); right: 13px; font-size: 13px; color: var(--ink-3); pointer-events: none; }
.ccr-input { width: 100%; min-height: 48px; padding: 11px 13px; font: 16px var(--f-sans); font-variant-numeric: tabular-nums; color: var(--ink); background: #fff; border: 1px solid var(--line-2); border-radius: 8px; }
.ccr-input.has-affix { padding-right: 54px; }
.ccr-input:focus { outline: none; border-color: #2b59ff; box-shadow: 0 0 0 3px rgba(43, 89, 255, .2); }
.ccr-input[aria-invalid='true'] { border-color: #b4232a; }
.ccr-hint { margin-top: 5px; font-size: 12px; line-height: 1.45; color: var(--ink-3); }
.ccr-seg { display: grid; gap: 8px; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); margin-bottom: 8px; }
.ccr-seg button { min-height: 44px; padding: 8px 10px; font: 600 13px var(--f-sans); color: var(--ink-2); background: #fff; border: 1px solid var(--line-2); border-radius: 8px; cursor: pointer; }
.ccr-seg button:hover { border-color: #2b59ff; }
.ccr-seg button[aria-pressed='true'] { color: #fff; background: #2b59ff; border-color: #2b59ff; }
.ccr-reset:focus-visible, .ccr-seg button:focus-visible { outline: 2px solid #2b59ff; outline-offset: 2px; }
.ccr-warn { margin-top: 14px; padding: 11px 13px; font-size: 13px; line-height: 1.5; color: #8a5a00; background: #fff8e1; border-radius: 8px; }
.ccr-leads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.ccr-lead { padding: 16px; background: var(--paper); border: 1px solid var(--line-2); border-radius: 10px; min-width: 0; }
.ccr-k { font-family: var(--f-mono); font-size: 11px; letter-spacing: .07em; text-transform: uppercase; color: var(--ink-3); }
.ccr-v { margin-top: 8px; font-size: clamp(24px, 3vw, 34px); line-height: 1.1; font-weight: 700; letter-spacing: -.03em; color: var(--ink); font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.ccr-v.is-loss { color: #ff9a90; }
.ccr-verdict { margin: 14px 0 6px; font-size: 14px; line-height: 1.55; color: var(--ink-2); }
.ccr-rows { margin: 8px 0 0; padding: 0; list-style: none; }
.ccr-rows li { display: flex; justify-content: space-between; gap: 16px; padding: 11px 0; font-size: 14px; color: var(--ink-3); border-top: 1px solid var(--line); }
.ccr-rows b { flex-shrink: 0; font-weight: 600; color: var(--ink); font-variant-numeric: tabular-nums; text-align: right; }
.ccr-note { margin: 14px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--ink-3); }
@media (max-width: 960px) {
  .ccr-grid { grid-template-columns: minmax(0, 1fr); }
  .landing .v16-brand .ccr-out { position: static; }
}
@media (max-width: 520px) {
  .ccr-panel { padding: 20px; }
  .ccr-fields, .ccr-leads { grid-template-columns: minmax(0, 1fr); }
  .ccr-seg { grid-auto-flow: row; }
}
`

export function CallCenterRoiCalculatorClient({ labels, locale }: { labels: Labels; locale: string }) {
  const [currency, setCurrency] = useState((MONEY_DEFAULTS[locale] ?? MONEY_DEFAULTS.en).currency)
  const [values, setValues] = useState<Values>(() => initialValues(locale))
  const [useTimeFor, setUseTimeFor] = useState<TimeUse>('cost')

  const tag = LOCALE_TAG[locale] ?? 'en-US'
  const money = useMemo(
    () => new Intl.NumberFormat(tag, { style: 'currency', currency, maximumFractionDigits: 0 }),
    [tag, currency],
  )
  const moneyExact = useMemo(
    () => new Intl.NumberFormat(tag, { style: 'currency', currency, maximumFractionDigits: 2 }),
    [tag, currency],
  )
  const num = useMemo(() => new Intl.NumberFormat(tag, { maximumFractionDigits: 1 }), [tag])
  const whole = useMemo(() => new Intl.NumberFormat(tag, { maximumFractionDigits: 0 }), [tag])

  const invalid = useMemo(() => {
    const bad = new Set<NumericKey>()
    for (const k of Object.keys(values) as NumericKey[]) {
      const n = parseAmount(values[k])
      if (n === null || n < 0) bad.add(k)
    }
    for (const k of ['agents', 'hoursPerDay', 'daysPerMonth', 'callsPerDay'] as NumericKey[]) {
      if (parseAmount(values[k]) === 0) bad.add(k)
    }
    return bad
  }, [values])

  const result = useMemo(() => {
    if (invalid.size > 0) return null
    const parsed = Object.fromEntries(
      (Object.keys(values) as NumericKey[]).map((k) => [k, parseAmount(values[k]) as number]),
    ) as Record<NumericKey, number>
    return computeCallCenterRoi({ ...parsed, useTimeFor })
  }, [values, useTimeFor, invalid])

  const activePreset = PRESET_KEYS.find((k) =>
    (['wrapCutPct', 'dialCutPct', 'phoneCutPct'] as const).every((f) => parseAmount(values[f]) === PRESETS[k][f]),
  )

  const set = (k: NumericKey, v: string) => setValues((prev) => ({ ...prev, [k]: v }))
  const applyPreset = (k: PresetKey) =>
    setValues((prev) => ({
      ...prev,
      wrapCutPct: String(PRESETS[k].wrapCutPct),
      dialCutPct: String(PRESETS[k].dialCutPct),
      phoneCutPct: String(PRESETS[k].phoneCutPct),
    }))
  const reset = () => {
    setValues(initialValues(locale))
    setUseTimeFor('cost')
    setCurrency((MONEY_DEFAULTS[locale] ?? MONEY_DEFAULTS.en).currency)
  }

  const field = (k: NumericKey, unit?: string, showHint = true) => {
    const f = labels.fields[k]
    return (
      <div className="ccr-field" key={k}>
        <label htmlFor={`ccr-${k}`}>{f.label}</label>
        <div className="ccr-wrap">
          <input
            id={`ccr-${k}`}
            className={`ccr-input${unit ? ' has-affix' : ''}`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={values[k]}
            onChange={(e) => set(k, e.target.value)}
            aria-invalid={invalid.has(k) || undefined}
            aria-describedby={showHint && f.hint ? `ccr-${k}-hint` : undefined}
          />
          {unit && <span className="ccr-affix" aria-hidden="true">{unit}</span>}
        </div>
        {showHint && f.hint && <div className="ccr-hint" id={`ccr-${k}-hint`}>{f.hint}</div>}
      </div>
    )
  }

  const u = labels.units
  const positive = !!result && result.monthlyNet > 0
  const paybackText = !result
    ? ''
    : result.paybackMonths === null
      ? labels.never
      : result.paybackMonths < 1
        ? labels.underOneMonth
        : labels.months.replace('{n}', num.format(result.paybackMonths))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="ccr-grid">
        <div className="ccr-panel ccr-form">
          <div className="ccr-head">
            <h3 className="ccr-title">{labels.inputsTitle}</h3>
            <button type="button" className="ccr-reset" onClick={reset}>{labels.reset}</button>
          </div>

          <div className="ccr-group">{labels.groupTeam}</div>
          <div className="ccr-fields">
            <div className="ccr-field">
              <label htmlFor="ccr-currency">{labels.currency}</label>
              <select id="ccr-currency" className="ccr-input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
              </select>
            </div>
            {field('agents')}
            {field('hoursPerDay', u.hours)}
            {field('daysPerMonth', u.days)}
            {field('hourlyCost', currency)}
          </div>

          <div className="ccr-group">{labels.groupCalls}</div>
          <div className="ccr-fields">
            {field('callsPerDay')}
            {field('talkMinutes', u.minutes)}
            {field('wrapMinutes', u.minutes)}
            {field('dialSeconds', u.seconds)}
          </div>

          <div className="ccr-group">{labels.groupCosts}</div>
          <div className="ccr-fields">
            {field('phoneMonthly', currency)}
            {field('softwarePerAgent', currency)}
            {field('setupCost', currency)}
          </div>

          <div className="ccr-group">{labels.groupAssumptions}</div>
          <div className="ccr-seg">
            {PRESET_KEYS.map((k) => (
              <button key={k} type="button" aria-pressed={activePreset === k} onClick={() => applyPreset(k)}>
                {labels.presets[k]}
              </button>
            ))}
          </div>
          <div className="ccr-hint" style={{ marginBottom: 16 }}>{labels.presetsNote}</div>
          <div className="ccr-fields">
            {field('wrapCutPct', '%')}
            {field('dialCutPct', '%')}
            {field('phoneCutPct', '%')}
          </div>

          <div className="ccr-group">{labels.groupUse}</div>
          <div className="ccr-seg">
            <button type="button" aria-pressed={useTimeFor === 'cost'} onClick={() => setUseTimeFor('cost')}>{labels.useCost}</button>
            <button type="button" aria-pressed={useTimeFor === 'calls'} onClick={() => setUseTimeFor('calls')}>{labels.useCalls}</button>
          </div>
          <div className="ccr-hint" style={{ marginBottom: useTimeFor === 'calls' ? 16 : 0 }}>
            {useTimeFor === 'cost' ? labels.useCostNote : labels.useCallsNote}
          </div>
          {useTimeFor === 'calls' && (
            <div className="ccr-fields">
              {field('conversionPct', '%')}
              {field('profitPerSale', currency)}
            </div>
          )}
          {result?.overCapacity && <div className="ccr-warn" role="status">{labels.overCapacity}</div>}
        </div>

        <div className="ccr-panel ccr-out" data-tone="dark">
          <div className="ccr-head">
            <h3 className="ccr-title">{labels.resultsTitle}</h3>
          </div>
          {!result ? (
            <p className="ccr-verdict">{labels.invalid}</p>
          ) : (
            <>
              <div className="ccr-leads">
                <div className="ccr-lead">
                  <div className="ccr-k">{labels.roi}</div>
                  <div className={`ccr-v${result.roiPct !== null && result.roiPct < 0 ? ' is-loss' : ''}`}>
                    {result.roiPct === null ? '-' : `${whole.format(result.roiPct)}%`}
                  </div>
                </div>
                <div className="ccr-lead">
                  <div className="ccr-k">{labels.monthlyNet}</div>
                  <div className={`ccr-v${result.monthlyNet < 0 ? ' is-loss' : ''}`}>{money.format(result.monthlyNet)}</div>
                </div>
              </div>
              <p className="ccr-verdict" role="status">{positive ? labels.verdictGood : labels.verdictBad}</p>
              <ul className="ccr-rows">
                <li><span>{labels.hoursSaved}</span><b>{whole.format(result.hoursSaved)} {u.hours}</b></li>
                <li><span>{labels.fteFreed}</span><b>{num.format(result.fteFreed)}</b></li>
                {useTimeFor === 'calls' && <li><span>{labels.extraCalls}</span><b>{whole.format(result.extraCalls)}</b></li>}
                <li><span>{useTimeFor === 'cost' ? labels.laborSaved : labels.extraProfit}</span><b>{money.format(result.timeValue)}</b></li>
                <li><span>{labels.phoneSaved}</span><b>{money.format(result.phoneSaved)}</b></li>
                <li><span>{labels.softwareCost}</span><b>{money.format(-result.softwareMonthly)}</b></li>
                <li><span>{labels.firstYearNet}</span><b>{money.format(result.firstYearNet)}</b></li>
                <li><span>{labels.payback}</span><b>{paybackText}</b></li>
                <li><span>{labels.costPerCall}</span><b>{moneyExact.format(result.costPerCallNow)} → {moneyExact.format(result.costPerCallAfter)}</b></li>
                <li><span>{labels.breakEven}</span><b>{num.format(result.breakEvenMinutes)} {u.minutes}</b></li>
              </ul>
              <p className="ccr-note">{labels.disclaimer}</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
