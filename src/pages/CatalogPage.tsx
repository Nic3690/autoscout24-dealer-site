import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaCar, FaMapMarkerAlt, FaChevronDown, FaArrowRight } from 'react-icons/fa';

import Container from '../components/layout/Container';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import ActionButton from '../components/common/ActionButton';
import { useCars, useCarManagement } from '../hooks/useCars';
import type { CarFilters, FuelType, TransmissionType, BodyType } from '../types/car/car';

// Header della pagina
const CatalogHeader = styled.div`
  background: transparent;
  padding: ${({ theme }) => theme.spacing.xxl} 0 ${({ theme }) => theme.spacing.xl} 0;
`;

const SearchTitle = styled.h2`
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 50vw;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  margin: 0 auto ${({ theme }) => theme.spacing.xl} auto;
  text-align: center;
  color: #656565;
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
	font-size: 1rem;
  }
`;

// Sezione filtri
const FiltersSection = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border: 1px solid #e0e0e0;
`;

const FiltersTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: end;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  select, input {
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 1rem;
    background: #F9F9F9;
    color: ${({ theme }) => theme.colors.text.primary};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      background: white;
    }
  }
`;

const FiltersActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ClearFiltersButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.grey};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// Sezione risultati
const ResultsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ResultsCount = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const SortingControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  select {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: white;
  }
`;

// Grid delle auto
const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CarCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const CarImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: linear-gradient(45deg, #f5f5f5, #e0e0e0);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CarLocationBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
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

const CarContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CarHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CarMake = styled.div`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const CarModel = styled.h3`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.2;
`;

const CarPrice = styled.div`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.secondary.main};
`;

const CarDivider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  border: none;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const CarSpecs = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CarSpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CarSpec = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const CarTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const CarTag = styled.span`
  background: ${({ theme }) => theme.colors.text.primary};
  color: white;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
`;

const CarActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Messaggi di stato
const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

// Paginazione
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const PaginationButton = styled(Button)`
  min-width: 120px;
`;

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState({ field: 'createdAt', direction: 'desc' as 'asc' | 'desc' });

  // Estrai filtri dai parametri URL
  const filters = useMemo(() => {
    const urlFilters: CarFilters = {};
    
    // Filtri semplici
    const make = searchParams.get('make');
    if (make) urlFilters.make = make.split(',');
    
    const model = searchParams.get('model');
    if (model) urlFilters.model = model.split(',');
    
    const priceMin = searchParams.get('priceMin');
    if (priceMin) urlFilters.priceMin = parseInt(priceMin);
    
    const priceMax = searchParams.get('priceMax');
    if (priceMax) urlFilters.priceMax = parseInt(priceMax);
    
    const yearMin = searchParams.get('yearMin');
    if (yearMin) urlFilters.yearMin = parseInt(yearMin);
    
    const yearMax = searchParams.get('yearMax');
    if (yearMax) urlFilters.yearMax = parseInt(yearMax);
    
    const mileageMin = searchParams.get('mileageMin');
    if (mileageMin) urlFilters.mileageMin = parseInt(mileageMin);
    
    const mileageMax = searchParams.get('mileageMax');
    if (mileageMax) urlFilters.mileageMax = parseInt(mileageMax);
    
    const fuelType = searchParams.get('fuelType');
    if (fuelType) urlFilters.fuelType = fuelType.split(',') as FuelType[];
    
    const transmission = searchParams.get('transmission');
    if (transmission) urlFilters.transmission = transmission.split(',') as TransmissionType[];
    
    const bodyType = searchParams.get('bodyType');
    if (bodyType) urlFilters.bodyType = bodyType.split(',') as BodyType[];
    
    const isLuxury = searchParams.get('luxury');
    if (isLuxury === 'true') urlFilters.isLuxury = true;
    
    const location = searchParams.get('location');
    if (location) urlFilters.location = location;
    
    return urlFilters;
  }, [searchParams]);

  // Hook per i dati
  const { data: searchResult, isLoading, error } = useCars(filters, page, 20);
  const { syncStatus } = useCarManagement();

  // Imposta il titolo della pagina
  useEffect(() => {
    const getPageTitle = () => {
      if (filters.isLuxury) return 'Auto di Lusso - RD Group Pistoia';
      if (filters.make?.length === 1) return `${filters.make[0]} Usate - RD Group Pistoia`;
      return 'Catalogo Auto Usate - RD Group Pistoia';
    };
    
    document.title = getPageTitle();
  }, [filters]);

  // Gestione filtri locali per il form
  const [localFilters, setLocalFilters] = useState<CarFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (field: keyof CarFilters, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value || undefined
    }));
  };

  const handleApplyFilters = () => {
    const newSearchParams = new URLSearchParams();
    
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            newSearchParams.set(key, value.join(','));
          }
        } else {
          newSearchParams.set(key, value.toString());
        }
      }
    });
    
    setSearchParams(newSearchParams);
    setPage(1);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    setSearchParams(new URLSearchParams());
    setPage(1);
  };

  const handleCarClick = (carId: string) => {
    navigate(`/auto/${carId}`);
  };

  const formatPrice = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    return numValue ? `${parseInt(numValue).toLocaleString('it-IT')}€` : '';
  };

  const getTranslatedFuelType = (fuelType: string) => {
    const translations: Record<string, string> = {
      'petrol': 'Benzina',
      'diesel': 'Diesel',
      'electric': 'Elettrico',
      'hybrid': 'Ibrido',
      'plugin_hybrid': 'Ibrido Plugin',
      'lpg': 'GPL',
      'cng': 'Metano'
    };
    return translations[fuelType] || fuelType;
  };

  const getTranslatedTransmission = (transmission: string) => {
    const translations: Record<string, string> = {
      'manual': 'Manuale',
      'automatic': 'Automatico',
      'semi_automatic': 'Semiautomatico',
      'cvt': 'CVT'
    };
    return translations[transmission] || transmission;
  };

  // Determina il titolo della pagina in base ai filtri
  const getPageDisplayTitle = () => {
    if (filters.isLuxury) return 'Auto di Lusso';
    if (filters.make?.length === 1) return `Auto ${filters.make[0]}`;
    return 'Catalogo Auto Usate';
  };

  const getPageDisplaySubtitle = () => {
    if (filters.isLuxury) return 'Scopri la nostra selezione di auto di lusso e sportive';
    if (filters.make?.length === 1) return `Trova la ${filters.make[0]} perfetta per te`;
    return 'Trova l\'auto perfetta per te nel nostro ampio catalogo';
  };

  return (
    <>
      <CatalogHeader>
        <Container>
          <SearchTitle>
            <FaSearch />
            Cerca la tua prossima auto
          </SearchTitle>
        </Container>
      </CatalogHeader>

      <Container>
        {/* Sezione Filtri */}
        <FiltersSection>
          <FiltersTitle>
            <FaFilter /> Filtra la Ricerca
          </FiltersTitle>
          
          <FiltersGrid>
            <FilterGroup>
              <label htmlFor="make">Marca</label>
              <select 
                id="make"
                value={localFilters.make?.[0] || ''}
                onChange={(e) => handleFilterChange('make', e.target.value ? [e.target.value] : undefined)}
              >
                <option value="">Tutte le marche</option>
                <option value="Audi">Audi</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Ford">Ford</option>
                <option value="Fiat">Fiat</option>
                <option value="Abarth">Abarth</option>
                <option value="Alfa Romeo">Alfa Romeo</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Porsche">Porsche</option>
              </select>
            </FilterGroup>

            <FilterGroup>
              <label htmlFor="priceMax">Prezzo massimo</label>
              <input 
                type="text" 
                id="priceMax"
                placeholder="Es. 20.000€"
                value={localFilters.priceMax ? formatPrice(localFilters.priceMax.toString()) : ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  handleFilterChange('priceMax', value ? parseInt(value) : undefined);
                }}
              />
            </FilterGroup>

            <FilterGroup>
              <label htmlFor="yearMin">Anno da</label>
              <input 
                type="number" 
                id="yearMin"
                placeholder="Es. 2015"
                value={localFilters.yearMin || ''}
                onChange={(e) => handleFilterChange('yearMin', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </FilterGroup>

            <FilterGroup>
              <label htmlFor="fuelType">Carburante</label>
              <select 
                id="fuelType"
                value={localFilters.fuelType?.[0] || ''}
                onChange={(e) => handleFilterChange('fuelType', e.target.value ? [e.target.value as FuelType] : undefined)}
              >
                <option value="">Tutti</option>
                <option value="petrol">Benzina</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Ibrido</option>
                <option value="electric">Elettrico</option>
                <option value="lpg">GPL</option>
              </select>
            </FilterGroup>

            <FilterGroup>
              <label htmlFor="transmission">Cambio</label>
              <select 
                id="transmission"
                value={localFilters.transmission?.[0] || ''}
                onChange={(e) => handleFilterChange('transmission', e.target.value ? [e.target.value as TransmissionType] : undefined)}
              >
                <option value="">Tutti</option>
                <option value="manual">Manuale</option>
                <option value="automatic">Automatico</option>
                <option value="semi_automatic">Semiautomatico</option>
              </select>
            </FilterGroup>

            <FilterGroup>
              <label htmlFor="mileageMax">Km massimi</label>
              <input 
                type="number" 
                id="mileageMax"
                placeholder="Es. 100000"
                value={localFilters.mileageMax || ''}
                onChange={(e) => handleFilterChange('mileageMax', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </FilterGroup>
          </FiltersGrid>

          <FiltersActions>
            <ClearFiltersButton onClick={handleClearFilters} variant="outline">
              Rimuovi Filtri
            </ClearFiltersButton>
            <Button onClick={handleApplyFilters} variant="primary">
              <FaSearch /> Applica Filtri
            </Button>
          </FiltersActions>
        </FiltersSection>

        {/* Risultati */}
        <ResultsSection>
          <ResultsHeader>
            <ResultsCount>
              {isLoading ? 'Caricamento...' : 
               error ? 'Errore nel caricamento' :
               `${searchResult?.total || 0} auto trovate`}
            </ResultsCount>
            
            {searchResult && searchResult.cars.length > 0 && (
              <SortingControls>
                <label>Ordina per:</label>
                <select 
                  value={`${sorting.field}-${sorting.direction}`}
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split('-');
                    setSorting({ field: field as any, direction: direction as 'asc' | 'desc' });
                  }}
                >
                  <option value="createdAt-desc">Più recenti</option>
                  <option value="price-asc">Prezzo crescente</option>
                  <option value="price-desc">Prezzo decrescente</option>
                  <option value="year-desc">Anno decrescente</option>
                  <option value="mileage-asc">Km crescenti</option>
                </select>
              </SortingControls>
            )}
          </ResultsHeader>

          {isLoading && (
            <LoadingContainer>
              <Loading type="spinner" size="lg" text="Caricamento auto in corso..." />
            </LoadingContainer>
          )}
          
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
                  <Button onClick={handleClearFilters}>
                    Rimuovi Filtri
                  </Button>
                </NoResults>
              ) : (
                <>
                  <CarsGrid>
                    {searchResult.cars.map((car) => (
                      <CarCard key={car.id} hoverable onClick={() => handleCarClick(car.id)}>
                        <CarImageContainer>
                          <CarLocationBadge>
                            <FaMapMarkerAlt />
                            {car.location.city}
                          </CarLocationBadge>
                          {car.images?.[0] ? (
                            <img 
                              src={car.images[0].url} 
                              alt={car.images[0].altText}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'flex';
                                target.style.alignItems = 'center';
                                target.style.justifyContent = 'center';
                                target.style.fontSize = '4rem';
                                target.innerHTML = '🚗';
                              }}
                            />
                          ) : (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              height: '100%',
                              fontSize: '4rem',
                              opacity: 0.7
                            }}>
                              🚗
                            </div>
                          )}
                        </CarImageContainer>

                        <CarContent>
                          <CarHeader>
                            <CarMake>{car.make}</CarMake>
                            <CarModel>{car.model}</CarModel>
                            <CarPrice>€ {car.price.toLocaleString('it-IT')}</CarPrice>
                          </CarHeader>

                          <CarDivider />

                          <CarSpecs>
                            {car.features && car.features.length > 0 && (
                              <CarTags>
                                {car.features.slice(0, 2).map((feature, index) => (
                                  <CarTag key={index}>{feature}</CarTag>
                                ))}
                              </CarTags>
                            )}

                            <CarSpecsGrid>
                              <CarSpec>
                                <strong>{car.mileage.toLocaleString()} km</strong>
                              </CarSpec>
                              <CarSpec>
                                <strong>{getTranslatedFuelType(car.fuelType)}</strong>
                              </CarSpec>
                              <CarSpec>
                                <strong>{car.year}</strong>
                              </CarSpec>
                              <CarSpec>
                                <strong>{getTranslatedTransmission(car.transmission)}</strong>
                              </CarSpec>
                              <CarSpec>
                                <strong>{car.power} kW</strong>
                              </CarSpec>
                              <CarSpec>
                                <strong>{car.doors} porte</strong>
                              </CarSpec>
                            </CarSpecsGrid>
                          </CarSpecs>

                          <CarActions>
                            <ActionButton 
                              variant="secondary"
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleCarClick(car.id);
                              }}
                            >
                              Scopri di più <FaArrowRight />
                            </ActionButton>
                          </CarActions>
                        </CarContent>
                      </CarCard>
                    ))}
                  </CarsGrid>

                  {/* Paginazione */}
                  {searchResult.total > 20 && (
                    <PaginationContainer>
                      {page > 1 && (
                        <PaginationButton 
                          variant="outline" 
                          onClick={() => setPage(page - 1)}
                        >
                          ← Precedente
                        </PaginationButton>
                      )}
                      
                      <span style={{ margin: '0 1rem', color: '#666' }}>
                        Pagina {page} di {Math.ceil(searchResult.total / 20)}
                      </span>
                      
                      {searchResult.hasMore && (
                        <PaginationButton 
                          variant="outline" 
                          onClick={() => setPage(page + 1)}
                        >
                          Successiva →
                        </PaginationButton>
                      )}
                    </PaginationContainer>
                  )}
                </>
              )}
            </>
          )}
        </ResultsSection>
      </Container>
    </>
  );
};

export default CatalogPage;