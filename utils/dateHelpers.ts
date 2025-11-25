import { DateOption } from '../types/booking.types';
import { DAYS } from '../data/constants';

export const generateDates = (startDate: number = 24, count: number = 7): DateOption[] => {
  return Array.from({ length: count }, (_, i) => ({
    day: DAYS[i % 7],
    date: startDate + i
  }));
};

export const formatDate = (date: number, month: string = 'Nov', year: number = 2025): string => {
  return `${date} ${month} ${year}`;
};

export const formatTime = (startHour: number, endHour: number): string => {
  const formatHour = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };
  
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
};

export const getCurrentDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getMonthName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
