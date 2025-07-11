import { Sparkles } from 'lucide-react';

import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

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
            <Button variant="hero" size="lg" asChild>
              <Link to="/courses">Khám phá khóa học</Link>
            </Button>
            <Button
              variant="ai"
              size="lg"
              onClick={onAISuggestions}
              disabled={isSuggestionsLoading}
            >
              <Sparkles className="inline mr-2" size={20} />
              {isSuggestionsLoading ? 'Đang gợi ý...' : 'Gợi ý khóa học phù hợp'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
