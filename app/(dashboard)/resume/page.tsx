'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { ResumeService } from '@/services/resume-service';
import { ResumeData } from '@/types';
import { Upload, FileText, CheckCircle2, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

export default function ResumeUploadPage() {
  const router = useRouter();
  const [activeResume, setActiveResume] = useState<ResumeData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const res = ResumeService.getActiveResume();
    setActiveResume(res);
  }, []);

  const handleSimulatedUpload = (file: File) => {
    setIsUploading(true);
    setUploadSuccess(false);

    setTimeout(() => {
      const newResume: ResumeData = {
        id: `res-${Date.now()}`,
        user_id: 'user-demo-1',
        file_name: file.name,
        file_url: '#',
        parsed_data: {
          skills: ['TypeScript', 'Next.js 15', 'React 19', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'AI Engineering'],
          experience_years: 3,
          summary: `Extracted from ${file.name}: Experienced software engineer specialized in full-stack architecture, microservices, and AI SaaS integrations.`,
          top_roles: ['Full Stack Dev @ TechCorp', 'Frontend Specialist @ WebFlow'],
          projects: ['AI Interview Agent SaaS', 'High-throughput Cloud Storage Gateway'],
          education: ['B.S. Computer Science'],
        },
        created_at: new Date().toISOString(),
      };

      ResumeService.setActiveResume(newResume);
      setActiveResume(newResume);
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSimulatedUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <DashboardHeader />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Step 1 of Setup
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3">Resume Upload & Parsing</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Upload your candidate PDF resume to automatically personalize AI interview questions for your background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* File Drag Drop Zone */}
          <div className="glass-card p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Upload Resume PDF</h2>
              <p className="text-xs text-slate-500 mb-6">
                Supports PDF format up to 10MB. Text will be parsed automatically.
              </p>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-slate-50 hover:border-blue-400'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4">
                  {isUploading ? (
                    <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                  ) : (
                    <Upload className="w-6 h-6 text-blue-600" />
                  )}
                </div>

                <p className="text-sm font-bold text-slate-900">
                  {isUploading ? 'Parsing Resume PDF...' : 'Drag & Drop PDF here'}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium">or click to browse local files</p>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleSimulatedUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  id="resume-file-input"
                />
                <label
                  htmlFor="resume-file-input"
                  className="inline-block mt-4 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  Browse Computer
                </label>
              </div>
            </div>

            {uploadSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-600 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> Resume parsed successfully! Personalization ready.
              </div>
            )}
          </div>

          {/* Parsed Information Preview */}
          <div className="glass-card p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" /> Parsed Intelligence
                </h2>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-mono font-bold">
                  Active Profile
                </span>
              </div>

              {activeResume ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1 font-mono uppercase text-[10px] font-semibold">File Name</span>
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" /> {activeResume.file_name}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1 font-mono uppercase text-[10px] font-semibold">Summary</span>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 font-medium">
                      {activeResume.parsed_data?.summary}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-2 font-mono uppercase text-[10px] font-semibold">Extracted Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeResume.parsed_data?.skills?.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-[11px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-12 text-center">No resume uploaded yet.</p>
              )}
            </div>

            <button
              onClick={() => router.push('/setup')}
              className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              Proceed to Interview Setup <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
