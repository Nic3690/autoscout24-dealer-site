import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { createGlobalStyle } from 'styled-components';

// Hooks
import { useFeaturedCars } from './hooks/useCars';

// Additional styles for main content spacing
const AdditionalStyles = createGlobalStyle`
  .main-content.with-normal-header {
    padding-top: 180px; /* Height of compact navigation */
    
    @media (max-width: 768px) {
      padding-top: 200px;
    }
  }
`;

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

// Componente interno per gestire l'header con i dati
const AppContent: React.FC = () => {
  const location = useLocation();
  const { data: featuredCars } = useFeaturedCars();
  
  // Determina se mostrare l'header con hero (solo homepage)
  const isHomePage = location.pathname === '/';
  
  // Ottieni l'auto in evidenza per la hero (prima auto luxury se disponibile)
  const heroFeaturedCar = featuredCars?.cars?.find(car => car.isLuxury) || featuredCars?.cars?.[0];

  // Prepara i dati per la hero section
  const heroCarData = heroFeaturedCar ? {
    make: heroFeaturedCar.make.toUpperCase(),
    model: heroFeaturedCar.model.toUpperCase(),
    price: heroFeaturedCar.price,
    year: heroFeaturedCar.year,
    mileage: heroFeaturedCar.mileage,
    fuelType: heroFeaturedCar.fuelType === 'diesel' ? 'Diesel' : 
              heroFeaturedCar.fuelType === 'petrol' ? 'Benzina' : 
              heroFeaturedCar.fuelType === 'electric' ? 'Elettrico' : 
              heroFeaturedCar.fuelType === 'hybrid' ? 'Ibrido' : 'Benzina',
    transmission: heroFeaturedCar.transmission === 'automatic' ? 'Automatico' : 
                  heroFeaturedCar.transmission === 'manual' ? 'Manuale' : 
                  heroFeaturedCar.transmission === 'semi_automatic' ? 'Semiautomatico' : 'Automatico',
    power: `${heroFeaturedCar.power}KW`,
  } : undefined;

  return (
    <div className="app">
      {/* Header dinamico: con hero solo sulla homepage */}
      {isHomePage ? (
        <Header showHero={true} featuredCar={heroCarData} />
      ) : (
        <Header showHero={false} />
      )}
      
      <main className={`main-content ${!isHomePage ? 'with-normal-header' : ''}`}>
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
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AdditionalStyles />
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;