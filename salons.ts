import type { Salon } from '../types';

const img = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;
const genId = () => Math.random().toString(36).substr(2, 9);

const areas = ['Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'Raja Park', 'Jagatpura', 'C-Scheme'];

function createSalon(id: number, name: string, area: string, rating: number, reviews: number, price: number, featured: boolean = false): Salon {
  const serviceCategories = ['Bridal Makeup', 'Hair Spa', 'Facial', 'Hair Cut', 'Hair Color', 'Nail Art'];
  return {
    id: `salon-${id}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    images: [img(3993284 + id), img(1813272 + id), img(3757967 + id)],
    rating,
    reviewCount: reviews,
    address: `${String.fromCharCode(65 + (id % 26))}-${id + 10}, ${area}`,
    area: area.toLowerCase().replace(' ', '-'),
    city: 'Jaipur',
    phone: `+91 98765 ${43210 + id}`,
    openingHours: '10:00 AM - 8:00 PM',
    services: serviceCategories.map((cat, i) => ({
      id: genId(),
      name: cat,
      category: cat.toLowerCase().replace(' ', '-'),
      duration: [30, 45, 60, 90, 120][i % 5],
      price: price + (i * 200),
    })),
    startingPrice: price,
    isVerified: rating >= 4.5,
    isFeatured: featured,
  };
}

export const salons: Salon[] = [
  createSalon(1, 'Glamour Studio', areas[0], 4.8, 342, 399, true),
  createSalon(2, 'Luxe Beauty Lounge', areas[1], 4.9, 528, 799, true),
  createSalon(3, 'Style Studio', areas[2], 4.5, 187, 249),
  createSalon(4, 'Urban Glam', areas[3], 4.7, 456, 499, true),
  createSalon(5, 'Radiant Looks', areas[4], 4.6, 234, 549),
  createSalon(6, 'The Beauty House', areas[5], 4.4, 167, 449),
  createSalon(7, 'Pretty Woman Salon', areas[0], 4.3, 98, 199),
  createSalon(8, 'Hair Masters', areas[1], 4.8, 567, 699, true),
  createSalon(9, 'Glow Up Studio', areas[3], 4.6, 312, 399),
  createSalon(10, 'Salon Royale', areas[5], 4.9, 823, 999, true),
  createSalon(11, 'Looks Salon', areas[2], 4.5, 245, 349),
  createSalon(12, 'Glam House', areas[4], 4.4, 178, 349),
  createSalon(13, 'Bloom Beauty', areas[1], 4.7, 423, 499, true),
  createSalon(14, 'Shear Perfection', areas[0], 4.3, 134, 149),
  createSalon(15, 'Style Quotient', areas[3], 4.6, 389, 549),
  createSalon(16, 'BeautyBay', areas[2], 4.5, 267, 399),
  createSalon(17, 'The Chic Studio', areas[5], 4.8, 512, 649, true),
  createSalon(18, 'Blush & Glow', areas[4], 4.4, 156, 299),
  createSalon(19, 'Tress Me', areas[0], 4.7, 478, 549),
  createSalon(20, 'Elegance Unisex', areas[1], 4.2, 89, 99),
];

export const categories = [
  { id: 'bridal-makeup', name: 'Bridal Makeup', icon: '👰', count: 12 },
  { id: 'hair-spa', name: 'Hair Spa', icon: '💆', count: 20 },
  { id: 'hair-cut', name: 'Hair Cut', icon: '✂️', count: 20 },
  { id: 'facial', name: 'Facial', icon: '✨', count: 18 },
  { id: 'nail-art', name: 'Nail Art', icon: '💅', count: 14 },
  { id: 'hair-color', name: 'Hair Color', icon: '🎨', count: 16 },
];

export const areasList = areas.map((a, i) => ({ id: a.toLowerCase().replace(' ', '-'), name: a, count: [5, 4, 3, 3, 3, 3][i] }));

export const getSalonBySlug = (slug: string) => salons.find(s => s.slug === slug);
export const getFeaturedSalons = () => salons.filter(s => s.isFeatured);
export const getReviewsBySalonId = () => [
  { id: 'r1', salonId: 'salon-1', userName: 'Priya Sharma', rating: 5, comment: 'Amazing service! Highly recommend.', date: '2024-01-15' },
];
