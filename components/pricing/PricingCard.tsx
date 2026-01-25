import React from 'react'
import { Check, X, Zap, Building2, Rocket } from 'lucide-react'
import { Button } from '../ui/Button'

export interface PricingPlan {
  name: string
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
}

const iconMap = {
  starter: Zap,
  growth: Rocket,
  enterprise: Building2,
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isAnnual }) => {
  const Icon = iconMap[plan.icon]
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
  const isPopular = plan.popular
  const isEnterprise = plan.enterprise

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300 ${
        isPopular
          ? 'bg-gradient-to-b from-brand-blue/10 to-brand-card border-brand-blue/50 shadow-[0_0_40px_rgba(37,99,235,0.15)]'
          : 'bg-brand-card border-slate-700 hover:border-slate-600'
      }`}
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

          <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{plan.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-8">
          {isEnterprise ? (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">Custom</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-lg text-slate-500">{plan.currency}</span>
              <span className="text-5xl font-extrabold text-white tracking-tight">{price}</span>
              <span className="text-slate-500 text-sm">/user/mo</span>
            </div>
          )}
          {isAnnual && !isEnterprise && (
            <p className="text-xs text-brand-green mt-2 font-medium">
              Billed annually ({plan.currency}{price * 12}/user/year)
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
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  <Check size={12} strokeWidth={3} />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-800 text-slate-600">
                  <X size={12} strokeWidth={3} />
                </div>
              )}
              <span className={`text-sm ${
                feature.included
                  ? feature.highlight
                    ? 'text-white font-medium'
                    : 'text-slate-300'
                  : 'text-slate-600 line-through'
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
