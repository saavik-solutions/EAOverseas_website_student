"use client";

import React from 'react';
import { ArrowRight, GraduationCap, Globe, BadgeDollarSign, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface Course {
  id: string;
  name: string;
  slug: string;
  domain: string;
  level: string;
  uniCount: number;
  countries: string[];
  fees: string;
  ielts: string;
  icon: string;
}

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card-premium h-full bg-white border border-border hover:border-brand-primary transition-all p-8 flex flex-col group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-bl-[4rem] flex items-center justify-center pl-4 pb-4 font-black transition-colors group-hover:bg-brand-primary/10">
        <ArrowUpRight className="h-6 w-6 text-brand-primary/30 group-hover:text-brand-primary transition-colors" />
      </div>

      <div className="space-y-6 flex-1">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-bg-base border border-border flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
            {course.icon}
          </div>
          <span className="px-3 py-1 bg-brand-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary border border-brand-primary/20">
            {course.level}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-text-primary tracking-tight leading-tight group-hover:text-brand-primary transition-colors">
            {course.name}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Domain: {course.domain}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {course.countries.map(c => (
            <span key={c} className="h-7 w-7 rounded-lg bg-bg-base border border-border flex items-center justify-center text-sm shadow-sm" title={c}>
               {c === 'USA' && '🇺🇸'}
               {c === 'UK' && '🇬🇧'}
               {c === 'Canada' && '🇨🇦'}
               {c === 'Germany' && '🇩🇪'}
               {c === 'Australia' && '🇦🇺'}
            </span>
          ))}
          <div className="h-7 px-3 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-[9px] font-black text-brand-accent uppercase tracking-widest pointer-events-none">
            +{course.uniCount} Universities
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
           <div className="space-y-1">
             <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-text-muted">
               <BadgeDollarSign className="h-3 w-3" /> Fees Range
             </div>
             <div className="text-sm font-black text-text-primary">{course.fees}</div>
           </div>
           <div className="space-y-1">
             <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-text-muted">
               <Award className="h-3 w-3" /> Min IELTS
             </div>
             <div className="text-sm font-black text-text-primary">{course.ielts} <span className="text-[10px] font-medium text-text-muted">overall</span></div>
           </div>
        </div>
      </div>

      <div className="mt-8">
        <Link 
          href={`/courses/${course.slug}`}
          className="w-full py-4 bg-bg-base border border-border rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all group/btn active:scale-95 shadow-sm"
        >
          Explore Pathway
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};
