import React from 'react'
import { motion } from 'framer-motion'

const HomeAnalyticsAnimation: React.FC = () => {
  return (
    <div className="w-full aspect-[4/3] bg-[#f3f4f6] rounded-xl overflow-hidden flex flex-col relative shadow-xl border border-slate-200 p-2.5">
      <div className="w-full h-full bg-white rounded-lg shadow-md flex flex-col overflow-hidden border border-slate-100">
        <div className="h-6 flex items-center justify-end px-3 gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
        </div>

        <div className="flex-1 p-2.5 grid grid-cols-2 grid-rows-2 gap-2.5">
          {/* Bar Chart */}
          <div className="bg-[#f9fafb] rounded-lg border border-slate-100 p-3 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[6px] font-bold text-slate-800 uppercase tracking-widest">Response_Time</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-600 animate-pulse"></div>
                <span className="font-mono text-[5px] font-bold text-blue-600 uppercase">Live</span>
              </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-0.5 px-1">
              {[30, 80, 45, 15, 65, 35].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: 0.1 * i, duration: 0.8, ease: 'easeOut' }}
                  className={`w-full rounded-sm ${i === 1 ? 'bg-orange-500' : 'bg-blue-600'}`}
                />
              ))}
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-[#f9fafb] rounded-lg border border-slate-100 p-3 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[6px] font-bold text-slate-800 uppercase tracking-widest">Volume</span>
              <span className="font-mono text-[5px] font-bold text-cyan-500 uppercase">+12.4%</span>
            </div>
            <div className="flex-1 relative">
              <svg className="w-full h-full" viewBox="0 0 100 60">
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  d="M0,45 L15,25 L35,40 L50,15 L70,35 L85,15 L100,25"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.1 }}
                  transition={{ delay: 1, duration: 1 }}
                  d="M0,45 L15,25 L35,40 L50,15 L70,35 L85,15 L100,25 V60 H0 Z"
                  fill="#06B6D4"
                />
              </svg>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-[#f9fafb] rounded-lg border border-slate-100 p-3 flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[6px] font-bold text-slate-800 uppercase tracking-widest">Eng_Mix</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <svg className="w-16 h-16" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none" stroke="#2563EB" strokeWidth="12"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  whileInView={{ strokeDashoffset: 251.2 * 0.2 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none" stroke="#06B6D4" strokeWidth="12"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  whileInView={{ strokeDashoffset: 251.2 * 0.4 }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                  strokeLinecap="round"
                  transform="rotate(0 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[9px] font-bold text-slate-800">80%</span>
              </div>
            </div>
          </div>

          {/* Activity Graph */}
          <div className="bg-[#f9fafb] rounded-lg border border-slate-100 p-3 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[6px] font-bold text-slate-800 uppercase tracking-widest">Active_Reps</span>
              <span className="font-mono text-[5px] font-bold text-emerald-500 uppercase">2,847</span>
            </div>
            <div className="flex-1 flex items-end justify-between gap-0.5 px-0.5">
              {[25, 35, 20, 55, 75, 90, 80, 85, 65, 45, 30, 15].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: 0.05 * i, duration: 0.8, ease: 'easeOut' }}
                  className={`w-full rounded-sm ${i >= 3 && i <= 8 ? 'bg-emerald-500' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="h-6 border-t border-slate-50 px-4 flex items-center">
          <span className="font-mono text-[6px] text-slate-300 font-bold uppercase tracking-[0.2em]">Team_Report_v3.0</span>
        </div>
      </div>
    </div>
  )
}

export default HomeAnalyticsAnimation
