import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { salons } from '../data/salons';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SalonCard from '../components/salon/SalonCard';

const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedSalons, isLoggedIn } = useApp();

  const saved = savedSalons.map(id => salons.find(s => s.id === id)).filter(Boolean);

  if (!isLoggedIn) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="text-center max-w-md p-8">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sign in to view saved</h2>
        <Button fullWidth onClick={() => navigate('/login?redirect=/saved')}>Sign In</Button>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white dark:bg-surface border-b"><div className="max-w-6xl mx-auto px-4 py-6"><h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><Heart className="w-6 h-6 text-primary-400" /> Saved Salons ({saved.length})</h1></div></div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {saved.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{saved.map(s => s && <SalonCard key={s.id} salon={s} />)}</div> : (
          <Card className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No saved salons</h2>
            <Button onClick={() => navigate('/browse')}>Browse Salons</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
