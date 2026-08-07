'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Play, Bot, FileText, CheckCircle2, Cpu } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Background Ambient Glows */}
      <div className="glow-purple top-10 left-1/2 -translate-x-1/2 opacity-40 blur-3xl pointer-events-none" />
      <div className="glow-cyan top-40 right-10 opacity-30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-xs text-purple-300 backdrop-blur-md mb-8 shadow-lg shadow-purple-500/10 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Build the interviewer, not the interview</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-slate-400 font-medium">Powered by Gemini AI</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Master Tech Interviews with an <br className="hidden sm:inline" />
          <span className="gradient-text">Adaptive AI Interviewer</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
          Not another chatbot. An AI agent that analyzes your resume, conducts dynamic live audio & text interviews, probes your technical reasoning, and generates hiring manager level reports.
        </p>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/setup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white gradient-button flex items-center justify-center gap-3 shadow-xl shadow-purple-500/25 hover:scale-[1.02] transition-transform"
          >
            Start Free AI Interview
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold text-slate-200 glass-card glass-card-hover flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            View Demo Report
          </Link>
        </div>

        {/* Value Highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Resume PDF Parsing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Adaptive Follow-up Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Multi-score Hiring Report</span>
          </div>
        </div>

        {/* SaaS App Preview Card Mockup */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-cyan-500/30 blur-xl opacity-70" />
          
          <div className="relative glass-card rounded-2xl border border-white/10 p-4 sm:p-6 shadow-2xl text-left overflow-hidden">
            {/* Header bar of UI mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-slate-400 font-mono">live-session // Full-Stack Architect Interview</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                AI Interviewer Active
              </div>
            </div>

            {/* Simulated Live Audio / Text Q&A Session */}
            <div className="space-y-4 font-sans">
              {/* AI Message */}
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <div className="glass-card p-4 rounded-2xl rounded-tl-none border-purple-500/20 max-w-2xl">
                  <p className="text-xs font-semibold text-purple-400 mb-1">AI Interviewer • Question 3 of 5</p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    "I noticed on your resume that you built a high-throughput event processing engine with Next.js 15 and PostgreSQL. How did you handle race conditions during peak concurrent user requests?"
                  </p>
                </div>
              </div>

              {/* Candidate Response */}
              <div className="flex gap-3 items-start justify-end">
                <div className="bg-slate-800/80 border border-white/10 p-4 rounded-2xl rounded-tr-none max-w-2xl">
                  <p className="text-xs font-semibold text-slate-400 mb-1">Candidate Answer (Voice to Text)</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    "We used optimistic locking with database transactions in Supabase, combined with Redis queue fallback to guarantee idempotent processing during spike traffic."
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Floating Evaluation Metric Pill */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span>Technical Depth: <strong className="text-emerald-400 font-semibold">92%</strong></span>
                <span>Communication: <strong className="text-cyan-400 font-semibold">88%</strong></span>
              </div>
              <span className="text-purple-400 font-mono">Generating adaptive follow-up...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
