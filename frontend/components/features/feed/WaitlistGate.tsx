"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, DollarSign, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export const WaitlistGate: React.FC<Props> = ({ children }) => {
  const { data: session, status: authStatus, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState<'checking' | 'form' | 'success' | 'passed'>('checking');
  const [hasJoinedJustNow, setHasJoinedJustNow] = useState(false);
  
  // Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    education: '',
    futurePlans: '',
    budget: '',
  });
  const [waitlistCount, setWaitlistCount] = useState<number>(751);

  useEffect(() => {
    setIsClient(true);
    fetch('/api/user/waitlist-count')
      .then(res => res.json())
      .then(data => { if (data.success) setWaitlistCount(data.count); })
      .catch(err => console.error("Failed to fetch waitlist count.", err));
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // 1. Strict Auth Check
    if (authStatus === 'unauthenticated') {
      // Small buffer to prevent transient unauthenticated states during fast navigation
      const timeout = setTimeout(() => {
        if (authStatus === 'unauthenticated' && !pathname.startsWith('/auth')) {
          router.push('/auth/login');
        }
      }, 500);
      return () => clearTimeout(timeout);
    }

    // 2. Auth Page Exemption
    if (pathname.startsWith('/auth')) {
      setStatus('passed');
      return;
    }

    // 3. Authenticated Logic
    if (authStatus === 'authenticated' && session?.user) {
      const u = session.user as any;
      
      if (hasJoinedJustNow) {
        setStatus('passed');
        return;
      }

      if (u.role === 'admin' || (u.isWaitlistJoined && u.onboardingCompleted)) {
        setStatus('passed');
      } else if (u.isWaitlistJoined && !u.onboardingCompleted) {
        if (pathname !== '/onboarding') {
          router.push('/onboarding');
        } else {
          setStatus('passed');
        }
      } else {
        setStatus('form');
      }
    }
  }, [authStatus, session, isClient, router, pathname, hasJoinedJustNow]);

  if (!isClient) return null;
  
  // If we're unauthenticated on a protected page, show nothing while we redirect
  if (authStatus === 'unauthenticated' && !pathname.startsWith('/auth')) return null;

  // If we're loading or checking, show the professional spinner
  if (authStatus === 'loading' || status === 'checking') {
    if (pathname.startsWith('/auth')) return <>{children}</>;
     return (
       <div className="w-full h-[50vh] flex flex-col items-center justify-center space-y-4">
         <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
         <p className="text-sm font-black text-text-muted uppercase tracking-widest animate-pulse">Initializing Flow...</p>
       </div>
     );
  }
  
  if (status === 'passed') return <>{children}</>;

  const handleNext = () => setStep(s => s + 1);
  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/user/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setWaitlistCount(data.count || 1234);
      setStatus('success');
      
      // Refresh session to pick up isWaitlistJoined status immediately
      await update({ 
        isWaitlistJoined: true, 
        waitlistNumber: data.count 
      });
    } catch (e) {
      console.error("Waitlist error:", e);
      setStatus('success');
    }
  };

  const completeAndEnter = async () => {
    try {
      // Transition to onboarding
      router.push('/onboarding');
    } catch (e) {
      console.error("Failed to redirect.", e);
      router.push('/onboarding');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-bg-base/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <AnimatePresence mode="wait">
        
        {status === 'form' && (
          <motion.div
            key="form"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-xl bg-white rounded-[2rem] border border-border shadow-2xl p-8 sm:p-10 relative overflow-hidden"
          >
            {/* Decorative background flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-2 text-center">
                <div className="w-16 h-16 mx-auto bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-black text-text-primary tracking-tight">Join the Elite Waitlist</h2>
                <p className="text-sm font-medium text-text-secondary">Please provide a few minimal details to prioritize your exclusive access to EduPlatform.</p>
              </div>

              <div className="space-y-6">
                {/* Step Indicators */}
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= i ? 'bg-brand-primary' : 'bg-bg-base'}`} />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                      <label className="block text-sm font-black text-text-primary uppercase tracking-widest flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-brand-primary" /> Current Education Level
                      </label>
                      <select 
                        className="w-full px-5 py-4 bg-bg-base border border-border rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-brand-primary/50 transition-colors"
                        value={formData.education}
                        onChange={(e) => setFormData({...formData, education: e.target.value})}
                      >
                        <option value="" disabled>Select your education</option>
                        <option value="High School">High School</option>
                        <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                        <option value="Postgraduate">Postgraduate (Master's or PhD)</option>
                      </select>
                      <button onClick={handleNext} disabled={!formData.education} className="w-full py-4 mt-4 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 flex justify-center items-center gap-2">Next <ArrowRight className="h-4 w-4" /></button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                      <label className="block text-sm font-black text-text-primary uppercase tracking-widest flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-brand-accent" /> Future Study Plans
                      </label>
                      <textarea 
                        className="w-full px-5 py-4 bg-bg-base border border-border rounded-xl text-sm font-medium text-text-primary focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-text-muted resize-none h-32"
                        placeholder="E.g., I want to study MSc AI in the UK starting Fall 2026..."
                        value={formData.futurePlans}
                        onChange={(e) => setFormData({...formData, futurePlans: e.target.value})}
                      />
                      <button onClick={handleNext} disabled={!formData.futurePlans} className="w-full py-4 mt-4 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 flex justify-center items-center gap-2">Next <ArrowRight className="h-4 w-4" /></button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="s3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                      <label className="block text-sm font-black text-text-primary uppercase tracking-widest flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-brand-success" /> Estimated Yearly Budget
                      </label>
                      <select 
                        className="w-full px-5 py-4 bg-bg-base border border-border rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-brand-primary/50 transition-colors"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      >
                        <option value="" disabled>Select a budget range</option>
                        <option value="< $20,000">Less than $20,000</option>
                        <option value="$20,000 - $40,000">$20,000 - $40,000</option>
                        <option value="$40,000 - $60,000">$40,000 - $60,000</option>
                        <option value="> $60,000">More than $60,000</option>
                      </select>
                      <button onClick={handleSubmit} disabled={!formData.budget} className="w-full py-4 mt-4 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 flex justify-center items-center gap-2">Join Waitlist <CheckCircle2 className="h-4 w-4" /></button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-[3rem] border border-border shadow-2xl p-10 text-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-brand-success/5 to-transparent pointer-events-none" />
             <div className="relative z-10 space-y-6">
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                 className="w-24 h-24 mx-auto bg-brand-success/10 rounded-full flex items-center justify-center text-brand-success"
               >
                  <CheckCircle2 className="h-12 w-12" />
               </motion.div>
               <div>
                  <h2 className="text-3xl font-black text-text-primary tracking-tight">You're on the list!</h2>
                  <p className="text-sm font-medium text-text-secondary mt-2">Your spot is secured. We are counting down to full launch.</p>
               </div>
               
               <div className="py-6 px-4 bg-bg-base border border-border rounded-2xl relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-[9px] font-black uppercase tracking-widest text-text-muted border border-border rounded-full">Waitlist Position</span>
                  <div className="text-5xl font-black text-brand-primary tracking-tighter tabular-nums flex items-center justify-center gap-2">
                     <span className="text-text-muted text-3xl">#</span>
                     <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                     >
                       {waitlistCount}
                     </motion.span>
                  </div>
               </div>

               <button 
                 onClick={completeAndEnter}
                 className="w-full py-4 bg-text-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-colors"
               >
                 Continue to Profile Audit
               </button>
             </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
