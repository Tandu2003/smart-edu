import { Menu, Search } from 'lucide-react';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sync search input with URL params when on courses page
  useEffect(() => {
    if (location.pathname === '/courses') {
      const urlSearchQuery = searchParams.get('search') || '';
      setSearchQuery(urlSearchQuery);
    } else {
      setSearchQuery('');
    }
  }, [location.pathname, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // If onSearch callback is provided (for CoursesPage), use it
    if (onSearch && location.pathname === '/courses') {
      onSearch(searchQuery);
    } else {
      // Otherwise, navigate to courses page with search query
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }

    setIsSheetOpen(false);
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full"
      role="banner"
      aria-label="Navigation chính"
    >
      {/* Skip Link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
      >
        Chuyển đến nội dung chính
      </a>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 min-w-fit flex-shrink-0"
            aria-label="SmartEdu - Về trang chủ"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" aria-hidden="true">
                SE
              </span>
            </div>
            <span className="text-xl font-bold text-gray-900 truncate">SmartEdu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8 ml-4"
            role="navigation"
            aria-label="Navigation chính"
          >
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Trang chủ
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${isActive('/courses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              aria-current={isActive('/courses') ? 'page' : undefined}
            >
              Khóa học
            </Link>
            <Link
              to="/favorites"
              className={`text-sm font-medium transition-colors ${isActive('/favorites') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              aria-current={isActive('/favorites') ? 'page' : undefined}
            >
              Yêu thích
            </Link>
            <Link
              to="/history"
              className={`text-sm font-medium transition-colors ${isActive('/history') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              aria-current={isActive('/history') ? 'page' : undefined}
            >
              Lịch sử xem
            </Link>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
            role="search"
            aria-label="Tìm kiếm khóa học"
          >
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Nhập từ khóa tìm kiếm"
              autoComplete="off"
              spellCheck="false"
            />
          </form>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label={isSheetOpen ? 'Đóng menu' : 'Mở menu'}
                  aria-expanded={isSheetOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu size={20} aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-white border-r border-gray-200"
                id="mobile-menu"
                aria-label="Menu di động"
              >
                <div className="px-4">
                  <SheetHeader className="border-b border-gray-200 pb-6 mb-6">
                    <SheetTitle className="text-left text-gray-900 text-xl font-semibold">
                      Menu Navigation
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col space-y-6">
                    {/* Mobile Navigation */}
                    <nav
                      className="flex flex-col space-y-3"
                      role="navigation"
                      aria-label="Navigation di động"
                    >
                      <Link
                        to="/"
                        onClick={handleLinkClick}
                        className={`text-base font-medium rounded-xl px-4 py-3 transition-all duration-200 ${
                          isActive('/')
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                        aria-current={isActive('/') ? 'page' : undefined}
                      >
                        Trang chủ
                      </Link>
                      <Link
                        to="/courses"
                        onClick={handleLinkClick}
                        className={`text-base font-medium rounded-xl px-4 py-3 transition-all duration-200 ${
                          isActive('/courses')
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                        aria-current={isActive('/courses') ? 'page' : undefined}
                      >
                        Khóa học
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={handleLinkClick}
                        className={`text-base font-medium rounded-xl px-4 py-3 transition-all duration-200 ${
                          isActive('/favorites')
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                        aria-current={isActive('/favorites') ? 'page' : undefined}
                      >
                        Yêu thích
                      </Link>
                      <Link
                        to="/history"
                        onClick={handleLinkClick}
                        className={`text-base font-medium rounded-xl px-4 py-3 transition-all duration-200 ${
                          isActive('/history')
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                        aria-current={isActive('/history') ? 'page' : undefined}
                      >
                        Lịch sử xem
                      </Link>
                    </nav>

                    {/* Mobile search */}
                    <div className="space-y-3">
                      <form
                        onSubmit={handleSearch}
                        className="relative"
                        role="search"
                        aria-label="Tìm kiếm khóa học di động"
                      >
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                          aria-hidden="true"
                        />
                        <Input
                          type="text"
                          placeholder="Tìm kiếm khóa học..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 rounded-xl"
                          aria-label="Nhập từ khóa tìm kiếm"
                          autoComplete="off"
                          spellCheck="false"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
