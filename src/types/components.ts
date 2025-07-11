import type { ReactNode } from 'react';

import type { ChatMessage } from './context';
import type { Course, SuggestedCourse } from './course';

// Layout Components
export interface LayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  className?: string;
}

// Home Components
export interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export interface AISuggestionsSectionProps {
  suggestions: SuggestedCourse[];
  isLoading?: boolean;
}

export interface CategoriesSectionProps {
  onCategorySelect: (category: string) => void;
}

export interface FeaturedCoursesSectionProps {
  courses: Course[];
  isLoading?: boolean;
}

export interface StatsSectionProps {
  className?: string;
}

// Course Components
export interface CourseCardProps {
  course: Course;
  onClick?: (course: Course) => void;
}

export interface CourseListProps {
  courses: Course[];
  isLoading?: boolean;
}

export interface CourseListItemProps {
  course: Course;
  onClick?: (course: Course) => void;
}

export interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface CourseHeaderProps {
  title: string;
  description?: string;
  totalCourses?: number;
}

export interface CourseFiltersProps {
  selectedCategory: string;
  selectedLevel: string;
  selectedPriceRange: string;
  selectedRating: number;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onPriceRangeChange: (priceRange: string) => void;
  onRatingChange: (rating: number) => void;
  onSortChange: (sortBy: string) => void;
  onClearFilters: () => void;
}

export interface NoResultsProps {
  searchQuery?: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface SuggestionCardWrapperProps {
  suggestions: SuggestedCourse[];
  onCourseSelect: (course: SuggestedCourse) => void;
  className?: string;
}

// Favorites Components
export interface FavoriteCourseItemProps {
  course: Course;
  isSelected: boolean;
  onToggleSelect: (courseId: string) => void;
  onRemove: (courseId: string) => void;
  onClick?: (course: Course) => void;
}

export interface FavoritesListProps {
  courses: Course[];
  selectedCourses: string[];
  onToggleSelect: (courseId: string) => void;
  onRemove: (courseId: string) => void;
  onCourseClick: (course: Course) => void;
}

export interface FavoritesBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onRemoveSelected: () => void;
}

export interface FavoritesEmptyStateProps {
  onBrowseCourses: () => void;
}

export interface FavoritesStatsProps {
  totalCourses: number;
  totalValue: number;
  averageRating: number;
}

// ChatBot Components
export interface ChatBubbleProps {
  message: ChatMessage;
  onSuggestionClick: (suggestion: SuggestedCourse) => void;
}

// UI Components
export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Pagination UI
export interface PaginationLinkProps {
  page: number;
  isActive?: boolean;
  onClick: (page: number) => void;
  children: ReactNode;
}
