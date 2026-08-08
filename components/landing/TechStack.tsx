import { Cpu, Database, Zap, Layers } from 'lucide-react';

const TECHS = [
  { name: 'Next.js 15', role: 'App Router & React Server Components', icon: Layers, color: 'text-slate-900 dark:text-white' },
  { name: 'Google Gemini 2.5', role: 'Adaptive Reasoning & Probing AI', icon: Cpu, color: 'text-blue-600 dark:text-blue-400' },
  { name: 'Supabase PostgreSQL', role: 'Database & Row-Level Security', icon: Database, color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'Vercel Platform', role: 'Edge Deployment & Latency Optimization', icon: Zap, color: 'text-purple-600 dark:text-purple-400' },
];

export function TechStack() {
  return (
    <section className="py-16 relative text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8 font-mono">
          Powered by Industry-Standard Infrastructure
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TECHS.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 flex flex-col items-center justify-center gap-2 group hover:border-blue-500/40 shadow-sm transition-all"
              >
                <Icon className={`w-7 h-7 ${tech.color} group-hover:scale-110 transition-transform`} />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tech.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{tech.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
