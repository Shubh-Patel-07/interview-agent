'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { InterviewService, MOCK_REPORTS } from '@/services/interview-service';
import { InterviewReport, InterviewConfig } from '@/types';
import { Award, CheckCircle2, AlertTriangle, Lightbulb, ArrowLeft, RefreshCw, Download, Sparkles, UserCheck } from 'lucide-react';

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
      setReport(MOCK_REPORTS['demo-int-1']);
    }
  }, [interviewId]);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-900">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <DashboardHeader />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Top Back & Action Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl glass-card glass-card-hover border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-blue-600" /> Export Printable Report
          </button>
        </div>

        {/* Header Hero Banner */}
        <div className="glass-card p-8 rounded-3xl border border-blue-500/20 bg-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="glow-blue -top-20 left-1/2 -translate-x-1/2 opacity-30 blur-3xl pointer-events-none" />

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Hiring Committee Evaluation Report
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
              {interview?.job_role || 'Full Stack Engineer'} Mock Interview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Candidate: <strong className="text-slate-900">Alex Dev</strong> • Session ID: <span className="font-mono text-blue-600 font-bold">{interviewId}</span>
            </p>
          </div>

          {/* Hiring Recommendation Badge */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Hiring Committee Decision</span>
            <div className="px-5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-base font-black flex items-center gap-2 shadow-sm">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              {report.hiring_recommendation}
            </div>
          </div>
        </div>

        {/* Scorecards & Gauge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass-card p-5 rounded-3xl border border-blue-500/30 bg-white text-center flex flex-col items-center justify-center shadow-sm">
            <ScoreRing score={report.overall_score} size={110} strokeWidth={8} />
          </div>
          <div className="glass-card p-5 rounded-3xl border border-slate-200/80 bg-white text-center flex flex-col items-center justify-center shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Technical Depth</span>
            <h2 className="text-3xl font-black text-blue-600 mt-2">{report.technical_score}%</h2>
          </div>
          <div className="glass-card p-5 rounded-3xl border border-slate-200/80 bg-white text-center flex flex-col items-center justify-center shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Communication</span>
            <h2 className="text-3xl font-black text-emerald-600 mt-2">{report.communication_score}%</h2>
          </div>
          <div className="glass-card p-5 rounded-3xl border border-slate-200/80 bg-white text-center flex flex-col items-center justify-center shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Confidence</span>
            <h2 className="text-3xl font-black text-amber-600 mt-2">{report.confidence_score}%</h2>
          </div>
          <div className="glass-card p-5 rounded-3xl border border-slate-200/80 bg-white text-center flex flex-col items-center justify-center shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Problem Solving</span>
            <h2 className="text-3xl font-black text-purple-600 mt-2">{report.problem_solving_score}%</h2>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" /> Executive Evaluation Summary
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-medium">
            "{report.summary}"
          </p>
        </div>

        {/* Strengths, Weaknesses & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths */}
          <div className="glass-card p-6 rounded-3xl border border-emerald-200 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-emerald-600 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Key Strengths
            </h3>
            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              {report.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="glass-card p-6 rounded-3xl border border-rose-200 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-rose-600 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Technical Gaps
            </h3>
            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              {report.weaknesses.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="glass-card p-6 rounded-3xl border border-amber-200 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-amber-600 mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Actionable Plan
            </h3>
            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              {report.improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
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
            className="px-8 py-4 rounded-xl gradient-button text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-blue-500/25"
          >
            Start Another AI Session
          </Link>
        </div>
      </main>
    </div>
  );
}
