import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Database, MessageCircle } from 'lucide-react'

const HomeWorkflowAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Workflow Builder</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
          <span className="text-[8px] font-mono text-brand-green uppercase">Active</span>
        </div>
      </div>

      {/* Workflow Canvas */}
      <div className="flex-1 p-4 flex flex-col gap-3 justify-center relative bg-brand-black/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 blur-3xl rounded-full pointer-events-none" />

        {/* Trigger */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 bg-brand-surface p-2.5 rounded-xl border border-brand-border w-fit shadow-sm relative z-10"
        >
          <div className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center">
            <Database className="w-3.5 h-3.5 text-brand-orange" />
          </div>
          <div>
            <div className="text-[7px] font-mono font-bold text-slate-500 uppercase">Trigger</div>
            <div className="text-white font-bold text-[9px]">Deal Stage → "Closed"</div>
          </div>
        </motion.div>

        {/* Connection Line */}
        <div className="flex justify-center ml-12">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-0.5 bg-gradient-to-b from-brand-orange to-brand-cyan relative"
          >
            <motion.div
              animate={{ y: [0, 24] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute top-0 -left-[2px] w-1.5 h-1.5 rounded-full bg-white shadow-glow-cyan"
            />
          </motion.div>
        </div>

        {/* Action */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 bg-brand-surface p-2.5 rounded-xl border border-brand-cyan/40 w-fit ml-auto shadow-sm relative z-10"
        >
          <div className="w-7 h-7 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-brand-cyan" />
          </div>
          <div>
            <div className="text-[7px] font-mono font-bold text-slate-500 uppercase">Action</div>
            <div className="text-white font-bold text-[9px]">Send WhatsApp Message</div>
          </div>
        </motion.div>
      </div>

      {/* Footer Preview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-3 bg-brand-surface border-t border-brand-border"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <MessageCircle className="w-3 h-3 text-brand-green" />
          <span className="text-[8px] font-mono text-slate-400 uppercase">Preview</span>
        </div>
        <div className="bg-brand-blue/20 border border-brand-blue/30 p-2 rounded-lg text-[9px] text-slate-200 flex items-center justify-between">
          <span>Welcome! Your account is ready...</span>
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        </div>
      </motion.div>
    </div>
  )
}

export default HomeWorkflowAnimation
