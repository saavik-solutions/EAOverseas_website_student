"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/features/Sidebar';
import { SearchBar } from '@/components/features/SearchBar';
import { NotificationBell } from '@/components/features/NotificationBell';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WaitlistGate } from '@/components/features/feed/WaitlistGate';
import { NotificationManager } from '@/components/features/NotificationManager';
import ProfileCompletionPrompt from '@/components/ui/ProfileCompletionPrompt';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const waitlistNumber = (session?.user as any)?.waitlistNumber;

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex min-h-screen bg-bg-base">
      <NotificationManager />
      <ProfileCompletionPrompt />
      
      {/* Global Sidebar */}
      <Sidebar 
        isOpenMobile={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />



      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-[64px] transition-all duration-300">
        {/* Top Navigation / Global Bar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between px-4 sm:px-6 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl text-text-muted hover:bg-bg-base lg:hidden transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right mr-2">
              <p className="text-sm font-black text-text-primary">
                {status === 'authenticated' && session?.user?.name ? 
                  `Welcome, ${session.user.name.split(' ')[0]} 👋` : 
                  'Good morning 👋'}
              </p>
              <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <NotificationBell />
            
            {waitlistNumber && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-lg shadow-sm">
                <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em]">Waitlist</span>
                <span className="text-[11px] font-black text-brand-primary tabular-nums">#{waitlistNumber}</span>
              </div>
            )}

            <div className="h-8 w-[1px] bg-border mx-2" />
            
            {status === 'authenticated' && session?.user ? (
              <div className="flex items-center gap-3 group relative">
                <div className="w-10 h-10 rounded-xl bg-brand-primary border-b-2 border-brand-accent flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                  {userInitial}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-text-primary leading-tight">{session.user.name}</p>
                  <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">{session.user.role || 'Student'}</p>
                </div>
                {/* Simple Logout Dropdown / Button */}
                <button 
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors ml-2"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/auth/login">
                <button className="btn-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            {pathname === '/onboarding' ? (
              children
            ) : (
              <WaitlistGate>
                {children}
              </WaitlistGate>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
