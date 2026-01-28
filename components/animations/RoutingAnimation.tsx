import React, { useState, useEffect } from 'react';
import { UserCheck, Zap, ArrowDown, Database, Cpu, Target } from 'lucide-react';

const RoutingAnimation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden p-8 flex flex-col shadow-2xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" style={{ filter: 'invert(1)' }}></div>

      {/* Source - Incoming Stream */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className={`px-4 py-2 bg-white border border-slate-200 rounded-full flex items-center gap-3 transition-all duration-500 shadow-sm ${step === 0 ? 'scale-105 border-brand-blue/30' : 'scale-100'}`}>
          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
            <Zap className={`w-3.5 h-3.5 text-brand-blue ${step === 0 ? 'animate-pulse' : ''}`} />
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-900 tracking-[0.2em] uppercase">New Lead</span>
        </div>

        {/* Animated Lead Capsule */}
        <div className="h-16 w-px bg-gradient-to-b from-brand-blue to-slate-200 relative">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-brand-blue/20 rounded-full blur-[4px] transition-all duration-1000 ${step > 0 ? 'top-[60px]' : 'top-0'}`}></div>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-blue rounded-full transition-all duration-1000 ${step > 0 ? 'top-[60px]' : 'top-0'} shadow-sm`}></div>
        </div>
      </div>

      {/* Logic Core - Decision Matrix */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className={`relative p-6 bg-white border-2 rounded-2xl transition-all duration-500 shadow-md ${step === 1 ? 'border-brand-blue scale-105' : 'border-slate-100'}`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-white text-[8px] font-mono text-brand-blue uppercase font-bold tracking-widest border border-slate-200 rounded-full shadow-sm">Routing Engine</div>

          <div className="flex flex-col gap-4 w-40">
             {[
               { icon: <Database className="w-3 h-3" />, label: 'DATABASE', done: step >= 1 },
               { icon: <Cpu className="w-3 h-3" />, label: 'THROTTLE', done: step >= 1 },
               { icon: <Target className="w-3 h-3" />, label: 'ASSIGN', done: step >= 1 },
             ].map((l, i) => (
               <div key={i} className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors shadow-sm ${l.done ? 'bg-green-50 text-brand-green' : 'bg-slate-50 text-slate-300'}`}>
                    {l.icon}
                  </div>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                     <div className={`h-full bg-brand-blue transition-all duration-1000 ${l.done ? 'w-full' : 'w-0'}`}></div>
                  </div>
               </div>
             ))}
          </div>

          {/* Success Indicator */}
          <div className={`absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-green border-4 border-slate-50 flex items-center justify-center shadow-lg transition-all duration-500 ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <UserCheck className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Flow Connector */}
        <div className="h-12 w-px bg-gradient-to-b from-brand-blue to-transparent relative">
           <ArrowDown className={`absolute -bottom-2 -left-1.5 w-3 h-3 text-brand-blue transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>

      {/* Destination Pool */}
      <div className="grid grid-cols-3 gap-3 z-10">
        {[
          { name: 'S. ROGERS', active: step === 3 },
          { name: 'N. ROMANOFF', active: false },
          { name: 'T. STARK', active: false }
        ].map((rep, idx) => (
          <div key={idx} className={`relative p-3 rounded-xl border transition-all duration-500 flex flex-col items-center gap-2 ${
            rep.active ? 'bg-white border-brand-blue shadow-md scale-105' : 'bg-white/50 border-slate-100 opacity-50'
          }`}>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-[9px] font-bold ${rep.active ? 'border-brand-blue bg-white text-brand-blue shadow-sm' : 'border-slate-200 bg-white text-slate-300'}`}>
              {rep.name.split(' ')[0][0]}{rep.name.split(' ')[1][0]}
            </div>
            <span className={`font-mono text-[7px] uppercase tracking-tight font-bold ${rep.active ? 'text-slate-900' : 'text-slate-400'}`}>
              {rep.name}
            </span>
            {rep.active && (
              <div className="absolute -top-1 -right-1 bg-brand-green w-2.5 h-2.5 rounded-full border-2 border-white animate-ping"></div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="mt-6 flex justify-between items-center border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
          <span className="font-mono text-[8px] text-slate-400 uppercase font-bold tracking-widest">Routing Auto</span>
        </div>
        <div className="text-[8px] font-mono text-slate-400 font-bold uppercase">Balance: OK</div>
      </div>
    </div>
  );
};

export default RoutingAnimation;
