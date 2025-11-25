import { TimePeriod } from '../types/booking.types';

export const TIME_PERIODS: TimePeriod[] = [
  { name: 'Morning', slots: 4, timeRange: '06:00 AM - 12:00 PM' },
  { name: 'Noon', slots: 4, timeRange: '12:00 PM - 04:00 PM' },
  { name: 'Evening', slots: 2, timeRange: '04:00 PM - 08:00 PM' },
  { name: 'Twilight', slots: 1, timeRange: '08:00 PM - 10:00 PM' }
];

export const FACILITIES = ['Parking', 'Water', 'Ball', 'Night Light'];

export const SPORTS = ['Foot Ball', 'Cricket', 'Pickle Ball'];

export const COURTS = ['Court A', 'Court B'];

export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];