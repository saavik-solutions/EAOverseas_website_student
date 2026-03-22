"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchHero } from '@/components/features/discover/SearchHero';
import { FilterSidebar } from '@/components/features/discover/FilterSidebar';
import { UniversityCard, University } from '@/components/features/discover/UniversityCard';
import { ActiveFilters } from '@/components/features/discover/ActiveFilters';
import { ListFilter, ChevronRight } from 'lucide-react';

const mockUniversities: University[] = [
  {
    id: 'u1',
    name: 'University of Cambridge',
    slug: 'university-of-cambridge',
    location: { city: 'Cambridge', country: 'United Kingdom', flag: '🇬🇧' },
    ranking: '2',
    fees: '£33,800 – £58,000',
    image: 'https://images.unsplash.com/photo-1590496794008-383c8070bb25?auto=format&fit=crop&q=80&w=800',
    courses: ['Computer Science', 'Medicine', 'Economics'],
    matchScore: 94
  },
  {
    id: 'u2',
    name: 'University of Toronto',
    slug: 'university-of-toronto',
    location: { city: 'Toronto', country: 'Canada', flag: '🇨🇦' },
    ranking: '18',
    fees: '$45,000 – $62,000',
    image: 'https://images.unsplash.com/photo-1541339905195-03f8998250b7?auto=format&fit=crop&q=80&w=800',
    courses: ['Engineering', 'Data Science', 'Nursing'],
    matchScore: 88
  },
  {
    id: 'u3',
    name: 'TU Munich',
    slug: 'tu-munich',
    location: { city: 'Munich', country: 'Germany', flag: '🇩🇪' },
    ranking: '37',
    fees: '€0 (No Tuition)',
    image: 'https://images.unsplash.com/photo-1592285734435-06994ff5cb17?auto=format&fit=crop&q=80&w=800',
    courses: ['Automotive Eng', 'Robotics', 'Management'],
    matchScore: 76
  },
  {
    id: 'u4',
    name: 'Melbourne University',
    slug: 'melbourne-university',
    location: { city: 'Melbourne', country: 'Australia', flag: '🇦🇺' },
    ranking: '14',
    fees: '$38,000 – $52,000',
    image: 'https://images.unsplash.com/photo-1523050335392-9bc5675e745f?auto=format&fit=crop&q=80&w=800',
    courses: ['Architecture', 'Arts', 'Dentistry'],
    matchScore: 82
  }
];

export function DiscoveryContent() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eduplatform.com/dashboard"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Discover Universities",
        "item": "https://eduplatform.com/discover"
      }
    ]
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      {/* Breadcrumbs UI */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted mb-6">
        <span>Home</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-brand-primary">Discover Universities</span>
      </nav>

      <SearchHero />
      
      <div className="flex flex-col lg:flex-row gap-10">
        <FilterSidebar />

        <div className="flex-1">
          <ActiveFilters />
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-text-primary tracking-tight">
              Showing 1,542 <span className="text-text-muted font-bold text-sm">institutions found</span>
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl shadow-sm text-xs font-bold text-text-primary group">
              <ListFilter className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
              Sort: Rank (High-Low)
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card-premium h-[420px] animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...mockUniversities, ...mockUniversities, ...mockUniversities].map((uni, idx) => (
                  <UniversityCard key={`${uni.id}-${idx}`} uni={uni} />
                ))}
              </div>

              <div className="mt-16 flex flex-col items-center gap-4">
                 <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Loading more global opportunities...</p>
                 <button className="mt-4 px-10 py-4 bg-white border border-border rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:shadow-xl transition-all">
                    Load More Fallback
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
