import React from 'react';
import { TrendingDown, TrendingUp, ChevronRight } from 'lucide-react';

const reps = [
  { name: 'Sarah K.', gap: 'Follow-up Rate', delta: -22, status: 'CRITICAL' },
  { name: 'John D.', gap: 'Response Speed', delta: +15, status: 'OPTIMAL' },
  { name: 'Alex M.', gap: 'Chat Depth', delta: -8, status: 'WARNING' },
  { name: 'Maria G.', gap: 'Closing Velocity', delta: +31, status: 'OPTIMAL' },
];

const SkillGapAnalysis: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] bg-white shadow-lg rounded-2xl p-6 border border-slate-200 overflow-hidden">
      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
        <div>
          <h5 className="font-mono text-[8px] text-brand-blue font-bold uppercase tracking-[0.2em] mb-1">Performance_Diagnostic</h5>
          <p className="text-slate-900 font-extrabold text-base tracking-tighter">Skill Gap Analysis</p>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
           <div className="font-mono text-[7px] text-slate-400 uppercase mb-0.5">Confidence</div>
           <div className="text-sm font-mono font-bold text-slate-900">99.4%</div>
        </div>
      </div>

      <div className="space-y-3">
        {reps.map((rep, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-md transition-all duration-300 group/item">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center font-bold text-[10px] text-slate-900 group-hover/item:rotate-3 transition-transform">
                {rep.name.split(' ')[0][0]}
              </div>
              <div>
                <div className="text-slate-900 font-bold text-[11px] tracking-tight">{rep.name}</div>
                <div className="text-[8px] text-slate-400 font-mono uppercase tracking-widest">{rep.gap}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`flex items-center justify-end gap-1 font-mono text-[10px] font-bold ${rep.delta > 0 ? 'text-brand-green' : 'text-brand-orange'}`}>
                  {rep.delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {rep.delta}%
                </div>
                <div className="font-mono text-[6px] text-slate-300 font-bold tracking-widest uppercase">{rep.status}</div>
              </div>
              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                   className={`h-full transition-all duration-1000 ${rep.delta > 0 ? 'bg-brand-green' : 'bg-brand-orange'}`}
                   style={{ width: `${Math.abs(rep.delta)}%` }}
                ></div>
              </div>
              <ChevronRight className="w-3 h-3 text-slate-200 group-hover/item:text-brand-blue group-hover/item:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex gap-1.5">
           <div className="h-1.5 w-12 bg-slate-900 rounded"></div>
           <div className="h-1.5 w-8 bg-slate-200 rounded"></div>
        </div>
        <div className="font-mono text-[7px] text-slate-400">PAGE_01_OF_12</div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;
