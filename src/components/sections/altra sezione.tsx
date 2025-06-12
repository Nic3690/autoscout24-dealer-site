import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import Container from '../layout/Container';
import Button from '../common/Button';
import { useFeaturedCars } from '../../hooks/useCars';

const FeaturedSection = styled.section`
  background: white;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const FeaturedGrid = styled.div`
  padding: 80px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const PromotionalBox = styled.div`
  background: linear-gradient(135deg, #f8d7da, #f5c6cb);
  border: 1px solid #f1aeb5;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: auto;
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const PromoTitle = styled.h3`
  color: #d32f2f;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PromoText = styled.p`
  color: #721c24;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`;

const PromoLink = styled(Link)`
  color: #d32f2f;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 0.95rem;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }

  svg {
    font-size: 0.8rem;
  }
`;

const CarCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

const CarImageContainer = styled.div`
  position: relative;
  height: 300px;
  background: #f5f5f5;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LocationBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    font-size: 0.7rem;
  }
`;

const CarInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CarHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CarBrand = styled.div`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CarModel = styled.h4`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

const CarPrice = styled.div`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.secondary.main};
`;

const CarSpecs = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CarTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CarTag = styled.span`
  background: #333;
  color: white;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
`;

const CarDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 1rem;
`;

const CarDetail = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CarActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ViewMoreButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: 0.9rem;
  text-transform: none;
  letter-spacing: normal;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

const FeaturedHighlightSection: React.FC = () => {
  const { data: featuredResult, isLoading } = useFeaturedCars(2); // Cambiato da 1 a 2
  
  // Get the first two featured cars or use mock data
  const featuredCars = featuredResult?.cars?.slice(0, 2) || [
    {
      id: 'featured-abarth',
      make: 'ABARTH',
      model: '595 Turismo 1.4',
      price: 15400,
      year: 2015,
      mileage: 68000,
      fuelType: 'petrol',
      transmission: 'manual',
      power: 118,
      images: [{
        id: '1',
        url: '/placeholder-car.jpg',
        altText: 'ABARTH 595 Turismo',
        isPrimary: true,
        order: 0
      }],
      location: {
        address: 'via Empoli 19/21',
        city: 'Firenze',
        region: 'TM',
        postalCode: '50121',
        country: 'Italia'
      },
      doors: 3,
      seats: 4,
      color: 'Nero',
      bodyType: 'coupe' as any,
      engineSize: 1400,
      horsepower: 160,
      condition: 'used' as any,
      availability: 'available' as any,
      features: ['Coupé'],
      description: '',
      previousOwners: 1,
      currency: 'EUR',
      dealer: {
        id: '1',
        name: 'RD Group',
        phone: '+39 057 318 7467',
        email: 'info@rdgroup.it',
        location: {
          address: 'Via Bottaia, 2',
          city: 'Pistoia',
          region: 'Toscana',
          postalCode: '51100',
          country: 'Italia'
        }
      },
      isLuxury: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'featured-bmw',
      make: 'BMW',
      model: 'X3 xDrive20d',
      price: 28900,
      year: 2019,
      mileage: 45000,
      fuelType: 'diesel',
      transmission: 'automatic',
      power: 140,
      images: [{
        id: '2',
        url: '/placeholder-car.jpg',
        altText: 'BMW X3',
        isPrimary: true,
        order: 0
      }],
      location: {
        address: 'via Empoli 19/21',
        city: 'Firenze',
        region: 'TM',
        postalCode: '50121',
        country: 'Italia'
      },
      doors: 5,
      seats: 5,
      color: 'Bianco',
      bodyType: 'suv' as any,
      engineSize: 2000,
      horsepower: 190,
      condition: 'used' as any,
      availability: 'available' as any,
      features: ['SUV', 'Premium'],
      description: '',
      previousOwners: 1,
      currency: 'EUR',
      dealer: {
        id: '1',
        name: 'RD Group',
        phone: '+39 057 318 7467',
        email: 'info@rdgroup.it',
        location: {
          address: 'Via Bottaia, 2',
          city: 'Pistoia',
          region: 'Toscana',
          postalCode: '51100',
          country: 'Italia'
        }
      },
      isLuxury: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const handleCarClick = (carId: string) => {
    window.location.href = `/auto/${carId}`;
  };

  if (isLoading) {
    return null; // Or a skeleton loader
  }

  return (
        <FeaturedGrid>
          {/* Prima colonna - Promotional Box */}
          <PromotionalBox>
            <div>
              <PromoTitle>In evidenza</PromoTitle>
              <PromoText>
                Questa auto è arrivata nelle ultime 24 ore, dai un'occhiata, 
                potrebbe essere la tua occasione
              </PromoText>
            </div>
            <PromoLink to="/auto?recent=true">
              Gli ultimi arrivi <FaArrowRight />
            </PromoLink>
          </PromotionalBox>

          {/* Seconda e terza colonna - Featured Cars */}
          {featuredCars.map((car, index) => (
            <CarCard key={car.id} onClick={() => handleCarClick(car.id)}>
              <CarImageContainer>
                <LocationBadge>
                  <FaMapMarkerAlt />
                  {car.location.address} Wagen {car.location.city}
                </LocationBadge>
                {car.images?.[0] ? (
                  <img 
                    src={car.images[0].url} 
                    alt={car.images[0].altText}
                  />
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontSize: '4rem',
                    opacity: 0.8
                  }}>
                    🚗
                  </div>
                )}
              </CarImageContainer>

              <CarInfo>
                <CarHeader>
                  <CarBrand>{car.make}</CarBrand>
                  <CarModel>{car.model}</CarModel>
                  <CarPrice>{car.price.toLocaleString('it-IT')}€</CarPrice>
                </CarHeader>

                <CarSpecs>
                  <CarTags>
                    {car.features.map((feature, featureIndex) => (
                      <CarTag key={featureIndex}>{feature}</CarTag>
                    ))}
                  </CarTags>

                  <CarDetails>
                    <CarDetail>
                      <strong>{car.mileage.toLocaleString()}Km</strong>
                    </CarDetail>
                    <CarDetail>
                      <strong>
                        {car.fuelType === 'petrol' ? 'Benzina' :
                         car.fuelType === 'diesel' ? 'Diesel' :
                         car.fuelType === 'electric' ? 'Elettrico' :
                         car.fuelType === 'hybrid' ? 'Ibrido' : 'Benzina'}
                      </strong>
                    </CarDetail>
                    <CarDetail>
                      <strong>{car.year}</strong>
                    </CarDetail>
                    <CarDetail>
                      <strong>
                        {car.transmission === 'manual' ? 'Manuale' :
                         car.transmission === 'automatic' ? 'Automatico' :
                         car.transmission === 'semi_automatic' ? 'Semiautomatico' : 'Manuale'}
                      </strong>
                    </CarDetail>
                    <CarDetail>
                      <strong>{car.power}KW</strong>
                    </CarDetail>
                  </CarDetails>
                </CarSpecs>

                <CarActions>
                  <ViewMoreButton onClick={(e) => {
                    e?.stopPropagation();
                    handleCarClick(car.id);
                  }}>
                    Scopri di più <FaArrowRight />
                  </ViewMoreButton>
                </CarActions>
              </CarInfo>
            </CarCard>
          ))}
        </FeaturedGrid>
  );
};

export default FeaturedHighlightSection;