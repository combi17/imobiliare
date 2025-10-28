import React, { useState } from 'react';
import './Contact.css'; 
import { Phone, Mail, MapPin, Linkedin, Facebook } from 'lucide-react';
import lenus from "../assets/lenus.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    console.log('Date formular:', formData);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page-container">
      <div className="container">
        <div className="contact-header">
          <h1>Ai o întrebare?</h1>
          <p>Dorești să cumperi o proprietate sau vrei mai multe detalii? Contactează-ne acum.</p>
        </div>

        <div className="contact-content-grid">
          <div className="contact-form-wrapper">
            <h2>Trimite-ne un mesaj</h2>
            <p>Completează formularul și te vom contacta în cel mai scurt timp.</p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Numele tău</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder='Ion Popescu'
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Adresă de Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder='ion.popescu@gmail.com'
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefon (Opțional)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder='0712345678'
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subiect</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mesajul tău</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="20" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Se trimite...' : 'Trimite Mesajul'}
              </button>

              {submitStatus === 'success' && (
                <div className="form-status success">Mesajul tău a fost trimis cu succes!</div>
              )}
              {submitStatus === 'error' && (
                <div className="form-status error">A apărut o eroare. Te rugăm să încerci mai târziu.</div>
              )}
            </form>
          </div>

          <div className="contact-info-wrapper">
            <h2>Contact direct</h2>
            <p>Ne poți contacta oricând folosind datele de mai jos.</p>

            <div className="contact-info-card">
              <div className="info-item">
                <div className="info-icon"><Phone size={22} /></div>
                <div className="info-text">
                  <h4>Telefon</h4>
                  <a href="tel:+40700000000">+40 700 000 000</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Mail size={22} /></div>
                <div className="info-text">
                  <h4>Email</h4>
                  <a href="mailto:contact@east8.ro">contact@east8.ro</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><MapPin size={22} /></div>
                <div className="info-text">
                  <h4>Adresă</h4>
                  <p>str. Sirenelor, nr. 49-55, ap. 37, sector 5, București</p>
                </div>
              </div>
            </div>

            <div className="agent-contact-card">
              <img src={lenus} alt="Elena Miu" className="agent-avatar" />
              <h3>Elena Miu</h3>
              <p>Agentul tău cu peste 10 ani experiență în domeniu</p>
              <div className="agent-socials">
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;