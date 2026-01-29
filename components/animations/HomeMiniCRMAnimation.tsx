import React from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Target,
  Search,
  Phone,
  Video,
  Plus,
  Paperclip,
  Smile,
  Mic
} from 'lucide-react'

const HomeMiniCRMAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex">
      {/* Left: WhatsApp Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0b141a] relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />

        {/* Chat Header */}
        <div className="p-2 bg-[#202c33] border-b border-[#2a3942] flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-600 overflow-hidden border border-slate-500">
              <img src="https://picsum.photos/seed/James/40/40" alt="" className="opacity-80" />
            </div>
            <div>
              <div className="text-[9px] font-bold text-white leading-tight">James Wilson</div>
              <div className="text-[7px] text-emerald-400 font-mono uppercase">online</div>
            </div>
          </div>
          <div className="flex gap-2 text-slate-400">
            <Video className="w-3.5 h-3.5" />
            <Phone className="w-3.5 h-3.5" />
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-2 space-y-2 overflow-hidden relative z-10">
          <div className="flex gap-1.5">
            <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none text-[9px] text-slate-200 max-w-[85%] border border-[#2a3942]">
              Hi, checking on our enterprise agreement status.
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-1.5 justify-end"
          >
            <div className="bg-[#005c4b] p-2 rounded-lg rounded-tr-none text-[9px] text-white max-w-[85%]">
              Let me pull up your deal details now!
            </div>
          </motion.div>
        </div>

        {/* Input */}
        <div className="p-2 bg-[#202c33] border-t border-[#2a3942] flex items-center gap-2 relative z-10">
          <Smile className="w-4 h-4 text-slate-500" />
          <Paperclip className="w-4 h-4 text-slate-500" />
          <div className="flex-1 bg-[#2a3942] rounded-lg px-2 py-1 text-[8px] text-slate-500">
            Type a message
          </div>
          <Mic className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Right: CRM Sidebar */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="w-[42%] bg-brand-surface border-l border-brand-border flex flex-col"
      >
        <div className="p-2 bg-brand-card/50 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">H</span>
            </div>
            <span className="font-mono text-[8px] uppercase font-bold text-slate-300">HubSpot</span>
          </div>
          <Plus className="w-3 h-3 text-slate-500" />
        </div>

        <div className="flex-1 p-2 space-y-3 overflow-hidden">
          {/* Deal Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-[7px] font-mono font-bold text-slate-500 uppercase">
              <DollarSign className="w-2.5 h-2.5 text-brand-cyan" />
              Deal
            </div>
            <div className="bg-brand-black/40 border border-brand-border p-2 rounded-lg">
              <div className="text-white font-bold text-[9px]">Enterprise Tier 1</div>
              <div className="text-brand-cyan text-sm font-bold">$45,000</div>
              <div className="text-[7px] text-slate-500 mt-0.5">Stage: Negotiation</div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-[7px] font-mono font-bold text-slate-500 uppercase">
              <Target className="w-2.5 h-2.5 text-brand-orange" />
              Tasks
            </div>
            <div className="bg-brand-black/40 border border-brand-border p-2 rounded-lg space-y-1">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
                <span className="text-[8px] text-slate-300">Send proposal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                <span className="text-[8px] text-slate-400">Schedule demo</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomeMiniCRMAnimation
