import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MoreHorizontal, RefreshCcw, Sparkles, Database, Send } from 'lucide-react'

const HomeAiAgentAnimation: React.FC = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 6)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full aspect-[4/3] bg-[#efeae2] rounded-xl overflow-hidden flex flex-col relative shadow-xl border border-slate-200">
      {/* Header */}
      <div className="h-10 bg-[#075e54] flex items-center px-3 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Bot size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[8px] font-bold leading-tight">Eazybe AI Assistant</span>
            <span className="text-white/60 text-[5px] font-mono uppercase tracking-widest">Online</span>
          </div>
        </div>
        <MoreHorizontal size={14} className="text-white/80" />
      </div>

      {/* Chat */}
      <div className="flex-1 p-3 space-y-3 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <div className="space-y-2">
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="flex justify-end"
              >
                <div className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[80%] border border-black/5">
                  <p className="text-[7px] text-slate-800 leading-relaxed">Summarize my last 3 chats with Sarah and update the HubSpot deal to $50k.</p>
                  <span className="text-[5px] text-slate-400 mt-0.5 block text-right">11:42 AM</span>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2 border border-slate-100">
                  <RefreshCcw size={8} className="text-cyan-500 animate-spin" />
                  <span className="text-[7px] font-mono text-slate-500 uppercase font-bold tracking-tighter">Analyzing_Context...</span>
                </div>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: -15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="flex flex-col gap-2"
              >
                <div className="flex justify-start">
                  <div className="bg-white p-2.5 rounded-lg rounded-tl-none shadow-md max-w-[85%] border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles size={8} className="text-blue-600" />
                      <span className="text-[5px] font-mono font-bold text-blue-600 uppercase tracking-widest">Agent</span>
                    </div>
                    <p className="text-[7px] text-slate-800 leading-relaxed">Summary complete: Sarah is interested in the Enterprise plan but requested a custom SLA. Deal updated to $50,000 in HubSpot.</p>
                    <div className="mt-2 p-1.5 bg-slate-900 border border-slate-700 rounded-md flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 bg-[#ff7a59] rounded flex items-center justify-center">
                          <Database size={7} className="text-white" />
                        </div>
                        <span className="text-[5px] font-mono text-slate-300 font-bold uppercase">Field_Updated</span>
                      </div>
                      <span className="text-[5px] font-mono text-emerald-400 font-bold">DEAL=$50k</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="h-9 bg-[#f0f2f5] border-t border-slate-200 flex items-center px-3 gap-2 shrink-0">
        <div className="flex-1 bg-white h-6 rounded-full border border-slate-300 flex items-center px-3">
          <span className="text-[7px] text-slate-400">Type a message...</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-[#075e54] flex items-center justify-center text-white shadow-md">
          <Send size={10} />
        </div>
      </div>

      {/* Floating Console */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-12 right-3 w-32 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg p-2.5 shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[5px] text-white/40 uppercase tracking-[0.15em]">Ops_Console</span>
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className={`w-1 h-1 rounded-full ${step >= 3 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                <span className={`font-mono text-[6px] uppercase ${step >= 3 ? 'text-white' : 'text-slate-500'}`}>Summary_Task</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1 h-1 rounded-full ${step >= 4 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                <span className={`font-mono text-[6px] uppercase ${step >= 4 ? 'text-white' : 'text-slate-500'}`}>Hubspot_Write</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step === 2 ? '40%' : step >= 3 ? '100%' : '0%' }}
                  className="h-full bg-cyan-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomeAiAgentAnimation
