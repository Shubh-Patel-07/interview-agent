import { FileText, Cpu, Award, Zap, ShieldCheck, BarChart3, Mic, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: FileText,
    title: 'Resume Personalization',
    description: 'Upload your PDF resume. Our parser extracts your skills, tools, and project history to craft interview questions customized strictly to your experience level.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Cpu,
    title: 'Adaptive AI Probe Engine',
    description: 'Unlike static quiz bots, our interviewer adjusts questions dynamically based on your previous answers. Give a deep answer, and it probes further into architecture.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Mic,
    title: 'Speech & Text Input',
    description: 'Answer questions naturally using real-time voice speech-to-text conversion or precise text typing, simulating real video call interview pressure.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: BarChart3,
    title: 'Hiring Committee Report',
    description: 'Receive an instant report broken down by Technical Accuracy, Communication, Confidence, and Problem Solving with clear hiring recommendations.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Zap,
    title: 'Custom Role & Difficulty',
    description: 'Select your target job role (Frontend, Full-Stack, AI/ML, DevOps), interview difficulty (Easy, Medium, Hard, FAANG), and duration.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    icon: Award,
    title: 'Actionable Feedback',
    description: 'Get targeted strengths, critical skill gaps, and step-by-step improvement recommendations after every single interview session.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative bg-[#05070d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Key Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Built like a <span className="gradient-text">Real Interviewer</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Everything you need to practice under realistic technical interview conditions and get hired faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
