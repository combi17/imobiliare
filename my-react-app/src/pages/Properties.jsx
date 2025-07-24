import React, { useState } from 'react';
import { Search, Filter, MapPin, Home, Bath, Maximize, Heart, Eye } from 'lucide-react';
import './Properties.css'
import iancului from '../assets/iancului.png'
import eminescu from '../assets/eminescu.jpg'
import rosseti from '../assets/rosseti.jpg'

const Properties = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
      description: "Cladire simbol, care nu poate trece neremarcata, imobilul este situat pe strada Maria Rosetti, in apropiere de Gradina Icoanei si Magheru. ",
      year: 2008
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
      description: "Imobil format din subsol, parter si 3 etaje, dispune de o suprafata totala de 640 mp, cu curte interioara si 2 balcoane.",
      year: 2009
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
      description: "Eminescu Office este o cladire noua de clasa A, finalizata in 2019, desfasurata pe 2 niveluri subterane, parter, mezanin si 8 etaje.",
      year: 2019
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="properties-page">
      <div className="search-header">
        <div className="search-container">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Caută proprietăți..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="">Sortează după</option>
              <option value="price-asc">Preț crescător</option>
              <option value="price-desc">Preț descrescător</option>
              <option value="surface-asc">Suprafață crescătoare</option>
              <option value="surface-desc">Suprafață descrescătoare</option>
              <option value="newest">Cele mai noi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="main-layout">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <Filter size={20} />
            <h3>Filtre Avansate</h3>
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
            <label>Preț (€)</label>
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

        <main className="properties-list">
  <div className="results-header">
    <h2>{properties.length} proprietăți găsite</h2>
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
      </div>
    </div>
  );
};

export default Properties;