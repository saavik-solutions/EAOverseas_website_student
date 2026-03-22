"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Calendar, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  test: any;
}

export const TestCard: React.FC<Props> = ({ test }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white border border-border rounded-[2.5rem] p-8 hover:shadow-2xl transition-all relative overflow-hidden flex flex-col h-full"
    >
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
       
       <div className="flex items-start justify-between mb-8">
          <div className="w-16 h-16 rounded-2xl bg-bg-base flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
             {test.logo}
          </div>
          <span className="px-4 py-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary">
             {test.category}
          </span>
       </div>

       <div className="space-y-4 mb-8 flex-1">
          <h3 className="text-2xl font-black text-text-primary tracking-tight group-hover:text-brand-primary transition-colors">{test.name}</h3>
          <p className="text-sm font-medium text-text-muted leading-relaxed line-clamp-2">
             {test.summary}
          </p>
       </div>

       <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="space-y-1">
             <div className="flex items-center gap-2 text-text-muted">
                <Globe className="h-3.5 w-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Reach</span>
             </div>
             <p className="text-xs font-bold text-text-primary">140+ Countries</p>
          </div>
          <div className="space-y-1">
             <div className="flex items-center gap-2 text-text-muted">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Validity</span>
             </div>
             <p className="text-xs font-bold text-text-primary">{test.validity}</p>
          </div>
       </div>

       <div className="pt-8 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Approx. Fee</span>
             <span className="text-sm font-black text-brand-success">{test.fee}</span>
          </div>
          <Link 
            href={`/tests/${test.slug}`}
            className="w-12 h-12 rounded-xl bg-nav-bg text-white flex items-center justify-center group-hover:bg-brand-primary transition-colors shadow-lg"
          >
             <ArrowRight className="h-5 w-5" />
          </Link>
       </div>
    </motion.div>
  );
};
