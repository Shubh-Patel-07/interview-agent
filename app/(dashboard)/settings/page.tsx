'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { Settings, Save, CheckCircle2, User, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [candidateName, setCandidateName] = useState('Alex Dev');
  const [email, setEmail] = useState('alex@dev.com');
  const [voiceSpeed, setVoiceSpeed] = useState('1.0x');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900">
      <DashboardHeader />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Candidate Preferences
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 flex items-center gap-3">
            <Settings className="w-7 h-7 text-blue-600" /> Account & Agent Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Configure your candidate profile parameters and AI speech playback options.
          </p>
        </div>

        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Candidate preferences updated!
          </motion.div>
        )}

        <form onSubmit={handleSave} className="glass-card p-8 rounded-3xl border border-slate-200/80 bg-white/95 space-y-8 shadow-sm">
          {/* Candidate Profile Info */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" /> Candidate Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">Full Name</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Voice Output Options */}
          <div className="pt-6 border-t border-slate-200/80">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" /> AI Voice Speech Settings
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Voice Playback Speed</label>
              <div className="flex gap-3">
                {['0.8x', '1.0x', '1.2x', '1.5x'].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setVoiceSpeed(speed)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      voiceSpeed === speed
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save Action Bar */}
          <div className="pt-6 border-t border-slate-200/80 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl gradient-button text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
