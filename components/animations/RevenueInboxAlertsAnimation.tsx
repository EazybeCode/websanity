import React, { useEffect, useRef, useState } from 'react'
import { TrendingDown, Zap, Target } from 'lucide-react'

const AlertNotification = ({ title, deal, time, desc, type, icon, isActive, delay }: {
  title: string
  deal: string
  time: string
  desc: string
  type: 'danger' | 'warning' | 'success'
  icon: React.ReactNode
  isActive: boolean
  delay: string
}) => {
  const styles = {
    danger: {
      accent: 'text-brand-orange',
      iconBg: 'bg-brand-orange/10',
      bar: 'bg-brand-orange'
    },
    warning: {
      accent: 'text-brand-cyan',
      iconBg: 'bg-brand-cyan/10',
      bar: 'bg-brand-cyan'
    },
    success: {
      accent: 'text-brand-green',
      iconBg: 'bg-brand-green/10',
      bar: 'bg-brand-green'
    }
  }

  const s = styles[type]

  return (
    <div className={`p-4 rounded-xl border bg-white shadow-sm relative overflow-hidden transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'} ${delay}`}>
      {/* Left color bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${s.bar}`}></div>

      <div className="flex justify-between items-start mb-2 pl-2">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded flex items-center justify-center ${s.iconBg} ${s.accent}`}>
            {icon}
          </div>
          <span className={`font-mono text-[8px] uppercase font-black tracking-widest ${s.accent}`}>{title}</span>
        </div>
        <span className="font-mono text-[7px] text-slate-400 font-bold">{time}</span>
      </div>

      <div className="pl-2">
        <h4 className="text-slate-900 font-black text-sm mb-0.5">{deal}</h4>
        <p className="text-[10px] text-slate-500 leading-snug font-medium pr-4">{desc}</p>

        <div className="mt-2 pt-2 border-t border-slate-100 flex gap-1.5">
          <div className="px-1.5 py-0.5 rounded bg-slate-100 text-[7px] font-mono font-bold text-slate-500 uppercase">Manager Alert</div>
          <div className="px-1.5 py-0.5 rounded bg-slate-100 text-[7px] font-mono font-bold text-slate-500 uppercase">CRM Sync</div>
        </div>
      </div>
    </div>
  )
}

const RevenueInboxAlertsAnimation: React.FC = () => {
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
    <div ref={ref} className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-3 flex flex-col justify-center">
      <div className="relative space-y-3">
        {/* Subtle left accent line */}
        <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-[2px] h-2/3 bg-gradient-to-b from-transparent via-brand-cyan to-transparent transition-all duration-1000 delay-500 ${isActive ? 'opacity-40' : 'opacity-0'}`}></div>

        <AlertNotification
          title="Engagement Drop"
          deal="Pied Piper"
          time="JUST NOW"
          desc="Response time increased from 4h to 48h. High risk of stalling."
          type="danger"
          icon={<TrendingDown size={11} />}
          isActive={isActive}
          delay="delay-[600ms]"
        />
        <AlertNotification
          title="Ghosting Warning"
          deal="Hooli"
          time="4H AGO"
          desc="Customer hasn't replied to last 3 messages over 10 days."
          type="warning"
          icon={<Zap size={11} />}
          isActive={isActive}
          delay="delay-[800ms]"
        />
        <AlertNotification
          title="Hot Opportunity"
          deal="Aviato"
          time="8H AGO"
          desc="Conversation frequency increased by 300%. Ready for closing."
          type="success"
          icon={<Target size={11} />}
          isActive={isActive}
          delay="delay-[1000ms]"
        />
      </div>
    </div>
  )
}

export default RevenueInboxAlertsAnimation
