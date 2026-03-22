"use client";

import React, { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, Reply, MoreHorizontal } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  replies?: Comment[];
}

interface CommentThreadProps {
  comment: Comment;
  level?: number;
}

export const CommentThread: React.FC<CommentThreadProps> = ({ comment, level = 0 }) => {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [upvotes, setUpvotes] = useState(comment.upvotes);

  const handleVote = (type: 'up' | 'down') => {
    if (vote === type) {
      setVote(null);
      setUpvotes(type === 'up' ? upvotes - 1 : upvotes + 1);
    } else {
      const diff = vote === null ? 1 : 2;
      setVote(type);
      setUpvotes(type === 'up' ? upvotes + diff : upvotes - diff);
    }
  };

  return (
    <div className={`group ${level > 0 ? 'ml-6 md:ml-10 mt-6 pt-6 border-l-2 border-border/30 pl-6' : 'mt-10'}`}>
      <div className="flex gap-4">
        {/* Vote Column Mini */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={() => handleVote('up')}
            className={`p-1 rounded-lg hover:bg-orange-50 transition-colors ${vote === 'up' ? 'text-orange-600 bg-orange-50' : 'text-text-muted'}`}
          >
            <ArrowBigUp className={`h-6 w-6 ${vote === 'up' ? 'fill-orange-600' : ''}`} />
          </button>
          <span className={`text-[11px] font-black ${vote === 'up' ? 'text-orange-600' : vote === 'down' ? 'text-blue-600' : 'text-text-primary'}`}>
            {upvotes}
          </span>
          <button 
            onClick={() => handleVote('down')}
            className={`p-1 rounded-lg hover:bg-blue-50 transition-colors ${vote === 'down' ? 'text-blue-600 bg-blue-50' : 'text-text-muted'}`}
          >
            <ArrowBigDown className={`h-6 w-6 ${vote === 'down' ? 'fill-blue-600' : ''}`} />
          </button>
        </div>

        {/* Comment Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-nav-bg flex items-center justify-center text-[8px] font-black text-white">
              {comment.author[0].toUpperCase()}
            </div>
            <span className="text-sm font-bold text-text-primary">u/{comment.author}</span>
            <span className="text-text-muted text-xs font-medium">• {comment.timestamp}</span>
          </div>
          
          <div className="text-sm text-text-primary/90 font-medium leading-relaxed">
            {comment.content}
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-widest">
              <Reply className="h-4 w-4" />
              Reply
            </button>
            <button className="text-text-muted hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-widest">
              Share
            </button>
            <button className="p-1 hover:bg-bg-base rounded-md text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recursive Replies */}
      {comment.replies && level < 2 && (
        <div className="space-y-6">
          {comment.replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
