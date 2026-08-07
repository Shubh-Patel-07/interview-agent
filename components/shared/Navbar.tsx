'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bot, Sparkles, ArrowRight, Menu, X, Command } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070d]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
              Steer<span className="gradient-text font-black">Hire</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                AI SaaS
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="#testimonials" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            Testimonials
          </Link>
          <Link href="/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            Candidate Portal
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-xs text-slate-300 hover:text-white font-semibold transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/setup"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white gradient-button flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
            Launch AI Mock Session
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-white/10 px-4 py-6 mt-2 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">
            Features
          </Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">
            How it Works
          </Link>
          <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">
            Testimonials
          </Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">
            Candidate Portal
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-slate-800/60 text-slate-200 text-xs font-semibold">
              Sign In
            </Link>
            <Link href="/setup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl gradient-button text-white text-xs font-semibold flex items-center justify-center gap-2">
              Launch AI Mock Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
