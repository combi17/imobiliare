import React from 'react'
import { Link } from "react-router-dom";

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <>
      <header>
        <nav>
          <div className="logo">Premium East8</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Proprietăți</Link></li>
            <li><Link to="/despre">Despre noi</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          
          <div className="nav-actions">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            title="Schimbă tema"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        </nav>
      </header>
    </>
  )
}

export default Header