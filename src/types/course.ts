export interface Course {
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

export interface SuggestedCourse {
  id: string;
  title: string;
  instructor: string;
  price: number;
  image: string;
  reason: string;
  matchScore: number;
  category: string;
  level: string;
}
