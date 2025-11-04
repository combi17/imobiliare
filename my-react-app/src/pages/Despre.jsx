import React, { useState } from 'react';
import './Despre.css';
import 'animate.css';
import { Briefcase, Building, Trophy, Target, TrendingUp, X, MapPin, Building2, Warehouse } from 'lucide-react';
import heroImage from '../assets/birou2.jpg';
import lenus from "../assets/lenus.jpg";
import { useInView } from 'react-intersection-observer';

const milestones = [
  {
    year: '2018',
    title: 'Fondarea Premium East8',
    description: 'East8 a fost fondată cu viziunea de a redefini consultanța imobiliară de lux în București, punând accent pe etică și expertiză.',
    icon: <Building size={20} />
  },
  {
    year: '2020',
    title: 'Pionierat în Tranzacții "Green"',
    description: 'Am devenit prima agenție de nișă care a facilitat tranzacții exclusiv pentru clădiri de birouri cu certificare BREEAM Outstanding.',
    icon: <TrendingUp size={20} />
  },
  {
    year: '2022',
    title: 'Extinderea Echipei și Parteneriate',
    description: 'Ne-am dublat echipa de consultanți seniori și am format alianțe cheie cu fonduri de investiții internaționale.',
    icon: <Briefcase size={20} />
  },
  {
    year: '2023',
    title: 'Tranzacție Record în Sectorul 1',
    description: 'Intermedierea cu succes a vânzării unei clădiri de birouri de 10.000 mp, stabilind un nou record pe piața din nordul capitalei.',
    icon: <Trophy size={20} />
  }
];

const testimonials = [
    {
        quote: "Serviciile East8 au depășit așteptările. Am obținut o vânzare rapidă la un preț pe care nu ne așteptam să-l atingem. Recomandăm cu încredere.",
        author: "Andrei P.",
        location: "Investitor Imobiliar, Nordul Bucureștiului"
    },
    {
        quote: "Transparența și cunoașterea pieței de către Elena Miu au fost esențiale. Am găsit proprietatea perfectă pentru birourile noastre.",
        author: "Maria S.",
        location: "CEO Tech Solutions, Zona Centrală"
    },
    {
        quote: "Pentru mine, factorul decisiv a fost încrederea. East8 livrează nu doar tranzacții, ci și parteneriate pe termen lung.",
        author: "Alex V.",
        location: "Client Rezidențial, Băneasa"
    }
];

import birouImg from '../assets/birou.jpg';
import apartImg from '../assets/apart1.jpg';
import houseImg from '../assets/house1.jpg';
import birou3Img from '../assets/birou3.jpg';

const tranzactii = [
  {
    id: 1,
    title: 'Clădire Birouri Clasa A',
    location: 'Pipera, București',
    description: 'Tranzacție de închiriere pe 10 ani pentru 15.000 mp de spații de birouri moderne, consolidând polul de business din nordul capitalei.',
    image: birouImg
  },
  {
    id: 2,
    title: 'Portofoliu Rezidențial',
    location: 'Băneasa, București',
    description: 'Vânzare a unui pachet de 50 de apartamente de lux într-un complex rezidențial premium, destinată unui fond de investiții internațional.',
    image: apartImg
  },
  {
    id: 3,
    title: 'Vilă Monument Istoric',
    location: 'Zona Aviatorilor, București',
    description: 'Consultanță și intermediere în vânzarea unei proprietăți unice, o vilă monument istoric ce necesită restaurare, preluată de un colecționar privat.',
    image: houseImg
  },
  {
    id: 4,
    title: 'Spațiu Industrial / Logistic',
    location: 'A1, km 23',
    description: 'Închiriere a 20.000 mp de spațiu de depozitare și logistică de ultimă generație pentru o companie de e-commerce de top.',
    image: birou3Img
  }
];

const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const alignment = index % 2 === 0 ? 'left' : 'right';
  const animation = index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight';

  return (
    <div 
      className={`timeline-item-container ${alignment} ${inView ? `animate__animated ${animation}` : 'hidden-anim'}`}
      ref={ref}
    >
      <div className="timeline-icon-wrapper">
        <div className="timeline-icon">{item.icon}</div>
      </div>
      <div className="timeline-content">
        <span className="timeline-year">{item.year}</span>
        <h3 className="timeline-title">{item.title}</h3>
        <p className="timeline-description">{item.description}</p>
      </div>
    </div>
  );
};

const TranzactieModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <img src={data.image} alt={data.title} className="modal-image" />
        <div className="modal-body">
          <h2 className="modal-title">{data.title}</h2>
          <div className="modal-location">
            <MapPin size={16} /> {data.location}
          </div>
          <p className="modal-description">{data.description}</p>
          <button className="modal-cta-btn">Vezi Detalii</button>
        </div>
      </div>
    </div>
  );
};

const Despre = () => { 
  const [modalData, setModalData] = useState(null);

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { ref: tranzactiiRef, inView: tranzactiiInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0];
    return names[0][0] + names[names.length - 1][0];
  };

  const handleOpenModal = (tranzactie) => {
    setModalData(tranzactie);
  };
  const handleCloseModal = () => {
    setModalData(null);
  };


  return (
    <div className="despre-page-container">
      <div className="despre-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="despre-hero-overlay"></div>
        
        <div className="container">
          <h1 className="despre-title animate__animated animate__fadeInDown">Despre East8</h1>
          <p className="despre-subtitle animate__animated animate__fadeInDown animate__delay-1s">
            Expertiză și Integritate în Imobiliarele Premium
          </p>
        </div>

        <div className="hero-content-overlay">
          <div className="viziune-container">
            <div 
              className="despre-section-text-card animate__animated animate__fadeInLeft"
            >
              <h2>Viziunea Noastră</h2>
              <p>
                Fondată în 2018, Premium East8 a apărut ca răspuns la cererea pieței pentru o agenție de consultanță de nișă, dedicată exclusiv segmentului premium. Ne-am construit reputația pe o fundație de profesionalism absolut, transparență și o înțelegere profundă a investițiilor imobiliare de prestigiu.
              </p>
            </div>
            <div 
              className="despre-section-image-wrapper animate__animated animate__fadeInRight"
            >
              <img src={lenus} alt="Echipa East8" className="despre-section-image" />
            </div>
          </div>
        </div>
      </div> 

      <div className="container">
        <div className="despre-section milestones-section">
          <h2 className="section-title">Cum ne-am dezvoltat</h2>
          <div className="timeline">
            {milestones.map((item, index) => (
              <TimelineItem item={item} index={index} key={index} />
            ))}
          </div>
        </div>
        
        <div 
          className={`despre-section testimonials-section ${testimonialsInView ? 'animate__animated animate__fadeIn' : 'hidden-anim'}`}
          ref={testimonialsRef}
        >
          <h2 className="section-title">Ce Spun Clienții Noștri</h2>
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-avatar">
                  {getInitials(item.author)}
                </div>
                <p className="testimonial-quote">"{item.quote}"</p>
                <div className="testimonial-author-info">
                  <span className="author-name">{item.author}</span>
                  <span className="author-location">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="despre-section tranzactii-section"
          ref={tranzactiiRef}
        >
          <h2 className="section-title">Cele Mai Importante Tranzacții</h2>
          <div className={`tranzactii-grid ${tranzactiiInView ? 'animate__animated animate__fadeInUp' : 'hidden-anim'}`}>
            {tranzactii.map((item) => (
              <div 
                className="tranzactie-card" 
                key={item.id} 
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={() => handleOpenModal(item)}
              >
                <div className="tranzactie-card-overlay"></div>
                <div className="tranzactie-card-content">
                  <h3>{item.title}</h3>
                  <p><MapPin size={14} /> {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div> 
      {modalData && <TranzactieModal data={modalData} onClose={handleCloseModal} />}
    </div> 
  );
};

export default Despre;