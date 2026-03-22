"use client";

import React from 'react';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share, Bookmark } from 'lucide-react';

interface CommunityPostProps {
  title: string;
  content: string;
  author: string;
  upvotes: number;
  comments: number;
  tags: string[];
}

export const CommunityPost: React.FC<CommunityPostProps> = ({
  title,
  content,
  author,
  upvotes,
  comments,
  tags
}) => {
  return (
    <div className="card-premium flex w-full max-w-2xl">
      <div className="w-12 bg-bg-base flex flex-col items-center py-4 border-r border-border/50">
        <button className="p-1 hover:bg-white hover:text-brand-primary rounded transition-colors text-text-muted">
          <ArrowBigUp className="h-7 w-7" />
        </button>
        <span className="text-xs font-bold my-2 text-text-primary">{upvotes > 999 ? (upvotes/1000).toFixed(1) + 'k' : upvotes}</span>
        <button className="p-1 hover:bg-white hover:text-brand-danger rounded transition-colors text-text-muted">
          <ArrowBigDown className="h-7 w-7" />
        </button>
      </div>

      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-[10px] font-bold text-brand-accent">u/</div>
          <span className="text-xs font-medium text-text-muted">{author}</span>
          <span className="text-xs text-text-muted">• 4h ago</span>
        </div>

        <h3 className="text-lg font-bold text-text-primary mb-3 leading-snug">{title}</h3>
        <p className="text-sm text-text-muted mb-4 line-clamp-3 leading-relaxed">{content}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span key={tag} className="px-2.5 py-0.5 bg-bg-base border border-border rounded text-[10px] font-semibold text-text-muted hover:border-brand-primary transition-colors cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 py-2">
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-bg-base rounded-md text-text-muted transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-bold">{comments} Comments</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-bg-base rounded-md text-text-muted transition-colors">
            <Share className="h-4 w-4" />
            <span className="text-xs font-bold">Share</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-bg-base rounded-md text-text-muted transition-colors">
            <Bookmark className="h-4 w-4" />
            <span className="text-xs font-bold">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};
