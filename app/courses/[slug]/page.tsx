import React, { Suspense } from 'react';
import { Metadata } from 'next';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { CourseDetailHeader } from '@/components/features/courses/CourseDetailHeader';
import { UniversityListTable } from '@/components/features/courses/UniversityListTable';
import { AIInsightBanner } from '@/components/features/courses/AIInsightBanner';
import { ListFilter, Search } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = `Study ${name} Abroad — Universities, Fees & Requirements | EduPlatform`;
  const description = `Compare 400+ universities offering ${name}. View tuition fees, admission requirements, intake dates, and get AI-powered affordability insights.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://eduplatform.example.com/courses/${params.slug}`,
      siteName: 'EduPlatform',
    }
  };
}

export default function CourseDetailPage({ params }: Props) {
  const courseName = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const courseData = {
    name: courseName,
    level: 'Postgraduate (MA/MSc)',
    domain: 'Computer Science & AI',
    description: `A comprehensive program designed to equip students with advanced theoretical foundations and practical expertise in ${courseName}. This curriculum covers emerging technologies, research methodologies, and industry-standard tools utilized by global tech leaders.`
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseData.name,
    "description": courseData.description,
    "provider": {
      "@type": "Organization",
      "name": "EduPlatform",
      "sameAs": "https://eduplatform.com"
    },
    "educationalLevel": courseData.level,
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "priceCurrency": "GBP",
      "description": "Tuition fees vary by institution"
    }
  };

  return (
    <DashboardLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="space-y-12 pb-20">
        <CourseDetailHeader 
          name={courseData.name}
          level={courseData.level}
          description={courseData.description}
          domain={courseData.domain}
        />

        <AIInsightBanner courseName={courseData.name} />

        <div className="space-y-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-bg-base border border-border rounded-[2.5rem]">
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filter universities..." 
                  className="w-full h-12 pl-12 pr-4 bg-white border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
                />
              </div>
              <div className="flex items-center gap-4">
                 {['Country', 'Fee Range', 'Intake'].map(f => (
                   <button key={f} className="h-12 px-6 bg-white border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-text-primary hover:border-brand-primary transition-all flex items-center gap-2">
                     {f}
                     <ListFilter className="h-3 h-3 text-text-muted" />
                   </button>
                 ))}
                 <button className="h-12 px-8 bg-brand-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20">Apply Filters</button>
              </div>
           </div>

           <Suspense fallback={<div className="h-96 animate-pulse bg-bg-base rounded-[2.5rem]" />}>
             <UniversityListTable />
           </Suspense>
        </div>
      </div>
    </DashboardLayout>
  );
}
