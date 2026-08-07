import { Upload, MessageSquare, Award, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Upload,
    title: 'Upload Resume & Pick Role',
    description: 'Drop your PDF resume and select your target job role (e.g. Full-Stack, Frontend), experience level, and interview difficulty.',
  },
  {
    num: '02',
    icon: MessageSquare,
    title: 'Live Adaptive AI Session',
    description: 'Engage with the AI interviewer via voice or text. The agent presents dynamic scenarios and probes your answers step-by-step.',
  },
  {
    num: '03',
    icon: Award,
    title: 'Instant Hiring Report',
    description: 'Get an in-depth scorecard with radar breakdown, technical accuracy scores, strengths, weaknesses, and hiring recommendation.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative bg-[#07090e] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4">
            How The Interview Agent Works
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            From PDF upload to comprehensive interview evaluation in less than 15 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative glass-card p-8 rounded-2xl border border-white/10 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-4xl font-extrabold text-white/20 font-mono">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
