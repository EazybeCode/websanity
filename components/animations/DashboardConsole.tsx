import React from 'react';

const barData = [
  { name: 'A', time: 20 },
  { name: 'B', time: 85 },
  { name: 'C', time: 45 },
  { name: 'D', time: 10 },
  { name: 'E', time: 65 },
  { name: 'F', time: 30 },
];

const areaPoints = [40, 75, 55, 90, 60, 85, 70];

const DashboardConsole: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] bg-white shadow-lg rounded-2xl p-6 border border-slate-200 overflow-hidden">
      {/* Decorative Document Elements */}
      <div className="absolute top-0 right-0 p-4 flex gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
      </div>
      <div className="absolute bottom-4 left-6 font-mono text-[7px] text-slate-300 uppercase tracking-[0.3em]">Engineering_Report_V3.0.4</div>

      <div className="grid grid-cols-2 gap-4 relative z-10 h-full">
        {/* 1. Latency Index - Bar Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>Latency_Index</span>
            <span className="text-brand-blue text-[7px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
              LIVE
            </span>
          </h5>
          <div className="flex-1 flex items-end gap-1.5 min-h-[60px]">
            {barData.map((item, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-500 ${item.time > 70 ? 'bg-brand-orange' : 'bg-brand-blue'}`}
                style={{ height: `${item.time}%` }}
              />
            ))}
          </div>
        </div>

        {/* 2. Volume Velocity - Area Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>Vol_Velocity</span>
            <span className="text-brand-cyan text-[7px]">+12.4%</span>
          </h5>
          <div className="flex-1 relative min-h-[60px]">
            {/* Area fill */}
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 50 ${areaPoints.map((p, i) => `L ${(i / (areaPoints.length - 1)) * 100} ${50 - p * 0.45}`).join(' ')} L 100 50 Z`}
                fill="url(#areaGradient)"
              />
              <path
                d={`M 0 ${50 - areaPoints[0] * 0.45} ${areaPoints.map((p, i) => `L ${(i / (areaPoints.length - 1)) * 100} ${50 - p * 0.45}`).join(' ')}`}
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* 3. Engagement Mix - Donut Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3">Eng_Mix</h5>
          <div className="flex-1 flex items-center justify-center min-h-[60px]">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#06B6D4" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-50" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#F97316" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-80" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-slate-700">80%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Active Nodes Timeline */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>Nodes_Active</span>
            <span className="text-brand-green text-[7px]">2,847</span>
          </h5>
          <div className="flex-1 flex items-end gap-0.5 min-h-[60px]">
            {[35, 45, 30, 60, 80, 95, 85, 90, 70, 55, 40, 25].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-300 ${i >= 4 && i <= 8 ? 'bg-brand-green' : 'bg-slate-200'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConsole;
