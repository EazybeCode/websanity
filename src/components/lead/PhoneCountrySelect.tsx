'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { COUNTRIES, flagOf } from '@/data/country-codes'
import './phone-country-select.css'

/**
 * Dial-code picker hook for the lead form's phone field (Bea corner form, pricing
 * page, lead sidebar). Every country from data/country-codes, searchable by
 * name (page language or English), ISO code or dial code ("91", "+91").
 * Keyboard: ↑/↓ move, Enter picks, Esc closes. Returns the trigger (rendered
 * inside the phone row) and the panel, which the form renders in-flow under
 * the row rather than floating: the Bea form is a scroll container that would
 * clip an absolutely positioned dropdown.
 */

const SEARCH: Record<string, string> = {
  en: 'Search country or code',
  br: 'Buscar país ou código',
  es: 'Buscar país o código',
  tr: 'Ülke veya kod ara',
}
const EMPTY: Record<string, string> = {
  en: 'No matching country',
  br: 'Nenhum país encontrado',
  es: 'Ningún país coincide',
  tr: 'Eşleşen ülke yok',
}
const INTL_LOCALE: Record<string, string> = { en: 'en', br: 'pt-BR', es: 'es', tr: 'tr' }

// Accent-insensitive search ("turkiye" finds "Türkiye").
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

type Option = { iso: string; dial: string; name: string; en: string }

export const dialOf = (iso: string) => COUNTRIES.find((c) => c.iso === iso)?.dial ?? ''
export const isKnownCountry = (iso: string) => COUNTRIES.some((c) => c.iso === iso)

export function usePhoneCountrySelect({
  value,
  onChange,
  disabled,
  ariaLabel,
}: {
  value: string
  onChange: (iso: string) => void
  disabled?: boolean
  ariaLabel: string
}) {
  const [open, onOpenChange] = useState(false)
  const locale = useLocale()
  const intlLocale = INTL_LOCALE[locale] ?? 'en'
  const listId = useId()

  // Only built while the panel is open (client-only), so localized names from
  // Intl.DisplayNames can't cause a hydration mismatch.
  const options = useMemo<Option[]>(() => {
    if (!open) return []
    let names: Intl.DisplayNames | null = null
    try {
      names = new Intl.DisplayNames([intlLocale], { type: 'region' })
    } catch {
      names = null
    }
    return COUNTRIES.map((c) => ({ iso: c.iso, dial: c.dial, en: c.name, name: names?.of(c.iso) || c.name }))
      .sort((a, b) => a.name.localeCompare(b.name, intlLocale))
  }, [open, intlLocale])

  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const raw = query.trim()
    const q = fold(raw)
    if (!q) return options
    const digits = raw.replace(/\D/g, '')
    // Rank: name starts with the query, then a word in the name does, then
    // dial code / ISO / anything containing it.
    const rank = (o: Option) => {
      const n = fold(o.name)
      const e = fold(o.en)
      if (n.startsWith(q) || e.startsWith(q)) return 0
      if ([...n.split(/[\s-]+/), ...e.split(/[\s-]+/)].some((w) => w.startsWith(q))) return 1
      if (digits && o.dial.slice(1).startsWith(digits)) return 1
      if (n.includes(q) || e.includes(q) || o.iso.toLowerCase() === q) return 2
      return -1
    }
    return options
      .map((o) => ({ o, r: rank(o) }))
      .filter((x) => x.r >= 0)
      .sort((a, b) => a.r - b.r)
      .map((x) => x.o)
  }, [options, query])

  const close = (refocus: boolean) => {
    onOpenChange(false)
    if (refocus) triggerRef.current?.focus({ preventScroll: true })
  }
  const pick = (o: Option) => {
    onChange(o.iso)
    close(true)
  }

  // On open: reset the search, highlight the current country, focus search.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(Math.max(0, options.findIndex((o) => o.iso === value)))
    searchRef.current?.focus({ preventScroll: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Close on a click outside the trigger and the panel.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) onOpenChange(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Keep the active option in view by scrolling the list only (scrollIntoView
  // would also scroll the page / the Bea form).
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
  }, [active, open, filtered])

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
    }
  }

  const searchLabel = SEARCH[locale] ?? SEARCH.en

  return {
    trigger: (
      <button
        ref={triggerRef}
        type="button"
        className="pcs-trigger"
        aria-label={`${ariaLabel}: ${dialOf(value)}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        disabled={disabled}
        onClick={() => (open ? close(false) : onOpenChange(true))}
        onKeyDown={(e) => {
          if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault()
            onOpenChange(true)
          }
        }}
      >
        <span className="pcs-flag" aria-hidden="true">{flagOf(value)}</span>
        <span className="pcs-dial">{dialOf(value)}</span>
        <span className="pcs-caret" aria-hidden="true" />
      </button>
    ),
    panel: open ? (
      <div className="pcs-panel" ref={panelRef}>
        <div className="pcs-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            className="pcs-search-input"
            value={query}
            placeholder={searchLabel}
            aria-label={searchLabel}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].iso}` : undefined}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onSearchKey}
          />
        </div>
        <ul className="pcs-list" role="listbox" id={listId} ref={listRef} aria-label={ariaLabel}>
          {filtered.length === 0 && <li className="pcs-empty">{EMPTY[locale] ?? EMPTY.en}</li>}
          {filtered.map((o, i) => (
            <li
              key={o.iso}
              id={`${listId}-${o.iso}`}
              data-i={i}
              role="option"
              aria-selected={o.iso === value}
              className={`pcs-opt${i === active ? ' is-active' : ''}${o.iso === value ? ' is-selected' : ''}`}
              // mousemove, not mouseenter: the Bea form grows upward when the panel
              // opens, sliding options under a still pointer, which would steal the
              // keyboard highlight.
              onMouseMove={() => active !== i && setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(o)}
            >
              <span className="pcs-flag" aria-hidden="true">{flagOf(o.iso)}</span>
              <span className="pcs-name">{o.name}</span>
              <span className="pcs-opt-dial">{o.dial}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : null,
  }
}
