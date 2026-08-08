'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AudioWaveform } from '@/components/ui/AudioWaveform';
import { Spotlight } from '@/components/ui/Spotlight';
import { ArrowRight, Sparkles, CheckCircle2, Play, Cpu, Bot, Layers, Database, Activity, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const [activeTab, setActiveTab] = useState<'voice' | 'architecture' | 'scorecard'>('voice');

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden text-slate-900">
      {/* Spotlight Interactive Cursor Tracking Illumination */}
      <Spotlight />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200 text-xs text-blue-600 shadow-sm mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-bold">SteerHire AI SaaS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-slate-500 font-medium">Build the interviewer, not the interview</span>
        </motion.div>

        {/* Proportioned Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]"
        >
          Your next interview <br className="hidden sm:inline" />
          <span className="gradient-text font-black">starts here.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Practice under realistic technical interview conditions. SteerHire parses your PDF resume, probes your architecture trade-offs out loud, and delivers hiring decision scorecards.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/setup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white gradient-button flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25 hover:scale-[1.02] transition-transform"
          >
            Start Free AI Session
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold text-slate-700 glass-card glass-card-hover flex items-center justify-center gap-2 bg-white/95"
          >
            <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            Candidate Portal
          </Link>
        </motion.div>

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

        {/* Live Interactive Candidate Sandbox Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 relative max-w-4xl mx-auto"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl opacity-80" />
          
          <div className="relative glass-card rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl text-left overflow-hidden bg-white/95">
            {/* Tab Controls Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/60 mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-slate-500 font-mono">steerhire // live-ai-probe</span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'voice' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" /> Voice Probe
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'architecture' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> System Design
                </button>
                <button
                  onClick={() => setActiveTab('scorecard')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'scorecard' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" /> Scorecard
                </button>
              </div>
            </div>

            {/* Tab Content 1: Live Voice Probe with Audio Spectrum Visualizer */}
            {activeTab === 'voice' && (
              <div className="space-y-4 font-sans animate-in fade-in-50">
                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="glass-card p-4 rounded-2xl rounded-tl-none border-blue-500/20 max-w-2xl bg-slate-50">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <p className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-blue-600" /> SteerHire AI Interviewer • Speaking Out Loud
                      </p>
                      <AudioWaveform isActive={true} barCount={10} />
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      "I noticed on your resume that you built a high-throughput event processing engine with Next.js 15 and PostgreSQL. How did you handle race conditions during peak concurrent write traffic?"
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start justify-end">
                  <div className="bg-blue-600 border border-blue-600 text-white p-4 rounded-2xl rounded-tr-none max-w-2xl shadow-md shadow-blue-500/20">
                    <p className="text-xs font-bold text-blue-100 mb-1">Candidate Answer (Voice-to-Text)</p>
                    <p className="text-sm text-white leading-relaxed font-medium">
                      "We used optimistic locking with database transactions in Supabase, combined with Redis queue fallback to guarantee idempotent processing during spike traffic."
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 2: System Design Architecture */}
            {activeTab === 'architecture' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed space-y-2 animate-in fade-in-50">
                <p className="text-blue-600 font-bold">// System Design Adaptive Probing Trace</p>
                <p>1. Target Architecture: Microservices Gateway + Event Queue</p>
                <p>2. Bottleneck Probed: Write amplification under 50k RPS burst load</p>
                <p className="text-emerald-600 font-bold">✓ Candidate trade-off logic validated: Optimistic Concurrency + Distributed Lock</p>
              </div>
            )}

            {/* Tab Content 3: Hiring Scorecard */}
            {activeTab === 'scorecard' && (
              <div className="grid grid-cols-3 gap-3 text-center animate-in fade-in-50">
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-[11px] font-mono text-purple-600 font-bold">Technical Depth</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">94%</h4>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <span className="text-[11px] font-mono text-blue-600 font-bold">Communication</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">90%</h4>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] font-mono text-emerald-600 font-bold">Hiring Decision</span>
                  <h4 className="text-xl font-black text-emerald-600 mt-1">Strong Hire</h4>
                </div>
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4 font-medium">
                <span>Technical Depth: <strong className="text-emerald-600 font-black">94%</strong></span>
                <span>Communication: <strong className="text-blue-600 font-black">90%</strong></span>
                <span>Confidence: <strong className="text-purple-600 font-black">88%</strong></span>
              </div>
              <span className="text-blue-600 font-mono font-bold text-[11px]">Generating adaptive follow-up...</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
