// Import mockCourses and generate details for each course
import { mockCourses } from './mockCourses';

export interface CourseDetail {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
    experience: string;
    rating: number;
    students: number;
    courses: number;
  };
  description: string;
  requirements: string[];
  whatYouWillLearn: string[];
  curriculum: {
    title: string;
    lessons: number;
    duration: string;
    topics?: string[];
  }[];
  reviews: {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
  }[];
  stats: {
    totalStudents: number;
    totalReviews: number;
    averageRating: number;
    completionRate: number;
    lastUpdated: string;
  };
}

// Helper function to generate course details
function generateCourseDetails(
  id: string,
  title: string,
  instructor: string,
  category: string,
  level: string = 'Beginner',
  students: number,
  rating: number,
  lastUpdated: string
): CourseDetail {
  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  ];

  const reviewAvatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
  ];

  const randomNames = [
    'Nguyễn Văn',
    'Trần Thị',
    'Lê Văn',
    'Phạm Thị',
    'Hoàng Văn',
    'Đặng Thị',
    'Bùi Văn',
    'Đỗ Thị',
    'Ngô Văn',
    'Vũ Thị',
  ];

  const experience = Math.floor(Math.random() * 10) + 5;
  const totalCourses = Math.floor(Math.random() * 8) + 3;
  const completionRate = Math.floor(Math.random() * 20) + 80;
  const totalReviews = Math.floor(students * 0.15);

  // Generate requirements based on category and level
  const requirements = [
    level === 'Beginner'
      ? 'Không yêu cầu kiến thức trước đó'
      : `Kiến thức ${category.toLowerCase()} cơ bản`,
    'Máy tính có kết nối internet',
    'Thời gian học tập đều đặn (2-3 giờ/tuần)',
    'Tinh thần ham học hỏi và kiên nhẫn',
  ];

  if (category === 'Lập trình') {
    requirements.push(
      level === 'Advanced'
        ? 'Kinh nghiệm lập trình 2+ năm'
        : level === 'Intermediate'
          ? 'Hiểu biết cơ bản về lập trình'
          : 'Kiến thức cơ bản về máy tính'
    );
  }

  // Generate curriculum based on category
  const curriculum = [];

  const sections = [
    {
      title: 'Giới thiệu khóa học',
      duration: '1 giờ',
      lessons: 3,
      topics: ['Tổng quan khóa học', 'Cài đặt môi trường', 'Công cụ cần thiết'],
    },
    {
      title: 'Kiến thức nền tảng',
      duration: '3 giờ',
      lessons: 8,
      topics: ['Khái niệm cơ bản', 'Nguyên lý hoạt động', 'Thực hành cơ bản'],
    },
    {
      title: 'Thực hành và ứng dụng',
      duration: '4 giờ',
      lessons: 10,
      topics: ['Bài tập thực hành', 'Dự án mẫu', 'Case studies'],
    },
    {
      title: 'Nâng cao và tối ưu',
      duration: '3 giờ',
      lessons: 6,
      topics: ['Kỹ thuật nâng cao', 'Best practices', 'Performance optimization'],
    },
    {
      title: 'Dự án thực tế',
      duration: '4 giờ',
      lessons: 8,
      topics: ['Phân tích yêu cầu', 'Thiết kế giải pháp', 'Triển khai', 'Tối ưu và review'],
    },
  ];

  curriculum.push(...sections);

  // Generate reviews
  const reviews = Array.from({ length: 5 }, (_, i) => {
    const randomRating = Math.random() < 0.7 ? rating : Math.max(rating - 1, 4);
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const lastName = String.fromCharCode(65 + i);
    const daysAgo = Math.floor(Math.random() * 30);
    const helpful = Math.floor(Math.random() * 30) + 10;

    const reviewDate = new Date(lastUpdated);
    reviewDate.setDate(reviewDate.getDate() - daysAgo);

    return {
      id: `${id}_review_${i + 1}`,
      user: `${randomName} ${lastName}`,
      avatar: reviewAvatars[i % reviewAvatars.length],
      rating: randomRating,
      comment: generateReviewComment(randomRating),
      date: reviewDate.toISOString().split('T')[0],
      helpful,
    };
  });

  return {
    id,
    title,
    instructor: {
      name: instructor,
      avatar: avatars[Number(id) % avatars.length],
      bio: generateInstructorBio(category, experience),
      experience: `${experience}+ năm kinh nghiệm`,
      rating,
      students,
      courses: totalCourses,
    },
    description: generateCourseDescription(title, category, level),
    requirements,
    whatYouWillLearn: generateLearningOutcomes(category),
    curriculum,
    reviews,
    stats: {
      totalStudents: students,
      totalReviews,
      averageRating: rating,
      completionRate,
      lastUpdated,
    },
  };
}

function generateInstructorBio(category: string, experience: number): string {
  const positions = {
    'Lập trình': [
      'Senior Developer',
      'Technical Lead',
      'Software Architect',
      'Full-stack Developer',
    ],
    'Ngoại ngữ': [
      'Giảng viên ngôn ngữ',
      'Chuyên gia ngoại ngữ',
      'Language Consultant',
      'Education Specialist',
    ],
    Marketing: [
      'Marketing Manager',
      'Digital Marketing Expert',
      'Marketing Consultant',
      'Brand Strategist',
    ],
    'Thiết kế': ['Senior Designer', 'Creative Director', 'UX/UI Designer', 'Art Director'],
    'Kinh doanh': [
      'Business Consultant',
      'Sales Expert',
      'Business Strategy Advisor',
      'Entrepreneurship Coach',
    ],
  };

  const companies = ['FPT', 'Viettel', 'VNG', 'Google', 'Microsoft', 'Facebook', 'Amazon'];
  const position =
    positions[category as keyof typeof positions]?.[Math.floor(Math.random() * 4)] || 'Chuyên gia';
  const company1 = companies[Math.floor(Math.random() * companies.length)];
  const company2 = companies[Math.floor(Math.random() * companies.length)];
  const students = Math.floor(Math.random() * 3000) + 2000;

  return `${position} với ${experience}+ năm kinh nghiệm trong lĩnh vực ${category}. Đã từng làm việc tại ${company1}, ${company2} và có kinh nghiệm giảng dạy cho hơn ${students} học viên.`;
}

function generateCourseDescription(title: string, category: string, level: string): string {
  const levelText = {
    Beginner: 'người mới bắt đầu',
    Intermediate: 'người đã có kiến thức cơ bản',
    Advanced: 'người đã có kinh nghiệm',
  }[level];

  return `Khóa học ${title} cung cấp kiến thức toàn diện và thực tế về ${category.toLowerCase()}. Được thiết kế cho ${levelText}, khóa học tập trung vào thực hành với các bài tập và dự án thực tế.

Điểm nổi bật:
• Video bài giảng chất lượng cao
• Bài tập thực hành sau mỗi bài học
• Dự án thực tế theo chuẩn doanh nghiệp
• Hỗ trợ 24/7 từ giảng viên
• Chứng chỉ hoàn thành khóa học
• Cập nhật kiến thức thường xuyên`;
}

function generateLearningOutcomes(category: string): string[] {
  const outcomes = {
    'Lập trình': [
      'Nắm vững kiến thức nền tảng và các khái niệm cốt lõi',
      'Thực hành với các dự án thực tế',
      'Áp dụng best practices và design patterns',
      'Tối ưu hiệu suất và bảo mật ứng dụng',
      'Làm việc với các công nghệ và framework hiện đại',
      'Phát triển kỹ năng debug và xử lý lỗi',
      'Triển khai ứng dụng lên môi trường production',
      'Xây dựng portfolio cá nhân với các dự án thực tế',
    ],
    'Ngoại ngữ': [
      'Phát triển kỹ năng nghe, nói, đọc, viết',
      'Giao tiếp tự tin trong các tình huống thực tế',
      'Nắm vững ngữ pháp và từ vựng',
      'Hiểu về văn hóa và cách giao tiếp',
      'Cải thiện phát âm và ngữ điệu',
      'Áp dụng ngôn ngữ trong công việc',
      'Chuẩn bị cho các kỳ thi quốc tế',
      'Phát triển kỹ năng thuyết trình',
    ],
    Marketing: [
      'Xây dựng chiến lược marketing toàn diện',
      'Thực hành với các công cụ marketing hiện đại',
      'Phân tích dữ liệu và đo lường hiệu quả',
      'Tối ưu hóa chiến dịch quảng cáo',
      'Xây dựng thương hiệu cá nhân và doanh nghiệp',
      'Quản lý mạng xã hội chuyên nghiệp',
      'Tạo content marketing hiệu quả',
      'Thực hiện các chiến dịch email marketing',
    ],
    'Thiết kế': [
      'Nắm vững các nguyên tắc thiết kế',
      'Sử dụng thành thạo các công cụ thiết kế',
      'Xây dựng portfolio thiết kế chuyên nghiệp',
      'Áp dụng UX/UI principles vào dự án',
      'Thiết kế responsive và adaptive',
      'Tối ưu hóa trải nghiệm người dùng',
      'Làm việc với design systems',
      'Thực hiện các dự án thiết kế thực tế',
    ],
    'Kinh doanh': [
      'Xây dựng kế hoạch kinh doanh hiệu quả',
      'Phân tích thị trường và đối thủ cạnh tranh',
      'Quản lý tài chính và dòng tiền',
      'Phát triển kỹ năng đàm phán và bán hàng',
      'Xây dựng đội ngũ và quản lý nhân sự',
      'Tối ưu hóa quy trình vận hành',
      'Phát triển chiến lược tăng trưởng',
      'Quản lý rủi ro trong kinh doanh',
    ],
  };

  return outcomes[category as keyof typeof outcomes] || outcomes['Lập trình'];
}

function generateReviewComment(rating: number): string {
  const positive = [
    'Khóa học rất hay và bổ ích',
    'Giảng viên dạy dễ hiểu và nhiệt tình',
    'Nội dung được trình bày rõ ràng, logic',
    'Rất hài lòng với chất lượng khóa học',
    'Học được nhiều kiến thức thực tế',
  ];

  const neutral = [
    'Khóa học tốt nhưng cần thêm bài tập',
    'Nội dung ok nhưng hơi nhanh',
    'Chất lượng khá, cần cập nhật thêm',
    'Giảng viên nhiệt tình, cần thêm ví dụ',
    'Học được nhiều, nhưng hơi khó theo kịp',
  ];

  const comments = rating >= 4.5 ? positive : neutral;
  return comments[Math.floor(Math.random() * comments.length)];
}

export const courseDetails: Record<string, CourseDetail> = {};

mockCourses.forEach((course) => {
  courseDetails[course.id] = generateCourseDetails(
    course.id,
    course.title,
    course.instructor,
    course.category,
    course.level,
    course.students,
    course.rating,
    course.lastUpdated || '2024-01-01'
  );
});

// Course categories with detailed information
export const courseCategories = {
  'Lập trình': {
    description: 'Các khóa học lập trình từ cơ bản đến nâng cao',
    totalCourses: 15,
    popularTopics: ['JavaScript', 'React', 'Python', 'Node.js', 'TypeScript'],
    averageRating: 4.7,
  },
  'Ngoại ngữ': {
    description: 'Học ngoại ngữ cho công việc và cuộc sống',
    totalCourses: 8,
    popularTopics: ['Tiếng Anh', 'Tiếng Nhật', 'Tiếng Hàn', 'IELTS', 'Business English'],
    averageRating: 4.6,
  },
  Marketing: {
    description: 'Digital Marketing và các kỹ năng marketing hiện đại',
    totalCourses: 10,
    popularTopics: ['Facebook Ads', 'Google Ads', 'SEO', 'Content Marketing', 'Email Marketing'],
    averageRating: 4.5,
  },
  'Thiết kế': {
    description: 'UI/UX Design và các công cụ thiết kế chuyên nghiệp',
    totalCourses: 12,
    popularTopics: ['Figma', 'Adobe Photoshop', 'UI/UX', 'Motion Design', '3D Design'],
    averageRating: 4.6,
  },
  'Kinh doanh': {
    description: 'Kiến thức kinh doanh và khởi nghiệp',
    totalCourses: 9,
    popularTopics: ['Khởi nghiệp', 'Quản lý tài chính', 'Leadership', 'Sales', 'E-commerce'],
    averageRating: 4.7,
  },
  'Âm nhạc': {
    description: 'Học nhạc cụ và sản xuất âm nhạc',
    totalCourses: 6,
    popularTopics: ['Piano', 'Guitar', 'Music Production', 'FL Studio', 'Sáng tác'],
    averageRating: 4.4,
  },
  'Sức khỏe': {
    description: 'Các khóa học về sức khỏe và thể thao',
    totalCourses: 5,
    popularTopics: ['Yoga', 'Meditation', 'Nutrition', 'Fitness', 'Mental Health'],
    averageRating: 4.8,
  },
};
