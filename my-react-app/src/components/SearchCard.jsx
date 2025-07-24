import React from 'react'
import { Link } from "react-router-dom";

const SearchCard = () => {
  return (
    <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Imobiliare <span className="highlight">Premium</span> în București</h1>
            <p>Descoperă proprietățile de lux și investițiile imobiliare de elită cu East8.</p>
            <div className="hero-buttons">
              <Link to="/proprietati" className="btn-primary"> Explorează Proprietăți </Link>
              <a href="#evaluare" className="btn-secondary"> Evaluare Gratuită</a>
            </div>
          </div>
          <div className="search-widget">
            <h3>Caută Proprietatea Ideală</h3>
            <form className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <select defaultValue="">
                    <option value="" disabled hidden>Tip Proprietate</option>
                    <option value="apart">Apartament</option>
                    <option value="casa">Casă</option>
                    <option value="vila">Vila</option>
                    <option value="pent">Penthouse</option>
                  </select>
                </div>
                <div className="form-group">
                  <select defaultValue="">
                    <option value="" disabled hidden>Sector / Zona</option>
                    <option value="sec1">Sector 1</option>
                    <option value="sec2">Sector 2</option>
                    <option value="sec3">Sector 3</option>
                    <option value="sec4">Sector 4</option>
                    <option value="sec5">Sector 5</option>
                    <option value="sec6">Sector 6</option>
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

export default SearchCard