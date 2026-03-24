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
    <div className="sticky top-[80px] z-20 bg-white/80 backdrop-blur-xl border-b border-border/50 py-4 w-full">
      <div className="max-w-xl mx-auto px-4 w-full">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl relative shadow-inner w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 text-sm sm:text-base font-black transition-all relative z-10 rounded-xl ${
                  isActive ? 'text-brand-primary' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <tab.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? 'text-brand-primary' : 'text-text-muted'}`} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="active-feed-tab-pill"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-black/5 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
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
