"use client";

import React from 'react';
import { BookMarked, ExternalLink, ShieldCheck } from 'lucide-react';

interface TestCardProps {
  name: string;
  logo: string;
  description: string;
  price: string;
}

export const TestCard: React.FC<TestCardProps> = ({
  name,
  logo,
  description,
  price
}) => {
  return (
    <div className="card-premium p-6 group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-bg-base border border-border flex items-center justify-center p-2 group-hover:bg-brand-primary/5 transition-colors">
          <span className="text-2xl font-bold text-brand-primary">{logo}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">{name}</h3>
          <div className="flex items-center gap-1.5 text-brand-success">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Official Prep</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-muted mb-6 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-border/50">
        <div className="flex flex-col">
          <span className="text-[10px] text-text-muted uppercase font-medium">Starting from</span>
          <span className="text-lg font-bold text-text-primary">{price}</span>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-bg-base text-text-primary font-bold rounded-lg border border-border hover:bg-brand-primary hover:text-white transition-all group-hover:shadow-md">
          <BookMarked className="h-4 w-4" />
          Enroll Now
        </button>
      </div>
    </div>
  );
};
