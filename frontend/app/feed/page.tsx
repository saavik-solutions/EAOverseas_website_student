"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { FeedTabs } from '../../components/features/feed/FeedTabs';
import { GlobalFeed } from '../../components/features/feed/GlobalFeed';
import { CommunityFeed } from '../../components/features/feed/CommunityFeed';
import { SearchBar } from '../../components/features/SearchBar';
import { Globe, BookOpen, Target, Home, ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';

function FeedContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'global';

  return (
    <>
      <div className="-mx-4 sm:-mx-6 lg:-mx-10 -mt-4 sm:-mt-6 lg:-mt-10 mb-6">
        <FeedTabs />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-[2rem] border border-border shadow-sm">
          <div className="flex-1">
             <SearchBar placeholder="Search community posts, universities, or intelligence..." />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-bg-base border border-border rounded-2xl text-text-muted hover:text-brand-primary hover:border-brand-primary transition-all font-black text-[11px] uppercase tracking-widest italic h-[50px]">
            <Filter className="w-4 h-4" />
            <span>Discover Filters</span>
          </button>
        </div>
      </div>

      <main className="container max-w-[1400px] mx-auto w-full pb-10">
        {activeTab === 'global' ? <GlobalFeed /> : <CommunityFeed />}
      </main>
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
