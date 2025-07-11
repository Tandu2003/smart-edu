import { Clock, Eye, Trash2, X } from 'lucide-react';

import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useViewHistory } from '@/contexts/ViewHistoryContext';

interface ViewHistoryDropdownProps {
  onCourseClick?: (course: any) => void;
}

export default function ViewHistoryDropdown({ onCourseClick }: ViewHistoryDropdownProps) {
  const { viewHistory, clearViewHistory, removeFromViewHistory } = useViewHistory();

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const viewed = new Date(timestamp);
    const diffMs = now.getTime() - viewed.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} ngày trước`;
    } else if (diffHours > 0) {
      return `${diffHours} giờ trước`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes > 0 ? `${diffMinutes} phút trước` : 'Vừa xem';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Lịch sử xem">
          <Clock size={20} />
          {viewHistory.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {viewHistory.length > 9 ? '9+' : viewHistory.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b">
          <DropdownMenuLabel className="p-0 font-semibold text-gray-900">
            Lịch sử xem
          </DropdownMenuLabel>
          {viewHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearViewHistory}
              className="text-gray-500 hover:text-red-600 h-auto p-1"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>

        <div className="py-2">
          {viewHistory.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <Clock size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Chưa có lịch sử xem nào</p>
              <p className="text-xs text-gray-400 mt-1">Các khóa học bạn xem sẽ xuất hiện ở đây</p>
            </div>
          ) : (
            <div className="space-y-1">
              {viewHistory.slice(0, 8).map((course) => (
                <div
                  key={course.id}
                  className="group relative flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0" onClick={() => onCourseClick?.(course)}>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{course.instructor}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(course.price)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(course.viewedAt)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromViewHistory(course.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {viewHistory.length > 8 && (
                <>
                  <DropdownMenuSeparator />
                  <div className="px-4 py-2">
                    <Link
                      to="/history"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center"
                    >
                      <Eye size={16} className="mr-1" />
                      Xem tất cả ({viewHistory.length})
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
