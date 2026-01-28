import React from 'react';
import {
  BarChart, Bar, ResponsiveContainer, Cell,
  AreaChart, Area, PieChart, Pie
} from 'recharts';

const barData = [
  { name: 'A', time: 2 },
  { name: 'B', time: 14 },
  { name: 'C', time: 5 },
  { name: 'D', time: 1 },
];

const areaData = [
  { h: '1', v: 40 }, { h: '2', v: 95 }, { h: '3', v: 60 }, { h: '4', v: 120 }, { h: '5', v: 80 }
];

const pieData = [
  { name: 'D', value: 400, fill: '#2563EB' },
  { name: 'S', value: 300, fill: '#06B6D4' },
  { name: 'I', value: 100, fill: '#F97316' },
];

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

      <div className="grid grid-cols-2 gap-4 relative z-10">
        {/* 1. Response Time */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>Latency_Index</span>
            <span className="text-brand-blue text-[7px]">LIVE</span>
          </h5>
          <div className="flex-1 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="time" radius={[2, 2, 0, 0]}>
                  {barData.map((e, i) => <Cell key={i} fill={e.time > 10 ? '#F97316' : '#2563EB'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Message Volume */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3">Vol_Velocity</h5>
          <div className="flex-1 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <Area type="monotone" dataKey="v" stroke="#06B6D4" strokeWidth={2} fill="rgba(6, 182, 212, 0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Engagement Quality */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3">Eng_Mix</h5>
          <div className="flex-1 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={15} outerRadius={28} paddingAngle={4} dataKey="value" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Active Hours Timeline */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <h5 className="font-mono text-[8px] text-slate-900 font-bold uppercase tracking-widest mb-3">Nodes_Active</h5>
          <div className="grid grid-cols-8 gap-0.5 h-16 items-end">
             {[...Array(24)].map((_, i) => (
               <div
                 key={i}
                 className={`rounded-[1px] transition-colors duration-1000 ${i > 8 && i < 18 ? 'bg-brand-blue' : 'bg-slate-200'}`}
                 style={{ height: `${30 + Math.random() * 70}%` }}
               ></div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConsole;
