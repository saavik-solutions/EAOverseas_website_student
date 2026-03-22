"use client";

import React, { useState } from 'react';
import { Briefcase, Building2, Calendar, Plus, Trash2, ListChecks } from 'lucide-react';

export const ExperienceStep: React.FC = () => {
  const [experiences, setExperiences] = useState([{ id: 1 }]);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
         {experiences.map((exp, idx) => (
           <div key={exp.id} className="p-8 bg-bg-base/30 border border-border rounded-[2.5rem] relative group hover:border-brand-primary transition-all space-y-6">
              <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                 {idx > 0 && (
                   <button onClick={() => setExperiences(exps => exps.filter(e => e.id !== exp.id))} className="p-2 hover:bg-white rounded-lg text-brand-danger">
                     <Trash2 className="h-4 w-4" />
                   </button>
                 )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Job Role / Position</label>
                    <div className="relative group/input">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within/input:text-brand-primary transition-colors" />
                      <input type="text" placeholder="e.g. Software Engineer" className="w-full h-12 pl-12 pr-6 bg-white border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Company (Optional)</label>
                    <div className="relative group/input">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within/input:text-brand-primary transition-colors" />
                      <input type="text" placeholder="e.g. Google" className="w-full h-12 pl-12 pr-6 bg-white border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Industry</label>
                    <select className="w-full h-12 px-6 bg-white border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none appearance-none cursor-pointer">
                       <option>Select Industry</option>
                       <option>Technology</option>
                       <option>Finance</option>
                       <option>Healthcare</option>
                       <option>Education</option>
                       <option>Manufacturing</option>
                    </select>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Duration (Years)</label>
                    <div className="relative group/input">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within/input:text-brand-primary transition-colors" />
                      <input type="number" placeholder="e.g. 2" className="w-full h-12 pl-12 pr-6 bg-white border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all" />
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <button 
        onClick={() => setExperiences(exps => [...exps, { id: Date.now() }])}
        className="w-full py-6 border-2 border-dashed border-border rounded-[2.5rem] flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-text-muted hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all active:scale-95"
      >
        <Plus className="h-5 w-5" />
        Add Another Experience / Internship
      </button>

      <div className="flex items-center gap-2 p-4 bg-bg-base rounded-2xl border border-border border-dashed">
         <ListChecks className="h-4 w-4 text-brand-success" />
         <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Career Path analysis will be more accurate with deep role details</span>
      </div>
    </div>
  );
};
