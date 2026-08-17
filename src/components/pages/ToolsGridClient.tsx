'use client'

import { useMemo, useState } from 'react'
import type { ToolCard, ToolsPageContent } from '@/data/tools-content'

/* Client-side because the category filter needs checkbox state. Cards still
   link straight to each tool's own top-level route — filtering only hides
   cards, it never changes a URL. */

const ICONS = {
  qr: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM19 19h2M14 21h3" />
    </svg>
  ),
  link: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
    </svg>
  ),
  widget: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M2 7h20" />
      <path d="M17 21a3 3 0 0 0 3-3" />
    </svg>
  ),
  calculator: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="20" x2="6" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="18" y1="20" x2="18" y2="14" />
    </svg>
  ),
} as const

const STYLES = `
.tools-layout { display: grid; grid-template-columns: 250px 1fr; gap: 24px; align-items: start; }

.tools-filter {
  background: #fff; border: 1px solid var(--line); border-radius: 16px;
  padding: 22px; position: sticky; top: 88px;
}
.tools-filter-title { margin: 0 0 14px; font-size: 16px; font-weight: 700; color: var(--ink); }
.tools-filter hr { border: 0; border-top: 1px solid var(--line); margin: 0 0 6px; }
.tools-filter-cat {
  width: 100%; min-height: 44px; padding: 0;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  font-family: var(--f-sans); font-size: 14px; font-weight: 600; color: var(--ink);
  background: none; border: none; cursor: pointer;
}
.tools-filter-cat:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; border-radius: 6px; }
.tools-filter-chev { display: inline-flex; color: var(--ink-3); transition: transform .18s ease; }
.tools-filter-cat[aria-expanded="false"] .tools-filter-chev { transform: rotate(180deg); }
.tools-filter-list { list-style: none; margin: 2px 0 0; padding: 0; }
.tools-filter-row {
  display: flex; align-items: center; gap: 10px;
  min-height: 40px; cursor: pointer;
  font-size: 14px; color: var(--ink-2);
}
.tools-filter-row input {
  width: 16px; height: 16px; margin: 0; cursor: pointer;
  accent-color: var(--accent-ink);
}
.tools-filter-row input:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
.tools-filter-row:hover { color: var(--ink); }

.tools-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.tool-card {
  position: relative; /* anchor for the stretched CTA link */
  display: flex; flex-direction: column; gap: 12px;
  padding: 28px; background: #fff;
  border: 1px solid var(--line); border-radius: 16px;
  transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
}
.tool-card:hover {
  border-color: color-mix(in oklab, var(--accent-a) 45%, var(--line));
  box-shadow: 0 12px 30px -20px rgba(15,17,21,.35);
  transform: translateY(-2px);
}
.tool-card:active { transform: translateY(0); }
.tool-card:focus-within {
  border-color: var(--accent-ink);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent-a) 30%, transparent);
}
.tool-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.tool-icon {
  width: 46px; height: 46px; flex-shrink: 0; border-radius: 12px;
  display: inline-flex; align-items: center; justify-content: center;
  background: color-mix(in oklab, var(--accent-a) 16%, #fff);
  color: var(--accent-ink);
  border: 1px solid color-mix(in oklab, var(--accent-a) 30%, var(--line));
}
.tool-badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
.tool-tag {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .07em;
  text-transform: uppercase; padding: 4px 9px; border-radius: 100px;
  color: var(--ink-3); background: var(--bg-2); border: 1px solid var(--line);
  white-space: nowrap;
}
.tool-tag.is-free { color: #0E7A46; border-color: color-mix(in oklab, #0E7A46 28%, var(--line));
  background: color-mix(in oklab, #0E7A46 8%, #fff); }
.tool-name { margin: 0; font-size: 19px; font-weight: 700; letter-spacing: -.01em; color: var(--ink); }
.tool-tagline { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); flex: 1; }
.landing .tool-cta {
  margin-top: 4px; align-self: flex-start;
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 600; color: var(--accent-ink);
  transition: gap .18s ease, color .18s ease;
}
.tool-card:hover .tool-cta { gap: 10px; }
.landing .tool-cta:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; border-radius: 4px; }
/* Stretched link: the CTA's ::after covers the whole card, so the full card is
   the hit area and gets the pointer cursor, while the link text stays the
   accessible name. */
.landing .tool-cta::after { content: ""; position: absolute; inset: 0; border-radius: 16px; }

@media (max-width: 900px) {
  .tools-layout { grid-template-columns: 1fr; }
  .tools-filter { position: static; }
  .tools-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .tool-card, .tool-cta, .tools-filter-chev { transition: none; }
  .tool-card:hover { transform: none; }
}
`

export interface ToolsGridClientProps {
  tools: ToolCard[]
  labels: ToolsPageContent['grid'] & ToolsPageContent['filter']
  locale: string
}

export function ToolsGridClient({ tools, labels, locale }: ToolsGridClientProps) {
  const categories = useMemo(() => [...new Set(tools.map((t) => t.category))], [tools])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState(true)

  const toggle = (cat: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })

  // Nothing ticked means no filter — show everything.
  const visible = selected.size === 0 ? tools : tools.filter((t) => selected.has(t.category))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="tools-layout">
        <aside className="tools-filter">
          <h3 className="tools-filter-title">{labels.title}</h3>
          <hr />
          <button
            type="button"
            className="tools-filter-cat"
            aria-expanded={open}
            aria-controls="tools-filter-list"
            onClick={() => setOpen((o) => !o)}
          >
            {labels.category}
            <span className="tools-filter-chev" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </span>
          </button>
          {open && (
            <ul className="tools-filter-list" id="tools-filter-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <label className="tools-filter-row">
                    <input
                      type="checkbox"
                      checked={selected.has(cat)}
                      onChange={() => toggle(cat)}
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="tools-grid" aria-live="polite">
          {visible.map((tool) => (
            <div key={tool.href} className="tool-card">
              <div className="tool-card-top">
                <span className="tool-icon">{ICONS[tool.icon]}</span>
                <span className="tool-badges">
                  <span className="tool-tag is-free">{labels.freeBadge}</span>
                  <span className="tool-tag">{tool.category}</span>
                </span>
              </div>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-tagline">{tool.tagline}</p>
              <a className="tool-cta" href={locale === 'en' ? tool.href : `/${locale}${tool.href}`}>
                {labels.tryIt} <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
