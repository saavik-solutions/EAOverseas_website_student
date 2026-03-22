"use client";

import React from 'react';
import { DollarSign, Rocket, Wallet, HandCoins, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinancialStep: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Total Budget (USD)</h3>
            <p className="text-[11px] font-medium text-text-muted italic">Including tuition and living costs</p>
          </div>
          <div className="px-6 py-2 bg-brand-primary text-white rounded-xl text-xl font-black shadow-lg shadow-brand-primary/20">
            $45,000 – $60,000
          </div>
        </div>
        <div className="relative pt-6 h-12">
           <div className="h-2 bg-bg-base border border-border rounded-full relative">
              <div className="absolute left-1/4 right-1/4 h-full bg-brand-primary rounded-full transition-all" />
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-brand-primary rounded-full shadow-lg cursor-pointer" />
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-brand-primary rounded-full shadow-lg cursor-pointer" />
           </div>
           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-muted mt-6">
              <span>$5,000</span>
              <span>$100,000</span>
              <span>$200,000+</span>
           </div>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Primary Funding Source</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'Self', icon: Wallet },
             { label: 'Family', icon: HandCoins },
             { label: 'Loan', icon: Landmark },
             { label: 'Scholarship', icon: Rocket }
           ].map((source, idx) => (
             <button key={idx} className="p-6 bg-bg-base/50 border border-border rounded-2xl flex flex-col items-center gap-3 group hover:border-brand-primary hover:bg-white transition-all active:scale-95">
                <source.icon className="h-6 w-6 text-text-muted group-hover:text-brand-primary transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-text-primary">{source.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-8 bg-brand-accent/5 rounded-[2.5rem] border border-brand-accent/10">
         <div className="space-y-1">
           <h4 className="text-xs font-black uppercase tracking-widest text-brand-accent">Scholarship Matching</h4>
           <p className="text-[11px] font-medium text-text-muted leading-relaxed">
             Should we prioritize universities with high international scholarship rates?
           </p>
         </div>
         <div className="w-14 h-7 bg-brand-accent/20 rounded-full relative cursor-pointer group">
            <div className="absolute right-1 top-1 w-5 h-5 bg-brand-accent rounded-full shadow-md group-hover:scale-90 transition-transform" />
         </div>
      </div>
    </div>
  );
};
