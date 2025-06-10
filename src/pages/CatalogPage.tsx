import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaCar } from 'react-icons/fa';

import Container from '../components/layout/Container';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useCars, useCarManagement } from '../hooks/useCars';
// FIXED: Use type-only import
import type { CarFilters } from '../types/car/car';

const CatalogHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background.paper}, ${({ theme }) => theme.colors.background.grey});
  padding: ${({ theme }) => theme.spacing.xxl} 0 ${({ theme }) => theme.spacing.xl} 0;
`;

const SearchSection = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  align-items: end;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  input, select {
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
    }
  }
`;

const ResultsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const CarCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CarImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.background.grey}, ${({ theme }) => theme.colors.border});
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 3rem;
`;

const CarTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
`;

const CarInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const CarPrice = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  text-align: right;
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const SyncStatus = styled.div`
  background: ${({ theme }) => theme.colors.info}20;
  color: ${({ theme }) => theme.colors.info};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const CatalogPage: React.FC = () => {
  const [filters, setFilters] = useState<CarFilters>({});
  const [page, setPage] = useState(1);
  
  const { data: searchResult, isLoading, error } = useCars(filters, page, 20);
  const { syncStatus, startSync, isSyncing } = useCarManagement();

  // Imposta il titolo della pagina manualmente senza Helmet
  useEffect(() => {
    document.title = 'Catalogo Auto Usate - RD Group Pistoia';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sfoglia il nostro catalogo di auto usate a Pistoia. Trova l\'auto perfetta per te con filtri avanzati e informazioni dettagliate.');
    }
  }, []);

  const handleFilterChange = (field: keyof CarFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value || undefined
    }));
    setPage(1); // Reset alla prima pagina quando cambiano i filtri
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // I filtri sono già applicati tramite useState
  };

  const handleSyncNow = () => {
    startSync();
  };

  return (
    <>
      <CatalogHeader>
        <Container>
          <h1>Catalogo Auto Usate</h1>
          <p>Trova l'auto perfetta per te nel nostro ampio catalogo</p>
          
          {/* Stato sincronizzazione */}
          {syncStatus && (
            <SyncStatus>
              Ultima sincronizzazione: {syncStatus.lastSync.toLocaleString()} - 
              {syncStatus.totalItems} auto disponibili
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSyncNow}
                loading={isSyncing}
                style={{ marginLeft: '1rem' }}
              >
                Aggiorna Ora
              </Button>
            </SyncStatus>
          )}
        </Container>
      </CatalogHeader>

      <Container>
        {/* Sezione Ricerca */}
        <SearchSection>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaSearch /> Cerca la Tua Auto
          </h2>
          
          <SearchForm onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="make">Marca</label>
              <select 
                id="make"
                onChange={(e) => handleFilterChange('make', e.target.value ? [e.target.value] : undefined)}
              >
                <option value="">Tutte le marche</option>
                <option value="Audi">Audi</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Ford">Ford</option>
                <option value="Fiat">Fiat</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label htmlFor="priceMax">Prezzo massimo</label>
              <input 
                type="number" 
                id="priceMax"
                placeholder="Es. 20000"
                onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="yearMin">Anno minimo</label>
              <input 
                type="number" 
                id="yearMin"
                placeholder="Es. 2015"
                onChange={(e) => handleFilterChange('yearMin', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="fuelType">Carburante</label>
              <select 
                id="fuelType"
                onChange={(e) => handleFilterChange('fuelType', e.target.value ? [e.target.value as any] : undefined)}
              >
                <option value="">Tutti</option>
                <option value="petrol">Benzina</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Ibrido</option>
                <option value="electric">Elettrico</option>
              </select>
            </FormGroup>

            <Button type="submit" variant="primary">
              <FaSearch /> Cerca
            </Button>
          </SearchForm>
        </SearchSection>

        {/* Risultati */}
        <ResultsSection>
          <ResultsHeader>
            <h2>
              {isLoading ? 'Caricamento...' : 
               error ? 'Errore nel caricamento' :
               `${searchResult?.total || 0} auto trovate`}
            </h2>
            <Button variant="outline" size="sm">
              <FaFilter /> Filtri Avanzati
            </Button>
          </ResultsHeader>

          {isLoading && <Loading type="skeleton" />}
          
          {error && (
            <NoResults>
              <h3>Errore nel caricamento</h3>
              <p>Si è verificato un errore durante il caricamento delle auto. Riprova più tardi.</p>
              <Button onClick={() => window.location.reload()}>
                Ricarica Pagina
              </Button>
            </NoResults>
          )}

          {!isLoading && !error && searchResult && (
            <>
              {searchResult.cars.length === 0 ? (
                <NoResults>
                  <h3>Nessuna auto trovata</h3>
                  <p>Prova a modificare i filtri di ricerca per trovare più risultati.</p>
                  <Button onClick={() => setFilters({})}>
                    Rimuovi Filtri
                  </Button>
                </NoResults>
              ) : (
                <CarsGrid>
                  {/* FIXED: Mostra i dati reali dal mock service */}
                  {searchResult.cars.map((car) => (
                    <CarCard key={car.id} hoverable>
                      <CarImage>
                        <FaCar />
                      </CarImage>
                      <CarTitle>{car.make} {car.model}</CarTitle>
                      <CarInfo>
                        <span>{car.year} • {car.mileage.toLocaleString()} km</span>
                        <span>{car.fuelType}</span>
                      </CarInfo>
                      <CarInfo>
                        <span>{car.transmission} • {car.doors} porte</span>
                      </CarInfo>
                      <CarPrice>€ {car.price.toLocaleString('it-IT')}</CarPrice>
                    </CarCard>
                  ))}
                </CarsGrid>
              )}
            </>
          )}
        </ResultsSection>
      </Container>
    </>
  );
};

export default CatalogPage;