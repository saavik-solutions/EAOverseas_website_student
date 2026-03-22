"use client";

import React from 'react';
import { Trophy, ShieldCheck, Users, UserCircle } from 'lucide-react';
import Link from 'next/link';

export const CommunitySidebar: React.FC = () => {
  const stats = [
    { label: 'Total Members', value: '42.1k', icon: Users },
    { label: 'Online Now', value: '1.2k', icon: Users },
  ];

  const rules = [
    "No spam or self-promotion",
    "Be respectful to other students",
    "Use appropriate flair tags",
    "No illegal content or visa fraud",
    "Search before asking questions"
  ];

  const topContributors = [
    { name: "alex_visa_expert", posts: 142 },
    { name: "sarah_london", posts: 98 },
    { name: "mike_studies_ca", posts: 74 }
  ];

  return (
    <div className="space-y-8 sticky top-24">
      {/* User Profile Quick Access */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserCircle className="h-5 w-5 text-brand-primary" />
            <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">Your Portal</h4>
          </div>
        </div>
        <Link href="/profile" className="w-full flex items-center justify-center py-3 bg-brand-primary text-white font-black text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-all">
          View My Profile
        </Link>
      </div>

      {/* Community Stats */}
      <div className="card-premium p-6">
        <h4 className="font-black text-xs uppercase tracking-widest text-text-primary mb-6">About Community</h4>
        <div className="grid grid-cols-2 gap-4 mb-6">
           {stats.map((s, idx) => (
             <div key={idx}>
               <p className="text-2xl font-black text-text-primary">{s.value}</p>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">{s.label}</p>
             </div>
           ))}
        </div>
        <button className="w-full py-3 bg-brand-primary text-white font-black text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-all">
          Joined
        </button>
      </div>

      {/* Top Contributors */}
      <div className="card-premium p-6">
         <div className="flex items-center gap-3 mb-6">
           <Trophy className="h-4 w-4 text-orange-500" />
           <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">Top Contributors</h4>
         </div>
         <div className="space-y-5">
           {topContributors.map((c, idx) => (
             <div key={idx} className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-nav-bg border border-border flex items-center justify-center text-[10px] font-black text-white">
                   {c.name[0].toUpperCase()}
                 </div>
                 <span className="text-xs font-bold text-text-primary">u/{c.name}</span>
               </div>
               <span className="text-[10px] font-black text-brand-primary bg-brand-primary/5 px-2 py-1 rounded-lg">
                 {c.posts} pts
               </span>
             </div>
           ))}
         </div>
      </div>

      {/* Community Rules */}
      <div className="card-premium p-6">
         <div className="flex items-center gap-3 mb-6">
           <ShieldCheck className="h-4 w-4 text-brand-success" />
           <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">Community Rules</h4>
         </div>
         <div className="space-y-4">
           {rules.map((rule, idx) => (
             <div key={idx} className="flex gap-3">
                <span className="text-[10px] font-black text-text-muted mt-0.5">{idx + 1}.</span>
                <p className="text-[13px] font-medium text-text-primary leading-tight">{rule}</p>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};
