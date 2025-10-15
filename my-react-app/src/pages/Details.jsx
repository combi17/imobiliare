import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Home, Bed, Bath, Square, Calendar, Heart, Share2, Phone, Mail } from 'lucide-react';
import './Details.css'
import supabase from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import lenus from "../assets/lenus.jpg";

const Details = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [map, setMap] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id)
        return;

      setLoading(true);

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Eroare la preluarea datelor: ', error)
        setProperty(null);
      }
      else {
        setProperty(data);
      }

      setLoading(false);
    };

    fetchProperty();
  }, [id]);
  
  useEffect(() => {
    if (property && property.lat && property.lng && document.getElementById('property-map')) {
      import('leaflet').then(L => {
        import('leaflet/dist/leaflet.css');
        
        const map = L.map('property-map').setView([property.lat, property.lng], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

        L.marker([property.lat, property.lng])
          .addTo(map)
          .bindPopup(property.title);

        return () => {
          map.remove();
        };
      });
    }
  }, [property]);

  const nextImage = () => {
    if (property && property.image_urls && property.image_urls.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.image_urls.length);      
    } 
  };

  const prevImage = () => {
    if (property && property.image_urls && property.image_urls.length > 0)
    setCurrentImageIndex((prev) => (prev - 1 + property.image_urls.length) % property.image_urls.length);
  };

  if (loading) {
    return <div className='loading-message'>Se incarca detaliile proprietatii alese...</div>;
  }

  if (!property) {
    return <div className='error-message'>Proprietatea nu a fost gasita.</div>;
  }

  return (
    <div className="property-details-page">
      <div className="page-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate(-1)}>
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
        <div className="property-header">
          <div className="title-section">
            <span className="property-type">{property.type}</span>
            <h1 className="property-title">{property.title}</h1>
            <div className="property-address">
              <MapPin size={16} />
              {property.zone}
            </div>
          </div>
          <div className="price-section">
            <div className="main-price">€{property.price.toLocaleString()}/luna</div>
            <div className="price-details">€{property.priceDetails}/mp</div>
          </div>
        </div>

        {property.image_urls && property.image_urls.length > 0 ? (
          <div className="image-gallery">
            <div className="main-image">
              <img src={property.image_urls[currentImageIndex]} alt={`${property.title} ${currentImageIndex + 1}`} />
              
              {property.image_urls.length > 1 && (
                <>
                  <button className="nav-btn prev" onClick={prevImage}>❮</button>
                  <button className="nav-btn next" onClick={nextImage}>❯</button>
                  <div className="image-counter">
                    {currentImageIndex + 1} / {property.image_urls.length}
                  </div>
                </>
              )}
            </div>
            
            {property.image_urls.length > 1 && (
              <div className="thumbnail-grid">
                {property.image_urls.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} thumbnail ${index + 1}`}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="no-images-placeholder">Nu sunt disponibile imagini pentru această proprietate.</div>
        )}

        <div className="property-content">
          <div className="property-info">
            <div className="property-details">
              <div className="detail-item">
                <Square className="detail-icon" />
                <span>{property.size} mp</span>
              </div>
              <div className="detail-item">
                <Home className="detail-icon" />
                <span>{property.rooms} camere</span>
              </div>
              <div className="detail-item">
                <Bath className="detail-icon" />
                <span>{property.bathrooms} bai</span>
              </div>
              <div className="detail-item">
                <Calendar className="detail-icon" />
                <span>Construit în {property.year}</span>
              </div>
            </div>

            <div className="description-section">
              <h2>Descriere</h2>
              <p>{property.description}</p>
            </div>

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

          <div className="property-sidebar">
            <div className="contact-section">
              <h2>Contact Agent</h2>
              <div className="agent-card">
                <div className="agent-info">
                  <div className="agent-avatar">
                    <img src={lenus} alt="Elena Miu" />
                  </div>
                  <div className="agent-details">
                    <h3>Elena Miu</h3>
                    <p>10+ Ani Experienta</p>
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

        <div className="map-section">
          <h2>Localizare</h2>
          <div id="property-map" className="leaflet-map"></div>
        </div>
      </div>
    </div>
  );
};

export default Details;