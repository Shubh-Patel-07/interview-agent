'use client';

import { motion } from 'framer-motion';

interface AudioWaveformProps {
  isActive?: boolean;
  barCount?: number;
  className?: string;
}

export function AudioWaveform({ isActive = false, barCount = 12, className = '' }: AudioWaveformProps) {
  return (
    <div className={`flex items-center gap-1 h-6 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const heightMultiplier = [0.4, 0.8, 1.0, 0.6, 0.9, 0.5, 0.7, 1.0, 0.4, 0.8, 0.6, 0.9][i % 12];
        return (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-blue-600 via-indigo-500 to-purple-500 shadow-sm"
            animate={
              isActive
                ? {
                    height: ['20%', `${heightMultiplier * 100}%`, '20%'],
                  }
                : { height: '20%' }
            }
            transition={
              isActive
                ? {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: (i % 5) * 0.1,
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}
