import React from 'react'
import { motion } from 'framer-motion'

const HomeAnalyticsAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/10 blur-2xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">Team Response Latency (24h)</h4>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-[7px] font-mono text-brand-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> TARGET
          </div>
          <div className="flex items-center gap-1 text-[7px] font-mono text-brand-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> ACTUAL
          </div>
        </div>
      </div>

      <div className="h-[120px] flex items-end justify-between gap-2 relative mb-4">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-px bg-slate-400" />)}
        </div>

        {[50, 80, 45, 90, 30, 70, 40, 60].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col gap-0.5 items-center justify-end h-full group">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.1, duration: 1, ease: 'easeOut' }}
              className="w-full bg-brand-blue/20 border-t-2 border-brand-blue group-hover:bg-brand-blue/40 transition-all rounded-t-sm"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height * 0.6}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: 'easeOut' }}
              className="w-full bg-brand-orange/20 border-t-2 border-brand-orange rounded-t-sm"
            />
            <span className="font-mono text-[6px] text-slate-500 mt-1">REP {i + 1}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[8px] font-mono text-slate-500 uppercase mb-0.5">Top Performer</div>
          <div className="text-slate-800 font-bold text-[11px]">Sarah K.</div>
          <div className="text-brand-green text-[9px] font-bold">3m Response Avg</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[8px] font-mono text-slate-500 uppercase mb-0.5">Need Attention</div>
          <div className="text-slate-800 font-bold text-[11px]">Mike J.</div>
          <div className="text-brand-orange text-[9px] font-bold">14m Response Avg</div>
        </div>
      </div>
    </div>
  )
}

export default HomeAnalyticsAnimation
