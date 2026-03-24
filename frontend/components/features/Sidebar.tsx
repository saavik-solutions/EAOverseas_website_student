"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Rss, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  FileCheck, 
  Home, 
  User, 
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Intake Feed', icon: Rss, path: '/feed' },
  { label: 'Institutional Discovery', icon: Search, path: '/discover' },
  { label: 'Courses Explorer', icon: BookOpen, path: '/courses' },
  { label: 'Profile Intelligence', icon: ShieldCheck, path: '/profile-intelligence' },
  { label: 'Test Preparation', icon: FileCheck, path: '/tests' },
  { label: 'Accommodation', icon: Home, path: '/accommodation' },
  { label: 'User Profile', icon: User, path: '/profile' },
];

export const Sidebar: React.FC<{ className?: string, isOpenMobile?: boolean, onCloseMobile?: () => void }> = ({ className = "", isOpenMobile = false, onCloseMobile }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-nav-bg h-screen text-white flex flex-col fixed left-0 top-0 z-50 overflow-hidden transition-all duration-300 ease-in-out
          ${isOpenMobile ? 'translate-x-0 w-[240px]' : '-translate-x-full lg:translate-x-0'} 
          ${!isOpenMobile ? (isHovered ? 'lg:w-[240px]' : 'lg:w-[64px]') : ''} 
          ${className}`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 shrink-0 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/30">
              <span className="font-black text-white italic text-xl">E</span>
            </div>
            <div
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isHovered || isOpenMobile ? 'opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-4'}`}
            >
              <h1 className="font-black text-lg tracking-tight leading-none">EduPlatform</h1>
              <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest mt-1">AI Intelligence</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname?.startsWith(item.path));
            const showLabel = isHovered || isOpenMobile;
            return (
              <Link
                key={item.path}
                href={item.path}
                title={!showLabel ? item.label : undefined}
                onClick={() => { if (isOpenMobile && onCloseMobile) onCloseMobile() }}
                className={`flex items-center group px-2 py-3 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="w-9 h-5 flex items-center justify-center shrink-0">
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-brand-accent transition-colors'}`} />
                </div>
                <div
                  className={`text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${showLabel ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0 ml-0'}`}
                >
                  {item.label}
                </div>
                {isActive && showLabel && (
                  <ChevronRight className="h-4 w-4 opacity-50 ml-auto absolute right-3" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-white/10 shrink-0">
          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3 overflow-hidden min-h-[56px]">
            <div className="w-7 h-7 rounded-lg bg-brand-accent/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4 w-4 text-brand-accent" />
            </div>
            <div
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isHovered || isOpenMobile ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
            >
              <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.1em]">Membership</p>
              <p className="text-xs font-bold text-white tracking-tight">Enterprise Access</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
