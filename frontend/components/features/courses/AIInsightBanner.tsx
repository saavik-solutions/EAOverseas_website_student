"use client";

import React from 'react';
import { Sparkles, ShieldCheck, Coins, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  courseName: string;
}

export const AIInsightBanner: React.FC<Props> = ({ courseName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="p-8 bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-[2.5rem] text-white shadow-2xl shadow-brand-primary/20 relative overflow-hidden group"
    >
      {/* Animated Sparkles */}
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
        <Sparkles className="h-24 w-24 rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
        <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
          <Zap className="h-12 w-12 text-brand-accent fill-brand-accent" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">Personalized AI Insight</span>
             <span className="text-white/60 text-xs font-bold">• Profile Snapshot Applied</span>
          </div>
          <h3 className="text-3xl font-black tracking-tight leading-tight">
            Based on your profile, these 3 countries give you the <span className="text-brand-accent italic">smoothest</span> path for {courseName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {[
              { country: 'Germany', reason: 'Highest affordability', icon: Coins },
              { country: 'UK', reason: 'Fastest visa turnaround', icon: ShieldCheck },
              { country: 'Australia', reason: 'Top post-study work rights', icon: ShieldCheck }
            ].map((insight, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer group/item">
                <insight.icon className="h-5 w-5 text-brand-accent" />
                <div className="space-y-0.5">
                  <div className="text-sm font-black">{insight.country}</div>
                  <div className="text-[10px] font-medium text-white/60">{insight.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="px-8 py-4 bg-white text-brand-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0">
           View Detailed Report
           <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};
