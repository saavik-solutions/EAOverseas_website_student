"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeedTabs: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'global';

  const tabs = [
    { id: 'global', label: 'Global Feed', icon: Globe },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`/feed?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-10 bg-bg-base/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-7xl px-4">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 py-4 text-sm font-bold transition-all relative ${
                  isActive ? 'text-brand-primary' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <tab.icon className={`h-4 w-4 ${isActive ? 'text-brand-primary' : 'text-text-muted'}`} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="feed-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
