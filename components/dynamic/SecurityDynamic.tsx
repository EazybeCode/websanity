import React from 'react'
import { Lock, FileCheck, CheckCircle2, Shield } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'
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

// Custom SVG for GDPR (EU Stars + Shield)
const GdprBadge = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="url(#gdpr-gradient)" opacity="0.1" />
    <path d="M40 16C52 16 62 24 62 40C62 56 40 68 40 68C40 68 18 56 18 40C18 24 28 16 40 16Z" fill="#1E293B" stroke="#334155" strokeWidth="2"/>
    <circle cx="40" cy="28" r="1.5" fill="#FBBF24" />
    <circle cx="48" cy="31" r="1.5" fill="#FBBF24" />
    <circle cx="52" cy="40" r="1.5" fill="#FBBF24" />
    <circle cx="48" cy="49" r="1.5" fill="#FBBF24" />
    <circle cx="40" cy="52" r="1.5" fill="#FBBF24" />
    <circle cx="32" cy="49" r="1.5" fill="#FBBF24" />
    <circle cx="28" cy="40" r="1.5" fill="#FBBF24" />
    <circle cx="32" cy="31" r="1.5" fill="#FBBF24" />
    <path d="M32 40L37 45L48 34" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <radialGradient id="gdpr-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 40) rotate(90) scale(40)">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#10B981" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
)

// Custom SVG for SSL (Lock + Tech Nodes)
const SslBadge = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="url(#ssl-gradient)" opacity="0.1" />
    <rect x="26" y="34" width="28" height="22" rx="4" fill="#1E293B" stroke="#06B6D4" strokeWidth="2"/>
    <path d="M32 34V26C32 21.5817 35.5817 18 40 18C44.4183 18 48 21.5817 48 26V34" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="40" cy="43" r="2" fill="#06B6D4"/>
    <path d="M40 45V49" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="40" r="2" fill="#334155" />
    <circle cx="60" cy="40" r="2" fill="#334155" />
    <line x1="22" y1="40" x2="26" y2="40" stroke="#334155" strokeWidth="1" />
    <line x1="54" y1="40" x2="58" y2="40" stroke="#334155" strokeWidth="1" />
    <defs>
      <radialGradient id="ssl-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 40) rotate(90) scale(40)">
        <stop stopColor="#06B6D4"/>
        <stop offset="1" stopColor="#06B6D4" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
)

export const SecurityDynamic: React.FC<Props> = ({ data }) => {
  return (
    <section className="py-24 bg-brand-black border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {data.badge && <SectionBadge variant="cyan">{data.badge}</SectionBadge>}

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {data.badges?.map((badge, idx) => {
            const isMeta = badge.icon === 'meta'
            const isGdpr = badge.icon === 'file-check'
            const isSsl = badge.icon === 'lock'
            const IconComponent = iconMap[badge.icon]

            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all group ${
                  badge.featured
                    ? 'relative bg-brand-card border-2 border-brand-blue/30 shadow-lg shadow-blue-900/10 hover:-translate-y-1'
                    : 'bg-brand-card border-slate-700 hover:border-slate-500'
                }`}
              >
                {badge.featured && (
                  <div className="absolute top-0 right-0 p-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}

                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {isMeta ? (
                    <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-200">
                      <img
                        src="https://cdn.simpleicons.org/meta/0064E0"
                        alt="Meta"
                        className="w-8 h-8"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : isGdpr ? (
                    <GdprBadge />
                  ) : isSsl ? (
                    <SslBadge />
                  ) : IconComponent ? (
                    <div className="w-16 h-16 flex items-center justify-center bg-slate-800 rounded-full border border-slate-700">
                      <IconComponent size={badge.featured ? 28 : 24} strokeWidth={2} className="text-slate-400" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-slate-800 rounded-full border border-slate-700">
                      <Shield size={24} strokeWidth={2} className="text-slate-400" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-white text-lg mb-1">{badge.title}</h3>
                {badge.subtitle && <p className="text-xs text-slate-400 font-medium">{badge.subtitle}</p>}

                {badge.badge && (
                  <div className="mt-4 px-3 py-1 bg-green-900/30 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/30 flex items-center gap-1">
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
