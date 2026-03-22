"use client";

import React from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

export const AcademicStep: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Current / Last Degree</label>
        <div className="relative group">
          <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary transition-colors" />
          <select className="w-full h-14 pl-12 pr-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all appearance-none cursor-pointer">
            <option>Select Degree</option>
            <option>High School / 12th</option>
            <option>Bachelors (3 Year)</option>
            <option>Bachelors (4 Year)</option>
            <option>Masters</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Field of Study</label>
        <div className="relative group">
          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary transition-colors" />
          <input type="text" placeholder="e.g. Computer Science" className="w-full h-14 pl-12 pr-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all" />
        </div>
      </div>

      <div className="space-y-3 md:col-span-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Institution Name</label>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary transition-colors" />
          <input type="text" placeholder="e.g. Indian Institute of Technology" className="w-full h-14 pl-12 pr-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">GPA / Aggregate Grade</label>
        <div className="relative group">
          <Award className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary" />
          <input type="text" placeholder="e.g. 8.5 / 10" className="w-full h-14 pl-12 pr-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Graduation Year</label>
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary" />
          <input type="text" placeholder="e.g. 2024" className="w-full h-14 pl-12 pr-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all" />
        </div>
      </div>
    </div>
  );
};

const Award: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
