import React, { useState, useEffect } from 'react';
import { Users, LayoutDashboard, Search, Bell, Activity } from 'lucide-react';

const UnifiedDashboardAnimation: React.FC = () => {
  const [activeStream, setActiveStream] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStream(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-2xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" style={{ filter: 'invert(1)' }}></div>

      {/* Admin Cockpit Header */}
      <div className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center px-6 justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-blue/10 rounded-lg border border-brand-blue/20 shadow-sm">
            <LayoutDashboard className="w-4 h-4 text-brand-blue" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold text-slate-900 tracking-widest uppercase leading-none">Team Dashboard</span>
            <span className="text-[8px] text-brand-green font-mono uppercase mt-1 flex items-center gap-1 font-bold">
              <span className="w-1 h-1 rounded-full bg-brand-green animate-pulse"></span> Master Active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <div className="relative">
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-orange rounded-full border border-white"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
            HQ
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 relative z-10 flex flex-col gap-6 overflow-hidden">
        {/* Statistics Bar */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Active', val: '18', color: 'text-brand-blue' },
            { label: 'Avg Time', val: '1.2m', color: 'text-brand-cyan' },
            { label: 'Growth', val: '+12%', color: 'text-brand-green' }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col items-center shadow-sm">
              <span className={`text-xl font-bold font-mono leading-none mb-1 ${stat.color}`}>{stat.val}</span>
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Central Dashboard Monitor */}
        <div className="flex-1 bg-white/50 border border-slate-200 rounded-2xl relative overflow-hidden flex flex-col shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent pointer-events-none"></div>

          {/* Agent Stream Items */}
          <div className="p-4 flex flex-col gap-3">
            {[
              { agent: 'Account Manager A', msg: 'Updated client profile...', status: 'Live', color: 'blue' },
              { agent: 'Sales Team South', msg: 'Lead qualified successfully', status: 'Sync', color: 'cyan' },
              { agent: 'Customer Success', msg: 'Meeting scheduled for 3PM', status: 'Note', color: 'green' }
            ].map((stream, idx) => (
              <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-700 ${
                activeStream === idx ? 'bg-white border-slate-300 translate-x-1 shadow-md' : 'bg-white/40 border-transparent opacity-60'
              }`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[10px] text-slate-600 bg-slate-100 border border-slate-200 shadow-sm`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[9px] font-bold uppercase font-mono tracking-wider ${activeStream === idx ? 'text-slate-900' : 'text-slate-400'}`}>{stream.agent}</span>
                    <span className={`text-[7px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${idx === activeStream ? 'bg-blue-50 text-brand-blue border border-blue-100' : 'bg-slate-100 text-slate-500'}`}>
                      {stream.status}
                    </span>
                  </div>
                  <div className={`text-[9px] truncate max-w-[150px] font-medium ${activeStream === idx ? 'text-slate-600' : 'text-slate-400'}`}>"{stream.msg}"</div>
                </div>
                <Activity className={`w-3 h-3 ${idx === activeStream ? 'text-brand-blue animate-pulse' : 'text-slate-300'}`} />
              </div>
            ))}
          </div>

          {/* Pulse Network Overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 rounded-full border border-slate-200 backdrop-blur-sm shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping"></div>
             <span className="text-[7px] font-mono text-brand-blue tracking-widest font-bold">SECURE CHANNEL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedDashboardAnimation;
