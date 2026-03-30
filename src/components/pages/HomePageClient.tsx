'use client'

import React, { useState, useEffect, useRef, type ReactNode } from 'react'
import {
  ArrowRight,
  RefreshCw,
  Filter,
  TrendingUp,
  Download,
  Plug,
  Power,
  Check,
  ChevronDown,
  Star,
  MessageSquare,
  Shield,
  Zap,
  Clock,
  Users,
  Globe,
  Eye,
  Radio,
  Bot,
  Wrench,
  Headphones,
  BarChart3,
  Ghost,
  Play,
  Sparkles,
} from 'lucide-react'
import { useTrialModal } from '@/providers/TrialModalProvider'

/* ═══════════════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Attio-inspired: clean, light, minimal
   ═══════════════════════════════════════════════════════════════════════════════ */

const BLUE = '#266DF0'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
        filter: visible ? 'blur(0)' : 'blur(4px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, visible } = useInView()
  useEffect(() => {
    if (!visible) return
    let c = 0
    const step = Math.max(1, Math.ceil(value / 60))
    const id = setInterval(() => { c += step; if (c >= value) { setCount(value); clearInterval(id) } else setCount(c) }, 16)
    return () => clearInterval(id)
  }, [visible, value])
  return <span ref={ref}>{count}{suffix}</span>
}

/* Primary button — Attio dark style */
function Btn({ children, onClick, variant = 'primary', className = '' }: { children: ReactNode; onClick?: () => void; variant?: 'primary' | 'outline'; className?: string }) {
  const styles = {
    primary: 'bg-[#202124] text-[#F3F4F6] border-[#383E47] hover:bg-[#505967] hover:text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]',
    outline: 'bg-white text-[#2E3238] border-[#CAD0D9] hover:border-[#6F7988] shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
  }
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold text-[14px] h-[36px] px-4 rounded-[10px] border transition-all duration-300 ease-in-out hover:duration-[50ms] active:scale-[0.98] cursor-pointer select-none ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

/* Tag/badge pill */
function Tag({ children, color = 'blue' }: { children: ReactNode; color?: 'blue' | 'green' | 'red' | 'purple' | 'neutral' }) {
  const styles = {
    blue: 'bg-[#E5EEFF] text-[#245BC2]',
    green: 'bg-[#CFF0E3] text-[#075A39]',
    red: 'bg-[#FFEBEB] text-[#772322]',
    purple: 'bg-[#F5EEFF] text-[#4711BB]',
    neutral: 'bg-[#F4F5F6] text-[#505967]',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-[12px] font-semibold tracking-[-0.005em] border border-transparent ${styles[color]}`}>
      {children}
    </span>
  )
}

/* Card */
function Card({ children, className = '', highlight = false }: { children: ReactNode; className?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-[12px] border bg-white transition-all duration-300 ${highlight ? 'border-[#709FF5] shadow-[0_2px_4px_-2px_rgba(15,107,233,0.12),0_3px_6px_-2px_rgba(15,107,233,0.08)]' : 'border-[#E4E7EC] shadow-[0_4px_4px_rgba(24,39,75,0.04),0_2px_4px_rgba(24,39,75,0.02)] hover:shadow-[0_2px_4px_-2px_rgba(15,107,233,0.12),0_3px_6px_-2px_rgba(15,107,233,0.08)]'} ${className}`}>
      {children}
    </div>
  )
}

/* Section wrapper */
function Section({ children, className = '', bg = 'white', id }: { children: ReactNode; className?: string; bg?: 'white' | 'gray'; id?: string }) {
  return (
    <section id={id} className={`relative py-[100px] ${bg === 'gray' ? 'bg-[#FAFAFB]' : 'bg-white'} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6">{children}</div>
    </section>
  )
}

/* Section heading */
function SectionHead({ tag, title, subtitle, center = true }: { tag?: string; title: ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {tag && <Reveal><Tag>{tag}</Tag></Reveal>}
      <Reveal delay={60}>
        <h2 className="mt-4 font-semibold text-[#202124] tracking-[-0.01em] leading-[1.1]" style={{ fontSize: 'clamp(32px, 24px + 2vw, 56px)', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={120}>
          <p className="mt-4 text-[#6F7988] text-[18px] leading-[1.5] tracking-[-0.01em] max-w-[600px]" style={center ? { marginInline: 'auto' } : {}}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const { openModal } = useTrialModal()

  return (
    <section className="relative bg-gradient-to-b from-[#FAFAFB] to-white pt-[140px] pb-[80px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <Reveal>
          <Tag color="blue">
            <Sparkles size={12} />
            AI-powered WhatsApp CRM
          </Tag>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 font-semibold text-[#101113] tracking-[-0.02em] leading-[1]" style={{ fontSize: 'clamp(40px, 20px + 5vw, 64px)', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            WhatsApp AI Agents
            <br />
            <span style={{ color: BLUE }}>for CRM Teams</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-[#6F7988] text-[18px] leading-[1.5] tracking-[-0.01em] max-w-[560px] mx-auto">
            Every conversation synced. Every lead qualified. Every deal tracked.
            AI agents that plug into your CRM and work your WhatsApp pipeline — 24/7.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Btn onClick={() => openModal('trial')}>
              Install for Free
              <ArrowRight size={14} />
            </Btn>
            <Btn variant="outline" onClick={() => openModal('demo')}>
              Book a Demo
            </Btn>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-[13px] text-[#8F99A8]">
            {[
              { icon: <Star size={13} className="text-amber-500 fill-amber-500" />, text: '4.6 on HubSpot Marketplace' },
              { icon: <Users size={13} />, text: '2,000+ sales teams' },
              { icon: <Globe size={13} />, text: '40+ countries' },
              { icon: <Shield size={13} />, text: 'Meta Business Partner' },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-1.5">{t.icon}<span>{t.text}</span></div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { label: 'Personal WhatsApp', color: 'green' as const },
              { label: 'WhatsApp Business App', color: 'blue' as const },
              { label: 'WhatsApp Business API', color: 'purple' as const },
            ].map((t) => (
              <Tag key={t.label} color={t.color}>
                <MessageSquare size={11} />{t.label}
              </Tag>
            ))}
          </div>
          <p className="text-[#A4ADBA] text-[13px] mt-3">Works with all three. Simultaneously. No migration needed.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   2. LOGO BAR
   ═══════════════════════════════════════════════════════════════════════════════ */

function LogoBar() {
  const items = ['SaaS', 'FinTech', 'Real Estate', 'EdTech', 'Healthcare', 'E-Commerce', 'Consulting', 'Logistics']
  return (
    <section className="py-12 bg-white border-y border-[#EDEFF3]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-center text-[12px] text-[#A4ADBA] uppercase tracking-[0.15em] font-medium mb-8">
          Trusted by revenue teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((cat, i) => (
            <Reveal key={cat} delay={i * 40}>
              <span className="text-[#2E3238] text-[18px] font-semibold tracking-[-0.01em] hover:text-[#266DF0] transition-colors duration-300 cursor-default">
                {cat}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. THE PROBLEM
   ═══════════════════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  const problems = [
    { title: 'Conversations Lost', desc: 'Reps close deals on WhatsApp. CRM shows an empty timeline.', icon: <MessageSquare size={20} /> },
    { title: 'Leads Going Cold', desc: '11 PM lead comes in. Nobody responds. By morning, they signed with your competitor.', icon: <Clock size={20} /> },
    { title: 'Deals Dying Silently', desc: "Stalled deals, ghosted clients — all buried in chat threads you can't see.", icon: <Ghost size={20} /> },
  ]

  return (
    <Section bg="gray">
      <SectionHead
        tag="The Blind Spot"
        title={<>90% of your sales conversations happen on WhatsApp.<br /><span className="text-[#F65351]">Your CRM sees none of it.</span></>}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <Card className="p-6 h-full group hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-[10px] bg-[#FFEBEB] flex items-center justify-center text-[#F65351] mb-4 group-hover:scale-105 transition-transform duration-300">
                {p.icon}
              </div>
              <h3 className="text-[16px] font-semibold text-[#202124] mb-2 tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[#6F7988] text-[14px] leading-[1.6]">{p.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="text-center text-[#A4ADBA] text-[14px] mt-12">
          Each of these blind spots has an agent that fixes it. <span style={{ color: BLUE }}>↓</span>
        </p>
      </Reveal>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   AGENT BLOCK (shared layout for agents 4–6)
   ═══════════════════════════════════════════════════════════════════════════════ */

function AgentBlock({ problemText, agentName, icon, tagline, color, badge, bullets, children, reverse, id }: {
  problemText: string; agentName: string; icon: ReactNode; tagline: string; color: 'blue' | 'purple'; badge?: string; bullets: string[]; children?: ReactNode; reverse?: boolean; id?: string
}) {
  const tagColor = color === 'blue' ? 'blue' as const : 'purple' as const

  return (
    <Section id={id}>
      <Reveal>
        <div className="rounded-[10px] bg-[#FFEBEB] border border-[#FFDCDB] px-5 py-3 mb-12 max-w-2xl mx-auto">
          <p className="text-[#772322] text-[14px] font-medium text-center">{problemText}</p>
        </div>
      </Reveal>

      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-start`}>
        <div className="flex-1 min-w-0">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center ${color === 'blue' ? 'bg-[#E5EEFF] text-[#266DF0]' : 'bg-[#F5EEFF] text-[#4711BB]'}`}>
                {icon}
              </div>
              <h3 className="font-semibold text-[#202124] tracking-[-0.01em]" style={{ fontSize: 'clamp(24px, 20px + 1vw, 36px)' }}>{agentName}</h3>
            </div>
            {badge && <Tag color="purple"><Sparkles size={10} /> {badge}</Tag>}
          </Reveal>

          <Reveal delay={60}>
            <p className={`text-[18px] font-medium mt-4 mb-8 tracking-[-0.01em] ${color === 'blue' ? 'text-[#266DF0]' : 'text-[#4711BB]'}`}>{tagline}</p>
          </Reveal>

          <div className="space-y-3">
            {bullets.map((b, i) => (
              <Reveal key={i} delay={100 + i * 40}>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#CFF0E3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-[#075A39]" />
                  </div>
                  <span className="text-[#505967] text-[14px] leading-[1.6]">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <Reveal delay={120}>{children}</Reveal>
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. CRM SYNC AGENT
   ═══════════════════════════════════════════════════════════════════════════════ */

function CRMSyncAgent() {
  return (
    <AgentBlock
      id="crm-sync"
      problemText="Your reps close deals on WhatsApp. Your CRM shows nothing."
      agentName="CRM Sync Agent"
      icon={<RefreshCw size={20} />}
      tagline="Every message, automatically captured."
      color="blue"
      bullets={[
        'Real-time bi-directional sync — WhatsApp ↔ CRM',
        'Smart field mapping — right contact, right deal, right company',
        'Full conversation history preserved & searchable',
        'Attachments, voice notes, media — all captured',
        'Works across Personal WhatsApp, Business App, AND API',
      ]}
    >
      <div className="space-y-3">
        <Card className="p-5 flex items-center justify-between gap-4" highlight>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#FEEEE1] flex items-center justify-center text-[#F97316] font-bold text-[13px]">H</div>
            <div>
              <span className="text-[#202124] font-semibold text-[14px]">HubSpot</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={11} className="text-amber-500 fill-amber-500" />
                <span className="text-[#A4ADBA] text-[11px]">4.6 on Marketplace</span>
              </div>
            </div>
          </div>
          <Tag color="blue">Deepest Integration</Tag>
        </Card>

        <div className="grid grid-cols-4 gap-2">
          {['Salesforce', 'Zoho', 'Pipedrive', 'Bitrix24', 'LeadSquared', 'Freshworks', 'Google Sheets', 'Webhooks'].map((n) => (
            <Card key={n} className="px-2 py-2.5 text-center !shadow-none hover:!shadow-none">
              <span className="text-[#6F7988] text-[11px] font-medium">{n}</span>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <Tag color="blue">Unique to Eazybe</Tag>
          <h4 className="text-[#202124] font-semibold text-[15px] mt-3 mb-2">App + API Coexistence</h4>
          <p className="text-[#6F7988] text-[13px] leading-[1.6] mb-5">
            Run WhatsApp Business App and API side by side — no migration needed.
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {[{ l: 'Personal', c: 'green' as const }, { l: 'Business App', c: 'blue' as const }, { l: 'Business API', c: 'purple' as const }].map((x) => (
                <Tag key={x.l} color={x.c}>{x.l}</Tag>
              ))}
            </div>
            <div className="w-px h-4 bg-[#E4E7EC]" />
            <Tag color="blue">Eazybe CRM Sync</Tag>
            <div className="w-px h-4 bg-[#E4E7EC]" />
            <Tag color="neutral">Your CRM</Tag>
          </div>
        </Card>
      </div>
    </AgentBlock>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. LEAD QUALIFICATION AGENT
   ═══════════════════════════════════════════════════════════════════════════════ */

function LeadQualificationAgent() {
  return (
    <AgentBlock
      problemText="11 PM lead comes in. Nobody's awake. By morning, the lead went cold."
      agentName="Lead Qualification Agent"
      icon={<Filter size={20} />}
      tagline="Your best rep's instincts. Running 24/7."
      color="purple"
      badge="AI Agent — Trained on your best reps"
      bullets={[
        'Qualifies inbound WhatsApp leads using BANT / MEDDIC / your custom criteria',
        'Multilingual — English, Portuguese, Spanish, Hindi + more',
        'CRM-aware routing — hot leads go to the right rep instantly',
        'After-hours coverage — never miss a lead again',
        "Learns from your top closers' actual conversations",
      ]}
      reverse
    >
      <Card className="p-8">
        <p className="text-[12px] uppercase tracking-[0.15em] text-[#A4ADBA] font-medium mb-8">Impact Metrics</p>
        {[
          { val: 40, s: 'x', label: 'faster lead response time', color: '#266DF0' },
          { val: 3, s: 'x', label: 'increase in qualified pipeline', color: '#4711BB' },
          { val: 35, s: '%', label: 'lead-to-meeting conversion improvement', color: '#0DB472' },
        ].map((m, i) => (
          <div key={i}>
            {i > 0 && <div className="my-6 h-px bg-[#EDEFF3]" />}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-semibold tracking-[-0.02em]" style={{ fontSize: 'clamp(36px, 28px + 2vw, 56px)', color: m.color }}>
                <Counter value={m.val} suffix={m.s} />
              </span>
            </div>
            <p className="text-[#6F7988] text-[14px]">{m.label}</p>
          </div>
        ))}
      </Card>
    </AgentBlock>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. REVENUE OPS AGENT
   ═══════════════════════════════════════════════════════════════════════════════ */

function RevenueOpsAgent() {
  const metrics = [
    { label: 'At risk', value: '12', color: '#F65351', bg: '#FFEBEB' },
    { label: 'Ghosted > 48h', value: '8', color: '#4711BB', bg: '#F5EEFF' },
    { label: 'Ready to close', value: '5', color: '#0DB472', bg: '#CFF0E3' },
    { label: 'Pipeline health', value: '72%', color: '#266DF0', bg: '#E5EEFF' },
  ]

  return (
    <AgentBlock
      problemText="Stalled deals, ghosted clients, escalation requests — all buried in chat threads you can't see."
      agentName="Revenue Operations Agent"
      icon={<TrendingUp size={20} />}
      tagline="See which deals are really alive."
      color="purple"
      badge="AI Agent"
      bullets={[
        "Ghosted deal detection — flagged before it's too late",
        'Deal health scoring from actual conversation signals',
        'At-risk pipeline alerts sent to managers',
        'Weekly executive brief to your inbox',
      ]}
    >
      <Card className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={14} style={{ color: BLUE }} />
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#A4ADBA] font-medium">Executive Brief</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-[10px] p-5 text-center" style={{ backgroundColor: m.bg }}>
              <p className="font-semibold tracking-[-0.02em] mb-1" style={{ fontSize: 'clamp(24px, 20px + 1vw, 36px)', color: m.color }}>
                {m.value}
              </p>
              <p className="text-[#6F7988] text-[12px] font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </AgentBlock>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. CONTEXT ENGINE + MORE AGENTS
   ═══════════════════════════════════════════════════════════════════════════════ */

function ContextEngineSection() {
  const agents = [
    { name: 'Team Visibility', desc: 'Track rep activity', icon: <Eye size={18} /> },
    { name: 'Broadcast', desc: 'Send at scale', icon: <Radio size={18} /> },
    { name: 'WhatsApp Copilot', desc: 'AI inside WA Web', icon: <Bot size={18} /> },
    { name: 'Sales Coaching', desc: 'Coach from convos', icon: <BarChart3 size={18} /> },
    { name: 'CS Agent', desc: 'Automate support', icon: <Headphones size={18} /> },
    { name: 'Agent Builder', desc: 'Build your own', icon: <Wrench size={18} /> },
  ]

  return (
    <Section bg="gray">
      <Reveal>
        <Card className="p-10 text-center mb-16 !shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <Tag color="blue">Shared Context Engine</Tag>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 mb-4">
            <Tag color="green"><span className="font-semibold">WhatsApp Data</span></Tag>
            <span className="text-[#CAD0D9] text-xl font-semibold">+</span>
            <Tag color="blue"><span className="font-semibold">CRM Data</span></Tag>
            <span className="text-[#CAD0D9] text-xl font-semibold">=</span>
            <Tag color="purple"><span className="font-semibold">One Brain</span></Tag>
          </div>
          <p className="text-[#6F7988] text-[14px] max-w-md mx-auto">
            Every agent reads both. Add a new agent — it already knows your business.
          </p>
        </Card>
      </Reveal>

      <Reveal><p className="text-center text-[#A4ADBA] text-[14px] mb-10">CRM Sync, Lead Qualification, and Revenue Ops are just the start.</p></Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {agents.map((a, i) => (
          <Reveal key={a.name} delay={i * 40}>
            <Card className="p-5 text-center group cursor-default h-full hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center text-[#6F7988] mx-auto mb-3 group-hover:text-[#266DF0] group-hover:bg-[#E5EEFF] transition-all duration-300">{a.icon}</div>
              <h4 className="text-[#202124] font-semibold text-[13px] mb-0.5">{a.name}</h4>
              <p className="text-[#A4ADBA] text-[11px]">{a.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="text-center mt-10">
          <a href="/agents" className="text-[14px] font-medium hover:underline inline-flex items-center gap-1.5 group" style={{ color: BLUE }}>
            Explore All Agents <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </Reveal>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════════ */

function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Install', desc: 'Add the Eazybe Chrome extension. 30 seconds.', icon: <Download size={22} /> },
    { num: '02', title: 'Connect', desc: 'Connect your CRM. HubSpot, Salesforce, Zoho — one click OAuth.', icon: <Plug size={22} /> },
    { num: '03', title: 'Activate', desc: 'Turn on your agents. CRM Sync starts immediately. AI agents activate within 24 hours.', icon: <Power size={22} /> },
  ]

  return (
    <Section>
      <SectionHead
        tag="Get Started"
        title={<>Live in 10 minutes. <span style={{ color: '#0DB472' }}>Not 10 weeks.</span></>}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <Reveal key={s.num} delay={i * 80}>
            <Card className="p-8 text-center group relative overflow-hidden h-full hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-2 right-4 font-semibold text-[#F3F4F6] text-[64px] leading-none select-none group-hover:text-[#E5EEFF] transition-colors duration-500">{s.num}</span>
              <div className="w-12 h-12 rounded-[10px] bg-[#E5EEFF] flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform duration-300" style={{ color: BLUE }}>{s.icon}</div>
              <h3 className="text-[18px] font-semibold text-[#202124] mb-2">{s.title}</h3>
              <p className="text-[#6F7988] text-[14px] leading-[1.6]">{s.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="text-center text-[#A4ADBA] text-[13px] max-w-lg mx-auto mt-10">
          No code. No IT team. No migration. Your reps keep using WhatsApp Web exactly as they do today.
        </p>
      </Reveal>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. CASE STUDIES
   ═══════════════════════════════════════════════════════════════════════════════ */

function CaseStudiesSection() {
  const studies = [
    { industry: 'SaaS Company', quote: 'We were losing 60% of WhatsApp conversations — they never made it to HubSpot. Eazybe fixed that in one day.', results: ['10,000+ conversations synced', '100% CRM coverage (from ~40%)', '45 min/day saved per rep'], role: 'VP Sales Operations' },
    { industry: 'FinTech Startup', quote: 'Lead response went from 4 hours to under 60 seconds. The qualification agent handles first touch so my team wakes up to hot leads.', results: ['40x faster response time', '3x qualified pipeline', '35% conversion improvement'], role: 'Head of Revenue' },
    { industry: 'Real Estate Agency', quote: "No visibility into what 25 reps did on WhatsApp. Now I see every conversation, every deal, every risk.", results: ['8 ghosted deals recovered ($120K)', '60% faster rep response', 'Replaced 3 manual reports'], role: 'Sales Director' },
  ]

  return (
    <Section bg="gray">
      <SectionHead
        tag="Results"
        title={<>Don&apos;t take our word for it. <span style={{ color: BLUE }}>Look at the numbers.</span></>}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {studies.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <Card className="overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
              <div className="h-[3px]" style={{ background: `linear-gradient(to right, ${BLUE}, #4711BB)` }} />
              <div className="p-6 flex flex-col flex-1">
                <Tag color="neutral">{s.industry}</Tag>
                <p className="text-[#505967] text-[14px] italic leading-[1.6] mt-4 mb-6 flex-1">&ldquo;{s.quote}&rdquo;</p>
                <div className="space-y-2 mb-4">
                  {s.results.map((r, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Check size={13} style={{ color: BLUE }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-[#202124] text-[13px] font-medium">{r}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#A4ADBA] text-[12px]">— {s.role}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   10. COMPARISON
   ═══════════════════════════════════════════════════════════════════════════════ */

function ComparisonSection() {
  const rows = [
    { f: 'CRM sync (all message types)', b: 'Partial', c: '—', e: 'Full bi-directional' },
    { f: 'Works with Personal WhatsApp', b: '—', c: '—', e: '✓' },
    { f: 'App + API coexistence', b: '—', c: '—', e: '✓' },
    { f: 'AI lead qualification', b: '—', c: 'Basic rules', e: 'Trained on your reps' },
    { f: 'Deal health / ghosted detection', b: '—', c: '—', e: '✓' },
    { f: 'Revenue ops intelligence', b: '—', c: '—', e: '✓' },
    { f: 'HubSpot deep integration', b: 'Basic', c: '—', e: '✓ Native' },
    { f: 'Setup time', b: 'Days–weeks', c: 'Hours', e: '10 minutes' },
  ]

  return (
    <Section>
      <SectionHead title="How Eazybe compares" />
      <Reveal delay={60}>
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EDEFF3]">
                <th className="text-left p-5 text-[#A4ADBA] text-[12px] uppercase tracking-[0.1em] font-medium">Capability</th>
                <th className="text-center p-5 text-[#A4ADBA] text-[12px] uppercase tracking-[0.1em] font-medium">Basic Plugins</th>
                <th className="text-center p-5 text-[#A4ADBA] text-[12px] uppercase tracking-[0.1em] font-medium">Chatbot Tools</th>
                <th className="text-center p-5 text-[12px] uppercase tracking-[0.1em] font-semibold" style={{ color: BLUE }}>Eazybe</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#FAFAFB] transition-colors duration-150">
                  <td className="p-5 text-[#202124] font-medium text-[13px]">{r.f}</td>
                  <td className="p-5 text-center text-[#A4ADBA] text-[13px]">{r.b}</td>
                  <td className="p-5 text-center text-[#A4ADBA] text-[13px]">{r.c}</td>
                  <td className="p-5 text-center font-semibold text-[13px]" style={{ color: BLUE }}>{r.e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Reveal>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   11. LIVE DEMO
   ═══════════════════════════════════════════════════════════════════════════════ */

function LiveDemoSection() {
  return (
    <Section bg="gray">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <h2 className="font-semibold text-[#202124] tracking-[-0.01em] leading-[1.1] mb-4" style={{ fontSize: 'clamp(32px, 24px + 2vw, 56px)' }}>
            See it for yourself. <span style={{ color: '#0DB472' }}>Right now.</span>
          </h2>
          <p className="text-[#6F7988] text-[16px] leading-[1.6] mb-10">
            Our Lead Qualification Agent will qualify YOU on WhatsApp — in 60 seconds. No signup. No sales pitch.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <a
            href="https://wa.me/13028040259?text=Hi%20I%20want%20to%20see%20a%20demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 h-[44px] px-6 bg-[#0DB472] text-white font-semibold text-[14px] rounded-[10px] border border-[#0FC27B] hover:bg-[#0FC27B] transition-all duration-300 active:scale-[0.98] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <MessageSquare size={16} />
            Chat with the Agent on WhatsApp
            <ArrowRight size={14} />
          </a>
          <p className="text-[#A4ADBA] text-[12px] mt-4">Go ahead, try to stump it.</p>
        </Reveal>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   12. VIDEO DEMO
   ═══════════════════════════════════════════════════════════════════════════════ */

function VideoDemoSection() {
  const { openModal } = useTrialModal()
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="font-semibold text-[#202124] tracking-[-0.01em] mb-10" style={{ fontSize: 'clamp(28px, 22px + 1.5vw, 48px)' }}>
            60-second walkthrough
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <Card className="aspect-video mb-10 flex items-center justify-center group cursor-pointer hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div>
              <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#E5EEFF] group-hover:scale-105 transition-all duration-300">
                <Play size={24} className="ml-1" style={{ color: BLUE }} fill="currentColor" />
              </div>
              <p className="text-[#A4ADBA] text-[13px] font-medium">Watch the demo</p>
            </div>
          </Card>
        </Reveal>
        <Reveal delay={120}>
          <Btn onClick={() => openModal('trial')}>Install for Free</Btn>
        </Reveal>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   13. PRICING
   ═══════════════════════════════════════════════════════════════════════════════ */

function PricingSection() {
  const { openModal } = useTrialModal()
  const [annual, setAnnual] = useState(true)

  const plans = [
    { name: 'Sync', price: annual ? 24 : 29, desc: 'Small teams getting WhatsApp into CRM', features: ['CRM Sync Agent', 'WhatsApp Copilot (basic)', 'Coexistence (App + API)', 'HubSpot + 7 CRM integrations'], cta: 'Start Free Trial', act: () => openModal('trial'), pop: false },
    { name: 'Teams', price: annual ? 39 : 49, desc: 'Growing teams needing visibility + outreach', features: ['Everything in Sync', 'Full WhatsApp Copilot + AI', 'Team Visibility Agent', 'Broadcast & Sequences', 'Revenue Inbox', 'Rep performance tracking'], cta: 'Start Free Trial', act: () => openModal('trial'), pop: true },
    { name: 'AI Agents', price: null, priceLabel: 'From $299/mo', desc: 'AI-powered sales automation', features: ['Everything in Teams', 'Lead Qualification Agent', 'Revenue Operations Agent', 'Sales Coaching Agent', 'Customer Success Agent', 'Agent Builder + BYOLLM', 'Custom training'], cta: 'Book a Demo', act: () => openModal('demo'), pop: false },
  ]

  return (
    <Section bg="gray">
      <SectionHead
        title={<>Start with sync. <span style={{ color: BLUE }}>Add agents as you grow.</span></>}
        subtitle="Every plan includes unlimited conversation sync. Add AI agents when you're ready."
      />

      <Reveal>
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-[14px] font-medium transition-colors duration-200 ${!annual ? 'text-[#202124]' : 'text-[#A4ADBA]'}`}>Monthly</span>
          <button onClick={() => setAnnual(!annual)} className="relative w-11 h-6 rounded-full bg-[#E4E7EC] border border-[#DEE2E7] cursor-pointer">
            <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-sm transition-all duration-200 ${annual ? 'left-[22px] bg-[#266DF0]' : 'left-0.5 bg-[#6F7988]'}`} />
          </button>
          <span className={`text-[14px] font-medium transition-colors duration-200 ${annual ? 'text-[#202124]' : 'text-[#A4ADBA]'}`}>
            Annual <Tag color="green">Save 20%</Tag>
          </span>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            <Card className={`flex flex-col h-full overflow-hidden hover:-translate-y-1 transition-all duration-300 ${p.pop ? '!border-[#709FF5] !shadow-[0_2px_4px_-2px_rgba(15,107,233,0.12),0_6px_16px_-4px_rgba(15,107,233,0.1)]' : ''}`}>
              {p.pop && <div className="h-[3px]" style={{ background: `linear-gradient(to right, ${BLUE}, #4711BB)` }} />}
              <div className="p-7 flex flex-col flex-1 relative">
                {p.pop && <span className="absolute top-4 right-4"><Tag color="blue">Popular</Tag></span>}
                <h3 className="text-[18px] font-semibold text-[#202124] mb-1">{p.name}</h3>
                <p className="text-[#A4ADBA] text-[13px] mb-5">{p.desc}</p>
                {p.price !== null ? (
                  <div className="mb-6">
                    <span className="font-semibold text-[#101113] tracking-[-0.02em]" style={{ fontSize: 'clamp(32px, 26px + 1.5vw, 44px)' }}>${p.price}</span>
                    <span className="text-[#A4ADBA] text-[13px]">/user/mo</span>
                  </div>
                ) : (
                  <div className="mb-6"><span className="text-[18px] font-semibold text-[#101113]">{p.priceLabel}</span></div>
                )}
                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check size={13} style={{ color: BLUE }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-[#505967] text-[13px]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Btn variant={p.pop ? 'primary' : 'outline'} onClick={p.act} className="w-full">{p.cta}</Btn>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="text-center text-[#A4ADBA] text-[12px] mb-8">14-day free trial · No credit card · Cancel anytime</p>
        <Card className="p-8 text-center">
          <h4 className="text-[#202124] font-semibold text-[18px] mb-2">Enterprise</h4>
          <p className="text-[#6F7988] text-[13px] mb-4">50+ users, custom SLA, dedicated CSM, SSO, API access, custom agents.</p>
          <a onClick={() => openModal('demo')} className="text-[14px] font-medium hover:underline inline-flex items-center gap-1.5 cursor-pointer" style={{ color: BLUE }}>Talk to Sales <ArrowRight size={14} /></a>
        </Card>
      </Reveal>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   14. FAQ
   ═══════════════════════════════════════════════════════════════════════════════ */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: 'What exactly is Eazybe?', a: 'Eazybe brings your WhatsApp sales conversations into your CRM — automatically. Our AI agents sync every message, qualify leads 24/7, and alert you when deals go cold.' },
    { q: 'How does WhatsApp-CRM sync work?', a: 'Install our Chrome extension, connect your CRM (one-click for HubSpot), and every WhatsApp conversation automatically maps to the right contact, deal, and company. Real-time, bi-directional.' },
    { q: 'Do I need WhatsApp Business API?', a: "No. Eazybe works with personal WhatsApp, Business App, and API — simultaneously. We're the only tool that supports all three at once." },
    { q: 'What is App + API Coexistence?', a: 'Run both WhatsApp Business App and API simultaneously — keep your manual conversations on the App while automating through the API. No migration needed.' },
    { q: 'What does "trained on your best reps" mean?', a: "Our AI agents analyze your top performers' conversations — how they qualify, follow up, handle objections — and apply those patterns automatically." },
    { q: 'Which CRMs do you support?', a: 'HubSpot (4.6★ on Marketplace), Salesforce, Zoho, Pipedrive, Bitrix24, LeadSquared, Freshworks, and Google Sheets.' },
    { q: 'How long does setup take?', a: '10 minutes. Install the Chrome extension, connect your CRM, and sync starts immediately. AI agents train within 24 hours.' },
    { q: 'Is my data secure?', a: "Meta Business Partner, GDPR-compliant, data syncs directly to your CRM. We support BYOLLM so your data never leaves your control." },
    { q: 'How is this different?', a: 'Three things no one else offers: App + API coexistence, AI agents trained on YOUR conversations, and revenue intelligence from WhatsApp signals.' },
  ]

  return (
    <Section>
      <SectionHead title="Frequently asked questions" />
      <div className="max-w-2xl mx-auto space-y-2">
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 25}>
            <Card className="overflow-hidden !shadow-none hover:!shadow-[0_4px_4px_rgba(24,39,75,0.04),0_2px_4px_rgba(24,39,75,0.02)] transition-shadow duration-200">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer">
                <span className={`font-medium text-[14px] pr-4 transition-colors duration-200 ${open === i ? 'text-[#101113]' : 'text-[#2E3238]'}`}>{f.q}</span>
                <ChevronDown size={16} className={`text-[#A4ADBA] flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open === i ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden"><p className="text-[#6F7988] text-[14px] leading-[1.6] px-5">{f.a}</p></div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   15. FINAL CTA
   ═══════════════════════════════════════════════════════════════════════════════ */

function FinalCTASection() {
  const { openModal } = useTrialModal()
  return (
    <section className="relative py-[120px] bg-[#101113] overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <h2 className="font-semibold text-white tracking-[-0.02em] leading-[1.1]" style={{ fontSize: 'clamp(32px, 20px + 3vw, 64px)' }}>
            Your team had 200 WhatsApp
            <br />conversations today.
          </h2>
          <p className="mt-4 text-[#8F99A8] font-medium" style={{ fontSize: 'clamp(18px, 15px + 0.8vw, 24px)' }}>
            How many made it to your CRM?
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <button
              onClick={() => openModal('trial')}
              className="inline-flex items-center justify-center gap-2 font-semibold text-[14px] h-[36px] px-4 rounded-[10px] border bg-white text-[#101113] border-white/20 hover:bg-[#F3F4F6] transition-all duration-300 active:scale-[0.98] cursor-pointer select-none"
            >
              Start Free — Live in 10 Minutes
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => openModal('demo')}
              className="inline-flex items-center justify-center gap-2 font-semibold text-[14px] h-[36px] px-4 rounded-[10px] border bg-transparent text-[#CAD0D9] border-[#383E47] hover:border-[#6F7988] hover:text-white transition-all duration-300 active:scale-[0.98] cursor-pointer select-none"
            >
              Book a Demo
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════════════════════════════ */

export function HomePageClient() {
  return (
    <div className="bg-white text-[#2E3238]">
      <HeroSection />
      <LogoBar />
      <ProblemSection />
      <CRMSyncAgent />
      <LeadQualificationAgent />
      <RevenueOpsAgent />
      <ContextEngineSection />
      <HowItWorksSection />
      <CaseStudiesSection />
      <ComparisonSection />
      <LiveDemoSection />
      <VideoDemoSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  )
}
