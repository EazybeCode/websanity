import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Clock, AlertCircle, CheckCircle2, Inbox } from 'lucide-react'

const HomeRevenueInboxAnimation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const labels = [
    { label: 'Unreplied', icon: MessageSquare, color: 'blue' },
    { label: 'Followup Missed', icon: Clock, color: 'orange' },
    { label: 'New Leads', icon: AlertCircle, color: 'blue' },
    { label: 'Closed', icon: CheckCircle2, color: 'green' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % labels.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const getColors = (type: string) => {
    switch (type) {
      case 'orange': return { bg: 'bg-orange-50', border: 'border-orange-200/30', text: 'text-orange-500' }
      case 'green': return { bg: 'bg-green-50', border: 'border-green-200/30', text: 'text-emerald-500' }
      default: return { bg: 'bg-blue-50', border: 'border-blue-200/30', text: 'text-blue-600' }
    }
  }

  const activeLabel = labels[activeIndex]
  const activeColors = getColors(activeLabel.color)

  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="h-10 border-b border-slate-100 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
            <Inbox size={12} className="text-slate-800" />
          </div>
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.15em] text-slate-900">Unified Labels</span>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-mono text-[6px] font-bold uppercase tracking-widest text-slate-400">Live</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-28 border-r border-slate-100 p-2 space-y-1.5 bg-slate-50/30 shrink-0">
          {labels.map((item, i) => {
            const itemColors = getColors(item.color)
            const isActive = i === activeIndex
            return (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: isActive ? undefined : 'rgba(255,255,255,0)',
                }}
                className={`p-2 rounded-lg flex items-center gap-2 border transition-all ${
                  isActive ? `${itemColors.bg} ${itemColors.border} shadow-sm` : 'bg-white border-slate-100'
                }`}
              >
                <item.icon size={12} className={isActive ? itemColors.text : 'text-slate-300'} />
                <span className={`text-[6px] font-bold uppercase tracking-tight ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Main List */}
        <div className="flex-1 p-3 space-y-2 overflow-hidden bg-slate-50/10">
          {['JS', 'AM', 'KL'].map((initials, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-[7px]">
                    {initials}
                  </div>
                  <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`${activeColors.bg} border ${activeColors.border} px-1.5 py-0.5 rounded-md`}
                  >
                    <span className={`text-[6px] font-bold uppercase tracking-widest ${activeColors.text}`}>
                      {activeLabel.label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-slate-50 rounded-full"><div className="h-full w-[80%] bg-slate-100 rounded-full"></div></div>
                <div className="h-1 w-[75%] bg-slate-50 rounded-full"><div className="h-full w-[60%] bg-slate-100 rounded-full"></div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeRevenueInboxAnimation
