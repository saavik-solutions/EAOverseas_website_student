"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Target, 
  DollarSign, 
  FileText,
  BadgeCheck,
  Zap,
  User as UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/admin/students/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setStudent(data.student);
        } else {
          router.push('/admin/students');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fetching Registry Data...</p>
      </div>
    );
  }

  if (!student) return null;

  // Helper to get value with fallback to onboardingData
  const getVal = (field: string, fallback: string = '') => {
    return student[field] || student.onboardingData?.[field] || fallback;
  };

  // Helper for arrays
  const getArr = (field: string) => {
    const val = student[field] || student.onboardingData?.[field];
    return Array.isArray(val) ? val : [];
  };

  const education = getArr('education');
  const experience = getArr('experience').length > 0 ? getArr('experience') : getArr('workExperience'); // Handle both names
  const targetCountries = getArr('targetCountries');
  const targetCourses = getArr('targetCourses');
  const targetCourseRaw = getVal('targetCourse');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/students"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary font-bold text-xs uppercase tracking-widest transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Link>
        <div className="flex items-center gap-3">
           <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">
             Verified Profile
           </span>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="card-premium p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200">
        <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 flex items-center justify-center text-4xl font-black text-white shadow-xl">
           {student.fullName?.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
           <div>
             <h1 className="text-4xl font-black text-slate-900 tracking-tight">{student.fullName}</h1>
             <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
               <Mail className="h-4 w-4" /> {student.email}
             </p>
           </div>
           <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                 <Phone className="h-4 w-4 text-slate-400" />
                 <span className="text-sm font-bold text-slate-700">{getVal('phone', 'No phone provided')}</span>
              </div>
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                 <Globe className="h-4 w-4 text-slate-400" />
                 <span className="text-sm font-bold text-slate-700">{getVal('nationality', 'Nationality unknown')}</span>
              </div>
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                 <Calendar className="h-4 w-4 text-slate-400" />
                 <span className="text-sm font-bold text-slate-700">
                   DOB: {getVal('dob') ? new Date(getVal('dob')).toLocaleDateString() : 'Hidden'}
                 </span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Academic & Experience */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Academic History */}
           <section className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                 <GraduationCap className="h-5 w-5 text-brand-primary" />
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Academic History</h2>
              </div>
              <div className="space-y-4">
                 {education && education.length > 0 ? (
                   education.map((edu: any, idx: number) => (
                     <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-xs font-black text-brand-primary uppercase tracking-widest mb-1">{edu.level}</p>
                              <h3 className="text-lg font-bold text-slate-900 leading-tight">{edu.degree}</h3>
                           </div>
                           <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">{edu.year}</span>
                        </div>
                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                           <p className="text-sm font-medium text-slate-600">{edu.institution}</p>
                           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/5 rounded-lg border border-brand-primary/10">
                              <Zap className="h-3.5 w-3.5 text-brand-primary" />
                              <span className="text-xs font-black text-brand-primary uppercase tracking-widest">{edu.score}</span>
                           </div>
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium">
                     No academic records found in student profile.
                   </div>
                 )}
              </div>
           </section>

           {/* Work Experience */}
           <section className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                 <Briefcase className="h-5 w-5 text-brand-primary" />
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Employment & Internship</h2>
              </div>
              <div className="space-y-4">
                 {experience && experience.length > 0 && typeof experience !== 'string' ? (
                   experience.map((exp: any, idx: number) => {
                     if (typeof exp === 'string') return null;
                     return (
                       <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4">
                          <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">{exp.role}</h3>
                                <p className="text-sm font-medium text-brand-primary mt-1">{exp.company}</p>
                             </div>
                             <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">{exp.duration}</span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
                       </div>
                     );
                   })
                 ) : (
                   <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium">
                     Student reported no professional experience.
                   </div>
                 )}
              </div>
           </section>
        </div>

        {/* Right Column: Goals & Analysis */}
        <div className="space-y-8">
           
           {/* Study Ambitions */}
           <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-xl">
              <div className="flex items-center gap-2">
                 <Target className="h-5 w-5 text-brand-accent" />
                 <h2 className="text-lg font-black uppercase tracking-tight">Study Goals</h2>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Program Selection</p>
                    <div className="space-y-2">
                       <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                          <p className="text-[10px] text-white/50 uppercase font-bold">Target Degree</p>
                          <p className="text-sm font-black">{getVal('targetDegree', 'Not Specified')}</p>
                       </div>
                       <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                          <p className="text-[10px] text-white/50 uppercase font-bold">Primary Course</p>
                          <p className="text-sm font-black">{targetCourses?.[0] || targetCourseRaw || 'Unselected'}</p>
                       </div>
                    </div>
                 </div>

                 <div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Target Geographies</p>
                    <div className="flex flex-wrap gap-2">
                       {targetCountries && targetCountries.length > 0 ? (
                         targetCountries.map((c: string) => (
                           <span key={c} className="px-3 py-1.5 bg-brand-primary/20 rounded-lg text-[10px] font-black uppercase tracking-widest border border-brand-primary/30">
                              {c}
                           </span>
                         ))
                       ) : (
                         <span className="text-xs text-white/40 font-medium">No countries selected.</span>
                       )}
                    </div>
                 </div>

                 <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                       <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-brand-accent" />
                          <p className="text-xs font-bold uppercase tracking-widest">Intake</p>
                       </div>
                       <p className="text-sm font-black text-brand-accent">{getVal('intakeSemester', 'Fall')} {getVal('intakeYear', '2025')}</p>
                    </div>
                 </div>
              </div>
           </section>

           {/* Financials & Scores */}
           <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-2">
                 <BadgeCheck className="h-5 w-5 text-brand-primary" />
                 <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Metrics</h2>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2">
                       <DollarSign className="h-4 w-4 text-slate-400" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Budget</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">${getVal('budget', '0')}</span>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">IELTS/TOEFL</span>
                       <span className="text-sm font-black text-slate-900">{getVal('ieltsScore', 'N/A')}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">GRE/GMAT</span>
                       <span className="text-sm font-black text-slate-900">{getVal('greScore', 'N/A')}</span>
                    </div>
                 </div>

                 <div className="pt-4">
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                       <FileText className="h-4 w-4 text-brand-accent" /> Verify Documents
                    </button>
                 </div>
              </div>
           </section>

        </div>
      </div>
    </div>
  );
}
