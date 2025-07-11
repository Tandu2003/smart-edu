import { Clock, Eye, Trash2 } from 'lucide-react';

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Course } from '@/assets/data/mockCourses';
import CourseModal from '@/components/course/CourseModal';
import PaginationWrapper from '@/components/course/PaginationWrapper';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useViewHistory } from '@/contexts/ViewHistoryContext';

export default function ViewHistoryPage() {
  const navigate = useNavigate();
  const { viewHistory, removeFromViewHistory, clearViewHistory, addToViewHistory } =
    useViewHistory();
  const { toggleFavorite } = useFavorites();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleViewDetails = (course: Course) => {
    // Add to view history when user opens course details (moves to top)
    addToViewHistory(course);

    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsModalLoading(true);

    setTimeout(() => {
      setIsModalLoading(false);
    }, 400);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalLoading(false);
    setSelectedCourse(null);
  };

  const handleRemoveFromHistory = (courseId: string) => {
    removeFromViewHistory(courseId);
    // Reset to first page if current page becomes empty
    if (paginatedHistory.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClearAllHistory = () => {
    clearViewHistory();
    setCurrentPage(1);
  };

  const handleExploreCourses = () => {
    navigate('/courses');
  };

  const handleViewFeatured = () => {
    navigate('/#featured-courses');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatViewedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  // Pagination logic
  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return viewHistory.slice(startIndex, endIndex);
  }, [viewHistory, currentPage]);

  const totalPages = Math.ceil(viewHistory.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (courseId: string) => {
    const course = viewHistory.find((c) => c.id === courseId);
    if (course) {
      toggleFavorite(course);
    }
  };

  if (viewHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Lịch sử xem</h1>
            <p className="text-gray-600">Theo dõi những khóa học bạn đã xem</p>
          </div>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="text-gray-400" size={48} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Chưa có lịch sử xem</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Bạn chưa xem chi tiết khóa học nào. Hãy khám phá và xem chi tiết các khóa học bạn quan
              tâm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleExploreCourses}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Khám phá khóa học
              </Button>
              <Button
                variant="outline"
                onClick={handleViewFeatured}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold py-2 px-6 rounded-lg"
              >
                Xem khóa học nổi bật
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Lịch sử xem</h1>
            <Button
              variant="outline"
              onClick={handleClearAllHistory}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            >
              <Trash2 size={16} className="mr-2" />
              Xóa tất cả
            </Button>
          </div>
          <p className="text-gray-600">Bạn đã xem {viewHistory.length} khóa học gần đây</p>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {paginatedHistory.map((course) => {
            const discountPercentage = course.originalPrice
              ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
              : 0;

            return (
              <div key={course.id} className="card p-6">
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
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {course.category}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">⭐ {course.rating}</span>
                        <span>({course.students} học viên)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(course.price)}
                      </span>
                      {course.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(course.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Viewed time */}
                    <div className="text-sm text-gray-500 mb-4">
                      <Clock size={14} className="inline mr-1" />
                      Đã xem {formatViewedTime((course as any).viewedAt)}
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => handleViewDetails(course)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm py-2 px-4 rounded-lg flex items-center"
                      >
                        <Eye size={16} className="mr-2" />
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveFromHistory(course.id)}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 flex items-center"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Xóa khỏi lịch sử
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <PaginationWrapper
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={viewHistory.length}
            />
          </div>
        )}
      </div>

      {/* Course Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
        isLoading={isModalLoading}
      />
    </div>
  );
}
