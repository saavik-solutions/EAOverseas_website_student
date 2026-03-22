"use client";

import React from 'react';
import { Search, Sparkles, Globe2, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchHero: React.FC = () => {
  const suggestions = ['MIT', 'UK', 'Canada', 'MBA', 'MSc', 'Full Funding'];

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
            <Sparkles className="h-4 w-4" /> AI-Powered Discovery
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.1]"
          >
            Discover Your <br className="hidden md:block"/>
            <span className="text-brand-primary">Dream University</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted font-medium max-w-xl"
          >
            Explore over 1,500+ top-tier institutions across 45 countries with real-time AI match analysis and fee transparency.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl space-y-4"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-sm border border-border focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all p-2">
                <div className="flex items-center w-full px-4 text-text-muted select-none">
                   <Search className="h-5 w-5 mr-3 shrink-0" />
                   <input 
                     type="text"
                     placeholder="University name, city, or specialization..."
                     className="w-full h-12 bg-transparent text-base font-bold text-text-primary focus:outline-none placeholder:text-text-muted/60"
                   />
                </div>
                <button className="w-full sm:w-auto mt-2 sm:mt-0 px-8 py-3.5 bg-brand-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mr-2">Trending:</span>
              {suggestions.map((s, idx) => (
                <button 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-bg-base border border-border text-text-secondary text-[11px] font-bold hover:bg-white hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Quick Stats / Usefulness */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:grid grid-cols-2 gap-4 w-full max-w-sm shrink-0"
        >
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                 <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">45+</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Countries</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-success/10 flex items-center justify-center mb-4 text-brand-success group-hover:scale-110 transition-transform">
                 <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">12k+</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Programs</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer -mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
                 <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">1.5k</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Universities</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer border-brand-primary/20 bg-brand-primary/5">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                 <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-black text-text-primary leading-tight mt-2">Personalized Matches</h3>
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-2">View Yours →</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
};
