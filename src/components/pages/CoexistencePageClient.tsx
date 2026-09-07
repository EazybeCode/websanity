'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  AlertTriangle,
  X,
  Smartphone,
  Zap,
  Users,
  RefreshCw
} from 'lucide-react'
import { useLocale } from 'next-intl'
import { LocalizedLink } from '@/components/LocalizedLink'
import { useTrialModal } from '@/providers/TrialModalProvider'

// ─── Locale dictionaries for the hand-coded UI (visual mocks, comparison
// table defaults, inline CTA). Sanity carries the page content; these cover
// the strings that live in code. Brand terms (WhatsApp App/API, HubSpot,
// CRM, API) stay English everywhere.
const COEX_TX: Record<string, any> = {
  en: {
    sync: { connected: 'Connected', appSub: 'Chats, calls, media', apiSub: 'Bulk broadcasts at scale', active: 'Active', caption: 'One number, both channels live' },
    workflow: { title: 'Broadcast campaign', official: 'Official API', count: '10,000', contacts: 'contacts selected', message: 'Hi {name} 👋 Your exclusive 20% offer is live today only.', delivered: 'Delivered', total: '10,000', blocked: '0 numbers blocked', delivery: '99.2% delivery' },
    crm: { online: 'online', message: 'Hi! Following up on the enterprise quote.', record: 'CRM record', synced: 'Synced · HubSpot', dealStage: 'Deal stage', negotiation: 'Negotiation', value: 'Value', owner: 'Owner', you: 'You' },
    cmp: {
      badge: 'Comparison', headline: 'See The Difference', description: 'How Coexistence stacks up against traditional WhatsApp models.',
      headers: { feature: 'Feature', regular: 'Regular WhatsApp', api: 'Standard API', coexistence: 'Coexistence' },
      rows: ['Bulk Broadcasting', 'App Access', 'CRM Integration', 'See Messages on Phone', 'Number Ban Protection', 'WhatsApp Web Access', 'Setup Time'],
      vals: { yes: 'Yes', protected: 'Protected', minutes: 'Minutes' },
      risky: 'Risky', instant: 'Instant', weeks: 'Days/Weeks',
    },
    cta: { headline: 'That whole right-hand column comes with the trial', body: 'Every “Yes” in the table works on your own number during the 14-day trial. Connect it and see for yourself in about 30 minutes.', primary: 'Start Free Trial' },
    footnote: '14-day free trial • No credit card required',
  },
  es: {
    sync: { connected: 'Conectado', appSub: 'Chats, llamadas, multimedia', apiSub: 'Difusiones masivas a escala', active: 'Activo', caption: 'Un número, ambos canales en vivo' },
    workflow: { title: 'Campaña de difusión', official: 'API oficial', count: '10.000', contacts: 'contactos seleccionados', message: '¡Hola {name} 👋! Tu 20% de descuento exclusivo está activo solo hoy.', delivered: 'Entregados', total: '10.000', blocked: '0 números bloqueados', delivery: '99,2% de entrega' },
    crm: { online: 'en línea', message: '¡Hola! Te escribo por la cotización enterprise.', record: 'Registro del CRM', synced: 'Sincronizado · HubSpot', dealStage: 'Etapa del negocio', negotiation: 'Negociación', value: 'Valor', owner: 'Propietario', you: 'Tú' },
    cmp: {
      badge: 'Comparativa', headline: 'Mira la diferencia', description: 'Cómo se compara Coexistencia con los modelos tradicionales de WhatsApp.',
      headers: { feature: 'Función', regular: 'WhatsApp normal', api: 'API estándar', coexistence: 'Coexistencia' },
      rows: ['Difusión masiva', 'Acceso a la app', 'Integración con CRM', 'Ver mensajes en el teléfono', 'Protección contra bloqueos', 'Acceso a WhatsApp Web', 'Tiempo de configuración'],
      vals: { yes: 'Sí', protected: 'Protegido', minutes: 'Minutos' },
      risky: 'Riesgoso', instant: 'Instantáneo', weeks: 'Días/Semanas',
    },
    cta: { headline: 'Toda la columna de la derecha viene con la prueba', body: 'Cada «Sí» de la tabla funciona con tu propio número durante la prueba de 14 días. Conéctalo y compruébalo en unos 30 minutos.', primary: 'Comenzar prueba gratis' },
    footnote: 'Prueba gratis de 14 días • Sin tarjeta de crédito',
  },
  br: {
    sync: { connected: 'Conectado', appSub: 'Chats, chamadas, mídia', apiSub: 'Transmissões em massa em escala', active: 'Ativo', caption: 'Um número, os dois canais no ar' },
    workflow: { title: 'Campanha de transmissão', official: 'API oficial', count: '10.000', contacts: 'contatos selecionados', message: 'Oi {name} 👋 Sua oferta exclusiva de 20% vale só hoje.', delivered: 'Entregues', total: '10.000', blocked: '0 números bloqueados', delivery: '99,2% de entrega' },
    crm: { online: 'online', message: 'Oi! Passando para falar da cotação enterprise.', record: 'Registro no CRM', synced: 'Sincronizado · HubSpot', dealStage: 'Etapa do negócio', negotiation: 'Negociação', value: 'Valor', owner: 'Responsável', you: 'Você' },
    cmp: {
      badge: 'Comparativo', headline: 'Veja a diferença', description: 'Como a Coexistência se compara aos modelos tradicionais de WhatsApp.',
      headers: { feature: 'Recurso', regular: 'WhatsApp comum', api: 'API padrão', coexistence: 'Coexistência' },
      rows: ['Transmissão em massa', 'Acesso ao app', 'Integração com CRM', 'Ver mensagens no celular', 'Proteção contra banimento', 'Acesso ao WhatsApp Web', 'Tempo de configuração'],
      vals: { yes: 'Sim', protected: 'Protegido', minutes: 'Minutos' },
      risky: 'Arriscado', instant: 'Instantâneo', weeks: 'Dias/Semanas',
    },
    cta: { headline: 'Toda a coluna da direita vem com o teste', body: 'Cada “Sim” da tabela funciona no seu próprio número durante o teste de 14 dias. Conecte e veja com seus olhos em uns 30 minutos.', primary: 'Começar teste grátis' },
    footnote: 'Teste grátis de 14 dias • Sem cartão de crédito',
  },
  tr: {
    sync: { connected: 'Bağlı', appSub: 'Sohbetler, aramalar, medya', apiSub: 'Ölçekli toplu gönderim', active: 'Aktif', caption: 'Bir numara, iki kanal yayında' },
    workflow: { title: 'Toplu gönderim kampanyası', official: 'Resmi API', count: '10.000', contacts: 'kişi seçildi', message: 'Merhaba {name} 👋 Size özel %20 indirim yalnızca bugün geçerli.', delivered: 'Teslim edilen', total: '10.000', blocked: '0 numara engellendi', delivery: '%99,2 teslim' },
    crm: { online: 'çevrimiçi', message: 'Merhaba! Kurumsal teklif için yazıyorum.', record: 'CRM kaydı', synced: 'Senkronize · HubSpot', dealStage: 'Fırsat aşaması', negotiation: 'Pazarlık', value: 'Değer', owner: 'Sorumlu', you: 'Siz' },
    cmp: {
      badge: 'Karşılaştırma', headline: 'Farkı görün', description: 'Coexistence, geleneksel WhatsApp modelleriyle nasıl kıyaslanıyor?',
      headers: { feature: 'Özellik', regular: 'Normal WhatsApp', api: 'Standart API', coexistence: 'Coexistence' },
      rows: ['Toplu gönderim', 'Uygulama erişimi', 'CRM entegrasyonu', 'Mesajları telefonda görme', 'Numara ban koruması', 'WhatsApp Web erişimi', 'Kurulum süresi'],
      vals: { yes: 'Evet', protected: 'Korumalı', minutes: 'Dakikalar' },
      risky: 'Riskli', instant: 'Anında', weeks: 'Günler/Haftalar',
    },
    cta: { headline: 'Sağdaki sütunun tamamı denemeyle birlikte gelir', body: 'Tablodaki her «Evet», 14 günlük deneme boyunca kendi numaranızda çalışır. Bağlayın, yaklaşık 30 dakikada kendiniz görün.', primary: 'Ücretsiz denemeyi başlat' },
    footnote: '14 gün ücretsiz deneme • Kredi kartı gerekmez',
  },
}
// Shared landing-style sections from the whatsapp-api feature pages
// (/whatsapp-api/broadcast etc.) so this page matches them 1:1.
import { BenefitsSection, HowItWorksSection, UseCasesSection, FAQSection } from './FeaturePageClient'

// ================== Hero Section ==================
// Styled to match the /whatsapp-api/broadcast hero (FeaturePageClient's
// HeroSection): landing `page-hero` shell, pulse badge tag, display-font h1
// with the green <em> highlight, lede, pill CTA buttons, trust chips below.
const HeroSection: React.FC<{ data: any }> = ({ data }) => {
  const { openModal } = useTrialModal()
  if (!data) return null

  return (
    <section className="page-hero" data-tone="dark">
      <div className="container">
        {data.badge && (
          <span className="hero-tag reveal"><span className="pulse" /> {String(data.badge).toUpperCase()}</span>
        )}

        <h1 className="reveal">
          {data.headline}
          {data.headlineHighlight ? <> <em>{data.headlineHighlight}</em></> : null}
        </h1>

        {data.description && <p className="lede reveal">{data.description}</p>}

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
          {/* Same behavior as the broadcast hero: both CTAs open the
              trial/demo form modal instead of navigating away. */}
          {data.primaryCta && (
            <button onClick={() => openModal('trial')} className="btn btn-primary btn-lg">
              {data.primaryCta.label} →
            </button>
          )}
          {data.secondaryCta && (
            <button onClick={() => openModal('demo')} className="btn btn-outline btn-lg">
              {data.secondaryCta.label}
            </button>
          )}
        </div>

        {/* Trust-chip stats matching the broadcast hero: pill badges with
            tinted icon medallions (green / blue / gold). Colors are inline
            so the landing remap CSS can't repaint them. */}
        {data.stats && data.stats.length > 0 && (
          <div className="reveal flex justify-center flex-wrap gap-2.5" style={{ marginTop: 40 }}>
            {data.stats.map((stat: any, idx: number) => {
              const tint = [
                { color: '#7FD6B0', bg: 'rgba(37,211,102,0.14)', border: 'rgba(37,211,102,0.45)' },
                { color: '#8FB7F5', bg: 'rgba(96,140,235,0.16)', border: 'rgba(143,183,245,0.45)' },
                { color: '#E8C77E', bg: 'rgba(214,178,90,0.14)', border: 'rgba(232,199,126,0.45)' },
              ][idx % 3]
              const icons = [
                <svg key="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><circle cx="12" cy="12" r="9" /><path d="M8.5 12.2l2.3 2.3 4.7-4.8" /></svg>,
                <svg key="g" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>,
              ]
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full"
                  style={{
                    padding: '6px 14px 6px 7px',
                    background: 'rgba(255,255,255,0.055)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 24, height: 24, background: tint.bg, border: `1px solid ${tint.border}`, color: tint.color }}
                  >
                    {icons[idx % 3]}
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: '#F4F6FA' }}>{stat.value} {stat.label}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ================== Feature Visuals ==================
// Hand-coded mockups (no images) matching the home page's approach. They use the
// landing CSS variables (--paper/--ink/--line/--bg-2/--ok), so they invert
// automatically on the dark feature sections. `kind` maps to the Sanity `image`
// string (sync-visual / workflow-visual / mini-crm-visual); anything else falls
// back to a simple placeholder.
const V_ACCENT = '#0EA5C4'
const V_ACCENT_SOFT = 'rgba(14,165,196,0.12)'
const V_GREEN = '#22c55e'
const V_GREEN_SOFT = 'rgba(34,197,94,0.14)'

const vCard: React.CSSProperties = {
  width: '100%',
  background: 'var(--paper)',
  border: '1px solid var(--line)',
  borderRadius: 18,
  padding: 18,
  boxShadow: '0 20px 60px -30px rgba(15,17,21,0.22)',
  fontFamily: 'var(--f-sans)',
}
const vPill = (color: string, bg: string): React.CSSProperties => ({
  fontSize: 11,
  fontWeight: 600,
  color,
  background: bg,
  padding: '4px 10px',
  borderRadius: 100,
  whiteSpace: 'nowrap',
})

const SyncVisual = ({ lx }: { lx: any }) => {
  const reduceMotion = useReducedMotion()
  // The "live" highlight ping-pongs between the App and API rows.
  const [activeRow, setActiveRow] = React.useState(0)
  React.useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setActiveRow((r) => (r + 1) % 2), 2600)
    return () => clearInterval(id)
  }, [reduceMotion])

  return (
    <div style={vCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--line)', marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>+1 302 412 9610</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-3)' }}>
          <motion.span
            style={{ width: 8, height: 8, borderRadius: '50%', background: V_GREEN, display: 'inline-block' }}
            animate={reduceMotion ? undefined : { opacity: [1, 0.35, 1] }}
            transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity }}
          /> {lx.connected}
        </span>
      </div>
      {[
        { icon: <Smartphone size={18} />, title: 'WhatsApp App', sub: lx.appSub },
        { icon: <Zap size={18} />, title: 'WhatsApp API', sub: lx.apiSub },
      ].map((r, i) => {
        const isLive = !reduceMotion && activeRow === i
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: 'var(--bg-2)',
              border: `1px solid ${isLive ? 'rgba(14,165,196,0.55)' : 'var(--line)'}`,
              boxShadow: isLive ? '0 0 0 3px rgba(14,165,196,0.12)' : 'none',
              borderRadius: 12, marginBottom: 10,
              transition: 'border-color .5s ease, box-shadow .5s ease',
            }}
          >
            <motion.div
              style={{ width: 36, height: 36, borderRadius: 10, background: V_ACCENT_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', color: V_ACCENT, flexShrink: 0 }}
              animate={isLive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={isLive ? { duration: 1.2, repeat: Infinity } : undefined}
            >
              {r.icon}
            </motion.div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r.sub}</div>
            </div>
            <span style={vPill('#16a34a', V_GREEN_SOFT)}>{lx.active}</span>
          </motion.div>
        )
      })}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}
      >
        {lx.caption}
      </motion.div>
    </div>
  )
}

const WorkflowVisual = ({ lx }: { lx: any }) => {
  const reduceMotion = useReducedMotion()
  // Delivered counter climbs to 8,432, holds, then loops.
  const TARGET = 8432
  const [delivered, setDelivered] = React.useState(reduceMotion ? TARGET : 0)
  React.useEffect(() => {
    if (reduceMotion) { setDelivered(TARGET); return }
    let current = 0
    let id: ReturnType<typeof setInterval>
    const start = () => {
      current = 0
      id = setInterval(() => {
        current = Math.min(TARGET, current + 260 + Math.floor(Math.random() * 120))
        setDelivered(current)
        if (current >= TARGET) {
          clearInterval(id)
          setTimeout(start, 3500)
        }
      }, 90)
    }
    start()
    return () => clearInterval(id)
  }, [reduceMotion])

  const pct = Math.round((delivered / 10000) * 100)

  return (
    <div style={vCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{lx.title}</span>
        <span style={vPill(V_ACCENT, V_ACCENT_SOFT)}>{lx.official}</span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: 'var(--ink-3)', fontSize: 13 }}
      >
        <Users size={16} style={{ color: V_ACCENT }} />
        <span><strong style={{ color: 'var(--ink)' }}>{lx.count}</strong> {lx.contacts}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: '12px 12px 12px 4px', padding: '10px 12px', fontSize: 13, color: 'var(--ink)', marginBottom: 16, maxWidth: '88%' }}
      >
        {lx.message}
      </motion.div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', marginBottom: 6 }}>
        <span>{lx.delivered}</span>
        <span><strong style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{delivered.toLocaleString()}</strong> / {lx.total}</span>
      </div>
      <div style={{ height: 8, borderRadius: 100, background: 'var(--bg-2)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: V_GREEN, borderRadius: 100, transition: 'width .12s linear' }} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{ display: 'flex', gap: 8, marginTop: 16 }}
      >
        <span style={vPill('#16a34a', V_GREEN_SOFT)}>{lx.blocked}</span>
        <span style={vPill('var(--ink-3)', 'var(--bg-2)')}>{lx.delivery}</span>
      </motion.div>
    </div>
  )
}

const MiniCrmVisual = ({ lx }: { lx: any }) => {
  const reduceMotion = useReducedMotion()
  return (
    <div style={vCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12, borderBottom: '1px solid var(--line)', marginBottom: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Sarah Lin"
          loading="lazy"
          style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--line)', flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Sarah Lin</div>
          <motion.div
            style={{ fontSize: 11, color: V_GREEN }}
            animate={reduceMotion ? undefined : { opacity: [1, 0.45, 1] }}
            transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity }}
          >
            {lx.online}
          </motion.div>
        </div>
        <motion.span
          style={{ display: 'inline-flex', color: V_ACCENT }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw size={15} />
        </motion.span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        style={{ background: 'var(--bg-2)', borderRadius: '4px 12px 12px 12px', padding: '9px 12px', fontSize: 13, color: 'var(--ink)', marginBottom: 14, maxWidth: '85%' }}
      >
        {lx.message}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, padding: 12 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{lx.record}</span>
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 300, damping: 18 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, ...vPill('#16a34a', V_GREEN_SOFT) }}
          >
            <Check size={11} strokeWidth={3} /> {lx.synced}
          </motion.span>
        </div>
        {[
          { k: lx.dealStage, v: lx.negotiation },
          { k: lx.value, v: '$12,000' },
          { k: lx.owner, v: lx.you },
        ].map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 + i * 0.15 }}
            style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}
          >
            <span style={{ color: 'var(--ink-3)' }}>{row.k}</span>
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{row.v}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const FeatureVisual: React.FC<{ kind?: string; label?: string; tx: any }> = ({ kind, label, tx }) => {
  if (kind === 'sync-visual') return <SyncVisual lx={tx.sync} />
  if (kind === 'workflow-visual') return <WorkflowVisual lx={tx.workflow} />
  if (kind === 'mini-crm-visual') return <MiniCrmVisual lx={tx.crm} />
  return (
    <div
      style={{
        aspectRatio: '4/3',
        background: 'var(--bg-2)',
        border: '1px solid var(--line)',
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ink-4)',
        fontFamily: 'var(--f-mono)',
        fontSize: 12,
      }}
    >
      {label || 'Feature visualization'}
    </div>
  )
}

// ================== Features Section ==================
// Mirrors FeaturePageClient's FeaturesSection (alternating light/dark `agent`
// sections) but renders the hand-coded coexistence visuals instead of the
// animation components.
const TickIcon = (
  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

const CoexFeaturesSection: React.FC<{ features: any[]; tx: any }> = ({ features, tx }) => {
  if (!features || features.length === 0) return null
  return (
    <div id="features">
      {/* .visual has a global min-height: 460px; on mobile these visuals can
          be shorter, which would leave a dead band after each one. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 1024px) {
              .landing .fp-visual { min-height: 0 !important; }
            }
          `,
        }}
      />
      {features.map((feature: any, idx: number) => {
        const reverse = idx % 2 === 1
        const isDark = idx === 1
        return (
          <section key={idx} className={`agent${reverse ? ' reverse' : ''}`} {...(isDark ? { 'data-tone': 'dark' as const } : {})}>
            <div className="container">
              <div className="agent-inner">
                <div className="agent-copy reveal">
                  {feature.badge && <span className="sec-tag">{feature.badge}</span>}
                  {feature.headline && (
                    <h3>
                      {feature.headline}
                      {feature.headlineHighlight ? <> <em>{feature.headlineHighlight}</em></> : null}
                    </h3>
                  )}
                  {feature.description && <p className="lede">{feature.description}</p>}

                  {feature.points && feature.points.length > 0 && (
                    <ul className="feat-list">
                      {feature.points.map((point: string, pIdx: number) => (
                        <li key={pIdx}><span className="tick">{TickIcon}</span>{point}</li>
                      ))}
                    </ul>
                  )}

                  {feature.cta && (
                    <LocalizedLink href={feature.cta.url} className="feat-link">
                      {feature.cta.label} →
                    </LocalizedLink>
                  )}
                </div>

                <div className="visual reveal fp-visual" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  <FeatureVisual kind={feature.image} label={feature.badge} tx={tx} />
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

// ================== Comparison Table ==================
const defaultComparisonData = [
  { feature: 'Bulk Broadcasting', regular: 'risk', api: 'yes', coexistence: 'Yes' },
  { feature: 'App Access', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'CRM Integration', regular: 'no', api: 'yes', coexistence: 'Yes' },
  { feature: 'See Messages on Phone', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'Number Ban Protection', regular: 'no', api: 'yes', coexistence: 'Protected' },
  { feature: 'WhatsApp Web Access', regular: 'yes', api: 'no', coexistence: 'Yes' },
  { feature: 'Setup Time', regular: 'instant', api: 'weeks', coexistence: 'Minutes' },
]

const defaultColumnHeaders = {
  feature: 'Feature',
  regular: 'Regular WhatsApp',
  api: 'Standard API',
  coexistence: 'Coexistence'
}

const renderStatus = (status: string, cmp: any) => {
  if (status === 'yes') return <Check style={{ margin: '0 auto', color: 'var(--ok)' }} size={17} />
  if (status === 'no') return <X style={{ margin: '0 auto', color: 'var(--ink-4)' }} size={17} />
  if (status === 'risk') return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--warn)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
      <AlertTriangle size={13} /> {cmp.risky}
    </span>
  )
  return <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{status === 'instant' ? cmp.instant : status === 'weeks' ? cmp.weeks : status}</span>
}

// Light landing-style comparison section, matching the rest of the page.
const ComparisonSection: React.FC<{ data?: any; tx: any }> = ({ data, tx }) => {
  const cmp = tx.cmp
  // Localize the built-in rows/values; a Sanity-provided comparison object
  // still wins when the doc carries one.
  const localizedDefaultRows = defaultComparisonData.map((row, i) => ({
    ...row,
    feature: cmp.rows[i] || row.feature,
    coexistence: row.coexistence === 'Yes' ? cmp.vals.yes : row.coexistence === 'Protected' ? cmp.vals.protected : cmp.vals.minutes,
  }))
  const comparisonData = data?.rows || localizedDefaultRows
  const columnHeaders = data?.columnHeaders || cmp.headers
  const badge = data?.badge || cmp.badge
  const headline = data?.headline || cmp.headline
  const description = data?.description || cmp.description

  const th: React.CSSProperties = {
    padding: '14px 18px', fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600,
    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', textAlign: 'center',
    borderBottom: '1px solid rgba(15,17,21,0.08)',
  }
  const td: React.CSSProperties = {
    padding: '13px 18px', fontSize: 14, textAlign: 'center', borderBottom: '1px solid rgba(15,17,21,0.07)',
  }
  const coexBg = 'rgba(124,109,214,0.10)'

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 960 }}>
        {/* Liquid-glass treatment: bright glow orbs drift BEHIND the frosted
            table pane so the backdrop-filter genuinely diffuses them and the
            color washes through the glass. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .cmp-glass-wrap { position: relative; }
              .cmp-blob {
                position: absolute; border-radius: 50%; filter: blur(38px);
                pointer-events: none; z-index: 0;
              }
              .cmp-blob-a {
                width: 260px; height: 200px; left: -4%; top: -30px;
                background: radial-gradient(circle, rgba(37,211,102,0.55), rgba(37,211,102,0.18) 55%, transparent 75%);
                animation: cmp-drift-a 15s ease-in-out infinite alternate;
              }
              .cmp-blob-b {
                width: 280px; height: 210px; right: -5%; bottom: -40px;
                background: radial-gradient(circle, rgba(124,109,214,0.55), rgba(124,109,214,0.2) 55%, transparent 75%);
                animation: cmp-drift-b 18s ease-in-out infinite alternate;
              }
              @keyframes cmp-drift-a { to { transform: translate(180px, 60px) scale(1.15); } }
              @keyframes cmp-drift-b { to { transform: translate(-200px, -50px) scale(1.1); } }
              .cmp-glass {
                position: relative; z-index: 1; border-radius: 20px; overflow: hidden;
                background: rgba(255,255,255,0.55);
                border: 1px solid rgba(255,255,255,0.65);
                -webkit-backdrop-filter: blur(20px) saturate(160%);
                backdrop-filter: blur(20px) saturate(160%);
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.85), 0 24px 55px -35px rgba(15,17,21,0.45);
              }
              @media (prefers-reduced-motion: reduce) {
                .cmp-blob-a, .cmp-blob-b { animation: none; }
              }
            `,
          }}
        />
        <div className="sec-head centered reveal">
          <span className="sec-tag">{badge}</span>
          <h2>{headline}</h2>
          <p>{description}</p>
        </div>

        <div className="reveal cmp-glass-wrap">
          <span className="cmp-blob cmp-blob-a" aria-hidden="true" />
          <span className="cmp-blob cmp-blob-b" aria-hidden="true" />
          <div className="cmp-glass">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ ...th, textAlign: 'left' }}>{columnHeaders.feature}</th>
                  <th style={th}>{columnHeaders.regular}</th>
                  <th style={th}>{columnHeaders.api}</th>
                  <th style={{ ...th, color: 'var(--accent-ink)', background: coexBg }}>{columnHeaders.coexistence}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row: any, idx: number) => {
                  const last = idx === comparisonData.length - 1
                  const cell = last ? { ...td, borderBottom: 'none' } : td
                  return (
                    <tr key={idx}>
                      <td style={{ ...cell, textAlign: 'left', fontWeight: 600, color: 'var(--ink)' }}>{row.feature}</td>
                      <td style={cell}>{renderStatus(row.regular, cmp)}</td>
                      <td style={cell}>{renderStatus(row.api, cmp)}</td>
                      <td style={{ ...cell, background: coexBg }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--accent-ink)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={11} strokeWidth={3} />
                          </span>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{row.coexistence}</span>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ================== Inline CTA bands ==================
// High-intent CTA sections placed after the benefits, comparison, and
// how-it-works blocks. Copy is variant-specific so each band picks up the
// thread of the section the visitor just finished reading.
// (CTA copy lives in COEX_TX.cta so it localizes with the page.)

// Small WhatsApp-coexistence motion strip for the comparison CTA: message
// dots flow from the App and API chips into one pulsing number hub —
// both channels, one number, animated SaaS-style.
const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const CoexMotionStrip: React.FC = () => {
  const reduceMotion = useReducedMotion()
  const chip: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '7px 13px', borderRadius: 999,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
    fontSize: 12, fontWeight: 600, color: '#F4F6FA', whiteSpace: 'nowrap',
  }
  return (
    <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 26, flexWrap: 'wrap' }}>
      <span style={chip}><Smartphone size={13} style={{ color: '#8FB7F5' }} /> WhatsApp App</span>

      {/* Dots flowing left → hub */}
      <span aria-hidden="true" style={{ position: 'relative', width: 52, height: 6, display: 'inline-block' }}>
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            style={{ position: 'absolute', top: 1, left: 0, width: 5, height: 5, borderRadius: '50%', background: '#8FB7F5' }}
            animate={reduceMotion ? { left: 24, opacity: 0.7 } : { left: [0, 46], opacity: [0, 1, 0] }}
            transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
          />
        ))}
      </span>

      {/* One-number hub with expanding pulse ring */}
      <span aria-hidden="true" style={{ position: 'relative', width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.span
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(37,211,102,0.55)' }}
          animate={reduceMotion ? undefined : { scale: [1, 1.55], opacity: [0.7, 0] }}
          transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          style={{
            width: 44, height: 44, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: '#25D366', color: '#ffffff', boxShadow: '0 0 26px -4px rgba(37,211,102,0.55)',
          }}
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity }}
        >
          <WaIcon size={22} />
        </motion.span>
      </span>

      {/* Dots flowing right → hub */}
      <span aria-hidden="true" style={{ position: 'relative', width: 52, height: 6, display: 'inline-block' }}>
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            style={{ position: 'absolute', top: 1, right: 0, width: 5, height: 5, borderRadius: '50%', background: '#7FD6B0' }}
            animate={reduceMotion ? { right: 24, opacity: 0.7 } : { right: [0, 46], opacity: [0, 1, 0] }}
            transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, delay: 0.4 + i * 0.8, ease: 'easeInOut' }}
          />
        ))}
      </span>

      <span style={chip}><Zap size={13} style={{ color: '#7FD6B0' }} /> WhatsApp API</span>
    </div>
  )
}

const CoexCta: React.FC<{ tx: any }> = ({ tx }) => {
  const { openModal } = useTrialModal()
  const t = tx.cta
  const inner = (
    <>
        <CoexMotionStrip />
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 400,
            fontSize: 'clamp(27px, 3.3vw, 40px)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            margin: 0,
          }}
        >
          {t.headline}
        </h2>
        <p className="reveal" style={{ margin: '12px auto 0', maxWidth: 520, fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          {t.body}
        </p>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          <button onClick={() => openModal('trial')} className="btn btn-primary">
            {t.primary} →
          </button>
        </div>
        <p className="reveal" style={{ marginTop: 13, fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
          {tx.footnote}
        </p>
    </>
  )

  return (
    <section
      className="section"
      data-tone="dark"
      style={{ padding: '44px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Soft glow pair, matching the liquid-glass vocabulary used elsewhere. */}
      <span aria-hidden="true" style={{ position: 'absolute', width: 340, height: 220, left: '12%', top: -70, borderRadius: '50%', filter: 'blur(60px)', background: 'radial-gradient(circle, rgba(37,211,102,0.28), transparent 70%)', pointerEvents: 'none' }} />
      <span aria-hidden="true" style={{ position: 'absolute', width: 360, height: 230, right: '10%', bottom: -80, borderRadius: '50%', filter: 'blur(60px)', background: 'radial-gradient(circle, rgba(124,109,214,0.3), transparent 70%)', pointerEvents: 'none' }} />
      <div className="container" style={{ maxWidth: 760, textAlign: 'center', position: 'relative' }}>
        {inner}
      </div>
    </section>
  )
}

// ================== Main Client Component ==================
interface CoexistencePageClientProps {
  data: any
}

export function CoexistencePageClient({ data }: CoexistencePageClientProps) {
  const locale = useLocale()
  const tx = COEX_TX[locale] || COEX_TX.en
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page not found</h1>
          <LocalizedLink href="/" className="feat-link">
            Go home
          </LocalizedLink>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSection data={data.hero} />
      <BenefitsSection data={data.benefits} />
      <CoexFeaturesSection features={data.features} tx={tx} />
      <ComparisonSection data={data.comparison} tx={tx} />
      <CoexCta tx={tx} />
      <HowItWorksSection data={data.howItWorks} />
      <UseCasesSection data={data.useCases} />
      <FAQSection data={data.faq} />
    </>
  )
}
