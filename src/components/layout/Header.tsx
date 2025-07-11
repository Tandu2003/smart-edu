import { Menu, Search } from 'lucide-react';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSheetOpen(false);
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 min-w-fit flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SE</span>
            </div>
            <span className="text-xl font-bold text-gray-900 truncate">SmartEdu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Trang chủ
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${isActive('/courses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Khóa học
            </Link>
            <Link
              to="/favorites"
              className={`text-sm font-medium transition-colors ${isActive('/favorites') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Yêu thích
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Mở menu">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-white border-r border-gray-200"
              >
                <div className="px-4">
                  <SheetHeader className="border-b border-gray-200 pb-6 mb-6">
                    <SheetTitle className="text-left text-gray-900 text-xl font-semibold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col space-y-6">
                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-3">
                      <Link
                        to="/"
                        onClick={handleLinkClick}
                        className={`text-base font-medium rounded-xl px-4 py-3 transition-all duration-200 ${
                          isActive('/')
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`}
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
                      >
                        Yêu thích
                      </Link>
                    </nav>

                    {/* Mobile search */}
                    <div className="space-y-3">
                      <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Tìm kiếm khóa học..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 rounded-xl"
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
