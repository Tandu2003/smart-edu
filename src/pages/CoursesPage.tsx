import { useEffect, useState } from 'react';

import { mockCourses, priceRanges } from '@/assets/data/mockCourses';
import CourseFilters from '@/components/course/CourseFilters';
import CourseHeader from '@/components/course/CourseHeader';
import CourseList from '@/components/course/CourseList';
import CourseModal from '@/components/course/CourseModal';
import NoResults from '@/components/course/NoResults';

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
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleFavorite = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, isFavorite: !course.isFavorite } : course
      )
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tất cả');
    setSelectedPriceRange(0);
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseHeader />

        <CourseFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={setSelectedPriceRange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredCourses.length}</span> khóa học
          </p>
        </div>

        {/* Courses List */}
        {filteredCourses.length > 0 ? (
          <CourseList
            courses={filteredCourses}
            viewMode={viewMode}
            onToggleFavorite={toggleFavorite}
            onViewDetails={handleViewDetails}
          />
        ) : (
          <NoResults onClearFilters={clearFilters} />
        )}
      </div>

      {/* Course Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
