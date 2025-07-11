import { CheckCircle, Clock, Heart, Play, Share2, Star, Users, X } from 'lucide-react';
import { toast } from 'sonner';

import { courseDetails } from '@/assets/data/mockCourseDetails';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
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
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  language?: string;
  lastUpdated?: string;
  certificate?: boolean;
}

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (courseId: string) => void;
  isLoading?: boolean;
}

export default function CourseModal({
  course,
  isOpen,
  onClose,
  onToggleFavorite,
  isLoading = false,
}: CourseModalProps) {
  // Get course details from the new structure
  const courseDetail = course ? courseDetails[course.id] : null;
  const { isFavorite } = useFavorites();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const discountPercentage =
    course && course.originalPrice
      ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
      : 0;

  const handleToggleFavorite = () => {
    if (course) {
      onToggleFavorite(course.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course?.title || '',
        text: `Khám phá khóa học: ${course?.title || ''}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Đã sao chép link vào clipboard');
    }
  };

  const handlePurchase = () => {
    toast.success('Chức năng mua khóa học sẽ được phát triển sau!');
  };

  // Skeleton content
  const renderSkeletonContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Course Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Course Image */}
        <div className="relative">
          <Skeleton className="w-full h-64 lg:h-80 rounded-lg" />
          <Skeleton className="absolute top-4 left-4 w-16 h-8 rounded" />
          <Skeleton className="absolute top-4 right-4 w-12 h-12 rounded-full" />
        </div>

        {/* Course Stats */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Description */}
        <div>
          <Skeleton className="h-6 w-32 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* What You Will Learn */}
        <div>
          <Skeleton className="h-6 w-40 mb-3" />
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Skeleton className="w-4 h-4 mt-0.5 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <Skeleton className="h-6 w-24 mb-3" />
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Skeleton className="w-4 h-4 mt-0.5 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum */}
        <div>
          <Skeleton className="h-6 w-36 mb-3" />
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <Skeleton className="h-6 w-44 mb-3" />
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-3 h-3" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Purchase */}
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="flex items-center mb-4">
            <Skeleton className="h-8 w-24 mr-2" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="w-full h-12 rounded-xl mb-3" />
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex">
                <Skeleton className="h-4 w-20 mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Real content
  const renderRealContent = () => {
    if (!course) return null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Course Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Image */}
          <div className="relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded">
                -{discountPercentage}%
              </div>
            )}
            <button className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all cursor-pointer">
              <Play size={20} />
            </button>
          </div>
          {/* Course Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="font-medium">{course.rating}</span>
              <span>({course.students} học viên)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{course.students} học viên đã đăng ký</span>
            </div>
          </div>
          {/* Description */}
          {courseDetail && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả khóa học</h3>
              <p className="text-gray-600 leading-relaxed">{courseDetail.description}</p>
            </div>
          )}
          {/* What You Will Learn */}
          {courseDetail && courseDetail.whatYouWillLearn && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bạn sẽ học được gì?</h3>
              <ul className="space-y-2">
                {courseDetail.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Requirements */}
          {courseDetail && courseDetail.requirements && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Yêu cầu</h3>
              <ul className="space-y-2">
                {courseDetail.requirements.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Curriculum */}
          {courseDetail && courseDetail.curriculum && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Nội dung khóa học</h3>
              <div className="space-y-3">
                {courseDetail.curriculum.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{section.title}</h4>
                      <div className="text-sm text-gray-500">
                        {section.lessons} bài học • {section.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Reviews */}
          {courseDetail && courseDetail.reviews && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Đánh giá từ học viên</h3>
              <div className="space-y-4">
                {courseDetail.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{review.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Right Column - Purchase */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900 mr-2">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>
            <Button variant="purchase" onClick={handlePurchase} className="w-full rounded-xl mb-3">
              Đăng ký ngay
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="text-green-500" size={16} />
              <span>Học mọi lúc, mọi nơi</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="text-green-500" size={16} />
              <span>Chứng chỉ hoàn thành</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="text-green-500" size={16} />
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Thông tin khóa học</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <b>Giảng viên:</b> {course.instructor}
              </li>
              {course.level && (
                <li>
                  <b>Trình độ:</b> {course.level}
                </li>
              )}
              {course.language && (
                <li>
                  <b>Ngôn ngữ:</b> {course.language}
                </li>
              )}
              {course.lastUpdated && (
                <li>
                  <b>Cập nhật:</b> {course.lastUpdated}
                </li>
              )}
              {course.certificate && (
                <li>
                  <b>Chứng chỉ:</b> Có
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="!max-w-4xl w-full h-[90vh] flex flex-col rounded-xl p-0">
        <DialogHeader className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl z-10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {isLoading ? <Skeleton className="h-8 w-80" /> : course?.title}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              {isLoading ? (
                <>
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Share2 size={20} />
                  </Button>
                  <Button
                    variant="favorite"
                    size="icon"
                    onClick={handleToggleFavorite}
                    className={`${
                      course && isFavorite(course.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={course && isFavorite(course.id) ? 'currentColor' : 'none'}
                    />
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <X size={20} />
                    </Button>
                  </DialogClose>
                </>
              )}
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? renderSkeletonContent() : renderRealContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
