"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Trophy, GraduationCap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface UniversityCardProps {
  name: string;
  country: string;
  ranking: number;
  fees: string;
  image: string;
  matchPercentage: number;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({
  name,
  country,
  ranking,
  fees,
  image,
  matchPercentage,
}) => {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="card-premium overflow-hidden group"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border/50 flex items-center gap-1.5 shadow-sm">
          <Star className="h-4 w-4 text-brand-warning fill-brand-warning" />
          <span className="text-sm font-bold text-text-primary">{matchPercentage}% Match</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2 text-text-muted">
          <MapPin className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">{country}</span>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-4 truncate group-hover:text-brand-primary transition-colors">
          {name}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-muted">
              <Trophy className="h-4 w-4" />
              <span className="text-xs">World Ranking</span>
            </div>
            <p className="font-bold text-text-primary">#{ranking}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-muted">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">Avg. Annual Fee</span>
            </div>
            <p className="font-bold text-text-primary">{fees}</p>
          </div>
        </div>
        
        <button className="w-full py-3 bg-bg-base text-brand-primary font-bold rounded-xl border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition-all duration-300">
          View University
        </button>
      </div>
    </motion.div>
  );
};
