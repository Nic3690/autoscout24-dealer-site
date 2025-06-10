import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  width: 100%;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    text-decoration: none;
  }
`;

const LogoCircle = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary.main});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const CompanyName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.background.paper};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.xl};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(${({ isOpen }) => isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    z-index: ${({ theme }) => theme.zIndex.dropdown};
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary.main : theme.colors.text.primary};
  font-weight: ${({ isActive }) => isActive ? 600 : 500};
  font-size: 0.95rem;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.primary.main}10;
    text-decoration: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};

    &:last-child {
      border-bottom: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const PhoneNumber = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/" onClick={closeMobileMenu}>
          <LogoCircle>RD</LogoCircle>
          <CompanyName>RD Group</CompanyName>
        </Logo>

        <Nav isOpen={isMobileMenuOpen}>
          <NavLink 
            to="/auto" 
            isActive={isActiveRoute('/auto')}
            onClick={closeMobileMenu}
          >
            Ricerca
          </NavLink>
          
          <NavLink 
            to="/luxury" 
            isActive={isActiveRoute('/luxury')}
            onClick={closeMobileMenu}
          >
            Luxury
          </NavLink>
          
          <NavLink 
            to="/sedi" 
            isActive={isActiveRoute('/sedi')}
            onClick={closeMobileMenu}
          >
            Sedi
          </NavLink>
          
          <NavLink 
            to="/acquistiamo" 
            isActive={isActiveRoute('/acquistiamo')}
            onClick={closeMobileMenu}
          >
            Acquistiamo la tua auto
          </NavLink>
          
          <NavLink 
            to="/contatti" 
            isActive={isActiveRoute('/contatti')}
            onClick={closeMobileMenu}
          >
            Contatti
          </NavLink>

          {/* Contact info nel mobile menu */}
          <ContactInfo style={{ display: 'block' }}>
            <PhoneNumber href="tel:+390573187467">
              📞 +39 057 318 7467
            </PhoneNumber>
          </ContactInfo>
        </Nav>

        <ContactInfo>
          <PhoneNumber href="tel:+390573187467">
            +39 057 318 7467
          </PhoneNumber>
        </ContactInfo>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;