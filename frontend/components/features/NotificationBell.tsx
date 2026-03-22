"use client";

import React from 'react';
import { Bell } from 'lucide-react';
import { useUIStore } from '@/store';
import Link from 'next/link';

export const NotificationBell: React.FC = () => {
  const { notifications } = useUIStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Link href="/notifications" className="relative p-2 rounded-full hover:bg-bg-base transition-colors group block">
      <Bell className="h-6 w-6 text-text-muted group-hover:text-brand-primary transition-colors" />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-danger opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-danger text-[10px] font-bold text-white items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </span>
      )}
    </Link>
  );
};
