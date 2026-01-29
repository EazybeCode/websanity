import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

const crms = [
  { name: 'HubSpot', color: 'bg-orange-500' },
  { name: 'Salesforce', color: 'bg-blue-500' },
  { name: 'Zoho', color: 'bg-red-500' },
  { name: 'Pipedrive', color: 'bg-green-500' }
]

const HomeSyncAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-4 flex flex-col items-center justify-between overflow-hidden">
      {/* CRM Row */}
      <div className="grid grid-cols-4 gap-2 w-full">
        {crms.map((crm, i) => (
          <motion.div
            key={crm.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col items-center gap-1.5 group hover:border-brand-blue shadow-sm"
          >
            <div className={`w-6 h-6 rounded-lg ${crm.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
            <span className="text-[8px] font-mono font-bold text-slate-500 uppercase">{crm.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Floating Messages */}
      <div className="relative w-full h-[100px] pointer-events-none">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, x: `${20 + i * 15}%`, opacity: 0, scale: 0.5 }}
            animate={{
              y: -80,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'linear'
            }}
            className="absolute bg-brand-cyan/20 border border-brand-cyan/40 p-2 rounded-xl flex items-center gap-1.5"
          >
            <MessageSquare className="w-3 h-3 text-brand-cyan" />
            <div className="w-10 h-1.5 bg-brand-cyan/30 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Source WhatsApp */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3 relative shadow-sm">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-brand-cyan/10 blur-2xl rounded-full pointer-events-none" />
        <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-slate-800 font-bold text-sm">WhatsApp Business</h4>
          <p className="text-slate-500 text-[10px] font-mono uppercase">Streaming Real-time...</p>
        </div>
      </div>
    </div>
  )
}

export default HomeSyncAnimation
