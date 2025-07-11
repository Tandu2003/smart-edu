import { ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';

import type { Course } from '@/assets/data/mockCourses';
import CourseCard from '@/components/course/CourseCard';
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton';

interface FeaturedCoursesSectionProps {
  isLoading: boolean;
  featuredCourses: Course[];
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
}

export default function FeaturedCoursesSection({
  isLoading,
  featuredCourses,
  onToggleFavorite,
  onViewDetails,
}: FeaturedCoursesSectionProps) {
  return (
    <section id="featured-courses" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Khóa học nổi bật</h2>
            <p className="text-gray-600">Những khóa học được yêu thích nhất</p>
          </div>
          <Link
            to="/courses"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Xem tất cả
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(8)].map((_, index) => <CourseCardSkeleton key={index} />)
            : featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onToggleFavorite={onToggleFavorite}
                  onViewDetails={onViewDetails}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
