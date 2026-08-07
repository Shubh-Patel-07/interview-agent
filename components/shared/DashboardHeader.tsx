'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, LayoutDashboard, FileText, PlusCircle, History, User, LogOut } from 'lucide-react';

export function DashboardHeader() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/setup', label: 'Start Interview', icon: PlusCircle },
    { href: '/resume', label: 'My Resume', icon: FileText },
    { href: '/history', label: 'History', icon: History },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#05070d]/90 backdrop-blur-md border-b border-white/10 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <span className="font-bold text-lg text-white">Interview<span className="gradient-text">Agent</span></span>
        </Link>

        {/* Dashboard Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/30 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-white/10">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
              AD
            </div>
            <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Alex Dev</span>
          </div>

          <Link
            href="/login"
            className="p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
