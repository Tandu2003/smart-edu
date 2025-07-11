import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export default function Layout({ children, onSearch }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onSearch={onSearch} />
      <main
        id="main-content"
        className="flex-1"
        role="main"
        aria-label="Nội dung chính"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
