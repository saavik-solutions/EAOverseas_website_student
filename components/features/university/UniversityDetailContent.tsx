"use client";

import React, { useState } from 'react';
import { UniversityHero } from './UniversityHero';
import { StickyInfoBar } from './StickyInfoBar';
import { OverviewTab } from './OverviewTab';
import { CoursesTab } from './CoursesTab';
import { AdmissionsTab } from './AdmissionsTab';
import { VisaTab } from './VisaTab';
import { CareersTab } from './CareersTab';
import { ProfileComparisonModal } from './ProfileComparisonModal';

interface Props {
  university: {
    name: string;
    city: string;
    country: string;
    logo: string;
    bannerImage: string;
    countryFlag: string;
    stats: {
      globalRank: string;
      qsRank: string;
      acceptanceRate: string;
      founded: string;
    };
  };
}

export function UniversityDetailContent({ university }: Props) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Mocking user profile state
  const hasPAIProfile = true;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'courses': return <CoursesTab />;
      case 'admissions': return <AdmissionsTab />;
      case 'visa': return <VisaTab />;
      case 'careers': return <CareersTab />;
      case 'reviews': return <div className="py-20 text-center text-text-muted font-bold">University Reviews coming soon...</div>;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <UniversityHero 
        name={university.name}
        city={university.city}
        country={university.country}
        bannerImage={university.bannerImage}
        stats={university.stats}
      />
      
      <StickyInfoBar 
        name={university.name}
        logo={university.logo}
        countryFlag={university.countryFlag}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCompareClick={() => setIsCompareOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-12 py-16">
        {renderTabContent()}
      </main>

      <ProfileComparisonModal 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        universityName={university.name}
        hasProfile={hasPAIProfile}
      />
    </div>
  );
}
