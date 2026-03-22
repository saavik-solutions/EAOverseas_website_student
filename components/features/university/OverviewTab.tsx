"use client";

import React from 'react';
import { DollarSign, Percent, Users, GraduationCap, MapPinned, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const OverviewTab: React.FC = () => {
  const stats = [
    { label: 'Annual Tuition', value: '£33,800', icon: DollarSign, color: 'text-brand-success' },
    { label: 'Living Cost /mo', value: '£1,200', icon: MapPinned, color: 'text-brand-primary' },
    { label: 'Scholarship %', value: '15%', icon: GraduationCap, color: 'text-brand-accent' },
    { label: 'Acceptance Rate', value: '21%', icon: Percent, color: 'text-brand-success' },
    { label: 'Total Students', value: '24,000+', icon: Users, color: 'text-brand-secondary' },
    { label: 'Int\'l Students', value: '38%', icon: Star, color: 'text-brand-primary' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Column: Rich Content */}
      <div className="lg:col-span-7 space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-text-primary tracking-tight">About the University</h2>
          <div className="prose prose-slate max-w-none text-text-muted leading-relaxed space-y-4">
            <p>
              The University of Cambridge is one of the world's oldest and most prestigious universities. Founded in 1209, it has a long-standing reputation for academic excellence and groundbreaking research.
            </p>
            <p>
              With 31 autonomous colleges and over 150 departments, the university offers a unique collegiate system that provides students with a small-scale, supportive environment within a large, world-class institution.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-black text-text-primary tracking-tight">Campus Life</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-video rounded-2xl bg-bg-base overflow-hidden border border-border">
              <img src="https://images.unsplash.com/photo-1541339905195-03f8998250b7?auto=format&fit=crop&q=80&w=600" alt="Campus 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video rounded-2xl bg-bg-base overflow-hidden border border-border">
              <img src="https://images.unsplash.com/photo-1523050335392-9bc5675e745f?auto=format&fit=crop&q=80&w=600" alt="Campus 2" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Cambridge offers a vibrant student life with over 500 student-run clubs and societies ranging from music and drama to sports and politics. The city itself is a beautiful mix of historic architecture and modern amenities.
          </p>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-black text-text-primary tracking-tight">Notable Alumni</h3>
          <div className="flex flex-wrap gap-4">
            {['Isaac Newton', 'Charles Darwin', 'Stephen Hawking', 'Alan Turing', 'Sylvia Plath'].map((name) => (
              <div key={name} className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold text-text-primary shadow-sm">
                {name}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: Key Stats Card */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 p-8 bg-nav-bg rounded-[2.5rem] text-white shadow-2xl border border-white/5 space-y-8">
          <div className="space-y-1">
             <h4 className="text-xl font-black text-brand-accent tracking-tight">Key Statistics</h4>
             <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Snapshot for 2026 Intake</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</span>
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10">
            <button className="w-full py-4 bg-brand-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20">
              Download Full Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
