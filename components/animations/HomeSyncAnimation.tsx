import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Database, RefreshCcw, MoreHorizontal, Search, Filter, Settings } from 'lucide-react'

const HomeSyncAnimation: React.FC = () => {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full aspect-[4/3] bg-[#f0ede6] rounded-xl overflow-hidden flex flex-col relative shadow-inner border border-slate-200">
      <div className="flex h-8 shadow-md z-10">
        <div className="w-1/2 bg-[#075e54] flex items-center px-3 justify-between border-r border-black/10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/40">
              <MessageSquare size={10} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[7px] font-bold leading-none">Sarah Chen</span>
              <span className="text-white/60 text-[5px] font-mono tracking-tighter uppercase">WhatsApp Business</span>
            </div>
          </div>
          <MoreHorizontal className="text-white/60 w-3 h-3" />
        </div>
        <div className="w-1/2 bg-[#2d3e50] flex items-center px-3 justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-[#ff7a59] rounded flex items-center justify-center">
              <Database className="text-white w-2.5 h-2.5" />
            </div>
            <span className="text-white text-[6px] font-mono font-bold uppercase tracking-tight">HubSpot CRM</span>
          </div>
          <Settings className="text-white/40 w-3 h-3" />
        </div>
      </div>

      <div className="flex flex-1 relative bg-white/50">
        <div className="w-1/2 p-3 space-y-2 border-r border-slate-200 bg-[#efeae2]/50">
          <AnimatePresence>
            {cycle >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: -15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[90%] border border-slate-100"
              >
                <p className="text-[7px] text-slate-800 leading-tight">Hi! Following up on the enterprise quote.</p>
                <span className="text-[5px] text-slate-400 mt-0.5 block text-right">10:02 AM</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {cycle >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[90%] ml-auto border border-black/5"
              >
                <p className="text-[7px] text-slate-800 leading-tight">Just sent it over to your email, Sarah.</p>
                <span className="text-[5px] text-slate-400 mt-0.5 block text-right">10:03 AM</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-1/2 bg-white flex flex-col">
          <div className="h-6 border-b border-slate-100 flex items-center px-3 gap-3">
            <span className="text-[6px] font-bold text-[#ff7a59] border-b-2 border-[#ff7a59] h-full flex items-center uppercase tracking-tighter">Activity Log</span>
            <span className="text-[6px] font-medium text-slate-400 h-full flex items-center uppercase tracking-tighter">Emails</span>
            <div className="ml-auto flex gap-1.5">
              <Search className="w-2.5 h-2.5 text-slate-300" />
              <Filter className="w-2.5 h-2.5 text-slate-300" />
            </div>
          </div>

          <div className="p-3 space-y-2 overflow-hidden">
            <AnimatePresence>
              {cycle >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <RefreshCcw className="w-2 h-2 text-[#ff7a59]" />
                    <span className="text-[5px] font-bold text-slate-700 uppercase">WhatsApp Log</span>
                    <span className="text-[5px] text-slate-400 ml-auto">10:02 AM</span>
                  </div>
                  <p className="text-[6px] text-slate-500 italic">"Hi! Following up on the enterprise quote."</p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-[5px] bg-[#2d3e50] text-white px-1 py-0.5 rounded font-mono uppercase tracking-tighter">Sarah Chen</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[1px] h-[60%] bg-gradient-to-b from-transparent via-slate-300/30 to-transparent absolute left-1/2 -translate-x-1/2"></div>
          <motion.div
            animate={{
              scale: cycle === 1 || cycle === 3 ? [1, 1.3, 1] : 1,
              borderColor: cycle === 1 || cycle === 3 ? ['#cbd5e1', '#2563EB', '#cbd5e1'] : '#cbd5e1',
              backgroundColor: cycle === 1 || cycle === 3 ? ['#ffffff', '#eff6ff', '#ffffff'] : '#ffffff',
            }}
            transition={{ duration: 0.5 }}
            className="w-7 h-7 rounded-full bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center z-20"
          >
            <RefreshCcw className={`w-3.5 h-3.5 text-slate-400 transition-colors duration-500 ${cycle === 1 || cycle === 3 ? 'text-blue-600 animate-spin' : ''}`} />
          </motion.div>
        </div>
      </div>

      <div className="h-5 bg-white border-t border-slate-200 px-3 flex items-center justify-between font-mono text-[6px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${cycle > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
          <span className={`uppercase tracking-widest font-bold ${cycle > 0 ? 'text-slate-600' : 'text-slate-300'}`}>Pipeline Ready</span>
        </div>
      </div>
    </div>
  )
}

export default HomeSyncAnimation
