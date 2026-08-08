import Link from 'next/link';
import { Play, FileText, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { InterviewConfig } from '@/types';

interface TableProps {
  interviews: (InterviewConfig & { id: string; created_at: string; score?: number })[];
}

export function RecentInterviewsTable({ interviews }: TableProps) {
  return (
    <div className="glass-card rounded-3xl border border-slate-200/80 bg-white/95 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Mock Interviews</h3>
          <p className="text-xs text-slate-500">View past sessions, scores, and evaluation reports</p>
        </div>
        <Link
          href="/setup"
          className="px-4 py-2 rounded-xl gradient-button text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
        >
          <Play className="w-3.5 h-3.5" /> Start New
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-mono tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3.5 px-6">Job Role</th>
              <th className="py-3.5 px-6">Difficulty</th>
              <th className="py-3.5 px-6">Type</th>
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Score</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {interviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No mock interviews found. Click "Start New" to begin your first interview.
                </td>
              </tr>
            ) : (
              interviews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {item.job_role}
                    <span className="block text-[10px] font-normal text-slate-400">{item.experience_level}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-semibold text-slate-700">
                      {item.difficulty}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">{item.interview_type}</td>
                  <td className="py-4 px-6 text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(item.created_at)}
                  </td>
                  <td className="py-4 px-6">
                    {item.score ? (
                      <span className="px-2.5 py-1 rounded-full border text-xs font-black bg-blue-50 text-blue-600 border-blue-200">
                        {item.score}%
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">In Progress</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/interview/${item.id}/report`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 text-xs font-bold transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> View Report
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
