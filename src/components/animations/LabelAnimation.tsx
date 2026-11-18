'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EyeOff, Lock, HelpCircle, Snowflake, MessageCircle } from 'lucide-react'

// "Managers are flying blind" problem visual: what a manager sees WITHOUT
// Team Inbox. Colors are inline on purpose — see UnifiedDashboardAnimation.
const C = {
  panel: '#ffffff',
  soft: '#f6f8fb',
  line: '#e4e8ef',
  ink: '#0f172a',
  body: '#334155',
  muted: '#5b6576',
  red: '#b42318',
  redBg: '#fdecea',
  amber: '#b45309',
  amberBg: '#fef3e2',
}

const REPS = [
  { name: 'Priya', color: '#5b4bae', bg: '#efedfb' },
  { name: 'Arjun', color: '#0e7490', bg: '#e3f5f9' },
  { name: 'Neha', color: '#b4235a', bg: '#fbe8f0' },
]

type Copy = {
  title: string
  blind: string
  privateChats: string
  claimsTitle: string
  claims: [string, string, string]
  verdict: string
  unreplied: string
  cold: [string, string, string]
}

// Labels per site locale (en | es | br | tr). claims[i] is said by REPS[i].
const TX: Record<string, Copy> = {
  en: {
    title: 'Manager view', blind: 'No visibility', privateChats: 'Chats on personal phone',
    claimsTitle: 'Rep updates', claims: ['“I followed up with Rahul yesterday”', '“All my leads got a reply”', '“The client asked for a discount”'],
    verdict: "Can't verify", unreplied: 'Unreplied leads',
    cold: ['Ana Souza went cold · 2 days, no reply', 'David Chen went cold · 3 days, no reply', 'Wei Chen went cold · 1 day, no reply'],
  },
  es: {
    title: 'Vista del gerente', blind: 'Sin visibilidad', privateChats: 'Chats en el móvil personal',
    claimsTitle: 'Reportes del equipo', claims: ['“Ayer le di seguimiento a Rahul”', '“Todos mis leads tienen respuesta”', '“El cliente pidió un descuento”'],
    verdict: 'No se puede verificar', unreplied: 'Leads sin responder',
    cold: ['Ana Souza se enfrió · 2 días sin respuesta', 'David Chen se enfrió · 3 días sin respuesta', 'Wei Chen se enfrió · 1 día sin respuesta'],
  },
  br: {
    title: 'Visão do gestor', blind: 'Sem visibilidade', privateChats: 'Conversas no celular pessoal',
    claimsTitle: 'Relatos da equipe', claims: ['“Fiz o follow-up com o Rahul ontem”', '“Todos os meus leads tiveram resposta”', '“O cliente pediu desconto”'],
    verdict: 'Impossível verificar', unreplied: 'Leads sem resposta',
    cold: ['Ana Souza esfriou · 2 dias sem resposta', 'David Chen esfriou · 3 dias sem resposta', 'Wei Chen esfriou · 1 dia sem resposta'],
  },
  tr: {
    title: 'Yönetici görünümü', blind: 'Görünürlük yok', privateChats: 'Sohbetler kişisel telefonda',
    claimsTitle: 'Temsilci bildirimleri', claims: ['“Dün Rahul ile takip görüşmesi yaptım”', '“Tüm lead’lerime yanıt verdim”', '“Müşteri indirim istedi”'],
    verdict: 'Doğrulanamıyor', unreplied: 'Yanıtsız lead’ler',
    cold: ['Ana Souza soğudu · 2 gündür yanıt yok', 'David Chen soğudu · 3 gündür yanıt yok', 'Wei Chen soğudu · 1 gündür yanıt yok'],
  },
}

const STEP_MS = 3200
const UNREPLIED = [7, 9, 12]

const LabelAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setStep((s) => (s + 1) % 3), STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  const rep = REPS[step]

  return (
    <div
      className="fbx relative w-full aspect-[4/3] max-sm:aspect-auto rounded-2xl overflow-hidden flex flex-col"
      style={{ background: C.panel, border: `1px solid ${C.line}`, boxShadow: '0 24px 60px -24px rgba(15,23,42,0.45)', fontFamily: 'var(--f-sans, Inter, system-ui, sans-serif)' }}
    >
      <style>{`
        @media (max-width: 639px) { .fbx { height: 460px } }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '12px 16px', borderBottom: `1px solid ${C.line}` }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 10, background: C.redBg }}>
            <EyeOff style={{ width: 18, height: 18, color: C.red }} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{t.title}</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.red, background: C.redBg, padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{t.blind}</span>
      </div>

      <div className="flex-1 flex flex-col justify-between" style={{ padding: '12px 16px', gap: 12, minHeight: 0 }}>
        {/* Rep phones: chats exist but the manager can't read them */}
        <div className="grid grid-cols-3" style={{ gap: 8 }}>
          {REPS.map((r, i) => (
            <div
              key={r.name}
              className="flex flex-col"
              style={{ gap: 6, padding: 10, borderRadius: 12, background: C.soft, border: `1px solid ${i === step ? r.color : C.line}`, transition: 'border-color .3s' }}
            >
              <div className="flex items-center" style={{ gap: 6 }}>
                <span className="flex items-center justify-center" style={{ width: 24, height: 24, borderRadius: 999, background: r.bg, color: r.color, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {r.name[0]}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.name}</span>
              </div>
              <div className="relative flex flex-col" style={{ gap: 5, padding: '4px 0' }}>
                {[88, 64, 76].map((w, k) => (
                  <span key={k} style={{ height: 8, width: `${w}%`, borderRadius: 4, background: '#cfd6e2', filter: 'blur(1.5px)', alignSelf: k === 1 ? 'flex-end' : 'flex-start' }} />
                ))}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center" style={{ width: 26, height: 26, borderRadius: 999, background: '#fff', border: `1px solid ${C.line}` }}>
                    <Lock style={{ width: 13, height: 13, color: C.muted }} />
                  </span>
                </span>
              </div>
              <span style={{ fontSize: 11, color: C.muted, lineHeight: 1.3 }}>{t.privateChats}</span>
            </div>
          ))}
        </div>

        {/* Rep claim the manager has to take on faith */}
        <div style={{ borderRadius: 12, border: `1px solid ${C.line}`, padding: '10px 12px' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 8 }}>
            <MessageCircle style={{ width: 14, height: 14, color: C.muted }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>{t.claimsTitle}</span>
          </div>
          <div style={{ position: 'relative', minHeight: 54 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="flex flex-col"
                style={{ gap: 6 }}
              >
                <div className="flex items-center" style={{ gap: 8 }}>
                  <span className="flex items-center justify-center" style={{ width: 24, height: 24, borderRadius: 999, background: rep.bg, color: rep.color, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {rep.name[0]}
                  </span>
                  <span style={{ fontSize: 13.5, color: C.ink, fontStyle: 'italic' }}>{t.claims[step]}</span>
                </div>
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.9, duration: reduceMotion ? 0 : 0.3 }}
                  className="flex items-center self-start"
                  style={{ gap: 5, marginLeft: 32, fontSize: 12, fontWeight: 700, color: C.amber, background: C.amberBg, padding: '3px 9px', borderRadius: 999 }}
                >
                  <HelpCircle style={{ width: 13, height: 13 }} />
                  {t.verdict}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Leads slipping away unnoticed */}
        <div className="flex items-stretch" style={{ gap: 8 }}>
          <div className="flex flex-col justify-center" style={{ padding: '8px 12px', borderRadius: 12, background: C.redBg, flexShrink: 0 }}>
            <motion.span
              key={UNREPLIED[step]}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: 22, fontWeight: 800, color: C.red, lineHeight: 1 }}
            >
              {UNREPLIED[step]}
            </motion.span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.red, marginTop: 3 }}>{t.unreplied}</span>
          </div>
          <div className="flex-1 flex items-center" style={{ minWidth: 0, padding: '8px 12px', borderRadius: 12, background: C.soft, border: `1px dashed ${C.line}` }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.4 }}
                className="flex items-center"
                style={{ gap: 6, fontSize: 12.5, color: C.body, minWidth: 0 }}
              >
                <Snowflake style={{ width: 14, height: 14, color: '#2563eb', flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.cold[step]}</span>
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabelAnimation
