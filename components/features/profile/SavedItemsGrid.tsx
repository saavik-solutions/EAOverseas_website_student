"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Home, Heart, Trash2 } from 'lucide-react';

const SECTIONS = [
  { id: 'uni', label: 'Universities', icon: GraduationCap, count: 12 },
  { id: 'course', label: 'Courses', icon: BookOpen, count: 8 },
  { id: 'acc', label: 'Accommodation', icon: Home, count: 3 }
];

export const SavedItemsGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState('uni');

  return (
    <div className="space-y-10">
       <div className="flex flex-wrap items-center gap-4 p-2 bg-white border border-border rounded-3xl w-fit shadow-sm">
          {SECTIONS.map(s => (
            <button
               key={s.id}
               onClick={() => setActiveTab(s.id)}
               className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                 activeTab === s.id 
                   ? 'bg-nav-bg text-white shadow-xl' 
                   : 'text-text-muted hover:bg-bg-base hover:text-text-primary'
               }`}
            >
               <s.icon className="h-4 w-4" />
               {s.label} ({s.count})
            </button>
          ))}
       </div>

       <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
             {[1, 2, 3].map(i => (
                <div key={i} className="group p-6 bg-white border border-border rounded-[2.5rem] hover:shadow-2xl transition-all relative overflow-hidden">
                   <div className="h-40 bg-bg-base rounded-2xl mb-6 overflow-hidden relative">
                      <div className="absolute top-3 right-3 z-10 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                         <Trash2 className="h-4 w-4 cursor-pointer hover:text-brand-danger" />
                      </div>
                      <div className="w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 flex items-center justify-center text-4xl">
                         {activeTab === 'uni' ? '🏛️' : activeTab === 'course' ? '📚' : '🏠'}
                      </div>
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-base font-black text-text-primary tracking-tight truncate">Example Saved Item {i}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{activeTab === 'uni' ? 'Cambridge, UK' : activeTab === 'course' ? 'Computer Science' : 'Private Studio'}</p>
                   </div>
                </div>
             ))}
          </motion.div>
       </AnimatePresence>
    </div>
  );
};
