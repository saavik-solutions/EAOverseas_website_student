"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Award, BrainCircuit } from 'lucide-react';

export const TestHero: React.FC = () => {
  return (
    <section className="relative w-full py-12 lg:py-16 mb-8">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Side: Headlines & Search */}
        <div className="flex-1 space-y-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-black uppercase tracking-widest"
          >
            <BookOpen className="h-4 w-4" /> Exam Preparation
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.1]"
          >
            Prepare for Your Path to <br className="hidden md:block"/>
            <span className="text-brand-accent">Global Education</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted font-medium max-w-xl"
          >
            From IELTS to GRE — everything you need to know about international admissions exams, scoring benchmarks, and strategic preparation.
          </motion.p>
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
                 <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">Free</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Mock Tests</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-success/10 flex items-center justify-center mb-4 text-brand-success group-hover:scale-110 transition-transform">
                 <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-text-primary">100k+</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Students Passed</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer -mt-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
                 <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-text-primary">AI</h3>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">Study Plans</p>
           </div>
           
           <div className="card-premium p-6 flex flex-col items-center text-center justify-center aspect-square group hover:-translate-y-1 transition-all cursor-pointer border-brand-accent/20 bg-brand-accent/5">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-brand-accent group-hover:scale-110 transition-transform">
                 <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-black text-text-primary leading-tight mt-2">Study Materials</h3>
              <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-2">Download Now →</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
};
