"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { FeedTabs } from '../../components/features/feed/FeedTabs';
import { GlobalFeed } from '../../components/features/feed/GlobalFeed';
import { CommunityFeed } from '../../components/features/feed/CommunityFeed';
import { Globe, BookOpen, Target, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function FeedContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'global';

  return (
    <>
      <div className="-mx-4 md:-mx-8 lg:-mx-10 -mt-10">
        
        {/* Coming Soon Features Showcase */}
        <div className="bg-gradient-to-r from-brand-primary/5 via-brand-accent/5 to-transparent border-b border-border py-12 px-6 lg:px-16 space-y-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/40 blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
           
           <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
              <div className="space-y-3">
                 <span className="px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md inline-block">App Preview Mode</span>
                 <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">More Features Coming Soon</h2>
                 <p className="text-sm font-medium text-text-muted max-w-lg mx-auto">You currently have access to the early preview intake feed. Click below to preview our upcoming revolutionary modules.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
                 {[
                   { id: 'discover', title: 'Universities', icon: Globe, path: '/discover', color: 'text-brand-primary' },
                   { id: 'courses', title: 'AI Courses', icon: BookOpen, path: '/courses', color: 'text-brand-accent' },
                   { id: 'tests', title: 'Test Prep', icon: Target, path: '/tests', color: 'text-brand-success' },
                   { id: 'acc', title: 'Housing', icon: Home, path: '/accommodation', color: 'text-purple-500' }
                 ].map(feature => (
                    <Link key={feature.id} href={feature.path} className="group/card flex flex-col items-center justify-center p-6 md:p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all hover:-translate-y-2">
                       <div className={`w-14 h-14 rounded-2xl bg-bg-base/50 flex items-center justify-center mb-4 ${feature.color} group-hover/card:scale-110 transition-transform`}>
                          <feature.icon className="h-6 w-6" />
                       </div>
                       <h3 className="text-xs md:text-sm font-black text-text-primary mb-1">{feature.title}</h3>
                       <div className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-1 group-hover/card:text-brand-primary transition-colors">
                         Preview <ArrowRight className="h-3 w-3" />
                       </div>
                    </Link>
                 ))}
              </div>
           </div>
        </div>

        <FeedTabs />
        <main className="container max-w-[1400px] px-6 py-10 mx-auto">
          {activeTab === 'global' ? <GlobalFeed /> : <CommunityFeed />}
        </main>
      </div>
    </>
  );
}

export default function FeedPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="h-screen animate-pulse bg-bg-base" />}>
        <FeedContent />
      </Suspense>
    </DashboardLayout>
  );
}
