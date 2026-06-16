import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Toast from '../ui/Toast';
import { useApp } from '../../context/AppContext';

const Layout: React.FC = () => {
  const { toast } = useApp();
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}
    </div>
  );
};

export default Layout;
