"use client";

import React, { useState } from 'react';
import { Tag, Trophy, Briefcase, Plus, X, Lightbulb } from 'lucide-react';

export const SkillsStep: React.FC = () => {
  const [skills, setSkills] = useState(['Python', 'Data Analysis', 'Project Management', 'Public Speaking']);
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    if (inputValue && !skills.includes(inputValue)) {
      setSkills([...skills, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Key Skills & Core Competencies</label>
        <div className="space-y-4">
          <div className="relative group">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Type a skill and press Enter..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              className="w-full h-14 pl-12 pr-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <div key={skill} className="px-4 py-2 bg-white border border-border rounded-xl flex items-center gap-2 group hover:border-brand-primary transition-all">
                <span className="text-xs font-bold text-text-primary">{skill}</span>
                <button onClick={() => setSkills(skills.filter(s => s !== skill))} className="text-text-muted hover:text-brand-danger transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <Trophy className="h-5 w-5 text-brand-accent" />
             <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Awards & Honors</h3>
          </div>
          <textarea 
            placeholder="Scholarships, Dean's List, Competition wins..." 
            className="w-full h-32 p-6 bg-bg-base/50 border border-border rounded-2xl text-xs font-medium text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-accent/10 transition-all resize-none"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <Lightbulb className="h-5 w-5 text-brand-success" />
             <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Key Projects</h3>
          </div>
          <textarea 
            placeholder="Independent research, Open source, Hackathons..." 
            className="w-full h-32 p-6 bg-bg-base/50 border border-border rounded-2xl text-xs font-medium text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-success/10 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
};
