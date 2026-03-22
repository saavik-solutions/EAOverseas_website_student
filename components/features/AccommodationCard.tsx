"use client";

import React from 'react';
import Image from 'next/image';
import { Home, Bath, Bed, Wifi, MapPin } from 'lucide-react';

interface AccommodationCardProps {
  title: string;
  address: string;
  price: string;
  image: string;
  amenities: string[];
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({
  title,
  address,
  price,
  image,
  amenities
}) => {
  return (
    <div className="card-premium overflow-hidden">
      <div className="relative h-56 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-border/50">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-brand-primary">{price}</span>
              <span className="text-xs text-text-muted font-medium">/ month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-1 truncate">{title}</h3>
        <div className="flex items-center gap-1.5 text-text-muted mb-4">
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-xs truncate">{address}</span>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-text-muted">
              <Bed className="h-4 w-4" />
              <span className="text-xs">Single</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-muted">
              <Bath className="h-4 w-4" />
              <span className="text-xs">Shared</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-muted">
              <Wifi className="h-4 w-4" />
              <span className="text-xs">Incl.</span>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-[0.98]">
          View on Map
        </button>
      </div>
    </div>
  );
};
