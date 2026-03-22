"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ActionItem {
  id: number;
  title: string;
  description: string;
  cta: string;
}

const actionItems: ActionItem[] = [
  {
    id: 1,
    title: "GRE Retake Strategy",
    description: "Your Quant score is 5 points below Oxford's average. Focus on Geometry.",
    cta: "Start Practice"
  },
  {
    id: 2,
    title: "Visa Documents",
    description: "Upload your latest bank statements to verify financial readiness for UK.",
    cta: "Upload Docs"
  },
  {
    id: 3,
    title: "SOP Review",
    description: "AI analysis suggests highlighting your Fintech research more prominently.",
    cta: "Analyze SOP"
  }
];

export const AINextSteps: React.FC = () => {
  return (
    <div className="card-premium bg-nav-bg border-2 border-brand-accent p-6 text-white h-full flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="h-5 w-5 text-brand-accent animate-pulse" />
        <h3 className="text-xl font-bold tracking-tight">AI Next Steps</h3>
      </div>

      <div className="space-y-6 flex-1">
        {actionItems.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shrink-0 text-brand-accent font-black text-xs">
                {item.id}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                <p className="text-[11px] text-white/60 leading-relaxed mb-3">{item.description}</p>
                <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-accent group-hover:translate-x-1 transition-transform">
                  {item.cta}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
