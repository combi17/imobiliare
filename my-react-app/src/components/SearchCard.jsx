import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const SearchCard = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    if (location)
      searchParams.append('zone', location);
    if (propertyType)
      searchParams.append('type', propertyType);
    if (minPrice)
      searchParams.append('minPrice', minPrice);
    if (maxPrice)
      searchParams.append('maxPrice', maxPrice);

    navigate(`/properties?${searchParams.toString()}`);
  }

  return (
    <section className="hero">
        <div className="hero-content">
          <div className="hero-text animate__animated animate__fadeInLeft">
            <h1>Imobiliare <span className="highlight">Premium</span> în București</h1>
            <p>Descoperă proprietățile de lux și investițiile imobiliare de elită cu East8.</p>
            <div className="hero-buttons">
              <Link to="/properties" className="btn-primary"> Explorează Proprietăți </Link>
              <Link to="/contact" className="btn-secondary"> Evaluare Gratuită</Link>
            </div>
          </div>
          <div className="search-widget animate__animated animate__fadeInRight">
            <h3>Caută Proprietatea Ideală</h3>
            <form className="search-form" onSubmit={handleSearch}>
              <div className="form-row">
                <div className="form-group">
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="" disabled hidden>Tip Proprietate</option>
                    <option value="Apartament">Apartament</option>
                    <option value="Birou">Birou</option>
                    <option value="Vila">Vila</option>
                  </select>
                </div>
                <div className="form-group">
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="" disabled hidden>Sector / Zona</option>
                    <option value="Sector 1">Sector 1</option>
                    <option value="Sector 2">Sector 2</option>
                    <option value="Sector 3">Sector 3</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="number" 
                    placeholder="Preț minim (EUR)" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text" 
                    placeholder="Preț maxim (EUR)" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="search-btn">🔍 Caută </button>
            </form>
          </div>
        </div>
      </section>
  )
}

export default SearchCard