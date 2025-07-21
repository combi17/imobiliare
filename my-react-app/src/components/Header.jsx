import React from 'react'
//import logo from '../assets/logo.png';

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <div className="logo">Premium East8</div>
          <ul className="nav-links">
            <li><a href="#proprietati">Proprietăți</a></li>
            <li><a href="#servicii">Servicii</a></li>
            <li><a href="#despre">Despre</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="cta-nav">Obține Evaluare</a>
        </nav>
      </header>
    </>
  )
}

export default Header