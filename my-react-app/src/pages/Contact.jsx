import React from 'react';
import { useForm } from '@formspree/react';
import './Contact.css'; 
import { Phone, Mail, MapPin, Linkedin, Facebook } from 'lucide-react';
import lenus from "../assets/lenus.jpg";

const Contact = () => {
  const [state, handleSubmit] = useForm('xeopkkpk');

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
                    placeholder="ex: Ion Popescu"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Adresă de Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder='ex: ion.popescu@gmail.com'
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
                    placeholder='ex: 0712345678'
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subiect</label>
                  <select
                    id="subject" 
                    name="subject"
                    defaultValue=""
                    required 
                  >
                    <option value="" disabled>Alege un subiect</option>
                    <option value="Cerere oferta">Doresc o oferta</option>
                    <option value="Cerere vizualizare">Doresc o vizualizare</option>
                    <option value="Evaluare proprietate">Doresc o evaluare</option>
                    <option value="Alt subiect">Alt subiect</option>                                      
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mesajul tău</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="20" 
                  placeholder='Scrie aici mesajul tău...'
                  required
                ></textarea>
              </div>
              
             {state.succeeded ? (
              <div className='form-status succes'>Mulțumim! Mesajul tău a fost trimis.</div>
            ) : (
              <>
                <button type="submit" className='submit-btn' disabled={state.submitting}>
                  {state.submitting ? 'Se trimite' : 'Trimite Mesajul'}
                </button>

                {state.errors && (
                  <div className='form-status error'>
                      A apărut o eroare. Te rugăm să încerci mai târziu.
                  </div>
                )}
              </>
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