import React from 'react';
import { AlertTriangle, Lock, FileText } from 'lucide-react';

const ActivityGrid: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] p-6 group">
      {/* Background Shadow Glow */}
      <div className="absolute inset-20 bg-white/10 blur-[100px] rounded-full group-hover:bg-brand-orange/10 transition-colors duration-1000"></div>

      <div className="relative h-full grid grid-cols-2 gap-4 items-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-lg border border-slate-200 rounded-lg p-4 flex flex-col overflow-hidden transition-transform hover:scale-[1.02]"
            style={{ animationDelay: `${i * 0.8}s` }}
          >
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                  <FileText className="w-2.5 h-2.5 text-slate-400" />
                </div>
                <div className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-tighter">LOG_FILE_{204 + i}</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="h-1.5 w-full bg-slate-900 rounded"></div>
              <div className="h-1.5 w-3/4 bg-slate-100 rounded"></div>
              <div className="h-1.5 w-full bg-slate-900 rounded"></div>
              <div className="h-1.5 w-1/2 bg-slate-100 rounded"></div>
            </div>

            <div className="mt-auto pt-3 flex justify-between items-center opacity-40">
              <span className="font-mono text-[7px] text-slate-400">UNVERIFIED_SOURCE</span>
              <Lock className="w-2.5 h-2.5 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Warning Overlay Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 bg-brand-orange p-4 rounded-xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-white w-5 h-5 animate-pulse" />
          <h4 className="text-white font-bold text-[10px] uppercase tracking-widest font-mono">Critical_Gap</h4>
        </div>
        <p className="text-white/90 text-[10px] font-mono leading-tight">84% of Rep interactions are currently occurring in unmonitored threads.</p>
      </div>
    </div>
  );
};

export default ActivityGrid;
