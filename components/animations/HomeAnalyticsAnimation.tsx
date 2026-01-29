import React from 'react'
import { motion } from 'framer-motion'

const HomeAnalyticsAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <h4 className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">Team Response Latency (24h)</h4>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-[7px] font-mono text-brand-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> TARGET
          </div>
          <div className="flex items-center gap-1 text-[7px] font-mono text-brand-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> ACTUAL
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-3 bg-brand-black/40 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-cyan/10 blur-2xl rounded-full pointer-events-none" />

        <div className="h-full flex items-end justify-between gap-1.5 relative z-10">
          {[50, 80, 45, 90, 30, 70, 40, 60].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col gap-0.5 items-center justify-end h-full group">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 1, ease: 'easeOut' }}
                className="w-full bg-brand-blue/30 border-t-2 border-brand-blue group-hover:bg-brand-blue/50 transition-all rounded-t-sm"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height * 0.6}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: 'easeOut' }}
                className="w-full bg-brand-orange/30 border-t-2 border-brand-orange rounded-t-sm"
              />
              <span className="font-mono text-[6px] text-slate-500 mt-1">R{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-2 bg-brand-surface border-t border-brand-border grid grid-cols-2 gap-2">
        <div className="bg-brand-black/40 p-2 rounded-lg border border-brand-border">
          <div className="text-[7px] font-mono text-slate-500 uppercase mb-0.5">Top Performer</div>
          <div className="text-white font-bold text-[10px]">Sarah K.</div>
          <div className="text-brand-green text-[8px] font-bold">3m Avg</div>
        </div>
        <div className="bg-brand-black/40 p-2 rounded-lg border border-brand-border">
          <div className="text-[7px] font-mono text-slate-500 uppercase mb-0.5">Needs Attention</div>
          <div className="text-white font-bold text-[10px]">Mike J.</div>
          <div className="text-brand-orange text-[8px] font-bold">14m Avg</div>
        </div>
      </div>
    </div>
  )
}

export default HomeAnalyticsAnimation
