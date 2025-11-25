import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  BOOKINGS: '@kixar_bookings',
  FAVORITES: '@kixar_favorites',
  USER: '@kixar_user'
};

export const storeData = async (key: string, value: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error('Error storing data:', e);
    return false;
  }
};

export const getData = async (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting data:', e);
    return null;
  }
};

export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error removing data:', e);
    return false;
  }
};

export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error('Error clearing data:', e);
    return false;
  }
};

// Specific storage functions
export const storeBookings = (bookings: any[]) => 
  storeData(STORAGE_KEYS.BOOKINGS, bookings);

export const getBookings = () => 
  getData(STORAGE_KEYS.BOOKINGS);

export const storeFavorites = (favorites: string[]) => 
  storeData(STORAGE_KEYS.FAVORITES, favorites);

export const getFavorites = () => 
  getData(STORAGE_KEYS.FAVORITES);