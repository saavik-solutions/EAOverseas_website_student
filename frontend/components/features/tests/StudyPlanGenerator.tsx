"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Target, Loader2, CheckCircle2, Send, Wand2 } from 'lucide-react';

export const StudyPlanGenerator: React.FC = () => {
  const [targetScore, setTargetScore] = useState('');
  const [timeline, setTimeline] = useState('30 Days');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);

  const generatePlan = async () => {
    setIsGenerating(true);
    // Simulation of OpenAI call
    setTimeout(() => {
      setPlan(`
        ### 📚 Week 1: Foundations & Diagnostic
        - **Day 1-3**: Full-length diagnostic test + Review gaps.
        - **Day 4-7**: Grammar focus & Vocabulary expansion (top 500 words).

        ### 🎯 Week 2: Sectional Deep-Dive
        - **Day 8-10**: Reading strategies (skimming, scanning, predicting).
        - **Day 11-14**: Listening drills (note-taking, accent exposure).

        ### ✍️ Week 3: Strategy & Practice
        - **Day 15-18**: Writing Task 1 & 2 templates + Peer review.
        - **Day 19-21**: Speaking cues and fluency recording.
      `);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 p-12 bg-nav-bg text-white rounded-[4rem] relative overflow-hidden shadow-2xl">
       <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/20 blur-[120px] -translate-y-1/2 translate-x-1/2" />
       
       <div className="relative z-10 space-y-8">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-brand-accent" />
                <h2 className="text-3xl font-black tracking-tight">AI Strategy Generator</h2>
             </div>
             <p className="text-lg text-white/60 font-medium max-w-xl leading-relaxed">
                Generate a precision 30-day study plan tailored to your target score and academic schedule.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Target Score</label>
                <input 
                  type="text" 
                  value={targetScore}
                  onChange={(e) => setTargetScore(e.target.value)}
                  placeholder="e.g. 8.0 / 325"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-accent outline-none"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Preparation Window</label>
                <select 
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-accent outline-none appearance-none"
                >
                   <option className="text-nav-bg">15 Days (Intensive)</option>
                   <option className="text-nav-bg">30 Days (Standard)</option>
                   <option className="text-nav-bg">60 Days (Comprehensive)</option>
                </select>
             </div>
             <div className="flex items-end">
                <button 
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="w-full h-[56px] bg-brand-accent text-nav-bg rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                   {isGenerating ? (
                     <Loader2 className="h-5 w-5 animate-spin" />
                   ) : (
                     <>
                        <Wand2 className="h-4 w-4" />
                        Generate Plan
                     </>
                   )}
                </button>
             </div>
          </div>

          <AnimatePresence>
             {plan && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="mt-8 p-10 bg-white/10 border border-white/10 rounded-[3rem] backdrop-blur-md prose prose-invert prose-sm max-w-none"
               >
                  <div className="flex items-center gap-3 mb-8">
                     <CheckCircle2 className="h-6 w-6 text-brand-success" />
                     <h3 className="text-xl font-black text-white m-0">Your Personalized Roadmap</h3>
                  </div>
                  <div className="whitespace-pre-line text-white/80 font-medium">
                     {plan}
                  </div>
               </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};
