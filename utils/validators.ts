export interface BookingValidation {
  selectedDate?: number;
  selectedPeriod?: string;
  selectedCourt?: string;
  playerCount?: number;
}

export const validateBooking = (booking: BookingValidation): boolean => {
  return !!(
    booking.selectedDate &&
    booking.selectedPeriod &&
    booking.selectedCourt &&
    booking.playerCount && 
    booking.playerCount > 0
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validatePlayerCount = (count: number, min: number = 1, max: number = 20): boolean => {
  return count >= min && count <= max;
};

export const validateTimeSlot = (startTime: number, endTime: number): boolean => {
  return startTime < endTime && startTime >= 0 && endTime <= 24;
};