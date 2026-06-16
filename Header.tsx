import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn, logout, darkMode, toggleDarkMode, savedSalons } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse' },
    { path: '/ai-assistant', label: 'AI Assistant' },
    { path: '/bookings', label: 'My Bookings' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-surface/95 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">SalonAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.path} to={l.path} className={`px-4 py-2 rounded-xl text-sm font-medium ${location.pathname === l.path ? 'bg-primary-100 text-primary-500' : 'text-gray-600 hover:bg-gray-50'}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/saved" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
              <Heart className="w-4 h-4" />
              <span className="bg-primary-100 text-primary-600 text-xs px-1.5 rounded-full">{savedSalons.length}</span>
            </Link>
            <button onClick={toggleDarkMode} className="p-2 rounded-xl text-gray-600 hover:bg-gray-100">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-600">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
                <Button size="sm" onClick={() => navigate('/signup')}>Sign Up</Button>
              </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {links.map(l => (
              <Link key={l.path} to={l.path} onClick={() => setIsOpen(false)} className={`block px-4 py-2 ${location.pathname === l.path ? 'bg-primary-100 text-primary-500' : 'text-gray-600'}`}>
                {l.label}
              </Link>
            ))}
            {isLoggedIn ? <button onClick={logout} className="w-full text-left px-4 py-2 text-gray-600">Logout</button> : (
              <div className="px-4 pt-2 flex gap-2">
                <Button variant="outline" fullWidth onClick={() => { navigate('/login'); setIsOpen(false); }}>Login</Button>
                <Button fullWidth onClick={() => { navigate('/signup'); setIsOpen(false); }}>Sign Up</Button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
