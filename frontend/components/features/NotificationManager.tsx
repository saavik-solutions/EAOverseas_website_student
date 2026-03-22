"use client";

import React, { useEffect, useRef } from 'react';
import { useUIStore } from '@/store';

export const NotificationManager: React.FC = () => {
  const { addNotification, notifications } = useUIStore();
  const lastFetchedRef = useRef<Date>(new Date());
  const initialLoadRef = useRef(true);

  const requestPermission = async () => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        await Notification.requestPermission();
      }
    }
  };

  const fetchNewNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) return;
      
      const data = await res.json();
      const serverNotifications = data.notifications || [];

      // Find notifications that aren't in our local store yet
      serverNotifications.forEach((n: any) => {
        const alreadyExists = notifications.some(local => local.id === n._id || local.id === n.id);
        
        if (!alreadyExists) {
          // Add to Zustand store
          const formattedNotification = {
            id: n._id || n.id,
            type: n.type || 'info',
            message: n.message,
            targetId: n.targetId,
            targetType: n.targetType,
            timestamp: n.createdAt || new Date().toISOString(),
            read: n.read || false
          };
          
          addNotification(formattedNotification);

          // Trigger Browser Notification (if not the very first load to prevent spamming)
          if (!initialLoadRef.current && Notification.permission === "granted") {
            new Notification("EAOverseas Update", {
              body: n.message,
              icon: '/icons/notification-icon.png' // Or generic icon
            });
          }
        }
      });

      initialLoadRef.current = false;
    } catch (err) {
      console.error("Failed to sync notifications:", err);
    }
  };

  useEffect(() => {
    requestPermission();
    fetchNewNotifications(); // Initial fetch

    // Poll every 30 seconds for new activity
    const interval = setInterval(fetchNewNotifications, 30000);
    return () => clearInterval(interval);
  }, []); // Only once on mount

  return null; // Side-effect only component
};
