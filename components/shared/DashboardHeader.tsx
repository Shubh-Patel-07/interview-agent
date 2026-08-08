'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Bot, LayoutDashboard, FileText, PlusCircle, History, Settings, LogOut, Sun, Moon } from 'lucide-react';

export function DashboardHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/setup', label: 'Start Interview', icon: PlusCircle },
    { href: '/resume', label: 'My Resume', icon: FileText },
    { href: '/history', label: 'History', icon: History },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-8 pt-3 pb-2 bg-transparent">
      <div className="max-w-7xl mx-auto rounded-2xl glass-card bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 px-6 py-3 flex items-center justify-between shadow-sm">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-[1px] shadow-sm">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <span className="font-black text-base text-slate-900 dark:text-white">Steer<span className="gradient-text font-black">Hire</span></span>
        </Link>

        {/* Dashboard Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700/70">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Theme Toggle */}
        <div className="flex items-center gap-3">
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

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shadow-sm">
              AD
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">Alex Dev</span>
          </div>

          <Link
            href="/login"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
