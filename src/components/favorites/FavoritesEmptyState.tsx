import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface FavoritesEmptyStateProps {
  onExploreCourses: () => void;
  onViewFeatured: () => void;
}

export default function FavoritesEmptyState({
  onExploreCourses,
  onViewFeatured,
}: FavoritesEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="text-gray-400" size={48} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Danh sách yêu thích trống</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Bạn chưa có khóa học nào trong danh sách yêu thích. Hãy khám phá các khóa học và thêm vào
        danh sách yêu thích của bạn.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onExploreCourses}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Khám phá khóa học
        </Button>
        <Button
          variant="outline"
          onClick={onViewFeatured}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold py-2 px-6 rounded-lg transition-all duration-200"
        >
          Xem khóa học nổi bật
        </Button>
      </div>
    </div>
  );
}
