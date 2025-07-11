import { createContext, useContext, useEffect, useState } from 'react';

import type { FavoritesContextType } from '@/types/context';
import type { Course } from '@/types/course';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'smart-edu-favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
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

  const clearFavorites = () => {
    setFavorites([]);
  };

  const favoriteCount = favorites.length;
  const selectedCourses: string[] = [];

  const selectCourse = (courseId: string) => {
    // Implementation for selecting courses
  };

  const deselectCourse = (courseId: string) => {
    // Implementation for deselecting courses
  };

  const selectAllCourses = () => {
    // Implementation for selecting all courses
  };

  const deselectAllCourses = () => {
    // Implementation for deselecting all courses
  };

  const removeSelectedCourses = () => {
    // Implementation for removing selected courses
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoriteCount,
    selectedCourses,
    selectCourse,
    deselectCourse,
    selectAllCourses,
    deselectAllCourses,
    removeSelectedCourses,
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
