import type { SuggestedCourse } from '@/types/course';

import { mockCourses } from './mockCourses';

export interface MockAIProfile {
  userInterests: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  preferredCategories: string[];
  budget: 'Low' | 'Medium' | 'High';
  learningGoals: string[];
}

// Mock user profile for personalized recommendations
export const mockUserProfile: MockAIProfile = {
  userInterests: ['Lập trình', 'Frontend Development', 'React', 'JavaScript'],
  skillLevel: 'Intermediate',
  preferredCategories: ['Lập trình', 'Thiết kế'],
  budget: 'Medium',
  learningGoals: ['Trở thành Full-stack Developer', 'Học UI/UX Design', 'Nâng cao kỹ năng React'],
};

// Detailed AI responses based on user queries
export const mockAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Programming related queries
  if (
    lowerMessage.includes('lập trình') ||
    lowerMessage.includes('programming') ||
    lowerMessage.includes('code')
  ) {
    if (lowerMessage.includes('react') || lowerMessage.includes('frontend')) {
      return 'Tôi thấy bạn quan tâm đến React và Frontend Development! Dựa trên profile của bạn, tôi gợi ý những khóa học sau để nâng cao kỹ năng:';
    }
    if (lowerMessage.includes('backend') || lowerMessage.includes('server')) {
      return 'Backend development là bước tiếp theo tuyệt vời để trở thành Full-stack Developer. Đây là những khóa học phù hợp:';
    }
    if (lowerMessage.includes('python') || lowerMessage.includes('data')) {
      return 'Python và Data Science đang rất hot hiện nay! Tôi đã tìm thấy những khóa học chất lượng cao:';
    }
    return 'Lập trình là lĩnh vực rộng lớn và thú vị! Dựa trên sở thích của bạn, đây là những khóa học tôi khuyên nên tham gia:';
  }

  // Language learning queries
  if (
    lowerMessage.includes('tiếng anh') ||
    lowerMessage.includes('english') ||
    lowerMessage.includes('ielts')
  ) {
    if (lowerMessage.includes('giao tiếp') || lowerMessage.includes('communication')) {
      return 'Tiếng Anh giao tiếp rất quan trọng trong môi trường làm việc quốc tế. Tôi gợi ý những khóa học thực tế:';
    }
    if (lowerMessage.includes('ielts') || lowerMessage.includes('band')) {
      return 'IELTS là chứng chỉ quan trọng cho du học và công việc. Đây là những khóa học luyện thi hiệu quả:';
    }
    return 'Tiếng Anh mở ra nhiều cơ hội mới! Tôi đã chọn lọc những khóa học phù hợp với mục tiêu của bạn:';
  }

  // Marketing queries
  if (
    lowerMessage.includes('marketing') ||
    lowerMessage.includes('quảng cáo') ||
    lowerMessage.includes('facebook ads')
  ) {
    if (lowerMessage.includes('facebook') || lowerMessage.includes('social')) {
      return 'Facebook Ads là công cụ marketing mạnh mẽ! Tôi gợi ý những khóa học thực hành:';
    }
    if (lowerMessage.includes('seo') || lowerMessage.includes('google')) {
      return 'SEO và Google Ads giúp tăng khả năng hiển thị online. Đây là những khóa học chuyên sâu:';
    }
    return 'Digital Marketing đang phát triển mạnh! Tôi đã tìm thấy những khóa học toàn diện:';
  }

  // Design queries
  if (
    lowerMessage.includes('thiết kế') ||
    lowerMessage.includes('design') ||
    lowerMessage.includes('ui/ux')
  ) {
    if (lowerMessage.includes('figma') || lowerMessage.includes('ui')) {
      return 'UI/UX Design là kỹ năng quan trọng trong thời đại số! Tôi gợi ý những khóa học thực tế:';
    }
    if (lowerMessage.includes('photoshop') || lowerMessage.includes('adobe')) {
      return 'Adobe Creative Suite là bộ công cụ thiết kế mạnh mẽ. Đây là những khóa học chuyên sâu:';
    }
    return 'Thiết kế sáng tạo mở ra nhiều cơ hội nghề nghiệp! Tôi đã chọn lọc những khóa học chất lượng:';
  }

  // Business queries
  if (
    lowerMessage.includes('kinh doanh') ||
    lowerMessage.includes('business') ||
    lowerMessage.includes('startup')
  ) {
    if (lowerMessage.includes('khởi nghiệp') || lowerMessage.includes('startup')) {
      return 'Khởi nghiệp cần nhiều kỹ năng và kiến thức! Tôi gợi ý những khóa học thiết thực:';
    }
    if (lowerMessage.includes('tài chính') || lowerMessage.includes('finance')) {
      return 'Quản lý tài chính là kỹ năng quan trọng cho mọi người. Đây là những khóa học hữu ích:';
    }
    return 'Kinh doanh và quản lý mở ra nhiều cơ hội! Tôi đã tìm thấy những khóa học phù hợp:';
  }

  // Music queries
  if (
    lowerMessage.includes('âm nhạc') ||
    lowerMessage.includes('music') ||
    lowerMessage.includes('piano') ||
    lowerMessage.includes('guitar')
  ) {
    return 'Âm nhạc nuôi dưỡng tâm hồn và sáng tạo! Tôi gợi ý những khóa học từ cơ bản đến nâng cao:';
  }

  // Health queries
  if (
    lowerMessage.includes('sức khỏe') ||
    lowerMessage.includes('health') ||
    lowerMessage.includes('yoga') ||
    lowerMessage.includes('meditation')
  ) {
    return 'Sức khỏe là tài sản quý giá nhất! Tôi đã chọn lọc những khóa học tốt cho sức khỏe:';
  }

  // Default responses
  const responses = [
    'Tôi hiểu bạn đang tìm kiếm khóa học phù hợp. Dựa trên profile và sở thích của bạn, tôi gợi ý những khóa học sau:',
    'Tuyệt vời! Tôi đã phân tích yêu cầu của bạn và tìm thấy những khóa học phù hợp:',
    'Dựa trên mục tiêu học tập của bạn, đây là những khóa học tôi khuyên nên tham gia:',
    'Tôi đã tìm kiếm và chọn lọc những khóa học chất lượng cao phù hợp với bạn:',
    'Cảm ơn bạn đã chia sẻ! Tôi gợi ý những khóa học sau để đạt được mục tiêu của bạn:',
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Enhanced course suggestions using actual course data
export const mockSuggestedCourses = (userMessage: string): SuggestedCourse[] => {
  const lowerMessage = userMessage.toLowerCase();

  // Filter courses based on user message
  let filteredCourses = mockCourses;

  if (
    lowerMessage.includes('lập trình') ||
    lowerMessage.includes('programming') ||
    lowerMessage.includes('code')
  ) {
    if (lowerMessage.includes('react') || lowerMessage.includes('frontend')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Lập trình' &&
          (course.title.toLowerCase().includes('react') ||
            course.title.toLowerCase().includes('frontend'))
      );
    } else if (lowerMessage.includes('backend') || lowerMessage.includes('server')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Lập trình' &&
          (course.title.toLowerCase().includes('node') ||
            course.title.toLowerCase().includes('backend') ||
            course.title.toLowerCase().includes('python'))
      );
    } else if (lowerMessage.includes('python') || lowerMessage.includes('data')) {
      filteredCourses = mockCourses.filter(
        (course) => course.category === 'Lập trình' && course.title.toLowerCase().includes('python')
      );
    } else {
      filteredCourses = mockCourses.filter((course) => course.category === 'Lập trình');
    }
  } else if (lowerMessage.includes('tiếng anh') || lowerMessage.includes('english')) {
    if (lowerMessage.includes('giao tiếp') || lowerMessage.includes('communication')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Ngoại ngữ' && course.title.toLowerCase().includes('giao tiếp')
      );
    } else if (lowerMessage.includes('ielts') || lowerMessage.includes('band')) {
      filteredCourses = mockCourses.filter(
        (course) => course.category === 'Ngoại ngữ' && course.title.toLowerCase().includes('ielts')
      );
    } else {
      filteredCourses = mockCourses.filter((course) => course.category === 'Ngoại ngữ');
    }
  } else if (lowerMessage.includes('marketing') || lowerMessage.includes('quảng cáo')) {
    if (lowerMessage.includes('facebook') || lowerMessage.includes('social')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Marketing' && course.title.toLowerCase().includes('facebook')
      );
    } else if (lowerMessage.includes('seo') || lowerMessage.includes('google')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Marketing' &&
          (course.title.toLowerCase().includes('seo') ||
            course.title.toLowerCase().includes('google'))
      );
    } else {
      filteredCourses = mockCourses.filter((course) => course.category === 'Marketing');
    }
  } else if (lowerMessage.includes('thiết kế') || lowerMessage.includes('design')) {
    if (lowerMessage.includes('figma') || lowerMessage.includes('ui')) {
      filteredCourses = mockCourses.filter(
        (course) => course.category === 'Thiết kế' && course.title.toLowerCase().includes('figma')
      );
    } else if (lowerMessage.includes('photoshop') || lowerMessage.includes('adobe')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Thiết kế' && course.title.toLowerCase().includes('photoshop')
      );
    } else {
      filteredCourses = mockCourses.filter((course) => course.category === 'Thiết kế');
    }
  } else if (lowerMessage.includes('kinh doanh') || lowerMessage.includes('business')) {
    if (lowerMessage.includes('khởi nghiệp') || lowerMessage.includes('startup')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Kinh doanh' && course.title.toLowerCase().includes('khởi nghiệp')
      );
    } else if (lowerMessage.includes('tài chính') || lowerMessage.includes('finance')) {
      filteredCourses = mockCourses.filter(
        (course) =>
          course.category === 'Kinh doanh' && course.title.toLowerCase().includes('tài chính')
      );
    } else {
      filteredCourses = mockCourses.filter((course) => course.category === 'Kinh doanh');
    }
  } else if (lowerMessage.includes('âm nhạc') || lowerMessage.includes('music')) {
    filteredCourses = mockCourses.filter((course) => course.category === 'Âm nhạc');
  } else if (lowerMessage.includes('sức khỏe') || lowerMessage.includes('health')) {
    filteredCourses = mockCourses.filter((course) => course.category === 'Sức khỏe');
  }

  // Convert to SuggestedCourse format with match scores
  const suggestions: SuggestedCourse[] = filteredCourses.map((course) => {
    let matchScore = 70; // Base score
    let reason = `Khóa học ${course.category} phù hợp với yêu cầu của bạn`;

    // Adjust score based on user profile
    if (mockUserProfile.preferredCategories.includes(course.category)) {
      matchScore += 15;
    }

    if (course.level === mockUserProfile.skillLevel) {
      matchScore += 10;
    }

    // Adjust score based on budget
    if (mockUserProfile.budget === 'Low' && course.price < 300000) {
      matchScore += 5;
    } else if (
      mockUserProfile.budget === 'Medium' &&
      course.price >= 300000 &&
      course.price <= 500000
    ) {
      matchScore += 5;
    } else if (mockUserProfile.budget === 'High' && course.price > 500000) {
      matchScore += 5;
    }

    // Customize reason based on course
    if (course.title.toLowerCase().includes('react')) {
      reason = 'Phù hợp với mục tiêu trở thành Frontend Developer';
    } else if (course.title.toLowerCase().includes('ui/ux')) {
      reason = 'Bổ sung kỹ năng thiết kế cho Frontend Developer';
    } else if (course.title.toLowerCase().includes('giao tiếp')) {
      reason = 'Cải thiện kỹ năng giao tiếp quốc tế';
    } else if (course.title.toLowerCase().includes('ielts')) {
      reason = 'Chứng chỉ quốc tế cho cơ hội du học và làm việc';
    }

    return {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      image: course.image,
      reason,
      matchScore,
      category: course.category,
      level: course.level || 'Beginner',
    };
  });

  // Sort by match score and return top suggestions
  return suggestions
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, Math.floor(Math.random() * 3) + 2); // Return 2-4 suggestions
};

// Mock conversation history using actual course data
export const mockConversationHistory = [
  {
    id: '1',
    type: 'user',
    content: 'Tôi muốn học React và trở thành Frontend Developer',
    timestamp: '2024-01-25T10:30:00Z',
  },
  {
    id: '2',
    type: 'ai',
    content:
      'Tuyệt vời! React là một trong những framework phổ biến nhất hiện nay. Dựa trên mục tiêu của bạn, tôi gợi ý những khóa học sau:',
    timestamp: '2024-01-25T10:30:30Z',
    suggestions: [
      {
        id: '2',
        title: 'React.js - Xây dựng ứng dụng web hiện đại',
        instructor: 'Trần Thị B',
        price: 399000,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
        reason: 'Khóa học React toàn diện từ cơ bản đến nâng cao',
        matchScore: 95,
        category: 'Lập trình',
        level: 'Intermediate',
      },
      {
        id: '4',
        title: 'TypeScript cho React Developers',
        instructor: 'Phạm Hoàng D',
        price: 250000,
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop',
        reason: 'Nâng cao kỹ năng với TypeScript',
        matchScore: 90,
        category: 'Lập trình',
        level: 'Advanced',
      },
    ],
  },
  {
    id: '3',
    type: 'user',
    content: 'Tôi cũng muốn học UI/UX Design',
    timestamp: '2024-01-25T10:32:00Z',
  },
  {
    id: '4',
    type: 'ai',
    content:
      'UI/UX Design là kỹ năng bổ sung tuyệt vời cho Frontend Developer! Đây là những khóa học phù hợp:',
    timestamp: '2024-01-25T10:32:30Z',
    suggestions: [
      {
        id: '21',
        title: 'UI/UX Design Fundamentals',
        instructor: 'Phạm Thị D',
        price: 350000,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
        reason: 'Nền tảng thiết kế UI/UX cho người mới bắt đầu',
        matchScore: 85,
        category: 'Thiết kế',
        level: 'Beginner',
      },
      {
        id: '22',
        title: 'Figma Masterclass - Design System',
        instructor: 'Nguyễn Văn P',
        price: 280000,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
        reason: 'Công cụ thiết kế hiện đại cho UI/UX',
        matchScore: 80,
        category: 'Thiết kế',
        level: 'Intermediate',
      },
    ],
  },
];

// AI personality and response patterns
export const aiPersonality = {
  name: 'SmartEdu AI',
  tone: 'friendly',
  expertise: ['Lập trình', 'Ngoại ngữ', 'Marketing', 'Thiết kế', 'Kinh doanh'],
  responseStyle: 'helpful and encouraging',
  language: 'Tiếng Việt',
};

// Quick responses for common queries
export const quickResponses = [
  'Tôi hiểu bạn đang tìm kiếm khóa học phù hợp. Hãy cho tôi biết thêm về mục tiêu học tập của bạn nhé!',
  'Tuyệt vời! Tôi sẽ giúp bạn tìm khóa học phù hợp nhất. Bạn có thể chia sẻ thêm về sở thích và kinh nghiệm hiện tại không?',
  'Cảm ơn bạn đã tin tưởng! Tôi đã sẵn sàng hỗ trợ bạn tìm khóa học phù hợp. Bạn muốn học về lĩnh vực nào?',
  'Tôi rất vui được giúp bạn! Để đưa ra gợi ý chính xác, bạn có thể cho tôi biết thêm về mục tiêu học tập không?',
];
