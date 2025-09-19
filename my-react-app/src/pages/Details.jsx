import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Home, Bed, Bath, Square, Calendar, Heart, Share2, Phone, Mail } from 'lucide-react';
import './Details.css'

const Details = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [map, setMap] = useState(null);

  // Date mock pentru proprietate
  const property = {
    id: 1,
    title: "Spații Birouri zona Magheru",
    address: "Strada Maria Rosetti, Sector 1, București",
    price: "€1,500",
    priceDetails: "€15/mp",
    type: "Birou",
    area: "274 mp",
    rooms: "5 camere",
    bathrooms: "2 băi",
    yearBuilt: "2008",
    coordinates: [44.4268, 26.1025], // București coordonate
    description: "Clădire simbol, care nu poate trece neremarcată, imobilul este situat pe strada Maria Rosetti, în apropiere de Grădina Icoanei și Magheru. Spațiul oferă o vedere panoramică asupra orașului și beneficiază de o locație excelentă pentru afaceri. Interiorul este modern amenajat, cu finisaje de calitate superioară și dotări complete pentru birouri.",
    features: [
      "Aer condiționat",
      "Internet fibră optică",
      "Sistem securitate",
      "Parcare inclusă",
      "Mobilat complet",
      "Vedere panoramică"
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
    ],
    agent: {
      name: "Ana Popescu",
      phone: "+40 722 123 456",
      email: "ana.popescu@realestate.ro"
    }
  };

  // Inițializare hartă Leaflet
  useEffect(() => {
    // Încarcă Leaflet doar dacă nu e deja încărcat
    if (typeof window !== 'undefined' && !window.L) {
      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      leafletScript.onload = initializeMap;
      document.head.appendChild(leafletScript);

      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(leafletCSS);
    } else if (window.L) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const initializeMap = () => {
    setTimeout(() => {
      if (window.L && document.getElementById('property-map')) {
        const newMap = window.L.map('property-map').setView(property.coordinates, 15);
        
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(newMap);

        window.L.marker(property.coordinates)
          .addTo(newMap)
          .bindPopup(property.title);

        setMap(newMap);
      }
    }, 100);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="property-details-page">
      {/* Header cu navigare proprietate */}
      <div className="page-header">
        <div className="container">
          <button className="back-btn">
            <ArrowLeft size={20} />
            Înapoi la rezultate
          </button>
          <div className="header-actions">
            <button className="action-btn">
              <Share2 size={20} />
            </button>
            <button 
              className={`action-btn ${isFavorited ? 'favorited' : ''}`}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart size={20} fill={isFavorited ? '#1da397' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Header cu titlu și preț */}
        <div className="property-header">
          <div className="title-section">
            <span className="property-type">{property.type}</span>
            <h1 className="property-title">{property.title}</h1>
            <div className="property-address">
              <MapPin size={16} />
              {property.address}
            </div>
          </div>
          <div className="price-section">
            <div className="main-price">{property.price}</div>
            <div className="price-details">{property.priceDetails}</div>
          </div>
        </div>

        {/* Galeria de imagini */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={property.images[currentImageIndex]} alt={property.title} />
            <button className="nav-btn prev" onClick={prevImage}>❮</button>
            <button className="nav-btn next" onClick={nextImage}>❯</button>
            <div className="image-counter">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
          <div className="thumbnail-grid">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="property-content">
          {/* Informații principale */}
          <div className="property-info">
            {/* Detalii proprietate */}
            <div className="property-details">
              <div className="detail-item">
                <Square className="detail-icon" />
                <span>{property.area}</span>
              </div>
              <div className="detail-item">
                <Home className="detail-icon" />
                <span>{property.rooms}</span>
              </div>
              <div className="detail-item">
                <Bath className="detail-icon" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="detail-item">
                <Calendar className="detail-icon" />
                <span>Construit în {property.yearBuilt}</span>
              </div>
            </div>

            {/* Descriere */}
            <div className="description-section">
              <h2>Descriere</h2>
              <p>{property.description}</p>
            </div>

            {/* Caracteristici */}
            <div className="features-section">
              <h2>Caracteristici</h2>
              <div className="features-grid">
                {property.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    ✓ {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar cu contact */}
          <div className="property-sidebar">
            <div className="contact-section">
              <h2>Contact Agent</h2>
              <div className="agent-card">
                <div className="agent-info">
                  <div className="agent-avatar">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt={property.agent.name} />
                  </div>
                  <div className="agent-details">
                    <h3>{property.agent.name}</h3>
                    <p>Agent imobiliar</p>
                  </div>
                </div>
                <div className="contact-buttons">
                  <button className="contact-btn primary">
                    <Phone size={18} />
                    Sună acum
                  </button>
                  <button className="contact-btn secondary">
                    <Mail size={18} />
                    Trimite email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Harta */}
        <div className="map-section">
          <h2>Localizare</h2>
          <div id="property-map" className="leaflet-map"></div>
        </div>
      </div>
    </div>
  );
};

export default Details;