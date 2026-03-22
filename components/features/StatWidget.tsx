"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatWidgetProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend,
  color = "brand-primary" 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="card-premium p-6 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl bg-${color}/10`}>
          <Icon className={`h-6 w-6 text-${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-semibold ${trend.isUp ? 'text-brand-success' : 'text-brand-danger'}`}>
            <span>{trend.isUp ? '+' : '-'}{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-text-muted mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-text-primary tracking-tight">{value}</h4>
      </div>
    </motion.div>
  );
};
