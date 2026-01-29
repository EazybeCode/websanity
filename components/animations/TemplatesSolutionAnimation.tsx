import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Zap, Shield } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const templates = [
  { name: 'Welcome', icon: '👋', status: 'approved' },
  { name: 'Order Update', icon: '📦', status: 'approved' },
  { name: 'Appointment', icon: '📅', status: 'approved' },
]

const TemplatesSolutionAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#25D366] flex items-center justify-center">
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase">Message Templates</span>
        </div>
        <div className="flex items-center gap-1.5 bg-brand-green/10 border border-brand-green/30 px-2 py-1 rounded-full">
          <Shield className="w-2.5 h-2.5 text-brand-green" />
          <span className="text-[7px] font-mono text-brand-green uppercase font-bold">Approved</span>
        </div>
      </div>

      {/* Template list */}
      <div className="flex-1 p-3 space-y-2">
        {templates.map((template, i) => (
          <motion.div
            key={template.name}
            className="bg-brand-black/40 border border-brand-border rounded-lg p-2 flex items-center justify-between group hover:border-brand-cyan/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-surface flex items-center justify-center text-sm">
                {template.icon}
              </div>
              <div>
                <div className="text-[8px] font-bold text-white">{template.name}</div>
                <div className="text-[6px] text-slate-500">Pre-approved template</div>
              </div>
            </div>
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle2 className="w-3 h-3 text-brand-green" />
              <span className="text-[6px] font-mono text-brand-green uppercase">Ready</span>
            </motion.div>
          </motion.div>
        ))}

        {/* One-click send visualization */}
        <motion.div
          className="mt-3 bg-brand-blue/10 border border-brand-blue/30 rounded-lg p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-brand-blue" />
              <span className="text-[7px] font-bold text-white">One-Click Send</span>
            </div>
            <motion.div
              className="bg-brand-blue px-2 py-0.5 rounded text-[6px] text-white font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              SEND
            </motion.div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-1 bg-brand-blue/30 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-brand-blue"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
          <div className="text-[5px] text-slate-500 mt-1 text-center">Sending to 1,000+ contacts...</div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <FileText className="w-3 h-3 text-brand-cyan" />
        <span className="text-[7px] font-mono text-slate-400 uppercase">Meta-Approved Templates</span>
      </div>
    </div>
  )
}

export default TemplatesSolutionAnimation
