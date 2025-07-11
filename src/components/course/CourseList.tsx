import CourseCard from './CourseCard';
import CourseCardSkeleton from './CourseCardSkeleton';
import CourseListItem from './CourseListItem';
import CourseListItemSkeleton from './CourseListItemSkeleton';

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

interface CourseListProps {
  courses: Course[];
  viewMode: 'grid' | 'list';
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
  isLoading?: boolean;
  skeletonCount?: number;
}

export default function CourseList({
  courses,
  viewMode,
  onToggleFavorite,
  onViewDetails,
  isLoading = false,
  skeletonCount = 8,
}: CourseListProps) {
  if (isLoading) {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(skeletonCount)].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {[...Array(skeletonCount)].map((_, index) => (
          <CourseListItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onToggleFavorite={onToggleFavorite}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <CourseListItem
          key={course.id}
          course={course}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
