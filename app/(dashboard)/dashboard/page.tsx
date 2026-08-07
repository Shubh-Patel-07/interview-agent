'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { AnalyticsCards } from '@/components/dashboard/AnalyticsCards';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { RecentInterviewsTable } from '@/components/dashboard/RecentInterviewsTable';
import { InterviewService } from '@/services/interview-service';
import { ResumeService } from '@/services/resume-service';
import { PlusCircle, FileText, Sparkles, Command, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    const list = InterviewService.getLocalInterviews();
    const activeResume = ResumeService.getActiveResume();
    setInterviews(list);
    setResume(activeResume);
  }, []);

  const totalInterviews = interviews.length;
  const avgScore = interviews.reduce((acc, curr) => acc + (curr.score || 80), 0) / (totalInterviews || 1);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <DashboardHeader />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Futuristic AI Workspace Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 sm:p-8 rounded-3xl border border-blue-500/20 bg-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm"
        >
          <div className="glow-blue -top-20 left-10 opacity-30 blur-3xl pointer-events-none" />

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold">
              <Command className="w-3.5 h-3.5 text-blue-600" /> Candidate AI Command Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Welcome back, <span className="gradient-text font-black">Alex Dev</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
              Your candidate profile is active for <strong className="text-blue-600 font-bold">Full Stack Engineering</strong>. Press <kbd className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[10px] font-bold">Cmd + K</kbd> to trigger instant mock setup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/resume"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              {resume ? 'Resume Parsed' : 'Upload Resume'}
            </Link>

            <Link
              href="/setup"
              className="px-5 py-2.5 rounded-xl gradient-button text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              Start New AI Interview
            </Link>
          </div>
        </motion.div>

        {/* Top Analytics Cards */}
        <AnalyticsCards
          totalInterviews={totalInterviews}
          avgScore={Math.round(avgScore)}
          techScore={88}
          commScore={85}
        />

        {/* Progression Chart & Resume Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" /> Resume Context Profile
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-mono font-bold">
                  Parsed
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900">{resume?.file_name || 'Alex_Dev_Resume.pdf'}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                {resume?.parsed_data?.summary || '4 years experience with React 19, Next.js 15 App Router, PostgreSQL, and Node.js.'}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 font-mono">Detected Core Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {(resume?.parsed_data?.skills || ['TypeScript', 'Next.js 15', 'PostgreSQL', 'Tailwind', 'AI API']).map((skill: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] text-slate-700 font-semibold border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/resume"
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-center text-xs font-bold text-blue-600 border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
            >
              Update Resume Context <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Recent Interviews Table */}
        <RecentInterviewsTable interviews={interviews} />
      </main>
    </div>
  );
}
