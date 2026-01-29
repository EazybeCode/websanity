import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, X, Ban, Clock } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const TemplatesProblemAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#25D366] flex items-center justify-center">
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase">Manual Messaging</span>
        </div>
        <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-2 py-1 rounded-full">
          <AlertTriangle className="w-2.5 h-2.5 text-red-400" />
          <span className="text-[7px] font-mono text-red-400 uppercase font-bold">Risk</span>
        </div>
      </div>

      {/* Main content - Chat simulation */}
      <div className="flex-1 p-3 space-y-2 bg-brand-black/40">
        {/* Typing indicator */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="bg-slate-800 px-3 py-2 rounded-lg flex items-center gap-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-slate-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-slate-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-slate-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <span className="text-[6px] text-slate-500">Typing each message manually...</span>
        </motion.div>

        {/* Rejected message */}
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, repeat: Infinity, repeatDelay: 5 }}
        >
          <div className="bg-[#054D44] p-2 rounded-lg rounded-tr-none text-[7px] text-white/80 ml-auto max-w-[80%] relative">
            <span>Hi! Check out our latest offers and discounts...</span>
            <motion.div
              className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 }}
            >
              <X className="w-2.5 h-2.5 text-white" />
            </motion.div>
          </div>
          <motion.span
            className="text-[6px] text-red-400 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            Message rejected - not template approved
          </motion.span>
        </motion.div>

        {/* Warning cards */}
        <div className="flex gap-2 mt-3">
          <motion.div
            className="flex-1 bg-red-500/10 border border-red-500/20 p-2 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3 }}
          >
            <Ban className="w-3 h-3 text-red-400 mb-1" />
            <div className="text-[6px] text-red-400 font-bold uppercase">Ban Risk</div>
            <div className="text-[5px] text-slate-500">Number blocked</div>
          </motion.div>

          <motion.div
            className="flex-1 bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.3 }}
          >
            <Clock className="w-3 h-3 text-amber-400 mb-1" />
            <div className="text-[6px] text-amber-400 font-bold uppercase">Time Waste</div>
            <div className="text-[5px] text-slate-500">Hours typing</div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <AlertTriangle className="w-3 h-3 text-red-400" />
        <span className="text-[7px] font-mono text-red-400 uppercase">Manual = Risky & Slow</span>
      </div>
    </div>
  )
}

export default TemplatesProblemAnimation
