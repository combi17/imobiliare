import React, { useState, useEffect } from 'react';
import { Filter, MapPin, Home, Bath, Maximize, Heart, Eye, Map, List, ChevronDown } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Properties.css';
import iancului from '../assets/iancului.png';
import eminescu from '../assets/eminescu.jpg';
import rosseti from '../assets/rosseti.jpg';

const Properties = () => {
  const [viewMode, setViewMode] = useState('split');
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

  const properties = [
    {
      id: 1,
      title: "Spatii Birouri zona Magheru",
      price: 15,
      surface: 274,
      rooms: 5,
      bathrooms: 2,
      zone: "Sector 1",
      type: "Birou",
      image: rosseti,
      description: "Cladire simbol situata pe strada Maria Rosetti, in apropiere de Gradina Icoanei.",
      year: 2008,
      lat: 44.4411,
      lng: 26.1025
    },
    {
      id: 2,
      title: "Imobil Birouri liber integral zona Iancului",
      price: 5500,
      surface: 640,
      rooms: 7,
      bathrooms: 3,
      zone: "Iancului",
      type: "Birou",
      image: iancului,
      description: "Imobil cu curte interioara si 2 balcoane.",
      year: 2009,
      lat: 44.4383,
      lng: 26.1406
    },
    {
      id: 3,
      title: "Spatii Birouri premium în zona Eminescu",
      price: 16,
      surface: 1150,
      rooms: 8,
      bathrooms: 5,
      zone: "Eminescu",
      type: "Birou",
      image: eminescu,
      description: "Cladire de clasa A finalizata in 2019.",
      year: 2019,
      lat: 44.4448,
      lng: 26.1127
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // harta Leaflet
  useEffect(() => {
    const map = L.map('map', {
      center: [44.4268, 26.1025],
      zoom: 13,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    properties.forEach(property => {
      const marker = L.marker([property.lat, property.lng]).addTo(map);

      const popupContent = `
        <div style="min-width: 200px;">
          <img src="${property.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${property.title}</h4>
          <p style="margin: 0 0 8px 0; color: #1DA397; font-weight: 700; font-size: 16px;">€${property.price.toLocaleString()}</p>
          <div style="display: flex; gap: 12px; font-size: 12px; color: #666;">
            <span>${property.surface} mp</span>
            <span>${property.rooms} camere</span>
            <span>${property.bathrooms} băi</span>
          </div>
        </div>
      `;
      marker.bindPopup(popupContent);
    });

    return () => {
      map.remove();
    };
  }, [properties]);

  return (
    <div className="properties-page">
      <div className="view-header">
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
            Lista
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

      <div className={`main-content ${viewMode}`}>
        {viewMode !== 'map' && (
          <aside className="filters-sidebar">
            <div className="filters-header">
              <Filter size={20} />
              <h3>Filtre</h3>
            </div>

            <div className="filter-group">
              <label>Tip Proprietate</label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                <option value="">Toate tipurile</option>
                <option value="apartament">Apartament</option>
                <option value="casa">Casă</option>
                <option value="vila">Vilă</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Zonă</label>
              <select
                value={filters.zone}
                onChange={(e) => handleFilterChange('zone', e.target.value)}
              >
                <option value="">Toate zonele</option>
                <option value="sector1">Sector 1</option>
                <option value="sector2">Sector 2</option>
                <option value="pipera">Pipera</option>
                <option value="herastrau">Herastrau</option>
                <option value="amzei">Amzei</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Preț (€/mp)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Suprafață (mp)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minSurface}
                  onChange={(e) => handleFilterChange('minSurface', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxSurface}
                  onChange={(e) => handleFilterChange('maxSurface', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Numărul de camere</label>
              <select
                value={filters.rooms}
                onChange={(e) => handleFilterChange('rooms', e.target.value)}
              >
                <option value="">Orice număr</option>
                <option value="1">1 cameră</option>
                <option value="2">2 camere</option>
                <option value="3">3 camere</option>
                <option value="4">4+ camere</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Băi</label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
              >
                <option value="">Orice număr</option>
                <option value="1">1 baie</option>
                <option value="2">2 băi</option>
                <option value="3">3+ băi</option>
              </select>
            </div>

            <button className="clear-filters">Șterge filtrele</button>
          </aside>
        )}

        {viewMode !== 'map' && (
          <main className="properties-list">
            <div className="results-header">
              <h2>{properties.length} proprietăți găsite</h2>
              <div className="sort-dropdown">
                <button 
                  className="sort-button"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  Sortează
                  <ChevronDown size={16} />
                </button>
                {showSortDropdown && (
                  <div className="sort-options">
                    <button onClick={() => {setSortBy('price-asc'); setShowSortDropdown(false);}}>
                      Preț crescător
                    </button>
                    <button onClick={() => {setSortBy('price-desc'); setShowSortDropdown(false);}}>
                      Preț descrescător
                    </button>
                    <button onClick={() => {setSortBy('surface-asc'); setShowSortDropdown(false);}}>
                      Suprafață crescătoare
                    </button>
                    <button onClick={() => {setSortBy('surface-desc'); setShowSortDropdown(false);}}>
                      Suprafață descrescătoare
                    </button>
                    <button onClick={() => {setSortBy('newest'); setShowSortDropdown(false);}}>
                      Cele mai noi
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="properties-grid">
              {properties.map(property => (
                <div key={property.id} className="property-card">
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                    <div className="property-actions">
                      <button className="action-btn favorite">
                        <Heart size={18} />
                      </button>
                      <button className="action-btn view">
                        <Eye size={18} />
                      </button>
                    </div>
                    <div className="property-type">{property.type}</div>
                  </div>

                  <div className="property-content">
                    <div className="property-main-info">
                      <div className="property-header">
                        <h3 className="property-title">{property.title}</h3>
                        <div className="property-price">€{property.price.toLocaleString()}</div>
                      </div>

                      <div className="property-location">
                        <MapPin size={16} />
                        <span>{property.zone}</span>
                      </div>

                      <p className="property-description">{property.description}</p>
                    </div>

                    <div className="property-bottom-info">
                      <div className="property-details">
                        <div className="detail-item">
                          <Maximize size={16} />
                          <span>{property.surface} mp</span>
                        </div>
                        <div className="detail-item">
                          <Home size={16} />
                          <span>{property.rooms} camere</span>
                        </div>
                        <div className="detail-item">
                          <Bath size={16} />
                          <span>{property.bathrooms} băi</span>
                        </div>
                      </div>

                      <div className="property-footer">
                        <span className="property-year">Construit în {property.year}</span>
                        <button className="view-details-btn">Vezi detalii</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {viewMode !== 'lista' && (
          <div className="map-container">
            <div id="map" className="map"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;