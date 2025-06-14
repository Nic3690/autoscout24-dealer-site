import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import ContactPage from './pages/ContactPage';

// Pages placeholder  
const CarDetailPage = () => <div style={{ padding: '2rem' }}>Dettaglio Auto - Coming Soon</div>;
const SediPage = () => <div style={{ padding: '2rem' }}>Le Nostre Sedi - Coming Soon</div>;
const AcquistiPage = () => <div style={{ padding: '2rem' }}>Acquistiamo la Tua Auto - Coming Soon</div>;

// Styles
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

// Hooks
import { useFeaturedCars } from './hooks/useCars';

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

// Componente per reindirizzare luxury al catalogo con filtro
const LuxuryRedirect: React.FC = () => {
  return <Navigate to="/auto?luxury=true" replace />;
};

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
          {/* Reindirizza luxury al catalogo con filtro luxury */}
          <Route path="/luxury" element={<LuxuryRedirect />} />
          <Route path="/sedi" element={<Navigate to="/#sedi" replace />} />
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
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;