import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCar, FaTools, FaHandshake, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

import Container from '../components/layout/Container';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
// FIXED: Import corretto dei hooks
import { useCarStats, useCarManagement } from '../hooks/useCars';

const ServicesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ServiceCard = styled(Card)`
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ServiceTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background.paper}, ${({ theme }) => theme.colors.background.grey});
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const StatCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const ContactSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: white;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
`;

const HomePage: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useCarStats();
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
      
      {/* Services Section */}
      <ServicesSection>
        <Container>
          <SectionTitle>I Nostri Servizi</SectionTitle>
          <ServicesGrid>
            <ServiceCard hoverable>
              <ServiceIcon>
                <FaCar />
              </ServiceIcon>
              <ServiceTitle>Vendita Auto Usate</ServiceTitle>
              <ServiceDescription>
                Ampio catalogo di auto usate selezionate e garantite. 
                Ogni veicolo è controllato e certificato dai nostri esperti.
              </ServiceDescription>
              <Button variant="outline" as={Link} to="/auto">
                Vedi Catalogo
              </Button>
            </ServiceCard>

            <ServiceCard hoverable>
              <ServiceIcon>
                <FaTools />
              </ServiceIcon>
              <ServiceTitle>Officina Specializzata</ServiceTitle>
              <ServiceDescription>
                Servizio di assistenza e riparazione con tecnici qualificati. 
                Manutenzione ordinaria e straordinaria per tutti i modelli.
              </ServiceDescription>
              <Button variant="outline" as={Link} to="/servizi/officina">
                Scopri di Più
              </Button>
            </ServiceCard>

            <ServiceCard hoverable>
              <ServiceIcon>
                <FaHandshake />
              </ServiceIcon>
              <ServiceTitle>Acquistiamo la Tua Auto</ServiceTitle>
              <ServiceDescription>
                Valutazione gratuita e immediata della tua auto. 
                Offriamo il miglior prezzo di mercato con pagamento sicuro.
              </ServiceDescription>
              <Button variant="outline" as={Link} to="/acquistiamo">
                Richiedi Valutazione
              </Button>
            </ServiceCard>
          </ServicesGrid>
        </Container>
      </ServicesSection>

      {/* Stats Section */}
      <StatsSection>
        <Container>
          <SectionTitle>I Nostri Numeri</SectionTitle>
          {statsLoading ? (
            <Loading type="skeleton" />
          ) : (
            <StatsGrid>
              <StatCard>
                <StatNumber>{stats?.total || 0}</StatNumber>
                <StatLabel>Auto in Vendita</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{stats?.sold || 0}</StatNumber>
                <StatLabel>Auto Vendute Questo Mese</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>€{stats?.averagePrice?.toLocaleString() || '0'}</StatNumber>
                <StatLabel>Prezzo Medio</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>10+</StatNumber>
                <StatLabel>Anni di Esperienza</StatLabel>
              </StatCard>
            </StatsGrid>
          )}
        </Container>
      </StatsSection>

      {/* Contact Section */}
      <ContactSection>
        <Container>
          <SectionTitle style={{ color: 'white' }}>Contattaci</SectionTitle>
          <ContactGrid>
            <ContactItem>
              <FaPhone />
              <div>
                <strong>Telefono</strong><br />
                <a href="tel:+390573187467" style={{ color: 'white' }}>
                  +39 057 318 7467
                </a>
              </div>
            </ContactItem>

            <ContactItem>
              <FaMapMarkerAlt />
              <div>
                <strong>Sede Principale</strong><br />
                Via Bottaia, 2<br />
                51100 Pistoia PT
              </div>
            </ContactItem>

            <ContactItem>
              <FaClock />
              <div>
                <strong>Orari di Apertura</strong><br />
                Lun-Sab: 08:30-13:00, 14:30-19:30<br />
                Domenica: Chiuso
              </div>
            </ContactItem>
          </ContactGrid>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button variant="secondary" size="lg" as={Link} to="/contatti">
              Contattaci Ora
            </Button>
          </div>
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