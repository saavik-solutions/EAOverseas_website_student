"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, ZoomIn, ZoomOut, Compass } from 'lucide-react';

export const AccommodationMap: React.FC = () => {
  return (
    <div className="w-full h-[600px] bg-bg-base border border-border rounded-[3.5rem] relative overflow-hidden group shadow-inner">
       <div className="absolute inset-0 grayscale opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-0.1278,51.5074,13,0/1000x600?access_token=INSERT_MAPBOX_TOKEN_HERE')] bg-cover bg-center" />
       
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
             {/* Mock Map Markers for "London" context */}
             {[
               { x: '40%', y: '30%', label: 'Riverside Commons', price: '$1250' },
               { x: '60%', y: '50%', label: 'Standard House', price: '$850' },
               { x: '55%', y: '25%', label: 'University Campus', type: 'uni' }
             ].map((m, i) => (
               <motion.div 
                 key={i} 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: i * 0.2, type: 'spring' }}
                 className="absolute cursor-pointer group/pin"
                 style={{ left: m.x, top: m.y }}
               >
                  <div className="relative">
                    {m.type === 'uni' ? (
                       <div className="p-3 bg-brand-primary text-white rounded-full shadow-2xl animate-pulse">
                          <GraduationCap className="h-6 w-6" />
                       </div>
                    ) : (
                       <div className="px-3 py-1.5 bg-nav-bg text-white rounded-xl shadow-2xl flex items-center gap-2 group-hover/pin:bg-brand-accent transition-colors">
                          <MapPin className="h-3 w-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{m.price}</span>
                       </div>
                    )}
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                       <div className="px-3 py-1 bg-white border border-border rounded-lg text-[9px] font-black uppercase text-text-primary shadow-lg">
                          {m.label}
                       </div>
                    </div>
                  </div>
               </motion.div>
             ))}
          </div>
       </div>

       {/* Map Controls */}
       <div className="absolute bottom-10 right-10 flex flex-col gap-3">
          <button className="p-4 bg-white border border-border rounded-2xl shadow-xl hover:bg-bg-base transition-all"><ZoomIn className="h-5 w-5 text-text-primary" /></button>
          <button className="p-4 bg-white border border-border rounded-2xl shadow-xl hover:bg-bg-base transition-all"><ZoomOut className="h-5 w-5 text-text-primary" /></button>
          <button className="p-4 bg-white border border-border rounded-2xl shadow-xl hover:bg-bg-base transition-all"><Compass className="h-5 w-5 text-brand-primary" /></button>
       </div>

       <div className="absolute top-10 left-10 p-6 bg-white/80 backdrop-blur-md border border-border rounded-[2rem] shadow-2xl space-y-1">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Currently Viewing</h4>
          <p className="text-sm font-black text-text-primary">London, United Kingdom</p>
       </div>
    </div>
  );
};
