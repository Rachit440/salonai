import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, ShieldCheck, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { getFeaturedSalons, categories } from '../data/salons';
import SalonCard from '../components/salon/SalonCard';
import CategoryCard from '../components/salon/CategoryCard';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const featured = getFeaturedSalons();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-100 py-16 sm:py-24 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-primary-100 mb-6">
            <span className="text-2xl">🏰</span>
            <span className="font-medium">Jaipur, Rajasthan</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Find and Book the{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">Best Beauty Salons</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare prices, reviews, services and instantly book appointments.
          </p>
          {/* AI Search */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Ask AI</span>
            </div>
            <input placeholder="Best bridal makeup salon under ₹2000 in Malviya Nagar..." className="w-full pl-24 pr-28 py-4 rounded-2xl border-2 border-primary-100 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400" />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2" leftIcon={<Search className="w-4 h-4" />}>Search</Button>
          </div>
          <div className="flex justify-center gap-8 sm:gap-16 mt-10 text-center">
            <div><p className="text-2xl font-bold text-primary-400">150+</p><p className="text-sm text-gray-500">Verified Salons</p></div>
            <div><p className="text-2xl font-bold text-primary-400">10K+</p><p className="text-sm text-gray-500">Happy Customers</p></div>
            <div><p className="text-2xl font-bold text-primary-400">500+</p><p className="text-sm text-gray-500">Expert Stylists</p></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">Explore by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(c => <CategoryCard key={c.id} {...c} />)}
          </div>
        </div>
      </section>

      {/* Featured Salons */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Featured Salons</h2>
              <p className="text-gray-500">Top-rated salons in your city</p>
            </div>
            <Link to="/browse" className="flex items-center gap-2 text-primary-400 hover:text-primary-500">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map(s => <SalonCard key={s.id} salon={s} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-primary-400 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Why Choose SalonAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ icon: <ShieldCheck className="w-8 h-8" />, title: 'Verified Salons', desc: 'All salons verified for quality and hygiene' },
              { icon: <DollarSign className="w-8 h-8" />, title: 'Transparent Pricing', desc: 'Compare prices with no hidden charges' },
              { icon: <Clock className="w-8 h-8" />, title: 'Instant Booking', desc: 'Book appointments in real-time' },
            ].map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-primary-100 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/browse"><Button className="mt-10" leftIcon={<Sparkles className="w-5 h-5" />}>Find Your Perfect Salon</Button></Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
