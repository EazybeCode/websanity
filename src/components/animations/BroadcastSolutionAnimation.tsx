'use client'

import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Zap, Send } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

// Colors as inline styles — see TemplatesProblemAnimation for why.
const ink = { light: '#e9edef', muted: '#8696a0', green: '#25D366', blue: '#60a5fa', cyan: '#22d3ee' }

// Mock-UI labels per site locale (en | es | br | tr).
const TX: Record<string, Record<string, string>> = {
  en: { header: 'API Broadcast', unlimited: 'Unlimited', sent: 'Sent', delivered: 'Delivered', readRate: 'Read Rate', stream: 'Live Stream', apiSent: 'API_SENT', live: 'LIVE', footer: 'No Limits via Official API' },
  es: { header: 'Difusión por API', unlimited: 'Sin límites', sent: 'Enviados', delivered: 'Entregados', readRate: 'Tasa de lectura', stream: 'Flujo en vivo', apiSent: 'API_SENT', live: 'EN VIVO', footer: 'Sin límites con la API oficial' },
  br: { header: 'Transmissão via API', unlimited: 'Sem limites', sent: 'Enviadas', delivered: 'Entregues', readRate: 'Taxa de leitura', stream: 'Fluxo ao vivo', apiSent: 'API_SENT', live: 'AO VIVO', footer: 'Sem limites com a API oficial' },
  tr: { header: 'API ile toplu gönderim', unlimited: 'Sınırsız', sent: 'Gönderilen', delivered: 'Teslim edilen', readRate: 'Okunma oranı', stream: 'Canlı akış', apiSent: 'API_SENT', live: 'CANLI', footer: 'Resmi API ile sınırsız' },
}

const BroadcastSolutionAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  const [metrics, setMetrics] = useState({ sent: 4820, delivered: 4723, read: 3615 })
  const [activeStream, setActiveStream] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const interval = setInterval(() => {
      setMetrics(prev => {
        const nextSent = prev.sent >= 5000 ? 0 : prev.sent + Math.floor(Math.random() * 50) + 20
        return { sent: nextSent, delivered: Math.floor(nextSent * 0.98), read: Math.floor(nextSent * 0.75) }
      })
      setActiveStream(prev => (prev + 1) % 5)
    }, 180)
    return () => clearInterval(interval)
  }, [reduceMotion])

  const tile: React.CSSProperties = { background: '#202c33', border: '1px solid #2a3942' }

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
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.4)' }}>
            <Zap className="w-2.5 h-2.5" style={{ color: ink.blue }} />
            <span className="text-[8px] font-mono font-bold uppercase" style={{ color: ink.blue }}>{t.unlimited}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 px-3 py-3 flex gap-2.5 max-sm:flex-col">
          {/* Metrics column */}
          <div className="w-[40%] max-sm:w-full flex flex-col justify-evenly gap-2">
            <div className="p-2 rounded-lg" style={tile}>
              <div className="text-[8px] font-mono uppercase mb-0.5" style={{ color: ink.muted }}>{t.sent}</div>
              <div className="text-base font-bold font-mono" style={{ color: ink.light }}>{metrics.sent.toLocaleString()}</div>
            </div>
            <div className="p-2 rounded-lg" style={tile}>
              <div className="text-[8px] font-mono uppercase mb-0.5" style={{ color: ink.muted }}>{t.delivered}</div>
              <div className="text-base font-bold font-mono" style={{ color: ink.cyan }}>{metrics.delivered.toLocaleString()}</div>
            </div>
            <div className="p-2 rounded-lg" style={tile}>
              <div className="text-[8px] font-mono uppercase mb-0.5" style={{ color: ink.muted }}>{t.readRate}</div>
              <div className="text-base font-bold font-mono" style={{ color: ink.green }}>
                {Math.min(98, Math.floor((metrics.read / (metrics.sent || 1)) * 100))}%
              </div>
            </div>
          </div>

          {/* Stream visualizer */}
          <div className="flex-1 rounded-lg p-2.5 relative overflow-hidden" style={{ background: '#111b21', border: '1px solid #2a3942' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold uppercase" style={{ color: ink.light }}>{t.stream}</span>
              <div className="flex gap-0.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1 h-1 rounded-full" style={{ background: i === activeStream % 3 ? ink.cyan : '#2a3942' }} />
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 p-1.5 rounded"
                  style={i === activeStream
                    ? { background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.35)' }
                    : { background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.1)', opacity: 0.45 }}
                  animate={{ x: i === activeStream ? 2 : 0 }}
                >
                  <CheckCircle2 className="w-2.5 h-2.5 flex-shrink-0" style={{ color: i === activeStream ? ink.cyan : ink.muted }} />
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#2a3942' }}>
                    <div className="h-full w-3/4" style={{ background: 'rgba(34,211,238,0.5)' }} />
                  </div>
                  <span className="text-[7px] font-mono" style={{ color: ink.cyan }}>{t.apiSent}</span>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: ink.cyan }}
                animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
                transition={reduceMotion ? undefined : { duration: 1.4, repeat: Infinity }}
              />
              <span className="text-[7px] font-mono font-bold" style={{ color: ink.cyan }}>{t.live}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-center gap-2" style={{ background: '#202c33', borderTop: '1px solid #2a3942' }}>
          <Send className="w-3 h-3" style={{ color: ink.green }} />
          <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.footer}</span>
        </div>
      </div>
    </div>
  )
}

export default BroadcastSolutionAnimation
