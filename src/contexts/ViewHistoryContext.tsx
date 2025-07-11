import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import type { Course } from '@/assets/data/mockCourses';

interface ViewHistoryContextType {
  viewHistory: Course[];
  addToViewHistory: (course: Course) => void;
  removeFromViewHistory: (courseId: string) => void;
  clearViewHistory: () => void;
  isInViewHistory: (courseId: string) => boolean;
  viewHistoryCount: number;
}

const ViewHistoryContext = createContext<ViewHistoryContextType | undefined>(undefined);

const VIEW_HISTORY_STORAGE_KEY = 'smart-edu-view-history';
const MAX_HISTORY_ITEMS = 50; // Giới hạn số lượng items trong lịch sử

interface ViewHistoryProviderProps {
  children: ReactNode;
}

export function ViewHistoryProvider({ children }: ViewHistoryProviderProps) {
  const [viewHistory, setViewHistory] = useState<Course[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load view history from localStorage on mount
  useEffect(() => {
    const savedViewHistory = localStorage.getItem(VIEW_HISTORY_STORAGE_KEY);
    if (savedViewHistory) {
      try {
        setViewHistory(JSON.parse(savedViewHistory));
      } catch (error) {
        console.error('Error parsing view history from localStorage:', error);
        localStorage.removeItem(VIEW_HISTORY_STORAGE_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save view history to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(VIEW_HISTORY_STORAGE_KEY, JSON.stringify(viewHistory));
    }
  }, [viewHistory, isLoaded]);

  const addToViewHistory = (course: Course) => {
    setViewHistory((prev) => {
      // Remove existing course if it exists (to move it to front)
      const filtered = prev.filter((item) => item.id !== course.id);

      // Add to beginning of array with timestamp
      const newHistory = [{ ...course, viewedAt: new Date().toISOString() }, ...filtered];

      // Limit to MAX_HISTORY_ITEMS
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const removeFromViewHistory = (courseId: string) => {
    setViewHistory((prev) => prev.filter((item) => item.id !== courseId));
  };

  const clearViewHistory = () => {
    setViewHistory([]);
  };

  const isInViewHistory = (courseId: string) => {
    return viewHistory.some((item) => item.id === courseId);
  };

  const viewHistoryCount = viewHistory.length;

  const value: ViewHistoryContextType = {
    viewHistory,
    addToViewHistory,
    removeFromViewHistory,
    clearViewHistory,
    isInViewHistory,
    viewHistoryCount,
  };

  return <ViewHistoryContext.Provider value={value}>{children}</ViewHistoryContext.Provider>;
}

export function useViewHistory() {
  const context = useContext(ViewHistoryContext);
  if (context === undefined) {
    throw new Error('useViewHistory must be used within a ViewHistoryProvider');
  }
  return context;
}
