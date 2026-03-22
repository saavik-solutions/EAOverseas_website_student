"use client";

import React from 'react';
import { ShieldCheck, Calendar, Clock, DollarSign, AlertTriangle, ExternalLink, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const VisaTab: React.FC = () => {
  const steps = [
    { title: 'CAS Issue', time: '1-2 Weeks', fee: 'Included', docs: 'Passport, Degree, IELTS' },
    { title: 'Financial Proof', time: '28 Days (Hold)', fee: 'Varies', docs: 'Bank Statements, Affidavit' },
    { title: 'Visa Application', time: '3-4 Weeks', fee: '£490', docs: 'CAS, TB Test, IHS Payment' },
    { title: 'Biometrics', time: '1 Day', fee: 'Varies', docs: 'Appointment Confirmation' }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row items-center gap-8 p-8 bg-brand-primary/5 rounded-[2.5rem] border border-brand-primary/10">
        <div className="shrink-0 w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl border border-brand-primary/20 relative">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-brand-primary/10" />
            <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={264} strokeDashoffset={264 - (264 * 96) / 100} className="text-brand-primary" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-brand-primary">96%</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-success" />
            <h3 className="text-2xl font-black text-text-primary tracking-tight">University-Specific Visa Success Rate</h3>
          </div>
          <p className="text-text-muted text-sm max-w-2xl leading-relaxed">
            Students applying to Cambridge have a significantly higher visa approval rate compared to the national average. This is due to the institution's "Highly Trusted Sponsor" status with the UK Home Office.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Step-by-Step Process */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-2xl font-black text-text-primary tracking-tight">Step-by-Step Roadmap</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="p-6 bg-white border border-border rounded-3xl shadow-sm hover:border-brand-primary transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-bl-full flex items-center justify-center pl-4 pb-4 font-black text-2xl text-brand-primary/20">
                  0{idx + 1}
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-black text-text-primary">{step.title}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-brand-primary" />
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">{step.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3 w-3 text-brand-success" />
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">{step.fee}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <div className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-2">Key Documents:</div>
                    <p className="text-[11px] font-medium text-text-primary leading-relaxed">{step.docs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rejection Reasons & Links */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-6 bg-nav-bg rounded-3xl text-white space-y-6 shadow-xl">
             <div className="flex items-center gap-3">
               <AlertTriangle className="h-5 w-5 text-brand-accent" />
               <h4 className="font-black text-xs uppercase tracking-widest text-brand-accent">Rejection Risk Factors</h4>
             </div>
             <ul className="space-y-4">
               {[
                 'Insufficient funds proof for 28 days',
                 'Inconsistent Interview responses',
                 'Gap years not properly explained',
                 'Forged or unverified documents'
               ].map((reason, idx) => (
                 <li key={idx} className="flex items-start gap-3 group">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 group-hover:scale-150 transition-transform" />
                   <span className="text-xs font-medium text-white/70 leading-relaxed">{reason}</span>
                 </li>
               ))}
             </ul>
           </div>

           <div className="space-y-4 p-6 border border-border rounded-3xl bg-bg-base/50">
              <div className="flex items-center gap-2 text-text-primary">
                <Info className="h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-widest">Official Support</span>
              </div>
              <p className="text-[11px] font-medium text-text-muted leading-relaxed">
                For the most up-to-date and authoritative information, always visit the official government visa portal.
              </p>
              <button className="w-full py-3 bg-white border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-brand-primary transition-all flex items-center justify-center gap-2">
                Visit GOV.UK Visa Portal
                <ExternalLink className="h-3 w-3" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
