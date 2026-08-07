'use client';

import { Bot, Sparkles } from 'lucide-react';

interface AiOrbProps {
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AiOrb({ isSpeaking = false, size = 'md' }: AiOrbProps) {
  const dimensions = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-44 h-44',
  }[size];

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }[size];

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer 3D Glow Mesh */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 blur-xl transition-all duration-500 ${
          isSpeaking ? 'opacity-80 scale-125 orb-pulse' : 'opacity-40 scale-100'
        }`}
      />

      {/* Rotating Ring */}
      <div
        className={`absolute -inset-2 rounded-full border border-blue-400/40 border-t-purple-500 transition-all duration-700 ${
          isSpeaking ? 'animate-spin' : 'orb-float'
        }`}
        style={{ animationDuration: '6s' }}
      />

      {/* Main Glass Sphere Body */}
      <div
        className={`${dimensions} rounded-full bg-gradient-to-tr from-slate-900 via-blue-950 to-purple-900 p-[2px] shadow-2xl relative z-10 flex items-center justify-center overflow-hidden border border-white/20`}
      >
        {/* Inner Light Flare */}
        <div className="absolute top-1 left-3 w-1/2 h-1/3 bg-white/20 rounded-full blur-sm pointer-events-none" />

        {/* Central Core Icon */}
        <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center relative">
          <Bot className={`${iconSizes} text-blue-400 transition-transform duration-300 ${isSpeaking ? 'scale-110 text-cyan-300' : ''}`} />
          {isSpeaking && (
            <Sparkles className="w-4 h-4 text-cyan-300 absolute top-2 right-2 animate-ping" />
          )}
        </div>
      </div>
    </div>
  );
}
