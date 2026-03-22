"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  featureName: string;
  description: string;
  icon?: any;
}

export const ComingSoonGate: React.FC<Props> = ({ featureName, description, icon: Icon }) => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden rounded-[3rem] bg-white border border-border">
       {/* Animated Background */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full mix-blend-multiply opacity-50 animate-pulse" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/10 blur-[120px] rounded-full mix-blend-multiply opacity-50" />
       
       <div className="relative z-10 max-w-2xl text-center space-y-8 flex flex-col items-center">
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 rounded-full bg-bg-base flex items-center justify-center shadow-md border border-border/50 relative group"
          >
             {Icon ? <Icon className="h-10 w-10 text-brand-primary group-hover:scale-110 transition-transform" /> : <Lock className="h-10 w-10 text-brand-primary group-hover:scale-110 transition-transform" />}
             
             {/* Sparkles */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute -top-4 -right-4 text-brand-accent group-hover:rotate-180 transition-all"
             >
                <Sparkles className="h-8 w-8 opacity-60" />
             </motion.div>
          </motion.div>

          <div className="space-y-4 flex flex-col items-center">
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest"
             >
                <Lock className="h-3 w-3" /> Exclusive Feature
             </motion.div>
             
             <motion.h1 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-tight"
             >
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">{featureName}</span> <br/>
               is Coming Soon
             </motion.h1>
             
             <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="text-lg font-medium text-text-secondary leading-relaxed max-w-lg mx-auto"
             >
               {description} We are building something extraordinary. Get ready for a seamless, AI-powered experience very soon.
             </motion.p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
             <Link 
               href="/feed" 
               className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-md active:scale-95"
             >
                <ArrowLeft className="h-4 w-4" /> Go Back to Feed
             </Link>
          </motion.div>

       </div>
    </div>
  );
};
