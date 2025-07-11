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
    const viewedCourses = JSON.parse(localStorage.getItem('smart-edu-view-history') || '[]');

    console.log('🎯 AI Behavior Analysis:', {
      favorites: favoriteCourses.length,
      viewed: viewedCourses.length,
      favoriteCategories: favoriteCourses.map((c) => c.category),
      viewedCategories: viewedCourses.map((c: any) => c.category),
    });

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

    // Simple behavior-focused scoring
    const scoredCourses = candidateCourses.map((course, index) => {
      let matchScore = 60; // Base score
      const reasons: string[] = [];

      // PRIMARY: Category from favorites/viewed (HUGE bonus)
      if (preferredCategories.includes(course.category)) {
        const categoryBonus = 35;
        matchScore += categoryBonus;

        // Check if from favorites or view history
        const fromFavorites = favoriteCategories.includes(course.category);
        const fromViewed = viewedCategories.includes(course.category);

        if (fromFavorites && fromViewed) {
          reasons.push(`💕 Đã yêu thích và xem nhiều ${course.category}`);
        } else if (fromFavorites) {
          reasons.push(`⭐ Đã yêu thích các khóa ${course.category}`);
        } else if (fromViewed) {
          reasons.push(`👀 Đã xem nhiều khóa ${course.category}`);
        }
      }

      // SECONDARY: Instructor from favorites/viewed
      if (preferredInstructors.includes(course.instructor)) {
        const instructorBonus = 20;
        matchScore += instructorBonus;

        // Check if from favorites or view history
        const fromFavorites = favoriteInstructors.includes(course.instructor);
        const fromViewed = viewedInstructors.includes(course.instructor);
        const instructorName = course.instructor.split(' ')[0];

        if (fromFavorites && fromViewed) {
          reasons.push(`🔥 Đã theo dõi và yêu thích GV ${instructorName}`);
        } else if (fromFavorites) {
          reasons.push(`💖 Đã yêu thích khóa của GV ${instructorName}`);
        } else if (fromViewed) {
          reasons.push(`📚 Đã xem khóa của GV ${instructorName}`);
        }
      }

      // BEHAVIOR: Budget preference từ favorites
      if (favoriteCourses.length > 0 && reasons.length === 0) {
        const avgFavoritePrice =
          favoriteCourses.reduce((sum, c) => sum + c.price, 0) / favoriteCourses.length;
        const priceDiff = Math.abs(course.price - avgFavoritePrice) / avgFavoritePrice;
        if (priceDiff < 0.2) {
          matchScore += 15;
          const avgPriceK = Math.round(avgFavoritePrice / 1000);
          reasons.push(`💰 Giá như khóa đã yêu thích (~${avgPriceK}K)`);
        }
      }

      // BEHAVIOR: Learning level pattern từ favorites
      if (favoriteCourses.length > 0 && reasons.length === 0) {
        const favoriteLevels = favoriteCourses.map((c) => c.level || 'Beginner');
        const mostCommonLevel = favoriteLevels.reduce((a, b, _i, arr) =>
          arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length ? a : b
        );

        if (course.level === mostCommonLevel) {
          matchScore += 10;
          const levelMap: { [key: string]: string } = {
            Beginner: 'Cơ bản',
            Intermediate: 'Trung cấp',
            Advanced: 'Nâng cao',
          };
          reasons.push(`🎯 Cùng level ${levelMap[mostCommonLevel] || mostCommonLevel} đã học`);
        }
      }

      // BEHAVIOR: Instructor từ view history (nếu chưa có reason)
      if (viewedInstructors.length > 0 && reasons.length === 0) {
        if (viewedInstructors.includes(course.instructor)) {
          matchScore += 12;
          reasons.push(`📖 Đã xem khóa của ${course.instructor.split(' ')[0]}`);
        }
      }

      // FALLBACK: Nếu không có behavior data, gợi ý dựa trên quality
      if (reasons.length === 0) {
        if (favoriteCourses.length === 0 && viewedCourses.length === 0) {
          // User mới hoàn toàn - suggest popular/quality courses
          if (course.rating >= 4.5 && course.students > 1000) {
            matchScore += 8;
            reasons.push(`🌟 Khóa hot dành cho người mới bắt đầu`);
          } else if (course.rating >= 4.5) {
            matchScore += 6;
            reasons.push(`⭐ Đánh giá xuất sắc ${course.rating}/5`);
          } else if (course.students > 1500) {
            matchScore += 5;
            reasons.push(`👥 ${course.students} học viên đã tham gia`);
          } else {
            reasons.push(`📚 Khóa học chất lượng được đề xuất`);
          }
        } else {
          // Có behavior nhưng course này không match → suggest diversity
          if (course.rating >= 4.5) {
            matchScore += 5;
            reasons.push(`🔄 Mở rộng thêm lĩnh vực mới (${course.rating}⭐)`);
          } else if (course.price < 300000) {
            matchScore += 4;
            reasons.push(`💝 Gợi ý mới với giá tốt`);
          } else {
            reasons.push(`🎨 Khám phá lĩnh vực ${course.category}`);
          }
        }
      }

      // Show only the first/main reason
      const finalReason = reasons[0] || '📚 Khóa học chất lượng';

      // Simple variation to avoid ties
      const finalScore = matchScore + index * 0.2;

      return {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        price: course.price,
        image: course.image,
        reason: finalReason,
        matchScore: finalScore,
        category: course.category,
        level: course.level || 'Beginner',
      };
    });

    // Sort by match score and get top candidates
    const sortedCourses = scoredCourses.sort((a, b) => b.matchScore - a.matchScore);

    // Ensure we have at least 4 suggestions
    let finalSuggestions = sortedCourses.slice(0, 4);

    // If not enough courses, add popular ones to reach 4
    if (finalSuggestions.length < 4) {
      const remainingNeeded = 4 - finalSuggestions.length;
      const usedIds = new Set(finalSuggestions.map((s: SuggestedCourse) => s.id));

      const popularCourses = coursesWithFavorites
        .filter((course) => !usedIds.has(course.id))
        .sort((a, b) => b.rating * b.students - a.rating * a.students)
        .slice(0, remainingNeeded)
        .map((course) => ({
          id: course.id,
          title: course.title,
          instructor: course.instructor,
          price: course.price,
          image: course.image,
          reason: '🔥 Khóa học phổ biến được nhiều người yêu thích',
          matchScore: 75,
          category: course.category,
          level: course.level || 'Beginner',
        }));

      finalSuggestions = [...finalSuggestions, ...popularCourses];
    }

    // Ensure exactly 4 suggestions before adjusting scores
    finalSuggestions = finalSuggestions.slice(0, 4);

    // Adjust scores to ensure realistic percentage (75-95%) with 5-point differences
    const adjustedSuggestions = finalSuggestions.map((suggestion, index) => {
      // Cap maximum at 95% to be realistic, minimum 75%
      const maxScore = 95;
      const minScore = 75;

      // 5-point decreasing differences: 95, 90, 85, 80 (or 90, 85, 80, 75)
      const adjustedScore = Math.max(maxScore - index * 5, minScore);

      return {
        ...suggestion,
        matchScore: adjustedScore,
      };
    });

    return adjustedSuggestions;
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
