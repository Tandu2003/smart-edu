import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export default function Layout({ children, onSearch }: LayoutProps) {
  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onSearch={handleSearch} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
