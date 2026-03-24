"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles, Target, Globe, Phone, MapPin, GraduationCap, Calendar, Wallet, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Lead Info & Account, 2: OTP Verification
  const [formData, setFormData] = useState({ 
    fullName: '', email: '', password: '', 
    phone: '', targetCountries: '', targetDegree: '', 
    intakeYear: '2025', intakeSemester: 'Fall', budget: '', 
    highestEducation: '', preferredCourse: '' 
  });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email: formData.email.trim(), role: 'student' })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      setStep(2);
      setSuccess("Account initiated! Please check your email for the verification code.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.trim(), otp: otp.trim() })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");

      // Use redirect: true to ensure NextAuth handles cookie setting and navigation correctly
      await signIn('credentials', {
        email: formData.email.trim(),
        password: formData.password,
        callbackUrl: '/dashboard',
        redirect: true,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6 font-sans selection:bg-purple-500/30">
      
      <div className="w-full max-w-[1100px] bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-slate-200 min-h-[700px]">
        
        {/* Left Side: Major Purple Theme */}
        <div className="lg:w-5/12 bg-purple-900 p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div>
               <h1 className="text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                 Unlock your global potential.
               </h1>
               <p className="text-purple-200 font-medium leading-relaxed opacity-90">
                 Join thousands of ambitious students securing admissions to the world's top universities.
               </p>
            </div>

            <div className="space-y-8">
               <Feature icon={Sparkles} title="AI Profile Audits" desc="Extrapolate your real admission probabilities at elite institutions instantly." />
               <Feature icon={Globe} title="Secured Network" desc="Connect freely in our completely monitored, troll-free global ecosystem." />
               <Feature icon={Target} title="Precision Matching" desc="Discover scholarships and accommodations uniquely tailored to you." />
            </div>
          </div>
        </div>

        {/* Right Side: Form Elements */}
        <div className="lg:w-7/12 p-8 lg:p-12 flex items-center justify-center bg-white relative overflow-y-auto">
          <div className="w-full max-w-lg space-y-6">
            
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em]">Step 1: Your Profile</h2>
                    <h1 className="text-3xl font-black text-purple-900 tracking-tight">Set up your account</h1>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <Input icon={User} type="text" placeholder="Full Legal Name" value={formData.fullName} 
                        onChange={(val: string) => setFormData({...formData, fullName: val})} required />
                      
                      {/* Email */}
                      <Input icon={Mail} type="email" placeholder="Email Address" value={formData.email} 
                        onChange={(val: string) => setFormData({...formData, email: val})} required />

                      {/* Phone */}
                      <Input icon={Phone} type="tel" placeholder="Contact Number" value={formData.phone} 
                        onChange={(val: string) => setFormData({...formData, phone: val})} required />

                      {/* Password */}
                      <Input icon={Lock} type="password" placeholder="Secure Password" value={formData.password} 
                        onChange={(val: string) => setFormData({...formData, password: val})} required />

                      {/* Education Level */}
                      <Select icon={GraduationCap} placeholder="Highest Education" value={formData.highestEducation} 
                        onChange={(val: string) => setFormData({...formData, highestEducation: val})}
                        options={['12th Grade', 'Bachelor\'s Degree', 'Master\'s Degree', 'Diploma']} required />

                      {/* Preferred Course */}
                      <Input icon={BookOpen} type="text" placeholder="Preferred Course" value={formData.preferredCourse} 
                        onChange={(val: string) => setFormData({...formData, preferredCourse: val})} required />

                      {/* Target Country */}
                      <Select icon={MapPin} placeholder="Target Country" value={formData.targetCountries} 
                        onChange={(val: string) => setFormData({...formData, targetCountries: val})}
                        options={['UK', 'USA', 'Canada', 'Australia', 'Germany', 'Ireland']} required />

                      {/* Target Degree */}
                      <Select icon={Target} placeholder="Target Degree" value={formData.targetDegree} 
                        onChange={(val: string) => setFormData({...formData, targetDegree: val})}
                        options={['Bachelor\'s', 'Master\'s', 'PhD', 'MBA']} required />

                      {/* Intake Semester */}
                      <Select icon={Calendar} placeholder="Intake Semester" value={formData.intakeSemester} 
                        onChange={(val: string) => setFormData({...formData, intakeSemester: val})}
                        options={['Fall', 'Spring', 'Summer']} required />

                      {/* Budget */}
                      <Select icon={Wallet} placeholder="Budget Range" value={formData.budget} 
                        onChange={(val: string) => setFormData({...formData, budget: val})}
                        options={['Below 10L', '10L - 25L', '25L - 50L', 'Above 50L']} required />
                    </div>

                    {error && <ErrorMsg msg={error} />}

                    <button 
                      disabled={isLoading}
                      className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold group shadow-xl shadow-purple-600/20"
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Next: Verify Email <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em]">Step 2: Verification</h2>
                    <h1 className="text-3xl font-black text-purple-900 tracking-tight">Check your inbox</h1>
                    <p className="text-slate-500 font-medium">We've sent a 6-digit verification code to <span className="text-purple-600 font-bold">{formData.email}</span></p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="relative group">
                      <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500" />
                      <input 
                        type="text" required maxLength={6} value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="6-digit Verification Code"
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-3xl font-bold tracking-[0.5em] text-center focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all shadow-sm"
                      />
                    </div>

                    {error && <ErrorMsg msg={error} />}
                    {success && <p className="text-green-600 text-sm font-bold text-center bg-green-50 py-3 rounded-lg border border-green-100">{success}</p>}

                    <button 
                      disabled={isLoading}
                      className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold group shadow-xl shadow-purple-600/20"
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Complete Profile"}
                    </button>

                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-slate-500 hover:text-purple-600 transition-colors font-bold text-sm"
                    >
                      Back to details
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Already part of the network? {' '}
                <Link href="/auth/login" className="text-orange-600 hover:text-purple-600 transition-colors font-bold">
                  Identify yourself
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const Input = ({ icon: Icon, value, onChange, ...props }: any) => (
  <div className="relative group">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 group-focus-within:text-purple-600 transition-colors" />
    <input 
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-medium shadow-sm text-sm"
    />
  </div>
);

const Select = ({ icon: Icon, value, onChange, options, placeholder, ...props }: any) => (
  <div className="relative group">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 group-focus-within:text-purple-600 transition-colors pointer-events-none" />
    <select 
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-medium shadow-sm text-sm appearance-none"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const ErrorMsg = ({ msg }: { msg: string }) => (
  <p className="text-red-600 text-sm font-bold text-center bg-red-50 py-3 rounded-lg border border-red-100">
    {msg}
  </p>
);

const Feature = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5">
        <Icon className="w-6 h-6 text-orange-400" />
      </div>
    </div>
    <div>
      <h3 className="text-base font-bold text-white mb-1">{title}</h3>
      <p className="text-purple-200 text-sm leading-relaxed opacity-90">{desc}</p>
    </div>
  </div>
);
