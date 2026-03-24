"use client";

import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ProfileScoreRing } from '@/components/features/ProfileScoreRing';
import { ComparisonReport } from '@/components/features/ComparisonReport';
import { PAIHelpChat } from '@/components/features/PAIHelpChat';
import { PAIWidget } from '@/components/features/PAIWidget';
import { GraduationCap, DollarSign, ArrowRight, MessageSquare, Calendar, Globe, Sparkles, Target, Loader2, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setProfile(data.user);
            setAnalysis(data.user.paiAnalysis);
            // Sync localStorage to this user
            localStorage.setItem('pai_profile', JSON.stringify(data.user));
            if (data.user.paiAnalysis) {
              localStorage.setItem('pai_analysis', JSON.stringify(data.user.paiAnalysis));
            }
          }
        } else if (res.status === 401) {
          // Session expired or invalid, clear everything
          localStorage.removeItem('pai_profile');
          localStorage.removeItem('pai_analysis');
          router.push('/auth/login');
        } else {
          // Fallback to localStorage for instant feel or offline mode
          const rawProfile = localStorage.getItem('pai_profile');
          const rawAnalysis = localStorage.getItem('pai_analysis');
          if (rawProfile) setProfile(JSON.parse(rawProfile));
          if (rawAnalysis) setAnalysis(JSON.parse(rawAnalysis));
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 text-brand-primary animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  // If no analysis yet, show the PAI Widget in "unlock" mode
  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto pt-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-text-primary mb-2">Welcome to EAOverseas! 🎓</h1>
            <p className="text-text-muted font-medium">To get started, please complete your profile audit to unlock personalized insights.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PAIWidget />
            <div className="space-y-6">
              <div className="card-premium p-6 bg-gradient-to-br from-brand-primary/5 to-purple-500/5 border border-brand-primary/10">
                <Globe className="h-6 w-6 text-brand-primary mb-4" />
                <h3 className="font-bold text-lg mb-2 text-text-primary">Global Matching Engine</h3>
                <p className="text-sm text-text-muted leading-relaxed">Our AI analyzes thousands of university programs to find your perfect fit based on your unique academic and financial profile.</p>
              </div>
              <div className="card-premium p-6 bg-gradient-to-br from-purple-500/5 to-brand-primary/5 border border-purple-500/10">
                <Target className="h-6 w-6 text-purple-600 mb-4" />
                <h3 className="font-bold text-lg mb-2 text-text-primary">Visa Probability Hub</h3>
                <p className="text-sm text-text-muted leading-relaxed">Get real-time insights into your student visa success chances for major study destinations like USA, UK, and Canada.</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-8 pt-6 px-4"
      >
        {/* Header Section */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-2">
              <Sparkles className="h-3 w-3" /> Profile Status: Analytics Unlocked
            </div>
            <h1 className="text-4xl font-black text-text-primary tracking-tight">
              Hello, <span className="text-brand-primary">{profile?.fullName?.split(' ')[0] || 'Student'}</span> 👋
            </h1>
            <p className="text-text-muted font-medium text-lg">Your personalized Student Analytics Hub is ready.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-border shadow-sm">
            <ProfileScoreRing score={analysis.overallScore} size={80} strokeWidth={8} label="" />
            <div className="pr-4">
              <div className="text-2xl font-black text-text-primary">{analysis.overallScore}%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-text-muted">Profile Match</div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Column */}
          <motion.div variants={item} className="lg:col-span-2 space-y-8">
            <PAIWidget />
          </motion.div>

          {/* Side Intelligence Column */}
          <motion.div variants={item} className="space-y-8">
            <PAIHelpChat paiAnalysis={analysis} />
            
            <div className="card-premium p-6 bg-nav-bg text-white border-2 border-brand-accent/30 overflow-hidden relative group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all" />
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-accent mb-4 flex items-center gap-2">
                <Globe className="h-3.5 w-3.5" /> Global Outlook
              </h4>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm font-bold text-white/80">Visa Probability</span>
                  <span className="text-sm font-black text-brand-accent">{analysis.visaOutlook}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm font-bold text-white/80">Financial Fit</span>
                  <span className="text-sm font-black text-brand-accent">{analysis.budgetFit}</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 rounded-xl bg-brand-accent text-nav-bg font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors">
                Visa Consultation <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <ComparisonReport 
              university={analysis.targetUniversities[0] || "Global Partner University"}
              matchScore={analysis.overallScore}
              dateCompared={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              topGap={analysis.improvements[0] || "Profile Enhancement"}
              requirements={[
                { label: "Academic Match", met: true, value: "Strong" },
                { label: "Language Proficiency", met: analysis.overallScore > 60, value: "Verified" }
              ]}
            />
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
