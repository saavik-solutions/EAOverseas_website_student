"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProfileScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const ProfileScoreRing: React.FC<ProfileScoreRingProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  label = "Profile Match"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="var(--border-color)"
            strokeWidth={strokeWidth}
            className="opacity-20"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={score > 70 ? 'var(--brand-success)' : score > 40 ? 'var(--brand-warning)' : 'var(--brand-danger)'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black tracking-tighter ${
            score > 70 ? 'text-brand-success' : score > 40 ? 'text-brand-warning' : 'text-brand-danger'
          }`}>
            {score}<span className="text-sm font-bold text-text-muted">%</span>
          </span>
        </div>
      </div>
      {label && (
        <p className="mt-4 text-xs font-black uppercase tracking-widest text-text-muted">
          {label}
        </p>
      )}
    </div>
  );
};
