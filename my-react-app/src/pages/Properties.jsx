import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, MapPin, Home, Bath, Maximize, Heart, Eye, Map, List, ChevronDown } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Properties.css';
import supabase from "../supabaseClient"

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/properties/${property.id}`} className="property-card-link">
    <div className="property-card">
      <div className="card-image-container">
        <img src={property.image_url} alt={property.name} className="card-image" />
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
          <p className="card-description">{property.description}</p>
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

  // harta leaflet
  useEffect(() => {
    if (document.getElementById('map') && !document.getElementById('map')._leaflet_id) {
      const map = L.map('map').setView([44.4268, 26.1025], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      properties.forEach(property => {
        L.marker([property.lat, property.lng]).addTo(map)
          .bindPopup(`<b>${property.name}</b><br>€${property.price}`);
      });
      
      return () => {
        map.remove();
      };
    }
  }, [viewMode, properties]); 

  if (isLoading) {
    return <div>Please wait...</div>;
  }

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

            <div className="properties-grid-layout">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </main>
        )}

        {viewMode !== 'list' && (
          <div className="map-area">
            <div id="map" className="leaflet-map"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;