import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, RefreshCcw } from 'lucide-react'

const HomeMiniCRMAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl overflow-hidden flex flex-row relative shadow-xl border border-slate-200">
      <div className="w-[55%] bg-[#efeae2] flex flex-col border-r border-slate-200">
        <div className="h-10 bg-[#f0f2f5] flex items-center px-3 justify-between border-b border-slate-300/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <MessageSquare className="text-emerald-500 w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 text-[8px] font-bold">WhatsApp chats</span>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-3 h-3 rounded-full bg-slate-300 flex items-center justify-center text-[5px] font-bold text-slate-600">S</div>
              <span className="text-[6px] font-bold text-slate-500 uppercase tracking-tighter">Sarah Chen</span>
            </div>
            <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
              <p className="text-[8px] text-slate-800 leading-tight">Hi! Following up on the enterprise quote.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-1"
          >
            <div className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[85%] ml-auto">
              <p className="text-[8px] text-slate-800 leading-tight">Sure, sending it now!</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-[45%] bg-white flex flex-col">
        <div className="h-10 flex items-center px-3 justify-between border-b border-slate-100">
          <div className="w-5 h-5 bg-[#ff7a59] rounded-md flex items-center justify-center">
            <RefreshCcw className="text-white w-3 h-3" />
          </div>
          <span className="text-[6px] font-mono text-slate-400 font-bold uppercase">CRM Panel</span>
        </div>
        <div className="flex-1 flex flex-col p-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">SC</div>
            <div>
              <span className="text-[9px] font-bold text-slate-800 block">Sarah Chen</span>
              <span className="text-[6px] text-slate-400">Enterprise Lead</span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { field: 'Company', value: 'TechCorp Inc.' },
              { field: 'Deal Stage', value: 'Negotiation' },
              { field: 'Value', value: '$24,500' },
            ].map((item, i) => (
              <div key={i} className="border-b border-slate-100 pb-1">
                <label className="text-[6px] font-bold text-slate-400 uppercase">{item.field}</label>
                <div className="text-[8px] text-slate-800 font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeMiniCRMAnimation
