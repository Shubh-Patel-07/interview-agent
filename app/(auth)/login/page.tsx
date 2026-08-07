'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      // In demo mode for hackathon, allow login redirect if Supabase isn't configured
      if (authError.message.includes('placeholder') || authError.message.includes('Invalid API key')) {
        router.push('/dashboard');
        return;
      }
      setError(authError.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070d] p-4 relative overflow-hidden bg-grid-pattern">
      <div className="glow-purple top-1/4 left-1/2 -translate-x-1/2 opacity-30 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Interview<span className="gradient-text">Agent</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to your candidate account</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@example.com"
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-button text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <span className="relative px-3 bg-[#0c101d] text-xs text-slate-400">OR</span>
          </div>

          <button
            onClick={handleDemoLogin}
            type="button"
            className="w-full py-2.5 rounded-xl glass-card glass-card-hover border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            One-Click Demo Guest Sign In
          </button>

          <p className="text-center text-xs text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-400 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
