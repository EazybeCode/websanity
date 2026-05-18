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

const CONVOS: Convo[] = [
  { name: 'Sara P.', initials: 'SP', color: '#E4E8F1', lang: 'EN', photo: 'https://i.pravatar.cc/96?img=47', msgs: [
    { who: 'user', text: 'Hi, I saw your ad. Interested in your product.' },
    { who: 'bot',  text: "Great to hear! What's your company name and team size?" },
    { who: 'user', text: 'TechCorp, about 50 sales reps.' },
    { who: 'bot',  text: 'Perfect! Using HubSpot or Salesforce?' },
    { who: 'user', text: 'HubSpot. Can we chat tomorrow at 3?' },
    { who: 'bot',  text: 'Booked. Routing you to Priya, top closer for 50-rep teams.' },
  ]},
  { name: 'Marco R.', initials: 'MR', color: '#D4D9E5', lang: 'ES', photo: 'https://i.pravatar.cc/96?img=15', msgs: [
    { who: 'user', text: 'Hola, ¿pueden ayudar a un equipo de 20?' },
    { who: 'bot',  text: '¡Sí! ¿Qué CRM usan actualmente?' },
    { who: 'user', text: 'Pipedrive. Buscamos integración.' },
    { who: 'bot',  text: 'Perfecto. ¿Presupuesto mensual aproximado?' },
    { who: 'user', text: 'Unos $2K. ¿Tienen plan empresarial?' },
    { who: 'bot',  text: 'Sí, te conecto con Luis ahora mismo.' },
  ]},
  { name: 'Aisha K.', initials: 'AK', color: '#ECEFF7', lang: 'HI', photo: 'https://i.pravatar.cc/96?img=44', msgs: [
    { who: 'user', text: 'Namaste, kya aap lead tracking karte hain?' },
    { who: 'bot',  text: 'Haan! Aapki team ka size kya hai?' },
    { who: 'user', text: '12 reps, mostly WhatsApp based.' },
    { who: 'bot',  text: 'Perfect fit. Zoho ya HubSpot use karte ho?' },
    { who: 'user', text: 'Zoho. Demo possible hai aaj?' },
    { who: 'bot',  text: 'Done, Arjun aapko 5 min mein ping karega.' },
  ]},
  { name: 'João S.', initials: 'JS', color: '#D9DFEC', lang: 'PT', photo: 'https://i.pravatar.cc/96?img=12', msgs: [
    { who: 'user', text: 'Oi, vocês atendem e-commerce?' },
    { who: 'bot',  text: 'Sim! Qual plataforma você usa?' },
    { who: 'user', text: 'Shopify + WhatsApp Business.' },
    { who: 'bot',  text: 'Combinação perfeita. Quantos atendentes?' },
    { who: 'user', text: '8 atendentes, 3 turnos.' },
    { who: 'bot',  text: 'Ótimo, te envio a proposta em 2 min.' },
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
            <a href="https://wa.me/1234567890" className="feat-link">{t('cta')}</a>
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
                  <h5>
                    {t('chatTitle')}
                    <span className="lqa-wa-chip">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.49 2 2 6.49 2 12c0 1.89.53 3.7 1.54 5.28L2 22l4.84-1.5c1.52.83 3.24 1.27 4.99 1.27h.01c5.51 0 10-4.49 10.01-10 0-2.67-1.04-5.18-2.93-7.07z"/></svg>
                      WhatsApp
                    </span>
                  </h5>
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
                      <span className="sm-av sm-av-user" style={{ background: convo.color }}><img src={convo.photo} alt="" /></span>
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
