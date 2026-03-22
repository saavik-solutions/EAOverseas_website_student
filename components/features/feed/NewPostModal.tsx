"use client";

import React, { useState } from 'react';
import { X, Bold, Italic, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { id: 'general', name: 'General Discussion' },
    { id: 'visa', name: 'Visa & Immigration' },
    { id: 'tuition', name: 'Tuition & Finance' },
    { id: 'reviews', name: 'Uni Reviews' }
  ];

  const handleSubmit = async () => {
    if (!title || !content) return;
    
    setSubmitting(true);
    setError('');
    try {
      const tagArray = tags.split(' ').filter(t => t.startsWith('#')).map(t => t.replace('#', ''));
      const response = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          tags: tagArray
        })
      });

      const data = await response.json();
      if (response.ok) {
        onClose();
        window.location.reload(); 
      } else {
        setError(data.error || "Connection refused. Please check MongoDB IP Whitelist.");
      }
    } catch (error) {
      setError("Network error. Is the server running?");
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-bg-base/30">
            <h3 className="text-xl font-black text-text-primary tracking-tight">Ask the Community</h3>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
              <X className="h-6 w-6 text-text-muted" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 block">Post Title</label>
                  <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-5 py-3 rounded-2xl border border-border bg-bg-base/50 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 block">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl border border-border bg-bg-base/50 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 block">Add Tags (Instagram Style)</label>
                    <input 
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. #visa #uk"
                      className="w-full px-5 py-3 rounded-2xl border border-border bg-bg-base/50 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-sm text-brand-primary"
                    />
                  </div>
               </div>

               <div className="relative pt-10">
                  <div className="absolute top-0 left-0 right-0 flex items-center gap-2 p-2 bg-bg-base rounded-t-2xl border-x border-t border-border">
                     {[Bold, Italic].map((Icon, idx) => (
                       <button key={idx} className="p-2 hover:bg-white rounded-xl transition-colors text-text-muted hover:text-brand-primary">
                         <Icon className="h-4 w-4" />
                       </button>
                     ))}
                  </div>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your experience or ask a question..."
                    className="w-full h-32 md:h-48 px-6 py-5 rounded-b-2xl border border-border bg-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-sm resize-none"
                  />
               </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-xl border border-red-100 mb-2">
                {error}
              </p>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
               <p className="text-xs text-text-muted font-medium text-center md:text-left">Keep it respectful according to community rules.</p>
               <button 
                onClick={handleSubmit}
                disabled={submitting || !title || !content}
                className={`btn-primary px-8 py-3 w-full md:w-auto flex items-center justify-center gap-2 transition-all ${submitting ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'}`}
               >
                 {submitting ? (
                   <>
                     <Loader2 className="h-4 w-4 animate-spin" />
                     Posting...
                   </>
                 ) : (
                   <>
                     Post Discussion
                     <Send className="h-4 w-4" />
                   </>
                 )}
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
