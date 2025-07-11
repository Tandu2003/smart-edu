import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import type { Course } from '@/assets/data/mockCourses';

interface FavoritesContextType {
  favorites: Course[];
  addToFavorites: (course: Course) => void;
  removeFromFavorites: (courseId: string) => void;
  toggleFavorite: (course: Course) => void;
  isFavorite: (courseId: string) => boolean;
  clearAllFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'smart-edu-favorites';

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Course[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        localStorage.removeItem(FAVORITES_STORAGE_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addToFavorites = (course: Course) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === course.id)) {
        return prev;
      }
      return [...prev, { ...course, isFavorite: true }];
    });
  };

  const removeFromFavorites = (courseId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== courseId));
  };

  const toggleFavorite = (course: Course) => {
    if (isFavorite(course.id)) {
      removeFromFavorites(course.id);
    } else {
      addToFavorites(course);
    }
  };

  const isFavorite = (courseId: string) => {
    return favorites.some((fav) => fav.id === courseId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const favoritesCount = favorites.length;

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    favoritesCount,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
