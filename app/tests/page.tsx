"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { TestHero } from '@/components/features/tests/TestHero';
import { TestCard } from '@/components/features/tests/TestCard';
import { TEST_DATA } from '@/lib/services/test-data';
import { motion, AnimatePresence } from 'framer-motion';
import { ComingSoonGate } from '@/components/ui/ComingSoonGate';
import { Target } from 'lucide-react';

const CATEGORIES = ['All', 'Language', 'Graduate', 'Undergraduate', 'Professional'];

function OldTestsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredTests = Object.values(TEST_DATA).filter(test => 
    activeCategory === 'All' || test.category === activeCategory
  );

  return (
    <DashboardLayout>
       <div className="space-y-12 pb-20">
          <TestHero />

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-3 p-2 bg-white border border-border rounded-3xl w-fit shadow-sm">
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeCategory === cat 
                     ? 'bg-nav-bg text-white shadow-xl' 
                     : 'text-text-muted hover:bg-bg-base hover:text-text-primary'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <AnimatePresence mode="popLayout">
                {filteredTests.map((test, idx) => (
                  <motion.div
                    key={test.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                     <TestCard test={test} />
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredTests.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
               <div className="text-6xl">🔍</div>
               <h3 className="text-2xl font-black text-text-primary tracking-tight">No tests found in this category</h3>
               <p className="text-text-muted font-medium max-w-sm">We're constantly adding new test guides. Check back soon or try another category.</p>
               <button onClick={() => setActiveCategory('All')} className="text-brand-primary font-black uppercase text-[10px] tracking-widest hover:underline">Show All Tests</button>
            </div>
          )}
       </div>
    </DashboardLayout>
  );
}

export default function TestsPage() {
  return (
    <DashboardLayout>
       <ComingSoonGate 
         featureName="Test Prep Analytics" 
         description="Master your IELTS, GRE, and GMAT with personalized AI-driven study plans and practice tests." 
         icon={Target} 
       />
    </DashboardLayout>
  );
}
