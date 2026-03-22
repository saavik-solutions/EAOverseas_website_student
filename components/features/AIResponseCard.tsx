"use client";

import React from 'react';
import { Sparkles, ArrowRight, ExternalLink, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIResponseCardProps {
  content: string;
  links?: { label: string; href: string }[];
  suggestions?: string[];
}

export const AIResponseCard: React.FC<AIResponseCardProps> = ({
  content,
  links,
  suggestions
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium p-6 bg-gradient-to-br from-white to-brand-accent/5 border-brand-accent/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-brand-accent rounded-lg">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h4 className="font-bold text-text-primary uppercase tracking-wider text-xs">AI Insight</h4>
      </div>

      <div className="prose prose-sm text-text-primary mb-6 leading-relaxed">
        {content}
      </div>

      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-accent/20 rounded-lg text-sm font-semibold text-brand-accent hover:bg-brand-accent hover:text-white transition-all shadow-sm"
            >
              {link.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      )}

      {suggestions && (
        <div className="pt-6 border-t border-brand-accent/10">
          <div className="flex items-center gap-2 mb-3 text-text-muted">
            <Lightbulb className="h-4 w-4" />
            <span className="text-xs font-bold uppercase">Try asking:</span>
          </div>
          <div className="space-y-2">
            {suggestions.map((s, idx) => (
              <button 
                key={idx}
                className="flex items-center justify-between w-full p-2.5 text-left text-sm text-text-muted hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors group"
              >
                {s}
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
