"use client";

import React from 'react';
import { BookOpen, Globe, Award, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  level: string;
  description: string;
  domain: string;
}

export const CourseDetailHeader: React.FC<Props> = ({ name, level, description, domain }) => {
  return (
    <div className="space-y-8 bg-nav-bg p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-white/5">
       {/* Background accents */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
       
       <div className="relative z-10 max-w-4xl space-y-6">
         <div className="flex flex-wrap gap-3">
           <span className="px-4 py-1.5 bg-brand-primary/20 border border-brand-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary">
             {level}
           </span>
           <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60">
             Domain: {domain}
           </span>
         </div>

         <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
           {name}
         </h1>

         <p className="text-lg font-medium text-white/70 leading-relaxed max-w-3xl">
           {description}
         </p>

         <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                 <Globe className="h-5 w-5 text-brand-accent" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Global Exposure</div>
                <div className="text-sm font-bold">12+ Major Countries</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                 <Award className="h-5 w-5 text-brand-success" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Career Potential</div>
                <div className="text-sm font-bold">High (Top 5 Ranked)</div>
              </div>
            </div>
         </div>
       </div>
    </div>
  );
};
