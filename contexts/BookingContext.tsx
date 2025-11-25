// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Booking } from '../types/booking.types';

// interface BookingContextType {
//   bookings: Booking[];
//   addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Booking;
//   removeBooking: (bookingId: string) => void;
//   getBookingById: (bookingId: string) => Booking | undefined;
// }

// const BookingContext = createContext<BookingContextType | undefined>(undefined);

// export const BookingProvider = ({ children }: { children: ReactNode }) => {
//   const [bookings, setBookings] = useState<Booking[]>([]);

//   const addBooking = (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking => {
//     const newBooking: Booking = {
//       ...booking,
//       id: Date.now().toString(),
//       status: 'Confirmed',
//       createdAt: new Date().toISOString()
//     };
//     setBookings([...bookings, newBooking]);
//     return newBooking;
//   };

//   const removeBooking = (bookingId: string) => {
//     setBookings(bookings.filter(b => b.id !== bookingId));
//   };

//   const getBookingById = (bookingId: string) => {
//     return bookings.find(b => b.id === bookingId);
//   };

//   return (
//     <BookingContext.Provider value={{ bookings, addBooking, removeBooking, getBookingById }}>
//       {children}
//     </BookingContext.Provider>
//   );
// };

// export const useBookings = () => {
//   const context = useContext(BookingContext);
//   if (!context) {
//     throw new Error('useBookings must be used within BookingProvider');
//   }
//   return context;
// };

// export default BookingContext;

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking } from '../types/booking.types';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  isLoading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Load bookings from storage on app start
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('@kixar_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Failed to load bookings', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Add booking and save to storage
  const addBooking = async (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);

    try {
      await AsyncStorage.setItem('@kixar_bookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Failed to save booking', error);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, isLoading }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within BookingProvider');
  }
  return context;
};

export default BookingContext;