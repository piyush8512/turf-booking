import { useState, useEffect } from 'react';
import { getFavorites, storeFavorites } from '../utils/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const stored = await getFavorites();
    setFavorites(stored || []);
    setLoading(false);
  };

  const addFavorite = async (turfId: string) => {
    const updated = [...favorites, turfId];
    setFavorites(updated);
    await storeFavorites(updated);
  };

  const removeFavorite = async (turfId: string) => {
    const updated = favorites.filter(id => id !== turfId);
    setFavorites(updated);
    await storeFavorites(updated);
  };

  const isFavorite = (turfId: string) => {
    return favorites.includes(turfId);
  };

  const toggleFavorite = async (turfId: string) => {
    if (isFavorite(turfId)) {
      await removeFavorite(turfId);
    } else {
      await addFavorite(turfId);
    }
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
};