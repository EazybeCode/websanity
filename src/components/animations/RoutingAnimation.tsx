'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Shuffle, MapPin, RefreshCw, UserCheck, CheckCircle2, Loader2 } from 'lucide-react'

// Colors are inline on purpose — see UnifiedDashboardAnimation for why
// (`.landing .text-slate-*` utilities are remapped per section tone).
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
  violet: '#5b4bae',
  violetBg: '#efedfb',
}

const REPS = [
  { name: 'Ana', team: 'LATAM', away: false, load: 4, color: '#5b4bae', bg: '#efedfb' },
  { name: 'Arjun', team: 'APAC', away: false, load: 5, color: '#0e7490', bg: '#e3f5f9' },
  { name: 'Neha', team: 'APAC', away: true, load: 3, color: '#b4235a', bg: '#fbe8f0' },
]

// Each lead is decided by one rule (index into rules) and lands with one rep.
const LEADS = [
  { name: 'Lucas Oliveira', rule: 0, rep: 0, secs: 2 },
  { name: 'Wei Chen', rule: 1, rep: 1, secs: 3 },
  { name: 'Ravi Kumar', rule: 2, rep: 1, secs: 2 },
]

type Copy = {
  title: string
  sub: string
  on: string
  now: string
  rules: [string, string, string]
  reasons: [string, string, string]
  countries: [string, string, string]
  msgs: [string, string, string]
  online: string
  away: string
  chats: string
  routing: string
  assigned: (rep: string, s: number) => string
}

// Labels per site locale (en | es | br | tr).
const TX: Record<string, Copy> = {
  en: {
    title: 'Auto-routing', sub: '3 rules active', on: 'On', now: 'now',
    rules: ['Territory', 'Round-robin', 'Availability'],
    reasons: ['Brazil → LATAM team', 'Next in turn: Arjun', 'Neha is away, skipped'],
    countries: ['Brazil', 'Singapore', 'India'],
    msgs: ['I need a quote for 15 users', 'Do you offer an annual plan?', 'Can someone call me today?'],
    online: 'Online', away: 'Away', chats: 'chats', routing: 'Routing new lead…',
    assigned: (rep, s) => `Assigned to ${rep} in ${s}s`,
  },
  es: {
    title: 'Asignación automática', sub: '3 reglas activas', on: 'Activa', now: 'ahora',
    rules: ['Territorio', 'Round-robin', 'Disponibilidad'],
    reasons: ['Brasil → equipo LATAM', 'Siguiente turno: Arjun', 'Neha está ausente, se omite'],
    countries: ['Brasil', 'Singapur', 'India'],
    msgs: ['Necesito una cotización para 15 usuarios', '¿Tienen plan anual?', '¿Alguien me puede llamar hoy?'],
    online: 'En línea', away: 'Ausente', chats: 'chats', routing: 'Asignando nuevo lead…',
    assigned: (rep, s) => `Asignado a ${rep} en ${s} s`,
  },
  br: {
    title: 'Distribuição automática', sub: '3 regras ativas', on: 'Ativa', now: 'agora',
    rules: ['Território', 'Rodízio', 'Disponibilidade'],
    reasons: ['Brasil → equipe LATAM', 'Próximo da vez: Arjun', 'Neha está ausente, pulada'],
    countries: ['Brasil', 'Singapura', 'Índia'],
    msgs: ['Preciso de um orçamento para 15 usuários', 'Vocês têm plano anual?', 'Alguém pode me ligar hoje?'],
    online: 'Online', away: 'Ausente', chats: 'conversas', routing: 'Distribuindo novo lead…',
    assigned: (rep, s) => `Atribuído a ${rep} em ${s} s`,
  },
  tr: {
    title: 'Otomatik yönlendirme', sub: '3 kural aktif', on: 'Açık', now: 'şimdi',
    rules: ['Bölge', 'Sırayla dağıtım', 'Müsaitlik'],
    reasons: ['Brezilya → LATAM ekibi', 'Sıradaki: Arjun', 'Neha uzakta, atlandı'],
    countries: ['Brezilya', 'Singapur', 'Hindistan'],
    msgs: ['15 kullanıcı için teklif istiyorum', 'Yıllık planınız var mı?', 'Bugün biri beni arayabilir mi?'],
    online: 'Çevrimiçi', away: 'Uzakta', chats: 'sohbet', routing: 'Yeni lead yönlendiriliyor…',
    assigned: (rep, s) => `${s} sn içinde ${rep}${rep === 'Arjun' ? "'a" : "'ya"} atandı`,
  },
}

const RULE_ICONS = [MapPin, RefreshCw, UserCheck]
const STAGE_MS = 1300 // per stage: 0 arrives, 1 rule decides, 2 assigned

const RoutingAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(2)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setStep((s) => (s + 1) % (LEADS.length * 3)), STAGE_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  const leadIdx = Math.floor(step / 3)
  const stage = step % 3
  const lead = LEADS[leadIdx]
  const done = stage === 2

  // Chats per rep: base load plus every lead already handed out this cycle.
  const loads = REPS.map((r, i) =>
    r.load + LEADS.filter((l, li) => l.rep === i && (li < leadIdx || (li === leadIdx && done))).length,
  )

  return (
    <div
      className="rtx relative w-full aspect-[4/3] max-sm:aspect-auto rounded-2xl overflow-hidden flex flex-col"
      style={{ background: C.panel, border: `1px solid ${C.line}`, boxShadow: '0 24px 60px -24px rgba(15,23,42,0.45)', fontFamily: 'var(--f-sans, Inter, system-ui, sans-serif)' }}
    >
      <style>{`
        @keyframes rtx-spin { to { transform: rotate(360deg) } }
        .rtx .rtx-spin { animation: rtx-spin 1s linear infinite }
        @media (prefers-reduced-motion: reduce) { .rtx .rtx-spin { animation: none } }
        @media (max-width: 639px) { .rtx { height: 470px } }
        @media (max-width: 420px) { .rtx .rtx-hide-sm { display: none !important } }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '12px 16px', borderBottom: `1px solid ${C.line}` }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 10, background: C.violetBg }}>
            <Shuffle style={{ width: 18, height: 18, color: C.violet }} />
          </div>
          <div className="flex flex-col" style={{ lineHeight: 1.2 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{t.title}</span>
            <span style={{ fontSize: 12, color: C.muted }}>{t.sub}</span>
          </div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.green, background: C.greenBg, padding: '4px 10px', borderRadius: 999 }}>{t.on}</span>
      </div>

      <div className="flex-1 flex flex-col" style={{ padding: '12px 16px', gap: 10, minHeight: 0 }}>
        {/* Incoming lead */}
        <div style={{ position: 'relative', height: 58 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={leadIdx}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="flex items-center"
              style={{ position: 'absolute', inset: 0, gap: 10, padding: '8px 10px', borderRadius: 12, background: C.soft, border: `1px solid ${done ? C.line : C.violet}`, transition: 'border-color .3s' }}
            >
              <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 999, background: '#fff', border: `1px solid ${C.line}`, fontSize: 12, fontWeight: 700, color: C.body, flexShrink: 0 }}>
                {lead.name.split(' ').map((p) => p[0]).join('')}
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <div className="flex items-center" style={{ gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{lead.name}</span>
                  <span style={{ fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>· {t.countries[leadIdx]}</span>
                </div>
                <div style={{ fontSize: 12.5, color: C.body, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{t.msgs[leadIdx]}</div>
              </div>
              <span className="rtx-hide-sm" style={{ fontSize: 11, color: C.muted, flexShrink: 0 }}>{t.now}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rules */}
        <div className="flex flex-col" style={{ gap: 6 }}>
          {t.rules.map((rule, i) => {
            const Icon = RULE_ICONS[i]
            const on = stage >= 1 && lead.rule === i
            return (
              <div
                key={rule}
                className="flex items-center"
                style={{
                  gap: 10, padding: '7px 10px', borderRadius: 10,
                  background: on ? C.violetBg : 'transparent', border: `1px solid ${on ? C.violet : C.line}`,
                  transition: 'all .3s',
                }}
              >
                <Icon style={{ width: 15, height: 15, color: on ? C.violet : C.muted, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: on ? C.violet : C.body, whiteSpace: 'nowrap' }}>{rule}</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: C.violet, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: on ? 1 : 0, transition: 'opacity .3s' }}>
                  {t.reasons[i]}
                </span>
              </div>
            )
          })}
        </div>

        {/* Reps */}
        <div className="grid grid-cols-3" style={{ gap: 8 }}>
          {REPS.map((r, i) => {
            const hit = done && lead.rep === i
            return (
              <div
                key={r.name}
                className="flex flex-col items-center"
                style={{
                  position: 'relative', gap: 4, padding: '10px 6px', borderRadius: 12,
                  background: hit ? C.greenBg : C.soft, border: `1px solid ${hit ? C.green : C.line}`,
                  opacity: r.away ? 0.75 : 1, transition: 'all .3s',
                }}
              >
                <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 999, background: r.bg, color: r.color, fontSize: 13, fontWeight: 700 }}>
                  {r.name[0]}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.name}</span>
                <span className="flex items-center" style={{ gap: 4, fontSize: 11, color: C.muted }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: r.away ? '#d97706' : C.green }} />
                  {r.away ? t.away : t.online}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.body, textAlign: 'center' }}>
                  {r.team} · {loads[i]} {t.chats}
                </span>
                <AnimatePresence>
                  {hit && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ position: 'absolute', top: -8, right: -6, fontSize: 11, fontWeight: 700, color: '#fff', background: C.green, borderRadius: 999, padding: '2px 7px' }}
                    >
                      +1
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center" style={{ gap: 6, padding: '10px 16px', borderTop: `1px solid ${C.line}`, background: done ? C.greenBg : C.soft, transition: 'background .3s' }}>
        {done ? (
          <>
            <CheckCircle2 style={{ width: 15, height: 15, color: C.green }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.green }}>{t.assigned(REPS[lead.rep].name, lead.secs)}</span>
          </>
        ) : (
          <>
            <Loader2 className="rtx-spin" style={{ width: 15, height: 15, color: C.muted }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>{t.routing}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default RoutingAnimation
