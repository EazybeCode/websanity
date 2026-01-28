import React, { useEffect, useRef, useState } from 'react'
import { Cpu, TrendingUp } from 'lucide-react'

const MetricBox = ({ label, value, trend, isActive, delay }: {
  label: string
  value: string
  trend: string
  isActive: boolean
  delay: string
}) => (
  <div className={`p-3 bg-slate-50 rounded-xl border border-slate-100 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${delay}`}>
    <div className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-base font-bold text-slate-900">{value}</div>
    <div className="text-[8px] font-mono text-brand-green font-bold">{trend}</div>
  </div>
)

const RevenueInboxScoringAnimation: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsActive(true)
    }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3">
      <div className={`relative bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="bg-slate-900 p-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Cpu size={12} className="text-brand-cyan" />
            <span className="font-mono text-[8px] font-bold text-white uppercase tracking-widest">Neural Analysis Engine</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan text-[7px] font-mono">v4.0.2</div>
        </div>

        {/* Content */}
        <div className="p-5 bg-white flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-3 mb-5">
            <MetricBox label="Avg Response" value="1.2h" trend="+12%" isActive={isActive} delay="delay-[400ms]" />
            <MetricBox label="Sentiment" value="Positive" trend="Steady" isActive={isActive} delay="delay-[500ms]" />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Calculated Health</div>
                  <div className="text-3xl font-sans font-black text-slate-900 leading-none">94<span className="text-sm text-slate-400 font-bold">/100</span></div>
                </div>
                <div className="text-right">
                  <TrendingUp size={16} className="text-brand-green ml-auto mb-1" />
                  <div className="text-[8px] font-mono text-brand-green font-bold">OPTIMAL</div>
                </div>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-brand-blue shadow-glow-blue transition-all duration-[1.5s] ease-out rounded-full"
                  style={{
                    width: isActive ? '94%' : '0%',
                    transitionDelay: '800ms'
                  }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 mt-4">
              {[82, 91, 94].map((v, i) => (
                <div key={i} className={`h-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${1000 + i * 150}ms` }}>
                  <div className="text-[9px] font-mono font-bold text-slate-400">W{i + 1}: {v}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueInboxScoringAnimation
