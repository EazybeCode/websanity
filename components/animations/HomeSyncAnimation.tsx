import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

const crms = [
  { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256', color: 'border-orange-500/30' },
  { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256', color: 'border-blue-500/30' },
  { name: 'Zoho', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256', color: 'border-red-500/30' },
  { name: 'Pipedrive', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.pipedrive.com&size=256', color: 'border-green-500/30' }
]

const HomeSyncAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col">
      {/* CRM Row */}
      <div className="grid grid-cols-4 gap-1.5 p-3 bg-brand-surface border-b border-brand-border">
        {crms.map((crm, i) => (
          <motion.div
            key={crm.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-brand-black/40 border ${crm.color} p-2 rounded-lg flex flex-col items-center gap-1.5 group hover:border-brand-blue transition-colors`}
          >
            <img
              src={crm.logo}
              alt={crm.name}
              className="w-6 h-6 rounded object-contain"
            />
            <span className="text-[7px] font-mono font-bold text-slate-400 uppercase">{crm.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Floating Messages Area */}
      <div className="flex-1 relative bg-brand-black/40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        {/* Sync arrows/lines visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[2px] h-[60%] bg-gradient-to-b from-brand-cyan/50 via-brand-cyan to-brand-cyan/50"></div>
        </div>

        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 150, x: `${15 + i * 18}%`, opacity: 0, scale: 0.5 }}
            animate={{
              y: -50,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear'
            }}
            className="absolute top-1/2 bg-brand-cyan/20 border border-brand-cyan/40 p-1.5 rounded-lg flex items-center gap-1"
          >
            <MessageSquare className="w-2.5 h-2.5 text-brand-cyan" />
            <div className="w-8 h-1 bg-brand-cyan/30 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Source WhatsApp */}
      <div className="p-3 bg-brand-surface border-t border-brand-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-[11px]">WhatsApp Business</h4>
          <p className="text-slate-500 text-[9px] font-mono uppercase">Real-time sync active</p>
        </div>
        <div className="flex items-center gap-1.5 bg-brand-green/10 border border-brand-green/30 px-2 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
          <span className="text-[8px] font-mono text-brand-green uppercase font-bold">Live</span>
        </div>
      </div>
    </div>
  )
}

export default HomeSyncAnimation
