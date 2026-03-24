"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Cpu, Globe, Zap, Database, Search, ShieldCheck } from 'lucide-react';

const ANALYSIS_STEPS = [
  "Initializing Neural Engine...",
  "Decrypting Academic Records...",
  "Analyzing GPA & Course Rigor...",
  "Mapping Global Career Trajectories...",
  "Evaluating Visa Probability Vectors...",
  "Matching with Elite Institutions...",
  "Optimizing Financial Aid Probabilities...",
  "Finalizing PAI Intelligence Report..."
];

export const AIAnalyzingScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 600); // 8 steps * 600ms = ~4.8 seconds

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          if (onComplete) setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 45); // 100 ticks * 45ms = 4.5 seconds

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Cyber Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4F46E5,transparent_70%)] blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} />
      </div>

      {/* Scanning Bar */}
      <motion.div 
        animate={{ y: ['0%', '1000%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent shadow-[0_0_20px_#4F46E5] z-10"
      />

      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Central Brain Icon */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(79, 70, 229, 0.2)',
              '0 0 60px rgba(79, 70, 229, 0.5)',
              '0 0 20px rgba(79, 70, 229, 0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center mb-10 relative"
        >
          <Brain className="w-12 h-12 md:w-16 md:h-16 text-brand-primary" />
          {/* Orbital Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] border border-brand-primary/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] border border-brand-primary/5 rounded-full"
          />
        </motion.div>

        {/* Status Text Area */}
        <div className="space-y-6 h-48 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                {ANALYSIS_STEPS[currentStep]}
              </h2>
              <div className="flex items-center justify-center gap-4">
                 <div className="flex gap-1">
                    {[Sparkles, Cpu, Search, Database, Globe, Zap, ShieldCheck].map((Icon, i) => (
                      <Icon key={i} className={`h-4 w-4 ${i === currentStep % 7 ? 'text-brand-primary animate-pulse' : 'text-white/20'}`} />
                    ))}
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Display */}
        <div className="w-full max-w-md mt-12 space-y-4 text-center">
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-brand-primary via-purple-400 to-white shadow-[0_0_15px_rgba(124,58,237,0.5)] rounded-full"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">
            <span>Core Analysis Phase</span>
            <span className="text-brand-primary">{Math.round(progress)}% COMPLETE</span>
          </div>
        </div>

        {/* Technical Data Stream */}
        <div className="absolute bottom-10 left-10 text-[9px] font-mono text-brand-primary/30 text-left hidden lg:block">
           <div>PATH_SOURCE: IIT_DELHI_CS</div>
           <div>METRIC_CALC: {Math.random().toFixed(4)}</div>
           <div>GLOBAL_MATCH_INDEX: 0.9842</div>
           <div>ENCRYPTION: AES-256</div>
        </div>
        
        <div className="absolute bottom-10 right-10 text-[9px] font-mono text-brand-primary/30 text-right hidden lg:block">
           <div>SYS_LOAD: 98.4%</div>
           <div>NET_TENSOR: STABLE</div>
           <div>AI_CONFIDENCE: 99.2%</div>
           <div>LATENCY: 14ms</div>
        </div>
      </div>
    </div>
  );
};
