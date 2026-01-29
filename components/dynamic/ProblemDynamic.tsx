import React from 'react'
import { useTranslation } from 'react-i18next'
import { EyeOff, Clock, UserX, LogOut, AlertTriangle, XCircle } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'
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

const defaultIcons = ['eye-off', 'clock', 'user-x', 'log-out']

export const ProblemDynamic: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation()

  // Use translations with Sanity data as fallback
  const badge = t('home.problem.badge', { defaultValue: data.badge || '' })
  const headline = t('home.problem.headline', { defaultValue: data.headline || '' })
  const subheadline = t('home.problem.subheadline', { defaultValue: data.subheadline || '' })

  // Get translated cards or use Sanity data
  const translatedCards = t('home.problem.cards', { returnObjects: true }) as Array<{ title: string; description: string }> | string
  const cards = Array.isArray(translatedCards)
    ? translatedCards.map((card, i) => ({
        ...card,
        icon: data.problems?.[i]?.icon || defaultIcons[i] || 'eye-off'
      }))
    : data.problems || []

  return (
    <section className="py-24 bg-brand-black text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          {badge && (
            <div className="mb-6">
              <SectionBadge variant="cyan">{badge}</SectionBadge>
            </div>
          )}
          {headline && (
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
              {headline.split(' ').map((word, i, arr) => {
                // Make last two words gray for visual effect
                if (i >= arr.length - 2) {
                  return <span key={i} className="text-slate-400">{word} </span>
                }
                return word + ' '
              })}
            </h2>
          )}
          {subheadline && (
            <p className="text-xl text-slate-400 font-normal leading-relaxed">
              {subheadline}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = iconMap[card.icon] || EyeOff
            return (
              <div
                key={idx}
                className="bg-brand-card border border-slate-700 p-8 rounded-2xl hover:border-slate-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner border border-slate-700">
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-sans font-bold text-white mb-4">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
