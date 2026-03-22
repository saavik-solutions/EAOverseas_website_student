"use client";

import React from 'react';
import { CheckCircle2, XCircle, Info, ArrowRight } from 'lucide-react';

interface ComparisonReportProps {
  university: string;
  logo?: string;
  matchScore: number;
  dateCompared: string;
  topGap: string;
  requirements: {
    label: string;
    met: boolean;
    value: string;
  }[];
}

export const ComparisonReport: React.FC<ComparisonReportProps> = ({
  university,
  logo,
  matchScore,
  dateCompared,
  topGap,
  requirements
}) => {
  return (
    <div className="card-premium p-6 w-full cursor-pointer hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-bg-base border border-border flex items-center justify-center font-black text-brand-primary overflow-hidden">
            {logo ? <img src={logo} alt={university} className="w-full h-full object-cover" /> : university[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary leading-tight">{university}</h3>
            <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest mt-1">Compared on {dateCompared}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-black ${matchScore > 70 ? 'text-brand-success' : 'text-brand-warning'}`}>
            {matchScore}%
          </div>
          <p className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">Match</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-brand-danger/5 rounded-lg border border-brand-danger/10">
          <div className="flex gap-2">
            <XCircle className="h-4 w-4 text-brand-danger shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[10px] font-black text-brand-danger uppercase tracking-widest">Top Gap</span>
              <p className="text-xs font-bold text-text-primary mt-1">{topGap}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {requirements.slice(0, 2).map((req, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-bg-base rounded-lg border border-border/50">
               <span className="text-[10px] font-bold text-text-muted">{req.label}</span>
               {req.met ? <CheckCircle2 className="h-4 w-4 text-brand-success" /> : <XCircle className="h-4 w-4 text-brand-danger" />}
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 rounded-lg hover:bg-brand-primary hover:text-white transition-all">
        Open Full Report
      </button>
    </div>
  );
};
