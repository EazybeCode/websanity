import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, MessageSquare, Clock, ArrowDown } from 'lucide-react'

const HomeWorkflowAnimation: React.FC = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 6)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full aspect-[4/3] bg-[#f9fafb] rounded-xl overflow-hidden flex flex-col relative shadow-inner border border-slate-200">
      <div className="h-8 bg-[#2d3e50] flex items-center px-3 justify-between shrink-0">
        <span className="text-white text-[8px] font-bold">WhatsApp Lead Sequence</span>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${step >= 2 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-[6px] text-white/60 font-mono uppercase">{step >= 2 ? 'Active' : 'Ready'}</span>
        </div>
      </div>

      <div className="flex-1 relative bg-white flex flex-col items-center justify-center gap-3 p-4">
        {/* Trigger Node */}
        <motion.div
          animate={{ borderColor: step === 0 ? '#2563eb' : '#e2e8f0' }}
          className="w-48 bg-white border-2 rounded-lg shadow-sm p-2.5 flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center">
            <Zap className="w-3 h-3 text-blue-600" />
          </div>
          <div>
            <span className="text-[7px] font-bold text-slate-800 block">Enrollment Trigger</span>
            <span className="text-[5px] text-slate-400">New WhatsApp contact detected</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0.3 }}
          className="flex flex-col items-center"
        >
          <ArrowDown className="w-3 h-3 text-slate-300" />
        </motion.div>

        {/* Send Message Node */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-52 bg-white border-2 border-emerald-500/30 rounded-lg shadow-md p-2.5 flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-emerald-600" />
              </div>
              <div>
                <span className="text-[7px] font-bold text-slate-800 block">Send WhatsApp Template</span>
                <span className="text-[5px] text-emerald-600 font-mono uppercase">Sending...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0.3 }}
            className="flex flex-col items-center"
          >
            <ArrowDown className="w-3 h-3 text-slate-300" />
          </motion.div>
        )}

        {/* Wait Node */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-48 bg-white border-2 border-amber-500/30 rounded-lg shadow-md p-2.5 flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded bg-amber-50 flex items-center justify-center">
                <Clock className="w-3 h-3 text-amber-600" />
              </div>
              <div>
                <span className="text-[7px] font-bold text-slate-800 block">Wait 24 Hours</span>
                <span className="text-[5px] text-amber-600 font-mono uppercase">If no reply</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default HomeWorkflowAnimation
