import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, MessageSquare, Clock, CheckCircle2 } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const crms = [
  { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256' },
  { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256' },
]

const triggers = [
  { event: 'New Lead', template: 'Welcome Message', delay: '0s' },
  { event: 'Cart Abandoned', template: 'Recovery Offer', delay: '1h' },
  { event: 'Order Shipped', template: 'Tracking Update', delay: '0s' },
]

const TemplatesAutomationAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-orange" />
          <span className="text-[8px] font-mono text-slate-400 uppercase">Automation Triggers</span>
        </div>
        <div className="flex items-center gap-1.5">
          {crms.map((crm, i) => (
            <motion.div
              key={crm.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-5 h-5 rounded bg-brand-black/40 border border-brand-border flex items-center justify-center"
            >
              <img src={crm.logo} alt={crm.name} className="w-3.5 h-3.5 rounded object-contain" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Automation flow */}
      <div className="flex-1 p-3 space-y-2">
        {triggers.map((trigger, i) => (
          <motion.div
            key={trigger.event}
            className="bg-brand-black/40 border border-brand-border rounded-lg p-2 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25 }}
          >
            {/* CRM Trigger */}
            <div className="flex items-center gap-1.5 bg-brand-surface px-2 py-1 rounded border border-brand-border">
              <img src={crms[0].logo} alt="CRM" className="w-3 h-3 rounded" />
              <span className="text-[6px] font-bold text-white">{trigger.event}</span>
            </div>

            {/* Arrow with delay */}
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              >
                <ArrowRight className="w-3 h-3 text-brand-cyan" />
              </motion.div>
              {trigger.delay !== '0s' && (
                <div className="flex items-center gap-0.5 bg-brand-orange/20 px-1 py-0.5 rounded">
                  <Clock className="w-2 h-2 text-brand-orange" />
                  <span className="text-[5px] font-mono text-brand-orange">{trigger.delay}</span>
                </div>
              )}
            </div>

            {/* WhatsApp Template */}
            <div className="flex-1 flex items-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/30 px-2 py-1 rounded">
              <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
              <span className="text-[6px] font-bold text-white">{trigger.template}</span>
            </div>

            {/* Status */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 + i * 0.2 }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
            </motion.div>
          </motion.div>
        ))}

        {/* Live activity indicator */}
        <motion.div
          className="mt-3 bg-brand-surface border border-brand-border rounded-lg p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3 text-brand-cyan" />
              <span className="text-[7px] font-bold text-white">Live Activity</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              <span className="text-[6px] font-mono text-brand-green">RUNNING</span>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { label: 'Sent Today', value: '2,847' },
              { label: 'Success Rate', value: '99.2%' },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 bg-brand-black/40 rounded p-1.5 text-center">
                <div className="text-[10px] font-bold text-white">{stat.value}</div>
                <div className="text-[5px] text-slate-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <Zap className="w-3 h-3 text-brand-orange" />
        <span className="text-[7px] font-mono text-slate-400 uppercase">CRM-Triggered WhatsApp Automation</span>
      </div>
    </div>
  )
}

export default TemplatesAutomationAnimation
