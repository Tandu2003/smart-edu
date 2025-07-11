import { Clock, Eye, Heart, Star } from 'lucide-react';
import { toast } from 'sonner';

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

interface CourseCardProps {
  course: Course;
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
}

export default function CourseCard({ course, onToggleFavorite, onViewDetails }: CourseCardProps) {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(course.id);

    if (course.isFavorite) {
      toast.success('Đã xóa khỏi danh sách yêu thích');
    } else {
      toast.success('Đã thêm vào danh sách yêu thích');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="card overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-md rounded-2xl">
      {/* Course Image */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200 rounded-t-2xl"
        />

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            course.isFavorite
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart size={16} fill={course.isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
          {course.category}
        </div>
      </div>

      {/* Course Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem] leading-tight">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

        {/* Rating and Students */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.students})</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock size={14} />
            <span className="text-sm">{course.duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-gray-900">{formatPrice(course.price)}</span>
          {course.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(course.originalPrice)}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(course)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center"
        >
          <Eye size={16} className="mr-2" />
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
