import { Play, Sparkles } from 'lucide-react';

import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onAISuggestions: () => void;
  isSuggestionsLoading: boolean;
}

export default function HeroSection({ onAISuggestions, isSuggestionsLoading }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Học tập thông minh với <span className="text-yellow-300">AI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Khám phá hàng nghìn khóa học chất lượng cao với gợi ý thông minh từ AI, giúp bạn tìm ra
            con đường học tập phù hợp nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Khám phá khóa học
            </Link>
            <button
              onClick={onAISuggestions}
              disabled={isSuggestionsLoading}
              className="btn-secondary bg-yellow-400 text-purple-900 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg px-8 py-3"
            >
              <Sparkles className="inline mr-2" size={20} />
              {isSuggestionsLoading ? 'Đang gợi ý...' : 'Gợi ý sản phẩm phù hợp'}
            </button>
            <button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              <Play className="inline mr-2" size={20} />
              Xem demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
