import { InterviewConfig, InterviewQuestion, InterviewReport } from '@/types';

// Mock baseline dataset for fallback/demo mode when Supabase credentials are not connected
export const MOCK_INTERVIEWS: (InterviewConfig & { id: string; created_at: string; score?: number })[] = [
  {
    id: 'demo-int-1',
    job_role: 'Full Stack Engineer',
    experience_level: 'Mid-Level (2-5 yrs)',
    difficulty: 'Medium',
    interview_type: 'Technical Coding',
    duration_minutes: 30,
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    score: 88,
  },
  {
    id: 'demo-int-2',
    job_role: 'Frontend Developer',
    experience_level: 'Junior (0-2 yrs)',
    difficulty: 'Easy',
    interview_type: 'Behavioral & Leadership',
    duration_minutes: 20,
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    score: 76,
  },
  {
    id: 'demo-int-3',
    job_role: 'AI/ML Engineer',
    experience_level: 'Senior (5+ yrs)',
    difficulty: 'Faang / Adaptive',
    interview_type: 'System Design',
    duration_minutes: 45,
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    score: 92,
  },
];

export const MOCK_REPORTS: Record<string, InterviewReport> = {
  'demo-int-1': {
    id: 'rep-1',
    interview_id: 'demo-int-1',
    overall_score: 88,
    technical_score: 90,
    communication_score: 85,
    confidence_score: 84,
    problem_solving_score: 92,
    strengths: [
      'Strong grasp of React 19 Server Components and Next.js App Router',
      'Effective explanation of database index strategies under high concurrency',
      'Articulate communication when detailing trade-offs during system design',
    ],
    weaknesses: [
      'Slight hesitation when asked about edge-case optimistic UI rollbacks',
      'Could provide more concrete memory profiling metrics',
    ],
    improvements: [
      'Practice explaining optimistic state updates using standard retry queues',
      'Deepen knowledge of Web Socket fallback connection pooling',
      'Use STAR framework consistently for behavioral follow-ups',
    ],
    hiring_recommendation: 'Strong Hire',
    summary: 'The candidate demonstrated impressive technical depth in modern Full-Stack architecture with Next.js and PostgreSQL. Excellent problem-solving capabilities with clean communication.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
};

export class InterviewService {
  static getLocalInterviews(): (InterviewConfig & { id: string; created_at: string; score?: number })[] {
    if (typeof window === 'undefined') return MOCK_INTERVIEWS;
    const stored = localStorage.getItem('interview_agent_interviews');
    if (!stored) {
      localStorage.setItem('interview_agent_interviews', JSON.stringify(MOCK_INTERVIEWS));
      return MOCK_INTERVIEWS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return MOCK_INTERVIEWS;
    }
  }

  static saveLocalInterview(interview: InterviewConfig & { id: string; created_at: string; score?: number }) {
    if (typeof window === 'undefined') return;
    const current = this.getLocalInterviews();
    const existingIndex = current.findIndex(i => i.id === interview.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = interview;
    } else {
      updated = [interview, ...current];
    }
    localStorage.setItem('interview_agent_interviews', JSON.stringify(updated));
  }

  static getLocalReport(interviewId: string): InterviewReport | null {
    if (MOCK_REPORTS[interviewId]) return MOCK_REPORTS[interviewId];
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(`interview_report_${interviewId}`);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  static saveLocalReport(report: InterviewReport) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`interview_report_${report.interview_id}`, JSON.stringify(report));
  }
}
