'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Bot, Sparkles, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-6 py-3 flex items-center justify-between ${
          scrolled
            ? 'glass-card border-slate-200/90 dark:border-slate-800 shadow-xl bg-white/90 dark:bg-slate-900/90'
            : 'glass-card border-slate-200/60 dark:border-slate-800 shadow-sm bg-white/75 dark:bg-slate-900/75'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-[1px] transition-transform duration-300 group-hover:scale-105 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-blue-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
            Steer<span className="gradient-text font-black">Hire</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link href="#features" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Candidate Portal
          </Link>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-300" />
            )}
          </button>

          <Link
            href="/login"
            className="px-3.5 py-2 text-xs text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/setup"
            className="px-4.5 py-2 rounded-full text-xs font-bold text-white gradient-button flex items-center gap-2 shadow-md shadow-blue-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            Launch AI Session
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-blue-600"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 mt-3 max-w-sm mx-auto flex flex-col gap-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 dark:text-white hover:text-blue-600 py-2 border-b border-slate-100 dark:border-slate-800 font-bold text-sm">
            Features
          </Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 dark:text-white hover:text-blue-600 py-2 border-b border-slate-100 dark:border-slate-800 font-bold text-sm">
            How it Works
          </Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 dark:text-white hover:text-blue-600 py-2 border-b border-slate-100 dark:border-slate-800 font-bold text-sm">
            Pricing
          </Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 dark:text-white hover:text-blue-600 py-2 border-b border-slate-100 dark:border-slate-800 font-bold text-sm">
            Candidate Portal
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold">
              Sign In
            </Link>
            <Link href="/setup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-full gradient-button text-white text-xs font-bold flex items-center justify-center gap-2">
              Launch AI Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
