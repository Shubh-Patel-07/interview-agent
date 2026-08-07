import Link from 'next/link';
import { Play, FileText, ArrowUpRight, Clock, Award } from 'lucide-react';
import { formatDate, getScoreColor } from '@/lib/utils';
import { InterviewConfig } from '@/types';

interface TableProps {
  interviews: (InterviewConfig & { id: string; created_at: string; score?: number })[];
}

export function RecentInterviewsTable({ interviews }: TableProps) {
  return (
    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Recent Mock Interviews</h3>
          <p className="text-xs text-slate-400">View past sessions, scores, and evaluation reports</p>
        </div>
        <Link
          href="/setup"
          className="px-3.5 py-1.5 rounded-xl gradient-button text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-500/20"
        >
          <Play className="w-3.5 h-3.5" /> Start New
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono tracking-wider border-b border-white/5">
            <tr>
              <th className="py-3.5 px-6">Job Role</th>
              <th className="py-3.5 px-6">Difficulty</th>
              <th className="py-3.5 px-6">Type</th>
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Score</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {interviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  No mock interviews found. Click "Start New" to begin your first interview.
                </td>
              </tr>
            ) : (
              interviews.map((item) => {
                const scoreStyle = item.score ? getScoreColor(item.score) : { text: 'text-slate-400', bg: 'bg-slate-800', border: 'border-slate-700' };
                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      {item.job_role}
                      <span className="block text-[10px] font-normal text-slate-400">{item.experience_level}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-mono">
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400">{item.interview_type}</td>
                    <td className="py-4 px-6 text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {formatDate(item.created_at)}
                    </td>
                    <td className="py-4 px-6">
                      {item.score ? (
                        <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${scoreStyle.bg} ${scoreStyle.text} ${scoreStyle.border}`}>
                          {item.score}%
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono">In Progress</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/interview/${item.id}/report`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 text-xs font-medium transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Report
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
