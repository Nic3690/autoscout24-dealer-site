import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.background.paper};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1.5fr 1.5fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.background.paper};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.background.paper};

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    margin-top: 2px;
    flex-shrink: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.background.paper};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.light};
      text-decoration: underline;
    }
  }
`;

const LocationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const LocationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  h4 {
    color: ${({ theme }) => theme.colors.primary.main};
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.background.paper}CC;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.light};
    text-decoration: none;
    font-size: 0.85rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  a {
    color: ${({ theme }) => theme.colors.background.paper}CC;
    text-decoration: none;
    font-size: 0.9rem;
    padding: ${({ theme }) => theme.spacing.xs} 0;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.light};
      border-bottom-color: ${({ theme }) => theme.colors.primary.light};
    }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper}10;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.paper}20;
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h4 {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.background.paper};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.background.paper}20;
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoFooter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LogoCircle = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary.main});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.background.paper}80;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: right;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const locations = [
    {
      name: "Sede Principale",
      address: "Via Bottaia, 2, 51100 Pistoia PT, Italia",
      mapLink: "https://maps.google.com/?q=Via+Bottaia,+2,+51100+Pistoia+PT,+Italia"
    },
    {
      name: "Sede Secondaria", 
      address: "Via Luigi Galvani, 2, 51100 Pistoia PT, Italia",
      mapLink: "https://maps.google.com/?q=Via+Luigi+Galvani,+2,+51100+Pistoia+PT,+Italia"
    },
    {
      name: "Sede Terza",
      address: "Via Fiorentina, 331, 51100 Pistoia PT, Italia", 
      mapLink: "https://maps.google.com/?q=Via+Fiorentina,+331,+51100+Pistoia+PT,+Italia"
    }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Contatti */}
          <FooterSection>
            <h3>Contatti</h3>
            <ContactInfo>
              <ContactItem>
                <FaPhone />
                <div>
                  <strong>Telefono</strong><br />
                  <a href="tel:+390573187467">+39 057 318 7467</a>
                </div>
              </ContactItem>
              
              <ContactItem>
                <FaEnvelope />
                <div>
                  <strong>E-Mail</strong><br />
                  <a href="mailto:rdautosrlpistoia@gmail.com">
                    rdautosrlpistoia@gmail.com
                  </a>
                </div>
              </ContactItem>
              
              <ContactItem>
                <FaClock />
                <div>
                  <strong>Orari</strong><br />
                  Lunedì - Sabato: 08:30 – 13:00, 14:30 – 19:30<br />
                  Domenica: Chiuso
                </div>
              </ContactItem>
            </ContactInfo>
          </FooterSection>

          {/* Sedi */}
          <FooterSection>
            <h3>Le Nostre Sedi</h3>
            <LocationsList>
              {locations.map((location, index) => (
                <LocationItem key={index}>
                  <h4>
                    <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                    {location.name}
                  </h4>
                  <p>{location.address}</p>
                  <a 
                    href={location.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Apri nelle mappe →
                  </a>
                </LocationItem>
              ))}
            </LocationsList>
          </FooterSection>

          {/* Servizi */}
          <FooterSection>
            <h3>I Nostri Servizi</h3>
            <ServicesList>
              <Link to="/servizi/vendita-auto-usate">Vendita Auto Usate</Link>
              <Link to="/servizi/vendita-luxury">Vendita Luxury</Link>
              <Link to="/servizi/officina">Officina</Link>
              <Link to="/servizi/acquisto-auto">Acquisto Auto</Link>
              <Link to="/servizi/carroattrezzi">Carroattrezzi per i clienti</Link>
              <Link to="/servizi/finanziamenti">Finanziamenti</Link>
            </ServicesList>
          </FooterSection>
        </FooterGrid>

        {/* Griglia Servizi con Immagini */}
        <ServicesGrid>
          <ServiceCard>
            <img src="/images/vendita-auto-usate.jpg" alt="Vendita Auto Usate" />
            <h4>Vendita Auto Usate</h4>
          </ServiceCard>
          
          <ServiceCard>
            <img src="/images/vendita-luxury.jpg" alt="Vendita Luxury" />
            <h4>Vendita Luxury</h4>
          </ServiceCard>
          
          <ServiceCard>
            <img src="/images/officina.jpg" alt="Officina" />
            <h4>Officina</h4>
          </ServiceCard>
          
          <ServiceCard>
            <img src="/images/acquisto-auto.jpg" alt="Acquisto Auto" />
            <h4>Acquisto Auto</h4>
          </ServiceCard>
          
          <ServiceCard>
            <img src="/images/carroattrezzi.jpg" alt="Carroattrezzi" />
            <h4>Carroattrezzi per i Clienti</h4>
          </ServiceCard>
        </ServicesGrid>

        {/* Footer Bottom */}
        <FooterBottom>
          <LogoFooter>
            <LogoCircle>RD</LogoCircle>
            <div>
              <strong>RD Group</strong><br />
              <small>Rivenditore di auto a Pistoia, Italia</small>
            </div>
          </LogoFooter>
          
          <Copyright>
            © {currentYear} RD Group. Tutti i diritti riservati.<br />
            P.IVA: 01234567890 - REA: PT-123456
          </Copyright>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;