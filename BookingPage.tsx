import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, CheckCircle, Download } from 'lucide-react';
import { getSalonBySlug } from '../data/salons';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

type Step = 1 | 2 | 3 | 4 | 5;

const BookingPage: React.FC = () => {
  const { slug } = useParams();
  const { addBooking, isLoggedIn } = useApp();
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<any>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookingId, setBookingId] = useState('');

  const salon = getSalonBySlug(slug || '');
  if (!salon) return <div className="min-h-screen flex items-center justify-center"><p>Salon not found</p></div>;

  const times = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { date: d.toISOString().split('T')[0], day: d.toLocaleDateString('en-US', { weekday: 'short' }), num: d.getDate(), month: d.toLocaleDateString('en-US', { month: 'short' }) };
  });

  const confirm = () => {
    if (!isLoggedIn) { window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname); return; }
    const id = `BK${Date.now().toString(36).toUpperCase()}`;
    addBooking({ salonId: salon.id, salon, service, date, time });
    setBookingId(id);
    setStep(5);
  };

  const steps = [{ n: 1, label: 'Service' }, { n: 2, label: 'Date' }, { n: 3, label: 'Time' }, { n: 4, label: 'Confirm' }];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white dark:bg-surface border-b">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link to={`/salon/${slug}`} className="flex items-center gap-2 text-gray-500 hover:text-primary-400 mb-4"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Book at {salon.name}</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${step >= s.n ? 'bg-primary-100 text-primary-500' : 'bg-gray-100 text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= s.n ? 'bg-primary-400 text-white' : 'bg-gray-200'}`}>
                  {step > s.n ? <Check className="w-3 h-3" /> : s.n}
                </div>
                <span className="hidden sm:inline text-sm">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${step > s.n ? 'bg-primary-400' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Select a Service</h2>
            <div className="space-y-3">
              {salon.services.map(s => (
                <button key={s.id} onClick={() => { setService(s); setStep(2); }} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 hover:border-primary-400 ${service?.id === s.id ? 'border-primary-400 bg-primary-50' : 'border-gray-200'}`}>
                  <div><p className="font-medium text-gray-800 dark:text-white">{s.name}</p><p className="text-sm text-gray-500">{s.duration} mins</p></div>
                  <span className="font-bold text-primary-400">&#8377;{s.price}</span>
                </button>
              ))}
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Select a Date</h2>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
              {dates.map(d => (
                <button key={d.date} onClick={() => { setDate(d.date); setStep(3); }} className={`p-3 rounded-xl border-2 text-center ${date === d.date ? 'border-primary-400 bg-primary-50' : 'border-gray-200 hover:border-primary-400'}`}>
                  <p className="text-xs text-gray-500">{d.day}</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">{d.num}</p>
                  <p className="text-xs text-gray-500">{d.month}</p>
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Select a Time</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {times.map(t => (
                <button key={t} onClick={() => { setTime(t); setStep(4); }} className={`p-3 rounded-xl border-2 text-center transition-all ${time === t ? 'border-pink-400 bg-pink-50 shadow-sm' : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50/50'}`}>
                  <span className={`font-medium ${time === t ? 'text-pink-600' : 'text-gray-700'}`}>{t}</span>
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
          </Card>
        )}

        {step === 4 && service && (
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Booking Summary</h2>
            <div className="flex items-start gap-4 pb-4 border-b">
              <img src={salon.images[0]} alt={salon.name} className="w-20 h-20 rounded-xl object-cover" />
              <div><h3 className="font-semibold text-gray-800 dark:text-white">{salon.name}</h3><p className="text-sm text-gray-500">{salon.area}</p></div>
            </div>
            <div className="py-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium text-gray-800 dark:text-white">{service.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium text-gray-800 dark:text-white">{service.duration} mins</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium text-gray-800 dark:text-white">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium text-gray-800 dark:text-white">{time}</span></div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between text-lg"><span className="font-semibold text-gray-800 dark:text-white">Total</span><span className="font-bold text-primary-400">&#8377;{service.price}</span></div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
              <Button fullWidth onClick={confirm}>Confirm Booking</Button>
            </div>
          </Card>
        )}

        {step === 5 && service && (
          <Card className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-500" /></div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-6">Your appointment has been successfully booked.</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6"><p className="text-sm text-gray-500">Booking ID</p><p className="text-xl font-mono font-bold text-primary-400">{bookingId}</p></div>
            <div className="space-y-2 text-sm text-left mb-6">
              <div className="flex justify-between"><span className="text-gray-500">Salon</span><span className="font-medium text-gray-800 dark:text-white">{salon.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium text-gray-800 dark:text-white">{service.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date & Time</span><span className="font-medium text-gray-800 dark:text-white">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {time}</span></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth leftIcon={<Download className="w-4 h-4" />}>Download</Button>
              <Link to="/bookings" className="w-full"><Button fullWidth>View Bookings</Button></Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
