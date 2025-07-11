import { Toaster } from 'sonner';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ViewHistoryProvider } from '@/contexts/ViewHistoryContext';
import CoursesPage from '@/pages/CoursesPage';
import FavoritesPage from '@/pages/FavoritesPage';
import HomePage from '@/pages/HomePage';
import ViewHistoryPage from '@/pages/ViewHistoryPage';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <ViewHistoryProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/history" element={<ViewHistoryPage />} />
            </Routes>
          </Layout>
          <Toaster position="top-right" richColors closeButton duration={3000} />
        </ViewHistoryProvider>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
