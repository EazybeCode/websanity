import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
  Share2
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { useProduct } from '../hooks/useProduct'

// CRM configuration with logos and brand colors
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
    logo: 'https://cdn.simpleicons.org/webhook/6B7280',
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

// CRM-specific property fields for the Properties section
const CRM_PROPERTY_FIELDS = {
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
    { label: 'DEAL_POTENTIAL', type: 'REVENUE', value: '₹3.2L', desc: 'Estimated deal value from context.' },
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

// Default property fields (used for type reference)
const PROPERTY_FIELDS = CRM_PROPERTY_FIELDS.hubspot

// Animated Property Card with Sparkline
const PropertyCard: React.FC<{ field: typeof PROPERTY_FIELDS[0], index: number }> = ({ field, index }) => {
  const [dataPoints, setDataPoints] = useState(Array.from({ length: 15 }, () => Math.random() * 40 + 20))

  useEffect(() => {
    const timer = setInterval(() => {
      setDataPoints(prev => [...prev.slice(1), Math.random() * 40 + 20])
    }, 1500 + index * 200)
    return () => clearInterval(timer)
  }, [index])

  return (
    <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-xl font-mono hover:border-blue-600/50 transition-all group relative overflow-hidden">
      {/* Background Animated Pulse */}
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

      {/* Sparkline Visualizer */}
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

// ================== UI Components ==================

interface SectionKickerProps {
  label: string
  className?: string
  variant?: 'cyan' | 'orange' | 'blue'
}

const SectionKicker: React.FC<SectionKickerProps> = ({ label, className = '', variant = 'cyan' }) => {
  const variants = {
    cyan: "text-cyan-500 border-cyan-500/20 bg-cyan-500/10",
    orange: "text-orange-500 border-orange-500/20 bg-orange-500/10",
    blue: "text-blue-600 border-blue-600/20 bg-blue-600/10",
  }

  const dotColors = {
    cyan: "bg-cyan-500",
    orange: "bg-orange-500",
    blue: "bg-blue-600",
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
  const baseStyles = "inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700",
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white"
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// ================== Hero Section ==================

const HeroSection: React.FC<{ crm: typeof crmConfig.hubspot, crmColor: string }> = ({ crm, crmColor }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full -z-10 animate-pulse" style={{ backgroundColor: `${crmColor}15` }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content */}
          <div className="max-w-3xl">
            <div className="flex gap-3 mb-8">
              <SectionKicker label="WhatsApp Integration" variant="cyan" className="mb-0" />
              <SectionKicker label={`${crm.name} Certified`} variant="orange" className="mb-0" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] mb-6">
              The Official <br />
              <span className="inline-flex items-baseline gap-3" style={{ color: crmColor }}>
                 {crm.name}
              </span> <br />
              WhatsApp Integration
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
              Stop letting deal intelligence die on personal phones. Every message, image, and voice note is automatically logged to the {crm.name} Activity Timeline.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Real-time sync for 1-on-1 and Group Chats.",
                "Automatic association with open Deals and Tickets.",
                "Complete conversation history retained when reps leave."
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="primary" className="h-14 px-8 text-base shadow-none hover:shadow-lg" style={{ backgroundColor: crmColor, borderColor: crmColor }}>
                Start 7-Day Free Trial
              </Button>
              <Button variant="outline" className="h-14 px-8 text-base">
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-800/50">
               {/* Meta Business Partner Badge */}
               <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                     <img
                        src="https://cdn.simpleicons.org/meta/0064e0"
                        alt="Meta"
                        className="w-6 h-6"
                        referrerPolicy="no-referrer"
                     />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-white font-bold text-sm">Meta</span>
                     <span className="text-slate-400 text-xs">Business Partner</span>
                  </div>
               </div>

               {/* CRM Partner Badge */}
               <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                     <img
                        src={crm.logo}
                        alt={crm.name}
                        className="w-6 h-6"
                        referrerPolicy="no-referrer"
                     />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-white font-bold text-sm">{crm.name}</span>
                     <span className="text-slate-400 text-xs">App Partner</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Simple Chat Mock */}
          <div className="relative hidden lg:block">
             <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                   </div>
                   <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{crm.name.toLowerCase()}.com/contacts/sarah-chen</div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4">
                   {/* Incoming Message */}
                   <div className="flex items-start gap-4">
                      <img src="https://i.pravatar.cc/100?u=sarah" alt="Sarah" className="w-10 h-10 rounded-full border-2" style={{ borderColor: crmColor }} />
                      <div className="flex-1">
                         <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200">
                            Hi! Following up on the enterprise quote.
                         </div>
                         <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                            <MessageSquare size={10} className="text-green-500" /> WhatsApp • 10:02 AM • <span style={{ color: crmColor }}>Synced to {crm.name}</span>
                         </div>
                      </div>
                   </div>

                   {/* Outgoing Message */}
                   <div className="flex items-start gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-xs" style={{ backgroundColor: crmColor }}>ME</div>
                      <div className="flex-1 text-right">
                         <div className="rounded-2xl rounded-tr-none p-4 text-sm text-white inline-block text-left" style={{ backgroundColor: crmColor }}>
                            Just sent it over to your email, Sarah.
                         </div>
                         <div className="mt-2 text-[10px] font-mono text-slate-500">Sent via {crm.name} • 10:03 AM</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Blur effect behind */}
             <div className="absolute inset-0 blur-[80px] rounded-full -z-0" style={{ backgroundColor: `${crmColor}20` }}></div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ================== Feature Comparison Section ==================

const FeatureComparisonSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <SectionKicker label="Why teams switch to Eazybe" variant="cyan" />
            <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-6">
              Works with the <br />
              WhatsApp you <span className="text-cyan-500">already use</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Other tools force you to abandon WhatsApp Business App and migrate to API-only. Eazybe works with both—keep your existing setup, your chat history, and your workflow.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
             {/* Personal Card */}
             <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-colors min-h-[140px]">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-4">
                   <img
                      src="https://cdn.simpleicons.org/whatsapp/25D366"
                      alt="Personal WhatsApp"
                      className="w-8 h-8"
                      referrerPolicy="no-referrer"
                   />
                </div>
                <div className="text-sm font-bold text-slate-200">Personal WhatsApp</div>
             </div>
             {/* Business App Card */}
             <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden hover:border-cyan-500/30 transition-colors min-h-[140px]">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 relative">
                   <img
                      src="https://cdn.simpleicons.org/whatsapp/25D366"
                      alt="WhatsApp Business"
                      className="w-8 h-8"
                      referrerPolicy="no-referrer"
                   />
                   <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-800">
                      B
                   </div>
                </div>
                <div className="text-sm font-bold text-slate-200">WhatsApp Business App</div>
             </div>
             {/* API Card */}
             <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors min-h-[140px]">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 relative">
                   <img
                      src="https://cdn.simpleicons.org/whatsapp/25D366"
                      alt="WhatsApp API"
                      className="w-8 h-8 opacity-80"
                      referrerPolicy="no-referrer"
                   />
                   <div className="absolute -top-1 -right-1 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-800">
                      <Cloud size={10} />
                   </div>
                </div>
                <div className="text-sm font-bold text-slate-200">WhatsApp Business API</div>
             </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-4 bg-slate-800 p-6 border-b border-slate-700">
             <div className="col-span-2 font-mono text-sm font-bold text-slate-400 uppercase tracking-wider">Capability</div>
             <div className="text-center font-mono text-sm font-bold text-slate-500 uppercase tracking-wider">Other Tools</div>
             <div className="text-center font-mono text-sm font-bold text-cyan-500 uppercase tracking-wider">Eazybe</div>
          </div>

          {[
             { name: "WhatsApp Business App", other: false, eazybe: true },
             { name: "WhatsApp Business API", other: true, eazybe: true },
             { name: "Keep existing chat history", other: false, eazybe: true },
             { name: "Track personal WhatsApp numbers", other: false, eazybe: true },
             { name: "Live in 30 minutes", other: false, eazybe: true },
          ].map((row, idx) => (
             <div key={idx} className="grid grid-cols-4 p-6 border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                <div className="col-span-2 font-medium text-slate-200">{row.name}</div>
                <div className="flex justify-center items-center">
                   {row.other ?
                      <Check className="text-emerald-500" size={20} /> :
                      <X className="text-slate-600" size={20} />
                   }
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

// ================== Mini CRM Section ==================

const MiniCRMSection: React.FC<{ crm: typeof crmConfig.hubspot, crmColor: string }> = ({ crm, crmColor }) => {
  const crmSlug = crm.name.toLowerCase()

  // CRM-specific chat data with unique contacts and conversations
  const crmChatData = {
    hubspot: {
      activeContact: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/100?u=sarah" },
      chatList: [
        { name: "Sarah Chen", time: "10:33 AM", msg: "Following up on the quote...", active: true, avatar: "https://i.pravatar.cc/100?u=sarah" },
        { name: "James Wilson", time: "Yesterday", msg: "Term sheet looks good.", active: false, avatar: "https://i.pravatar.cc/100?u=james" },
        { name: "Emma Davis", time: "Tuesday", msg: "Payment processed.", active: false, avatar: "https://i.pravatar.cc/100?u=emma" },
        { name: "Michael Brown", time: "Monday", msg: "Let's review the contract.", active: false, avatar: "https://i.pravatar.cc/100?u=michael" },
      ],
      messages: [
        { from: "contact", text: "Hi! Following up on the enterprise quote.", time: "10:02 AM" },
        { from: "me", text: "Just sent it over to your email, Sarah.", time: "10:03 AM" },
      ],
      fields: [
        { label: "First Name", value: "Sarah" },
        { label: "Last Name", value: "Chen" },
        { label: "Company", value: "Enterprise Solutions Inc." },
        { label: "Email", value: "sarah@enterprise.com" },
        { label: "Website", value: "enterprise.com" },
      ]
    },
    salesforce: {
      activeContact: { name: "Marcus Johnson", avatar: "https://i.pravatar.cc/100?u=marcus" },
      chatList: [
        { name: "Marcus Johnson", time: "2:15 PM", msg: "Ready to close the deal...", active: true, avatar: "https://i.pravatar.cc/100?u=marcus" },
        { name: "Lisa Wang", time: "Yesterday", msg: "Demo went great!", active: false, avatar: "https://i.pravatar.cc/100?u=lisa" },
        { name: "David Kim", time: "Tuesday", msg: "Contract signed.", active: false, avatar: "https://i.pravatar.cc/100?u=david" },
        { name: "Rachel Green", time: "Monday", msg: "Budget approved.", active: false, avatar: "https://i.pravatar.cc/100?u=rachel" },
      ],
      messages: [
        { from: "contact", text: "We're ready to move forward with the annual plan.", time: "2:12 PM" },
        { from: "me", text: "Great news, Marcus! I'll prepare the contract.", time: "2:15 PM" },
      ],
      fields: [
        { label: "First Name", value: "Marcus" },
        { label: "Last Name", value: "Johnson" },
        { label: "Account", value: "CloudTech Systems" },
        { label: "Email", value: "marcus@cloudtech.io" },
        { label: "Lead Source", value: "LinkedIn" },
      ]
    },
    zoho: {
      activeContact: { name: "Priya Sharma", avatar: "https://i.pravatar.cc/100?u=priya" },
      chatList: [
        { name: "Priya Sharma", time: "11:45 AM", msg: "Interested in premium tier...", active: true, avatar: "https://i.pravatar.cc/100?u=priya" },
        { name: "Raj Patel", time: "Yesterday", msg: "Thanks for the demo!", active: false, avatar: "https://i.pravatar.cc/100?u=raj" },
        { name: "Anita Desai", time: "Tuesday", msg: "Need more info.", active: false, avatar: "https://i.pravatar.cc/100?u=anita" },
        { name: "Vikram Singh", time: "Monday", msg: "Will discuss internally.", active: false, avatar: "https://i.pravatar.cc/100?u=vikram" },
      ],
      messages: [
        { from: "contact", text: "Can you explain the premium features?", time: "11:40 AM" },
        { from: "me", text: "Of course, Priya! Let me send you the feature comparison.", time: "11:45 AM" },
      ],
      fields: [
        { label: "First Name", value: "Priya" },
        { label: "Last Name", value: "Sharma" },
        { label: "Company", value: "Global Innovations Ltd." },
        { label: "Email", value: "priya@globalinnovations.com" },
        { label: "Lead Status", value: "Qualified" },
      ]
    }
  }

  const currentData = crmChatData[crmSlug as keyof typeof crmChatData] || crmChatData.hubspot
  const { activeContact, messages, fields } = currentData

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Content - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker label="Mini CRM" className="mx-auto" />
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            {crm.name} Mini CRM in <br />
            <span className="text-cyan-500">WhatsApp Web</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Access your entire {crm.name} CRM directly inside WhatsApp. No tab switching, no guessing, no friction.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
              <Users size={16} className="text-blue-500" /> Instant Context
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
              <TrendingUp size={16} className="text-emerald-500" /> Pipeline Management
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
              <CheckSquare size={16} className="text-orange-500" /> Quick Actions
            </div>
          </div>
        </div>

        {/* Visual Representation - WhatsApp + CRM Sidebar (Light Theme) */}
        <div className="relative mx-auto max-w-5xl">
          {/* Glow Effect */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-[100px] rounded-full pointer-events-none" style={{ backgroundColor: `${crmColor}30` }}></div>

          {/* Main Window Frame - Light Theme */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl flex overflow-hidden font-sans antialiased relative z-10 text-left" style={{ height: '600px' }}>

            {/* Left: WhatsApp Chat (Light Theme) */}
            <div className="flex-1 flex flex-col bg-[#e5ddd5] min-w-0">
              {/* WhatsApp Header */}
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

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Incoming Message 1 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={activeContact.avatar} className="w-5 h-5 rounded-full" alt={activeContact.name} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{activeContact.name}</span>
                  </div>
                  <div className="max-w-[85%] bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-800">
                    {messages[0]?.text || "Hi! Following up on the enterprise quote."}
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-end gap-1">10:02:15 <Check size={10} className="text-blue-400" /></div>
                  </div>
                </div>

                {/* Outgoing Message */}
                <div className="space-y-1 flex flex-col items-end">
                  <div className="max-w-[85%] bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none shadow-sm text-sm text-slate-800">
                    {messages[1]?.text || "Just sent it over to your email."}
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-end gap-1">10:03:42 <Check size={10} className="text-blue-400" /></div>
                  </div>
                </div>

                {/* Incoming Message 2 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={activeContact.avatar} className="w-5 h-5 rounded-full" alt={activeContact.name} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{activeContact.name}</span>
                  </div>
                  <div className="max-w-[85%] bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-800">
                    Received! Let's schedule the kickoff.
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-end gap-1">10:05:10 <Check size={10} className="text-blue-400" /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CRM Sidebar (Light Theme) */}
            <div className="w-[320px] bg-white border-l border-slate-200 flex flex-col shrink-0">
              {/* CRM Header */}
              <div className="h-14 flex items-center px-4 justify-between border-b border-slate-100">
                {crmSlug === 'hubspot' && (
                  <img src="https://static.hsappstatic.net/Hubspot_Logos/static-1.74/logos/hubspot-sprocket.svg" className="h-6" alt="HubSpot" />
                )}
                {crmSlug === 'salesforce' && (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" className="h-5" alt="Salesforce" />
                )}
                {crmSlug === 'zoho' && (
                  <img src="https://www.zohowebstatic.com/sites/zweb/images/zoho_general_pages/zoho-logo-web.svg" className="h-5" alt="Zoho" />
                )}
                <div className="flex items-center gap-3 text-slate-400">
                  <RefreshCw size={16} />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-100">
                <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-wider border-b-2" style={{ color: crmColor, borderColor: crmColor }}>Contact</button>
                <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b-2 border-transparent">Deals</button>
                <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b-2 border-transparent">Tickets</button>
              </div>

              {/* Contact Info */}
              <div className="flex-1 overflow-y-auto">
                {/* Contact Header */}
                <div className="flex items-center gap-3 p-4 border-b border-slate-100" style={{ backgroundColor: `${crmColor}08` }}>
                  <img src={activeContact.avatar} className="w-12 h-12 rounded-full border-2" style={{ borderColor: crmColor }} alt={activeContact.name} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{activeContact.name}</h4>
                    <div className="text-[9px] font-bold uppercase" style={{ color: crmColor }}>Not the right contact?</div>
                  </div>
                </div>

                {/* Fields */}
                <div className="p-4 space-y-4">
                  {fields.map((field, i) => (
                    <div key={i}>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">{field.label}</label>
                      <div className="text-sm text-slate-800 border-b border-slate-100 pb-2">{field.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="p-4 border-t border-slate-100">
                <button className="w-full text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg" style={{ backgroundColor: crmColor }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
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

// ================== Properties Section (Animated) ==================

const PropertiesSection: React.FC<{ crm: typeof crmConfig.hubspot, crmSlug: string }> = ({ crm, crmSlug }) => {
  const propertyFields = CRM_PROPERTY_FIELDS[crmSlug as keyof typeof CRM_PROPERTY_FIELDS] || CRM_PROPERTY_FIELDS.hubspot

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker label="System Intelligence" className="mx-auto" />
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight leading-tight mb-4">
            Sync High-Intent <br />
            <span className="text-cyan-500">Engagement Fields</span>
          </h2>
          <p className="text-lg text-slate-400">
            Directly mapped WhatsApp engagement signals rendered in your {crm.name} environment. Active monitoring enabled.
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

// ================== Workflow Animation Components (CRM-Specific) ==================

// HubSpot Workflow UI - Sequence-based enrollment trigger style
const HubSpotWorkflowUI: React.FC<{ step: number }> = ({ step }) => {
  const crmColor = '#FF7A59'

  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
       {/* HubSpot Workflow Header */}
       <div className="h-12 bg-[#2d3e50] flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded">BACK</button>
            <span className="text-white text-xs font-bold">WhatsApp Lead Sequence</span>
          </div>
          <button className="text-white text-[10px] font-bold px-3 py-1 rounded" style={{ backgroundColor: crmColor }}>Turn On</button>
       </div>

       {/* Canvas Area */}
       <div className="flex-1 bg-[#f5f8fa] relative overflow-hidden flex flex-col items-center pt-12">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

          {/* Enrollment Trigger */}
          <div className="relative z-10 w-64 bg-white border border-slate-200 rounded shadow-sm">
             <div className="h-10 border-b border-slate-100 flex items-center px-3 gap-2">
                <Share2 size={14} style={{ color: crmColor }} />
                <span className="text-[10px] font-bold text-slate-700">Enrollment Trigger</span>
             </div>
             <div className="p-3">
                <p className="text-[10px] text-slate-500">Contact is in stage <span className="font-bold text-slate-800">SQL</span></p>
             </div>
          </div>

          {/* Connection Line */}
          <div className="h-12 w-0.5 bg-slate-300 relative shrink-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400">
                <Plus size={10} />
             </div>
          </div>

          {/* Send WhatsApp Block */}
          <div className={`relative z-10 w-72 bg-white border border-emerald-400/50 rounded shadow-lg transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
             <div className="h-10 border-b border-slate-100 flex items-center px-3 justify-between">
                <div className="flex items-center gap-2">
                   <MessageSquare size={14} className="text-emerald-500" />
                   <span className="text-[10px] font-bold text-slate-700">Send WhatsApp Template</span>
                </div>
                <Workflow size={12} className="text-emerald-300" />
             </div>
             <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                   <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Template</span>
                   <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-mono border border-emerald-100">welcome_ad_offer</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                   <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Recipient</span>
                   <span className="text-slate-800 font-bold">(contact.phone)</span>
                </div>
             </div>
          </div>

          {/* Dispatched Toast */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[280px] bg-slate-900 text-white rounded-lg p-3 shadow-2xl flex items-center gap-3 border border-white/10 transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
             <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: crmColor }}>
                <Activity size={18} />
             </div>
             <div>
                <div className="text-[10px] font-bold">Eazybe Dispatched</div>
                <div className="text-[8px] font-mono text-slate-400">US-T-1 • Budget Contact → WhatsApp</div>
             </div>
          </div>
       </div>
    </div>
  )
}

// Salesforce Flow Builder UI - Lightning Design System horizontal path style
const SalesforceFlowBuilderUI: React.FC<{ step: number }> = ({ step }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
       {/* Salesforce Flow Builder Header - Lightning style */}
       <div className="h-14 bg-[#032D60] flex items-center px-4 justify-between shrink-0 border-b-4 border-[#0176D3]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <Workflow size={18} className="text-[#0176D3]" />
             </div>
             <div>
                <span className="text-white text-xs font-bold block">Opportunity Follow-up Flow</span>
                <span className="text-blue-300 text-[9px]">Record-Triggered Flow</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="bg-white text-[#032D60] text-[10px] font-bold px-3 py-1.5 rounded">Debug</button>
             <button className="bg-[#0176D3] text-white text-[10px] font-bold px-3 py-1.5 rounded">Activate</button>
          </div>
       </div>

       {/* Toolbox Sidebar */}
       <div className="flex flex-1">
          <div className="w-12 bg-[#F3F3F3] border-r border-slate-200 flex flex-col items-center py-3 gap-3">
             <div className="w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center text-[#0176D3] cursor-pointer hover:bg-blue-50">
                <Plus size={16} />
             </div>
             <div className="w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50">
                <Search size={14} />
             </div>
          </div>

          {/* Flow Canvas - Horizontal Layout */}
          <div className="flex-1 bg-[#FAFAF9] relative overflow-hidden p-8">
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

             {/* Horizontal Flow Path */}
             <div className="relative z-10 flex items-center gap-4 h-full">

                {/* Start Node */}
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 rounded-full bg-[#0176D3] flex items-center justify-center shadow-lg">
                      <Zap size={20} className="text-white" />
                   </div>
                   <span className="text-[9px] text-slate-600 mt-2 font-medium">Start</span>
                </div>

                {/* Connector */}
                <div className="w-16 h-0.5 bg-[#0176D3]"></div>

                {/* Record Trigger Node */}
                <div className="bg-white rounded-lg border-2 border-[#0176D3] shadow-md w-44 overflow-hidden">
                   <div className="bg-[#0176D3] px-3 py-2 flex items-center gap-2">
                      <Share2 size={12} className="text-white" />
                      <span className="text-[10px] text-white font-bold">Record Trigger</span>
                   </div>
                   <div className="p-3 text-[9px] text-slate-600">
                      <div className="mb-1"><span className="text-slate-400">Object:</span> Opportunity</div>
                      <div><span className="text-slate-400">When:</span> Stage = Proposal</div>
                   </div>
                </div>

                {/* Connector */}
                <div className="w-12 h-0.5 bg-slate-300 relative">
                   <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center">
                      <Plus size={10} className="text-slate-400" />
                   </div>
                </div>

                {/* WhatsApp Action Node */}
                <div className={`bg-white rounded-lg border-2 border-emerald-500 shadow-lg w-48 overflow-hidden transition-all duration-700 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                   <div className="bg-emerald-500 px-3 py-2 flex items-center gap-2">
                      <MessageSquare size={12} className="text-white" />
                      <span className="text-[10px] text-white font-bold">Send WhatsApp</span>
                   </div>
                   <div className="p-3 space-y-2">
                      <div className="flex items-center gap-2 text-[9px]">
                         <span className="text-slate-400">Template:</span>
                         <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-mono">proposal_followup</span>
                      </div>
                      <div className="flex items-center gap-2 text-[9px]">
                         <span className="text-slate-400">To:</span>
                         <span className="text-slate-700">{'{!$Record.Phone}'}</span>
                      </div>
                   </div>
                </div>

                {/* Connector */}
                <div className={`w-12 h-0.5 bg-slate-300 transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* End Node */}
                <div className={`flex flex-col items-center transition-all duration-700 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                   <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                   </div>
                   <span className="text-[9px] text-slate-600 mt-2 font-medium">End</span>
                </div>
             </div>

             {/* Success Toast */}
             <div className={`absolute bottom-4 right-4 w-[240px] bg-[#032D60] text-white rounded-lg p-3 shadow-2xl flex items-center gap-3 transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                   <Check size={16} className="text-white" />
                </div>
                <div>
                   <div className="text-[10px] font-bold">Flow Executed</div>
                   <div className="text-[8px] text-blue-300">WhatsApp sent to Deal Owner</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}

// Zoho Workflow UI - Blueprint/Deluge style with tabbed interface
const ZohoWorkflowUI: React.FC<{ step: number }> = ({ step }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
       {/* Zoho CRM Header - Dark with tabs */}
       <div className="h-12 bg-[#1B2838] flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                   <Zap size={14} className="text-white" />
                </div>
                <span className="text-white text-xs font-bold">Lead Nurture Automation</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Active</span>
             <button className="bg-[#E42527] text-white text-[10px] font-bold px-3 py-1.5 rounded">Save & Enable</button>
          </div>
       </div>

       {/* Tabs Bar */}
       <div className="h-10 bg-[#243447] flex items-center px-4 gap-6 border-b border-slate-700">
          <span className="text-white text-[11px] font-medium border-b-2 border-red-500 pb-2.5 pt-2.5">Workflow Rules</span>
          <span className="text-slate-400 text-[11px] hover:text-white cursor-pointer">Actions</span>
          <span className="text-slate-400 text-[11px] hover:text-white cursor-pointer">Schedules</span>
       </div>

       {/* Workflow Content */}
       <div className="flex-1 bg-[#F5F5F5] p-6 overflow-hidden">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">

             {/* Rule Configuration */}
             <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <Activity size={16} className="text-red-500" />
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-800">When Lead Score Reaches 80+</div>
                      <div className="text-[10px] text-slate-400">Module: Leads • Trigger: Field Update</div>
                   </div>
                </div>

                {/* Condition Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                   <span className="bg-blue-50 text-blue-700 text-[10px] px-2.5 py-1 rounded-full font-medium">Lead Score ≥ 80</span>
                   <span className="text-slate-400 text-[10px]">AND</span>
                   <span className="bg-purple-50 text-purple-700 text-[10px] px-2.5 py-1 rounded-full font-medium">Lead Status = Active</span>
                </div>
             </div>

             {/* Actions Section */}
             <div className="flex-1 p-4">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">Instant Actions</div>

                {/* Action Card */}
                <div className={`bg-slate-50 rounded-lg border border-slate-200 p-4 mb-3 transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                   <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                         <MessageSquare size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-slate-800">Send WhatsApp via Eazybe</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Webhook</span>
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center text-[10px] text-slate-500">
                               <span className="w-16 text-slate-400">Template:</span>
                               <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">hot_lead_outreach</code>
                            </div>
                            <div className="flex items-center text-[10px] text-slate-500">
                               <span className="w-16 text-slate-400">To Field:</span>
                               <span className="text-slate-700">${'{'}Leads.Phone{'}'}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Secondary Action */}
                <div className={`bg-slate-50 rounded-lg border border-dashed border-slate-300 p-3 transition-all duration-700 delay-200 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                   <div className="flex items-center gap-2 text-slate-400">
                      <Plus size={14} />
                      <span className="text-[10px]">Add another action</span>
                   </div>
                </div>
             </div>

             {/* Execution Log Toast */}
             <div className={`mx-4 mb-4 bg-[#1B2838] rounded-lg p-3 flex items-center gap-3 transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                   <Check size={14} className="text-white" />
                </div>
                <div className="flex-1">
                   <div className="text-[10px] font-bold text-white">Workflow Executed Successfully</div>
                   <div className="text-[8px] text-slate-400">WhatsApp sent via Eazybe • Lead: Priya Sharma</div>
                </div>
                <span className="text-[9px] text-emerald-400">Just now</span>
             </div>
          </div>
       </div>
    </div>
  )
}

// Main Workflow Animation wrapper that selects the right UI
const WorkflowAnimation: React.FC<{ crmColor: string, crmSlug: string }> = ({ crmSlug }) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Render CRM-specific workflow UI
  if (crmSlug === 'salesforce') {
    return <SalesforceFlowBuilderUI step={step} />
  }

  if (crmSlug === 'zoho') {
    return <ZohoWorkflowUI step={step} />
  }

  // Default: HubSpot
  return <HubSpotWorkflowUI step={step} />
}

// ================== Automation Section ==================

const AutomationSection: React.FC<{ crm: typeof crmConfig.hubspot, crmColor: string, crmSlug: string }> = ({ crm, crmColor, crmSlug }) => {
  return (
    <section className="py-24 bg-slate-900 border-y border-slate-700 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">
           {/* Text */}
           <div>
              <SectionKicker label="Workflow Automation" variant="cyan" />
              <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-6">
                Native Chatbots & <br />
                <span style={{ color: crmColor }}>{crm.name} Workflows</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Add "Send WhatsApp Message" as a native action in your {crm.name} Workflows. Scale your outreach without losing the personal touch.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl group hover:border-orange-500/40 transition-all">
                   <Zap className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={24} />
                   <h4 className="text-white font-bold mb-2">Auto-Triggers</h4>
                   <p className="text-xs text-slate-500">Send WhatsApp templates based on any {crm.name} enrollment trigger.</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl group hover:border-blue-600/40 transition-all">
                   <Workflow className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={24} />
                   <h4 className="text-white font-bold mb-2">Native Actions</h4>
                   <p className="text-xs text-slate-500">Eazybe appears as a standard action within your workflow builder.</p>
                </div>
              </div>
           </div>

           {/* Animated Workflow Diagram */}
           <WorkflowAnimation crmColor={crmColor} crmSlug={crmSlug} />
        </div>

      </div>
    </section>
  )
}

// ================== Reports Section ==================

const ReportsSection: React.FC<{ crm: typeof crmConfig.hubspot }> = ({ crm }) => {
  return (
    <section className="py-24 bg-slate-950 relative">
       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <SectionKicker label="Visibility" className="mx-auto" />
           <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
             WhatsApp Data in <span className="text-cyan-500">{crm.name} Reports</span>
           </h2>
           <p className="text-lg text-slate-400">
             One source of truth. Report on WhatsApp engagement across Contacts, Deals, and Tickets using {crm.name}'s standard reporting tools.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             {
               title: "Team Performance",
               desc: "Analyze response times by Owner across all WhatsApp chats.",
               icon: Users2,
               color: "text-blue-600"
             },
             {
               title: "Deal Attribution",
               desc: "Correlate WhatsApp message volume with deal win rates.",
               icon: TrendingUp,
               color: "text-emerald-500"
             },
             {
               title: "Ticket Resolution",
               desc: "Measure support efficiency through the WhatsApp channel.",
               icon: PieChart,
               color: "text-orange-500"
             }
           ].map((item, idx) => (
             <div key={idx} className="bg-slate-900 border border-slate-700 p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                <div className={`w-14 h-14 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center ${item.color} mb-6`}>
                   <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                   {item.desc}
                </p>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}



// ================== Main ProductPage Component ==================

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { loading } = useProduct(slug || 'hubspot-whatsapp-integration')

  // Determine which CRM based on slug
  const getCrmSlug = (slug: string | undefined): string => {
    if (!slug) return 'hubspot'
    if (slug.includes('google-sheets')) return 'google-sheets'
    if (slug.includes('google-calendar')) return 'google-calendar'
    if (slug.includes('salesforce')) return 'salesforce'
    if (slug.includes('zoho')) return 'zoho'
    if (slug.includes('hubspot')) return 'hubspot'
    if (slug.includes('bitrix24')) return 'bitrix24'
    if (slug.includes('leadsquared')) return 'leadsquared'
    if (slug.includes('freshdesk')) return 'freshdesk'
    if (slug.includes('webhooks')) return 'webhooks'
    if (slug.includes('pipedrive')) return 'pipedrive'
    if (slug.includes('monday')) return 'monday'
    return 'hubspot'
  }

  const crmSlug = getCrmSlug(slug)
  const crm = crmConfig[crmSlug] || crmConfig.hubspot
  const crmColor = crm.color

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-400 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <HeroSection crm={crm} crmColor={crmColor} />

      {/* Feature Comparison Section */}
      <FeatureComparisonSection />

      {/* Mini CRM Section */}
      <MiniCRMSection crm={crm} crmColor={crmColor} />

      {/* Properties Section */}
      <PropertiesSection crm={crm} crmSlug={crmSlug} />

      {/* Automation Section */}
      <AutomationSection crm={crm} crmColor={crmColor} crmSlug={crmSlug} />

      {/* Reports Section */}
      <ReportsSection crm={crm} />

      {/* Footer with CTA and Security sections */}
      <ChunkyFooter />
    </div>
  )
}

export default ProductPage
