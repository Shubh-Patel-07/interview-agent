'use client';

import Link from 'next/link';
import { AiOrb } from '@/components/ui/AiOrb';
import { ThreeDCanvasHero } from '@/components/ui/ThreeDCanvasHero';
import { ArrowRight, Sparkles, CheckCircle2, Play, Cpu } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-pattern bg-[#f8fafc]">
      {/* Subtle 3D Canvas WebGL Mouse Parallax */}
      <ThreeDCanvasHero />

      {/* Soft Ambient Background Glows */}
      <div className="glow-blue top-10 left-1/2 -translate-x-1/2 opacity-40 blur-3xl pointer-events-none" />
      <div className="glow-purple top-40 right-10 opacity-30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs text-blue-600 shadow-sm mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-bold">SteerHire AI SaaS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-slate-500 font-medium">Build the interviewer, not the interview</span>
        </div>

        {/* Proportioned AI Assistant Orb Display */}
        <div className="mb-6 flex justify-center relative z-10">
          <AiOrb isSpeaking={true} size="md" />
        </div>

        {/* Crisp Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Practice Live Tech Interviews with an <br className="hidden sm:inline" />
          <span className="gradient-text">Adaptive 3D AI Interviewer</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Designed like Apple, Stripe, and Vercel. SteerHire parses your resume PDF, probes your architecture trade-offs out loud, and delivers hiring decision scorecards.
        </p>

        {/* CTA Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/setup"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white gradient-button flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform"
          >
            Start Free AI Session
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 glass-card glass-card-hover flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            Candidate Portal
          </Link>
        </div>

        {/* Value Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Resume Intelligence PDF Parsing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Real-time Voice Speech Output</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            <span>Hiring Decision Scorecards</span>
          </div>
        </div>

        {/* Apple-Style SaaS App Preview Card Mockup */}
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 blur-xl opacity-70" />
          
          <div className="relative glass-card rounded-3xl border border-slate-200/80 p-6 shadow-xl text-left overflow-hidden bg-white/90">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-slate-500 font-mono">steerhire // live-interview-probe</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                3D AI Voice Active
              </div>
            </div>

            <div className="space-y-4 font-sans">
              <div className="flex gap-3 items-start">
                <AiOrb isSpeaking={true} size="sm" />
                <div className="glass-card p-4 rounded-2xl rounded-tl-none border-blue-500/20 max-w-xl bg-slate-50">
                  <p className="text-xs font-bold text-blue-600 mb-1">SteerHire AI Interviewer • Voice Speech</p>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    "I noticed on your resume that you built a high-throughput event processing engine with Next.js 15 and PostgreSQL. How did you handle race conditions during peak concurrent write traffic?"
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start justify-end">
                <div className="bg-slate-900 border border-slate-800 text-slate-100 p-4 rounded-2xl rounded-tr-none max-w-xl shadow-md">
                  <p className="text-xs font-bold text-slate-400 mb-1">Candidate Answer (Voice-to-Text)</p>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    "We used optimistic locking with database transactions in Supabase, combined with Redis queue fallback to guarantee idempotent processing during spike traffic."
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4 font-medium">
                <span>Technical Depth: <strong className="text-emerald-600 font-black">94%</strong></span>
                <span>Communication: <strong className="text-blue-600 font-black">90%</strong></span>
                <span>Confidence: <strong className="text-purple-600 font-black">88%</strong></span>
              </div>
              <span className="text-blue-600 font-mono font-bold text-[11px]">Generating adaptive follow-up...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
