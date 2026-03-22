"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export const ActiveFilters: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeFilters: { key: string; value: string }[] = [];
  searchParams.forEach((value, key) => {
    activeFilters.push({ key, value });
  });

  const removeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    const filtered = current.filter(v => v !== value);
    params.delete(key);
    filtered.forEach(v => params.append(key, v));
    router.push(`/discover?${params.toString()}`);
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Active Filters:</span>
      {activeFilters.map((f, idx) => (
        <button
          key={`${f.key}-${f.value}-${idx}`}
          onClick={() => removeFilter(f.key, f.value)}
          className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/20 transition-all group"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">{f.value}</span>
          <X className="h-3 w-3 group-hover:scale-125 transition-transform" />
        </button>
      ))}
      <button 
        onClick={() => router.push('/discover')}
        className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand-primary underline underline-offset-4"
      >
        Clear all
      </button>
    </div>
  );
};
