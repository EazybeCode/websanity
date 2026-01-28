import React from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Layers,
  Clock,
  Zap,
  LayoutGrid,
  Search,
  ExternalLink,
  Cpu,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Mic
} from 'lucide-react'

const WhatsAppCRMLabelAnimation: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3">
      <div className="w-full h-full bg-[#0b141a] rounded-xl overflow-hidden shadow-xl flex relative">

      {/* Eazybe Sidebar Extension */}
      <div className="w-10 bg-[#111b21] border-r border-slate-800 flex flex-col items-center py-3 gap-3 z-20">
        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
          <Cpu className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="space-y-2">
          <div className="w-6 h-6 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
            <LayoutGrid className="w-3 h-3 text-cyan-400" />
          </div>
          <div className="w-6 h-6 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
            <Layers className="w-3 h-3 text-slate-500" />
          </div>
          <div className="w-6 h-6 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
            <Clock className="w-3 h-3 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Main WhatsApp Window */}
      <div className="flex-1 flex flex-col relative">
        {/* WhatsApp Header */}
        <div className="bg-[#202c33] px-3 py-1.5 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-white text-[9px] font-semibold">Project Alpha Lead</span>
              <span className="text-[7px] text-[#25D366]">HubSpot Linked</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <Video className="w-3 h-3" />
            <Phone className="w-3 h-3" />
            <Search className="w-3 h-3" />
            <MoreVertical className="w-3 h-3" />
          </div>
        </div>

        {/* Eazybe Labels Bar */}
        <div className="bg-[#202c33]/50 border-b border-slate-700/30 px-2 py-1 flex gap-1.5 overflow-hidden">
          {[
            { label: 'Hot Lead', color: 'text-orange-400 border-orange-500/20 bg-orange-950/10' },
            { label: 'Sent Quote', color: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/10' },
            { label: 'Negotiation', color: 'text-blue-400 border-blue-500/20 bg-blue-950/10' },
          ].map((tag, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 font-mono text-[6px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${tag.color}`}
            >
              <span className="w-1 h-1 rounded-full bg-current animate-pulse"></span>
              {tag.label}
            </span>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-2 bg-[#0b141a] relative overflow-hidden">
          <div className="relative z-10 space-y-1.5">
            <div className="flex justify-start">
              <div className="max-w-[75%] px-2 py-1 rounded-lg text-[8px] bg-[#202c33] text-slate-200 rounded-tl-none border border-slate-700/50">
                <p>Hi! Just reviewing the proposal you sent via email.</p>
                <div className="text-[6px] text-slate-400 text-right mt-0.5">11:02 AM</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[75%] px-2 py-1 rounded-lg text-[8px] bg-[#005c4b] text-white rounded-tr-none">
                <p>Awesome! Glad to hear. Any specific questions on the Q4 terms?</p>
                <div className="text-[6px] text-slate-400 text-right mt-0.5 flex items-center justify-end gap-0.5">
                  11:05 AM <CheckCircle2 className="w-2 h-2 text-cyan-400" />
                </div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[75%] px-2 py-1 rounded-lg text-[8px] bg-[#202c33] text-slate-200 rounded-tl-none border border-slate-700/50">
                <p>Looking good. Ready to move forward.</p>
                <div className="text-[6px] text-slate-400 text-right mt-0.5">11:06 AM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Eazybe CRM Action Card */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute right-2 top-16 w-40 bg-[#0b141a]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-2.5 shadow-2xl z-30"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[7px] font-mono text-cyan-400 font-bold tracking-widest uppercase">CRM Context</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[8px]">
              <span className="text-slate-500">Pipeline</span>
              <span className="text-white font-bold">Enterprise v2</span>
            </div>
            <div className="flex justify-between text-[8px]">
              <span className="text-slate-500">Value</span>
              <span className="text-[#25D366] font-bold">$12,400</span>
            </div>
            <button className="w-full py-1 bg-blue-600 text-white text-[7px] font-bold rounded-md uppercase tracking-wider mt-1">
              Update Stage
            </button>
          </div>
        </motion.div>

        {/* Input Bar */}
        <div className="bg-[#202c33] px-2 py-1.5 flex items-center gap-2 border-t border-slate-800">
          <div className="flex gap-2 text-slate-400">
            <Smile className="w-3.5 h-3.5" />
            <Paperclip className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 bg-[#2a3942] rounded-md px-2 py-1 text-[8px] text-slate-200">
            Type a message...
          </div>
          <Mic className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
      </div>
    </div>
  )
}

export default WhatsAppCRMLabelAnimation
