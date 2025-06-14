import React, { useEffect } from 'react';
import SearchFiltersSection from '../components/sections/SearchFiltersSection';
import ServicesMapsSection from '../components/sections/ServicesMapsSection';
import OurServices from '../components/sections/Services';
import { useCarManagement } from '../hooks/useCars';
import WhoWeAre from '@/components/sections/WhoWeAre';

const HomePage: React.FC = () => {
  const { syncStatus } = useCarManagement();

  // Imposta il titolo della pagina manualmente senza Helmet
  useEffect(() => {
    document.title = 'RD Group - Auto Usate Pistoia | Vendita Auto Usate di Qualità';
    
    // Imposta la meta description se esiste
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'RD Group è il tuo concessionario di fiducia per auto usate a Pistoia. Ampio catalogo, servizio officina e acquistiamo la tua auto. Contattaci!');
    }
  }, []);

  return (
    <>
      <SearchFiltersSection />
      <ServicesMapsSection />
      <OurServices />

      <WhoWeAre />

      {/* Sync Status (solo in sviluppo)
      {import.meta.env.DEV && syncStatus && (
        <Container>
          <Card style={{ margin: '2rem 0' }}>
            <h4>Stato Sincronizzazione Autoscout24</h4>
            <p>Ultima sincronizzazione: {syncStatus.lastSync.toLocaleString()}</p>
            <p>Veicoli totali: {syncStatus.totalItems}</p>
            <p>Sincronizzati: {syncStatus.syncedItems}</p>
            <p>Errori: {syncStatus.failedItems}</p>
          </Card>
        </Container>
      )} */}
    </>
  );
};

export default HomePage;