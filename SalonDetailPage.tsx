import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, Heart, BadgeCheck, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { getSalonBySlug, getReviewsBySalonId } from '../data/salons';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';

const SalonDetailPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isSalonSaved, toggleSaveSalon } = useApp();
  const [imgIdx, setImgIdx] = useState(0);

  const salon = getSalonBySlug(slug || '');
  const reviews = salon ? getReviewsBySalonId() : [];

  if (!salon) return <div className="min-h-screen flex items-center justify-center"><p>Salon not found</p></div>;

  const saved = isSalonSaved(salon.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Gallery */}
      <div className="relative h-64 sm:h-96 bg-gray-200">
        <img src={salon.images[imgIdx]} alt={salon.name} className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 px-4 py-2 bg-white/80 rounded-xl text-sm font-medium hover:bg-white">Back</button>
        <button onClick={() => setImgIdx(p => (p - 1 + salon.images.length) % salon.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => setImgIdx(p => (p + 1) % salon.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"><ChevronRight className="w-5 h-5" /></button>
        <button onClick={() => toggleSaveSalon(salon.id)} className={`absolute top-4 right-4 p-2 rounded-lg ${saved ? 'bg-primary-500 text-white' : 'bg-white/80'}`}><Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} /></button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex gap-2 mb-2">
            {salon.isVerified && <span className="flex items-center gap-1 px-2 py-1 bg-white/90 rounded-lg text-xs text-green-600"><BadgeCheck className="w-3 h-3" />Verified</span>}
            {salon.isFeatured && <span className="px-2 py-1 bg-primary-400 text-white rounded-lg text-xs">Featured</span>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{salon.name}</h1>
          <div className="flex items-center gap-3 text-white/80 text-sm mt-2">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-current" />{salon.rating} ({salon.reviewCount})</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{salon.area}</span>
          </div>
        </div>
      </div>

      {/* Book Bar */}
      <div className="sticky top-16 z-30 bg-white dark:bg-surface border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div><p className="text-xs text-gray-500">Starting from</p><p className="text-2xl font-bold text-primary-400">&#8377;{salon.startingPrice}</p></div>
          <Link to={`/book/${salon.slug}`}><Button leftIcon={<Calendar className="w-4 h-4" />}>Book Appointment</Button></Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Info */}
            <div className="bg-white dark:bg-surface rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contact & Hours</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-primary-400" /><div><p className="font-medium text-gray-800 dark:text-white">{salon.address}</p><p className="text-sm text-gray-500">{salon.area}</p></div></div>
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary-400" /><p className="text-gray-800 dark:text-white">{salon.phone}</p></div>
                <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary-400" /><p className="text-gray-800 dark:text-white">{salon.openingHours}</p></div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-surface rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Services & Pricing</h2>
              <table className="w-full">
                <thead><tr className="border-b text-left text-sm text-gray-500"><th className="py-2">Service</th><th className="py-2">Duration</th><th className="py-2 text-right">Price</th></tr></thead>
                <tbody>
                  {salon.services.map(s => (
                    <tr key={s.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 font-medium text-gray-800 dark:text-white">{s.name}</td>
                      <td className="py-4 text-gray-500">{s.duration} mins</td>
                      <td className="py-4 text-right font-semibold text-primary-400">&#8377;{s.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-surface rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Reviews ({reviews.length})</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(r => (
                    <div key={r.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center gap-2 mb-2"><span className="font-medium text-gray-800 dark:text-white">{r.userName}</span><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />)}</div></div>
                      <p className="text-gray-600 dark:text-gray-300">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500 text-center py-8">No reviews yet.</p>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Quick Booking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Book your appointment in just a few clicks.</p>
              <Link to={`/book/${salon.slug}`} className="block"><Button fullWidth leftIcon={<Calendar className="w-4 h-4" />}>Book Now</Button></Link>
            </div>
            <div className="bg-white dark:bg-surface rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Safety Features</h3>
              <div className="space-y-2">
                {['Sanitized Equipment', 'Verified Staff', 'Hygiene Certified'].map(f => (
                  <div key={f} className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-500" /><span className="text-sm text-gray-600">{f}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetailPage;
