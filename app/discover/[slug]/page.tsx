import React, { Suspense } from 'react';
import { Metadata } from 'next';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { UniversityDetailContent } from '@/components/features/university/UniversityDetailContent';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = `${name} — Courses, Fees, Admissions | EduPlatform`;
  const description = `Explore ${name} - View available courses, admission requirements, student visa process, and career outcomes for international students.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://eduplatform.example.com/discover/${params.slug}`,
      siteName: 'EduPlatform',
    }
  };
}

export default function UniversityPage({ params }: Props) {
  // In a real app, fetch from MongoDB or Supabase here
  const university = {
    name: params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    city: 'Cambridge',
    country: 'United Kingdom',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/University_of_Cambridge_coat_of_arms.svg',
    bannerImage: 'https://images.unsplash.com/photo-1590496794008-383c8070bb25?auto=format&fit=crop&q=80&w=1200',
    countryFlag: '🇬🇧',
    stats: {
      globalRank: '2',
      qsRank: '4',
      acceptanceRate: '21%',
      founded: '1209'
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": university.name,
    "url": `https://eduplatform.com/discover/${params.slug}`,
    "logo": university.logo,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": university.city,
      "addressCountry": university.country
    }
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Dashboard", "item": "https://eduplatform.com/dashboard" },
      { "@type": "ListItem", "position": 2, "name": "Discover", "item": "https://eduplatform.com/discover" },
      { "@type": "ListItem", "position": 3, "name": university.name, "item": `https://eduplatform.com/discover/${params.slug}` }
    ]
  };

  return (
    <DashboardLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      
      <Suspense fallback={<div className="h-screen animate-pulse bg-bg-base" />}>
        <UniversityDetailContent university={university} />
      </Suspense>
    </DashboardLayout>
  );
}
