"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Sliders, Globe, BookOpen, Clock, BadgeDollarSign, Award, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CourseFilterSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<string[]>(['level', 'country', 'fees']);

  const toggle = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const countries = [
    { label: 'USA', flag: '🇺🇸' }, { label: 'UK', flag: '🇬🇧' }, { label: 'Canada', flag: '🇨🇦' }, 
    { label: 'Germany', flag: '🇩🇪' }, { label: 'Australia', flag: '🇦🇺' }
  ];

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    if (current.includes(value)) {
      params.delete(key);
      current.filter(v => v !== value).forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <div className="w-[260px] shrink-0 space-y-8 sticky top-24 h-fit pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-brand-primary" />
          <h4 className="font-black text-[10px] uppercase tracking-widest text-text-primary">Program Filters</h4>
        </div>
        <button onClick={() => router.push('/courses')} className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand-primary">Reset</button>
      </div>

      <div className="space-y-6">
        {/* Course Level */}
        <div className="space-y-4">
          <button onClick={() => toggle('level')} className="w-full flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
              <span className="text-sm font-bold text-text-primary">Course Level</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded.includes('level') ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {expanded.includes('level') && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-7 space-y-2.5 overflow-hidden">
                {['Bachelors', 'Masters', 'PhD', 'Diploma'].map(l => (
                  <label key={l} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" onChange={() => handleFilter('level', l)} checked={searchParams.getAll('level').includes(l)} className="w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary" />
                    <span className="text-xs font-bold text-text-muted group-hover:text-text-primary">{l}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Annual Fees */}
        <div className="space-y-4">
          <button onClick={() => toggle('fees')} className="w-full flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <BadgeDollarSign className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
              <span className="text-sm font-bold text-text-primary">Annual Fees</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded.includes('fees') ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {expanded.includes('fees') && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-7 pr-2 space-y-4 overflow-hidden">
                <div className="h-1 bg-border rounded-full relative mt-4">
                  <div className="absolute left-0 right-1/3 h-full bg-brand-primary rounded-full" />
                  <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-text-muted tracking-widest">
                  <span>$0</span>
                  <span className="text-brand-primary font-bold">Max $45k</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* IELTS Score */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-text-muted" />
            <span className="text-sm font-bold text-text-primary">Min IELTS Score</span>
          </div>
          <div className="pl-7 pr-2 space-y-4">
             <div className="h-1 bg-border rounded-full relative mt-4">
                <div className="absolute left-0 right-[40%] h-full bg-brand-primary rounded-full transition-all" />
                <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full shadow-lg" />
             </div>
             <div className="flex justify-between text-[10px] font-black uppercase text-text-muted tracking-widest">
                <span>4.5</span>
                <span className="text-brand-primary font-bold">6.5 Overall</span>
                <span>9.0</span>
             </div>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-text-muted" />
            <span className="text-sm font-bold text-text-primary">Duration</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pl-7">
            {['1 Year', '2 Years', '3 Years', '4 Years+'].map(d => (
              <button key={d} className="py-2 text-[9px] font-black uppercase tracking-widest border border-border rounded-lg hover:border-brand-primary transition-all active:scale-95">
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-text-muted" />
              <span className="text-sm font-bold text-text-primary">Country</span>
            </div>
          </div>
          <div className="pl-7 space-y-2.5">
            {countries.map(c => (
              <label key={c.label} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-brand-primary" />
                <span className="text-xs font-bold text-text-muted group-hover:text-text-primary flex items-center gap-2">
                  <span>{c.flag}</span>
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Scholarship Toggle */}
        <div className="pt-4 border-t border-border mt-8 space-y-4">
           <label className="flex items-center justify-between cursor-pointer group">
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase tracking-widest text-text-primary">Scholarship</span>
                <p className="text-[10px] font-medium text-text-muted">Available programs</p>
              </div>
              <div className="w-10 h-5 bg-border rounded-full relative group-hover:bg-brand-primary/20 transition-all">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all group-hover:translate-x-5" />
              </div>
           </label>
        </div>
      </div>
    </div>
  );
};
