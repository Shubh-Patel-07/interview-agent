'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { RecentInterviewsTable } from '@/components/dashboard/RecentInterviewsTable';
import { InterviewService } from '@/services/interview-service';
import { History, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function InterviewHistoryPage() {
  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    const list = InterviewService.getLocalInterviews();
    setInterviews(list);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100">
      <DashboardHeader />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Mock History
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-3 flex items-center gap-3">
              <History className="w-7 h-7 text-purple-400" /> Past Interview Sessions
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Review all completed and in-progress AI mock interviews.
            </p>
          </div>

          <Link
            href="/setup"
            className="px-5 py-2.5 rounded-xl gradient-button text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-purple-500/25"
          >
            <PlusCircle className="w-4 h-4" /> Start New Interview
          </Link>
        </div>

        <RecentInterviewsTable interviews={interviews} />
      </main>
    </div>
  );
}
