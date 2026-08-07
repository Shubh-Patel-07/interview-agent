'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bot, Sparkles, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-[1px] transition-transform duration-300 group-hover:scale-105 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-2">
              Steer<span className="gradient-text font-black">Hire</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono font-semibold">
                AI SaaS
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Candidate Portal
          </Link>
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <Link
            href="/login"
            className="px-4 py-2 text-xs text-slate-600 hover:text-blue-600 font-semibold transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/setup"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white gradient-button flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
            Launch AI Session
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-blue-600"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-slate-200/80 px-4 py-6 mt-2 flex flex-col gap-4 animate-in slide-in-from-top-2 bg-white">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100 font-medium">
            Features
          </Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100 font-medium">
            How it Works
          </Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100 font-medium">
            Pricing
          </Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100 font-medium">
            Candidate Portal
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold">
              Sign In
            </Link>
            <Link href="/setup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl gradient-button text-white text-xs font-semibold flex items-center justify-center gap-2">
              Launch AI Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
