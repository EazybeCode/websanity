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
    <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex">
      {/* Center: Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#e5ddd5] relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />

        {/* Chat Header */}
        <div className="p-2 bg-[#f0f2f5] border-b border-slate-200 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden border border-slate-200">
              <img src="https://picsum.photos/seed/James Wilson/40/40" alt="" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-900 leading-tight">James Wilson</div>
              <div className="text-[8px] text-green-600 font-mono uppercase font-bold">Syncing to HubSpot...</div>
            </div>
          </div>
          <div className="flex gap-3 text-slate-500">
            <Video className="w-4 h-4 cursor-pointer hover:text-slate-700" />
            <Phone className="w-4 h-4 cursor-pointer hover:text-slate-700" />
            <Search className="w-4 h-4 cursor-pointer hover:text-slate-700" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 space-y-3 overflow-y-auto relative z-10">
          <div className="mx-auto w-fit bg-white/90 text-[8px] font-mono text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm border border-slate-100">
            Today
          </div>

          <div className="flex gap-2">
            <div className="bg-white p-2 rounded-xl rounded-tl-none text-[10px] text-slate-800 max-w-[80%] shadow-sm border border-slate-100">
              Hi, wanted to check on the status of our enterprise agreement.
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-2 justify-end"
          >
            <div className="bg-[#d9fdd3] p-2 rounded-xl rounded-tr-none text-[10px] text-slate-800 max-w-[80%] shadow-sm border border-[#c0e8ba]">
              Looking into it now, James! Let me pull up your deal details.
            </div>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="p-2 bg-[#f0f2f5] border-t border-slate-200 flex items-center gap-2 relative z-10">
          <div className="flex gap-2 text-slate-500">
            <Smile className="w-4 h-4 cursor-pointer" />
            <Paperclip className="w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-1.5 text-[10px] text-slate-600 border border-white font-sans shadow-sm">
            Type a message
          </div>
          <Mic className="w-4 h-4 text-slate-500 cursor-pointer" />
        </div>
      </div>

      {/* Right: Eazybe CRM Sidebar */}
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        className="w-[45%] bg-brand-surface border-l border-slate-200 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-20"
      >
        <div className="p-3 bg-brand-card/20 border-b border-slate-800/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">H</span>
            </div>
            <span className="font-mono text-[9px] uppercase font-bold text-slate-300">HubSpot Live</span>
          </div>
          <Plus className="w-3 h-3 text-slate-500 cursor-pointer" />
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Section: Deal Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              <DollarSign className="w-3 h-3 text-brand-cyan" />
              Primary Deal
            </div>
            <div className="bg-brand-black/40 border border-slate-800 p-2 rounded-lg">
              <div className="text-white font-bold text-[10px]">Enterprise Tier 1</div>
              <div className="text-brand-cyan text-sm font-bold">$45,000</div>
              <div className="text-[8px] text-slate-500 mt-1">Stage: Negotiation</div>
            </div>
          </div>

          {/* Section: Next Steps */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              <Target className="w-3 h-3 text-brand-orange" />
              Next Steps
            </div>
            <div className="bg-brand-black/40 border border-slate-800 p-2 rounded-lg space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                <span className="text-[9px] text-slate-300">Send proposal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                <span className="text-[9px] text-slate-400">Schedule demo</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomeMiniCRMAnimation
