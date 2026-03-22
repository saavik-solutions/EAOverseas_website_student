"use client";

import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Clock, Globe, Laptop, ChevronRight } from 'lucide-react';

interface Course {
  name: string;
  level: string;
  duration: string;
  fee: string;
  language: string;
  intake: string;
}

const mockCourses: Course[] = [
  { name: 'MSc Computer Science', level: 'Postgraduate', duration: '1 Year', fee: '£38,500', language: 'English', intake: 'Sep' },
  { name: 'MBA (Global)', level: 'Postgraduate', duration: '1 Year', fee: '£64,000', language: 'English', intake: 'Sep, Jan' },
  { name: 'BA Economics', level: 'Undergraduate', duration: '3 Years', fee: '£30,200', language: 'English', intake: 'Sep' },
  { name: 'MSc Data Science', level: 'Postgraduate', duration: '1 Year', fee: '£36,000', language: 'English', intake: 'Sep' },
  { name: 'BEng Mechanical Engineering', level: 'Undergraduate', duration: '3 Years', fee: '£32,000', language: 'English', intake: 'Sep' },
  { name: 'MPhil Physics', level: 'Postgraduate', duration: '2 Years', fee: '£34,500', language: 'English', intake: 'Sep' }
];

export const CoursesTab: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = mockCourses.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search programs by name or field..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-border rounded-2xl text-sm font-bold text-text-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none"
          />
        </div>
        <button className="h-14 px-8 bg-bg-base border border-border rounded-2xl flex items-center gap-3 hover:border-brand-primary transition-all group">
          <Filter className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-text-primary">Filters</span>
        </button>
      </div>

      <div className="bg-white border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-base/50 border-b border-border">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Course Name</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Level</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Duration</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Annual Fee</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Intake</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((course, idx) => (
                <tr key={idx} className="hover:bg-brand-primary/5 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="text-sm font-black text-text-primary group-hover:text-brand-primary transition-colors">{course.name}</div>
                      <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold tracking-tight uppercase">
                        <Globe className="h-3 w-3" />
                        {course.language}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-bg-base rounded-full text-[9px] font-black uppercase tracking-widest border border-border/50">{course.level}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                      <Clock className="h-3.5 w-3.5 text-brand-primary" />
                      {course.duration}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-text-primary">{course.fee}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1">
                      {course.intake.split(',').map(i => (
                        <span key={i} className="text-[10px] font-black text-brand-success uppercase tracking-widest bg-brand-success/10 px-2 py-0.5 rounded-md">{i.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 rounded-lg bg-white border border-border group-hover:border-brand-primary group-hover:bg-brand-primary transition-all">
                      <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button className="px-8 py-3 bg-white border border-border rounded-xl font-black text-[10px] uppercase tracking-widest text-text-muted hover:border-brand-primary hover:text-brand-primary transition-all">
          View All 450+ Programs
        </button>
      </div>
    </div>
  );
};
