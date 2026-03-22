"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  description?: string;
  type: 'edu' | 'work';
}

interface Props {
  items: TimelineItem[];
  title: string;
}

export const AcademicTimeline: React.FC<Props> = ({ items, title }) => {
  return (
    <div className="space-y-10">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
             {title.includes('Education') ? <GraduationCap className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
          </div>
          <h3 className="text-xl font-black text-text-primary tracking-tight">{title}</h3>
       </div>

       <div className="relative pl-8 border-l-2 border-border space-y-12">
          {items.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="relative"
            >
               {/* Dot */}
               <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white border-4 border-brand-primary shadow-lg" />
               
               <div className="space-y-3 p-6 bg-white border border-border rounded-2xl hover:border-brand-primary transition-all shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                     <h4 className="text-base font-black text-text-primary">{item.title}</h4>
                     <div className="flex items-center gap-2 px-3 py-1 bg-bg-base rounded-lg border border-border">
                        <Calendar className="h-3 w-3 text-text-muted" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{item.duration}</span>
                     </div>
                  </div>
                  <p className="text-sm font-bold text-brand-primary">{item.subtitle}</p>
                  {item.description && (
                    <p className="text-xs font-medium text-text-muted leading-relaxed max-w-2xl">{item.description}</p>
                  )}
                  {item.duration.includes('Present') && (
                    <div className="flex items-center gap-1.5 pt-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-brand-success">Currently Active</span>
                    </div>
                  )}
               </div>
            </motion.div>
          ))}
       </div>
    </div>
  );
};
