"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, GraduationCap, ChevronRight } from 'lucide-react';

interface Props {
  guide: Array<{ range: string; mapping: string; color: string }>;
  testName: string;
}

export const ScoreGuide: React.FC<Props> = ({ guide, testName }) => {
  return (
    <div className="space-y-8 p-10 bg-bg-base/30 rounded-[3rem] border border-border">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
             <Target className="h-6 w-6" />
          </div>
          <div>
             <h3 className="text-xl font-black text-text-primary tracking-tight">{testName} Score Mapping</h3>
             <p className="text-xs font-medium text-text-muted">Universal eligibility benchmarks</p>
          </div>
       </div>

       <div className="space-y-4">
          {guide.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="p-6 bg-white border border-border rounded-2xl flex items-center justify-between group hover:border-brand-primary transition-all shadow-sm"
            >
               <div className="flex items-center gap-6">
                  <div className={`text-2xl font-black ${item.color} w-24 shrink-0`}>
                     {item.range}
                  </div>
                  <div className="h-4 w-[1px] bg-border" />
                  <div className="space-y-1">
                     <p className="text-sm font-black text-text-primary">{item.mapping}</p>
                     <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100">
                        <GraduationCap className="h-3 w-3 text-brand-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Direct Admission Potential</span>
                     </div>
                  </div>
               </div>
               <ChevronRight className="h-4 w-4 text-text-muted group-hover:translate-x-1 transition-transform" />
            </motion.div>
          ))}
       </div>

       <div className="p-6 bg-white border border-border rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-success/10 flex items-center justify-center text-brand-success">
             <Trophy className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-text-primary italic italic-brand-primary">
             Note: Individual university requirements may vary based on your PAI profile audit.
          </p>
       </div>
    </div>
  );
};
