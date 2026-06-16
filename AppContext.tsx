import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Booking } from '../types';

interface AppContextType {
  user: { name: string; email: string } | null;
  isLoggedIn: boolean;
  darkMode: boolean;
  bookings: Booking[];
  savedSalons: string[];
  login: (email: string) => void;
  logout: () => void;
  toggleDarkMode: () => void;
  addBooking: (b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  cancelBooking: (id: string) => void;
  toggleSaveSalon: (id: string) => void;
  isSalonSaved: (id: string) => boolean;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  toast: { message: string; type: string } | null;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [savedSalons, setSavedSalons] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') { setDarkMode(true); document.documentElement.classList.add('dark'); }
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    const b = localStorage.getItem('bookings');
    if (b) setBookings(JSON.parse(b));
    const s = localStorage.getItem('savedSalons');
    if (s) setSavedSalons(JSON.parse(s));
  }, []);

  const showToast = (message: string, type: string) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (email: string) => {
    const u = { name: email.split('@')[0], email };
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    showToast('Welcome! You are now logged in.', 'success');
  };

  const logout = () => { setUser(null); localStorage.removeItem('user'); showToast('Logged out.', 'info'); };
  const toggleDarkMode = () => {
    setDarkMode(p => {
      const n = !p;
      localStorage.setItem('darkMode', String(n));
      document.documentElement.classList.toggle('dark', n);
      return n;
    });
  };

  const addBooking = (b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newB: Booking = { ...b, id: `BK${Date.now().toString(36).toUpperCase()}`, status: 'upcoming', createdAt: new Date().toISOString() };
    setBookings(prev => { const u = [...prev, newB]; localStorage.setItem('bookings', JSON.stringify(u)); return u; });
    showToast('Booking confirmed!', 'success');
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => { const u = prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b); localStorage.setItem('bookings', JSON.stringify(u)); return u; });
    showToast('Booking cancelled.', 'info');
  };

  const toggleSaveSalon = (id: string) => {
    setSavedSalons(prev => {
      const u = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      localStorage.setItem('savedSalons', JSON.stringify(u));
      showToast(u.includes(id) ? 'Added to saved!' : 'Removed from saved.', 'info');
      return u;
    });
  };

  const isSalonSaved = (id: string) => savedSalons.includes(id);

  return (
    <AppContext.Provider value={{ user, isLoggedIn: !!user, darkMode, bookings, savedSalons, login, logout, toggleDarkMode, addBooking, cancelBooking, toggleSaveSalon, isSalonSaved, showToast, toast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => { const c = useContext(AppContext); if (!c) throw new Error('useApp error'); return c; };
