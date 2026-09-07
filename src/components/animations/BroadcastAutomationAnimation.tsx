'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, Filter, CheckSquare, RefreshCw } from 'lucide-react'

const crms = [
  { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256' },
  { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256' },
]

// Colors as inline styles — see TemplatesProblemAnimation for why.
const ink = { light: '#e9edef', muted: '#8696a0', green: '#25D366', blue: '#60a5fa' }

// CRM audience-segmentation mock (matches the "Segment Audiences from Your CRM"
// section this card illustrates). Labels per site locale (en | es | br | tr).
const TX: Record<string, { header: string; segments: Array<{ name: string; count: string }>; selected: string; audience: string; total: string; synced: string; footer: string }> = {
  en: {
    header: 'Audience Segments',
    segments: [
      { name: 'Deal stage: Proposal Sent', count: '1,240' },
      { name: 'Tag: VIP customers', count: '860' },
      { name: 'Inactive 30+ days', count: '2,410' },
    ],
    selected: 'Selected', audience: 'Campaign audience', total: '4,510', synced: 'Synced from CRM',
    footer: 'CRM-Powered Audience Targeting',
  },
  es: {
    header: 'Segmentos de audiencia',
    segments: [
      { name: 'Etapa: Propuesta enviada', count: '1.240' },
      { name: 'Etiqueta: clientes VIP', count: '860' },
      { name: 'Inactivos +30 días', count: '2.410' },
    ],
    selected: 'Seleccionado', audience: 'Audiencia de la campaña', total: '4.510', synced: 'Sincronizado desde el CRM',
    footer: 'Segmentación impulsada por el CRM',
  },
  br: {
    header: 'Segmentos de público',
    segments: [
      { name: 'Etapa: Proposta enviada', count: '1.240' },
      { name: 'Tag: clientes VIP', count: '860' },
      { name: 'Inativos há 30+ dias', count: '2.410' },
    ],
    selected: 'Selecionado', audience: 'Público da campanha', total: '4.510', synced: 'Sincronizado do CRM',
    footer: 'Segmentação com dados do CRM',
  },
  tr: {
    header: 'Hedef kitle segmentleri',
    segments: [
      { name: 'Aşama: Teklif Gönderildi', count: '1.240' },
      { name: 'Etiket: VIP müşteriler', count: '860' },
      { name: '30+ gündür pasif', count: '2.410' },
    ],
    selected: 'Seçildi', audience: 'Kampanya kitlesi', total: '4.510', synced: "CRM'den senkronize",
    footer: 'CRM destekli hedefleme',
  },
}

const BroadcastAutomationAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  return (
    <div className="relative w-full aspect-[4/3] max-sm:aspect-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3">
      <div className="w-full h-full rounded-xl overflow-hidden shadow-xl flex flex-col" style={{ background: '#0b141a' }}>

        {/* Header */}
        <div className="px-3 py-2.5 flex items-center justify-between" style={{ background: '#202c33', borderBottom: '1px solid #2a3942' }}>
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" style={{ color: ink.blue }} />
            <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.header}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {crms.map((crm, i) => (
              <motion.div
                key={crm.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{ background: '#111b21', border: '1px solid #2a3942' }}
              >
                <img src={crm.logo} alt={`${crm.name} logo`} className="w-3.5 h-3.5 rounded object-contain" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Segments */}
        <div className="flex-1 px-3 py-3 flex flex-col justify-evenly gap-2">
          {t.segments.map((seg, i) => (
            <motion.div
              key={seg.name}
              className="rounded-lg p-2 flex items-center gap-2"
              style={{ background: '#202c33', border: '1px solid #2a3942' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <motion.div
                className="flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.25 }}
              >
                <CheckSquare className="w-3.5 h-3.5" style={{ color: ink.green }} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold truncate" style={{ color: ink.light }}>{seg.name}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Users className="w-2 h-2" style={{ color: ink.muted }} />
                  <span className="text-[8px]" style={{ color: ink.muted }}>{seg.count}</span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[7px] font-mono font-bold uppercase flex-shrink-0" style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: ink.green }}>
                {t.selected}
              </span>
            </motion.div>
          ))}

          {/* Audience summary */}
          <motion.div
            className="rounded-lg p-2.5"
            style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.3)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3" style={{ color: ink.blue }} />
                <span className="text-[9px] font-bold" style={{ color: ink.light }}>{t.audience}</span>
              </div>
              <span className="text-[12px] font-bold font-mono" style={{ color: ink.blue }}>{t.total}</span>
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              <motion.span
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'linear' }}
                className="inline-flex"
              >
                <RefreshCw className="w-2.5 h-2.5" style={{ color: ink.muted }} />
              </motion.span>
              <span className="text-[8px]" style={{ color: ink.muted }}>{t.synced}</span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-center gap-2" style={{ background: '#202c33', borderTop: '1px solid #2a3942' }}>
          <Filter className="w-3 h-3" style={{ color: ink.blue }} />
          <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.footer}</span>
        </div>
      </div>
    </div>
  )
}

export default BroadcastAutomationAnimation
