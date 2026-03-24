"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ProfileHero } from '@/components/features/profile/ProfileHero';
import { AcademicTimeline } from '@/components/features/profile/AcademicTimeline';
import { SavedItemsGrid } from '@/components/features/profile/SavedItemsGrid';
import { PAIWidget } from '@/components/features/PAIWidget';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, History, BarChart3, Bookmark, 
  PenLine, Sparkles, CheckCircle2, ChevronRight, 
  QrCode, CreditCard, RefreshCw, LogOut,
  User as UserIcon, Download, Share2, X, Save, Lock as LockIcon
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'Overview', icon: Info },
  { id: 'Academic', icon: History },
  { id: 'PAI Report', icon: BarChart3 },
  { id: 'Saved', icon: Bookmark },
  { id: 'Digital ID', icon: CreditCard }
];

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recreatingPai, setRecreatingPai] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRecreatePAI = async () => {
    setRecreatingPai(true);
    try {
      const res = await fetch('/api/profile-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user?.onboardingData || user)
      });
      const data = await res.json();
      if (data.success) {
        setUser((prev: any) => ({ ...prev, paiAnalysis: data.analysis }));
        alert('PAI Report successfully re-created!');
      }
    } catch (e) {
      alert('Failed to re-create PAI report');
    } finally {
      setRecreatingPai(false);
    }
  };

  if (loading) {
    return <DashboardLayout><div className="flex items-center justify-center min-h-[60vh] text-brand-primary font-black animate-pulse">LOADING PROFILE...</div></DashboardLayout>;
  }

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

          <ProfileHero 
            user={user} 
            isLoading={loading} 
            onEdit={() => setIsEditing(true)} 
          />

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
                              <button 
                                onClick={() => !user?.isLocked && setIsEditing(!isEditing)} 
                                disabled={user?.isLocked}
                                className={`p-3 rounded-xl transition-all ${user?.isLocked ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-bg-base text-text-muted hover:text-brand-primary'}`}
                              >
                                 {user?.isLocked ? <LockIcon className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
                              </button>
                           </div>
                            <p className="text-base md:text-lg font-medium text-text-secondary leading-relaxed">
                               {user?.bio || 'No bio added yet. Tell us about your academic goals!'}
                            </p>
                           {/* Skills Tag Cloud */}
                            <div className="pt-4 flex flex-wrap gap-2 md:gap-3">
                               {(user?.skills || []).map((skill: string) => (
                                 <span key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all cursor-default">
                                    {skill}
                                 </span>
                               ))}
                               {(!user?.skills || user?.skills.length === 0) && (
                                 <span className="text-xs text-text-muted">No skills listed</span>
                               )}
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <section className="space-y-6 md:space-y-8">
                           <h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">Recent Platform Activity</h3>
                            <div className="space-y-4">
                               {user?.activity?.map((act: any, i: number) => (
                                 <div key={i} className="p-5 md:p-6 bg-white border border-border rounded-1.5rem md:rounded-2rem flex items-center justify-between group hover:border-brand-primary/50 transition-all shadow-sm">
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
                               )) || (
                                 <p className="text-sm text-text-muted text-center py-8">No recent activity</p>
                               )}
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
                      <AcademicTimeline title="Education History" items={(user?.education || []).map((e: any) => ({ title: e.degree, subtitle: e.institution, duration: e.year, type: 'edu' as const }))} />
                      <AcademicTimeline title="Professional Experience" items={(user?.experience || []).map((x: any) => ({ title: x.role, subtitle: x.company, duration: x.duration, description: x.description, type: 'work' as const }))} />
                   </div>
                 )}

                 {activeTab === 'PAI Report' && (
                   <div className="space-y-8">
                     <div className="flex justify-end">
                       <button
                         onClick={handleRecreatePAI}
                         disabled={recreatingPai}
                         className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                       >
                         {recreatingPai ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                         Re-create My PAI Report
                       </button>
                     </div>
                     <PAIWidget />
                   </div>
                 )}

                 {activeTab === 'Saved' && <SavedItemsGrid />}

                 {activeTab === 'Digital ID' && (
                   <div className="max-w-2xl mx-auto py-12">
                     <div className="bg-gradient-to-br from-brand-primary to-brand-primary/80 p-1 rounded-[2.5rem] shadow-2xl overflow-hidden group">
                        <div className="bg-white rounded-[2.4rem] overflow-hidden relative border border-white/20">
                           {/* Header */}
                           <div className="bg-brand-primary p-8 flex items-center justify-between text-white">
                              <div className="space-y-1">
                                 <h2 className="text-2xl font-black tracking-tighter">EAOverseas</h2>
                                 <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Global Student Identity</p>
                              </div>
                              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                                 <CreditCard className="h-6 w-6" />
                              </div>
                           </div>

                           {/* Content */}
                           <div className="p-10 flex flex-col md:flex-row gap-10 items-center">
                              <div className="w-40 h-40 rounded-3xl bg-bg-base border-4 border-brand-primary/10 overflow-hidden shrink-0 flex items-center justify-center p-4">
                                 {user?.avatarUrl ? (
                                   <img src={user.avatarUrl} className="w-full h-full object-cover rounded-xl" alt="ID" />
                                 ) : (
                                   <div className={`w-full h-full rounded-xl flex items-center justify-center opacity-30 ${user?.gender === 'female' ? 'text-pink-500' : 'text-blue-500'}`}>
                                      <UserIcon className="w-2/3 h-2/3" />
                                   </div>
                                 )}
                              </div>

                              <div className="flex-1 space-y-6 text-center md:text-left">
                                 <div>
                                    <h3 className="text-3xl font-black text-text-primary tracking-tight leading-none mb-1">{user?.fullName}</h3>
                                    <p className="text-sm font-bold text-brand-primary">{user?.education?.[0]?.degree || 'Verified Student'}</p>
                                 </div>

                                 <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Student ID</p>
                                       <p className="text-sm font-bold text-text-primary">EA-{(user?._id || '000').slice(-6).toUpperCase()}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Nationality</p>
                                       <p className="text-sm font-bold text-text-primary">{user?.nationality || 'Global'}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Valid Thru</p>
                                       <p className="text-sm font-bold text-text-primary">DEC 2028</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Verified</p>
                                       <div className="flex items-center gap-1.5 justify-center md:justify-start">
                                          <CheckCircle2 className="h-3 w-3 text-brand-success" />
                                          <p className="text-sm font-bold text-brand-success">LEVEL 1</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div className="shrink-0 p-4 bg-bg-base rounded-3xl border border-border shadow-inner">
                                 <div className="w-24 h-24 flex items-center justify-center text-text-secondary relative">
                                    <QrCode className="w-full h-full opacity-60" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       <div className="px-2 py-0.5 bg-brand-primary text-white text-[6px] font-black rounded shadow-sm">SCAN ME</div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Branding Footer */}
                           <div className="bg-bg-base px-10 py-6 border-t border-border flex items-center justify-between">
                              <div className="text-[9px] font-black text-text-disabled uppercase tracking-widest">EAOverseas Global Matching Engine</div>
                              <div className="flex gap-2">
                                 <div className="w-6 h-1 bg-brand-primary rounded-full opacity-20" />
                                 <div className="w-3 h-1 bg-brand-primary rounded-full" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 flex gap-4">
                        <button className="flex-1 py-4 bg-bg-base border border-border rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all flex items-center justify-center gap-2">
                           <Download className="h-4 w-4" />
                           Download PDF
                        </button>
                        <button className="flex-1 py-4 bg-bg-base border border-border rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all flex items-center justify-center gap-2">
                           <Share2 className="h-4 w-4" />
                           Share Identity
                        </button>
                     </div>
                   </div>
                 )}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsEditing(false)}
                 className="absolute inset-0 bg-black/40 backdrop-blur-md"
               />
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
                 className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
               >
                  <div className="p-8 border-b border-border flex items-center justify-between">
                     <h3 className="text-2xl font-black text-text-primary tracking-tight">Edit Professional Hub</h3>
                     <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-bg-base rounded-lg transition-colors"><X/></button>
                  </div>
                  
                  <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Full Name</label>
                        <input 
                          type="text" 
                          value={user?.fullName || ''} 
                          onChange={(e) => setUser((p: any) => ({ ...p, fullName: e.target.value }))}
                          className="w-full p-4 bg-bg-base border border-border rounded-xl font-bold focus:border-brand-primary outline-none transition-all"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Nationality</label>
                           <input 
                              type="text" 
                              value={user?.nationality || ''} 
                              onChange={(e) => setUser((p: any) => ({ ...p, nationality: e.target.value }))}
                              className="w-full p-4 bg-bg-base border border-border rounded-xl font-bold focus:border-brand-primary outline-none transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Gender</label>
                           <select 
                              value={user?.gender || ''} 
                              onChange={(e) => setUser((p: any) => ({ ...p, gender: e.target.value }))}
                              className="w-full p-4 bg-bg-base border border-border rounded-xl font-bold focus:border-brand-primary outline-none transition-all"
                           >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Professional Bio</label>
                        <textarea 
                          rows={4}
                          value={user?.bio || ''} 
                          onChange={(e) => setUser((p: any) => ({ ...p, bio: e.target.value }))}
                          className="w-full p-4 bg-bg-base border border-border rounded-xl font-bold focus:border-brand-primary outline-none transition-all resize-none"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Skills (comma separated)</label>
                        <input 
                           type="text" 
                           value={user?.skills?.join(', ') || ''} 
                           onChange={(e) => setUser((p: any) => ({ ...p, skills: e.target.value.split(',').map(s => s.trim()) }))}
                           className="w-full p-4 bg-bg-base border border-border rounded-xl font-bold focus:border-brand-primary outline-none transition-all"
                        />
                     </div>

                     <div className="pt-6 border-t border-border space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary">Academic History</h4>
                        {(user?.education || []).map((edu: any, idx: number) => (
                           <div key={idx} className="p-4 bg-bg-base rounded-xl space-y-4 border border-border/50">
                              <div className="grid grid-cols-2 gap-4">
                                 <input 
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => {
                                       const newEdu = [...user.education];
                                       newEdu[idx].degree = e.target.value;
                                       setUser((p: any) => ({ ...p, education: newEdu }));
                                    }}
                                    className="p-3 bg-white border border-border rounded-lg text-sm font-bold"
                                 />
                                 <input 
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => {
                                       const newEdu = [...user.education];
                                       newEdu[idx].institution = e.target.value;
                                       setUser((p: any) => ({ ...p, education: newEdu }));
                                    }}
                                    className="p-3 bg-white border border-border rounded-lg text-sm font-bold"
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="p-8 bg-bg-base border-t border-border flex gap-4">
                     <button onClick={() => setIsEditing(false)} className="flex-1 py-4 font-black text-[10px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-all">Cancel</button>
                     <button 
                       onClick={async () => {
                         try {
                           const res = await fetch('/api/user/profile', {
                             method: 'PATCH',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify(user)
                           });
                           if (res.ok) {
                             setIsEditing(false);
                             // Update NextAuth session to refresh header name
                             await update({ name: user.fullName });
                             alert('Profile saved successfully!');
                           }
                         } catch (e) {
                           alert('Failed to save profile');
                         }
                       }}
                       className="flex-[2] py-4 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                     >
                        <Save className="h-4 w-4" /> Save Professional Changes
                     </button>
                  </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
    </DashboardLayout>
  );
}
