'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Interactive pieces for /whatsapp-ai-agent, in the page's brand style.
 * They respect prefers-reduced-motion (no auto-advance) and are fully
 * keyboard operable.
 */

/**
 * A short muted product clip used like a GIF (5-10x lighter than one). Shows
 * only the poster until the clip nears the viewport, then loads and loops it.
 * With prefers-reduced-motion it stays on the poster.
 */
export function LazyVideo({
  webm,
  mp4,
  poster,
  width,
  height,
  label,
  className,
}: {
  webm: string
  mp4: string
  poster: string
  width: number
  height: number
  label: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!load || !ref.current) return
    ref.current.load()
    ref.current.play().catch(() => {})
  }, [load])

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      {load && <source src={webm} type="video/webm" />}
      {load && <source src={mp4} type="video/mp4" />}
    </video>
  )
}

/**
 * Mobile-only "show the rest" for the FAQ: below 860px the second column is
 * hidden until the button is pressed. Desktop never shows the button. All
 * items stay in the HTML either way.
 */
export function MobileMore({ more, less, children }: { more: string; less: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`aia-mmore${open ? ' is-open' : ''}`}>
      <div id="aia-mmore-body">{children}</div>
      <button type="button" className="aia-more-btn aia-mmore-btn" aria-expanded={open} aria-controls="aia-mmore-body" onClick={() => setOpen((o) => !o)}>
        {open ? less : more}
        <span aria-hidden="true" className="aia-more-arrow">↓</span>
      </button>
    </div>
  )
}

/**
 * Long-form copy that shows a faded preview until expanded. The children are
 * server-rendered and always in the HTML (crawlers read all of it); only the
 * visible height changes.
 */
export function ReadMoreFade({
  more,
  less,
  children,
}: {
  more: string
  less: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    // Collapsing from far down the text: bring the start of the section back into view.
    if (open && bodyRef.current && bodyRef.current.getBoundingClientRect().top < 0) {
      bodyRef.current.scrollIntoView({ block: 'start' })
    }
    setOpen((o) => !o)
  }

  return (
    <div className="aia-more">
      <div ref={bodyRef} id="aia-more-body" className={`aia-more-body${open ? ' is-open' : ''}`}>
        {children}
      </div>
      <button type="button" className="aia-more-btn" aria-expanded={open} aria-controls="aia-more-body" onClick={toggle}>
        {open ? less : more}
        <span aria-hidden="true" className="aia-more-arrow">↓</span>
      </button>
    </div>
  )
}

function useReducedMotion() {
  const reduced = useRef(false)
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  return reduced
}

/** Setup steps: auto-advancing glass cards with a progress bar. */
export function SetupSteps({ steps }: { steps: { title: string; desc: string }[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (paused || reduced.current) return
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3500)
    return () => clearInterval(id)
  }, [paused, steps.length, active])

  return (
    <div
      className="aia-steps"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {steps.map((s, i) => {
        const isActive = i === active
        const isDone = i < active
        return (
          <button
            key={s.title}
            type="button"
            className={`card aia-step-btn${isActive ? ' is-active' : ''}`}
            aria-current={isActive ? 'step' : undefined}
            onClick={() => setActive(i)}
          >
            <div className={`aia-step-n${isDone ? ' is-done' : ''}`}>
              {isDone ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                i + 1
              )}
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="aia-step-bar" aria-hidden="true">
              {isActive && !reduced.current && (
                <span key={active} style={paused ? { animationPlayState: 'paused' } : undefined} />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

/** Use-case tabs: glass segmented control revealing one pane at a time. */
export function FitsTabs({ cards }: { cards: { title: string; desc: string }[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (paused || reduced.current) return
    const id = setInterval(() => setActive((a) => (a + 1) % cards.length), 5000)
    return () => clearInterval(id)
  }, [paused, cards.length, active])

  return (
    <div
      className="aia-fits"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="aia-fits-tabs" role="tablist">
        {cards.map((c, i) => (
          <button
            key={c.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`aia-fits-tab${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="card aia-fits-pane" role="tabpanel">
        {/* Every pane is rendered so all use cases are in the server HTML
            (crawlers and AI answers read them); inactive ones are hidden. */}
        {cards.map((c, i) => (
          <div key={c.title} className="aia-fits-body" hidden={i !== active}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
        <div className="aia-fits-dots" aria-hidden="true">
          {cards.map((_, i) => (
            <span key={i} className={i === active ? 'is-active' : undefined} />
          ))}
        </div>
      </div>
    </div>
  )
}
