"use client";

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ProfileScoreRing } from '@/components/features/ProfileScoreRing';
import { ComparisonReport } from '@/components/features/ComparisonReport';
import { AINextSteps } from '@/components/features/AINextSteps';
import { PAIWidget } from '@/components/features/PAIWidget';
import { GraduationCap, DollarSign, ArrowRight, MessageSquare, Calendar, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

import { ComingSoonGate } from '@/components/ui/ComingSoonGate';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
       <ComingSoonGate 
         featureName="Student Analytics Hub" 
         description="We are currently compiling global university algorithmic matching data to power your personalized admission probability engine."
         icon={LayoutDashboard}
       />
    </DashboardLayout>
  );
}
