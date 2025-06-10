import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight, FaGasPump, FaCog, FaBolt } from 'react-icons/fa';
import Button from '../common/Button';

interface HeaderProps {
  featuredCar?: {
    make: string;
    model: string;
    price: number;
    year: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    power: string;
    image?: string;
  };
  showHero?: boolean;
}

const HeaderContainer = styled.header<{ showHero: boolean }>`
  height: ${({ showHero }) => showHero ? '100vh' : 'auto'};
  overflow: hidden;
  position: ${({ showHero }) => showHero ? 'relative' : 'absolute'};
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  width: 100%;
  background: ${({ showHero, theme }) => 
    showHero 
      ? `linear-gradient(135deg, ${theme.colors.text.primary} 0%, ${theme.colors.primary.dark} 100%)`
      : 'transparent'
  };
`;

const BackgroundOverlay = styled.div<{ showHero: boolean }>`
  display: ${({ showHero }) => showHero ? 'block' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/hero-car-background.jpg') center/cover;
  opacity: 0.3;
  z-index: 1;
`;

const GradientOverlay = styled.div<{ showHero: boolean }>`
  display: ${({ showHero }) => showHero ? 'block' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 100%
  ),
  linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  ),
  linear-gradient(
    0deg,
    rgba(203, 22, 24, 0.2) 0%,
    rgba(203, 22, 24, 0.2) 100%
  );
  z-index: 2;
`;

const NavigationBar = styled.div`
  position: absolute;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding: 40px 10px;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LogoVector = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary.main});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const CompanyDescription = styled.p`
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  width: fit-content;
  margin: 0;
`;

const NavigationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 0px 20px;
  width: 100%;
  max-width: 1200px;
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 15px;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean; showHero: boolean }>`
  color: ${({ showHero, theme }) => showHero ? '#ffffff' : theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ showHero }) => showHero ? '20px' : '16px'};
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s ease;
  opacity: ${({ isActive }) => isActive ? 1 : 0.8};

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ showHero }) => showHero ? '18px' : '14px'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ showHero }) => showHero ? '16px' : '12px'};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: -1px;
`;

// Hero Content Styles
const HeroContentContainer = styled.div<{ showHero: boolean }>`
  display: ${({ showHero }) => showHero ? 'flex' : 'none'};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100% - 280px); /* Adjust for new header height */
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing.xl};
    padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    height: calc(100% - 320px);
  }
`;

const LeftSection = styled.div`
  flex: 1;
  max-width: 360px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const LuxurySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const LuxuryTitle = styled.h2`
  color: white;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: 2px;
  margin: 0;
  text-transform: uppercase;
`;

const LuxuryDescription = styled.p`
  color: white;
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.4;
  margin: 0;
`;

const LuxuryButton = styled(Button)`
  align-self: flex-start;
  background: transparent;
  border: none;
  color: white;
  text-decoration: underline;
  padding: 0;
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  
  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const RightSection = styled.div`
  width: 360px;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const CarDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  min-width: 310px;
`;

const CarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CarMake = styled.h3`
  color: white;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  text-align: right;
`;

const CarModel = styled.h4`
  color: white;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin: 0;
  text-align: right;
  line-height: 1.1;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NavigationDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: -1px;
`;

const CarPrice = styled.div`
  color: ${({ theme }) => theme.colors.secondary.main};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: right;
`;

const CarDetailsDivider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  margin: 0;
`;

const CarSpecs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const SpecColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: white;
  font-size: 1.125rem;

  svg {
    color: ${({ theme }) => theme.colors.primary.light};
    font-size: 1rem;
  }
`;

const DiscoverButton = styled(Button)`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  color: white;
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

const Header: React.FC<HeaderProps> = ({ 
  showHero = false,
  featuredCar = {
    make: "MERCEDES",
    model: "G63 AMG",
    price: 69800,
    year: 2013,
    mileage: 181000,
    fuelType: "Benzina",
    transmission: "Semiautomatico",
    power: "400KW"
  }
}) => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer showHero={showHero}>
      {showHero && <BackgroundOverlay showHero={showHero} />}
      {showHero && <GradientOverlay showHero={showHero} />}
      
      {/* Navigation Bar - Figma Design */}
      import { NavigationBar } from './types'; // Adjust the import based on your project structure

      const NavigationBar: React.FC<NavigationBar> = ({ showHero, children }) => {
        // Component implementation
      };

      // Ensure NavigationBarProps includes showHero
      interface NavigationBarProps {
        showHero: boolean;
        children: React.ReactNode;
      }
        <LogoSection showHero={showHero}>
          <LogoVector showHero={showHero}>RD</LogoVector>
          <CompanyDescription showHero={showHero}>Rivenditore di auto a Pistoia, Italia</CompanyDescription>
        </LogoSection>
        
        <NavigationSection>
          <NavLinksContainer>
            <NavLink 
              to="/auto" 
              isActive={isActiveRoute('/auto')}
              showHero={showHero}
            >
              Ricerca
            </NavLink>
            
            <NavLink 
              to="/luxury" 
              isActive={isActiveRoute('/luxury')}
              showHero={showHero}
            >
              Luxury
            </NavLink>
            
            <NavLink 
              to="/sedi" 
              isActive={isActiveRoute('/sedi')}
              showHero={showHero}
            >
              Sedi
            </NavLink>
            
            <NavLink 
              to="/acquistiamo" 
              isActive={isActiveRoute('/acquistiamo')}
              showHero={showHero}
            >
              Acquistiamo la tua auto
            </NavLink>
            
            <NavLink 
              to="/contatti" 
              isActive={isActiveRoute('/contatti')}
              showHero={showHero}
            >
              Contatti
            </NavLink>
          </NavLinksContainer>
          
          <NavigationDivider />
        </NavigationSection>
      </NavigationBar>

      {/* Hero Content */}
      {showHero && (
        <HeroContentContainer showHero={showHero}>
          <LeftSection>
            <LuxurySection>
              <LuxuryTitle>LUXURY</LuxuryTitle>
              <LuxuryDescription>
                Abbiamo una nuova occasione tra le auto di lusso, sembra
                perfetta per te
              </LuxuryDescription>
            </LuxurySection>
            
            <LuxuryButton 
              as={Link} 
              to="/luxury"
              variant="ghost"
            >
              Vai alla sezione luxury <FaArrowRight />
            </LuxuryButton>
          </LeftSection>

          <RightSection>
            <CarDetails>
              <CarHeader>
                <CarMake>{featuredCar.make}</CarMake>
                <CarModel>{featuredCar.model}</CarModel>
                <CarPrice>€ {featuredCar.price.toLocaleString('it-IT')}</CarPrice>
              </CarHeader>

              <CarDetailsDivider />

              <CarSpecs>
                <SpecColumn>
                  <SpecItem>
                    <FaCog />
                    <span>{featuredCar.mileage.toLocaleString()}Km</span>
                  </SpecItem>
                  <SpecItem>
                    <FaCog />
                    <span>{featuredCar.year}</span>
                  </SpecItem>
                </SpecColumn>

                <SpecColumn>
                  <SpecItem>
                    <FaGasPump />
                    <span>{featuredCar.fuelType}</span>
                  </SpecItem>
                  <SpecItem>
                    <FaCog />
                    <span>{featuredCar.transmission}</span>
                  </SpecItem>
                  <SpecItem>
                    <FaBolt />
                    <span>{featuredCar.power}</span>
                  </SpecItem>
                </SpecColumn>
              </CarSpecs>
            </CarDetails>

            <DiscoverButton 
              as={Link} 
              to={`/auto/featured-luxury`}
              variant="secondary"
            >
              Scopri di più <FaArrowRight />
            </DiscoverButton>
          </RightSection>
        </HeroContentContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;