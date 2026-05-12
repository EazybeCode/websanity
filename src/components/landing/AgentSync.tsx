'use client'

import { useEffect, useRef, useState } from 'react'

interface Person {
  name: string
  initials: string
  bg: string
  msg: string
}

const PEOPLE: Person[] = [
  { name: 'Sara Patel',  initials: 'SP', bg: '#E4E8F1', msg: 'Can we do a call tomorrow at 3?' },
  { name: 'Marco Rossi', initials: 'MR', bg: '#D4D9E5', msg: 'Sending the signed contract now 🎉' },
  { name: 'Aisha Khan',  initials: 'AK', bg: '#ECEFF7', msg: "We're comparing you vs. competitor X" },
  { name: 'Diego Lopez', initials: 'DL', bg: '#D9DFEC', msg: 'Voice note sent · 0:42' },
  { name: 'Lena Weber',  initials: 'LW', bg: '#E8EBF3', msg: 'Great — lets move forward!' },
]

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
)

interface CrmRow extends Person { id: number }

export function AgentSync() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)
  const crmRowsRef = useRef<HTMLDivElement>(null)
  const [focusIdx, setFocusIdx] = useState<number | null>(null)
  const [sentSet, setSentSet] = useState<Set<number>>(new Set())
  const [pillActive, setPillActive] = useState(false)
  const [crmRows, setCrmRows] = useState<CrmRow[]>([])
  const runningRef = useRef(false)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const clearAll = () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []
    }
    const wait = (ms: number) => new Promise<void>((resolve) => {
      const id = window.setTimeout(() => resolve(), ms)
      timeoutsRef.current.push(id)
    })

    let idx = 0
    let counter = 0

    const flyGhost = (sourceRow: HTMLElement, person: Person): Promise<void> =>
      new Promise((resolve) => {
        const stageRect = stage.getBoundingClientRect()
        const sRect = sourceRow.getBoundingClientRect()
        const crmRect = crmRowsRef.current!.getBoundingClientRect()

        const ghost = document.createElement('div')
        ghost.className = 'sv3-ghost'
        ghost.style.width = sRect.width + 'px'
        ghost.style.left = sRect.left - stageRect.left + 'px'
        ghost.style.top = sRect.top - stageRect.top + 'px'
        ghost.innerHTML = `
          <div class="sv3-av" style="background:${person.bg}">${person.initials}</div>
          <div class="sv3-row-body">
            <div class="sv3-row-top"><strong>${person.name}</strong></div>
            <div class="sv3-row-msg">${person.msg}</div>
          </div>
        `
        stage.appendChild(ghost)

        requestAnimationFrame(() => {
          ghost.classList.add('flying')
          const dy = crmRect.top - stageRect.top - (sRect.top - stageRect.top) + 8
          ghost.style.transform = `translate(0px, ${dy}px) scale(.96)`
        })

        const onEnd = (e: TransitionEvent) => {
          if (e.propertyName !== 'transform') return
          ghost.removeEventListener('transitionend', onEnd)
          ghost.classList.add('landed')
          window.setTimeout(() => ghost.remove(), 250)
          resolve()
        }
        ghost.addEventListener('transitionend', onEnd)
      })

    const step = async () => {
      if (!runningRef.current) return
      const person = PEOPLE[idx]
      const sourceRow = rowsRef.current?.querySelector<HTMLElement>(`.sv3-row[data-idx="${idx}"]`)
      if (!sourceRow) return

      setFocusIdx(idx)
      setPillActive(true)
      await wait(550)
      if (!runningRef.current) return

      await flyGhost(sourceRow, person)
      if (!runningRef.current) return

      setFocusIdx(null)
      setSentSet((prev) => new Set(prev).add(idx))

      const id = counter++
      setCrmRows((prev) => [{ ...person, id }, ...prev].slice(0, 5))
      // mark as arrived after a frame
      requestAnimationFrame(() => {
        const el = crmRowsRef.current?.querySelector<HTMLElement>(`.sv3-row[data-cid="${id}"]`)
        el?.classList.add('arrived')
      })

      setPillActive(false)
      await wait(900)
      if (!runningRef.current) return

      idx = (idx + 1) % PEOPLE.length
      if (idx === 0) setSentSet(new Set())
      step()
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !runningRef.current) {
            runningRef.current = true
            step()
          } else if (!e.isIntersecting) {
            runningRef.current = false
            clearAll()
          }
        }
      },
      { threshold: 0.2 }
    )
    io.observe(stage)
    return () => { io.disconnect(); runningRef.current = false; clearAll() }
  }, [])

  return (
    <section className="agent" id="agents">
      <div className="container">
        <div className="agent-inner">
          <div className="agent-copy reveal">
            <span className="sec-tag">Agent 01 · CRM Sync · FREE · MOST POPULAR</span>
            <h3>Every WhatsApp conversation. <em>In your CRM.</em> Automatically.</h3>
            <p className="lede">&quot;Your rep had 200 conversations today. This agent logged every one.&quot;</p>
            <ul className="feat-list">
              {[
                'Syncs to HubSpot, Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, Google Sheets, custom API',
                'Smart field mapping — right contact, right deal, right company',
                'Bi-directional — CRM updates flow back into WhatsApp',
                'Attachments, voice notes, media — all preserved',
              ].map((t) => (
                <li key={t}><span className="tick">{CheckIcon}</span>{t}</li>
              ))}
            </ul>
            <a href="#" className="feat-link">Deploy Free →</a>
          </div>
          <div className="visual reveal sync-v3">
            <div className="sv3-stage" ref={stageRef}>
              <div className="sv3-pane">
                <div className="sv3-pane-head">
                  <span className="sv3-ic sv3-ic-wa">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.49 2 2 6.49 2 12c0 1.89.53 3.7 1.54 5.28L2 22l4.84-1.5c1.52.83 3.24 1.27 4.99 1.27h.01c5.51 0 10-4.49 10.01-10 0-2.67-1.04-5.18-2.93-7.07z" /></svg>
                  </span>
                  <span className="sv3-pane-label">WhatsApp · Inbox</span>
                  <span className="sv3-pane-count">5 chats</span>
                </div>
                <div className="sv3-rows" ref={rowsRef}>
                  {PEOPLE.map((p, i) => (
                    <div
                      key={p.name}
                      className={`sv3-row${focusIdx === i ? ' focus' : ''}${sentSet.has(i) ? ' sent' : ''}`}
                      data-idx={i}
                    >
                      <div className="sv3-av" style={{ background: p.bg }}>{p.initials}</div>
                      <div className="sv3-row-body">
                        <div className="sv3-row-top"><strong>{p.name}</strong></div>
                        <div className="sv3-row-msg">{p.msg}</div>
                      </div>
                      {i < 2 && <span className="sv3-badge">1</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sv3-wire">
                <span className="sv3-wire-line" />
                <span className={`sv3-pill${pillActive ? ' active' : ''}`}>
                  <span className="sv3-pill-orb" />
                  <span>saving to CRM</span>
                </span>
              </div>

              <div className="sv3-pane">
                <div className="sv3-pane-head">
                  <span className="sv3-ic sv3-ic-crm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF7A59"><circle cx="12" cy="12" r="10"/></svg>
                  </span>
                  <span className="sv3-pane-label">HubSpot · Chat Archive</span>
                  <span className="sv3-synced"><span className="sv3-live-dot" />Live</span>
                </div>
                <div className="sv3-rows sv3-crm-rows" ref={crmRowsRef}>
                  {crmRows.map((p) => (
                    <div key={p.id} className="sv3-row" data-cid={p.id}>
                      <div className="sv3-av" style={{ background: p.bg }}>{p.initials}</div>
                      <div className="sv3-row-body">
                        <div className="sv3-row-top"><strong>{p.name}</strong></div>
                        <div className="sv3-row-msg">{p.msg}</div>
                      </div>
                      <span className="sv3-saved">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
