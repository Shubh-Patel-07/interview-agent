'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { ResumeService } from '@/services/resume-service';
import { InterviewService } from '@/services/interview-service';
import { JobRole, ExperienceLevel, InterviewDifficulty, InterviewType, InterviewConfig } from '@/types';
import { Bot, Sparkles, Check, ArrowRight, ShieldCheck, Clock, Settings, FileText } from 'lucide-react';

const JOB_ROLES: JobRole[] = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Engineer',
  'Data Scientist',
  'DevOps / Cloud Engineer',
  'Product Manager',
  'UI/UX Designer',
  'AI/ML Engineer',
];

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Junior (0-2 yrs)',
  'Mid-Level (2-5 yrs)',
  'Senior (5+ yrs)',
  'Lead / Principal',
];

const DIFFICULTIES: InterviewDifficulty[] = [
  'Easy',
  'Medium',
  'Hard',
  'Faang / Adaptive',
];

const INTERVIEW_TYPES: InterviewType[] = [
  'Technical Coding',
  'System Design',
  'Behavioral & Leadership',
  'General Mixed',
];

export default function InterviewSetupPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<JobRole>('Full Stack Engineer');
  const [selectedExp, setSelectedExp] = useState<ExperienceLevel>('Mid-Level (2-5 yrs)');
  const [selectedDiff, setSelectedDiff] = useState<InterviewDifficulty>('Medium');
  const [selectedType, setSelectedType] = useState<InterviewType>('Technical Coding');
  const [duration, setDuration] = useState<number>(30);
  const [resumeActive, setResumeActive] = useState(false);

  useEffect(() => {
    const resume = ResumeService.getActiveResume();
    if (resume) setResumeActive(true);
  }, []);

  const handleStartInterview = () => {
    const newInterviewId = `int-${Date.now()}`;
    const newInterview: InterviewConfig & { id: string; created_at: string } = {
      id: newInterviewId,
      job_role: selectedRole,
      experience_level: selectedExp,
      difficulty: selectedDiff,
      interview_type: selectedType,
      duration_minutes: duration,
      status: 'in_progress',
      created_at: new Date().toISOString(),
    };

    InterviewService.saveLocalInterview(newInterview);
    router.push(`/interview/${newInterviewId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100">
      <DashboardHeader />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Step 2 of Setup
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-3">Configure Mock Interview</h1>
          <p className="text-sm text-slate-400 mt-1">
            Customize role domain, difficulty probe, and interview constraints before launching the AI agent.
          </p>
        </div>

        {/* Setup Form Grid */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-8">
          {/* Section 1: Job Role Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              1. Target Job Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {JOB_ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    selectedRole === role
                      ? 'bg-purple-600/30 border-purple-500 text-white shadow-md shadow-purple-500/20'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Experience Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              2. Experience Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {EXPERIENCE_LEVELS.map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => setSelectedExp(exp)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    selectedExp === exp
                      ? 'bg-purple-600/30 border-purple-500 text-white'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Difficulty & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                3. Probing Difficulty
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDiff(diff)}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                      selectedDiff === diff
                        ? 'bg-cyan-600/30 border-cyan-500 text-white'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                4. Interview Type
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {INTERVIEW_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                      selectedType === type
                        ? 'bg-cyan-600/30 border-cyan-500 text-white'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
              <span>5. Target Session Duration</span>
              <span className="text-purple-400 font-mono">{duration} Minutes</span>
            </label>
            <div className="flex gap-4">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDuration(mins)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold ${
                    duration === mins
                      ? 'bg-purple-600/30 border-purple-500 text-white'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {mins} mins
                </button>
              ))}
            </div>
          </div>

          {/* Action Launch Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Resume personalizations active</span>
            </div>

            <button
              onClick={handleStartInterview}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl gradient-button text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-purple-500/25"
            >
              <Bot className="w-4 h-4 text-purple-200" />
              Launch AI Interview Agent <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
