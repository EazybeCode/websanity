import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Send, CheckCircle } from 'lucide-react'

const HomeAiAgentAnimation: React.FC = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 4)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="h-full w-full max-w-sm mx-auto bg-brand-card border-x border-brand-border flex flex-col">
        <div className="bg-slate-900 p-3 border-b border-brand-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-brand-cyan" />
          </div>
          <div>
            <div className="text-white font-bold text-[10px]">Eazybe AI Assistant</div>
            <div className="text-brand-green text-[7px] font-mono uppercase tracking-widest">Active & Syncing</div>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3 bg-slate-900/40 overflow-hidden">
          <AnimatePresence mode="wait">
            {step >= 0 && (
              <motion.div
                key="user-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-2 justify-end"
              >
                <div className="bg-brand-blue p-2 rounded-xl rounded-tr-none text-[9px] text-white max-w-[80%]">
                  Update James's deal to $15,000 and move it to negotiation.
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                  <User className="w-3 h-3 text-slate-400" />
                </div>
              </motion.div>
            )}

            {step >= 1 && (
              <motion.div
                key="bot-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-brand-cyan" />
                </div>
                <div className="bg-slate-800 p-2 rounded-xl rounded-tl-none text-[9px] text-slate-300 max-w-[80%] space-y-1.5">
                  <div>Understood. Accessing HubSpot...</div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-0.5 bg-brand-cyan/30 rounded-full overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-1/2 h-full bg-brand-cyan"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                key="bot-success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex gap-2"
              >
                <div className="w-6 h-6 invisible" />
                <div className="bg-brand-green/10 border border-brand-green/30 p-2 rounded-xl text-[9px] text-brand-green flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Deal Updated!</div>
                    <div className="text-[8px] opacity-80">HubSpot ID: #DS-9921</div>
                  </div>
                </div>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                key="bot-followup"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-brand-cyan" />
                </div>
                <div className="bg-slate-800 p-2 rounded-xl rounded-tl-none text-[9px] text-slate-300 max-w-[80%]">
                  I've also drafted a follow-up message for James. Should I send it?
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-2 bg-slate-900 border-t border-brand-border flex items-center gap-2">
          <div className="flex-1 bg-brand-black rounded-full px-3 py-1.5 text-[8px] text-slate-500 font-mono">
            TYPE A COMMAND...
          </div>
          <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
            <Send className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeAiAgentAnimation
