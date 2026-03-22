"use client";

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Radio, 
  Users, 
  Database,
  Search,
  ChevronRight,
  LogOut,
  Bell,
  HelpCircle,
  Menu,
  ChevronDown,
  Globe,
  MessageSquare,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Intelligence Feed', href: '/admin/broadcast', icon: Radio },
  { label: 'Community Governance', href: '/admin/community', icon: MessageSquare },
  { label: 'Lead Vault', href: '/admin/leads', icon: Database },
  { label: 'Student Directory', href: '/admin/students', icon: Users },
  { label: 'Blog CMS', href: '/admin/blogs', icon: FileText },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* Enterprise Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-50 overflow-hidden">
        {/* Brand Terminal */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-sm">
              EA
            </div>
            <span className="text-slate-900 font-bold tracking-tight text-sm">Overseas <span className="text-slate-400 font-medium">Admin</span></span>
          </Link>
        </div>

        {/* Navigation Core */}
        <nav className="flex-1 py-8 overflow-y-auto space-y-1 px-4 custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <item.icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Footnotes */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 space-y-1">
           <Link href="/feed" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-all">
              <Globe className="h-4 w-4" />
              Live Feed
           </Link>
           <button 
             onClick={() => window.location.href = '/'}
             className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
           >
              <LogOut className="h-4 w-4" />
              Sign Out
           </button>
        </div>
      </aside>

      {/* Workspace Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header Utility */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-40">
           <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-all">
                 <Menu className="h-5 w-5" />
              </button>
              <div className="h-6 w-[1px] bg-slate-100" />
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                 <Link href="/admin" className="hover:text-slate-900 transition-colors">EAOverseas</Link>
                 <ChevronRight className="h-3 w-3" />
                 <span className="text-slate-900">Operations</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="relative group max-md:hidden">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Search records..." 
                    className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm font-medium w-72 focus:ring-2 focus:ring-slate-100 focus:bg-white transition-all outline-none" 
                 />
              </div>

              <div className="flex items-center gap-1">
                 <button 
                   onClick={() => setShowNotifications(!showNotifications)}
                   className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all relative"
                 >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full" />
                 </button>
                 <button 
                   onClick={() => alert('Support Node Activated: Contact admin@eaoverseas.com for institutional assistance.')}
                   className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"
                 >
                    <HelpCircle className="h-5 w-5" />
                 </button>
              </div>

              <div className="h-8 w-[1px] bg-slate-100" />

              <button className="flex items-center gap-3 pl-2 group">
                 <div className="flex flex-col items-end max-md:hidden">
                    <span className="text-xs font-bold text-slate-900">Admin Panel</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">Verified</span>
                 </div>
                 <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 shadow-sm group-hover:border-slate-300 transition-all">
                    PK
                 </div>
              </button>
           </div>
        </header>

        {/* Notification Panel Overlay */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div 
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute right-0 top-16 bottom-0 w-80 bg-white shadow-2xl z-50 border-l border-slate-100 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Notifications</h3>
                <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-900 mb-1">System Health Optimized</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Cross-origin content syndication enabled for institutional blogs. Telemetry synchronizing.</p>
                  <p className="mt-2 text-[10px] font-bold text-brand-primary">2 minutes ago</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                  <p className="text-xs font-bold text-slate-900 mb-1">Zero-Auth Active</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Administrative session validation deactivated as per institutional request.</p>
                  <p className="mt-2 text-[10px] font-bold text-slate-400">1 hour ago</p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex justify-center">
                <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all">Clear All History</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
           <div className="max-w-[1600px] mx-auto min-h-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={pathname}
              >
                {children}
              </motion.div>
           </div>
        </div>
      </main>
    </div>
  );
};
