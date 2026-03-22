"use client";

import React from 'react';
import { BookOpen, Clock, DollarSign, Globe } from 'lucide-react';

interface CourseCardProps {
  name: string;
  university: string;
  duration: string;
  fees: string;
  level: string;
  flags: string[];
}

export const CourseCard: React.FC<CourseCardProps> = ({
  name,
  university,
  duration,
  fees,
  level,
  flags
}) => {
  return (
    <div className="card-premium p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
          {level}
        </span>
        <div className="flex -space-x-2">
          {flags.map((flag, idx) => (
            <div key={idx} className="w-6 h-6 rounded-full border-2 border-white bg-bg-base flex items-center justify-center text-[10px] overflow-hidden">
               {flag}
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-bold text-text-primary mb-1 line-clamp-2 hover:text-brand-primary transition-colors cursor-pointer">
        {name}
      </h3>
      <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
        <Globe className="h-3.5 w-3.5" />
        {university}
      </p>

      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between py-3 border-y border-border/50">
          <div className="flex items-center gap-2 text-text-muted italic">
            <Clock className="h-4 w-4" />
            <span className="text-xs">{duration}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-text-primary">
            <DollarSign className="h-4 w-4 text-brand-success" />
            <span>{fees}</span>
          </div>
        </div>
        
        <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          <BookOpen className="h-4 w-4" />
          More Details
        </button>
      </div>
    </div>
  );
};
