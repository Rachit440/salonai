export interface Salon {
  id: string;
  name: string;
  slug: string;
  images: string[];
  rating: number;
  reviewCount: number;
  address: string;
  area: string;
  city: string;
  phone: string;
  openingHours: string;
  services: SalonService[];
  startingPrice: number;
  isVerified: boolean;
  isFeatured: boolean;
}

export interface SalonService {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  description?: string;
}

export interface Review {
  id: string;
  salonId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  salonId: string;
  salon: Salon;
  service: SalonService;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
