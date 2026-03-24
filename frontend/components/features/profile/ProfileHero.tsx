import React from 'react';
import { Edit3, Share2, Download, MapPin, GraduationCap, CheckCircle2, User as UserIcon, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  user: any;
  onEdit?: () => void;
  isLoading?: boolean;
}

export const ProfileHero: React.FC<Props> = ({ user, onEdit, isLoading }) => {
  if (isLoading) {
    return <div className="w-full h-64 bg-gray-100 animate-pulse rounded-[3rem]" />;
  }

  const getGenderIcon = () => {
    const gender = user?.gender?.toLowerCase();
    if (gender === 'male') return <UserIcon className="w-full h-full text-blue-500" />;
    if (gender === 'female') return <UserIcon className="w-full h-full text-pink-500" />;
    return <UserIcon className="w-full h-full text-brand-primary" />;
  };

  const mainEdu = user?.education?.[0];

  const handleShare = () => {
    const url = `${window.location.origin}/profile/${user._id}`;
    navigator.clipboard.writeText(url);
    alert('Profile link copied to clipboard!');
  };

  return (
    <section className="relative w-full mb-12 pt-8">
       <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 bg-white border border-border rounded-[3rem] p-8 md:p-10 shadow-sm relative overflow-hidden group">
          {/* Decorative background element for "LinkdIn" feel */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] transition-transform group-hover:scale-110" />
          
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8 w-full md:w-auto text-center md:text-left relative z-10">
             {/* Identity Box */}
             <div className="relative group shrink-0">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1.5 bg-bg-base shadow-sm border border-border/50">
                   <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-50 flex items-center justify-center">
                      {user?.avatarUrl ? (
                        <img src={user.avatarUrl} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <div className="w-2/3 h-2/3 opacity-70">
                          {getGenderIcon()}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center cursor-pointer">
                         <Edit3 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all drop-shadow-md" />
                      </div>
                   </div>
                </div>
                {/* Verified Badge */}
                <div className="absolute bottom-1 right-1 bg-brand-success text-white px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                   <CheckCircle2 className="h-3.5 w-3.5" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                </div>
             </div>

             {/* Personal Info */}
             <div className="space-y-4 w-full md:w-auto">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-center md:justify-start">
                   <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
                     {user?.fullName} <span className="text-xl md:text-2xl font-bold text-text-muted">{user?.nationality}</span>
                   </h1>
                   <div className="inline-flex max-w-max mx-auto md:mx-0 px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-full items-center gap-2 group shadow-sm transition-all hover:bg-brand-primary">
                      <div className="w-2 h-2 rounded-full bg-brand-primary group-hover:bg-white animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary group-hover:text-white transition-colors">PAI Score: {user?.paiAnalysis?.overallScore || 0}%</span>
                   </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-text-secondary">
                   <div className="flex items-center gap-2 text-sm font-bold bg-bg-base px-4 py-2 rounded-xl">
                      <GraduationCap className="h-4 w-4 text-brand-primary" />
                      {mainEdu?.degree || 'Student'} @ <span className="text-text-primary">{mainEdu?.institution || 'Academic Path'}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm font-bold bg-bg-base px-4 py-2 rounded-xl">
                      <MapPin className="h-4 w-4 text-brand-accent" />
                      {user?.nationality || 'Global Citizen'}
                   </div>
                </div>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto mt-4 md:mt-0 relative z-10">
             <button 
               onClick={onEdit} 
               className="px-6 py-4 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-md active:scale-95 flex items-center gap-2"
             >
                <Edit3 className="h-4 w-4" />
                Edit Profile
             </button>
             <button onClick={handleShare} className="p-4 bg-bg-base border border-border rounded-xl text-text-secondary hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-sm"><Share2 className="h-4 w-4" /></button>
             <button className="p-4 bg-bg-base border border-border rounded-xl text-text-secondary hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-sm"><Download className="h-4 w-4" /></button>
          </div>
       </div>
    </section>
  );
};
