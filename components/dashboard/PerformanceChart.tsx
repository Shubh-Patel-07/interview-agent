'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MOCK_CHART_DATA = [
  { date: 'Session 1', overall: 65, technical: 60, communication: 70 },
  { date: 'Session 2', overall: 72, technical: 75, communication: 70 },
  { date: 'Session 3', overall: 78, technical: 82, communication: 75 },
  { date: 'Session 4', overall: 85, technical: 88, communication: 82 },
  { date: 'Session 5', overall: 92, technical: 94, communication: 90 },
];

export function PerformanceChart() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white">Score Progression Over Time</h3>
          <p className="text-xs text-slate-400">Historical candidate score trajectory across mock interviews</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-purple-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Overall
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Technical
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cyanGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} domain={[40, 100]} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0c101d',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Area type="monotone" dataKey="overall" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#purpleGlow)" />
            <Area type="monotone" dataKey="technical" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#cyanGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
