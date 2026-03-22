"use client";

import React from 'react';
import { Search, GraduationCap, Building2, BookOpen, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export const CourseHero: React.FC = () => {
  const domains = [
    { label: 'Engineering', icon: '⚙️' },
    { label: 'Business', icon: '💼' },
    { label: 'Medical', icon: '🩺' },
    { label: 'Arts', icon: '🎨' },
    { label: 'Law', icon: '⚖️' },
    { label: 'Sciences', icon: '🧪' }
  ];

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
            <GraduationCap className="h-4 w-4" /> Global Program Discovery
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.1]"
          >
            Find Your Perfect Course, <br className="hidden md:block"/>
            <span className="text-brand-primary">Worldwide</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl space-y-5"
          >
            <div className="relative group z-20">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-sm border border-border focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all p-2">
                <div className="flex items-center w-full px-4 text-text-muted select-none">
                   <Search className="h-5 w-5 mr-3 shrink-0" />
                   <input 
                     type="text"
                     placeholder="Course name (e.g. MSc Data Science, MBA...)"
                     className="w-full h-12 bg-transparent text-base font-bold text-text-primary focus:outline-none placeholder:text-text-muted/60"
                   />
                </div>
                <button className="w-full sm:w-auto mt-2 sm:mt-0 px-8 py-3.5 bg-brand-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Explore
                </button>
              </div>

               {/* Autocomplete Dropdown */}
               <div className="absolute top-full left-0 right-0 mt-3 p-4 bg-white shadow-2xl border border-border/50 rounded-2xl hidden group-focus-within:block animate-in fade-in slide-in-from-top-2">
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-muted px-2 py-1">Trending Searches</p>
                   <div className="grid grid-cols-2 gap-2 mt-3">
                     {['Masters in AI', 'MBA in UK', 'Nursing Australia', 'Law in Canada'].map(s => (
                       <button key={s} className="px-4 py-3 bg-bg-base hover:bg-brand-primary/5 hover:text-brand-primary rounded-xl text-left text-sm font-bold text-text-secondary transition-colors">
                         {s}
                       </button>
                     ))}
                   </div>
                </div>
            </div>

            {/* Domains */}
            <div className="flex flex-wrap items-center gap-2 pt-4 relative z-10">
              {domains.map((d, idx) => (
                <button 
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white border border-border flex items-center gap-2 text-text-secondary text-[11px] font-bold hover:border-brand-primary hover:text-brand-primary hover:-translate-y-0.5 transition-all shadow-sm"
                >
                  <span className="text-sm">{d.icon}</span>
                  {d.label}
                </button>
              ))}
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
                 <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">1.5k</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Institutions</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-success/10 flex items-center justify-center mb-4 text-brand-success group-hover:scale-110 transition-transform">
                 <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">12k+</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Global Programs</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer -mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
                 <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">AI</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Syllabus Match</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer border-brand-primary/20 bg-brand-primary/5">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                 <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-black text-text-primary leading-tight mt-2">Scholarships</h3>
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-2">Check Eligibility →</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
};
