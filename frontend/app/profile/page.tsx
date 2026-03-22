"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ProfileHero } from '@/components/features/profile/ProfileHero';
import { AcademicTimeline } from '@/components/features/profile/AcademicTimeline';
import { SavedItemsGrid } from '@/components/features/profile/SavedItemsGrid';
import { PAIWidget } from '@/components/features/PAIWidget';
import { USER_PROFILE } from '@/lib/services/user-profile';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, History, BarChart3, Bookmark, 
  PenLine, Sparkles, CheckCircle2, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

const TABS = [
  { id: 'Overview', icon: Info },
  { id: 'Academic', icon: History },
  { id: 'PAI Report', icon: BarChart3 },
  { id: 'Saved', icon: Bookmark }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <DashboardLayout>
       <div className="space-y-12 pb-24 max-w-7xl mx-auto">
          {/* Universal Escape Node */}
          <div className="pt-6">
             <Link href="/feed" className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors font-black text-[10px] uppercase tracking-widest group w-fit">
               <ChevronRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
               Back to Global Feed
             </Link>
          </div>

          <ProfileHero user={USER_PROFILE} />

          {/* Tab Navigation */}
          <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-xl border border-border p-2 rounded-3xl flex flex-wrap items-center gap-2 shadow-sm max-w-4xl mx-auto">
             {TABS.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex-1 min-w-[120px] py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                   activeTab === tab.id 
                     ? 'bg-brand-primary text-white shadow-md' 
                     : 'text-text-muted hover:bg-bg-base hover:text-text-primary'
                 }`}
               >
                 <tab.icon className="h-4 w-4" />
                 {tab.id}
               </button>
             ))}
          </div>

          <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className="min-h-[600px] px-4 md:px-0"
             >
                {activeTab === 'Overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                     <div className="lg:col-span-2 space-y-8 md:space-y-12">
                        {/* Bio Section */}
                        <section className="p-8 md:p-10 bg-white border border-border rounded-[2.5rem] md:rounded-[3rem] space-y-6 relative group shadow-sm transition-shadow hover:shadow-md">
                           <div className="flex items-center justify-between">
                              <h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">About Me</h3>
                              <button onClick={() => setIsEditing(!isEditing)} className="p-3 bg-bg-base rounded-xl text-text-muted hover:text-brand-primary transition-all">
                                 <PenLine className="h-4 w-4" />
                              </button>
                           </div>
                           <p className="text-base md:text-lg font-medium text-text-secondary leading-relaxed">
                              {USER_PROFILE.bio}
                           </p>
                           {/* Skills Tag Cloud */}
                           <div className="pt-4 flex flex-wrap gap-2 md:gap-3">
                              {USER_PROFILE.skills.map(skill => (
                                <span key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all cursor-default">
                                   {skill}
                                </span>
                              ))}
                           </div>
                        </section>

                        {/* Recent Activity */}
                        <section className="space-y-6 md:space-y-8">
                           <h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">Recent Platform Activity</h3>
                           <div className="space-y-4">
                              {USER_PROFILE.activity.map((act, i) => (
                                <div key={i} className="p-5 md:p-6 bg-white border border-border rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between group hover:border-brand-primary/50 transition-all shadow-sm">
                                   <div className="flex items-center gap-4 md:gap-6">
                                      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-bg-base flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                                         {act.type === 'comparison' ? <Sparkles className="h-5 w-5 md:h-6 md:w-6" /> : act.type === 'save' ? <Bookmark className="h-5 w-5 md:h-6 md:w-6" /> : <BarChart3 className="h-5 w-5 md:h-6 md:w-6" />}
                                      </div>
                                      <div className="space-y-1">
                                         <p className="text-sm md:text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors">{act.detail}</p>
                                         <p className="text-[9px] md:text-[10px] font-black text-text-disabled uppercase tracking-widest">{act.date}</p>
                                      </div>
                                   </div>
                                   <ChevronRight className="h-4 w-4 text-text-muted group-hover:translate-x-1 group-hover:text-brand-primary transition-all" />
                                </div>
                              ))}
                           </div>
                        </section>
                     </div>

                     <aside className="space-y-8">
                        <div className="p-8 md:p-10 bg-brand-primary text-white rounded-[2.5rem] md:rounded-[3rem] shadow-xl space-y-8 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                           <div className="relative z-10 space-y-6 text-center">
                              <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80">Profile Completeness</h4>
                              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto">
                                 <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/20" />
                                    <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 * (1 - 0.72)} className="text-white drop-shadow-md" strokeLinecap="round" />
                                 </svg>
                                 <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-black drop-shadow-sm">72%</div>
                              </div>
                              <p className="text-xs md:text-sm font-medium opacity-90 leading-relaxed">Add test scores to reach 100% and unlock Tier 1 matching.</p>
                              <Link href="/onboarding" className="block w-full py-4 bg-white text-brand-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md">
                                Complete Profile
                              </Link>
                           </div>
                        </div>

                        <div className="p-6 md:p-8 bg-white border border-border rounded-[2rem] md:rounded-[2.5rem] space-y-4 shadow-sm">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Identity Status</h4>
                           <div className="flex items-center gap-3 p-4 bg-brand-success/5 border border-brand-success/10 rounded-xl">
                              <CheckCircle2 className="h-5 w-5 text-brand-success shrink-0" />
                              <span className="text-[10px] md:text-xs font-black text-brand-success uppercase tracking-widest">Verified Student</span>
                           </div>
                           <p className="text-xs text-text-secondary font-medium">Your university email has been confirmed.</p>
                        </div>
                     </aside>
                  </div>
                )}

                {activeTab === 'Academic' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                     <AcademicTimeline title="Education History" items={USER_PROFILE.education.map(e => ({ title: e.degree, subtitle: e.school, duration: e.year, type: 'edu' as const }))} />
                     <AcademicTimeline title="Professional Experience" items={USER_PROFILE.experience.map(x => ({ title: x.role, subtitle: x.company, duration: x.duration, description: x.description, type: 'work' as const }))} />
                  </div>
                )}

                {activeTab === 'PAI Report' && (
                  <div className="w-full">
                     <PAIWidget />
                  </div>
                )}

                {activeTab === 'Saved' && <SavedItemsGrid />}
             </motion.div>
          </AnimatePresence>
       </div>
    </DashboardLayout>
  );
}
