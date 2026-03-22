"use client";

import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border border-border rounded-xl p-6 hidden lg:block sticky top-24 h-fit">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-brand-primary" />
        <h3 className="font-semibold text-text-primary text-lg">Filters</h3>
      </div>

      <div className="space-y-6">
        <FilterGroup label="Country" options={['United Kingdom', 'USA', 'Canada', 'Australia', 'Germany']} />
        <FilterGroup label="Course Level" options={['Undergraduate', 'Postgraduate', 'PhD', 'Diploma']} />
        <FilterGroup label="Tuition Fees" options={['< $10k', '$10k - $20k', '$20k - $30k', '$30k+']} />
        <FilterGroup label="English Language" options={['IELTS', 'TOEFL', 'PTE', 'Duolingo']} />
      </div>

      <button className="w-full mt-8 py-2.5 bg-bg-base text-text-primary font-medium rounded-lg border border-border hover:bg-border transition-colors text-sm">
        Reset Filters
      </button>
    </div>
  );
};

const FilterGroup: React.FC<{ label: string; options: string[] }> = ({ label, options }) => (
  <div>
    <div className="flex items-center justify-between mb-3 group cursor-pointer">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      <ChevronDown className="h-4 w-4 text-text-muted transition-transform group-hover:translate-y-0.5" />
    </div>
    <div className="space-y-2.5">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input type="checkbox" className="peer appearance-none h-4 w-4 border border-border rounded checked:bg-brand-primary checked:border-brand-primary transition-all" />
            <div className="absolute text-white scale-0 peer-checked:scale-100 transition-transform">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">{option}</span>
        </label>
      ))}
    </div>
  </div>
);
