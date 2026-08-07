import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior Full-Stack Engineer @ Stripe',
    quote: 'The AI interviewer probed my system design trade-offs deeper than real human recruiters. The evaluation report gave me the exact gaps I needed to land my offer!',
    score: 94,
    avatar: 'SJ',
  },
  {
    name: 'David Chen',
    role: 'Frontend Architect @ Vercel',
    quote: 'The resume parsing feature is incredible. It asked me specific questions about a Next.js App Router project I built last year. Unbelievable precision.',
    score: 91,
    avatar: 'DC',
  },
  {
    name: 'Priya Sharma',
    role: 'AI Infrastructure Lead @ Anthropic',
    quote: 'Speech-to-text live interview simulation is a game changer for practicing under pressure. The confidence & communication scores were spot on.',
    score: 96,
    avatar: 'PS',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-[#05070d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Candidate Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4">
            Loved by Developers Landing Top Tech Offers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="glass-card glass-card-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Score: {item.score}%
                  </span>
                </div>
                <Quote className="w-8 h-8 text-purple-400/40 mb-2" />
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
