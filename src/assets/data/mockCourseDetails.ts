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

export const courseDetails: Record<string, CourseDetail> = {
  '1': {
    id: '1',
    title: 'JavaScript Cơ bản đến Nâng cao',
    instructor: {
      name: 'Nguyễn Văn A',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Giảng viên có hơn 8 năm kinh nghiệm trong lĩnh vực Frontend Development. Đã từng làm việc tại các công ty lớn như FPT, Viettel và có kinh nghiệm giảng dạy cho hơn 5000 học viên.',
      experience: '8+ năm kinh nghiệm',
      rating: 4.8,
      students: 1250,
      courses: 5,
    },
    description: `Khóa học JavaScript Cơ bản đến Nâng cao cung cấp kiến thức toàn diện và thực tế về lập trình JavaScript. Bạn sẽ được học từ cơ bản đến nâng cao với các bài tập thực hành và dự án thực tế. Khóa học phù hợp cho cả người mới bắt đầu và những ai muốn nâng cao kỹ năng.

Khóa học bao gồm:
• 12 giờ video chất lượng cao
• 50+ bài tập thực hành
• 5 dự án thực tế
• Chứng chỉ hoàn thành
• Hỗ trợ 24/7 từ giảng viên`,
    requirements: [
      'Máy tính có kết nối internet',
      'Kiến thức cơ bản về máy tính',
      'Thời gian học tập đều đặn (2-3 giờ/tuần)',
      'Tinh thần ham học hỏi và kiên nhẫn',
      'Không cần kinh nghiệm lập trình trước đó',
    ],
    whatYouWillLearn: [
      'Nắm vững kiến thức cơ bản về JavaScript ES6+',
      'Thực hành với các dự án thực tế như Todo App, Weather App',
      'Phát triển kỹ năng giải quyết vấn đề và tư duy logic',
      'Xây dựng portfolio cá nhân với các dự án JavaScript',
      'Chuẩn bị cho sự nghiệp trong lĩnh vực Frontend Development',
      'Hiểu sâu về DOM manipulation và Event handling',
      'Làm việc với APIs và JSON data',
      'Tối ưu hóa code và best practices',
    ],
    curriculum: [
      {
        title: 'Giới thiệu khóa học',
        lessons: 3,
        duration: '45 phút',
        topics: ['Tổng quan khóa học', 'Cài đặt môi trường', 'Công cụ cần thiết'],
      },
      {
        title: 'Cơ bản về JavaScript',
        lessons: 8,
        duration: '2 giờ 30 phút',
        topics: [
          'Biến và kiểu dữ liệu',
          'Toán tử và biểu thức',
          'Cấu trúc điều khiển',
          'Hàm cơ bản',
        ],
      },
      {
        title: 'ES6+ Features',
        lessons: 6,
        duration: '2 giờ',
        topics: ['Arrow functions', 'Destructuring', 'Template literals', 'Spread/Rest operators'],
      },
      {
        title: 'DOM Manipulation',
        lessons: 10,
        duration: '3 giờ',
        topics: ['DOM tree', 'Selecting elements', 'Modifying content', 'Event handling'],
      },
      {
        title: 'Working with APIs',
        lessons: 8,
        duration: '2 giờ 30 phút',
        topics: ['Fetch API', 'Async/Await', 'Error handling', 'JSON parsing'],
      },
      {
        title: 'Dự án thực tế',
        lessons: 6,
        duration: '3 giờ',
        topics: ['Todo App', 'Weather App', 'Quiz App', 'Portfolio Website'],
      },
      {
        title: 'Tổng kết và định hướng',
        lessons: 2,
        duration: '1 giờ',
        topics: ['Review kiến thức', 'Định hướng tiếp theo', 'Tài liệu tham khảo'],
      },
    ],
    reviews: [
      {
        id: '1',
        user: 'Nguyễn Văn B',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment:
          'Khóa học rất hay, giảng viên dạy dễ hiểu và có nhiều bài tập thực hành bổ ích. Tôi đã học được rất nhiều từ khóa học này.',
        date: '2024-01-15',
        helpful: 24,
      },
      {
        id: '2',
        user: 'Trần Thị C',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        rating: 4,
        comment:
          'Nội dung khóa học phong phú, phù hợp với người mới bắt đầu. Tuy nhiên một số phần nâng cao có thể khó hiểu hơn.',
        date: '2024-01-10',
        helpful: 18,
      },
      {
        id: '3',
        user: 'Lê Văn D',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment:
          'Tuyệt vời! Tôi đã học được rất nhiều điều bổ ích từ khóa học này. Giảng viên rất nhiệt tình và trả lời câu hỏi nhanh chóng.',
        date: '2024-01-05',
        helpful: 31,
      },
      {
        id: '4',
        user: 'Phạm Thị E',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment:
          'Khóa học chất lượng cao, giá cả hợp lý. Tôi đã có thể tự tin apply vào các vị trí Frontend Developer sau khi hoàn thành.',
        date: '2024-01-01',
        helpful: 27,
      },
      {
        id: '5',
        user: 'Hoàng Văn F',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        rating: 4,
        comment:
          'Nội dung tốt, giảng viên có kinh nghiệm. Tuy nhiên có thể thêm nhiều bài tập thực hành hơn.',
        date: '2023-12-28',
        helpful: 15,
      },
    ],
    stats: {
      totalStudents: 1250,
      totalReviews: 156,
      averageRating: 4.8,
      completionRate: 87,
      lastUpdated: '2024-01-15',
    },
  },
  '2': {
    id: '2',
    title: 'React.js - Xây dựng ứng dụng web hiện đại',
    instructor: {
      name: 'Trần Thị B',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Senior Frontend Developer với 10+ năm kinh nghiệm, chuyên gia về React ecosystem. Đã từng làm việc tại Google, Facebook và có kinh nghiệm mentoring cho hơn 3000+ developers.',
      experience: '10+ năm kinh nghiệm',
      rating: 4.9,
      students: 890,
      courses: 8,
    },
    description: `Khóa học React.js toàn diện giúp bạn xây dựng các ứng dụng web hiện đại với React 18. Từ cơ bản đến nâng cao, bạn sẽ học được tất cả các khái niệm quan trọng và best practices trong React development.

Điểm nổi bật:
• React 18 với Concurrent Features
• Hooks và Functional Components
• State Management với Redux Toolkit
• Testing với Jest và React Testing Library
• Performance Optimization
• Deployment và CI/CD`,
    requirements: [
      'Kiến thức cơ bản về JavaScript ES6+',
      'Hiểu biết về HTML, CSS',
      'Máy tính có cấu hình tối thiểu 8GB RAM',
      'Node.js và npm đã được cài đặt',
      'Kinh nghiệm lập trình cơ bản',
    ],
    whatYouWillLearn: [
      'Xây dựng ứng dụng React từ đầu đến cuối',
      'Sử dụng React Hooks hiệu quả',
      'State management với Context API và Redux',
      'Routing với React Router v6',
      'Testing và debugging React applications',
      'Performance optimization techniques',
      'Deploy ứng dụng lên production',
      'Best practices và design patterns',
    ],
    curriculum: [
      {
        title: 'Giới thiệu React',
        lessons: 4,
        duration: '1 giờ',
        topics: [
          'React là gì?',
          'JSX fundamentals',
          'Components basics',
          'Setup development environment',
        ],
      },
      {
        title: 'React Hooks',
        lessons: 12,
        duration: '4 giờ',
        topics: ['useState', 'useEffect', 'useContext', 'useReducer', 'Custom hooks'],
      },
      {
        title: 'State Management',
        lessons: 10,
        duration: '3 giờ 30 phút',
        topics: ['Context API', 'Redux Toolkit', 'Zustand', 'State patterns'],
      },
      {
        title: 'Routing & Navigation',
        lessons: 6,
        duration: '2 giờ',
        topics: ['React Router v6', 'Dynamic routing', 'Protected routes', 'Navigation guards'],
      },
      {
        title: 'Advanced Patterns',
        lessons: 8,
        duration: '3 giờ',
        topics: [
          'Higher-order components',
          'Render props',
          'Compound components',
          'Performance optimization',
        ],
      },
      {
        title: 'Testing & Deployment',
        lessons: 6,
        duration: '2 giờ 30 phút',
        topics: [
          'Jest testing',
          'React Testing Library',
          'CI/CD pipeline',
          'Production deployment',
        ],
      },
    ],
    reviews: [
      {
        id: '1',
        user: 'Nguyễn Minh G',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment:
          'Khóa học React tuyệt vời! Giảng viên có kinh nghiệm thực tế và dạy rất dễ hiểu. Tôi đã có thể xây dựng ứng dụng React phức tạp sau khóa học.',
        date: '2024-01-20',
        helpful: 42,
      },
      {
        id: '2',
        user: 'Lê Thị H',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment:
          'Nội dung cập nhật với React 18, rất thực tế và hữu ích. Giảng viên trả lời câu hỏi rất nhanh và chi tiết.',
        date: '2024-01-18',
        helpful: 38,
      },
      {
        id: '3',
        user: 'Trần Văn I',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        rating: 4,
        comment:
          'Khóa học chất lượng cao, nhưng một số phần nâng cao có thể khó hiểu với người mới. Cần thêm thời gian để practice.',
        date: '2024-01-15',
        helpful: 25,
      },
    ],
    stats: {
      totalStudents: 890,
      totalReviews: 234,
      averageRating: 4.9,
      completionRate: 92,
      lastUpdated: '2024-01-20',
    },
  },
  '3': {
    id: '3',
    title: 'Tiếng Anh giao tiếp cho người đi làm',
    instructor: {
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Giáo viên tiếng Anh bản xứ với 15+ năm kinh nghiệm giảng dạy. Tốt nghiệp Đại học Cambridge, chuyên về Business English và Communication Skills.',
      experience: '15+ năm kinh nghiệm',
      rating: 4.7,
      students: 2100,
      courses: 12,
    },
    description: `Khóa học tiếng Anh giao tiếp được thiết kế đặc biệt cho người đi làm, tập trung vào các tình huống thực tế trong môi trường công sở. Bạn sẽ học được cách giao tiếp tự tin và chuyên nghiệp bằng tiếng Anh.

Nội dung khóa học:
• 20 giờ video với giáo viên bản xứ
• 100+ tình huống giao tiếp thực tế
• Phát âm và ngữ điệu chuẩn
• Business vocabulary và expressions
• Role-play và thực hành`,
    requirements: [
      'Kiến thức tiếng Anh cơ bản (A2 trở lên)',
      'Thời gian học tập đều đặn',
      'Môi trường yên tĩnh để luyện tập',
      'Tinh thần học hỏi và thực hành',
    ],
    whatYouWillLearn: [
      'Giao tiếp tự tin trong môi trường công sở',
      'Phát âm và ngữ điệu chuẩn Anh-Mỹ',
      'Business vocabulary và expressions',
      'Kỹ năng thuyết trình và đàm phán',
      'Email writing và business correspondence',
      'Small talk và networking skills',
      'Handling difficult conversations',
      'Cultural awareness và business etiquette',
    ],
    curriculum: [
      {
        title: 'Foundation Skills',
        lessons: 8,
        duration: '3 giờ',
        topics: [
          'Pronunciation basics',
          'Intonation patterns',
          'Common expressions',
          'Basic conversation',
        ],
      },
      {
        title: 'Workplace Communication',
        lessons: 12,
        duration: '4 giờ',
        topics: [
          'Meetings and discussions',
          'Presentations',
          'Negotiations',
          'Conflict resolution',
        ],
      },
      {
        title: 'Business Writing',
        lessons: 10,
        duration: '3 giờ 30 phút',
        topics: ['Email writing', 'Reports', 'Proposals', 'Business letters'],
      },
      {
        title: 'Professional Networking',
        lessons: 8,
        duration: '2 giờ 30 phút',
        topics: ['Small talk', 'Building relationships', 'Follow-up conversations', 'Social media'],
      },
      {
        title: 'Advanced Communication',
        lessons: 6,
        duration: '2 giờ',
        topics: [
          'Public speaking',
          'Interview skills',
          'Client communication',
          'Crisis management',
        ],
      },
    ],
    reviews: [
      {
        id: '1',
        user: 'Nguyễn Thị K',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment:
          'Giáo viên Sarah rất tuyệt vời! Phát âm chuẩn và dạy rất dễ hiểu. Tôi đã tự tin hơn rất nhiều khi giao tiếp với đối tác nước ngoài.',
        date: '2024-01-15',
        helpful: 56,
      },
      {
        id: '2',
        user: 'Lê Văn L',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        rating: 4,
        comment:
          'Nội dung thực tế và hữu ích cho công việc. Tuy nhiên có thể thêm nhiều bài tập thực hành hơn.',
        date: '2024-01-12',
        helpful: 34,
      },
      {
        id: '3',
        user: 'Trần Thị M',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        comment:
          'Khóa học rất chất lượng! Tôi đã có thể tham gia các cuộc họp với đối tác quốc tế một cách tự tin.',
        date: '2024-01-10',
        helpful: 48,
      },
    ],
    stats: {
      totalStudents: 2100,
      totalReviews: 445,
      averageRating: 4.7,
      completionRate: 89,
      lastUpdated: '2024-01-15',
    },
  },
};

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
