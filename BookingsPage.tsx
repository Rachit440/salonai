import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, isLoggedIn, cancelBooking } = useApp();
  const [cancelId, setCancelId] = useState<string | null>(null);

  const upcoming = bookings.filter(b => b.status === 'upcoming');
  const past = bookings.filter(b => b.status !== 'upcoming');

  if (!isLoggedIn) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="text-center max-w-md p-8">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sign in to view bookings</h2>
        <p className="text-gray-500 mb-6">Access your appointments and history</p>
        <Button fullWidth onClick={() => navigate('/login?redirect=/bookings')}>Sign In</Button>
      </Card>
    </div>
  );

  const BookingCard = (b: typeof bookings[0]) => (
    <Card key={b.id} className="mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <img src={b.salon.images[0]} alt={b.salon.name} className="w-full sm:w-28 h-28 rounded-xl object-cover" />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div><h3 className="font-semibold text-gray-800 dark:text-white">{b.salon.name}</h3><p className="text-sm text-gray-500">{b.service.name}</p></div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === 'upcoming' ? 'bg-green-100 text-green-600' : b.status === 'completed' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>{b.status}</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary-400" />{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary-400" />{b.time}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="font-bold text-primary-400">&#8377;{b.service.price}</span>
            {b.status === 'upcoming' && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setCancelId(b.id)}>Cancel</Button>
                <Link to={`/salon/${b.salon.slug}`}><Button variant="outline" size="sm">View</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white dark:bg-surface border-b"><div className="max-w-4xl mx-auto px-4 py-6"><h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Bookings</h1></div></div>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {bookings.length === 0 ? (
          <Card className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No bookings yet</h2>
            <p className="text-gray-500 mb-6">Start your beauty journey</p>
            <Button onClick={() => navigate('/browse')}>Browse Salons</Button>
          </Card>
        ) : (
          <div className="space-y-8">
            {upcoming.length > 0 && <div><h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upcoming ({upcoming.length})</h2>{upcoming.map(BookingCard)}</div>}
            {past.length > 0 && <div><h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Past ({past.length})</h2>{past.map(BookingCard)}</div>}
          </div>
        )}
      </div>
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCancelId(null)} />
          <Card className="relative z-10 w-full max-w-md p-6 text-center">
            <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Cancel Booking?</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to cancel?</p>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setCancelId(null)}>Keep</Button>
              <Button fullWidth onClick={() => { cancelBooking(cancelId); setCancelId(null); }}>Cancel</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
