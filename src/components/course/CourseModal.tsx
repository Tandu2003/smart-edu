import { CheckCircle, Clock, Heart, Play, Share2, Star, Users, X } from 'lucide-react';
import { toast } from 'sonner';

import { courseDetails } from '@/assets/data/mockCourseDetails';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
}

export default function CourseModal({
  course,
  isOpen,
  onClose,
  onToggleFavorite,
}: CourseModalProps) {
  if (!course) return null;

  // Get course details from the new structure
  const courseDetail = courseDetails[course.id];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const handleToggleFavorite = () => {
    onToggleFavorite(course.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `Khám phá khóa học: ${course.title}`,
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

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="!max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-0">
        <DialogHeader className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">{course.title}</DialogTitle>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full transition-all ${
                  course.isFavorite
                    ? 'text-red-500 bg-red-50'
                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart size={20} fill={course.isFavorite ? 'currentColor' : 'none'} />
              </button>
              <DialogClose asChild>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6">
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
                <button className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all">
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
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
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
                <button
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center mb-3"
                >
                  Đăng ký ngay
                </button>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
