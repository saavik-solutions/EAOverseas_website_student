"use client";

import React from 'react';
import { Share2, MessageCircle, Heart, MoreHorizontal } from 'lucide-react';

interface FeedPostProps {
  title: string;
  body: string;
  author: string;
  timestamp: string;
  type: string;
}

export const FeedPost: React.FC<FeedPostProps> = ({
  title,
  body,
  author,
  timestamp,
  type
}) => {
  return (
    <div className="card-premium p-6 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary">
            {author[0]}
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary">{author}</h4>
            <p className="text-xs text-text-muted">{timestamp}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase rounded-full tracking-wider">
            {type}
          </span>
          <button className="p-1 hover:bg-bg-base rounded">
            <MoreHorizontal className="h-5 w-5 text-text-muted" />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight">{title}</h3>
      <p className="text-text-muted text-sm mb-6 leading-relaxed line-clamp-3">
        {body}
      </p>

      <div className="flex items-center justify-between py-4 border-t border-border/50">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors">
            <Heart className="h-5 w-5" />
            <span className="text-xs font-medium">Like</span>
          </button>
          <button className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs font-medium">Comment</span>
          </button>
        </div>
        <button className="p-2 text-text-muted hover:text-brand-primary transition-colors">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <button className="w-full mt-2 py-3 bg-bg-base text-brand-primary font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-all">
        Read Full Update
      </button>
    </div>
  );
};
