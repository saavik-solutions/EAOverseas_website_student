"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Rocket } from 'lucide-react';

import { AcademicStep } from './WizardSteps/AcademicStep';
import { TestScoreStep } from './WizardSteps/TestScoreStep';
import { ExperienceStep } from './WizardSteps/ExperienceStep';
import { SkillsStep } from './WizardSteps/SkillsStep';
import { FinancialStep } from './WizardSteps/FinancialStep';
import { UploadStep } from './WizardSteps/UploadStep';

interface Props {
  onComplete: (data: any) => void;
}

const STEPS = [
  { id: 1, title: 'Academic', description: 'Degree & Grades', component: AcademicStep },
  { id: 2, title: 'Tests', description: 'IELTS/GRE/SAT', component: TestScoreStep },
  { id: 3, title: 'Experience', description: 'Work & Internships', component: ExperienceStep },
  { id: 4, title: 'Skills', description: 'Strengths & Projects', component: SkillsStep },
  { id: 5, title: 'Financial', description: 'Budget & Funding', component: FinancialStep },
  { id: 6, title: 'Analysis', description: 'Finalize & Audit', component: UploadStep }
];

export const PAIOnboarding: React.FC<Props> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const next = () => setCurrentStep(s => Math.min(s + 1, 6));
  const prev = () => setCurrentStep(s => Math.max(s - 1, 1));

  const ActiveComponent = STEPS[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
           {STEPS.map((step) => (
             <div key={step.id} className="flex flex-col items-center gap-2 group relative">
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.id 
                      ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                      : 'bg-white border-border text-text-muted hover:border-brand-primary/50'
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : <span className="text-xs font-black">{step.id}</span>}
                </div>
                <div className={`text-[9px] font-black uppercase tracking-widest absolute -bottom-6 whitespace-nowrap transition-colors ${
                  currentStep === step.id ? 'text-brand-primary' : 'text-text-muted/60'
                }`}>
                  {step.title}
                </div>
             </div>
           ))}
        </div>
        <div className="h-1.5 bg-bg-base rounded-full overflow-hidden mt-8">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${((currentStep - 1) / 5) * 100}%` }}
             className="h-full bg-brand-primary transition-all duration-500"
           />
        </div>
      </div>

      <div className="bg-white border border-border rounded-[3rem] shadow-xl overflow-hidden min-h-[600px] flex flex-col">
         <div className="flex-1 p-12 overflow-y-auto">
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentStep}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
                 className="space-y-10"
               >
                  {/* Step Content Shell */}
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-text-primary tracking-tight">{STEPS[currentStep-1].title} Details</h2>
                    <p className="text-text-muted font-medium italic">Step {currentStep} of 6 — {STEPS[currentStep-1].description}</p>
                  </div>
                  
                  <div className="space-y-6">
                     <ActiveComponent />
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>

         {/* Navigation */}
         <div className="p-8 bg-bg-base/30 border-t border-border flex items-center justify-between">
            <button 
              onClick={prev}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-text-muted hover:bg-white hover:text-brand-primary'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Prevous Step
            </button>
            <button 
              onClick={currentStep === 6 ? () => onComplete(formData) : next}
              className="flex items-center gap-2 px-10 py-4 bg-nav-bg text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-primary/10 active:scale-95 group"
            >
              {currentStep === 6 ? 'Start PAI Audit' : 'Save & Continue'}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
         </div>
      </div>
    </div>
  );
};
