export interface Turf {
  id: string;
  name: string;
  rating: number;
  totalRatings: number;
  reviewCount: number;
  address: string;
  images: string[];
  about: string;
  timings: Timing[];
  facilities: string[];
  sports: string[];
  offers: Offer[];
  reviews: Review[];
  pricePerHour: number;
  pricePerPlayer: number;
  verified: boolean;
}

export interface Timing {
  day: string;
  time: string;
}

export interface Offer {
  code: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  daysAgo: number;
  comment: string;
}