import { AlertCircle, ArrowLeft, Home, Search } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
          <CardContent className="p-8 text-center">
            {/* 404 Icon & Number */}
            <div className="relative mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              <div className="text-6xl font-bold text-gray-800 mb-2">404</div>
            </div>

            {/* Title & Description */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Trang không tìm thấy</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Hãy kiểm tra
              lại URL hoặc quay về trang chủ.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>

              <Button asChild className="inline-flex items-center gap-2">
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Về trang chủ
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Có thể bạn đang tìm:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/courses">
                    <Search className="w-3 h-3 mr-1" />
                    Khóa học
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/favorites">❤️ Yêu thích</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/history">📈 Lịch sử</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Animation */}
        <div className="mt-8 text-center">
          <div className="inline-block animate-bounce text-2xl">🤖</div>
          <p className="text-sm text-gray-500 mt-2">
            SmartEdu AI Assistant luôn sẵn sàng giúp bạn!
          </p>
        </div>
      </div>
    </div>
  );
}
