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
    <div className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white/95 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Score Progression Over Time</h3>
          <p className="text-xs text-slate-500">Historical candidate score trajectory across mock interviews</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-blue-600 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Overall
          </span>
          <span className="flex items-center gap-1.5 text-purple-600 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Technical
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.8)" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} domain={[40, 100]} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: 'rgba(226, 232, 240, 0.8)',
                borderRadius: '12px',
                color: '#0f172a',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
              }}
            />
            <Area type="monotone" dataKey="overall" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#blueGlow)" />
            <Area type="monotone" dataKey="technical" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#purpleGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
