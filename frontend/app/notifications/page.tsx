"use client";

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useUIStore } from '@/store';
import { Bell, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotificationsPage() {
  const { notifications, markAsRead } = useUIStore();

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-text-primary tracking-tight">System Alerts</h1>
            <p className="text-sm text-text-muted font-medium mt-1">Stay updated with community activity and official broadcasts.</p>
          </div>
          <Bell className="h-8 w-8 text-brand-primary/20" />
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-20 bg-bg-base rounded-[2.5rem] border-2 border-dashed border-border">
              <p className="text-text-disabled font-bold uppercase tracking-widest text-xs">No notifications yet</p>
            </div>
          ) : (
            notifications.map((n, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-6 rounded-[2rem] border transition-all flex items-start gap-4 group cursor-pointer ${
                  n.read ? 'bg-white border-border opacity-70' : 'bg-white border-brand-primary shadow-lg shadow-brand-primary/5'
                }`}
              >
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${n.read ? 'bg-text-disabled' : 'bg-brand-primary animate-pulse'}`} />
                <div className="flex-1 space-y-2">
                   <p className="text-[15px] font-bold text-text-primary leading-tight group-hover:text-brand-primary transition-colors">
                     {n.message}
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-muted">
                         <Clock className="h-3.5 w-3.5" />
                         {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {n.read && (
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-brand-success">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Read
                        </div>
                      )}
                   </div>
                </div>
                {/* Clicking a targeted notification leads to the specific post with a highlight trigger */}
                <Link 
                  href={n.targetId ? `/feed?highlight=${n.targetId}` : "/feed"}
                  className="p-3 bg-bg-base rounded-xl text-text-muted hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                >
                   <CheckCircle className="h-4 w-4" />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
