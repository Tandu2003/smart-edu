import CourseCard from './CourseCard';
import CourseListItem from './CourseListItem';

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
}

export default function CourseList({
  courses,
  viewMode,
  onToggleFavorite,
  onViewDetails,
}: CourseListProps) {
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
