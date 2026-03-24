"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles, Target, Globe } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'student' })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      // Auto login after successful signup
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/onboarding');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6 font-sans selection:bg-purple-500/30">
      
      {/* Centered Unified Card Layout */}
      <div className="w-full max-w-[1000px] bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-slate-200">
        
        {/* Left Side: Major Purple Theme */}
        <div className="lg:w-5/12 bg-purple-900 p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
          {/* Subtle Orange Accent Glow */}
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
               {/* Orange for normal / accents */}
               <Feature icon={Sparkles} title="AI Profile Audits" desc="Extrapolate your real admission probabilities at elite institutions instantly." />
               <Feature icon={Globe} title="Secured Network" desc="Connect freely in our completely monitored, troll-free global ecosystem." />
               <Feature icon={Target} title="Precision Matching" desc="Discover scholarships and accommodations uniquely tailored to you." />
            </div>
          </div>
        </div>

        {/* Right Side: White Elements */}
        <div className="lg:w-7/12 p-10 lg:p-16 flex items-center justify-center bg-white relative">
          <div className="w-full max-w-sm space-y-8">
            
            <div className="space-y-2">
              <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em]">Apply Now</h2>
              <h1 className="text-3xl font-black text-purple-900 tracking-tight">Create your account</h1>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-4">
                {/* BG White for Elements */}
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 group-focus-within:text-purple-600 transition-colors" />
                  <input 
                    type="text" required value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Full Legal Name"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-medium shadow-sm"
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 group-focus-within:text-purple-600 transition-colors" />
                  <input 
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Academic or Personal Email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-medium shadow-sm"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 group-focus-within:text-purple-600 transition-colors" />
                  <input 
                    type="password" required value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Secure Password"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-sm font-bold text-center bg-red-50 py-3 rounded-lg border border-red-100 animate-shake">
                  {error}
                </p>
              )}

              {/* Major Theme Purple Button */}
              <button 
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold group shadow-xl shadow-purple-600/20"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Initialize Profile
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </form>


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
      <p className="text-purple-200 text-sm leading-relaxed opacity-90">{desc}</p>
    </div>
  </div>
)
