import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorFallback from './components/common/ErrorFallback';

// Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';

// Pages placeholder
const CarDetailPage = () => <div style={{ padding: '2rem' }}>Dettaglio Auto - Coming Soon</div>;
const LuxuryPage = () => <div style={{ padding: '2rem' }}>Sezione Luxury - Coming Soon</div>;
const SediPage = () => <div style={{ padding: '2rem' }}>Le Nostre Sedi - Coming Soon</div>;
const AcquistiPage = () => <div style={{ padding: '2rem' }}>Acquistiamo la Tua Auto - Coming Soon</div>;
const ContactPage = () => <div style={{ padding: '2rem' }}>Contatti - Coming Soon</div>;

// Styles
import { GlobalStyles } from '@styles/GlobalStyles';
import { theme } from '@styles/theme';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auto" element={<CatalogPage />} />
                  <Route path="/auto/:id" element={<CarDetailPage />} />
                  <Route path="/luxury" element={<LuxuryPage />} />
                  <Route path="/sedi" element={<SediPage />} />
                  <Route path="/acquistiamo" element={<AcquistiPage />} />
                  <Route path="/contatti" element={<ContactPage />} />
                  <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}>Pagina non trovata</div>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;