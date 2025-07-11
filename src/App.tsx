import { Toaster } from 'sonner';

import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import ChatBot from '@/components/chatbot/ChatBot';
import FloatingChatButton from '@/components/chatbot/FloatingChatButton';
import Layout from '@/components/layout/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatBotProvider } from '@/contexts/ChatBotContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ViewHistoryProvider } from '@/contexts/ViewHistoryContext';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const ViewHistoryPage = lazy(() => import('@/pages/ViewHistoryPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ChatBotProvider>
          <FavoritesProvider>
            <ViewHistoryProvider>
              <Layout>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/courses" element={<CoursesPage />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="/history" element={<ViewHistoryPage />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </Layout>

              {/* ChatBot Components */}
              <FloatingChatButton />
              <ChatBot />

              <Toaster position="top-right" richColors closeButton duration={3000} />
            </ViewHistoryProvider>
          </FavoritesProvider>
        </ChatBotProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
