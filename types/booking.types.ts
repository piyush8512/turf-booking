export interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  date: string;
  time: string;
  period: string;
  court: string;
  totalPrice: number;
  players: number;
  pricePerHour: number;
  pricePerPlayer: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface TimePeriod {
  name: string;
  slots: number;
  timeRange: string;
}

export interface DateOption {
  day: string;
  date: number;
  
}