import React from 'react'
import { Lock, FileCheck, CheckCircle2, Shield } from 'lucide-react'
import type { SecuritySection } from '../../hooks/useLandingPage'

interface Props {
  data: SecuritySection
}

const iconMap: Record<string, React.FC<{ size?: number; strokeWidth?: number; className?: string }>> = {
  'lock': Lock,
  'file-check': FileCheck,
  'check-circle': CheckCircle2,
  'shield': Shield,
}

export const SecurityDynamic: React.FC<Props> = ({ data }) => {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data.badge && (
          <span className="inline-block font-mono text-xs font-bold text-brand-blue uppercase tracking-widest px-3 py-1 rounded-btn border text-brand-blue bg-blue-50 border-blue-100 mb-8">
            {data.badge}
          </span>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {data.badges?.map((badge, idx) => {
            const isMeta = badge.icon === 'meta'
            const IconComponent = iconMap[badge.icon]

            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all group ${
                  badge.featured
                    ? 'relative bg-white border-2 border-blue-100 shadow-lg shadow-blue-50/50 hover:-translate-y-1'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                {badge.featured && (
                  <div className="absolute top-0 right-0 p-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}

                <div
                  className={`w-12 h-12 mb-4 flex items-center justify-center rounded-full ${
                    badge.featured
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-white shadow-sm border border-slate-100 text-slate-600 group-hover:text-blue-600'
                  } transition-colors`}
                >
                  {isMeta ? (
                    <img src="https://cdn.simpleicons.org/meta/0064e0" alt="Meta" className="w-7 h-7" />
                  ) : IconComponent ? (
                    <IconComponent size={badge.featured ? 28 : 24} strokeWidth={2} />
                  ) : (
                    <Shield size={24} strokeWidth={2} />
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-1">{badge.title}</h3>
                {badge.subtitle && <p className="text-xs text-slate-500 font-medium">{badge.subtitle}</p>}

                {badge.badge && (
                  <div className="mt-4 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-100 flex items-center gap-1">
                    <CheckCircle2 size={10} /> {badge.badge}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {data.footnote && (
          <p className="mt-12 text-slate-500 max-w-2xl mx-auto font-medium text-sm">{data.footnote}</p>
        )}
      </div>
    </section>
  )
}
