import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#05070d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="glass-card p-10 sm:p-16 rounded-3xl border border-purple-500/30 relative overflow-hidden shadow-2xl">
          <div className="glow-purple -top-20 left-1/2 -translate-x-1/2 opacity-50 blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Start Practicing Now
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Experience the <br />
            <span className="gradient-text">Future of Technical Interview Prep?</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Upload your resume, configure your target job role, and conduct your first adaptive AI mock interview in under 2 minutes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/setup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white gradient-button flex items-center justify-center gap-2 shadow-xl shadow-purple-500/30 hover:scale-[1.02] transition-transform"
            >
              Start Free AI Interview <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
