import React from 'react';
import { Metadata } from 'next';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ComingSoonGate } from '@/components/ui/ComingSoonGate';
import { Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Discover Universities Worldwide | EduPlatform',
  description: 'Explore over 1,500+ top-tier institutions across 45 countries with real-time match analysis and fee transparency.',
};

export default function DiscoveryPage() {
  return (
    <DashboardLayout>
       <ComingSoonGate 
         featureName="Global University Match" 
         description="Access AI-driven analytics on top-tier institutions worldwide, tailored to your academic profile and ambitions." 
         icon={Globe} 
       />
    </DashboardLayout>
  );
}
