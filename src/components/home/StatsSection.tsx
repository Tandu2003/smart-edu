import type { Statistics } from '@/types';

interface StatsSectionProps {
  statistics: Statistics;
}

export default function StatsSection({ statistics }: StatsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {statistics.totalCourses.toLocaleString()}+
            </div>
            <div className="text-gray-600">Khóa học</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {statistics.totalStudents.toLocaleString()}+
            </div>
            <div className="text-gray-600">Học viên</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {statistics.uniqueInstructors}+
            </div>
            <div className="text-gray-600">Giảng viên</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {statistics.averageRating}
            </div>
            <div className="text-gray-600">Đánh giá trung bình</div>
          </div>
        </div>
      </div>
    </section>
  );
}
