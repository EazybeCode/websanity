import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Ban, MessageSquareOff, Clock } from 'lucide-react'

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412z"/>
  </svg>
)

const BroadcastProblemAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsError(true)
          setTimeout(() => {
            setProgress(0)
            setIsError(false)
          }, 2000)
          return 100
        }
        return prev + 2
      })
    }, 80)

    return () => clearInterval(timer)
  }, [])

  const issues = [
    { label: 'Recipient #257', status: 'Failed', icon: MessageSquareOff },
    { label: 'Sending Speed', status: 'Throttled', icon: Clock },
    { label: 'Account Status', status: 'High Risk', icon: Ban },
  ]

  return (
    <div className="w-full aspect-[4/3] bg-brand-card rounded-2xl border border-brand-border shadow-lg overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="p-2.5 bg-brand-surface border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center opacity-50">
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase">Broadcast List</span>
        </div>
        <div className={`px-2 py-0.5 rounded text-[6px] font-mono font-bold uppercase ${isError ? 'bg-brand-orange/20 border border-brand-orange/30 text-brand-orange' : 'bg-slate-800 border border-slate-700 text-slate-400'}`}>
          {isError ? 'Blocked' : 'Broadcasting...'}
        </div>
      </div>

      {/* Progress section */}
      <div className="p-3 space-y-3 flex-1">
        <div className="space-y-1">
          <div className="flex justify-between text-[6px] font-mono text-slate-500">
            <span>Progress</span>
            <span>{Math.floor((progress / 100) * 256)} / 256 Limit</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className={`h-full ${isError ? 'bg-brand-orange' : 'bg-brand-blue'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Issues list */}
        <div className="space-y-1.5">
          {issues.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                className={`p-2 rounded-lg border flex items-center justify-between transition-all ${isError ? 'border-brand-orange/30 bg-brand-orange/5' : 'border-slate-800 bg-slate-900/50 opacity-40'}`}
                animate={{ opacity: isError ? 1 : 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3 h-3 ${isError ? 'text-brand-orange' : 'text-slate-600'}`} />
                  <span className="text-[7px] font-bold text-slate-300">{item.label}</span>
                </div>
                <span className={`text-[6px] font-mono font-bold uppercase ${isError ? 'text-brand-orange' : 'text-slate-600'}`}>
                  {item.status}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Error overlay */}
      {isError && (
        <motion.div
          className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center space-y-2">
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange/20 border border-brand-orange"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <AlertCircle className="w-6 h-6 text-brand-orange" />
            </motion.div>
            <div>
              <div className="text-sm font-bold text-white">Broadcast Blocked</div>
              <div className="text-[8px] text-slate-400 max-w-[160px] mt-1">WhatsApp limits reached. High ban risk.</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <div className="p-2 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
        <AlertCircle className="w-3 h-3 text-brand-orange" />
        <span className="text-[7px] font-mono text-slate-400 uppercase">256 Contact Limit</span>
      </div>
    </div>
  )
}

export default BroadcastProblemAnimation
