"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Newspaper, 
  BookOpen, 
  Video, 
  FileText, 
  BellRing, 
  Megaphone,
  LayoutGrid,
  ChevronDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filters = [
    { id: 'All', label: 'Global Feed', icon: LayoutGrid },
    { id: 'News', label: 'Intelligence', icon: Newspaper },
    { id: 'Guides', label: 'Pro Guides', icon: BookOpen },
    { id: 'Webinars', label: 'Masterclasses', icon: Video },
    { id: 'Forms', label: 'Resources', icon: FileText },
    { id: 'Alerts', label: 'System Alerts', icon: BellRing },
    { id: 'Announcement', label: 'Broadcasts', icon: Megaphone },
  ];

  const activeFilterData = filters.find(f => f.id === activeFilter) || filters[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      {/* Search Module - Expanded by default in this new horizontal bar */}
      <div className="flex-1 w-full bg-white border border-border rounded-2xl px-4 py-2 shadow-sm flex items-center gap-3 transition-all focus-within:ring-2 focus-within:ring-brand-primary/20">
        <Search className="h-4 w-4 text-text-muted shrink-0" />
        <input 
          type="text" 
          placeholder="Search Intelligence Matrix..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder:text-text-muted/50 italic"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange('')} className="p-1 hover:bg-bg-base rounded-full transition-colors">
            <X className="h-3 w-3 text-text-muted" />
          </button>
        )}
      </div>

      {/* Filter Popover Module */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all font-black text-[11px] uppercase tracking-widest italic shadow-sm h-[46px] ${
            isOpen || activeFilter !== 'All' 
              ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90' 
              : 'bg-white border-border text-text-primary hover:border-brand-primary/50'
          }`}
        >
          {activeFilter !== 'All' ? <activeFilterData.icon className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          <span>{activeFilter !== 'All' ? activeFilterData.label : 'Sort & Filter'}</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-3 w-64 bg-white border border-border rounded-3xl shadow-2xl z-[100] p-2 overflow-hidden flex flex-col gap-1 origin-top-right"
            >
              <div className="px-4 py-3 border-b border-border/50 mb-1">
                 <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] italic">Discovery Matrix</h4>
              </div>
              
              {filters.map((f) => {
                const Icon = f.icon;
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      onFilterChange(f.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                      isActive 
                        ? 'bg-brand-primary/10 text-brand-primary' 
                        : 'text-text-muted hover:bg-bg-base hover:text-text-primary'
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-brand-primary' : 'text-text-muted group-hover:text-text-primary'}`} />
                    <span className="text-[11px] font-bold uppercase tracking-widest italic">{f.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    )}
                  </button>
                );
              })}

              <div className="mt-2 p-4 bg-bg-base/50 rounded-2xl border border-dashed border-border/60">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[9px] font-black text-text-muted uppercase tracking-widest italic leading-none">Intelligence Stream Live</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
