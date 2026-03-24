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
import { ComingSoonGate } from '@/components/ui/ComingSoonGate';

// Triggering a fresh build to ensure the Coming Soon wall is deployed.
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
       <div className="max-w-7xl mx-auto py-12 px-4 md:px-0">
          <ComingSoonGate 
            featureName="Advanced Student Profile" 
            description="We are refining your digital academic identity to provide the most personalized matching experience."
            icon={UserIcon}
          />
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
