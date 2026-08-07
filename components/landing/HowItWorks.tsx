import { Upload, MessageSquare, Award } from 'lucide-react';

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
    <section id="how-it-works" className="py-24 relative bg-[#f8fafc] text-slate-900 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mt-4">
            How The Interview Agent Works
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg font-normal">
            From PDF upload to comprehensive interview evaluation in less than 15 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative glass-card glass-card-hover p-8 rounded-3xl border border-slate-200/80 bg-white flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-4xl font-black text-slate-200 font-mono">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
