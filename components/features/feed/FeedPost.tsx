"use client";

import React from 'react';
import { Clock, Eye, ChevronRight, Pin } from 'lucide-react';
import { motion } from 'framer-motion';

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
}

const typeStyles: Record<FeedPostType, string> = {
  NEWS: 'bg-blue-100 text-blue-700 border-blue-200',
  GUIDE: 'bg-purple-100 text-purple-700 border-purple-200',
  WEBINAR: 'bg-orange-100 text-orange-700 border-orange-200',
  FORM: 'bg-green-100 text-green-700 border-green-200',
  ALERT: 'bg-red-100 text-red-700 border-red-200',
  ANNOUNCEMENT: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

export const FeedPost: React.FC<FeedPostProps> = ({
  type,
  title,
  excerpt,
  media,
  author,
  timestamp,
  views,
  isPinned
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium group overflow-hidden cursor-pointer"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${typeStyles[type]}`}>
              {type}
            </span>
            {isPinned && <Pin className="h-3.5 w-3.5 text-brand-primary fill-brand-primary" />}
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {timestamp}
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="h-3 w-3" />
              {views}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-3 mb-6 font-medium leading-relaxed">
          {excerpt}
        </p>

        {media && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-border/50">
            <img 
              src={media} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        <div className="pt-6 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-nav-bg flex items-center justify-center text-[10px] font-black text-white shrink-0">
              {author.logo}
            </div>
            <span className="text-xs font-bold text-text-primary">{author.name}</span>
          </div>
          <button className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-brand-primary group/btn">
            Read More
            <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
