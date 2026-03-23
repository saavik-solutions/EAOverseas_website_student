"use client";

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationGovernancePage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const clearAll = async () => {
    if (!confirm('Operational Security: Permanently clear all institutional system alerts?')) return;
    try {
      await fetch('/api/admin/notifications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true })
      });
      fetchNotifications();
    } catch (err) {
      alert('Operation Failed.');
    }
  };

  const deleteOne = async (notificationId: string) => {
    try {
      await fetch('/api/admin/notifications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId })
      });
      fetchNotifications();
    } catch (err) {
      alert('Neutralization Failed.');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-rose-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default: return <Info className="h-4 w-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Institutional Module Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Notifications</h1>
            <p className="text-sm text-slate-500 mt-1">Audit, monitor, and clear institutional system-wide alert signals.</p>
         </div>
         <button 
           onClick={clearAll}
           className="px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-rose-100 transition-all"
         >
            <ShieldAlert className="h-4 w-4" />
            Clear All History
         </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 text-slate-300 animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-24 text-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-slate-200" />
             </div>
             <p className="text-sm font-semibold text-slate-400">Institutional alert history is currently empty.</p>
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((notif, idx) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white p-5 rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-slate-300 transition-all shadow-sm"
              >
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notif.type} Event</span>
                    <span className="text-[10px] font-bold text-slate-400">{new Date(notif.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">{notif.message}</p>
                </div>
                <button 
                  onClick={() => deleteOne(notif._id)}
                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
