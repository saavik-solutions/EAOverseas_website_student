"use client";

import React from 'react';
import { 
  Search, 
  Filter, 
  Newspaper, 
  BookOpen, 
  Video, 
  FileText, 
  BellRing, 
  Megaphone,
  LayoutGrid
} from 'lucide-react';

interface FeedFilterSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FeedFilterSidebar: React.FC<FeedFilterSidebarProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange
}) => {
  const filters = [
    { id: 'All', label: 'Global Feed', icon: LayoutGrid },
    { id: 'News', label: 'Intelligence', icon: Newspaper },
    { id: 'Guides', label: 'Pro Guides', icon: BookOpen },
    { id: 'Webinars', label: 'Masterclasses', icon: Video },
    { id: 'Forms', label: 'Resources', icon: FileText },
    { id: 'Alerts', label: 'System Alerts', icon: BellRing },
    { id: 'Announcement', label: 'Broadcasts', icon: Megaphone },
  ];

  return (
    <div className="space-y-8 sticky top-24">
      {/* Search Module */}
      <div className="card-premium p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search Intelligence..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-bg-base border border-border rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all italic"
          />
        </div>
      </div>

      {/* Filter Ledger */}
      <div className="space-y-1">
        <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 pl-4 italic">Discovery Matrix</h4>
        {filters.map((f) => {
          const Icon = f.icon;
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]' 
                  : 'text-text-muted hover:bg-white hover:text-brand-primary border border-transparent hover:border-borderShadow hover:shadow-sm'
              }`}
            >
              <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-brand-primary'}`} />
              <span className="text-[11px] font-black uppercase tracking-widest italic">{f.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Constraints Indicator */}
      <div className="p-6 bg-nav-bg rounded-3xl border border-white/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary blur-[60px] opacity-20" />
         <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 relative z-10 italic">Intelligence Status</p>
         <div className="flex items-center gap-2 relative z-10">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[11px] font-bold text-white italic">Protocol Active</span>
         </div>
      </div>
    </div>
  );
};
