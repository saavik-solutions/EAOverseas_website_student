"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, GraduationCap, Globe, DollarSign, 
  BookOpen, ArrowRight, ArrowLeft, Sparkles, 
  SkipForward, Loader2, CheckCircle
} from 'lucide-react';

const STEPS = [
  { id: 1, title: "About You", icon: User },
  { id: 2, title: "Academics", icon: GraduationCap },
  { id: 3, title: "Study Goals", icon: Globe },
  { id: 4, title: "Budget & Tests", icon: DollarSign },
];

const COUNTRIES = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands', 'New Zealand', 'Ireland'];
const COURSES = ['Computer Science', 'Business/MBA', 'Engineering', 'Medicine', 'Law', 'Arts & Design', 'Data Science', 'Other'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: '', nationality: '', dob: '', phone: '',
    undergraduateDegree: '', university: '', gpa: '', graduationYear: '',
    targetDegree: 'Masters', targetCourse: '', targetCountries: [] as string[],
    intakeYear: '2025', intakeSemester: 'Fall',
    budget: '', ieltsScore: '', toeflScore: '', greScore: '', gmatScore: '',
    workExperience: 'None',
  });

  const set = (key: string, val: any) => setForm(prev => ({ ...prev, [key]: val }));
  const toggleCountry = (c: string) => {
    setForm(prev => ({
      ...prev,
      targetCountries: prev.targetCountries.includes(c) 
        ? prev.targetCountries.filter(x => x !== c) 
        : [...prev.targetCountries, c]
    }));
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_skipped', 'true');
    router.push('/dashboard');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/profile-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('pai_analysis', JSON.stringify(data.analysis));
        localStorage.setItem('pai_profile', JSON.stringify(form));
        router.push('/dashboard?pai=complete');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-bg-base/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-semibold text-sm";
  const labelCls = "block text-xs font-black uppercase tracking-widest text-text-muted mb-2";

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="w-full max-w-2xl relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Profile Audit Intelligence
          </div>
          <h1 className="text-3xl font-black text-text-primary">Tell us about yourself</h1>
          <p className="text-text-muted font-medium mt-2">We'll generate a comprehensive PAI report powered by AI</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
          {STEPS.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step >= s.id ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white border-2 border-border text-text-muted'}`}>
                  {step > s.id ? <CheckCircle className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider hidden sm:block ${step === s.id ? 'text-brand-primary' : 'text-text-muted'}`}>{s.title}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded transition-all ${step > s.id ? 'bg-brand-primary' : 'bg-border'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Step 1: About You */}
              {step === 1 && (
                <>
                  <h2 className="text-xl font-black text-text-primary">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Your full name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Nationality</label>
                      <input value={form.nationality} onChange={e => set('nationality', e.target.value)} placeholder="e.g. Indian" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Date of Birth</label>
                      <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Academics */}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-black text-text-primary">Academic Background</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Undergraduate Degree</label>
                      <input value={form.undergraduateDegree} onChange={e => set('undergraduateDegree', e.target.value)} placeholder="e.g. B.Tech Computer Science" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>University</label>
                      <input value={form.university} onChange={e => set('university', e.target.value)} placeholder="Your college name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>GPA / CGPA (/10 or /4)</label>
                      <input value={form.gpa} onChange={e => set('gpa', e.target.value)} placeholder="e.g. 8.5" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Graduation Year</label>
                      <input value={form.graduationYear} onChange={e => set('graduationYear', e.target.value)} placeholder="e.g. 2024" className={inputCls} />
                    </div>
                    <div className="col-span-full">
                      <label className={labelCls}>Work Experience</label>
                      <select value={form.workExperience} onChange={e => set('workExperience', e.target.value)} className={inputCls}>
                        <option>None</option>
                        <option>Less than 1 year</option>
                        <option>1-2 years</option>
                        <option>2-5 years</option>
                        <option>5+ years</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Study Goals */}
              {step === 3 && (
                <>
                  <h2 className="text-xl font-black text-text-primary">Study Goals</h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Target Degree</label>
                        <select value={form.targetDegree} onChange={e => set('targetDegree', e.target.value)} className={inputCls}>
                          <option>Masters</option>
                          <option>PhD</option>
                          <option>MBA</option>
                          <option>Bachelors</option>
                          <option>Diploma</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Target Course/Field</label>
                        <select value={form.targetCourse} onChange={e => set('targetCourse', e.target.value)} className={inputCls}>
                          <option value="">Select a field</option>
                          {COURSES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Intake Year</label>
                        <select value={form.intakeYear} onChange={e => set('intakeYear', e.target.value)} className={inputCls}>
                          <option>2025</option><option>2026</option><option>2027</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Intake Semester</label>
                        <select value={form.intakeSemester} onChange={e => set('intakeSemester', e.target.value)} className={inputCls}>
                          <option>Fall</option><option>Spring</option><option>Summer</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Target Countries (select multiple)</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {COUNTRIES.map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleCountry(c)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${form.targetCountries.includes(c) ? 'bg-brand-primary text-white border-brand-primary shadow-md' : 'bg-white text-text-muted border-border hover:border-brand-primary'}`}
                          >{c}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Budget & Tests */}
              {step === 4 && (
                <>
                  <h2 className="text-xl font-black text-text-primary">Budget & Test Scores</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="col-span-full">
                      <label className={labelCls}>Annual Budget (USD)</label>
                      <input value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="e.g. 30000" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>IELTS Score</label>
                      <input value={form.ieltsScore} onChange={e => set('ieltsScore', e.target.value)} placeholder="e.g. 7.0" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>TOEFL Score</label>
                      <input value={form.toeflScore} onChange={e => set('toeflScore', e.target.value)} placeholder="e.g. 100" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>GRE Score</label>
                      <input value={form.greScore} onChange={e => set('greScore', e.target.value)} placeholder="e.g. 320" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>GMAT Score</label>
                      <input value={form.gmatScore} onChange={e => set('gmatScore', e.target.value)} placeholder="e.g. 680" className={inputCls} />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <div className="flex gap-3">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="px-5 py-2.5 rounded-xl border border-border text-text-primary font-bold hover:bg-bg-base transition flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              <button onClick={handleSkip} className="px-5 py-2.5 rounded-xl text-text-muted hover:text-text-primary font-bold flex items-center gap-1.5 transition text-sm">
                <SkipForward className="h-4 w-4" /> Skip
              </button>
            </div>

            {step < STEPS.length ? (
              <button onClick={() => setStep(s => s + 1)} className="btn-primary px-7 py-3 rounded-xl flex items-center gap-2 font-bold">
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary px-7 py-3 rounded-xl flex items-center gap-2 font-bold disabled:opacity-70"
              >
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</> : <><Sparkles className="h-4 w-4" /> Generate My PAI Report</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
