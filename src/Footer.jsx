import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="footer-content">
                <div className="footer-marquee-container">
                    <div className="footer-marquee-track">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="footer-marquee-item">
                                <span className="footer-brand">Boogy</span>
                                <span className="footer-tagline">the event<br />company</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    <nav className="footer-nav">
                        <Link to="/" className="footer-link">HOME</Link>
                        <Link to="/about" className="footer-link">ABOUT US</Link>
                        <Link to="/services" className="footer-link">SERVICES</Link>
                        <Link to="/contact" className="footer-link">CONTACT US</Link>
                    </nav>

                    <div className="footer-socials">
                        <a href="https://linkedin.com/company/boogy-the-event-company/mycompany/" target="_blank" rel="noopener noreferrer" className="footer-social-link">LINKEDIN</a>
                        <a href="https://www.instagram.com/boogyevent/?hl=en" target="_blank" rel="noopener noreferrer" className="footer-social-link">INSTAGRAM</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
