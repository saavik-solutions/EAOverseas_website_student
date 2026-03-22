"use client";

import React from 'react';
import { Award, ClipboardCheck, Info } from 'lucide-react';

export const TestScoreStep: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Language Tests */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <ClipboardCheck className="h-5 w-5 text-brand-primary" />
             <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">English Proficiency</h3>
          </div>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-bg-base/50 border border-border rounded-xl group hover:border-brand-primary transition-all">
                <span className="text-xs font-black uppercase tracking-widest text-text-muted">IELTS Overall</span>
                <input type="number" step="0.5" placeholder="0.0" className="w-20 h-10 bg-white border border-border rounded-lg text-center font-black text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
             </div>
             <div className="flex items-center justify-between p-4 bg-bg-base/50 border border-border rounded-xl group hover:border-brand-primary transition-all">
                <span className="text-xs font-black uppercase tracking-widest text-text-muted">TOEFL iBT</span>
                <input type="number" placeholder="0" className="w-20 h-10 bg-white border border-border rounded-lg text-center font-black text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
             </div>
             <div className="flex items-center justify-between p-4 bg-bg-base/50 border border-border rounded-xl group hover:border-brand-primary transition-all">
                <span className="text-xs font-black uppercase tracking-widest text-text-muted">Duolingo</span>
                <input type="number" placeholder="0" className="w-20 h-10 bg-white border border-border rounded-lg text-center font-black text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
             </div>
          </div>
        </div>

        {/* Aptitude Tests */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <Award className="h-5 w-5 text-brand-accent" />
             <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Aptitude & Entrance</h3>
          </div>
          <div className="space-y-4">
             <div className="space-y-2">
                <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">GRE (Total)</span>
                   <span className="text-xs font-black text-brand-accent italic">Optional</span>
                </div>
                <input type="text" placeholder="e.g. 325 (165Q, 160V)" className="w-full h-12 px-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/20" />
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">GMAT Score</span>
                   <span className="text-xs font-black text-brand-accent italic">Optional</span>
                </div>
                <input type="number" placeholder="e.g. 720" className="w-full h-12 px-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/20" />
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">SAT / ACT</span>
                   <span className="text-xs font-black text-brand-accent italic">Optional</span>
                </div>
                <input type="text" placeholder="e.g. 1540" className="w-full h-12 px-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/20" />
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 flex items-start gap-4">
         <Info className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
         <div className="space-y-1">
           <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary">Why provide these?</h4>
           <p className="text-[11px] font-medium text-text-muted leading-relaxed">
             Even optional scores help AI calibrate your "Academic Match" more accurately. If you haven't taken these yet, you can skip this step or enter your target scores.
           </p>
         </div>
      </div>
    </div>
  );
};
