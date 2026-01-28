import React from 'react'
import { motion } from 'framer-motion'
import { Database, RefreshCcw, ShieldCheck, Zap } from 'lucide-react'

const WhatsAppCRMSyncAnimation: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 flex flex-col items-center justify-center p-6 shadow-2xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="flex items-center justify-between w-full max-w-sm z-10 gap-3">
        {/* Source: WhatsApp Window Mockup */}
        <motion.div className="w-32 bg-[#0b141a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-[#202c33] p-1.5 flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#25D366]" />
            <div className="h-1 w-12 bg-slate-600 rounded" />
          </div>
          <div className="p-2 space-y-1.5 h-24 flex flex-col">
            <div className="self-start w-16 h-4 bg-[#202c33] rounded-md" />
            <div className="self-end w-20 h-4 bg-[#005c4b] rounded-md" />
            <div className="mt-auto border-t border-slate-800 pt-1.5 flex justify-between items-center">
              <div className="w-8 h-2.5 bg-cyan-500/20 rounded border border-cyan-500/30" />
              <Zap className="w-2.5 h-2.5 text-cyan-400" />
            </div>
          </div>
        </motion.div>

        {/* Sync Stream */}
        <div className="flex-1 px-2 flex flex-col items-center">
          <div className="flex gap-1.5 mb-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, 40, 0],
                  opacity: [0.1, 1, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]"
              />
            ))}
          </div>
          <div className="h-[2px] w-full bg-slate-800 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-0 w-16 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </div>
          <RefreshCcw className="w-4 h-4 text-blue-500 mt-2 animate-spin opacity-50" style={{ animationDuration: '3s' }} />
        </div>

        {/* Destination: CRM Window Mockup */}
        <motion.div className="w-32 bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-slate-800 p-1.5 flex items-center justify-between">
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div className="w-1 h-1 rounded-full bg-slate-600" />
            </div>
            <Database className="w-2.5 h-2.5 text-orange-500" />
          </div>
          <div className="p-2.5 space-y-2 h-24">
            <div className="h-1.5 w-full bg-slate-700 rounded" />
            <div className="h-1.5 w-2/3 bg-slate-700 rounded" />
            <div className="pt-3 flex justify-between">
              <div className="h-3 w-10 bg-[#25D366]/10 rounded border border-[#25D366]/20" />
              <div className="h-3 w-10 bg-blue-500/10 rounded border border-blue-500/20" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 w-full max-w-xs z-10">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-2.5 h-2.5 text-[#25D366]" />
            <span className="font-mono text-[7px] text-slate-400 uppercase tracking-wider">Encrypted Data Stream</span>
          </div>
          <span className="font-mono text-[7px] text-blue-400 font-bold uppercase tracking-widest">Active Sync</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <motion.div
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
          />
        </div>
      </div>
    </div>
  )
}

export default WhatsAppCRMSyncAnimation
