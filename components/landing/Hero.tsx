'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiOrb } from '@/components/ui/AiOrb';
import { ParticleCanvas } from '@/components/ui/ParticleCanvas';
import { Spotlight } from '@/components/ui/Spotlight';
import { ArrowRight, Sparkles, CheckCircle2, Play, Cpu, Bot, Layers, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const [activeTab, setActiveTab] = useState<'voice' | 'architecture' | 'scorecard'>('voice');

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern bg-[#05070d] text-slate-100">
      {/* Spotlight Interactive Cursor Tracking Illumination */}
      <Spotlight />

      {/* 60 FPS Neural Particle Canvas */}
      <ParticleCanvas />

      {/* Soft Ambient Background Glows */}
      <div className="glow-blue top-10 left-1/2 -translate-x-1/2 opacity-40 blur-3xl pointer-events-none" />
      <div className="glow-purple top-40 right-10 opacity-30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 shadow-md shadow-indigo-500/5 mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-semibold">SteerHire AI SaaS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-slate-400 font-medium">Build the interviewer, not the interview</span>
        </motion.div>

        {/* 3D AI Assistant Orb Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex justify-center relative z-10"
        >
          <AiOrb isSpeaking={true} size="md" />
        </motion.div>

        {/* Proportioned Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight"
        >
          Practice Live Tech Interviews with an <br className="hidden sm:inline" />
          <span className="gradient-text font-black">Adaptive 3D AI Interviewer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Designed like Apple, Stripe, and Vercel. SteerHire parses your resume PDF, probes your architecture trade-offs out loud, and delivers hiring decision scorecards.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/setup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-white gradient-button flex items-center justify-center gap-3 shadow-xl shadow-purple-500/25 hover:scale-[1.02] transition-transform"
          >
            Start Free AI Session
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-semibold text-slate-200 glass-card glass-card-hover flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            Candidate Portal
          </Link>
        </motion.div>

        {/* Value Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Resume Intelligence PDF Parsing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Real-time Voice Speech Output</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Hiring Decision Scorecards</span>
          </div>
        </div>

        {/* Interactive App Preview Sandbox with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 relative max-w-4xl mx-auto"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl opacity-80" />
          
          <div className="relative glass-card rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl text-left overflow-hidden bg-[#07090e]/90">
            {/* Tab Controls Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-slate-400 font-mono">steerhire // live-ai-probe</span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'voice' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" /> Voice Probe
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'architecture' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> System Design
                </button>
                <button
                  onClick={() => setActiveTab('scorecard')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'scorecard' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" /> Scorecard
                </button>
              </div>
            </div>

            {/* Tab Content 1: Live Voice Probe */}
            {activeTab === 'voice' && (
              <div className="space-y-4 font-sans animate-in fade-in-50">
                <div className="flex gap-3.5 items-start">
                  <AiOrb isSpeaking={true} size="sm" />
                  <div className="glass-card p-4 rounded-2xl rounded-tl-none border-indigo-500/20 max-w-2xl bg-slate-900/80">
                    <p className="text-xs font-bold text-indigo-400 mb-1">SteerHire AI Interviewer • Voice Speech</p>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                      "I noticed on your resume that you built a high-throughput event processing engine with Next.js 15 and PostgreSQL. How did you handle race conditions during peak concurrent write traffic?"
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start justify-end">
                  <div className="bg-slate-900 border border-white/10 text-slate-100 p-4 rounded-2xl rounded-tr-none max-w-2xl shadow-md">
                    <p className="text-xs font-semibold text-cyan-400 mb-1">Candidate Answer (Voice-to-Text)</p>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      "We used optimistic locking with database transactions in Supabase, combined with Redis queue fallback to guarantee idempotent processing during spike traffic."
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 2: System Design Architecture */}
            {activeTab === 'architecture' && (
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed space-y-2 animate-in fade-in-50">
                <p className="text-purple-400 font-bold">// System Design Adaptive Probing Trace</p>
                <p>1. Target Architecture: Microservices Gateway + Event Queue</p>
                <p>2. Bottleneck Probed: Write amplification under 50k RPS burst load</p>
                <p className="text-emerald-400">✓ Candidate trade-off logic validated: Optimistic Concurrency + Distributed Lock</p>
              </div>
            )}

            {/* Tab Content 3: Hiring Scorecard */}
            {activeTab === 'scorecard' && (
              <div className="grid grid-cols-3 gap-3 text-center animate-in fade-in-50">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <span className="text-[11px] font-mono text-purple-300">Technical Depth</span>
                  <h4 className="text-2xl font-black text-white mt-1">94%</h4>
                </div>
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-[11px] font-mono text-cyan-300">Communication</span>
                  <h4 className="text-2xl font-black text-white mt-1">90%</h4>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[11px] font-mono text-emerald-300">Hiring Decision</span>
                  <h4 className="text-xl font-black text-emerald-400 mt-1">Strong Hire</h4>
                </div>
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-4 font-medium">
                <span>Technical Depth: <strong className="text-emerald-400 font-bold">94%</strong></span>
                <span>Communication: <strong className="text-cyan-400 font-bold">90%</strong></span>
                <span>Confidence: <strong className="text-purple-400 font-bold">88%</strong></span>
              </div>
              <span className="text-purple-400 font-mono font-semibold">Generating adaptive follow-up...</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
