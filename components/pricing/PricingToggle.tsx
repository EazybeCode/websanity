import React from 'react'

interface PricingToggleProps {
  isAnnual: boolean
  onToggle: (isAnnual: boolean) => void
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ isAnnual, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className={`text-sm font-semibold transition-colors cursor-pointer ${
          !isAnnual ? 'text-white' : 'text-slate-500 hover:text-slate-400'
        }`}
        onClick={() => onToggle(false)}
      >
        Monthly
      </span>

      <button
        onClick={() => onToggle(!isAnnual)}
        className="relative w-16 h-8 rounded-full bg-brand-surface border border-slate-700 transition-colors hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-black"
        aria-label="Toggle billing period"
      >
        <span
          className={`absolute top-1 w-6 h-6 rounded-full bg-brand-blue shadow-glow-blue transition-all duration-300 ${
            isAnnual ? 'left-9' : 'left-1'
          }`}
        />
      </button>

      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-semibold transition-colors cursor-pointer ${
            isAnnual ? 'text-white' : 'text-slate-500 hover:text-slate-400'
          }`}
          onClick={() => onToggle(true)}
        >
          Annual
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-green/10 text-brand-green border border-green-500/20">
          Save 20%
        </span>
      </div>
    </div>
  )
}
