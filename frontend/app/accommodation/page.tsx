"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { AccommodationHero } from '@/components/features/accommodation/AccommodationHero';
import { AccommodationCard } from '@/components/features/accommodation/AccommodationCard';
import { AccommodationFilters } from '@/components/features/accommodation/AccommodationFilters';
import { AccommodationMap } from '@/components/features/accommodation/AccommodationMap';
import { ACCOMMODATIONS } from '@/lib/services/accommodation';
import { motion, AnimatePresence } from 'framer-motion';
import { ComingSoonGate } from '@/components/ui/ComingSoonGate';
import { Home } from 'lucide-react';

export default function AccommodationPage() {
  return (
    <DashboardLayout>
       <ComingSoonGate 
         featureName="Verified Accommodation" 
         description="Find secure, student-verified housing near your chosen university with dynamic pricing insights." 
         icon={Home} 
       />
    </DashboardLayout>
  );
}

function OldAccommodationPage() {
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <DashboardLayout>
       <div className="space-y-12 pb-20">
          <AccommodationHero view={view} onViewChange={setView} />

          <div className="flex flex-col lg:flex-row gap-12">
             {/* Sticky Filters */}
             <aside className="shrink-0">
                <AccommodationFilters />
             </aside>

             {/* Content Area */}
             <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                   {view === 'grid' ? (
                     <motion.div
                       key="grid"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="grid grid-cols-1 md:grid-cols-2 gap-8"
                     >
                        {ACCOMMODATIONS.map(prop => (
                          <AccommodationCard key={prop.id} property={prop} />
                        ))}
                        {/* Duplicate for demo density */}
                        {ACCOMMODATIONS.map(prop => (
                          <AccommodationCard key={`dup-${prop.id}`} property={prop} />
                        ))}
                     </motion.div>
                   ) : (
                     <motion.div
                        key="map"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                     >
                        <AccommodationMap />
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>
       </div>
    </DashboardLayout>
  );
}
