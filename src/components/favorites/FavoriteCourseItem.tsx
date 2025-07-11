import { Eye, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

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

interface FavoriteCourseItemProps {
  course: Course;
  formatPrice: (price: number) => string;
  onViewDetails: (course: Course) => void;
  onRemove: (courseId: string) => void;
}

export default function FavoriteCourseItem({
  course,
  formatPrice,
  onViewDetails,
  onRemove,
}: FavoriteCourseItemProps) {
  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Course Image */}
        <div className="relative lg:w-64 lg:flex-shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 lg:h-32 object-cover rounded-lg"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">Giảng viên: {course.instructor}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center">
                  ⭐ {course.rating} ({course.students} học viên)
                </span>
                <span>⏱️ {course.duration}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {course.category}
                </span>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={() => onViewDetails(course)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center"
              >
                <Eye size={16} className="mr-2" />
                Xem chi tiết
              </Button>
              <Button
                variant="outline"
                onClick={() => onRemove(course.id)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 flex items-center"
              >
                <Trash2 size={16} className="mr-2" />
                Xóa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
