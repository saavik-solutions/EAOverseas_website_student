"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid secure credentials.");
      } else {
        router.refresh();
        router.push('/feed');
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6 font-sans selection:bg-brand-primary/30">
      
      {/* Centered Unified Card Layout (Flipped for Login) */}
      <div className="w-full max-w-[1000px] bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-slate-200">
        
        {/* Left Side: White Elements */}
        <div className="lg:w-7/12 p-10 lg:p-16 flex items-center justify-center bg-white relative order-2 lg:order-1">
          <div className="w-full max-w-sm space-y-8">
            
            <div className="space-y-2">
              <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em]">Access Hub</h2>
              <h1 className="text-3xl font-black text-nav-bg tracking-tight">Welcome back inside</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                {/* BG White for Elements */}
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 group-focus-within:text-brand-primary transition-colors" />
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Registered Email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-medium shadow-sm"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 group-focus-within:text-brand-primary transition-colors" />
                  <input 
                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Access Key (Password)"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-3 rounded-lg border border-red-100 animate-shake">
                  {error}
                </p>
              )}

              {/* Major Theme Purple Button */}
              <button 
                disabled={isLoading}
                className="w-full bg-brand-primary hover:opacity-90 transition-all py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold group shadow-xl shadow-brand-primary/20"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Decrypt & Connect
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </form>


            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Not inside the network yet? {' '}
                <Link href="/auth/signup" className="text-orange-600 hover:text-brand-primary transition-colors font-bold">
                  Request access
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Major Purple Theme */}
        <div className="lg:w-5/12 bg-nav-bg p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden order-1 lg:order-2">
          {/* Decorative ambient shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div>
               <h1 className="text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                 Resume your journey.
               </h1>
               <p className="text-white/60 font-medium leading-relaxed">
                 There are thousands of new discussions, algorithm updates, and catalogues waiting for you.
               </p>
            </div>

            <div className="space-y-8">
               <Feature icon={Building2} title="Accommodation Hub" desc="Discover 3,500+ student housing options newly added near global campuses." />
               <Feature icon={GraduationCap} title="University Compare" desc="Run real-time tuition, living expense, and post-grad salary comparisons." />
               <Feature icon={BookOpen} title="IELTS & GRE Tactics" desc="Access new crowd-sourced study materials and verified practice exams." />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const Feature = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5">
        {/* Orange for accents */}
        <Icon className="w-6 h-6 text-orange-400" />
      </div>
    </div>
    <div>
      <h3 className="text-base font-bold text-white mb-1">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
)
