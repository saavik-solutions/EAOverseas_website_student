"use client";

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface FeedFilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FeedFilterBar: React.FC<FeedFilterBarProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange
}) => {
  const filters = ['All', 'News', 'Guides', 'Webinars', 'Forms', 'Alerts', 'Announcement'];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-10">
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
              activeFilter === f 
                ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20 scale-105' 
                : 'bg-white text-text-muted border-border hover:border-brand-primary/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search feed..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
          />
        </div>
        <button className="p-2.5 rounded-xl border border-border bg-white hover:bg-bg-base transition-colors group">
          <SlidersHorizontal className="h-5 w-5 text-text-muted group-hover:text-brand-primary" />
        </button>
      </div>
    </div>
  );
};
