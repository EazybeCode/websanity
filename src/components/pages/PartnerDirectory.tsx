'use client'

import { Fragment, useMemo, useState, type ReactNode } from 'react'
import {
  PARTNERS,
  REGION_ORDER,
  CRM_ORDER,
  type PartnerCrm,
  type PartnerRecord,
  type PartnerRegion,
  type PartnerRichSpan,
} from '@/data/partner-directory'

export interface PartnerDirectoryLabels {
  heading: string
  headingHighlight: string
  searchPlaceholder: string
  filters: string
  resetAll: string
  activeFilters: string
  clearAll: string
  showing: string // "Showing {count} expert partners"
  showingOne: string // singular
  empty: string
  readMore: string
  readLess: string
  regionLabel: string
  crmLabel: string
  specialtyLabel: string
  regions: Record<PartnerRegion, string>
  crms: Record<PartnerCrm, string>
  verified: string
  viewPost: string
}

const STYLES = `
.pd-layout { display: grid; grid-template-columns: 260px 1fr; gap: 28px; align-items: start; }
.pd-panel { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 22px; position: sticky; top: 88px; }
.pd-panel-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.pd-panel-title { margin: 0; font-family: var(--f-mono); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink); }
.pd-reset, .pd-clear {
  min-height: 32px; padding: 0 6px; margin-right: -6px;
  font-family: var(--f-sans); font-size: 13px; font-weight: 600;
  color: var(--accent-ink); background: none; border: none; cursor: pointer; border-radius: 6px;
  transition: background-color .16s ease;
}
.pd-reset:hover, .pd-clear:hover { background: color-mix(in oklab, var(--accent-a) 14%, transparent); }
.pd-reset:focus-visible, .pd-clear:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
.pd-panel hr { border: 0; border-top: 1px solid var(--line); margin: 14px 0 4px; }
.pd-group-title { font-family: var(--f-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-4); margin: 14px 0 4px; }
.pd-check { display: flex; align-items: flex-start; gap: 10px; min-height: 40px; padding: 6px 0; cursor: pointer; font-size: 14px; color: var(--ink-2); }
.pd-check:hover { color: var(--ink); }
.pd-check-text { flex: 1; line-height: 1.35; }
.pd-check input { margin-top: 2px; }
.pd-count-badge { flex-shrink: 0; font-size: 13px; color: var(--ink-4); font-variant-numeric: tabular-nums; }
.pd-check.is-empty { color: var(--ink-4); cursor: not-allowed; }
.pd-check.is-empty input { cursor: not-allowed; }
.pd-check input { width: 16px; height: 16px; margin: 0; cursor: pointer; accent-color: var(--accent-ink); }
.pd-check input:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }

.pd-search-wrap { position: relative; margin: 0 auto 26px; max-width: 720px; }
.pd-search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: var(--ink-4); pointer-events: none; display: flex; }
.pd-search {
  width: 100%; min-height: 52px; padding: 14px 18px 14px 48px;
  font-family: var(--f-sans); font-size: 16px; color: var(--ink);
  background: #fff; border: 1px solid var(--line-2); border-radius: 100px;
  transition: border-color .16s ease, box-shadow .16s ease;
}
.pd-search::placeholder { color: var(--ink-4); }
.pd-search:focus { outline: none; border-color: var(--accent-ink); box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent-a) 32%, transparent); }

.pd-activebar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; font-size: 14px; color: var(--ink-3); }
.pd-chip {
  display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 0 10px;
  font-size: 13px; font-weight: 500; color: var(--accent-ink);
  background: color-mix(in oklab, var(--accent-a) 12%, #fff);
  border: 1px solid color-mix(in oklab, var(--accent-a) 34%, var(--line));
  border-radius: 100px; cursor: pointer;
  transition: background-color .16s ease;
}
.pd-chip:hover { background: color-mix(in oklab, var(--accent-a) 22%, #fff); }
.pd-chip:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; }
.pd-count { font-size: 14px; color: var(--ink-3); margin-bottom: 18px; }
.pd-count b { color: var(--ink); font-weight: 700; }

.pd-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; align-items: start; }
.pd-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 26px; }
.pd-card-head { display: flex; gap: 14px; align-items: flex-start; }
.pd-avatar {
  width: 46px; height: 46px; flex-shrink: 0; border-radius: 10px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--bg-2); border: 1px solid var(--line);
  font-family: var(--f-mono); font-size: 13px; font-weight: 600; color: var(--ink-2);
  overflow: hidden;
}
.pd-avatar img { width: 100%; height: 100%; object-fit: contain; }
.pd-name { margin: 0 0 8px; font-size: 19px; font-weight: 700; letter-spacing: -.01em; color: var(--ink); }
.pd-badges { display: flex; gap: 6px; flex-wrap: wrap; }
.pd-badge { font-size: 12px; padding: 3px 9px; border-radius: 100px; background: var(--bg-2); border: 1px solid var(--line); color: var(--ink-3); white-space: nowrap; }
.pd-badge.is-tier { color: var(--ink); font-weight: 600; }
.pd-badge.is-crm { color: var(--accent-ink); background: color-mix(in oklab, var(--accent-a) 12%, #fff); border-color: color-mix(in oklab, var(--accent-a) 30%, var(--line)); }
.pd-summary { margin: 16px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-2); }
.pd-detail { margin: 8px 0 0; font-size: 14.5px; line-height: 1.6; color: var(--ink-3); }
.pd-summary strong, .pd-detail strong { color: var(--ink); font-weight: 600; }
.landing .pd-summary a, .landing .pd-detail a { color: var(--accent-ink); font-weight: 600; }
.landing .pd-summary a:hover, .landing .pd-detail a:hover { text-decoration: underline; }
.landing .pd-summary a:focus-visible, .landing .pd-detail a:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; border-radius: 4px; }
.landing .pd-more {
  margin-top: 10px; font-size: 14px; font-weight: 600; color: var(--accent-ink);
  background: none; border: none; padding: 4px 0; cursor: pointer; font-family: var(--f-sans);
}
.landing .pd-more:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; border-radius: 4px; }
.pd-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 16px; }
.pd-tag { font-size: 12px; padding: 4px 10px; border-radius: 100px; background: var(--bg-2); border: 1px solid var(--line); color: var(--ink-3); }

.pd-quote { margin-top: 18px; padding: 16px; border-radius: 12px;
  background: color-mix(in oklab, #0E7A46 6%, #fff);
  border: 1px solid color-mix(in oklab, #0E7A46 22%, var(--line)); }
.pd-quote-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.pd-quote-label { display: inline-flex; align-items: center; gap: 6px; font-family: var(--f-mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #0E7A46; }
.pd-stars { font-size: 12px; color: #B7791F; white-space: nowrap; }
.pd-quote-text { margin: 10px 0 0; font-size: 14px; line-height: 1.6; font-style: italic; color: var(--ink-2); }
.pd-quote-foot { margin-top: 10px; display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; font-size: 13px; color: var(--ink-3); }
.pd-quote-foot b { color: var(--ink); font-weight: 600; }
.landing .pd-quote-link { color: var(--accent-ink); font-weight: 600; white-space: nowrap; }
.landing .pd-quote-link:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 2px; border-radius: 4px; }

.pd-empty { padding: 40px 24px; text-align: center; color: var(--ink-3); background: #fff; border: 1px dashed var(--line-2); border-radius: 16px; }

@media (max-width: 900px) {
  .pd-layout { grid-template-columns: 1fr; }
  .pd-panel { position: static; }
  .pd-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .pd-search, .pd-chip, .pd-reset, .pd-clear { transition: none; }
}
`

/** One filter row: checkbox, label, and the facet count on the right.
 *  A zero-count option is disabled rather than hidden — it stays visible so
 *  the taxonomy reads consistently, but can't be clicked into an empty list.
 *  An already-ticked option is never disabled, or you couldn't untick it. */
function FacetRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string
  count: number
  checked: boolean
  onChange: () => void
}) {
  const empty = count === 0 && !checked
  return (
    <label className={`pd-check${empty ? ' is-empty' : ''}`}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={empty} />
      <span className="pd-check-text">{label}</span>
      <span className="pd-count-badge">{count}</span>
    </label>
  )
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="pd-stars" aria-label={`${rating.toFixed(1)} out of 5`}>
      {'★'.repeat(full)}
      {'☆'.repeat(Math.max(0, 5 - full))} {rating.toFixed(1)}
    </span>
  )
}

/** Renders the formatted spans when the CMS provided them, otherwise the
 *  plain string — so static sample data keeps working unchanged. */
function RichText({ spans, fallback }: { spans?: PartnerRichSpan[]; fallback: string }) {
  if (!spans?.length) return <>{fallback}</>
  return (
    <>
      {spans.map((s, i) => {
        let node: ReactNode = s.text
        if (s.bold) node = <strong>{node}</strong>
        if (s.italic) node = <em>{node}</em>
        if (s.href) {
          node = (
            <a
              href={s.href}
              target={s.newTab ? '_blank' : undefined}
              rel={s.newTab ? 'noopener noreferrer' : undefined}
            >
              {node}
            </a>
          )
        }
        return <Fragment key={i}>{node}</Fragment>
      })}
    </>
  )
}

function Card({ p, labels }: { p: PartnerRecord; labels: PartnerDirectoryLabels }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="pd-card">
      <div className="pd-card-head">
        <span className="pd-avatar" aria-hidden="true">
          {p.logoUrl ? <img src={p.logoUrl} alt="" loading="lazy" /> : p.initials}
        </span>
        <div style={{ minWidth: 0 }}>
          <h3 className="pd-name">{p.name}</h3>
          <div className="pd-badges">
            <span className="pd-badge is-tier">{p.tier}</span>
            <span className="pd-badge is-crm">{p.crmLabel}</span>
            <span className="pd-badge">{p.country}</span>
          </div>
        </div>
      </div>

      <p className="pd-summary"><RichText spans={p.summaryRich} fallback={p.summary} /></p>
      {open && p.detail && (
        <p className="pd-detail"><RichText spans={p.detailRich} fallback={p.detail} /></p>
      )}
      {p.detail && (
        <button type="button" className="pd-more" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? labels.readLess : labels.readMore}
        </button>
      )}

      {p.specialties.length > 0 && (
        <div className="pd-tags">
          {p.specialties.map((s) => <span key={s} className="pd-tag">{s}</span>)}
        </div>
      )}

      {p.testimonial && (
        <div className="pd-quote">
          <div className="pd-quote-head">
            <span className="pd-quote-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {labels.verified}
            </span>
            <Stars rating={p.testimonial.rating} />
          </div>
          <p className="pd-quote-text">“{p.testimonial.quote}”</p>
          <div className="pd-quote-foot">
            <span><b>{p.testimonial.authorName}</b> · {p.testimonial.authorTitle}</span>
            <a className="pd-quote-link" href={p.testimonial.url} target="_blank" rel="noopener noreferrer">
              {labels.viewPost} ↗
            </a>
          </div>
        </div>
      )}
    </article>
  )
}

export function PartnerDirectory({
  labels,
  partners = PARTNERS,
}: {
  labels: PartnerDirectoryLabels
  /** Defaults to the static sample list; the page passes the Sanity-managed one. */
  partners?: PartnerRecord[]
}) {
  const [query, setQuery] = useState('')

  /** Every specialty present in the data, alphabetical. Derived rather than
   *  hardcoded so the list stays in step with whatever partners are added. */
  const allSpecialties = useMemo(
    () => [...new Set(partners.flatMap((p) => p.specialties))].sort((a, b) => a.localeCompare(b)),
    [partners],
  )
  const [regions, setRegions] = useState<Set<PartnerRegion>>(new Set())
  const [crms, setCrms] = useState<Set<PartnerCrm>>(new Set())
  const [specialties, setSpecialties] = useState<Set<string>>(new Set())

  const toggle = <T,>(set: Set<T>, setter: (s: Set<T>) => void, v: T) => {
    const next = new Set(set)
    if (next.has(v)) next.delete(v)
    else next.add(v)
    setter(next)
  }

  /** One matcher used for both the result list and the facet counts, so a
   *  count can never disagree with what clicking it actually returns.
   *  `skip` omits one facet — that is what makes the counts faceted: the
   *  number beside "RevOps" is what you'd get if you ticked it, given the
   *  filters already applied elsewhere. */
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (p: PartnerRecord, skip?: 'region' | 'crm' | 'specialty') => {
      if (skip !== 'region' && regions.size && !regions.has(p.region)) return false
      if (skip !== 'crm' && crms.size && !crms.has(p.crm)) return false
      if (skip !== 'specialty' && specialties.size && !p.specialties.some((s) => specialties.has(s))) return false
      if (!q) return true
      // Search name, CRM, specialty and country — the placeholder promises all four.
      const hay = [p.name, p.crmLabel, p.country, p.tier, p.summary, ...p.specialties].join(' ').toLowerCase()
      return hay.includes(q)
    }
  }, [query, regions, crms, specialties])

  const visible = useMemo(() => partners.filter((p) => matches(p)), [partners, matches])

  const counts = useMemo(() => {
    const region = {} as Record<PartnerRegion, number>
    for (const r of REGION_ORDER) region[r] = partners.filter((p) => p.region === r && matches(p, 'region')).length
    const crm = {} as Record<PartnerCrm, number>
    for (const c of CRM_ORDER) crm[c] = partners.filter((p) => p.crm === c && matches(p, 'crm')).length
    const specialty: Record<string, number> = {}
    for (const s of allSpecialties) {
      specialty[s] = partners.filter((p) => p.specialties.includes(s) && matches(p, 'specialty')).length
    }
    return { region, crm, specialty }
  }, [partners, matches, allSpecialties])

  const activeChips = [
    ...[...regions].map((r) => ({ key: `r:${r}`, text: labels.regions[r], clear: () => toggle(regions, setRegions, r) })),
    ...[...crms].map((c) => ({ key: `c:${c}`, text: labels.crms[c], clear: () => toggle(crms, setCrms, c) })),
    ...[...specialties].map((s) => ({ key: `s:${s}`, text: s, clear: () => toggle(specialties, setSpecialties, s) })),
  ]
  const resetAll = () => { setRegions(new Set()); setCrms(new Set()); setSpecialties(new Set()); setQuery('') }

  const countText = (visible.length === 1 ? labels.showingOne : labels.showing).split('{count}')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="pd-search-wrap">
        <span className="pd-search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
        </span>
        <input
          className="pd-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.searchPlaceholder}
          aria-label={labels.searchPlaceholder}
        />
      </div>

      <div className="pd-layout">
        <aside className="pd-panel">
          <div className="pd-panel-head">
            <h3 className="pd-panel-title">{labels.filters}</h3>
            <button type="button" className="pd-reset" onClick={resetAll}>{labels.resetAll}</button>
          </div>
          <hr />

          <div className="pd-group-title">{labels.regionLabel}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {REGION_ORDER.map((r) => (
              <li key={r}>
                <FacetRow
                  label={labels.regions[r]}
                  count={counts.region[r]}
                  checked={regions.has(r)}
                  onChange={() => toggle(regions, setRegions, r)}
                />
              </li>
            ))}
          </ul>

          <div className="pd-group-title">{labels.crmLabel}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {CRM_ORDER.map((c) => (
              <li key={c}>
                <FacetRow
                  label={labels.crms[c]}
                  count={counts.crm[c]}
                  checked={crms.has(c)}
                  onChange={() => toggle(crms, setCrms, c)}
                />
              </li>
            ))}
          </ul>

          {allSpecialties.length > 0 && (
            <>
              <div className="pd-group-title">{labels.specialtyLabel}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {allSpecialties.map((s) => (
                  <li key={s}>
                    <FacetRow
                      label={s}
                      count={counts.specialty[s]}
                      checked={specialties.has(s)}
                      onChange={() => toggle(specialties, setSpecialties, s)}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>

        <div>
          {activeChips.length > 0 && (
            <div className="pd-activebar">
              <span>{labels.activeFilters}</span>
              {activeChips.map((c) => (
                <button key={c.key} type="button" className="pd-chip" onClick={c.clear}>
                  {c.text}
                  <span aria-hidden="true">✕</span>
                </button>
              ))}
              <button type="button" className="pd-clear" onClick={resetAll}>{labels.clearAll}</button>
            </div>
          )}

          <div className="pd-count" aria-live="polite">
            {countText[0]}<b>{visible.length}</b>{countText[1] ?? ''}
          </div>

          {visible.length === 0 ? (
            <div className="pd-empty">{labels.empty}</div>
          ) : (
            <div className="pd-grid">
              {visible.map((p) => <Card key={p.id} p={p} labels={labels} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
