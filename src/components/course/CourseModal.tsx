import { CheckCircle, Clock, Heart, Play, Share2, Star, Users, X } from 'lucide-react';
import { toast } from 'sonner';

import { courseDetails } from '@/assets/data/mockCourseDetails';

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
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Modal */}
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
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
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Bạn sẽ học được gì?
                      </h3>
                      <ul className="space-y-2">
                        {courseDetail.whatYouWillLearn.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle
                              className="text-green-500 mt-0.5 flex-shrink-0"
                              size={16}
                            />
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Nội dung khóa học
                      </h3>
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Đánh giá từ học viên
                      </h3>
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
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                            <p className="text-gray-400 text-xs mt-2">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fallback for courses without detailed info */}
                  {!courseDetail && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả khóa học</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Khóa học {course.title} được thiết kế để cung cấp kiến thức toàn diện và
                          thực tế. Bạn sẽ được học từ cơ bản đến nâng cao với các bài tập thực hành
                          và dự án thực tế.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Thông tin khóa học
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cấp độ:</span>
                            <span className="font-medium">{course.level || 'Cơ bản'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ngôn ngữ:</span>
                            <span className="font-medium">{course.language || 'Tiếng Việt'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Chứng chỉ:</span>
                            <span className="font-medium">
                              {course.certificate ? 'Có' : 'Không'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cập nhật:</span>
                            <span className="font-medium">{course.lastUpdated || 'Gần đây'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Purchase Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <div className="card p-6">
                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-3xl font-bold text-gray-900">
                            {formatPrice(course.price)}
                          </span>
                          {course.originalPrice && (
                            <span className="text-xl text-gray-500 line-through">
                              {formatPrice(course.originalPrice)}
                            </span>
                          )}
                        </div>
                        {discountPercentage > 0 && (
                          <span className="text-green-600 font-medium">
                            Tiết kiệm {formatPrice(course.originalPrice! - course.price)} (
                            {discountPercentage}%)
                          </span>
                        )}
                      </div>

                      {/* Purchase Button */}
                      <button
                        onClick={handlePurchase}
                        className="w-full btn-primary text-lg py-3 mb-4"
                      >
                        Mua khóa học ngay
                      </button>

                      {/* Guarantee */}
                      <div className="text-center text-sm text-gray-600 mb-4">
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <CheckCircle className="text-green-500" size={16} />
                          <span>30 ngày hoàn tiền</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <CheckCircle className="text-green-500" size={16} />
                          <span>Truy cập trọn đời</span>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Thời lượng:</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Học viên:</span>
                          <span className="font-medium">{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Đánh giá:</span>
                          <span className="font-medium">⭐ {course.rating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Danh mục:</span>
                          <span className="font-medium">{course.category}</span>
                        </div>
                        {course.level && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cấp độ:</span>
                            <span className="font-medium">{course.level}</span>
                          </div>
                        )}
                        {course.language && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ngôn ngữ:</span>
                            <span className="font-medium">{course.language}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
