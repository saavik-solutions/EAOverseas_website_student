"use client";

import React from 'react';
import { TrendingUp, Calendar, ExternalLink } from 'lucide-react';

export const GlobalSidebar: React.FC = () => {
  const trending = [
    "New UK post-study work visa rules explained",
    "Top 10 business schools in Canada for 2026",
    "How to clear IELTS in 30 days: Expert tips",
    "Living expenses in Munich: A student guide",
    "Scholarship opportunities at Ivy League"
  ];

  const webinars = [
    { title: "Visa Mastery Workshop", date: "Mar 22" },
    { title: "USA University Admissions", date: "Mar 25" },
    { title: "Part-time Jobs in Australia", date: "Mar 28" }
  ];

  const quickLinks = [
    { label: "Visa Guides", color: "bg-blue-500" },
    { label: "App Checklist", color: "bg-purple-500" },
    { label: "Budget Calc", color: "bg-green-500" }
  ];

  return (
    <div className="space-y-8 sticky top-24">
      {/* What's Trending */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-100">
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </div>
          <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">What's Trending</h4>
        </div>
        <div className="space-y-5">
          {trending.map((item, idx) => (
            <div key={idx} className="flex gap-4 group cursor-pointer">
              <span className="text-xl font-black text-border group-hover:text-brand-primary transition-colors">0{idx + 1}</span>
              <p className="text-[13px] font-bold text-text-primary line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100">
            <Calendar className="h-4 w-4 text-blue-600" />
          </div>
          <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">Upcoming Webinars</h4>
        </div>
        <div className="space-y-4">
          {webinars.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-bg-base rounded-xl border border-border/50 hover:border-brand-primary/50 transition-colors cursor-pointer group">
              <span className="text-[13px] font-bold text-text-primary group-hover:text-brand-primary">{item.title}</span>
              <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-lg">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
       <div className="grid grid-cols-1 gap-4">
         {quickLinks.map((link, idx) => (
           <button key={idx} className="flex items-center justify-between p-4 bg-nav-bg rounded-2xl shadow-lg hover:translate-x-1 transition-all group overflow-hidden relative">
             <div className={`absolute top-0 right-0 w-24 h-24 ${link.color} blur-[60px] opacity-20`} />
             <span className="text-[11px] font-black uppercase tracking-widest text-white relative z-10">{link.label}</span>
             <ExternalLink className="h-4 w-4 text-brand-accent relative z-10" />
           </button>
         ))}
       </div>
    </div>
  );
};
