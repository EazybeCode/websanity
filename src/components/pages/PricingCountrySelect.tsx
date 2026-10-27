'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { useLocale } from 'next-intl'
import { COUNTRY_CURRENCY } from '@/lib/countryCurrency'

/**
 * Pricing page: pick the country prices are shown for. A native <select> (240+
 * countries, type-to-jump, accessible) styled as a brand chip; country names come
 * from Intl.DisplayNames in the page language. Styled by .v16-country rules in
 * brand-pages.css.
 */

const LABEL: Record<string, string> = {
  en: 'Showing prices for',
  br: 'Preços para',
  es: 'Precios para',
  tr: 'Fiyatların gösterildiği ülke',
}
const INTL_LOCALE: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

const subscribeNoop = () => () => {}

const flag = (code: string) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))

export function PricingCountrySelect({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (code: string) => void
  disabled?: boolean
}) {
  const locale = useLocale()
  // Country names come from the browser's Intl data, which differs from the
  // server's (Node ICU) — build the full list only after mount to avoid a
  // hydration mismatch. Before that, render just the selected value.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const options = useMemo(() => {
    if (!mounted) return [{ code: value, currency: COUNTRY_CURRENCY[value] ?? '', name: value }]
    let names: Intl.DisplayNames | null = null
    try {
      names = new Intl.DisplayNames([INTL_LOCALE[locale] ?? 'en'], { type: 'region' })
    } catch {
      names = null
    }
    return Object.entries(COUNTRY_CURRENCY)
      .map(([code, currency]) => ({ code, currency, name: names?.of(code) ?? code }))
      .filter((o) => o.name && o.name !== o.code)
      .sort((a, b) => a.name.localeCompare(b.name, INTL_LOCALE[locale] ?? 'en'))
  }, [locale, mounted, value])

  const label = LABEL[locale] ?? LABEL.en

  return (
    <label className="v16-country">
      <span className="v16-country-label">{label}</span>
      <span className="v16-country-field">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-label={label}
        >
          {options.map((o) => (
            <option key={o.code} value={o.code}>
              {`${flag(o.code)}  ${o.name} · ${o.currency}`}
            </option>
          ))}
        </select>
        <span className="v16-country-caret" aria-hidden="true" />
      </span>
    </label>
  )
}
