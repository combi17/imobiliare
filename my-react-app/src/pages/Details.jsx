import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Home, Bath, Square, Calendar, Phone, Mail, BadgeCheck } from 'lucide-react';
import './Details.css';
import  supabase from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import lenus from "../assets/lenus.jpg";
import ImageModal from '../components/ImageModal';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Details = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  const { id } = useParams();
  const mapInstanceRef = useRef(null);

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/contact");
  }

  useEffect(() => {
    setProperty(null);
    setLoading(true);

    const fetchProperty = async () => {
      if (!id) return;
      const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
      if (error) {
        console.error('Eroare la preluarea datelor: ', error);
        setProperty(null);
      } else {
        setProperty(data);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);
  
useEffect(() => {
  if (property?.lat && property.lng && document.getElementById('property-map')) {
    const mapElement = document.getElementById('property-map');
    
    if (!mapInstanceRef.current && mapElement) {
      const map = new mapboxgl.Map({
        container: 'property-map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [property.lng, property.lat], // [lng, lat]
        zoom: 15,
        pitch: 0,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
        className: 'details-map-popup'
      }).setHTML(`
        <div style="padding: 12px; min-width: 220px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #212529;">
            ${property.name}
          </h3>
          <p style="margin: 0 0 5px 0; color: #1DA397; font-weight: 700; font-size: 18px;">
            €${property.price.toLocaleString()}/lună
          </p>
          <p style="margin: 0; color: #6c757d; font-size: 14px; display: flex; align-items: center; gap: 5px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${property.address}
          </p>
        </div>
      `);

      new mapboxgl.Marker({ 
        color: '#1DA397',
        scale: 1.2
      })
        .setLngLat([property.lng, property.lat])
        .setPopup(popup)
        .addTo(map);

      mapInstanceRef.current = map;
    }
  }

  return () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  };
}, [property]);

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setModalImageIndex((prevIndex) => (prevIndex + 1) % property.image_urls.length);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    setModalImageIndex((prevIndex) => (prevIndex - 1 + property.image_urls.length) % property.image_urls.length);
  };

  if (loading) {
    return <div className='loading-message'>Se încarcă detaliile proprietății...</div>;
  }

  if (!property) {
    return <div className='error-message'>Proprietatea nu a fost găsită.</div>;
  }

  const images = Array.isArray(property.image_urls) ? property.image_urls : [];
  const totalImages = images.length;
  const gridImages = images.slice(0, 5);

  return (
    <>
      <div className="property-details-page">
        <div className="container">
          <div className="details-header">
            <div className="details-header-main">
              <h1 className="property-title">{property.name}</h1>
              <div className="main-price">€{property.price?.toLocaleString()}/lună</div>
            </div>
            <div className="details-header-secondary">
              <div className="details-header-secondary-left">
                <span className="property-type">{property.type}</span>
                <div className="property-address">
                  <MapPin size={16} />
                  {property.address}
                </div>
              </div>
              {property.priceDetails && (
                <div className="price-details">€{property.priceDetails}/mp</div>
              )}
            </div>
          </div>
          {totalImages > 0 ? (
            <div className="image-grid-container">
              <div className="grid-image-main" onClick={() => openModal(0)}>
                <img src={gridImages[0]} alt={`${property.title} - imagine principală`} />
              </div>
              <div className="grid-image-secondary">
                {gridImages.slice(1).map((image, index) => {
                  const isLastImageInGrid = index === 3;
                  const hasMoreImages = totalImages > 5;
                  
                  return (
                    <div 
                      key={index} 
                      className="grid-image-item" 
                      onClick={() => openModal(index + 1)}
                    >
                      <img src={image} alt={`${property.title} - imagine ${index + 2}`} />
                      {isLastImageInGrid && hasMoreImages && (
                        <div className="view-all-overlay">
                          <span>Vezi toate imaginile</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="no-images-placeholder">Nu sunt disponibile imagini pentru această proprietate.</div>
          )}
          <div className="details-subtitle-bar">
            <span className="property-type-mobile">{property.type}</span>
            <div className="property-address-mobile">
              <MapPin size={16} />
              {property.address}
            </div>
          </div>

          <div className="property-content">
            <div className="property-info">
              <div className="property-details">                
                <div className="detail-item"><Calendar className="detail-icon" />Construit în {property.year}</div>
                <div className="detail-item"><Square className="detail-icon" />{property.size} mp</div>
                <div className="detail-item"><Home className="detail-icon" />{property.rooms} camere</div>
              </div>

              <div className="description-section">
                <h2>Descriere</h2>
                <p style={{ whiteSpace: "pre-line" }}>{property.description}</p>
              </div>

              {Array.isArray(property.features) && property.features.length > 0 && (
                <div className="features-section">
                  <h2>Caracteristici</h2>
                  <div className="features-grid">
                    {property.features.map((feature, index) => (
                      <div key={index} className="feature-item">✓ {feature}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="property-sidebar">
              <div className="contact-section">
                <h2>Contact Agent</h2>
                <div className="agent-card">
                  <div className="agent-info">
                    <div className="agent-avatar"><img src={lenus} alt="Elena Miu" /></div>
                    <div className="agent-details">
                      <h3>Elena Miu <BadgeCheck className="detail-icon"/></h3>
                      <p>10+ Ani Experienta</p>
                    </div>
                  </div>
                  <div className="contact-buttons">
                    <button onClick={() => window.location.href = "tel:+40712345678"} className="contact-btn primary"><Phone size={18} /> Sună acum</button>
                    <button onClick={handleClick} className="contact-btn secondary"><Mail size={18} />Trimite email</button>
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

      {isModalOpen && (
        <ImageModal 
          images={images}
          currentIndex={modalImageIndex}
          onClose={closeModal}
          onNext={showNextImage}
          onPrev={showPrevImage}
          title={property.name}
          totalImages={totalImages}
        />
      )}
    </>
  );
};

export default Details;