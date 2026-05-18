'use client'

import { useEffect, useRef, useState } from 'react'

interface Kpi {
  key: 'atrisk' | 'ghosted' | 'ready' | 'pipeline'
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
  cls?: string
  label: string
}

const KPIS: Kpi[] = [
  { key: 'atrisk', target: 12, cls: 'warn', label: 'At Risk' },
  { key: 'ghosted', target: 8, cls: 'alert', label: 'Ghosted >48h' },
  { key: 'ready', target: 5, cls: 'good', label: 'Ready to Close' },
  { key: 'pipeline', target: 2.4, prefix: '$', suffix: 'M', decimals: 1, label: 'Pipeline Value' },
]

const TICK_EVENTS = [
  { kpi: 'atrisk' as const, delta: 1, label: '+1 flagged' },
  { kpi: 'atrisk' as const, delta: -1, label: '-1 resolved' },
  { kpi: 'ghosted' as const, delta: 1, label: '+1 stalled' },
  { kpi: 'ghosted' as const, delta: -1, label: '-1 replied' },
  { kpi: 'ready' as const, delta: 1, label: '+1 hot' },
  { kpi: 'pipeline' as const, delta: 0.1, label: '+$100k' },
  { kpi: 'pipeline' as const, delta: -0.1, label: '-$100k lost' },
]

function fmt(k: Kpi, v: number) {
  return (k.prefix || '') + v.toFixed(k.decimals || 0) + (k.suffix || '')
}

export function AgentRevenue() {
  const dashRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(KPIS.map((k) => [k.key, 0])) as Record<string, number>
  )
  const [tickKey, setTickKey] = useState<string | null>(null)
  const [delta, setDelta] = useState<{ kpi: string; label: string } | null>(null)

  useEffect(() => {
    const dash = dashRef.current
    if (!dash) return
    let initialized = false
    let loopTimer: number | null = null
    let visible = false
    let tickIdx = 0
    const timeouts: number[] = []

    const animateTo = (key: string, to: number, dur: number) => {
      const k = KPIS.find((x) => x.key === key)!
      setValues((prev) => {
        const from = prev[key]
        const start = performance.now()
        const frame = (now: number) => {
          const p = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          const v = from + (to - from) * eased
          setValues((prev2) => ({ ...prev2, [key]: v }))
          if (p < 1) requestAnimationFrame(frame)
          else setValues((prev2) => ({ ...prev2, [key]: to }))
        }
        requestAnimationFrame(frame)
        void k
        return prev
      })
    }

    const initialCountUp = () => {
      if (initialized) return
      initialized = true
      KPIS.forEach((k) => animateTo(k.key, k.target, 1400))
    }

    const runRandomTick = () => {
      const ev = TICK_EVENTS[tickIdx % TICK_EVENTS.length]
      tickIdx = (tickIdx + 1 + Math.floor(Math.random() * 2)) % TICK_EVENTS.length
      const k = KPIS.find((x) => x.key === ev.kpi)!
      setTickKey(ev.kpi)
      setDelta({ kpi: ev.kpi, label: ev.label })
      setValues((prev) => {
        const current = prev[ev.kpi]
        const newVal = Math.max(0, current + ev.delta)
        animateTo(ev.kpi, newVal, 450)
        return prev
      })
      const t1 = window.setTimeout(() => {
        setTickKey(null)
        animateTo(ev.kpi, k.target, 900)
      }, 2200)
      const t2 = window.setTimeout(() => setDelta(null), 1800)
      timeouts.push(t1, t2)
    }

    const start = () => {
      if (loopTimer) return
      initialCountUp()
      loopTimer = window.setInterval(() => { if (visible) runRandomTick() }, 3200)
    }
    const stop = () => {
      if (loopTimer) { clearInterval(loopTimer); loopTimer = null }
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible = e.isIntersecting
          if (visible) start()
          else stop()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(dash)
    return () => { io.disconnect(); stop(); timeouts.forEach((t) => clearTimeout(t)) }
  }, [])

  return (
    <section className="agent">
      <div className="container">
        <div className="agent-inner">
          <div className="agent-copy reveal">
            <span className="sec-tag">Agent 03 · Revenue Agent</span>
            <h3>See Which Deals Are <em>Really Alive</em></h3>
            <p className="lede">Reads WhatsApp + CRM every night. Flags ghosted deals. Scores deal health. Delivers a Weekly Executive Brief.</p>
            <ul className="feat-list">
              {[
                'Ghosted deal detection',
                'Deal health scoring from conversation signals',
                'Nightly CRM updates',
                'At-risk pipeline alerts',
              ].map((t) => (
                <li key={t}>
                  <span className="tick"><svg fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>{t}
                </li>
              ))}
            </ul>
            <a href="https://app.eazybe.com/" target="_blank" rel="noopener noreferrer" className="feat-link">Deploy This Agent →</a>
          </div>
          <div className="visual reveal">
            <div className="dash" ref={dashRef}>
              <div className="dash-head">
                <h5>Executive <em>Brief</em></h5>
                <span>UPDATED JUST NOW</span>
              </div>
              <div className="dash-grid">
                {KPIS.map((k) => (
                  <div
                    key={k.key}
                    className={`dash-cell${k.cls ? ' ' + k.cls : ''}${tickKey === k.key ? ' tick' : ''}`}
                  >
                    <div className="v"><em>{fmt(k, values[k.key])}</em></div>
                    <div className="l">{k.label}</div>
                    <span className={`dash-delta${delta?.kpi === k.key ? ' show' : ''}`}>
                      {delta?.kpi === k.key ? delta.label : ''}
                    </span>
                    {k.key === 'pipeline' && (
                      <div className="dash-spark" aria-hidden>
                        <svg viewBox="0 0 70 24" preserveAspectRatio="none">
                          <path className="line" d="M0,18 L10,14 L20,16 L30,10 L40,12 L50,8 L60,9 L70,5" />
                          <circle className="dot" cx="70" cy="5" r="2" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="dash-bar">
                <div className="dash-bar-head">
                  <span>Pipeline health</span>
                  <strong><em>72%</em></strong>
                </div>
                <div className="dash-bar-track"><div className="dash-bar-fill" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
