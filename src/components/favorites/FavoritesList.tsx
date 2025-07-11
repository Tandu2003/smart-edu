import FavoriteCourseItem from './FavoriteCourseItem';

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

interface FavoritesListProps {
  courses: Course[];
  formatPrice: (price: number) => string;
  onViewDetails: (course: Course) => void;
  onRemove: (courseId: string) => void;
}

export default function FavoritesList({
  courses,
  formatPrice,
  onViewDetails,
  onRemove,
}: FavoritesListProps) {
  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <FavoriteCourseItem
          key={course.id}
          course={course}
          formatPrice={formatPrice}
          onViewDetails={onViewDetails}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
