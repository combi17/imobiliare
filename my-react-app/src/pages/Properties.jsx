import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Filter, MapPin, Home, Bath, Maximize, Map, List, ChevronDown, Mail, X} from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Properties.css';
import supabase from "../supabaseClient";
import GroupedLocationFilter from '../components/GroupedLocationFilter';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const flagUAEUrl = "https://flagcdn.com/16x12/ae.png";

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getFilterLabel = (key, value) => {
    const labels = {
      propertyType: 'Tip',
      city: 'Oraș',
      zone: 'Zonă',
      minPrice: 'Preț min',
      maxPrice: 'Preț max',
      minSize: 'Suprafață min',
      maxSize: 'Suprafață max'
    };
    return `${labels[key]}: ${value}`;
  };

  const activeFilters = Object.entries(filters).filter(([key, value]) => value && value !== '');
  
  if (activeFilters.length === 0) return null;

  return (
    <div className="active-filters-bar">
      <span className="active-filters-label">Filtre active:</span>
      <div className="active-filters-list">
        {activeFilters.map(([key, value]) => (
          <div key={key} className="filter-chip">
            <span>{getFilterLabel(key, value)}</span>
            <button onClick={() => onRemoveFilter(key)} className="filter-chip-remove">
              <X size={14} />
            </button>
          </div>
        ))}
        {activeFilters.length > 1 && (
          <button onClick={onClearAll} className="clear-all-filters">
            Șterge toate
          </button>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  const isDubai = property.city === 'Dubai' || property.country === 'UAE';

  const isRental = property.transaction_type === 'Inchiriere';
  const priceSuffix = isRental ? '/lună' : '';
  const formattedPrice = property.price.toLocaleString();
  
  return (
    <Link to={`/properties/${property.id}`} className="property-card-link">
    <div className={`property-card ${isDubai ? 'property-card-dubai' : ''}`}>
      <div className="card-image-container">
        <img src={property.image_urls[0]} alt={property.name} className="card-image" />
        <div className="card-type-badge">{property.transaction_type}</div>

        {isDubai && (
          <div className="dubai-indicator">
            <img src={flagUAEUrl} alt="UAE Flag" className="flag-icon" /> Dubai
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="card-top">
          <div className="card-header">
            <h3 className="card-title">{property.name}</h3>
            <p className={`card-price ${isDubai ? 'card-price-dubai' : ''}`}>
              €{formattedPrice}
              {priceSuffix && <span className="price-suffix">{priceSuffix}</span>}
            </p>
          </div>
          <div className="card-location">
            <MapPin size={15} />
            {isDubai ? (
              <span className="location-country">Dubai, UAE</span>
            ) : (
              <span>{property.zone}</span>
            )}
          </div>
          <p className="card-description">{property.preview_description}</p>
        </div>
        
        <div className="card-bottom">
           <div className="card-features">
                <div className="feature-item">
                    <Maximize size={16} />
                    <span>{property.size} mp</span>
                </div>
                <div className="feature-item">
                    <Home size={16} />
                    <span>{property.rooms} camere</span>
                </div>
                <div className="feature-item">
                    <Bath size={16} />
                    <span>{property.baths} băi</span>
                </div>
            </div>
            <div className="card-footer">
                <span className="card-year">Construit în {property.year}</span>
                <button className={`details-btn ${isDubai ? 'details-btn-dubai' : ''}`}>
                  Vezi detalii
                </button>
            </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

const ContactBanner = () => {
    return (
        <div className="contact-banner">
            <div className="contact-banner-content">
                <div className="contact-banner-left">
                    <h3 className="contact-banner-title">Nu ai găsit proprietatea perfectă?</h3>
                    <p className="contact-banner-subtitle">
                        Echipa noastră te poate ajuta să găsești exact ce cauți. Contactează-ne și îți vom oferi soluții personalizate.
                    </p>
                </div>
                <div className="contact-banner-right">
                    <Link to="/contact" className="contact-button">
                        <Mail size={20} />
                        Contactează-ne
                    </Link>
                </div>
            </div>
        </div>
    );
};

const CustomSelectFilter = ({ label, options, currentValue, onSelectChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const getDisplayLabel = () => {
        const selectedOption = options.find(opt => opt.value === currentValue);
        return selectedOption ? selectedOption.label : options[0].label;
    };

    const handleSelection = (value) => {
        onSelectChange(value);
        setIsOpen(false);
    };
    
    return (
        <div className="filter-group">
            <label>{label}</label>
            <div 
                className="custom-dropdown-container" 
                ref={dropdownRef}
                style={{ position: 'relative' }} 
            >
                <div 
                    className={`dropdown-display-area ${isOpen ? 'active' : ''}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {getDisplayLabel()}
                    <ChevronDown size={16} className={`chevron-icon ${isOpen ? 'rotate-up' : ''}`} />
                </div>
                
                {isOpen && (
                    <div className="dropdown-options-list">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`dropdown-item-zone ${option.value === currentValue ? 'selected-item' : ''}`}
                                onClick={() => handleSelection(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const PriceRangeFilter = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  return (
    <div className="filter-group">
      <label>Preț minim</label>
      <input 
        type="number"
        placeholder="€0"
        value={minPrice || ''}
        onChange={(e) => onMinChange(e.target.value)}
        className="price-input"
      />
      
      <label style={{ marginTop: '1rem' }}>Preț maxim</label>
      <input 
        type="number"
        placeholder="€Max"
        value={maxPrice || ''}
        onChange={(e) => onMaxChange(e.target.value)}
        className="price-input"
      />
    </div>
  );
};

const SizeCheckboxFilter = ({ selectedRanges, onRangeToggle }) => {
  const sizeRanges = [
    { label: '0-50 mp', value: '0-50' },
    { label: '50-100 mp', value: '50-100' },
    { label: '100-150 mp', value: '100-150' },
    { label: '150-200 mp', value: '150-200' },
    { label: '200+ mp', value: '200+' }
  ];

  return (
    <div className="filter-group">
      <label>Suprafață</label>
      <div className="checkbox-list">
        {sizeRanges.map(range => (
          <label key={range.value} className="checkbox-item">
            <input
              type="checkbox"
              checked={selectedRanges.includes(range.value)}
              onChange={() => onRangeToggle(range.value)}
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState('list'); //list, split, map
  const currentSortBy = searchParams.get('sortBy');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '',
    zone: '',
    minPrice: '',
    maxPrice: '',
    sizeRanges: [],
    rooms: '',
    bathrooms: ''
  });

  const propertyTypeOptions = [
      { label: 'Toate', value: '' },
      { label: 'Birou', value: 'Birou' },
      { label: 'Apartament', value: 'Casa Vacanta' },
      { label: 'Vilă', value: 'Vila' }
  ];

  useEffect(() => {
    const getProperties = async () => {
      setIsLoading(true);

      let query = supabase
        .from('properties')
        .select('*');
      
      const zone = searchParams.get('zone');
      const transaction_type = searchParams.get('transaction_type');
      const type = searchParams.get('type');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const city = searchParams.get('city');
      const sortParam = searchParams.get('sortBy');

      if (zone)
        query = query.eq('zone', zone);
      if (type)
        query = query.eq('type', type);
      if (minPrice)
        query = query.gte('price', minPrice);
      if (maxPrice)
        query = query.lte('price', maxPrice);
      if (city)
        query = query.eq('city', city);
      if (transaction_type)
        query = query.eq('transaction_type', transaction_type);

      const sizeRangesParam = searchParams.get('sizeRanges');
      if (sizeRangesParam) {
        const ranges = sizeRangesParam.split(',');
        let sizeFilter = null;
        
        ranges.forEach(range => {
          if (range === '0-50') {
            if (!sizeFilter) sizeFilter = query.lte('size', 50);
            else sizeFilter = sizeFilter.or('size.lte.50');
          } else if (range === '50-100') {
            if (!sizeFilter) sizeFilter = query.gte('size', 50).lte('size', 100);
            else sizeFilter = sizeFilter.or('size.gte.50,size.lte.100');
          } else if (range === '100-150') {
            if (!sizeFilter) sizeFilter = query.gte('size', 100).lte('size', 150);
            else sizeFilter = sizeFilter.or('size.gte.100,size.lte.150');
          } else if (range === '150-200') {
            if (!sizeFilter) sizeFilter = query.gte('size', 150).lte('size', 200);
            else sizeFilter = sizeFilter.or('size.gte.150,size.lte.200');
          } else if (range === '200+') {
            if (!sizeFilter) sizeFilter = query.gte('size', 200);
            else sizeFilter = sizeFilter.or('size.gte.200');
          }
        });
        
        if (sizeFilter) query = sizeFilter;
      }

      if (sortParam) {
        if (sortParam === 'price-asc') {
          query = query.order('price', { ascending: true });
        } 
        else if (sortParam === 'price-desc') {
          query = query.order('price', { ascending: false });
        }
      } 
      else {
        query = query.order('created_at', { ascending: false });
    }

      const { data, error } = await query;

      if (error) {
        console.error("Eroare la preluarea datelor", error);
      }
      else {
        setProperties(data);
      }
      setIsLoading(false);
    };
    getProperties();
  }, [searchParams]);


const handleFilterChange = (key, value) => {
  const updatedFilters = { ...filters, [key]: value };
  setFilters(updatedFilters);
  setTimeout(() => applyFiltersToURL(updatedFilters), 300);
};

  const handleSortChange = (sortOption) => {
    const currentParams = new URLSearchParams(searchParams);
    if (sortOption) {
      currentParams.set('sortBy', sortOption);
    }
    else {
      currentParams.delete('sortBy')
    }
    navigate(`/properties?${currentParams.toString()}`);
    setShowSortDropdown(false);
  }

  const handleLocationFilterChange = (selectedValue) => {
    let newFilters = { ...filters };
    delete newFilters.city;
    delete newFilters.zone;
    
    if (selectedValue) {
        if (selectedValue.startsWith('city_')) {
            const cityName = selectedValue.replace('city_', '');
            newFilters.city = cityName;
            
        } else if (selectedValue.startsWith('zone_')) {
            const zoneName = selectedValue.replace('zone_', '');
            newFilters.zone = zoneName; 
        }
    }
    setFilters(newFilters);
};

const handleSizeRangeToggle = (range) => {
  const updatedRanges = filters.sizeRanges.includes(range)
    ? filters.sizeRanges.filter(r => r !== range)
    : [...filters.sizeRanges, range];
  
  const updatedFilters = { ...filters, sizeRanges: updatedRanges };
  setFilters(updatedFilters);
  
  setTimeout(() => applyFiltersToURL(updatedFilters), 300);
};

const applyFiltersToURL = (updatedFilters) => {
  const currentParams = new URLSearchParams(searchParams);
  
  Object.keys(updatedFilters).forEach(key => {
    const value = updatedFilters[key];
    
    if (key === 'sizeRanges') {
      if (value && value.length > 0) {
        currentParams.set('sizeRanges', value.join(','));
      } else {
        currentParams.delete('sizeRanges');
      }
    } else if (value && value.trim() !== '') {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
  });

  navigate(`/properties?${currentParams.toString()}`);
};

const handleRangeChange = (key, value) => {
  const updatedFilters = { ...filters, [key]: value };
  setFilters(updatedFilters);
  
  clearTimeout(window.rangeTimeout);
  window.rangeTimeout = setTimeout(() => {
    applyFiltersToURL(updatedFilters);
  }, 800);
};

const handleRemoveFilter = (key) => {
  const updatedFilters = { ...filters, [key]: '' };
  setFilters(updatedFilters);
  applyFiltersToURL(updatedFilters);
};

const handleClearAllFilters = () => {
  const clearedFilters = Object.keys(filters).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});
  setFilters(clearedFilters);
  navigate('/properties');
};

  useEffect(() => {
    const initialFilters = {};
    const filterKeys = ['propertyType', 'zone', 'minPrice', 'maxPrice', 'minSurface', 'maxSurface', 'rooms', 'bathrooms'];
    let shouldUpdateState = false;

    filterKeys.forEach(key => {
        const paramValue = searchParams.get(key);
        if (paramValue) {
            initialFilters[key] = paramValue;
            shouldUpdateState = true;
        } else {
            initialFilters[key] = ''; 
        }
    });

    if (shouldUpdateState) {
        setFilters(prev => ({ ...prev, ...initialFilters }));
    }
    
}, [searchParams]);

  // harta leaflet SCHIMBATA IN MAPBOX
   useEffect(() => {
  if (viewMode !== 'list' && properties.length > 0) {
    const mapElement = document.getElementById('map');
    
    if (mapElement && !mapElement._mapboxInitialized) {
      mapElement._mapboxInitialized = true;
      
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [26.1025, 44.4268],
        zoom: 12,
        pitch: 0,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      properties.forEach(property => {
        const popupContent = document.createElement('div');
        popupContent.className = 'map-popup-content';
        popupContent.style.cursor = 'pointer';
        popupContent.innerHTML = `
          <img 
            src="${property.image_urls[0]}" 
            alt="${property.name}"
            style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px 8px 0 0;"
          />
          <div style="padding: 12px;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #212529;">
              ${property.name}
            </h3>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="flex: 1;">
                <p style="margin: 0 0 6px 0; color: #6c757d; font-size: 13px; display: flex; align-items: center; gap: 5px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  ${property.zone}
                </p>
                <p style="margin: 0; color: #6c757d; font-size: 13px; display: flex; align-items: center; gap: 5px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                  ${property.size} mp
                </p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; color: #1DA397; font-weight: 700; font-size: 22px; line-height: 1;">
                  €${property.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        `;

        popupContent.addEventListener('click', () => {
          window.location.href = `/properties/${property.id}`;
        });

        const popup = new mapboxgl.Popup({ 
          offset: 25,
          closeButton: true,
          className: 'custom-map-popup',
          maxWidth: '280px'
        }).setDOMContent(popupContent);

        new mapboxgl.Marker({ 
          color: '#1DA397',
          scale: 1.1
        })
          .setLngLat([property.lng, property.lat])
          .setPopup(popup)
          .addTo(map);
      });

      return () => {
        if (mapElement._mapboxInitialized) {
          mapElement._mapboxInitialized = false;
          map.remove();
        }
      };
    }
  }
}, [viewMode, properties]);

  if (isLoading) {
    return <div>Please wait...</div>;
  }

  const noResults = properties.length === 0;

  return (
    <div className="properties-page-container">
      <div className="view-header">
        <div className="view-controls">
           <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
            Listă
          </button>
          <button 
            className={`view-btn ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
          >
            <Map size={18} />
            Hartă + Listă
          </button>
          <button 
            className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            <Map size={18} />
            Doar Hartă
          </button>
        </div>
      </div>

      <div className={`main-content-area ${viewMode}`}>
        {viewMode !== 'map' && (
          <aside className="filters-sidebar">
             <div className="filters-header">
              <Filter size={20} />
              <h3>Filtre</h3>
            </div>
            <CustomSelectFilter
                 label="Tip Proprietate"
                 options={propertyTypeOptions}
                 currentValue={filters.propertyType}
                 onSelectChange={(value) => handleFilterChange('propertyType', value)}
             />

            <GroupedLocationFilter
              onFilterChange={(selectedValue) => handleLocationFilterChange(selectedValue)} 
            />
            <PriceRangeFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onMinChange={(value) => handleFilterChange('minPrice', value)}
              onMaxChange={(value) => handleFilterChange('maxPrice', value)}
            />

            <SizeCheckboxFilter
              selectedRanges={filters.sizeRanges}
              onRangeToggle={handleSizeRangeToggle}
            />
          </aside>
        )}

        {viewMode !== 'map' && (
          <main className="properties-list-container">
            <div className="results-header">
              <h2>{properties.length} proprietăți găsite</h2>
              <div className="sort-dropdown">
                 <button className="sort-button" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                  {
                    currentSortBy === 'price-asc' ? 'Preț crescător' : 
                    currentSortBy === 'price-desc' ? 'Preț descrescător' : 'Sortează'
                  }
                  <ChevronDown size={16} />
                </button>
                {showSortDropdown && (
                  <div className="sort-options">
                    <button 
                      onClick={() => handleSortChange('price-asc')}
                      className={currentSortBy === 'price-asc' ? 'active-sort-option' : ''}
                    >
                      Preț crescător
                    </button>
                    <button 
                      onClick={() => handleSortChange('price-desc')}
                      className={currentSortBy === 'price-desc' ? 'active-sort-option' : ''}
                    >
                      Preț descrescător
                    </button>
                  </div>
                )}
              </div>
            </div>

            <ActiveFilters 
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {noResults ? (
              <div className="no-results-message">
                Nu am găsit nicio proprietate care să se potrivească criteriilor tale de căutare.
              </div>
            ) : (
              <div className="properties-grid-layout">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </main>
        )}
      {viewMode !== 'list' && (
        <div className="map-area">
          <div id="map" className="#map"></div>
        </div>
        )}
        </div>
      <ContactBanner />     
      </div>
    );
  };

export default Properties;