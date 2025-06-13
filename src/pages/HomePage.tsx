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

const ServiceCard = styled(Card)`
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}05, ${({ theme }) => theme.colors.secondary.main}05);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ContactSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.text.primary}, #2c3e50);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.03"><circle cx="50" cy="50" r="2"/></g></g></svg>') repeat;
    pointer-events: none;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 2;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1.8rem;
    margin-top: 4px;
    flex-shrink: 0;
  }
`;

const ContactContent = styled.div`
  flex: 1;

  strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: 1.1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary.light};
      text-decoration: underline;
    }
  }
`;

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

const WhiteSectionTitle = styled(SectionTitle)`
  color: white;

  &::after {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.light}, white);
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

const WhiteSectionSubtitle = styled(SectionSubtitle)`
  color: rgba(255, 255, 255, 0.9);
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.secondary.main};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary.dark};
    transform: translateY(-2px);
  }
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
      {/* La Hero Section è ora integrata nell'Header */}
      
      {/* Search Filters Section - NUOVA SEZIONE che segue il design */}
      <SearchFiltersSection />

      <ServicesMapsSection />

      {/* Our Services Section - SOSTITUISCE la sezione Stats */}
      <OurServices />

      <WhoWeAre />

      {/* Contact Section */}
      <ContactSection>
        <Container>
          <WhiteSectionTitle>Contattaci</WhiteSectionTitle>
          <WhiteSectionSubtitle>
            Siamo qui per aiutarti a trovare l'auto dei tuoi sogni
          </WhiteSectionSubtitle>
          <ContactGrid>
            <ContactItem>
              <FaPhone />
              <ContactContent>
                <strong>Telefono</strong>
                <a href="tel:+390573187467">
                  +39 057 318 7467
                </a>
                <div style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.8 }}>
                  Chiamaci per informazioni e appuntamenti
                </div>
              </ContactContent>
            </ContactItem>

            <ContactItem>
              <FaMapMarkerAlt />
              <ContactContent>
                <strong>Sede Principale</strong>
                <div>Via Bottaia, 2</div>
                <div>51100 Pistoia PT</div>
                <div style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.8 }}>
                  Vieni a trovarci nel nostro showroom
                </div>
              </ContactContent>
            </ContactItem>

            <ContactItem>
              <FaClock />
              <ContactContent>
                <strong>Orari di Apertura</strong>
                <div>Lun-Sab: 08:30-13:00, 14:30-19:30</div>
                <div>Domenica: Chiuso</div>
                <div style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.8 }}>
                  Su appuntamento anche fuori orario
                </div>
              </ContactContent>
            </ContactItem>
          </ContactGrid>

          <CTASection>
            <CTAButton variant="secondary" size="lg" as={Link} to="/contatti">
              Contattaci Ora
            </CTAButton>
          </CTASection>
        </Container>
      </ContactSection>

      {/* Sync Status (solo in sviluppo) */}
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
      )}
    </>
  );
};

export default HomePage;