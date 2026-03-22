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
  Settings,
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
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ width: isHovered ? 240 : 64 }}
      transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      className={`bg-nav-bg h-screen text-white flex flex-col fixed left-0 top-0 z-50 overflow-hidden ${className}`}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 shrink-0 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/30">
            <span className="font-black text-white italic text-xl">E</span>
          </div>
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
            transition={{ duration: 0.2, delay: isHovered ? 0.05 : 0 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <h1 className="font-black text-lg tracking-tight leading-none">EduPlatform</h1>
            <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest mt-1">AI Intelligence</p>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname?.startsWith(item.path));
          return (
            <Link
              key={item.path}
              href={item.path}
              title={!isHovered ? item.label : undefined}
              className={`flex items-center group px-2 py-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-9 h-5 flex items-center justify-center shrink-0">
                <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-brand-accent transition-colors'}`} />
              </div>
              <motion.span
                animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? 'auto' : 0 }}
                transition={{ duration: 0.2, delay: isHovered ? 0.06 : 0 }}
                className="text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden ml-2"
              >
                {item.label}
              </motion.span>
              {isActive && isHovered && (
                <ChevronRight className="h-4 w-4 opacity-50 ml-auto" />
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
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
            transition={{ duration: 0.2, delay: isHovered ? 0.05 : 0 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.1em]">Membership</p>
            <p className="text-xs font-bold text-white tracking-tight">Enterprise Access</p>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};
