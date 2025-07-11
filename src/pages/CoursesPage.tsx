import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { mockCourses, priceRanges } from '@/assets/data/mockCourses';
import CourseFilters from '@/components/course/CourseFilters';
import CourseHeader from '@/components/course/CourseHeader';
import CourseList from '@/components/course/CourseList';
import CourseModal from '@/components/course/CourseModal';
import NoResults from '@/components/course/NoResults';
import PaginationWrapper from '@/components/course/PaginationWrapper';

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

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Get values from URL params with defaults
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'Tất cả';
  const selectedPriceRange = parseInt(searchParams.get('priceRange') || '0');
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid';
  const currentPage = parseInt(searchParams.get('page') || '1');
  const showFilters = searchParams.get('filters') === 'true';

  const itemsPerPage = 12; // Show 12 courses per page

  // Initialize courses with loading delay
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 400);
  }, []);

  // Filter courses when dependencies change
  useEffect(() => {
    let filtered = courses;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    // Filter by price range
    const priceRange = priceRanges[selectedPriceRange];
    if (priceRange) {
      filtered = filtered.filter(
        (course) => course.price >= priceRange.min && course.price <= priceRange.max
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedCategory, selectedPriceRange]);

  // Update URL params helper
  const updateSearchParams = (updates: Record<string, string | number | boolean | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 0 || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change but keep other params
  useEffect(() => {
    if (currentPage > 1 && filteredCourses.length <= (currentPage - 1) * itemsPerPage) {
      updateSearchParams({ page: null });
    }
  }, [filteredCourses.length, currentPage]);

  const toggleFavorite = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, isFavorite: !course.isFavorite } : course
      )
    );
  };

  const handleSearchChange = (query: string) => {
    updateSearchParams({ search: query, page: null });
  };

  const handleCategoryChange = (category: string) => {
    updateSearchParams({ category: category === 'Tất cả' ? null : category, page: null });
  };

  const handlePriceRangeChange = (priceRange: number) => {
    updateSearchParams({ priceRange: priceRange === 0 ? null : priceRange, page: null });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    updateSearchParams({ view: mode === 'grid' ? null : mode });
  };

  const handleToggleFilters = () => {
    updateSearchParams({ filters: !showFilters ? true : null });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

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

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page === 1 ? null : page });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseHeader />

        <CourseFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={handlePriceRangeChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          showFilters={showFilters}
          onToggleFilters={handleToggleFilters}
          onClearFilters={clearFilters}
        />

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold">{filteredCourses.length}</span> khóa học
              {searchQuery && (
                <span className="ml-2 text-sm">
                  cho "<span className="font-medium">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>
        )}

        {/* Courses List */}
        {!isLoading && filteredCourses.length > 0 ? (
          <>
            <CourseList
              courses={currentCourses}
              viewMode={viewMode}
              onToggleFavorite={toggleFavorite}
              onViewDetails={handleViewDetails}
              isLoading={false}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <PaginationWrapper
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredCourses.length}
                />
              </div>
            )}
          </>
        ) : !isLoading && filteredCourses.length === 0 ? (
          <NoResults onClearFilters={clearFilters} />
        ) : (
          <CourseList
            courses={[]}
            viewMode={viewMode}
            onToggleFavorite={toggleFavorite}
            onViewDetails={handleViewDetails}
            isLoading={true}
            skeletonCount={12}
          />
        )}
      </div>

      {/* Course Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={toggleFavorite}
        isLoading={isModalLoading}
      />
    </div>
  );
}
