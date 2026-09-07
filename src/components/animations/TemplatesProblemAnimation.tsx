'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, X, Ban, Clock } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

// Colors live in inline styles: the landing theme's remap CSS
// (`.landing div { color: inherit }` + !important overrides on dark utility
// classes) silently repaints class-based colors, which is what broke this
// card in the first place. Inline styles are immune.
const ink = { light: '#e9edef', muted: '#8696a0', red: '#f87171', amber: '#fbbf24' }

// Mock-UI labels per site locale (en | es | br | tr).
const TX: Record<string, Record<string, string>> = {
  en: {
    header: 'Manual Messaging', risk: 'Risk', typing: 'Typing each message manually…',
    bubble: 'Hi! Check out our latest offers and discounts…',
    rejected: 'Message rejected — not template approved',
    banTitle: 'Ban Risk', banSub: 'Number blocked', timeTitle: 'Time Waste', timeSub: 'Hours typing',
    footer: 'Manual = Risky & Slow',
  },
  es: {
    header: 'Mensajes manuales', risk: 'Riesgo', typing: 'Escribiendo cada mensaje a mano…',
    bubble: '¡Hola! Mira nuestras últimas ofertas y descuentos…',
    rejected: 'Mensaje rechazado: sin plantilla aprobada',
    banTitle: 'Riesgo de bloqueo', banSub: 'Número bloqueado', timeTitle: 'Tiempo perdido', timeSub: 'Horas escribiendo',
    footer: 'Manual = riesgoso y lento',
  },
  br: {
    header: 'Mensagens manuais', risk: 'Risco', typing: 'Digitando cada mensagem manualmente…',
    bubble: 'Oi! Confira nossas últimas ofertas e descontos…',
    rejected: 'Mensagem rejeitada — sem modelo aprovado',
    banTitle: 'Risco de banimento', banSub: 'Número bloqueado', timeTitle: 'Tempo perdido', timeSub: 'Horas digitando',
    footer: 'Manual = arriscado e lento',
  },
  tr: {
    header: 'Manuel mesajlaşma', risk: 'Risk', typing: 'Her mesaj tek tek yazılıyor…',
    bubble: 'Merhaba! Son kampanya ve indirimlerimize göz atın…',
    rejected: 'Mesaj reddedildi — onaylı şablon değil',
    banTitle: 'Ban riski', banSub: 'Numara engellendi', timeTitle: 'Zaman kaybı', timeSub: 'Saatlerce yazım',
    footer: 'Manuel = riskli ve yavaş',
  },
}

const TemplatesProblemAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  return (
    <div className="relative w-full aspect-[4/3] max-sm:aspect-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3">
      <div className="w-full h-full rounded-xl overflow-hidden shadow-xl flex flex-col" style={{ background: '#0b141a' }}>

        {/* Header */}
        <div className="px-3 py-2.5 flex items-center justify-between" style={{ background: '#202c33', borderBottom: '1px solid #2a3942' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#25D366', color: '#ffffff' }}>
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.header}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)' }}>
            <AlertTriangle className="w-2.5 h-2.5" style={{ color: ink.red }} />
            <span className="text-[8px] font-mono uppercase font-bold" style={{ color: ink.red }}>{t.risk}</span>
          </div>
        </div>

        {/* Chat simulation */}
        <div className="flex-1 px-3 py-3 flex flex-col justify-evenly gap-2">
          {/* Typing indicator */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 0.4] }}
            transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity }}
          >
            <div className="px-3 py-2 rounded-lg rounded-tl-none flex items-center gap-1" style={{ background: '#202c33' }}>
              {[0, 0.2, 0.4].map((d) => (
                <motion.div
                  key={d}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: ink.muted }}
                  animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                  transition={reduceMotion ? undefined : { duration: 0.6, repeat: Infinity, delay: d }}
                />
              ))}
            </div>
            <span className="text-[8px]" style={{ color: ink.muted }}>{t.typing}</span>
          </motion.div>

          {/* Rejected message */}
          <div className="flex flex-col gap-1">
            <motion.div
              className="px-3 py-2 rounded-lg rounded-tr-none text-[9px] ml-auto max-w-[80%] relative"
              style={{ background: '#005c4b', color: ink.light }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span style={{ color: ink.light }}>{t.bubble}</span>
              <motion.div
                className="absolute -right-1.5 -top-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#ef4444' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6 }}
              >
                <X className="w-2.5 h-2.5" style={{ color: '#ffffff' }} />
              </motion.div>
            </motion.div>
            <motion.span
              className="text-[8px] text-right"
              style={{ color: ink.red }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              {t.rejected}
            </motion.span>
          </div>

          {/* Warning cards */}
          <div className="flex gap-2">
            <motion.div
              className="flex-1 p-2.5 rounded-lg"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 }}
            >
              <Ban className="w-3.5 h-3.5 mb-1" style={{ color: ink.red }} />
              <div className="text-[8px] font-bold uppercase" style={{ color: ink.red }}>{t.banTitle}</div>
              <div className="text-[7px]" style={{ color: ink.muted }}>{t.banSub}</div>
            </motion.div>

            <motion.div
              className="flex-1 p-2.5 rounded-lg"
              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 }}
            >
              <Clock className="w-3.5 h-3.5 mb-1" style={{ color: ink.amber }} />
              <div className="text-[8px] font-bold uppercase" style={{ color: ink.amber }}>{t.timeTitle}</div>
              <div className="text-[7px]" style={{ color: ink.muted }}>{t.timeSub}</div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-center gap-2" style={{ background: '#202c33', borderTop: '1px solid #2a3942' }}>
          <AlertTriangle className="w-3 h-3" style={{ color: ink.red }} />
          <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: ink.red }}>{t.footer}</span>
        </div>
      </div>
    </div>
  )
}

export default TemplatesProblemAnimation
