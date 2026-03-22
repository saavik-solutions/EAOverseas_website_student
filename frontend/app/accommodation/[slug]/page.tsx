"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ACCOMMODATIONS } from '@/lib/services/accommodation';
import { AccommodationCard } from '@/components/features/accommodation/AccommodationCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Heart, Share2, ShieldCheck, 
  Wifi, Home, Zap, Coffee, Dumbbell, 
  Users, Baby, Bed, Bath, FileText, Send, 
  CheckCircle2, Info, ChevronRight
} from 'lucide-react';

const AMENITY_ICONS: Record<string, any> = {
  WiFi: Wifi,
  Gym: Dumbbell,
  Laundry: Zap,
  Kitchen: Coffee,
  'Bills Included': Home,
};

export default function AccommodationDetailPage() {
  const { slug } = useParams();
  const property = ACCOMMODATIONS.find(a => a.slug === slug) || ACCOMMODATIONS[0];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <DashboardLayout>
       <div className="space-y-12 pb-24">
          {/* Header & Main Gallery */}
          <section className="space-y-8">
             <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="space-y-2">
                   <div className="flex items-center gap-3">
                      <h1 className="text-4xl font-black text-text-primary tracking-tight">{property.name}</h1>
                      <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                         {property.type}
                      </span>
                   </div>
                   <div className="flex items-center gap-6 text-text-muted">
                      <div className="flex items-center gap-1.5">
                         <MapPin className="h-4 w-4" />
                         <span className="text-sm font-medium">{property.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <Star className="h-4 w-4 text-brand-accent fill-brand-accent" />
                         <span className="text-sm font-black text-text-primary">{property.rating} <span className="text-text-muted">({property.reviews} reviews)</span></span>
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <button className="p-4 bg-white border border-border rounded-2xl shadow-sm hover:bg-bg-base transition-all"><Share2 className="h-5 w-5" /></button>
                   <button className="p-4 bg-white border border-border rounded-2xl shadow-sm hover:text-brand-danger transition-all"><Heart className="h-5 w-5" /></button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
                <div className="md:col-span-8 relative rounded-[3rem] overflow-hidden group">
                   <img src={property.images[activeImage]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" />
                   <div className="absolute inset-x-6 bottom-6 flex justify-center gap-2">
                      {property.images.map((_, i) => (
                        <button key={i} onClick={() => setActiveImage(i)} className={`h-1.5 transition-all rounded-full ${i === activeImage ? 'bg-white w-8' : 'bg-white/40 w-4 hover:bg-white/60'}`} />
                      ))}
                   </div>
                </div>
                <div className="md:col-span-4 grid grid-rows-2 gap-6">
                   {property.images.slice(0, 2).map((img, i) => (
                     <div key={i} className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer" onClick={() => setActiveImage(i)}>
                        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Details & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
             <div className="lg:col-span-2 space-y-16">
                <section className="space-y-10">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {[
                        { label: 'Bedrooms', val: '1 Private', icon: Bed },
                        { label: 'Bathrooms', val: '1 Ensuite', icon: Bath },
                        { label: 'Furnished', val: 'Yes', icon: Home },
                        { label: 'Occupancy', val: property.gender, icon: Users }
                      ].map((spec, i) => (
                        <div key={i} className="space-y-3">
                           <div className="w-12 h-12 rounded-2xl bg-bg-base flex items-center justify-center text-brand-primary">
                              <spec.icon className="h-6 w-6" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{spec.label}</p>
                              <p className="text-sm font-black text-text-primary">{spec.val}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="prose prose-sm max-w-none text-text-muted space-y-4">
                      <h2 className="text-2xl font-black text-text-primary tracking-tight m-0">About this property</h2>
                      <p className="text-lg font-medium leading-relaxed">
                         Experience premium student living at {property.name}. Strategically located just {property.distanceToUni}km from the main university campus, this {property.type.toLowerCase()} offers a perfect blend of privacy and community. The space has been curated for focused study and comfortable relaxation.
                      </p>
                   </div>
                </section>

                <section className="space-y-8">
                   <h2 className="text-2xl font-black text-text-primary tracking-tight">Top Amenities</h2>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {property.amenities.map(a => {
                        const Icon = AMENITY_ICONS[a] || Home;
                        return (
                          <div key={a} className="p-6 bg-white border border-border rounded-2xl flex items-center gap-4 group hover:border-brand-primary transition-all">
                             <div className="w-10 h-10 rounded-xl bg-bg-base flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                                <Icon className="h-5 w-5" />
                             </div>
                             <span className="text-xs font-bold text-text-primary">{a}</span>
                          </div>
                        );
                      })}
                   </div>
                </section>
             </div>

             {/* Enquiry Sidebar */}
             <aside className="space-y-8">
                <div className="sticky top-[100px] p-10 bg-nav-bg text-white rounded-[4rem] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                   
                   <div className="relative z-10 space-y-10">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Starting from</p>
                         <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black">${property.price}</span>
                            <span className="text-xs font-bold text-white/60">/month</span>
                         </div>
                         <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10 w-fit">
                            <ShieldCheck className="h-4 w-4 text-brand-success" />
                            <span className="text-[10px] font-black tracking-widest uppercase">Verified Property</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <button className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                            Check Availability
                            <ChevronRight className="h-4 w-4" />
                         </button>
                         <button className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                            <FileText className="h-4 w-4" />
                            Brochure (PDF)
                         </button>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-white/10">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Quick Enquiry</h4>
                         <div className="space-y-3">
                            <input type="text" placeholder="Your Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-brand-primary" />
                            <textarea placeholder="Tell us your move-in date..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-brand-primary h-24 resize-none" />
                            <button className="w-full py-4 bg-white text-nav-bg rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                               <Send className="h-3 w-3" />
                               Send Enquiry
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </aside>
          </div>

          {/* Similar Properties */}
          <section className="space-y-10 pt-20 border-t border-border">
             <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-text-primary tracking-tight">Similar Properties Nearby</h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">Explore More</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ACCOMMODATIONS.slice(0, 3).map(p => (
                   <AccommodationCard key={p.id} property={p} />
                ))}
             </div>
          </section>
       </div>
    </DashboardLayout>
  );
}
