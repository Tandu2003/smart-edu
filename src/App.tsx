import { Toaster } from 'sonner';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout';

function App() {
  const handleSearch = (query: string) => {
    // Handle global search - could navigate to courses page with search query
    console.log('Global search:', query);
  };

  return (
    <Router>
      <Layout onSearch={handleSearch}>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Hello World</h1>
        </div>
      </Layout>
      <Toaster position="top-right" richColors closeButton duration={3000} />
    </Router>
  );
}

export default App;
