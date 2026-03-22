"use client";

import React from 'react';
import { Bookmark, Scale, Link as LinkIcon, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  logo: string;
  countryFlag: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCompareClick: () => void;
}

export const StickyInfoBar: React.FC<Props> = ({ name, logo, countryFlag, activeTab, onTabChange, onCompareClick }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'visa', label: 'Visa' },
    { id: 'careers', label: 'Careers' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-12 py-3 flex items-center justify-between gap-8">
        {/* Left Side: University Identity */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-bg-base border border-border flex items-center justify-center p-1 overflow-hidden">
            <img src={logo} alt={name} className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-text-primary tracking-tight">{name}</span>
            <span className="text-xl">{countryFlag}</span>
          </div>
        </div>

        {/* Middle: Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-brand-primary/10 text-brand-primary' 
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-base'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="p-2.5 rounded-xl border border-border hover:bg-bg-base text-text-muted transition-all">
            <Bookmark className="h-5 w-5" />
          </button>
          <button 
            onClick={onCompareClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl font-bold text-xs hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all border border-brand-primary ring-offset-2 hover:ring-2 hover:ring-brand-primary/50"
          >
            <Scale className="h-4 w-4" />
            Compare Profile
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-nav-bg text-white rounded-xl font-bold text-xs hover:bg-nav-bg/90 transition-all">
            <LinkIcon className="h-4 w-4" />
            Website
          </button>
        </div>
      </div>
    </div>
  );
};
