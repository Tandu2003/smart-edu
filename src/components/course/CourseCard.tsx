import { Clock, Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

import React, { memo, useCallback, useMemo } from 'react';

import LazyImage from '@/components/ui/LazyImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';

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

const CourseCard = memo(function CourseCard({
  course,
  onToggleFavorite,
  onViewDetails,
}: CourseCardProps) {
  const { isFavorite } = useFavorites();

  const isCourseFavorite = useMemo(() => isFavorite(course.id), [isFavorite, course.id]);

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleFavorite(course.id);

      if (isCourseFavorite) {
        toast.success('Đã xóa khỏi danh sách yêu thích');
      } else {
        toast.success('Đã thêm vào danh sách yêu thích');
      }
    },
    [course.id, isCourseFavorite, onToggleFavorite]
  );

  const handlePurchase = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Chức năng mua khóa học sẽ được phát triển sau!');
  }, []);

  const handleViewDetails = useCallback(() => {
    onViewDetails(course);
  }, [course, onViewDetails]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onViewDetails(course);
      }
    },
    [course, onViewDetails]
  );

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  }, []);

  const discountPercentage = useMemo(
    () =>
      course.originalPrice
        ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
        : 0,
    [course.originalPrice, course.price]
  );

  return (
    <Card
      className="overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-md rounded-2xl p-0"
      role="article"
      aria-label={`Khóa học: ${course.title} bởi ${course.instructor}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <CardHeader className="p-0 relative">
        <LazyImage
          src={course.image}
          alt={`Hình ảnh khóa học ${course.title}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200 rounded-t-2xl"
        />
        <Button
          variant="favorite"
          size="favorite"
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 z-10 ${
            isCourseFavorite
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
          aria-label={
            isCourseFavorite
              ? `Xóa ${course.title} khỏi yêu thích`
              : `Thêm ${course.title} vào yêu thích`
          }
        >
          <Heart size={16} fill={isCourseFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </Button>
        {discountPercentage > 0 && (
          <div
            className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
            aria-label={`Giảm giá ${discountPercentage}%`}
          >
            -{discountPercentage}%
          </div>
        )}
        <div
          className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded"
          aria-label={`Danh mục: ${course.category}`}
        >
          {course.category}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem] leading-tight">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
        <div className="flex items-center justify-between mb-3">
          <div
            className="flex items-center space-x-1"
            aria-label={`Đánh giá ${course.rating} sao với ${course.students} học viên`}
          >
            <Star size={14} className="text-yellow-400 fill-current" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-900">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.students})</span>
          </div>
          <div
            className="flex items-center space-x-1 text-gray-500"
            aria-label={`Thời lượng ${course.duration}`}
          >
            <Clock size={14} aria-hidden="true" />
            <span className="text-sm">{course.duration}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-gray-900">{formatPrice(course.price)}</span>
          {course.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(course.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <Button
          variant="purchase"
          onClick={handlePurchase}
          className="w-full rounded-xl"
          aria-label={`Đăng ký khóa học ${course.title} với giá ${formatPrice(course.price)}`}
        >
          <ShoppingCart size={16} className="mr-2" aria-hidden="true" />
          Đăng ký ngay
        </Button>
        <Button
          variant="details"
          onClick={handleViewDetails}
          className="w-full rounded-xl"
          aria-label={`Xem chi tiết khóa học ${course.title}`}
        >
          <Eye size={16} className="mr-2" aria-hidden="true" />
          Xem chi tiết
        </Button>
      </CardFooter>
    </Card>
  );
});

export default CourseCard;
