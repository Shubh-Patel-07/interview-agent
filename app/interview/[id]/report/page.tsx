'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { InterviewService, MOCK_REPORTS } from '@/services/interview-service';
import { InterviewReport, InterviewConfig } from '@/types';
import { getScoreColor } from '@/lib/utils';
import { Award, CheckCircle2, AlertTriangle, Lightbulb, ArrowLeft, RefreshCw, Download, Sparkles, Cpu, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';

export default function InterviewReportPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params.id as string;

  const [report, setReport] = useState<InterviewReport | null>(null);
  const [interview, setInterview] = useState<InterviewConfig | null>(null);

  useEffect(() => {
    const list = InterviewService.getLocalInterviews();
    const currentInt = list.find((i) => i.id === interviewId);
    if (currentInt) setInterview(currentInt);

    const savedReport = InterviewService.getLocalReport(interviewId);
    if (savedReport) {
      setReport(savedReport);
    } else {
      // Fallback baseline report
      setReport(MOCK_REPORTS['demo-int-1']);
    }
  }, [interviewId]);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#05070d] flex items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  const overallStyle = getScoreColor(report.overall_score);

  return (
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100">
      <DashboardHeader />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Top Back & Action Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl glass-card glass-card-hover border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" /> Export PDF Report
          </button>
        </div>

        {/* Header Hero Banner */}
        <div className="glass-card p-8 rounded-3xl border border-purple-500/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="glow-purple -top-20 left-1/2 -translate-x-1/2 opacity-30 blur-3xl pointer-events-none" />

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Hiring Committee Evaluation Report
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {interview?.job_role || 'Full Stack Engineer'} Mock Interview
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Candidate: <strong className="text-white">Alex Dev</strong> • Session ID: <span className="font-mono text-purple-300">{interviewId}</span>
            </p>
          </div>

          {/* Hiring Recommendation Badge */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Hiring Committee Decision</span>
            <div className="px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-base font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-500/10">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              {report.hiring_recommendation}
            </div>
          </div>
        </div>

        {/* Scorecards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-purple-500/30 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Overall Score</span>
            <h2 className="text-4xl font-black text-purple-400 mt-2">{report.overall_score}%</h2>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Technical Depth</span>
            <h2 className="text-3xl font-bold text-cyan-400 mt-2">{report.technical_score}%</h2>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Communication</span>
            <h2 className="text-3xl font-bold text-emerald-400 mt-2">{report.communication_score}%</h2>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Confidence</span>
            <h2 className="text-3xl font-bold text-amber-400 mt-2">{report.confidence_score}%</h2>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Problem Solving</span>
            <h2 className="text-3xl font-bold text-indigo-400 mt-2">{report.problem_solving_score}%</h2>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Executive Evaluation Summary
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-white/5">
            "{report.summary}"
          </p>
        </div>

        {/* Strengths, Weaknesses & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths */}
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/20">
            <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Key Strengths
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              {report.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="glass-card p-6 rounded-2xl border border-rose-500/20">
            <h3 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Technical Gaps
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              {report.weaknesses.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="glass-card p-6 rounded-2xl border border-amber-500/20">
            <h3 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Suggested Action Plan
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              {report.improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA restart */}
        <div className="pt-6 flex justify-center">
          <Link
            href="/setup"
            className="px-8 py-4 rounded-xl gradient-button text-white font-semibold text-sm flex items-center gap-2 shadow-xl shadow-purple-500/25"
          >
            Start Another Mock Session
          </Link>
        </div>
      </main>
    </div>
  );
}
