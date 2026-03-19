'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  Check,
  X,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Users,
  TrendingUp,
  CheckSquare,
  Search,
  MoreVertical,
  Activity,
  Workflow,
  Zap,
  PieChart,
  Users2,
  Cloud,
  Plus,
  Share2,
  ArrowRight
} from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { useTrialModal } from '@/providers/TrialModalProvider'

// ─── CRM Configuration ──────────────────────────────────────────────────────

const crmConfig: Record<string, {
  name: string
  logo: string
  color: string
  gradient: string
  partnerText: string
  certified: boolean
}> = {
  hubspot: {
    name: 'HubSpot',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256',
    color: '#FF7A59',
    gradient: 'from-[#FF7A59] to-[#FF5C35]',
    partnerText: 'HubSpot App Partner',
    certified: true
  },
  salesforce: {
    name: 'Salesforce',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256',
    color: '#00A1E0',
    gradient: 'from-[#00A1E0] to-[#0070D2]',
    partnerText: 'Salesforce Partner',
    certified: true
  },
  zoho: {
    name: 'Zoho',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256',
    color: '#E42527',
    gradient: 'from-[#E42527] to-[#C41E3A]',
    partnerText: 'Zoho Partner',
    certified: true
  },
  bitrix24: {
    name: 'Bitrix24',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bitrix24.com&size=256',
    color: '#2FC6F6',
    gradient: 'from-[#2FC6F6] to-[#1AA3D0]',
    partnerText: 'Bitrix24 Partner',
    certified: false
  },
  leadsquared: {
    name: 'LeadSquared',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.leadsquared.com&size=256',
    color: '#0066CC',
    gradient: 'from-[#0066CC] to-[#004C99]',
    partnerText: 'LeadSquared Partner',
    certified: false
  },
  freshdesk: {
    name: 'Freshdesk',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.freshdesk.com&size=256',
    color: '#25C16F',
    gradient: 'from-[#25C16F] to-[#1A9E58]',
    partnerText: 'Freshdesk Partner',
    certified: false
  },
  'google-sheets': {
    name: 'Google Sheets',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://sheets.google.com&size=256',
    color: '#0F9D58',
    gradient: 'from-[#0F9D58] to-[#0B7A43]',
    partnerText: 'Google Partner',
    certified: false
  },
  webhooks: {
    name: 'Webhooks',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://webhook.site&size=256',
    color: '#6B7280',
    gradient: 'from-[#6B7280] to-[#4B5563]',
    partnerText: 'Custom Integration',
    certified: false
  },
  pipedrive: {
    name: 'Pipedrive',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.pipedrive.com&size=256',
    color: '#017737',
    gradient: 'from-[#017737] to-[#015A2A]',
    partnerText: 'Pipedrive Partner',
    certified: false
  },
  monday: {
    name: 'Monday.com',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.monday.com&size=256',
    color: '#FF3D57',
    gradient: 'from-[#FF3D57] to-[#E02040]',
    partnerText: 'Monday.com Partner',
    certified: false
  },
  'google-calendar': {
    name: 'Google Calendar',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://calendar.google.com&size=256',
    color: '#4285F4',
    gradient: 'from-[#4285F4] to-[#2A6FDB]',
    partnerText: 'Google Partner',
    certified: false
  }
}

// ─── CRM Property Fields ─────────────────────────────────────────────────────

const CRM_PROPERTY_FIELDS: Record<string, Array<{ label: string; type: string; value: string; desc: string; color?: string }>> = {
  hubspot: [
    { label: 'AVG_RESPONSE_TIME', type: 'ANALYTICS', value: '1m 12s', desc: 'Calculated based on rolling 30-day window.' },
    { label: 'TOTAL_MESSAGES', type: 'METER', value: '1,242', desc: 'Aggregate sum of all logged WhatsApp segments.' },
    { label: 'FOLLOWUP_PRIORITY', type: 'STATUS', value: 'CRITICAL', desc: 'Heuristic-based intent scoring from chat history.', color: 'text-orange-500' },
    { label: 'LEAD_ENGAGEMENT_SCORE', type: 'ENGINE', value: '94.8', desc: 'Real-time sync of engagement signals.' },
    { label: 'SYNC_PROTOCOL_STATUS', type: 'PROTOCOL', value: 'ESTABLISHED', desc: 'End-to-end encrypted channel with HubSpot.', color: 'text-emerald-500' },
    { label: 'LATEST_CHAT_INTENT', type: 'SIGNAL', value: 'UPSELL_READY', desc: 'NLP-extracted conversation state.', color: 'text-cyan-500' },
  ],
  salesforce: [
    { label: 'OPPORTUNITY_STAGE', type: 'PIPELINE', value: 'Proposal', desc: 'Auto-updated from conversation signals.', color: 'text-blue-500' },
    { label: 'DEAL_VALUE', type: 'CURRENCY', value: '$45,000', desc: 'Extracted from quote discussions.' },
    { label: 'CLOSE_PROBABILITY', type: 'FORECAST', value: '85%', desc: 'AI-predicted based on engagement patterns.', color: 'text-emerald-500' },
    { label: 'LAST_ACTIVITY', type: 'TIMESTAMP', value: '2 hrs ago', desc: 'Most recent WhatsApp interaction.' },
    { label: 'ACCOUNT_HEALTH', type: 'HEALTH', value: 'STRONG', desc: 'Composite score from all touchpoints.', color: 'text-cyan-500' },
    { label: 'NEXT_BEST_ACTION', type: 'AI_SUGGEST', value: 'SEND_CONTRACT', desc: 'Recommended based on conversation flow.', color: 'text-orange-500' },
  ],
  zoho: [
    { label: 'LEAD_SCORE', type: 'SCORING', value: '87/100', desc: 'Weighted score from WhatsApp engagement.', color: 'text-cyan-500' },
    { label: 'RESPONSE_RATE', type: 'PERCENTAGE', value: '94%', desc: 'Customer reply rate on WhatsApp.' },
    { label: 'CONVERSION_STAGE', type: 'FUNNEL', value: 'HOT_LEAD', desc: 'Automated lead classification.', color: 'text-orange-500' },
    { label: 'MSG_SENTIMENT', type: 'NLP', value: 'POSITIVE', desc: 'Real-time sentiment from last 10 messages.', color: 'text-emerald-500' },
    { label: 'DEAL_POTENTIAL', type: 'REVENUE', value: '$3.2L', desc: 'Estimated deal value from context.' },
    { label: 'FOLLOW_UP_DUE', type: 'ALERT', value: 'TODAY', desc: 'Smart reminder based on conversation gaps.', color: 'text-red-500' },
  ],
  bitrix24: [
    { label: 'CONTACT_STATUS', type: 'CRM', value: 'SYNCED', desc: 'Contact matched to Bitrix24 record.', color: 'text-emerald-500' },
    { label: 'TOTAL_MESSAGES', type: 'METER', value: '847', desc: 'Aggregate WhatsApp messages logged.' },
    { label: 'CHAT_BACKUP_STATUS', type: 'PROTOCOL', value: 'ACTIVE', desc: 'Real-time backup to Bitrix24.', color: 'text-cyan-500' },
    { label: 'LAST_INTERACTION', type: 'TIMESTAMP', value: '14m ago', desc: 'Most recent WhatsApp message synced.' },
    { label: 'DEAL_STAGE', type: 'PIPELINE', value: 'NEGOTIATION', desc: 'Current deal stage in Bitrix24.', color: 'text-orange-500' },
    { label: 'SYNC_HEALTH', type: 'STATUS', value: 'OPTIMAL', desc: 'Connection status with Bitrix24.', color: 'text-emerald-500' },
  ],
  leadsquared: [
    { label: 'LEAD_SCORE', type: 'SCORING', value: '91/100', desc: 'Weighted from WhatsApp engagement signals.', color: 'text-cyan-500' },
    { label: 'ACTIVITY_COUNT', type: 'METER', value: '1,089', desc: 'Total activities logged from WhatsApp.' },
    { label: 'WORKFLOW_STATUS', type: 'AUTOMATION', value: 'TRIGGERED', desc: 'LeadSquared workflow active.', color: 'text-emerald-500' },
    { label: 'LEAD_STAGE', type: 'FUNNEL', value: 'QUALIFIED', desc: 'Auto-updated from conversation signals.', color: 'text-orange-500' },
    { label: 'RESPONSE_TIME', type: 'ANALYTICS', value: '2m 30s', desc: 'Average rep response time on WhatsApp.' },
    { label: 'CAPTURE_MODE', type: 'PROTOCOL', value: 'AUTO', desc: 'New leads captured automatically.', color: 'text-cyan-500' },
  ],
  freshdesk: [
    { label: 'TICKET_CONTEXT', type: 'SUPPORT', value: 'LINKED', desc: 'WhatsApp chat linked to ticket.', color: 'text-emerald-500' },
    { label: 'TOTAL_MESSAGES', type: 'METER', value: '623', desc: 'Support messages backed up.' },
    { label: 'CONTACT_STATUS', type: 'CRM', value: 'MATCHED', desc: 'Contact synced to Freshdesk.', color: 'text-cyan-500' },
    { label: 'RESPONSE_SLA', type: 'TIMER', value: 'ON_TRACK', desc: 'SLA compliance for WhatsApp channel.', color: 'text-emerald-500' },
    { label: 'BACKUP_STATUS', type: 'PROTOCOL', value: 'ACTIVE', desc: 'Real-time chat backup enabled.' },
    { label: 'AGENT_LOAD', type: 'CAPACITY', value: '12 ACTIVE', desc: 'Active WhatsApp conversations.', color: 'text-orange-500' },
  ],
  'google-sheets': [
    { label: 'CONTACTS_SYNCED', type: 'COUNTER', value: '2,341', desc: 'Total contacts exported to Sheets.' },
    { label: 'LAST_EXPORT', type: 'TIMESTAMP', value: '3m ago', desc: 'Most recent data sync to spreadsheet.' },
    { label: 'SHEET_STATUS', type: 'CONNECTION', value: 'CONNECTED', desc: 'Google Sheets link active.', color: 'text-emerald-500' },
    { label: 'DATA_ROWS', type: 'METER', value: '5,892', desc: 'Total rows of WhatsApp data.' },
    { label: 'TEAM_MEMBERS', type: 'USERS', value: '8 ACTIVE', desc: 'Team members syncing to same sheet.', color: 'text-cyan-500' },
    { label: 'EXPORT_MODE', type: 'PROTOCOL', value: 'REAL-TIME', desc: 'Continuous data export enabled.', color: 'text-orange-500' },
  ],
  webhooks: [
    { label: 'EVENTS_SENT', type: 'COUNTER', value: '14,203', desc: 'Total webhook events delivered.' },
    { label: 'DELIVERY_RATE', type: 'PERCENTAGE', value: '99.97%', desc: 'Successful event delivery rate.', color: 'text-emerald-500' },
    { label: 'AVG_LATENCY', type: 'TIMER', value: '142ms', desc: 'Average event delivery time.' },
    { label: 'ENDPOINT_STATUS', type: 'CONNECTION', value: 'HEALTHY', desc: 'HTTP endpoint responding correctly.', color: 'text-emerald-500' },
    { label: 'EVENT_TYPES', type: 'CONFIG', value: '6 ACTIVE', desc: 'Configured event subscriptions.', color: 'text-cyan-500' },
    { label: 'RETRY_QUEUE', type: 'BUFFER', value: '0 PENDING', desc: 'No failed deliveries in queue.', color: 'text-orange-500' },
  ],
  pipedrive: [
    { label: 'DEAL_VALUE', type: 'CURRENCY', value: '$38,500', desc: 'Active deal value from conversations.' },
    { label: 'PIPELINE_STAGE', type: 'PIPELINE', value: 'PROPOSAL', desc: 'Auto-updated from chat signals.', color: 'text-blue-500' },
    { label: 'ACTIVITY_LOG', type: 'METER', value: '956', desc: 'WhatsApp activities logged to Pipedrive.' },
    { label: 'WIN_PROBABILITY', type: 'FORECAST', value: '78%', desc: 'AI-predicted from engagement data.', color: 'text-emerald-500' },
    { label: 'WORKFLOW_STATUS', type: 'AUTOMATION', value: 'RUNNING', desc: 'Pipedrive automation triggered.', color: 'text-cyan-500' },
    { label: 'NEXT_ACTION', type: 'AI_SUGGEST', value: 'FOLLOW_UP', desc: 'Recommended based on conversation.', color: 'text-orange-500' },
  ],
  monday: [
    { label: 'BOARD_ITEMS', type: 'COUNTER', value: '1,245', desc: 'Contacts synced to Monday.com boards.' },
    { label: 'MESSAGES_BACKED', type: 'METER', value: '3,891', desc: 'WhatsApp messages archived.' },
    { label: 'SYNC_STATUS', type: 'CONNECTION', value: 'ACTIVE', desc: 'Real-time sync to Monday.com.', color: 'text-emerald-500' },
    { label: 'TEAM_ACTIVITY', type: 'USERS', value: '15 MEMBERS', desc: 'Active team members syncing.', color: 'text-cyan-500' },
    { label: 'LAST_UPDATE', type: 'TIMESTAMP', value: '1m ago', desc: 'Most recent board update.' },
    { label: 'CONVERSATION_STATUS', type: 'STATUS', value: 'TRACKING', desc: 'All conversations being tracked.', color: 'text-orange-500' },
  ],
  'google-calendar': [
    { label: 'MEETINGS_SCHEDULED', type: 'COUNTER', value: '156', desc: 'Events created from WhatsApp chats.' },
    { label: 'FOLLOW_UPS_DUE', type: 'ALERT', value: '3 TODAY', desc: 'Pending follow-ups from conversations.', color: 'text-orange-500' },
    { label: 'REMINDER_STATUS', type: 'STATUS', value: 'ACTIVE', desc: 'Conversation-based reminders enabled.', color: 'text-emerald-500' },
    { label: 'COMPLETION_RATE', type: 'PERCENTAGE', value: '94%', desc: 'Follow-ups completed on time.', color: 'text-cyan-500' },
    { label: 'TEAM_BOOKINGS', type: 'USERS', value: '8 THIS WEEK', desc: 'Team meetings scheduled from WhatsApp.' },
    { label: 'CALENDAR_SYNC', type: 'CONNECTION', value: 'CONNECTED', desc: 'Google Calendar linked and active.', color: 'text-emerald-500' },
  ]
}

// ─── UI Components ───────────────────────────────────────────────────────────

interface SectionKickerProps {
  label: string
  className?: string
  variant?: 'cyan' | 'orange' | 'blue'
}

const SectionKicker: React.FC<SectionKickerProps> = ({ label, className = '', variant = 'cyan' }) => {
  const variants = {
    cyan: 'text-cyan-500 border-cyan-500/20 bg-cyan-500/10',
    orange: 'text-orange-500 border-orange-500/20 bg-orange-500/10',
    blue: 'text-blue-600 border-blue-600/20 bg-blue-600/10',
  }
  const dotColors = {
    cyan: 'bg-cyan-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-600',
  }

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border mb-6 select-none ${variants[variant]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant]}`}></span>
      {label}
    </span>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700',
    outline: 'bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white'
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ─── Animated Property Card ──────────────────────────────────────────────────

const PropertyCard: React.FC<{ field: { label: string; type: string; value: string; desc: string; color?: string }; index: number }> = ({ field, index }) => {
  const [dataPoints, setDataPoints] = useState(Array.from({ length: 15 }, () => Math.random() * 40 + 20))

  useEffect(() => {
    const timer = setInterval(() => {
      setDataPoints(prev => [...prev.slice(1), Math.random() * 40 + 20])
    }, 1500 + index * 200)
    return () => clearInterval(timer)
  }, [index])

  return (
    <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-xl font-mono hover:border-blue-600/50 transition-all group relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-transparent to-cyan-500 animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold tracking-[0.2em]">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-600 animate-pulse"></div>
          {field.type}
        </div>
        <TrendingUp size={12} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
      </div>

      <h4 className="text-slate-400 text-xs font-bold mb-1 tracking-wider uppercase group-hover:text-slate-300 transition-colors">{field.label}</h4>
      <div className={`text-3xl font-bold tracking-tight mb-4 transition-all duration-300 group-hover:translate-x-1 ${field.color || 'text-white'}`}>
        {field.value}
      </div>

      <div className="h-8 flex items-end gap-1 mb-4 opacity-30 group-hover:opacity-100 transition-all">
        {dataPoints.map((p, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all duration-700"
            style={{
              height: `${p}%`,
              backgroundColor: i === dataPoints.length - 1 ? '#22d3ee' : '#2563eb'
            }}
          ></div>
        ))}
      </div>

      <p className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-800 pt-4 group-hover:text-slate-400 transition-colors">
        {field.desc}
      </p>
    </div>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────────────

const HeroSection: React.FC<{ crm: typeof crmConfig.hubspot; crmColor: string; crmSlug: string; t: (key: string, values?: Record<string, string>) => string }> = ({ crm, crmColor, crmSlug, t }) => {
  const { openModal } = useTrialModal()

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full -z-10 animate-pulse" style={{ backgroundColor: `${crmColor}15` }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-3xl">
            <div className="flex gap-3 mb-8">
              <SectionKicker label={t('integrations.badges.whatsappIntegration')} variant="cyan" className="mb-0" />
              <SectionKicker label={`${crm.name} ${t('integrations.badges.certified')}`} variant="orange" className="mb-0" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] mb-6">
              {t('integrations.hero.headlinePrefix')} <br />
              <span className="inline-flex items-baseline gap-3" style={{ color: crmColor }}>
                {crm.name}
              </span> <br />
              {t('integrations.hero.headlineSuffix')}
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
              {t('integrations.hero.description', { crmName: crm.name })}
            </p>

            <div className="space-y-4 mb-10">
              {[
                t('integrations.hero.feature1'),
                t('integrations.hero.feature2'),
                t('integrations.hero.feature3')
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button
                variant="primary"
                className="h-14 px-8 text-base shadow-none hover:shadow-lg"
                style={{ backgroundColor: crmColor, borderColor: crmColor }}
                onClick={() => openModal('trial')}
              >
                {t('integrations.hero.startTrial')}
              </Button>
              <Button variant="outline" className="h-14 px-8 text-base" onClick={() => openModal('demo')}>
                {t('integrations.hero.bookDemo')}
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-800/50">
              <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <img src="https://cdn.simpleicons.org/meta/0064e0" alt="Meta" className="w-6 h-6" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">Meta</span>
                  <span className="text-slate-400 text-xs">{t('integrations.hero.metaPartner')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <img src={crm.logo} alt={crm.name} className="w-6 h-6" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">{crm.name}</span>
                  <span className="text-slate-400 text-xs">{t('integrations.hero.appPartner')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Mock */}
          <div className="relative hidden lg:block">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl relative z-10">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{crm.name.toLowerCase()}.com/contacts/sarah-chen</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img src="https://i.pravatar.cc/100?u=sarah" alt="Sarah" className="w-10 h-10 rounded-full border-2" style={{ borderColor: crmColor }} />
                  <div className="flex-1">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200">
                      Hi! Following up on the enterprise quote.
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                      <MessageSquare size={10} className="text-green-500" /> WhatsApp &bull; 10:02 AM &bull; <span style={{ color: crmColor }}>Synced to {crm.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-xs" style={{ backgroundColor: crmColor }}>ME</div>
                  <div className="flex-1 text-right">
                    <div className="rounded-2xl rounded-tr-none p-4 text-sm text-white inline-block text-left" style={{ backgroundColor: crmColor }}>
                      Just sent it over to your email, Sarah.
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-slate-500">Sent via {crm.name} &bull; 10:03 AM</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 blur-[80px] rounded-full -z-0" style={{ backgroundColor: `${crmColor}20` }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Feature Comparison Section ──────────────────────────────────────────────

const FeatureComparisonSection: React.FC<{ t: (key: string, values?: Record<string, string>) => string }> = ({ t }) => {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <SectionKicker label={t('integrations.comparison.badge')} variant="cyan" />
            <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-6">
              {t('integrations.comparison.headline1')} <br />
              {t('integrations.comparison.headline2')} <span className="text-cyan-500">{t('integrations.comparison.headline3')}</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('integrations.comparison.description')}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t('integrations.comparison.personalWhatsApp'), badge: null },
              { label: t('integrations.comparison.businessApp'), badge: 'B' },
              { label: t('integrations.comparison.businessApi'), badge: <Cloud size={10} /> }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-slate-500/30 transition-colors min-h-[140px]">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 relative">
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" className="w-8 h-8" referrerPolicy="no-referrer" />
                  {item.badge && (
                    <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-800">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-200">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-4 bg-slate-800 p-6 border-b border-slate-700">
            <div className="col-span-2 font-mono text-sm font-bold text-slate-400 uppercase tracking-wider">{t('integrations.comparison.capability')}</div>
            <div className="text-center font-mono text-sm font-bold text-slate-500 uppercase tracking-wider">{t('integrations.comparison.otherTools')}</div>
            <div className="text-center font-mono text-sm font-bold text-cyan-500 uppercase tracking-wider">Eazybe</div>
          </div>
          {[
            { name: t('integrations.comparison.feature1'), other: false, eazybe: true },
            { name: t('integrations.comparison.feature2'), other: true, eazybe: true },
            { name: t('integrations.comparison.feature3'), other: false, eazybe: true },
            { name: t('integrations.comparison.feature4'), other: false, eazybe: true },
            { name: t('integrations.comparison.feature5'), other: false, eazybe: true },
          ].map((row, idx) => (
            <div key={idx} className="grid grid-cols-4 p-6 border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
              <div className="col-span-2 font-medium text-slate-200">{row.name}</div>
              <div className="flex justify-center items-center">
                {row.other ? <Check className="text-emerald-500" size={20} /> : <X className="text-slate-600" size={20} />}
              </div>
              <div className="flex justify-center items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Check className="text-cyan-500" size={16} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Mini CRM Section ────────────────────────────────────────────────────────

const MiniCRMSection: React.FC<{ crm: typeof crmConfig.hubspot; crmColor: string; crmSlug: string; t: (key: string, values?: Record<string, string>) => string }> = ({ crm, crmColor, crmSlug, t }) => {
  const activeContact = { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/100?u=sarah' }
  const messages = [
    { from: 'contact', text: 'Hi! Following up on the enterprise quote.', time: '10:02 AM' },
    { from: 'me', text: 'Just sent it over to your email, Sarah.', time: '10:03 AM' },
  ]
  const fields = [
    { label: 'First Name', value: 'Sarah' },
    { label: 'Last Name', value: 'Chen' },
    { label: 'Company', value: 'Enterprise Solutions Inc.' },
    { label: 'Email', value: 'sarah@enterprise.com' },
    { label: 'Website', value: 'enterprise.com' },
  ]

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker label={t('integrations.miniCrm.badge')} className="mx-auto" />
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            {crm.name} {t('integrations.miniCrm.headline')} <br />
            <span className="text-cyan-500">WhatsApp Web</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            {t('integrations.miniCrm.description', { crmName: crm.name })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
              <Users size={16} className="text-blue-500" /> {t('integrations.miniCrm.instantContext')}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
              <TrendingUp size={16} className="text-emerald-500" /> {t('integrations.miniCrm.pipelineManagement')}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
              <CheckSquare size={16} className="text-orange-500" /> {t('integrations.miniCrm.quickActions')}
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-[100px] rounded-full pointer-events-none" style={{ backgroundColor: `${crmColor}30` }}></div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl flex overflow-hidden font-sans antialiased relative z-10 text-left" style={{ height: '500px' }}>
            {/* WhatsApp Chat Side */}
            <div className="flex-1 flex flex-col bg-[#e5ddd5] min-w-0">
              <div className="h-14 bg-[#f0f2f5] flex items-center px-4 justify-between shrink-0 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <MessageSquare size={18} className="text-[#25D366]" fill="#25D366" />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">WhatsApp chats</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Search size={18} />
                  <MoreVertical size={18} />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={activeContact.avatar} className="w-5 h-5 rounded-full" alt={activeContact.name} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{activeContact.name}</span>
                  </div>
                  <div className="max-w-[85%] bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-800">
                    {messages[0].text}
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-end gap-1">10:02:15 <Check size={10} className="text-blue-400" /></div>
                  </div>
                </div>
                <div className="space-y-1 flex flex-col items-end">
                  <div className="max-w-[85%] bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none shadow-sm text-sm text-slate-800">
                    {messages[1].text}
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-end gap-1">10:03:42 <Check size={10} className="text-blue-400" /></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={activeContact.avatar} className="w-5 h-5 rounded-full" alt={activeContact.name} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{activeContact.name}</span>
                  </div>
                  <div className="max-w-[85%] bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-800">
                    Received! Let&apos;s schedule the kickoff.
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-end gap-1">10:05:10 <Check size={10} className="text-blue-400" /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* CRM Sidebar */}
            <div className="w-[320px] bg-white border-l border-slate-200 flex flex-col shrink-0">
              <div className="h-14 flex items-center px-4 justify-between border-b border-slate-100">
                <img src={crm.logo} alt={crm.name} className="h-6" referrerPolicy="no-referrer" />
                <div className="flex items-center gap-3 text-slate-400">
                  <RefreshCw size={16} />
                </div>
              </div>
              <div className="flex border-b border-slate-100">
                <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-wider border-b-2" style={{ color: crmColor, borderColor: crmColor }}>Contact</button>
                <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b-2 border-transparent">Deals</button>
                <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b-2 border-transparent">Tickets</button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="flex items-center gap-3 p-4 border-b border-slate-100" style={{ backgroundColor: `${crmColor}08` }}>
                  <img src={activeContact.avatar} className="w-12 h-12 rounded-full border-2" style={{ borderColor: crmColor }} alt={activeContact.name} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{activeContact.name}</h4>
                    <div className="text-[9px] font-bold uppercase" style={{ color: crmColor }}>Not the right contact?</div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {fields.map((field, i) => (
                    <div key={i}>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">{field.label}</label>
                      <div className="text-sm text-slate-800 border-b border-slate-100 pb-2">{field.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-slate-100">
                <button className="w-full text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg" style={{ backgroundColor: crmColor }}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Properties Section ──────────────────────────────────────────────────────

const PropertiesSection: React.FC<{ crm: typeof crmConfig.hubspot; crmSlug: string; t: (key: string, values?: Record<string, string>) => string }> = ({ crm, crmSlug, t }) => {
  const propertyFields = CRM_PROPERTY_FIELDS[crmSlug] || CRM_PROPERTY_FIELDS.hubspot

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker label={t('integrations.properties.badge')} className="mx-auto" />
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight leading-tight mb-4">
            {t('integrations.properties.headline1')} <br />
            <span className="text-cyan-500">{t('integrations.properties.headline2')}</span>
          </h2>
          <p className="text-lg text-slate-400">
            {t('integrations.properties.description', { crmName: crm.name })}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyFields.map((field, i) => (
            <PropertyCard key={i} field={field} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

const FAQSection: React.FC<{ data: any }> = ({ data }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  if (!data || !data.items) return null

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {data.badge && (
            <div className="mb-6">
              <SectionBadge variant="cyan">{data.badge}</SectionBadge>
            </div>
          )}
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight">
            {data.headline}
          </h2>
        </div>
        <div className="space-y-4">
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-white">{item.question}</span>
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-slate-400">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

const CTASection: React.FC<{ data: any }> = ({ data }) => {
  const { openModal } = useTrialModal()

  if (!data) return null

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {data.headline}{' '}
          <span className="text-cyan-500">{data.headlineHighlight}</span>
        </h2>
        {data.description && (
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">{data.description}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {data.primaryCta && (
            <Button variant="primary" className="h-14 px-8 text-base" onClick={() => openModal('trial')}>
              {data.primaryCta.label}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
          {data.secondaryCta && (
            <Button variant="outline" className="h-14 px-8 text-base" onClick={() => openModal('demo')}>
              {data.secondaryCta.label}
            </Button>
          )}
        </div>
        {data.footnote && (
          <p className="text-sm text-slate-500 mt-6">{data.footnote}</p>
        )}
      </div>
    </section>
  )
}

// ─── Main ProductPageClient ──────────────────────────────────────────────────

interface ProductPageClientProps {
  product: any
  crmSlug: string
}

export default function ProductPageClient({ product, crmSlug }: ProductPageClientProps) {
  const t = useTranslations()
  const crm = crmConfig[crmSlug] || crmConfig.hubspot
  const crmColor = crm.color

  return (
    <main>
      <HeroSection crm={crm} crmColor={crmColor} crmSlug={crmSlug} t={t} />
      <FeatureComparisonSection t={t} />
      <MiniCRMSection crm={crm} crmColor={crmColor} crmSlug={crmSlug} t={t} />
      <PropertiesSection crm={crm} crmSlug={crmSlug} t={t} />

      {/* Sanity-driven sections */}
      {product?.benefits && (
        <section className="py-24 bg-brand-surface border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              {product.benefits.badge && (
                <div className="mb-6"><SectionBadge variant="cyan">{product.benefits.badge}</SectionBadge></div>
              )}
              <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">{product.benefits.headline}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.benefits.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-brand-card border border-slate-700 hover:border-slate-600 hover:shadow-card-hover transition-all duration-300 rounded-2xl p-6 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-brand-cyan/10 text-brand-cyan shadow-glow-cyan">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product?.useCases && (
        <section className="py-24 bg-brand-black border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              {product.useCases.badge && (
                <div className="mb-6"><SectionBadge variant="cyan">{product.useCases.badge}</SectionBadge></div>
              )}
              <h2 className="text-4xl font-sans font-bold text-white tracking-tight">{product.useCases.headline}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.useCases.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-brand-card border border-slate-700 rounded-2xl p-6 hover:border-slate-600 hover:shadow-card-hover transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-brand-cyan/10 text-brand-cyan shadow-glow-cyan">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 mb-4">{item.description}</p>
                  {item.benefits && item.benefits.length > 0 && (
                    <ul className="space-y-2">
                      {item.benefits.map((benefit: string, bIdx: number) => (
                        <li key={bIdx} className="flex items-center gap-2 text-sm text-slate-300">
                          <Check size={14} className="text-brand-cyan" strokeWidth={3} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product?.howItWorks && (
        <section className="py-24 bg-brand-surface border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              {product.howItWorks.badge && (
                <div className="mb-6"><SectionBadge variant="cyan">{product.howItWorks.badge}</SectionBadge></div>
              )}
              <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">{product.howItWorks.headline}</h2>
              {product.howItWorks.description && <p className="text-lg text-slate-400">{product.howItWorks.description}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {product.howItWorks.steps?.map((step: any, idx: number) => (
                <div key={idx} className="relative bg-brand-card rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="text-5xl font-black mb-4 text-brand-cyan/40" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.2)' }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                  {idx < (product.howItWorks.steps?.length || 0) - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-600 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product?.testimonial && (
        <section className="py-24 bg-brand-surface border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-8 font-serif text-brand-cyan" style={{ textShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}>&ldquo;</div>
            <blockquote className="text-2xl font-medium text-white mb-8 leading-relaxed">
              {product.testimonial.quote}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              {product.testimonial.avatar && (
                <img src={product.testimonial.avatar} alt={product.testimonial.author} className="w-12 h-12 rounded-full border-2 border-slate-700" />
              )}
              <div className="text-left">
                <div className="font-bold text-white">{product.testimonial.author}</div>
                <div className="text-sm text-slate-400">{product.testimonial.title}, {product.testimonial.company}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {product?.faq && <FAQSection data={product.faq} />}
      {product?.cta && <CTASection data={product.cta} />}
    </main>
  )
}
