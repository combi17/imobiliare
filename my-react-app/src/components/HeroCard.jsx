import React from 'react'

const HeroCard = () => {
  return (
    <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Imobiliare <span className="highlight">Premium</span> în București</h1>
            <p>Descoperă proprietățile de lux și investițiile imobiliare de elită cu East8.</p>
            <div className="hero-buttons">
              <a href="#proprietati" className="btn-primary"> Explorează Proprietăți</a>
              <a href="#evaluare" className="btn-secondary"> Evaluare Gratuită</a>
            </div>
          </div>
          <div className="search-widget">
            <h3>Caută Proprietatea Ideală</h3>
            <form className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <select>
                    <option>Tip Proprietate</option>
                    <option>Apartament</option>
                    <option>Casă</option>
                    <option>Vila</option>
                    <option>Penthouse</option>
                  </select>
                </div>
                <div className="form-group">
                  <select>
                    <option>Sector / Zona</option>
                    <option>Sector 1</option>
                    <option>Sector 2</option>
                    <option>Sector 3</option>
                    <option>Sector 4</option>
                    <option>Sector 5</option>
                    <option>Sector 6</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Preț minim (EUR)" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Preț maxim (EUR)" />
                </div>
              </div>
              <button type="submit" className="search-btn">🔍 Caută Acum</button>
            </form>
          </div>
        </div>
      </section>
  )
}

export default HeroCard