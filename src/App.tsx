import { Toaster } from 'sonner';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import CoursesPage from '@/pages/CoursesPage';
import FavoritesPage from '@/pages/FavoritesPage';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors closeButton duration={3000} />
    </Router>
  );
}

export default App;
