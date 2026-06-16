import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, BadgeCheck } from 'lucide-react';
import type { Salon } from '../../types';
import { useApp } from '../../context/AppContext';

const SalonCard: React.FC<{ salon: Salon }> = ({ salon }) => {
  const { isSalonSaved, toggleSaveSalon } = useApp();
  const saved = isSalonSaved(salon.id);

  return (
    <Link to={`/salon/${salon.slug}`} className="group block bg-white dark:bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <div className="relative h-48">
        <img src={salon.images[0]} alt={salon.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {salon.isVerified && <span className="flex items-center gap-1 px-2 py-1 bg-white/90 rounded-lg text-xs text-green-600"><BadgeCheck className="w-3 h-3" />Verified</span>}
          {salon.isFeatured && <span className="px-2 py-1 bg-primary-400 text-white rounded-lg text-xs">Featured</span>}
        </div>
        <button onClick={(e) => { e.preventDefault(); toggleSaveSalon(salon.id); }} className={`absolute top-3 right-3 p-2 rounded-lg ${saved ? 'bg-primary-500 text-white' : 'bg-white/90 text-gray-600'}`}>
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-primary-400">{salon.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-medium">{salon.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{salon.area}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Starting from</span>
            <p className="font-bold text-primary-400">&#8377;{salon.startingPrice}</p>
          </div>
          <span className="px-4 py-2 bg-primary-50 text-primary-400 rounded-lg text-sm group-hover:bg-primary-400 group-hover:text-white transition-colors">View</span>
        </div>
      </div>
    </Link>
  );
};

export default SalonCard;
