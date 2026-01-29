import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Flame, Ghost, Clock, MoreHorizontal } from 'lucide-react'

const CATEGORIES = [
  { id: 'hot', label: 'Hot', icon: Flame, color: 'text-brand-orange', bgColor: 'bg-brand-orange/10', borderColor: 'border-brand-orange/30' },
  { id: 'unreplied', label: 'Unreplied', icon: Clock, color: 'text-brand-cyan', bgColor: 'bg-brand-cyan/10', borderColor: 'border-brand-cyan/30' },
  { id: 'stalled', label: 'Stalled', icon: AlertCircle, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' },
  { id: 'ghosted', label: 'Ghost', icon: Ghost, color: 'text-slate-500', bgColor: 'bg-slate-500/10', borderColor: 'border-slate-500/30' },
]

const CHATS: Record<string, { id: number; name: string; msg: string; time: string }[]> = {
  hot: [
    { id: 1, name: 'Alice Chen', msg: 'Ready to sign the $15k deal.', time: '2m ago' },
    { id: 2, name: 'Nexa Corp', msg: 'Requested pricing for 50 seats.', time: '5m ago' },
  ],
  unreplied: [
    { id: 3, name: 'Bob Smith', msg: 'Ping? Still waiting for the link.', time: '1h ago' },
  ],
  stalled: [
    { id: 5, name: 'Charlie Day', msg: 'Contract stuck in legal.', time: '12h ago' },
  ],
  ghosted: [
    { id: 4, name: 'Sarah J.', msg: 'Has not responded in 3 days.', time: '3d ago' },
  ],
}

const HomeRevenueInboxAnimation: React.FC = () => {
  const [activeType, setActiveType] = useState('hot')

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveType(prev => {
        const currentIndex = CATEGORIES.findIndex(c => c.id === prev)
        return CATEGORIES[(currentIndex + 1) % CATEGORIES.length].id
      })
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const currentCat = CATEGORIES.find(c => c.id === activeType)!

  return (
    <div className={`w-full aspect-[4/3] bg-brand-black border ${currentCat.borderColor} rounded-2xl overflow-hidden transition-colors duration-500 shadow-lg`}>
      {/* Header / Tabs */}
      <div className="bg-brand-surface border-b border-brand-border p-2 flex items-center justify-between">
        <div className="flex gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveType(cat.id)}
              className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold uppercase tracking-tight transition-all flex items-center gap-1 ${
                activeType === cat.id
                  ? `${cat.bgColor} ${cat.color}`
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <cat.icon className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
        <MoreHorizontal className="w-3 h-3 text-slate-600" />
      </div>

      {/* Message List */}
      <div className="p-2 space-y-1 bg-slate-900/40 min-h-[180px]">
        <div className="px-2 py-1.5 flex items-center justify-between">
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Priority Feed</span>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-brand-green animate-pulse" />
            <span className="text-[7px] font-mono text-brand-green uppercase">Live Sync</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-1"
          >
            {(CHATS[activeType] || []).map(chat => (
              <div
                key={chat.id}
                className="group flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-brand-border transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${chat.name}/40/40`} alt="" className="opacity-80" />
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-brand-black ${currentCat.color.replace('text-', 'bg-')}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-bold text-white truncate">{chat.name}</span>
                    <span className="text-[8px] font-mono text-slate-500">{chat.time}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 truncate pr-4">
                    {chat.msg}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-2 bg-brand-black/60 border-t border-brand-border flex items-center justify-between">
        <div className="text-[7px] font-mono text-slate-600 uppercase">
          Signal: <span className={currentCat.color}>{activeType}</span> detected
        </div>
        <button className="text-[8px] font-bold text-brand-blue uppercase hover:underline">
          View All
        </button>
      </div>
    </div>
  )
}

export default HomeRevenueInboxAnimation
