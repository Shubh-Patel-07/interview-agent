'use client';

import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid';
import { FileText, Cpu, Award, Zap, BarChart3, Mic, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: <FileText className="w-7 h-7 text-purple-600" />,
    title: 'Resume Intelligence Parsing',
    description: 'Upload your PDF resume. Our parser extracts your skills, tools, and project history to craft interview questions customized strictly to your background.',
    className: 'md:col-span-2',
  },
  {
    icon: <Cpu className="w-7 h-7 text-blue-600" />,
    title: 'Adaptive AI Probing Engine',
    description: 'Unlike static quiz bots, our interviewer adjusts questions dynamically based on your previous answers. Give a deep answer, and it probes further into architecture.',
    className: 'md:col-span-1',
  },
  {
    icon: <Mic className="w-7 h-7 text-emerald-600" />,
    title: 'Voice Speech Output & Input',
    description: 'Answer questions naturally using real-time voice speech-to-text conversion or read out loud with natural Text-to-Speech synthesis.',
    className: 'md:col-span-1',
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-amber-600" />,
    title: 'Hiring Committee Report',
    description: 'Receive an instant report broken down by Technical Accuracy, Communication, Confidence, and Problem Solving with clear hiring recommendations.',
    className: 'md:col-span-2',
  },
  {
    icon: <Zap className="w-7 h-7 text-indigo-600" />,
    title: 'Custom Roles & Difficulty Probes',
    description: 'Select your target job role (Frontend, Full-Stack, AI/ML, DevOps), interview difficulty (Easy, Medium, Hard, FAANG), and duration.',
    className: 'md:col-span-1.5',
  },
  {
    icon: <Award className="w-7 h-7 text-rose-600" />,
    title: 'Actionable Candidate Feedback',
    description: 'Get targeted strengths, critical skill gaps, and step-by-step improvement recommendations after every single interview session.',
    className: 'md:col-span-1.5',
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 relative bg-[#f8fafc] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Bento Capability Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Engineered like a <span className="gradient-text font-black">Real Interviewer</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg font-normal">
            Everything you need to practice under realistic technical interview conditions and land your dream offer.
          </p>
        </motion.div>

        <BentoGrid>
          {FEATURES.map((item, idx) => (
            <BentoCard
              key={idx}
              idx={idx}
              title={item.title}
              description={item.description}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
