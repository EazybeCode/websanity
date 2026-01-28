import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, AlertCircle, CheckCircle2, Inbox } from 'lucide-react';

const LabelAnimation: React.FC = () => {
  const [activeLabel, setActiveLabel] = useState(0);
  const labels = [
    { name: 'UNREPLIED', icon: <MessageSquare className="w-3 h-3" />, color: 'text-brand-blue', bg: 'bg-blue-100/50' },
    { name: 'FOLLOWUP MISSED', icon: <Clock className="w-3 h-3" />, color: 'text-brand-orange', bg: 'bg-orange-100/50' },
    { name: 'NEW LEADS', icon: <AlertCircle className="w-3 h-3" />, color: 'text-brand-cyan', bg: 'bg-cyan-100/50' },
    { name: 'CLOSED', icon: <CheckCircle2 className="w-3 h-3" />, color: 'text-brand-green', bg: 'bg-green-100/50' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLabel((prev) => (prev + 1) % labels.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden p-6 flex flex-col gap-4 shadow-2xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none" style={{ filter: 'invert(1)' }}></div>

      {/* Header */}
      <div className="flex justify-between items-center z-10 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
            <Inbox className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-900 tracking-[0.2em] uppercase">Unified Labels</span>
        </div>
        <div className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-white border border-slate-200 shadow-sm">Live System</div>
      </div>

      <div className="flex gap-4 h-full relative z-10 overflow-hidden">
        {/* Sidebar */}
        <div className="w-2/5 flex flex-col gap-2 border-r border-slate-200 pr-4">
          {labels.map((label, i) => (
            <div
              key={label.name}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-500 cursor-default ${
                activeLabel === i
                  ? `${label.bg} border-slate-300 text-slate-900 translate-x-1 shadow-sm`
                  : 'bg-white/50 border-transparent text-slate-400 hover:bg-white'
              }`}
            >
              <div className={activeLabel === i ? label.color : 'text-slate-300'}>
                {label.icon}
              </div>
              <div className="flex flex-col">
                <span className={`font-mono text-[9px] font-bold leading-none ${activeLabel === i ? 'text-slate-900' : 'text-slate-400'}`}>{label.name}</span>
                {activeLabel === i && <span className="text-[8px] text-slate-500 mt-1 animate-pulse font-mono uppercase font-medium">Categorizing</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div className="flex-1 flex flex-col gap-3 relative">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 transform transition-all duration-700 shadow-sm"
              style={{
                opacity: 1,
                transitionDelay: `${item * 100}ms`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-[8px] font-bold text-slate-600 uppercase border border-slate-200`}>
                    {['JS', 'AM', 'KL'][item-1]}
                  </div>
                  <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[7px] font-mono border ${labels[activeLabel].color} ${labels[activeLabel].bg} border-current/20 font-bold`}>
                  {labels[activeLabel].name}
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                <div className="h-1.5 w-4/5 bg-slate-100 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <div className="text-[7px] font-mono text-slate-400 font-bold uppercase tracking-tight">Processing</div>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shadow-glow-blue"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabelAnimation;
