"use client";

import React from 'react';
import { Briefcase, BarChart3, Globe2, Building2, TrendingUp, Handshake } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const salaryData = [
  { subject: 'Comp Sci', salary: 65, color: '#4F46E5' },
  { subject: 'Finance', salary: 58, color: '#06B6D4' },
  { subject: 'Eng', salary: 52, color: '#10B981' },
  { subject: 'Law', salary: 48, color: '#F59E0B' },
  { subject: 'Arts', salary: 32, color: '#EC4899' }
];

export const CareersTab: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Work Rights Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 bg-gradient-to-r from-nav-bg to-nav-bg/90 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="shrink-0 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
            <Globe2 className="h-10 w-10 text-brand-accent" />
          </div>
          <div className="space-y-3">
             <div className="flex items-center gap-2">
               <TrendingUp className="h-4 w-4 text-brand-success" />
               <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-success">Post-Study Work Rights</h4>
             </div>
             <h3 className="text-2xl font-black tracking-tight">2-Year Graduate Route Visa</h3>
             <p className="text-white/60 text-xs font-medium leading-relaxed max-w-xl">
               As an international student, you are eligible to work in the UK for up to 2 years after graduation without a sponsor. For PhD students, this extends to 3 years.
             </p>
          </div>
        </div>

        <div className="p-8 bg-white border border-border rounded-[3rem] shadow-sm space-y-6">
           <div className="flex items-center gap-3">
             <Handshake className="h-5 w-5 text-brand-primary" />
             <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Placement Support</h4>
           </div>
           <div className="text-3xl font-black text-text-primary">84% <span className="text-xs text-text-muted font-bold tracking-tight">Success</span></div>
           <p className="text-[11px] font-medium text-text-muted leading-relaxed">
             Direct institutional partnerships with 450+ global employers ensuring high placement outcomes.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        {/* Salary Chart */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-text-primary tracking-tight">Avg Salary — 6 Mos Post-Grad</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">In £ GPB (Thousands)</span>
          </div>
          <div className="h-[350px] w-full bg-white p-6 border border-border rounded-3xl shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="subject" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="salary" radius={[0, 8, 8, 0]} barSize={24}>
                  {salaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruiter Logos */}
        <div className="lg:col-span-5 space-y-8">
           <h3 className="text-2xl font-black text-text-primary tracking-tight">Top Global Recruiters</h3>
           <div className="grid grid-cols-2 gap-4">
             {[
               { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
               { name: 'Goldman Sachs', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg' },
               { name: 'McKinsey', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/McKinsey_%26_Company_logo.svg' },
               { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
               { name: 'HSBC', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg' },
               { name: 'AstraZeneca', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/AstraZeneca_logo.svg' }
             ].map((r, idx) => (
               <div key={idx} className="h-20 bg-bg-base/50 p-4 border border-border rounded-2xl flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all hover:bg-white hover:border-brand-primary">
                 <img src={r.logo} alt={r.name} className="max-h-8 max-w-[80%] object-contain" />
               </div>
             ))}
           </div>
           <div className="p-6 bg-brand-primary/5 border border-brand-primary/10 rounded-3xl">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-4 w-4 text-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Career Fair 2026</span>
              </div>
              <p className="text-[11px] font-medium text-text-muted leading-relaxed">
                Next virtual networking event starts in <span className="text-brand-primary font-bold">12 days</span>. 200+ recruiters attending.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
