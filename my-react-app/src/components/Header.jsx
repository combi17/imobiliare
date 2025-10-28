import React from 'react'
import { Link } from "react-router-dom";
//import { useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <div className="logo">Premium East8</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Proprietăți</Link></li>
            <li><Link to="/portofoliu">Portofoliu</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <Link to="/contact" className="cta-nav">Obține Evaluare</Link>
        </nav>
      </header>
    </>
  )
}

export default Header