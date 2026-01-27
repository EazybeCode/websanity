import React from 'react'
import { useParams } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  X,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  History,
  Layout,
  Users,
  TrendingUp,
  CheckSquare,
  Search,
  MoreVertical,
  Paperclip,
  Mic,
  Database,
  Activity,
  Clock,
  BarChart3,
  UserCheck,
  BrainCircuit,
  Workflow,
  Zap,
  Bot,
  PieChart,
  Users2,
  Cloud
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { FooterDynamic } from '../components/dynamic/FooterDynamic'
import { SecuritySection, CTASection } from '../components/shared'
import { useFooter } from '../hooks/useFooter'
import { useProduct } from '../hooks/useProduct'
import { useSharedSections } from '../hooks/useSharedSections'

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
  }
}

// Property fields for the Properties section
const PROPERTY_FIELDS = [
  { label: 'Last Message Sent', type: 'DateTime', value: 'Today, 2:34 PM' },
  { label: 'Avg Response Time', type: 'Number', value: '4m 12s' },
  { label: 'AI Chat Summary', type: 'String', value: 'Customer interested in Enterprise plan...' },
  { label: 'Total Message Count', type: 'Integer', value: '142' },
  { label: 'Last Message by', type: 'Enum', value: 'Agent' },
  { label: 'Sentiment', type: 'AI Analysis', value: 'Positive' },
]

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

          {/* Dashboard Mock */}
          <div className="relative hidden lg:block">
             <div className="relative rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden p-1">
                {/* Mock Browser Header */}
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                   </div>
                   <div className="mx-auto bg-slate-950/50 px-3 py-1 rounded text-[10px] font-mono text-slate-500 border border-slate-700/50 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: crmColor }}></div>
                      {crm.name.toLowerCase()}.com/contacts/jason-bourne
                   </div>
                </div>

                {/* Content Area */}
                <div className="p-6 grid gap-6 bg-slate-950/40">
                   {/* Activity Feed Mock */}
                   <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                         JB
                      </div>
                      <div className="flex-1 space-y-2">
                         <div className="bg-slate-900 border border-slate-700 p-4 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-slate-300">
                            <p>Just reviewed the proposal. Can we discuss the enterprise tier?</p>
                         </div>
                         <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                            <MessageSquare size={12} />
                            <span>WhatsApp • Today 2:34 PM</span>
                            <span className="text-emerald-500 flex items-center gap-1">
                               <RefreshCw size={10} className="animate-spin" style={{animationDuration: '3s'}}/> Synced to {crm.name}
                            </span>
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 font-bold shrink-0">
                         Me
                      </div>
                      <div className="flex-1 space-y-2">
                         <div className="p-4 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm text-white" style={{ backgroundColor: `${crmColor}15`, borderColor: `${crmColor}30`, borderWidth: 1 }}>
                            <p>Absolutely, Jason. I'm available at 4 PM EST. Does that work?</p>
                         </div>
                         <div className="flex justify-end items-center gap-2 text-xs font-mono text-slate-500">
                             <span>Sent via {crm.name} • Today 2:36 PM</span>
                             <History size={12} />
                         </div>
                      </div>
                   </div>

                   {/* Log Notification */}
                   <div className="mt-4 p-3 rounded-lg flex items-center gap-3" style={{ backgroundColor: `${crmColor}08`, borderColor: `${crmColor}30`, borderWidth: 1 }}>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: crmColor, boxShadow: `0 0 10px ${crmColor}` }}></div>
                      <span className="text-xs font-mono" style={{ color: crmColor }}>
                         ACTIVITY LOGGED TO DEAL: "ENTERPRISE LICENSE Q3"
                      </span>
                   </div>
                </div>
             </div>

             {/* Decor elements */}
             <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl" style={{ backgroundColor: `${crmColor}30` }}></div>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
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
  // Chat list data
  const chatList = [
    { name: "Jason Bourne", time: "10:33 AM", msg: "Can we schedule a call...", active: true },
    { name: "Sarah Connor", time: "Yesterday", msg: "Term sheet looks good.", active: false },
    { name: "Tony Stark", time: "Tuesday", msg: "Payment processed.", active: false },
    { name: "Bruce Wayne", time: "Monday", msg: "Let's review the contract.", active: false },
  ]

  // CRM-specific field labels
  const crmFields = {
    hubspot: [
      { label: "First Name", value: "Jason" },
      { label: "Last Name", value: "Bourne" },
      { label: "Company", value: "Treadstone Inc." },
      { label: "Email", value: "jason@treadstone.com" },
      { label: "Website", value: "treadstone.com" },
    ],
    salesforce: [
      { label: "First Name", value: "Jason" },
      { label: "Last Name", value: "Bourne" },
      { label: "Account", value: "Treadstone Inc." },
      { label: "Email", value: "jason@treadstone.com" },
      { label: "Lead Source", value: "Website" },
    ],
    zoho: [
      { label: "First Name", value: "Jason" },
      { label: "Last Name", value: "Bourne" },
      { label: "Company", value: "Treadstone Inc." },
      { label: "Email", value: "jason@treadstone.com" },
      { label: "Lead Status", value: "Contacted" },
    ]
  }

  const crmSlug = crm.name.toLowerCase() as keyof typeof crmFields
  const fields = crmFields[crmSlug] || crmFields.hubspot

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

        {/* Visual Representation - Full Width WhatsApp + CRM Mockup */}
        <div className="relative mx-auto max-w-[1100px]">
          {/* Glow Effect */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-[100px] rounded-full pointer-events-none" style={{ backgroundColor: `${crmColor}30` }}></div>

          {/* Main Window Frame */}
          <div className="bg-[#111b21] rounded-xl border border-slate-700 shadow-2xl flex h-[650px] overflow-hidden font-sans antialiased relative z-10 text-left">

            {/* 1. Left Panel: WhatsApp Chat List */}
            <div className="w-[280px] flex flex-col border-r border-[#2f3b43] bg-[#111b21] shrink-0 hidden md:flex">
              {/* Header */}
              <div className="h-[60px] bg-[#202c33] flex items-center justify-between px-4 shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-500 overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Me&background=64748b&color=fff" alt="Me" />
                </div>
                <div className="flex gap-6 text-[#aebac1]">
                  <MoreVertical size={20} />
                </div>
              </div>
              {/* Search */}
              <div className="p-2 shrink-0 border-b border-[#202c33]">
                <div className="bg-[#202c33] rounded-lg h-9 flex items-center px-3 gap-3">
                  <Search size={14} className="text-[#aebac1]" />
                  <span className="text-[#aebac1] text-xs">Search or start new chat</span>
                </div>
              </div>
              {/* Chat List Items */}
              <div className="flex-1 overflow-y-auto">
                {chatList.map((chat, i) => (
                  <div key={i} className={`h-[72px] flex items-center px-3 cursor-pointer group hover:bg-[#202c33] ${chat.active ? 'bg-[#2a3942]' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-slate-600 shrink-0 mr-3 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=${chat.name.replace(' ', '+')}&background=random`} alt={chat.name} />
                    </div>
                    <div className="flex-1 border-b border-[#2f3b43] h-full flex flex-col justify-center group-hover:border-transparent">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[#e9edef] font-normal text-[15px]">{chat.name}</span>
                        <span className={`text-xs ${chat.active ? 'text-[#00a884]' : 'text-[#8696a0]'}`}>{chat.time}</span>
                      </div>
                      <span className="text-[#8696a0] text-sm truncate">{chat.msg}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Middle Panel: Chat Window */}
            <div className="flex-1 flex flex-col bg-[#0b141a] relative min-w-0 border-r border-[#2f3b43]">
              {/* Chat Header */}
              <div className="h-[60px] bg-[#202c33] flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Jason+Bourne&background=6366f1&color=fff" alt="JB" />
                  </div>
                  <div>
                    <div className="text-[#e9edef] font-medium text-base">Jason Bourne</div>
                    <div className="text-[#8696a0] text-xs">click here for contact info</div>
                  </div>
                </div>
                <div className="flex gap-5 text-[#aebac1] items-center">
                  <Search size={20} />
                  <MoreVertical size={20} />
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] pointer-events-none"></div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-3 relative z-10">
                <div className="flex justify-center mb-4">
                  <span className="bg-[#182229] text-[#8696a0] text-xs py-1.5 px-3 rounded-lg uppercase shadow-sm font-medium">Today</span>
                </div>

                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-[#e9edef] p-2 px-3 rounded-lg rounded-tl-none max-w-[80%] text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative leading-snug">
                    <p className="mr-12">Hi, just checking in on the proposal.</p>
                    <span className="text-[10px] text-[#8696a0] absolute bottom-1 right-2">10:30 AM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-[#e9edef] p-2 px-3 rounded-lg rounded-tr-none max-w-[80%] text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative leading-snug">
                    <p className="mr-14">Hey Jason! Yes, I've reviewed it.</p>
                    <span className="text-[10px] text-[#8696a0] absolute bottom-1 right-2 flex items-center gap-1">
                      10:32 AM <span className="text-[#53bdeb]">✓✓</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-[#e9edef] p-2 px-3 rounded-lg rounded-tr-none max-w-[80%] text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative leading-snug">
                    <p className="mr-14">Looks solid, but I have a question about the Enterprise seats.</p>
                    <span className="text-[10px] text-[#8696a0] absolute bottom-1 right-2 flex items-center gap-1">
                      10:32 AM <span className="text-[#53bdeb]">✓✓</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-[#e9edef] p-2 px-3 rounded-lg rounded-tl-none max-w-[80%] text-[14px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative leading-snug">
                    <p className="mr-12">Can we schedule a call to discuss the enterprise tier?</p>
                    <span className="text-[10px] text-[#8696a0] absolute bottom-1 right-2">10:33 AM</span>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="h-[62px] bg-[#202c33] flex items-center px-4 gap-3 shrink-0 z-20">
                <div className="text-[#8696a0] cursor-pointer"><Paperclip size={24} /></div>
                <div className="flex-1 bg-[#2a3942] rounded-lg h-10 flex items-center px-4 text-[#d1d7db] text-[15px]">
                  Type a message
                </div>
                <div className="text-[#8696a0] cursor-pointer"><Mic size={24} /></div>
              </div>
            </div>

            {/* 3. Right Panel: CRM Integration (Light Theme) */}
            <div className="w-[300px] bg-white flex flex-col shrink-0 border-l border-slate-200 hidden lg:flex">
              {/* CRM Header */}
              <div className="h-[60px] flex items-center justify-center px-4 border-b border-gray-100 bg-white relative">
                <div className="flex items-center gap-2">
                  <span className="text-slate-800 font-bold text-xl tracking-tight">{crm.name}</span>
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: crmColor }}></span>
                    <span className="w-2 h-2 rounded-full -ml-0.5 opacity-70" style={{ backgroundColor: crmColor }}></span>
                    <span className="w-2 h-2 rounded-full -ml-0.5 opacity-40" style={{ backgroundColor: crmColor }}></span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 bg-white">
                <div className="flex-1 flex justify-center py-3 border-b-2 cursor-pointer" style={{ color: crmColor, borderColor: crmColor }}>
                  <Users size={20} />
                </div>
                <div className="flex-1 flex justify-center py-3 text-slate-300 hover:text-slate-500 cursor-pointer border-b-2 border-transparent">
                  <Layout size={20} />
                </div>
                <div className="flex-1 flex justify-center py-3 text-slate-300 hover:text-slate-500 cursor-pointer border-b-2 border-transparent">
                  <CheckSquare size={20} />
                </div>
              </div>

              {/* CRM Content */}
              <div className="flex-1 overflow-y-auto bg-white">
                {/* Contact Profile Header */}
                <div className="p-5 flex items-center gap-4 border-b border-gray-50" style={{ backgroundColor: `${crmColor}08` }}>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img src="https://ui-avatars.com/api/?name=Jason+Bourne&background=6366f1&color=fff" alt="JB" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crmColor }}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-800 font-bold text-base">Jason Bourne</div>
                    <button className="text-xs font-semibold flex items-center gap-1 hover:underline" style={{ color: crmColor }}>
                      Not the right contact? <ArrowRight size={10} />
                    </button>
                  </div>
                </div>

                {/* Fields */}
                <div className="p-5 space-y-4 bg-white">
                  {fields.map((field, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        <Layout size={10} />
                        {field.label}
                      </div>
                      <div className="h-9 bg-gray-50 rounded-lg border border-gray-200 w-full flex items-center px-3 text-sm text-slate-700 font-medium hover:border-gray-300 transition-colors">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <div className="p-5 pt-2">
                  <button
                    className="w-full text-white font-bold py-3 rounded-lg text-base shadow-lg transition-all transform hover:-translate-y-0.5 hover:shadow-xl"
                    style={{ backgroundColor: crmColor, boxShadow: `0 10px 15px -3px ${crmColor}30` }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ================== Properties Section ==================

const PropertiesSection: React.FC<{ crm: typeof crmConfig.hubspot }> = ({ crm }) => {
  const getIcon = (label: string) => {
    if (label.includes('Time')) return Clock
    if (label.includes('Count')) return BarChart3
    if (label.includes('AI')) return BrainCircuit
    if (label.includes('Sent')) return MessageSquare
    if (label.includes('Sentiment')) return Activity
    return UserCheck
  }

  return (
    <section className="py-24 bg-slate-950 relative">
       {/* Glow */}
       <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-slate-900 to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
           <SectionKicker label="WhatsApp Properties" className="mx-auto" />
           <h2 className="text-4xl font-sans font-bold text-white tracking-tight mb-4">
             On Contacts, Deals & Tickets
           </h2>
           <p className="text-lg text-slate-400">
             We don't just log messages; we turn activity into actionable data fields. Use WhatsApp engagement like any other {crm.name} property.
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {PROPERTY_FIELDS.map((prop, idx) => {
             const Icon = getIcon(prop.label)
             return (
               <div key={idx} className="bg-slate-800 border border-slate-700 hover:border-blue-600/50 transition-colors rounded-xl p-6 group">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-400 group-hover:text-blue-600 transition-colors">
                       <Icon size={20} />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase border border-slate-700 rounded px-2 py-0.5">
                       {prop.type}
                    </span>
                 </div>

                 <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                    Property Name
                 </div>
                 <div className="text-white font-semibold mb-4">{prop.label}</div>

                 <div className="bg-slate-950/50 rounded border border-slate-700/50 p-3 flex items-center gap-3">
                    <Database size={14} className="text-slate-600" />
                    <span className="text-sm font-mono text-cyan-500">{prop.value}</span>
                 </div>
               </div>
             )
           })}
        </div>
      </div>
    </section>
  )
}

// ================== Automation Section ==================

const AutomationSection: React.FC<{ crm: typeof crmConfig.hubspot, crmColor: string }> = ({ crm, crmColor }) => {
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

              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${crmColor}15`, color: crmColor }}>
                       <Bot size={20} />
                    </div>
                    <div>
                       <h4 className="text-white font-bold">Native Chatbots</h4>
                       <p className="text-slate-400 text-sm">Trigger chatbots based on {crm.name} property changes.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${crmColor}15`, color: crmColor }}>
                       <Zap size={20} />
                    </div>
                    <div>
                       <h4 className="text-white font-bold">Automated Follow-ups</h4>
                       <p className="text-slate-400 text-sm">Ideal for abandoned carts or form submissions.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${crmColor}15`, color: crmColor }}>
                       <Clock size={20} />
                    </div>
                    <div>
                       <h4 className="text-white font-bold">Smart Delays</h4>
                       <p className="text-slate-400 text-sm">Time-delayed sequences that stop once they reply.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Workflow Diagram */}
           <div className="relative">
              <div className="absolute inset-0 blur-3xl rounded-full" style={{ backgroundColor: `${crmColor}08` }}></div>

              <div className="relative bg-slate-950 border border-slate-700 rounded-xl p-8 space-y-6 shadow-2xl">
                 {/* Step 1 */}
                 <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-white transition-all" style={{ ['--hover-border' as string]: crmColor }}>
                       <Workflow size={24} />
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-lg">
                       <div className="text-xs font-mono text-slate-500 mb-1">TRIGGER</div>
                       <div className="text-sm font-semibold text-white">Deal Stage Changed to "Negotiation"</div>
                    </div>
                 </div>

                 {/* Connector */}
                 <div className="h-8 w-0.5 bg-slate-700 mx-auto ml-[23px]"></div>

                 {/* Step 2 */}
                 <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-emerald-500 transition-all">
                       <Bot size={24} />
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-lg">
                       <div className="text-xs font-mono text-slate-500 mb-1">ACTION</div>
                       <div className="text-sm font-semibold text-white">Send WhatsApp Template: "Quote Follow-up"</div>
                    </div>
                 </div>

                 {/* Connector */}
                 <div className="h-8 w-0.5 bg-slate-700 mx-auto ml-[23px]"></div>

                 {/* Step 3 */}
                 <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-all">
                       <Clock size={24} />
                    </div>
                    <div className="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-lg">
                       <div className="text-xs font-mono text-slate-500 mb-1">WAIT</div>
                       <div className="text-sm font-semibold text-white">Wait 2 Days or Until Reply</div>
                    </div>
                 </div>
              </div>

              {/* Tag */}
              <div className="absolute -right-4 top-10 bg-slate-900 border border-slate-700 p-2 rounded shadow-xl">
                 <div className="flex items-center gap-2 text-xs font-mono" style={{ color: crmColor }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: crmColor }}></div>
                    ACTIVE WORKFLOW
                 </div>
              </div>

           </div>
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
  const { data: footerData } = useFooter()
  const { data: sharedData } = useSharedSections()
  const { loading } = useProduct(slug || 'hubspot-whatsapp-integration')

  // Determine which CRM based on slug
  const getCrmSlug = (slug: string | undefined): string => {
    if (!slug) return 'hubspot'
    if (slug.includes('salesforce')) return 'salesforce'
    if (slug.includes('zoho')) return 'zoho'
    if (slug.includes('hubspot')) return 'hubspot'
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
      <PropertiesSection crm={crm} />

      {/* Automation Section */}
      <AutomationSection crm={crm} crmColor={crmColor} />

      {/* Reports Section */}
      <ReportsSection crm={crm} />

      {/* Shared sections for consistency with landing page */}
      <CTASection data={sharedData?.cta} />
      <SecuritySection data={sharedData?.security} />

      {/* Footer */}
      {footerData && <FooterDynamic data={footerData} />}
    </div>
  )
}

export default ProductPage
