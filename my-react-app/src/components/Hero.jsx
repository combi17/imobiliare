import React from 'react'
import { useEffect } from 'react';
import Slideshow from './Slideshow.jsx';
import '../pages/HomePage.css';

const Hero = () => {

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const number = parseInt(target.replace(/[^\d]/g, ''));
                const suffix = target.replace(/[\d]/g, '');
                let current = 0;
                const increment = number / 100;
                    
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + suffix;
                }, 20);
                    
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
        
    counters.forEach(counter => {
        observer.observe(counter);
    });

    return () => observer.disconnect();
    }

    useEffect(() => {
        const cleanup = animateCounters();
        return cleanup;
    }, []);

  return (
    <>
    <div className='fullwidth-wrapper'>
        <Slideshow/>
    </div>

    <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">1200+</div>
            <div className="stat-label">Proprietăți Vândute</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Clienți Mulțumiți</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Ani Experiență</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50M+</div>
            <div className="stat-label">EUR Tranzacționați</div>
          </div>
        </div>
      </section>

    <section className="services" id="servicii">
        <div className="services-container">
            <div className="section-header">
                <h2>Servicii Complete de Imobiliare</h2>
                <p>Oferim soluții integrate pentru toate nevoile tale imobiliare, de la consultanță la finalizarea tranzacției.</p>
            </div>
            <div className="services-grid">
                <div className="service-card">
                    <div className="service-icon">🏢</div>
                    <h3>Vânzare Proprietăți</h3>
                    <p>Marketing profesional, evaluare corectă și negociere expertă pentru vânzarea rapidă și profitabilă a proprietății tale.</p>
                </div>
                <div className="service-card">
                    <div className="service-icon">🔍</div>
                    <h3>Căutare Personalizată</h3>
                    <p>Identificăm proprietatea perfectă pentru tine, bazându-ne pe preferințele și bugetul tău specific.</p>
                </div>
                <div className="service-card">
                    <div className="service-icon">💼</div>
                    <h3>Consultanță Investiții</h3>
                    <p>Strategii de investiții imobiliare personalizate pentru maximizarea profiturilor și minimizarea riscurilor.</p>
                </div>
                <div className="service-card">
                    <div className="service-icon">📋</div>
                    <h3>Management Proprietăți</h3>
                    <p>Servicii complete de administrare pentru proprietarii care doresc venituri pasive din închirieri.</p>
                </div>
                <div className="service-card">
                    <div className="service-icon">⚖️</div>
                    <h3>Suport Juridic</h3>
                    <p>Asistență legală completă pentru toate aspectele juridice ale tranzacțiilor imobiliare.</p>
                </div>
                <div className="service-card">
                    <div className="service-icon">📊</div>
                    <h3>Evaluări Profesionale</h3>
                    <p>Rapoarte detaliate de evaluare realizate de experți certificați pentru prețuri corecte de piață.</p>
                </div>
            </div>
        </div>
    </section>

    <section className="cta-section">
        <div className="cta-container">
            <h2>Pregătit să îți transformi visul în realitate?</h2>
            <p>Alătură-te celor peste 1200 de clienți mulțumiți care au ales East8 pentru nevoile lor imobiliare. Începe astăzi călătoria către proprietatea ta ideală.</p>
            <a href="#contact" className="btn-primary">📞 Contactează-ne acum</a>
        </div>
    </section>      
    </>
  )
}

export default Hero