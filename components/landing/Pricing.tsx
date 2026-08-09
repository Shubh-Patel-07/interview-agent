'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const PLANS = [
  {
    name: 'Hackathon Demo',
    price: '$0',
    description: 'Perfect for exploring SteerHire live candidate features.',
    features: [
      'Unlimited AI Mock Interviews',
      'PDF Resume Intelligence Parsing',
      'Speech Synthesis Voice Output',
      'Instant Hiring Scorecard Report',
      'Full Access to All 8 Technical Roles',
    ],
    cta: 'Start Free Session',
    popular: false,
  },
  {
    name: 'Pro Candidate Pass',
    price: '$19',
    period: '/ month',
    description: 'For serious job seekers aiming for FAANG & top tech offers.',
    features: [
      'Everything in Demo Pass',
      'FAANG Probing Adaptive Mode',
      'Live Code Sandbox Code Reviews',
      'Unlimited PDF Report Downloads',
      'Priority Gemini 2.5 API Processing',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">
            Practice for Free During Hackathon
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-normal">
            No credit card required. Experience candidate coaching in under 2 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`glass-card glass-card-hover p-8 rounded-3xl border flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-blue-500/40 shadow-xl bg-white/95 ring-2 ring-blue-500/20'
                  : 'border-slate-200/80 bg-white/95'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  {plan.popular && (
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[11px] font-bold inline-flex items-center gap-1.5 shrink-0 shadow-sm">
                      <Sparkles className="w-3 h-3 text-blue-600 fill-blue-600" />
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-xs text-slate-400 font-medium">{plan.period}</span>}
                </div>

                <ul className="mt-8 space-y-3 text-xs text-slate-600 font-medium">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/setup"
                className={`mt-8 w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? 'gradient-button text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
