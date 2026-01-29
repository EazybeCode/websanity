import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Database, MessageCircle } from 'lucide-react'

const HomeWorkflowAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-3xl rounded-full pointer-events-none" />

      <div className="flex flex-col gap-4 relative h-full justify-center">
        {/* Trigger */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 w-fit shadow-sm"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
            <Database className="w-4 h-4 text-brand-orange" />
          </div>
          <div>
            <div className="text-[8px] font-mono font-bold text-slate-500 uppercase">Trigger</div>
            <div className="text-slate-800 font-bold text-[10px]">Deal Stage changed to "Closed"</div>
          </div>
        </motion.div>

        {/* Connection Line */}
        <div className="flex justify-center ml-16">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-0.5 bg-gradient-to-b from-brand-orange to-brand-cyan relative"
          >
            <motion.div
              animate={{ y: [0, 40] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-0 -left-[3px] w-2 h-2 rounded-full bg-white shadow-glow-cyan border border-brand-cyan"
            />
          </motion.div>
        </div>

        {/* Action */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 bg-white p-3 rounded-xl border border-brand-cyan/40 w-fit ml-auto shadow-sm"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-brand-cyan" />
          </div>
          <div>
            <div className="text-[8px] font-mono font-bold text-slate-500 uppercase">Action</div>
            <div className="text-slate-800 font-bold text-[10px]">Send "Onboarding" Message</div>
          </div>
        </motion.div>

        {/* WhatsApp Result */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-slate-900 border border-slate-700 p-3 rounded-xl mt-2"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <MessageCircle className="w-3 h-3 text-brand-green" />
            <span className="text-[8px] font-mono text-slate-400 uppercase">Preview</span>
          </div>
          <div className="bg-brand-blue/20 border border-brand-blue/30 p-2 rounded-lg text-[10px] text-slate-100">
            Welcome to the team! Your account is ready. Click here to begin onboarding...
          </div>
          <div className="mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-[8px] text-emerald-400 font-mono uppercase">Sent via Eazybe</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomeWorkflowAnimation
