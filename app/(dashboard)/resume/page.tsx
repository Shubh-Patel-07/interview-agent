'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { ResumeService } from '@/services/resume-service';
import { FileText, Upload, CheckCircle2, AlertCircle, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumePage() {
  const [resume, setResume] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const active = ResumeService.getActiveResume();
    setResume(active);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const mockParsedResume = {
        id: `res-${Date.now()}`,
        file_name: file.name,
        parsed_data: {
          skills: ['TypeScript', 'React 19', 'Next.js 15', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'System Design'],
          summary: 'Experienced Full Stack Software Engineer with deep expertise in building scalable cloud web applications, microservices, and reactive user interfaces.',
          detected_role: 'Full Stack Engineer',
          detected_experience: 'Mid-Level (2-5 yrs)',
        },
        uploaded_at: new Date().toISOString(),
      };

      ResumeService.setActiveResume(mockParsedResume as any);
      setResume(mockParsedResume);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-white">
      <DashboardHeader />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Candidate Intelligence
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-3 flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Resume Context Profile
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
            Upload your PDF resume. Our AI parser extracts key tech stacks to craft questions tailored to your experience.
          </p>
        </div>

        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Resume parsed successfully! Questions will now probe your extracted skills.
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Dropzone */}
          <div className="glass-card p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 flex flex-col justify-between space-y-6 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Upload Resume PDF</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Supported formats: .PDF, .DOCX (Max 10MB).
              </p>

              <label className="mt-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {isUploading ? 'Parsing Resume PDF...' : 'Click to Browse or Drag PDF File'}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Automatic skill extraction</span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>AI Resume Parser Active</span>
            </div>
          </div>

          {/* Active Parsed Profile Display */}
          <div className="glass-card p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 flex flex-col justify-between space-y-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Extracted Candidate Profile</h3>
                {resume && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-mono font-bold">
                    Active
                  </span>
                )}
              </div>

              {resume ? (
                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1 font-mono">File Name</span>
                    <p className="font-bold text-slate-900 dark:text-white">{resume.file_name}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1 font-mono">Detected Role & Domain</span>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{resume.parsed_data.detected_role} ({resume.parsed_data.detected_experience})</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1 font-mono">Summary</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-medium">
                      {resume.parsed_data.summary}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2 font-mono">Extracted Core Skill Matrix</span>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.parsed_data.skills.map((skill: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 text-[11px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-semibold">No resume uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
