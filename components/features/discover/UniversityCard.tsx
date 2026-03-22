"use client";

import React from 'react';
import { MapPin, DollarSign, Heart, ArrowRight, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface University {
  id: string;
  name: string;
  slug: string;
  location: { city: string; country: string; flag: string };
  ranking: string;
  fees: string;
  image: string;
  courses: string[];
  matchScore?: number;
}

export const UniversityCard: React.FC<{ uni: University }> = ({ uni }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": uni.name,
    "url": `https://eduplatform.com/discover/${uni.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": uni.location.city,
      "addressCountry": uni.location.country
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card-premium group relative flex flex-col h-full bg-white border border-border hover:border-brand-primary transition-all overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={uni.image} 
          alt={uni.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 border border-white/20">
          <span className="text-sm">{uni.location.flag}</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">{uni.location.country}</span>
        </div>
        <div className="absolute top-4 left-4 bg-nav-bg/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl border border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">#{uni.ranking} Globally</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-text-primary leading-tight group-hover:text-brand-primary transition-colors">
              {uni.name}
            </h3>
            <div className="flex items-center gap-1.5 text-text-muted">
              <MapPin className="h-3 w-3" />
              <span className="text-[11px] font-medium tracking-tight">{uni.location.city}, {uni.location.country}</span>
            </div>
          </div>
          
          {uni.matchScore && (
            <div className="relative w-12 h-12 shrink-0">
               <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-border" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" 
                  strokeDasharray={126} strokeDashoffset={126 - (126 * uni.matchScore) / 100}
                  className={uni.matchScore > 80 ? 'text-brand-success' : 'text-brand-primary'} 
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-text-primary">
                {uni.matchScore}%
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="h-4 w-4 text-brand-success" />
          <span className="text-sm font-black text-text-primary">{uni.fees} <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">/ year</span></span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {uni.courses.map((course, i) => (
            <span key={i} className="px-2 py-1 rounded bg-bg-base text-[9px] font-bold text-text-muted border border-border/50 uppercase tracking-tighter">
              {course}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-bg-base rounded-xl transition-colors text-text-muted hover:text-red-500">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-bg-base rounded-xl transition-colors text-text-muted hover:text-brand-primary">
              <BarChart3 className="h-5 w-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:text-brand-primary/80 transition-all group/btn">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
