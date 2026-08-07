'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { User, Bell, Shield, Volume2, Save, CheckCircle2, Sparkles, Sliders } from 'lucide-react';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Alex Dev');
  const [email, setEmail] = useState('alex.dev@example.com');
  const [voiceRate, setVoiceRate] = useState('1.0');
  const [targetRole, setTargetRole] = useState('Full Stack Engineer');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100">
      <DashboardHeader />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Account Preferences
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-3 flex items-center gap-3">
            <Sliders className="w-7 h-7 text-indigo-400" /> Candidate Profile & Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your interview environment, speech synthesis speed, and default target roles.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Preferences saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="glass-card p-8 rounded-3xl border border-white/10 space-y-8">
          {/* Section 1: Candidate Identity */}
          <div>
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" /> Candidate Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>

          {/* Section 2: AI Voice & Environment */}
          <div className="pt-6 border-t border-white/10">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-400" /> AI Speech Synthesis Voice Speed
            </h2>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {['0.8x (Slow)', '1.0x (Normal)', '1.2x (Fast)'].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setVoiceRate(speed)}
                  className={`p-3 rounded-xl border font-semibold transition-all ${
                    voiceRate === speed
                      ? 'bg-purple-600/30 border-purple-500 text-white'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Target Role */}
          <div className="pt-6 border-t border-white/10">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Default Target Interview Domain
            </h2>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full glass-input rounded-xl px-4 py-3 text-xs text-white bg-[#0c101d]"
            >
              <option value="Full Stack Engineer">Full Stack Engineer</option>
              <option value="Frontend Architecture">Frontend Architecture</option>
              <option value="Backend System Architect">Backend System Architect</option>
              <option value="AI / ML Engineer">AI / ML Engineer</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl gradient-button text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
