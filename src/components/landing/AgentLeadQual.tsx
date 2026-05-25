'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

interface Convo {
  name: string
  initials: string
  color: string
  lang: string
  photo: string
  msgs: { who: 'user' | 'bot'; text: string }[]
}

// Each conversation is hardcoded in the lead's native language (the rest of
// the page is i18n'd, but these chat bubbles stay constant — they're a demo
// of the agent scoring intent in real time). Two are high-intent buyers
// (HOT — routed + added to retargeting), two are curious tire-kickers
// (COLD — skipped, ad-spend reclaimed). This mix makes the section's "every
// bit of ad spend, going to real buyers only" claim demonstrable.
const CONVOS: Convo[] = [
  { name: 'Sara P.', initials: 'SP', color: '#E4E8F1', lang: 'EN', photo: 'https://i.pravatar.cc/96?img=47', msgs: [
    { who: 'user', text: 'Saw your ad. Need this for our 50-rep team. Budget approved.' },
    { who: 'bot',  text: 'Hot signal — budget + team fit confirmed.' },
    { who: 'user', text: 'Need it live by end of month. Send the demo link.' },
    { who: 'bot',  text: '✓ Score 94 · routed to AE · added to high-intent ad audience.' },
  ]},
  { name: 'Liam W.', initials: 'LW', color: '#F0EBF8', lang: 'EN', photo: 'https://i.pravatar.cc/96?img=68', msgs: [
    { who: 'user', text: 'Just browsing. Curious how this works.' },
    { who: 'bot',  text: 'Sure. What are you trying to solve, and how many people on your team?' },
    { who: 'user', text: 'Solo founder, no team yet. Maybe in 6 months.' },
    { who: 'bot',  text: '✗ Score 18 · not buying now · skipped retargeting · $42 ad budget reclaimed.' },
  ]},
  { name: 'Marco R.', initials: 'MR', color: '#D4D9E5', lang: 'ES', photo: 'https://i.pravatar.cc/96?img=15', msgs: [
    { who: 'user', text: 'Equipo de 20 en Pipedrive. Presupuesto $3K/mes aprobado.' },
    { who: 'bot',  text: 'Señales de compra claras. ¿Cuándo lo necesitas?' },
    { who: 'user', text: 'Esta semana. Envíame la demo.' },
    { who: 'bot',  text: '✓ Score 91 · ruteado a Luis · agregado a audiencia de alta intención.' },
  ]},
  { name: 'Aanya R.', initials: 'AR', color: '#ECEFF7', lang: 'HI', photo: 'https://i.pravatar.cc/96?img=44', msgs: [
    { who: 'user', text: 'College assignment ke liye research kar rahi hoon.' },
    { who: 'bot',  text: 'No problem. Buy karne ka plan hai abhi?' },
    { who: 'user', text: 'Nahi, sirf project ke liye.' },
    { who: 'bot',  text: '✗ Score 9 · student research · retarget skipped · $38 ad budget saved.' },
  ]},
]

interface Message {
  who: 'user' | 'bot'
  text: string
  typing?: boolean
  key: number
}

const BotAvatar = (
  <span className="sm-av sm-av-bot">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 3v4" />
      <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9 16.5h6" />
      <path d="M2 12v2M22 12v2" />
    </svg>
  </span>
)

const TickIcon = (
  <span className="lqa-ticks">
    <svg width="12" height="8" viewBox="0 0 16 11" fill="none">
      <path d="M1 5.5 L5 9.5 L10 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 5.5 L9.5 9.5 L14.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

const MAX_VISIBLE = 4

export function AgentLeadQual() {
  const t = useTranslations('landingV3.agentLeadQual')
  const features = t.raw('features') as string[]
  const bodyRef = useRef<HTMLDivElement>(null)
  const [convo, setConvo] = useState<Convo>(CONVOS[0])
  const [convoSwap, setConvoSwap] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [count, setCount] = useState(2847)
  const runningRef = useRef(false)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return

    const clearAll = () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []
    }
    const wait = (ms: number) => new Promise<void>((resolve) => {
      const id = window.setTimeout(() => resolve(), ms)
      timeoutsRef.current.push(id)
    })

    let convoIdx = 0
    let keyCounter = 0

    const playConvo = async (c: Convo) => {
      if (!runningRef.current) return
      setConvoSwap(true)
      await wait(250)
      if (!runningRef.current) return
      setConvo(c)
      setConvoSwap(false)
      setMessages([])
      await wait(500)

      for (const msg of c.msgs) {
        if (!runningRef.current) return
        if (msg.who === 'bot') {
          const typingKey = keyCounter++
          setMessages((prev) => trim([...prev, { who: 'bot', text: '', typing: true, key: typingKey }]))
          await wait(900)
          if (!runningRef.current) return
          setMessages((prev) => trim([...prev.filter((m) => m.key !== typingKey), { who: 'bot', text: msg.text, key: keyCounter++ }]))
          setCount((n) => n + 1)
          await wait(600)
        } else {
          setMessages((prev) => trim([...prev, { who: 'user', text: msg.text, key: keyCounter++ }]))
          await wait(800)
        }
      }
      await wait(900)
      if (!runningRef.current) return
      convoIdx = (convoIdx + 1) % CONVOS.length
      playConvo(CONVOS[convoIdx])
    }

    const trim = (arr: Message[]): Message[] => arr.slice(Math.max(0, arr.length - MAX_VISIBLE))

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !runningRef.current) {
            runningRef.current = true
            playConvo(CONVOS[0])
          } else if (!e.isIntersecting) {
            runningRef.current = false
            clearAll()
          }
        }
      },
      { threshold: 0.2 }
    )
    io.observe(body)
    return () => { io.disconnect(); runningRef.current = false; clearAll() }
  }, [])

  return (
    <section className="agent reverse" data-tone="dark">
      <div className="container">
        <div className="agent-inner">
          <div className="agent-copy reveal">
            <span className="sec-tag">{t('tag')}</span>
            <h3>{t('headline')} <em>{t('headlineEm')}</em></h3>
            <p className="lede">{t('lede')}</p>
            <ul className="feat-list">
              {features.map((it) => (
                <li key={it}>
                  <span className="tick"><svg fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>{it}
                </li>
              ))}
            </ul>
            <a href="#bea-form" className="feat-link" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('eazybe:open-bea-form')) }}>{t('cta')}</a>
          </div>

          <div className="visual reveal">
            <div className="chat lqa-chat">
              <div className="chat-head lqa-head">
                <div className="av lqa-av">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="7" width="16" height="12" rx="3" />
                    <path d="M12 3v4" />
                    <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
                    <path d="M9 16.5h6" />
                    <path d="M2 12v2M22 12v2" />
                  </svg>
                  <span className="lqa-av-ring" />
                </div>
                <div className="info lqa-info">
                  <h4>
                    {t('chatTitle')}
                    <span className="lqa-wa-chip">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.49 2 2 6.49 2 12c0 1.89.53 3.7 1.54 5.28L2 22l4.84-1.5c1.52.83 3.24 1.27 4.99 1.27h.01c5.51 0 10-4.49 10.01-10 0-2.67-1.04-5.18-2.93-7.07z"/></svg>
                      WhatsApp
                    </span>
                  </h4>
                  <p>
                    <span className="lqa-live-dot" />
                    {t('live')}
                    <span className={`lqa-now${convoSwap ? ' swap' : ''}`}>{t('chattingWith', { name: convo.name })}</span>
                  </p>
                </div>
                <div className={`lqa-lang${convoSwap ? ' swap' : ''}`}>{convo.lang}</div>
              </div>

              <div className="chat-body lqa-body" ref={bodyRef}>
                {messages.map((m) => (
                  <div key={m.key} className={`msg${m.who === 'bot' ? ' ai' : ''}`}>
                    {m.who === 'bot' ? BotAvatar : (
                      <span className="sm-av sm-av-user" style={{ background: convo.color }}><img src={convo.photo} alt={`WhatsApp lead ${convo.name} chatting with Eazybe AI agent`} loading="lazy"/></span>
                    )}
                    <div className="bub">
                      {m.typing ? (
                        <span className="typing"><span /><span /><span /></span>
                      ) : (
                        <>{m.text}{m.who === 'user' && TickIcon}</>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lqa-footer">
                <div className="lqa-train">
                  <div className="lqa-train-label">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    <span>{t('training', { count: count.toLocaleString('en-US') })}</span>
                  </div>
                  <div className="lqa-train-bar"><span /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
