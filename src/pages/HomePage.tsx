import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { Course } from '@/assets/data/mockCourses';
import { mockCourses } from '@/assets/data/mockCourses';
import CourseModal from '@/components/course/CourseModal';
import AISuggestionsSection from '@/components/home/AISuggestionsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedCoursesSection from '@/components/home/FeaturedCoursesSection';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useViewHistory } from '@/contexts/ViewHistoryContext';
import type { Statistics, SuggestedCourse } from '@/types';

export default function HomePage() {
  const location = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToViewHistory } = useViewHistory();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedCourse[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initialize courses with loading delay
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 400);
  }, []);

  // Sync courses with favorites context
  const coursesWithFavorites = useMemo(() => {
    return courses.map((course) => ({
      ...course,
      isFavorite: isFavorite(course.id),
    }));
  }, [courses, isFavorite]);

  // Calculate real statistics from course data
  const statistics: Statistics = useMemo(() => {
    const totalCourses = coursesWithFavorites.length;
    const totalStudents = coursesWithFavorites.reduce((sum, course) => sum + course.students, 0);
    const uniqueInstructors = new Set(coursesWithFavorites.map((course) => course.instructor)).size;
    const averageRating =
      coursesWithFavorites.length > 0
        ? (
            coursesWithFavorites.reduce((sum, course) => sum + course.rating, 0) /
            coursesWithFavorites.length
          ).toFixed(1)
        : '0.0';

    return {
      totalCourses,
      totalStudents,
      uniqueInstructors,
      averageRating,
    };
  }, [coursesWithFavorites]);

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
  const featuredCourses = coursesWithFavorites
    .sort((a, b) => {
      // Sort by rating first, then by number of students
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.students - a.students;
    })
    .slice(0, 8);

  const handleToggleFavorite = (courseId: string) => {
    const course = coursesWithFavorites.find((c) => c.id === courseId);
    if (course) {
      toggleFavorite(course);
    }
  };

  const handleViewDetails = (course: Course) => {
    // Add to view history when user opens course details
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

  const handleAISuggestions = async () => {
    setIsSuggestionsLoading(true);
    setShowSuggestions(true);

    // Simulate API call to /api/suggestions?userId=xxx
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Generate suggestions based on user behavior
      const suggestedCourses = generateSmartSuggestions();
      setSuggestions(suggestedCourses);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

  const generateSmartSuggestions = (): SuggestedCourse[] => {
    // Get user behavior data
    const favoriteCourses = coursesWithFavorites.filter((course) => course.isFavorite);
    const viewedCourses = JSON.parse(localStorage.getItem('viewHistory') || '[]');

    // Analyze user preferences
    const favoriteCategories = [...new Set(favoriteCourses.map((course) => course.category))];
    const viewedCategories = [...new Set(viewedCourses.map((item: any) => item.category))];
    const preferredCategories = [...new Set([...favoriteCategories, ...viewedCategories])];

    const favoriteInstructors = [...new Set(favoriteCourses.map((course) => course.instructor))];
    const viewedInstructors = [...new Set(viewedCourses.map((item: any) => item.instructor))];
    const preferredInstructors = [...new Set([...favoriteInstructors, ...viewedInstructors])];

    // Get courses user hasn't interacted with
    const interactedCourseIds = new Set([
      ...favoriteCourses.map((c) => c.id),
      ...viewedCourses.map((item: any) => item.id),
    ]);

    const candidateCourses = coursesWithFavorites.filter(
      (course) => !interactedCourseIds.has(course.id)
    );

    // Score and rank courses
    const scoredCourses = candidateCourses.map((course) => {
      let matchScore = 60; // Base score
      let reason = 'Khóa học phù hợp với sở thích của bạn';

      // Category matching (high weight)
      if (preferredCategories.includes(course.category)) {
        matchScore += 25;
        reason = `Bạn đã quan tâm đến ${course.category}`;
      }

      // Instructor matching (medium weight)
      if (preferredInstructors.includes(course.instructor)) {
        matchScore += 15;
        reason = `Giảng viên ${course.instructor} mà bạn đã theo dõi`;
      }

      // High rating bonus (low weight)
      if (course.rating >= 4.5) {
        matchScore += 10;
      }

      // Popular course bonus (low weight)
      if (course.students > 1000) {
        matchScore += 5;
      }

      // Price range preference (if user has favorites, analyze their price range)
      if (favoriteCourses.length > 0) {
        const avgFavoritePrice =
          favoriteCourses.reduce((sum, c) => sum + c.price, 0) / favoriteCourses.length;
        const priceDiff = Math.abs(course.price - avgFavoritePrice) / avgFavoritePrice;
        if (priceDiff < 0.3) {
          // Within 30% of average favorite price
          matchScore += 8;
        }
      }

      // Specific recommendations based on behavior patterns
      if (favoriteCategories.includes('Lập trình') && course.category === 'Lập trình') {
        if (
          course.title.toLowerCase().includes('react') ||
          course.title.toLowerCase().includes('javascript')
        ) {
          matchScore += 10;
          reason = 'Phù hợp với sở thích lập trình frontend của bạn';
        }
      }

      if (favoriteCategories.includes('Thiết kế') && course.category === 'Thiết kế') {
        matchScore += 10;
        reason = 'Bổ sung kỹ năng thiết kế cho portfolio của bạn';
      }

      if (favoriteCategories.includes('Marketing') && course.category === 'Kinh doanh') {
        matchScore += 8;
        reason = 'Kết hợp Marketing và Kinh doanh để phát triển toàn diện';
      }

      return {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        price: course.price,
        image: course.image,
        reason,
        matchScore: Math.min(matchScore, 99), // Cap at 99%
        category: course.category,
        level: course.level || 'Beginner',
      };
    });

    // Sort by match score and return top 3-4 suggestions
    const topSuggestions = scoredCourses
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, Math.floor(Math.random() * 2) + 3); // 3-4 suggestions

    // If no behavioral data, suggest popular courses from different categories
    if (
      topSuggestions.length === 0 ||
      (favoriteCourses.length === 0 && viewedCourses.length === 0)
    ) {
      const popularCourses = coursesWithFavorites
        .sort((a, b) => b.rating * b.students - a.rating * a.students)
        .slice(0, 4)
        .map((course) => ({
          id: course.id,
          title: course.title,
          instructor: course.instructor,
          price: course.price,
          image: course.image,
          reason: 'Khóa học phổ biến được nhiều người yêu thích',
          matchScore: 75,
          category: course.category,
          level: course.level || 'Beginner',
        }));

      return popularCourses;
    }

    return topSuggestions;
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        onAISuggestions={handleAISuggestions}
        isSuggestionsLoading={isSuggestionsLoading}
      />

      <AISuggestionsSection
        showSuggestions={showSuggestions}
        isSuggestionsLoading={isSuggestionsLoading}
        suggestions={suggestions}
        coursesWithFavorites={coursesWithFavorites}
        onToggleFavorite={handleToggleFavorite}
        onViewDetails={handleViewDetails}
      />

      <StatsSection statistics={statistics} />

      <FeaturedCoursesSection
        isLoading={isLoading}
        featuredCourses={featuredCourses}
        onToggleFavorite={handleToggleFavorite}
        onViewDetails={handleViewDetails}
      />

      <CategoriesSection />

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
