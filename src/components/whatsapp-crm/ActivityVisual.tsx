'use client'

import { useRef, useState } from 'react'
import type { PageContent } from '@/data/whatsapp-crm-content'

/**
 * The one interactive visual on the page: the three headline numbers are
 * tabs, and picking one redraws the per-rep breakdown beneath them.
 *
 * The point it makes is the section's argument — the same four people look
 * completely different depending on which metric you ask about. Ana sends
 * the most messages AND answers fastest; Diego sends the fewest, leaves the
 * most hanging and takes eight minutes. You only see that by switching.
 *
 * Client component because of that state. It is the only one in this set,
 * so the other three visuals still ship zero JS.
 */
export default function ActivityVisual({ v }: { v: PageContent['visuals'] }) {
  const metrics = v.activity.metrics
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const metric = metrics[active]

  // Bars are relative to the worst value in the metric being shown, not to a
  // fixed scale — 8m 45s and 142 messages have nothing in common.
  const max = Math.max(...metric.reps.map((r) => r.value)) || 1

  /** Roving focus, per the tabs pattern: arrows move, they do not just scroll. */
  const onKey = (e: React.KeyboardEvent) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (active + delta + metrics.length) % metrics.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <>
      <div role="tablist" aria-label={v.team} onKeyDown={onKey} className="mb-5 grid grid-cols-3 gap-2.5">
        {metrics.map((m, i) => {
          const on = i === active
          // "Unreplied" keeps its danger tone when selected — it is the number
          // that costs money, and that should not change with the tab state.
          const alert = !m.higherIsBetter && m.id === 'unreplied'
          return (
            <button
              key={m.id}
              ref={(el) => { tabs.current[i] = el }}
              role="tab"
              type="button"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left transition-colors duration-150 ${
                on
                  ? alert
                    ? 'border-wc-danger/45 bg-wc-danger/[0.07]'
                    : 'border-wc-accent/45 bg-wc-tint'
                  : 'border-wc-rule bg-wc-soft hover:border-wc-accent/25'
              }`}
            >
              <span className="block font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-wc-ink-3">
                {m.label}
              </span>
              <span
                className={`mt-1 block text-[19px] font-semibold leading-none tabular-nums ${
                  alert ? 'text-wc-danger' : 'text-wc-ink'
                }`}
              >
                {m.total}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.1em] text-wc-ink-3">
        {metric.label} · {v.byRep}
      </p>

      {/* Keyed on the metric so the bars remount and re-run their fill
          animation on every switch — a silent redraw reads as a glitch. */}
      <ul key={metric.id} role="tabpanel" className="flex flex-col gap-3.5">
        {metric.reps.map((r, i) => {
          const share = Math.round((r.value / max) * 100)
          // Worst performer on the metric, whichever direction "worst" runs.
          const worst = metric.higherIsBetter ? r.value === Math.min(...metric.reps.map((x) => x.value)) : r.value === max
          return (
            <li key={r.name} style={{ '--i': i + 3 } as React.CSSProperties}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-[14px] font-semibold text-wc-ink">{r.name}</span>
                <span className="font-mono text-[11px] tabular-nums text-wc-ink-3">{r.display}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-wc-soft">
                <div
                  className={`wc-grow h-full rounded-full ${worst ? 'bg-wc-danger/70' : 'bg-wc-accent'}`}
                  style={{ width: `${share}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 border-t border-wc-rule pt-3 text-[11.5px] text-wc-ink-3">{v.illustrative}</p>
    </>
  )
}
