import Link from 'next/link';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

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
    <section id="pricing" className="py-24 relative bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
            Practice for Free During Hackathon
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            No credit card required. Experience candidate coaching in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 rounded-3xl border flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-blue-500/40 shadow-2xl bg-white'
                  : 'border-slate-200/80 bg-white/70'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 right-8 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-bold shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-xs text-slate-400 font-medium">{plan.period}</span>}
                </div>

                <ul className="mt-8 space-y-3 text-xs text-slate-600">
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
                className={`mt-8 w-full py-3.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? 'gradient-button text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
