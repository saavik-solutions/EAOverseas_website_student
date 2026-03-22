"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Sliders, X, Globe, BookOpen, DollarSign, Calendar, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FilterSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Internal state for UI toggles (collapsible sections)
  const [expandedSections, setExpandedSections] = useState<string[]>(['country', 'fees', 'domain']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const countries = [
    { label: 'USA', emoji: '🇺🇸', count: 412 },
    { label: 'UK', emoji: '🇬🇧', count: 284 },
    { label: 'Canada', emoji: '🇨🇦', count: 156 },
    { label: 'Germany', emoji: '🇩🇪', count: 98 },
    { label: 'Australia', emoji: '🇦🇺', count: 74 }
  ];

  const domains = [
    'Engineering', 'Business', 'Medical', 'Arts & Design', 'Law', 'Computer Science'
  ];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    
    if (current.includes(value)) {
      const filtered = current.filter(v => v !== value);
      params.delete(key);
      filtered.forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }
    router.push(`/discover?${params.toString()}`);
  };

  const clearAll = () => {
    router.push('/discover');
  };

  return (
    <div className="w-[260px] shrink-0 space-y-8 sticky top-24 h-fit pb-10">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-brand-primary" />
          <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">Filter Engine</h4>
        </div>
        <button 
          onClick={clearAll}
          className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand-primary transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Country Section */}
        <div className="space-y-4">
          <button 
            onClick={() => toggleSection('country')}
            className="w-full flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
              <span className="text-sm font-bold text-text-primary">Country</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${expandedSections.includes('country') ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedSections.includes('country') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-2.5 pl-7"
              >
                {countries.map((c) => (
                  <label key={c.label} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={searchParams.getAll('country').includes(c.label)}
                      onChange={() => handleFilterChange('country', c.label)}
                      className="w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-xs font-bold text-text-muted group-hover:text-text-primary transition-colors flex-1">
                      {c.emoji} {c.label}
                    </span>
                    <span className="text-[10px] font-black text-border group-hover:text-brand-primary/50">{c.count}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fees Range Section */}
        <div className="space-y-4">
          <button 
            onClick={() => toggleSection('fees')}
            className="w-full flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
              <span className="text-sm font-bold text-text-primary">Annual Fees</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${expandedSections.includes('fees') ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedSections.includes('fees') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-4 pl-7 pr-2"
              >
                <div className="h-1 bg-border rounded-full relative mt-4">
                  <div className="absolute left-0 right-1/4 h-full bg-brand-primary rounded-full" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full shadow-sm cursor-pointer" />
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full shadow-sm cursor-pointer" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <span>$0</span>
                  <span className="text-brand-primary">$60,000</span>
                  <span>$100k+</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Course Domain */}
        <div className="space-y-4">
          <button 
            onClick={() => toggleSection('domain')}
            className="w-full flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
              <span className="text-sm font-bold text-text-primary">Course Domain</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${expandedSections.includes('domain') ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedSections.includes('domain') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-2.5 pl-7"
              >
                {domains.map((d) => (
                  <label key={d} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-xs font-bold text-text-muted group-hover:text-text-primary transition-colors">
                      {d}
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visa Difficulty */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Zap className="h-4 w-4 text-text-muted" />
            <span className="text-sm font-bold text-text-primary">Visa Difficulty</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pl-7">
            {['Easy', 'Mod', 'Diff'].map(level => (
              <button 
                key={level}
                className="py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg border border-border hover:border-brand-primary transition-colors"
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Global Ranking */}
        <div className="space-y-4">
           <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-text-muted" />
            <span className="text-sm font-bold text-text-primary">Top Rankings</span>
          </div>
          <select className="w-full ml-7 max-w-[150px] bg-bg-base border border-border rounded-xl px-4 py-2 text-xs font-bold text-text-primary outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all">
            <option>Top 50</option>
            <option>Top 100</option>
            <option>Top 500</option>
            <option>All Rankings</option>
          </select>
        </div>
      </div>
    </div>
  );
};
