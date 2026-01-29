import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Send } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const BroadcastSolutionAnimation: React.FC = () => {
  const [metrics, setMetrics] = useState({ sent: 0, delivered: 0, read: 0 })
  const [activeStream, setActiveStream] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const nextSent = prev.sent >= 5000 ? 0 : prev.sent + Math.floor(Math.random() * 50) + 20
        return {
          sent: nextSent,
          delivered: Math.floor(nextSent * 0.98),
          read: Math.floor(nextSent * 0.75),
        }
      })
      setActiveStream(prev => (prev + 1) % 5)
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#25D366] flex items-center justify-center">
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase">API Broadcast</span>
        </div>
        <div className="flex items-center gap-1.5 bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
          <Zap className="w-2.5 h-2.5 text-brand-blue" />
          <span className="text-[6px] font-mono font-bold text-brand-blue uppercase">Unlimited</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-3 flex gap-3">
        {/* Metrics column */}
        <div className="w-[40%] space-y-2">
          <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800">
            <div className="text-[6px] font-mono text-slate-500 uppercase mb-1">Sent</div>
            <div className="text-lg font-bold text-white font-mono">{metrics.sent.toLocaleString()}</div>
            <div className="mt-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div className="h-full bg-brand-cyan" style={{ width: '85%' }} />
            </div>
          </div>
          <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800">
            <div className="text-[6px] font-mono text-slate-500 uppercase mb-1">Delivered</div>
            <div className="text-lg font-bold text-brand-cyan font-mono">{metrics.delivered.toLocaleString()}</div>
          </div>
          <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800">
            <div className="text-[6px] font-mono text-slate-500 uppercase mb-1">Read Rate</div>
            <div className="text-lg font-bold text-brand-green font-mono">
              {Math.min(98, Math.floor((metrics.read / (metrics.sent || 1)) * 100))}%
            </div>
          </div>
        </div>

        {/* Stream visualizer */}
        <div className="flex-1 bg-slate-900/80 rounded-lg border border-slate-800 p-2 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[7px] font-bold text-white uppercase">Live Stream</span>
            <div className="flex gap-0.5">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-1 h-1 rounded-full ${i === activeStream % 3 ? 'bg-brand-cyan' : 'bg-slate-800'}`} />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className={`flex items-center gap-2 p-1.5 rounded transition-all ${i === activeStream ? 'bg-brand-cyan/20 border border-brand-cyan/30' : 'bg-brand-cyan/5 border border-brand-cyan/10 opacity-40'}`}
                animate={{ x: i === activeStream ? 2 : 0 }}
              >
                <CheckCircle2 className={`w-2.5 h-2.5 ${i === activeStream ? 'text-brand-cyan' : 'text-slate-600'}`} />
                <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan w-3/4 opacity-50" />
                </div>
                <span className="text-[5px] font-mono text-brand-cyan">API_SENT</span>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse shadow-glow-cyan" />
            <span className="text-[5px] font-mono font-bold text-brand-cyan">LIVE</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <Send className="w-3 h-3 text-brand-green" />
        <span className="text-[7px] font-mono text-slate-400 uppercase">No Limits via Official API</span>
      </div>
    </div>
  )
}

export default BroadcastSolutionAnimation
