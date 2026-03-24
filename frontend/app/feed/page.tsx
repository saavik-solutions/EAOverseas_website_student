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
      <div className="-mx-4 sm:-mx-6 lg:-mx-10 -mt-4 sm:-mt-6 lg:-mt-10 mb-4 sm:mb-8">
        <FeedTabs />
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
