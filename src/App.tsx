import { Toaster } from 'sonner';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import CoursesPage from '@/pages/CoursesPage';
import HomePage from '@/pages/HomePage';

function App() {
  const handleSearch = (query: string) => {
    // Handle global search - could navigate to courses page with search query
    console.log('Global search:', query);
  };

  return (
    <Router>
      <Layout onSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors closeButton duration={3000} />
    </Router>
  );
}

export default App;
