'use client';

import Link from 'next/link';
import { AiOrb } from '@/components/ui/AiOrb';
import { ArrowRight, Sparkles, CheckCircle2, Play, Bot, Cpu, ShieldCheck, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern bg-[#f8fafc]">
      {/* Soft Ambient Background Glows */}
      <div className="glow-blue top-10 left-1/2 -translate-x-1/2 opacity-60 blur-3xl pointer-events-none" />
      <div className="glow-purple top-40 right-10 opacity-40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-500/20 text-xs text-blue-600 shadow-md shadow-blue-500/5 mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-bold">SteerHire AI SaaS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-slate-500 font-medium">Build the interviewer, not the interview</span>
        </div>

        {/* 3D AI Assistant Orb Display */}
        <div className="mb-8 flex justify-center">
          <AiOrb isSpeaking={true} size="md" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.12]">
          Practice Live Tech Interviews with an <br className="hidden sm:inline" />
          <span className="gradient-text">Adaptive 3D AI Interviewer</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Designed like Apple, Stripe, and Vercel. SteerHire parses your resume PDF, probes your architecture trade-offs out loud, and delivers hiring decision scorecards.
        </p>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/setup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white gradient-button flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25 hover:scale-[1.02] transition-transform"
          >
            Start Free AI Session
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold text-slate-700 glass-card glass-card-hover flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            Candidate Portal
          </Link>
        </div>

        {/* Value Highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
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

        {/* SaaS App Preview Card Mockup */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl opacity-80" />
          
          <div className="relative glass-card rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xl text-left overflow-hidden bg-white/90">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-slate-500 font-mono">steerhire // live-interview-probe</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                3D AI Voice Active
              </div>
            </div>

            <div className="space-y-4 font-sans">
              <div className="flex gap-3.5 items-start">
                <AiOrb isSpeaking={true} size="sm" />
                <div className="glass-card p-4 rounded-2xl rounded-tl-none border-blue-500/20 max-w-2xl bg-slate-50">
                  <p className="text-xs font-bold text-blue-600 mb-1">SteerHire AI Interviewer • Voice Speech</p>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    "I noticed on your resume that you built a high-throughput event processing engine with Next.js 15 and PostgreSQL. How did you handle race conditions during peak concurrent write traffic?"
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start justify-end">
                <div className="bg-slate-900 border border-slate-800 text-slate-100 p-4 rounded-2xl rounded-tr-none max-w-2xl shadow-md">
                  <p className="text-xs font-semibold text-slate-400 mb-1">Candidate Answer (Voice-to-Text)</p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    "We used optimistic locking with database transactions in Supabase, combined with Redis queue fallback to guarantee idempotent processing during spike traffic."
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4 font-medium">
                <span>Technical Depth: <strong className="text-emerald-600 font-extrabold">94%</strong></span>
                <span>Communication: <strong className="text-blue-600 font-extrabold">90%</strong></span>
                <span>Confidence: <strong className="text-purple-600 font-extrabold">88%</strong></span>
              </div>
              <span className="text-blue-600 font-mono font-semibold">Generating adaptive follow-up...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
