import type { PageContent } from '@/data/whatsapp-crm-content'
import ActivityVisual from './ActivityVisual'

/**
 * One visual per value section. Server components — no JS ships for any of
 * them; the motion is CSS keyed off `.is-in`, which <Reveal> supplies.
 *
 * Each visual demonstrates the claim its section makes rather than decorating
 * it: rows landing on a record, bars filling, a promise being read back, an
 * owner changing while the history stays put.
 */

const Tick = ({ className = 'size-3' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/** Shared frame so the four visuals read as one family. */
function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-wc-rule bg-white shadow-[0_22px_56px_-30px_rgba(12,21,16,0.3)]">
      <div className="flex items-center gap-2 border-b border-wc-rule bg-wc-soft px-4 py-2.5">
        {/* same live-connection dot as the product mock — one page, one
            vocabulary for "this is a live link" */}
        <span className="wc-live size-1.5 rounded-full bg-wc-accent-mid" />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-wc-ink-3">{label}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

/** VISIBILITY — items arriving on the record one after another. */
export function SyncVisual({ v }: { v: PageContent['visuals'] }) {
  const rows = [
    { icon: 'msg', title: v.messages, meta: `${v.today}, 09:12` },
    { icon: 'mic', title: v.voice, meta: `${v.today}, 09:31` },
    { icon: 'doc', title: v.file, meta: `${v.today}, 09:34` },
  ]
  return (
    <Frame label={v.contact}>
      <ul className="flex flex-col gap-2.5">
        {rows.map((r, i) => (
          <li
            key={r.title}
            className="wc-anim flex items-center gap-3 rounded-xl border border-wc-rule bg-white px-3.5 py-3"
            style={{ '--i': i } as React.CSSProperties}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-wc-tint text-wc-accent-deep" aria-hidden="true">
              {r.icon === 'msg' && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l2-4.9A8.4 8.4 0 0 1 21 11.5z" /></svg>
              )}
              {r.icon === 'mic' && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3" /></svg>
              )}
              {r.icon === 'doc' && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold text-wc-ink">{r.title}</span>
              <span className="block font-mono text-[10px] text-wc-ink-3">{r.meta}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-wc-tint px-2 py-1 font-mono text-[9.5px] font-semibold text-wc-accent-deep">
              <Tick /> {v.synced}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/** ANALYTICS — the only interactive visual; lives in its own client file
    so the other three keep shipping zero JS. */
function ActivityFrame({ v }: { v: PageContent['visuals'] }) {
  return (
    <Frame label={v.team}>
      <ActivityVisual v={v} />
    </Frame>
  )
}

/** CONTROL — the commitment, highlighted as a manager reads back the thread. */
export function PromiseVisual({ v }: { v: PageContent['visuals'] }) {
  return (
    <Frame label={v.deal}>
      <div className="flex flex-col gap-3">
        <div className="wc-anim max-w-[88%] rounded-2xl rounded-tl-md border border-wc-rule bg-wc-soft px-4 py-2.5 text-[14px] leading-snug text-wc-ink" style={{ '--i': 0 } as React.CSSProperties}>
          {v.objection}
        </div>

        <div className="wc-anim self-end" style={{ '--i': 1 } as React.CSSProperties}>
          <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-wc-tint px-4 py-2.5 text-[14px] leading-snug text-wc-ink">
            {v.reply}{' '}
            <span className="relative inline-block">
              <span className="wc-grow absolute -inset-x-1 inset-y-0 rounded bg-amber-200/80" aria-hidden="true" style={{ '--i': 2 } as React.CSSProperties} />
              <span className="relative font-semibold">{v.promise}</span>
            </span>
          </div>
          <div className="mt-1 text-right font-mono text-[9.5px] text-wc-ink-3">{v.sentBy}</div>
        </div>

        <div className="wc-anim mt-1 flex items-start gap-2.5 rounded-xl border border-wc-rule bg-white px-3.5 py-3" style={{ '--i': 3 } as React.CSSProperties}>
          <span className="mt-0.5 shrink-0 text-wc-danger" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
          </span>
          <p className="text-[14px] leading-snug text-wc-ink-2">
            {v.caught}
          </p>
        </div>
      </div>
    </Frame>
  )
}

/** OWNERSHIP — the owner changes, the history does not move. */
export function HandoverVisual({ v }: { v: PageContent['visuals'] }) {
  return (
    <Frame label={v.account}>
      <div className="rounded-xl border border-wc-rule bg-wc-soft p-3.5">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-wc-ink-3">{v.owner}</p>
        <div className="relative mt-1.5 h-8">
          <div className="wc-out absolute inset-0 flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-white text-[11px] font-semibold text-wc-ink-3" aria-hidden="true">AC</span>
            <span className="text-[14px] font-semibold text-wc-ink-3 line-through">Ana Costa</span>
            <span className="rounded bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold text-wc-ink-3">{v.left}</span>
          </div>
          <div className="wc-in absolute inset-0 flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-wc-tint text-[11px] font-semibold text-wc-accent-deep" aria-hidden="true">BL</span>
            <span className="text-[14px] font-semibold text-wc-ink">Bruno Lima</span>
            <span className="rounded bg-wc-tint px-1.5 py-0.5 font-mono text-[9px] font-semibold text-wc-accent-deep">{v.nowOwns}</span>
          </div>
        </div>
      </div>

      {/* The point of the visual: this list never moves. */}
      <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.12em] text-wc-ink-3">
        {v.history}
      </p>
      <ul className="mt-2 flex flex-col gap-2">
        {[v.h1, v.h2, v.h3].map((t, i) => (
          <li
            key={t}
            className="wc-anim flex items-center gap-2.5 rounded-lg border border-wc-rule px-3 py-2 text-[14px] text-wc-ink-2"
            style={{ '--i': i } as React.CSSProperties}
          >
            <span className="shrink-0 text-wc-accent"><Tick /></span>
            {t}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

export type VisualKey = 'sync' | 'activity' | 'promise' | 'handover'

export const VISUALS: Record<VisualKey, (p: { v: PageContent['visuals'] }) => React.JSX.Element> = {
  sync: SyncVisual,
  activity: ActivityFrame,
  promise: PromiseVisual,
  handover: HandoverVisual,
}
