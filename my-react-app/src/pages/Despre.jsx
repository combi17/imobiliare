import React from 'react';
import './Despre.css';
import 'animate.css';
import { Briefcase, Building, Trophy, Target, TrendingUp } from 'lucide-react';
import heroImage from '../assets/birou2.jpg';
import lenus from "../assets/lenus.jpg";
import { useInView } from 'react-intersection-observer';

const milestones = [
  {
    year: '2023',
    title: 'Tranzacție Record în Sectorul 1',
    description: 'Intermedierea cu succes a vânzării unei clădiri de birouri de 10.000 mp, stabilind un nou record pe piața din nordul capitalei.',
    icon: <Trophy size={20} />
  },
  {
    year: '2022',
    title: 'Extinderea Echipei și Parteneriate Strategice',
    description: 'Ne-am dublat echipa de consultanți seniori și am format alianțe cheie cu fonduri de investiții internaționale.',
    icon: <Briefcase size={20} />
  },
  {
    year: '2020',
    title: 'Pionierat în Tranzacții "Green"',
    description: 'Am devenit prima agenție de nișă care a facilitat tranzacții exclusiv pentru clădiri de birouri cu certificare BREEAM Outstanding.',
    icon: <TrendingUp size={20} />
  },
  {
    year: '2018',
    title: 'Fondarea Premium East8',
    description: 'East8 a fost fondată cu viziunea de a redefini consultanța imobiliară de lux în București, punând accent pe etică și expertiză.',
    icon: <Building size={20} />
  }
];

const testimonials = [
    {
        quote: "Serviciile East8 au depășit așteptările. Am obținut o vânzare rapidă la un preț pe care nu ne așteptam să-l atingem. Recomandăm cu încredere pentru excelența și profesionalismul de care au dat dovadă.",
        author: "Andrei P.",
        location: "Investitor Imobiliar, Nordul Bucureștiului"
    },
    {
        quote: "Transparența și cunoașterea pieței de către Elena Miu au fost esențiale. Am găsit proprietatea perfectă pentru birourile noastre, iar procesul a fost impecabil de la A la Z.",
        author: "Maria S.",
        location: "CEO Tech Solutions, Zona Centrală"
    },
    {
        quote: "Pentru mine, factorul decisiv a fost încrederea. East8 livrează nu doar tranzacții, ci și parteneriate pe termen lung. Servicii premium, rezultate pe măsură.",
        author: "Alex V.",
        location: "Client Rezidențial, Băneasa"
    }
];

const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4, 
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

const Despre = () => { 
  const { ref: valoriRef, inView: valoriInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
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
        <div 
          className="despre-section values-section"
          ref={valoriRef}
        >
          <h2 className="section-title">Valorile Noastre Fundamentale</h2>
          <div className="values-grid">

            <div className={`value-card ${valoriInView ? 'animate__animated animate__fadeInUp' : 'hidden-anim'}`}>
              <div className="value-icon">
                <Trophy size={28} />
              </div>
              <h3>Excelență</h3>
              <p>Urmărim cele mai înalte standarde în tot ceea ce facem, de la analiza pieței la negocierea finală.</p>
            </div>
            
            <div className={`value-card ${valoriInView ? 'animate__animated animate__fadeInUp' : 'hidden-anim'}`}>
              <div className="value-icon">
                <Briefcase size={28} />
              </div>
              <h3>Profesionalism</h3>
              <p>Echipa noastră de experți oferă soluții personalizate, bazate pe etică și confidențialitate totală.</p>
            </div>
            
            <div className={`value-card ${valoriInView ? 'animate__animated animate__fadeInUp' : 'hidden-anim'}`}>
              <div className="value-icon">
                <Target size={28} />
              </div>
              <h3>Rezultate</h3>
              <p>Istoricul nostru de tranzacții de prestigiu demonstrează angajamentul nostru pentru succesul clienților.</p>
            </div>

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

        <div className="despre-section milestones-section">
          <h2 className="section-title">Istoric Tranzacții Relevante</h2>

          <div className="timeline">
            {milestones.map((item, index) => (
              <TimelineItem item={item} index={index} key={index} />
            ))}
          </div>
        </div>

      </div> 
    </div> 
  );
};

export default Despre;