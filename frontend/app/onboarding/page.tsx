"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, GraduationCap, Globe, DollarSign, 
  BookOpen, ArrowRight, ArrowLeft, Sparkles, 
  SkipForward, Loader2, CheckCircle, MapPin, 
  Search as SearchIcon, ChevronRight, Check, Brain 
} from 'lucide-react';
import { AIAnalyzingScreen } from '@/components/features/onboarding/AIAnalyzingScreen';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Link from 'next/link';

const STEPS = [
  { id: 1, title: "About You", icon: User },
  { id: 2, title: "Academics", icon: GraduationCap },
  { id: 3, title: "Study Goals", icon: Globe },
  { id: 4, title: "Budget & Tests", icon: DollarSign },
];

const POPULAR_COUNTRIES = [
  { name: 'USA', flag: '🇺🇸' }, { name: 'UK', flag: '🇬🇧' }, { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' }, { name: 'Germany', flag: '🇩🇪' }, { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Ireland', flag: '🇮🇪' }, { name: 'New Zealand', flag: '🇳🇿' }, { name: 'France', flag: '🇫🇷' },
  { name: 'Italy', flag: '🇮🇹' }, { name: 'Spain', flag: '🇪🇸' }, { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Sweden', flag: '🇸🇪' }, { name: 'Norway', flag: '🇳🇴' }, { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Japan', flag: '🇯🇵' }, { name: 'South Korea', flag: '🇰🇷' }, { name: 'Singapore', flag: '🇸🇬' }
];

const GROUPED_COURSES = {
  "Engineering & Tech": ["Computer Science", "Software Engineering", "Data Science", "AI & Machine Learning", "Cyber Security", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Aerospace Engineering"],
  "Business & Management": ["MBA", "International Business", "Marketing", "Finance", "Accounting", "Supply Chain", "HR Management"],
  "Health & Medicine": ["Medicine (MBBS)", "Nursing", "Pharmacy", "Public Health", "Psychology", "Biomedical Science"],
  "Arts & Design": ["Architecture", "Graphic Design", "Fine Arts", "Fashion Design", "Film & Media"],
  "Social Sciences": ["Economics", "International Relations", "Political Science", "Sociology", "Education"],
  "Other": ["Other"]
};

const COUNTRY_DATA = [
  { name: 'Afghanistan', code: '+93' }, { name: 'Albania', code: '+355' }, { name: 'Algeria', code: '+213' },
  { name: 'Andorra', code: '+376' }, { name: 'Angola', code: '+244' }, { name: 'Antigua and Barbuda', code: '+1-268' },
  { name: 'Argentina', code: '+54' }, { name: 'Armenia', code: '+374' }, { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' }, { name: 'Azerbaijan', code: '+994' }, { name: 'Bahamas', code: '+1-242' },
  { name: 'Bahrain', code: '+973' }, { name: 'Bangladesh', code: '+880' }, { name: 'Barbados', code: '+1-246' },
  { name: 'Belarus', code: '+375' }, { name: 'Belgium', code: '+32' }, { name: 'Belize', code: '+501' },
  { name: 'Benin', code: '+229' }, { name: 'Bhutan', code: '+975' }, { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia and Herzegovina', code: '+387' }, { name: 'Botswana', code: '+267' }, { name: 'Brazil', code: '+55' },
  { name: 'Brunei', code: '+673' }, { name: 'Bulgaria', code: '+359' }, { name: 'Burkina Faso', code: '+226' },
  { name: 'Burundi', code: '+257' }, { name: 'Cambodia', code: '+855' }, { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' }, { name: 'Cape Verde', code: '+238' }, { name: 'Central African Republic', code: '+236' },
  { name: 'Chad', code: '+235' }, { name: 'Chile', code: '+56' }, { name: 'China', code: '+86' },
  { name: 'Colombia', code: '+57' }, { name: 'Comoros', code: '+269' }, { name: 'Congo', code: '+242' },
  { name: 'Costa Rica', code: '+506' }, { name: 'Croatia', code: '+385' }, { name: 'Cuba', code: '+53' },
  { name: 'Cyprus', code: '+357' }, { name: 'Czech Republic', code: '+420' }, { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' }, { name: 'Dominica', code: '+1-767' }, { name: 'Dominican Republic', code: '+1-809' },
  { name: 'Ecuador', code: '+593' }, { name: 'Egypt', code: '+20' }, { name: 'El Salvador', code: '+503' },
  { name: 'Equatorial Guinea', code: '+240' }, { name: 'Eritrea', code: '+291' }, { name: 'Estonia', code: '+372' },
  { name: 'Ethiopia', code: '+251' }, { name: 'Fiji', code: '+679' }, { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' }, { name: 'Gabon', code: '+241' }, { name: 'Gambia', code: '+220' },
  { name: 'Georgia', code: '+995' }, { name: 'Germany', code: '+49' }, { name: 'Ghana', code: '+233' },
  { name: 'Greece', code: '+30' }, { name: 'Grenada', code: '+1-473' }, { name: 'Guatemala', code: '+502' },
  { name: 'Guinea', code: '+224' }, { name: 'Guinea-Bissau', code: '+245' }, { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' }, { name: 'Honduras', code: '+504' }, { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' }, { name: 'India', code: '+91' }, { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' }, { name: 'Iraq', code: '+964' }, { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' }, { name: 'Italy', code: '+39' }, { name: 'Jamaica', code: '+1-876' },
  { name: 'Japan', code: '+81' }, { name: 'Jordan', code: '+962' }, { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' }, { name: 'Kiribati', code: '+686' }, { name: 'Kuwait', code: '+965' },
  { name: 'Kyrgyzstan', code: '+996' }, { name: 'Laos', code: '+856' }, { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' }, { name: 'Lesotho', code: '+266' }, { name: 'Liberia', code: '+231' },
  { name: 'Libya', code: '+218' }, { name: 'Liechtenstein', code: '+423' }, { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' }, { name: 'Macedonia', code: '+389' }, { name: 'Madagascar', code: '+261' },
  { name: 'Malawi', code: '+265' }, { name: 'Malaysia', code: '+60' }, { name: 'Maldives', code: '+960' },
  { name: 'Mali', code: '+223' }, { name: 'Malta', code: '+356' }, { name: 'Marshall Islands', code: '+692' },
  { name: 'Mauritania', code: '+222' }, { name: 'Mauritius', code: '+230' }, { name: 'Mexico', code: '+52' },
  { name: 'Micronesia', code: '+691' }, { name: 'Moldova', code: '+373' }, { name: 'Monaco', code: '+377' },
  { name: 'Mongolia', code: '+976' }, { name: 'Montenegro', code: '+382' }, { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' }, { name: 'Myanmar', code: '+95' }, { name: 'Namibia', code: '+264' },
  { name: 'Nauru', code: '+674' }, { name: 'Nepal', code: '+977' }, { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' }, { name: 'Nicaragua', code: '+505' }, { name: 'Niger', code: '+227' },
  { name: 'Nigeria', code: '+234' }, { name: 'North Korea', code: '+850' }, { name: 'Norway', code: '+47' },
  { name: 'Oman', code: '+968' }, { name: 'Pakistan', code: '+92' }, { name: 'Palau', code: '+680' },
  { name: 'Panama', code: '+507' }, { name: 'Papua New Guinea', code: '+675' }, { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' }, { name: 'Philippines', code: '+63' }, { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' }, { name: 'Qatar', code: '+974' }, { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' }, { name: 'Rwanda', code: '+250' }, { name: 'Saint Kitts and Nevis', code: '+1-869' },
  { name: 'Saint Lucia', code: '+1-758' }, { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
  { name: 'Samoa', code: '+685' }, { name: 'San Marino', code: '+378' }, { name: 'Sao Tome and Principe', code: '+239' },
  { name: 'Saudi Arabia', code: '+966' }, { name: 'Senegal', code: '+221' }, { name: 'Serbia', code: '+381' },
  { name: 'Seychelles', code: '+248' }, { name: 'Sierra Leone', code: '+232' }, { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' }, { name: 'Slovenia', code: '+386' }, { name: 'Solomon Islands', code: '+677' },
  { name: 'Somalia', code: '+252' }, { name: 'South Africa', code: '+27' }, { name: 'South Korea', code: '+82' },
  { name: 'South Sudan', code: '+211' }, { name: 'Spain', code: '+34' }, { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' }, { name: 'Suriname', code: '+597' }, { name: 'Swaziland', code: '+268' },
  { name: 'Sweden', code: '+46' }, { name: 'Switzerland', code: '+41' }, { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' }, { name: 'Tajikistan', code: '+992' }, { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' }, { name: 'Timor-Leste', code: '+670' }, { name: 'Togo', code: '+228' },
  { name: 'Tonga', code: '+676' }, { name: 'Trinidad and Tobago', code: '+1-868' }, { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' }, { name: 'Turkmenistan', code: '+993' }, { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' }, { name: 'Ukraine', code: '+380' }, { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' }, { name: 'United States', code: '+1' }, { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' }, { name: 'Vanuatu', code: '+678' }, { name: 'Vatican City', code: '+379' },
  { name: 'Venezuela', code: '+58' }, { name: 'Vietnam', code: '+84' }, { name: 'Yemen', code: '+967' },
  { name: 'Zambia', code: '+260' }, { name: 'Zimbabwe', code: '+263' }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [form, setForm] = useState({
    fullName: '', nationality: '', dob: '', phone: '',
    education: [
      { id: Math.random().toString(36).substr(2, 9), level: 'Bachelors', degree: '', institution: '', score: '', year: '' }
    ],
    targetDegree: 'Masters', targetCourse: '', targetCountries: [] as string[],
    intakeYear: '2025', intakeSemester: 'Fall',
    budget: '', ieltsScore: '', toeflScore: '', greScore: '', gmatScore: '',
    workExperience: 'None',
    targetCourseOther: '',
    specialization: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: session, status: authStatus, update } = useSession();
  
  // Auto-detect if user is already logged in and onboarded
  useEffect(() => {
    if (authStatus === 'authenticated' && session?.user?.onboardingCompleted) {
      router.push('/dashboard');
    }
  }, [authStatus, session, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (authStatus !== 'authenticated') return;
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            const u = data.user;
            setForm(prev => ({
              ...prev,
              fullName: u.fullName || u.name || session?.user?.name || prev.fullName,
              nationality: u.nationality || prev.nationality,
              dob: u.dob ? new Date(u.dob).toISOString().split('T')[0] : prev.dob,
              phone: u.phone || prev.phone,
              education: (u.education && u.education.length > 0) ? u.education.map((e: any) => ({
                id: e._id || Math.random().toString(36).substr(2, 9),
                level: e.level || 'Bachelors',
                degree: e.degree || '',
                institution: e.institution || '',
                score: e.score || '',
                year: e.year || ''
              })) : prev.education,
              targetCountries: u.targetCountries || prev.targetCountries,
              targetDegree: u.targetDegree || prev.targetDegree,
              targetCourse: u.targetCourse || prev.targetCourse,
              specialization: u.specialization || prev.specialization,
              budget: u.budget || prev.budget,
              ieltsScore: u.ieltsScore || prev.ieltsScore,
              toeflScore: u.toeflScore || prev.toeflScore,
              greScore: u.greScore || prev.greScore,
              gmatScore: u.gmatScore || prev.gmatScore,
            }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch profile for pre-fill:', error);
      }
    };
    fetchProfile();
  }, [authStatus]);

  const set = (key: string, val: any) => {
    setForm(prev => {
      const newForm = { ...prev, [key]: val };
      if (key === 'nationality') {
        const country = COUNTRY_DATA.find(c => c.name === val);
        if (country) {
          if (!prev.phone || prev.phone.startsWith('+')) {
            newForm.phone = `${country.code} `;
          }
        }
      }
      return newForm;
    });
  };

  const toggleCountry = (c: string) => {
    setForm(prev => ({
      ...prev,
      targetCountries: prev.targetCountries.includes(c) 
        ? prev.targetCountries.filter(x => x !== c) 
        : [...prev.targetCountries, c]
    }));
  };

  const addEducation = (level?: string) => {
    setForm(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { 
          id: Math.random().toString(36).substr(2, 9), 
          level: level || 'Bachelors', 
          degree: '', 
          institution: '', 
          score: '', 
          year: '' 
        }
      ]
    }));
  };

  const removeEducation = (id: string) => {
    setForm(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const updateEducation = (id: string, field: string, val: string) => {
    setForm(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: val } : e)
    }));
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    try {
      // Step 1: Generate AI Analysis
      const auditRes = await fetch('/api/profile-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const auditData = auditRes.ok ? await auditRes.json() : null;
      if (auditData?.analysis) {
        localStorage.setItem('pai_analysis', JSON.stringify(auditData.analysis));
      }
      
      // Step 2: Persist Profile Data
      const response = await fetch('/api/user/onboarding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          onboardingCompleted: true,
          onboardingData: form,
          paiAnalysis: auditData?.analysis
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          localStorage.setItem('pai_profile', JSON.stringify(data.user));
          if (data.user.paiAnalysis) {
             localStorage.setItem('pai_analysis', JSON.stringify(data.user.paiAnalysis));
          }
        }
        // Force session update to reflect onboarding completion
        try {
          await update({ onboardingCompleted: true });
        } catch (e) {
          console.error("Session update error (passive):", e);
        }
      }
      // Redirect happens in onComplete callback of AIAnalyzingScreen
    } catch (error) {
       console.error('Error during analysis:', error);
       setIsAnalyzing(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-bg-base/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-semibold text-sm";
  const labelCls = "block text-xs font-black uppercase tracking-widest text-text-muted mb-2";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-bg-base pt-20 pb-12 px-4 relative">
        {isAnalyzing && <AIAnalyzingScreen onComplete={() => window.location.href = '/dashboard'} />}
        
        <div className="max-w-4xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Profile Audit Intelligence
            </div>
            <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight">Tell us about yourself</h1>
            <p className="text-text-muted font-medium mt-2">We'll generate a comprehensive PAI report powered by AI</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 px-4 max-w-2xl mx-auto">
            {STEPS.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${step >= s.id ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white border-2 border-border text-text-muted'}`}>
                    {step > s.id ? <CheckCircle className="h-6 w-6" /> : <s.icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest hidden sm:block ${step === s.id ? 'text-brand-primary' : 'text-text-muted'}`}>{s.title}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded transition-all ${step > s.id ? 'bg-brand-primary' : 'bg-border'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-[3rem] shadow-sm p-8 md:p-12 border border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Step 1: About You */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">Personal Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={labelCls}>Full Name</label>
                        <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Full Name" className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>Nationality</label>
                        <select value={form.nationality} onChange={e => set('nationality', e.target.value)} className={inputCls}>
                          <option value="">Select Nationality</option>
                          {COUNTRY_DATA.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>Date of Birth</label>
                        <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>Phone Number</label>
                        <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Academics */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-black text-text-primary tracking-tight">Academic Background</h2>
                      <button onClick={() => addEducation()} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:opacity-80 transition-all">
                        <Sparkles className="h-3.5 w-3.5" /> Add Degree
                      </button>
                    </div>
                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {form.education.map((edu, idx) => (
                        <div key={edu.id} className="p-6 bg-bg-base/30 rounded-3xl border border-border relative group">
                          {form.education.length > 1 && (
                            <button onClick={() => removeEducation(edu.id)} className="absolute top-6 right-6 p-2 text-text-muted hover:text-red-500 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                              <span className="text-[9px] font-black uppercase">Remove</span>
                            </button>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className={labelCls}>Level</label>
                              <select value={edu.level} onChange={e => updateEducation(edu.id, 'level', e.target.value)} className={inputCls}>
                                <option>10th Grade</option><option>12th Grade</option><option>Bachelors</option><option>Masters</option><option>PhD</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className={labelCls}>Degree / Major</label>
                              <input value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} placeholder="e.g. Computer Science" className={inputCls} />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                              <label className={labelCls}>Institution Name</label>
                              <input value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} placeholder="University or School" className={inputCls} />
                            </div>
                            <div className="space-y-2">
                              <label className={labelCls}>Score / GPA</label>
                              <input value={edu.score} onChange={e => updateEducation(edu.id, 'score', e.target.value)} placeholder="e.g. 8.5/10" className={inputCls} />
                            </div>
                            <div className="space-y-2">
                              <label className={labelCls}>Completion Year</label>
                              <input value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} placeholder="Year" className={inputCls} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Study Goals */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">Target Goals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={labelCls}>Target Degree</label>
                        <select value={form.targetDegree} onChange={e => set('targetDegree', e.target.value)} className={inputCls}>
                          <option>Masters</option><option>PhD</option><option>MBA</option><option>Bachelors</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>Target Course</label>
                        <select value={form.targetCourse} onChange={e => set('targetCourse', e.target.value)} className={inputCls}>
                          <option value="">Select a Course</option>
                          {Object.entries(GROUPED_COURSES).map(([group, courses]) => (
                            <optgroup key={group} label={group}>{courses.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className={labelCls}>Target Countries</label>
                      <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar snap-x">
                        {POPULAR_COUNTRIES.map(c => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => toggleCountry(c.name)}
                            className={`flex-shrink-0 snap-start px-5 py-3 rounded-2xl border-2 transition-all flex items-center gap-2 font-bold text-xs ${
                              form.targetCountries.includes(c.name) ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white border-border text-text-muted hover:border-brand-primary/30'
                            }`}
                          >
                            <span>{c.flag}</span>{c.name}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search more countries..." className={`${inputCls} pl-12`} />
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                         {COUNTRY_DATA.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => {
                           const isPop = POPULAR_COUNTRIES.find(p => p.name === c.name);
                           return (
                             <button key={c.name} onClick={() => toggleCountry(c.name)} className={`px-4 py-3 rounded-2xl border text-left flex items-center gap-2 font-bold text-[11px] transition-all ${
                               form.targetCountries.includes(c.name) ? 'bg-brand-primary/5 border-brand-primary text-brand-primary' : 'bg-white border-border text-text-muted'
                             }`}>
                               <span>{isPop?.flag || '🏳️'}</span><span className="truncate">{c.name}</span>
                             </button>
                           );
                         })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Budget & Tests */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">Budget & Scorecard</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2 space-y-2">
                        <label className={labelCls}>Annual Budget (USD)</label>
                        <input value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="e.g. 35000" className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>IELTS / TOEFL</label>
                        <input value={form.ieltsScore} onChange={e => set('ieltsScore', e.target.value)} placeholder="e.g. 7.5" className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>GRE / GMAT</label>
                        <input value={form.greScore} onChange={e => set('greScore', e.target.value)} placeholder="e.g. 320" className={inputCls} />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              <div className="flex gap-4">
                {step > 1 && (
                  <button onClick={() => setStep(s => s - 1)} className="px-6 py-3 rounded-xl bg-bg-base border border-border text-text-primary font-black text-[10px] uppercase tracking-widest hover:border-brand-primary transition-all flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                )}
                <button onClick={handleSkip} className="px-6 py-3 rounded-xl text-text-muted hover:text-brand-primary font-black text-[10px] uppercase tracking-widest transition-all">Skip</button>
              </div>

              {step < 4 ? (
                <button onClick={() => setStep(s => s + 1)} className="px-8 py-3 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="px-8 py-4 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Complete Audit & Analyze
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
