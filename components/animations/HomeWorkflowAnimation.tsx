import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Clock, MessageCircle, ArrowDown } from 'lucide-react'

const HomeWorkflowAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wide">Automation Builder</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[8px] font-medium text-emerald-400 uppercase">Active</span>
        </div>
      </div>

      {/* Workflow Canvas */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center gap-2 relative bg-gradient-to-b from-slate-900 to-slate-800/50">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Trigger Node */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          <motion.div
            className="flex items-center gap-2.5 bg-slate-800 border border-orange-500/40 p-2.5 rounded-xl shadow-lg"
            animate={{ boxShadow: ['0 0 0 0 rgba(249, 115, 22, 0)', '0 0 15px 2px rgba(249, 115, 22, 0.2)', '0 0 0 0 rgba(249, 115, 22, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <div className="text-[8px] font-medium text-orange-400 uppercase tracking-wide">When</div>
              <div className="text-white font-semibold text-[10px]">No reply in 24 hours</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Connection Line 1 */}
        <div className="relative h-6 flex items-center justify-center">
          <motion.div
            className="w-0.5 h-full bg-gradient-to-b from-orange-500/50 to-cyan-500/50"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{ boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.4)' }}
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ArrowDown className="w-3 h-3 text-cyan-400" />
          </motion.div>
        </div>

        {/* Action Node */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative z-10"
        >
          <motion.div
            className="flex items-center gap-2.5 bg-slate-800 border border-[#25D366]/40 p-2.5 rounded-xl shadow-lg"
            animate={{ boxShadow: ['0 0 0 0 rgba(37, 211, 102, 0)', '0 0 15px 2px rgba(37, 211, 102, 0.2)', '0 0 0 0 rgba(37, 211, 102, 0)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#25D366] fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <div className="text-[8px] font-medium text-[#25D366] uppercase tracking-wide">Then</div>
              <div className="text-white font-semibold text-[10px]">Send WhatsApp message</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="absolute bottom-3 left-3 flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            <div className="text-lg font-bold text-white">847</div>
            <div className="text-[8px] text-slate-500 uppercase">Triggered</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">92%</div>
            <div className="text-[8px] text-slate-500 uppercase">Reply Rate</div>
          </div>
        </motion.div>
      </div>

      {/* Footer Preview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-3 bg-slate-800/80 border-t border-slate-700/50"
      >
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-3 h-3 text-[#25D366]" />
          <span className="text-[9px] font-medium text-slate-400 uppercase">Message Preview</span>
        </div>
        <motion.div
          className="bg-[#25D366]/10 border border-[#25D366]/30 p-2.5 rounded-lg flex items-center justify-between"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] text-slate-200">Hi! Just checking in on your interest...</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HomeWorkflowAnimation
