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
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-brand-cyan" />
        </div>
        <div>
          <div className="text-white font-bold text-[9px]">Eazybe AI Assistant</div>
          <div className="text-brand-green text-[7px] font-mono uppercase tracking-widest">Active</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-3 flex flex-col gap-2 bg-brand-black/40 overflow-hidden">
        <AnimatePresence mode="wait">
          {step >= 0 && (
            <motion.div
              key="user-1"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex gap-1.5 justify-end"
            >
              <div className="bg-brand-blue p-2 rounded-lg rounded-tr-none text-[8px] text-white max-w-[80%]">
                Update James's deal to $15,000 and move it to negotiation.
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                <User className="w-2.5 h-2.5 text-slate-400" />
              </div>
            </motion.div>
          )}

          {step >= 1 && (
            <motion.div
              key="bot-1"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex gap-1.5"
            >
              <div className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex-shrink-0 flex items-center justify-center">
                <Bot className="w-2.5 h-2.5 text-brand-cyan" />
              </div>
              <div className="bg-brand-surface p-2 rounded-lg rounded-tl-none text-[8px] text-slate-300 max-w-[80%] space-y-1 border border-brand-border">
                <div>Accessing HubSpot...</div>
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
              className="flex gap-1.5"
            >
              <div className="w-5 h-5 invisible" />
              <div className="bg-brand-green/10 border border-brand-green/30 p-2 rounded-lg text-[8px] text-brand-green flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <div>
                  <div className="font-bold">Deal Updated!</div>
                  <div className="text-[7px] opacity-80">HubSpot ID: #DS-9921</div>
                </div>
              </div>
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div
              key="bot-followup"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex gap-1.5"
            >
              <div className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex-shrink-0 flex items-center justify-center">
                <Bot className="w-2.5 h-2.5 text-brand-cyan" />
              </div>
              <div className="bg-brand-surface p-2 rounded-lg rounded-tl-none text-[8px] text-slate-300 max-w-[80%] border border-brand-border">
                Drafted a follow-up for James. Send it?
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center gap-2">
        <div className="flex-1 bg-brand-black rounded-full px-3 py-1.5 text-[7px] text-slate-500 font-mono uppercase">
          Type a command...
        </div>
        <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
          <Send className="w-3 h-3 text-white" />
        </div>
      </div>
    </div>
  )
}

export default HomeAiAgentAnimation
