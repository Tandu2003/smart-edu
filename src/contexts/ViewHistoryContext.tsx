import { createContext, useContext, useEffect, useState } from 'react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  image: string;
  category: string;
  isFavorite: boolean;
}

interface ViewHistoryItem extends Course {
  viewedAt: string; // ISO timestamp
}

interface ViewHistoryContextType {
  viewHistory: ViewHistoryItem[];
  addToViewHistory: (course: Course) => void;
  clearViewHistory: () => void;
  removeFromViewHistory: (courseId: string) => void;
}

const ViewHistoryContext = createContext<ViewHistoryContextType | undefined>(undefined);

const VIEW_HISTORY_KEY = 'smart-edu-view-history';
const MAX_HISTORY_ITEMS = 20;

export function ViewHistoryProvider({ children }: { children: React.ReactNode }) {
  const [viewHistory, setViewHistory] = useState<ViewHistoryItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(VIEW_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setViewHistory(parsed);
      }
    } catch (error) {
      console.error('Error loading view history:', error);
    }
  }, []);

  // Save to localStorage whenever viewHistory changes
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(viewHistory));
    } catch (error) {
      console.error('Error saving view history:', error);
    }
  }, [viewHistory]);

  const addToViewHistory = (course: Course) => {
    setViewHistory((prev) => {
      // Remove existing entry if it exists
      const filteredHistory = prev.filter((item) => item.id !== course.id);

      // Add new entry at the beginning
      const newItem: ViewHistoryItem = {
        ...course,
        viewedAt: new Date().toISOString(),
      };

      const newHistory = [newItem, ...filteredHistory];

      // Keep only the most recent items
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearViewHistory = () => {
    setViewHistory([]);
  };

  const removeFromViewHistory = (courseId: string) => {
    setViewHistory((prev) => prev.filter((item) => item.id !== courseId));
  };

  const value = {
    viewHistory,
    addToViewHistory,
    clearViewHistory,
    removeFromViewHistory,
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
