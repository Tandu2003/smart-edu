import { memo } from 'react';

import type { Course } from '@/assets/data/mockCourses';
import type { SuggestedCourse } from '@/types';

import CourseCard from './CourseCard';

interface SuggestionCardWrapperProps {
  suggestion: SuggestedCourse;
  course: Course;
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
  onClick?: (suggestion: SuggestedCourse) => void;
  variant?: 'compact' | 'full';
  className?: string;
}

const SuggestionCardWrapper = memo(function SuggestionCardWrapper({
  suggestion,
  course,
  onToggleFavorite,
  onViewDetails,
  onClick,
  variant = 'full',
  className = '',
}: SuggestionCardWrapperProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(suggestion);
    } else {
      onViewDetails(course);
    }
  };

  if (variant === 'compact') {
    // Compact version for chatbot
    return (
      <div
        className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group ${className}`}
        onClick={handleClick}
      >
        <div className="flex space-x-3 p-3">
          <img
            src={course.image}
            alt={course.title}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h4>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                {suggestion.matchScore}% phù hợp
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-green-600">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(course.price)}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{course.rating}</span>
              </div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg border-l-2 border-yellow-400">
              <p className="text-xs text-gray-700 italic">💡 {suggestion.reason}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full version for home page (matches AISuggestionsSection)
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-2 -right-2 z-10">
        <div className="bg-yellow-400 text-purple-900 text-xs font-bold px-2 py-1 rounded-full shadow">
          {suggestion.matchScore}% phù hợp
        </div>
      </div>
      <CourseCard
        course={course}
        onToggleFavorite={onToggleFavorite}
        onViewDetails={onViewDetails}
      />
      <div className="mt-2 p-3 bg-white rounded-lg shadow-sm border-l-4 border-yellow-400">
        <p className="text-sm text-gray-600 italic">💡 {suggestion.reason}</p>
      </div>
    </div>
  );
});

export default SuggestionCardWrapper;
