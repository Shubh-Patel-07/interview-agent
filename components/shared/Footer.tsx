import Link from 'next/link';
import { Bot, Code, Globe, Share2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 relative overflow-hidden">
      <div className="glow-blue -top-40 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/60">
          {/* Col 1 */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px] shadow-sm">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-slate-900">Steer<span className="gradient-text font-black">Hire</span></span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              SteerHire is the award-winning AI interview platform built like Linear, Vercel, and OpenAI. Elevating candidates with adaptive live interview practice.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Product Suite</h4>
            <Link href="#features" className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium">AI Adaptive Probing Engine</Link>
            <Link href="#how-it-works" className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium">Resume PDF Intelligence</Link>
            <Link href="#pricing" className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium">Pricing & Plans</Link>
            <Link href="/dashboard" className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium">Performance Analytics</Link>
            <Link href="/setup" className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium">Mock Session Setup</Link>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Supported Roles</h4>
            <span className="text-xs text-slate-500 font-medium">Full Stack Engineer</span>
            <span className="text-xs text-slate-500 font-medium">Frontend Architecture</span>
            <span className="text-xs text-slate-500 font-medium">Backend / Systems Engineer</span>
            <span className="text-xs text-slate-500 font-medium">AI / ML Specialist</span>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Hackathon Showcase</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Engineered using Next.js 15 App Router, Tailwind CSS, Supabase, and Google Gemini AI.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/Shubh-Patel-07/interview-agent" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors" title="GitHub Codebase">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors" title="Live Preview">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors" title="Share SteerHire">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} SteerHire Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Hackathon Showcase
          </p>
        </div>
      </div>
    </footer>
  );
}
