import { Sparkles } from 'lucide-react';

import type { Course } from '@/assets/data/mockCourses';
import CourseCard from '@/components/course/CourseCard';
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton';
import type { SuggestedCourse } from '@/types';

interface AISuggestionsSectionProps {
  showSuggestions: boolean;
  isSuggestionsLoading: boolean;
  suggestions: SuggestedCourse[];
  coursesWithFavorites: Course[];
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
}

export default function AISuggestionsSection({
  showSuggestions,
  isSuggestionsLoading,
  suggestions,
  coursesWithFavorites,
  onToggleFavorite,
  onViewDetails,
}: AISuggestionsSectionProps) {
  if (!showSuggestions) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-yellow-500 mr-2" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Gợi ý dành riêng cho bạn</h2>
          </div>
          <p className="text-lg text-gray-600">
            AI đã phân tích và tìm ra những khóa học phù hợp nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isSuggestionsLoading ? (
            [...Array(3)].map((_, index) => <CourseCardSkeleton key={index} />)
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => {
              const course = coursesWithFavorites.find((c) => c.id === suggestion.id);
              if (!course) return null;

              return (
                <div key={suggestion.id} className="relative">
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
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Không tìm thấy gợi ý phù hợp. Vui lòng thử lại sau.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
