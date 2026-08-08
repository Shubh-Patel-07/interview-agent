import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="glass-card p-10 sm:p-16 rounded-3xl border border-blue-500/20 bg-white/95 relative overflow-hidden shadow-xl">
          <div className="glow-blue -top-20 left-1/2 -translate-x-1/2 opacity-30 blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Accelerate Your Engineering Career
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Ready to Practice with <br />
            <span className="gradient-text font-black">SteerHire AI Interview Agent?</span>
          </h2>

          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Upload your resume, select your target tech role, and experience the future of AI technical interview practice in under 2 minutes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/setup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white gradient-button flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 hover:scale-[1.02] transition-transform"
            >
              Launch SteerHire AI Session <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
