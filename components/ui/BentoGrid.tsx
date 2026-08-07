'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function BentoGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  icon,
  header,
  className = '',
  idx = 0,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  header?: ReactNode;
  className?: string;
  idx?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`glass-card glass-card-hover rounded-3xl p-8 border border-white/10 flex flex-col justify-between group overflow-hidden bg-slate-900/60 backdrop-blur-xl shadow-xl ${className}`}
    >
      {header && <div className="mb-4">{header}</div>}
      <div>
        {icon && <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform">{icon}</div>}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed font-normal">{description}</p>
      </div>
    </motion.div>
  );
}
