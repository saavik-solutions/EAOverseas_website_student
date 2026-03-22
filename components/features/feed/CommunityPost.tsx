"use client";

import React, { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export type CommunityFlair = 'Question' | 'Experience' | 'Tips' | 'Visa' | 'Finance' | 'General';

interface CommunityPostProps {
  id: string;
  category: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  upvotes: number;
  comments: number;
  tags?: string[];
  flair?: CommunityFlair;
  userVote?: 'up' | 'down' | null;
  isDetailedView?: boolean;
  isHighlighted?: boolean;
}

const flairStyles: Record<CommunityFlair, string> = {
  Question: 'bg-blue-50 text-blue-600',
  Experience: 'bg-purple-50 text-purple-600',
  Tips: 'bg-green-50 text-green-600',
  Visa: 'bg-red-50 text-red-600',
  Finance: 'bg-orange-50 text-orange-600',
  General: 'bg-gray-50 text-gray-600',
};

// Animation Variants for Highlighting
const highlightVariants = {
  pulse: {
    scale: [1, 1.02, 1],
    borderColor: ['rgb(226, 232, 240)', 'rgb(79, 70, 229)', 'rgb(226, 232, 240)'],
    transition: {
      duration: 2,
      repeat: 3,
      ease: "easeInOut"
    }
  }
};

export const CommunityPost: React.FC<CommunityPostProps> = ({
  id,
  category,
  title,
  content,
  authorName,
  authorAvatar,
  createdAt,
  upvotes: initialUpvotes,
  comments,
  tags = [],
  flair = 'General',
  userVote: initialVote = null,
  isHighlighted = false,
}) => {
  const postRef = React.useRef<HTMLDivElement>(null);
  const [vote, setVote] = useState<'up' | 'down' | null>(initialVote);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isCopied, setIsCopied] = useState(false);

  React.useEffect(() => {
    if (isHighlighted && postRef.current) {
      setTimeout(() => {
        postRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [isHighlighted]);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Dynamically construct absolute URI for deep linking to the detailed layout
    const url = `${window.location.origin}/feed/community/${id}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleVote = async (type: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'down') return; // Database currently only supports 'up' toggle
    
    // Optimistic UI
    const isLiking = vote !== 'up';
    setVote(isLiking ? 'up' : null);
    setUpvotes(isLiking ? upvotes + 1 : upvotes - 1);

    try {
      await fetch(`/api/feed/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' })
      });
    } catch (err) {
      console.error(err);
      // Revert on error
      setVote(!isLiking ? 'up' : null);
      setUpvotes(!isLiking ? upvotes + 1 : upvotes - 1);
    }
  };

  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, i) => 
      part.startsWith('#') ? (
        <span key={i} className="text-brand-primary font-bold hover:underline cursor-pointer">
          {part}
        </span>
      ) : part
    );
  };

  const timeAgo = React.useMemo(() => {
    const date = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }, [createdAt]);

  return (
    <motion.div 
      ref={postRef}
      animate={isHighlighted ? "pulse" : ""}
      variants={highlightVariants}
      className={`flex flex-col sm:flex-row gap-0 sm:gap-2 group cursor-pointer bg-white border rounded-2xl hover:bg-bg-base/50 transition-colors overflow-hidden ${
        isHighlighted ? 'border-brand-primary ring-4 ring-brand-primary/10 z-10' : 'border-border'
      }`}
    >
      {/* Vote Column - Hidden on very small mobile, shown on SM+ */}
      <div className="hidden sm:flex flex-col items-center py-4 px-2 bg-bg-base/30 group-hover:bg-bg-base transition-colors border-r border-border/50">
        <button 
          onClick={(e) => handleVote('up', e)}
          className={`p-1 rounded hover:bg-orange-100 transition-colors ${vote === 'up' ? 'text-orange-600 bg-orange-50' : 'text-text-muted'}`}
        >
          <ArrowBigUp className={`h-7 w-7 ${vote === 'up' ? 'fill-orange-600' : ''}`} />
        </button>
        <span className={`text-sm font-black my-1 ${vote === 'up' ? 'text-orange-600' : vote === 'down' ? 'text-blue-600' : 'text-text-primary'}`}>
          {upvotes}
        </span>
        <button 
          onClick={(e) => handleVote('down', e)}
          className={`p-1 rounded hover:bg-blue-100 transition-colors ${vote === 'down' ? 'text-blue-600 bg-blue-50' : 'text-text-muted'}`}
        >
          <ArrowBigDown className={`h-7 w-7 ${vote === 'down' ? 'fill-blue-600' : ''}`} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
            c/{category}
          </span>
          <span className="text-text-muted text-[10px] uppercase font-bold tracking-widest">•</span>
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">
            Posted by u/{authorName} • {timeAgo}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-base sm:text-lg font-bold text-text-primary leading-tight group-hover:text-brand-primary transition-colors">
              {title}
            </h3>
            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[8px] sm:text-[9px] font-black uppercase tracking-tighter whitespace-nowrap ${flairStyles[flair]}`}>
              {flair}
            </span>
          </div>
          <p className="text-sm text-text-muted line-clamp-3 font-medium leading-relaxed">
            {renderContentWithHashtags(content)}
          </p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 sm:gap-6 border-t border-border/40 pt-4 sm:pt-0 sm:border-0">
          {/* Mobile-only Vote Row */}
          <div className="sm:hidden flex items-center gap-3 bg-bg-base px-2 py-1 rounded-full border border-border">
             <button onClick={(e) => handleVote('up', e)}><ArrowBigUp className={`h-5 w-5 ${vote === 'up' ? 'text-orange-600 fill-orange-600' : 'text-text-muted'}`} /></button>
             <span className="text-xs font-black">{upvotes}</span>
             <button onClick={(e) => handleVote('down', e)}><ArrowBigDown className={`h-5 w-5 ${vote === 'down' ? 'text-blue-600 fill-blue-600' : 'text-text-muted'}`} /></button>
          </div>

          <div className="flex items-center gap-2 text-text-muted hover:bg-bg-base px-2 py-1.5 rounded-lg transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <MessageSquare className="h-4 w-4" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{comments} <span className="hidden xs:inline">Comments</span></span>
          </div>
          <div onClick={handleShare} className="flex items-center gap-2 text-text-muted hover:bg-bg-base px-2 py-1.5 rounded-lg transition-colors cursor-pointer">
            <Share2 className="h-4 w-4" />
            <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors ${isCopied ? 'text-brand-success' : ''}`}>
               {isCopied ? 'Copied Link!' : 'Share'}
            </span>
          </div>
          <button className="ml-auto p-1.5 hover:bg-bg-base rounded-lg transition-colors">
            <MoreHorizontal className="h-5 w-5 text-text-muted" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
