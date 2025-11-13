import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, MapPin, Home, Bath, Maximize, Heart, Eye, Map, List, ChevronDown, Mail } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Properties.css';
import supabase from "../supabaseClient"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/properties/${property.id}`} className="property-card-link">
    <div className="property-card">
      <div className="card-image-container">
        <img src={property.image_urls[0]} alt={property.name} className="card-image" />
        <div className="card-type-badge">{property.type}</div>
        <div className="card-actions">
            <button className="action-btn"><Heart size={18} /></button>
            <button className="action-btn"><Eye size={18} /></button>
        </div>
      </div>

      <div className="card-content">
        <div className="card-top">
          <div className="card-header">
            <h3 className="card-title">{property.name}</h3>
            <p className="card-price">€{property.price.toLocaleString()}</p>
          </div>
          <div className="card-location">
            <MapPin size={15} />
            <span>{property.zone}</span>
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
                <button className="details-btn">Vezi detalii</button>
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

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState('list'); //list, split, map
  const [sortBy, setSortBy] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '',
    zone: '',
    minPrice: '',
    maxPrice: '',
    minSurface: '',
    maxSurface: '',
    rooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    const getProperties = async () => {
      setIsLoading(true);

      let query = supabase
        .from('properties')
        .select('*');
      
      const zone = searchParams.get('zone');
      const type = searchParams.get('type');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');

      if (zone)
        query = query.eq('zone', zone);
      if (type)
        query = query.eq('type', type);
      if (minPrice)
        query = query.gte('price', minPrice);
      if(maxPrice)
        query = query.lte('price', maxPrice);

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
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
             <div className="filter-group">
              <label>Tip Proprietate</label>
              <select value={filters.propertyType} onChange={(e) => handleFilterChange('propertyType', e.target.value)}>
                <option value="">Toate</option>
                <option value="Birou">Birou</option>
              </select>
            </div>
             <div className="filter-group">
              <label>Zonă</label>
              <input type="text" placeholder="ex: Sector 1" value={filters.zone} onChange={(e) => handleFilterChange('zone', e.target.value)} />
            </div>
          </aside>
        )}

        {viewMode !== 'map' && (
          <main className="properties-list-container">
            <div className="results-header">
              <h2>{properties.length} proprietăți găsite</h2>
              <div className="sort-dropdown">
                 <button className="sort-button" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                  Sortează <ChevronDown size={16} />
                </button>
                {showSortDropdown && (
                  <div className="sort-options">
                     <button onClick={() => {setSortBy('price-asc'); setShowSortDropdown(false);}}>Preț crescător</button>
                     <button onClick={() => {setSortBy('price-desc'); setShowSortDropdown(false);}}>Preț descrescător</button>
                  </div>
                )}
              </div>
            </div>

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