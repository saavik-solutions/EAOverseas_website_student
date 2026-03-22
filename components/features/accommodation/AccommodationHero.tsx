"use client";

import React from 'react';
import { Search, Map as MapIcon, Grid, Home, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  view: 'grid' | 'map';
  onViewChange: (view: 'grid' | 'map') => void;
}

export const AccommodationHero: React.FC<Props> = ({ view, onViewChange }) => {
  return (
    <section className="relative w-full py-12 lg:py-16 mb-8">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Side: Headlines & Search */}
        <div className="flex-1 space-y-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest"
          >
            <Home className="h-4 w-4" /> Verified Housing
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.1]"
          >
            Find Student Accommodation <br className="hidden md:block"/>
            Near Your <span className="text-brand-primary">University</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted font-medium max-w-xl"
          >
            Secure your home away from home. Discover verified student housing with proximity-based searching and university campus integration.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
               <div className="relative flex-1 group w-full">
                 <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                 <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-border focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all p-2 h-[60px]">
                    <Search className="h-5 w-5 ml-2 mr-3 text-text-muted shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Enter city or university name..."
                      className="w-full h-full bg-transparent text-base font-bold text-text-primary focus:outline-none placeholder:text-text-muted/60"
                    />
                 </div>
               </div>
               
               <div className="flex items-center gap-2 p-1.5 bg-bg-base border border-border rounded-xl h-[60px]">
                  <button 
                    onClick={() => onViewChange('grid')}
                    className={`flex items-center gap-2 px-5 h-full rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'grid' ? 'bg-white text-brand-primary shadow-sm border border-border/50' : 'text-text-muted hover:text-text-primary hover:bg-white/50'}`}
                  >
                     <Grid className="h-4 w-4" />
                     <span className="hidden md:inline">Grid</span>
                  </button>
                  <button 
                    onClick={() => onViewChange('map')}
                    className={`flex items-center gap-2 px-5 h-full rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'map' ? 'bg-white text-brand-primary shadow-sm border border-border/50' : 'text-text-muted hover:text-text-primary hover:bg-white/50'}`}
                  >
                     <MapIcon className="h-4 w-4" />
                     <span className="hidden md:inline">Map</span>
                  </button>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:grid grid-cols-2 gap-4 w-full max-w-sm shrink-0"
        >
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                 <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">100%</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Verified Properties</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-success/10 flex items-center justify-center mb-4 text-brand-success group-hover:scale-110 transition-transform">
                 <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">5k+</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Near Campuses</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer -mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
                 <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">0$</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Booking Fees</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer border-brand-primary/20 bg-brand-primary/5">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                 <Home className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-black text-text-primary leading-tight mt-2">Find a Roommate</h3>
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-2">Join Network →</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
};
