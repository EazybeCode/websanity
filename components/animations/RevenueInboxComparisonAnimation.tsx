import React, { useEffect, useRef, useState } from 'react'
import { Ghost, AlertCircle } from 'lucide-react'

const DealRow = ({ name, value, status, type, isActive, delay }: {
  name: string
  value: string
  status: string
  type: 'danger' | 'success' | 'warning'
  isActive: boolean
  delay: string
}) => {
  const variants = {
    danger: 'text-brand-orange bg-brand-orange/5 border-brand-orange/20',
    success: 'text-brand-green bg-brand-green/5 border-brand-green/20',
    warning: 'text-brand-blue bg-brand-blue/5 border-brand-blue/20'
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border bg-white shadow-sm transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${delay}`}>
      <div className="flex items-center gap-3">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${type === 'danger' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-slate-100 text-slate-400'}`}>
          {type === 'danger' ? <Ghost size={14} className="animate-bounce" /> : <div className="w-2 h-2 rounded-full bg-current" />}
        </div>
        <div>
          <div className="text-[11px] font-extrabold text-slate-900">{name}</div>
          <div className="text-[8px] font-mono text-slate-400 uppercase font-bold tracking-tighter">CRM Status: "Active"</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[11px] font-bold text-slate-900">{value}</div>
        <div className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${variants[type]}`}>
          {status}
        </div>
      </div>
    </div>
  )
}

const RevenueInboxComparisonAnimation: React.FC = () => {
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
    <div ref={ref} className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Paper Mockup */}
        <div className={`relative bg-white rounded-xl shadow-md p-1 h-full transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="absolute inset-0 bg-brand-orange/10 pointer-events-none opacity-20 rounded-xl"></div>

          {/* Scan Line */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-brand-orange/20 to-transparent animate-scan z-20 pointer-events-none rounded-t-xl"></div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-orange/40 animate-scan z-20 pointer-events-none"></div>

          <div className="relative bg-slate-50 rounded-lg p-4 overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <div className="font-mono text-[9px] font-bold text-slate-400 tracking-tighter uppercase">Pipeline Audit Log</div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <DealRow name="Acme Corp" value="$45,000" status="Zombie" type="danger" isActive={isActive} delay="delay-[1000ms]" />
              <DealRow name="Global Tech" value="$28,500" status="Healthy" type="success" isActive={isActive} delay="delay-[1200ms]" />
              <DealRow name="Initech" value="$12,000" status="Zombie" type="danger" isActive={isActive} delay="delay-[1400ms]" />
              <DealRow name="Stark Ind." value="$8,200" status="Stalled" type="warning" isActive={isActive} delay="delay-[1600ms]" />
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-brand-orange uppercase">
                <span>Detection Signal: X-Ray Active</span>
                <span className="animate-pulse">Analyzing...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Accent */}
        <div className={`absolute -bottom-3 -right-2 bg-brand-orange text-white px-3 py-2 rounded-lg shadow-xl font-mono text-[8px] font-bold uppercase tracking-widest z-30 transition-all duration-1000 delay-[1800ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          4 Critical Risks Detected
        </div>
      </div>
    </div>
  )
}

export default RevenueInboxComparisonAnimation
