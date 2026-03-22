"use client";

import React from 'react';
import { X, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export const FeedDrawer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('post');

  const closeDrawer = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('post');
    router.push(`/feed?${params.toString()}`);
  };

  if (!postId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto"
        >
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={closeDrawer}
                className="p-2 hover:bg-bg-base rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-text-primary" />
              </button>
              <span className="text-sm font-black uppercase tracking-widest text-text-muted">Post Details</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-bg-base rounded-xl transition-colors text-text-muted hover:text-brand-primary">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2.5 hover:bg-bg-base rounded-xl transition-colors text-text-muted hover:text-brand-primary">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            <div className="space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                Latest News
              </span>
              <h2 className="text-4xl font-black text-text-primary leading-[1.1]">
                UK Visa Policy Update: Graduate Route Extension Details
              </h2>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-xl bg-nav-bg flex items-center justify-center text-white font-black text-xs">
                  EP
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">EduPlatform Admin</p>
                  <p className="text-xs text-text-muted font-medium">Published 2 hours ago • 12 min read</p>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-xl bg-bg-base">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" 
                alt="UK Visa" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none text-text-primary/80 font-medium leading-relaxed space-y-6">
              <p>
                The UK Home Office has officially confirmed that the Graduate Route visa, which allows international students to stay and work in the UK for at least two years after completing their studies, will remain in place without restrictive changes.
              </p>
              <p>
                This decision follows a comprehensive review by the Migration Advisory Committee (MAC), which found no widespread evidence of abuse and highlighted the immense contribution of international graduates to the UK economy and university system.
              </p>
              <h4 className="text-xl font-black text-text-primary pt-6">Key Takeaways for Students</h4>
              <ul className="space-y-4 list-disc pl-6 marker:text-brand-primary">
                <li>No changes to the duration of the post-study work period (2 years for Bachelors/Masters, 3 years for PhDs).</li>
                <li>The review confirmed the visa is effectively attracting global talent to the UK.</li>
                <li>Students can still transition to the Skilled Worker route if they find suitable employment.</li>
              </ul>
            </div>

            <div className="pt-12 border-t border-border/50">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black text-text-primary flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-brand-primary" />
                  Comments (24)
                </h4>
              </div>
              <div className="bg-bg-base/50 p-6 rounded-2xl border border-border/50 text-center">
                <p className="text-sm text-text-muted font-bold">Join the discussion in the Community tab</p>
                <button 
                  onClick={() => router.push('/feed?tab=community')}
                  className="mt-4 text-[11px] font-black uppercase tracking-widest text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  Switch to Community Feed →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
