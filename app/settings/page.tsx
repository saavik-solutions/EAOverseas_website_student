"use client";

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Bell, Shield, Globe, Monitor, Lock } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { title: 'Notifications', icon: Bell, description: 'Manage your email and push alert preferences.' },
    { title: 'Privacy & Security', icon: Shield, description: 'Control how your profile data is shared with institutions.' },
    { title: 'Language & Region', icon: Globe, description: 'Set your preferred currency and display language.' },
    { title: 'Appearance', icon: Monitor, description: 'Switch between light and dark modes (Enterprise Dark Default).' },
    { title: 'Account Access', icon: Lock, description: 'Manage your login methods and magic link settings.' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h2 className="text-3xl font-black text-text-primary tracking-tight">System Settings</h2>
          <p className="text-text-muted mt-1 font-medium">Configure your enterprise workspace and global preferences.</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="card-premium p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-brand-primary/20">
              <div className="w-16 h-16 rounded-2xl bg-bg-base border border-border flex items-center justify-center shrink-0 group-hover:bg-brand-primary/5 transition-colors">
                <section.icon className="h-8 w-8 text-text-muted group-hover:text-brand-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-text-primary">{section.title}</h3>
                <p className="text-sm text-text-muted">{section.description}</p>
              </div>
              <button className="px-5 py-2.5 bg-bg-base text-text-primary font-bold rounded-lg border border-border hover:bg-brand-primary hover:text-white transition-all">
                Configure
              </button>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-border/50 text-center">
          <p className="text-xs text-text-muted font-bold uppercase tracking-widest">EduPlatform Enterprise v1.0.4-stable</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
