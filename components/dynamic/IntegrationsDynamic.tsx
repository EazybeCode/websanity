import React from 'react'
import { Webhook } from 'lucide-react'
import type { IntegrationsSection } from '../../hooks/useLandingPage'

interface Props {
  data: IntegrationsSection
}

export const IntegrationsDynamic: React.FC<Props> = ({ data }) => {
  return (
    <section className="py-24 bg-white border-y border-slate-200" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data.title && (
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-12">
            {data.title}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {data.integrations?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-40 h-32 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group p-4"
            >
              <img
                src={item.logoUrl}
                alt={`${item.name} logo`}
                className="w-12 h-12 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-bold text-slate-700">{item.name}</span>
            </div>
          ))}

          {data.showWebhooks && (
            <div className="flex flex-col items-center justify-center w-40 h-32 rounded-xl border border-slate-200 bg-slate-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group p-4">
              <div className="text-slate-400 group-hover:text-brand-blue transition-colors mb-3">
                <Webhook size={40} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold text-slate-600">Webhooks</span>
            </div>
          )}
        </div>

        {data.footnote && (
          <p className="text-xs text-slate-400 mt-12 font-medium max-w-lg mx-auto">
            {data.footnote}
          </p>
        )}
      </div>
    </section>
  )
}
