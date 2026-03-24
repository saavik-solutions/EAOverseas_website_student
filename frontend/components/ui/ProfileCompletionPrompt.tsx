"use client";
import React, { useState } from 'react';
import { Sparkles, UserCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';
import DetailedOnboarding from '../features/onboarding/DetailedOnboarding';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileCompletionPrompt() {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);

    // Only show for students who haven't filled details
    const user = session?.user as any;
    if (!user || user.role !== 'student' || user.detailedFilled) {
        return null;
    }

    return (
        <>
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
            >
                <div className="bg-nav-bg border border-white/10 rounded-2xl p-5 shadow-2xl shadow-purple-900/40 backdrop-blur-xl">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-sm">Profile Incomplete</h4>
                            <p className="text-white/60 text-xs mt-1 leading-relaxed">
                                Complete your profile to unlock premium AI audits and matching.
                            </p>
                            <button 
                                onClick={() => setShowModal(true)}
                                className="mt-4 w-full bg-white text-nav-bg hover:bg-orange-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-2"
                            >
                                <UserCheck className="w-3.5 h-3.5" />
                                Complete Profile
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {showModal && (
                    <DetailedOnboarding 
                        onComplete={() => setShowModal(false)}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
