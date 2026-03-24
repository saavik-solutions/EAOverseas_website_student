"use client";

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ComingSoonGate } from '@/components/ui/ComingSoonGate';
import { Globe } from 'lucide-react';

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
