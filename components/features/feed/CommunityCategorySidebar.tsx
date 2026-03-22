"use client";

import React from 'react';
import { Home, MessageSquare, Briefcase, GraduationCap, DollarSign, Plane } from 'lucide-react';

export const CommunityCategorySidebar: React.FC = () => {
  const categories = [
    { name: 'All Discussions', icon: Home, active: true },
    { name: 'Visa & Immigration', icon: Plane },
    { name: 'University Reviews', icon: GraduationCap },
    { name: 'Financial Advice', icon: DollarSign },
    { name: 'Work & Careers', icon: Briefcase },
    { name: 'Social Events', icon: MessageSquare },
  ];

  return (
    <div className="space-y-2 sticky top-24">
      <h4 className="font-black text-[10px] uppercase tracking-widest text-text-muted px-4 mb-4">Categories</h4>
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
            cat.active 
              ? 'bg-brand-primary/10 text-brand-primary' 
              : 'text-text-muted hover:bg-bg-base hover:text-text-primary'
          }`}
        >
          <cat.icon className="h-4 w-4" />
          {cat.name}
        </button>
      ))}
      
      <div className="pt-6 mt-6 border-t border-border px-4">
        <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">
          View All Tags
        </button>
      </div>
    </div>
  );
};
