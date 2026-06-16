import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SalonAI</span>
          </Link>
          <p className="text-sm text-gray-400">Find and book the best beauty salons near you.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-sm hover:text-primary-400">Home</Link></li>
            <li><Link to="/browse" className="text-sm hover:text-primary-400">Browse Salons</Link></li>
            <li><Link to="/ai-assistant" className="text-sm hover:text-primary-400">AI Assistant</Link></li>
            <li><Link to="/contact" className="text-sm hover:text-primary-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link to="/browse?category=bridal-makeup" className="text-sm hover:text-primary-400">Bridal Makeup</Link></li>
            <li><Link to="/browse?category=hair-spa" className="text-sm hover:text-primary-400">Hair Spa</Link></li>
            <li><Link to="/browse?category=facial" className="text-sm hover:text-primary-400">Facial</Link></li>
            <li><Link to="/browse?category=hair-color" className="text-sm hover:text-primary-400">Hair Color</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-primary-400" /> hello@salonai.com</li>
            <li className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-primary-400" /> +91 98765 43210</li>
            <li className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-primary-400" /> Jaipur, Rajasthan</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} SalonAI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
