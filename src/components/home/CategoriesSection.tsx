import { Link } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import type { Course } from '@/types';

interface CategoriesSectionProps {
  courses: Course[];
}

// Icon mapping for different categories
const categoryIcons: { [key: string]: string } = {
  'Tất cả': '📚',
  'Lập trình': '💻',
  'Ngoại ngữ': '🌍',
  Marketing: '📈',
  'Thiết kế': '🎨',
  'Kinh doanh': '💼',
  'Âm nhạc': '🎵',
  'Sức khỏe': '🏃‍♂️',
};

export default function CategoriesSection({ courses }: CategoriesSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục khóa học</h2>
          <p className="text-lg text-gray-600">Chọn lĩnh vực bạn quan tâm</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(categoryIcons).map(([name, icon]) => (
            <Link key={name} to={`/courses?category=${encodeURIComponent(name)}`} className="block">
              <Card className="text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                  <p className="text-sm text-gray-600">{courses.length} khóa học</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
