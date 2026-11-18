'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Inbox, Search, CheckCheck, Clock3 } from 'lucide-react'

// Colors are inline on purpose: `.landing .text-slate-*` utilities are remapped
// to the --ink tokens, which flip to near-white inside data-tone="dark"
// sections and made this light panel unreadable.
const C = {
  panel: '#ffffff',
  soft: '#f6f8fb',
  line: '#e4e8ef',
  ink: '#0f172a',
  body: '#334155',
  muted: '#5b6576',
  green: '#128c4b',
  greenBg: '#e8f7ee',
  amber: '#b45309',
  amberBg: '#fef3e2',
  violet: '#5b4bae',
  mark: '#fde68a',
}

type Row = { name: string; rep: number; replied: boolean; wait?: string; time: string; unread?: number }

// Same five chats in every locale; only the copy changes.
const ROWS: Row[] = [
  { name: 'Rahul Mehta', rep: 0, replied: false, wait: '2m', time: '10:42', unread: 2 },
  { name: 'Ana Souza', rep: 1, replied: true, time: '10:38' },
  { name: 'Lucía Gómez', rep: 2, replied: false, wait: '14m', time: '10:27' },
  { name: 'Emre Kaya', rep: 0, replied: true, time: '10:15' },
  { name: 'David Chen', rep: 1, replied: true, time: '09:58' },
]
const REPS = [
  { name: 'Priya', color: '#5b4bae', bg: '#efedfb' },
  { name: 'Arjun', color: '#0e7490', bg: '#e3f5f9' },
  { name: 'Neha', color: '#b4235a', bg: '#fbe8f0' },
]

type Copy = {
  title: string
  sub: string
  live: string
  search: string
  query: string
  all: string
  rep: string
  unreplied: string
  replied: string
  msgs: [string, string, string, string, string]
}

// Labels per site locale (en | es | br | tr). `query` must appear in msgs[2] and msgs[4].
const TX: Record<string, Copy> = {
  en: {
    title: 'Team Inbox', sub: '4 numbers · 3 reps', live: 'Live', search: 'Search all chats', query: 'contract',
    all: 'All', rep: 'Rep', unreplied: 'Unreplied', replied: 'Replied',
    msgs: ['Can you share pricing for 20 seats?', 'Tuesday works for the demo, thanks!', 'Still waiting on the contract draft', 'Does it work with HubSpot?', 'I will sign the contract today'],
  },
  es: {
    title: 'Team Inbox', sub: '4 números · 3 agentes', live: 'En vivo', search: 'Buscar en todos los chats', query: 'contrato',
    all: 'Todos', rep: 'Agente', unreplied: 'Sin responder', replied: 'Respondido',
    msgs: ['¿Me pasas el precio para 20 usuarios?', 'El martes me va bien para la demo', 'Sigo esperando el borrador del contrato', '¿Funciona con HubSpot?', 'Hoy firmo el contrato'],
  },
  br: {
    title: 'Team Inbox', sub: '4 números · 3 vendedores', live: 'Ao vivo', search: 'Buscar em todas as conversas', query: 'contrato',
    all: 'Todas', rep: 'Vendedor', unreplied: 'Sem resposta', replied: 'Respondida',
    msgs: ['Pode me passar o preço para 20 usuários?', 'Terça funciona para a demo, obrigado!', 'Ainda aguardo a minuta do contrato', 'Funciona com o HubSpot?', 'Vou assinar o contrato hoje'],
  },
  tr: {
    title: 'Team Inbox', sub: '4 numara · 3 temsilci', live: 'Canlı', search: 'Tüm sohbetlerde ara', query: 'sözleşme',
    all: 'Tümü', rep: 'Temsilci', unreplied: 'Yanıtsız', replied: 'Yanıtlandı',
    msgs: ['20 kullanıcı için fiyat paylaşır mısınız?', 'Demo için salı uygun, teşekkürler!', 'Hâlâ sözleşme taslağını bekliyorum', 'HubSpot ile çalışıyor mu?', 'Sözleşmeyi bugün imzalıyorum'],
  },
}

// 0 = all chats (live update), 1 = filter by rep, 2 = unreplied, 3 = search
const SCENES = 4
const SCENE_MS = 3600

const UnifiedDashboardAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  const [scene, setScene] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setScene((s) => (s + 1) % SCENES)
      setChars(0)
    }, SCENE_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  // Type the search query out during the search scene.
  useEffect(() => {
    if (scene !== 3) return
    const id = setInterval(() => setChars((c) => Math.min(c + 1, t.query.length)), 90)
    return () => clearInterval(id)
  }, [scene, t.query])

  const typed = scene === 3 ? t.query.slice(0, chars) : ''
  const searching = scene === 3 && typed.length === t.query.length
  const visible = ROWS.map((r, i) => ({ ...r, i })).filter((r) => {
    if (scene === 1) return r.rep === 0
    if (scene === 2) return !r.replied
    if (scene === 3) return !searching || t.msgs[r.i].toLowerCase().includes(t.query.toLowerCase())
    return true
  })

  const chips = [
    { key: 0, label: t.all },
    { key: 1, label: `${t.rep}: ${REPS[0].name}` },
    { key: 2, label: t.unreplied },
  ]

  const highlight = (text: string) => {
    if (!searching) return text
    const at = text.toLowerCase().indexOf(t.query.toLowerCase())
    if (at < 0) return text
    return (
      <>
        {text.slice(0, at)}
        <mark style={{ background: C.mark, color: C.ink, borderRadius: 3, padding: '0 2px' }}>{text.slice(at, at + t.query.length)}</mark>
        {text.slice(at + t.query.length)}
      </>
    )
  }

  return (
    <div
      className="udx relative w-full aspect-[4/3] max-sm:aspect-auto rounded-2xl overflow-hidden flex flex-col"
      style={{ background: C.panel, border: `1px solid ${C.line}`, boxShadow: '0 24px 60px -24px rgba(15,23,42,0.45)', fontFamily: 'var(--f-sans, Inter, system-ui, sans-serif)' }}
    >
      <style>{`
        @keyframes udx-pulse { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
        @keyframes udx-caret { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
        .udx .udx-dot { animation: udx-pulse 1.6s ease-in-out infinite }
        .udx .udx-caret { animation: udx-caret 1s step-end infinite }
        @media (prefers-reduced-motion: reduce) { .udx .udx-dot, .udx .udx-caret { animation: none } }
        @media (max-width: 639px) { .udx { height: 456px } }
        @media (max-width: 420px) { .udx .udx-hide-sm { display: none !important } }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '12px 16px', borderBottom: `1px solid ${C.line}` }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 10, background: C.greenBg }}>
            <Inbox style={{ width: 18, height: 18, color: C.green }} />
          </div>
          <div className="flex flex-col" style={{ lineHeight: 1.2 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{t.title}</span>
            <span style={{ fontSize: 12, color: C.muted }}>{t.sub}</span>
          </div>
        </div>
        <div className="flex items-center" style={{ gap: 6, padding: '4px 10px', borderRadius: 999, background: C.greenBg }}>
          <span className="udx-dot" style={{ width: 7, height: 7, borderRadius: 999, background: C.green }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>{t.live}</span>
        </div>
      </div>

      {/* Search + filters */}
      <div style={{ padding: '10px 16px 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          className="flex items-center"
          style={{ gap: 8, padding: '7px 10px', borderRadius: 10, background: C.soft, border: `1px solid ${scene === 3 ? C.violet : C.line}`, transition: 'border-color .3s' }}
        >
          <Search style={{ width: 15, height: 15, color: C.muted, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: typed ? C.ink : C.muted, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {typed || t.search}
          </span>
          {scene === 3 && <span className="udx-caret" style={{ width: 1.5, height: 15, background: C.violet, marginLeft: -6 }} />}
        </div>
        <div className="flex flex-wrap" style={{ gap: 6 }}>
          {chips.map((c) => {
            const on = scene === c.key || (c.key === 0 && scene === 3)
            return (
              <span
                key={c.key}
                style={{
                  fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999,
                  color: on ? '#fff' : C.body, background: on ? C.violet : C.soft,
                  border: `1px solid ${on ? C.violet : C.line}`, transition: 'all .3s',
                }}
              >
                {c.label}
              </span>
            )
          })}
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-hidden" style={{ padding: '2px 10px 10px' }}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((r) => {
            const rep = REPS[r.rep]
            const fresh = scene === 0 && r.i === 0
            return (
              <motion.div
                key={r.name}
                layout={!reduceMotion}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0, backgroundColor: fresh ? '#f1fbf5' : 'rgba(255,255,255,0)' }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
                className="flex items-center"
                style={{ gap: 10, padding: '8px 6px', borderRadius: 10, borderBottom: `1px solid ${C.line}` }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ width: 34, height: 34, borderRadius: 999, background: C.soft, border: `1px solid ${C.line}`, fontSize: 12, fontWeight: 700, color: C.body, flexShrink: 0 }}
                >
                  {r.name.split(' ').map((p) => p[0]).join('')}
                </div>
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{r.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 999, color: rep.color, background: rep.bg, whiteSpace: 'nowrap' }}>
                      {rep.name}
                    </span>
                  </div>
                  <div style={{ fontSize: 12.5, color: C.body, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                    {highlight(t.msgs[r.i])}
                  </div>
                </div>
                <div className="flex flex-col items-end" style={{ gap: 4, flexShrink: 0 }}>
                  <span className="udx-hide-sm" style={{ fontSize: 11, color: C.muted }}>{r.time}</span>
                  {r.replied ? (
                    <span className="flex items-center" style={{ gap: 3, fontSize: 11, fontWeight: 600, color: C.green }}>
                      <CheckCheck style={{ width: 13, height: 13 }} />
                      <span className="udx-hide-sm">{t.replied}</span>
                    </span>
                  ) : (
                    <span className="flex items-center" style={{ gap: 3, fontSize: 11, fontWeight: 600, color: C.amber, background: C.amberBg, padding: '1px 6px', borderRadius: 999 }}>
                      <Clock3 style={{ width: 12, height: 12 }} />
                      {r.wait}
                    </span>
                  )}
                </div>
                {r.unread && fresh ? (
                  <span
                    className="flex items-center justify-center"
                    style={{ minWidth: 18, height: 18, borderRadius: 999, background: C.green, color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}
                  >
                    {r.unread}
                  </span>
                ) : null}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default UnifiedDashboardAnimation
