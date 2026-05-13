'use client'

import { useEffect, useRef } from 'react'

const CYCLE_MS = 7000

export function Problem() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || !('IntersectionObserver' in window)) return
    const cards = grid.querySelectorAll<HTMLElement>('.p-card')
    let visible = false
    let loopTimer: number | null = null
    const fire = () => {
      if (!visible) return
      cards.forEach((c) => c.classList.remove('in-view'))
      requestAnimationFrame(() =>
        requestAnimationFrame(() => cards.forEach((c) => c.classList.add('in-view')))
      )
    }
    const start = () => {
      if (loopTimer) return
      fire()
      loopTimer = window.setInterval(fire, CYCLE_MS)
    }
    const stop = () => {
      if (loopTimer) {
        clearInterval(loopTimer)
        loopTimer = null
      }
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
    io.observe(grid)
    return () => { io.disconnect(); stop() }
  }, [])

  return (
    <section className="problem">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">The problem</span>
          <h2>Selling on WhatsApp Is Easy. <em>Everything Around It Is Broken.</em></h2>
        </div>
        <div className="problem-grid" ref={gridRef}>
          <div className="p-card reveal">
            <div className="idx">01 · CRM Sync Agent</div>
            <h3>200 chats today. <em>Zero in the CRM.</em></h3>
            <p>Reps sell all day. Nothing&apos;s logged. No handoff. No trail.</p>
            <div className="p-visual">
              <div className="scene-crm">
                <div className="crm-head">
                  <span><span className="dot" />crm / deals / acme-co</span>
                  <span>Q4</span>
                </div>
                <div className="crm-rows">
                  <div className="crm-row" />
                  <div className="crm-row" />
                  <div className="crm-row" />
                  <div className="crm-row" />
                  <div className="crm-empty">No activity logged</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-card reveal" style={{ transitionDelay: '.1s' }}>
            <div className="idx">02 · Lead Qualification Agent</div>
            <h3>11 PM lead. <em>By morning, gone.</em></h3>
            <p>Nobody answers after hours. You lose them every night.</p>
            <div className="p-visual">
              <div className="scene-chat">
                <div className="chat-bubble them">Hey! Still taking new clients?</div>
                <div className="chat-bubble time">11:47 PM</div>
                <div className="chat-bubble you"><span className="typing-dots"><span /><span /><span /></span></div>
                <div className="chat-competitor">
                  <span className="x">⏳</span>
                  <span>competitor replied 6:12 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-card reveal" style={{ transitionDelay: '.2s' }}>
            <div className="idx">03 · Revenue Agent</div>
            <h3>Deals ghosted. <em>Nobody noticed.</em></h3>
            <p>Warm deals stall for weeks in silent threads. Revenue dies quiet.</p>
            <div className="p-visual">
              <div className="scene-buried">
                <div className="buried-chart">
                  <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                    <path className="area" d="M0,15 L15,18 L30,28 L45,32 L60,42 L75,48 L100,55 L100,60 L0,60 Z" />
                    <path className="line" d="M0,15 L15,18 L30,28 L45,32 L60,42 L75,48 L100,55" />
                    <circle className="dot" cx="0" cy="15" r="1.8" />
                    <circle className="dot" cx="30" cy="28" r="1.8" />
                    <circle className="dot" cx="60" cy="42" r="1.8" />
                    <circle className="dot" cx="100" cy="55" r="1.8" />
                    <text className="label" x="100" y="9" textAnchor="end">pipeline ↓</text>
                  </svg>
                </div>
                <div className="buried-label">15 threads · 0 synced</div>
                <div className="buried-stack">
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                  <div className="buried-row" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-card reveal" style={{ transitionDelay: '.3s' }}>
            <div className="idx">04 · Customer Success Agent</div>
            <h3>Customers ping. <em>Support sleeps.</em></h3>
            <p>Same questions, every day. No one picks up until Monday.</p>
            <div className="p-visual">
              <div className="scene-chat">
                <div className="chat-bubble them">How do I reset my password?</div>
                <div className="chat-bubble them">Still waiting…</div>
                <div className="chat-bubble time">Saturday 11 PM</div>
                <div className="chat-competitor">
                  <span className="x">⏳</span>
                  <span>12 tickets unread since Friday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="problem-foot reveal">Each blind spot has an <span>agent</span> that fixes it. ↓</p>

        <div className="steps-cta">
          <div className="steps-cta-line">
            <span className="steps-cta-check" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#7CC576" aria-hidden="true">
                <path d="M12 1.5l2.3 1.7 2.8-.3 1 2.7 2.7 1L20.5 9l1.7 2.3-1.7 2.3.3 2.8-2.7 1-1 2.7-2.8-.3L12 21.5l-2.3-1.7-2.8.3-1-2.7-2.7-1 .3-2.8L1.8 11.3 3.5 9l-.3-2.8 2.7-1 1-2.7 2.8.3L12 1.5z" />
                <path d="M7.5 12.2l3 3 6-6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Custom AI agents, trained on your best reps, ready to take over today.</span>
          </div>
          <a href="#agents" className="steps-cta-btn">Meet the Agents</a>
        </div>
      </div>
    </section>
  )
}
