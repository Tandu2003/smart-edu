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

export interface Statistics {
  totalCourses: number;
  totalStudents: number;
  uniqueInstructors: number;
  averageRating: string;
}
