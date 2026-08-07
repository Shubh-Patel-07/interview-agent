'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { User, Volume2, Save, CheckCircle2, Sparkles, Sliders } from 'lucide-react';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Alex Dev');
  const [email, setEmail] = useState('alex.dev@example.com');
  const [voiceRate, setVoiceRate] = useState('1.0x (Normal)');
  const [targetRole, setTargetRole] = useState('Full Stack Engineer');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <DashboardHeader />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Account Preferences
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 flex items-center gap-3">
            <Sliders className="w-7 h-7 text-blue-600" /> Candidate Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage your interview environment, speech synthesis speed, and default target roles.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Preferences saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="glass-card p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-8">
          {/* Section 1: Candidate Identity */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" /> Candidate Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-900 font-semibold outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-900 font-semibold outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: AI Voice & Environment */}
          <div className="pt-6 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-600" /> AI Speech Synthesis Voice Speed
            </h2>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {['0.8x (Slow)', '1.0x (Normal)', '1.2x (Fast)'].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setVoiceRate(speed)}
                  className={`p-3 rounded-2xl border font-bold transition-all ${
                    voiceRate === speed
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Target Role */}
          <div className="pt-6 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> Default Target Interview Domain
            </h2>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none"
            >
              <option value="Full Stack Engineer">Full Stack Engineer</option>
              <option value="Frontend Architecture">Frontend Architecture</option>
              <option value="Backend System Architect">Backend System Architect</option>
              <option value="AI / ML Engineer">AI / ML Engineer</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl gradient-button text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
