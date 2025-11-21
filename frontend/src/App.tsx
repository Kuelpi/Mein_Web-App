import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { InfoPage } from './pages/InfoPage';
import { Layout } from './components/Layout';
import { RecommendationProvider } from './context/RecommendationContext';

const App: React.FC = () => {
  return (
    <RecommendationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </Layout>
      </Router>
    </RecommendationProvider>
  );
};

export default App;
