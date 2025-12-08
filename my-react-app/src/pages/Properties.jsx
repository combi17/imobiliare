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
    transactionType: 'Tranzacție',
    city: 'Oraș',
    zone: 'Zonă',
    minPrice: 'Preț min',
    maxPrice: 'Preț max',
    sizeRanges: 'Suprafață',
    rooms: 'Camere',
    yearBuiltRanges: 'An construcție',
    bathrooms: 'Băi'
  };
  
  if (key === 'sizeRanges' && Array.isArray(value)) {
    return `${labels[key]}: ${value.join(', ')}`;
  }
  
  if (key === 'yearBuiltRanges' && Array.isArray(value)) {
    const readableYears = value.map(v => {
      const yearLabels = {
        'before-2000': 'înainte 2000',
        '2000-2010': '2000-2010',
        '2010-2015': '2010-2015',
        '2015-2020': '2015-2020',
        'after-2020': 'după 2020'
      };
      return yearLabels[v] || v;
    });
    return `${labels[key]}: ${readableYears.join(', ')}`;
  }

  if (key === 'rooms') {
    const roomsLabels = {
      '1': '1 cameră',
      '2': '2 camere',
      '3': '3 camere',
      '4': '4 camere',
      '5+': '5+ camere'
    };
    return `${labels[key]}: ${roomsLabels[value] || value}`;
  }
  
  return `${labels[key]}: ${value}`;
};

  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && value !== '' && value !== 'undefined';
  });
  
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    
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
        placeholder="€ Min"
        value={minPrice || ''}
        onChange={(e) => onMinChange(e.target.value)}
        className="price-input"
      />
      
      <label style={{ marginTop: '1rem' }}>Preț maxim</label>
      <input 
        type="number"
        placeholder="€ Max"
        value={maxPrice || ''}
        onChange={(e) => onMaxChange(e.target.value)}
        className="price-input"
      />
    </div>
  );
};

const SizeCheckboxFilter = ({ selectedRanges, onRangeToggle }) => {
  const sizeRanges = [
    { label: ' 0-50 mp', value: '0-50' },
    { label: ' 50-100 mp', value: '50-100' },
    { label: ' 100-150 mp', value: '100-150' },
    { label: ' 150-200 mp', value: '150-200' },
    { label: ' 200+ mp', value: '200+' }
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

const YearBuiltCheckboxFilter = ({ selectedRanges, onRangeToggle }) => {
  const yearOptions = [
    { label: ' Înainte de 2000', value: 'before-2000' },
    { label: ' 2000-2010', value: '2000-2010' },
    { label: ' 2010-2015', value: '2010-2015' },
    { label: ' 2015-2020', value: '2015-2020' },
    { label: ' După 2020', value: 'after-2020' }
  ];

  const safeSelectedRanges = selectedRanges || [];

  return (
    <div className="filter-group">
      <label>An Construcție</label>
      <div className="checkbox-list">
        {yearOptions.map(option => (
          <label key={option.value} className="checkbox-item">
            <input
              type="checkbox"
              checked={safeSelectedRanges.includes(option.value)}
              onChange={() => onRangeToggle(option.value)}
            />
            <span>{option.label}</span>
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    propertyType: '',
    transactionType: '',
    zone: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    sizeRanges: [],
    rooms: '',
    yearBuiltRanges: [],
  });

  const propertyTypeOptions = [
    { label: 'Toate', value: '' },
    { label: 'Birou', value: 'Birou' },
    { label: 'Apartament', value: 'Apartament' },
    { label: 'Vilă', value: 'Vila' }
  ];

  const roomsOptions = [
    { label: 'Orice', value: '' },
    { label: '1 cameră', value: '1' },
    { label: '2 camere', value: '2' },
    { label: '3 camere', value: '3' },
    { label: '4 camere', value: '4' },
    { label: '5+ camere', value: '5+' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setViewMode('list');
      }
    };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  useEffect(() => {
      if (showMobileFilters) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset'; 
      }
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, [showMobileFilters]);

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
      const rooms = searchParams.get('rooms');
      const sizeRangesParam = searchParams.get('sizeRanges');
      const yearBuiltRangesParam = searchParams.get('yearBuiltRanges');

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

      if (sizeRangesParam) {
        const ranges = sizeRangesParam.split(',');

        const orConditions = ranges.map(range => {
          if (range === '0-50') {
            return 'size.lte.50';
          } else if (range === '50-100') {
            return 'size.gte.50,size.lte.100';
          } else if (range === '100-150') {
            return 'size.gte.100,size.lte.150';
          } else if (range === '150-200') {
            return 'size.gte.150,size.lte.200';
          } else if (range === '200+') {
            return 'size.gte.200';
          }
          return null;
        }).filter(Boolean);

        if (orConditions.length > 0) {
          query = query.or(orConditions.join(','));
        }
      }

      if (yearBuiltRangesParam) {
        const ranges = yearBuiltRangesParam.split(',');
        
        const orConditions = ranges.map(range => {
          if (range === 'before-2000') {
            return 'year.lt.2000';
          } else if (range === '2000-2010') {
            return 'year.gte.2000,year.lte.2010';
          } else if (range === '2010-2015') {
            return 'year.gte.2010,year.lte.2015';
          } else if (range === '2015-2020') {
            return 'year.gte.2015,year.lte.2020';
          } else if (range === 'after-2020') {
            return 'year.gt.2020';
          }
          return null;
        }).filter(Boolean);

        if (orConditions.length > 0) {
          query = query.or(orConditions.join(','));
        }
      }

      if (rooms) {
        if (rooms === '5+') {
          query = query.gte('rooms', 5);
        } else {
          query = query.eq('rooms', rooms);
        }
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

  const sortDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortDropdown]);


const handleFilterChange = (key, value) => {
  const updatedFilters = { ...filters, [key]: value };
  setFilters(updatedFilters);
  
  if (key === 'minPrice' || key === 'maxPrice') {
    clearTimeout(window.priceTimeout);
    window.priceTimeout = setTimeout(() => {
      applyFiltersToURL(updatedFilters);
    }, 1000);
  } else {
    setTimeout(() => applyFiltersToURL(updatedFilters), 300);
  }
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
    setTimeout(() => applyFiltersToURL(newFilters), 300);
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
    
    if (key === 'sizeRanges' || key === 'yearBuiltRanges') {
      if (value && value.length > 0) {
        currentParams.set(key, value.join(','));
      } else {
        currentParams.delete(key);
      }
    } else if (value && value !== '' && value !== 'undefined') {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
  });

  navigate(`/properties?${currentParams.toString()}`);
};

/* const handleRangeChange = (key, value) => {
  const updatedFilters = { ...filters, [key]: value };
  setFilters(updatedFilters);
  
  clearTimeout(window.rangeTimeout);
  window.rangeTimeout = setTimeout(() => {
    applyFiltersToURL(updatedFilters);
  }, 800);
}; */

const handleRemoveFilter = (key) => {
  const updatedFilters = { 
    ...filters, 
    [key]: Array.isArray(filters[key]) ? [] : '' 
  };
  setFilters(updatedFilters);
  applyFiltersToURL(updatedFilters);
};

const handleClearAllFilters = () => {
  const clearedFilters = {
    propertyType: '',
    transactionType: '',
    zone: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    sizeRanges: [],
    rooms: '',
    yearBuiltRanges: [],
    bathrooms: ''
  };
  setFilters(clearedFilters);
  navigate('/properties');
};

const handleYearBuiltRangeToggle = (range) => {
  const updatedRanges = filters.yearBuiltRanges.includes(range)
    ? filters.yearBuiltRanges.filter(r => r !== range)
    : [...filters.yearBuiltRanges, range];
  
  const updatedFilters = { ...filters, yearBuiltRanges: updatedRanges };
  setFilters(updatedFilters);
  
  setTimeout(() => applyFiltersToURL(updatedFilters), 300);
};

  useEffect(() => {
    const initialFilters = {
      propertyType: searchParams.get('propertyType') || '',
      transactionType: searchParams.get('transactionType') || '',
      zone: searchParams.get('zone') || '',
      city: searchParams.get('city') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sizeRanges: searchParams.get('sizeRanges')?.split(',').filter(Boolean) || [],
      rooms: searchParams.get('rooms') || '',
      yearBuiltRanges: searchParams.get('yearBuiltRanges')?.split(',').filter(Boolean) || [],
    };
    
    setFilters(initialFilters);
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
      {isMobile && (
      <button 
        className="mobile-filters-toggle"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <Filter size={20} />
        Filtrează
        {Object.values(filters).filter(v => 
          Array.isArray(v) ? v.length > 0 : v && v !== ''
        ).length > 0 && (
          <span className="filters-badge">
            {Object.values(filters).filter(v => 
              Array.isArray(v) ? v.length > 0 : v && v !== ''
            ).length}
          </span>
        )}
      </button>
      )}

      {showMobileFilters && (
        <div 
          className="mobile-filters-overlay"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

    {!isMobile && (      
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
      )}

      <div className={`main-content-area ${viewMode}`}>
        {viewMode !== 'map' && (
          <aside className={`filters-sidebar ${showMobileFilters ? 'mobile-active' : ''}`}>
            <div className="filters-header">
              <div className="filters-header-left">
                <Filter size={20} />
                <h3>Filtre</h3>
              </div>
              <button 
                className="close-filters-btn"
                onClick={() => setShowMobileFilters(false)}
              >
                <X size={24} />
              </button>
            </div>

            <CustomSelectFilter
                 label="Tip Proprietate"
                 options={propertyTypeOptions}
                 currentValue={filters.propertyType}
                 onSelectChange={(value) => handleFilterChange('propertyType', value)}
             />            
            
            <CustomSelectFilter
              label="Tip Tranzacție"
              options={[
                { label: 'Toate', value: '' },
                { label: 'Vânzare', value: 'Vanzare' },
                { label: 'Închiriere', value: 'Inchiriere' }
              ]}
              currentValue={filters.transactionType}
              onSelectChange={(value) => handleFilterChange('transactionType', value)}
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

            <CustomSelectFilter
              label="Număr Camere"
              options={roomsOptions}
              currentValue={filters.rooms}
              onSelectChange={(value) => handleFilterChange('rooms', value)}
            />

            <YearBuiltCheckboxFilter
              selectedRanges={filters.yearBuiltRanges}
              onRangeToggle={handleYearBuiltRangeToggle}
            />
          </aside>
        )}

        {isMobile && showMobileFilters && (
            <div className="mobile-filters-footer">
                <button 
                  className="apply-filters-btn"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Aplică Filtrele
                </button>
            </div>
        )}

        {viewMode !== 'map' && (
          <main className="properties-list-container">
            <div className="results-header">
              <h2>{properties.length} proprietăți găsite</h2>
              <div className="sort-dropdown" ref={sortDropdownRef}>
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