'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, FileText, Zap, Shield } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

// Colors live in inline styles — see TemplatesProblemAnimation for why.
const ink = { light: '#e9edef', muted: '#8696a0', green: '#25D366', blue: '#60a5fa' }

// Mock-UI labels per site locale (en | es | br | tr).
const TX: Record<string, { header: string; approved: string; templates: Array<{ name: string; icon: string }>; preApproved: string; ready: string; oneClick: string; send: string; sending: string; footer: string }> = {
  en: {
    header: 'Message Templates', approved: 'Approved',
    templates: [
      { name: 'Welcome', icon: '👋' },
      { name: 'Order Update', icon: '📦' },
      { name: 'Appointment', icon: '📅' },
    ],
    preApproved: 'Pre-approved template', ready: 'Ready',
    oneClick: 'One-Click Send', send: 'SEND', sending: 'Sending to 1,000+ contacts…',
    footer: 'Meta-Approved Templates',
  },
  es: {
    header: 'Plantillas de mensajes', approved: 'Aprobadas',
    templates: [
      { name: 'Bienvenida', icon: '👋' },
      { name: 'Actualización de pedido', icon: '📦' },
      { name: 'Cita', icon: '📅' },
    ],
    preApproved: 'Plantilla preaprobada', ready: 'Lista',
    oneClick: 'Envío en un clic', send: 'ENVIAR', sending: 'Enviando a más de 1.000 contactos…',
    footer: 'Plantillas aprobadas por Meta',
  },
  br: {
    header: 'Modelos de mensagem', approved: 'Aprovados',
    templates: [
      { name: 'Boas-vindas', icon: '👋' },
      { name: 'Atualização do pedido', icon: '📦' },
      { name: 'Compromisso', icon: '📅' },
    ],
    preApproved: 'Modelo pré-aprovado', ready: 'Pronto',
    oneClick: 'Envio em um clique', send: 'ENVIAR', sending: 'Enviando para mais de 1.000 contatos…',
    footer: 'Modelos aprovados pela Meta',
  },
  tr: {
    header: 'Mesaj şablonları', approved: 'Onaylı',
    templates: [
      { name: 'Karşılama', icon: '👋' },
      { name: 'Sipariş güncellemesi', icon: '📦' },
      { name: 'Randevu', icon: '📅' },
    ],
    preApproved: 'Önceden onaylı şablon', ready: 'Hazır',
    oneClick: 'Tek tıkla gönderim', send: 'GÖNDER', sending: '1.000+ kişiye gönderiliyor…',
    footer: 'Meta onaylı şablonlar',
  },
}

const TemplatesSolutionAnimation: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
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
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.4)' }}>
            <Shield className="w-2.5 h-2.5" style={{ color: ink.green }} />
            <span className="text-[8px] font-mono uppercase font-bold" style={{ color: ink.green }}>{t.approved}</span>
          </div>
        </div>

        {/* Template list */}
        <div className="flex-1 px-3 py-3 flex flex-col justify-evenly gap-2">
          {t.templates.map((template, i) => (
            <motion.div
              key={template.name}
              className="rounded-lg px-2.5 py-2 flex items-center justify-between"
              style={{ background: '#202c33', border: '1px solid #2a3942' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#111b21' }}>
                  {template.icon}
                </div>
                <div>
                  <div className="text-[10px] font-bold" style={{ color: ink.light }}>{template.name}</div>
                  <div className="text-[8px]" style={{ color: ink.muted }}>{t.preApproved}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" style={{ color: ink.green }} />
                <span className="text-[8px] font-mono uppercase" style={{ color: ink.green }}>{t.ready}</span>
              </div>
            </motion.div>
          ))}

          {/* One-click send visualization */}
          <motion.div
            className="rounded-lg px-2.5 py-2"
            style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(96,165,250,0.35)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3" style={{ color: ink.blue }} />
                <span className="text-[9px] font-bold" style={{ color: ink.light }}>{t.oneClick}</span>
              </div>
              <motion.div
                className="px-2 py-0.5 rounded text-[8px] font-bold"
                style={{ background: '#2563eb', color: '#ffffff' }}
                animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
                transition={reduceMotion ? undefined : { duration: 1.5, repeat: Infinity }}
              >
                {t.send}
              </motion.div>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(96,165,250,0.25)' }}>
                  <motion.div
                    className="h-full"
                    style={{ background: ink.blue }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
                  />
                </div>
              ))}
            </div>
            <div className="text-[7px] mt-1.5 text-center" style={{ color: ink.muted }}>{t.sending}</div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-center gap-2" style={{ background: '#202c33', borderTop: '1px solid #2a3942' }}>
          <FileText className="w-3 h-3" style={{ color: ink.green }} />
          <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: ink.muted }}>{t.footer}</span>
        </div>
      </div>
    </div>
  )
}

export default TemplatesSolutionAnimation
