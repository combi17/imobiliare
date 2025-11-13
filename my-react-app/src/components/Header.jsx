import React from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const flagRoUrl = "https://flagcdn.com/w20/ro.png";
const flagGbUrl = "https://flagcdn.com/w20/gb.png";

const Header = ({ darkMode, toggleTheme }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo">Premium East8</div>
          <ul className="nav-links">
            <li><Link to="/">{t('header.acasa')}</Link></li>
            <li><Link to="/properties">{t('header.proprietati')}</Link></li>
            <li><Link to="/despre">{t('header.despre')}</Link></li>
            <li><Link to="/contact">{t('header.contact')}</Link></li>
          </ul>
            
          <div className="header-right-controls">
            <div className="language-switcher">
              <button 
                onClick={() => changeLanguage('ro')} 
                className={i18n.language === 'ro' ? 'active' : ''}
              >
                <img src={flagRoUrl} alt="Steag România" className="flag-icon" />
                RO
              </button>
              <span className="lang-separator">|</span>
              <button 
                onClick={() => changeLanguage('en')} 
                className={i18n.language === 'en' ? 'active' : ''}
              >
                <img src={flagGbUrl} alt="Steag Marea Britanie" className="flag-icon" />
                EN
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header;