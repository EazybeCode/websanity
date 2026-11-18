'use client'

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { useLocale } from 'next-intl'
import { COUNTRY_CURRENCY } from '@/lib/countryCurrency'

/**
 * Pricing page: pick the country prices are shown for. A branded searchable
 * combobox (dark trigger + panel with a search field and a scrollable listbox).
 * Search matches country name, ISO code or currency. Keyboard: ↑/↓ move, Enter
 * picks, Esc closes. Country names come from Intl.DisplayNames in the page
 * language. Styled by .v16-country rules in brand-pages.css.
 */

const LABEL: Record<string, string> = {
  en: 'Showing prices for',
  br: 'Preços para',
  es: 'Precios para',
  tr: 'Fiyatların gösterildiği ülke',
}
const SEARCH: Record<string, string> = {
  en: 'Search country or currency',
  br: 'Buscar país ou moeda',
  es: 'Buscar país o moneda',
  tr: 'Ülke veya para birimi ara',
}
const EMPTY: Record<string, string> = {
  en: 'No matching country',
  br: 'Nenhum país encontrado',
  es: 'Ningún país coincide',
  tr: 'Eşleşen ülke yok',
}
const INTL_LOCALE: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

const subscribeNoop = () => () => {}

const flag = (code: string) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))

// Accent-insensitive search ("turkiye" finds "Türkiye").
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

type Option = { code: string; currency: string; name: string }

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
  const intlLocale = INTL_LOCALE[locale] ?? 'en'
  const listId = useId()
  // Country names come from the browser's Intl data, which differs from the
  // server's (Node ICU) — build the full list only after mount to avoid a
  // hydration mismatch.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)

  const options = useMemo<Option[]>(() => {
    if (!mounted) return []
    let names: Intl.DisplayNames | null = null
    try {
      names = new Intl.DisplayNames([intlLocale], { type: 'region' })
    } catch {
      names = null
    }
    return Object.entries(COUNTRY_CURRENCY)
      .map(([code, currency]) => ({ code, currency, name: names?.of(code) ?? code }))
      .filter((o) => o.name && o.name !== o.code)
      .sort((a, b) => a.name.localeCompare(b.name, intlLocale))
  }, [intlLocale, mounted])

  const selected = options.find((o) => o.code === value)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const filtered = useMemo(() => {
    const q = fold(query.trim())
    if (!q) return options
    // Rank: name starts with the query, then a word in the name does, then any
    // other match (name contains it, ISO code, currency).
    const rank = (o: Option) => {
      const n = fold(o.name)
      if (n.startsWith(q)) return 0
      if (n.split(/[\s-]+/).some((w) => w.startsWith(q))) return 1
      if (n.includes(q) || o.code.toLowerCase() === q || o.currency.toLowerCase().includes(q)) return 2
      return -1
    }
    return options
      .map((o) => ({ o, r: rank(o) }))
      .filter((x) => x.r >= 0)
      .sort((a, b) => a.r - b.r)
      .map((x) => x.o)
  }, [options, query])

  const openPanel = () => {
    if (disabled) return
    setQuery('')
    setActive(Math.max(0, options.findIndex((o) => o.code === value)))
    setOpen(true)
  }
  const close = (refocus: boolean) => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus({ preventScroll: true })
  }
  const pick = (o: Option) => {
    onChange(o.code)
    close(true)
  }

  // Focus the search field on open; close on outside click.
  useEffect(() => {
    if (!open) return
    searchRef.current?.focus({ preventScroll: true })
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Keep the active option in view by scrolling the list itself only
  // (scrollIntoView would also scroll the page). On open, the selected
  // country sits at the top of the panel.
  const justOpened = useRef(false)
  useEffect(() => {
    if (open) justOpened.current = true
  }, [open])
  useEffect(() => {
    const list = listRef.current
    if (!open || !list) return
    const item = list.querySelector<HTMLElement>(`[data-i="${active}"]`)
    if (!item) return
    const top = item.offsetTop
    if (justOpened.current) {
      justOpened.current = false
      list.scrollTop = Math.max(0, top - 4)
    } else if (top < list.scrollTop) {
      list.scrollTop = top
    } else if (top + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = top + item.offsetHeight - list.clientHeight
    }
  }, [active, open])

  const onSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[active]) pick(filtered[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close(true)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  const label = LABEL[locale] ?? LABEL.en
  const searchLabel = SEARCH[locale] ?? SEARCH.en

  return (
    <div className="v16-country" ref={rootRef}>
      <span className="v16-country-label" id={`${listId}-label`}>
        {label}
      </span>
      <div className="v16-country-field">
        <button
          ref={triggerRef}
          type="button"
          className="v16-country-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${listId}-label ${listId}-value`}
          disabled={disabled}
          onClick={() => (open ? close(false) : openPanel())}
          onKeyDown={(e) => {
            if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
              e.preventDefault()
              openPanel()
            }
          }}
        >
          <span className="v16-country-flag" aria-hidden="true">
            {flag(value)}
          </span>
          <span className="v16-country-value" id={`${listId}-value`}>
            {selected ? selected.name : value}
          </span>
          <span className="v16-country-cur">{selected?.currency ?? COUNTRY_CURRENCY[value] ?? ''}</span>
          <span className="v16-country-caret" aria-hidden="true" />
        </button>

        {open && (
          <div className="v16-country-panel">
            <div className="v16-country-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={query}
                placeholder={searchLabel}
                aria-label={searchLabel}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].code}` : undefined}
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onSearchKey}
              />
            </div>
            <ul className="v16-country-list" role="listbox" id={listId} ref={listRef} aria-labelledby={`${listId}-label`}>
              {filtered.length === 0 && <li className="v16-country-empty">{EMPTY[locale] ?? EMPTY.en}</li>}
              {filtered.map((o, i) => (
                <li
                  key={o.code}
                  id={`${listId}-${o.code}`}
                  data-i={i}
                  role="option"
                  aria-selected={o.code === value}
                  className={`v16-country-opt${i === active ? ' is-active' : ''}${o.code === value ? ' is-selected' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(o)}
                >
                  <span className="v16-country-flag" aria-hidden="true">
                    {flag(o.code)}
                  </span>
                  <span className="v16-country-name">{o.name}</span>
                  <span className="v16-country-cur">{o.currency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
