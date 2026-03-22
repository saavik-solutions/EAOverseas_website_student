"use client";

import React from 'react';
import { SlidersHorizontal, ChevronDown, Check, Wifi, Home, MapPin, Zap, Coffee, Dumbbell, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AMENITIES = ['WiFi', 'Laundry', 'Gym', 'Kitchen', 'Bills Included', 'Parking', '24/7 Security'];
const TYPES = ['University Dorm', 'Private Studio', 'Shared House', 'Hostel'];

export const AccommodationFilters: React.FC = () => {
  return (
    <div className="w-full lg:w-72 bg-white border border-border rounded-[2.5rem] p-8 space-y-10 sticky top-[100px] h-fit shadow-sm">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <SlidersHorizontal className="h-4 w-4 text-brand-primary" />
             <h3 className="text-sm font-black text-text-primary tracking-tight">Filters</h3>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand-primary transition-colors">Reset</button>
       </div>

       {/* Price Range */}
       <div className="space-y-6">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Monthly Budget</label>
             <span className="text-xs font-black text-brand-primary">$100 - $3k</span>
          </div>
          <div className="px-2 h-1 bg-bg-base rounded-full relative">
             <div className="absolute inset-y-0 left-0 right-0 bg-brand-primary/20 rounded-full" />
             <div className="absolute inset-y-0 left-[20%] right-[40%] bg-brand-primary rounded-full" />
             <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform" />
             <div className="absolute top-1/2 right-[40%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform" />
          </div>
       </div>

       {/* Type */}
       <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Property Type</label>
          <div className="space-y-3">
             {TYPES.map(type => (
               <div key={type} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-xs font-bold text-text-primary group-hover:text-brand-primary transition-colors">{type}</span>
                  <div className="w-5 h-5 rounded-md border-2 border-border group-hover:border-brand-primary transition-all flex items-center justify-center">
                     <Check className="h-3.5 w-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
               </div>
             ))}
          </div>
       </div>

       {/* Distance */}
       <div className="space-y-6">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Distance from Uni</label>
             <span className="text-xs font-black text-brand-primary">&lt; 2.5 km</span>
          </div>
          <div className="px-2 h-1 bg-bg-base rounded-full relative">
             <div className="absolute inset-y-0 left-0 right-[30%] bg-brand-primary rounded-full" />
             <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full shadow-lg" />
          </div>
       </div>

       {/* Amenities */}
       <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Essential Amenities</label>
          <div className="grid grid-cols-2 gap-3">
             {AMENITIES.map(a => (
               <button key={a} className="p-3 bg-bg-base/50 border border-border rounded-xl flex items-center gap-2 hover:border-brand-primary group transition-all text-left">
                  <div className="w-2 h-2 rounded-full border border-border group-hover:bg-brand-primary transition-all" />
                  <span className="text-[9px] font-bold text-text-muted group-hover:text-text-primary truncate">{a}</span>
               </button>
             ))}
          </div>
       </div>

       {/* Safety Badge */}
       <div className="p-6 bg-brand-success/5 border border-brand-success/10 rounded-2xl flex items-center gap-4">
          <ShieldCheck className="h-5 w-5 text-brand-success" />
          <p className="text-[9px] font-bold text-brand-success leading-tight">All properties listed are EduPlatform Verified for safety and student comfort.</p>
       </div>
    </div>
  );
};
