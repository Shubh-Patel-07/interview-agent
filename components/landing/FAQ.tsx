'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'How does SteerHire personalize interview questions to my resume?',
    answer: 'When you upload your PDF resume, SteerHire extracts key technical skills, experience years, and past project architectures. The AI Interviewer uses this context to ask targeted, role-specific questions rather than generic templates.',
  },
  {
    question: 'Can I practice with both speech voice and text input?',
    answer: 'Yes! SteerHire features real-time Web Speech Recognition (Speech-to-Text) so you can speak your answers naturally as if in a real video interview, as well as AI Text-to-Speech output that speaks questions back to you out loud.',
  },
  {
    question: 'How are the hiring recommendation reports generated?',
    answer: 'At the end of every interview session, our AI Hiring Committee chair analyzes your entire answer trajectory across Technical Depth, Communication Clarity, Confidence, and Problem-Solving capabilities to produce actionable feedback and scorecards.',
  },
  {
    question: 'Is SteerHire free to use during the hackathon demo?',
    answer: 'Yes! You can launch full candidate mock sessions, test speech recognition, upload resumes, and generate evaluation reports without needing any paid API keys or registration.',
  },
  {
    question: 'What job roles and difficulty levels are supported?',
    answer: 'SteerHire supports Frontend, Backend, Full-Stack, Data Science, DevOps, UI/UX, Product Management, and AI/ML Engineer roles across Junior, Mid-Level, Senior, and FAANG adaptive difficulty probes.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 relative bg-[#05070d] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
            Everything You Need to Know About SteerHire
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-base hover:text-indigo-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-400 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
