import React from 'react';
import { AlertTriangle, Lock, FileText, Hash } from 'lucide-react';

const ActivityGrid: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center group">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-brand-orange/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

      <div className="relative w-full max-w-md h-[320px]">
        {[
          { rot: '-6deg', delay: '0s', id: '204' },
          { rot: '4deg', delay: '1.2s', id: '205' },
          { rot: '-2deg', delay: '2.4s', id: '206' },
          { rot: '1deg', delay: '0.6s', id: '207' },
        ].map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-white shadow-lg border border-slate-200 rounded-xl p-6 overflow-hidden transition-transform duration-1000"
            style={{
              animationDelay: item.delay,
              zIndex: 10 - i,
              transform: `translate(${i * 8}px, ${i * 8}px) rotate(${item.rot})`
            }}
          >
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <FileText className="w-3 h-3 text-slate-400" />
                </div>
                <div className="font-mono text-[8px] text-slate-900 font-black uppercase tracking-widest">INCIDENT_LOG_{item.id}</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
            </div>

            <div className="space-y-3">
              <div className="h-2.5 w-full bg-slate-900 rounded-sm"></div>
              <div className="h-2.5 w-[85%] bg-slate-100 rounded-sm"></div>
              <div className="h-2.5 w-full bg-slate-900 rounded-sm"></div>
              <div className="h-2.5 w-[60%] bg-slate-100 rounded-sm"></div>
            </div>

            <div className="mt-8 flex items-center justify-between opacity-30">
              <div className="flex items-center gap-2 font-mono text-[7px] text-slate-500 uppercase font-bold">
                <Hash className="w-2 h-2" /> Unverified_Metric
              </div>
              <Lock className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        ))}

        {/* Floating Warning Tag */}
        <div className="absolute -right-4 -bottom-4 w-56 bg-brand-orange p-4 rounded-xl shadow-lg z-50 transform rotate-3 hover:rotate-0 transition-transform duration-500">
           <div className="flex items-center gap-2 mb-2">
             <AlertTriangle className="text-white w-5 h-5 animate-pulse" />
             <span className="text-white font-mono text-[8px] font-black uppercase tracking-widest">Critical_Blindspot</span>
           </div>
           <p className="text-white/90 text-[10px] font-mono font-bold leading-tight">
             84.2% of customer interactions are happening outside your CRM's visibility.
           </p>
           <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center opacity-60">
              <span className="text-[7px] text-white font-mono uppercase">Status: Action Required</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityGrid;
