import Link from 'next/link';
import { Bot, Code, Globe, Share2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#030408] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="glow-purple -top-40 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1 */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">Interview<span className="gradient-text">Agent</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Build the interviewer, not the interview. The AI-powered SaaS that adapts, challenges, and elevates candidate performance.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product</h4>
            <Link href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">AI Interview Engine</Link>
            <Link href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">Resume Personalization</Link>
            <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">Performance Analytics</Link>
            <Link href="/setup" className="text-sm text-slate-400 hover:text-white transition-colors">Mock Setup</Link>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Supported Roles</h4>
            <span className="text-sm text-slate-400">Full Stack Engineer</span>
            <span className="text-sm text-slate-400">Frontend / UI Engineer</span>
            <span className="text-sm text-slate-400">Backend System Architect</span>
            <span className="text-sm text-slate-400">AI / ML Specialist</span>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Hackathon Project</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built for hackathon demonstration using Next.js 15, Supabase, Tailwind CSS, & Google Gemini AI.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors" title="GitHub Repository">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors" title="Live Demo">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors" title="Share Project">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} The Interview Agent. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
