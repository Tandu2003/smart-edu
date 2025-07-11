import { Link } from 'react-router-dom';

import type { Course } from '@/assets/data/mockCourses';
import { Card, CardContent } from '@/components/ui/card';

interface CategoriesSectionProps {
  courses: Course[];
}

// Icon mapping for different categories
const categoryIcons: { [key: string]: string } = {
  'Lập trình': '💻',
  'Ngoại ngữ': '🌍',
  Marketing: '📈',
  'Thiết kế': '🎨',
  'Kinh doanh': '💼',
  'Âm nhạc': '🎵',
  'Sức khỏe': '🏃‍♂️',
  'Kỹ năng mềm': '🧠',
  'Khoa học': '🔬',
  'Công nghệ': '⚙️',
  'Nghệ thuật': '🎭',
  Khác: '📚',
};

export default function CategoriesSection({ courses }: CategoriesSectionProps) {
  // Calculate dynamic categories from course data
  const categoryStats = courses.reduce(
    (acc, course) => {
      const category = course.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    },
    {} as { [key: string]: number }
  );

  // Convert to array and sort by course count (descending)
  const categories = Object.entries(categoryStats)
    .map(([name, count]) => ({
      name,
      count,
      icon: categoryIcons[name] || '📚', // Default icon if not found
    }))
    .sort((a, b) => b.count - a.count) // Sort by count descending
    .slice(0, 8); // Show top 8 categories

  // If no courses, don't render the section
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục khóa học</h2>
          <p className="text-lg text-gray-600">Chọn lĩnh vực bạn quan tâm</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/courses?category=${encodeURIComponent(category.name)}`}
              className="block"
            >
              <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} khóa học</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
