import { ResumeData } from '@/types';

export const MOCK_RESUME: ResumeData = {
  id: 'res-demo-1',
  user_id: 'user-demo-1',
  file_name: 'Alex_Dev_Resume.pdf',
  file_url: '#',
  parsed_data: {
    skills: ['TypeScript', 'React.js', 'Next.js 15', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'GraphQL'],
    experience_years: 4,
    summary: 'Full Stack Engineer with 4 years of experience delivering high-performance SaaS applications and real-time AI solutions.',
    top_roles: ['Senior Frontend Dev @ Acme Tech', 'Full Stack Engineer @ CloudFlow'],
    projects: ['AI Voice Synthesizer App', 'High-throughput Microservices Gateway', 'E-commerce Real-time Analytics'],
    education: ['B.S. in Computer Science - State University'],
  },
  created_at: new Date().toISOString(),
};

export class ResumeService {
  static getActiveResume(): ResumeData | null {
    if (typeof window === 'undefined') return MOCK_RESUME;
    const stored = localStorage.getItem('interview_agent_resume');
    if (!stored) {
      localStorage.setItem('interview_agent_resume', JSON.stringify(MOCK_RESUME));
      return MOCK_RESUME;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return MOCK_RESUME;
    }
  }

  static setActiveResume(resume: ResumeData) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('interview_agent_resume', JSON.stringify(resume));
  }
}
