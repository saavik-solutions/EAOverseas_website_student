"use client";

import React from 'react';
import { CheckCircle2, FileText, Info, ArrowUpRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdmissionsTab: React.FC = () => {
  const requirements = [
    { title: 'Academic Minimum', value: '85% / 3.8 GPA', detail: 'In relevant subjects' },
    { title: 'IELTS / TOEFL', value: '7.5 / 110+', detail: 'No band less than 7.0' },
    { title: 'GRE / GMAT', value: '325+ / 700+', detail: 'Mandatory for Engineering/MBA' },
    { title: 'Work Experience', value: 'Not Mandatory', detail: 'Except for specialized MSCs' }
  ];

  const documents = [
    'Academic Transcripts (Original & English)',
    'Statement of Purpose (SOP)',
    '2-3 Letters of Recommendation (LOR)',
    'Updated CV / Resume',
    'Language Proficiency Proof',
    'Copy of Passport',
    'Financial Support Evidence'
  ];

  return (
    <div className="space-y-12">
      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {requirements.map((req, idx) => (
          <div key={idx} className="p-6 bg-white border border-border rounded-3xl shadow-sm hover:border-brand-primary transition-colors space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">{req.title}</h4>
            <div className="text-2xl font-black text-text-primary">{req.value}</div>
            <p className="text-[11px] font-bold text-brand-primary">{req.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Document Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-brand-primary" />
            <h3 className="text-2xl font-black text-text-primary tracking-tight">Required Documents</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-bg-base rounded-2xl border border-border/50 group hover:border-brand-primary transition-all">
                <CheckCircle2 className="h-4 w-4 text-brand-success mt-1" />
                <span className="text-xs font-bold text-text-muted group-hover:text-text-primary transition-colors">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-5 space-y-6">
           <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-brand-accent" />
            <h3 className="text-2xl font-black text-text-primary tracking-tight">Timeline & Deadlines</h3>
          </div>
          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
            {[
              { date: 'Sep 1st', title: 'Applications Open', subtitle: 'Fall 2026 Intake' },
              { date: 'Dec 15th', title: 'Early Decision Deadline', subtitle: 'Highly Recommended' },
              { date: 'Jan 31st', title: 'Final Global Deadline', subtitle: 'All international applicants' },
              { date: 'Mar - Apr', title: 'Decision Notification', subtitle: 'Via email and student portal' }
            ].map((step, idx) => (
              <div key={idx} className="pl-10 relative group">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-brand-accent group-hover:bg-brand-accent transition-all flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-white" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-accent">{step.date}</div>
                  <div className="text-base font-black text-text-primary">{step.title}</div>
                  <div className="text-xs font-medium text-text-muted">{step.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <button className="w-full py-4 bg-nav-bg text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary transition-all flex items-center justify-center gap-3 shadow-xl">
              Launch Official Application
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <p className="text-center mt-3 text-[10px] font-black text-text-muted uppercase tracking-widest">
              Need help? <span className="text-brand-primary cursor-pointer hover:underline">Apply via EduPlatform</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
