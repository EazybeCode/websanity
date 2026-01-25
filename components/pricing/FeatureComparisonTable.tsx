import React from 'react'
import { Check, X, Minus } from 'lucide-react'

interface FeatureRow {
  feature: string
  starter: boolean | string
  scaler: boolean | string
  omnis: boolean | string
  category?: string
}

interface FeatureComparisonTableProps {
  features: FeatureRow[]
}

const RenderValue: React.FC<{ value: boolean | string }> = ({ value }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto">
        <Check size={14} className="text-brand-green" strokeWidth={3} />
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
        <X size={14} className="text-slate-600" strokeWidth={3} />
      </div>
    )
  }

  if (value === '-') {
    return (
      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
        <Minus size={14} className="text-slate-600" strokeWidth={3} />
      </div>
    )
  }

  return <span className="text-sm text-slate-300 font-medium">{value}</span>
}

export const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({ features }) => {
  // Group features by category
  const groupedFeatures = features.reduce((acc, feature) => {
    const category = feature.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(feature)
    return acc
  }, {} as Record<string, FeatureRow[]>)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-brand-card">
      {/* Table Header */}
      <div className="grid grid-cols-4 border-b border-slate-700 bg-brand-surface">
        <div className="p-6">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
            Features
          </span>
        </div>
        <div className="p-6 text-center border-l border-slate-700">
          <span className="text-lg font-bold text-white">Starter</span>
          <p className="text-xs text-slate-500 mt-1">For individuals</p>
        </div>
        <div className="p-6 text-center border-l border-slate-700 bg-brand-blue/5">
          <span className="text-lg font-bold text-brand-blue">Scaler</span>
          <p className="text-xs text-slate-500 mt-1">Most popular</p>
        </div>
        <div className="p-6 text-center border-l border-slate-700">
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">Omnis</span>
          <p className="text-xs text-slate-500 mt-1">Full-stack RevOps</p>
        </div>
      </div>

      {/* Table Body */}
      {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
        <div key={category}>
          {/* Category Header */}
          <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-900/50">
            <div className="p-4 col-span-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-cyan">
                {category}
              </span>
            </div>
          </div>

          {/* Category Features */}
          {categoryFeatures.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-4 border-b border-slate-800 last:border-b-0 hover:bg-slate-800/30 transition-colors"
            >
              <div className="p-4 flex items-center">
                <span className="text-sm text-slate-300">{row.feature}</span>
              </div>
              <div className="p-4 flex items-center justify-center border-l border-slate-800">
                <RenderValue value={row.starter} />
              </div>
              <div className="p-4 flex items-center justify-center border-l border-slate-800 bg-brand-blue/5">
                <RenderValue value={row.scaler} />
              </div>
              <div className="p-4 flex items-center justify-center border-l border-slate-800">
                <RenderValue value={row.omnis} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
