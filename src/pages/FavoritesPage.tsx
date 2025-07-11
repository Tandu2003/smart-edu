import { toast } from 'sonner';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockFavoriteCourses } from '@/assets/data/mockFavorites';
import CourseModal from '@/components/course/CourseModal';
import FavoritesBulkActions from '@/components/favorites/FavoritesBulkActions';
import FavoritesEmptyState from '@/components/favorites/FavoritesEmptyState';
import FavoritesHeader from '@/components/favorites/FavoritesHeader';
import FavoritesList from '@/components/favorites/FavoritesList';
import FavoritesStats from '@/components/favorites/FavoritesStats';

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
  const [favoriteCourses, setFavoriteCourses] = useState<Course[]>(mockFavoriteCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeFromFavorites = (courseId: string) => {
    setFavoriteCourses((prev) => prev.filter((course) => course.id !== courseId));
    toast.success('Đã xóa khỏi danh sách yêu thích');
  };

  const removeAllFavorites = () => {
    setFavoriteCourses([]);
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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleExploreCourses = () => {
    navigate('/courses');
  };

  const handleViewFeatured = () => {
    navigate('/#featured-courses');
  };

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
          <FavoritesList
            courses={favoriteCourses}
            formatPrice={formatPrice}
            onViewDetails={handleViewDetails}
            onRemove={removeFromFavorites}
          />
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
      />
    </div>
  );
}
