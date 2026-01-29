import React from 'react'
import { motion } from 'framer-motion'
import { Server, Smartphone, CloudLightning } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const crms = [
  { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256' },
  { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256' },
  { name: 'Zoho', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256' },
]

const CoexistenceDualChannelAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      {/* Top: CRM Row */}
      <div className="flex items-center justify-center gap-3 p-3 bg-brand-surface border-b border-brand-border">
        {crms.map((crm, i) => (
          <motion.div
            key={crm.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-black/40 border border-brand-border p-2 rounded-lg flex flex-col items-center gap-1 hover:border-brand-blue transition-colors"
          >
            <img src={crm.logo} alt={crm.name} className="w-5 h-5 rounded object-contain" />
            <span className="text-[6px] font-mono font-bold text-slate-400 uppercase">{crm.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Middle: Connection visualization */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="flex items-center justify-between w-full max-w-xs">
          {/* WhatsApp App Side */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
              <WhatsAppIcon className="w-7 h-7 text-white" />
            </div>
            <span className="text-[7px] font-mono text-slate-400 uppercase">App</span>
          </motion.div>

          {/* Dual Stream Lines */}
          <div className="flex-1 mx-4 flex flex-col gap-3 relative">
            {/* API Stream */}
            <div className="relative h-6 flex items-center">
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-[#25D366]/30 via-brand-blue to-brand-blue/30" />
              <motion.div
                className="absolute"
                animate={{ x: [0, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <CloudLightning className="w-3 h-3 text-brand-blue" />
              </motion.div>
              <span className="absolute right-0 text-[5px] font-mono text-brand-blue uppercase">API</span>
            </div>

            {/* Hub Node */}
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-slate-900 border-2 border-brand-cyan rounded-full flex items-center justify-center shadow-glow-cyan">
                <WhatsAppIcon className="w-4 h-4 text-brand-cyan" />
              </div>
            </div>

            {/* Personal Stream */}
            <div className="relative h-6 flex items-center">
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-brand-blue/30 via-[#25D366] to-[#25D366]/30" />
              <motion.div
                className="absolute right-0"
                animate={{ x: [0, -100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Smartphone className="w-3 h-3 text-[#25D366]" />
              </motion.div>
              <span className="absolute left-0 text-[5px] font-mono text-[#25D366] uppercase">Personal</span>
            </div>
          </div>

          {/* Server/API Side */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-xl bg-brand-blue flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <Server className="w-7 h-7 text-white" />
            </div>
            <span className="text-[7px] font-mono text-slate-400 uppercase">API</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom: Status */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
        <span className="text-[7px] font-mono text-brand-green uppercase font-bold">Dual-Channel Active</span>
      </div>
    </div>
  )
}

export default CoexistenceDualChannelAnimation
