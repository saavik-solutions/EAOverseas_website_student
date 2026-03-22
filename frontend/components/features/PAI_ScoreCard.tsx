"use client";

import React from 'react';
import { ShieldCheck, Zap, Target, BookOpenCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface PAI_ScoreCardProps {
  scores: {
    academic: number;
    financial: number;
    visa: number;
    extracurricular: number;
  };
}

export const PAI_ScoreCard: React.FC<PAI_ScoreCardProps> = ({ scores }) => {
  const metrics = [
    { label: 'Academic Integrity', value: scores.academic, icon: BookOpenCheck, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { label: 'Financial Readiness', value: scores.financial, icon: Target, color: 'text-brand-success', bg: 'bg-brand-success/10' },
    { label: 'Visa Probability', value: scores.visa, icon: ShieldCheck, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
    { label: 'Profile Depth', value: scores.extracurricular, icon: Zap, color: 'text-brand-warning', bg: 'bg-brand-warning/10' },
  ];

  return (
    <div className="card-premium p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-nav-bg rounded-2xl flex items-center justify-center">
          <span className="text-white font-black text-xl">PAI</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">Profile Audit Intelligence</h3>
          <p className="text-xs text-text-muted font-medium">Enterprise Evaluation Framework</p>
        </div>
      </div>

      <div className="space-y-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${metric.bg}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <span className="text-sm font-bold text-text-primary">{metric.label}</span>
              </div>
              <span className={`text-sm font-black ${metric.color}`}>{metric.value}/100</span>
            </div>
            <div className="h-2 w-full bg-bg-base rounded-full overflow-hidden border border-border/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className={`h-full bg-current ${metric.color.replace('text', 'bg')}`} 
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-10 py-4 bg-nav-bg text-white font-bold rounded-xl shadow-lg border-b-4 border-black/20 hover:translate-y-0.5 active:translate-y-1 transition-all">
        Download Full PDF Report
      </button>
    </div>
  );
};
