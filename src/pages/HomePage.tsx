import { ArrowRight, Play } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { mockCourses } from '@/assets/data/mockCourses';
import CourseCard from '@/components/course/CourseCard';
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton';
import CourseModal from '@/components/course/CourseModal';
import { useViewHistory } from '@/contexts/ViewHistoryContext';

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

export default function HomePage() {
  const location = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const { addToViewHistory } = useViewHistory();

  // Initialize courses with loading delay
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 400);
  }, []);

  // Calculate real statistics from course data
  const statistics = useMemo(() => {
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
    const uniqueInstructors = new Set(courses.map((course) => course.instructor)).size;
    const averageRating =
      courses.length > 0
        ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
        : '0.0';

    return {
      totalCourses,
      totalStudents,
      uniqueInstructors,
      averageRating,
    };
  }, [courses]);

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          const headerHeight = 20;
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementTop - headerHeight - 20, // 20px extra spacing
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [location.hash]);

  // Get featured courses (top 8 by rating and students)
  const featuredCourses = courses
    .sort((a, b) => {
      // Sort by rating first, then by number of students
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.students - a.students;
    })
    .slice(0, 8);

  const toggleFavorite = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, isFavorite: !course.isFavorite } : course
      )
    );
  };

  const handleViewDetails = (course: Course) => {
    // Add to view history
    addToViewHistory(course);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Học tập thông minh với <span className="text-yellow-300">AI</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Khám phá hàng nghìn khóa học chất lượng cao với gợi ý thông minh từ AI, giúp bạn tìm
              ra con đường học tập phù hợp nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Khám phá khóa học
              </Link>
              <button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                <Play className="inline mr-2" size={20} />
                Xem demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {statistics.totalCourses.toLocaleString()}+
              </div>
              <div className="text-gray-600">Khóa học</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {statistics.totalStudents.toLocaleString()}+
              </div>
              <div className="text-gray-600">Học viên</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {statistics.uniqueInstructors}+
              </div>
              <div className="text-gray-600">Giảng viên</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {statistics.averageRating}
              </div>
              <div className="text-gray-600">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="featured-courses" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Khóa học nổi bật</h2>
              <p className="text-gray-600">Những khóa học được yêu thích nhất</p>
            </div>
            <Link
              to="/courses"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Xem tất cả
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? [...Array(8)].map((_, index) => <CourseCardSkeleton key={index} />)
              : featuredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onToggleFavorite={toggleFavorite}
                    onViewDetails={handleViewDetails}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục khóa học</h2>
            <p className="text-lg text-gray-600">Chọn lĩnh vực bạn quan tâm</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Lập trình', icon: '💻', count: '2,500+' },
              { name: 'Ngoại ngữ', icon: '🌍', count: '1,800+' },
              { name: 'Marketing', icon: '📈', count: '1,200+' },
              { name: 'Thiết kế', icon: '🎨', count: '900+' },
              { name: 'Kinh doanh', icon: '💼', count: '1,500+' },
              { name: 'Âm nhạc', icon: '🎵', count: '600+' },
              { name: 'Sức khỏe', icon: '🏃‍♂️', count: '400+' },
              { name: 'Khác', icon: '📚', count: '1,000+' },
            ].map((category, index) => (
              <Link
                key={index}
                to={`/courses?category=${encodeURIComponent(category.name)}`}
                className="card p-6 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} khóa học</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
