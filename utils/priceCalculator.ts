export const calculateTotalPrice = (
  pricePerHour: number, 
  hours: number, 
  players: number
): { total: number; perPlayer: number } => {
  const total = pricePerHour * hours;
  const perPlayer = Math.round(total / players);
  
  return {
    total,
    perPlayer
  };
};

export const formatPrice = (price: number): string => {
  return `₹ ${price.toLocaleString('en-IN')}`;
};

export const calculateDiscount = (
  originalPrice: number, 
  discountPercent: number
): number => {
  return originalPrice - (originalPrice * discountPercent / 100);
};

export const calculatePricePerPlayer = (
  totalPrice: number, 
  playerCount: number
): number => {
  return Math.round(totalPrice / playerCount);
};

export const formatPriceRange = (minPrice: number, maxPrice: number): string => {
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};
