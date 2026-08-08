'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, LayoutDashboard, FileText, PlusCircle, History, Settings, LogOut } from 'lucide-react';

export function DashboardHeader() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/setup', label: 'Start Interview', icon: PlusCircle },
    { href: '/resume', label: 'My Resume', icon: FileText },
    { href: '/history', label: 'History', icon: History },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-8 pt-3 pb-2 bg-transparent">
      <div className="max-w-7xl mx-auto rounded-2xl glass-card bg-white/90 border border-slate-200/80 px-6 py-3 flex items-center justify-between shadow-sm">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-[1px] shadow-sm">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <span className="font-black text-base text-slate-900">Steer<span className="gradient-text font-black">Hire</span></span>
        </Link>

        {/* Dashboard Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shadow-sm">
              AD
            </div>
            <span className="text-xs font-bold text-slate-800 hidden sm:inline">Alex Dev</span>
          </div>

          <Link
            href="/login"
            className="p-2 rounded-xl bg-slate-100 border border-slate-200/80 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
