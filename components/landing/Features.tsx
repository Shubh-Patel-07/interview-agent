'use client';

import { motion } from 'framer-motion';
import { FileText, Cpu, Award, Zap, BarChart3, Mic, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: FileText,
    title: 'Resume Intelligence Parsing',
    description: 'Upload your PDF resume. Our parser extracts your skills, tools, and project history to craft interview questions customized strictly to your background.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    icon: Cpu,
    title: 'Adaptive AI Probing Engine',
    description: 'Unlike static quiz bots, our interviewer adjusts questions dynamically based on your previous answers. Give a deep answer, and it probes further into architecture.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: Mic,
    title: 'Voice Speech Output & Input',
    description: 'Answer questions naturally using real-time voice speech-to-text conversion or read out loud with natural Text-to-Speech synthesis.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icon: BarChart3,
    title: 'Hiring Committee Report',
    description: 'Receive an instant report broken down by Technical Accuracy, Communication, Confidence, and Problem Solving with clear hiring recommendations.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: Zap,
    title: 'Custom Roles & Difficulty Probes',
    description: 'Select your target job role (Frontend, Full-Stack, AI/ML, DevOps), interview difficulty (Easy, Medium, Hard, FAANG), and duration.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    icon: Award,
    title: 'Actionable Candidate Feedback',
    description: 'Get targeted strengths, critical skill gaps, and step-by-step improvement recommendations after every single interview session.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Key Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Engineered like a <span className="gradient-text">Real Interviewer</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg font-normal">
            Everything you need to practice under realistic technical interview conditions and land your dream offer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-slate-200/80 bg-white flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
