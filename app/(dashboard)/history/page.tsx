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
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900">
      <DashboardHeader />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Mock History
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-3 flex items-center gap-3">
              <History className="w-7 h-7 text-blue-600" /> Past Interview Sessions
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              Review all completed and in-progress AI mock interviews.
            </p>
          </div>

          <Link
            href="/setup"
            className="px-5 py-2.5 rounded-xl gradient-button text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <PlusCircle className="w-4 h-4" /> Start New Interview
          </Link>
        </div>

        <RecentInterviewsTable interviews={interviews} />
      </main>
    </div>
  );
}
