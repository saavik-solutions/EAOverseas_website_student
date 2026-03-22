"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp, DollarSign, BookOpen, UserCircle, Rocket } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  universityName: string;
  hasProfile: boolean;
}

export const ProfileComparisonModal: React.FC<Props> = ({ isOpen, onClose, universityName, hasProfile }) => {
  if (!isOpen) return null;

  const matchData = [
    { label: 'Academic Match', score: 85, color: '#10B981', icon: BookOpen },
    { label: 'Budget Match', score: 62, color: '#F59E0B', icon: DollarSign },
    { label: 'Language Match', score: 100, color: '#4F46E5', icon: Globe },
    { label: 'Profile Strength', score: 74, color: '#6366F1', icon: UserCircle }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-nav-bg/80 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl h-full max-h-[900px] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {!hasProfile ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-8">
            <div className="w-24 h-24 rounded-3xl bg-brand-primary/10 flex items-center justify-center">
               <UserCircle className="h-12 w-12 text-brand-primary" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-text-primary tracking-tight">Profile Intelligence Required</h2>
              <p className="text-text-muted text-lg font-medium max-w-md mx-auto">
                To run a deep-dive match analysis with {universityName}, we first need your academic and professional data.
              </p>
            </div>
            <button className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all">
              Complete My PAI Profile
            </button>
            <button onClick={onClose} className="text-xs font-black uppercase tracking-widest text-text-muted hover:text-text-primary">Maybe Later</button>
          </div>
        ) : (
          <>
            {/* Left Sidebar: Match Overview */}
            <div className="w-full md:w-[400px] bg-nav-bg p-12 text-white flex flex-col overflow-y-auto">
              <div className="mb-12">
                <h2 className="text-sm font-black uppercase tracking-widest text-brand-accent">Match Analysis</h2>
                <h3 className="text-3xl font-black tracking-tighter mt-2">{universityName}</h3>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-8 pb-12">
                <div className="relative w-56 h-56">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 628 }}
                      animate={{ strokeDashoffset: 628 - (628 * 82) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent" 
                      strokeDasharray={628} 
                      className="text-brand-accent" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-black tracking-tighter">82%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Match</span>
                  </div>
                </div>

                <div className="w-full space-y-6">
                  {matchData.map((m) => (
                    <div key={m.label} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-white/60">{m.label}</span>
                         <span className="text-white">{m.score}%</span>
                       </div>
                       <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${m.score}%` }}
                           transition={{ duration: 1, delay: 0.5 }}
                           className="h-full bg-brand-accent"
                         />
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                 <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-widest text-brand-success flex items-center gap-2">
                     <TrendingUp className="h-3 w-3" /> Professional Insight
                   </div>
                   <div className="text-xs font-bold text-white/80">Strong Career Alignment</div>
                 </div>
                 <Rocket className="h-6 w-6 text-brand-accent" />
              </div>
            </div>

            {/* Right Pane: Details & Plan */}
            <div className="flex-1 p-12 overflow-y-auto">
              <div className="flex justify-end mb-8">
                <button onClick={onClose} className="p-2 hover:bg-bg-base rounded-full transition-all">
                  <X className="h-6 w-6 text-text-muted" />
                </button>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6 text-brand-success">
                    <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Why you're a fit
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Your GRE quant score (168) is in the top 5% of admins.",
                        "Course alignment with your Math degree is seamless.",
                        "Language proficiency exceeds the required 7.0 band."
                      ].map((s, i) => (
                        <div key={i} className="p-4 bg-brand-success/5 border border-brand-success/20 rounded-2xl text-[11px] font-black">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 text-brand-accent">
                    <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Potential Gaps
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Annual fee (£38k) is slightly above your target range (£30k).",
                        "Missing a Letter of Recommendation from an Academic Prof.",
                        "Limited internship experience in Computer Science."
                      ].map((s, i) => (
                        <div key={i} className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl text-[11px] font-black">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl font-black text-text-primary tracking-tight">Your Action Plan to Admission</h3>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: 'Secure an Academic LOR', detail: 'Contact Prof. Sharma from your Calculus department immediately.' },
                      { step: 2, title: 'Draft a Tech-Centric SOP', detail: 'Highlight your recent Python certification and project work.' },
                      { step: 3, title: 'Financial Proofing', detail: 'Consolidate funds into the required account for the 28-day rule.' },
                      { step: 4, title: 'Submit Fall Intake', detail: 'Application deadline is Dec 15th. Submit by Oct end for scholarships.' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-6 p-6 border border-border rounded-3xl group hover:border-brand-primary transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-bg-base flex items-center justify-center font-black text-lg text-text-muted group-hover:text-brand-primary transition-colors">
                          {step.step}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="text-sm font-black text-text-primary tracking-tight">{step.title}</div>
                          <p className="text-xs font-medium text-text-muted">{step.detail}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-border group-hover:text-brand-primary transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex gap-4">
                  <button className="flex-1 py-5 bg-nav-bg text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:bg-brand-primary">
                    Save Comparison & Snapshot
                  </button>
                  <button className="flex-1 py-5 bg-white border border-border text-text-primary rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all hover:border-brand-primary">
                    Share with Counselor
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const Globe: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
