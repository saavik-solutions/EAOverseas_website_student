"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Clock, Eye, ChevronRight, Pin, Languages, Loader2, CheckCircle2, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, MessageCircle, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type FeedPostType = 'NEWS' | 'GUIDE' | 'WEBINAR' | 'FORM' | 'ALERT' | 'ANNOUNCEMENT';

interface FeedPostProps {
  id: string;
  type: FeedPostType;
  title: string;
  excerpt: string;
  media?: string;
  author: {
    name: string;
    logo: string;
  };
  timestamp: string;
  views: string;
  isPinned?: boolean;
  isDetailedView?: boolean;
  comments?: number;
}

const typeStyles: Record<FeedPostType, string> = {
  NEWS: 'bg-blue-50 text-blue-600 border border-blue-100',
  GUIDE: 'bg-purple-50 text-purple-600 border border-purple-100',
  WEBINAR: 'bg-orange-50 text-orange-600 border border-orange-100',
  FORM: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  ALERT: 'bg-rose-50 text-rose-600 border border-rose-100',
  ANNOUNCEMENT: 'bg-brand-primary/5 text-brand-primary border border-brand-primary/10',
};

const TRANSLATION_LANGUAGES = [
  { code: 'Original', name: 'Original' },
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: 'Mandarin' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ar', name: 'Arabic' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'id', name: 'Indonesian' }
];

export const FeedPost: React.FC<FeedPostProps> = ({
  id,
  type,
  title,
  excerpt,
  media,
  author,
  timestamp,
  views,
  isPinned,
  isDetailedView = false,
  comments = 0
}) => {
  const [targetLang, setTargetLang] = React.useState('Original');
  const [translatedTitle, setTranslatedTitle] = React.useState(title);
  const [translatedContent, setTranslatedContent] = React.useState(excerpt);
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const langMenuRef = React.useRef<HTMLDivElement>(null);

  const [isCopied, setIsCopied] = React.useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const shareMenuRef = React.useRef<HTMLDivElement>(null);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [localComments, setLocalComments] = useState<any[]>([]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) setShowLangMenu(false);
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) setShowShareMenu(false);
    };
    if (showLangMenu || showShareMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangMenu, showShareMenu]);

  const handleTranslate = async (langCode: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTargetLang(langCode);
    setShowLangMenu(false);
    if (langCode === 'Original') {
      setTranslatedTitle(title);
      setTranslatedContent(excerpt);
      return;
    }

    setIsTranslating(true);
    try {
      const [titleRes, contentRes] = await Promise.all([
        fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: title, targetLanguage: langCode }) }),
        fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: excerpt, targetLanguage: langCode }) })
      ]);
      if (titleRes.ok && contentRes.ok) {
        const titleData = await titleRes.json();
        const contentData = await contentRes.json();
        setTranslatedTitle(titleData.translatedText || title);
        setTranslatedContent(contentData.translatedText || excerpt);
      }
    } catch (err) {
      console.error('Translation failed', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/feed/global/${id}`;
    
    // Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => { setIsCopied(false); setShowShareMenu(false); }, 2000);
        return;
      } catch (err) {
        console.error('Modern copy failed', err);
      }
    }

    // Fallback for non-secure or older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => { setIsCopied(false); setShowShareMenu(false); }, 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
  };

  const shareToSocial = (platform: 'twitter' | 'linkedin' | 'facebook' | 'whatsapp' | 'telegram', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = encodeURIComponent(`${window.location.origin}/feed/global/${id}`);
    const encodedTitle = encodeURIComponent(title);
    
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'whatsapp') shareUrl = `https://wa.me/?text=${encodedTitle}%20${url}`;
    if (platform === 'telegram') shareUrl = `https://t.me/share/url?url=${url}&text=${encodedTitle}`;
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/feed/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'comment', text: commentText })
      });
      if (res.ok) {
        const data = await res.json();
        setLocalComments(data.post.commentsList);
        setCommentText('');
      }
    } catch (err) {
      console.error("Failed to add comment", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  useEffect(() => {
    if (showComments && localComments.length === 0) {
      const fetchComments = async () => {
        try {
          const res = await fetch(`/api/feed/${id}`);
          if (res.ok) {
            const data = await res.json();
            setLocalComments(data.post.commentsList || []);
          }
        } catch (err) {
          console.error("Failed to fetch comments", err);
        }
      };
      fetchComments();
    }
  }, [showComments, id]);

  const getInitialLogo = (name: string) => {
    const firstLetter = name.trim().charAt(0).toUpperCase() || '?';
    const bgColors = ['bg-rose-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-brand-primary'];
    const colorIndex = name.length % bgColors.length;
    return (
      <div className={`w-8 h-8 rounded-lg ${bgColors[colorIndex]} flex items-center justify-center text-[10px] font-black text-white shadow-sm shrink-0 uppercase`}>
        {firstLetter}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="bg-gradient-to-br from-white to-brand-primary/[0.02] border border-slate-200/60 rounded-[2rem] group overflow-visible cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:border-brand-primary/20 hover:shadow-[0_24px_48px_-12px_rgba(124,58,237,0.15)] transition-all duration-500 relative ring-1 ring-white/50"
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm transition-colors ${typeStyles[type]}`}>
              {type}
            </span>
            {isPinned && (
              <div className="bg-brand-primary/10 p-1.5 rounded-full border border-brand-primary/20">
                <Pin className="h-3 w-3 text-brand-primary fill-brand-primary" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-5 text-[10px] font-black text-text-muted uppercase tracking-[0.15em]">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-brand-primary" />
              {timestamp}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-3.5 w-3.5 text-brand-primary" />
              {views}
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          {isTranslating && (
             <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
             </div>
          )}
          <h3 className={`font-black text-slate-900 mb-3 group-hover:text-brand-primary transition-colors leading-[1.25] break-words break-all sm:break-words tracking-tight ${isDetailedView ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
            {translatedTitle} {targetLang !== 'Original' && <span className="text-[9px] text-brand-primary font-black uppercase tracking-[0.15em] ml-3 bg-brand-primary/10 px-3 py-1 rounded-full inline-flex items-center align-middle whitespace-nowrap border border-brand-primary/20">Translated</span>}
          </h3>
          <p className={`text-sm sm:text-base text-text-muted/80 mb-0 font-medium leading-relaxed break-words break-all sm:break-words w-full overflow-hidden ${isDetailedView ? '' : 'line-clamp-3'}`}>
            {translatedContent}
          </p>
        </div>

        {media && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-slate-100 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={media} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </div>
        )}

        <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {author.logo.length === 1 ? getInitialLogo(author.name) : (
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-text-primary shrink-0 overflow-hidden">
                <img src={author.logo} alt={author.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col -space-y-0.5">
               <span className="text-[11px] font-black text-text-primary uppercase tracking-widest">{author.name}</span>
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Global Protocol</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
             {/* Comment Button */}
             <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowComments(!showComments); }}
               className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer shadow-sm sm:shadow-none ${showComments ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-text-muted bg-slate-50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 border-transparent'}`}
             >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{localComments.length || comments} Comments</span>
             </motion.div>

             {/* Share Menu */}
             <div className="relative" ref={shareMenuRef}>
               <motion.div 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowShareMenu(!showShareMenu); setShowLangMenu(false); }}
                 className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer shadow-sm sm:shadow-none ${isCopied ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-text-muted bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 border-transparent'}`}
               >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{isCopied ? 'Copied!' : 'Share'}</span>
               </motion.div>
                
               {mounted && createPortal(
                 <AnimatePresence>
                   {showShareMenu && (
                     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         onClick={() => setShowShareMenu(false)}
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
                           onClick={() => setShowShareMenu(false)}
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
                                    value={`${window.location.origin}/feed/global/${id}`}
                                    className="bg-transparent text-xs font-bold text-text-primary outline-none w-full pr-12 overflow-hidden text-ellipsis whitespace-nowrap" 
                                  />
                                  <button 
                                    onClick={handleCopyLink}
                                    className={`absolute right-4 p-2.5 rounded-xl transition-all ${isCopied ? 'bg-emerald-500 text-white' : 'text-text-muted hover:bg-slate-200 hover:text-text-primary'}`}
                                  >
                                     {isCopied ? <CheckCircle2 className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
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

             {/* Translate Menu */}
             <div className="relative" ref={langMenuRef}>
               <motion.div 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowLangMenu(!showLangMenu); setShowShareMenu(false); }}
                 className="flex items-center gap-2 text-text-muted bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/20 border border-transparent px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-sm sm:shadow-none"
               >
                  <Languages className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{targetLang === 'Original' ? 'Translate' : targetLang}</span>
               </motion.div>
                
               <AnimatePresence>
                 {showLangMenu && (
                 <motion.div 
                   initial={{ opacity: 0, y: 15, scale: 0.9 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 15, scale: 0.9 }}
                   className="absolute bottom-full right-0 mb-4 w-52 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-2 z-50 flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar"
                   onClick={(e) => e.stopPropagation()}
                 >
                   <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-4 py-3 sticky top-0 bg-white/90 backdrop-blur-sm z-10 border-b border-slate-100 mb-1">Matrix Engine</div>
                   {TRANSLATION_LANGUAGES.map(lang => (
                      <button 
                        key={lang.code}
                        onClick={(e) => handleTranslate(lang.code, e)}
                        className={`flex items-center justify-between w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest font-black rounded-2xl transition-all ${targetLang === lang.code ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-slate-50 text-text-primary'}`}
                      >
                        {lang.name}
                        {targetLang === lang.code && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                   ))}
                 </motion.div>
               )}
               </AnimatePresence>
             </div>

              {!isDetailedView && (
               <motion.button 
                 whileHover={{ x: 4 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => window.location.href = `/feed/global/${id}`}
                 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-5 py-2.5 rounded-2xl border border-brand-primary/10 hover:bg-brand-primary/10 transition-all group/btn shadow-sm sm:shadow-none"
               >
                 Read More
                 <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
               </motion.button>
              )}
          </div>
        </div>

        {/* Inline Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-8 mt-8 border-t border-slate-100">
                 <h4 className="text-sm font-black text-text-primary uppercase tracking-widest mb-6">Discussion ({localComments.length || comments})</h4>
                 
                 {/* New Comment Input */}
                 <form onSubmit={handleAddComment} className="flex gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-text-muted shrink-0 uppercase">U</div>
                    <div className="flex-1 relative">
                       <input 
                         type="text"
                         value={commentText}
                         onChange={(e) => setCommentText(e.target.value)}
                         placeholder="Add a comment..."
                         className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all pr-12"
                       />
                       <button 
                         type="submit"
                         disabled={!commentText.trim() || isSubmittingComment}
                         className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all disabled:opacity-30"
                       >
                          {isSubmittingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                       </button>
                    </div>
                 </form>

                 {/* Comments List */}
                 <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {localComments.map((comment, idx) => (
                      <div key={idx} className="flex gap-4 group/c">
                         <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-[10px] font-black text-brand-primary shrink-0 uppercase">
                            {comment.userName?.charAt(0) || 'A'}
                         </div>
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="text-xs font-black text-text-primary uppercase tracking-wide">{comment.userName || 'Student'}</span>
                               <span className="text-[9px] text-text-muted font-bold uppercase tracking-widest">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-text-muted leading-relaxed">{comment.text}</p>
                         </div>
                      </div>
                    ))}
                    {localComments.length === 0 && !isSubmittingComment && (
                      <div className="text-center py-8">
                         <MessageCircle className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                         <p className="text-xs font-bold text-text-muted uppercase tracking-widest">No comments yet. Start the conversation!</p>
                      </div>
                    )}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
