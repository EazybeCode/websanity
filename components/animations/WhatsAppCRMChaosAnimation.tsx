import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, MessageSquare, MoreVertical, Search } from 'lucide-react'

const WhatsAppCRMChaosAnimation: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-[#0b141a] border border-slate-700/50 shadow-2xl flex flex-col">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="flex h-full">
        <div className="w-full flex flex-col">
          <div className="bg-[#202c33] px-3 py-2 flex justify-between items-center">
            <div className="w-7 h-7 rounded-full bg-slate-600" />
            <div className="flex gap-4 text-slate-400">
              <MessageSquare className="w-3.5 h-3.5" />
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="px-2 py-1.5">
            <div className="bg-[#202c33] rounded-lg px-2 py-1.5 flex items-center gap-2 text-slate-400">
              <Search className="w-3 h-3" />
              <span className="text-[8px]">Search or start new chat</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden space-y-[1px] bg-[#0b141a]">
            {[
              { name: 'John Doe', msg: 'Can you send the quote?', time: '10:42', unread: 4 },
              { name: 'Sarah Smith', msg: "I'm interested in the demo...", time: '09:15', unread: 2 },
              { name: 'Tech Corp', msg: "Wait, what's the price?", time: 'Yesterday', unread: 12 },
              { name: 'Marketing Lead', msg: 'Did you follow up?', time: 'Yesterday', unread: 0 },
              { name: 'Unknown Number', msg: 'Hello??', time: 'Monday', unread: 1 },
            ].map((chat, i) => (
              <div
                key={i}
                className="px-3 py-2 flex items-center gap-2 opacity-80 border-b border-slate-800/50"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="text-white text-[9px] font-medium truncate">{chat.name}</span>
                    <span className="text-[7px] text-slate-500">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-[8px] text-slate-500 truncate">{chat.msg}</p>
                    {chat.unread > 0 && (
                      <span className="bg-[#25D366] text-[#0b141a] text-[7px] font-bold px-1 py-0.5 rounded-full min-w-[14px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay showing 'The Problem' */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-[#0b141a]/40 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#0b141a]/95 border border-slate-700/50 p-6 rounded-2xl shadow-2xl text-center max-w-[200px]"
          >
            <AlertCircle className="w-10 h-10 text-orange-500 mx-auto mb-3 animate-pulse" />
            <h4 className="text-white font-bold text-sm mb-1.5">Chaos Unleashed</h4>
            <p className="text-slate-500 text-[7px] font-mono uppercase tracking-[0.15em] leading-relaxed">
              100+ Unsorted Chats &bull; Missing Context &bull; Revenue Slippage
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppCRMChaosAnimation
