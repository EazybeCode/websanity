import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, BarChart3, Clock, CheckCircle2 } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const campaigns = [
  { name: 'Flash Sale', audience: '10K', time: '10:00 AM', status: 'scheduled' },
  { name: 'Weekly Newsletter', audience: '25K', time: '2:00 PM', status: 'scheduled' },
  { name: 'Product Launch', audience: '50K', time: '6:00 PM', status: 'pending' },
]

const BroadcastAutomationAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-blue" />
          <span className="text-[8px] font-mono text-slate-400 uppercase">Campaign Scheduler</span>
        </div>
        <div className="flex items-center gap-1.5 bg-brand-green/10 px-2 py-0.5 rounded border border-brand-green/30">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          <span className="text-[6px] font-mono font-bold text-brand-green uppercase">3 Active</span>
        </div>
      </div>

      {/* Campaign list */}
      <div className="flex-1 p-3 space-y-2">
        {campaigns.map((campaign, i) => (
          <motion.div
            key={campaign.name}
            className="bg-brand-black/40 border border-brand-border rounded-lg p-2 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            {/* WhatsApp icon */}
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center">
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            </div>

            {/* Campaign info */}
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-bold text-white truncate">{campaign.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-0.5">
                  <Users className="w-2 h-2 text-slate-500" />
                  <span className="text-[6px] text-slate-500">{campaign.audience}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Clock className="w-2 h-2 text-slate-500" />
                  <span className="text-[6px] text-slate-500">{campaign.time}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <motion.div
              className={`px-2 py-0.5 rounded text-[5px] font-mono font-bold uppercase ${
                campaign.status === 'scheduled'
                  ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              animate={campaign.status === 'scheduled' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {campaign.status}
            </motion.div>
          </motion.div>
        ))}

        {/* Analytics preview */}
        <motion.div
          className="mt-3 bg-brand-surface border border-brand-border rounded-lg p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3 text-brand-cyan" />
              <span className="text-[7px] font-bold text-white">Campaign Analytics</span>
            </div>
            <CheckCircle2 className="w-3 h-3 text-brand-green" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Reach', value: '85K' },
              { label: 'Opened', value: '72%' },
              { label: 'Replied', value: '18%' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-brand-black/40 rounded p-1.5 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <div className="text-[10px] font-bold text-white">{stat.value}</div>
                <div className="text-[5px] text-slate-500 uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <Calendar className="w-3 h-3 text-brand-blue" />
        <span className="text-[7px] font-mono text-slate-400 uppercase">Schedule & Automate Broadcasts</span>
      </div>
    </div>
  )
}

export default BroadcastAutomationAnimation
