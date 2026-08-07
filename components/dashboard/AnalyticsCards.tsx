import { Award, CheckCircle2, TrendingUp, Cpu, MessageSquare } from 'lucide-react';

interface AnalyticsProps {
  totalInterviews: number;
  avgScore: number;
  techScore: number;
  commScore: number;
}

export function AnalyticsCards({ totalInterviews, avgScore, techScore, commScore }: AnalyticsProps) {
  const CARDS = [
    {
      title: 'Average Score',
      value: `${avgScore}%`,
      change: '+12% this month',
      icon: Award,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      title: 'Interviews Completed',
      value: totalInterviews.toString(),
      change: '3 active sessions',
      icon: CheckCircle2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      title: 'Technical Depth',
      value: `${techScore}%`,
      change: 'Strong proficiency',
      icon: Cpu,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      title: 'Communication',
      value: `${commScore}%`,
      change: 'Articulate & structured',
      icon: MessageSquare,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CARDS.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-slate-400">{card.title}</span>
              <div className={`w-9 h-9 rounded-xl ${card.bg} ${card.border} border flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">{card.value}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400 inline" />
                {card.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
