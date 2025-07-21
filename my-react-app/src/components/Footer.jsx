import React from 'react'

const Footer = () => {
  return (
    <>
    <footer>
        <div className="footer-container">
            <div className="footer-section">
                <h3>East8 Premium</h3>
                <p>Profesionalism, transparență și rezultate excepționale - since 2004</p>
            </div>
            <div className="footer-section">
                <h3>Servicii</h3>
                <a href="#">Vânzare Apartamente</a>
                <a href="#">Închiriere Case</a>
                <a href="#">Consultanță Investiții</a>
                <a href="#">Evaluări Proprietăți</a>
                <a href="#">Management Proprietăți</a>
            </div>
            <div className="footer-section">
                <h3>Zone Deservite</h3>
                <a href="#">Sectorul 1</a>
                <a href="#">Sectorul 2</a>
                <a href="#">Herastrau</a>
                <a href="#">Primaverii</a>
                <a href="#">Floreasca</a>
            </div>
            <div className="footer-section">
                <h3>Contact</h3>
                <p>📞 +40722222222</p>
                <p>✉️ office@east8.ro</p>
                <p>📍 Bd. Aviatorilor 15, București</p>
                <p>🕒 L-V: 9:00-19:00</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 East8.ro - Toate drepturile rezervate. | Politica de Confidențialitate | Termeni și Condiții</p>
        </div>
    </footer>     
    </>
  )
}

export default Footer