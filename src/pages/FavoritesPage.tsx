import { toast } from 'sonner';

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockFavoriteCourses } from '@/assets/data/mockFavorites';
import CourseModal from '@/components/course/CourseModal';
import PaginationWrapper from '@/components/course/PaginationWrapper';
import FavoriteCourseItemSkeleton from '@/components/favorites/FavoriteCourseItemSkeleton';
import FavoritesBulkActions from '@/components/favorites/FavoritesBulkActions';
import FavoritesEmptyState from '@/components/favorites/FavoritesEmptyState';
import FavoritesHeader from '@/components/favorites/FavoritesHeader';
import FavoritesList from '@/components/favorites/FavoritesList';
import FavoritesStats from '@/components/favorites/FavoritesStats';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favoriteCourses, setFavoriteCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Initialize favorites with loading delay
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFavoriteCourses(mockFavoriteCourses);
      setIsLoading(false);
    }, 400);
  }, []);

  const removeFromFavorites = (courseId: string) => {
    setFavoriteCourses((prev) => prev.filter((course) => course.id !== courseId));
    // Reset to first page if current page becomes empty
    if (paginatedCourses.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    toast.success('Đã xóa khỏi danh sách yêu thích');
  };

  const removeAllFavorites = () => {
    setFavoriteCourses([]);
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

  const totalValue = favoriteCourses.reduce((sum, course) => sum + course.price, 0);
  const totalOriginalValue = favoriteCourses.reduce(
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
    return favoriteCourses.slice(startIndex, endIndex);
  }, [favoriteCourses, currentPage]);

  const totalPages = Math.ceil(favoriteCourses.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of the list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FavoritesHeader />

          {/* FavoritesStats Skeleton */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            </div>
          </div>

          {/* FavoritesList Skeleton */}
          <div className="space-y-6">
            {[...Array(6)].map((_, index) => (
              <FavoriteCourseItemSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FavoritesHeader />

        {favoriteCourses.length > 0 && (
          <FavoritesStats
            count={favoriteCourses.length}
            totalValue={totalValue}
            totalSavings={totalSavings}
            totalOriginalValue={totalOriginalValue}
            formatPrice={formatPrice}
          />
        )}

        {favoriteCourses.length > 0 ? (
          <>
            <FavoritesList
              courses={paginatedCourses}
              formatPrice={formatPrice}
              onViewDetails={handleViewDetails}
              onRemove={removeFromFavorites}
            />

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <PaginationWrapper
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={favoriteCourses.length}
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

        {favoriteCourses.length > 0 && (
          <FavoritesBulkActions
            count={favoriteCourses.length}
            totalValue={totalValue}
            formatPrice={formatPrice}
            onRemoveAll={removeAllFavorites}
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
          removeFromFavorites(courseId);
        }}
        isLoading={isModalLoading}
      />
    </div>
  );
}
