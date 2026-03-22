"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, AlertTriangle, Target, TrendingUp, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { CourseCard } from '@/components/features/courses/CourseCard';
import { UniversityCard } from '@/components/features/discover/UniversityCard';
import Link from 'next/link';

interface Props {
  data: any; // PAIResult + ProfileData
}

export const PAIResults: React.FC<Props> = ({ data }) => {
  const scores = data.scores || { overall: 84, academic: 82, language: 78, financial: 90, experience: 85 };

  return (
    <div className="space-y-16 py-12">
      {/* Hero: PAI Score Ring */}
      <section className="relative overflow-hidden p-12 bg-nav-bg rounded-[3.5rem] text-white shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 blur-[120px] -translate-y-1/2 translate-x-1/2" />
         
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                 <circle cx="128" cy="128" r="110" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="24" />
                 <motion.circle 
                   cx="128" cy="128" r="110" fill="transparent" stroke="url(#pai-gradient)" strokeWidth="24" 
                   strokeDasharray={2 * Math.PI * 110}
                   initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
                   animate={{ strokeDashoffset: (2 * Math.PI * 110) * (1 - scores.overall / 100) }}
                   transition={{ duration: 2, ease: "easeOut" }}
                   strokeLinecap="round"
                 />
                 <defs>
                   <linearGradient id="pai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#4F46E5" />
                     <stop offset="100%" stopColor="#06B6D4" />
                   </linearGradient>
                 </defs>
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-7xl font-black tracking-tighter"
                  >
                    {scores.overall}
                  </motion.span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">IQ Score</span>
               </div>
            </div>

            <div className="space-y-8 flex-1">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <span className="px-4 py-1.5 bg-brand-accent/20 border border-brand-accent/30 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-accent flex items-center gap-2">
                       <ShieldCheck className="h-3 w-3" /> ~94% Accuracy
                     </span>
                     <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Audit Complete: 2 Mins Ago</span>
                  </div>
                  <h1 className="text-5xl font-black tracking-tight leading-tight">Your Profile Intelligence <br/><span className="text-brand-accent italic">Snapshot</span></h1>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Academic', val: scores.academic, color: 'bg-brand-primary' },
                    { label: 'Language', val: scores.language, color: 'bg-brand-accent' },
                    { label: 'Financial', val: scores.financial, color: 'bg-brand-success' },
                    { label: 'Work Depth', val: scores.experience, color: 'bg-brand-danger' }
                  ].map(cat => (
                    <div key={cat.label} className="space-y-3">
                       <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{cat.label}</span>
                         <span className="text-sm font-black text-white">{cat.val}%</span>
                       </div>
                       <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${cat.val}%` }} transition={{ duration: 1.5, delay: 0.5 }} className={`h-full ${cat.color}`} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Strengths */}
         <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-brand-success" />
              <h2 className="text-2xl font-black text-text-primary tracking-tight">Core Strengths</h2>
            </div>
            <div className="space-y-4">
               {['Highly Competitive GPA', 'Global Project Exposure', 'Financial Feasibility', 'Tech Stack Breadth'].map((s, i) => (
                 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={s} className="p-6 bg-white border border-border rounded-2xl flex items-center gap-6 group hover:border-brand-success transition-all shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-brand-success/10 flex items-center justify-center text-brand-success">
                       <Trophy className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-text-primary">{s}</span>
                 </motion.div>
               ))}
            </div>
         </section>

         {/* Gaps */}
         <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-brand-accent" />
              <h2 className="text-2xl font-black text-text-primary tracking-tight">Gaps to Bridge</h2>
            </div>
            <div className="space-y-4">
               {['GRE Quant Score (Target 165+)', 'SOP Narrative Polish', 'Industry Certification', 'Extracurricular Depth'].map((g, i) => (
                 <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={g} className="p-6 bg-white border border-border rounded-2xl flex items-center gap-6 group hover:border-brand-accent transition-all shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                       <AlertTriangle className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-text-primary">{g}</span>
                 </motion.div>
               ))}
            </div>
         </section>
      </div>

      {/* Recommendations */}
      <section className="space-y-8">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <Target className="h-6 w-6 text-brand-primary" />
             <h2 className="text-3xl font-black text-text-primary tracking-tight">Prime University Matches</h2>
           </div>
           <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">View All Matches</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Using mock University ID for UniversityCard grid */}
            {[1, 2, 3].map(i => (
              <Link href={`/courses/recommendation-${i}`} key={i} className="relative group block">
                <div className="absolute top-6 right-6 z-20 px-3 py-1.5 bg-brand-success text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl">
                   {95 - i*4}% Match
                </div>
                <div className="h-[450px] bg-bg-base/30 rounded-[2.5rem] border border-border border-dashed flex flex-col items-center justify-center gap-4 group-hover:border-brand-primary transition-all">
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-muted italic group-hover:text-brand-primary">Uni Recommendation {i}</p>
                </div>
              </Link>
            ))}
         </div>
      </section>

      {/* Career Roadmap */}
      <section className="p-12 bg-bg-base border border-border rounded-[4rem] relative overflow-hidden">
         <div className="absolute bottom-0 right-0 p-12 opacity-5">
            <TrendingUp className="h-64 w-64" />
         </div>
         <div className="relative z-10 space-y-10">
            <div className="space-y-3">
               <h2 className="text-4xl font-black text-text-primary tracking-tight">AI Generated <span className="text-brand-primary">Career Journey</span></h2>
               <p className="text-lg font-medium text-text-muted leading-relaxed max-w-2xl">Based on your PAI score and selected domain, here is your path to becoming a Senior Software Architect in North America.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { year: 'Year 1: Education', task: 'MSc Computer Science (TUM)', salary: '$65k - $80k' },
                 { year: 'Year 3: Growth', task: 'Full Stack Engineer (Berlin)', salary: '$95k - $120k' },
                 { year: 'Year 5: Seniority', task: 'Senior Architect (Remote/USA)', salary: '$180k - $240k' }
               ].map((step, idx) => (
                 <div key={idx} className="space-y-6 relative">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center text-xl font-black text-brand-primary">
                          {idx + 1}
                       </div>
                       <div className="h-0.5 flex-1 bg-border hidden md:block" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">{step.year}</h4>
                       <p className="text-xl font-black text-text-primary">{step.task}</p>
                       <p className="text-xs font-bold text-text-muted">Est. Salary: <span className="text-brand-success">{step.salary}</span></p>
                    </div>
                 </div>
               ))}
            </div>

            <button className="px-10 py-5 bg-nav-bg text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary shadow-2xl shadow-brand-primary/10 transition-all flex items-center gap-2 group">
               Detailed Career Strategy Report
               <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
         </div>
      </section>
    </div>
  );
};
