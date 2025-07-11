import { toast } from 'sonner';

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Course } from '@/assets/data/mockCourses';
import CourseModal from '@/components/course/CourseModal';
import PaginationWrapper from '@/components/course/PaginationWrapper';
import FavoritesBulkActions from '@/components/favorites/FavoritesBulkActions';
import FavoritesEmptyState from '@/components/favorites/FavoritesEmptyState';
import FavoritesHeader from '@/components/favorites/FavoritesHeader';
import FavoritesList from '@/components/favorites/FavoritesList';
import FavoritesStats from '@/components/favorites/FavoritesStats';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, clearAllFavorites, toggleFavorite } = useFavorites();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleRemoveFromFavorites = (courseId: string) => {
    removeFromFavorites(courseId);
    // Reset to first page if current page becomes empty
    if (paginatedCourses.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    toast.success('Đã xóa khỏi danh sách yêu thích');
  };

  const handleRemoveAllFavorites = () => {
    clearAllFavorites();
    setCurrentPage(1);
    toast.success('Đã xóa tất cả khỏi danh sách yêu thích');
  };

  const buyAllFavorites = () => {
    toast.success('Chức năng mua tất cả sẽ được phát triển sau!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const totalValue = favorites.reduce((sum, course) => sum + course.price, 0);
  const totalOriginalValue = favorites.reduce(
    (sum, course) => sum + (course.originalPrice || course.price),
    0
  );
  const totalSavings = totalOriginalValue - totalValue;

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsModalLoading(true);

    // Simulate loading delay for modal content
    setTimeout(() => {
      setIsModalLoading(false);
    }, 400);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalLoading(false);
    setSelectedCourse(null);
  };

  const handleExploreCourses = () => {
    navigate('/courses');
  };

  const handleViewFeatured = () => {
    navigate('/#featured-courses');
  };

  // Pagination logic
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return favorites.slice(startIndex, endIndex);
  }, [favorites, currentPage]);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of the list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FavoritesHeader />

        {favorites.length > 0 && (
          <FavoritesStats
            count={favorites.length}
            totalValue={totalValue}
            totalSavings={totalSavings}
            totalOriginalValue={totalOriginalValue}
            formatPrice={formatPrice}
          />
        )}

        {favorites.length > 0 ? (
          <>
            <FavoritesList
              courses={paginatedCourses}
              formatPrice={formatPrice}
              onViewDetails={handleViewDetails}
              onRemove={handleRemoveFromFavorites}
            />

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <PaginationWrapper
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={favorites.length}
                />
              </div>
            )}
          </>
        ) : (
          <FavoritesEmptyState
            onExploreCourses={handleExploreCourses}
            onViewFeatured={handleViewFeatured}
          />
        )}

        {favorites.length > 0 && (
          <FavoritesBulkActions
            count={favorites.length}
            totalValue={totalValue}
            formatPrice={formatPrice}
            onRemoveAll={handleRemoveAllFavorites}
            onBuyAll={buyAllFavorites}
          />
        )}
      </div>

      {/* Course Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={(courseId) => {
          if (selectedCourse) {
            toggleFavorite(selectedCourse);
          }
        }}
        isLoading={isModalLoading}
      />
    </div>
  );
}
