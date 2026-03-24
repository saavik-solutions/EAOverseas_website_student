"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PAIOnboarding } from '@/components/features/pai/PAIOnboarding';
import { PAIResults } from '@/components/features/pai/PAIResults';
import { PAIResult } from '@/lib/services/pai-engine';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, ShieldCheck, Sparkles } from 'lucide-react';

import { ComingSoonGate } from '@/components/ui/ComingSoonGate';

export default function PAIPage() {
  return (
    <DashboardLayout>
       <ComingSoonGate 
         featureName="AI Profile Intelligence" 
         description="Our proprietary AI engine is currently calibrating for your region. Get ready for a next-generation audit experience." 
         icon={Sparkles} 
       />
    </DashboardLayout>
  );
}

function OldPAIPage() {
  const [status, setStatus] = useState<'onboarding' | 'analyzing' | 'completed'>('onboarding');
  const [result, setResult] = useState<PAIResult | null>(null);
  const [currentStepText, setCurrentStepText] = useState('Initializing AI Engine...');

  const handleAudit = async (formData: any) => {
    setStatus('analyzing');
    
    // Simulate steps for dramatic effect (UX requirement)
    const steps = [
      'Analyzing academic transcripts...',
      'Calibrating language proficiency...',
      'Mapping professional experience...',
      'Scanning portfolio & GitHub...',
      'Fetching global institutional matches...',
      'Generating career roadmap...'
    ];

    for (const step of steps) {
      setCurrentStepText(step);
      await new Promise(r => setTimeout(r, 800));
    }

    try {
      const res = await fetch('/api/pai/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setResult(data.analysis);
        setStatus('completed');
      } else {
        throw new Error(data.error || 'Failed to generate PAI Audit');
      }
    } catch (error) {
      console.error('Audit failed:', error);
      setStatus('onboarding');
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {status === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-4 mb-12">
                 <h1 className="text-5xl font-black text-text-primary tracking-tight">Profile Audit <span className="text-brand-primary italic">Intelligence</span></h1>
                 <p className="text-xl font-medium text-text-muted leading-relaxed max-w-2xl">
                   Let our enterprise AI audit your profile against 4,000+ global universities to find your perfect academic and career match.
                 </p>
              </div>
              <PAIOnboarding onComplete={handleAudit} />
            </motion.div>
          )}

          {status === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="fixed inset-0 z-50 bg-nav-bg flex flex-col items-center justify-center text-white p-6"
            >
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary blur-[120px] rounded-full animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
               </div>

               <div className="relative z-10 flex flex-col items-center gap-12 text-center max-w-lg">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white/10 flex items-center justify-center">
                       <Loader2 className="h-16 w-16 text-brand-accent animate-spin" />
                    </div>
                    <div className="absolute -top-4 -right-4 bg-brand-primary p-3 rounded-2xl shadow-xl">
                       <Zap className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <h2 className="text-4xl font-black tracking-tight leading-tight">EduPlatform AI <br/>is <span className="text-brand-accent">processing</span>...</h2>
                     <p className="text-white/50 font-black uppercase tracking-widest text-sm animate-pulse">{currentStepText}</p>
                  </div>

                  <div className="w-full flex justify-between gap-4 pt-8">
                     {[1, 2, 3, 4, 5].map(i => (
                       <div key={i} className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: i * 0.8 }}
                            className="h-full bg-brand-accent"
                          />
                       </div>
                     ))}
                  </div>

                  <div className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-2xl border border-white/10">
                     <ShieldCheck className="h-4 w-4 text-brand-success" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Secure Enterprise Encryption Active</span>
                  </div>
               </div>
            </motion.div>
          )}

          {status === 'completed' && result && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                       <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                       <h1 className="text-3xl font-black text-text-primary tracking-tight">Audit Results</h1>
                       <p className="text-sm font-medium text-text-muted">Analysis generated using GPT-4o & PAI Engine v2.1</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStatus('onboarding')}
                    className="px-8 py-3 bg-white border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-brand-primary hover:text-brand-primary transition-all"
                  >
                    Re-audit Profile
                  </button>
               </div>
               
               <PAIResults data={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
