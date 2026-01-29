import React from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle2 } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const CoexistenceBulkSafeAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header with WhatsApp icon */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
            <WhatsAppIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[8px] font-bold text-white">WhatsApp Business API</div>
            <div className="text-[6px] font-mono text-brand-green uppercase">Official Meta Partner</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-brand-green/10 border border-brand-green/30 px-2 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
          <span className="text-[7px] font-mono text-brand-green uppercase font-bold">Protected</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 flex flex-col justify-center items-center relative">
        {/* High Volume Stream */}
        <div className="flex gap-1.5 mb-4 h-12 items-end">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 bg-brand-blue/20 border-t-2 border-brand-blue rounded-t"
              animate={{
                height: [20, 45, 30, 40, 20],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + (i * 0.2),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* The Shield (Meta API) */}
        <div className="relative z-10 w-full max-w-[280px]">
          <div className="absolute -inset-4 bg-brand-blue/5 blur-2xl rounded-full"></div>
          <div className="relative p-3 bg-slate-900 border border-brand-blue/30 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-blue/10 rounded-lg">
                  <Shield className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[9px]">META OFFICIAL API</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-brand-green animate-pulse"></div>
                    <span className="font-mono text-[6px] text-brand-green uppercase">Broadcast Secure</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-white tracking-tighter">10k+</div>
                <div className="font-mono text-[5px] text-slate-500">MSGS / MIN</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[6px] text-slate-500">
                <span>CAPACITY</span>
                <span className="text-brand-blue">88%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-blue shadow-glow-blue"
                  animate={{ width: ["0%", "88%", "82%", "88%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Success indicators */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="flex items-center gap-1 bg-brand-green/10 border border-brand-green/20 px-1.5 py-0.5 rounded text-[5px] font-mono text-brand-green"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <CheckCircle2 className="w-2 h-2" /> SENT
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <Shield className="w-3 h-3 text-brand-blue" />
        <span className="text-[7px] font-mono text-slate-400 uppercase">Zero Ban Risk Broadcasting</span>
      </div>
    </div>
  )
}

export default CoexistenceBulkSafeAnimation
