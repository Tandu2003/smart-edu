import { Clock, Eye, Heart, ShoppingCart, Star } from 'lucide-react';
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

interface CourseListItemProps {
  course: Course;
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
}

export default function CourseListItem({
  course,
  onToggleFavorite,
  onViewDetails,
}: CourseListItemProps) {
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

  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Chức năng mua khóa học sẽ được phát triển sau!');
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
    <div className="card p-6 hover:shadow-lg hover:rounded-xl transition-all duration-300 group">
      <div className="flex space-x-6">
        {/* Course Image with Badges */}
        <div className="relative flex-shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-48 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
          />
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 z-10 ${
              course.isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart size={16} fill={course.isFavorite ? 'currentColor' : 'none'} />
          </button>
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
            {course.category}
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-lg">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

          {/* Rating and Duration */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="font-medium text-gray-900">{course.rating}</span>
              <span>({course.students} học viên)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">{formatPrice(course.price)}</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons - Vertical Layout */}
        <div className="flex flex-col space-y-3 flex-shrink-0">
          <button
            onClick={handlePurchase}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-sm py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center whitespace-nowrap"
          >
            <ShoppingCart size={16} className="mr-2" />
            Đăng ký ngay
          </button>
          <button
            onClick={() => onViewDetails(course)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center whitespace-nowrap"
          >
            <Eye size={16} className="mr-2" />
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
