"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, TrendingUp, Calendar, Search } from 'lucide-react';

export const ComparisonsArchive: React.FC = () => {
  const comparisons = [
     { id: 1, title: 'Harvard vs. Stanford', type: 'MSc Computer Science', match: 89, date: 'Mar 15, 2026' },
     { id: 2, title: 'Oxford vs. Cambridge', type: 'MSc Artificial Intelligence', match: 84, date: 'Feb 28, 2026' },
     { id: 3, title: 'UCL vs. Imperial', type: 'Data Science', match: 92, date: 'Jan 12, 2026' },
  ];

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
          <div className="space-y-1">
             <h3 className="text-xl font-black text-text-primary tracking-tight">Comparison Archive</h3>
             <p className="text-xs font-medium text-text-muted">Your institutional match history</p>
          </div>
          <button className="p-3 bg-bg-base rounded-xl text-text-muted hover:text-brand-primary transition-all"><Search className="h-5 w-5" /></button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisons.map((c, idx) => (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               key={idx} 
               className="p-8 bg-white border border-border rounded-3xl hover:border-brand-primary hover:shadow-2xl transition-all group"
            >
               <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                     <FileText className="h-6 w-6" />
                  </div>
                  <div className="px-3 py-1 bg-brand-success/5 border border-brand-success/10 rounded-lg flex items-center gap-1.5">
                     <TrendingUp className="h-3 w-3 text-brand-success" />
                     <span className="text-[10px] font-black tracking-widest text-brand-success">{c.match}% Match</span>
                  </div>
               </div>

               <div className="space-y-2 mb-8">
                  <h4 className="text-lg font-black text-text-primary truncate">{c.title}</h4>
                  <p className="text-xs font-medium text-text-muted">{c.type}</p>
               </div>

               <div className="pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-muted">
                     <Calendar className="h-3.5 w-3.5" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{c.date}</span>
                  </div>
                  <button className="p-2 bg-nav-bg text-white rounded-xl hover:bg-brand-primary transition-all shadow-lg">
                     <ArrowRight className="h-4 w-4" />
                  </button>
               </div>
            </motion.div>
          ))}
       </div>
    </div>
  );
};
