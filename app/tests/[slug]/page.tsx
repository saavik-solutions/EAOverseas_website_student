"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { TEST_DATA } from '@/lib/services/test-data';
import { ScoreGuide } from '@/components/features/tests/ScoreGuide';
import { StudyPlanGenerator } from '@/components/features/tests/StudyPlanGenerator';
import { UniversityCard } from '@/components/features/discover/UniversityCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Layout, BarChart, Settings, GraduationCap, ChevronRight, Map, CheckCircle2, Globe } from 'lucide-react';
import { Metadata } from 'next';

const TABS = ['Overview', 'Structure', 'Score Guide', 'Prep Resources', 'Universities'];

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.slug.toUpperCase();
  const title = `${name} Test Preparation & Score Guide | EduPlatform`;
  const description = `Comprehensive guide for ${name}. Understand the test structure, scoring system, validity, and universities accepting ${name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://eduplatform.example.com/tests/${params.slug}`,
      siteName: 'EduPlatform',
    }
  };
}

export default function TestDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const test = TEST_DATA[slug as string];

  if (!test) return <div>Test Not Found</div>;

  return (
    <DashboardLayout>
       <div className="space-y-12 pb-24">
          {/* Header */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-white border border-border rounded-[3.5rem] shadow-sm">
             <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-bg-base flex items-center justify-center text-5xl shadow-inner">
                   {test.logo}
                </div>
                <div className="space-y-2">
                   <div className="flex items-center gap-3">
                      <h1 className="text-4xl font-black text-text-primary tracking-tight">{test.name}</h1>
                      <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-brand-primary/10">
                         {test.category}
                      </span>
                   </div>
                   <p className="text-text-muted font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-success" />
                      Global Standard for Admissions
                   </p>
                </div>
             </div>
             
             <div className="flex items-center gap-12 text-right">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Avg. Fee</p>
                   <p className="text-lg font-black text-brand-success">{test.fee}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Formats</p>
                   <div className="flex gap-2">
                      {test.stats.formats.map(f => (
                        <span key={f} className="px-2 py-0.5 bg-bg-base rounded text-[9px] font-bold text-text-muted">{f}</span>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* Sticky Tabs */}
          <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-xl border border-border p-2 rounded-3xl flex items-center gap-2 shadow-2xl">
             {TABS.map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeTab === tab 
                     ? 'bg-nav-bg text-white shadow-xl' 
                     : 'text-text-muted hover:bg-bg-base hover:text-text-primary'
                 }`}
               >
                 {tab}
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
               className="min-h-[500px]"
             >
                {activeTab === 'Overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                     <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-6">
                           <h2 className="text-3xl font-black text-text-primary tracking-tight italic-brand-primary">What is {test.name}?</h2>
                           <p className="text-lg font-medium text-text-muted leading-relaxed">
                              {test.summary} The examination is designed to assess the academic readiness of international students who wish to study in countries where the primary medium of instruction is English.
                           </p>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {[
                                { title: 'Global Recognition', val: test.acceptedBy, icon: Globe },
                                { title: 'Annual Takers', val: test.stats.takers, icon: GraduationCap },
                                { title: 'Countries Covered', val: test.stats.countries, icon: Map },
                                { title: 'Exam Validity', val: test.validity, icon: Info }
                              ].map((stat, i) => (
                                <div key={i} className="p-6 bg-white border border-border rounded-2xl flex items-center gap-6">
                                   <div className="w-12 h-12 rounded-xl bg-bg-base flex items-center justify-center text-brand-primary">
                                      <stat.icon className="h-6 w-6" />
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{stat.title}</p>
                                      <p className="text-sm font-black text-text-primary">{stat.val}</p>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </section>
                     </div>
                     <aside className="space-y-8">
                        <div className="p-8 bg-brand-primary text-white rounded-[2.5rem] shadow-xl space-y-6">
                           <h3 className="text-xl font-black tracking-tight">Need help deciding?</h3>
                           <p className="text-sm font-medium opacity-80 leading-relaxed">Our AI assistant can compare {test.name} with other global exams based on your PAI profile.</p>
                           <button className="w-full py-4 bg-white text-brand-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Start Comparisons</button>
                        </div>
                     </aside>
                  </div>
                )}

                {activeTab === 'Structure' && (
                  <div className="bg-white border border-border rounded-[3rem] overflow-hidden">
                     <table className="w-full text-left border-collapse">
                        <thead className="bg-bg-base border-b border-border">
                           <tr>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Section</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Duration</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Questions</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Score Range</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                           {test.sections.map((sec, i) => (
                             <tr key={i} className="group hover:bg-bg-base/30 transition-colors">
                                <td className="px-10 py-8">
                                   <p className="text-sm font-black text-text-primary group-hover:text-brand-primary transition-colors">{sec.name}</p>
                                   <p className="text-[10px] font-medium text-text-muted max-w-xs">{sec.description}</p>
                                </td>
                                <td className="px-10 py-8 text-sm font-bold text-text-primary">{sec.duration}</td>
                                <td className="px-10 py-8 text-sm font-bold text-text-primary">{sec.questions}</td>
                                <td className="px-10 py-8 text-sm font-black text-brand-accent">{sec.score}</td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                )}

                {activeTab === 'Score Guide' && <ScoreGuide guide={test.scoreGuide} testName={test.name} />}

                {activeTab === 'Prep Resources' && <StudyPlanGenerator />}

                {activeTab === 'Universities' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[1, 2, 3, 4, 5, 6].map(i => (
                       <div key={i} className="p-8 bg-bg-base/30 rounded-[2.5rem] border border-border border-dashed flex flex-col items-center justify-center gap-4 text-center">
                          <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center text-2xl">🏛️</div>
                          <div>
                             <p className="text-sm font-black text-text-primary">Featured University {i}</p>
                             <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary mt-1">Min Score: {test.slug === 'ielts' ? '7.0' : '315'}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                )}
             </motion.div>
          </AnimatePresence>
       </div>
    </DashboardLayout>
  );
}
