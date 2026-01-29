import React from 'react'
import { Check, X, Zap, Building2, Rocket } from 'lucide-react'
import { Button } from '../ui/Button'
import { useTheme } from '../../hooks/useTheme'

export interface PricingPlan {
  name: string
  planKey: 'starter' | 'scaler' | 'omnis'  // Internal key for API lookups (language-independent)
  description: string
  monthlyPrice: number
  annualPrice: number
  currency: string
  features: {
    text: string
    included: boolean
    highlight?: boolean
  }[]
  cta: {
    label: string
    url: string
  }
  popular?: boolean
  enterprise?: boolean
  icon: 'starter' | 'growth' | 'enterprise'
}

interface PricingCardProps {
  plan: PricingPlan
  isAnnual: boolean
  dynamicCurrency?: string
  dynamicMonthlyPrice?: number
  dynamicAnnualPrice?: number
}

const iconMap = {
  starter: Zap,
  growth: Rocket,
  enterprise: Building2,
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isAnnual,
  dynamicCurrency,
  dynamicMonthlyPrice,
  dynamicAnnualPrice,
}) => {
  const Icon = iconMap[plan.icon]
  const { isDark } = useTheme()

  // Use dynamic pricing if available, otherwise fall back to plan defaults
  const currency = dynamicCurrency || plan.currency
  const monthlyPrice = dynamicMonthlyPrice ?? plan.monthlyPrice
  const annualPrice = dynamicAnnualPrice ?? plan.annualPrice
  const price = isAnnual ? annualPrice : monthlyPrice

  const isPopular = plan.popular
  const isEnterprise = plan.enterprise

  // Light/dark mode card styles
  const cardStyles = isPopular
    ? isDark
      ? 'bg-gradient-to-b from-brand-blue/10 to-brand-card border-brand-blue/50 shadow-[0_0_40px_rgba(37,99,235,0.15)]'
      : 'bg-gradient-to-b from-brand-blue/10 to-white border-brand-blue/50 shadow-[0_0_40px_rgba(37,99,235,0.15)]'
    : isDark
      ? 'bg-brand-card border-slate-700 hover:border-slate-600'
      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300 ${cardStyles}`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-blue text-white shadow-glow-blue">
            <Zap size={12} fill="currentColor" />
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
            isPopular
              ? 'bg-brand-blue/20 text-brand-blue'
              : isEnterprise
                ? 'bg-brand-purple/20 text-brand-purple'
                : 'bg-brand-cyan/20 text-brand-cyan'
          }`}>
            <Icon size={24} />
          </div>

          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{plan.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-8">
          {isEnterprise ? (
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Custom</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className={`text-lg ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{currency}</span>
              <span className={`text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{price}</span>
              <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>/user/mo</span>
            </div>
          )}
          {isAnnual && !isEnterprise && (
            <p className="text-xs text-brand-green mt-2 font-medium">
              Billed annually ({currency} {annualPrice * 12}/user/year)
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? (
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  feature.highlight
                    ? 'bg-brand-green/20 text-brand-green'
                    : isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : (
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  <X size={12} strokeWidth={3} />
                </div>
              )}
              <span className={`text-sm ${
                feature.included
                  ? feature.highlight
                    ? isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'
                    : isDark ? 'text-slate-300' : 'text-slate-700'
                  : isDark ? 'text-slate-600 line-through' : 'text-slate-400 line-through'
              }`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={isPopular ? 'primary' : 'outline'}
          size="lg"
          className={`w-full justify-center font-bold ${
            isPopular ? 'shadow-glow-blue' : ''
          }`}
        >
          {plan.cta.label}
        </Button>
      </div>
    </div>
  )
}
