"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Database, Lock, Globe, HardDriveDownload, Trash2, ChevronRight } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
       {/* Sidebar */}
       <div className="space-y-1">
          {[
            { label: 'Account', icon: User, active: true },
            { label: 'Security', icon: Lock },
            { label: 'Notifications', icon: Bell },
            { label: 'Privacy', icon: Shield },
            { label: 'Export Data', icon: Database }
          ].map((item, i) => (
            <button 
              key={i} 
              className={`w-full flex items-center justify-between p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${item.active ? 'bg-brand-primary text-white shadow-lg' : 'text-text-muted hover:bg-bg-base'}`}
            >
               <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.label}
               </div>
               <ChevronRight className="h-3 w-3 opacity-50" />
            </button>
          ))}
       </div>

       {/* Detailed Content */}
       <div className="md:col-span-3 space-y-10 bg-white border border-border rounded-[3rem] p-12">
          <section className="space-y-6">
             <div className="space-y-1">
                <h3 className="text-xl font-black text-text-primary tracking-tight">Account Preferences</h3>
                <p className="text-xs font-medium text-text-muted">Manage your primary account settings and connected identities.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Email Address</label>
                   <input type="text" readOnly value="john.doe@example.com" className="w-full p-4 bg-bg-base border border-border rounded-xl text-sm font-bold text-text-muted cursor-not-allowed" />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Password</label>
                   <button className="w-full p-4 bg-white border border-brand-primary text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all">Change Password</button>
                </div>
             </div>
          </section>

          <section className="space-y-6 pt-10 border-t border-border">
             <h3 className="text-xl font-black text-text-primary tracking-tight">Notification Channels</h3>
             <div className="space-y-3">
                {[
                  { label: 'Email Notifications', sub: 'Receive weekly PAI reports and match updates.', enabled: true },
                  { label: 'Push Notifications', sub: 'Instant alerts for admission changes.', enabled: false },
                  { label: 'Sms Alerts', sub: 'Direct mobile alerts for urgent visa updates.', enabled: false }
                ].map((n, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-bg-base/30 rounded-2xl">
                      <div className="space-y-1">
                         <p className="text-sm font-black text-text-primary">{n.label}</p>
                         <p className="text-[10px] font-medium text-text-muted">{n.sub}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${n.enabled ? 'bg-brand-success' : 'bg-border'}`}>
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${n.enabled ? 'left-7' : 'left-1'}`} />
                      </div>
                   </div>
                ))}
             </div>
          </section>

          <section className="pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="space-y-1">
                <h4 className="text-base font-black text-brand-danger tracking-tight">Critical Actions</h4>
                <p className="text-[10px] font-medium text-text-muted">These actions cannot be undone. Please proceed with caution.</p>
             </div>
             <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-4 bg-bg-base border border-border text-text-muted rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-brand-primary transition-all">
                   <HardDriveDownload className="h-4 w-4" />
                   Export All Data
                </button>
                <button className="flex items-center gap-2 px-6 py-4 bg-brand-danger/10 text-brand-danger border border-brand-danger/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-danger hover:text-white transition-all">
                   <Trash2 className="h-4 w-4" />
                   Delete Account
                </button>
             </div>
          </section>
       </div>
    </div>
  );
};
