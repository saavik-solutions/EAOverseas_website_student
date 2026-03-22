"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle, Star, Target, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface PAIAnalysis {
  overallScore: number;
  tier: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  targetUniversities: string[];
  recommendedCourses: string[];
  budgetFit: string;
  visaOutlook: string;
  nextSteps: string[];
}

export const PAIWidget: React.FC = () => {
  const [analysis, setAnalysis] = useState<PAIAnalysis | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('pai_analysis');
    if (raw) {
      try { setAnalysis(JSON.parse(raw)); } catch (e) {}
    }
  }, []);

  if (!analysis) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-6 border-2 border-dashed border-brand-primary/30 bg-gradient-to-br from-brand-primary/5 to-purple-500/5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <h3 className="font-black text-text-primary">Profile Audit Intelligence</h3>
            <p className="text-xs text-text-muted font-medium">No analysis yet</p>
          </div>
        </div>
        <p className="text-sm text-text-muted font-medium mb-5">
          Complete your Profile Audit to unlock AI-powered insights on your university matches, visa prospects, and study path.
        </p>
        <Link href="/onboarding">
          <button className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold">
            <Sparkles className="h-4 w-4" />
            Generate My PAI Report
          </button>
        </Link>
      </motion.div>
    );
  }

  const tierColors: Record<string, string> = {
    Gold: 'text-yellow-500 bg-yellow-50 border-yellow-200',
    Silver: 'text-slate-500 bg-slate-50 border-slate-200',
    Bronze: 'text-orange-500 bg-orange-50 border-orange-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <h3 className="font-black text-text-primary">PAI Report</h3>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${tierColors[analysis.tier] || tierColors.Silver}`}>
              <Star className="h-3 w-3" />
              {analysis.tier} Tier
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-brand-primary">{analysis.overallScore}</div>
          <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">/100</div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-text-muted font-medium leading-relaxed">{analysis.summary}</p>

      {/* Strengths */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-3 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-brand-success" /> Strengths
        </h4>
        <div className="space-y-2">
          {analysis.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm font-medium text-text-primary">
              <div className="w-4 h-4 rounded-full bg-brand-success/15 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-success" />
              </div>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Improvements */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-3 flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 text-brand-warning" /> Areas to Improve
        </h4>
        <div className="space-y-2">
          {analysis.improvements.map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm font-medium text-text-primary">
              <div className="w-4 h-4 rounded-full bg-brand-warning/15 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-warning" />
              </div>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Target Universities */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-3 flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-brand-primary" /> Matched Universities
        </h4>
        <div className="flex flex-wrap gap-2">
          {analysis.targetUniversities.map((u, i) => (
            <span key={i} className="px-3 py-1.5 bg-brand-primary/8 rounded-full text-xs font-bold text-brand-primary border border-brand-primary/20">{u}</span>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-bg-base rounded-2xl p-4 space-y-2">
        <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-2">AI Recommended Steps</h4>
        {analysis.nextSteps.map((step, i) => (
          <div key={i} className="flex items-start gap-3 text-sm font-medium text-text-primary">
            <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">{i + 1}</div>
            {step}
          </div>
        ))}
      </div>

      {/* Re-analyze button */}
      <Link href="/onboarding">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-text-muted hover:text-brand-primary hover:border-brand-primary transition-all font-bold text-sm">
          <RefreshCw className="h-4 w-4" /> Update My Profile
        </button>
      </Link>
    </motion.div>
  );
};
