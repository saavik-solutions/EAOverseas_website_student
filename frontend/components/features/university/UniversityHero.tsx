"use client";

import React from 'react';
import { MapPin, Award, Users, Calendar, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  country: string;
  city: string;
  bannerImage: string;
  stats: {
    globalRank: string;
    qsRank: string;
    acceptanceRate: string;
    founded: string;
  };
}

export const UniversityHero: React.FC<Props> = ({ name, country, city, bannerImage, stats }) => {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden rounded-b-[4rem] shadow-2xl">
      {/* Banner Image */}
      <img 
        src={bannerImage} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-nav-bg via-nav-bg/60 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end px-12 pb-16 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Top Badges Row */}
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-2">
              <Award className="h-4 w-4 text-brand-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">#{stats.globalRank} Globably</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-2">
              <Globe className="h-4 w-4 text-brand-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">QS Rank #{stats.qsRank}</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-success" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">{stats.acceptanceRate} Acceptance</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-secondary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Est. {stats.founded}</span>
            </div>
          </div>

          {/* Identity */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight">
              {name}
            </h1>
            <div className="flex items-center gap-3 text-xl text-white/70 font-medium">
              <MapPin className="h-6 w-6 text-brand-primary" />
              <span>{city}, {country}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
