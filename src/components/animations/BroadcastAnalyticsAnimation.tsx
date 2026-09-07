'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BarChart3, Send, CheckCheck, Eye, MousePointerClick, RefreshCw } from 'lucide-react'

// Colors as inline styles — see TemplatesProblemAnimation for why.
const ink = { light: '#e9edef', muted: '#8696a0', green: '#25D366', blue: '#60a5fa', cyan: '#22d3ee', violet: '#a78bfa' }

// Delivery-funnel mock for the "Real-Time Analytics" section.
// Labels per site locale (en | es | br | tr).
const TX: Record<string, { header: string; live: string; rows: [string, string, string, string]; synced: string; footer: string }> = {
  en: { header: 'Campaign Analytics', live: 'LIVE', rows: ['Sent', 'Delivered', 'Read', 'Clicked'], synced: 'Synced to CRM', footer: 'Real-Time Delivery Tracking' },
  es: { header: 'Analíticas de campaña', live: 'EN VIVO', rows: ['Enviados', 'Entregados', 'Leídos', 'Clics'], synced: 'Sincronizado con el CRM', footer: 'Seguimiento de entrega en tiempo real' },
  br: { header: 'Análises da campanha', live: 'AO VIVO', rows: ['Enviadas', 'Entregues', 'Lidas', 'Cliques'], synced: 'Sincronizado com o CRM', footer: 'Acompanhamento de entrega em tempo real' },
  tr: { header: 'Kampanya analizleri', live: 'CANLI', rows: ['Gönderilen', 'Teslim edilen', 'Okunan', 'Tıklanan'], synced: 'CRM ile senkronize', footer: 'Gerçek zamanlı teslim takibi' },
}

const FUNNEL = [
  { value: '10,000', pct: 100, color: '#60a5fa', icon: Send },
  { value: '9,820', pct: 98, color: '#22d3ee', icon: CheckCheck },
  { value: '7,450', pct: 74, color: '#25D366', icon: Eye },
  { value: '1,980', pct: 20, color: '#a78bfa', icon: MousePointerClick },
]

const BroadcastAnalyticsAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  return (
    <div className="relative w-full aspect-[4/3] max-sm:aspect-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3">
      <div className="w-full h-full rounded-xl overflow-hidden shadow-xl flex flex-col" style={{ background: '#0b141a' }}>

        {/* Header */}
        <div className="px-3 py-2.5 flex items-center justify-between" style={{ background: '#202c33', borderBottom: '1px solid #2a3942' }}>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5" style={{ color: ink.cyan }} />
            <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.header}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.4)' }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: ink.cyan }}
              animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
              transition={reduceMotion ? undefined : { duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[8px] font-mono font-bold uppercase" style={{ color: ink.cyan }}>{t.live}</span>
          </div>
        </div>

        {/* Funnel */}
        <div className="flex-1 px-3 py-3 flex flex-col justify-evenly gap-2.5">
          {FUNNEL.map((row, i) => {
            const Icon = row.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3" style={{ color: row.color }} />
                    <span className="text-[9px] font-bold" style={{ color: ink.light }}>{t.rows[i]}</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono" style={{ color: row.color }}>{row.value}</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: '#202c33', border: '1px solid #2a3942' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: row.color }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ delay: 0.4 + i * 0.25, duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )
          })}

          {/* CRM sync note */}
          <motion.div
            className="rounded-lg px-2.5 py-2 flex items-center justify-center gap-1.5"
            style={{ background: '#202c33', border: '1px solid #2a3942' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <motion.span
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'linear' }}
              className="inline-flex"
            >
              <RefreshCw className="w-2.5 h-2.5" style={{ color: ink.green }} />
            </motion.span>
            <span className="text-[8px] font-mono uppercase" style={{ color: ink.muted }}>{t.synced}</span>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-center gap-2" style={{ background: '#202c33', borderTop: '1px solid #2a3942' }}>
          <BarChart3 className="w-3 h-3" style={{ color: ink.cyan }} />
          <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.footer}</span>
        </div>
      </div>
    </div>
  )
}

export default BroadcastAnalyticsAnimation
