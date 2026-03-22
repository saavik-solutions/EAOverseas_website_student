"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Home, MapPin, Star, Heart, ChevronLeft, ChevronRight, Zap, Coffee, Dumbbell } from 'lucide-react';

interface Props {
  property: any;
}

const AMENITY_ICONS: Record<string, any> = {
  WiFi: Wifi,
  Gym: Dumbbell,
  Laundry: Zap,
  Kitchen: Coffee,
  'Bills Included': Home,
};

export const AccommodationCard: React.FC<Props> = ({ property }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="group bg-white border border-border rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all h-full flex flex-col"
    >
       {/* Image Carousel */}
       <div className="relative h-64 overflow-hidden">
          <AnimatePresence mode="wait">
             <motion.div 
               key={currentImage}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="relative h-full w-full"
             >
                <img 
                  src={property.images[currentImage]} 
                  alt={property.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
             </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 right-4 z-10">
             <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-brand-danger transition-all">
                <Heart className="h-5 w-5" />
             </button>
          </div>

          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
             {property.type}
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity">
             <button onClick={prevImage} className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all">
                <ChevronLeft className="h-4 w-4 text-white" />
             </button>
             <div className="flex gap-1.5">
                {property.images.map((_: any, i: number) => (
                  <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === currentImage ? 'bg-white w-4' : 'bg-white/40'}`} />
                ))}
             </div>
             <button onClick={nextImage} className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all">
                <ChevronRight className="h-4 w-4 text-white" />
             </button>
          </div>
       </div>

       {/* Property Info */}
       <div className="p-8 space-y-6 flex-1 flex flex-col">
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-text-primary tracking-tight truncate">{property.name}</h3>
                <div className="flex items-center gap-1.5">
                   <Star className="h-4 w-4 text-brand-accent fill-brand-accent" />
                   <span className="text-xs font-black">{property.rating}</span>
                </div>
             </div>
             <div className="flex items-center gap-2 text-text-muted">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-medium">{property.address}</span>
             </div>
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-border/50">
             <div className="p-2 bg-bg-base rounded-xl text-text-muted">
                <MapPin className="h-4 w-4" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                {property.distanceToUni} km from University
             </p>
          </div>

          <div className="flex items-center gap-3">
             {property.amenities.slice(0, 4).map((amenity: string) => {
               const Icon = AMENITY_ICONS[amenity] || Home;
               return (
                 <div key={amenity} className="p-2 bg-bg-base rounded-xl text-text-primary group/icon relative" title={amenity}>
                    <Icon className="h-4 w-4" />
                 </div>
               );
             })}
             {property.amenities.length > 4 && (
               <div className="text-[10px] font-black text-text-muted">+{property.amenities.length - 4}</div>
             )}
          </div>

          <div className="pt-6 mt-auto flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-2xl font-black text-text-primary">${property.price}<span className="text-xs text-text-muted font-bold">/mo</span></span>
                {property.billsIncluded && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-brand-success">Utilities included</span>
                )}
             </div>
             <Link 
               href={`/accommodation/${property.slug}`}
               className="px-6 py-3 bg-nav-bg text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary transition-all shadow-lg"
             >
                View Details
             </Link>
          </div>
       </div>
    </motion.div>
  );
};
