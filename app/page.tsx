import { Navbar } from '@/components/shared/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TechStack } from '@/components/landing/TechStack';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/shared/Footer';
import { ParticleCanvas } from '@/components/ui/ParticleCanvas';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 relative overflow-hidden bg-grid-pattern">
      {/* Global Page-Wide Canvas & Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleCanvas />
        <div className="glow-blue top-0 left-1/2 -translate-x-1/2 opacity-30 blur-3xl" />
        <div className="glow-purple top-96 right-10 opacity-20 blur-3xl" />
      </div>

      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <TechStack />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
