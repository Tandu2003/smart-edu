export interface Statistics {
  totalCourses: number;
  totalStudents: number;
  uniqueInstructors: number;
  averageRating: string;
}

export interface AIMessage {
  id: string;
  content: string;
  timestamp: string;
  type: 'greeting' | 'course_recommendation' | 'help' | 'error';
}

export interface AIProfile {
  name: string;
  description: string;
  capabilities: string[];
  version: string;
}
