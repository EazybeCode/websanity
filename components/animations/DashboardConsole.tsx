import React from 'react';
import {
  BarChart, Bar, ResponsiveContainer, Cell,
  AreaChart, Area, XAxis
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

const DashboardConsole: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] bg-white shadow-lg rounded-2xl p-6 border border-slate-200 overflow-hidden">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h5 className="font-mono text-[8px] text-brand-blue font-black uppercase tracking-[0.3em] mb-1">Technical_Telemetry_V2</h5>
          <h3 className="text-slate-900 text-xl font-black tracking-tighter">Performance Console</h3>
        </div>
        <div className="text-right">
          <div className="font-mono text-[7px] text-slate-300 uppercase mb-0.5">Last_Pulse</div>
          <div className="font-mono text-[10px] font-bold text-slate-900">0.002s AGO</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Metric A: Latency */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-brand-blue/20 transition-all duration-500">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[7px] text-slate-900 font-bold uppercase tracking-widest">Latency_Min</span>
            <div className="flex gap-1">
               <div className="w-1 h-1 bg-brand-blue rounded-full animate-pulse"></div>
               <div className="w-1 h-1 bg-brand-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="time" radius={[3, 3, 0, 0]} animationBegin={500} animationDuration={1500}>
                  {barData.map((e, i) => <Cell key={i} fill={e.time > 10 ? '#F97316' : '#2563EB'} fillOpacity={0.8} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric B: Volume Velocity */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-brand-cyan/20 transition-all duration-500">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[7px] text-slate-900 font-bold uppercase tracking-widest">Volume_Velocity</span>
            <div className="flex gap-1">
               <div className="w-1 h-1 bg-brand-cyan rounded-full animate-pulse"></div>
               <div className="w-1 h-1 bg-brand-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#06B6D4" strokeWidth={2} fill="url(#colorV)" animationBegin={800} animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric C: Conversion Rate */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-brand-green/20 transition-all duration-500">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[7px] text-slate-900 font-bold uppercase tracking-widest">Conv_Rate</span>
            <span className="font-mono text-[10px] font-bold text-brand-green">+12.4%</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {[40, 55, 35, 70, 60, 85, 75, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-brand-green/20 rounded-t transition-all duration-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Metric D: Active Sessions */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-brand-orange/20 transition-all duration-500">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[7px] text-slate-900 font-bold uppercase tracking-widest">Active_Sessions</span>
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center h-20">
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">2,847</div>
              <div className="text-[8px] font-mono text-slate-400 uppercase">Live Now</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
          <span className="font-mono text-[7px] text-slate-500 uppercase">All Systems Operational</span>
        </div>
        <span className="font-mono text-[7px] text-slate-400">REP_RADAR_v3.2.1</span>
      </div>
    </div>
  );
};

export default DashboardConsole;
