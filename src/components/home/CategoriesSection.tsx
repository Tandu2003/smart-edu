import { Link } from 'react-router-dom';

const categories = [
  { name: 'Lập trình', icon: '💻', count: '2,500+' },
  { name: 'Ngoại ngữ', icon: '🌍', count: '1,800+' },
  { name: 'Marketing', icon: '📈', count: '1,200+' },
  { name: 'Thiết kế', icon: '🎨', count: '900+' },
  { name: 'Kinh doanh', icon: '💼', count: '1,500+' },
  { name: 'Âm nhạc', icon: '🎵', count: '600+' },
  { name: 'Sức khỏe', icon: '🏃‍♂️', count: '400+' },
  { name: 'Khác', icon: '📚', count: '1,000+' },
];

export default function CategoriesSection() {
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
              key={index}
              to={`/courses?category=${encodeURIComponent(category.name)}`}
              className="card p-6 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count} khóa học</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
