"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Share2, Bookmark, MessageSquare, Clock, Eye, User as UserIcon, Link as LinkIcon, Twitter, Linkedin, Facebook, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export const FeedDrawer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('post');
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (postId) {
      const fetchPostDetail = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/feed/${postId}`);
          if (res.ok) {
            const data = await res.json();
            setPost(data.post);
            setIsSaved(data.post.isSavedByCurrentUser || false);
          }
        } catch (err) {
          console.error("Failed to fetch post detail:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchPostDetail();
    } else {
      setPost(null);
    }
  }, [postId]);

  const closeDrawer = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('post');
    router.push(`/feed?${params.toString()}`);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!post) return;
    setIsSaved(prev => !prev);
    try {
      const res = await fetch(`/api/feed/${post._id}/save`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to toggle save');
      const data = await res.json();
      setIsSaved(data.isSaved);
    } catch (err) {
      console.error(err);
      setIsSaved(prev => !prev); // Revert on failure
    }
  };

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/feed?post=${post._id}`;
    
    const fallbackCopyTextToClipboard = (text: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          setTimeout(() => { setCopied(false); setShowShare(false); }, 2000);
        }
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    };

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(url);
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => { setCopied(false); setShowShare(false); }, 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      fallbackCopyTextToClipboard(url);
    }
  };

  const shareToSocial = (platform: 'twitter' | 'linkedin' | 'facebook' | 'whatsapp' | 'telegram', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = encodeURIComponent(`${window.location.origin}/feed?post=${post._id}`);
    const encodedTitle = encodeURIComponent(post.title);
    
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'whatsapp') shareUrl = `https://wa.me/?text=${encodedTitle}%20${url}`;
    if (platform === 'telegram') shareUrl = `https://t.me/share/url?url=${url}&text=${encodedTitle}`;
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShare(false);
  };

  if (!postId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : post ? (
            <>
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={closeDrawer}
                    className="p-2.5 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100"
                  >
                    <X className="h-6 w-6 text-text-primary" />
                  </button>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Intelligence Detail</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative" ref={shareRef}>
                    <button 
                      onClick={() => setShowShare(!showShare)}
                      className={`p-3 rounded-2xl transition-all border hover:bg-slate-50 text-text-muted hover:text-brand-primary border-transparent hover:border-slate-100`}
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                    {mounted && createPortal(
                      <AnimatePresence>
                        {showShare && (
                          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setShowShare(false)}
                              className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            />
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 20 }}
                              className="relative w-full max-w-[420px] bg-white rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border border-white/20 p-8 sm:p-10 z-[10000] overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button 
                                onClick={() => setShowShare(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-text-muted transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>

                              <div className="text-center mb-8">
                                 <h4 className="text-2xl font-black text-text-primary tracking-tight mb-2">Share with Friends</h4>
                                 <p className="text-sm text-text-muted font-medium px-6 leading-relaxed">Expand your community by inviting others to this discussion!</p>
                              </div>

                              <div className="space-y-8">
                                 {/* Link Section */}
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-text-primary ml-1 opacity-60">Share your link</label>
                                    <div className="relative flex items-center bg-slate-50 rounded-2xl p-5 border border-slate-100 transition-all hover:bg-slate-100/50 group/link">
                                       <input 
                                         readOnly 
                                         value={`${window.location.origin}/feed?post=${post._id}`}
                                         className="bg-transparent text-xs font-bold text-text-primary outline-none w-full pr-12 overflow-hidden text-ellipsis whitespace-nowrap" 
                                       />
                                       <button 
                                         onClick={copyToClipboard}
                                         className={`absolute right-4 p-2.5 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'text-text-muted hover:bg-slate-200 hover:text-text-primary'}`}
                                       >
                                          {copied ? <CheckCircle2 className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                                       </button>
                                    </div>
                                 </div>

                                 {/* Social Section */}
                                 <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-text-primary ml-1 opacity-60">Share to</label>
                                    <div className="flex justify-between items-center px-1">
                                       <motion.button 
                                         whileHover={{ y: -8 }} 
                                         whileTap={{ scale: 0.9 }}
                                         onClick={(e) => shareToSocial('facebook', e)}
                                         className="flex flex-col items-center gap-3 group/s"
                                       >
                                          <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-xl shadow-blue-500/25 transition-transform group-hover/s:scale-110">
                                             <Facebook className="w-6 h-6 fill-current" />
                                          </div>
                                          <span className="text-[11px] font-bold text-text-muted group-hover/s:text-text-primary transition-colors">Facebook</span>
                                       </motion.button>

                                       <motion.button 
                                         whileHover={{ y: -8 }} 
                                         whileTap={{ scale: 0.9 }}
                                         onClick={(e) => shareToSocial('twitter', e)}
                                         className="flex flex-col items-center gap-3 group/s"
                                       >
                                          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white shadow-xl shadow-black/25 transition-transform group-hover/s:scale-110">
                                             <Twitter className="w-6 h-6" />
                                          </div>
                                          <span className="text-[11px] font-bold text-text-muted group-hover/s:text-text-primary transition-colors">X</span>
                                       </motion.button>

                                       <motion.button 
                                         whileHover={{ y: -8 }} 
                                         whileTap={{ scale: 0.9 }}
                                         onClick={(e) => shareToSocial('whatsapp', e)}
                                         className="flex flex-col items-center gap-3 group/s"
                                       >
                                          <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl shadow-green-500/25 transition-transform group-hover/s:scale-110">
                                             <MessageCircle className="w-6 h-6" />
                                          </div>
                                          <span className="text-[11px] font-bold text-text-muted group-hover/s:text-text-primary transition-colors">Whatsapp</span>
                                       </motion.button>

                                       <motion.button 
                                         whileHover={{ y: -8 }} 
                                         whileTap={{ scale: 0.9 }}
                                         onClick={(e) => shareToSocial('telegram', e)}
                                         className="flex flex-col items-center gap-3 group/s"
                                       >
                                          <div className="w-14 h-14 rounded-full bg-[#0088CC] flex items-center justify-center text-white shadow-xl shadow-sky-500/25 transition-transform group-hover/s:scale-110">
                                             <Send className="w-6 h-6 -rotate-12 translate-x-px" />
                                          </div>
                                          <span className="text-[11px] font-bold text-text-muted group-hover/s:text-text-primary transition-colors">Telegram</span>
                                       </motion.button>

                                       <motion.button 
                                         whileHover={{ y: -8 }} 
                                         whileTap={{ scale: 0.9 }}
                                         onClick={(e) => shareToSocial('linkedin', e)}
                                         className="flex flex-col items-center gap-3 group/s"
                                       >
                                          <div className="w-14 h-14 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-xl shadow-blue-600/25 transition-transform group-hover/s:scale-110">
                                             <Linkedin className="w-6 h-6" />
                                          </div>
                                          <span className="text-[11px] font-bold text-text-muted group-hover/s:text-text-primary transition-colors">LinkedIn</span>
                                       </motion.button>
                                    </div>
                                 </div>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>,
                      document.body
                    )}
                  </div>
                  <button 
                    onClick={(e) => handleSave(e)}
                    className={`p-3 rounded-2xl transition-all border ${isSaved ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20' : 'hover:bg-slate-50 text-text-muted hover:text-brand-primary border-transparent hover:border-slate-100'}`}
                  >
                    <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest border border-brand-primary/20">
                      {post.flair || post.category || 'News'}
                    </span>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                       <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {post.views || 0} views</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-text-primary leading-[1.1] tracking-tight">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 pt-4">
                    {post.authorId?.avatarUrl || post.authorAvatar ? (
                      <img src={post.authorId?.avatarUrl || post.authorAvatar} alt="Author" className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-sm border border-brand-primary/20">
                        <UserIcon className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-black text-text-primary uppercase tracking-widest">{post.authorId?.fullName || post.authorName || 'EAOverseas Official'}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">Global Protocol Verified</p>
                    </div>
                  </div>
                </div>

                {(post.imageUrl || post.media) && (
                  <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl group">
                    <img 
                      src={post.imageUrl || post.media} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none text-text-primary/90 font-medium leading-relaxed space-y-8 whitespace-pre-wrap">
                  {post.content}
                </div>

                <div className="pt-16 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-black text-text-primary flex items-center gap-4 uppercase tracking-tighter">
                      <MessageSquare className="h-6 w-6 text-brand-primary" />
                      Matrix Discussion ({post.commentsList?.length || 0})
                    </h4>
                  </div>
                  
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center space-y-4">
                    <p className="text-sm text-text-muted font-black uppercase tracking-widest">Converge in the community hub</p>
                    <p className="text-xs text-text-muted/60 font-bold max-w-sm mx-auto">Join the decentralized discussion matrix to interact with this intelligence stream.</p>
                    <button 
                      onClick={() => router.push('/feed?tab=community')}
                      className="mt-4 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm"
                    >
                      Switch to Community Feed →
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center space-y-6">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <X className="w-10 h-10 text-slate-200" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-xl font-black text-text-primary uppercase tracking-widest">Intelligence Missing</h3>
                 <p className="text-sm text-text-muted font-bold uppercase tracking-widest opacity-60">The requested transmission could not be located</p>
               </div>
               <button onClick={closeDrawer} className="text-brand-primary font-black uppercase text-[11px] tracking-widest hover:underline">Return to Hub</button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
