"use client";
import React, { useState } from 'react';
import { Target, Globe, GraduationCap, Calendar, Wallet, BookOpen, X, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface DetailedOnboardingProps {
    onComplete: () => void;
    onClose: () => void;
}

export default function DetailedOnboarding({ onComplete, onClose }: DetailedOnboardingProps) {
    const { update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        targetCountries: '',
        targetDegree: '',
        intakeYear: '2025',
        intakeSemester: 'Fall',
        budget: '',
        highestEducation: '',
        preferredCourse: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/user/complete-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    targetCountries: [formData.targetCountries]
                })
            });

            if (res.ok) {
                await update({ detailedFilled: true });
                onComplete();
            }
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl"
            >
                <div className="p-8 lg:p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Complete Your Profile</h2>
                            <p className="text-slate-500 font-medium mt-1">Help us tailor your global education journey.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select icon={GraduationCap} placeholder="Highest Education" value={formData.highestEducation} 
                                onChange={(val: string) => setFormData({...formData, highestEducation: val})}
                                options={['12th Grade', 'Bachelor\'s Degree', 'Master\'s Degree', 'Diploma']} required />

                            <Input icon={BookOpen} placeholder="Preferred Course" value={formData.preferredCourse} 
                                onChange={(val: string) => setFormData({...formData, preferredCourse: val})} required />

                            <Select icon={Globe} placeholder="Target Country" value={formData.targetCountries} 
                                onChange={(val: string) => setFormData({...formData, targetCountries: val})}
                                options={['UK', 'USA', 'Canada', 'Australia', 'Germany', 'Ireland']} required />

                            <Select icon={Target} placeholder="Target Degree" value={formData.targetDegree} 
                                onChange={(val: string) => setFormData({...formData, targetDegree: val})}
                                options={['Bachelor\'s', 'Master\'s', 'PhD', 'MBA']} required />

                            <Select icon={Calendar} placeholder="Intake Semester" value={formData.intakeSemester} 
                                onChange={(val: string) => setFormData({...formData, intakeSemester: val})}
                                options={['Fall', 'Spring', 'Summer']} required />

                            <Select icon={Wallet} placeholder="Budget Range" value={formData.budget} 
                                onChange={(val: string) => setFormData({...formData, budget: val})}
                                options={['Below 10L', '10L - 25L', '25L - 50L', 'Above 50L']} required />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-brand-primary hover:opacity-90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-primary/20"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Save Profile <ArrowRight className="w-5 h-5" /></>}
                            </button>
                            <button 
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-bg-base hover:bg-slate-200 text-text-muted font-bold py-4 rounded-xl transition-all"
                            >
                                Skip for now
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

const Input = ({ icon: Icon, value, onChange, ...props }: any) => (
    <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-primary transition-colors" />
        <input 
            {...props}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-medium text-sm shadow-sm"
        />
    </div>
);

const Select = ({ icon: Icon, value, onChange, options, placeholder }: any) => (
    <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-primary transition-colors pointer-events-none" />
        <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-medium text-sm shadow-sm appearance-none"
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);
