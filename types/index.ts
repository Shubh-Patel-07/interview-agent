export type JobRole = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Engineer'
  | 'Data Scientist'
  | 'DevOps / Cloud Engineer'
  | 'Product Manager'
  | 'UI/UX Designer'
  | 'AI/ML Engineer';

export type ExperienceLevel = 'Junior (0-2 yrs)' | 'Mid-Level (2-5 yrs)' | 'Senior (5+ yrs)' | 'Lead / Principal';

export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Faang / Adaptive';

export type InterviewType = 'Technical Coding' | 'System Design' | 'Behavioral & Leadership' | 'General Mixed';

export type InterviewStatus = 'setup' | 'in_progress' | 'completed' | 'abandoned';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface ResumeData {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  raw_text?: string;
  parsed_data: {
    skills: string[];
    experience_years?: number;
    summary?: string;
    top_roles?: string[];
    projects?: string[];
    education?: string[];
  };
  created_at: string;
}

export interface InterviewConfig {
  id?: string;
  user_id?: string;
  resume_id?: string;
  job_role: JobRole;
  experience_level: ExperienceLevel;
  difficulty: InterviewDifficulty;
  interview_type: InterviewType;
  duration_minutes: number;
  status: InterviewStatus;
  created_at?: string;
}

export interface InterviewQuestion {
  id: string;
  interview_id: string;
  question_number: number;
  question_text: string;
  user_answer?: string;
  ai_feedback?: string;
  score?: number;
  answered_at?: string;
}

export interface InterviewReport {
  id: string;
  interview_id: string;
  overall_score: number;
  technical_score: number;
  communication_score: number;
  confidence_score: number;
  problem_solving_score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  hiring_recommendation: 'Strong Hire' | 'Hire' | 'Weak Hire' | 'Do Not Hire';
  summary: string;
  created_at: string;
}
