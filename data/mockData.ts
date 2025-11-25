import { Turf } from '../types/turf.types';

export const turfData: Turf = {
  id: '1',
  name: 'Xciteplay Club',
  rating: 4.5,
  totalRatings: 15,
  reviewCount: 10,
  address: '516/A, Katol Rd, KT Nagar, Nagpur, Maharashtra 440013',
  images: [
    'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
    'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800'
  ],
  about: 'Xciteplay Club is the perfect spot for football and cricket lovers to bring their game.',
  timings: [
    { day: 'Monday', time: '06:00 PM - 07:00 PM' },
    { day: 'Tuesday', time: '06:00 PM - 07:00 PM' },
    { day: 'Wednesday', time: '06:00 PM - 07:00 PM' },
    { day: 'Thursday', time: '06:00 PM - 07:00 PM' },
    { day: 'Friday', time: '06:00 PM - 07:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 10:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 10:00 PM' }
  ],
  facilities: ['Parking', 'Water', 'Ball', 'Night Light'],
  sports: ['Foot Ball', 'Cricket', 'Pickle Ball'],
  offers: [
    {
      code: 'FIRSTBOOK',
      description: 'Get a 20% Offer on your first turf booking with Kixar App'
    }
  ],
  reviews: [
    {
      id: '1',
      name: 'Siva',
      rating: 5.0,
      date: '22 Nov, 2025',
      daysAgo: 2,
      comment: 'Hand On The Best And The Easiest Way Of Booking Turfs Just In Seconds And Within Your Hand !'
    },
    {
      id: '2',
      name: 'Kumar',
      rating: 5.0,
      date: '22 Nov, 2025',
      daysAgo: 2,
      comment: 'Hand On The Best And The Easiest Way Of Booking Turfs Just In Seconds And Within Your Hand !'
    },
    {
      id: '3',
      name: 'Raj',
      rating: 4.5,
      date: '21 Nov, 2025',
      daysAgo: 3,
      comment: 'Great facilities and well-maintained turf. Perfect for weekend matches!'
    }
  ],
  pricePerHour: 1200,
  pricePerPlayer: 240,
  verified: true
};

// Mock data for turf list (for home screen)
export const turfsList: Turf[] = [
  turfData,
  {
    ...turfData,
    id: '2',
    name: 'Sports Arena',
    rating: 4.3,
    totalRatings: 28,
    pricePerHour: 1500,
    pricePerPlayer: 300
  },
  {
    ...turfData,
    id: '3',
    name: 'Play Ground Plus',
    rating: 4.7,
    totalRatings: 42,
    pricePerHour: 1000,
    pricePerPlayer: 200
  }
];
