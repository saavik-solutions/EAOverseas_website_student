"use client";

import React from 'react';
import { MapPin, Calendar, Award, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface UniRow {
  id: string;
  name: string;
  location: string;
  fee: string;
  intake: string;
  ielts: string;
  matchScore: number;
  rank: number;
  logo: string;
}

const mockUnis: UniRow[] = [
  { id: 'u1', name: 'University of Oxford', location: 'UK', fee: '£35,000', intake: 'Sep', ielts: '7.5', matchScore: 82, rank: 1, logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg' },
  { id: 'u2', name: 'Stanford University', location: 'USA', fee: '$52,000', intake: 'Sep', ielts: '7.5', matchScore: 78, rank: 3, logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_University_seal.svg' },
  { id: 'u3', name: 'TUM Munich', location: 'Germany', fee: '€0 (Public)', intake: 'Oct, Apr', ielts: '6.5', matchScore: 94, rank: 25, logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Logo_of_the_Technical_University_of_Munich.svg' },
  { id: 'u4', name: 'University of Toronto', location: 'Canada', fee: 'CAD 45,000', intake: 'Sep, Jan', ielts: '7.0', matchScore: 88, rank: 18, logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Utoronto_logo.svg' },
  { id: 'u5', name: 'Imperial College London', location: 'UK', fee: '£32,000', intake: 'Oct', ielts: '7.0', matchScore: 85, rank: 6, logo: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Imperial_College_London_logo.svg' }
];

export const UniversityListTable: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-text-primary tracking-tight">Top Universities for this Course</h3>
        <div className="flex gap-2">
           {['Global Rank', 'Lowest Fee', 'Highest Match'].map(f => (
             <button key={f} className="px-4 py-2 bg-white border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-brand-primary hover:text-brand-primary transition-all">
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="bg-white border border-border rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-base/30 border-b border-border">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">University & Rank</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-center">Match %</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Annual Fee</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Intake</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">IELTS</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockUnis.map((uni) => (
                <tr key={uni.id} className="hover:bg-brand-primary/5 transition-all group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-bg-base border border-border flex items-center justify-center p-1.5 overflow-hidden">
                        <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-black text-text-primary group-hover:text-brand-primary transition-colors">{uni.name}</div>
                        <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold tracking-tight uppercase">
                          <MapPin className="h-3 w-3 text-brand-primary" />
                          {uni.location} • <span className="text-brand-accent">Global Rank #{uni.rank}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center gap-1">
                       <div className="text-lg font-black text-brand-success">{uni.matchScore}%</div>
                       <div className="w-16 h-1 bg-bg-base rounded-full overflow-hidden">
                         <div className="h-full bg-brand-success" style={{ width: `${uni.matchScore}%` }} />
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-text-primary">{uni.fee}</div>
                    <div className="text-[9px] font-medium text-text-muted uppercase tracking-widest">Est. Tuition</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-widest">
                       <Calendar className="h-3.5 w-3.5" />
                       {uni.intake}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-black text-text-primary">
                       <Award className="h-3.5 w-3.5 text-brand-accent" />
                       {uni.ielts}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="px-6 py-2.5 bg-nav-bg text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-all shadow-lg active:scale-95 flex items-center gap-2 ml-auto">
                      Apply
                      <ArrowRight className="h-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
