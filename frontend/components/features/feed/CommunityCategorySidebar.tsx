"use client";

import React from 'react';
import { Home, MessageSquare, Briefcase, GraduationCap, DollarSign, Plane } from 'lucide-react';

interface CategorySidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CommunityCategorySidebar: React.FC<CategorySidebarProps> = ({ activeCategory, onSelectCategory }) => {
  const categories = [
    { name: 'All Discussions', icon: Home },
    { name: 'Visa & Immigration', icon: Plane, key: 'visa' },
    { name: 'University Reviews', icon: GraduationCap, key: 'reviews' },
    { name: 'Financial Advice', icon: DollarSign, key: 'finance' },
    { name: 'Work & Careers', icon: Briefcase, key: 'careers' },
    { name: 'Social Events', icon: MessageSquare, key: 'social' },
  ];

  return (
    <div className="space-y-2 sticky top-24">
      <h4 className="font-black text-[10px] uppercase tracking-widest text-text-muted px-4 mb-4">Categories</h4>
      {categories.map((cat, idx) => {
        const isActive = activeCategory === (cat.key || cat.name);
        return (
          <button
            key={idx}
            onClick={() => onSelectCategory(cat.key || cat.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isActive 
                ? 'bg-brand-primary/10 text-brand-primary' 
                : 'text-text-muted hover:bg-bg-base hover:text-text-primary'
            }`}
          >
            <cat.icon className={`h-4 w-4 ${isActive ? 'text-brand-primary' : ''}`} />
            {cat.name}
          </button>
        );
      })}
      
      <div className="pt-6 mt-6 border-t border-border px-4">
        <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">
          View All Tags
        </button>
      </div>
    </div>
  );
};
