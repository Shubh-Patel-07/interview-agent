'use client';

import { motion } from 'framer-motion';
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
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      title: 'Interviews Completed',
      value: totalInterviews.toString(),
      change: '3 active sessions',
      icon: CheckCircle2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      title: 'Technical Depth',
      value: `${techScore}%`,
      change: 'Strong proficiency',
      icon: Cpu,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      title: 'Communication',
      value: `${commScore}%`,
      change: 'Articulate & structured',
      icon: MessageSquare,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CARDS.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card glass-card-hover p-6 rounded-3xl border border-slate-200/80 bg-white flex flex-col justify-between shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</span>
              <div className={`w-10 h-10 rounded-2xl ${card.bg} ${card.border} border flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 inline" />
                {card.change}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
