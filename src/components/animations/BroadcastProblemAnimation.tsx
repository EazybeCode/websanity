'use client'

import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, Ban, MessageSquareOff, Clock } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

// Colors as inline styles: the landing theme remap repaints class-based dark
// colors (see TemplatesProblemAnimation). Inline styles are immune.
const ink = { light: '#e9edef', muted: '#8696a0', orange: '#fb923c', blue: '#60a5fa' }

// Mock-UI labels per site locale (en | es | br | tr).
const TX: Record<string, { header: string; sending: string; blocked: string; progress: string; limit: string; issues: Array<[string, string]>; overlayTitle: string; overlayBody: string; footer: string }> = {
  en: {
    header: 'Broadcast List', sending: 'Broadcasting…', blocked: 'Blocked',
    progress: 'Progress', limit: 'Limit',
    issues: [['Recipient #257', 'Failed'], ['Sending Speed', 'Throttled'], ['Account Status', 'High Risk']],
    overlayTitle: 'Broadcast Blocked', overlayBody: 'WhatsApp limits reached. High ban risk.',
    footer: '256 Contact Limit',
  },
  es: {
    header: 'Lista de difusión', sending: 'Enviando…', blocked: 'Bloqueado',
    progress: 'Progreso', limit: 'límite',
    issues: [['Destinatario n.º 257', 'Fallido'], ['Velocidad de envío', 'Limitada'], ['Estado de la cuenta', 'Riesgo alto']],
    overlayTitle: 'Difusión bloqueada', overlayBody: 'Límites de WhatsApp alcanzados. Alto riesgo de bloqueo.',
    footer: 'Límite de 256 contactos',
  },
  br: {
    header: 'Lista de transmissão', sending: 'Enviando…', blocked: 'Bloqueado',
    progress: 'Progresso', limit: 'limite',
    issues: [['Destinatário nº 257', 'Falhou'], ['Velocidade de envio', 'Limitada'], ['Status da conta', 'Risco alto']],
    overlayTitle: 'Transmissão bloqueada', overlayBody: 'Limites do WhatsApp atingidos. Alto risco de banimento.',
    footer: 'Limite de 256 contatos',
  },
  tr: {
    header: 'Toplu mesaj listesi', sending: 'Gönderiliyor…', blocked: 'Engellendi',
    progress: 'İlerleme', limit: 'sınır',
    issues: [['Alıcı #257', 'Başarısız'], ['Gönderim hızı', 'Kısıtlandı'], ['Hesap durumu', 'Yüksek risk']],
    overlayTitle: 'Toplu gönderim engellendi', overlayBody: 'WhatsApp sınırlarına ulaşıldı. Yüksek ban riski.',
    footer: '256 kişi sınırı',
  },
}

const issueIcons = [MessageSquareOff, Clock, Ban]

const BroadcastProblemAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
  const t = TX[locale] || TX.en
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (reduceMotion) { setProgress(100); setIsError(false); return }
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsError(true)
          setTimeout(() => { setProgress(0); setIsError(false) }, 2200)
          return 100
        }
        return prev + 2
      })
    }, 80)
    return () => clearInterval(timer)
  }, [reduceMotion])

  return (
    <div className="relative w-full aspect-[4/3] max-sm:aspect-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3">
      <div className="w-full h-full rounded-xl overflow-hidden shadow-xl flex flex-col relative" style={{ background: '#0b141a' }}>

        {/* Header */}
        <div className="px-3 py-2.5 flex items-center justify-between" style={{ background: '#202c33', borderBottom: '1px solid #2a3942' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#111b21', color: 'rgba(255,255,255,0.55)' }}>
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.header}</span>
          </div>
          <div
            className="px-2 py-1 rounded-full text-[8px] font-mono font-bold uppercase"
            style={isError
              ? { background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.4)', color: ink.orange }
              : { background: '#111b21', border: '1px solid #2a3942', color: ink.muted }}
          >
            {isError ? t.blocked : t.sending}
          </div>
        </div>

        {/* Progress + issues */}
        <div className="flex-1 px-3 py-3 flex flex-col justify-evenly gap-2.5">
          <div>
            <div className="flex justify-between text-[8px] font-mono mb-1" style={{ color: ink.muted }}>
              <span>{t.progress}</span>
              <span>{Math.floor((progress / 100) * 256)} / 256 {t.limit}</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: '#111b21', border: '1px solid #2a3942' }}>
              <div className="h-full" style={{ width: `${progress}%`, background: isError ? ink.orange : ink.blue }} />
            </div>
          </div>

          <div className="space-y-1.5">
            {t.issues.map(([label, status], i) => {
              const Icon = issueIcons[i]
              return (
                <motion.div
                  key={i}
                  className="p-2 rounded-lg flex items-center justify-between"
                  style={isError
                    ? { background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.3)' }
                    : { background: '#202c33', border: '1px solid #2a3942' }}
                  animate={{ opacity: isError ? 1 : 0.45 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3 h-3" style={{ color: isError ? ink.orange : ink.muted }} />
                    <span className="text-[9px] font-bold" style={{ color: ink.light }}>{label}</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold uppercase" style={{ color: isError ? ink.orange : ink.muted }}>
                    {status}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Error overlay */}
        {isError && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{ background: 'rgba(11,20,26,0.85)', backdropFilter: 'blur(3px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center space-y-2">
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                style={{ background: 'rgba(251,146,60,0.18)', border: '1px solid #fb923c' }}
                animate={reduceMotion ? undefined : { scale: [1, 1.1, 1] }}
                transition={reduceMotion ? undefined : { duration: 0.6, repeat: Infinity }}
              >
                <AlertCircle className="w-6 h-6" style={{ color: ink.orange }} />
              </motion.div>
              <div>
                <div className="text-sm font-bold" style={{ color: '#ffffff' }}>{t.overlayTitle}</div>
                <div className="text-[9px] max-w-[180px] mt-1 mx-auto" style={{ color: ink.muted }}>{t.overlayBody}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-center gap-2" style={{ background: '#202c33', borderTop: '1px solid #2a3942' }}>
          <AlertCircle className="w-3 h-3" style={{ color: ink.orange }} />
          <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: ink.orange }}>{t.footer}</span>
        </div>
      </div>
    </div>
  )
}

export default BroadcastProblemAnimation
