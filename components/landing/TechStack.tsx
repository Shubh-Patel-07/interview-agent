import { Cpu, Database, Zap, Layers } from 'lucide-react';

const TECHS = [
  { name: 'Next.js 15', role: 'App Router & React Server Components', icon: Layers, color: 'text-slate-900' },
  { name: 'Google Gemini 2.5', role: 'Adaptive Reasoning & Probing AI', icon: Cpu, color: 'text-blue-600' },
  { name: 'Supabase PostgreSQL', role: 'Database & Row-Level Security', icon: Database, color: 'text-emerald-600' },
  { name: 'Vercel Platform', role: 'Edge Deployment & Latency Optimization', icon: Zap, color: 'text-purple-600' },
];

export function TechStack() {
  return (
    <section className="py-16 relative bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
          Powered by Industry-Standard Infrastructure
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TECHS.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card border border-slate-200/60 flex flex-col items-center justify-center gap-2 group hover:border-blue-500/30 transition-colors"
              >
                <Icon className={`w-7 h-7 ${tech.color} group-hover:scale-110 transition-transform`} />
                <h4 className="text-sm font-bold text-slate-900">{tech.name}</h4>
                <p className="text-[11px] text-slate-500">{tech.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
