import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCar, FaTools, FaHandshake, FaPhone, FaMapMarkerAlt, FaClock, FaShieldAlt, FaUserTie, FaWrench } from 'react-icons/fa';

import Container from '../components/layout/Container';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import SearchFiltersSection from '../components/sections/SearchFiltersSection';
import ServicesMapsSection from '../components/sections/ServicesMapsSection';
import OurServices from '../components/sections/Services';
import { useCarManagement } from '../hooks/useCars';
import WhoWeAre from '@/components/sections/WhoWeAre';

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary.main});
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl} auto;
  line-height: 1.6;
`;

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