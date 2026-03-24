"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, Info, AlertCircle, XCircle } from 'lucide-react';
import { useUIStore } from '@/store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationBell: React.FC = () => {
  const { notifications, markAsRead } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = notifications.filter(n => !n.read).length;
  // Sort notifications by most recent
  const sortedNotifications = [...notifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setIsOpen(false);
    
    if (notification.targetType === 'post' && notification.targetId) {
      router.push(`/feed/community/${notification.targetId}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-colors group ${isOpen ? 'bg-bg-base' : 'hover:bg-bg-base'}`}
      >
        <Bell className={`h-6 w-6 transition-colors ${isOpen ? 'text-brand-primary fill-brand-primary/10' : 'text-text-muted group-hover:text-brand-primary'}`} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-danger opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-danger text-[10px] font-bold text-white items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed sm:absolute top-20 sm:top-full left-4 right-4 sm:left-auto sm:right-0 sm:mt-3 w-auto sm:w-80 bg-white border border-border rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-bg-base/30">
              <h3 className="font-bold text-text-primary text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                  {unreadCount} New
                </span>
              )}
            </div>

            <div className="max-h-[420px] overflow-y-auto w-full custom-scrollbar">
              {sortedNotifications.length > 0 ? (
                <div className="flex flex-col">
                  {sortedNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex gap-3 p-4 border-b border-border/50 hover:bg-bg-base transition-colors cursor-pointer ${!notification.read ? 'bg-brand-primary/5' : ''}`}
                    >
                      <div className="mt-0.5 shrink-0">{getIcon(notification.type)}</div>
                      <div className="flex-1 w-full truncate">
                        <p className={`text-sm truncate ${!notification.read ? 'font-bold text-text-primary' : 'font-medium text-text-muted'}`}>
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-text-muted mt-1 font-bold uppercase tracking-widest">
                          {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center">
                   <Bell className="w-8 h-8 text-border mb-3" />
                   <p className="text-sm font-bold text-text-muted">You're all caught up!</p>
                   <p className="text-xs text-text-muted/60 mt-1">No new notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
