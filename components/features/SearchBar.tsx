"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search universities, courses, or countries...",
  onSearch 
}) => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-text-muted" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl shadow-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none text-sm"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-border rounded bg-bg-base text-[10px] font-medium text-text-muted">
          ⌘K
        </kbd>
      </div>
    </div>
  );
};
