import React from 'react'
import { EyeOff, Clock, UserX, LogOut, AlertTriangle, XCircle } from 'lucide-react'
import type { ProblemSection } from '../../hooks/useLandingPage'

interface Props {
  data: ProblemSection
}

const iconMap: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  'eye-off': EyeOff,
  'clock': Clock,
  'user-x': UserX,
  'log-out': LogOut,
  'alert-triangle': AlertTriangle,
  'x-circle': XCircle,
}

export const ProblemDynamic: React.FC<Props> = ({ data }) => {
  return (
    <section className="py-24 bg-brand-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          {data.badge && (
            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">
              {data.badge}
            </span>
          )}
          {data.headline && (
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white mb-6">
              {data.headline}
            </h2>
          )}
          {data.subheadline && (
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              {data.subheadline}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.problems?.map((card, idx) => {
            const IconComponent = iconMap[card.icon] || EyeOff
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-8 rounded-card hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center text-white mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <IconComponent size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-sans font-semibold text-white mb-4">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
