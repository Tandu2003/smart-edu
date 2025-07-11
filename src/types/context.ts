import type { ReactNode } from 'react';

import type { Course, SuggestedCourse } from './course';

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  suggestions?: SuggestedCourse[];
}

export interface ChatBotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  toggleChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

export interface ChatBotProviderProps {
  children: ReactNode;
}

export interface FavoritesContextType {
  favorites: Course[];
  addToFavorites: (course: Course) => void;
  removeFromFavorites: (courseId: string) => void;
  toggleFavorite: (course: Course) => void;
  isFavorite: (courseId: string) => boolean;
  clearFavorites: () => void;
  favoriteCount: number;
  selectedCourses: string[];
  selectCourse: (courseId: string) => void;
  deselectCourse: (courseId: string) => void;
  selectAllCourses: () => void;
  deselectAllCourses: () => void;
  removeSelectedCourses: () => void;
}

export interface FavoritesProviderProps {
  children: ReactNode;
}

export interface ViewHistoryContextType {
  viewHistory: Course[];
  addToHistory: (course: Course) => void;
  clearHistory: () => void;
  removeFromHistory: (courseId: string) => void;
}

export interface ViewHistoryProviderProps {
  children: ReactNode;
}
