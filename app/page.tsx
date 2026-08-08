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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 relative bg-grid-pattern overflow-hidden">
      <div className="glow-blue top-0 left-1/2 -translate-x-1/2 opacity-35 blur-3xl pointer-events-none" />
      <div className="glow-purple top-1/3 right-10 opacity-25 blur-3xl pointer-events-none" />
      <div className="glow-blue top-2/3 left-10 opacity-25 blur-3xl pointer-events-none" />

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
