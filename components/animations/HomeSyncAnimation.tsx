import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ArrowUp } from 'lucide-react'

const crms = [
  { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256', color: '#FF7A59' },
  { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256', color: '#00A1E0' },
  { name: 'Zoho', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256', color: '#E42527' },
  { name: 'Pipedrive', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.pipedrive.com&size=256', color: '#21A47A' }
]

const messages = [
  { text: 'Hi, interested in...', delay: 0 },
  { text: 'Can you send pricing?', delay: 0.8 },
  { text: 'Thanks! When can...', delay: 1.6 },
  { text: 'Deal confirmed ✓', delay: 2.4 },
]

const HomeSyncAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col">
      {/* CRM Row */}
      <div className="grid grid-cols-4 gap-2 p-3 bg-slate-800/50 border-b border-slate-700/50">
        {crms.map((crm, i) => (
          <motion.div
            key={crm.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="bg-slate-800 border border-slate-600/50 p-2 rounded-lg flex flex-col items-center gap-1.5 hover:border-blue-500/50 transition-all duration-300"
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0 0 ${crm.color}00`,
                  `0 0 8px 2px ${crm.color}40`,
                  `0 0 0 0 ${crm.color}00`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="rounded"
            >
              <img
                src={crm.logo}
                alt={crm.name}
                className="w-6 h-6 rounded object-contain"
              />
            </motion.div>
            <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wide">{crm.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Sync Area */}
      <div className="flex-1 relative bg-gradient-to-b from-slate-900 to-slate-800/50 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Central sync line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-cyan-500/80 via-cyan-400 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Animated particles going up */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400"
              style={{ boxShadow: '0 0 10px 2px rgba(34, 211, 238, 0.6)' }}
              animate={{
                y: ['100%', '-100%'],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'linear'
              }}
            />
          ))}
        </div>

        {/* Floating messages */}
        <div className="absolute inset-0 flex items-center justify-center">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ y: 80, opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={{
                y: [-20, -80],
                opacity: [0, 1, 1, 0],
                x: 0
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: msg.delay,
                ease: 'easeOut'
              }}
            >
              <div className="bg-slate-800 border border-cyan-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-cyan-500/10">
                <MessageSquare className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] text-slate-300 font-medium whitespace-nowrap">{msg.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sync indicator */}
        <motion.div
          className="absolute top-3 right-3 flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded-full"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowUp className="w-3 h-3 text-cyan-400" />
          <span className="text-[8px] font-mono text-cyan-400 uppercase">Syncing</span>
        </motion.div>
      </div>

      {/* Source WhatsApp */}
      <div className="p-3 bg-slate-800/80 border-t border-slate-700/50 flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-lg"
          animate={{ boxShadow: ['0 0 0 0 rgba(37, 211, 102, 0)', '0 0 20px 4px rgba(37, 211, 102, 0.3)', '0 0 0 0 rgba(37, 211, 102, 0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-xs">WhatsApp Business</h4>
          <p className="text-slate-500 text-[10px]">All messages captured automatically</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[9px] font-medium text-emerald-400 uppercase">Live</span>
        </div>
      </div>
    </div>
  )
}

export default HomeSyncAnimation
