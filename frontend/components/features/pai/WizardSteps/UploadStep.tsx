"use client";

import React, { useState } from 'react';
import { Upload, FileText, Link as LinkIcon, ShieldCheck, Loader2, Github, Linkedin, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UploadStep: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setAnalysisStatus('Parsing Resume PDF...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/user/resume-upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setAnalysisStatus('Extracting Key Metrics...');
        setTimeout(() => {
          setAnalysisStatus('Done!');
          setIsUploading(false);
        }, 1500);
      } else {
        const data = await res.json();
        alert(data.error || 'Upload failed');
        setAnalysisStatus(null);
        setIsUploading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
      setAnalysisStatus(null);
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Resume Uploader */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Resume / CV</h3>
          <div className="relative">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="h-64 border-2 border-dashed border-border rounded-[2.5rem] bg-bg-base/30 flex flex-col items-center justify-center gap-4 hover:border-brand-primary hover:bg-brand-primary/5 transition-all group p-8 text-center relative z-0">
               <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Upload className="h-8 w-8" />
               </div>
               <div className="space-y-1">
                 <p className="text-sm font-black text-text-primary">Drag & drop your resume</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">PDF ONLY (Max 5MB)</p>
               </div>
            </div>
          </div>
        </div>

        {/* Portfolio URLs */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Portfolio & Links</h3>
          <div className="space-y-4">
            <div className="relative group">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text" 
                placeholder="LinkedIn, GitHub, or Personal Site" 
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full h-14 pl-12 pr-6 bg-bg-base/50 border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
              />
            </div>
            
            <div className="space-y-4 pt-2">
               <div className="flex items-center justify-between p-4 bg-white border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-4 w-4 text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Auto-Scrape LinkedIn</span>
                  </div>
                  <div className="w-10 h-5 bg-brand-primary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
               </div>
               <div className="flex items-center justify-between p-4 bg-white border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Github className="h-4 w-4 text-text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Analyze GitHub Repos</span>
                  </div>
                  <div className="w-10 h-5 bg-brand-primary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {analysisStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-8 bg-nav-bg rounded-[2.5rem] text-white flex items-center justify-between"
          >
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                   {isUploading ? <Loader2 className="h-6 w-6 text-brand-accent animate-spin" /> : <ShieldCheck className="h-6 w-6 text-brand-success" />}
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-widest text-brand-accent">AI Processing</div>
                   <div className="text-xl font-black tracking-tight">{analysisStatus}</div>
                </div>
             </div>
             {!isUploading && (
               <div className="text-[10px] font-black uppercase tracking-widest text-brand-success bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                 All data extracted successfully
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
