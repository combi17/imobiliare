import React from 'react';
import './Despre.css';
import { Briefcase, Building, Trophy, Target, TrendingUp } from 'lucide-react';
import heroImage from '../assets/birou2.jpg';
import lenus from "../assets/lenus.jpg";

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
            author: "Andrei P., Investitor Imobiliar",
            location: "Nordul Bucureștiului"
        },
        {
            quote: "Transparența și cunoașterea pieței de către Elena Miu au fost esențiale. Am găsit proprietatea perfectă pentru birourile noastre, iar procesul a fost impecabil de la A la Z.",
            author: "Maria S., CEO Tech Solutions",
            location: "Zona Centrală"
        },
        {
            quote: "Pentru mine, factorul decisiv a fost încrederea. East8 livrează nu doar tranzacții, ci și parteneriate pe termen lung. Servicii premium, rezultate pe măsură.",
            author: "Alexandru V., Client Rezidențial",
            location: "Băneasa"
        }
    ];

const Despre = () => {
  return (
    <div className="despre-page-container">
      <div className="despre-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="despre-hero-overlay"></div>
        <div className="container">
          <h1 className="despre-title">Despre East8</h1>
          <p className="despre-subtitle">
            Expertiză și Integritate în Imobiliarele Premium
          </p>
        </div>
      </div>

      <div className="container">
        <div className="despre-section">
          <div className="despre-section-text">
            <h2>Viziunea Noastră</h2>
            <p>
              Fondată în 2018, Premium East8 a apărut ca răspuns la cererea pieței pentru o agenție de consultanță de nișă, dedicată exclusiv segmentului premium. Ne-am construit reputația pe o fundație de profesionalism absolut, transparență și o înțelegere profundă a investițiilor imobiliare de prestigiu.
            </p>
            <p>
              Nu suntem doar intermediari, ci parteneri strategici. Misiunea noastră este să oferim consultanță bazată pe date precise și o analiză aprofundată a pieței, asigurând că fiecare tranzacție - fie că este vorba de clădiri de birouri de clasă A sau proprietăți rezidențiale de lux - generează valoare maximă pentru clienții noștri.
            </p>
          </div>
          <div className="despre-section-image-wrapper">
            <img src={lenus} alt="Echipa East8" className="despre-section-image" />
          </div>
        </div>

        <div className="despre-section values-section">
          <h2 className="section-title">Valorile Noastre Fundamentale</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Trophy size={28} />
              </div>
              <h3>Excelență</h3>
              <p>Urmărim cele mai înalte standarde în tot ceea ce facem, de la analiza pieței la negocierea finală.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Briefcase size={28} />
              </div>
              <h3>Profesionalism</h3>
              <p>Echipa noastră de experți oferă soluții personalizate, bazate pe etică și confidențialitate totală.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Target size={28} />
              </div>
              <h3>Rezultate</h3>
              <p>Istoricul nostru de tranzacții de prestigiu demonstrează angajamentul nostru pentru succesul clienților.</p>
            </div>
          </div>
        </div>

        <div className="despre-section testimonials-section">
          <h2 className="section-title">Ce Spun Clienții Noștri</h2>
              <div className="testimonials-grid">
                  {testimonials.map((item, index) => (
                      <div className="testimonial-card" key={index}>
                          <p className="testimonial-quote">"{item.quote}"</p>
                          <div className="testimonial-author-info">
                              <span className="author-name">{item.author}</span>
                              <span className="author-location"> - {item.location}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

        <div className="despre-section milestones-section">
          <h2 className="section-title">Istoric Tranzacții Relevante</h2>
          <div className="timeline">
            {milestones.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon">{item.icon}</div>
                </div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Despre;