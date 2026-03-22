"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { CourseHero } from '@/components/features/courses/CourseHero';
import { CourseFilterSidebar } from '@/components/features/courses/CourseFilterSidebar';
import { CourseCard, Course } from '@/components/features/courses/CourseCard';
import { ListFilter, LayoutGrid, List, BookOpen } from 'lucide-react';
import { ComingSoonGate } from '@/components/ui/ComingSoonGate';

const mockCourses: Course[] = [
  {
    id: 'c1',
    name: 'MSc Computer Science',
    slug: 'msc-computer-science',
    domain: 'Engineering',
    level: 'Masters',
    uniCount: 412,
    countries: ['USA', 'UK', 'Canada', 'Germany'],
    fees: '£18,000 – £45,000',
    ielts: '6.5',
    icon: '💻'
  },
  {
    id: 'c2',
    name: 'MBA (Global Business)',
    slug: 'mba-global-business',
    domain: 'Business',
    level: 'Masters',
    uniCount: 284,
    countries: ['USA', 'UK', 'Australia', 'UAE'],
    fees: '£35,000 – £72,000',
    ielts: '7.0',
    icon: '💼'
  },
  {
    id: 'c3',
    name: 'MBBS / Medicine',
    slug: 'mbbs-medicine',
    domain: 'Medical',
    level: 'Bachelors',
    uniCount: 156,
    countries: ['UK', 'Canada', 'Germany', 'Poland'],
    fees: '€12,000 – €42,000',
    ielts: '7.5',
    icon: '🩺'
  },
  {
    id: 'c4',
    name: 'LLM International Law',
    slug: 'llm-international-law',
    domain: 'Law',
    level: 'Masters',
    uniCount: 98,
    countries: ['UK', 'Germany', 'Netherlands'],
    fees: '£22,000 – £38,000',
    ielts: '7.0',
    icon: '⚖️'
  },
  {
    id: 'c5',
    name: 'MSc Data Science & AI',
    slug: 'msc-data-science-ai',
    domain: 'Engineering',
    level: 'Masters',
    uniCount: 215,
    countries: ['USA', 'Germany', 'Singapore'],
    fees: '£28,000 – £52,000',
    ielts: '6.5',
    icon: '🤖'
  },
  {
    id: 'c6',
    name: 'BFA Digital Arts',
    slug: 'bfa-digital-arts',
    domain: 'Arts',
    level: 'Bachelors',
    uniCount: 74,
    countries: ['USA', 'UK', 'France'],
    fees: '$32,000 – $58,000',
    ielts: '6.0',
    icon: '🎨'
  }
];

function CoursesContent() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="space-y-12 pb-20">
      <CourseHero />

      <div className="flex flex-col lg:flex-row gap-12">
        <CourseFilterSidebar />

        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-text-primary tracking-tight leading-tight">
              Found 842 <span className="text-text-muted font-bold text-sm">academic programs globally</span>
            </h2>
            <div className="flex items-center gap-4">
               <div className="flex p-1 bg-bg-base border border-border rounded-xl">
                  <button className="p-2 bg-white shadow-sm border border-border rounded-lg"><LayoutGrid className="h-4 w-4 text-brand-primary" /></button>
                  <button className="p-2 hover:bg-white transition-all rounded-lg"><List className="h-4 w-4 text-text-muted" /></button>
               </div>
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-xs font-black uppercase tracking-widest text-text-primary hover:border-brand-primary transition-all group">
                 <ListFilter className="h-4 w-4 text-text-muted group-hover:text-brand-primary" />
                 Sort: Popularity
               </button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card-premium h-[380px] animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
                {/* Visual grid fill */}
                {mockCourses.map((course) => (
                  <CourseCard key={`${course.id}-2`} course={course} />
                ))}
              </div>

              <div className="mt-16 flex flex-col items-center gap-4 p-8 bg-bg-base/30 rounded-3xl border border-dashed border-border">
                 <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Analyzing global syllabi & fees...</p>
                 <button className="px-10 py-4 bg-white border border-border rounded-2xl font-black text-[11px] uppercase tracking-widest hover:border-brand-primary transition-all">
                    Load More Programs
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function OldCoursesPage() {
  return (
    <DashboardLayout>
      <CoursesContent />
    </DashboardLayout>
  );
}

export default function CoursesPage() {
  return (
    <DashboardLayout>
       <ComingSoonGate 
         featureName="AI Syllabus Analyzer" 
         description="Filter thousands of global programs by cost, career outcomes, and direct AI syllabus mapping." 
         icon={BookOpen} 
       />
    </DashboardLayout>
  );
}
